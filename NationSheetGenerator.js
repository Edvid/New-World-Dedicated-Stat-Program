let primaryColor = ["red", "green", "DodgerBlue", "purple", "Dark Orange"];
let secondaryColor = ["pink", "lightgreen", "lightSkyBlue", "magenta", "Orange"];

let nationSheetContainer = document.createElement("div");
nationSheetContainer.classList.add("nationsheet");

let arrowContainer = document.createElement("div");
arrowContainer.classList.add("arrowcontainer");

let currentNationID = 0;
let currentNationName = 'undefined';
let currentNationNameDisplay = document.createElement("h2");
currentNationNameDisplay.classList = "nationnamedisplay";
currentNationNameDisplay.innerText = currentNationName;

let leftArrow = document.createElement("button");
leftArrow.innerHTML = "&#11164";
leftArrow.onclick = function () {
    let nationNames = Object.keys(gameStats.Nations);
    if (currentNationID > 0) currentNationID--;
    else currentNationID = nationNames.length - 1;
    currentNationName = Object.keys(gameStats.Nations)[currentNationID];
    createNationSheet(currentNationName);
}

let rightArrow = document.createElement("button");
rightArrow.innerHTML = "&#11166";
rightArrow.onclick = function () {
    let nationNames = Object.keys(gameStats.Nations);
    if (currentNationID < nationNames.length - 1) currentNationID++;
    else currentNationID = 0;
    currentNationName = Object.keys(gameStats.Nations)[currentNationID];
    createNationSheet(currentNationName);
}

document.body.appendChild(currentNationNameDisplay);

arrowContainer.appendChild(leftArrow);
arrowContainer.appendChild(rightArrow);

document.body.appendChild(arrowContainer);
document.body.appendChild(nationSheetContainer);


function createNationSheet(nationName) {
    currentNationNameDisplay.innerText = nationName;
    const nation = gameStats.Nations[nationName];
    let table;

    let nationStatSections = [{}];
    let i = 0;
    let statBreakPoints = [
        "FutureDateInThisNation",
        "ReligiousDisunity",
        "Health",
        "EducationCostModifier",
        "Propaganda",
        "PopulationHappiness",
        "Stability",
        "Absolutism",
        "ConscriptionPercent",
        "ProductionEfficiency",
        "Mercantilism",
        "EffectiveDebt",
        "Inflation",
        "SpyQuality",
        "BurghersLoyalty",
        "PopulationControlUpkeep",
        "OverallIncome",
        "Militia",
        "OverallNumbers",
        "FortUpkeep",
        "ArmyQuality",
        "MililtaryDiscipline",
        "NavyQuality",
        "UpkeepForOneHeavyShip",
        "OverallShipCount",
        "NavyUpkeep",
        "New_EliteCavalry",
        "New_Cannons",
        "New_HeavyShips",
        "NewTroopRecruitmentPenalty",
        "Burghers",
        "LowerClass",
        "PopulationTechImpact",
        "FarmingEfficiency",
        "EffectiveCoal",
        "EffectiveSulphur",
        "CottonInflation",
        "GoldInflation",
        "EffectiveIron",
        "TeaInflation",
        "SilkInflation",
        "SpiceInflation",
        "WoolInflation",
        "CoffeeInflation",
        "FurInflation",
        "DiamondInflation",
        "SilverInflation",
        "EffectiveCopper",
        "IvoryInflation",
        "CocoaInflation",
        "TobaccoInflation",
        "SugarInflation",
        "ExoticFruitInflation",
        "ResourceBudgetBoost",
        "CoalValue",
        "GoldValue",
        "IronValue",
        "SulphurValue",
        "CottonValue",
        "TeaValue",
        "SpiceValue",
        "CopperValue",
        "SilkValue",
        "WoolValue",
        "CoffeeValue",
        "SilverValue",
        "DiamondValue",
        "FurValue",
        "IvoryValue",
        "CocoaValue",
        "TobaccoValue",
        "SugarValue",
        "ExoticFruitValue",
        "ResearchPoints",
        "Technologies",
        "ArmyTechBoost",
        "EffectiveTax",
        "DebtHappinessEffect",
        "Balance",
        "CulturalPower",
        "CulturalAdvancements",
        "FoodOutgoing",
        "CoalOutgoing",
        "SulphurOutgoing",
        "CottonOutgoing",
        "GoldOutgoing",
        "IronOutgoing",
        "TeaOutgoing",
        "SilkOutgoing",
        "SpiceOutgoing",
        "WoolOutgoing",
        "CoffeeOutgoing",
        "FurOutgoing",
        "DiamondOutgoing",
        "SilverOutgoing",
        "CopperOutgoing",
        "IvoryOutgoing",
        "CocoaOutgoing",
        "TobaccoOutgoing",
        "SugarOutgoing",
        "ExoticFruitOutgoing",
        "TradePowerResourceTrade",
        "AgricultureTechnology",
        "FoodPopulationBoost",
        "TradeProfit",
        "Fervor",
        "TradeInfluences",
        "LandAdministration",
        "Climates",
        "HabitableLand",
        "Food",
        "MilitaryExpendures"
    ]
    for (const nationStatName in nation) {
        const nationStat = nation[nationStatName];
        nationStatSections[i][nationStatName] = nationStat;
        if (statBreakPoints[i] == nationStatName) {
            nationStatSections[++i] = {};
        }
    }

    nationSheetContainer.innerHTML = "";

    /* #region  New Display */
    createStatTable([
        "FuturePopulation",
        "FutureLiteracyPercent",
        "FutureHigherEducation",
        "FutureBudget",	
        "FutureFood"
    ]);

    /* #endregion */

    /* #region  Raw Stats */

    let rawcontainer = document.createElement("div");
    rawcontainer.classList.add("raw");
    let rawstats = document.createElement("h2");
    rawstats.innerText = "Raw Stats"
    rawcontainer.appendChild(rawstats);

    for (const nationStatSectionIndex in nationStatSections) {
        const nationStatSection = nationStatSections[nationStatSectionIndex];
        table = document.createElement("table");

        let nationStatNameRow = document.createElement("tr");
        nationStatNameRow.style.background = primaryColor[currentNationID % primaryColor.length];
        let nationStatRow = document.createElement("tr");
        nationStatRow.style.background = secondaryColor[currentNationID % secondaryColor.length];

        for (const nationStatName in nationStatSection) {
            const nationStat = nation[nationStatName];
            let nationStatNameCell = document.createElement("th");
            nationStatNameCell.innerText = nationStatName.split(/(?<=[a-zA-Z])(?=[A-Z])/gm).join(" ");
            let nationStatCell = document.createElement("td");
            nationStatCell.style.textAlign = "center";
            if (!isNaN(nationStat)) {
                //integers
                if (~[
                    "Population",
                    "FuturePopulation"
                ].indexOf(nationStatName)) {
                    nationStatCell.innerText = parseFloat(nationStat).toFixed(0);
                }
                //percentages
                else if (~[
                    "LowerClassTax",
                    "MediumClassTax",
                    "HighClassTax",
                ].indexOf(nationStatName)) {
                    nationStatCell.innerText = parseFloat(nationStat * 100).toFixed(2) + "%";
                }
                //normal (2 digits)
                else {
                    nationStatCell.innerText = parseFloat(nationStat).toFixed(2);
                }

            } else
                nationStatCell.innerText = nationStat;

            nationStatRow.appendChild(nationStatCell);
            nationStatNameRow.appendChild(nationStatNameCell);
        }

        table.appendChild(nationStatNameRow);
        table.appendChild(nationStatRow);
        rawcontainer.appendChild(table);

    }
    nationSheetContainer.appendChild(rawcontainer);

    /* #endregion */


}

