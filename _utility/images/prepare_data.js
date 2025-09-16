import { WIDTH, HEIGHT } from "../_utility/images/consts";

export async function prepareData(path, progressTextElement) {
  let tempCanvas = document.createElement("canvas");
  tempCanvas.width = WIDTH;
  tempCanvas.height = HEIGHT;

  if (progressTextElement != null)
    progressTextElement.innerText = `Loading ${path}`;

  let Img = new Image(WIDTH, HEIGHT);
  Img.src = `./docs/assets/images/world/${path}`;
  let done = false;
  Img.onload = function () {
    tempCanvas.getContext("2d").imageSmoothingEnabled = false;
    tempCanvas.getContext("2d").clearRect(0, 0, WIDTH, HEIGHT);
    tempCanvas.getContext("2d").drawImage(Img, 0, 0, WIDTH, HEIGHT);

    done = true;
  };

  while (!done) {
    await new Promise((resolve) => setTimeout(resolve));
  }

  return tempCanvas.getContext("2d").getImageData(0, 0, WIDTH, HEIGHT).data;
}
