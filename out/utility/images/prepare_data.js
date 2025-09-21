import { WIDTH, HEIGHT } from "./consts.js";
export async function prepareData(path, progressTextElement) {
    let tempCanvas = document.createElement("canvas");
    tempCanvas.width = WIDTH;
    tempCanvas.height = HEIGHT;
    if (progressTextElement != null)
        progressTextElement.innerText = `Loading ${path}`;
    let img = new Image(WIDTH, HEIGHT);
    img.src = `./docs/assets/images/world/${path}`;
    let done = false;
    img.onload = function () {
        tempCanvas.getContext("2d").imageSmoothingEnabled = false;
        tempCanvas.getContext("2d").clearRect(0, 0, WIDTH, HEIGHT);
        tempCanvas.getContext("2d").drawImage(img, 0, 0, WIDTH, HEIGHT);
        done = true;
    };
    while (!done) {
        await new Promise((resolve) => setTimeout(resolve));
    }
    return tempCanvas.getContext("2d").getImageData(0, 0, WIDTH, HEIGHT).data;
}
