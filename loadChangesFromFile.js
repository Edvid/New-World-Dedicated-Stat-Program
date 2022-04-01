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
                    syncNation(correctAndSynonymCheck(currentSelection).split(/\./gi)[0]);
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
                normalCommand(correctAndSynonymCheck(currentSelection + "." + commandParameters[2]));
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

function syncNations(){
    for (const nationName in gameStats.Nations) {
        syncNation(nationName)
    }
}

//synonym searching and case correcting alg
function correctAndSynonymCheck(selection){
    let correctSelection = selection.split(".");
    let step = gameStats;
    for(let i = 0; i < correctSelection.length; i++){
        (function() {
            for (const propertyName in step) {
                //check same stats but correct casing
                if(propertyName.toLowerCase == selection[i].toLowerCase){
                    selection[i] = propertyName;
                    step = step[propertyName];
                    return;
                }
                else{
                    //check synonyms of stats
                    for (const realName in Synonyms) {
                        const synonymArray = Synonyms[realName];
                        synonymArray.forEach(synonym => {
                            //if what was written in change file exists in the synonym dictionary
                            if(synonym.toLowerCase == selection[i].toLowerCase){
                                //Then, if the real name for the stat exists in this object
                                if(propertyName.toLowerCase == realName.toLowerCase){
                                    selection[i] = realName;
                                    step = step[realName];
                                    return;
                                }
                            }
                        });
                    }
                }   
                let instat = "";
                for(let j = i-1; j >= 0; j--){
                    instat += "." + selection[j];
                }
                alert("The Specified Stat" + selection[i] + " in gameStats" + instat + " was not found!"); 
            }
        })();
    }
    return correctSelection.join(".");
}

function normalCommand(selection){
    //implement check for stats that are forumulas, and disallow their change
    //
    //
    //
    
    let num;
    let change;
    //If number to change by is written in percent. Divide that number by 100
    if(!(/^[\d|\.].+%$/.test(commandParameters[1]))){
        num = commandParameters[1].replace("%", "") / 100;
    }

    //add
    if(commandParameters[0] == '+' || commandParameters[0] == 'add'){
        change = num;
        (new Function(`gameStats.${selection} += ${commandParameters[1]}`))();
    }
    //subtract
    else if(commandParameters[0] == '-' || commandParameters[0] == 'sub'){
        change = -num;
        (new Function(`gameStats.${selection} -= ${commandParameters[1]}`))();
    }
    //set
    else if(commandParameters[0] == '=' || commandParameters[0] == 'set'){
        const previous = (new Function(`return JSON.parse(JSON.stringify(\
            gameStats.${selection}\
        ))`))();
        change = isNaN(previous) ? true : num - previous;
        
        (new Function(`gameStats.${selection} = ${commandParameters[1]}`))();
        
    }else{
        alert("At line " + (changeCommandIndex + 1) + "\r\n\r\nOperand wasn't understood: " + commandParameters[0] + ".\r\n Aborting.");
        return;
    }
    specialOperation(selection, change);
}