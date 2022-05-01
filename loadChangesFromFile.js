let commandParameters = [];
let changes;
let changeCommandIndex;
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
                    let spn = addChangeCommandWithColors([changeCommand], ["#5E5E5E"]);
                    spn[0].style.fontStyle = "italic";
                    ignore = true;
                } else {
                    addChangeCommandWithColors([changeCommand], ["grey"]);
                }
                continue;
            } else {
                if (changeCommand.toLowerCase() == "# END".toLowerCase())
                    ignore = false;
                let spn = addChangeCommandWithColors([changeCommand], ["#5E5E5E"]);
                spn[0].style.fontStyle = "italic";
                continue;
            }

        }
        //sync
        else if (changeCommand.includes("sync")) {

            if (changeCommand.includes("<")) {
                //If first part of current Selection is not the name of some nation
                if (Nations[currentSelection.split(/\./gi)[0]] === 'undefined') {
                    alert("You tried to run sync on a specific nation, but no nation is selected. This Operations was aborted");
                    continue;
                }
                gameStats.evaluateNations();
                syncNation(correctAndSynonymCheck(currentSelection).split(/\./gi)[0]);
            } else {
                gameStats.evaluateNations();
                syncNations();
            }
            let spn = addChangeCommandWithColors([changeCommand], ["MediumSpringGreen"]);
            spn[0].style.fontWeight = "bold";
        }
        //Creation
        else if (changeCommand.slice(0, 2) == "+>") {
            let arg = changeCommand.slice(2).trim();
            createStat(currentSelection, arg);
            addChangeCommandWithColors([changeCommand], ["magenta"]);
        }
        else if (changeCommand.slice(0, 2) == "<-"){
            let arg = changeCommand.slice(2).trim();
            deleteStat(currentSelection, arg);
            addChangeCommandWithColors([changeCommand], ["#ff00a0"]);
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
            addChangeCommandWithColors([changeCommand], ["dodgerBlue"]);
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
    updateDropdownSelection();
    currentNationName = Object.keys(gameStats.Nations)[0];
    createNationSheet(currentNationName);
}
