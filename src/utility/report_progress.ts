import { WIDTH, HEIGHT } from "./images/consts.js";

export function reportProgress(i, displayingElement) {
  const progressPercentNum = (i / (WIDTH * HEIGHT)) * 100;
  const progressPercentString = progressPercentNum.toFixed(2);
  const percentDisplay = progressPercentString + "%";

  if (Math.floor(i / WIDTH) > 0)
    displayingElement.innerText = displayingElement.innerText.replace(
      /\n\n.+$/,
      "",
    );

  displayingElement.innerText += "\n\n" + percentDisplay;
}
