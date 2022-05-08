function specialOperation(selection, change){

    //New Recruitment handling
    if(
        /\.Nations\..+\.Levies/.test(selection) ||
        /\.Nations\..+\.LightInfantry/.test(selection) ||
        /\.Nations\..+\.HeavyInfantry/.test(selection) ||
        /\.Nations\..+\.Archers/.test(selection) ||
        /\.Nations\..+\.Crossbowmen/.test(selection) ||
        /\.Nations\..+\.LightCavalry/.test(selection) ||
        /\.Nations\..+\.HeavyCavalry/.test(selection) ||
        /\.Nations\..+\.EliteInfantry/.test(selection) ||
        /\.Nations\..+\.EliteCavalry/.test(selection) ||
        /\.Nations\..+\.HandCannon/.test(selection) ||
        /\.Nations\..+\.Musketeers/.test(selection) ||
        /\.Nations\..+\.Militia/.test(selection) ||
        /\.Nations\..+\.SiegeEquipment/.test(selection) ||
        /\.Nations\..+\.LargeSiegeEquipment/.test(selection) ||
        /\.Nations\..+\.Cannons/.test(selection) ||
        /\.Nations\..+\.LightShips/.test(selection) ||
        /\.Nations\..+\.MediumShips/.test(selection) ||
        /\.Nations\..+\.HeavyShips/.test(selection)
    ){
        //only record positive changes
        if(change <= 0) return;
        let newTroopSelection = selection.split(".").pop().push("New_" + selection[selection.split(".").length - 1].join("."));
        (new Function(`${newTroopSelection} += ${change}`))();
    }
    //Clearing War Penalty Stats If War Stat is false 
    else if(/\.Nations\..+\.AtWar/.test(selection)){
        
        //if the value of atWar after it's been changed just now, isn't false, then skip
        //aka if actually false, the war is over and you should do the following code
        //which clears war penalty stats
        if(new Function(`return gameStats${selection}`)() != "false") return;

        let selectedNation = selection.split(".");
        selectedNation.pop();
        selectedNation = selectedNation.join(".");
        let warStatsToReset = [
            "Casualties",
            "Pillaging",
            "Occupation",
            "MinorBattles",
            "MajorBattles"
        ];
        for (let i = 0; i < warStatsToReset.length; i++) {
            const warStatToReset = warStatsToReset[i];
            (new Function(`gameStats${selectedNation}.${warStatToReset} = 0`))();
        }
    }   
}