import { loadGameFromSafeFile } from "../gameloading/loadChangesFromFile.js";
import { addHeader } from "../shared/header.js";
import { lerp, prepareData, reportProgress } from "../shared/utility.js";
import { mappedResources } from "../stats/gameStats.js";

let canvasContainer;

const WIDTH = 8192;
const HEIGHT = 3365;

const bumpMapOpacity = 0.3;

document.querySelector("body").onload = generateNationsResourcesOverlay();

addHeader()
await loadGameFromSafeFile()


async function generateNationsResourcesOverlay() {
    canvasContainer = document.getElementById("canvascontainer");
    canvasContainer.width = WIDTH;
    canvasContainer.height = HEIGHT;


    
    let worldCanvas = document.createElement("canvas");
    worldCanvas.id = "worldcanvas";
    worldCanvas.width = WIDTH;
    worldCanvas.height = HEIGHT;
    canvasContainer.appendChild(worldCanvas);

    let overlapProperties = [...mappedResources];

    overlapProperties.push("Fertility");

    let resourceMaps = [];
    let table = document.querySelector("tbody");
    for (const resourceName of overlapProperties) {
        resourceMaps[resourceName] = document.createElement("canvas");
        resourceMaps[resourceName].hidden = "true";
        resourceMaps[resourceName].id = "resourcecanvas" + resourceName.toLowerCase();
        resourceMaps[resourceName].width = WIDTH;
        resourceMaps[resourceName].height = HEIGHT;
        canvasContainer.appendChild(resourceMaps[resourceName]);
        let resourceCtx = resourceMaps[resourceName].getContext("2d");
        
        let imagePath = "./docs/assets/images/world/Resources/" + resourceName + ".png";
        let image = new Image(WIDTH, HEIGHT);
        image.src = imagePath;

        resourceCtx.globalAlpha = 180/255;
        image.onload = function () {
            resourceCtx.drawImage(image, 0, 0, WIDTH, HEIGHT);
        }

        let resourceRow = document.createElement("tr");
        let col1 = document.createElement("td");
        let col2 = document.createElement("td");
        resourceRow.appendChild(col1);
        resourceRow.appendChild(col2);


        let checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.onchange = () => {
            let c = document.querySelector("#resourcecanvas" + resourceName.toLowerCase());
            c.hidden = !c.hidden;
        };
        let resourceTitle = document.createElement("lable");
        resourceTitle.innerText = resourceName;

        col1.appendChild(checkbox);
        col2.appendChild(resourceTitle);
        
        table.appendChild(resourceRow);
    }

    const isLoadingElement = document.getElementById("isloading")

    let BlankData = await prepareData("Blank.png", isLoadingElement);
    let NationsData = await prepareData("Nations.png", isLoadingElement);
    let BumpData = await prepareData("Bump.png", isLoadingElement);
    let FoWData = await prepareData("FoW.png", isLoadingElement);

    let worldData = new Uint8ClampedArray(WIDTH * HEIGHT * 4);
    let then = Date.now();
    for(let i = 0; i < worldData.length; i++){
        //transparent
        if(i % 4 == 3) worldData[i] = 255;
        //color channels
        else {
            const thisPixelsAlpha = Math.floor(i / 4) * 4;
            const isInFog = FoWData[thisPixelsAlpha + 3] != 0

            if(isInFog)
                worldData[i] = FoWData[i];
            else {
                const pixelHasNation  =
                NationsData[thisPixelsAlpha] != 0;                
                
                if(pixelHasNation)
                    worldData[i] = NationsData[i];
                else 
                    worldData[i] = BlankData[i];
                
                const bumpData255Cap = Math.min((BumpData[i]), 255);
                worldData[i] = lerp(worldData[i], bumpData255Cap, bumpMapOpacity);
            }    
        }
        if (i % WIDTH == 0) {
          let now = Date.now();
          if (now - then > 100) {
            reportProgress(i/4, isLoadingElement);
            await new Promise((resolve) => setTimeout(resolve));
            then = now;
          }
        }
    }
    isLoadingElement.innerText = "";
    const newWorldImage = new ImageData(worldData, WIDTH);
    worldCanvas.getContext("2d").putImageData(newWorldImage, 0, 0);
}
