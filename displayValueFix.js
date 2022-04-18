
function displayValueFix(statName, statValue){
    //numbers
    if (!isNaN(statValue)) {
        if(typeof statValue === 'boolean'){
            let ret = document.createElement("span");
            if(statValue) ret.innerHTML = '&#10003;';
            ret.style.display = "inline-block" 
            ret.style.height = "2.3ex" 
            return {value: ret, appendable: true};
        }

        let numString;
        //integers
        if (~[
            "Population",
            "FuturePopulation",
            "PublicDebtLength",
            "FuturePublicDebtLength",
            "DateInThisNation",
            "FutureDateInThisNation",
            "Spies",
            "Levies",
            "LightInfantry",
            "HeavyInfantry",
            "Archers",
            "Crossbowmen",
            "LightCavalry",
            "HeavyCavalry",
            "EliteInfantry",
            "EliteCavalry",
            "HandCannon",
            "Musketeers",
            "Militia",
            "SiegeEquipment",
            "LargeSiegeEquipment",
            "Cannons",
            "FreeEliteUnitsCap",
            "OverallNumbers",
            "SmallForts",
            "MediumForts",
            "BigForts",
            "HugeForts",
            "ExtraCityFortifications",
            "LightShips",
            "MediumShips",
            "HeavyShips",
            "OverallShipCount",
            "PublicDebtLength",
            "Casualties",
            "MinorBattles",
            "MajorBattles",
            "Size",
            "MaxPopulation"
        ].indexOf(statName)) {
            numString = parseFloat(statValue).toFixed(0);
        }
        //percentages
        else if (~[
            "LowerClassTax",
            "MediumClassTax",
            "HighClassTax",
            "ReligionRepresentedAtGovernmentLevelPercent",
            "PopulationGrowth",
            "WarSupport",
            "ConscriptionPercent",
            "NobleInfluence",
            "NobleLoyalty",
            "ClergyInfluence",
            "ClergyLoyalty",
            "BurghersInfluence",
            "BurghersLoyalty",
            "MilitaryLoyalty",
            "MilitaryMorale",
            "MililtaryDiscipline",
            "PopulationInAgriculture",
            "PopulationInResourceHarvest",
            "PopulaitonInMilitary",
            "Artisans",
            "Clergy",
            "Nobility",
            "Burghers",
            "HighClass",
            "MediumClass",
            "LowerClass",
            "CultureRepresentedAtGovernmentLevelPercent",
            "Pillaging",
            "Occupation",
            "Fervor",
            "Disease",
            "HabitableLand"
        ].indexOf(statName)) {
            numString = parseFloat(statValue * 100).toFixed(2) + "%";
        }
        //normal (2 digits)
        else {
            numString = parseFloat(statValue).toFixed(2);
        }
        let numSize;
        if(numString.indexOf(".") == -1){
            numSize = numString.replace("%", "").length;
        }else{
            numSize = numString.indexOf(".");
        }

        let newNumString = "";
        if(numSize >= 5){
            for (let i = 0; i < numString.length; i++) {
                newNumString += numString[i];
                //only modify in case we are on the left hand side of the decimal point (if we have one), and we are at an index going into 3 from decimal point.
                if((numSize - i - 1) % 3 != 0 || i >= numSize) continue;
                newNumString += " ";
            }
        }
        else newNumString = numString;
        return {value: newNumString, appendable: false};
    } 
    //images
    else if(~[
        "Flag",
    ].indexOf(statName)){
        let image = document.createElement("img");
        image.src = statValue;
        image.alt = statValue.split("/").pop();
        return {value: image, appendable: true};
    }
    else
        return {value: statValue, appendable: false};

}