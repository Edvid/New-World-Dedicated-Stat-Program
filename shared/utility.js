import { WIDTH, HEIGHT } from "../_utility/images/consts.js";

/* #region  taken from https://stackoverflow.com/questions/6735470/get-pixel-color-from-canvas-on-mousemove, answer by Wayne and Woold */
export function findPos(obj) {
    var curleft = 0, curtop = 0;
    if (obj.offsetParent) {
        do {
            curleft += obj.offsetLeft;
            curtop += obj.offsetTop;
        // eslint-disable-next-line no-cond-assign
        } while (obj = obj.offsetParent);
        return { x: curleft, y: curtop };
    }
    return undefined;
}

export function rgbToHex(color) {
    let r = color[0];
    let g = color[1];
    let b = color[2];
    if (r > 255 || g > 255 || b > 255)
        throw "Invalid color component";
    let str = ((r << 16) | (g << 8) | b).toString(16);
    while(str.length < 6) str = "0" + str;
    return str;
}
/* #endregion */

export async function prepareData(path, progressTextElement){
    
    let tempCanvas = document.createElement("canvas");
    tempCanvas.width = WIDTH;
    tempCanvas.height = HEIGHT;    

    if(progressTextElement != null) progressTextElement.innerText = `Loading ${path}`;

    let Img = new Image(WIDTH, HEIGHT);
    Img.src = `./docs/assets/images/world/${path}`;
    let done = false;
    Img.onload = function () {
	    tempCanvas.getContext("2d").imageSmoothingEnabled = false;
	    tempCanvas.getContext("2d").clearRect(0, 0, WIDTH, HEIGHT);
        tempCanvas.getContext("2d").drawImage(Img, 0, 0, WIDTH, HEIGHT);
        
        done = true;
    }

    while(!done){
        await new Promise(resolve => setTimeout(resolve));
    }

    return tempCanvas.getContext("2d").getImageData(0, 0, WIDTH, HEIGHT).data; 
}


