let primaryColor = "DodgerBlue";
let secondaryColor = "lightSkyBlue";

const min = (_min, _num) => Math.min(_min, _num);
const max = (_max, _num) => Math.max(_max, _num);
const clamp = (_clamper1, _clamper2, _num) => _clamper1 < _clamper2 ? min(max(_num, _clamper1), _clamper2) : min(max(_num, _clamper2), _clamper1);

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

let warnSuppress = 0;

function suppressWarning(linesToSuppressParam) {
    linesToSuppress = linesToSuppressParam != null ? linesToSuppressParam : 1;
    warnSuppress = changeCommandIndex + linesToSuppress;
}

function warn(message) {
    if (warnSuppress >= changeCommandIndex) return;
    alert(`WARNING At line ${(changeCommandIndex + 1)}:

${message}`)
}

function error(message) {
    alert(`ERROR At line ${(changeCommandIndex + 1)}:

${message}`)
}

function lazyerror(message) {
    alert(`ERROR At line ${(changeCommandIndex + 1)}
but the source of the ERROR could have occured earlier:

${message}`)
}

/* #region  Taken from https://stackoverflow.com/questions/7616461/generate-a-hash-from-string-in-javascript user esmiralha */
String.prototype.hashCode = function () {
    var hash = 0, i, chr;
    if (this.length === 0) return hash;
    for (i = 0; i < this.length; i++) {
        chr = this.charCodeAt(i);
        hash = ((hash << 5) - hash) + chr;
        hash |= 0; // Convert to 32bit integer
    }
    return hash;
};
/* #endregion */

String.prototype.trimIndents = function () {
    return this.valueOf().replace(/(    |\t)+/g, "");
}


String.prototype.capitalSpacing = function () {
    return this.replace(/(?<=[a-zA-Z])(?=[A-Z1-9])/gm, " ");
}

//synonym searching and case correcting alg
function correctAndSynonymCheck(selection) {
    let correctSelection = selection.slice(1).split(".");
    let step = 'gameStats';
    for (let i = 0; i < correctSelection.length; i++) {
        let matched = matchToken(step, correctSelection[i]);
        if (matched == null) {
            alert(`Line ${changeCommandIndex}: The Specified Stat '${correctSelection[i]}' in '${correctSelection.slice(0, i).join('.')}' was not found!`);
            return;
        }
        correctSelection[i] = matched;
        step += `.${correctSelection[i]}`;
    }
    return "." + correctSelection.join(".");
}

function matchToken(searchIn, approxName) {
    let searchObject = (new Function(`return ${searchIn}`))();
    let nameToCheck = approxName.toLowerCase().replaceAll(" ", "")

    //check same stats but correct casing
    for (const propertyName in searchObject) {
        if (propertyName.toLowerCase() == nameToCheck)
            return propertyName;
    }
    //check synonyms of stats
    for (const realName in Synonyms) {
        const synonymArray = Synonyms[realName];
        for (let j = 0; j < synonymArray.length; j++) {
            const synonym = synonymArray[j];
            //if what was written in change file exists in the synonym dictionary
            if (synonym.toLowerCase() == nameToCheck) {
                //Then, if the real name for the stat exists in this object
                if (realName in searchObject) return realName;
            }
        }
    }

    let subObjects = [];
    for (const objectName in searchObject) {
        if (typeof searchObject[objectName] == 'object') subObjects.push(objectName);
    }
    if (subObjects.length > 0) {
        for (let i = 0; i < subObjects.length; i++) {
            const element = subObjects[i];

            within = true;
            let subMatch = matchToken(`${searchIn}.${element}`, approxName)
            if (subMatch != null)
                return `${element}.${subMatch}`
        }
    } else {
        return null;
    }
}

