let mappedResources = [
  "Fur",
  "Gold",
  "Iron",
  "Ivory",
  "Sulphur",
  "Coal",
  "Copper",
  "Diamond",
  "Silver"
];

let mappedResourcesMultipliers = [
  1, //fur
  1, //gold
  1, //iron
  1, //ivory
  1, //sulphur
  //x2
  2, //coal
  2, //copper
  2, //diamond
  2 //silver
];

class SocialBehaviour {
  definingFeatures;
  Color = "000000";
  Opinions = {};

  constructor(){
    this.definingFeatures = "";
  }
}


class SocialBehaviourGroup {
  Points = 0;
}

class Climate{
  Pixels;
  Color;
  ClimateScore;
}

class Opinion {
  Score;
  static Undesired = -100;
  static Skeptical = -50;
  static DefaultDistrust = -30;
  static Neutral = 0;
  static Fond = 50;
  static Obsessed = 100; //Like Frankophiles or they see them as brothers 

  static UndesiredImage = "https://static.wikia.nocookie.net/spore/images/7/73/Hostile.png/";
  static SkepticalImage = "https://static.wikia.nocookie.net/spore/images/1/19/Annoyed.png/";
  static NeutralImage = "https://static.wikia.nocookie.net/spore/images/4/46/Curious_Neutral.png";
  static FondImage = "https://static.wikia.nocookie.net/spore/images/b/b8/Friend.png";
  static ObsessedImage = "https://static.wikia.nocookie.net/spore/images/a/ae/Ally.png";
}

class Trade {
  giver; //nation name
  receiver; //nation name
  amount;
  resource; //can include food or budget
}

class TradeZone {
  Color;
  Score;
}

class Nation {

  /* #region  Properties */

  /* #region  Daily */
  FuturePopulation;
  FutureLiteracyPercent;
  FutureHigherEducation;
  FutureBudget;
  FutureFood;
  FutureResearchPoints;
  FuturePublicDebtLength;
  FutureCulturalPower;
  /* #endregion */

  /* #region Most Stats */
  GovernmentName;
  CapitalName;
  Flag;
  Color;
  ReligionGroups;  //object of {name: {Points: num}, name: {Points: num}}
  ReligionRepresentedAtGovernmentLevel;
  ReligionRepresentedAtGovernmentLevelPercent;
  CulturalDisunity;
  ReligiousDisunity;
  Population;
  PopulationGrowth;
  AverageDevelopment;
  Health;
  Alcoholism;
  LiteracyPercent;
  HigherEducation;
  EducationEfficiency;
  AdministrativeEfficiency;
  AdministrativeStrain;
  Corruption;
  Overextension;
  Propaganda;
  SocialSpending;
  Prosperity; //Quality of Life
  PopulationHappiness;
  Stability;
  AtWar;
  WarSupport;
  Absolutism;
  PopulationControl;
  BirthControl;
  ConscriptionPercent;
  StateFarmerWage;
  StateLabourerWage;
  StateFactoryWorkerWage;
  Production;
  ProductionGovernmentControl;
  ProductionEfficiency;
  TradeEfficiency;
  LocalTrade;
  TradePower;
  TradeImprovements;
  PossiblePublicDebt;
  EffectiveDebt;
  DailyBudget;
  Budget;
  Inflation;
  Spies;
  SpyQuality;
  ArmyUpkeep;
  SpyUpkeep;
  SocialSpendingUpkeep;
  HealthUpkeep;
  EducationUpkeep;
  AgricultureSpending;
  PropagandaUpkeep;
  PopulationControlUpkeep;
  TradeRevenue;
  AdministrativeUpkeep;
  ProductionRevenue;
  ResearchUpkeep;
  OverallIncome;
  PassiveInvestmentIncome;
  /* #endregion */

  /* #region  Armies */
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
  Militia;
  SiegeEquipment;
  LargeSiegeEquipment;
  FieldCannons;
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
  BuildingsUpkeep;
  IronShortage;
  SulphurShortage;
  CommanderFreedom;
  BasicArmamentsStockpiled;
  HeavyArmamentsStockpiled;
  ArmyWages;
  TrainingQuality;
  ArmyTech;
  MilitaryTactics;
  ArmyQuality;
  MilitaryLoyalty;
  MilitaryMorale;
  MilitaryDiscipline;
  /* #endregion */

  /* #region  Navy */
  LightShipImprovements;
  MediumShipImprovements;
  HeavyShipImprovements;
  NavyTech;
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
  NavalPower;
  NavyUpkeep;
  /* #endregion */

  /* #region  Recruitments / New Troops */
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

  New_MerchantShips
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
  /* #endregion */

  /* #region  Population */
  Workforces = { };
  SocietalClasses;
  CultureGroups; //object of {name: {Points: num}, name: {Points: num}}
  CultureRepresentedAtGovernmentLevel;
  CultureRepresentedAtGovernmentLevelPercent;
  PopulationStabilityImpact;
  PopulationTechImpact;
  /* #endregion */

