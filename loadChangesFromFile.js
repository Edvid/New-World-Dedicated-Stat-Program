let commandParameters = [];
let changes;
let changedSheets;
let currentNationID;
let changeCommandIndex;
function loadChangesFromFile(event){
    readySheets();
    var file = event.target.files[0];
    var reader = new FileReader();
    changes; 
    reader.onload = function(e){
        changes = e.target.result.split("\r\n");
        changedSheets = JSON.parse(JSON.stringify(sheets)); //but make sure it's copied not referenced
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
                    evaluateNations();
                    syncNation(currentNationID);
                }else{
                    evaluateNations();
                    syncNations();
                }
                
            }
            //nation Switch
            else if(cc[0] == '>'){
                let currentNation = cc.substring(1).trim();
                let found = false;
                for (let j = 0; j < Object.keys(changedSheets).length; j++) {
                    const changedSheet = changedSheets[sheetNames[j]];
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
                normalCommandWithAlert(currentSheetRestrictionID);
            }
        }

        evaluateNations();
 

        //paste to textfield
        
        for (let i = 0; i < Object.keys(changedSheets).length; i++) {
            let text = "";
            const changedSheet = changedSheets[sheetNames[i]];
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
            currentTextfield.cols = 20;
            currentTextfield.rows = 2;
            currentTextfield.name = sheetNames[i];
            currentTextfield.value = text;
            let currentTextfieldTitle = document.createElement("h3");
            currentTextfieldTitle.style.textTransform = "capitalize";
            currentTextfieldTitle.style.color = JSON.stringify(sheets[sheetNames[i]]) == JSON.stringify(changedSheets[sheetNames[i]]) ? "lightgrey" : "black";
            currentTextfieldTitle.innerHTML = sheetNames[i];
            document.body.appendChild(currentTextfieldTitle);
            document.body.appendChild(currentTextfield);
        }

        // Parse to evaluated sheets
        createNationSheet(2);
        console.table(changedSheets['Daily Stuff']);

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
        if(StatNameCell.toLowerCase().trim() == statName.toLowerCase().trim()){
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

function normalCommandWithAlert(currentSheetRestrictionID){
    if(!normalCommand(currentSheetRestrictionID)) alert("At line " + (changeCommandIndex + 1) + "\r\n\r\nA stat name was not written correctly in change commands file: " + (commandParameters[2].length > 0 ? commandParameters[2] : "λ"));
}

function normalCommand(currentSheetRestrictionID){
    let coordFound;
    if(currentSheetRestrictionID != null){
        coordFound = findCellCoordFromNamesSheetRestricted(sheetNames[currentSheetRestrictionID], currentNationID, commandParameters[2]);
    }else{
        coordFound = findCellCoordFromNames(currentNationID, commandParameters[2]);
    }


    if(coordFound != null){
        //if the stat in question is a formula, throw an error too
        if(sheets[coordFound.sheet][coordFound.row][coordFound.column].toString().startsWith("="))
        alert("At line " + (changeCommandIndex + 1) + "\r\n\r\nA stat that is described as a formula has been attempted changed: " + statName + ".\r\n Action has been aborted.");                         
    
        changeStats(coordFound, currentNationID);
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
