let canvasContainer;
let canvasZoomScale = 1;

const WIDTH = 8192;
const HEIGHT = 3365;

document.querySelector("body").onload = async function () {
    canvasContainer = document.getElementById("canvascontainer");
    canvasContainer.width = WIDTH;
    canvasContainer.height = HEIGHT;


    
    let canvasMap = document.createElement("canvas");
    canvasMap.id = "worldcanvas";
    canvasMap.width = WIDTH;
    canvasMap.height = HEIGHT;
    canvasContainer.appendChild(canvasMap);

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


    let layers = [
        "blank",
        "Nations",
        "bump",
        "FoW"

    ];

    let ctx = canvasMap.getContext("2d");
    for (const layer in layers) {
        let layername = layers[layer];
        await new Promise((resolve) => {
            let imagePath = "./docs/assets/images/world/" + layername + ".png";
            let image = new Image(WIDTH, HEIGHT);
            image.src = imagePath;
            
            image.onload = function () {
                ctx.globalCompositeOperation = "source-over";
                ctx.globalAlpha = 1.0;
                
                if (layername == 'Nations') {
                    ctx.globalCompositeOperation = "multiply";
                    ctx.drawImage(image, 0, 0, WIDTH, HEIGHT);
                }else if(layername == 'bump'){
                    ctx.globalAlpha = 75/255;
                    ctx.drawImage(image, 0, 0, WIDTH, HEIGHT);
                }
                else{
                    ctx.drawImage(image, 0, 0, WIDTH, HEIGHT);
                }
                resolve(image);
            }
        })   
    }; 
}

function outZoomChange(zoom) {
    canvasZoomScale *= zoom;

    let canvaslist = document.querySelectorAll("#canvascontainer canvas");

    canvaslist.forEach(element => {
        element.style.width = (WIDTH / canvasZoomScale) + "px";
        element.style.height = (HEIGHT / canvasZoomScale) + "px";
    });


}
