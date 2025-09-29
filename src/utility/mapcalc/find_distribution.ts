import { RGBAToHex, ImageIndexToIntColor } from "../color_manipulation.js";
import { WIDTH, HEIGHT } from "../images/consts.js";
import { type Byte } from "../int_range.js";
import { type colorProperty } from "./color_properties.js";
import { reportProgress } from "../report_progress.js";
import { error } from "../custom_errors.js";

type adjustMappingType = boolean;

interface QueryElements {
  promptMissingInfoContainer: HTMLElement;
  promptLabel: HTMLElement;
  promptField: HTMLInputElement;
  promptedMissingInfoCanvas: HTMLCanvasElement;
  promptSubmitButton: HTMLButtonElement;
  mapToDrawOn: ImageDataArray;
}

export type ReportingElements = {
  progressElement: HTMLElement;
  addToTextOutput: (string) => void;
} & QueryElements;

export async function findDistribution(
  outerDataset: ImageDataArray | ((index: number) => Byte),
  innerDataset: ImageDataArray | ((index: number) => Byte),
  outerName: string,
  innerName: string,
  colorToOuterNameMapping: colorProperty[],
  colorToInnerNameMapping: colorProperty[] | ((index: string) => colorProperty),
  reportingElements: ReportingElements,
  options: {
    pixelCount?: number;
    skipsTransparentInner?: boolean;
    unnamedGroup?: boolean;
    canIgnoreTransparentInner?: boolean;
  } & (
    | {
        valueMode: "RGBAsNum" | "greyScale";
        unassignedPixelAssumption: number;
      }
    | {
        valueMode: "normal";
        unassignedPixelAssumption: string;
      }
  ) & {
      adjustForAlpha?: boolean;
      Adjuster?: ImageDataArray | ((index: number) => Byte);
      AdjusterMapping?: (val: number) => adjustMappingType;
    },
) {
  const ret: Record<string, Record<string, number>> | Record<string, number> =
    {};
  let pixelCount = WIDTH * HEIGHT;
  if (options.pixelCount) {
    pixelCount = options.pixelCount;
  }

  let getOuterDataPoint: (index: number) => Byte;
  let getInnerDataPoint: (index: number) => Byte;

  if (isDatasetImageDataArray(outerDataset))
    getOuterDataPoint = (i) => outerDataset[i] as Byte;
  else getOuterDataPoint = (i) => outerDataset(i);

  if (isDatasetImageDataArray(innerDataset))
    getInnerDataPoint = (i) => innerDataset[i] as Byte;
  else getInnerDataPoint = (i) => innerDataset(i);

  reportingElements.progressElement.innerText = `counting ${innerName}s in ${outerName}s`;
  let then = Date.now();
  for (let i = 0; i < pixelCount; i++) {
    const x = i % WIDTH;
    const y = Math.floor(i / WIDTH);

    //let the site know you're still alive
    const now = Date.now();
    if (now - then > 100) {
      await reportProgress(i, reportingElements.progressElement);
      await new Promise((resolve) => setTimeout(resolve));
      then = now;
    }

    const isOuterDataEmpty = getOuterDataPoint(i * 4 + 3) == 0;
    const isInnerDataEmpty = getInnerDataPoint(i * 4 + 3) == 0;

    //if the pixel in outerDataset is transparent, skip
    if (isOuterDataEmpty) continue;
    //if the pixel in innerDataset is transparent, warn
    else if (isInnerDataEmpty) {
      if (options.skipsTransparentInner) continue;
      else if (!options.canIgnoreTransparentInner)
        console.warn(
          `The pixel (${x}, ${y}) is transparent in the ${innerName} image, but not the ${outerName} image. It is (${getOuterDataPoint(i * 4)}, ${getOuterDataPoint(i * 4 + 1)}, ${getOuterDataPoint(i * 4 + 2)}, ${getOuterDataPoint(i * 4 + 3)}) in the ${outerName} image. Investigate this. For now ${options.unassignedPixelAssumption} is assumed`,
        );
    }

    const outerCol = RGBAToHex([
      getOuterDataPoint(i * 4),
      getOuterDataPoint(i * 4 + 1),
      getOuterDataPoint(i * 4 + 2),
    ]);
    const innerCol = RGBAToHex([
      getInnerDataPoint(i * 4),
      getInnerDataPoint(i * 4 + 1),
      getInnerDataPoint(i * 4 + 2),
    ]);

    let foundOuterObject = colorToOuterNameMapping.find(
      (element) =>
        element.color.toString().toLowerCase() ==
        outerCol.toString().toLowerCase(),
    );

    if (typeof foundOuterObject === "undefined") {
      foundOuterObject = await PromptName(
        outerCol,
        getOuterDataPoint,
        outerName,
        reportingElements,
      );
      reportingElements.addToTextOutput(`= "${foundOuterObject.color}" ${outerName}s.${foundOuterObject.name}.Color\n`);
      colorToOuterNameMapping.push(foundOuterObject);
    }

    const outerNameOfPixel = foundOuterObject.name;

    function adjustments() {
      if (!options.adjustForAlpha && !options.Adjuster) return 1;
      else if (options.Adjuster) {
        const rawMultiplier = ImageIndexToIntColor(options.Adjuster, i * 4);
        const multiplier = options.AdjusterMapping
          ? options.AdjusterMapping(rawMultiplier)
            ? 1
            : 0
          : rawMultiplier;
        return multiplier;
      } else if (options.adjustForAlpha) {
        const alpha = getInnerDataPoint(i * 4 + 3);
        return alpha;
      }
    }

    if (
      !isValueModeNormal(options.valueMode, ret) &&
      options.valueMode == "greyScale"
    ) {
      const innerGreyScale = getInnerDataPoint(i * 4);
      const innerPixelValue = isInnerDataEmpty
        ? options.unassignedPixelAssumption
        : innerGreyScale;

      if (typeof ret[outerNameOfPixel] === "undefined")
        ret[outerNameOfPixel] = 0;

      const mult = adjustments();
      ret[outerNameOfPixel] += innerPixelValue * mult;

      if (isNaN(ret[outerNameOfPixel])) debugger;
    } else if (
      !isValueModeNormal(options.valueMode, ret) &&
      options.valueMode == "RGBAsNum"
    ) {
      const InnerPixelValue = isInnerDataEmpty
        ? options.unassignedPixelAssumption
        : ImageIndexToIntColor(innerDataset, i * 4);

      if (typeof ret[outerNameOfPixel] === "undefined")
        ret[outerNameOfPixel] = 0;

      const mult = adjustments();
      ret[outerNameOfPixel] += InnerPixelValue * mult;
    } else if (
      isValueModeNormal(options.valueMode, ret) &&
      options.valueMode == "normal"
    ) {
      let foundInnerObject: colorProperty;
      let InnerNameOfPixel: string;
      if (isColorPropertyArray(colorToInnerNameMapping)) {
        foundInnerObject = isInnerDataEmpty
          ? { color: innerCol, name: options.unassignedPixelAssumption }
          : !options.unnamedGroup
            ? colorToInnerNameMapping.find(
                (element) =>
                  element.color.toString().toLowerCase() ==
                  innerCol.toString().toLowerCase(),
              )
            : { color: innerCol, name: "Col" + innerCol };
        if (typeof foundInnerObject === "undefined") {
          foundInnerObject = await PromptName(
            innerCol,
            getInnerDataPoint,
            innerName,
            reportingElements,
          );
          reportingElements.addToTextOutput(`= "${foundInnerObject.color}" ${innerName}s.${foundInnerObject.name}.Color\n`);
          if (!options.unnamedGroup)
            colorToInnerNameMapping.push(foundInnerObject);
        }
        InnerNameOfPixel = foundInnerObject.name;
      } else {
        InnerNameOfPixel = colorToInnerNameMapping(innerCol).name;
      }
      if (typeof ret[outerNameOfPixel] === "undefined")
        ret[outerNameOfPixel] = {};
      if (typeof ret[outerNameOfPixel][InnerNameOfPixel] === "undefined")
        ret[outerNameOfPixel][InnerNameOfPixel] = 0;

      const mult = adjustments();
      ret[outerNameOfPixel][InnerNameOfPixel] += 1 * mult;
    } else {
      error(
        "valueMode was found to be undefined. This should not have been able to happen. Report this to admins",
      );
    }
  }

  return ret;
}

