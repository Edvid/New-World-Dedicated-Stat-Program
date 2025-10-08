import { realResourceTypes } from "../utility/game_stats/resources.js";
import { startingReligionGroups, religions } from "../utility/game_stats/religions.js";
import { tradeZones } from "../utility/game_stats/trades.js";
import { climates } from "../utility/game_stats/climates.js";
import { technologies } from "../utility/game_stats/technologies.js";
import { estates, estateGeneral, } from "../utility/game_stats/estates.js";
export class SocialBehaviour {
    Color = "000000";
    Opinions = {};
}
export class SocialBehaviourGroup {
    Points = 0;
}
export class NationClimate {
    Pixels;
}
export class Opinion {
    Score;
    static Undesired = -100;
    static Skeptical = -50;
    static DefaultDistrust = -30;
    static Neutral = 0;
    static Fond = 50;
    static Obsessed = 100; //Like Frankophiles or they see them as brothers 
    static UndesiredImage = "https://static.wikia.nocookie.net/spore/images/7/73/Hostile.png/";
    static SkepticalImage = "https://static.wikia.nocookie.net/spore/images/1/19/Annoyed.png/";
    static NeutralImage = "https://s3.getstickerpack.com/storage/uploads/sticker-pack/emoticons-cooee/sticker_22.webp?7f8d87115eaaf992bd4a839badf97c3d&d=200x200";
    static FondImage = "https://static.wikia.nocookie.net/spore/images/b/b8/Friend.png";
    static ObsessedImage = "https://static.wikia.nocookie.net/spore/images/a/ae/Ally.png";
}
const fertilities = {
    Infertile: { Color: "ffffff", Score: 0.025 },
    BarelyFertile: { Color: "ff0000", Score: 0.15 },
    LowFertility: { Color: "ff6a00", Score: 0.35 },
    AverageFertility: { Color: "ffd800", Score: 0.55 },
    GoodFertility: { Color: "00ff00", Score: 0.7 },
    HighFertility: { Color: "00c900", Score: 0.8 },
    AmazingFertility: { Color: "008000", Score: 0.9 },
    TopFertility: { Color: "003e00", Score: 1.0 }
};
const unitUpkeepCosts = {
    Levies: 0.75 / 1000,
    LightInfantry: 2 / 1000,
    HeavyInfantry: 4 / 1000,
    Archers: 3 / 1000,
    Crossbowmen: 2 / 1000,
    LightCavalry: 4 / 1000,
    HeavyCavalry: 6.5 / 1000,
    EliteInfantry: 7 / 1000,
    EliteCavalry: 8.5 / 1000,
    HandCannoneers: 5 / 1000,
    Musketeers: 3.5 / 1000,
    MusketMilitia: 2 / 1000,
    Riflemen: 10 / 1000,
    Militia: 1.25 / 1000,
    SiegeEquipment: 1 / 10,
    LargeSiegeEquipment: 1 / 5,
    FieldCannons: 1 / 5,
    RegimentalGuns: 1 / 10,
    SiegeGuns: 1 / 2.5
};
export class Nation {
    FuturePopulation;
    FutureLiteracyPercent;
    FutureHigherEducation;
    FutureBudget;
    FuturePublicDebtLength;
    GovernmentName;
    GovernmentDominatedBy;
    GovernmentEffects;
    CapitalName;
    Flag;
    Color;
    ReligionGroups = {};
    ReligionRepresentedAtGovernmentLevel;
    ReligionRepresentedAtGovernmentLevelPercent;
    GovernmentRepresentation;
    ReformPower;
    ReformPowerGain;
    Reforms;
    SlaveryReformRegressionCost;
    SerfdomReformRegressionCost;
    EnclosureReformRegressionCost;
    TradeReformRegressionCost;
    AntitrustReformRegressionCost;
    SuffrageReformRegressionCost;
    PrivilegeReformRegressionCost;
    OfficersReformRegressionCost;
    BureaucratsReformRegressionCost;
    ResourceReformRegressionCost;
    LandReformRegressionCost;
    ArmyReformRegressionCost;
    CensorshipReformRegressionCost;
    SocialReformRegressionCost;
    ReligiousReformRegressionCost;
    EducationReformRegressionCost;
    PoliceReformRegressionCost;
    WeaponReformRegressionCost;
    FeudalArmiesChangeCost;
    MercenariesChangeCost;
    ReligiousOrdersChangeCost;
    SlaveryReformAdvanceCost;
    SerfdomReformAdvanceCost;
    EnclosureReformAdvanceCost;
    TradeReformAdvanceCost;
    AntitrustReformAdvanceCost;
    SuffrageReformAdvanceCost;
    PrivilegeReformAdvanceCost;
    OfficersReformAdvanceCost;
    BureaucratsReformAdvanceCost;
    ResourceReformAdvanceCost;
    LandReformAdvanceCost;
    ArmyReformAdvanceCost;
    CensorshipReformAdvanceCost;
    SocialReformAdvanceCost;
    ReligiousReformAdvanceCost;
    EducationReformAdvanceCost;
    PoliceReformAdvanceCost;
    WeaponReformAdvanceCost;
    MilitaryControl;
    CulturalDisunity;
    ReligiousDisunity;
    Population;
    PopulationGrowth;
    PseudoPopulationGrowth;
    Health;
    EffectiveHealth;
    Alcoholism;
    UnemployedLiteracy;
    SlavesLiteracy;
    LabourersLiteracy;
    SerfsLiteracy;
    FarmersLiteracy;
    TownsfolkLiteracy;
    ClergyLiteracy;
    BureaucratsLiteracy;
    MerchantsLiteracy;
    IntellectualsLiteracy;
    SailorsLiteracy;
    SoldiersLiteracy;
    AristocracyLiteracy;
    BurgousieLiteracy;
    LiteracyPercent;
    HigherEducation;
    AristocracyPoliticalAwareness;
    ClergyPoliticalAwareness;
    BurgousiePoliticalAwareness;
    UrbanPoliticalAwareness;
    BureaucratsPoliticalAwareness;
    IntellectualsPoliticalAwareness;
    WorkersPoliticalAwareness;
    MilitaryPoliticalAwareness;
    EducationEfficiency;
    AdministrativeEfficiency;
    AdministrationSize;
    AdministrativeStrain;
    AdministrativeTech;
    AdministrativePower;
    AdministrativeDemand;
    Corruption;
    Propaganda;
    SocialSpending;
    Prosperity; //Quality of Life
    PopulationHappiness;
    Stability;
    AtWar;
    WarSupport;
    Nationalism;
    ReligiousFervor;
    Absolutism;
    PopulationControl;
    BirthControl;
    ConscriptionPercent;
    BureaucratsWages;
    UnemployedWage;
    SlavesWage;
    LabourersWage;
    SerfsWage;
    FarmersWage;
    TownsfolkWage;
    ClergyWage;
    BureaucratsWage;
    MerchantsWage;
    IntellectualsWage;
    SailorsWage;
    SoldiersWage;
    AristocracyWage;
    BurgousieWage;
    StateFarmerWage;
    StateLabourerWage;
    StateFactoryWorkerWage;
    UnemployedTaxes;
    SlavesTaxes;
    LabourersTaxes;
    SerfsTaxes;
    FarmersTaxes;
    TownsfolkTaxes;
    ClergyTaxes;
    BureaucratsTaxes;
    MerchantsTaxes;
    IntellectualsTaxes;
    SailorsTaxes;
    SoldiersTaxes;
    AristocracyTaxes;
    BurgousieTaxes;
    TaxEfficiency;
    TaxRevenue;
    EffectiveTax;
    PopProductionRevenue;
    StateProductionRevenue;
    StateResourceRevenue;
    StateAgricultureRevenue;
    Production;
    ProductionGovernmentControl;
    ProductionEfficiency;
    TradeEfficiency;
    LocalTrade;
    TradePower;
    TradeImprovements;
    BudgetPerTurn;
    Budget;
    Inflation;
    Spies;
    SpyQuality;
    ArmyUpkeep;
    SpyUpkeep;
    SocialSpendingUpkeep;
    HealthUpkeep;
    EducationUpkeep;
    PropagandaUpkeep;
    PopulationControlUpkeep;
    TradeRevenue;
    AdministrativeUpkeep;
    ProductionRevenue;
    ResearchUpkeep;
    StateWorkersUpkeep;
    OverallIncome;
    OverallSpending;
    TariffsRevenue;
    PassiveInvestmentIncome;
    Levies;
    LightInfantry;
    HeavyInfantry;
    Archers;
    Crossbowmen;
    LightCavalry;
    HeavyCavalry;
    EliteInfantry;
    EliteCavalry;
    HandCannoneers;
    Musketeers;
    MusketMilitia;
    Riflemen;
    Militia;
    SiegeEquipment;
    LargeSiegeEquipment;
    FieldCannons;
    SiegeGuns;
    RegimentalGuns;
    EliteUnitsCap;
    UnitUpkeep;
    OverallNumbers;
    SmallForts;
    MediumForts;
    BigForts;
    HugeForts;
    CityFortifications;
    SupplyDepots;
    NavalBases;
    SmallFortUpkeep;
    MediumFortUpkeep;
    BigFortUpkeep;
    HugeFortUpkeep;
    CityFortificationUpkeep;
    SupplyDepotUpkeep;
    NavalBaseUpkeep;
    SmallFortConstructionCost;
    MediumFortConstructionCost;
    BigFortConstructionCost;
    HugeFortConstructionCost;
    CityFortificationConstructionCost;
    SupplyDepotConstructionCost;
    NavalBaseConstructionCost;
    BuildingsUpkeep;
    ConstructionCost;
    WoodShortage;
    CoalShortage;
    IronShortage;
    SulphurShortage;
    NaturalFabricsShortage;
    LuxuryNaturalFabricsShortage;
    ValuableMaterialsShortage;
    HousingShortage;
    TextilesShortage;
    BasicGoodsShortage;
    LuxuryGoodsShortage;
    AlcoholShortage;
    BasicToolsShortage;
    HeavyIndustryShortage;
    BasicArmamentsShortage;
    BasicArmamentsArmyShortage;
    HeavyArmamentsShortage;
    ShipBuildingShortage;
    ChemicalsShortage;
    MotorsShortage;
    PlanesShortage;
    ElectronicsShortage;
    CommanderFreedom;
    BasicArmamentsStockpiled;
    HeavyArmamentsStockpiled;
    ArmyWage;
    ArmyWages;
    MilitaryLoyalty;
    AristocracyLoyalty; //Show in percent
    ClergyLoyalty; //Show in percent
    BurgousieLoyalty; //Show in percent
    UrbanLoyalty; //Show in percent
    BureaucratsLoyalty; //Show in percent
    IntellectualsLoyalty; //Show in percent
    WorkersLoyalty; //Show in percent
    InfluenceChangeLoyaltyEffect;
    MilitaryMorale;
    MilitaryDiscipline;
    OverallImprovements;
    IrregularImprovements;
    MeleeImprovements;
    RangedImprovements;
    CavalryImprovements;
    FirearmImprovements;
    SiegeImprovements;
    ArtilleryImprovements;
    LightShipImprovements;
    MediumShipImprovements;
    HeavyShipImprovements;
    LightShipQuality;
    MediumShipQuality;
    HeavyShipQuality;
    LightShipConstructionCost;
    MediumShipConstructionCost;
    HeavyShipConstructionCost;
    MerchantShipConstructionCost;
    MerchantShipsFullfilment;
    NavyTech;
    IrregularQuality;
    MeleeQuality;
    RangedQuality;
    FirearmQuality;
    CavalryQuality;
    SiegeQuality;
    ArtilleryQuality;
    NavyQuality;
    MerchantShips;
    UpkeepForOneMerchantShip;
    LightShips;
    UpkeepForOneLightShip;
    MediumShips;
    UpkeepForOneMediumShip;
    HeavyShips;
    UpkeepForOneHeavyShip;
    OverallShipCount;
    TradeProtection;
    Manpower;
    NavalPower;
    NavyUpkeep;
    New_Levies;
    New_Militia;
    New_LightInfantry;
    New_HeavyInfantry;
    New_EliteInfantry;
    New_Archers;
    New_Crossbowmen;
    New_HandCannoneers;
    New_Musketeers;
    New_MusketMilitia;
    New_Riflemen;
    New_LightCavalry;
    New_HeavyCavalry;
    New_EliteCavalry;
    New_SiegeEquipment;
    New_LargeSiegeEquipment;
    New_RegimentalGuns;
    New_FieldCannons;
    New_SiegeGuns;
    New_MerchantShips;
    New_LightShips;
    New_MediumShips;
    New_HeavyShips;
    New_SmallForts;
    New_MediumForts;
    New_BigForts;
    New_HugeForts;
    New_CityFortifications;
    New_SupplyDepots;
    New_NavalBases;
    TroopRecruitmentCost;
    AristocracyCallupCost;
    AristocracyLevies;
    AristocracyMilitia;
    AristocracyLightInfantry;
    AristocracyHeavyInfantry;
    AristocracyEliteInfantry;
    AristocracyArchers;
    AristocracyCrossbowmen;
    AristocracyMusketeers;
    AristocracyMusketMilitia;
    AristocracyRiflemen;
    AristocracyLightCavalry;
    AristocracyHeavyCavalry;
    AristocracyEliteCavalry;
    BurgousieCallupCost;
    BurgousieLevies;
    BurgousieMilitia;
    BurgousieLightInfantry;
    BurgousieHeavyInfantry;
    BurgousieEliteInfantry;
    BurgousieArchers;
    BurgousieCrossbowmen;
    BurgousieMusketeers;
    BurgousieMusketMilitia;
    BurgousieRiflemen;
    BurgousieLightCavalry;
    BurgousieHeavyCavalry;
    BurgousieEliteCavalry;
    ClergyCallupCost;
    ClergyLevies;
    ClergyMilitia;
    ClergyLightInfantry;
    ClergyHeavyInfantry;
    ClergyEliteInfantry;
    ClergyArchers;
    ClergyCrossbowmen;
    ClergyMusketeers;
    ClergyMusketMilitia;
    ClergyRiflemen;
    ClergyLightCavalry;
    ClergyHeavyCavalry;
    ClergyEliteCavalry;
    PopulaceMilitia;
    PopulaceMusketMilitia;
    AristocracyLeviesCasualties;
    AristocracyMilitiaCasualties;
    AristocracyLightInfantryCasualties;
    AristocracyHeavyInfantryCasualties;
    AristocracyEliteInfantryCasualties;
    AristocracyArchersCasualties;
    AristocracyCrossbowmenCasualties;
    AristocracyMusketeersCasualties;
    AristocracyMusketMilitiaCasualties;
    AristocracyRiflemenCasualties;
    AristocracyLightCavalryCasualties;
    AristocracyHeavyCavalryCasualties;
    AristocracyEliteCavalryCasualties;
    ClergyLeviesCasualties;
    ClergyMilitiaCasualties;
    ClergyLightInfantryCasualties;
    ClergyHeavyInfantryCasualties;
    ClergyEliteInfantryCasualties;
    ClergyArchersCasualties;
    ClergyCrossbowmenCasualties;
    ClergyMusketeersCasualties;
    ClergyMusketMilitiaCasualties;
    ClergyRiflemenCasualties;
    ClergyLightCavalryCasualties;
    ClergyHeavyCavalryCasualties;
    ClergyEliteCavalryCasualties;
    BurgousieLeviesCasualties;
    BurgousieMilitiaCasualties;
    BurgousieLightInfantryCasualties;
    BurgousieHeavyInfantryCasualties;
    BurgousieEliteInfantryCasualties;
    BurgousieArchersCasualties;
    BurgousieCrossbowmenCasualties;
    BurgousieMusketeersCasualties;
    BurgousieMusketMilitiaCasualties;
    BurgousieRiflemenCasualties;
    BurgousieLightCavalryCasualties;
    BurgousieHeavyCavalryCasualties;
    BurgousieEliteCavalryCasualties;
    PopulaceMilitiaCasualties;
    PopulaceMusketMilitiaCasualties;
    Workforces;
    PopInAgriculture;
    ProductionSectors;
    SocietalClasses;
    CultureGroups = {};
    CultureRepresentedAtGovernmentLevel;
    CultureRepresentedAtGovernmentLevelPercent;
    PopulationStabilityImpact;
    PopulationTechImpact;
    MiningEfficiency;
    Wood;
    ForestsCutDown;
    ForestsLeft;
    Forestry;
    EffectiveWood;
    Reforestation;
    MaxForestry;
    Coal;
    BaseCoalHarvest;
    EffectiveCoal;
    MaxCoal;
    Sulphur;
    BaseSulphurHarvest;
    EffectiveSulphur;
    MaxSulphur;
    Cotton;
    EffectiveCotton;
    Gold;
    EffectiveGold;
    MaxGold;
    Iron;
    BaseIronHarvest;
    EffectiveIron;
    MaxIron;
    Tea;
    EffectiveTea;
    Silk;
    EffectiveSilk;
    Spice;
    EffectiveSpice;
    Wool;
    EffectiveWool;
    Coffee;
    EffectiveCoffee;
    Fur;
    EffectiveFur;
    MaxFur;
    Diamond;
    EffectiveDiamond;
    MaxDiamond;
    Silver;
    EffectiveSilver;
    MaxSilver;
    Copper;
    EffectiveCopper;
    MaxCopper;
    Ivory;
    EffectiveIvory;
    MaxIvory;
    Cocoa;
    EffectiveCocoa;
    Tobacco;
    EffectiveTobacco;
    Sugar;
    EffectiveSugar;
    ExoticFruit;
    EffectiveExoticFruit;
    Housing;
    Textiles;
    BasicGoods;
    LuxuryGoods;
    Alcohol;
    BasicTools;
    HeavyIndustry;
    BasicArmaments;
    HeavyArmaments;
    ShipBuilding;
    Chemicals;
    Motors;
    Planes;
    Electronics;
    EffectiveHousing;
    EffectiveTextiles;
    EffectiveBasicGoods;
    EffectiveLuxuryGoods;
    EffectiveAlcohol;
    EffectiveBasicTools;
    EffectiveHeavyIndustry;
    EffectiveBasicArmaments;
    EffectiveHeavyArmaments;
    EffectiveShipBuilding;
    EffectiveChemicals;
    EffectiveMotors;
    EffectivePlanes;
    EffectiveElectronics;
    ResourceBudgetBoost;
    FoodDemand;
    FoodValue;
    WoodDemand;
    WoodValue;
    CoalDemand;
    CoalValue;
    GoldDemand;
    GoldValue;
    IronDemand;
    IronValue;
    SulphurDemand;
    SulphurValue;
    CottonDemand;
    CottonValue;
    TeaDemand;
    TeaValue;
    SpiceDemand;
    SpiceValue;
    CopperDemand;
    CopperValue;
    SilkDemand;
    SilkValue;
    WoolDemand;
    WoolValue;
    CoffeeDemand;
    CoffeeValue;
    SilverDemand;
    SilverValue;
    DiamondDemand;
    DiamondValue;
    FurDemand;
    FurValue;
    IvoryDemand;
    IvoryValue;
    CocoaDemand;
    CocoaValue;
    TobaccoDemand;
    TobaccoValue;
    SugarDemand;
    SugarValue;
    ExoticFruitDemand;
    ExoticFruitValue;
    HousingDemand;
    HousingValue;
    TextilesDemand;
    TextilesValue;
    BasicGoodsDemand;
    BasicGoodsValue;
    LuxuryGoodsDemand;
    LuxuryGoodsValue;
    AlcoholDemand;
    AlcoholValue;
    BasicToolsDemand;
    BasicToolsValue;
    HeavyIndustryDemand;
    HeavyIndustryValue;
    BasicArmamentsDemand;
    ArmyBasicArmamentsDemand;
    ArmyHeavyArmamentsDemand;
    MinimumBasicArmamentsNeeded;
    BasicArmamentsValue;
    HeavyArmamentsDemand;
    HeavyArmamentsValue;
    ShipBuildingDemand;
    ShipBuildingValue;
    ChemicalsDemand;
    ChemicalsValue;
    MotorsDemand;
    MotorsValue;
    PlanesDemand;
    PlanesValue;
    ElectronicsDemand;
    ElectronicsValue;
    Isolation;
    ResearchSpending;
    ResearchEfficiency;
    ResearchEffectiveness;
    ResearchBoostFromTech;
    ResearchPointGain;
    ResearchPoints;
    FutureResearchPoints;
    Technologies;
    AristocracyTax; //Show in percent
    ClergyTax; //Show in percent
    BurgousieTax; //Show in percent
    UrbanTax; //Show in percent
    BureaucratsTax; //Show in percent
    IntellectualsTax; //Show in percent
    MilitaryTax; //Show in percent
    WorkersTax; //Show in percent
    ExternalTrade;
    InternalTrade;
    ExternalTariffs;
    InternalTariffs;
    TariffEfficiency;
    Gdp;
    GdpPerKCapita;
    DebtToGdpRatio;
    UnemployedSol;
    SlavesSol;
    LabourersSol;
    SerfsSol;
    FarmersSol;
    TownsfolkSol;
    ClergySol;
    BureaucratsSol;
    MerchantsSol;
    IntellectualsSol;
    SailorsSol;
    SoldiersSol;
    AristocracySol;
    BurgousieSol;
    AverageSol;
    ExpectedSlavesSol;
    ExpectedLabourersSol;
    ExpectedSerfsSol;
    ExpectedUnemployedSol;
    ExpectedFarmersSol;
    ExpectedTownsfolkSol;
    ExpectedClergySol;
    ExpectedBureaucratsSol;
    ExpectedMerchantsSol;
    ExpectedIntellectualsSol;
    ExpectedSailorsSol;
    ExpectedSoldiersSol;
    ExpectedAristocracySol;
    ExpectedBurgousieSol;
    ExpectedPrivateBasicArmaments;
    AverageExpectedSol;
    PossiblePublicDebt;
    PublicDebtTaken;
    EffectiveDebt;
    PublicDebtLength;
    InterestRate;
    DebtHappinessEffect;
    BudgetIncoming;
    BudgetOutgoing;
    Balance;
    CulturalAdvance;
    CulturalProsperity;
    CulturalPowerGain;
    CulturalPower;
    FutureCulturalPower;
    CulturalAdvancements;
    WoodIncoming;
    WoodOutgoing;
    FoodIncoming;
    FoodOutgoing;
    CoalIncoming;
    CoalOutgoing;
    SulphurIncoming;
    SulphurOutgoing;
    CottonIncoming;
    CottonOutgoing;
    GoldIncoming;
    GoldOutgoing;
    IronIncoming;
    IronOutgoing;
    TeaIncoming;
    TeaOutgoing;
    SilkIncoming;
    SilkOutgoing;
    SpiceIncoming;
    SpiceOutgoing;
    WoolIncoming;
    WoolOutgoing;
    CoffeeIncoming;
    CoffeeOutgoing;
    FurIncoming;
    FurOutgoing;
    DiamondIncoming;
    DiamondOutgoing;
    SilverIncoming;
    SilverOutgoing;
    CopperIncoming;
    CopperOutgoing;
    IvoryIncoming;
    IvoryOutgoing;
    CocoaIncoming;
    CocoaOutgoing;
    TobaccoIncoming;
    TobaccoOutgoing;
    SugarIncoming;
    SugarOutgoing;
    ExoticFruitIncoming;
    ExoticFruitOutgoing;
    HousingIncoming;
    HousingOutgoing;
    TextilesIncoming;
    TextilesOutgoing;
    BasicGoodsIncoming;
    BasicGoodsOutgoing;
    LuxuryGoodsIncoming;
    LuxuryGoodsOutgoing;
    AlcoholIncoming;
    AlcoholOutgoing;
    BasicToolsIncoming;
    BasicToolsOutgoing;
    HeavyIndustryIncoming;
    HeavyIndustryOutgoing;
    BasicArmamentsIncoming;
    BasicArmamentsOutgoing;
    HeavyArmamentsIncoming;
    HeavyArmamentsOutgoing;
    ShipBuildingIncoming;
    ShipBuildingOutgoing;
    ChemicalsIncoming;
    ChemicalsOutgoing;
    MotorsIncoming;
    MotorsOutgoing;
    PlanesIncoming;
    PlanesOutgoing;
    ElectronicsIncoming;
    ElectronicsOutgoing;
    WoodBaseValue;
    SulphurBaseValue;
    CoalBaseValue;
    CottonBaseValue;
    GoldBaseValue;
    IronBaseValue;
    TeaBaseValue;
    SilkBaseValue;
    SpiceBaseValue;
    WoolBaseValue;
    CoffeeBaseValue;
    FurBaseValue;
    DiamondBaseValue;
    SilverBaseValue;
    CopperBaseValue;
    IvoryBaseValue;
    CocoaBaseValue;
    TobaccoBaseValue;
    SugarBaseValue;
    ExoticFruitBaseValue;
    HousingBaseValue;
    TextilesBaseValue;
    BasicGoodsBaseValue;
    LuxuryGoodsBaseValue;
    AlcoholBaseValue;
    BasicToolsBaseValue;
    HeavyIndustryBaseValue;
    BasicArmamentsBaseValue;
    HeavyArmamentsBaseValue;
    ShipBuildingBaseValue;
    ChemicalsBaseValue;
    MotorsBaseValue;
    PlanesBaseValue;
    ElectronicsBaseValue;
    TradePowerFromResourceTrade;
    ArableLand;
    AgricultureSubsidies;
    Fertility;
    AgricultureInfrastructure;
    StockingCapabilities;
    AgricultureAdvancements;
    AgricultureTechnology;
    FarmingEfficiency;
    AgricultureSpending;
    FoodPerTurn;
    FoodConsumption;
    FoodGain;
    MaxFoodStock;
    FoodRationing;
    Food;
    FutureFood;
    FoodPopulationBoost;
    SurplusFood;
    SellingCapability;
    FoodSold;
    FoodLost;
    FoodTradeProfit;
    TradeProfit;
    Casualties;
    Pillaging;
    Occupation;
    Blockade;
    WarExhaustion;
    MinorBattles;
    MajorBattles;
    Fervor;
    TradeInfluences;
    EstateInfluences;
    EstateInfluencesReal;
    ExpectedInfluences;
    Size;
    KmSquared;
    PopulationDensityPerKmSquared;
    Disease;
    MaxPopulation;
    UnderPopulation;
    DetachedLand;
    urbanPopulation;
    UrbanPopulationPercent;
    coastalPopulation;
    CoastalPopulationPercent;
    DevelopmentPixelCount;
    AverageDevelopment;
    LandAdministration;
    Overextension;
    Climates;
    HabitableLand;
    constructor(nationName) {
        /* #region  Stats to Set Immedietly */
        /* #region  Main */
        this.GovernmentName = nationName;
        this.Flag = "";
        this.Color = "";
        this.ReligionGroups = structuredClone(startingReligionGroups);
        this.Population = 2500000;
        this.FuturePopulation = 2500000;
        this.LiteracyPercent = 7;
        this.HigherEducation = 0.35;
        this.Budget = 400.00;
        this.Food = 200.00;
        this.ResearchPoints = 4;
        this.PublicDebtLength = 0;
        this.CulturalPower = 5;
        /* #endregion */
        /* #region  Most Stats */
        this.ReligiousDisunity = 0.00;
        this.DevelopmentPixelCount = 60000;
        this.coastalPopulation = 1000;
        this.Health = 2;
        this.Alcoholism = 0.00;
        this.EducationEfficiency = 3.5;
        this.BureaucratsWages = 3;
        this.AdministrativeEfficiency = 28.50;
        this.AdministrationSize = 0.7;
        this.Propaganda = 0.25;
        this.SocialSpending = 0.00;
        this.AtWar = false;
        this.Nationalism = 0;
        this.ReligiousFervor = 1.5;
        this.AristocracyLoyalty = 0.50; //Show in percent
        this.ClergyLoyalty = 0.50; //Show in percent
        this.BurgousieLoyalty = 0.50; //Show in percent
        this.UrbanLoyalty = 0.50; //Show in percent
        this.BureaucratsLoyalty = 0.50; //Show in percent
        this.IntellectualsLoyalty = 0.50; //Show in percent
        this.WorkersLoyalty = 0.50; //Show in percent
        this.AristocracyTax = 0.175; //Show in percent
        this.ClergyTax = 0.175; //Show in percent
        this.BurgousieTax = 0.175; //Show in percent
        this.UrbanTax = 0.15; //Show in percent
        this.BureaucratsTax = 0.125; //Show in percent
        this.IntellectualsTax = 0.125; //Show in percent
        this.MilitaryTax = 0.1; //Show in percent
        this.WorkersTax = 0.1; //Show in percent
        this.ExternalTariffs = 0.125; //Show in percent
        this.InternalTariffs = 0.125; //Show in percent
        this.ExpectedSlavesSol = 0.01;
        this.ExpectedLabourersSol = 0.2;
        this.ExpectedSerfsSol = 0.25;
        this.ExpectedUnemployedSol = 0.02;
        this.ExpectedFarmersSol = 0.5;
        this.ExpectedTownsfolkSol = 2;
        this.ExpectedClergySol = 10;
        this.ExpectedBureaucratsSol = 2.25;
        this.ExpectedMerchantsSol = 0.5;
        this.ExpectedIntellectualsSol = 1.5;
        this.ExpectedSailorsSol = 0.75;
        this.ExpectedSoldiersSol = 1;
        this.ExpectedAristocracySol = 17.5;
        this.ExpectedBurgousieSol = 10;
        this.ExpectedPrivateBasicArmaments = 2.5;
        this.EstateInfluences = {
            AristocracyInfluence: 30,
            ClergyInfluence: 15,
            BurgousieInfluence: 25,
            UrbanInfluence: 5,
            BureaucratsInfluence: 5,
            IntellectualsInfluence: 2.5,
            MilitaryInfluence: 2.5,
            WorkersInfluence: 0.5
        };
        this.ExpectedInfluences = {
            AristocracyInfluence: 0.5,
            ClergyInfluence: 0.175,
            BurgousieInfluence: 0.275,
            UrbanInfluence: 0.05,
            BureaucratsInfluence: 0.05,
            IntellectualsInfluence: 0.015,
            MilitaryInfluence: 0.015,
            WorkersInfluence: 0.005
        };
        this.InfluenceChangeLoyaltyEffect = {
            Aristocracy: 0,
            Clergy: 0,
            Burgousie: 0,
            Urban: 0,
            Bureaucrats: 0,
            Intellectuals: 0,
            Military: 0,
            Workers: 0
        };
        this.GovernmentRepresentation = {
            UnitaryRepresentation: 35,
            AristocracyRepresentation: 35,
            ClergyRepresentation: 10,
            BurgousieRepresentation: 20,
            UrbanRepresentation: 0,
            BureaucratsRepresentation: 0,
            IntellectualsRepresentation: 0,
            MilitaryRepresentation: 0,
            WorkersRepresentation: 0
        };
        this.MilitaryControl = {
            AristocracyControl: 40,
            ClergyControl: 10,
            BurgousieControl: 15,
            UrbanControl: 5,
            BureaucratsControl: 5,
            IntellectualsControl: 0,
            WorkersControl: 5,
            Independent: 20
        };
        this.PopulationControl = 0;
        this.BirthControl = 0;
        this.LocalTrade = 6.5;
        this.TradeImprovements = 0.75;
        this.Spies = 50;
        this.SpyQuality = 1.1;
        /* #endregion */
        /* #region  Army */
        this.OverallImprovements = 1.15;
        this.IrregularImprovements = 0.1;
        this.MeleeImprovements = 0.15;
        this.RangedImprovements = 0.1;
        this.CavalryImprovements = 0.15;
        this.FirearmImprovements = 0.1;
        this.SiegeImprovements = 0;
        this.ArtilleryImprovements = 0.1;
        this.Levies = 0;
        this.LightInfantry = 0;
        this.HeavyInfantry = 0;
        this.Archers = 0;
        this.Crossbowmen = 0;
        this.LightCavalry = 0;
        this.HeavyCavalry = 0;
        this.EliteInfantry = 0;
        this.EliteCavalry = 0;
        this.HandCannoneers = 0;
        this.Musketeers = 0;
        this.MusketMilitia = 0;
        this.Riflemen = 0;
        this.Militia = 0;
        this.SiegeEquipment = 0;
        this.LargeSiegeEquipment = 0;
        this.FieldCannons = 0;
        this.SiegeGuns = 0;
        this.RegimentalGuns = 0;
        this.SmallForts = 0;
        this.MediumForts = 0;
        this.BigForts = 0;
        this.HugeForts = 0;
        this.CityFortifications = 0;
        this.SupplyDepots = 0;
        this.NavalBases = 0;
        this.CommanderFreedom = 0;
        this.BasicArmamentsStockpiled = 0;
        this.HeavyArmamentsStockpiled = 0;
        this.SailorsWage = 1.50;
        this.ArmyWage = 2.90;
        this.MilitaryDiscipline = 1.01; //Show In Percent
        /* #endregion */
        /* #region  Navy */
        this.LightShipImprovements = 0.15;
        this.MediumShipImprovements = 0.15;
        this.HeavyShipImprovements = 0.15;
        this.MerchantShips = 25;
        this.LightShips = 0;
        this.MediumShips = 0;
        this.HeavyShips = 0;
        /* #endregion */
        /* #region  Agriculture */
        this.AgricultureSubsidies = 0.20;
        this.Fertility = 2500;
        this.AgricultureInfrastructure = 1.30;
        this.StockingCapabilities = 1.20;
        this.AgricultureAdvancements = 1.30;
        this.FoodRationing = false;
        /* #endregion */
        /* #region  Recruitments / New Troops */
        this.New_Levies = 0;
        this.New_LightInfantry = 0;
        this.New_HeavyInfantry = 0;
        this.New_Archers = 0;
        this.New_Crossbowmen = 0;
        this.New_LightCavalry = 0;
        this.New_HeavyCavalry = 0;
        this.New_EliteInfantry = 0;
        this.New_EliteCavalry = 0;
        this.New_HandCannoneers = 0;
        this.New_Musketeers = 0;
        this.New_MusketMilitia = 0;
        this.New_Riflemen = 0;
        this.New_Militia = 0;
        this.New_SiegeEquipment = 0;
        this.New_LargeSiegeEquipment = 0;
        this.New_FieldCannons = 0;
        this.New_SiegeGuns = 0;
        this.New_RegimentalGuns = 0;
        this.New_MerchantShips = 0;
        this.New_LightShips = 0;
        this.New_MediumShips = 0;
        this.New_HeavyShips = 0;
        this.New_SmallForts = 0;
        this.New_MediumForts = 0;
        this.New_BigForts = 0;
        this.New_HugeForts = 0;
        this.New_CityFortifications = 0;
        this.New_SupplyDepots = 0;
        this.New_NavalBases = 0;
        /* #endregion */
        /* #region  Population */
        this.Workforces = {
            Slaves: 0,
            Labourers: 0,
            Serfs: 0,
            Unemployed: 0,
            Farmers: 0,
            Townsfolk: 0,
            Bureaucrats: 0,
            Merchants: 0,
            Intellectuals: 0,
            Sailors: 0,
            Soldiers: 0,
            Clergy: 0.0125,
            Aristocracy: 0.02,
            Burgousie: 0.005
        };
        this.ProductionSectors = {
            ConstructionSector: 25,
            BasicArmamentsSector: 27.5,
            HeavyArmamentsSector: 10,
            ShipBuildingSector: 10,
            BasicToolsSector: 40,
            TextilesSector: 25,
            BasicGoodsSector: 30,
            LuxuryGoodsSector: 7.5,
            AlcoholSector: 25,
            ChemicalSector: 0,
            ElectronicsSector: 0,
            AutomotiveSector: 0,
            AerospaceSector: 0,
            HeavyIndustrySector: 0
        };
        this.ProductionGovernmentControl = 0;
        this.StateFarmerWage = 0.75;
        this.StateLabourerWage = 0.5;
        this.StateFactoryWorkerWage = 2;
        this.SocietalClasses = {
            High: 0,
            Medium: 0,
            Lower: 0,
            Slaves: 0,
        };
        this.CultureGroups = {};
        /* #endregion */
        /* #region  Resources */
        this.MiningEfficiency = 1.2;
        this.Forestry = 2;
        this.Reforestation = 0.2;
        this.ForestsCutDown = 0;
        // resource base values
        this.WoodBaseValue = 0.75;
        this.SulphurBaseValue = 1;
        this.CoalBaseValue = 1.25;
        this.CottonBaseValue = 1.75;
        this.GoldBaseValue = 6;
        this.IronBaseValue = 1.75;
        this.TeaBaseValue = 2.5;
        this.SilkBaseValue = 4;
        this.SpiceBaseValue = 2.5;
        this.WoolBaseValue = 1;
        this.CoffeeBaseValue = 2;
        this.FurBaseValue = 3.5;
        this.DiamondBaseValue = 7.5;
        this.SilverBaseValue = 4;
        this.CopperBaseValue = 1.5;
        this.IvoryBaseValue = 4;
        this.CocoaBaseValue = 2.25;
        this.TobaccoBaseValue = 2;
        this.SugarBaseValue = 2.75;
        this.ExoticFruitBaseValue = 2;
        this.HousingBaseValue = 2;
        this.TextilesBaseValue = 1.5;
        this.BasicGoodsBaseValue = 1;
        this.LuxuryGoodsBaseValue = 2;
        this.AlcoholBaseValue = 1;
        this.BasicToolsBaseValue = 1;
        this.HeavyIndustryBaseValue = 5;
        this.BasicArmamentsBaseValue = 2;
        this.HeavyArmamentsBaseValue = 10;
        this.ShipBuildingBaseValue = 10;
        this.ChemicalsBaseValue = 5;
        this.MotorsBaseValue = 7.5;
        this.PlanesBaseValue = 10;
        this.ElectronicsBaseValue = 10;
        this.Coal = 0.00;
        this.Sulphur = 0.00;
        this.Cotton = 0.00;
        this.Gold = 0.00;
        this.Iron = 0;
        this.Tea = 0.00;
        this.Silk = 0;
        this.Spice = 0;
        this.Wool = 0.5;
        this.Coffee = 0;
        this.Fur = 0;
        this.Diamond = 0;
        this.Silver = 0;
        this.Copper = 0;
        this.Ivory = 0;
        this.Cocoa = 0;
        this.Tobacco = 0;
        this.Sugar = 0;
        this.ExoticFruit = 0;
        this.MaxCoal = 0.00;
        this.MaxSulphur = 0.00;
        this.MaxGold = 0.00;
        this.MaxIron = 0;
        this.MaxFur = 0;
        this.MaxDiamond = 0;
        this.MaxSilver = 0;
        this.MaxCopper = 0;
        this.MaxIvory = 0;
        /* #endregion */
        /* #region  Technology */
        this.Isolation = 1;
        this.ResearchSpending = 1.1;
        this.ResearchEffectiveness = 1.0;
        this.Technologies = technologies;
        /* #endregion */
        /* #region Reforms */
        this.ReformPower = 0;
        this.Reforms = {
            SlaveryAllowed: true,
            SlaveryBanned: false,
            SerfdomAllowed: true,
            SerfdomBanned: false,
            OpenFieldSystem: false,
            Enclosure: true,
            Isolationism: false,
            Mercantilism: true,
            Protectionism: false,
            FreeTrade: false,
            Guilds: true,
            GuildsBanned: false,
            AntiMonopolyLaws: false,
            NoVoting: true,
            HighClassVoting: false,
            WealthVoting: false,
            UniversalSuffrage: false,
            NoblePrivilege: true,
            WealthPrivilege: false,
            ClassEquality: false,
            NobleOfficers: false,
            WealthyOfficers: true,
            MeritocraticOfficers: false,
            NobleBureaucrats: false,
            ClergyBureaucrats: true,
            WealthyBureaucrats: false,
            MeritocraticBureaucrats: false,
            NobleResourceOwnership: true,
            MixedResourceOwnership: false,
            BurgousieResourceOwnership: false,
            GovernmentResourceOwnership: false,
            NobleLandOwnership: true,
            MixedLandOwnership: false,
            PrivateLandOwnership: false,
            GovernmentLandOwnership: false,
            NationalMilitia: false,
            FeudalLevies: true,
            ProffesionalArmy: false,
            MassConscription: false,
            FeudalNobleArmies: true,
            Mercenaries: true,
            ReligiousOrders: true,
            StateMediaOnly: false,
            ExtensiveCensorship: true,
            LimitedCensorship: false,
            FreeSpeech: false,
            NoSocialMobility: true,
            RestrictedSocialMobility: false,
            UnrestrictedSocialMobility: false,
            StateReligion: true,
            RestrictiveReligionLaws: false,
            FreedomOfReligion: false,
            PrivateEducationOnly: true,
            ReligiousSchools: false,
            PublicEducation: false,
            CommunityPolicing: true,
            RegionalPolice: false,
            StatePolice: false,
            SecretPolice: false,
            NoWeaponLaws: false,
            LimitedWeaponOwnership: true,
            WeaponOwnershipForbidden: false
        };
        /* #endregion */
        /* #region  Economy */
        this.PublicDebtTaken = 0.00;
        this.BudgetIncoming = 0;
        this.BudgetOutgoing = 0;
        /* #endregion */
        this.CulturalProsperity = 1.1;
        this.CulturalAdvancements = {
            Currency: true,
            DivineRightToRule: true,
            Serfdom: true,
            Feudalism: true,
            Universities: true,
            NobleDuty: true,
            Courthouses: true,
            RenaissanceThought: true,
            EarlyModernAdministration: true,
            NationalSovereignity: false,
            Newspapers: false,
            ScientificRevolution: false,
            PotatoPopulationBoom: false,
            Constitution: false,
            PublicEducation: false,
            Nationalism: false,
            Conscription: false,
            Industrialisation: false
        };
        /* #region  War */
        this.Casualties = 0;
        this.Pillaging = 0; //Show In Percent
        this.Occupation = 0; //Show in Percent
        this.Blockade = 0; //Show in Percent
        this.MinorBattles = 0;
        this.MajorBattles = 0;
        /* #endregion */
        /* #region  Trade Influence */
        this.TradeInfluences = (function () {
            const ti = {};
            for (const element in tradeZones) {
                ti[element] = { TradingPoints: 0 };
            }
            return ti;
        })();
        /* #endregion */
        /* #region  Land */
        this.Climates = (function () {
            const c = {};
            for (const element in gameStats.Climates) {
                c[element] = { Pixels: 0 };
            }
            return c;
        })();
        this.DetachedLand = 0.00;
        this.urbanPopulation = 0;
        this.UrbanPopulationPercent = 0.00;
        /* #endregion */
        /* #endregion */
    }
}
export class Stats {
    TimeSpeed;
    TimeDivide;
    Nations = {};
    Religions = religions;
    Cultures = {
    //For Opinions not mentioned, they are neutral towards them.
    };
    ResourceTypes = realResourceTypes;
    Estates = estates;
    EstatesGeneral = estateGeneral;
    Trades = {};
    TradeZones = tradeZones;
    Climates = climates;
    Fertility = fertilities;
    UnitUpkeepCosts = unitUpkeepCosts;
    AdvancesPrerequisites = {};
    constructor() {
        this.TimeSpeed = 25;
        this.TimeDivide = (() => {
            return 20 / this.TimeSpeed;
        })();
    }
}
let gameStats = new Stats();
export function setGameStats(new_stats) {
    gameStats = new_stats;
}
export function getGameStats() {
    return gameStats;
}
export function clearNewTroops(nationName) {
    const n = gameStats.Nations[nationName];
    for (const unitName in gameStats.UnitUpkeepCosts) {
        n["New_" + unitName] = 0;
    }
    //reset
    n.New_MerchantShips = 0;
    n.New_LightShips = 0;
    n.New_MediumShips = 0;
    n.New_HeavyShips = 0;
    n.New_SmallForts = 0;
    n.New_MediumForts = 0;
    n.New_BigForts = 0;
    n.New_HugeForts = 0;
    n.New_CityFortifications = 0;
    n.New_SupplyDepots = 0;
    n.New_NavalBases = 0;
}
export function GSGetProperty(propertySelection) {
    return (new Function('gameStats', `return gameStats${propertySelection}`))(gameStats);
}
export function GSSetProperty(propertySelection, value) {
    (new Function('gameStats', `gameStats${propertySelection} = ${value}`))(gameStats);
}
export function GSAddProperty(propertySelection, value) {
    (new Function('gameStats', `gameStats${propertySelection} += ${value}`))(gameStats);
}
export function GSNewProperty(propertySelection, ProvidedClass, parameters) {
    const newObj = new ProvidedClass(parameters);
    (new Function('gameStats', 'newObj', `gameStats${propertySelection} = newObj`))(gameStats, newObj);
}
export function GSDeleteProperty(propertyName) {
    (new Function('gameStats', `delete gameStats${propertyName}`))(gameStats);
}
export function GSUpdateTradesWithRenamedNationName(oldName, newName) {
    //copy over all Trades, as is, except if giver or receiver is oldName, then it's newName now
    Object.keys(gameStats.Trades).forEach(property => {
        if (gameStats.Trades[property].giver == oldName)
            gameStats.Trades[property].giver = newName;
        if (gameStats.Trades[property].receiver == oldName)
            gameStats.Trades[property].receiver = newName;
    });
}
