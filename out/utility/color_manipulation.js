export function RGBAToHex(color) {
    const r = color[0];
    const g = color[1];
    const b = color[2];
    if (r > 255 || g > 255 || b > 255)
        throw "Invalid color component";
    let str = ((r << 16) | (g << 8) | b).toString(16);
    while (str.length < 6)
        str = "0" + str;
    return str;
}
export function ImageIndexToRGBA(arr, index) {
    if (typeof arr != "function") {
        return [
            arr[index],
            arr[index + 1],
            arr[index + 2],
            arr[index + 3],
        ];
    }
    return [arr(index), arr(index + 1), arr(index + 2), arr(index + 3)];
}
export function ImageIndexToIntColor(imgArr, pIndex) {
    const pixel = ImageIndexToRGBA(imgArr, pIndex);
    if (pixel[3] < 128)
        return; //if transparent, abort
    let pixelVal = pixel[0];
    pixelVal *= 255;
    pixelVal += pixel[1];
    pixelVal *= 255;
    pixelVal += pixel[2];
    return pixelVal;
}
export function IntColorToRGBA(num) {
    const ret = [
        NumModToByte(Math.floor(num / 65536)),
        NumModToByte(Math.floor(num / 256)),
        NumModToByte(num),
        255,
    ];
    return ret;
}
function NumModToByte(num) {
    return num % 256;
}
export function RGBAtoRGB(arr) {
    return [arr[0], arr[1], arr[2]];
}