let StatTypes = {
    BaseStats: [
        "Alaska",
        "CentralCanada",
        "HudsonBay",
        "LawrenceGulf",
        "Cascadia",
        "WestCoast",
        "TheRockies",
        "Mississippi",
        "EastCoast",
        "Caribbean",
        "GulfOfMexico",
        "WesternMexico",
        "CentralAmerica",
        "Venezuela",
        "Amazon",
        "Peru",
        "SaoFranciscoRiver",
        "ParanaRiver",
        "Chile",
        "Patagonia",
        "Iberia",
        "WesternMediterranean",
        "BayOfBiscay",
        "SouthernFrance",
        "France",
        "EnglishChannel",
        "BritishIsles",
        "NorthSea",
        "Rhine",
        "Denmark",
        "CentralEurope",
        "WesternDanube",
        "EasternDanube",
        "Adriatic",
        "CentralMediterranean",
        "Greece",
        "Romania",
        "Vistula",
        "BalticSea",
        "NorthernNordics",
        "BarentsSea",
        "Novgorod",
        "Livonia",
        "Dniepr",
        "Muscovy",
        "DonRiver",
        "Crimea",
        "Caucasus",
        "Volga",
        "UralRiver",
        "Morocco",
        "WesternSahara",
        "Sahara",
        "Egypt",
        "RedSea",
        "SouthernNile",
        "Somalia",
        "Guinea",
        "WesternNiger",
        "EasternNiger",
        "Gabon",
        "CongoRiver",
        "LakeVictoria",
        "LakeTanganyika",
        "EastAfrica",
        "Angola",
        "Mozambique",
        "SouthAfrica",
        "ArabianDesert",
        "EasternMediterranean",
        "NorthernAnatolia",
        "Mesopotamia",
        "PersianGulf",
        "Iran",
        "CaspianSea",
        "Afghanistan",
        "WesternSiberia",
        "CentralSiberia",
        "EasternSiberia",
        "CentralAsia",
        "GobiDesert",
        "Manchuria",
        "SeaOfJapan",
        "YellowRiver",
        "YangtzeRiver",
        "SouthChinaSea",
        "Sichuan",
        "Tibet",
        "IndusRiver",
        "Ganges",
        "CentralIndia",
        "Deccan",
        "SouthEastAsia",
        "Indonesia",
        "Pacific",
        "NorthernAustralia",
        "AustralianDesert",
        "SouthernAustralia",
        "Isolation",
        "InternalTariffs",
        "ExternalTariffs",
        "ProductionGovernmentControl",
        "OverallImprovements",
        "SoldiersWage",
        "ArmyWage",
        "IrregularImprovements",
        "MeleeImprovements",
        "RangedImprovements",
        "FirearmImprovements",
        "CavalryImprovements",
        "SiegeImprovements",
        "ArtilleryImprovements",
        "MusketMilitia",
        "Riflemen",
        "LightShipImprovements",
        "MediumShipImprovements",
        "HeavyShipImprovements",
        "SailorsWage",
        "MerchantShips",
        "FoodRationing",
        "Reforestation",
        "Forestry",
        "CulturalAdvancements.Currency",
        "CulturalAdvancements.DivineRightToRule",
        "CulturalAdvancements.Serfdom",
        "CulturalAdvancements.Feudalism",
        "CulturalAdvancements.Universities",
        "CulturalAdvancements.NobleDuty",
        "CulturalAdvancements.Courthouses",
        "CulturalAdvancements.RenaissanceThought",
        "CulturalAdvancements.EarlyModernAdministration",
        "CulturalAdvancements.NationalSovereignity",
        "CulturalAdvancements.Newspapers",
        "CulturalAdvancements.ScientificRevolution",
        "CulturalAdvancements.PotatoPopulationBoom",
        "CulturalAdvancements.Constitution",
        "CulturalAdvancements.PublicEducation",
        "CulturalAdvancements.Nationalism",
        "CulturalAdvancements.Conscription",
        "CulturalAdvancements.Industrialisation",
        "Technologies.IronWorking",
        "Technologies.Wheel",
        "Technologies.Paper",
        "Technologies.Gunpowder",
        "Technologies.VerticalLoom",
        "Technologies.SaddleAndStirrup",
        "Technologies.HorseCollar",
        "Technologies.Explosives",
        "Technologies.Firelance",
        "Technologies.Cranes",
        "Technologies.PromissoryNotes",
        "Technologies.Bombards",
        "Technologies.HandCannons",
        "Technologies.PlateArmour",
        "Technologies.SappersAndEngineers",
        "Technologies.Workshops",
        "Technologies.StandardizedPikes",
        "Technologies.Galleons",
        "Technologies.PrintingPress",
        "Technologies.Muskets",
        "Technologies.Limber",
        "Technologies.Docks",
        "Technologies.Gunports",
        "Technologies.Matchlock",
        "Technologies.StarForts",
        "Technologies.TextileManufactories",
        "Technologies.Reiters",
        "Technologies.MiningCarts",
        "Technologies.HumanAnatomy",
        "Technologies.Mortars",
        "Technologies.Metallurgy",
        "Technologies.Experimentation",
        "Technologies.Fluyt",
        "Technologies.Bayonet",
        "Technologies.SocketBayonet",
        "Technologies.Flintlock",
        "Technologies.FlyingShuttle",
        "Technologies.LeadChamberProcess",
        "Technologies.Gunlock",
        "Technologies.SteamEngine",
        "Technologies.PuddlingProcess",
        "Technologies.Rifles",
        "Technologies.ModernChemistry",
        "Technologies.CottonGin",
        "Technologies.Steamboats",
        "Technologies.HotAirBalloon",
        "Technologies.PowerLoomAndSewingMachine",
        "Technologies.Fulminate",
        "Technologies.PaperMachine",
        "Technologies.FirstFactories",
        "Technologies.LinearAssemblyProcess",
        "Technologies.InterchangeableParts",
        "Technologies.CannedFood",
        "Technologies.Vaccines",
        "Technologies.Morphine",
        "Reforms.SlaveryAllowed",
        "Reforms.SlaveryBanned",
        "Reforms.SerfdomAllowed",
        "Reforms.SerfdomBanned",
        "Reforms.OpenFieldSystem",
        "Reforms.Enclosure",
        "Reforms.Isolationism",
        "Reforms.Mercantilism",
        "Reforms.Protectionism",
        "Reforms.FreeTrade",
        "Reforms.Guilds",
        "Reforms.GuildsBanned",
        "Reforms.AntiMonopolyLaws",
        "Reforms.NoVoting",
        "Reforms.HighClassVoting",
        "Reforms.WealthVoting",
        "Reforms.UniversalSuffrage",
        "Reforms.NoblePrivellege",
        "Reforms.WealthPrivellege",
        "Reforms.ClassEquality",
        "Reforms.NobleOfficers",
        "Reforms.WealthyOfficers",
        "Reforms.MeritocraticOfficers",
        "Reforms.NobleBureaucrats",
        "Reforms.ClergyBureaucrats",
        "Reforms.WealthyBureaucrats",
        "Reforms.MeritocraticBureaucrats",
        "Reforms.NobleResourceOwnership",
        "Reforms.MixedResourceOwnership",
        "Reforms.BurgousieResourceOwnership",
        "Reforms.GovernmentResourceOwnership",
        "Reforms.NobleLandOwnership",
        "Reforms.MixedLandOwnership",
        "Reforms.PrivateLandOwnership",
        "Reforms.GovernmentLandOwnership",
        "Reforms.NationalMilitia",
        "Reforms.FeudalLevies",
        "Reforms.ProffesionalArmy",
        "Reforms.MassConscription",
        "Reforms.StateMediaOnly",
        "Reforms.ExtensiveCensorship",
        "Reforms.LimitedCensorship",
        "Reforms.FreeSpeech",
        "Reforms.NoSocialMobility",
        "Reforms.RestrictedSocialMobility",
        "Reforms.UnrestrictedSocialMobility",
        "Reforms.StateReligion",
        "Reforms.RestrictiveReligionLaws",
        "Reforms.FreedomOfReligion",
        "Reforms.PrivateEducationOnly",
        "Reforms.ReligiousSchools",
        "Reforms.PublicEducation",
        "Reforms.CommunityPolicing",
        "Reforms.RegionalPolice",
        "Reforms.StatePolice",
        "Reforms.SecretPolice",
        "Reforms.NoWeaponLaws",
        "Reforms.LimitedWeaponOwnership",
        "Reforms.WeaponOwnershipForbidden",
        "Reforms.FeudalNobleArmies",
        "Reforms.Mercenaries",
        "Reforms.ReligiousOrders",
        "BureaucratsWages",
        "StateFactoryWorkerWage",
        "StateLabourerWage",
        "StateFarmerWage",
        "AdministrationSize",
        "AdministrativeTech",
        "AdministrativePower",
        "AdministrativeDemand",
        "ReligiousFervor",
        "Nationalism",
        "ResearchSpending",
        "ReligionRepresentedAtGovernmentLevel",
        "CultureRepresentedAtGovernmentLevel",
        "TradeImprovements",
        "LowerClassTax",
        "MilitaryDiscipline",
        "NavyImprovements",
        "AgricultureSubsidies",
        "Flag",
        "GovernmentName",
        "CapitalName",
        "Health",
        "EducationEfficiency",
        "AdministrativeEfficiency",
        "Propaganda",
        "SocialSpending",
        "PopulationControl",
        "BirthControl",
        "LocalTrade",
        "Spies",
        "SpyQuality",
        "AristocratInfluence",
        "ClergyInfluence",
        "BurgousieInfluence",
        "HighClassTax",
        "MediumClassTax",
        "LowClassTax",
        "PublicDebtTaken",
        "Townsfolk",
        "Clergy",
        "Aristocracy",
        "Burgousie",
        "MiningEfficiency",
        "Sulphur",
        "Cotton",
        "Gold",
        "Iron",
        "Tea",
        "Silk",
        "Spice",
        "Wool",
        "Coffee",
        "Fur",
        "Diamond",
        "Silver",
        "Copper",
        "Coal",
        "Ivory",
        "Cocoa",
        "Tobacco",
        "Sugar",
        "ExoticFruit",
        "AgricultureSubsidies",
        "AgricultureInfrastructure",
        "StockingCapabilities",
        "AgricultureAdvancements",
        "ResearchEffectiveness",
        "Gunpowder",
        "VerticalLoom",
        "SaddleAndStirrup",
        "HorseCollar",
        "Explosives",
        "Firelance",
        "Cranes",
        "PromissoryNotes",
        "Bombards",
        "HandCannons",
        "PlateArmour",
        "SappersAndEngineers",
        "Workshops",
        "StandardizedPikes",
        "Galleons",
        "PrintingPress",
        "Muskets",
        "Limber",
        "Docks",
        "Gunports",
        "Matchlock",
        "StarForts",
        "TextileManufactories",
        "Reiters",
        "MiningCarts",
        "HumanAnatomy",
        "Mortars",
        "Metallurgy",
        "Experimentation",
        "Fluyt",
        "Bayonet",
        "SocketBayonet",
        "Flintlock",
        "FlyingShuttle",
        "LeadChamberProcess",
        "Gunlock",
        "CulturalProsperity",
        "DivineRightToRule",
        "Serfdom",
        "Feudalism",
        "Universities",
        "AristocratDuty",
        "Courthouses",
        "RenaissanceThought",
        "EarlyModernAdministration",
        "NationalSovereignity",
        "Newspapers",
        "ScientificRevolution",
        "PotatoPopulationBoom",
        "Constitution",
        "Levies",
        "LightInfantry",
        "HeavyInfantry",
        "Archers",
        "Crossbowmen",
        "LightCavalry",
        "HeavyCavalry",
        "EliteInfantry",
        "EliteCavalry",
        "HandCannoneers",
        "Musketeers",
        "Militia",
        "SiegeEquipment",
        "LargeSiegeEquipment",
        "FieldCannons",
		"RegimentalGuns",
		"SiegeGuns",
        "SmallForts",
        "MediumForts",
        "BigForts",
        "HugeForts",
        "ExtraCityFortifications",
        "CommanderFreedom",
        "ArmyWages",
        "TrainingQuality",
        "MilitaryTactics",
        "MilitaryDiscipline",
        "Naval Improvements",
        "LightShips",
        "MediumShips",
        "HeavyShips"
    ],
    DerivedStats: [
        "ArableLand",
        "HousingIncoming",
        "TextilesIncoming",
        "BasicGoodsIncoming",
        "LuxuryGoodsIncoming",
        "AlcoholIncoming",
        "BasicToolsIncoming",
        "HeavyIndustryIncoming",
        "BasicArmamentsIncoming",
        "HeavyArmamentsIncoming",
        "ShipBuildingIncoming",
        "ChemicalsIncoming",
        "MotorsIncoming",
        "PlanesIncoming",
        "ElectronicsIncoming",
        "HousingOutgoing",
        "TextilesOutgoing",
        "BasicGoodsOutgoing",
        "LuxuryGoodsOutgoing",
        "AlcoholOutgoing",
        "BasicToolsOutgoing",
        "HeavyIndustryOutgoing",
        "BasicArmamentsOutgoing",
        "HeavyArmamentsOutgoing",
        "ShipBuildingOutgoing",
        "ChemicalsOutgoing",
        "MotorsOutgoing",
        "PlanesOutgoing",
        "ElectronicsOutgoing",
        "TariffsRevenue",
        "PopInAgriculture",
        "FoodLost",
        "FoodTradeProfit",
        "BaseIronHarvest",
        "BaseCoalHarvest",
        "BaseSulphurHarvest",
        "FoodValue",
        "FoodDemand",
        "WoodDemand",
        "WoodValue",
        "ReformPowerGain",
        "SlaveryReformRegressionCost",
        "SlaveryReformAdvanceCost",
        "SerfdomReformRegressionCost",
        "SerfdomReformAdvanceCost",
        "EnclosureReformRegressionCost",
        "EnclosureReformAdvanceCost",
        "TradeReformRegressionCost",
        "TradeReformAdvanceCost",
        "AntitrustReformRegressionCost",
        "AntitrustReformAdvanceCost",
        "SuffrageReformRegressionCost",
        "SuffrageReformAdvanceCost",
        "PrivellegeReformRegressionCost",
        "PrivellegeReformAdvanceCost",
        "OfficersReformRegressionCost",
        "OfficersReformAdvanceCost",
        "BureaucratsReformRegressionCost",
        "BureaucratsReformAdvanceCost",
        "ResourceReformRegressionCost",
        "ResourceReformAdvanceCost",
        "LandReformRegressionCost",
        "LandReformAdvanceCost",
        "ArmyReformRegressionCost",
        "ArmyReformAdvanceCost",
        "CensorshipReformRegressionCost",
        "CensorshipReformAdvanceCost",
        "SocialReformRegressionCost",
        "SocialReformAdvanceCost",
        "ReligiousReformRegressionCost",
        "ReligiousReformAdvanceCost",
        "EducationReformRegressionCost",
        "EducationReformAdvanceCost",
        "PoliceReformRegressionCost",
        "PoliceReformAdvanceCost",
        "WeaponReformRegressionCost",
        "WeaponReformAdvanceCost",
        "FeudalArmiesChangeCost",
        "MercenariesChangeCost",
        "ReligiousOrdersChangeCost",
        "AristocracyLoyalty",
        "ClergyLoyalty",
        "BurgousieLoyalty",
        "UrbanLoyalty",
        "BureaucratsLoyalty",
        "IntellectualsLoyalty",
        "WorkersLoyalty",
        "AristocracyTax",
        "ClergyTax",
        "BurgousieTax",
        "UrbanTax",
        "BureaucratsTax",
        "IntellectualsTax",
        "WorkersTax",
        "MilitaryTax",
        "SlavesWage",
        "LabourersWage",
        "SerfsWage",
        "UnemployedWage",
        "FarmersWage",
        "TownsfolkWage",
        "ClergyWage",
        "BureaucratsWage",
        "MerchantsWage",
        "IntellectualsWage",
        "AristocracyWage",
        "BurgousieWage",
        "SlavesTaxes",
        "LabourersTaxes",
        "SerfsTaxes",
        "UnemployedTaxes",
        "FarmersTaxes",
        "TownsfolkTaxes",
        "ClergyTaxes",
        "BureaucratsTaxes",
        "MerchantsTaxes",
        "IntellectualsTaxes",
        "SailorsTaxes",
        "SoldiersTaxes",
        "AristocracyTaxes",
        "BurgousieTaxes",
        "ExpectedSlavesSol",
        "ExpectedLabourersSol",
        "ExpectedSerfsSol",
        "ExpectedUnemployedSol",
        "ExpectedFarmersSol",
        "ExpectedTownsfolkSol",
        "ExpectedClergySol",
        "ExpectedBureaucratsSol",
        "ExpectedMerchantsSol",
        "ExpectedIntellectualsSol",
        "ExpectedSailorsSol",
        "ExpectedSoldiersSol",
        "ExpectedAristocracySol",
        "ExpectedBurgousieSol",
        "AverageExpectedSol",
        "SlavesSol",
        "LabourersSol",
        "SerfsSol",
        "UnemployedSol",
        "FarmersSol",
        "TownsfolkSol",
        "ClergySol",
        "BureaucratsSol",
        "MerchantsSol",
        "IntellectualsSol",
        "SailorsSol",
        "SoldiersSol",
        "AristocracySol",
        "BurgousieSol",
        "AverageSol",
        "SlavesLiteracy",
        "LabourersLiteracy",
        "SerfsLiteracy",
        "UnemployedLiteracy",
        "FarmersLiteracy",
        "TownsfolkLiteracy",
        "ClergyLiteracy",
        "BureaucratsLiteracy",
        "MerchantsLiteracy",
        "IntellectualsLiteracy",
        "SailorsLiteracy",
        "SoldiersLiteracy",
        "AristocracyLiteracy",
        "BurgousieLiteracy",
        "AristocracyPoliticalAwareness",
        "ClergyPoliticalAwareness",
        "BurgousiePoliticalAwareness",
        "UrbanPoliticalAwareness",
        "BureaucratsPoliticalAwareness",
        "IntellectualsPoliticalAwareness",
        "WorkersPoliticalAwareness",
        "MilitaryPoliticalAwareness",
        "UpkeepForOneMerchantShip",
        "StateProductionRevenue",
        "StateResourceRevenue",
        "StateAgricultureRevenue",
        "BuildingsUpkeep",
        "TroopRecruitmentCost",
        "StateWorkersUpkeep",
        "CoalShortage",
        "WoodShortage",
        "NaturalFabricsShortage",
        "LuxuryNaturalFabricsShortage",
        "ValuableMaterialsShortage",
        "BasicArmamentsArmyShortage",
        "IrregularQuality",
        "MeleeQuality",
        "RangedQuality",
        "FirearmQuality",
        "CavalryQuality",
        "SiegeQuality",
        "ArtilleryQuality",
        "Manpower",
        "UnitUpkeep",
        "LightShipQuality",
        "MediumShipQuality",
        "HeavyShipQuality",
        "LightShipConstructionCost",
        "MediumShipConstructionCost",
        "HeavyShipConstructionCost",
        "MerchantShipConstructionCost",
        "MerchantShipsFullfilment",
        "CityFortifications",
        "SupplyDepots",
        "NavalBases",
        "SmallFortUpkeep",
        "MediumFortUpkeep",
        "BigFortUpkeep",
        "HugeFortUpkeep",
        "CityFortificationUpkeep",
        "SupplyDepotUpkeep",
        "NavalBaseUpkeep",
        "AristocracyLevies",
        "AristocracyMilitia",
        "AristocracyLightInfantry",
        "AristocracyHeavyInfantry",
        "AristocracyEliteInfantry",
        "AristocracyArchers",
        "AristocracyCrossbowmen",
        "AristocracyMusketeers",
        "AristocracyMusketMilitia",
        "AristocracyRiflemen",
        "AristocracyLightCavalry",
        "AristocracyHeavyCavalry",
        "AristocracyEliteCavalry",
        "BurgousieLevies",
        "BurgousieMilitia",
        "BurgousieLightInfantry",
        "BurgousieHeavyInfantry",
        "BurgousieEliteInfantry",
        "BurgousieArchers",
        "BurgousieCrossbowmen",
        "BurgousieMusketeers",
        "BurgousieMusketMilitia",
        "BurgousieRiflemen",
        "BurgousieLightCavalry",
        "BurgousieHeavyCavalry",
        "BurgousieEliteCavalry",
        "ClergyLevies",
        "ClergyMilitia",
        "ClergyLightInfantry",
        "ClergyHeavyInfantry",
        "ClergyEliteInfantry",
        "ClergyArchers",
        "ClergyCrossbowmen",
        "ClergyMusketeers",
        "ClergyMusketMilitia",
        "ClergyRiflemen",
        "ClergyLightCavalry",
        "ClergyHeavyCavalry",
        "ClergyEliteCavalry",
        "PopulaceMilitia",
        "PopulaceMusketMilitia",
        "Housing",
        "Textiles",
        "BasicGoods",
        "LuxuryGoods",
        "Alcohol",
        "BasicTools",
        "HeavyIndustry",
        "BasicArmaments",
        "HeavyArmaments",
        "ShipBuilding",
        "Chemicals",
        "Motors",
        "Planes",
        "Electronics",
        "EffectiveHousing",
        "EffectiveTextiles",
        "EffectiveBasicGoods",
        "EffectiveLuxuryGoods",
        "EffectiveAlcohol",
        "EffectiveBasicTools",
        "EffectiveHeavyIndustry",
        "EffectiveBasicArmaments",
        "EffectiveHeavyArmaments",
        "EffectiveShipBuilding",
        "EffectiveChemicals",
        "EffectiveMotors",
        "EffectivePlanes",
        "EffectiveElectronics",
        "HousingDemand",
        "TextilesDemand",
        "BasicGoodsDemand",
        "LuxuryGoodsDemand",
        "AlcoholDemand",
        "BasicToolsDemand",
        "HeavyIndustryDemand",
        "BasicArmamentsDemand",
        "HeavyArmamentsDemand",
        "ShipBuildingDemand",
        "ChemicalsDemand",
        "MotorsDemand",
        "PlanesDemand",
        "ElectronicsDemand",
        "HousingValue",
        "TextilesValue",
        "BasicGoodsValue",
        "LuxuryGoodsValue",
        "AlcoholValue",
        "BasicToolsValue",
        "HeavyIndustryValue",
        "BasicArmamentsValue",
        "HeavyArmamentsValue",
        "ShipBuildingValue",
        "ChemicalsValue",
        "MotorsValue",
        "PlanesValue",
        "ElectronicsValue",
        "HousingShortage",
        "TextilesShortage",
        "BasicGoodsShortage",
        "LuxuryGoodsShortage",
        "AlcoholShortage",
        "BasicToolsShortage",
        "HeavyIndustryShortage",
        "BasicArmamentsShortage",
        "HeavyArmamentsShortage",
        "ShipBuildingShortage",
        "ChemicalsShortage",
        "MotorsShortage",
        "PlanesShortage",
        "ElectronicsShortage",
        "PopProductionRevenue",
        "StateProductionRevenue",
        "TaxRevenue",
        "GovernmentDominatedBy",
        "GovernmentEffects",
        "Alcoholism",
        "TaxEfficiency",
        "AdministrativeTech",
        "AdministrativePower",
        "AdministrativeDemand",
        "InternalTrade",
        "ExternalTrade",
        "TariffEfficiency",
        "Gdp",
        "GdpPerKCapita",
        "DebtToGdpRatio",
        "OverallSpending",
	"BureaucratWages",
	"AdministrativeTech",
        "Absolutism",
        "PassiveInvestmentIncome",
        "AdministrativeStrain",
        "FuturePopulation",
        "FutureLiteracyPercent",
        "FutureHigherEducation",
        "FutureBudget",
        "FutureFood",
        "FutureResearchPoints",
        "FuturePublicDebtLength",
        "FutureCulturalPower",
        "PopulationStabilityImpact",
        "ReligionRepresentedAtGovernmentLevelPercent",
        "CultureRepresentedAtGovernmentLevelPercent",
        "PopulationTechImpact",
        "ReligiousDisunity",
        "CulturalDisunity",
        "PopulationGrowth",
        "Corruption",
        "Stability",
        "Overextension",
        "Prosperity",
        "PopulationHappiness",
        "WarSupport",
        "AristocratStateLoyalty",
        "ClergyStateLoyalty",
        "BurgousieStateLoyalty",
        "TradeEfficiency",
        "TradePower",
        "ProductionEfficiency",
        "Production",
        "Inflation",
        "DailyBudget",
        "BudgetIncoming",
        "BudgetOutgoing",
        "Balance",
        "EffectiveTax",
        "ProductionRevenue",
        "TradeRevenue",
        "OverallIncome",
        "ArmyUpkeep",
        "NavyUpkeep",
        "FortUpkeep",
        "SpyUpkeep",
        "EducationUpkeep",
        "PopulationControlUpkeep",
        "SocialSpendingUpkeep",
        "AgricultureSpending",
        "AdministrativeUpkeep",
        "HealthUpkeep",
        "ResearchUpkeep",
        "PropagandaUpkeep",
        "EliteUnitsCap",
        "OverallNumbers",
        "PossiblePublicDebt",
        "InterestRate",
        "EffectiveDebt",
        "DebtHappinessEffect",
        "IronShortage",
        "SulphurShortage",
        "ArmyTech",
        "ArmyQuality",
        "MilitaryLoyalty",
        "MilitaryMorale",
        "UpkeepForOneLightShip",
        "UpkeepForOneMediumShip",
        "UpkeepForOneHeavyShip",
        "NavyTech",
        "NavyQuality",
        "OverallShipCount",
        "TradeProtection",
        "NavalPower",
        "Fertility",
        "AgricultureTechnology",
        "FarmingEfficiency",
        "Farmers",
        "DailyFood",
        "FoodConsumption",
        "FoodGain",
        "MaxFoodStock",
        "SellingCapability",
        "SurplusFood",
        "FoodSold",
        "Foodlost",
        "TradeProfit",
        "FoodPopulationBoost",
        "WarExhaustion",
        "Fervor",
        "Size",
        "KmSquared",
        "PopulationDensityPerKmSquared",
        "Disease",
        "UnderPopulation",
        "MaxPopulation",
        "DetachedLand",
        "CoastalPopulationPercent",
        "AverageDevelopment",
        "LandAdministration",
        "HabitableLand",
        "ResearchBoostFromTech",
        "ResearchPointGain",
        "CulturalAdvance",
        "CulturalPowerGain",
        "MaxCoal",
        "MaxSulphur",
        "MaxIron",
        "MaxCopper",
        "MaxGold",
        "MaxFur",
        "MaxDiamond",
        "MaxSilver",
        "MaxIvory",
        "EffectiveCoal",
        "EffectiveSulphur",
        "EffectiveCotton",
        "CottonInflation",
        "EffectiveGold",
        "GoldInflation",
        "EffectiveIron",
        "EffectiveTea",
        "TeaInflation",
        "EffectiveSilk",
        "SilkInflation",
        "EffectiveSpice",
        "SpiceInflation",
        "EffectiveWool",
        "WoolInflation",
        "EffectiveCoffee",
        "CoffeeInflation",
        "EffectiveFur",
        "FurInflation",
        "EffectiveDiamond",
        "DiamondInflation",
        "EffectiveSilver",
        "SilverInflation",
        "EffectiveCopper",
        "EffectiveIvory",
        "IvoryInflation",
        "EffectiveCocoa",
        "CocoaInflation",
        "EffectiveTobacco",
        "TobaccoInflation",
        "EffectiveSugar",
        "SugarInflation",
        "EffectiveExoticFruit",
        "ExoticFruitInflation",
        "ResourcePopulationGrowthBoost",
        "ResourceHappinessBoost",
        "ResourceBudgetBoost",
        "CoalDemand",
        "CoalValue",
        "GoldDemand",
        "GoldValue",
        "IronDemand",
        "IronValue",
        "SulphurDemand",
        "SulphurValue",
        "CottonDemand",
        "CottonValue",
        "TeaDemand",
        "TeaValue",
        "SpiceDemand",
        "SpiceValue",
        "CopperDemand",
        "CopperValue",
        "SilkDemand",
        "SilkValue",
        "WoolDemand",
        "WoolValue",
        "CoffeeDemand",
        "CoffeeValue",
        "SilverDemand",
        "SilverValue",
        "DiamondDemand",
        "DiamondValue",
        "FurDemand",
        "FurValue",
        "IvoryDemand",
        "IvoryValue",
        "CocoaDemand",
        "CocoaValue",
        "TobaccoDemand",
        "TobaccoValue",
        "SugarDemand",
        "SugarValue",
        "ExoticFruitDemand",
        "ExoticFruitValue",
        "FoodIncoming",
        "FoodOutgoing",
        "CoalIncoming",
        "CoalOutgoing",
        "SulphurIncoming",
        "SulphurOutgoing",
        "CottonIncoming",
        "CottonOutgoing",
        "GoldIncoming",
        "GoldOutgoing",
        "IronIncoming",
        "IronOutgoing",
        "TeaIncoming",
        "TeaOutgoing",
        "SilkIncoming",
        "SilkOutgoing",
        "SpiceIncoming",
        "SpiceOutgoing",
        "WoolIncoming",
        "WoolOutgoing",
        "CoffeeIncoming",
        "CoffeeOutgoing",
        "FurIncoming",
        "FurOutgoing",
        "DiamondIncoming",
        "DiamondOutgoing",
        "SilverIncoming",
        "SilverOutgoing",
        "CopperIncoming",
        "CopperOutgoing",
        "IvoryIncoming",
        "IvoryOutgoing",
        "CocoaIncoming",
        "CocoaOutgoing",
        "TobaccoIncoming",
        "TobaccoOutgoing",
        "SugarIncoming",
        "SugarOutgoing",
        "ExoticFruitIncoming",
        "ExoticFruitOutgoing",
        "TradePowerFromResourceTrade",
        "DevelopmentPixelCount",
        "coastalPopulation",
        "ReligionGroups\..+\.Points",
        "CultureGroups\..+\.Points",
        "Climates\..+\.Pixels",
        "TradeZones\..+\.Score"
    ],
    ConstantStats: [ ],
    TurnBasedStats: [
        "Population",
        "LiteracyPercent",
        "HigherEducation",
        "Budget",
        "Food",
        "ResearchPoints",
        "PublicDebtLength",
        "CulturalPower",
        "BasicArmamentsStockpiled",
        "HeavyArmamentsStockpiled",
        "ReformPower",
        "ForestsLeft"
    ],
    WarStats: [
        "AtWar",
        "Casualties",
        "Pillaging",
        "Occupation",
        "Blockade",
        "MinorBattles",
        "MajorBattles"
    ]
};