  /* #region  Resources */
  MiningEfficiency;
  FarmingEfficiency;

  Coal;
  EffectiveCoal;
  MaxCoal;
  
  Sulphur;
  EffectiveSulphur;
  MaxSulphur;
  
  Cotton;
  EffectiveCotton;
  
  Gold;
  EffectiveGold;
  MaxGold;
  
  Iron;
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

  ResourceBudgetBoost;
  /* #endregion */

  /* #region  Resource Prices */
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
  /* #endregion */

  /* #region  Technology Stats */
  Isolation;
  ResearchSpending;
  ResearchEffectiveness;
  ResearchBoostFromTech;
  ResearchPointGain;
  ResearchPoints;
  FutureResearchPoints;
  Technologies;
  ArmyTechBoost
  /* #endregion */

  /* #region  Economy */
  EffectiveTax;
  PossiblePublicDebt;
  PublicDebtTaken;
  EffectiveDebt;
  PublicDebtLength;
  InterestRate;
  DebtHappinessEffect;

  BudgetIncoming;
  BudgetOutgoing;
  Balance;
  /* #endregion */

  /* #region  Cultural Advancements */
  CulturalAdvance;
  CulturalProsperity;
  CulturalPowerGain;
  CulturalPower;
  FutureCulturalPower;
  CulturalAdvancements;
  /* #endregion */

  /* #region  Trade */
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

  TradePowerFromResourceTrade;
  /* #endregion */

  /* #region  Agriculture */
  AgricultureSubsidies;
  Fertility;
  AgricultureInfrastructure;
  StockingCapabilities;
  AgricultureAdvancements;
  AgricultureTechnology;
  FarmingEfficiency;
  AgricultureSpending;
  DailyFood;
  FoodConsumption;
  FoodGain;
  MaxFoodStock;
  Food;
  FutureFood;
  FoodPopulationBoost;
  SurplusFood;
  SellingCapability;
  FoodSold;
  FoodLost;
  TradeProfit;
  /* #endregion */

  /* #region  War */
  Casualties;
  Pillaging;
  Occupation;
  Blockade;
  WarExhaustion;
  MinorBattles;
  MajorBattles;
  Fervor;
  /* #endregion */

  /* #region  Trade Influence */
  TradeInfluences;
  /* #endregion */

  /* #region  Land */
  Size;
  KmSquared;
  PopulationDensityPerKmSquared;
  Disease;
  MaxPopulation;
  UnderPopulation;
  DetachedLand;
  coastalPopulation;
  CoastalPopulationPercent;
  DevelopmentPixelCount;
  AverageDevelopment;
  LandAdministration;
  Overextension;

  Climates;

  HabitableLand;
  /* #endregion */
  
  /* #endregion */

