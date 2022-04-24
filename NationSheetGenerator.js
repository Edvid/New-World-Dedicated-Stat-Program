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
    dropdownselection.innerHTML = "";
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
    createOpinionMatrixTable("Culture Groups Opinions", "CultureGroups");
    createPieDiagram("ReligionGroups");
    createOpinionMatrixTable("Religion Groups Opinions", "ReligionGroups");
    
	createStatTable(
		"Population Stuff",
		[
			[
				"ReligionRepresentedAtGovernmentLevel",
				"CultureRepresentedAtGovernmentLevel",
				"PopulationStabilityImpact"
			],
			[
				"ReligionRepresentedAtGovernmentLevelPercent",
				"CultureRepresentedAtGovernmentLevelPercent",
				"PopulationTechImpact"
			],
			[
				"ReligiousDisunity",
				"CulturalDisunity",
				"PopulationGrowth"
			]
		]
	);
	
	createStatTable(
		"Basic Stats",
		[
			[
				"Health",
				"Corruption",
				"SocialSpending",
				"Stability",
				"Absolutism"
			],
			[
				"EducationEfficiency",
				"Overextension",
				"Prosperity",
				"AtWar",
				"PopulationControl"
			],
			[
				"AdministrativeEfficiency",
				"Propaganda",
				"PopulationHappiness",
				"WarSupport",
				"BirthControl"
			]
		]
	);
	
	createStatTable(
		"Budget Stats",
		[
			[
				"TradeEfficiency",
				"LocalTrade",
				"TradePower"
			],
			[
				"Mercantilism",
				"ProductionEfficiency",
				"Production"
			],
			[
				"Inflation",
				"DailyBudget",
				"Budget"
			],
			[
				"BudgetIncoming",
				"BudgetOutgoing",
				"Balance"
			],
			[
				"HighClassTax",
				"MediumClassTax",
				"LowerClassTax",
				"EffectiveTax"
			]
		]
	);
	
	createStatTable(
        "Debt Stats",
        [
            [
                "PossiblePublicDebt",
                "PublicDebtLength",
                "InterestRate"
            ],
            [
                "PublicDebtTaken",
                "EffectiveDebt",
                "DebtHappinessEffect"
            ]
        ]
    );
	
	createStatTable(
		"Upkeeps and Income",
		[
			[
				"ProductionRevenue",
				"TradeRevenue",
				"OverallIncome"
			],
			[
				"ArmyUpkeep",
				"NavyUpkeep",
				"FortUpkeep"
			],
			[
				"SpyUpkeep",
				"EducationUpkeep",
				"PopulationControlUpkeep"
			],
			[
				"SocialSpendingUpkeep",
				"AgricultureSpending",
				"AdministrativeUpkeep"
			],
			[
				"HygieneUpkeep",
				"ResearchUpkeep",
				"PropagandaUpkeep"
			]
		]
	);
	
	createStatTable(
		"Army Units",
		[
			[
				"Levies",
				"Militia",
				"LightInfantry",
				"HeavyInfantry",
			],
			[
				"Archers",
				"Crossbowmen",
				"HandCannon",
				"Musketeers"
			],
			[
				"LightCavalry",
				"HeavyCavalry",
				"SiegeEquipment",
				"LargeSiegeEquipment"
			],
			[
				"Cannons",
				"EliteInfantry",
				"EliteCavalry",
				"FreeEliteUnitsCap"
			],
			[
				"OverallNumbers",
				"Spies"
			]
		]
	);
	
	createStatTable(
		"Fortifications",
		[
			[
				"SmallForts",
				"MediumForts",
				"BigForts",
				"HugeForts",
				"ExtraCityFortifications"
			]
		]
	);
	
	createStatTable(
		"Army Stats",
		[
			[
				"IronShortage",
				"SulphurShortage",
				"ArmyWages"
			],
			[
				"CommanderFreedom",
				"TrainingQuality",
				"MilitaryTactics"
			],
			[
				"ArmyTech",
				"ArmyQuality",
				"SpyQuality"
			],
			[
				"MilitaryLoyalty",
				"MilitaryMorale",
				"MililtaryDiscipline"
			]
		]
	);
	
	createStatTable(
		"Navy",
		[
			[
				"UpkeepForOneLightShip",
				"UpkeepForOneMediumShip",
				"UpkeepForOneHeavyShip"
			],
			[
				"LightShips",
				"MediumShips",
				"HeavyShips"
			],
			[
				"NavyImprovements",
				"NavyTech",
				"NavyQuality"
			],
			[
				"OverallShipCount",
				"PrideOfTheNavy",
			],
			[
				"TradeProtection",
				"NavalPower"
			]
		]
	);
	
	createStatTable(
        "Agriculture",
        [
            [
                "Fertility",
                "AgricultureSubsidies",
                "AgricultureInfrastructure",
                "AgricultureAdvancements",
                "AgricultureTechnology",
                "FarmingEfficiency",
                "AgricultureSpending"
            ],
            [
                ".Workforces[\"Population In Agriculture\"]",
                "DailyFood",
                "FoodConsumption",
                "FoodGain",
                "StockingCapabilities",
                "MaxFoodStock",
                "SellingCapability"
            ],
            [
                "Food",
                "FutureFood",
                "SurplusFood",
                "FoodSold",
                "Foodlost",
                "TradeProfit",
                "FoodPopulationBoost"
            ]
        ]
    );
	
	createStatTable(
        "War Stats",
        [
            [
                "Casualties",
                "Pillaging",
                "Occupation",
                "MinorBattles",
                "MajorBattles",
                "WarExhaustion",
                "Fervor"
            ]
        ]
    );
	
    createPieDiagram("Climates", "Pixels");
	
	createStatTable(
        "Land Stats",
        [
            [
                "Size",
                "KmSquared",
                "PopulationDensityPerKmSquared",
                "Disease",
                "UnderPopulation"
            ],
            [
                "MaxPopulation",
                "DetachedLand",
                "LandAdministration",
                "Overextension",
                "HabitableLand"
            ]
        ]
    );

    createPieDiagram("NobleLoyaltyGroups");
    createPieDiagram("ClergyLoyaltyGroups");
    createPieDiagram("BurghersLoyaltyGroups");
    

    createPieDiagram("Workforces");
    createPieDiagram("SocietalClasses");

    createPieDiagram("TradeInfluences");
	
	createStatTable(
        "Trade Influence - Americas",
        [
            [
                ".TradeInfluences[\"Alaska\"]",
                ".TradeInfluences[\"Cascadia\"]",
                ".TradeInfluences[\"WestCoast\"]",
                ".TradeInfluences[\"HudsonBay\"]",
                ".TradeInfluences[\"GreatLakes\"]",
                ".TradeInfluences[\"Mississipi\"]",
                ".TradeInfluences[\"GulfOfMexico\"]",
                ".TradeInfluences[\"LawrenceGulf\"]",
                ".TradeInfluences[\"EastCoast\"]",
                ".TradeInfluences[\"Carribean\"]",
                ".TradeInfluences[\"CentralAmerica\"]"
            ],
			[
				".TradeInfluences[\"GuyanaAndSuriname\"]",
                ".TradeInfluences[\"Amazon\"]",
                ".TradeInfluences[\"Peru\"]",
                ".TradeInfluences[\"RioGrande\"]",
                ".TradeInfluences[\"LaPlata\"]",
                ".TradeInfluences[\"Chile\"]",
                ".TradeInfluences[\"Patagonia\"]"
			]
        ]
    );
	
	createStatTable(
        "Trade Influence - Europe",
        [
            [
                ".TradeInfluences[\"NorthSea\"]",
                ".TradeInfluences[\"BritishIsles\"]",
                ".TradeInfluences[\"EnglishChannel\"]",
                ".TradeInfluences[\"France\"]",
                ".TradeInfluences[\"BayOfBiscay\"]",
                ".TradeInfluences[\"WestIberia\"]",
                ".TradeInfluences[\"Gibraltar\"]",
                ".TradeInfluences[\"WestMediterreanian\"]",
                ".TradeInfluences[\"Rhine\"]"
            ],
			[
				".TradeInfluences[\"CentralMed\"]",
                ".TradeInfluences[\"Adriatic\"]",
                ".TradeInfluences[\"Germany\"]",
                ".TradeInfluences[\"SouthGermany\"]",
                ".TradeInfluences[\"Denmark\"]",
                ".TradeInfluences[\"Baltic\"]",
                ".TradeInfluences[\"NorthNordics\"]",
                ".TradeInfluences[\"BarentsSea\"]"
			],
			[
				".TradeInfluences[\"Novgorod\"]",
                ".TradeInfluences[\"Poland\"]",
                ".TradeInfluences[\"Dniepr\"]",
                ".TradeInfluences[\"Crimea\"]",
                ".TradeInfluences[\"Balkans\"]",
                ".TradeInfluences[\"Greece\"]",
                ".TradeInfluences[\"NorthAnatolia\"]",
                ".TradeInfluences[\"EastMed\"]"
			]
        ]
    );
	
	createStatTable(
        "Trade Influence - Africa",
        [
            [
                ".TradeInfluences[\"Egypt\"]",
                ".TradeInfluences[\"RedSea\"]",
                ".TradeInfluences[\"WestAfrica\"]",
                ".TradeInfluences[\"CoteDIvoire\"]",
                ".TradeInfluences[\"Nigeria\"]",
                ".TradeInfluences[\"SouthNile\"]",
                ".TradeInfluences[\"Somalia\"]",
                ".TradeInfluences[\"Kongo\"]",
                ".TradeInfluences[\"EastAfrica\"]",
                ".TradeInfluences[\"Mozambique\"]",
                ".TradeInfluences[\"SouthAfrica\"]"
            ]
        ]
    );

	createStatTable(
        "Trade Influence - Asia",
        [
            [
                ".TradeInfluences[\"Mesopotamia\"]",
                ".TradeInfluences[\"PersianGulf\"]",
                ".TradeInfluences[\"Caucasus\"]",
                ".TradeInfluences[\"DonRiver\"]",
                ".TradeInfluences[\"Volga\"]",
                ".TradeInfluences[\"CentralAsia\"]",
                ".TradeInfluences[\"WestSiberia\"]",
                ".TradeInfluences[\"EastSiberia\"]"
            ],
			[
				".TradeInfluences[\"Iran\"]",
                ".TradeInfluences[\"Pakistan\"]",
                ".TradeInfluences[\"Tibet\"]",
                ".TradeInfluences[\"Mongolia\"]",
                ".TradeInfluences[\"Manchuria\"]",
                ".TradeInfluences[\"SeaOfJapan\"]",
                ".TradeInfluences[\"NorthChina\"]",
                ".TradeInfluences[\"YangtzeeRiver\"]"
			],
			[
				".TradeInfluences[\"SouthChina\"]",
                ".TradeInfluences[\"NorthIndia\"]",
                ".TradeInfluences[\"WestIndia\"]",
                ".TradeInfluences[\"EastIndia\"]",
                ".TradeInfluences[\"Burma\"]",
                ".TradeInfluences[\"SouthEastAsia\"]",
                ".TradeInfluences[\"NorthAustralia\"]",
                ".TradeInfluences[\"SouthAustralia\"]"
			]
        ]
    );

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

	createStatTable(
        "Tech Stats",
        [
            [
                "Isolation",
                "ResearchSpending",
                "ResearchEffectiveness",
                "ResearchBoostFromTech",
                "ResearchPointGain",
                "ResearchPoints",
                "FutureResearchPoints"
            ]
        ]
    );

    createStatTable("Technologies", techarray);
	
	createStatTable(
        "Culture Stats",
        [
            [
                "CulturalAdvance",
                "CulturalProsperity",
                "CulturalPowerGain",
                "CulturalPower",
                "FutureCulturalPower"
            ]
        ]
    );
	
    createStatTable("Cultural Advancements", culturalarray);
	
	createStatTable(
        "Resources",
        [
			[
				"MiningEfficiency"
			],
            [
                "Coal",
                "Sulphur",
                "Iron",
                "Copper"
            ],
            [
                "EffectiveCoal",
                "EffectiveSulphur",
                "EffectiveIron",
                "EffectiveCopper"
            ],
            [
                "Cotton",
                "Gold",
                "Tea",
                "Silk",
                "Spice",
                "Wool",
                "Coffee",
                "Fur",
				"Diamond",
				"Silver",
				"Ivory",
				"Cocoa",
				"Tobacco",
				"Sugar",
				"ExoticFruit"
            ],
            [
                "EffectiveCotton",
                "EffectiveGold",
                "EffectiveTea",
                "EffectiveSilk",
                "EffectiveSpice",
                "EffectiveWool",
                "EffectiveCoffee",
                "EffectiveFur",
				"EffectiveDiamond",
				"EffectiveSilver",
				"EffectiveIvory",
				"EffectiveCocoa",
				"EffectiveTobacco",
				"EffectiveSugar",
				"EffectiveExoticFruit"
            ],
            [
                "CottonInflation",
                "GoldInflation",
                "TeaInflation",
                "SilkInflation",
                "SpiceInflation",
                "WoolInflation",
                "CoffeeInflation",
                "FurInflation",
				"DiamondInflation",
				"SilverInflation",
				"IvoryInflation",
				"CocoaInflation",
				"TobaccoInflation",
				"SugarInflation",
				"ExoticFruitInflation"
            ],
			[
				"ResourcePopulationGrowthBoost",
				"ResourceHappinessBoost",
				"ResourceBudgetBoost"
			]
        ]
    );

    createStatTable(
        "Resource Prices",
        [
            [
                "CoalDemand",
                "GoldDemand",
                "IronDemand",
                "SulphurDemand",
                "CottonDemand",
                "TeaDemand",
                "SpiceDemand",
                "CopperDemand",
                "SilkDemand",
				"WoolDemand"
            ],
            [
                "CoalValue",
                "GoldValue",
                "IronValue",
                "SulphurValue",
                "CottonValue",
                "TeaValue",
                "SpiceValue",
                "CopperValue",
                "SilkValue",
				"WoolValue"
            ],
            [
                "CoffeeDemand",
                "SilverDemand",
                "DiamondDemand",
                "FurDemand",
                "IvoryDemand",
                "CocoaDemand",
                "TobaccoDemand",
                "SugarDemand",
                "ExoticFruitDemand"
            ],
            [
                "CoffeeValue",
                "SilverValue",
                "DiamondValue",
                "FurValue",
                "IvoryValue",
                "CocoaValue",
                "TobaccoValue",
                "SugarValue",
                "ExoticFruitValue"
            ]
        ]
    );

    createStatTable(
        "Resource Trade",
        [
            [
                "FoodIncoming",
                "CoalIncoming",
                "SulphurIncoming",
                "CottonIncoming",
                "GoldIncoming",
                "IronIncoming",
                "TeaIncoming",
                "SilkIncoming",
                "SpiceIncoming",
				"WoolIncoming"
            ],
            [
                "FoodOutgoing",
                "CoalOutgoing",
                "SulphurOutgoing",
                "CottonOutgoing",
                "GoldOutgoing",
                "IronOutgoing",
                "TeaOutgoing",
                "SilkOutgoing",
                "SpiceOutgoing",
				"WoolOutgoing"
            ],
            [
                "CoffeeIncoming",
                "FurIncoming",
                "DiamondIncoming",
                "SilverIncoming",
                "CopperIncoming",
                "IvoryIncoming",
                "CocoaIncoming",
                "TobaccoIncoming",
                "SugarIncoming",
				"ExoticFruitIncoming"
            ],
            [
                "CoffeeOutgoing",
                "FurOutgoing",
                "DiamondOutgoing",
                "SilverOutgoing",
                "CopperOutgoing",
                "IvoryOutgoing",
                "CocoaOutgoing",
                "TobaccoOutgoing",
                "SugarOutgoing",
				"ExoticFruitOutgoing"
            ],
			[
				"TradePowerResourceTrade"
			]
        ]
    );

    /* #endregion */

    //fix size of notapplicables
    let NAs = document.querySelectorAll(".notapplicable");
    NAs.forEach(element => {
        element.style.width = element.parentElement.clientWidth + "px";
        element.style.height = element.parentElement.clientHeight + "px";
    });
}

