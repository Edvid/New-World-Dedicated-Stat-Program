let commandParameters = [];
let changes;
let changeCommandIndex;
let changeCommandFileLength;

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

let HashMatched = false;

let preloadGameState;
let preloadStatChanges;
(async function () {
    preloadGameState;
    await fetch("./docs/assets/commandChangeFormat/NW7.JSON").then(response => response.json()).then(data => preloadGameState = data);
    preloadStatChanges;
    await fetch("./docs/assets/commandChangeFormat/NW7.ccf").then(response => response.text()).then(data => preloadStatChanges = data);
    //If hash maves in JSON is the same as the hashcode of the entire
    //ccf file. Then the JSON _is_ the state the changes will 
    //genereate, and we can use the State for the gameStats
    HashMatched = preloadGameState.Hash == preloadStatChanges.replace(/\n|\r/gmi, "").hashCode();
    if (HashMatched) {
        gameStats = preloadGameState.State;
        
        refreshNationPageItems();
    }
    else {
        loadChangesFromContent(preloadStatChanges.split(/\r?\n|\r/));
    }
})();

async function loadChangesFromFile(event) {
    var file = event.target.files[0];
    var reader = new FileReader();
    reader.onload = function (e) {
        changes = e.target.result.split(/\r?\n|\r/);
        loadChangesFromContent(changes);
    };

    reader.readAsText(file);
}

const commandRegex = /(?<Operand>([a-z]+)( |\t)|(\+|\=|\-)( |\t)?)(?<Value>(\".+\")|(\{.+\})|(.+?))( |\t)(?<Stat_Name>.+)/i;
let ignore;
let currentSelection;
async function loadChangesFromContent(changes) {
    ignore = false;
    currentSelection = "";
    changeCommandFileLength = changes.length;
    for (changeCommandIndex = 0; changeCommandIndex < changes.length; changeCommandIndex++) {
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
        parameters = parameters.split(/,|>/gm);
        let tradename = parameters[0].trim();
        let giver = parameters[1].trim();
        let reciever = parameters[2].trim();
        let stake = parameters[3].trim().split(/(?<![a-zA-Z])(?=[a-zA-Z])/gm);
        let amount = stake[0].trim();
        let resourceType = stake[1].trim();

        giver = correctAndSynonymCheck(`.Nations.${giver}`).split(".").pop();
        reciever = correctAndSynonymCheck(`.Nations.${reciever}`).split(".").pop();
        resourceType = correctAndSynonymCheck(`.Nations.${giver}.${resourceType}`).split(".").pop();


        if (typeof gameStats.Trades[tradename] !== 'undefined') {
            alert(`The name ${tradename} is already used in Trades.`);
            return;
        }

        gameStats.Trades[tradename] = new Trade();
        gameStats.Trades[tradename].giver = giver;
        gameStats.Trades[tradename].reciever = reciever;
        gameStats.Trades[tradename].resource = resourceType;
        gameStats.Trades[tradename].amount = amount;

        if (typeof spanGroup === 'undefined') return;
        spanGroup[0].style.fontWeight = "bold";
        spanGroup[1].style.fontStyle = "italic";
        spanGroup[3].style.color = "rgb(0, 250, 203)";
        spanGroup[4].style.color = "rgb(0, 250, 203)";
        spanGroup[5].style.color = "rgb(0, 250, 203)";

        spanGroup[7].style.color = "#efc5cb";
        spanGroup[8].style.color = "#efc5cb";

    }
    //pay debt
    else if (changeCommand.toLowerCase().startsWith("pay debt")) {
        let parameter = changeCommand.split(/(?<=pay debt)/gm).pop().trim();
        if (isNaN(parameter)) {
            alert("The debt paid wasn't a number. Operation Aborted.");
            return;
        }

        let splitSelections = correctAndSynonymCheck(currentSelection).split(/\./gi);
        let correctedSelection = "." + splitSelections.join(".");

        if (splitSelections[splitSelections.length - 2] !== 'Nations') {
            alert("The current selection is not a nation. Cannot sync single nation.");
            return;
        }

        let natName = splitSelections[splitSelections.length - 1];

        (new Function(`evaluateNation("${natName}")`))();


        //EffectiveDebt formula isolated for Public Debt Taken 
        //EffectiveDebt = PublicDebtTaken * (1 + InterestRate);
        //EffectiveDebt / (1 + InterestRate)= PublicDebtTaken * (1 + InterestRate) / (1 + InterestRate);
        //PublicDebtTaken = EffectiveDebt / (1 + InterestRate);
        let interestRate = (new Function(`return gameStats${correctedSelection}.InterestRate`))();

        (new Function(`gameStats${correctedSelection}.PublicDebtTaken -= ${parameter} / (1 + ${interestRate})`))();
        (new Function(`gameStats${correctedSelection}.Budget -= ${parameter}`))();

        //excess paid back
        let publicDebtTakenValue = new Function(`return gameStats${correctedSelection}.PublicDebtTaken`);
        if (publicDebtTakenValue < 0) {
            //reset public debt taken to 0
            (new Function(`gameStats${correctedSelection}.PublicDebtTaken -= 0`))();
            //give back to budget
            (new Function(`gameStats${correctedSelection}.Budget += ${-publicDebtTakenValue})`))();
        }
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
        commandParameters = [];
        //If 2 or more instances of tabulator in the string
        if (changeCommand.replace(/[^\t]/g, "").length >= 2) {
            commandParameters = changeCommand.split("\t");
        }
        else {
            let match = commandRegex.exec(changeCommand);
            if (!commandRegex.test(changeCommand)) {
                alert("At line " + (changeCommandIndex + 1) + "\r\n\r\nA command wasn't understood:\r\n" + changeCommand + "\r\n Aborting.");
                return;
            }
            commandParameters[0] = match.groups.Operand.trim();
            commandParameters[1] = match.groups.Value.replace(/^"|"$/, "");

            commandParameters[2] = match.groups.Stat_Name;
        }
        normalCommand(correctAndSynonymCheck(currentSelection + "." + commandParameters[2]));
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
        barctx.strokeRect(0, 0, 100, 20);
        barctx.fillStyle = 'black'
        barctx.fillRect(0, 0, (line / lines) * 100, 20);

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
    } else if (!HashMatched && donegenerating) {
        let loadingFieldTitle = document.createElement("p");
        loadingFieldTitle.innerText = "Download the new JSON file";
        let downloadbuttom = document.createElement("button");
        downloadbuttom.innerText = "Download JSON";
        downloadbuttom.addEventListener('click', () => {
            let jsonobj = {
                Hash: preloadStatChanges.replace(/\n|\r/gmi, "").hashCode(),
                State: gameStats
            };
            let downloadString = JSON.stringify(jsonobj);

            downloadToFile(downloadString, 'my-new-file.txt', 'text/plain');
        });
        loadingField.appendChild(loadingFieldTitle);
        loadingField.appendChild(downloadbuttom);
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