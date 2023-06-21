let advancedSettingsToggle = document.createElement("button");
advancedSettingsToggle.classList.add("collapsible");
advancedSettingsToggle.id = "advancedsettingstoggle";
advancedSettingsToggle.innerText = "Show advanced settings";

let advancedSettings = document.createElement("div");
advancedSettings.classList.add("content");
advancedSettings.id = "advancedsettings";

let cffContainer = document.createElement("div");
let loadingContainer = document.createElement("div");
loadingContainer.style.minHeight = "20px"

let DownloadButtonContainer = document.createElement("div");

let downloadbutton = document.createElement("button");
downloadbutton.innerText = "Download gameStats as JSON";
downloadbutton.style.color = "#000";
downloadbutton.addEventListener('click', () => {
    let jsonobj = {
        Lines: changeCommandFileLength,
        Hash: preloadStatChanges.replace(/\r?\n/gmi, "").hashCode(),
        State: gameStats
    };
    let downloadString = JSON.stringify(jsonobj, null, 4);

    downloadToFile(downloadString, 'safefile.json', 'application/json');
});
DownloadButtonContainer.appendChild(downloadbutton);


let uploadccf = document.createElement("div");
let uploadccffileform = document.createElement("form");
let uploadccffileinputtitle = document.createElement("h3");
uploadccffileinputtitle.innerText = "Choose A Saved File";
let uploadccffileinput = document.createElement("input");
uploadccffileinput.type = "file";
uploadccffileinput.id = "myFile";
uploadccffileinput.name = "filename";
uploadccffileinput.onchange = (e) => {
    var file = e.target.files[0];
    var reader = new FileReader();
    reader.onload = function (e) {
        changes = e.target.result.split(/\r?\n|\r/);
        loadChangesFromContent(changes, 0);
    };

    reader.readAsText(file);
}
uploadccffileform.appendChild(uploadccffileinput);
let uploadccftextinputtitle = document.createElement("h3");
uploadccftextinputtitle.innerText = "Paste Text"
let uploadccftextform = document.createElement("div");
let uploadccftextinput = document.createElement("textarea");
uploadccftextinput.cols = "70";
uploadccftextinput.rows = "18";
let uploadccftextinputsubmit = document.createElement("button");
uploadccftextinputsubmit.innerText = "Submit";
uploadccftextinputsubmit.classList.add("submitccf");
uploadccftextinputsubmit.disabled = true;

uploadccftextinput.addEventListener('input', (e) => {
    uploadccftextinputsubmit.disabled = false;
});

uploadccftextinputsubmit.onclick = (e) => {
    changes = uploadccftextinput.value.split(/\r?\n|\r/);
    uploadccftextinputsubmit.disabled = true;
    loadChangesFromContent(changes, 0);
}

let downloadbuttonshowing = false;
async function populateAdvancedSettings() {
    if (typeof advancedSettings === 'undefined') return;
    displayProgress();
}

async function displayProgress() {

    let lines = changeCommandFileLength;
    let line = changeCommandIndex;

    loadingContainer.innerHTML = "";
    if (lines > line) {
        let loadingFieldTitle = document.createElement("p");
        loadingFieldTitle.innerText = "Generating All nation Stats...";

        let bar = document.createElement("canvas");
        bar.width = 100;
        bar.height = 20;
        let barctx = bar.getContext("2d");

        barctx.lineWidth = 3;
        barctx.fillStyle = 'green'
        barctx.fillRect(0, 0, (HashMatchedTill / lines) * 100, 20);
        barctx.fillStyle = 'black'
        barctx.fillRect((HashMatchedTill / lines) * 100, 0, ((line - HashMatchedTill) / lines) * 100, 20);
        barctx.strokeRect(0, 0, 100, 20);

        let loadingText = document.createElement("p");
        loadingText.style.fontStyle = "Italic";
        loadingText.style.fontSize = "12px";
        loadingText.style.color = "grey";
        loadingText.innerText = `line ${line} / ${lines} lines loaded`;
        loadingContainer.appendChild(loadingFieldTitle);
        loadingContainer.appendChild(bar);
        loadingContainer.appendChild(loadingText);

        if (downloadbutton.style.color != "#f00") downloadbutton.style.color = "#f00"
    } else {
        if (downloadbutton.style.color != "#000") downloadbutton.style.color = "#000"
    }
}

uploadccftextform.appendChild(uploadccftextinput);
uploadccftextform.appendChild(document.createElement("br"));
uploadccftextform.appendChild(uploadccftextinputsubmit);


cffContainer.appendChild(uploadccffileinputtitle);
cffContainer.appendChild(uploadccffileform);
cffContainer.appendChild(uploadccftextinputtitle);
cffContainer.appendChild(uploadccftextform);

advancedSettings.appendChild(cffContainer);
advancedSettings.appendChild(loadingContainer);
advancedSettings.appendChild(DownloadButtonContainer);

let nationSheetContainer = document.createElement("div");
nationSheetContainer.classList.add("nationsheet");

let arrowContainer = document.createElement("div");
arrowContainer.classList.add("arrowcontainer");

const URLParamNationID = new URLSearchParams(window.location.search).get('nat');
let currentNationID = URLParamNationID != null ? URLParamNationID - 1 : 0;
let currentNationName = 'undefined';
let currentNationNameDisplay = document.createElement("h1");
currentNationNameDisplay.classList = "nationnamedisplay";
currentNationNameDisplay.innerText = currentNationName;

let leftArrow = document.createElement("button");
let leftarrowimg = document.createElement("img");
leftarrowimg.src = "docs/assets/images/leftarrow.png";
leftarrowimg.alt = "left arrow";
leftarrowimg.height = 40;
leftArrow.appendChild(leftarrowimg);
leftArrow.onclick = function () {
    let nationNames = Object.keys(gameStats.Nations);
    if (currentNationID > 0) currentNationID--;
    else currentNationID = nationNames.length - 1;
    currentNationName = Object.keys(gameStats.Nations)[currentNationID];
    dropdownselection.value = currentNationName;
    dropdownselection.onchange();
}