function getStatType(selection){
    let foundStatType;
    Object.keys(StatTypes).forEach(statType => {
        if (foundStatType != null) return;
        for(let i = 0; i < StatTypes[statType].length; i++){
            const endCompare = StatTypes[statType][i];
            const testString = '\\b' +endCompare + '\\b';
            
            if(new RegExp(testString).test(selection)) {
                foundStatType = statType.split(/Stats/)[0].replace(/([a-z])([A-Z])/, "$1 $2");
                break;
            } 
        }
    });
    return foundStatType != null ? foundStatType : "Unknown";
}

function ValueTypeFix(statName, statValue) {
    
    let statVal = statValue;
    if (statVal == "false") statVal = false;
    else if (statVal == "true") statVal = true;
    
    //numbers
    if (!isNaN(statVal) && statVal !== '') {
        if (typeof statVal === 'boolean') {
            let ret = document.createElement("span");
            if (statVal) ret.innerHTML = '&#10003;';
            ret.style.display = "inline-block"
            ret.style.height = "2.3ex"
            return { value: ret, appendable: true };
        }

        let numString;
        //integers
        if (~[
            "Population",
            "FuturePopulation",
            "PublicDebtLength",
            "FuturePublicDebtLength",
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
            "HandCannoneers",
            "Musketeers",
            "Militia",
            "SiegeEquipment",
            "LargeSiegeEquipment",
            "FieldCannons",
			"SiegeGuns",
			"RegimentalGuns",
            "EliteUnitsCap",
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
            numString = parseFloat(statVal).toFixed(0);
        }
        //round up
        else if(~[
            /* "PublicDebtTaken", */
            "EffectiveDebt"
        ].indexOf(statName)){
            numString = "" + (Math.ceil(statVal * 100) / 100);
        }
        //percentages
        else if (~[
            "ResearchEffectiveness",
            "TaxEfficiency",
            "IronShortage",
            "CoalShortage",
            "WoodShortage",
            "NaturalFabricsShortage",
            "LuxuryNaturalFabricsShortage",
            "ValuableMaterialsShortage",
            "BasicArmamentsArmyShortage",
            "HousingShortage",
            "TextilesShortage",
            "BasicGoodsShortage",
            "LuxuryGoodsShortage",
            "AlcoholShortage",
            "BasicToolsShortage",
            "HeavyIndustryShortage",
            "BasicArmamentsShortage",
            "HeavyArmamentsShortage",
            "ShipBuildingShortage",
            "ChemicalsShortage",
            "MotorsShortage",
            "PlanesShortage",
            "ElectronicsShortage",
            "SulphurShortage",
            "PopInAgriculture",
            "FarmingEfficiency",
            "TradeEfficiency",
            "InternalTariffs",
            "ExternalTariffs",
            "TariffEfficiency",
            "DebtToGdpRatio",
            "ProductionEfficiency",
            "ProductionGovernmentControl",
			"AristocratLoyalty", 
			"ClergyLoyalty", 
			"BurgousieLoyalty", 
			"BureaucratLoyalty", 
			"IntellectualsLoyalty", 
			"WorkersLoyalty", 
            "MilitaryLoyalty",
            "SlavesLiteracy",
            "LabourersLiteracy",
            "SerfsLiteracy",
            "UnemployedLiteracy",
            "FarmersLiteracy",
            "TownsfolkLiteracy",
            "ClergyLiteracy",
            "BureaucratsLiteracy",
            "MerchantsLiteracy",
            "IntellectualsLiteracy",
            "SailorsLiteracy",
            "SoldiersLiteracy",
            "AristocracyLiteracy",
            "BurgousieLiteracy",
            "AristocracyTax",
            "ClergyTax",
            "BurgousieTax",
            "UrbanTax",
            "BureaucratsTax",
            "IntellectualsTax",
            "WorkersTax",
            "MilitaryTax",
            "AristocracyLoyalty",
            "ClergyLoyalty",
            "BurgousieLoyalty",
            "UrbanLoyalty",
            "BureaucratsLoyalty",
            "IntellectualsLoyalty",
            "WorkersLoyalty",
            "AristocracyPoliticalAwareness",
            "ClergyPoliticalAwareness",
            "BurgousiePoliticalAwareness",
            "UrbanPoliticalAwareness",
            "BureaucratsPoliticalAwareness",
            "IntellectualsPoliticalAwareness",
            "WorkersPoliticalAwareness",
            "MilitaryPoliticalAwareness",
            "ReligionRepresentedAtGovernmentLevelPercent",
            "PopulationGrowth",
            "WarSupport",
            "ConscriptionPercent",
            "AristocratInfluence",
            "AristocratStateLoyalty",
            "ClergyInfluence",
            "ClergyStateLoyalty",
            "BurgousieInfluence",
            "BurgousieStateLoyalty",
            "MilitaryLoyalty",
            "MilitaryMorale",
            "MilitaryDiscipline",
            "CultureRepresentedAtGovernmentLevelPercent",
            "Farmers",
            "Pillaging",
            "Occupation",
			"Blockade",
            "Fervor",
            "Disease",
            "CoastalPopulationPercent",
            "AverageDevelopment",
            "HabitableLand",
            "InterestRate"
        ].indexOf(statName)) {
            numString = parseFloat(statVal * 100).toFixed(2) + "%";
        }
        //normal (2 digits)
        else {
            numString = parseFloat(statVal).toFixed(2);
        }
        let numSize;
        if (numString.indexOf(".") == -1) {
            numSize = numString.replace("%", "").length;
        } else {
            numSize = numString.indexOf(".");
        }

        let newNumString = "";
        if (numSize >= 5) {
            for (let i = 0; i < numString.length; i++) {
                newNumString += numString[i];
                //only modify in case we are on the left hand side of the decimal point (if we have one), and we are at an index going into 3 from decimal point.
                if ((numSize - i - 1) % 3 == 0 && i + 1 < numSize)
                    newNumString += " ";
            }
        }
        else newNumString = numString;
        return { value: newNumString, appendable: false };
    }
    //images
    else if (~[
        "Flag",
    ].indexOf(statName)) {
        if(/^$/.test(statVal)){
            return { value: "none", appendable: false };
        }else{
            let image = document.createElement("img");
            image.src = statVal;
            image.alt = statVal.split("/").pop();
            return { value: image, appendable: true };
        }
    }
    else
        return { value: statVal, appendable: false };

}

/* #region  taken from https://stackoverflow.com/questions/6735470/get-pixel-color-from-canvas-on-mousemove, answer by Wayne and Woold */
function findPos(obj) {
    var curleft = 0, curtop = 0;
    if (obj.offsetParent) {
        do {
            curleft += obj.offsetLeft;
            curtop += obj.offsetTop;
        } while (obj = obj.offsetParent);
        return { x: curleft, y: curtop };
    }
    return undefined;
}

function rgbToHex(color) {
    let r = color[0];
    let g = color[1];
    let b = color[2];
    if (r > 255 || g > 255 || b > 255)
        throw "Invalid color component";
    let str = ((r << 16) | (g << 8) | b).toString(16);
    while(str.length < 6) str = "0" + str;
    return str;
}
/* #endregion */

/* #region  taken from blog https://robkendal.co.uk/blog/2020-04-17-saving-text-to-client-side-file-using-vanilla-js */
const downloadToFile = (content, filename, contentType) => {
    const a = document.createElement('a');
    const file = new Blob([content], { type: contentType });

    a.href = URL.createObjectURL(file);
    a.download = filename;
    a.click();

    URL.revokeObjectURL(a.href);
};
/* #endregion */

function lerp(a, b, t){
    return a*(1-t) + b*t;
}

async function prepareData(path, progressTextElement){
    
    const WIDTH = 8192;
    const HEIGHT = 3365;
    
    let tempCanvas = document.createElement("canvas");
    tempCanvas.width = WIDTH;
    tempCanvas.height = HEIGHT;    

    if(progressTextElement != null) progressTextElement.innerText = `Loading ${path}`;

    let Img = new Image(WIDTH, HEIGHT);
    Img.src = `./docs/assets/images/world/${path}`;
    let done = false;
    Img.onload = function () {
        tempCanvas.getContext("2d").clearRect(0, 0, WIDTH, HEIGHT);
        tempCanvas.getContext("2d").drawImage(Img, 0, 0, WIDTH, HEIGHT);
        
        done = true;
    }

    while(!done){
        await new Promise(resolve => setTimeout(resolve));
    }

    return tempCanvas.getContext("2d").getImageData(0, 0, WIDTH, HEIGHT).data; 
}

/* #region  Taken from https://www.w3schools.com/howto/howto_js_collapsible.asp */
document.querySelector("body").onload = function () {
    var coll = document.getElementsByClassName("collapsible");
    var collitem;

    for (collitem = 0; collitem < coll.length; collitem++) {
        coll[collitem].addEventListener("click", function () {
            this.classList.toggle("active");
            var content = this.nextElementSibling;
            if (content.style.display === "block") {
                content.style.display = "none";
            } else {
                content.style.display = "block";
            }
        });
    }
}
/* #endregion */

function collapsibleNextSibling() {
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    if (content.style.display === "block") {
        content.style.display = "none";
    } else {
        content.style.display = "block";
    }
}

class MinMaxGradient{
    nodeList;
    constructor(nodeList){
        this.nodeList = nodeList.sort((a, b) => a.position - b.position);
    }

    colorAtPos(index){
        let nodeBefore, nodeAfter;

        for(let i = 0; i < this.nodeList.length; i++){
            if(this.nodeList[i].position > index) {
                nodeAfter = this.nodeList[i];
                nodeBefore = this.nodeList[Math.max(i - 1, 0)];
                break;
            }
        }

        
        let t = nodeAfter.position == nodeBefore.position ?
            nodeBefore.position :
            (index - nodeBefore.position) / (nodeAfter.position - nodeBefore.position);
        
        let ret = [
            lerp(nodeBefore.color[0], nodeAfter.color[0], t),
            lerp(nodeBefore.color[1], nodeAfter.color[1], t),
            lerp(nodeBefore.color[2], nodeAfter.color[2], t),
            255
        ]
        return ret;

    }
}
