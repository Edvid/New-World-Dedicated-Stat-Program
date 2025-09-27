import { getGameStats } from "../../../stats/gameStats.js";
import { ImageIndexToRGBA, RGBAToHex, RGBAtoRGB, IntColorToRGBA } from "../../color_manipulation.js";
export function advancePopulationMap(imgArray, pixelIndex, options) {
    const gameStats = getGameStats();
    const pixel = ImageIndexToRGBA(imgArray, pixelIndex);
    if (pixel[3] < 128)
        return pixel; //if transparent, don't modify the pixel at all
    let pixelPop = pixel[0];
    pixelPop *= 255;
    pixelPop += pixel[1];
    pixelPop *= 255;
    pixelPop += pixel[2];
    const propertyData = options.propertyData;
    const colorProperties = options.colorProperties;
    const developmentData = options.development;
    function fetchPropertyObject(dataName) {
        const foundRGBA = ImageIndexToRGBA(propertyData[dataName], pixelIndex);
        const color = RGBAToHex(RGBAtoRGB(foundRGBA));
        let pair;
        colorProperties[dataName].forEach((colorNamePair) => {
            if (colorNamePair.color == color) {
                pair = colorNamePair;
                return;
            }
        });
        return pair;
    }
    function fetchName(dataName) {
        const pair = fetchPropertyObject(dataName);
        return typeof pair !== "undefined" ? pair.name : null;
    }
    function fetchBinary(dataName, isName) {
        const propertyPair = fetchPropertyObject(dataName);
        const nullableName = propertyPair ? propertyPair.name : `not-${isName}`;
        return nullableName == isName;
    }
    const nationName = fetchName("nation");
    const n = gameStats.Nations[nationName];
    const hasVaccine = typeof n !== "undefined" ? n.Technologies.Vaccines : false;
    const pseudoPopulationGrowth = typeof n !== "undefined" ? n.PseudoPopulationGrowth : 0.1;
    const effectiveHealth = typeof n !== "undefined" ? n.EffectiveHealth : 0;
    const climateName = fetchName("climate");
    const climateScore = gameStats.Climates[climateName].ClimateScore +
        (hasVaccine
            ? climateName == "SubTropical" ||
                climateName == "Tropical" ||
                climateName == "Savanna"
                ? 0.1
                : 0
            : 0);
    const isCoastalPixel = fetchBinary("coastal", "coast");
    let developmentScore = ImageIndexToRGBA(developmentData, pixelIndex)[0]; //reading red channel as shorthand for greyscale
    developmentScore = developmentScore / 255;
    const fertilityName = fetchName("fertility");
    const fertilityScore = gameStats.Fertility[fertilityName].Score;
    const pixelsDisease = pixelPop / (20 * climateScore) / 25 -
        effectiveHealth -
        (isCoastalPixel ? 0.1 : 0) +
        (0.5 - fertilityScore) / 2.5 -
        developmentScore * 5;
    const pixelsPopGrowth = pseudoPopulationGrowth < 0
        ? pseudoPopulationGrowth
        : pseudoPopulationGrowth * (1 - pixelsDisease);
    const newPixelPop = pixelPop * (1 + pixelsPopGrowth);
    return IntColorToRGBA(newPixelPop);
}
