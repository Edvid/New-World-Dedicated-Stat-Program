import { WIDTH, HEIGHT } from "../_utility/images/consts.js";

export function reportProgress(i, displayingElement) {
    let progressPercent = (i / (WIDTH * HEIGHT)) * 100;
    progressPercent = progressPercent.toFixed(2);
    let percentDisplay = progressPercent + "%";

    if (Math.floor(i / WIDTH) > 0)
        displayingElement.innerText = displayingElement.innerText.replace(/\n\n.+$/, "");

    displayingElement.innerText += "\n\n" + percentDisplay;
}
