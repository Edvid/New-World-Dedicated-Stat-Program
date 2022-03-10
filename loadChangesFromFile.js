function loadChangesFromFile(event){
    var file = event.target.files[0];
    var reader = new FileReader();
    let changes; 
    reader.onload = function(e){
        changes = e.target.result.split("\r\n");
        let changedSheets = JSON.parse(JSON.stringify(sheets)); //but make sure it's copied not referenced
        //console.log(changedSheets);
        const commandRegex = /(?<Operand>([a-z]+)( |\t)|(\+|\=|\-)( |\t)?)(?<Amount>(\".+\")|(.+?))( |\t)(?<Stat_Name>.+)/gi;

        let currentNationID;
        let currentSheetRestrictionID;
        for (let i = 0; i < changes.length; i++) {
            const changeCommand = changes[i];
            
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
                if(found == false) alert("A nation name was not written correctly in change commands file: " + currentNation);
            }
            //sheet restriction command
            else if(cc[0] == '@'){
                //escape
                if(cc[1] == '<'){
                    currentSheetRestrictionID = null;
                }
                //find sheet
                else{
                    let currentSheet = cc.substring(1).trim();
                    let found = false;

                    for (let j = 0; j < sheetNames.length; j++) {
                        if(sheetNames[j.toLowerCase()] == currentSheet.toLowerCase()){
                            currentSheetRestrictionID = j;
                            found = true;
                        } 
                        if(found == true) break;
                    }
                    if(found == false) alert("A sheet change restriction was attmpted to be set, but sheet was not found. No sheet with name: " + currentSheet);

                }
            }
            //normal commands
            else{
                let match = commandRegex.exec(cc);
                commandRegex.test(cc); // DO NOT ASK ME WHY IS IS NECESSARY. The match sometimes just turns out null if not tested first.
                const commandParameters = [];
                commandParameters[0] = match.groups.Operand.trim();
                commandParameters[1] = match.groups.Amount;
                commandParameters[2] = match.groups.Stat_Name;

                let found = false;
                const _START = currentSheetRestrictionID == null ? 0 : currentSheetRestrictionID;
                const _END = currentSheetRestrictionID == null ? changedSheets.length : currentSheetRestrictionID;
                for (let j = _START; j < _END; j++) {
                    const changedSheet = changedSheets[j];
                    for (let k = 0; k < changedSheet[0].length; k++) {
                        const StatCell = changedSheet[0][k];
                        if(StatCell.toLowerCase().trim() == commandParameters[2]){
                            //if the stat in question is a formula, throw an error too
                            if(changedSheet[currentNationID][k].toString().startsWith("="))
                            {
                                alert("A stat that is described as a formula has been attempted changed: " + commandParameters[2] + ".\r\n Action has been aborted.");
                                found = true;
                                break;
                            } 
                            //changes
                            else{
                                if(!commandParameters[1].includes("%") && changedSheet[currentNationID][k].includes("%")){
                                    alert("You attempted to change " + commandParameters[2] +  ", which is written in percentages. You wrote " + commandParameters[1] + ". Aborted.");
                                    found = true;
                                    break;
                                }else if(commandParameters[1].includes("%") && !changedSheet[currentNationID][k].includes("%")){
                                    alert("You attempted to change " + commandParameters[2] + ", which is written without percentages. Your wrote : " + commandParameters[1] + ". Aborted.");
                                    found = true;
                                    break;
                                }

                                if(commandParameters[0] == '+' || commandParameters[0] == 'add'){
                                    changedSheet[currentNationID][k] = (+changedSheet[currentNationID][k] + +commandParameters[1].replace("%", "")) + (changedSheet[currentNationID][k].includes("%") ? "%" : "");
                                }else if(commandParameters[0] == '-' || commandParameters[0] == 'sub'){
                                    changedSheet[currentNationID][k] = (+changedSheet[currentNationID][k] - +commandParameters[1].replace("%", "")) + (changedSheet[currentNationID][k].includes("%") ? "%" : "");
                                }else if(commandParameters[0] == '=' || commandParameters[0] == 'set'){
                                    changedSheet[currentNationID][k] = commandParameters[1];
                                }else{
                                    alert("Function wasn't understood: " + commandParameters[0] + ".\r\n Aborting.");
                                }
                            }
                            found = true;
                            break;
                        }
                    }
                    if(found == true) break;
                }
                if(found == false) alert("A stat name was not written correctly in change commands file: " + commandParameters[2]);
            }
            /* alert("notice me baka"); */
        }

        //print to console
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
    //not implemented yet
}