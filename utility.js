
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

/* #region  Taken from https://stackoverflow.com/questions/7616461/generate-a-hash-from-string-in-javascript user esmiralha */
String.prototype.hashCode = function () {
    var hash = 0, i, chr;
    if (this.length === 0) return hash;
    for (i = 0; i < this.length; i++) {
        chr = this.charCodeAt(i);
        hash = ((hash << 5) - hash) + chr;
        hash |= 0; // Convert to 32bit integer
    }
    return hash;
};
/* #endregion */


String.prototype.capitalSpacing = function (){
    return this.replace(/(?<=[a-zA-Z])(?=[A-Z1-9])/gm, " ");
}

//synonym searching and case correcting alg
function correctAndSynonymCheck(selection) {
    let correctSelection = selection.slice(1).split(".");
    let step = gameStats;
    for (let i = 0; i < correctSelection.length; i++) {
        let found = false;
        for (const propertyName in step) {
            //check same stats but correct casing
            if (propertyName.toLowerCase() == correctSelection[i].toLowerCase().replaceAll(" ", "")) {
                correctSelection[i] = propertyName;
                step = step[propertyName];
                found = true;
            }
            else {
                //check synonyms of stats
                for (const realName in Synonyms) {
                    const synonymArray = Synonyms[realName];
                    for (let j = 0; j < synonymArray.length; j++) {
                        const synonym = synonymArray[j];
                        //if what was written in change file exists in the synonym dictionary
                        if (synonym.toLowerCase() == correctSelection[i].toLowerCase().replaceAll(" ", "")) {
                            //Then, if the real name for the stat exists in this object
                            if (propertyName.toLowerCase() == realName.toLowerCase()) {
                                correctSelection[i] = realName;
                                step = step[realName];
                                found = true;
                            }
                        }
                        if (found) continue;
                    }
                    if (found) continue;
                }
            }
            if (found) continue;
        }
        if (!found) alert(`Line ${changeCommandIndex}: The Specified Stat '${correctSelection[i]}' in '${correctSelection.slice(0, i).join(".")}' was not found!`);
    }
    return "." + correctSelection.join(".");
}