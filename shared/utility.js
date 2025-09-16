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

/* #region  taken from blog https://robkendal.co.uk/blog/2020-04-17-saving-text-to-client-side-file-using-vanilla-js */
export const downloadToFile = (content, filename, contentType) => {
    const a = document.createElement('a');
    const file = new Blob([content], { type: contentType });

    a.href = URL.createObjectURL(file);
    a.download = filename;
    a.click();

    URL.revokeObjectURL(a.href);
};
/* #endregion */

export function lerp(a, b, t){
    return a*(1-t) + b*t;
}

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

/* #region  Taken from https://www.w3schools.com/howto/howto_js_collapsible.asp */
export function collapsible_behaviour() {
    var coll = document.getElementsByClassName("collapsible");
    var collitem;

    for (collitem = 0; collitem < coll.length; collitem++) {
        coll[collitem].addEventListener("click", function () {
            this.classList.toggle("active");
            var content = this.nextElementSibling;
            if (content.style.display === "block") {
                content.style.display = "none";
            } else {
                content.style.display = "block";
            }
        });
    }
}
/* #endregion */

export function collapsibleNextSibling() {
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    if (content.style.display === "block") {
        content.style.display = "none";
    } else {
        content.style.display = "block";
    }
}

export function reportProgress(i, progressElement) {
  let progressPercent = (i / (WIDTH * HEIGHT)) * 100;
  progressPercent = progressPercent.toFixed(2);
  let percentDisplay = progressPercent + "%";

  if (Math.floor(i / WIDTH) > 0)
    progressElement.innerText = progressElement.innerText.replace(/\n\n.+$/, "");

  progressElement.innerText += "\n\n" + percentDisplay;
}
