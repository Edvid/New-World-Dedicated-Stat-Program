import { trimIndents } from "../utility/string_manipulation.js";
import { getChangeCommandIndex } from "../gameloading/loadChangesFromFile.js";
let warnSuppress = 0;
export function suppressWarning(linesToSuppressParam) {
    const linesToSuppress = linesToSuppressParam ?? 1;
    warnSuppress = getChangeCommandIndex() + linesToSuppress;
}
export function warn(message) {
    const changeCommandIndex = getChangeCommandIndex();
    if (warnSuppress >= changeCommandIndex)
        return;
    alert(`WARNING At line ${changeCommandIndex + 1}:

${message}`);
}
export function error(message) {
    alert(trimIndents(`ERROR At line ${getChangeCommandIndex() + 1}:

${message}`));
}
export function lazyerror(message) {
    alert(`ERROR At line ${getChangeCommandIndex() + 1}
but the source of the ERROR could have occured earlier:

${message}`);
}
