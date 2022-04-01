function specialOperation(selection, change){
    
    //New Recruitment handling
    if(
        /gameStats\.Nations\..+\.Levies/.test(selection) ||
        /gameStats\.Nations\..+\.Light Infantry/.test(selection) ||
        /gameStats\.Nations\..+\.Heavy Infantry/.test(selection) ||
        /gameStats\.Nations\..+\.Archers/.test(selection) ||
        /gameStats\.Nations\..+\.Crossbowmen/.test(selection) ||
        /gameStats\.Nations\..+\.Light Cavalry/.test(selection) ||
        /gameStats\.Nations\..+\.Heavy Cavalry/.test(selection) ||
        /gameStats\.Nations\..+\.Elite Infantry/.test(selection) ||
        /gameStats\.Nations\..+\.Elite Cavalry/.test(selection) ||
        /gameStats\.Nations\..+\.Hand Cannon/.test(selection) ||
        /gameStats\.Nations\..+\.Musketeers/.test(selection) ||
        /gameStats\.Nations\..+\.Militia/.test(selection) ||
        /gameStats\.Nations\..+\.Siege Equipment/.test(selection) ||
        /gameStats\.Nations\..+\.Large Siege Equipment/.test(selection) ||
        /gameStats\.Nations\..+\.Cannons/.test(selection)
    ){
        //only record positive changes
        if(change <= 0) return;
        let newTroopSelection = selection.split(".").pop().push("New_" + selection[selection.split(".").length - 1].join("."));
        (new Function(`${newTroopSelection} = ${change}`))();
    }   
}