let rightArrow = document.createElement("button");
let rightarrowimg = document.createElement("img");
rightarrowimg.src = "docs/assets/images/rightarrow.png";
rightarrowimg.alt = "right arrow";
rightarrowimg.height = 40;
rightArrow.appendChild(rightarrowimg);
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
dropdownselection.onchange = function () {
    currentNationID = this.selectedIndex;
    currentNationName = Object.keys(gameStats.Nations)[currentNationID];
    createNationSheet(currentNationName);
}

dropdown.appendChild(dropdowntitle);
dropdown.appendChild(dropdownselection);

let SearchStatContainer = document.createElement("form");
SearchStatContainer.id = "searchstatcontainer";

let searchStatLabel = document.createElement("label");
let searchStat = document.createElement("input");
searchStat.type = "text";
searchStatLabel.innerText = "search stat: ";
const URLParamStatQuerry = new URLSearchParams(window.location.search).get('q');
searchStat.value = URLParamStatQuerry != null ? URLParamStatQuerry : "";
let searchStatValue = URLParamStatQuerry != null ? URLParamStatQuerry : "";
searchStat.addEventListener('input', (e) => {
    searchStatValue = searchStat.value;
    createNationSheet(currentNationName);
});
SearchStatContainer.appendChild(searchStatLabel);
SearchStatContainer.appendChild(searchStat);


function updateDropdownSelection() {
    dropdownselection.innerHTML = "";
    dropdownselection.classList.add("dropdown");
    let maxlength = 0;
    for (const key in gameStats.Nations) {
        if (maxlength < key.capitalSpacing().length) maxlength = key.capitalSpacing().length;
    }
    let index = 1;
    for (const key in gameStats.Nations) {
        let option = document.createElement("option");
        option.value = key;
        let spacedkeywithmargin = key.capitalSpacing();
        spacedkeywithmargin += ".".repeat(maxlength - spacedkeywithmargin.length);
        option.innerText = `${spacedkeywithmargin} - ${index++}`;
        dropdownselection.appendChild(option);
    }
    dropdownselection.selectedIndex = currentNationID;
}

document.body.appendChild(advancedSettingsToggle);
document.body.appendChild(advancedSettings);


document.body.appendChild(currentNationNameDisplay);

arrowContainer.appendChild(leftArrow);
arrowContainer.appendChild(rightArrow);

document.body.appendChild(arrowContainer);
document.body.appendChild(dropdown);
document.body.appendChild(SearchStatContainer);
document.body.appendChild(nationSheetContainer);

function ti(zone) {
    return `.TradeInfluences["${zone}"].TradingPoints`
}

