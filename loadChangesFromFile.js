let commandParameters = [];
let changes;
let changeCommandIndex;
function loadChangesFromFile(event){
    var file = event.target.files[0];
    var reader = new FileReader(); 
    reader.onload = function(e){
        changes = e.target.result.split(/\r?\n|\r/);
        const commandRegex = /(?<Operand>([a-z]+)( |\t)|(\+|\=|\-)( |\t)?)(?<Amount>(\".+\")|(\{.+\})|(.+?))( |\t)(?<Stat_Name>.+)/i;
        
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
                    gameStats.evaluateNations();
                    syncNation(correctAndSynonymCheck(currentSelection).split(/\./gi)[0]);
                }else{
                    gameStats.evaluateNations();
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
                        let arg = cc.slice(1);
                        let index = arg.search(/\<|\>/);
                        let selection;
                        if(index == -1) 
                            selection = arg.trim();
                        else 
                            selection = arg.slice(0, index).trim();
                        currentSelection += "." + selection;
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
            //Creation
            else if(changeCommand.slice(0, 2) == "+>"){
                let arg = changeCommand.slice(2).trim();
                let objectClass = "Object";
                if(/^\.Nations$/.test(currentSelection)) objectClass = "Nation";
                if(/^\.(Cultures|Religions)$/.test(currentSelection)) objectClass = "SocialBehaviour";
                if(/^\.Nations\..+\.(Culture|Religion)Groups$/.test(currentSelection)) objectClass = "SocialBehaviourGroup";
                if(/^\.Nations\..+\.Climates$/.test(currentSelection)) objectClass = "Climate";
                if(/^\.(Cultures|Religions)\..+\.Opinions$/.test(currentSelection)) objectClass = "Opinion";
                if(/^\.Trades$/.test(currentSelection)) objectClass = "Trade";
                if(arg.includes('=')){
                    let newName = arg.slice(0, arg.indexOf('=')).trim();
                    let oldName = arg.slice(arg.indexOf('=') + 1).trim();
                    gameStats.Nations[oldName].evaluateNation();
                    (new Function(`\
                    gameStats${currentSelection}.${newName} = new ${objectClass}("${newName}");\
                    /* Copy all property values from old to new */\
                    for (const propertyName in gameStats${currentSelection}.${oldName}) {\
                        if(propertyName == "GovernmentName") continue;\
                        const propertyToCopy = gameStats${currentSelection}.${oldName}[propertyName];\
                        gameStats${currentSelection}.${newName}[propertyName] = JSON.parse(JSON.stringify(propertyToCopy));\
                    }`))();
                    
                }else{
                    (new Function(`gameStats${currentSelection}.${arg} = new ${objectClass}("${arg}");`))(); 
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
                    
                    commandParameters[2] = match.groups.Stat_Name;
                }
                normalCommand(correctAndSynonymCheck(currentSelection + "." + commandParameters[2]));
            }
        }

        gameStats.evaluateNations();
 
        // Parse to evaluated sheets
        for (const nationName in gameStats.Nations) {
            createNationSheet(nationName);            
        }

    };

    reader.readAsText(file);
}

function syncNation(nationName){
    
    //deal with automatic debt taking
    //not implemented yet
    //copy dailies
    
    for (const propertyName in gameStats.Nations[nationName]) {
        const property = gameStats.Nations[nationName][propertyName];
        let regex = new RegExp(`gameStats\.Nations\.${nationName}\.Future.+`)
        if(regex.test(propertyName)){
            gameStats.Nations[nationName][propertyName.replace("Future", "")] = property;
        }
    }
}

function syncNations(){
    for (const nationName in gameStats.Nations) {
        syncNation(nationName)
    }
}

//synonym searching and case correcting alg
function correctAndSynonymCheck(selection){
    let correctSelection = selection.slice(1).split(".");
    let step = gameStats;
    for(let i = 0; i < correctSelection.length; i++){
        let found = false;
        for (const propertyName in step) {
            //check same stats but correct casing
            if(propertyName.toLowerCase() == correctSelection[i].toLowerCase().replace(" ", "")){
                correctSelection[i] = propertyName;
                step = step[propertyName];
                found = true;
            }
            else{
                //check synonyms of stats
                for (const realName in Synonyms) {
                    const synonymArray = Synonyms[realName];
                    for (let j = 0; j < synonymArray.length; j++) {
                        const synonym = synonymArray[j];
                         //if what was written in change file exists in the synonym dictionary
                        if(synonym.toLowerCase() == correctSelection[i].toLowerCase().replace(" ", "")){
                            //Then, if the real name for the stat exists in this object
                            if(propertyName.toLowerCase() == realName.toLowerCase()){
                                correctSelection[i] = realName;
                                step = step[realName];
                                found = true;
                            }
                        }
                        if(found) continue;
                    }
                    if(found) continue;
                }
            } 
            if(found) continue;  
        }
        if(!found) alert("The Specified Stat " + correctSelection[i] + " in " + correctSelection.slice(0,i).join(".") + " was not found!");
    }
    return "." + correctSelection.join(".");
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
        (new Function(`gameStats${selection} += ${commandParameters[1]}`))();
    }
    //subtract
    else if(commandParameters[0] == '-' || commandParameters[0] == 'sub'){
        change = -num;
        (new Function(`gameStats${selection} -= ${commandParameters[1]}`))();
    }
    //set
    else if(commandParameters[0] == '=' || commandParameters[0] == 'set'){
        const previous = (new Function(`\
            if(typeof gameStats${selection} === 'undefined') return 'undefined';\
            return JSON.parse(JSON.stringify(\
                gameStats${selection}\
            ));`
        ))();
        change = isNaN(previous) ? true : num - previous;
        
        (new Function(`gameStats${selection} = ${commandParameters[1]}`))();
        
    }else{
        alert("At line " + (changeCommandIndex + 1) + "\r\n\r\nOperand wasn't understood: " + commandParameters[0] + ".\r\n Aborting.");
        return;
    }
    specialOperation(selection, change);
}