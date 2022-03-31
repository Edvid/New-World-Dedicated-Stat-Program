let commandParameters = [];
let changes;
let changedSheets;
let currentNationName;
let changeCommandIndex;
function loadChangesFromFile(event){
    var file = event.target.files[0];
    var reader = new FileReader();
    changes; 
    reader.onload = function(e){
        changes = e.target.result.split("\r?\n|\r");
        const commandRegex = /(?<Operand>([a-z]+)( |\t)|(\+|\=|\-)( |\t)?)(?<Amount>(\".+\")|(.+?))( |\t)(?<Stat_Name>.+)/i;
        
        let currentSelection = "";
        for (changeCommandIndex = 0; changeCommandIndex < changes.length; changeCommandIndex++) {
            const changeCommand = changes[changeCommandIndex].trim();
            
            //comment
            if(changeCommand[0] == '#' || changeCommand.length == 0){
                continue;
            }
            //sync
            else if(changeCommand.includes("sync")){
                
                if(changeCommand.includes("<")){
                    //If first part of current Selection is not the name of some nation
                    if(Nations[currentSelection.split(/\./gi)[0]] === 'undefined') {
                        alert("You tried to run sync on a specific nation, but no nation is selected. This Operations was aborted");
                        continue;
                    }
                    evaluateNations();
                    syncNation(currentSelection.split(/\./gi)[0]);
                }else{
                    evaluateNations();
                    syncNations();
                }
                
            }
            //Selection and deselections
            else if(changeCommand[0] == '>' || changeCommand[0] == '<'){
                let cc = changeCommand;
                let cutback = function(str){
                    let index = str.slice(1).search(/\<|\>/) + 1;
                    if(index == 0) return ""
                    return str.slice(index)
                }
                while(cc.length > 0){
                    cc.trim();
                    //selection
                    if(cc[0] == '>'){
                        let selection = cc.slice(1, cc.slice(1).search(/\<|\>/)).trim();
                        currentSelection += selection;
                    }
                    //deselection
                    else if(cc[0] == '<'){
                        if(cc.slice(1, 4) == "..."){
                            currentSelection = "";
                        }else{
                            if(currentSelection.includes("."))
                                currentSelection = currentSelection.slice(0, currentSelection.lastIndexOf("."));
                            else
                                currentSelection = "";
                        }
                    }
                    cc = cutback(cc);
                }
            }
            //normal commands
            else{
                commandParameters = [];
                //If 2 or more instances of tabulator in the string
                if(changeCommand.replace(/[^\t]/g, "").length >= 2){
                    commandParameters = changeCommand.split("\t");
                }
                else{
                    let match = commandRegex.exec(changeCommand);
                    if (!commandRegex.test(changeCommand)){
                        alert("At line " + (changeCommandIndex + 1) + "\r\n\r\nA command wasn't understood:\r\n" + changeCommand + "\r\n Aborting.");
                        continue;
                    }
                    commandParameters[0] = match.groups.Operand.trim();
                    commandParameters[1] = match.groups.Amount;
                    if(/^\".+\"$/.test(commandParameters[1]))
                        commandParameters[1] = commandParameters[1].slice(1, commandParameters[1].length - 1);
                    
                    commandParameters[2] = match.groups.Stat_Name;
                }
                normalCommandWithSynonymCheck();
            }
        }

        evaluateNations();
 
        // Parse to evaluated sheets
        createNationSheet(2);

    };

    reader.readAsText(file);
}

function syncNation(nationRow){
    //deal with new recruit costs
    
    const budgetCoord = findCellCoordFromNamesSheetRestricted("Daily Stuff", nationRow, "Budget");
    const ArmyQualityCoord = findCellCoordFromNames(nationRow, "Army Quality");
    const ArmyQualityValue = changedSheetsEvaluated.Armies[ArmyQualityCoord.row][ArmyQualityCoord.column];
    const CorruptionCoord = findCellCoordFromNames(nationRow, "Corruption");
    const CorrutionValue = changedSheetsEvaluated["Daily Stuff"][CorruptionCoord.row][CorruptionCoord.column];
    const ArmyWagesCoord = findCellCoordFromNames(nationRow, "Army Wages");
    const ArmyWagesValue = changedSheetsEvaluated.Armies[ArmyWagesCoord.row][ArmyWagesCoord.column];
    const TimeDivideCoord = findCellCoordFromNames(nationRow, "Time Divide");
    const TimeDivideValue = changedSheetsEvaluated["Daily Stuff"][TimeDivideCoord.row][TimeDivideCoord.column];
    
    changedSheets[budgetCoord.sheet][budgetCoord.row][budgetCoord.column] -= (NewRecruitCostsUnitUpkeepUnit*((ArmyQualityValue+CorrutionValue / 5 ) + ArmyWagesValue -1) / TimeDivideValue) / 2.0; 
    //clear recruit cost variable
    NewRecruitCostsUnitUpkeepUnit[nationRow] = 0;

    
    //deal with automatic debt taking
    //not implemented yet
    //copy dailies
    changedSheets["Daily Stuff"][nationRow][1] = changedSheetsEvaluated["Daily Stuff"][nationRow][2]; //population
    changedSheets["Daily Stuff"][nationRow][3] = changedSheetsEvaluated["Daily Stuff"][nationRow][4]; //literacy
    changedSheets["Daily Stuff"][nationRow][5] = changedSheetsEvaluated["Daily Stuff"][nationRow][6]; //high education
    changedSheets["Daily Stuff"][nationRow][7] = changedSheetsEvaluated["Daily Stuff"][nationRow][8]; //budget
    changedSheets["Daily Stuff"][nationRow][9] = changedSheetsEvaluated["Daily Stuff"][nationRow][10]; //food
    changedSheets["Daily Stuff"][nationRow][11] = changedSheetsEvaluated["Daily Stuff"][nationRow][12]; //research points
    changedSheets["Daily Stuff"][nationRow][13] = changedSheetsEvaluated["Daily Stuff"][nationRow][14]; //public debt length
    changedSheets["Daily Stuff"][nationRow][15] = changedSheetsEvaluated["Daily Stuff"][nationRow][16]; //culture power
    
    changedSheets["Daily Stuff"][nationRow][19] = changedSheetsEvaluated["Daily Stuff"][nationRow][20]; //Date in this nation
}

function findCellCoordFromNames(nationID, statName){
    for (let i = 0; i < sheets.length; i++) {
        let coord = findCellCoordFromNamesSheetRestricted(sheetNames[i], nationID, statName);
        if(coord != null) return coord;
    }
}

function findCellCoordFromNamesSheetRestricted(sheetName, nationID, statName){
    const sheetID = sheetNames.findIndex(element => element == sheetName);
    const statCount = checkIfMoreStatsThanRowLength(sheetName, changedSheets[sheetName][0].length);
    for (let j = 0; j < statCount; j++) {
        let statNameCoord = {row: 0, column: j};
        statNameCoord = checkUniqueSheetLayout(sheetName, statNameCoord);
        const StatNameCell = changedSheets[sheetName][statNameCoord.row][statNameCoord.column];
        if(StatNameCell.trim() == statName.trim()){
            let statChangeCoord = {row: nationID, column: j};
            statChangeCoord = checkUniqueSheetLayout(sheetName, statChangeCoord);
            const StatCell = changedSheets[sheetName][statChangeCoord.row][statChangeCoord.column];
            return {
                sheet: sheetName,
                row: statChangeCoord.row, 
                column: statChangeCoord.column,
                nameCoord: {
                    row: statNameCoord.row,
                    column: statNameCoord.column
                }
            };
        }
    }
}

function syncNations(){
    console.log("who the fuck called me!");
    for (let j = 0; j < changedSheets.length; j++) {
        const changedSheet = changedSheets[sheetNames[j]];
        //if Column A, row 2 starts with a '=', look for nation names in another sheet
        if(changedSheet[1][0].startsWith("=")) continue;
        for (let k = 0; k < changedSheet.length; k++) {
            const NationCell = changedSheet[k][0];
            if(NationCell.trim().length < 1) continue;
            syncNation(k);
        }
    }
}

function normalCommandWithSynonymCheck(){
    //check same stats but correct casing
    
    //check synonyms of stats

    //normal command
    normalCommand();
}

function normalCommand(){
    let coordFound;
    if(currentSheetRestrictionID != null){
        coordFound = findCellCoordFromNamesSheetRestricted(sheetNames[currentSheetRestrictionID], currentNationName, commandParameters[2]);
    }else{
        coordFound = findCellCoordFromNames(currentNationName, commandParameters[2]);
    }


    if(coordFound != null){
        //if the stat in question is a formula, throw an error too
        if(sheets[coordFound.sheet][coordFound.row][coordFound.column].toString().startsWith("="))
        alert("At line " + (changeCommandIndex + 1) + "\r\n\r\nA stat that is described as a formula has been attempted changed: " + statName + ".\r\n Action has been aborted.");                         
    
        changeStats(coordFound, currentNationName);
        return true;
    }
    return false;
}

function changeStats(cellinfo, nationRow){
    const sheet = changedSheets[cellinfo.sheet];
    const row = cellinfo.row;
    const column = cellinfo.column;
    
    if(!(/^[\d|\.].+%$/.test(commandParameters[1])) && (/^[\d|\.].+%$/.test(sheet[row][column]))){
        alert("At line " + (changeCommandIndex + 1) + "\r\n\r\nYou attempted to change " + commandParameters[2] +  ", which is written in percentages. You wrote " + commandParameters[1] + ". Aborted.");
        return;
    }else if((/^[\d|\.].+%$/.test(commandParameters[1])) && !(/^[\d|\.].+%$/.test(sheet[row][column]))){
        alert("At line " + (changeCommandIndex + 1) + "\r\n\r\nYou attempted to change " + commandParameters[2] + ", which is written without percentages. Your wrote : " + commandParameters[1] + ". Aborted.");
        return;
    }

    if(commandParameters[0] == '+' || commandParameters[0] == 'add'){
        sheet[row][column] = (+sheet[row][column] + +commandParameters[1].replace("%", "")) + (sheet[row][column].includes("%") ? "%" : "");
        specialOperation(cellinfo, commandParameters[1], nationRow);
    }else if(commandParameters[0] == '-' || commandParameters[0] == 'sub'){
        sheet[row][column] = (+sheet[row][column] - +commandParameters[1].replace("%", "")) + (sheet[row][column].includes("%") ? "%" : "");
        specialOperation(cellinfo, -commandParameters[1], nationRow);
    }else if(commandParameters[0] == '=' || commandParameters[0] == 'set'){
        const previous = JSON.parse(JSON.stringify(sheet[row][column]));
        sheet[row][column] = commandParameters[1];
        specialOperation(cellinfo, commandParameters[1] - previous, nationRow);
    }else{
        alert("At line " + (changeCommandIndex + 1) + "\r\n\r\nOperand wasn't understood: " + commandParameters[0] + ".\r\n Aborting.");
    }
}