  constructor(nationName) {
    let n = this;
    /* #region  Stats to Set Immedietly */
    /* #region  Main */
    this.GovernmentName = nationName;
    this.Flag = "";
    this.Color = false;
    this.ReligionGroups = {
      Pagan: {
        Points: 100
      },
      Sunni: {
        Points: 0
      },
      Shia: {
        Points: 0
      },
      Judaism: {
        Points: 0
      },
      Catholic: {
        Points: 0
      },
      Orthodox: {
        Points: 0
      },
      Protestant: {
        Points: 0
      },
      Hindu: {
        Points: 0
      },
      Buddhism: {
        Points: 0
      },
      Shinto: {
        Points: 0
      },
      Confucianism: {
        Points: 0
      }
    };
    this.Population = 2500000;
    this.FuturePopulation = 2500000;
    this.LiteracyPercent = 5;
    this.HigherEducation = 0.25;
    this.Budget = 250.00;
    this.Food = 200.00;
    this.ResearchPoints = 5;
    this.PublicDebtLength = 0;
    this.CulturalPower = 6.00;
    /* #endregion */

    /* #region  Most Stats */
    this.ReligiousDisunity = 0.00;
    this.DevelopmentPixelCount = 60000;
    this.coastalPopulation = 1000;
    this.Health = 1.00;
    this.Alcoholism = 0.00;
    this.EducationEfficiency = 2;
      this.BureaucratsWages = 3;
    this.AdministrativeEfficiency = 27.5;
      this.AdministrationSize = 0.5;
    this.Propaganda = 0;
    this.SocialSpending = 0.5;
    this.AtWar = false;
      this.Nationalism = 0;
      this.ReligiousFervor = 1;

    this.AristocracyLoyalty = 0.50; //Show in percent
    this.ClergyLoyalty = 0.50; //Show in percent
    this.BurgousieLoyalty = 0.50; //Show in percent
    this.UrbanLoyalty = 0.50; //Show in percent
    this.BureaucratsLoyalty = 0.50; //Show in percent
    this.IntellectualsLoyalty = 0.50; //Show in percent
    this.WorkersLoyalty = 0.50; //Show in percent

      this.AristocracyTax = 0.1; //Show in percent
      this.ClergyTax = 0.1; //Show in percent
      this.BurgousieTax = 0.1; //Show in percent
      this.UrbanTax = 0.1; //Show in percent
      this.BureaucratsTax = 0.1; //Show in percent
      this.IntellectualsTax = 0.1; //Show in percent
      this.MilitaryTax = 0.1; //Show in percent
      this.WorkersTax = 0.1; //Show in percent

      this.ExternalTariffs = 0.1; //Show in percent
    this.InternalTariffs = 0.1; //Show in percent

    this.ExpectedSlavesSol = 0.02;
    this.ExpectedLabourersSol = 0.25;
      this.ExpectedSerfsSol = 0.25;
      this.ExpectedUnemployedSol = 0.05;
    this.ExpectedFarmersSol = 0.5;
    this.ExpectedTownsfolkSol = 2.5;
    this.ExpectedClergySol = 6;
    this.ExpectedBureaucratsSol = 1.5;
    this.ExpectedMerchantsSol = 1;
    this.ExpectedIntellectualsSol = 1.5;
    this.ExpectedSailorsSol = 0.75;
    this.ExpectedSoldiersSol = 1;
    this.ExpectedAristocracySol = 17.5;
    this.ExpectedBurgousieSol = 10;

    this.ExpectedPrivateBasicArmaments = 2.5;
    
    this.EstateInfluences = {
      AristocracyInfluence: 30,
      ClergyInfluence: 20,
        BurgousieInfluence: 15,
        UrbanInfluence: 5,
      BureaucratsInfluence: 5,
      IntellectualsInfluence: 2.5,
      MilitaryInfluence: 2.5,
      WorkersInfluence: 0.5
    };
    this.ExpectedInfluences = {
      AristocracyInfluence: 0.5,
      ClergyInfluence: 0.225,
      BurgousieInfluence: 0.175,
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
      UnitaryRepresentation: 30,
      AristocracyRepresentation: 40,
      ClergyRepresentation: 15,
      BurgousieRepresentation: 15,
      UrbanRepresentation: 0,
      BureaucratsRepresentation: 0,
      IntellectualsRepresentation: 0,
      MilitaryRepresentation: 0,
      WorkersRepresentation: 0
    };
    
    this.MilitaryControl = {
      AristocracyControl: 45,
      ClergyControl: 15,
      BurgousieControl: 10,
      UrbanControl: 5,
      BureaucratsControl: 5,
      IntellectualsControl: 0,
      WorkersControl: 5,
      Independent: 15
    };

    this.PopulationControl = 0;
    this.BirthControl = 0;
    this.LocalTrade = 5;
    this.TradeImprovements = 0.5;
    this.Spies = 0;
    this.SpyQuality = 1;
    /* #endregion */

    /* #region  Army */
    this.OverallImprovements = 1;
    this.IrregularImprovements = 0;
    this.MeleeImprovements = 0;
    this.RangedImprovements = 0;
    this.CavalryImprovements = 0;
    this.FirearmImprovements = 0;
    this.SiegeImprovements = 0;
    this.ArtilleryImprovements = 0;
    
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
    this.SailorsWage = 1.00;
    this.ArmyWage = 1.50;
    this.MilitaryDiscipline = 1.00; //Show In Percent
    /* #endregion */

    /* #region  Navy */
    this.LightShipImprovements = 0;
    this.MediumShipImprovements = 0;
    this.HeavyShipImprovements = 0;

    this.MerchantShips = 10;
    this.LightShips = 0;
    this.MediumShips = 0;
    this.HeavyShips = 0;
    /* #endregion */

    /* #region  Agriculture */
    this.AgricultureSubsidies = 0.00;
    this.Fertility = 2500;
    this.AgricultureInfrastructure = 1.10;
    this.StockingCapabilities = 1.00;
    this.AgricultureAdvancements = 1.10;
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
      Clergy: 0.0125,
      Aristocracy: 0.02,
      Burgousie: 0.005
     };

    this.ProductionSectors = {
        ConstructionSector: 25,
        BasicArmamentsSector: 20,
        HeavyArmamentsSector: 5,
        ShipBuildingSector: 5,
        BasicToolsSector: 40,
        TextilesSector: 20,
        BasicGoodsSector: 30,
        LuxuryGoodsSector: 5,
        AlcoholSector: 25,
        ChemicalSector: 0,
        ElectronicsSector: 0,
        AutomotiveSector: 0,
        AerospaceSector: 0,
        HeavyIndustrySector: 0
    }
    this.ProductionGovernmentControl = 0;
    this.StateFarmerWage = 0.75;
    this.StateLabourerWage = 0.5;
    this.StateFactoryWorkerWage = 2;
    
