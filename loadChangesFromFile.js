let commandParameters = {};
let changes;
let changeCommandIndex;
let changeCommandFileLength;

let HashMatchedTill = 0;

let preloadGameState;
let preloadStatChanges;
(async function () {
    preloadGameState;
    await fetch("./docs/assets/commandChangeFormat/NW7.json").then(response => response.json()).then(data => preloadGameState = data);
    preloadStatChanges;
    await fetch("./docs/assets/commandChangeFormat/NW7.ccf").then(response => response.text()).then(data => preloadStatChanges = data);
    //If hash in JSON is the same as the hashcode of the entire
    //ccf file. Then the JSON _is_ the state the changes will 
    //genereate, and we can use the State for the gameStats
    let jsonhash = preloadGameState.Hash;
    let ccfhash = preloadStatChanges.split(/\r?\n/gmi).slice(0, preloadGameState.Lines).join("").hashCode();
    
    HashMatchedTill = jsonhash == ccfhash ? preloadGameState.Lines : 0;


    if (HashMatchedTill > 0) gameStats = preloadGameState.State;
    loadChangesFromContent(preloadStatChanges.split(/\r?\n|\r/), HashMatchedTill);
    
})();

async function loadChangesFromFile(event) {
    var file = event.target.files[0];
    var reader = new FileReader();
    reader.onload = function (e) {
        changes = e.target.result.split(/\r?\n|\r/);
        loadChangesFromContent(changes, 0);
    };

    reader.readAsText(file);
}

const normalCommandRegex = /(?<Operand>add|\+|sub|-|set|=) *(?<Value>(\*?\d*\.?\d+%?)|(\".*\")|( .*? ))(?<StatName>.+)/i;
let ignore;
let currentSelection;
async function loadChangesFromContent(changes, skip) {
    ignore = false;
    currentSelection = "";
    changeCommandFileLength = changes.length;
    for (changeCommandIndex = skip; changeCommandIndex < changes.length; changeCommandIndex++) {
        const changeCommand = changes[changeCommandIndex];
        evaluteChangeCommand(changeCommand);
        if (changeCommandIndex % 50 == 0) await new Promise(resolve => setTimeout(resolve));
    }

    refreshNationPageItems();
}

function refreshNationPageItems() {
    evaluateNations();

    if (typeof updateDropdownSelection !== 'undefined') updateDropdownSelection();
    if (typeof createNationSheet !== 'undefined') {
        currentNationName = Object.keys(gameStats.Nations)[0];
        createNationSheet(currentNationName);
    }
    if(typeof onLoadStatTradeZoneWealth !== 'undefined') onLoadStatTradeZoneWealth();
    if (typeof loadAllTrades !== 'undefined') loadAllTrades();
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
    //sync
    else if (changeCommand.toLowerCase().startsWith("sync")) {

        if (changeCommand.includes("<")) {
            evaluateNations();

            let lastselection = correctAndSynonymCheck(currentSelection).split(/\./gi);
            if (lastselection[lastselection.length - 2] !== 'Nations') alert("The current selection is not a nation. Cannot sync single nation.");
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
                alert("At line " + (changeCommandIndex + 1) + "\r\n\r\nA command wasn't understood:\r\n" + changeCommand + "\r\n Aborting.");
                return;
            }
            commandParameters.Operand = match.groups.Operand.trim();
            commandParameters.Value = match.groups.Value.replace(/^"|"$/g, "");

            commandParameters.StatName = match.groups.StatName;
        }
        normalCommand(correctAndSynonymCheck(currentSelection + "." + commandParameters.StatName));
    }
}

let donegenerating = false;
let showingdownloadoption = false;

async function displayProgress() {
    if (showingdownloadoption) return;
    if (typeof loadingField === 'undefined') return;

    let lines = changeCommandFileLength;
    let line = changeCommandIndex;



    loadingField.innerHTML = "";
    if (lines > line) {
        let loadingFieldTitle = document.createElement("p");
        loadingFieldTitle.innerText = "Generating All nation Stats...";

        let bar = document.createElement("canvas");
        bar.width = 100;
        bar.height = 20;
        let barctx = bar.getContext("2d");

        barctx.lineWidth = 3;
        barctx.fillStyle = 'green'
        barctx.fillRect(0, 0, (HashMatchedTill / lines) * 100, 20);
        barctx.fillStyle = 'black'
        barctx.fillRect((HashMatchedTill / lines) * 100, 0, ((line - HashMatchedTill) / lines) * 100, 20);
        barctx.strokeRect(0, 0, 100, 20);

        let loadingText = document.createElement("p");
        loadingText.style.fontStyle = "Italic";
        loadingText.style.fontSize = "12px";
        loadingText.style.color = "grey";
        loadingText.innerText = `line ${line} / ${lines} lines loaded`;
        loadingField.appendChild(loadingFieldTitle);
        loadingField.appendChild(loadingFieldTitle);
        loadingField.appendChild(bar);
        loadingField.appendChild(loadingText);
        if(lines == lines && line > 0) donegenerating = true;
    } else if (HashMatchedTill != changeCommandFileLength && donegenerating) {
        let loadingFieldTitle = document.createElement("p");
        loadingFieldTitle.innerText = "Download the new JSON file";
        let downloadbutton = document.createElement("button");
        downloadbutton.innerText = "Download JSON";
        downloadbutton.addEventListener('click', () => {
            let jsonobj = {
                Lines: changeCommandFileLength, 
                Hash: preloadStatChanges.replace(/\r?\n/gmi, "").hashCode(),
                State: gameStats
            };
            let downloadString = JSON.stringify(jsonobj, null, 4);

            downloadToFile(downloadString, 'NW7.json', 'application/json');
        });
        loadingField.appendChild(loadingFieldTitle);
        loadingField.appendChild(downloadbutton);
        showingdownloadoption = true;
    }
}

/* #region  taken from blog https://robkendal.co.uk/blog/2020-04-17-saving-text-to-client-side-file-using-vanilla-js */
const downloadToFile = (content, filename, contentType) => {
    const a = document.createElement('a');
    const file = new Blob([content], { type: contentType });

    a.href = URL.createObjectURL(file);
    a.download = filename;
    a.click();

    URL.revokeObjectURL(a.href);
};
/* #endregion */

setInterval(displayProgress, 30);