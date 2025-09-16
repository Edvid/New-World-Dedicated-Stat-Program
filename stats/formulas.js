import { MinMaxGradient } from "../_utility/math.js"

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

