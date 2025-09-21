import { error, suppressWarning } from "../utility/custom_errors.js";
import { correctAndSynonymCheck } from "../utility/selectors.js";
import { hashCode } from "../utility/string_manipulation.js";
import { evaluateNations, syncNation, syncNations } from "../stats/formulas.js";
import { getGameStats, setGameStats, } from "../stats/gameStats.js";
import { createStat, deleteStat, normalCommand, renameStat, Shorthands } from "./commands.js";
let changeCommandIndex;
let changesLength;
let HashMatchedTill = 0;
let preloadGameState;
let preloadStatChanges;
export async function loadGameFromSafeFile() {
    await fetch("../../docs/assets/gamestats/safefile.json").then(response => response.json()).then(data => preloadGameState = data);
    await fetch("../../docs/assets/gamestats/statchanges.ccf").then(response => response.text()).then(data => preloadStatChanges = data);
    //If hash in JSON is the same as the hashcode of the entire
    //ccf file. Then the JSON _is_ the state the changes will 
    //genereate, and we can use the State for the gameStats
    let jsonhash = preloadGameState.Hash;
    let ccfhash = hashCode(preloadStatChanges.split(/\r?\n/gmi).slice(0, preloadGameState.Lines).join(""));
    HashMatchedTill = jsonhash == ccfhash ? preloadGameState.Lines : 0;
    if (HashMatchedTill > 0)
        setGameStats(preloadGameState.State);
    await loadChangesFromContent(preloadStatChanges.split(/\r?\n|\r/), HashMatchedTill);
}
const normalCommandRegex = /(?<Operand>add|\+|sub|-|set|=) *(?<Value>(\*?\d*\.?\d+%?)|(".*")|( .*? ))(?<StatName>.+)/i;
let ignore;
let currentSelection;
export async function loadChangesFromContent(changes, skip) {
    ignore = false;
    currentSelection = "";
    changesLength = changes.length;
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
    evaluateNations();
    errorsPresentAtCompletion();
}
export function getChangeCommandIndex() {
    return changeCommandIndex;
}
export function getChangesLength() {
    return changesLength;
}
export function preloadedStatChangesHashCode() {
    return hashCode(preloadStatChanges.replace(/\r?\n/gmi, ""));
}
function errorsPresentAtCompletion() {
    const gameStats = getGameStats();
    Object.keys(gameStats.Trades).forEach(tradeName => {
        let trade = gameStats.Trades[tradeName];
        let nationNames = Object.keys(gameStats.Nations);
        //if either the giver or the receiver in the given trade, is not a name found among nations
        if (nationNames.indexOf(trade.giver) == -1) {
            alert(`The treaty '${tradeName}' has ${trade.giver} as its giver. This is not a nation. Investigate this`);
        }
        else if (nationNames.indexOf(trade.receiver) == -1) {
            alert(`The treaty '${tradeName}' has ${trade.receiver} as its receiver. This is not a nation. Investigate this`);
        }
    });
}
let commentblockregex = /(?<!\\)"""/i;
async function evaluteChangeCommand(changeCommandRaw) {
    let changeCommand = changeCommandRaw.split(/(?<!\\)#/i)[0].trim();
    if (commentblockregex.test(changeCommandRaw)) {
        ignore = !ignore;
    }
    if (ignore)
        return;
    //empty
    if (changeCommand.toLowerCase().trim() == "") {
        return;
    }
    //suppress
    else if (/!suppress/.test(changeCommand)) {
        let match = changeCommand.match(/!suppress ?(\d+)$/);
        if (match)
            suppressWarning(match[1]);
        else
            suppressWarning();
    }
    //sync
    else if (changeCommand.toLowerCase().startsWith("sync")) {
        if (changeCommand.includes("<")) {
            evaluateNations();
            let lastselection = correctAndSynonymCheck(currentSelection).split(/\./gi);
            if (lastselection[lastselection.length - 2] !== 'Nations')
                error("The current selection is not a nation. Cannot sync single nation.");
            lastselection = lastselection[lastselection.length - 1];
            syncNation(lastselection);
        }
        else {
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
        Shorthands.PayDebt(correctAndSynonymCheck(currentSelection), parameter);
    }
    //move
    else if (changeCommand.toLowerCase().startsWith("move")) {
        let parameter = changeCommand.split(/(?<=move)/gm).pop().trim();
        Shorthands.Move(currentSelection, parameter);
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
    //renaming
    else if (changeCommand.slice(0, 3) == "<=>") {
        let arg = changeCommand.slice(3).trim();
        renameStat(correctAndSynonymCheck(currentSelection), arg);
    }
    //Selection and deselections
    else if (changeCommand[0] == '>' || changeCommand[0] == '<') {
        let cc = changeCommand;
        let cutback = function (str) {
            let index = str.slice(1).search(/<|>/) + 1;
            if (index == 0)
                return "";
            return str.slice(index);
        };
        while (cc.length > 0) {
            cc.trim();
            //selection
            if (cc[0] == '>') {
                let arg = cc.slice(1);
                let index = arg.search(/<|>/);
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
                }
                else {
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
        let match = normalCommandRegex.exec(changeCommand);
        if (!normalCommandRegex.test(changeCommand)) {
            error(`A command wasn't understood:
              ${changeCommand}
              Aborting.`);
            return;
        }
        const operand = match.groups.Operand.trim();
        const value = match.groups.Value.replace(/^"|"$/g, "");
        const statName = match.groups.StatName;
        normalCommand(operand, correctAndSynonymCheck(currentSelection + "." + statName), value);
    }
}
