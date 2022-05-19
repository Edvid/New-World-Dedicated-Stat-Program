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
        "Nations"

    ];

    let allLayers = [];
    let allContexts = []
    layers.forEach(layer => {
        allLayers[layer] = document.createElement("canvas");
        allLayers[layer].id = "worldcanvas";
        allLayers[layer].width = WIDTH;
        allLayers[layer].height = HEIGHT;
        canvasContainer.appendChild(allLayers[layer]);
        allContexts[layer] = allLayers[layer].getContext("2d");
        let imagePath = "./docs/assets/images/world/" + layer + ".png";
        let image = new Image(WIDTH, HEIGHT);
        image.src = imagePath;
        image.onload = function () {
            allContexts[layer].drawImage(image, 0, 0, WIDTH, HEIGHT);
        }
    }); 
}

function outZoomChange(zoom) {
    canvasZoomScale *= zoom;

    let canvaslist = document.querySelectorAll("#canvascontainer canvas");

    canvaslist.forEach(element => {
        element.style.width = (WIDTH / canvasZoomScale) + "px";
        element.style.height = (HEIGHT / canvasZoomScale) + "px";
    });


}
