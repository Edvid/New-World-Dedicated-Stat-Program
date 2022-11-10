function PostStatChange(selection, change){

    //New Recruitment handling
    if(
        /Levies$/.test(selection) ||
        /LightInfantry$/.test(selection) ||
        /HeavyInfantry$/.test(selection) ||
        /Archers$/.test(selection) ||
        /Crossbowmen$/.test(selection) ||
        /LightCavalry$/.test(selection) ||
        /HeavyCavalry$/.test(selection) ||
        /EliteInfantry$/.test(selection) ||
        /EliteCavalry$/.test(selection) ||
        /HandCannoneers$/.test(selection) ||
        /Musketeers$/.test(selection) ||
        /Militia$/.test(selection) ||
        /SiegeEquipment$/.test(selection) ||
        /LargeSiegeEquipment$/.test(selection) ||
        /Cannons$/.test(selection) ||
        /LightShips$/.test(selection) ||
        /MediumShips$/.test(selection) ||
        /HeavyShips$/.test(selection)
    ){
        //elite exceed check
        if(/Elite/.test(selection)){
            let nationSelection = "." + selection.split(/\./gm).slice(1, -1).join(".");
    
            let Einf = (new Function(`return gameStats${nationSelection}.EliteInfantry`))();
            let Ecav = (new Function(`return gameStats${nationSelection}.EliteCavalry`))();
            let cap = (new Function(`return gameStats${nationSelection}.EliteUnitsCap`))();
            let compare = Einf + Ecav - cap;

            //if the elite unit cap is too tiny
            if(compare > 0) {
                evaluateNations();
                Einf = (new Function(`return gameStats${nationSelection}.EliteInfantry`))();
                Ecav = (new Function(`return gameStats${nationSelection}.EliteCavalry`))();
                cap = (new Function(`return gameStats${nationSelection}.EliteUnitsCap`))();
                compare = Einf + Ecav - cap;
    
                //if the elite unit cap is still too tiny even after stats have been recalculated in case troops have just been hired and the elite unit cap should actually be higher
                if(compare > 0) error(`The EliteUnitsCap (${cap}) has been exceeded by ${compare}`);
            }
        }
        //only record positive changes
        if(change <= 0) return;
        let newTroopSelection = selection.replace(/\.(?=[^.]*$)/gm, ".New_");
        (new Function(`gameStats${newTroopSelection} += ${change}`))();
    }
    else if(~mappedResources.indexOf(selection)) {
        let nationSelection = "." + selection.split(/\./gm).slice(1, -1).join(".");
        let resourceName = selection.split(/\./gm).slice(-1).join(".");
        let maxResource = (new Function(`return gameStats${nationSelection}.Max${resourceName}`))();
        let curResource = (new Function(`return gameStats${nationSelection}.${resourceName}`))();

        if(curResource > maxResource){
            (new Function(`gameStats${nationSelection}.${resourceName} = ${maxResource}`))()
        }
    }
    //public debt taken exceed check
    else if(/PublicDebtTaken/.test(selection)){
        //we're only interested in all below if the change is positive
        if(change < 0) return;
        let nationSelection = "." + selection.split(/\./gm).slice(1, -1).join(".");
        let DebtTaken = (new Function(`return gameStats${nationSelection}.PublicDebtTaken`))();
        let PossibleDebt = (new Function(`return gameStats${nationSelection}.PossiblePublicDebt`))();
        
        //if the possible debt is less than 0 after the debt taking change. Alert
        if(PossibleDebt - change < 0) error(`The PublicDebtTaken (${DebtTaken}) has been exceeded by ${change - PossibleDebt}`);

    }
    //Clearing War Penalty Stats If War Stat is false 
    else if(/\.Nations\..+\.AtWar/.test(selection)){
        
        //if the value of atWar after it's been changed just now, isn't false, then skip
        //aka if actually false, the war is over and you should do the following code
        //which clears war penalty stats
        let warStatus = new Function(`return gameStats${selection}`)();
        if(warStatus != "false" && warStatus != false) return;

        let selectedNation = selection.split(".");
        selectedNation.pop();
        selectedNation = selectedNation.join(".");
        let warStatsToReset = [
            "Casualties",
            "Pillaging",
            "Occupation",
			"Blockade",
            "MinorBattles",
            "MajorBattles"
        ];
        for (let i = 0; i < warStatsToReset.length; i++) {
            const warStatToReset = warStatsToReset[i];
            (new Function(`gameStats${selectedNation}.${warStatToReset} = 0`))();
        }
    }   
}

function PostStatCreate(selection, name){
    if(/Nations$/.test(selection)){
        let n = gameStats.Nations[name];
        for (const rel in gameStats.Religions) {
            if(typeof n.ReligionGroups[rel] !== 'undefined') continue;
            n.ReligionGroups[rel] = {Points: 0};
        }
        for (const cul in gameStats.Cultures) {
            if(typeof n.CultureGroups[cul] !== 'undefined') continue;
            n.CultureGroups[cul] = {Points: 0};
        }
    }
    else if(/Religions$/.test(selection)){

        for (const nname in gameStats.Nations) {
            const n = gameStats.Nations[nname];
            if(typeof n.ReligionGroups[name] === 'undefined') continue;
            n.ReligionGroups[name] = {Points: 0};
        }
    }
    else if(/Cultures$/.test(selection)){
        for (const nname in gameStats.Nations) {
            const n = gameStats.Nations[nname];
            if(typeof n.CultureGroups[name] === 'undefined') continue;
            n.CultureGroups[name] = {Points: 0};
        }
    }
}