let primaryColor = ["red", "green", "DodgerBlue", "purple", "Dark Orange"];
let secondaryColor = ["pink", "lightgreen", "lightSkyBlue", "magenta", "Orange"];

let nationSheetContainer = document.createElement("div");
nationSheetContainer.classList.add("nationsheet");

let arrowContainer = document.createElement("div");
arrowContainer.classList.add("arrowcontainer");

let currentNationID = 0;
let currentNationName = 'undefined';
let currentNationNameDisplay = document.createElement("h1");
currentNationNameDisplay.classList = "nationnamedisplay";
currentNationNameDisplay.innerText = currentNationName;

let leftArrow = document.createElement("button");
leftArrow.innerHTML = "&#11164";
leftArrow.onclick = function () {
    let nationNames = Object.keys(gameStats.Nations);
    if (currentNationID > 0) currentNationID--;
    else currentNationID = nationNames.length - 1;
    currentNationName = Object.keys(gameStats.Nations)[currentNationID];
    dropdownselection.value = currentNationName;
    dropdownselection.onchange();
}

let rightArrow = document.createElement("button");
rightArrow.innerHTML = "&#11166";
rightArrow.onclick = function () {
    let nationNames = Object.keys(gameStats.Nations);
    if (currentNationID < nationNames.length - 1) currentNationID++;
    else currentNationID = 0;
    currentNationName = Object.keys(gameStats.Nations)[currentNationID];
    dropdownselection.value = currentNationName;
    dropdownselection.onchange();
}

let dropdown = document.createElement("form");
dropdown.id = "dropdownselection";
let dropdowntitle = document.createElement("label");
dropdowntitle.innerText = "Choose Nation:";
let dropdownselection = document.createElement("select");
dropdownselection.onchange = function(){
    currentNationID = this.selectedIndex;
    currentNationName = Object.keys(gameStats.Nations)[currentNationID];
    createNationSheet(currentNationName);
};

dropdown.appendChild(dropdowntitle);
dropdown.appendChild(dropdownselection);

function updateDropdownSelection(){
    for (const key in gameStats.Nations) {
        let option = document.createElement("option");
        option.value = key;
        option.innerText = key;
        dropdownselection.appendChild(option);
    }
}

document.body.appendChild(currentNationNameDisplay);

arrowContainer.appendChild(leftArrow);
arrowContainer.appendChild(rightArrow);

document.body.appendChild(arrowContainer);
document.body.appendChild(dropdown);
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

    createStatTable(
        "Flag and Government",
        [
            [
                "Flag"
            ],
            [
                "GovernmentName"
            ]
        ]
        );

    createStatTable(
        "Turn based stats",
        [
            [
                "FuturePopulation",
                "FutureLiteracyPercent",
                "FutureHigherEducation",
                "FutureBudget",	
                "FutureFood"
            ],
            [
                "Population",
                "LiteracyPercent",
                "HigherEducation",
                "Budget",	
                "Food"
            ],
            [
                "FutureResearchPoints",
                "FuturePublicDebtLength",
                "FutureCulturalPower",
                "FutureDateInThisNation"
            ],
            [
                "ResearchPoints",
                "PublicDebtLength",
                "CulturalPower",
                "DateInThisNation"
            ]
        ]
    );

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

function createStatTable(title, tables){
    let table = document.createElement("table");
    let tableTitle = document.createElement("h2");
    tableTitle.classList.add("tabletitle")
    tableTitle.innerText = title;
    for (let i = 0; i < tables.length; i++) {
        const stats = tables[i];
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
            let displayValue = displayValueFix(statname, statvalue);
            if(displayValue.appendable){
                nationStatCell.appendChild(displayValue.value);    
            }else{
                nationStatCell.innerText = displayValue.value;
            }
            nationStatRow.appendChild(nationStatCell);
            nationStatNameRow.appendChild(nationStatNameCell);
        }
        
        table.appendChild(nationStatNameRow);
        table.appendChild(nationStatRow);
    }
    nationSheetContainer.appendChild(tableTitle);    
    nationSheetContainer.appendChild(table);
}

function displayValueFix(statName, statValue){
    //numbers
    if (!isNaN(statValue)) {
        //integers
        if (~[
            "Population",
            "FuturePopulation",
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
            return {value: parseFloat(statValue).toFixed(0), appendable: false};
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
            return {value: parseFloat(statValue * 100).toFixed(2) + "%", appendable: false};
        }
        //normal (2 digits)
        else {
            return {value: parseFloat(statValue).toFixed(2), appendable: false};
        }

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