function createStat(name, val){
    
}

function createStatTable(stats){
    let table = document.createElement("table");
    let nationStatNameRow = document.createElement("tr");
    nationStatNameRow.style.background = primaryColor[currentNationID % primaryColor.length];
    let nationStatRow = document.createElement("tr");
    nationStatRow.style.background = secondaryColor[currentNationID % secondaryColor.length];
        
    for (let i = 0; i < stats.length; i++) {
        const statname = stats[i];
        const nation = gameStats.Nations[currentNationName];
        const statvalue = nation[statname]; 
        let nationStatNameCell = document.createElement("th");
        nationStatNameCell.innerText = statname.split(/(?<=[a-zA-Z])(?=[A-Z])/gm).join(" ");
        let nationStatCell = document.createElement("td");
        nationStatCell.style.textAlign = "center";
        nationStatCell.innerText = displayValueFix(statname, statvalue);    
        nationStatRow.appendChild(nationStatCell);
        nationStatNameRow.appendChild(nationStatNameCell);
    }
    
    table.appendChild(nationStatNameRow);
    table.appendChild(nationStatRow);
    nationSheetContainer.appendChild(table);
    return table;
}

function displayValueFix(statName, statValue){
    if (!isNaN(statValue)) {
        //integers
        if (~[
            "Population",
            "FuturePopulation"
        ].indexOf(statName)) {
            return parseFloat(statValue).toFixed(0);
        }
        //percentages
        else if (~[
            "LowerClassTax",
            "MediumClassTax",
            "HighClassTax",
        ].indexOf(statName)) {
            return parseFloat(statValue * 100).toFixed(2) + "%";
        }
        //normal (2 digits)
        else {
            return parseFloat(statValue).toFixed(2);
        }

    } else
        return statValue;

}