let TableLayouts = {
    "Flag and Government": [
        ["Flag"],
        ["GovernmentName"],
        ["GovernmentDominatedBy"],
        ["GovernmentEffects"],
        ["CapitalName"]
    ],
    "Turn Based Stats": [
        ["FuturePopulation", "FutureLiteracyPercent", "FutureHigherEducation", "FutureBudget", "FutureFood"],
        ["Population", "LiteracyPercent", "HigherEducation", "Budget", "Food"],
        ["FutureResearchPoints", "FuturePublicDebtLength", "FutureCulturalPower"],
        ["ResearchPoints", "PublicDebtLength", "CulturalPower"],
    ],
    "Population Stuff": [
        ["ReligionRepresentedAtGovernmentLevel", "CultureRepresentedAtGovernmentLevel", "PopulationStabilityImpact"],
        ["ReligionRepresentedAtGovernmentLevelPercent", "CultureRepresentedAtGovernmentLevelPercent", "PopulationTechImpact"],
        ["ReligiousDisunity", "CulturalDisunity", "PopulationGrowth"],
        ["ReligiousFervor", "Nationalism", "AtWar"]
    ],
    "Basic Stats": [
        ["AverageDevelopment", "Health", "Alcoholism", "EducationEfficiency", "Propaganda", "SocialSpending", "PopulationControl", "BirthControl"],
        ["Stability", "Absolutism", "Corruption", "Overextension", "Prosperity", "PopulationHappiness", "WarSupport"],
        ["AdministrativeTech", "AdministrativeEfficiency", "AdministrationSize", "AdministrativePower", "AdministrativeDemand", "AdministrativeStrain", "TaxEfficiency"],
        ["BureaucratsWages", "StateFactoryWorkerWage", "StateLabourerWage", "StateFarmerWage"]
    ],
    "Budget Stats": [
        ["TradeEfficiency", "LocalTrade", "InternalTrade", "ExternalTrade", "TradePower"],
        ["TradeImprovements", "ProductionEfficiency", "Production"],
        ["Inflation", "DailyBudget", "Budget"],
        ["BudgetIncoming", "BudgetOutgoing", "Balance"],
        ["InternalTariffs", "ExternalTariffs", "TariffEfficiency"],
        ["Gdp", "GdpPerKCapita", "DebtToGdpRatio"]
    ],
  "Upkeeps and Income": [
        ["OverallIncome", "OverallSpending"],
        ["TaxRevenue", "TariffsRevenue", "PassiveInvestmentIncome", "StateProductionRevenue", "StateResourceRevenue", "StateAgricultureRevenue"],
        ["ArmyUpkeep", "NavyUpkeep", "BuildingsUpkeep", "TroopRecruitmentCost", "SpyUpkeep"],
        ["EducationUpkeep", "PopulationControlUpkeep", "HygieneUpkeep", "ResearchUpkeep", "PropagandaUpkeep"],
        ["SocialSpendingUpkeep", "AgricultureSpending", "AdministrativeUpkeep", "StateWorkersUpkeep"]
    ],
  "Production": [
    ["Production", "ProductionEfficiency", "ProductionGovernmentControl", "IronShortage", "CoalShortage", "WoodShortage", "NaturalFabricsShortage", "LuxuryNaturalFabricsShortage", "ValuableMaterialsShortage"],
      ["Housing", "Textiles", "BasicGoods", "LuxuryGoods", "Alcohol", "BasicTools", "HeavyIndustry", "BasicArmaments", "HeavyArmaments", "ShipBuilding", "Chemicals", "Motors", "Planes", "Electronics"],
      ["EffectiveHousing", "EffectiveTextiles", "EffectiveBasicGoods", "EffectiveLuxuryGoods", "EffectiveAlcohol", "EffectiveBasicTools", "EffectiveHeavyIndustry", "EffectiveBasicArmaments", "EffectiveHeavyArmaments", "EffectiveShipBuilding", "EffectiveChemicals", "EffectiveMotors", "EffectivePlanes", "EffectiveElectronics"],
      ["HousingDemand", "TextilesDemand", "BasicGoodsDemand", "LuxuryGoodsDemand", "AlcoholDemand", "BasicToolsDemand", "HeavyIndustryDemand", "BasicArmamentsDemand", "HeavyArmamentsDemand", "ShipBuildingDemand", "ChemicalsDemand", "MotorsDemand", "PlanesDemand", "ElectronicsDemand"],
      ["HousingValue", "TextilesValue", "BasicGoodsValue", "LuxuryGoodsValue", "AlcoholValue", "BasicToolsValue", "HeavyIndustryValue", "BasicArmamentsValue", "HeavyArmamentsValue", "ShipBuildingValue", "ChemicalsValue", "MotorsValue", "PlanesValue", "ElectronicsValue"],
      ["HousingShortage", "TextilesShortage", "BasicGoodsShortage", "LuxuryGoodsShortage", "AlcoholShortage", "BasicToolsShortage", "HeavyIndustryShortage", "BasicArmamentsShortage", "HeavyArmamentsShortage", "ShipBuildingShortage", "ChemicalsShortage", "MotorsShortage", "PlanesShortage", "ElectronicsShortage"],
      ["PopProductionRevenue", "StateProductionRevenue"]
    ],
    "Army": [
      ["OverallImprovements", "CommanderFreedom", "ArmyWage", "BasicArmamentsStockpiled", "HeavyArmamentsStockpiled", "BasicArmamentsArmyShortage", "HeavyArmamentsShortage", "IronShortage", "SulphurShortage"],
		["MilitaryLoyalty", "MilitaryMorale", "MilitaryDiscipline"],
        ["IrregularImprovements", "IrregularQuality", "Levies", "Militia"],
        ["MeleeImprovements", "MeleeQuality", "LightInfantry", "HeavyInfantry", "EliteInfantry"],
        ["RangedImprovements", "RangedQuality", "Archers", "Crossbowmen"],
        ["FirearmImprovements", "FirearmQuality", "HandCannoneers", "Musketeers", "MusketMilitia", "Riflemen"],
        ["CavalryImprovements", "CavalryQuality", "LightCavalry", "HeavyCavalry", "EliteCavalry"],
        ["SiegeImprovements", "SiegeQuality", "SiegeEquipment", "LargeSiegeEquipment"],
        ["ArtilleryImprovements", "ArtilleryQuality", "RegimentalGuns", "FieldCannons", "SiegeGuns"],
        ["Manpower", "OverallNumbers", "UnitUpkeep", "ArmyWages", "EliteUnitsCap", "Spies", "SpyQuality"]
    ],
    "Private Armies": [
      ["AristocracyLevies", "AristocracyMilitia", "AristocracyLightInfantry", "AristocracyHeavyInfantry", "AristocracyEliteInfantry", "AristocracyArchers", "AristocracyCrossbowmen", "AristocracyMusketeers", "AristocracyMusketMilitia", "AristocracyRiflemen", "AristocracyLightCavalry", "AristocracyHeavyCavalry", "AristocracyEliteCavalry"],
      ["BurgousieLevies", "BurgousieMilitia", "BurgousieLightInfantry", "BurgousieHeavyInfantry", "BurgousieEliteInfantry", "BurgousieArchers", "BurgousieCrossbowmen", "BurgousieMusketeers", "BurgousieMusketMilitia", "BurgousieRiflemen", "BurgousieLightCavalry", "BurgousieHeavyCavalry", "BurgousieEliteCavalry"],
      ["ClergyLevies", "ClergyMilitia", "ClergyLightInfantry", "ClergyHeavyInfantry", "ClergyEliteInfantry", "ClergyArchers", "ClergyCrossbowmen", "ClergyMusketeers", "ClergyMusketMilitia", "ClergyRiflemen", "ClergyLightCavalry", "ClergyHeavyCavalry", "ClergyEliteCavalry"],
      ["PopulaceMilitia", "PopulaceMusketMilitia"]
    ],
    "Debt Stats": [
        ["PossiblePublicDebt", "PublicDebtLength", "InterestRate"],
        ["PublicDebtTaken", "EffectiveDebt", "DebtToGdpRatio"]
    ],
    "Buildings": [
      ["SmallForts", "MediumForts", "BigForts", "HugeForts", "CityFortifications", "SupplyDepots", "NavalBases"],
      ["SmallFortUpkeep", "MediumFortUpkeep", "BigFortUpkeep", "HugeFortUpkeep", "CityFortificationUpkeep", "SupplyDepotUpkeep", "NavalBaseUpkeep"]
    ],
    "Navy": [
      ["ShipBuildingShortage", "IronShortage", "SulphurShortage"],
      ["LightShipImprovements", "MediumShipImprovements", "HeavyShipImprovements", "NavyTech"],
      ["LightShipQuality", "MediumShipQuality", "HeavyShipQuality", "SailorsWage"],
      ["UpkeepForOneLightShip", "UpkeepForOneMediumShip", "UpkeepForOneHeavyShip", "UpkeepForOneMerchantShip"],
      ["LightShipConstructionCost", "MediumShipConstructionCost", "HeavyShipConstructionCost", "MerchantShipConstructionCost"],
      ["LightShips", "MediumShips", "HeavyShips", "MerchantShips"],
      ["OverallShipCount", "MerchantShipsFullfilment", "TradeProtection", "NavalPower"]
    ],
    "Agriculture": [
        ["ArableLand", "AgricultureSubsidies", "AgricultureInfrastructure", "AgricultureAdvancements", "AgricultureTechnology", "FarmingEfficiency", "AgricultureSpending"],
        ["PopInAgriculture", "DailyFood", "FoodConsumption", "FoodGain", "StockingCapabilities", "MaxFoodStock", "SellingCapability"],
        ["Food", "FutureFood", "SurplusFood", "FoodSold", "FoodLost", "FoodTradeProfit", "FoodPopulationBoost"],
        ["FoodRationing"]
    ],
    "War Stats": [
        ["Casualties", "Pillaging", "Occupation", "Blockade", "MinorBattles", "MajorBattles", "WarExhaustion", "Fervor"]
    ],
    "Land Stats": [
        ["Size", "PopulationDensityPerKmSquared", "Disease", "UnderPopulation", "MaxPopulation"],
        ["LandAdministration", "Overextension", "CoastalPopulationPercent", "AverageDevelopment", "HabitableLand"]
    ],
    "Estates": [
        ["AristocracyLoyalty", "ClergyLoyalty", "BurgousieLoyalty", "UrbanLoyalty", "BureaucratsLoyalty", "IntellectualsLoyalty", "WorkersLoyalty", "MilitaryLoyalty"],
        ["AristocracyTax", "ClergyTax", "BurgousieTax", "UrbanTax", "BureaucratsTax", "IntellectualsTax", "WorkersTax", "MilitaryTax"],
        ["UnemployedWage", "SlavesWage", "LabourersWage", "SerfsWage", "FarmersWage", "TownsfolkWage", "ClergyWage", "BureaucratsWage", "MerchantsWage", "IntellectualsWage", "SailorsWage", "SoldiersWage", "AristocracyWage", "BurgousieWage"],
        ["UnemployedTaxes", "SlavesTaxes", "LabourersTaxes", "SerfsTaxes", "FarmersTaxes", "TownsfolkTaxes", "ClergyTaxes", "BureaucratsTaxes", "MerchantsTaxes", "IntellectualsTaxes", "SailorsTaxes", "SoldiersTaxes", "AristocracyTaxes", "BurgousieTaxes", "TaxRevenue"],
        ["ExpectedUnemployedSol", "ExpectedSlavesSol", "ExpectedLabourersSol", "ExpectedSerfsSol", "ExpectedFarmersSol", "ExpectedTownsfolkSol", "ExpectedClergySol", "ExpectedBureaucratsSol", "ExpectedMerchantsSol", "ExpectedIntellectualsSol", "ExpectedSailorsSol", "ExpectedSoldiersSol", "ExpectedAristocracySol", "ExpectedBurgousieSol", "AverageExpectedSol"],
        ["UnemployedSol", "SlavesSol", "LabourersSol", "SerfsSol", "FarmersSol", "TownsfolkSol", "ClergySol", "BureaucratsSol", "MerchantsSol", "IntellectualsSol", "SailorsSol", "SoldiersSol", "AristocracySol", "BurgousieSol", "AverageSol"],
        ["UnemployedLiteracy", "SlavesLiteracy", "LabourersLiteracy", "SerfsLiteracy", "FarmersLiteracy", "TownsfolkLiteracy", "ClergyLiteracy", "BureaucratsLiteracy", "MerchantsLiteracy", "IntellectualsLiteracy", "SailorsLiteracy", "SoldiersLiteracy", "AristocracyLiteracy", "BurgousieLiteracy"],
      ["AristocracyPoliticalAwareness", "ClergyPoliticalAwareness", "BurgousiePoliticalAwareness", "UrbanPoliticalAwareness", "BureaucratsPoliticalAwareness", "IntellectualsPoliticalAwareness", "WorkersPoliticalAwareness", "MilitaryPoliticalAwareness"]
    ],
  "Reforms": [
        ["ReformPower", "ReformPowerGain"],
        ["SlaveryReformRegressionCost", "SlaveryReformAdvanceCost", "Reforms.SlaveryAllowed", "Reforms.SlaveryBanned"],
        ["SerfdomReformRegressionCost", "SerfdomReformAdvanceCost", "Reforms.SerfdomAllowed", "Reforms.SerfdomBanned"],
        ["EnclosureReformRegressionCost", "EnclosureReformAdvanceCost", "Reforms.OpenFieldSystem", "Reforms.Enclosure"],
        ["TradeReformRegressionCost", "TradeReformAdvanceCost", "Reforms.Isolationism",  "Reforms.Mercantilism", "Reforms.Protectionism", "Reforms.FreeTrade"],
        ["AntitrustReformRegressionCost", "AntitrustReformAdvanceCost", "Reforms.Guilds", "Reforms.GuildsBanned", "Reforms.AntiMonopolyLaws"],
        ["SuffrageReformRegressionCost", "SuffrageReformAdvanceCost", "Reforms.NoVoting", "Reforms.HighClassVoting", "Reforms.WealthVoting", "Reforms.UniversalSuffrage"],
        ["PrivellegeReformRegressionCost", "PrivellegeReformAdvanceCost", "Reforms.NoblePrivellege", "Reforms.WealthPrivellege", "Reforms.ClassEquality"],
        ["OfficersReformRegressionCost", "OfficersReformAdvanceCost", "Reforms.NobleOfficers", "Reforms.WealthyOfficers", "Reforms.MeritocraticOfficers"],
        ["BureaucratsReformRegressionCost", "BureaucratsReformAdvanceCost", "Reforms.NobleBureaucrats", "Reforms.ClergyBureaucrats", "Reforms.WealthyBureaucrats", "Reforms.MeritocraticBureaucrats"],
        ["ResourceReformRegressionCost", "ResourceReformAdvanceCost", "Reforms.NobleResourceOwnership", "Reforms.MixedResourceOwnership", "Reforms.BurgousieResourceOwnership", "Reforms.GovernmentResourceOwnership"],
        ["LandReformRegressionCost", "LandReformAdvanceCost", "Reforms.NobleLandOwnership", "Reforms.MixedLandOwnership", "Reforms.PrivateLandOwnership", "Reforms.GovernmentLandOwnership"],
        ["ArmyReformRegressionCost", "ArmyReformAdvanceCost", "Reforms.NationalMilitia", "Reforms.FeudalLevies", "Reforms.ProffesionalArmy", "Reforms.MassConscription"],
        ["CensorshipReformRegressionCost", "CensorshipReformAdvanceCost", "Reforms.StateMediaOnly", "Reforms.ExtensiveCensorship", "Reforms.LimitedCensorship", "Reforms.FreeSpeech"],
        ["SocialReformRegressionCost", "SocialReformAdvanceCost", "Reforms.NoSocialMobility", "Reforms.RestrictedSocialMobility", "Reforms.UnrestrictedSocialMobility"],
        ["ReligiousReformRegressionCost", "ReligiousReformAdvanceCost", "Reforms.StateReligion", "Reforms.RestrictiveReligionLaws", "Reforms.FreedomOfReligion"],
        ["EducationReformRegressionCost", "EducationReformAdvanceCost", "Reforms.PrivateEducationOnly", "Reforms.ReligiousSchools", "Reforms.PublicEducation"],
        ["PoliceReformRegressionCost", "PoliceReformAdvanceCost", "Reforms.CommunityPolicing", "Reforms.RegionalPolice", "Reforms.StatePolice", "Reforms.SecretPolice"],
        ["WeaponReformRegressionCost", "WeaponReformAdvanceCost", "Reforms.NoWeaponLaws", "Reforms.LimitedWeaponOwnership", "Reforms.WeaponOwnershipForbidden"],
        ["FeudalArmiesChangeCost", "Reforms.FeudalNobleArmies", "MercenariesChangeCost", "Reforms.Mercenaries", "ReligiousOrdersChangeCost", "Reforms.ReligiousOrders"]
	],
    "Trade Influence - Americas": [
        [ti("Alaska"), ti("CentralCanada"), ti("HudsonBay"), ti("LawrenceGulf"), ti("Cascadia"), ti("WestCoast"), ti("TheRockies"), ti("Mississippi"), ti("EastCoast"), ti("Caribbean")],
        [ti("GulfOfMexico"), ti("WesternMexico"), ti("CentralAmerica"), ti("Venezuela"), ti("Amazon"), ti("Peru"), ti("SaoFranciscoRiver"), ti("ParanaRiver"), ti("Chile"), ti("Patagonia")]
    ],
    "Trade Influence - Europe": [
        [ti("Iberia"), ti("WesternMediterranean"), ti("BayOfBiscay"), ti("SouthernFrance"), ti("France"), ti("EnglishChannel"), ti("BritishIsles"), ti("NorthSea"), ti("Rhine"), ti("Denmark")],
        [ti("CentralEurope"), ti("WesternDanube"), ti("EasternDanube"), ti("Adriatic"), ti("CentralMediterranean"), ti("Greece"), ti("Romania"), ti("Vistula"), ti("BalticSea"), ti("NorthernNordics")],
        [ti("BarentsSea"), ti("Novgorod"), ti("Livonia"), ti("Dniepr"), ti("Muscovy"), ti("DonRiver"), ti("Crimea"), ti("Caucasus"), ti("Volga"), ti("UralRiver")]
    ],
   "Trade Influence - Africa": [
        [ti("Morocco"), ti("WesternSahara"), ti("Sahara"), ti("Egypt"), ti("RedSea"), ti("SouthernNile"), ti("Somalia"), ti("Guinea"), ti("WesternNiger")],
        [ti("EasternNiger"), ti("Gabon"), ti("CongoRiver"), ti("LakeVictoria"), ti("LakeTanganyika"), ti("EastAfrica"), ti("Angola"), ti("Mozambique"), ti("SouthAfrica")]
    ],
    "Trade Influence - Asia": [
        [ti("ArabianDesert"), ti("EasternMediterranean"), ti("NorthernAnatolia"), ti("Mesopotamia"), ti("PersianGulf"), ti("Iran"), ti("CaspianSea"), ti("Afghanistan")],
        [ti("WesternSiberia"), ti("CentralSiberia"), ti("EasternSiberia"), ti("CentralAsia"), ti("GobiDesert"), ti("Manchuria"), ti("SeaOfJapan"), ti("YellowRiver")],
        [ti("YangtzeRiver"), ti("SouthChinaSea"), ti("Sichuan"), ti("Tibet"), ti("IndusRiver"), ti("Ganges"), ti("CentralIndia"), ti("Deccan")],
        [ti("SouthEastAsia"), ti("Indonesia"), ti("Pacific"), ti("NorthernAustralia"), ti("AustralianDesert"), ti("SouthernAustralia")]
    ],
    "Tech Stats": [
        ["Isolation", "ResearchSpending", "ResearchEffectiveness", "ResearchBoostFromTech", "ResearchPointGain", "ResearchPoints", "FutureResearchPoints"]
    ],
    "Technologies": [
        ["Technologies.IronWorking", "Technologies.Wheel", "Technologies.Paper"],
        ["Technologies.Gunpowder", "Technologies.VerticalLoom", "Technologies.SaddleAndStirrup", "Technologies.HorseCollar" ],
        ["Technologies.Explosives", "Technologies.Firelance"],
        ["Technologies.Cranes", "Technologies.PromissoryNotes", "Technologies.Bombards", "Technologies.HandCannons", "Technologies.PlateArmour", "Technologies.SappersAndEngineers"],
        ["Technologies.Workshops", "Technologies.StandardizedPikes" ],
        ["Technologies.Galleons", "Technologies.PrintingPress", "Technologies.Muskets", "Technologies.Limber", "Technologies.Docks", "Technologies.Gunports"],
        ["Technologies.Matchlock", "Technologies.StarForts", "Technologies.TextileManufactories", "Technologies.Reiters", "Technologies.MiningCarts", "Technologies.HumanAnatomy", "Technologies.Mortars"],
        ["Technologies.Metallurgy", "Technologies.Experimentation", "Technologies.Fluyt"],
        ["Technologies.Bayonet", "Technologies.SocketBayonet", "Technologies.Flintlock"],
        ["Technologies.FlyingShuttle", "Technologies.LeadChamberProcess"],
        ["Technologies.Gunlock"],
        ["Technologies.SteamEngine", "Technologies.PuddlingProcess"],
        ["Technologies.Rifles", "Technologies.ModernChemistry", "Technologies.CottonGin", "Technologies.Steamboats", "Technologies.HotAirBalloon", "Technologies.PowerLoomAndSewingMachine"],
        ["Technologies.Fulminate", "Technologies.PaperMachine", "Technologies.FirstFactories", "Technologies.LinearAssemblyProcess", "Technologies.InterchangeableParts", "Technologies.CannedFood", "Technologies.Vaccines", "Technologies.Morphine"]
    ],
    "Culture Stats": [
        ["CulturalAdvance", "CulturalProsperity", "CulturalPowerGain", "CulturalPower", "FutureCulturalPower"]
    ],
    "Cultural Advancements": [
        ["CulturalAdvancements.Currency"],
        ["CulturalAdvancements.DivineRightToRule", "CulturalAdvancements.Serfdom", "CulturalAdvancements.Feudalism"],
        ["CulturalAdvancements.Universities", "CulturalAdvancements.NobleDuty"],
        ["CulturalAdvancements.Courthouses"],
        ["CulturalAdvancements.RenaissanceThought", "CulturalAdvancements.EarlyModernAdministration"],
        ["CulturalAdvancements.NationalSovereignity", "CulturalAdvancements.Newspapers"],
        ["CulturalAdvancements.ScientificRevolution"],
        ["CulturalAdvancements.PotatoPopulationBoom"],
        ["CulturalAdvancements.Constitution"],
        ["CulturalAdvancements.PublicEducation"],
        ["CulturalAdvancements.Nationalism", "CulturalAdvancements.Conscription", "CulturalAdvancements.Industrialisation"]
    ],
    "Resources": [
        ["MiningEfficiency", "BaseIronHarvest", "BaseCoalHarvest", "BaseSulphurHarvest", "Forestry", "Reforestation", "ForestsLeft"],
        ["MaxCoal", "MaxSulphur", "MaxIron", "MaxCopper", "MaxGold", "MaxFur", "MaxDiamond", "MaxSilver", "MaxIvory"],
        ["Coal", "Sulphur", "Iron", "Copper", "Gold", "Fur", "Diamond", "Silver", "Ivory", "Wood"],
        ["EffectiveCoal", "EffectiveSulphur", "EffectiveIron", "EffectiveCopper", "EffectiveGold", "EffectiveFur", "EffectiveDiamond", "EffectiveSilver", "EffectiveIvory", "EffectiveWood"],
        ["Cotton", "Tea", "Silk", "Spice", "Wool", "Coffee", "Cocoa", "Tobacco", "Sugar", "ExoticFruit"],
        ["EffectiveCotton", "EffectiveTea", "EffectiveSilk", "EffectiveSpice", "EffectiveWool", "EffectiveCoffee", "EffectiveCocoa", "EffectiveTobacco", "EffectiveSugar", "EffectiveExoticFruit"],
        ["ResourceBudgetBoost"]
    ],
    "Resource Prices": [
        ["CoalDemand", "GoldDemand", "IronDemand", "SulphurDemand", "CottonDemand", "TeaDemand", "SpiceDemand", "CopperDemand", "SilkDemand", "WoolDemand", "FoodDemand"],
        ["CoalValue", "GoldValue", "IronValue", "SulphurValue", "CottonValue", "TeaValue", "SpiceValue", "CopperValue", "SilkValue", "WoolValue", "FoodValue"],
        ["CoffeeDemand", "SilverDemand", "DiamondDemand", "FurDemand", "IvoryDemand", "CocoaDemand", "TobaccoDemand", "SugarDemand", "ExoticFruitDemand", "WoodDemand"],
        ["CoffeeValue", "SilverValue", "DiamondValue", "FurValue", "IvoryValue", "CocoaValue", "TobaccoValue", "SugarValue", "ExoticFruitValue", "WoodValue"]
    ],"Resource Trade": [
        ["FoodIncoming", "CoalIncoming", "SulphurIncoming", "CottonIncoming", "GoldIncoming", "IronIncoming", "TeaIncoming", "SilkIncoming", "SpiceIncoming", "WoolIncoming"],
        ["FoodOutgoing", "CoalOutgoing", "SulphurOutgoing", "CottonOutgoing", "GoldOutgoing", "IronOutgoing", "TeaOutgoing", "SilkOutgoing", "SpiceOutgoing", "WoolOutgoing"],
        ["CoffeeIncoming", "FurIncoming", "DiamondIncoming", "SilverIncoming", "CopperIncoming", "IvoryIncoming", "CocoaIncoming", "TobaccoIncoming", "SugarIncoming", "ExoticFruitIncoming"],
        ["CoffeeOutgoing", "FurOutgoing", "DiamondOutgoing", "SilverOutgoing", "CopperOutgoing", "IvoryOutgoing", "CocoaOutgoing", "TobaccoOutgoing", "SugarOutgoing", "ExoticFruitOutgoing"],
      ["HousingIncoming", "TextilesIncoming", "BasicGoodsIncoming", "LuxuryGoodsIncoming", "AlcoholIncoming", "BasicToolsIncoming", "HeavyIndustryIncoming", "BasicArmamentsIncoming", "HeavyArmamentsIncoming", "ShipBuildingIncoming", "ChemicalsIncoming", "MotorsIncoming", "PlanesIncoming", "ElectronicsIncoming"],
      ["HousingOutgoing", "TextilesOutgoing", "BasicGoodsOutgoing", "LuxuryGoodsOutgoing", "AlcoholOutgoing", "BasicToolsOutgoing", "HeavyIndustryOutgoing", "BasicArmamentsOutgoing", "HeavyArmamentsOutgoing", "ShipBuildingOutgoing", "ChemicalsOutgoing", "MotorsOutgoing", "PlanesOutgoing", "ElectronicsOutgoing"],
        ["TradePowerFromResourceTrade"]
    ]
}

