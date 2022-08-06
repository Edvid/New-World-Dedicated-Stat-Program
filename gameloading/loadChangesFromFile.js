let commandParameters = {};
let changes;
let changeCommandIndex;
let changeCommandFileLength;

let HashMatchedTill = 0;

let preloadGameState;
let preloadStatChanges;
(async function () {
    preloadGameState;
    await fetch("./docs/assets/gamestats/safefile.json").then(response => response.json()).then(data => preloadGameState = data);
    preloadStatChanges;
    await fetch("./docs/assets/gamestats/statchanges.ccf").then(response => response.text()).then(data => preloadStatChanges = data);
    //If hash in JSON is the same as the hashcode of the entire
    //ccf file. Then the JSON _is_ the state the changes will 
    //genereate, and we can use the State for the gameStats
    let jsonhash = preloadGameState.Hash;
    let ccfhash = preloadStatChanges.split(/\r?\n/gmi).slice(0, preloadGameState.Lines).join("").hashCode();
    
    HashMatchedTill = jsonhash == ccfhash ? preloadGameState.Lines : 0;


    if (HashMatchedTill > 0) gameStats = preloadGameState.State;
    loadChangesFromContent(preloadStatChanges.split(/\r?\n|\r/), HashMatchedTill);
    
})();

const normalCommandRegex = /(?<Operand>add|\+|sub|-|set|=) *(?<Value>(\*?\d*\.?\d+%?)|(\".*\")|( .*? ))(?<StatName>.+)/i;
let ignore;
let currentSelection;
async function loadChangesFromContent(changes, skip) {
    ignore = false;
    currentSelection = "";
    changeCommandFileLength = changes.length;
    let then = Date.now();
    for (changeCommandIndex = skip; changeCommandIndex < changes.length; changeCommandIndex++) {
        const changeCommand = changes[changeCommandIndex];
        evaluteChangeCommand(changeCommand);
        let now = Date.now();
        if (now - then > 17) {
            await new Promise(resolve => setTimeout(resolve));
            then = now;
        }
            
    }

    refreshNationPageItems();
}

function refreshNationPageItems() {
    evaluateNations();

    if (typeof updateDropdownSelection === 'function') updateDropdownSelection();
    if (typeof createNationSheet === 'function') {
        currentNationName = Object.keys(gameStats.Nations)[0];
        createNationSheet(currentNationName);
    }
    if(typeof onLoadStatTradeZoneWealth === 'function') onLoadStatTradeZoneWealth();
    if (typeof loadAllTrades === 'function') loadAllTrades();
}

let commentblockregex = /(?<!\\)"""/i;
async function evaluteChangeCommand(changeCommandRaw) {
    let changeCommand = changeCommandRaw.split(/(?<!\\)#/i)[0].trim();
    if(commentblockregex.test(changeCommandRaw)){
        ignore = !ignore;
    }
    if(ignore) return;
    //empty
    if(changeCommand.toLowerCase().trim() == ""){
        return;
    }
    //suppress
    else if(/!suppress/.test(changeCommand)){
        suppressWarning();
    }
    //sync
    else if (changeCommand.toLowerCase().startsWith("sync")) {

        if (changeCommand.includes("<")) {
            evaluateNations();

            let lastselection = correctAndSynonymCheck(currentSelection).split(/\./gi);
            if (lastselection[lastselection.length - 2] !== 'Nations') error("The current selection is not a nation. Cannot sync single nation.");
            lastselection = lastselection[lastselection.length - 1];

            syncNation(lastselection);
        } else {
            evaluateNations();
            syncNations();
        }
    }
    //trade
    else if (changeCommand.toLowerCase().startsWith("trade")) {
        let parameters = changeCommand.split(/(?<=trade)/gm).pop();
        Shorthands.Trade(parameters);
    }
    //pay debt
    else if (changeCommand.toLowerCase().startsWith("pay debt")) {
        let parameter = changeCommand.split(/(?<=pay debt)/gm).pop().trim();
        Shorthands.PayDebt(parameter);
    }
    //move
    else if (changeCommand.toLowerCase().startsWith("move")) {
        let parameter = changeCommand.split(/(?<=move)/gm).pop().trim();
        Shorthands.Move(parameter);
    }
    //Creation
    else if (changeCommand.slice(0, 2) == "+>") {
        let arg = changeCommand.slice(2).trim();
        createStat(correctAndSynonymCheck(currentSelection), arg);
    }
    //deletion
    else if (changeCommand.slice(0, 2) == "<-") {
        let arg = changeCommand.slice(2).trim();
        deleteStat(correctAndSynonymCheck(currentSelection), arg);
    }
    //Selection and deselections
    else if (changeCommand[0] == '>' || changeCommand[0] == '<') {
        let cc = changeCommand;
        let cutback = function (str) {
            let index = str.slice(1).search(/\<|\>/) + 1;
            if (index == 0) return ""
            return str.slice(index)
        }
        while (cc.length > 0) {
            cc.trim();
            //selection
            if (cc[0] == '>') {
                let arg = cc.slice(1);
                let index = arg.search(/\<|\>/);
                let selection;
                if (index == -1)
                    selection = arg.trim();
                else
                    selection = arg.slice(0, index).trim();
                currentSelection += "." + selection;
            }
            //deselection
            else if (cc[0] == '<') {

                if (cc.slice(1, 4) == "...") {
                    currentSelection = "";
                } else {
                    if (currentSelection.includes("."))
                        currentSelection = currentSelection.slice(0, currentSelection.lastIndexOf("."));
                    else
                        currentSelection = "";
                }
            }
            cc = cutback(cc);
        }
    }
    //normal commands
    else {
        commandParameters = {};
        //If 2 or more instances of tabulator in the string
        if (changeCommand.replace(/[^\t]/g, "").length >= 2) {
            commandParameters = changeCommand.split("\t");
        }
        else {
            let match = normalCommandRegex.exec(changeCommand);
            if (!normalCommandRegex.test(changeCommand)) {
                error(`A command wasn't understood:
${changeCommand}
Aborting.`);
                return;
            }
            commandParameters.Operand = match.groups.Operand.trim();
            commandParameters.Value = match.groups.Value.replace(/^"|"$/g, "");

            commandParameters.StatName = match.groups.StatName;
        }
        normalCommand(correctAndSynonymCheck(currentSelection + "." + commandParameters.StatName));
    }
}

if(typeof onLoadStatTradeZoneWealth === 'function')
    setInterval(populateAdvancedSettings, 30);