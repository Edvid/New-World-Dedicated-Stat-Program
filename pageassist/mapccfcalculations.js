
let allImagesLoaded = 0;
let ImageCount = 2;

const WIDTH = 8192;
const HEIGHT = 3365;

let outputField = document.querySelector("div.output");

//nation climates
let nationCanvas = document.createElement("canvas");
let climateCanvas = document.createElement("canvas");

document.querySelector("body").appendChild(nationCanvas);
document.querySelector("body").appendChild(climateCanvas);

let nationImagePath = "./docs/assets/images/world/Nations.png";
let nationImage = new Image(WIDTH, HEIGHT);
nationImage.src = nationImagePath;
nationImage.onload = function () {
    nationCanvas.getContext("2d").drawImage(nationImage, 0, 0, WIDTH, HEIGHT);
    allImagesLoaded++;
}

let climateImagePath = "./docs/assets/images/world/Climates.png";
let climateImage = new Image(WIDTH, HEIGHT);
climateImage.src = climateImagePath;
climateImage.onload = function () {
    climateCanvas.getContext("2d").drawImage(climateImage, 0, 0, WIDTH, HEIGHT);
    allImagesLoaded++;
}

document.querySelector("body").addEventListener("game load done", () => {
    
    //color to nation mapping
    let colorToNationMap = {};
    for (const nname in gameStats.Nations) {
        const col = gameStats.Nations[nname].Color;
        if(typeof colorToNationMap[col] !== 'undefined') {
            //console.error(`${ctnm[col]} and ${nname} share the same color: ${col}`)
            //return;
            colorToNationMap[col] += " ";
        } else {
            colorToNationMap[col] = "";    
        }

        colorToNationMap[col] += nname;
    }
    colorToNationMap;
});

imageLoadDoneCheck = setInterval(() => {
    if(allImagesLoaded >= ImageCount){
        document.querySelector("body").dispatchEvent(new Event("image load done"))
        clearInterval(imageLoadDoneCheck);
    }
}, 100);



document.querySelector("body").addEventListener("image load done", () => {

    let nationData = nationCanvas.getContext("2d").getImageData(0, 0, WIDTH, HEIGHT).data;
    let climateData = climateCanvas.getContext("2d").getImageData(0, 0, WIDTH, HEIGHT).data;

    let colorToClimateMap = {
        "#103c6d": "Ocean",
        "#ffffff": "PolarDesert",
        "#004a7f": "TaigaAndTundra",
        "#ffac7f": "MontaneForest",
        "#ff6a00": "Medditereanian",
        "#7f3300": "Arid",
        "#c8ff7c": "Steppe",
        "#4cff00": "Moderate",
        "#5b7f00": "SubTropical",
        "#008010": "Tropical",
        "#c1bd3e": "Savanna",
        "#ff0000": "Mountainous",
        "#fffb99": "Desert",
        "#ffd800": "CoastalDesert"
    }

    let climateDistribution = {};
    
    for (let i = 0; i < nationData.length / 4; i++) {
        //if the pixel in climateData is transparent, skip
        if(climateData[i*4+3] == 0) continue;

        let nationColarr = [nationData[i*4], nationData[i*4+1], nationData[i*4+2]]
        let nationCol = "#" + rgbToHex(nationColarr);

        let climateColarr = [climateData[i*4], climateData[i*4+1], climateData[i*4+2]]
        let climateCol = "#" + rgbToHex(climateColarr);

        climateDistribution[colorToNationMap[nationCol]][colorToClimateMap[climateCol]]++;
    }

    console.log(climateDistribution)

});