function createStatTable(title, tables){
    let tablecontainer = document.createElement("div");
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
            const statSelection = stats[i];
            //if first char of string is alphabetic (not symbol), add courtesy dot first, else, we expect the user of createStatTable to know what they're doing
            const statvalue = /^[a-zA-Z]$/.test(statSelection[0]) ?
            (new Function(`return gameStats.Nations["${currentNationName}"].${statSelection}`))() :
            (new Function(`return gameStats.Nations["${currentNationName}"]${statSelection}`))(); 
            let nationStatNameCell = document.createElement("th");
            let statName = statSelection.split(/(\.|(?<=\[))/gmi).pop().replace(/(\[|\"| |\])/gmi, "");
            nationStatNameCell.innerText = statName.split(/(?<=[a-zA-Z])(?=[A-Z])/gm).join(" ");
            let nationStatCell = document.createElement("td");
            nationStatCell.style.textAlign = "center";
            let displayValue = displayValueFix(statName, statvalue);
            if(displayValue.appendable){
                nationStatCell.appendChild(displayValue.value);    
            }else{
                nationStatCell.innerText = displayValue.value;
            }

            let statTypeIcon = document.createElement("img");
            switch(getStatType(statName)){
                case "Base":
                    statTypeIcon.src = "images/Base.png"; //red
                    statTypeIcon.alt = "Base";
                    statTypeIcon.title = "Base Stat: This is RPable";
                    break;
                case "Derived":
                    statTypeIcon.src = "images/Derived.png";
                    statTypeIcon.alt = "Derived";
                    statTypeIcon.title = "Derived Stat: This is calculated through a formula of other stats. You can not change this stat";
                    break;
                case "Constant":
                    statTypeIcon.src = "images/Constant.png"; //orange
                    statTypeIcon.alt = "Constant";
                    statTypeIcon.title = "Constant: This stat will not change throughout the game, and it is the same for all players";
                    break;
                case "Turn Based":
                    statTypeIcon.src = "images/Turn Based.png"; //pink
                    statTypeIcon.alt = "Turn Based";
                    statTypeIcon.title = "Turn Based Stat: This takes its future form the next turn. You can not change this stat";
                    break;
                case "War":
                    statTypeIcon.src = "images/War.png"; //red
                    statTypeIcon.alt = "War";
                    statTypeIcon.title = "War: This stat can change through Role play in war, and may be changed by War GMs as well as Stat Updaters";
                    break;
                case "Unknown":
                    statTypeIcon.src = "images/Unknown.png"; //black
                    statTypeIcon.alt = "Unknown!";
                    statTypeIcon.title = "Unknown!";
                break;
            }
            statTypeIcon.classList.add("stattypeicon");
            nationStatRow.appendChild(nationStatCell);
            nationStatNameCell.appendChild(statTypeIcon);
            nationStatNameRow.appendChild(nationStatNameCell);
        }
        
        table.appendChild(nationStatNameRow);
        table.appendChild(nationStatRow);
    }

    tablecontainer.appendChild(tableTitle);    
    tablecontainer.appendChild(table);

    nationSheetContainer.appendChild(tablecontainer);
}

function createOpinionMatrixTable(title, SocialBehaviourGroups){
    let tablecontainer = document.createElement("div");
    let table = document.createElement("table");
    table.classList.add("opiniontable");
    let tableTitle = document.createElement("h2");
    tableTitle.classList.add("tabletitle")
    tableTitle.innerText = title;
    let nationsSocialBehaviourGroups = gameStats.Nations[currentNationName][SocialBehaviourGroups];
    let RelevantSocialBehaviours = gameStats[SocialBehaviourGroups.replace("Group", "")];
    let opinioneeNameRow = document.createElement("tr");
    let blankCornerCell = document.createElement("th");
    blankCornerCell.style.background = primaryColor;
    opinioneeNameRow.appendChild(blankCornerCell);

    for (const opinioneeName in nationsSocialBehaviourGroups) {
        let opinioneeNameCell = document.createElement("th");
        opinioneeNameCell.style.background = primaryColor;
        opinioneeNameCell.innerText = opinioneeName;
        opinioneeNameRow.appendChild(opinioneeNameCell);
    }
    table.appendChild(opinioneeNameRow);
    for (const opinionerName in nationsSocialBehaviourGroups) {
        let opRow = document.createElement("tr");
        let opinionerNameCell = document.createElement("th");
        opinionerNameCell.style.background = primaryColor;
        opinionerNameCell.innerHTML = opinionerName + " Opinion on ...";
        opRow.appendChild(opinionerNameCell);
        for (const opinioneeName in nationsSocialBehaviourGroups) {
            let cell = document.createElement("td");
            cell.style.background = secondaryColor;
            if(opinionerName == opinioneeName){
                
                let cross = document.createElement("img");
                cross.src = "images/NotApplicable.gif";
                cross.classList.add("notapplicable");
                cross.style.display = "block";
                cell.style.padding = "0px";
                cell.style.margin = "0px";
                cell.appendChild(cross);
            } 
            else{
                let op = RelevantSocialBehaviours[opinionerName].Opinions[opinioneeName];
                let img = document.createElement("img");
                img.style.width = "40px";
                img.style.height = "40px";
                let score;
                if(typeof op != 'undefined'){
                    score = op.Score;
                    if (isNaN(score)){
                        score = Opinion[score];
                    }
                    if(score <= -75){
                        img.src = Opinion.UndesiredImage;
                    }else if(score <= -25){
                        img.src = Opinion.SkepticalImage;
                    }else if(score > 25){
                        img.src = Opinion.FondImage;
                    }else if(score > 75){
                        img.src = Opinion.ObsessedImage;
                    }else{
                        img.src = Opinion.NeutralImage;
                    }

                }else{
                    img.src = Opinion.NeutralImage;
                    score = 0;
                }
                
                let scoreElement = document.createElement("p");
                scoreElement.innerText = score;

                let all = document.createElement("div");
                all.appendChild(img);
                all.appendChild(scoreElement);

                cell.appendChild(all);
            }
            opRow.appendChild(cell);
        }
        table.appendChild(opRow);
    }

    tablecontainer.appendChild(tableTitle);    
    tablecontainer.appendChild(table);

    nationSheetContainer.appendChild(tablecontainer);
    
    let breaker = document.createElement("div");
    breaker.style.width = "1200px";
    breaker.style.height = "1px";

    nationSheetContainer.appendChild(breaker);
}

function createPieDiagram(SocialBehaviourGroups, ValName){
    let ValueName = ValName;
    if(typeof ValueName == 'undefined') ValueName = "Points"
    
    let tablecontainer = document.createElement("div");
    let title = document.createElement("h2");
    title.innerText = SocialBehaviourGroups.split(/(?<=[a-zA-Z])(?=[A-Z])/gm).join(" ");
    title.classList.add("tabletitle");

    let nationsSocialBehaviourGroups = gameStats.Nations[currentNationName][SocialBehaviourGroups];

    var chartdiv = document.createElement("div");
    //styling on chart

    chartdiv.style.margin = ".5em";
    chartdiv.style.textAlign = "center";
    chartdiv.style.width = "500px";
    chartdiv.style.height = "360px";
    chartdiv.style.border = "1px dotted grey";

    tablecontainer.appendChild(title);    
    tablecontainer.appendChild(chartdiv);

    nationSheetContainer.appendChild(tablecontainer);


    
    let root = am5.Root.new(chartdiv);
    
    let chart = root.container.children.push(
        am5percent.PieChart.new(root, {
          layout: root.verticalLayout
        }) 
      );
    
    

    let socialBehaviourGroupsData = [];
    for (const key in nationsSocialBehaviourGroups) {
        const nationsSocialBehaviourGroup = nationsSocialBehaviourGroups[key];

        let ps = nationsSocialBehaviourGroup;
        while(isNaN(ps)){
            if(ps === null) {
                ps = 0;
            }else if(typeof ps === 'object'){
                ps = ps[ValueName];
            }
        }
        
        if(ps === 0) continue;

        socialBehaviourGroupsData.push(
            {
                country: key,
                Points: ps
            }
        );
    }

    var series = chart.series.push(
        am5percent.PieSeries.new(root, {
            name: "Series",
            categoryField: "country",
            valueField: "Points",
            legendLabelText: "[{fill}]{category}[/]",
            legendValueText: ValueName == "Points" ? "[bold {fill}][/]" : `[bold {fill}]{value} ${ValueName}[/]`
        })
    );

    series.data.setAll(socialBehaviourGroupsData);
    series.labels.template.set("visible", false);
    series.ticks.template.set("visible", false);

    // Add legend
    var legend = chart.children.push( 
        am5.Legend.new(root, {
            centerX: am5.percent(50),
            x: am5.percent(50),
            layout: root.verticalLayout
        })
    );
    
    legend.data.setAll(series.dataItems);
}