function isDatasetImageDataArray(
  dataset: ImageDataArray | ((index: number) => Byte),
): dataset is ImageDataArray {
  return typeof dataset != "function";
}

function isColorPropertyArray(
  colProps: colorProperty[] | ((index: string) => colorProperty),
): colProps is colorProperty[] {
  return typeof colProps != "function";
}

export function isValueModeNormal(
  valueMode: "RGBAsNum" | "greyScale" | "normal",
  returnObject: Record<string, Record<string, number>> | Record<string, number>,
): returnObject is Record<string, Record<string, number>> {
  return valueMode == "normal";
}

async function PromptName(
  color: string,
  getDatasetPointFunction: (index: number) => Byte,
  name: string,
  queryElements: QueryElements,
) {
  const DatasetLength = WIDTH * HEIGHT * 4;

  const dat = new Uint8ClampedArray(DatasetLength);
  for (let j = 0; j < DatasetLength; j++) {
    dat[j] = getDatasetPointFunction(j);
  }
  for (let j = 0; j < dat.length / 4; j++) {
    if (
      RGBAToHex([
        getDatasetPointFunction(j * 4),
        getDatasetPointFunction(j * 4 + 1),
        getDatasetPointFunction(j * 4 + 2),
      ]) == color
    ) {
      dat[j * 4] = getDatasetPointFunction(j * 4);
      dat[j * 4 + 1] = getDatasetPointFunction(j * 4 + 1);
      dat[j * 4 + 2] = getDatasetPointFunction(j * 4 + 2);
      dat[j * 4 + 3] = getDatasetPointFunction(j * 4 + 3);
    } else {
      dat[j * 4] = queryElements.mapToDrawOn[j * 4];
      dat[j * 4 + 1] = queryElements.mapToDrawOn[j * 4 + 1];
      dat[j * 4 + 2] = queryElements.mapToDrawOn[j * 4 + 2];
      dat[j * 4 + 3] = queryElements.mapToDrawOn[j * 4 + 3];
    }
  }

  const retName = await promptMap(
    dat,
    queryElements,
    `The color #${color} did not have a matching ${name}. Which ${name} is it?\n(Give the name it has in stats)`,
  );

  const ret: colorProperty = {
    color: color,
    name: retName,
  };

  return ret;
}

async function promptMap(
  imgArray: ImageDataArray,
  queryElements: QueryElements,
  msg: string,
) {
  let submitted = false;
  queryElements.promptMissingInfoContainer.hidden = false;
  queryElements.promptLabel.innerText = msg;

  queryElements.promptedMissingInfoCanvas
    .getContext("2d")
    .putImageData(new ImageData(imgArray, WIDTH), 0, 0);

  console.log("ok, just waiting now :)");

  queryElements.promptSubmitButton.addEventListener("click", function () {
    submitted = true;
    queryElements.promptMissingInfoContainer.hidden = true;
  });

  //idle until cultureNamePrompt answered;
  let then = Date.now();
  while (!submitted) {
    const now = Date.now();
    if (now - then > 17) {
      await new Promise((resolve) => setTimeout(resolve));
      then = now;
    }
  }

  return queryElements.promptField.value;
}
