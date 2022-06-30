
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

let warnSuppress = 0;

function suppressWarning(){
    warnSuppress = changeCommandIndex + 1;
}

function warn(message){
    if(warnSuppress == changeCommandIndex) return;
    alert(`WARNING At line ${(changeCommandIndex + 1)}:

${message}`)
}

function error(message){
    alert(`ERROR At line ${(changeCommandIndex + 1)}:

${message}`)
}

function lazyerror(){
    alert(`ERROR At line ${(changeCommandIndex + 1)}
but the source of the ERROR could have occured earlier:

${message}`)
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

let step;
//synonym searching and case correcting alg
function correctAndSynonymCheck(selection) {
    let correctSelection = selection.slice(1).split(".");
    step = gameStats;
    for (let i = 0; i < correctSelection.length; i++) {
        correctSelection[i] = matchToken(correctSelection[i]);
        step = eval(`step.${correctSelection[i]}`);
    }
    return "." + correctSelection.join(".");
}

function matchToken(approxName){
    let nameToCheck = approxName.toLowerCase().replaceAll(" ", "")
    
    //check same stats but correct casing
    for (const propertyName in step) {
        if (propertyName.toLowerCase() == nameToCheck)
            return propertyName;
    }
    //check synonyms of stats
    for (const realName in Synonyms) {
        const synonymArray = Synonyms[realName];
        for (let j = 0; j < synonymArray.length; j++) {
            const synonym = synonymArray[j];
            //if what was written in change file exists in the synonym dictionary
            if (synonym.toLowerCase() == nameToCheck) {
                //Then, if the real name for the stat exists in this object
                if(realName in step) return realName;
            }
        }
    }    
    alert(`Line ${changeCommandIndex}: The Specified Stat '${approxName}' in '${currentSelection}' was not found!`);
}