function createNationSheet(nationName) {
    currentNationNameDisplay.innerText = nationName.capitalSpacing();

    nationSheetContainer.innerHTML = "";
    /* #region  Search Only Display */

    createSearchStatTable();

    /* #endregion */
    /* #region  Display */

    tableIndex = 0;

    AddNextStatTable();

    AddNextStatTable();

    createBreaker();

    createPieDiagram("CultureGroups");
    createOpinionMatrixTable("Culture Groups Opinions", "CultureGroups");

    createBreaker();

    createPieDiagram("ReligionGroups");
    createOpinionMatrixTable("Religion Groups Opinions", "ReligionGroups");

    AddNextStatTable();

    AddNextStatTable();

    AddNextStatTable();

    AddNextStatTable();

    createBreaker();

    createPieDiagram("ProductionSectors");

    AddNextStatTable();

    AddNextStatTable();

    AddNextStatTable();

    AddNextStatTable();

    AddNextStatTable();

    AddNextStatTable();

    AddNextStatTable();

    createBreaker();

    createPieDiagram("Climates", "Pixels");

    AddNextStatTable();

    AddNextStatTable();

    createBreaker();
	
	// loyalty

    createBreaker();

    createPieDiagram("EstateInfluencesReal");
    createPieDiagram("GovernmentRepresentation");
    createPieDiagram("MilitaryControl");

    createBreaker();

    createPieDiagram("Workforces");
    createPieDiagram("SocietalClasses");

    createBreaker();

  //  AddNextStatTable();

    AddNextStatTable();

    AddNextStatTable();

    AddNextStatTable().classList.add("tradeinfluences");

    AddNextStatTable().classList.add("tradeinfluences");

    AddNextStatTable().classList.add("tradeinfluences");

    AddNextStatTable().classList.add("tradeinfluences");

    AddNextStatTable();

    AddNextStatTable();

    AddNextStatTable();

    AddNextStatTable();

    AddNextStatTable();

  AddNextStatTable();

  AddNextStatTable();

    /* #endregion */

    //fix size of notapplicables
    let NAs = document.querySelectorAll(".notapplicable");
    NAs.forEach(element => {
        element.style.width = element.parentElement.clientWidth + "px";
        element.style.height = element.parentElement.clientHeight + "px";
    });

    //make stability stat get a color

    let stabilityValueElement = document.querySelector("td.Stability.value");

    stabilityValueElement.style.fontWeight =
        stabilityValueElement.innerText < 2 ? "Bold" :
            "Normal";
    stabilityValueElement.style.color =
        stabilityValueElement.innerText < 2 ?
            (stabilityValueElement.innerText < -2 ? "Red" :
                "Orange") :
            "Green";

    //make non 0.00 in tradeinfluence bold

    let allDivs = document.querySelectorAll("div");

    allDivs.forEach(DivElement => {
        if(DivElement.querySelector("h2") != null){
            if(/Trade Influence/.test(DivElement.querySelector("h2").innerText)){
                let tdElements = DivElement.querySelectorAll("td");
                tdElements.forEach(tdElement => {
                    if(tdElement.innerHTML != "0.00") {
                        tdElement.style.fontWeight = "bolder";
                    } else {
                        tdElement.style = "";
                    }
                });
            }
        }
    });    

    //add tech tree button to tech and cultural adv & add individual nation view to land stats

    let allTabletitles = document.querySelectorAll(".nationsheet > div > h2")

    allTabletitles.forEach(TableTitle => {
        if(TableTitle.innerHTML == "Cultural Advancements" || TableTitle.innerHTML == "Technologies"){
            let TechtreeButton = document.createElement("a");
            TechtreeButton.style.margin = "0em 1em 0.5em 1em";
            TechtreeButton.addEventListener("click", collapsibleNextSibling);
            let TechtreeIcon = document.createElement("img");
            TechtreeIcon.src = "docs/assets/images/small_techTree.png";
            TechtreeIcon.style.border = "1px solid black";
            TechtreeButton.appendChild(TechtreeIcon);
            let TechTreeImage = document.createElement("img");
            TechTreeImage.src = "docs/assets/images/techTree.png";
            TechTreeImage.style.margin = "2em";
            TechTreeImage.style.width = document.body.clientWidth - 100 + "px";
            TechTreeImage.style.display = "none";

            TableTitle.parentElement.insertBefore(TechTreeImage, TableTitle.nextSibling);
            TableTitle.parentElement.insertBefore(TechtreeButton, TechTreeImage);
        }
        else if(TableTitle.innerHTML == "Land Stats"){
            let imgButton = document.createElement("a");
            imgButton.href = `./IndividualNation?col=${gameStats.Nations[nationName].Color}`
            imgButton.target = "_blank";
            let img = document.createElement("img");
            img.src = "docs/assets/images/world/small_blank.png";
            img.title = `see ${nationName} specific area`;
            img.style.width = "58px";
            img.classList.add("pixelated");

            imgButton.style.margin = "0em 1em 0.5em 1em";
            
            imgButton.appendChild(img);
            TableTitle.parentElement.insertBefore(imgButton, TableTitle.nextSibling);
        }
    });
}

