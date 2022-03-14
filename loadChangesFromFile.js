let commandParameters = [];
let changes;
let changedSheets;
let currentNationID;
let changeCommandIndex;
function loadChangesFromFile(event){
    var file = event.target.files[0];
    var reader = new FileReader();
    changes; 
    reader.onload = function(e){
        changes = e.target.result.split("\r\n");
        changedSheets = JSON.parse(JSON.stringify(sheets)); //but make sure it's copied not referenced
        //console.log(changedSheets);
        const commandRegex = /(?<Operand>([a-z]+)( |\t)|(\+|\=|\-)( |\t)?)(?<Amount>(\".+\")|(.+?))( |\t)(?<Stat_Name>.+)/i;

        
        let currentSheetRestrictionID;
        for (changeCommandIndex = 0; changeCommandIndex < changes.length; changeCommandIndex++) {
            const changeCommand = changes[changeCommandIndex];
            
            const cc = changeCommand.toLowerCase();
            
            //comment
            if(cc[0] == '#' || cc.length == 0){
                continue;
            }
            //sync
            else if(cc.includes("sync")){
                
                if(cc.includes("<")){
                    sync(currentNationID);
                }else{
                    sync();
                }
                
            }
            //nation Switch
            else if(cc[0] == '>'){
                let currentNation = cc.substring(1).trim();
                let found = false;
                for (let j = 0; j < changedSheets.length; j++) {
                    const changedSheet = changedSheets[j];
                    //if Column A, row 2 starts with a '=', look for nation names in another sheet
                    if(changedSheet[1][0].startsWith("=")) continue;
                    for (let k = 0; k < changedSheet.length; k++) {
                        const NationCell = changedSheet[k][0];
                        if(NationCell.toLowerCase().trim() == currentNation){
                            currentNationID = k;
                            found = true;
                            break;
                        }
                    }
                    if(found == true) break;
                }
                if(found == false) alert("At line " + (changeCommandIndex + 1) + "\r\n\r\nA nation name was not written correctly in change commands file: " + (currentNation.length > 0 ? currentNation : "λ"));
            }
            //sheet restriction command
            else if(cc[0] == '@'){
                //escape
                if(cc[1] == '<') currentSheetRestrictionID = null;
                //find sheet
                else{
                    let currentSheet = cc.substring(1).trim();
                    let found = false;

                    for (let j = 0; j < sheetNames.length; j++) {
                        if(sheetNames[j].toLowerCase() == currentSheet.toLowerCase()){
                            currentSheetRestrictionID = j;
                            found = true;
                            break;
                        }
                    }
                    if(found == false) alert("At line " + (changeCommandIndex + 1) + "\r\n\r\nA sheet change restriction was attmpted to be set, but sheet was not found. No sheet with name: " + (currentSheet.length > 0 ? currentSheet : "λ"));

                }
            }
            //normal commands
            else{
                commandParameters = [];
                if(cc.replace(/[^\t]/g, "").length >= 2){
                    commandParameters = cc.split("\t");
                }else{
                    let match = commandRegex.exec(cc);
                    if (!commandRegex.test(cc)){
                        alert("At line " + (changeCommandIndex + 1) + "\r\n\r\nA command wasn't understood:\r\n" + cc + "\r\n Aborting.");
                        continue;
                    }
                    commandParameters[0] = match.groups.Operand.trim();
                    
                    commandParameters[1] = match.groups.Amount;
                    if(/^\".+\"$/.test(commandParameters[1]))
                        commandParameters[1] = commandParameters[1].substring(1, commandParameters[1].length - 1);
                    
                    commandParameters[2] = match.groups.Stat_Name;
                }

                const START = currentSheetRestrictionID == null ? 0 : currentSheetRestrictionID;
                const END = currentSheetRestrictionID == null ? changedSheets.length : currentSheetRestrictionID + 1;
                normalCommandWithAlert(START, END);
            }
        }

        evaluateSheets();
        
        //print to console
        console.log("evaluated");
        
        for (const [key, value] of Object.entries(changedSheetsEvaluated)){
            console.log(key);
            console.table(value)
        }

        console.log("unevaluated");
        changedSheets.forEach(changedSheet => {
            console.table(changedSheet); 
        }); 
        //paste to textfield
        
        for (let i = 0; i < changedSheets.length; i++) {
            let text = "";
            const changedSheet = changedSheets[i];
            for (let j = 0; j < changedSheet.length; j++) {
                const cols = changedSheet[j];
                if(j != 0) text += "\r\n"
                for (let k = 0; k < cols.length; k++) {
                    const cells = cols[k];
                    if(k != 0) text += "\t"
                    text += cells;
                }
            }    

            let currentTextfield = document.createElement("textarea");
            currentTextfield.cols = 50;
            currentTextfield.rows = 4;
            currentTextfield.name = sheetNames[i];
            currentTextfield.value = text;
            let currentTextfieldTitle = document.createElement("h1");
            currentTextfieldTitle.style.textTransform = "capitalize";
            currentTextfieldTitle.style.color = JSON.stringify(sheets[i]) == JSON.stringify(changedSheets[i]) ? "lightgrey" : "black";
            currentTextfieldTitle.innerHTML = sheetNames[i];
            document.body.appendChild(currentTextfieldTitle);
            document.body.appendChild(currentTextfield);
        }

    };

    reader.readAsText(file);
}

function sync(){
    evaluateSheets();
    //deal with new recruit costs
    //deal with automatic debt taking
    //copy dailies
}

function normalCommandWithAlert(beginning, end){
    if(!normalCommand(beginning, end)) alert("At line " + (changeCommandIndex + 1) + "\r\n\r\nA stat name was not written correctly in change commands file: " + (commandParameters[2].length > 0 ? commandParameters[2] : "λ"));
}

function normalCommand(beginning, end){
    for (let i = beginning; i < end; i++) {
        const changedSheet = changedSheets[i];
        
        
        const statCount = checkIfMoreStatsThanRowLength(sheetNames[i], changedSheet[0].length);
        for (let j = 0; j < statCount; j++) {
            let statNameCoord = {row: 0, column: j};
            statNameCoord = checkUniqueSheetLayout(sheetNames[i], statNameCoord);
            const StatNameCell = changedSheet[statNameCoord.row][statNameCoord.column];
            if(StatNameCell.toLowerCase().trim() == commandParameters[2]){
                found = true;
                //if the stat in question is a formula, throw an error too
                let statChangeCoord = {row: currentNationID, column: j};
                statChangeCoord = checkUniqueSheetLayout(sheetNames[i], statChangeCoord);
                const StatCell = changedSheet[statChangeCoord.row][statChangeCoord.column];
                if(StatCell.toString().startsWith("="))
                    alert("At line " + (changeCommandIndex + 1) + "\r\n\r\nA stat that is described as a formula has been attempted changed: " + commandParameters[2] + ".\r\n Action has been aborted."); 
                //changes
                else changeStats(changedSheet, i, statNameCoord, statChangeCoord);
                return true;
            }
        }
    }
    return false;
}

function changeStats(sheet, sheetIndex, name, cell){
    const row = cell.row;
    const column = cell.column;
    
    if(!(/^[\d|\.].+%$/.test(commandParameters[1])) && (/^[\d|\.].+%$/.test(sheet[row][column]))){
        alert("At line " + (changeCommandIndex + 1) + "\r\n\r\nYou attempted to change " + commandParameters[2] +  ", which is written in percentages. You wrote " + commandParameters[1] + ". Aborted.");
        return;
    }else if((/^[\d|\.].+%$/.test(commandParameters[1])) && !(/^[\d|\.].+%$/.test(sheet[row][column]))){
        alert("At line " + (changeCommandIndex + 1) + "\r\n\r\nYou attempted to change " + commandParameters[2] + ", which is written without percentages. Your wrote : " + commandParameters[1] + ". Aborted.");
        return;
    }

    if(commandParameters[0] == '+' || commandParameters[0] == 'add'){
        sheet[row][column] = (+sheet[row][column] + +commandParameters[1].replace("%", "")) + (sheet[row][column].includes("%") ? "%" : "");
        specialOperation(name, sheetIndex, commandParameters[1]);
    }else if(commandParameters[0] == '-' || commandParameters[0] == 'sub'){
        sheet[row][column] = (+sheet[row][column] - +commandParameters[1].replace("%", "")) + (sheet[row][column].includes("%") ? "%" : "");
        specialOperation(name, sheetIndex, -commandParameters[1]);
    }else if(commandParameters[0] == '=' || commandParameters[0] == 'set'){
        const previous = JSON.parse(JSON.stringify(sheet[row][column]));
        sheet[row][column] = commandParameters[1];
        specialOperation(name, sheetIndex, commandParameters[1] - previous);
    }else{
        alert("At line " + (changeCommandIndex + 1) + "\r\n\r\nOperand wasn't understood: " + commandParameters[0] + ".\r\n Aborting.");
    }
}