    this.SocietalClasses = {};
    this.CultureGroups = {}
    /* #endregion */

    /* #region  Resources */
    this.MiningEfficiency = 1;
    this.Forestry = 1;
    this.Reforestation = 0.1;
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
    this.HeavyArmamentsBaseValue = 5;
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
    this.ResearchSpending = 1.0;
    this.ResearchEffectiveness = 1.0;

    this.Technologies = {
      IronWorking: true,
      Wheel: true,
      Paper: true,
      Gunpowder: true,
      VerticalLoom: true,
      SaddleAndStirrup: true,
      HorseCollar: true,
      Explosives: true,
      Firelance: true,
      Cranes: true,
      PromissoryNotes: true,
      Bombards: true,
      HandCannons: true,
      PlateArmour: true,
      SappersAndEngineers: true,
      Workshops: true,
      StandardizedPikes: true,
      Galleons: false,
      PrintingPress: false,
      Muskets: false,
      Limber: false,
      Docks: false,
      Gunports: false,
      Matchlock: false,
      StarForts: false,
      TextileManufactories: false,
      Reiters: false,
      MiningCarts: false,
      HumanAnatomy: false,
      Mortars: false,
      Metallurgy: false,
      Experimentation: false,
      Fluyt: false,
      Bayonet: false,
      SocketBayonet: false,
      Flintlock: false,
      FlyingShuttle: false,
      LeadChamberProcess: false,
      Gunlock: false,
      SteamEngine: false,
      PuddlingProcess: false,
      Rifles: false,
      ModernChemistry: false,
      CottonGin: false,
      SteamBoats: false,
      HotAirBalloon: false,
      PowerLoomAndSewingMachine: false,
      Fulminate: false,
      PaperMachine: false,
      FirstFactories: false,
      LinearAssemblyProcess: false,
      InterchangeableParts: false,
      CannedFood: false,
      Vaccines: false,
      Morphine: false
    }
    /* #endregion */

    /* #region Reforms */

    this.ReformPower = 0;

    this.Reforms = {
      SlaveryAllowed: true,
      SlaveryBanned: false,
      
      SerfdomAllowed: true,
      SerfdomBanned: false,
      
      OpenFieldSystem: true,
      Enclosure: false,

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
      
      NoblePrivellege: true,
      WealthPrivellege: false,
      ClassEquality: false,
      
      NobleOfficers: true,
      WealthyOfficers: false,
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
    }
    
    /* #endregion */

    /* #region  Economy */
    this.PublicDebtTaken = 0.00;
    this.BudgetIncoming = 0;
    this.BudgetOutgoing = 0;
    /* #endregion */

    this.CulturalProsperity = 1.0;
    this.CulturalAdvancements = {
      Currency: true,
      DivineRightToRule: true,
      Serfdom: true,
      Feudalism: true,
      Universities: true,
      NobleDuty: true,
      Courthouses: true,
      RenaissanceThought: false,
      EarlyModernAdministration: false,
      NationalSovereignity: false,
      Newspapers: false,
      ScientificRevolution: false,
      PotatoPopulationBoom: false,
      Constitution: false,
      PublicEducation: false,
      Nationalism: false,
      Conscription: false,
      Industrialisation: false
    }

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
      let ti = {}; 
      for (const element in gameStats.TradeZones) {
        ti[element] = {TradingPoints: 0};
      }
      return ti;
    })();
    /* #endregion */

    /* #region  Land */
    this.Climates = (function () {
      let c = {}
      for (const element in gameStats.Climates) {
        c[element] = {Pixels: 0};
      }
      return c;
    })();
    
    this.DetachedLand = 0.00;
    /* #endregion */
    /* #endregion */
  }
}

