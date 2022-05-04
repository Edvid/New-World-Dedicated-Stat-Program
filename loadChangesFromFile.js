let commandParameters = [];
let changes;
let changeCommandIndex;

(async function(){
    let preload;
    await fetch(HOME_ADDRESS + "commandChangeFormat/NW7.ccf").then(response => response.text()).then(data => preload = data);
    preload = preload.split(/\r?\n|\r/);
    loadChangesFromContent(preload);
})();

function loadChangesFromFile(event) {
    var file = event.target.files[0];
    var reader = new FileReader();
    reader.onload = function (e) {
        changes = e.target.result.split(/\r?\n|\r/);
        loadChangesFromContent(changes);
    };

    reader.readAsText(file);
}

function loadChangesFromContent(changes){
    const commandRegex = /(?<Operand>([a-z]+)( |\t)|(\+|\=|\-)( |\t)?)(?<Value>(\".+\")|(\{.+\})|(.+?))( |\t)(?<Stat_Name>.+)/i;
    let ignore = false;
    let currentSelection = "";
    for (changeCommandIndex = 0; changeCommandIndex < changes.length; changeCommandIndex++) {
        const changeCommand = changes[changeCommandIndex].trim();
        //comment
        if (changeCommand[0] == '#' || changeCommand.length == 0 || ignore) {
            if (!ignore) {
                if (changeCommand == "###") {
                    let spn = addChangeCommandWithColorsProxy([changeCommand], ["#5E5E5E"]);
                    if(typeof spn === 'undefined') continue;
                    spn[0].style.fontStyle = "italic";
                    ignore = true;
                } else {
                    addChangeCommandWithColorsProxy([changeCommand], ["grey"]);
                }
                continue;
            } else {
                if (changeCommand.toLowerCase() == "# END".toLowerCase())
                    ignore = false;
                let spn = addChangeCommandWithColorsProxy([changeCommand], ["#5E5E5E"]);
                if(typeof spn === 'undefined') continue;
                spn[0].style.fontStyle = "italic";
                continue;
            }

        }
        //sync
        else if (changeCommand.toLowerCase().startsWith("sync")) {

            if (changeCommand.includes("<")) {
                gameStats.evaluateNations();

                let lastselection = correctAndSynonymCheck(currentSelection).split(/\./gi);
                if(lastselection[lastselection.length - 2] !== 'Nations') alert("The current selection is not a nation. Cannot sync single nation.");
                lastselection = lastselection[lastselection.length - 1];

                syncNation(lastselection);
            } else {
                gameStats.evaluateNations();
                syncNations();
            }
            let spn = addChangeCommandWithColorsProxy([changeCommand], ["MediumSpringGreen"]);
            if(typeof spn === 'undefined') continue;
            spn[0].style.fontWeight = "bold";
        }
        //trade
        else if(changeCommand.startsWith("trade")){
            let parameters = changeCommand.split(/(?<=trade)/gm).pop();
            parameters = parameters.split(/,|>/gm);
            let tradename = parameters[0].trim();
            let giver = parameters[1].trim();
            let reciever = parameters[2].trim();
            let stake = parameters[3].trim().split(/(?<![a-zA-Z])(?=[a-zA-Z])/gm);
            let amount = stake[0].trim();
            let resourceType = stake[1].trim();

            if(typeof gameStats.Trades[tradename] !== 'undefined') {
                alert(`The name ${tradename} is already used in Trades.`);
                continue;    
            }

            gameStats.Trades[tradename] = new Trade();
            gameStats.Trades[tradename].giver = giver;
            gameStats.Trades[tradename].reciever = reciever;
            gameStats.Trades[tradename].resource = resourceType;
            gameStats.Trades[tradename].amount = amount;
            
            let spanGroup = addChangeCommandWithColorsProxy(["trade", tradename, ",", giver, ">", reciever, ",", amount, resourceType], ["MediumSpringGreen"]);
            if(typeof spanGroup === 'undefined') continue;
            spanGroup[0].style.fontWeight = "bold";
            spanGroup[1].style.fontStyle = "italic";
            spanGroup[3].style.color = "rgb(0, 250, 203)";
            spanGroup[4].style.color = "rgb(0, 250, 203)";
            spanGroup[5].style.color = "rgb(0, 250, 203)";
            
            spanGroup[7].style.color = "#efc5cb";
            spanGroup[8].style.color = "#efc5cb";

        }
        //Creation
        else if (changeCommand.slice(0, 2) == "+>") {
            let arg = changeCommand.slice(2).trim();
            createStat(currentSelection, arg);
            addChangeCommandWithColorsProxy([changeCommand], ["magenta"]);
        }
        else if (changeCommand.slice(0, 2) == "<-"){
            let arg = changeCommand.slice(2).trim();
            deleteStat(currentSelection, arg);
            addChangeCommandWithColorsProxy([changeCommand], ["#ff00a0"]);
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
            addChangeCommandWithColorsProxy([changeCommand], ["dodgerBlue"]);
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
                    continue;
                }
                commandParameters[0] = match.groups.Operand.trim();
                commandParameters[1] = match.groups.Value;

                commandParameters[2] = match.groups.Stat_Name;
            }
            normalCommand(correctAndSynonymCheck(currentSelection + "." + commandParameters[2]));
        }
    }

    gameStats.evaluateNations();

    if(typeof updateDropdownSelection !== 'undefined') updateDropdownSelection();
    if(typeof createNationSheet !== 'undefined') {
        currentNationName = Object.keys(gameStats.Nations)[0];
        createNationSheet(currentNationName);
    }
}
