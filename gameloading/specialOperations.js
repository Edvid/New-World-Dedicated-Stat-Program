function PostStatChange(selection, change){

    //New Recruitment handling
    if(
      /Levies$/.test(selection) ||
      /Militia$/.test(selection) ||
      /LightInfantry$/.test(selection) ||
      /HeavyInfantry$/.test(selection) ||
      /EliteInfantry$/.test(selection) ||
      /Archers$/.test(selection) ||
      /Crossbowmen$/.test(selection) ||
      /HandCannoneers$/.test(selection) ||
      /Musketeers$/.test(selection) ||
      /MusketMilitia$/.test(selection) ||
      /Riflemen$/.test(selection) ||
      /LightCavalry$/.test(selection) ||
      /HeavyCavalry$/.test(selection) ||
      /EliteCavalry$/.test(selection) ||
      /SiegeEquipment$/.test(selection) ||
      /LargeSiegeEquipment$/.test(selection) ||
      /RegimentalGuns$/.test(selection) ||
      /FieldCannons$/.test(selection) ||
      /SiegeGuns$/.test(selection) ||
      /MerchantShips$/.test(selection) ||
      /LightShips$/.test(selection) ||
      /MediumShips$/.test(selection) ||
        /HeavyShips$/.test(selection) ||
        /SmallForts$/.test(selection) ||
        /MediumForts$/.test(selection) ||
        /BigForts$/.test(selection) ||
        /HugeForts$/.test(selection) ||
        /CityFortifications$/.test(selection) ||
        /SupplyDepots$/.test(selection) ||
        /NavalBases$/.test(selection)
    ){
        //elite exceed check
        if(/Elite/.test(selection)){
            let nationSelection = "." + selection.split(/\./gm).slice(1, -1).join(".");
            const eliteInfantrySelector = '.EliteInfantry'
            const eliteCavalrySelector = '.EliteCavalry'
            const eliteUnitsCapSelector = '.EliteUnitsCap'
            let eliteInfantry = GSGetProperty(nationSelection + eliteInfantrySelector);
            let eliteCavalry = GSGetProperty(nationSelection + eliteCavalrySelector);
            let cap = GSGetProperty(nationSelection + eliteUnitsCapSelector);
            let compare = eliteInfantry + eliteCavalry - cap;

            //if the elite unit cap is too tiny
            if(compare > 0) {
                evaluateNations();
                eliteInfantry = GSGetProperty(nationSelection + eliteInfantrySelector);
                eliteCavalry = GSGetProperty(nationSelection + eliteCavalrySelector);
                cap = GSGetProperty(nationSelection + eliteUnitsCapSelector);
                compare = eliteInfantry + eliteCavalry - cap;

                //if the elite unit cap is still too tiny even after stats have been recalculated in case troops have just been hired and the elite unit cap should actually be higher
                if(compare > 0) error(`The EliteUnitsCap (${cap}) has been exceeded by ${compare}`);
            }
        }
        //only record positive changes
        if(change <= 0) return;
        let newTroopSelection = selection.replace(/\.(?=[^.]*$)/gm, ".New_");
        GSAddProperty(newTroopSelection, change)
    }
    else if(~mappedResources.indexOf(selection)) {
        let nationSelection = "." + selection.split(/\./gm).slice(1, -1).join(".");
        let resourceName = selection.split(/\./gm).slice(-1).join(".");
        const resourceSelector = '.' + resourceName;
        const maxResourceSelector = '.Max' + resourceName;
        let maxResource = GSGetProperty(nationSelection + maxResourceSelector);
        let curResource = GSGetProperty(nationSelection + resourceSelector);

        if(curResource > maxResource){
            GSSetProperty(nationSelection + resourceSelector, maxResource)
        }
    }
    //public debt taken exceed check
    else if(/PublicDebtTaken/.test(selection)){
        //we're only interested in all below if the change is positive
        if(change < 0) return;
        let nationSelection = "." + selection.split(/\./gm).slice(1, -1).join(".");
        const publicDebtTakenSelector = '.PublicDebtTaken'
        const possiblePublicDebtSelector = '.PossiblePublicDebt'
        let DebtTaken = GSGetProperty(nationSelection + publicDebtTakenSelector)
        let PossibleDebt = GSGetProperty(nationSelection + possiblePublicDebtSelector)

        //if the possible debt is less than 0 after the debt taking change. Alert
        if(PossibleDebt - change < 0) error(`The PublicDebtTaken (${DebtTaken}) has been exceeded by ${change - PossibleDebt}`);

    }
    //Clearing War Penalty Stats If War Stat is false 
    else if(/\.Nations\..+\.AtWar/.test(selection)){

        //if the value of atWar after it's been changed just now, isn't false, then skip
        //aka if actually false, the war is over and you should do the following code
        //which clears war penalty stats
        let warStatus = GSGetProperty(selection);
        if(warStatus != "false" && warStatus != false) return;

        let selectedNation = selection.split(".");
        selectedNation.pop();
        selectedNation = selectedNation.join(".");

        [
            ".Casualties",
            ".Pillaging",
            ".Occupation",
            ".Blockade",
            ".MinorBattles",
            ".MajorBattles"
        ].forEach(warStatToReset => {
            GSSetProperty(selectedNation + warStatToReset, 0)
        });;
    }   
}

function PostStatCreate(selection, name){
    if(/Nations$/.test(selection)){
        const nationSelector = '.Nations.' + name;
        for (const rel in gameStats.Religions) {
            const religionGroupsSelector = nationSelector + '.ReligionGroups.' + rel;
            if(typeof GSGetProperty(religionGroupsSelector) !== 'undefined') continue;
            GSSetProperty(religionGroupsSelector, {Points: 0});
        }
        for (const cul in gameStats.Cultures) {
            const cultureGroupsSelector = nationSelector + '.CultureGroups.' + cul;
            if(typeof GSGetProperty(cultureGroupsSelector) !== 'undefined') continue;
            GSSetProperty(cultureGroupsSelector, JSON.stringify({Points: 0}))
        }
    }
    else if(/Religions$/.test(selection)){
        for (const natName in gameStats.Nations) {
            const nationSelector = '.Nations.' + natName;
            const religionGroupSelector = nationSelector + '.ReligionGroups' + name; 
            if(typeof GSGetProperty(religionGroupSelector) === 'undefined') continue;
            GSSetProperty(religionGroupSelector) = JSON.stringify({Points: 0});
        }
    }
    else if(/Cultures$/.test(selection)){
        for (const natName in gameStats.Nations) {
            const nationSelector = '.Nations.' + natName;
            const cultureGroupsSelector = nationSelector + '.CultureGroups' + name;
            if(typeof GSGetProperty(cultureGroupsSelector) === 'undefined') continue;
            GSSetProperty(cultureGroupsSelector, JSON.stringify({Points: 0}));
        }
    }
}
