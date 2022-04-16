let primaryColor = "DodgerBlue";
let secondaryColor = "lightSkyBlue";

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
        option.innerText = key.split(/(?<=[a-zA-Z])(?=[A-Z])/gm).join(" ");
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
    currentNationNameDisplay.innerText = nationName.split(/(?<=[a-zA-Z])(?=[A-Z])/gm).join(" ");
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
        "Turn Based Stats",
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

    createPieDiagram("CultureGroups");
    createPieDiagram("ReligionGroups");
    
    createPieDiagram("Climates", "Pixels");

    
    createPieDiagram("NobleLoyaltyGroups");
    createPieDiagram("ClergyLoyaltyGroups");
    createPieDiagram("BurghersLoyaltyGroups");
    
    createPieDiagram("TradeInfluences");

    let techarray = [[]]
    i = 0;
    let techBreakPoints = [
        "HorseCollar",
        "Firelance",
        "SappersAndEngineers",
        "StandardizedPikes",
        "Gunports",
        "Mortars",
        "Experimentation",
        "Flintlock"
    ];

    for (const techname in gameStats.Nations[currentNationName].Technologies) {
        techarray[i].push("Technologies." + techname);
        if (techBreakPoints[i] == techname) techarray[++i] = [];
    }

    let culturalarray = [[]]
    i = 0;
    let cultureBreakPoints = [
        "Feudalism",
        "NobleDuty",
        "Courthouses",
        "EarlyModernAdministration",
        "Newspapers"
    ];

    for (const cultname in gameStats.Nations[currentNationName].CulturalAdvancements) {
        culturalarray[i].push("CulturalAdvancements." + cultname);
        if (cultureBreakPoints[i] == cultname) culturalarray[++i] = [];
    }

    createStatTable("Technologies", techarray);
    createStatTable("Cultural Advancements", culturalarray);

    

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
        nationStatNameRow.style.background = primaryColor;
        let nationStatRow = document.createElement("tr");
        nationStatRow.style.background = secondaryColor;

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
        nationStatNameRow.style.background = primaryColor;
        let nationStatRow = document.createElement("tr");
        nationStatRow.style.background = secondaryColor;
            
        for (let i = 0; i < stats.length; i++) {
            const statname = stats[i];
            const statvalue = (new Function(`return gameStats.Nations["${currentNationName}"].${statname}`))(); 
            let nationStatNameCell = document.createElement("th");
            nationStatNameCell.innerText = statname.split(".").pop().split(/(?<=[a-zA-Z])(?=[A-Z])/gm).join(" ");
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

function createPieDiagram(SocialBehaviourGroups, PointName){
    if(typeof PointName == 'undefined') PointName = "Points"

    let title = document.createElement("h2");
    title.innerText = SocialBehaviourGroups.split(/(?<=[a-zA-Z])(?=[A-Z])/gm).join(" ");
    title.classList.add("tabletitle");
    nationSheetContainer.appendChild(title);

    let nationsSocialBehaviourGroups = gameStats.Nations[currentNationName][SocialBehaviourGroups];

    var chartdiv = document.createElement("div");
    //styling on chart

    chartdiv.style.margin = ".5em";
    chartdiv.style.textAlign = "center";
    chartdiv.style.width = "90%";
    chartdiv.style.height = "360px";
    nationSheetContainer.appendChild(chartdiv);
    
    let root = am5.Root.new(chartdiv);
    let chart = root.container.children.push(
    am5percent.PieChart.new(root, {})
    );
    
    var series = chart.series.push(
        am5percent.PieSeries.new(root, {
          name: "Series",
          categoryField: "country",
          valueField: "Points"
        })
      );

    let sbgs = [];
    for (const key in nationsSocialBehaviourGroups) {
        const nationsSocialBehaviourGroup = nationsSocialBehaviourGroups[key];

        let ps = nationsSocialBehaviourGroup;
        while(isNaN(ps)){
            if(ps === null) {
                ps = 0;
            }else if(typeof ps === 'object'){
                ps = ps[PointName];
            }
        }
        
        if(ps === 0) continue;

        sbgs.push(
            {
                country: key,
                Points: ps
            }
        );
    }

    series.data.setAll(sbgs);
}

function displayValueFix(statName, statValue){
    //numbers
    if (!isNaN(statValue)) {
        if(typeof statValue === 'boolean'){
            let ret = document.createElement("span");
            ret.innerHTML = statValue ? '&#10003;' : '&#10008;'; 
            return {value: ret, appendable: true};
        }

        let numString;
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