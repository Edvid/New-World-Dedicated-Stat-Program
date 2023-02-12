let canvasContainer;
let canvasZoomScale = 1;

const WIDTH = 8192;
const HEIGHT = 3365;

document.querySelector("body").onload = async function () {
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
    for (const resource in overlapProperties) {
        const resourceName = overlapProperties[resource];
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

    let BlankData = await prepareData("Blank.png");
    let NationsData = await prepareData("Nations.png");
    let BumpData = await prepareData("Bump.png");
    let FoWData = await prepareData("FoW.png");


    let worldData = new Uint8ClampedArray(WIDTH * HEIGHT * 4);
    for(let i = 0; i < worldData.length; i++){
        //transparent
        if(i % 4 == 3) worldData[i] = 255;
        //color channels
        else {
            const thisPixelsAlpha = Math.ceil(i / 4) * 4 - 1;
            
            worldData[i] = FoWData[thisPixelsAlpha] != 0 ? 
                FoWData[i] : 
                (NationsData[thisPixelsAlpha] != 0 ? 
                    NationsData[i] : 
                    BlankData[i])
                * BumpData[i] * (75 / 255) / 255;
        }
    }
    const newWorldImage = new ImageData(worldData, WIDTH);
    worldCanvas.getContext("2d").putImageData(newWorldImage, 0, 0);
}
