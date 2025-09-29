import { Nation } from "../stats/gameStats"

type tradeInfluenceType = `.TradeInfluences["${string}"].TradingPoints`;

export const TableLayouts: Record<string, (keyof Nation)[][] | tradeInfluenceType[][]> = {
  "Flag and Government": [
    ["Flag"],
    ["Color"],
    ["GovernmentName"],
    ["GovernmentDominatedBy"],
    ["GovernmentEffects"]
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
    ["ReligiousFervor", "Nationalism"]
  ],
  "Basic Stats": [
    ["AverageDevelopment", "Health", "Alcoholism", "EducationEfficiency", "Propaganda", "SocialSpending", "PopulationControl", "BirthControl"],
    ["Stability", "Absolutism", "Corruption", "Overextension", "Prosperity", "PopulationHappiness", "WarSupport"],
    ["AdministrativeTech", "AdministrativeEfficiency", "AdministrationSize", "AdministrativePower", "AdministrativeDemand", "AdministrativeStrain", "TaxEfficiency"],
    ["BureaucratsWages", "StateFactoryWorkerWage", "StateLabourerWage", "StateFarmerWage"]
  ],
  "Budget Stats": [
    ["TradeEfficiency", "LocalTrade", "TradePower"],
    ["TradeImprovements", "ProductionEfficiency", "Production"],
    ["Inflation", "BudgetPerTurn", "Budget"],
    ["BudgetIncoming", "BudgetOutgoing", "Balance"],
    ["InternalTariffs", "ExternalTariffs", "TariffEfficiency"],
    ["Gdp", "GdpPerKCapita", "DebtToGdpRatio"]
  ],
  "Debt Stats": [
    ["PossiblePublicDebt", "PublicDebtLength", "InterestRate"],
    ["PublicDebtTaken", "EffectiveDebt", "DebtToGdpRatio"]
  ],
  "Upkeeps and Income": [
    ["OverallIncome", "OverallSpending"],
    ["TaxRevenue", "TariffsRevenue", "PassiveInvestmentIncome"],
    ["StateProductionRevenue", "StateResourceRevenue", "StateAgricultureRevenue"],
    ["SocialSpendingUpkeep", "AgricultureSpending", "EducationUpkeep", "PopulationControlUpkeep"],
    ["ResearchUpkeep", "PropagandaUpkeep", "AdministrativeUpkeep", "StateWorkersUpkeep"],
    ["ArmyUpkeep", "TroopRecruitmentCost", "BuildingsUpkeep", "ConstructionCost"],
    ["HealthUpkeep", "NavyUpkeep", "SpyUpkeep"]
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
    ["OverallImprovements", "CommanderFreedom", "ArmyWage", "BasicArmamentsStockpiled", "HeavyArmamentsStockpiled", "BasicArmamentsArmyShortage", "HeavyArmamentsShortage", "SulphurShortage"],
    ["MilitaryLoyalty", "MilitaryMorale", "MilitaryDiscipline", "ArmyBasicArmamentsDemand", "ArmyHeavyArmamentsDemand", "MinimumBasicArmamentsNeeded"],
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
    ["AristocracyCallupCost", "AristocracyLevies", "AristocracyMilitia", "AristocracyLightInfantry", "AristocracyHeavyInfantry", "AristocracyEliteInfantry", "AristocracyArchers", "AristocracyCrossbowmen", "AristocracyMusketeers", "AristocracyMusketMilitia", "AristocracyRiflemen", "AristocracyLightCavalry", "AristocracyHeavyCavalry", "AristocracyEliteCavalry"],
    ["BurgousieCallupCost", "BurgousieLevies", "BurgousieMilitia", "BurgousieLightInfantry", "BurgousieHeavyInfantry", "BurgousieEliteInfantry", "BurgousieArchers", "BurgousieCrossbowmen", "BurgousieMusketeers", "BurgousieMusketMilitia", "BurgousieRiflemen", "BurgousieLightCavalry", "BurgousieHeavyCavalry", "BurgousieEliteCavalry"],
    ["ClergyCallupCost", "ClergyLevies", "ClergyMilitia", "ClergyLightInfantry", "ClergyHeavyInfantry", "ClergyEliteInfantry", "ClergyArchers", "ClergyCrossbowmen", "ClergyMusketeers", "ClergyMusketMilitia", "ClergyRiflemen", "ClergyLightCavalry", "ClergyHeavyCavalry", "ClergyEliteCavalry"],
    ["PopulaceMilitia", "PopulaceMusketMilitia"]
  ],
  "Buildings": [
    ["SmallForts", "MediumForts", "BigForts", "HugeForts", "CityFortifications", "SupplyDepots", "NavalBases"],
    ["SmallFortUpkeep", "MediumFortUpkeep", "BigFortUpkeep", "HugeFortUpkeep", "CityFortificationUpkeep", "SupplyDepotUpkeep", "NavalBaseUpkeep"],
    ["SmallFortConstructionCost", "MediumFortConstructionCost", "BigFortConstructionCost", "HugeFortConstructionCost", "CityFortificationConstructionCost", "SupplyDepotConstructionCost", "NavalBaseConstructionCost"]
  ],
  "Navy": [
    ["ShipBuildingShortage", "SulphurShortage"],
    ["LightShipImprovements", "MediumShipImprovements", "HeavyShipImprovements", "NavyTech"],
    ["LightShipQuality", "MediumShipQuality", "HeavyShipQuality", "SailorsWage"],
    ["UpkeepForOneLightShip", "UpkeepForOneMediumShip", "UpkeepForOneHeavyShip", "UpkeepForOneMerchantShip"],
    ["LightShipConstructionCost", "MediumShipConstructionCost", "HeavyShipConstructionCost", "MerchantShipConstructionCost"],
    ["LightShips", "MediumShips", "HeavyShips", "MerchantShips"],
    ["OverallShipCount", "MerchantShipsFullfilment", "TradeProtection", "NavalPower"]
  ],
  "Agriculture": [
    ["ArableLand", "AgricultureSubsidies", "AgricultureInfrastructure", "AgricultureAdvancements", "AgricultureTechnology", "FarmingEfficiency", "AgricultureSpending"],
    ["PopInAgriculture", "FoodPerTurn", "FoodConsumption", "FoodGain", "StockingCapabilities", "MaxFoodStock", "SellingCapability"],
    ["Food", "FutureFood", "SurplusFood", "FoodSold", "FoodLost", "FoodTradeProfit", "FoodPopulationBoost"],
    ["FoodRationing"]
  ],
  "War Stats": [
    ["AtWar", "Casualties", "Pillaging", "Occupation", "Blockade", "MinorBattles", "MajorBattles", "WarExhaustion", "Fervor"]
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
  "Trade Influence - Americas": tradeInfluenceTableWrapper([
    ["Alaska", "CentralCanada", "HudsonBay", "LawrenceGulf", "Cascadia", "WestCoast", "TheRockies", "Mississippi", "EastCoast", "Caribbean"],
    ["GulfOfMexico", "WesternMexico", "CentralAmerica", "Venezuela", "Amazon", "Peru", "SaoFranciscoRiver", "ParanaRiver", "Chile", "Patagonia"]
  ]),
  "Trade Influence - Europe": tradeInfluenceTableWrapper([
    ["Iberia", "WesternMediterranean", "BayOfBiscay", "SouthernFrance", "France", "EnglishChannel", "BritishIsles", "NorthSea", "Rhine", "Denmark"],
    ["CentralEurope", "WesternDanube", "EasternDanube", "Adriatic", "CentralMediterranean", "Greece", "Romania", "Vistula", "BalticSea", "NorthernNordics"],
    ["BarentsSea", "Novgorod", "Livonia", "Dniepr", "Muscovy", "DonRiver", "Crimea", "Caucasus", "Volga", "UralRiver"]
  ]),
  "Trade Influence - Africa": tradeInfluenceTableWrapper([
    ["Morocco", "WesternSahara", "Sahara", "Egypt", "RedSea", "SouthernNile", "Somalia", "Guinea", "WesternNiger"],
    ["EasternNiger", "Gabon", "CongoRiver", "LakeVictoria", "LakeTanganyika", "EastAfrica", "Angola", "Mozambique", "SouthAfrica"]
  ]),
  "Trade Influence - Asia": tradeInfluenceTableWrapper([
    ["ArabianDesert", "EasternMediterranean", "NorthernAnatolia", "Mesopotamia", "PersianGulf", "Iran", "CaspianSea", "Afghanistan"],
    ["WesternSiberia", "CentralSiberia", "EasternSiberia", "CentralAsia", "GobiDesert", "Manchuria", "SeaOfJapan", "YellowRiver"],
    ["YangtzeRiver", "SouthChinaSea", "Sichuan", "Tibet", "IndusRiver", "Ganges", "CentralIndia", "Deccan"],
    ["SouthEastAsia", "Indonesia", "Pacific", "NorthernAustralia", "AustralianDesert", "SouthernAustralia"]
  ]),
  "Tech Stats": [
    ["Isolation", "ResearchSpending", "ResearchEffectiveness", "ResearchBoostFromTech", "ResearchEfficiency", "ResearchPointGain", "ResearchPoints", "FutureResearchPoints"]
  ],
  "Technologies": [
    ["Technologies.IronWorking", "Technologies.Wheel", "Technologies.Paper"],
    ["Technologies.Gunpowder", "Technologies.VerticalLoom", "Technologies.SaddleAndStirrup", "Technologies.HorseCollar"],
    ["Technologies.Explosives", "Technologies.Firelance"],
    ["Technologies.Cranes", "Technologies.PromissoryNotes", "Technologies.Bombards", "Technologies.HandCannons", "Technologies.PlateArmour", "Technologies.SappersAndEngineers"],
    ["Technologies.Workshops", "Technologies.StandardizedPikes"],
    ["Technologies.Galleons", "Technologies.PrintingPress", "Technologies.Muskets", "Technologies.Limber", "Technologies.Docks", "Technologies.Gunports"],
    ["Technologies.Matchlock", "Technologies.StarForts", "Technologies.TextileManufactories", "Technologies.Reiters", "Technologies.MiningCarts", "Technologies.HumanAnatomy", "Technologies.Mortars"],
    ["Technologies.Metallurgy", "Technologies.Experimentation", "Technologies.Fluyt"],
    ["Technologies.Bayonet", "Technologies.SocketBayonet", "Technologies.Flintlock"],
    ["Technologies.FlyingShuttle", "Technologies.LeadChamberProcess"],
    ["Technologies.Gunlock"],
    ["Technologies.SteamEngine", "Technologies.PuddlingProcess"],
    ["Technologies.Rifles", "Technologies.ModernChemistry", "Technologies.CottonGin", "Technologies.SteamBoats", "Technologies.HotAirBalloon", "Technologies.PowerLoomAndSewingMachine"],
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
    ["MiningEfficiency", "BaseIronHarvest", "BaseCoalHarvest", "BaseSulphurHarvest", "Forestry", "Reforestation", "MaxForestry"],
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
  ],
  "Resource Trade": [
    ["FoodIncoming", "CoalIncoming", "SulphurIncoming", "CottonIncoming", "GoldIncoming", "IronIncoming", "TeaIncoming", "SilkIncoming", "SpiceIncoming", "WoolIncoming"],
    ["FoodOutgoing", "CoalOutgoing", "SulphurOutgoing", "CottonOutgoing", "GoldOutgoing", "IronOutgoing", "TeaOutgoing", "SilkOutgoing", "SpiceOutgoing", "WoolOutgoing"],
    ["CoffeeIncoming", "FurIncoming", "DiamondIncoming", "SilverIncoming", "CopperIncoming", "IvoryIncoming", "CocoaIncoming", "TobaccoIncoming", "SugarIncoming", "ExoticFruitIncoming"],
    ["CoffeeOutgoing", "FurOutgoing", "DiamondOutgoing", "SilverOutgoing", "CopperOutgoing", "IvoryOutgoing", "CocoaOutgoing", "TobaccoOutgoing", "SugarOutgoing", "ExoticFruitOutgoing"],
    ["HousingIncoming", "TextilesIncoming", "BasicGoodsIncoming", "LuxuryGoodsIncoming", "AlcoholIncoming", "BasicToolsIncoming", "HeavyIndustryIncoming", "BasicArmamentsIncoming", "HeavyArmamentsIncoming", "ShipBuildingIncoming", "ChemicalsIncoming", "MotorsIncoming", "PlanesIncoming", "ElectronicsIncoming"],
    ["HousingOutgoing", "TextilesOutgoing", "BasicGoodsOutgoing", "LuxuryGoodsOutgoing", "AlcoholOutgoing", "BasicToolsOutgoing", "HeavyIndustryOutgoing", "BasicArmamentsOutgoing", "HeavyArmamentsOutgoing", "ShipBuildingOutgoing", "ChemicalsOutgoing", "MotorsOutgoing", "PlanesOutgoing", "ElectronicsOutgoing"],
    ["TradePowerFromResourceTrade"]
  ]
}

function tradeInfluenceTableWrapper(arr2D: string[][]) {
  const newArr2D: tradeInfluenceType[][] = [];
  arr2D.forEach(arr => {
    newArr2D.push(tradeInfluenceRowWrapper(arr))
  });
  return newArr2D;
}

function tradeInfluenceRowWrapper(arr: string[]) {
  const newArr: tradeInfluenceType[] = [];
  arr.forEach(el => {
    newArr.push(ti(el))
  });
  return newArr;
}

function ti(zone: string): tradeInfluenceType {
  return `.TradeInfluences["${zone}"].TradingPoints`
}