let tableIndex = 0;

function AddNextStatTable() {
    if (searchStatValue != "") return document.createElement("div");
    let title = Object.keys(TableLayouts)[tableIndex++];
    let tables = TableLayouts[title];
    return createStatTable(title, tables);
}

function createSearchStatTable(){
    
    if(searchStatValue == "") return document.createElement("div");
    
    let columns = [];

    Object.keys(TableLayouts).forEach(tableGroupName => {
        const tableGroup = TableLayouts[tableGroupName];
        for (let table = 0; table < TableLayouts[tableGroupName].length; table++) {
            const stats = tableGroup[table];
            for (let stat = 0; stat < stats.length; stat++) {
                const statName = stats[stat];
                //filter out everything that isn't matching the search
                if(new RegExp(searchStatValue, "i").test(statName)) {
                    console.log(`${searchStatValue} found in ${statName}`)
                    columns.push([statName]);
                }
            }
        }
    });
    
    return createStatTable("search results", columns);
}

function createStatTable(title, tables) {
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
            //if first char of string is alphabetic (not symbol), add courtesy dot first, else, we expect the user of createStatTableProxy to know what they're doing
            const statvalue = /^[a-zA-Z]$/.test(statSelection[0]) ?
                (new Function(`return gameStats.Nations["${currentNationName}"].${statSelection}`))() :
                (new Function(`return gameStats.Nations["${currentNationName}"]${statSelection}`))();
            let nationStatNameCell = document.createElement("th");
            let upmigrations = 0;
            let splitStatSelection = statSelection.split(/\.|(?<=\[)/g); 
            let statName = splitStatSelection[splitStatSelection.length - 1 - upmigrations++].replace(/(\[|\"| |\])/gmi, "");
            while(/tradingpoints$/i.test(statName)){
                statName = splitStatSelection[splitStatSelection.length - 1 - upmigrations++].replace(/(\[|\"| |\])/gmi, "");
            }
            nationStatNameCell.innerText = statName.replace(/(?<=[a-zA-Z])(?=[A-Z])/g, " ");
            nationStatNameCell.classList.add(statName, "name")
            let nationStatCell = document.createElement("td");
            nationStatCell.classList.add(statName, "value")

            let displayValue = ValueTypeFix(statName, statvalue);
            if (displayValue.appendable) {
                nationStatCell.appendChild(displayValue.value);
            } else {
                try {
                    nationStatCell.innerText = displayValue.value.replace(/(?<=[a-zA-Z])(?=[A-Z])/g, " ");
                } catch (error) {
                    console.log(error);
                    console.log("Object:");
                    console.log(displayValue);
                    console.log("Stat Name:");
                    console.log(statName);
                }
            }

            let statTypeIcon = document.createElement("img");
            switch (getStatType(statSelection)) {
                case "Base":
                    statTypeIcon.src = "./docs/assets/images/Base.png"; //red
                    statTypeIcon.alt = "Base";
                    statTypeIcon.title = "Base Stat: This is RPable";
                    break;
                case "Derived":
                    statTypeIcon.src = "./docs/assets/images/Derived.png";
                    statTypeIcon.alt = "Derived";
                    statTypeIcon.title = "Derived Stat: This is calculated through a formula of other stats. You can not change this stat";
                    break;
                case "Constant":
                    statTypeIcon.src = "./docs/assets/images/Constant.png"; //orange
                    statTypeIcon.alt = "Constant";
                    statTypeIcon.title = "Constant: This stat will not change throughout the game, and it is the same for all players";
                    break;
                case "Turn Based":
                    statTypeIcon.src = "./docs/assets/images/Turn Based.png"; //pink
                    statTypeIcon.alt = "Turn Based";
                    statTypeIcon.title = "Turn Based Stat: This takes its future form the next turn. You can not change this stat";
                    break;
                case "War":
                    statTypeIcon.src = "./docs/assets/images/War.png"; //red
                    statTypeIcon.alt = "War";
                    statTypeIcon.title = "War: This stat can change through Role play in war, and may be changed by War GMs as well as Stat Updaters";
                    break;
                case "Unknown":
                    statTypeIcon.src = "./docs/assets/images/Unknown.png"; //black
                    statTypeIcon.alt = "Unknown!";
                    statTypeIcon.title = "Unknown! This is a mistake on our part. Please inform us if you see it.";
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

    return tablecontainer;
}

function createOpinionMatrixTable(title, SocialBehaviourGroups) {
    if (searchStatValue != "" && !new RegExp(searchStatValue, "i").test(title)) return;
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
        if (nationsSocialBehaviourGroups[opinioneeName].Points == 0) continue;
        let opinioneeNameCell = document.createElement("th");
        opinioneeNameCell.style.background = primaryColor;
        opinioneeNameCell.innerText = opinioneeName;
        opinioneeNameRow.appendChild(opinioneeNameCell);
    }
    table.appendChild(opinioneeNameRow);
    for (const opinionerName in nationsSocialBehaviourGroups) {
        if (nationsSocialBehaviourGroups[opinionerName].Points == 0) continue;
        let opRow = document.createElement("tr");
        let opinionerNameCell = document.createElement("th");
        opinionerNameCell.style.background = primaryColor;
        opinionerNameCell.innerHTML = opinionerName + " Opinion on ...";
        opRow.appendChild(opinionerNameCell);
        for (const opinioneeName in nationsSocialBehaviourGroups) {
            if (nationsSocialBehaviourGroups[opinioneeName].Points == 0) continue;
            let cell = document.createElement("td");
            cell.style.background = secondaryColor;
            if (opinionerName == opinioneeName) {

                let cross = document.createElement("img");
                cross.src = "./docs/assets/images/NotApplicable.gif";
                cross.classList.add("notapplicable");
                cross.style.display = "block";
                cell.style.padding = "0px";
                cell.style.margin = "0px";
                cell.appendChild(cross);
            }
            else {
                let op = RelevantSocialBehaviours[opinionerName].Opinions[opinioneeName];
                let img = document.createElement("img");
                img.style.width = "40px";
                img.style.height = "40px";
                let score;
                if (typeof op != 'undefined') {
                    score = op.Score;
                    if (isNaN(score)) {
                        score = Opinion[score];
                    }
                    if (score <= -75) {
                        img.src = Opinion.UndesiredImage;
                    } else if (score <= -25) {
                        img.src = Opinion.SkepticalImage;
                    } else if (score > 25) {
                        img.src = Opinion.FondImage;
                    } else if (score > 75) {
                        img.src = Opinion.ObsessedImage;
                    } else {
                        img.src = Opinion.NeutralImage;
                    }

                } else {
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

    return tablecontainer;
}

function createPieDiagram(ObjectToChart, ValName) {
    if (searchStatValue != "" && !new RegExp(searchStatValue, "i").test(ObjectToChart)) return;
    let ValueName = ValName;
    if (typeof ValueName == 'undefined') ValueName = "Points"

    let tablecontainer = document.createElement("div");
    let title = document.createElement("h2");
    title.innerText = ObjectToChart.capitalSpacing();
    title.classList.add("tabletitle");

    let ObjectToChartNationRef = gameStats.Nations[currentNationName][ObjectToChart];

    var chartdiv = document.createElement("div");
    //styling on chart

    chartdiv.style.margin = ".5em";
    chartdiv.style.textAlign = "center";
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



    let chartData = [];
    for (const keyName in ObjectToChartNationRef) {
        const keyValue = ObjectToChartNationRef[keyName];

        let objectPoints = keyValue;
        while (isNaN(objectPoints)) {
            if (objectPoints === null) {
                objectPoints = 0;
            } else if (typeof objectPoints === 'object') {
                objectPoints = objectPoints[ValueName];
            } else if (typeof objectPoints === 'number'){
                warn(`a nan object was found. ${keyName} in ${ObjectToChart}`);
                objectPoints = 0;
            }
        }

        if (objectPoints === 0) continue;

        chartData.push(
            {
                key: keyName.capitalSpacing(),
                Points: objectPoints
            }
        );
    }


    chartdiv.style.width = "500px";
    chartdiv.style.height = (360 + 29 * Object.values(chartData).length) + "px";

    var series = chart.series.push(
        am5percent.PieSeries.new(root, {
            name: "Series",
            categoryField: "key",
            valueField: "Points",
            legendLabelText: "[{fill}]{category}[/]",
            legendValueText: ValueName == "Points" ? "[bold {fill}][/]" : `[bold {fill}]{value} ${ValueName.capitalSpacing()}[/]`
        })
    );

    series.data.setAll(chartData);
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

    return tablecontainer;
}

function createBreaker() {
    let breaker = document.createElement("div");
    breaker.style.width = "100%";
    breaker.style.height = "0px";

    nationSheetContainer.appendChild(breaker);

    return breaker;
}
