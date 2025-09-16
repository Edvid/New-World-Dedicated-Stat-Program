import { MinMaxGradient } from "../_utility/math.js"

export const hexAsNumToHumanReadableMinMaxGradient = new MinMaxGradient([
  {color: [255, 255, 255, 255], position: 0.0},
  {color: [255, 0, 0, 255], position: 0.25},
  {color: [255, 255, 0, 255], position: 0.5},
  {color: [0, 255, 0, 255], position: 0.75},
  {color: [0, 64, 0, 255], position: 1.0},
]);

export const maxPopInPixel = 50000;

