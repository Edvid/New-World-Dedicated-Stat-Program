let BaseStats = [
	"ResearchSpending",
	"ReligionRepresentedAtGovernmentLevel",
	"CultureRepresentedAtGovernmentLevel",
	"Mercantilism",
	"LowerClassTax",
	"MilitaryDiscipline",
	"NavyImprovements",
	"AgricultureSubsidies",
    "Flag",
    "GovernmentName",
    "Health",
    "EducationEfficiency",
    "AdministrativeEfficiency",
    "Propaganda",
    "SocialSpending",
    "Absolutism",
    "PopulationControl",
    "BirthControl",
    "LocalTrade",
    "Merchantilism",
    "Spies",
    "SpyQuality",
    "NobleInfluence",
    "ClergyInfluence",
    "BurghersInfluence",
    "HighClassTax",
    "MediumClassTax",
    "LowClassTax",
    "PublicDebtTaken",
    "Artisans",
    "Clergy",
    "Nobility",
    "Burghers",
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
    "AgriculturalSubsidies",
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
    "Bayonet",
    "SocketBayonet",
    "Flintlock",
    "CulturalProsperity",
    "DivineRightToRule",
    "Serfdom",
    "Feudalism",
    "Universities",
    "NobleDuty",
    "Courthouses",
    "RenaissanceThought",
    "EarlyModernAdministration",
    "NationalSovereignity",
    "Newspapers",
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
];
let DerivedStats = [
    "FuturePopulation",
    "FutureLiteracyPercent",
    "FutureHigherEducation",
    "FutureBudget",
    "FutureFood",
    "FutureResearchPoints",
    "FuturePublicDebtLength",
    "FutureCulturalPower",
    "FutureDateInThisNation",
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
    "HygieneUpkeep",
    "ResearchUpkeep",
    "PropagandaUpkeep",
    "FreeEliteUnitsCap",
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
    "MilitaryMorale"
    

];
let ConstantStats = [
    "PrideOfTheNavy"
];
let TurnBasedStats = [
    "Population",
    "LiteracyPercent",
    "HigherEducation",
    "Budget",
    "Food",
    "ResearchPoints",
    "PublicDebtLength",
    "CulturalPower",
    "DateInThisNation",
];
let WarStats = [
    "AtWar",
    "Casualties",
    "Pillaging",
    "Occupation",
    "MinorBattles",
    "MajorBattles"
];


function getStatType(statName){
    for (let i = 0; i < BaseStats.length; i++) {
        const curStatName = BaseStats[i];
        if(curStatName == statName){
            return "Base";
        }
    }
    for (let i = 0; i < DerivedStats.length; i++) {
        const curStatName = DerivedStats[i];
        if(curStatName == statName){
            return "Derived";
        }
    }
    for (let i = 0; i < ConstantStats.length; i++) {
        const curStatName = ConstantStats[i];
        if(curStatName == statName){
            return "Constant";
        }
    }
    for (let i = 0; i < TurnBasedStats.length; i++) {
        const curStatName = TurnBasedStats[i];
        if(curStatName == statName){
            return "Turn Based";
        }
    }
    for (let i = 0; i < WarStats.length; i++) {
        const curStatName = WarStats[i];
        if(curStatName == statName){
            return "War";
        }
    }
    return "Unknown";
}
