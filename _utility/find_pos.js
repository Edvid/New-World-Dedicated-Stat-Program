/* #region  taken from https://stackoverflow.com/questions/6735470/get-pixel-color-from-canvas-on-mousemove, answer by Wayne and Woold */
export function findPos(obj) {
    var curleft = 0, curtop = 0;
    if (obj.offsetParent) {
        do {
            curleft += obj.offsetLeft;
            curtop += obj.offsetTop;
            // eslint-disable-next-line no-cond-assign
        } while (obj = obj.offsetParent);
        return { x: curleft, y: curtop };
    }
    return undefined;
}
/* #endregion */
