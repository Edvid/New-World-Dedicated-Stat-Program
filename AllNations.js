//const { resolve } = require("core-js/fn/promise");

let canvasContainer;
let canvasZoomScale = 1;

const WIDTH = 8192;
const HEIGHT = 3365;

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


async function onLoad() {
    canvasContainer = document.getElementById("canvascontainer");
    canvasContainer.width = WIDTH;
    canvasContainer.height = HEIGHT;

    let layers = [
        "blank",
        "Resources/Iron",
        "FoW",
        "Nations"

    ];

    let canvasMap = document.createElement("canvas");
    canvasMap.id = "worldcanvas";
    canvasMap.width = WIDTH;
    canvasMap.height = HEIGHT;
    canvasContainer.appendChild(canvasMap);
    let ctx = canvasMap.getContext("2d");
    for (const layer in layers) {
        let layername = layers[layer];
        await new Promise((resolve) => {
            let imagePath = "./docs/assets/images/world/" + layername + ".png";
            let image = new Image(WIDTH, HEIGHT);
            image.src = imagePath;
            
            image.onload = function () {
                
                if (/* layername !== 'Nations' */false) {                
                    ctx.globalCompositeOperation = "multiply";
                    ctx.globalCompositeOperation = "destination-in";
                    ctx.drawImage(image, 0, 0, WIDTH, HEIGHT);
                }else{
                    ctx.globalCompositeOperation = "source-over";
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
