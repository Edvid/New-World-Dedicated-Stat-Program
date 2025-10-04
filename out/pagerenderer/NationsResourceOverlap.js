import { loadGameFromSafeFile } from "../gameloading/loadChangesFromFile.js";
import { Header } from "../components/header.js";
import { prepareData } from "../utility/images/prepare_data.js";
import { reportProgress } from "../utility/report_progress.js";
import { lerp } from "../utility/math.js";
import { mappedResources } from "../utility/game_stats/resources.js";
import { WIDTH, HEIGHT } from "../utility/images/consts.js";
let canvasContainer;
const bumpMapOpacity = 0.3;
document.querySelector("body").onload = () => generateNationsResourcesOverlay();
document.body.prepend(Header());
await loadGameFromSafeFile();
async function generateNationsResourcesOverlay() {
    canvasContainer = document.getElementById("canvascontainer");
    // canvasContainer.width = WIDTH;
    // canvasContainer.height = HEIGHT;
    const worldCanvas = document.createElement("canvas");
    worldCanvas.id = "worldcanvas";
    worldCanvas.width = WIDTH;
    worldCanvas.height = HEIGHT;
    canvasContainer.appendChild(worldCanvas);
    const overlapProperties = [...mappedResources];
    overlapProperties.push("Fertility");
    const resourceMaps = [];
    const table = document.querySelector("tbody");
    for (const resourceName of overlapProperties) {
        resourceMaps[resourceName] = document.createElement("canvas");
        resourceMaps[resourceName].hidden = "true";
        resourceMaps[resourceName].id = "resourcecanvas" + resourceName.toLowerCase();
        resourceMaps[resourceName].width = WIDTH;
        resourceMaps[resourceName].height = HEIGHT;
        canvasContainer.appendChild(resourceMaps[resourceName]);
        const resourceCtx = resourceMaps[resourceName].getContext("2d");
        const imagePath = "./docs/assets/images/world/Resources/" + resourceName + ".png";
        const image = new Image(WIDTH, HEIGHT);
        image.src = imagePath;
        resourceCtx.globalAlpha = 180 / 255;
        image.onload = function () {
            resourceCtx.drawImage(image, 0, 0, WIDTH, HEIGHT);
        };
        const resourceRow = document.createElement("tr");
        const col1 = document.createElement("td");
        const col2 = document.createElement("td");
        resourceRow.appendChild(col1);
        resourceRow.appendChild(col2);
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.onchange = () => {
            const c = document.querySelector("#resourcecanvas" + resourceName.toLowerCase());
            c.hidden = !c.hidden;
        };
        const resourceTitle = document.createElement("lable");
        resourceTitle.innerText = resourceName;
        col1.appendChild(checkbox);
        col2.appendChild(resourceTitle);
        table.appendChild(resourceRow);
    }
    const isLoadingElement = document.getElementById("isloading");
    const BlankData = await prepareData("Blank.png", isLoadingElement);
    const NationsData = await prepareData("Nations.png", isLoadingElement);
    const BumpData = await prepareData("Bump.png", isLoadingElement);
    const FoWData = await prepareData("FoW.png", isLoadingElement);
    const worldData = new Uint8ClampedArray(WIDTH * HEIGHT * 4);
    let then = Date.now();
    for (let i = 0; i < worldData.length; i++) {
        //transparent
        if (i % 4 == 3)
            worldData[i] = 255;
        //color channels
        else {
            const thisPixelsAlpha = Math.floor(i / 4) * 4 + 3;
            const isInFog = FoWData[thisPixelsAlpha] != 0;
            if (isInFog)
                worldData[i] = FoWData[i];
            else {
                const pixelHasNation = NationsData[thisPixelsAlpha] != 0;
                if (pixelHasNation)
                    worldData[i] = NationsData[i];
                else
                    worldData[i] = BlankData[i];
                const bumpData255Cap = Math.min((BumpData[i]), 255);
                worldData[i] = lerp(worldData[i], bumpData255Cap, bumpMapOpacity);
            }
        }
        if (i % WIDTH == 0) {
            const now = Date.now();
            if (now - then > 100) {
                reportProgress(i / 4, isLoadingElement);
                await new Promise((resolve) => setTimeout(resolve));
                then = now;
            }
        }
    }
    isLoadingElement.innerText = "";
    const newWorldImage = new ImageData(worldData, WIDTH);
    worldCanvas.getContext("2d").putImageData(newWorldImage, 0, 0);
}
