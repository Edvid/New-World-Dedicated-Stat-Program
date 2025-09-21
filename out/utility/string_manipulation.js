/* #region  Taken from https://stackoverflow.com/questions/7616461/generate-a-hash-from-string-in-javascript user esmiralha */
export function hashCode(str) {
    let hash = 0, i, chr;
    if (str.length === 0)
        return hash;
    for (i = 0; i < str.length; i++) {
        chr = str.charCodeAt(i);
        hash = (hash << 5) - hash + chr;
        hash |= 0; // Convert to 32bit integer
    }
    return hash;
}
/* #endregion */
export function trimIndents(str) {
    return str.valueOf().replace(/( {2}|\t)+/g, "");
}
export function capitalSpacing(str) {
    return str.replace(/(?<=[a-zA-Z])(?=[A-Z1-9])/gm, " ");
}
export function cleanStatName(str) {
    return str.replace(/(\[|"| |\])/gim, "");
}
