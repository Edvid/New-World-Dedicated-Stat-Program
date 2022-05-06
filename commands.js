//synonym searching and case correcting alg
function correctAndSynonymCheck(selection) {
    let correctSelection = selection.slice(1).split(".");
    let step = gameStats;
    for (let i = 0; i < correctSelection.length; i++) {
        let found = false;
        for (const propertyName in step) {
            //check same stats but correct casing
            if (propertyName.toLowerCase() == correctSelection[i].toLowerCase().replace(" ", "")) {
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
                        if (synonym.toLowerCase() == correctSelection[i].toLowerCase().replace(" ", "")) {
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
        if (!found) alert("The Specified Stat " + correctSelection[i] + " in " + correctSelection.slice(0, i).join(".") + " was not found!");
    }
    return "." + correctSelection.join(".");
}


function syncNation(nationName) {

    /* #region  copy dailies */
    for (const propertyName in gameStats.Nations[nationName]) {
        const property = gameStats.Nations[nationName][propertyName];
        let regex = new RegExp(`Future.+`)
        if (regex.test(propertyName)) {
            gameStats.Nations[nationName][propertyName.replace("Future", "")] = property;
        }
    }
    /* #endregion */

    /* #region  deal with automatic debt taking */

    //If budget is negative
    if (gameStats.Nations[nationName].Budget < 0) {
        //take -budget in debt, but no more than possible public debt
        let newDebt = min(gameStats.Nations[nationName].PossiblePublicDebt, -gameStats.Nations[nationName].Budget);
        //add it to effective debt
        gameStats.Nations[nationName].PublicDebtTaken = newDebt;
        //the debt taken added into budget
        gameStats.Nations[nationName].Budget += newDebt;
    }
    /* #endregion */
}

function syncNations() {
    for (const nationName in gameStats.Nations) {
        gameStats.Nations[nationName].clearNewTroops();
        syncNation(nationName);
    }
}


function normalCommand(selection) {
    //implement check for stats that are forumulas, and disallow their change
    //
    //
    //


    let value = commandParameters[1];
    let change;
    //If number to change by is written in percent. Divide that number by 100
    if (/[\d|\.].+%$/.test(value)) {
        value = value.replace("%", "") / 100;
    }

    //add
    if (commandParameters[0] == '+' || commandParameters[0] == 'add') {
        change = value;
        (new Function(`gameStats${selection} += ${value}`))();
        addChangeCommandWithColorsProxy(commandParameters, ["lawnGreen", "lawnGreen", "limeGreen"]);
    }
    //subtract
    else if (commandParameters[0] == '-' || commandParameters[0] == 'sub') {
        change = -value;
        (new Function(`gameStats${selection} -= ${value}`))();
        addChangeCommandWithColorsProxy(commandParameters, ["tomato", "tomato", "limeGreen"]);
    }
    //set
    else if (commandParameters[0] == '=' || commandParameters[0] == 'set') {
        const previous = (new Function(`\
            if(typeof gameStats${selection} === 'undefined') return 'undefined';\
            return JSON.parse(JSON.stringify(\
                gameStats${selection}\
            ));`
        ))();
        change = isNaN(previous) ? true : value - previous;

        (new Function(`gameStats${selection} = ${value}`))();
        addChangeCommandWithColorsProxy(commandParameters, ["Gold", "Gold", "limeGreen"]);

    } else {
        alert("At line " + (changeCommandIndex + 1) + "\r\n\r\nOperand wasn't understood: " + commandParameters[0] + ".\r\n Aborting.");
        return;
    }
    specialOperation(selection, change);
}


function createStat(currentSelection, arg){
    let objectClass = "Object";
    if (/^\.Nations$/.test(currentSelection)) objectClass = "Nation";
    if (/^\.(Cultures|Religions)$/.test(currentSelection)) objectClass = "SocialBehaviour";
    if (/^\.Nations\..+\.(Culture|Religion)Groups$/.test(currentSelection)) objectClass = "SocialBehaviourGroup";
    if (/^\.Nations\..+\.Climates$/.test(currentSelection)) objectClass = "Climate";
    if (/^\.(Cultures|Religions)\..+\.Opinions$/.test(currentSelection)) objectClass = "Opinion";
    if (/^\.Trades$/.test(currentSelection)) objectClass = "Trade";
    if (arg.includes('=')) {
        let newName = arg.slice(0, arg.indexOf('=')).trim();
        let oldName = arg.slice(arg.indexOf('=') + 1).trim();
        gameStats.Nations[oldName].evaluateNation(oldName);
        (new Function(`\
        gameStats${currentSelection}.${newName} = new ${objectClass}("${newName}");\
        /* Copy all property values from old to new */\
        for (const propertyName in gameStats${currentSelection}.${oldName}) {\
            if(propertyName == "GovernmentName") continue;\
            const propertyToCopy = gameStats${currentSelection}.${oldName}[propertyName];\
            gameStats${currentSelection}.${newName}[propertyName] = JSON.parse(JSON.stringify(propertyToCopy));\
        }`))();

    } else {
        (new Function(`gameStats${currentSelection}.${arg} = new ${objectClass}("${arg}");`))();
    }
}

function deleteStat(currentSelection, arg){
    let dottedStatName = arg;
    if(/\.|\[/gm.test(dottedStatName[0])) dottedStatName = "." + dottedStatName;
    (new Function(`delete gameStats${currentSelection}${dottedStatName}`))();
}


function addChangeCommandWithColorsProxy(txtArr, colArr){
    if(typeof addChangeCommandWithColors === 'undefined') return;
    return addChangeCommandWithColors(txtArr, colArr);
}