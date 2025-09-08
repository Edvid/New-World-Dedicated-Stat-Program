import { MinMaxGradient } from "../shared/utility.js"

export async function advanceMap(imgArray, formula, options){

  let newImgArray = new Uint8ClampedArray(imgArray.length);

  let then = Date.now();
  for(let i = 0; i < newImgArray.length; i+=4){

    let now = Date.now();
    if (now - then > 2000) {
      await new Promise(resolve => setTimeout(resolve));
      /* mapCCFCalculations.*/reportProgress(i/4);
      then = now;
    }

    let newPixel = formula(imgArray, i, options);

    newImgArray[i] = newPixel[0];
    newImgArray[i + 1] = newPixel[1];
    newImgArray[i + 2] = newPixel[2];
    newImgArray[i + 3] = newPixel[3];
  }

  return newImgArray;
}

export function fetchFour(arr, index){

  
  if(typeof arr != 'function')
  {
    return [
      arr[index],
      arr[index + 1],
      arr[index + 2],
      arr[index + 3]
    ];
  }

  return [
    arr(index),
    arr(index + 1),
    arr(index + 2),
    arr(index + 3)
  ];
}


export const hexAsNumToHumanReadableMinMaxGradient = new MinMaxGradient([
  {color: [255, 255, 255, 255], position: 0.0},
  {color: [255, 0, 0, 255], position: 0.25},
  {color: [255, 255, 0, 255], position: 0.5},
  {color: [0, 255, 0, 255], position: 0.75},
  {color: [0, 64, 0, 255], position: 1.0},
]);

export const maxPopInPixel = 50000;

export function FetchedRGBAsNum(imgArr, pIndex){
  let pixel = fetchFour(imgArr, pIndex);
  if(pixel[3] < 128) return; //if transparent, abort

  let pixelVal = pixel[0];
  pixelVal *= 255;
  pixelVal += pixel[1];
  pixelVal *= 255;
  pixelVal += pixel[2];

  return pixelVal;
}

export function NumAsRGB(num){
  let ret = new Uint8ClampedArray(4);
  ret[3] = 255;
  ret[2] = num % 256;
  ret[1] = Math.floor(num / 256) % 256;
  ret[0] = Math.floor(num / 65536) % 256;
  return ret;
}

