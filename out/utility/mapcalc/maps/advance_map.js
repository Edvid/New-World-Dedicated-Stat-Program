import { reportProgress } from "../../report_progress.js";
export async function advanceMap(imgArray, formula, progressElement, options) {
    const newImgArray = new Uint8ClampedArray(imgArray.length);
    let then = Date.now();
    for (let i = 0; i < newImgArray.length; i += 4) {
        const now = Date.now();
        if (now - then > 2000) {
            await new Promise((resolve) => setTimeout(resolve));
            reportProgress(i / 4, progressElement);
            then = now;
        }
        const newPixel = formula(imgArray, i, options);
        newImgArray[i] = newPixel[0];
        newImgArray[i + 1] = newPixel[1];
        newImgArray[i + 2] = newPixel[2];
        newImgArray[i + 3] = newPixel[3];
    }
    return newImgArray;
}