class Stats{
  TimeSpeed;
  TimeDivide;
  Nations;
  Religions;
  Cultures;
  ResourceTypes;
  Trades;
  TradeZones;
  Climates;
  Fertility;
  UnitUpkeepCosts;
  constructor(){
    let s = this;

    this.TimeSpeed = 50;
    this.TimeDivide = (function () {
      return 20 / s.TimeSpeed;
    })();
    this.Nations = {};
    this.Religions = {
      "Pagan": {
        "definingFeatures": "",
        "Color": 776544,
        "Opinions": {
          "Sunni": {
            "Score": -75
          },
          "Shia": {
            "Score": -75
          },
          "Judaism": {
            "Score": -75
          },
          "Catholic": {
            "Score": -75
          },
          "Orthodox": {
            "Score": -75
          },
          "Protestant": {
            "Score": -75
          },
          "Hindu": {
            "Score": -75
          },
          "Buddhism": {
            "Score": -75
          },
          "Shinto": {
            "Score": -75
          },
          "Confucianism": {
            "Score": -75
          }
        }
      },
      "Sunni": {
        "definingFeatures": "",
        "Color": '008C00',
        "Opinions": {
          "Pagan": {
            "Score": -75
          },
          "Shia": {
            "Score": -100
          },
          "Judaism": {
            "Score": -100
          },
          "Catholic": {
            "Score": -100
          },
          "Orthodox": {
            "Score": -100
          },
          "Protestant": {
            "Score": 0
          },
          "Hindu": {
            "Score": -25
          },
          "Buddhism": {
            "Score": 0
          },
          "Shinto": {
            "Score": -25
          },
          "Confucianism": {
            "Score": 0
          }
        }
      },
      "Shia": {
        "definingFeatures": "",
        "Color": '00C900',
        "Opinions": {
          "Pagan": {
            "Score": -75
          },
          "Sunni": {
            "Score": -75
          },
          "Judaism": {
            "Score": -100
          },
          "Catholic": {
            "Score": -100
          },
          "Orthodox": {
            "Score": -100
          },
          "Protestant": {
            "Score": 0
          },
          "Hindu": {
            "Score": -25
          },
          "Buddhism": {
            "Score": 0
          },
          "Shinto": {
            "Score": -25
          },
          "Confucianism": {
            "Score": 0
          }
        }
      },
      "Judaism": {
        "definingFeatures": "",
        "Color": '00C9BE',
        "Opinions": {
          "Pagan": {
            "Score": -75
          },
          "Sunni": {
            "Score": -100
          },
          "Shia": {
            "Score": -100
          },
          "Catholic": {
            "Score": -100
          },
          "Orthodox": {
            "Score": -50
          },
          "Protestant": {
            "Score": -75
          },
          "Hindu": {
            "Score": 0
          },
          "Buddhism": {
            "Score": 0
          },
          "Shinto": {
            "Score": -25
          },
          "Confucianism": {
            "Score": 0
          }
        }
      },
      "Catholic": {
        "definingFeatures": "",
        "Color": 'FFD800',
        "Opinions": {
          "Pagan": {
            "Score": -75
          },
          "Sunni": {
            "Score": -100
          },
          "Shia": {
            "Score": -100
          },
          "Judaism": {
            "Score": -100
          },
          "Orthodox": {
            "Score": -100
          },
          "Protestant": {
            "Score": -100
          },
          "Hindu": {
            "Score": 0
          },
          "Buddhism": {
            "Score": -25
          },
          "Shinto": {
            "Score": -25
          },
          "Confucianism": {
            "Score": 0
          }
        }
      },
      "Orthodox": {
        "definingFeatures": "",
        "Color": 'FF15DD',
        "Opinions": {
          "Pagan": {
            "Score": -75
          },
          "Sunni": {
            "Score": -100
          },
          "Shia": {
            "Score": -100
          },
          "Judaism": {
            "Score": -50
          },
          "Catholic": {
            "Score": -100
          },
          "Protestant": {
            "Score": -75
          },
          "Hindu": {
            "Score": 0
          },
          "Buddhism": {
            "Score": -25
          },
          "Shinto": {
            "Score": -25
          },
          "Confucianism": {
            "Score": 0
          }
        }
      },
      "Protestant": {
        "definingFeatures": "",
        "Color": '0015DD',
        "Opinions": {
          "Pagan": {
            "Score": -75
          },
          "Sunni": {
            "Score": 0
          },
          "Shia": {
            "Score": 0
          },
          "Judaism": {
            "Score": -75
          },
          "Catholic": {
            "Score": -100
          },
          "Orthodox": {
            "Score": -75
          },
          "Hindu": {
            "Score": 0
          },
          "Buddhism": {
            "Score": -25
          },
          "Shinto": {
            "Score": -25
          },
          "Confucianism": {
            "Score": 0
          }
        }
      },
      "Hindu": {
        "definingFeatures": "",
        "Color": 'B6FF00',
        "Opinions": {
          "Pagan": {
            "Score": -75
          },
          "Sunni": {
            "Score": -25
          },
          "Shia": {
            "Score": -25
          },
          "Judaism": {
            "Score": 0
          },
          "Catholic": {
            "Score": 0
          },
          "Orthodox": {
            "Score": 0
          },
          "Protestant": {
            "Score": 0
          },
          "Buddhism": {
            "Score": 25
          },
          "Shinto": {
            "Score": -25
          },
          "Confucianism": {
            "Score": 0
          }
        }
      },
      "Buddhism": {
        "definingFeatures": "",
        "Color": '57007F',
        "Opinions": {
          "Pagan": {
            "Score": -50
          },
          "Sunni": {
            "Score": -25
          },
          "Shia": {
            "Score": -25
          },
          "Judaism": {
            "Score": -25
          },
          "Catholic": {
            "Score": -25
          },
          "Orthodox": {
            "Score": -25
          },
          "Protestant": {
            "Score": -25
          },
          "Hindu": {
            "Score": -25
          },
          "Shinto": {
            "Score": 50
          },
          "Confucianism": {
            "Score": -25
          }
        }
      },
      "Shinto": {
        "definingFeatures": "",
        "Color": 'FF0000',
        "Opinions": {
          "Pagan": {
            "Score": -75
          },
          "Sunni": {
            "Score": -25
          },
          "Shia": {
            "Score": -25
          },
          "Judaism": {
            "Score": -25
          },
          "Catholic": {
            "Score": -25
          },
          "Orthodox": {
            "Score": -25
          },
          "Protestant": {
            "Score": -25
          },
          "Hindu": {
            "Score": -25
          },
          "Buddhism": {
            "Score": 50
          },
          "Confucianism": {
            "Score": 0
          }
        }
      },
      "Confucianism": {
        "definingFeatures": "",
        "Color": '808080',
        "Opinions": {
          "Pagan": {
            "Score": -50
          },
          "Sunni": {
            "Score": 0
          },
          "Shia": {
            "Score": 0
          },
          "Judaism": {
            "Score": 0
          },
          "Catholic": {
            "Score": 0
          },
          "Orthodox": {
            "Score": 0
          },
          "Protestant": {
            "Score": 0
          },
          "Hindu": {
            "Score": 0
          },
          "Buddhism": {
            "Score": 0
          },
          "Shinto": {
            "Score": 0
          }
        }
      },
    };
    this.Cultures = { //For Opinions not mentioned, they are neutral towards them.
    }; 
    this.ResourceTypes = [
      "Budget",
      "Food",
      "Wood",
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
      "Wood",
      "Ivory",
      "Cocoa",
      "Tobacco",
      "Sugar",
        "ExoticFruit",
        "Housing",
        "BasicArmaments",
        "HeavyArmaments",
        "ShipBuilding",
      "BasicTools",
      "Textiles",
        "BasicGoods",
      "LuxuryGoods",
      "Alcohol",
        "Chemicals",
        "Electronics",
        "Motors",
        "Planes",
        "HeavyIndustry"
    ];
    this.Estates = [
      "Unemployed",
      "Slaves",
      "Labourers",
      "Serfs",
      "Farmers",
      "Townsfolk",
      "Clergy",
      "Bureaucrats",
      "Merchants",
      "Intellectuals",
      "Sailors",
      "Soldiers",
      "Aristocracy",
      "Burgousie"
    ];
    this.EstatesGeneral = [
      "Workers",
      "Urban",
      "Clergy",
      "Bureaucrats",
      "Intellectuals",
      "Military",
      "Aristocracy",
      "Burgousie"
    ];
    this.Trades = {};
    this.TradeZones = {
      Alaska: {
        Color: "ff6c7a",
        Score: 1
      },
      Cascadia: {
          Color: "ff006e",
          Score: 3
      },
      CaliforniaAndWestMexico: {
          Color: "none",
          Score: 4
      },
      HudsonBay: {
          Color: "ffeb63",
          Score: 3
      },
      GreatLakes: {
          Color: "3dffff",
          Score: 7
      },
      Louisiana: {
          Color: "none",
          Score: 7
      },
      GulfOfMexico: {
          Color: "ffac54",
          Score: 8
      },
      LawrenceGulf: {
          Color: "ff6a38",
          Score: 4.5
      },
      EastCoast: {
          Color: "cc0000",
          Score: 7
      },
      Carribean: {
          Color: "none",
          Score: 8
      },
      CentralAmerica: {
          Color: "a0a0a0",
          Score: 6
      },
      GuyanaAndSuriname: {
          Color: "none",
          Score: 3
      },
      Amazon: {
          Color: "2d9600",
          Score: 3
      },
      Peru: {
          Color: "9e0000",
          Score: 2
      },
      RioGrande: {
          Color: "none",
          Score: 3
      },
      LaPlata: {
          Color: "none",
          Score: 3
      },
      Chile: {
          Color: "ffe846",
          Score: 2
      },
      Patagonia: {
          Color: "68d7ff",
          Score: 2
      },
      NorthernAnatolia: {
          Color: "5b8f00",
          Score: 10
      },
      NorthSea: {
          Color: "7382ff",
          Score: 4.5
      },
      BritishIsles: {
          Color: 808080,
          Score: 8
      },
      EnglishChannel: {
          Color: "ff4a00",
          Score: 10
      },
      France: {
          Color: "00d5ff",
          Score: 7
      },
      BayOfBiscay: {
          Color: "efff66",
          Score: 7
      },
      WestIberia: {
          Color: "none",
          Score: 7
      },
      Gibraltar: {
          Color: "none",
          Score: 9
      },
      WesternMediterranean: {
          Color: "ffd846",
          Score: 7
      },
      Rhine: {
          Color: "0094ff",
          Score: 7
      },
      CentralMediterranean: {
          Color: "ff7d49",
          Score: 8
      },
      Adriatic: {
          Color: "007f0e",
          Score: 10
      },
      Germany: {
          Color: "none",
          Score: 7
      },
      WesternDanube: {
          Color: "404040",
          Score: 7
      },
      Denmark: {
          Color: "ff0000",
          Score: 8
      },
      Baltic: {
          Color: "none",
          Score: 7.5
      },
      NorthNordics: {
          Color: "none",
          Score: 3
      },
      BarentsSea: {
          Color: "ff553e",
          Score: 3
      },
      Novgorod: {
          Color: "00ff21",
          Score: 8
      },
      Poland: {
          Color: "none",
          Score: 6
      },
      Dniepr: {
          Color: "80ff65",
          Score: 8.5
      },
      Crimea: {
          Color: "31aadb",
          Score: 7
      },
      EasternDanube: {
          Color: "5d7c3d",
          Score: 8.5
      },
      Greece: {
          Color: "0065ff",
          Score: 9.5
      },
      EasternMediterranean: {
          Color: "80ff00",
          Score: 8
      },
      Egypt: {
          Color: "ff1410",
          Score: 7
      },
      RedSea: {
          Color: "2b6d0e",
          Score: 7
      },
      WesternSahara: {
          Color: "fed800",
          Score: 2
      },
      CoteDIvoire: {
          Color: "none",
          Score: 7
      },
      Nigeria: {
          Color: "none",
          Score: 8
      },
      SouthNile: {
          Color: "none",
          Score: 3
      },
      Somalia: {
          Color: "529bae",
          Score: 7
      },
      Kongo: {
          Color: "none",
          Score: 3
      },
      EastAfrica: {
          Color: "0094d7",
          Score: 3
      },
      Mozambique: {
          Color: "00ff69",
          Score: 4
      },
      SouthAfrica: {
          Color: "8f00ff",
          Score: 5
      },
      Mesopotamia: {
          Color: "7f3300",
          Score: 6.5
      },
      PersianGulf: {
          Color: "ffc430",
          Score: 7
      },
      Caucasus: {
          Color: "ff2f3e",
          Score: 6
      },
      DonRiver: {
          Color: "ffd86d",
          Score: 6
      },
      Volga: {
          Color: "db7a25",
          Score: 6
      },
      CentralAsia: {
          Color: "9fffff",
          Score: 3
      },
      WestSiberia: {
          Color: "none",
          Score: 2
      },
      EastSiberia: {
          Color: "none",
          Score: 2
      },
      Iran: {
          Color: "8ffd42",
          Score: 5
      },
      Pakistan: {
          Color: "none",
          Score: 7
      },
      Tibet: {
          Color: "b200ff",
          Score: 2
      },
      Mongolia: {
          Color: "none",
          Score: 3
      },
      Manchuria: {
          Color: "e8ff65",
          Score: 6.5
      },
      SeaOfJapan: {
          Color: "00ffff",
          Score: 7.5
      },
      NorthChina: {
          Color: "none",
          Score: 7
      },
      YangtzeRiver: {
          Color: "3dfd00",
          Score: 7
      },
      SouthChina: {
          Color: "none",
          Score: 8
      },
      NorthIndia: {
          Color: "none",
          Score: 7
      },
      WestIndia: {
          Color: "none",
          Score: 7
      },
      EastIndia: {
          Color: "none",
          Score: 7
      },
      Burma: {
          Color: "none",
          Score: 6
      },
      SouthEastAsia: {
          Color: "ff3d3d",
          Score: 8
      },
      NorthAustralia: {
          Color: "none",
          Score: 5
      },
      SouthAustralia: {
          Color: "none",
          Score: 6
      },
      CentralSiberia: {
          Color: "69a826",
          Score: 0
      },
      EasternSiberia: {
          Color: "331b1b",
          Score: 0
      },
      WesternSiberia: {
          Color: "264a00",
          Score: 0
      },
      NorthernNordics: {
          Color: "ffd6e4",
          Score: 0
      },
      CentralCanada: {
          Color: "a5a5a5",
          Score: 0
      },
      BalticSea: {
          Color: "8f00c2",
          Score: 0
      },
      Livonia: {
          Color: 801065,
          Score: 0
      },
      Muscovy: {
          Color: "e1d869",
          Score: 0
      },
      UralRiver: {
          Color: "dcff44",
          Score: 0
      },
      Vistula: {
          Color: "ff7e70",
          Score: 0
      },
      CentralEurope: {
          Color: "8080a3",
          Score: 0
      },
      Romania: {
          Color: "d100dc",
          Score: 0
      },
      TheRockies: {
          Color: "7f4618",
          Score: 0
      },
      Mississippi: {
          Color: "00ba21",
          Score: 0
      },
      SouthernFrance: {
          Color: "46a7ff",
          Score: 0
      },
      CaspianSea: {
          Color: "3881ff",
          Score: 0
      },
      GobiDesert: {
          Color: "e1e9cd",
          Score: 0
      },
      WestCoast: {
          Color: "ffdb7b",
          Score: 0
      },
      Iberia: {
          Color: "3a9112",
          Score: 0
      },
      YellowRiver: {
          Color: "3aaa0e",
          Score: 0
      },
      Afghanistan: {
          Color: "592b37",
          Score: 0
      },
      IndusRiver: {
          Color: "267f00",
          Score: 0
      },
      Morocco: {
          Color: "7f0001",
          Score: 0
      },
      Sichuan: {
          Color: "c6d521",
          Score: 0
      },
      Sahara: {
          Color: "b7a791",
          Score: 0
      },
      ArabianDesert: {
          Color: "e2ceb1",
          Score: 0
      },
      WesternMexico: {
          Color: "469b52",
          Score: 0
      },
      Ganges: {
          Color: "db6525",
          Score: 0
      },
      Caribbean: {
          Color: "3c02ff",
          Score: 0
      },
      Pacific: {
          Color: "93ffff",
          Score: 0
      },
      SouthChinaSea: {
          Color: "4d007f",
          Score: 0
      },
      CentralIndia: {
          Color: "ec7f7f",
          Score: 0
      },
      Deccan: {
          Color: "84ff55",
          Score: 0
      },
      SouthernNile: {
          Color: "d9ff00",
          Score: 0
      },
      WesternNiger: {
          Color: "b6ff4a",
          Score: 0
      },
      Guinea: {
          Color: "ff8ca3",
          Score: 0
      },
      EasternNiger: {
          Color: "3bd323",
          Score: 0
      },
      Venezuela: {
          Color: "c3ff2b",
          Score: 0
      },
      Indonesia: {
          Color: "fec605",
          Score: 0
      },
      CongoRiver: {
          Color: "dd6a00",
          Score: 0
      },
      Gabon: {
          Color: "107f00",
          Score: 0
      },
      LakeVictoria: {
          Color: "9fa300",
          Score: 0
      },
      LakeTanganyika: {
          Color: "b67871",
          Score: 0
      },
      SaoFranciscoRiver: {
          Color: "6aff2b",
          Score: 0
      },
      NorthernAustralia: {
          Color: "ff7400",
          Score: 0
      },
      Angola: {
          Color: "a3ff27",
          Score: 0
      },
      ParanaRiver: {
          Color: "2ba6ff",
          Score: 0
      },
      SouthernAustralia: {
          Color: "b6c2ff",
          Score: 0
      },
      AustralianDesert: {
          Color: "d8c5a9",
          Score: 0
      }
  };

    this.Climates = {
      Ocean: {
        ClimateScore: 0,
        Color: "103c6d"
      },
      PolarDesert: {
          ClimateScore: 0.001,
          Color: "808080"
      },
      TaigaAndTundra: {
          ClimateScore: 0.25,
          Color: "004a7f"
      },
      MontaneForest: {
          ClimateScore: 0.6,
          Color: "ffac7f"
      },
      Medditereanian: {
          ClimateScore: 0.85,
          Color: "ff6a00"
      },
      Arid: {
          ClimateScore: 0.65,
          Color: "7f3300"
      },
      Steppe: {
          ClimateScore: 0.75,
          Color: "c8ff7c"
      },
      Moderate: {
          ClimateScore: 1,
          Color: "4cff00"
      },
      SubTropical: {
          ClimateScore: 0.75,
          Color: "5b7f00"
      },
      Tropical: {
          ClimateScore: 0.6,
          Color: "008010"
      },
      Savanna: {
          ClimateScore: 0.65,
          Color: "c1bd3e"
      },
      Mountainous: {
          ClimateScore: 0.35,
          Color: "ff0000"
      },
      Desert: {
          ClimateScore: 0.05,
          Color: "fffb99"
      },
      CoastalDesert: {
          ClimateScore: 0.35,
          Color: "ffd802"
      }
    };

    this.Fertility = {
      Infertile: { Color: "ffffff", Score: 0.025 },
      BarelyFertile: { Color: "ff0000", Score: 0.15 },
      LowFertility: { Color: "ff6a00", Score: 0.35 },
      AverageFertility: { Color: "ffd800", Score: 0.55 },
      GoodFertility: { Color: "00ff00", Score: 0.7 },
      HighFertility: { Color: "00c900", Score: 0.8 },
      AmazingFertility: { Color: "008000", Score: 0.9 },
      TopFertility: { Color: "003e00", Score: 1.0 }
    }
    this.UnitUpkeepCosts = {
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
    }

    this.AdvancesPrerequisites = {};
  }
}

let gameStats = new Stats();

function clearNewTroops(nationName){
  let n = gameStats.Nations[nationName];
  for (const unitName in gameStats.UnitUpkeepCosts) {
    n["New_" + unitName] = 0;
  }
  //reset
  n.New_MerchantShips = 0;
  n.New_LightShips = 0;
  n.New_MediumShips = 0;
  n.New_HeavyShips = 0;
}

