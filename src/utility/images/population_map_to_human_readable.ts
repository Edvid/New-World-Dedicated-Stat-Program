import { ImageIndexToIntColor, ImageIndexToRGBA } from "../color_manipulation.js";
import { Byte } from "../int_range.js";
import { lerp } from "../math.js";

interface Node {
  color: [Byte, Byte, Byte, Byte],
  position: number,
}

class MinMaxGradient {
  nodeList: Node[];
  constructor(nodeList: Node[]) {
    this.nodeList = nodeList.sort((a, b) => a.position - b.position);
  }

  colorAtPos(index) {
    let nodeBefore: Node, nodeAfter: Node;

    for (let i = 0; i < this.nodeList.length; i++) {
      if (this.nodeList[i].position > index) {
        nodeAfter = this.nodeList[i];
        nodeBefore = this.nodeList[Math.max(i - 1, 0)];
        break;
      }
    }

    const t =
      nodeAfter.position == nodeBefore.position
        ? nodeBefore.position
        : (index - nodeBefore.position) /
          (nodeAfter.position - nodeBefore.position);

    const ret: [Byte, Byte, Byte, Byte] = [
      lerp(nodeBefore.color[0], nodeAfter.color[0], t),
      lerp(nodeBefore.color[1], nodeAfter.color[1], t),
      lerp(nodeBefore.color[2], nodeAfter.color[2], t),
      255,
    ];
    return ret;
  }
}
const hexAsNumToHumanReadableMinMaxGradient = new MinMaxGradient([
  {color: [255, 255, 255, 255], position: 0.0},
  {color: [255, 0, 0, 255], position: 0.25},
  {color: [255, 255, 0, 255], position: 0.5},
  {color: [0, 255, 0, 255], position: 0.75},
  {color: [0, 64, 0, 255], position: 1.0},
]);

const maxPopInPixel = 50000;

export function populationMapToHumanReadable(imgArray: ImageDataArray, pixelIndex: number, options: false) {
    const pixelPop = ImageIndexToIntColor(imgArray, pixelIndex);
    //if no return value of RBGAsNum was given, color is just the color it was previously
    const color = pixelPop == null
        ? ImageIndexToRGBA(imgArray, pixelIndex)
        : hexAsNumToHumanReadableMinMaxGradient.colorAtPos(
            pixelPop / maxPopInPixel
        );

    return color;
}
