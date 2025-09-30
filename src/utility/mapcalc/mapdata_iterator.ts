import { ImageIndexToIntColor, IntColorToRGBA } from "../color_manipulation.js";
import { WIDTH, HEIGHT } from "../images/consts.js";
import { type Byte } from "../int_range.js";
import { reportProgress } from "../report_progress.js";

export async function mapDataIterator(
  delegate: (number, maps: ImageDataArray[]) => [Byte, Byte, Byte, Byte],
  maps: ImageDataArray[],
  progressElement: HTMLElement,
) {
  const ret = new Uint8ClampedArray(WIDTH * HEIGHT * 4);

  let then = Date.now();
  for (let i = 0; i < ret.length / 4; i++) {
    const res = delegate(i * 4, maps);
    ret[i * 4] = res[0];
    ret[i * 4 + 1] = res[1];
    ret[i * 4 + 2] = res[2];
    ret[i * 4 + 3] = res[3];
    if (i % WIDTH == 0) {
      const now = Date.now();
      if (now - then > 100) {
        reportProgress(i, progressElement);
        await new Promise((resolve) => setTimeout(resolve));
        then = now;
      }
    }
  }

  return ret;
}

export function reverseRBGsOfMap(mapIndex: number, maps: ImageDataArray[]) {
  return [
    255 - maps[0][mapIndex],
    255 - maps[0][mapIndex + 1],
    255 - maps[0][mapIndex + 2],
    maps[0][mapIndex + 3],
  ] as [Byte, Byte, Byte, Byte];
}

export function twoMapMerger(mapIndex: number, maps: ImageDataArray[]) {
  const pixelValueInFirstMapAsInt = ImageIndexToIntColor(maps[0], mapIndex);
  const pixelGreyScaleValueInSecondMapAsUnitScalar =
    (maps[1][mapIndex] as Byte) / 255;
  const ret =
    pixelValueInFirstMapAsInt * pixelGreyScaleValueInSecondMapAsUnitScalar;

  return IntColorToRGBA(ret);
}
