const min = (_min, _num) => Math.min(_min, _num);
const max = (_max, _num) => Math.max(_max, _num);
const clamp = (_clamper1, _clamper2, _num) => _clamper1 < _clamper2 ? min(max(_num, _clamper1), _clamper2) : min(max(_num, _clamper2), _clamper1);


class SocialBehaviour {
  definingFeatures;
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
  ClimateScore;
}

class Opinion {
  Score;
  static Undesired = -100;
  static Skeptical = -50;
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
  Flag;
  ReligionGroups;  //object of {name: {Points: num}, name: {Points: num}}
  ReligionRepresentedAtGovernmentLevel;
  ReligionRepresentedAtGovernmentLevelPercent;
  CulturalDisunity;
  ReligiousDisunity;
  Population;
  PopulationGrowth;
  Health;
  LiteracyPercent;
  HigherEducation;
  EducationEfficiency;
  AdministrativeEfficiency;
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
  Production;
  ProductionEfficiency;
  TradeEfficiency;
  LocalTrade;
  TradePower;
  Mercantilism;
  PossiblePublicDebt;
  EffectiveDebt;
  DailyBudget;
  Budget;
  Inflation;
  Spies;
  SpyQuality;
  NobleInfluence;
  NobleLoyaltyGroups;
  NobleStateLoyalty;
  ClergyInfluence;
  ClergyLoyaltyGroups;
  ClergyStateLoyalty;
  BurghersInfluence;
  BurghersLoyaltyGroups;
  BurghersStateLoyalty;
  ArmyUpkeep;
  SpyUpkeep;
  SocialSpendingUpkeep;
  HygieneUpkeep;
  EducationUpkeep;
  AgricultureSpending;
  PropagandaUpkeep;
  PopulationControlUpkeep;
  TradeRevenue;
  AdministrativeUpkeep;
  ProductionRevenue;
  ResearchUpkeep;
  OverallIncome;
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
  HandCannon;
  Musketeers;
  Militia;
  SiegeEquipment;
  LargeSiegeEquipment;
  Cannons;
  EliteUnitsCap;
  UnitUpkeep;
  OverallNumbers;
  SmallForts;
  MediumForts;
  BigForts;
  HugeForts;
  ExtraCityFortifications;
  FortUpkeep;
  IronShortage;
  SulphurShortage;
  CommanderFreedom;
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
  NavyImprovements;
  NavyTech;
  NavyQuality;
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
  New_LightInfantry;
  New_HeavyInfantry;
  New_Archers;
  New_Crossbowmen;
  New_LightCavalry;
  New_HeavyCavalry;
  New_EliteInfantry;
  New_EliteCavalry;
  New_HandCannon;
  New_Musketeers;
  New_Militia;
  New_SiegeEquipment;
  New_LargeSiegeEquipment;
  New_Cannons;

  New_LightShips;
  New_MediumShips;
  New_HeavyShips;

  NewTroopRecruitmentPenalty;
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

  Sulphur;
  EffectiveSulphur;

  Cotton;
  EffectiveCotton;
  CottonInflation;

  Gold;
  EffectiveGold;
  GoldInflation;

  Iron;
  EffectiveIron;

  Tea;
  EffectiveTea;
  TeaInflation;

  Silk;
  EffectiveSilk;
  SilkInflation;

  Spice;
  EffectiveSpice;
  SpiceInflation;

  Wool;
  EffectiveWool;
  WoolInflation;

  Coffee;
  EffectiveCoffee;
  CoffeeInflation;

  Fur;
  EffectiveFur;
  FurInflation;

  Diamond;
  EffectiveDiamond;
  DiamondInflation;

  Silver;
  EffectiveSilver;
  SilverInflation;

  Copper;
  EffectiveCopper;

  Ivory;
  EffectiveIvory;
  IvoryInflation;

  Cocoa;
  EffectiveCocoa;
  CocoaInflation;

  Tobacco;
  EffectiveTobacco;
  TobaccoInflation;

  Sugar;
  EffectiveSugar;
  SugarInflation;

  ExoticFruit;
  EffectiveExoticFruit;
  ExoticFruitInflation;

  ResourcePopulationGrowthBoost;
  ResourceHappinessBoost;
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
  HighClassTax;
  MediumClassTax;
  LowerClassTax;
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
  Foodlost;
  TradeProfit;
  /* #endregion */

  /* #region  War */
  Casualties;
  Pillaging;
  Occupation;
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
    this.Flag = "none";
    this.ReligionGroups = {
      "Pagan": {
        Points: 100
      }
    };
    this.Population = 5000000;
    this.LiteracyPercent = 7.50;
    this.HigherEducation = 0.25;
    this.Budget = 250.00;
    this.Food = 100.00;
    this.ResearchPoints = 6.00;
    this.PublicDebtLength = 0;
    this.CulturalPower = 6.00;
    /* #endregion */

    /* #region  Most Stats */
    this.ReligiousDisunity = 0.00;
    this.Health = 2.00;
    this.EducationEfficiency = 3;
    this.AdministrativeEfficiency = 30.00;
    this.Propaganda = 0;
    this.SocialSpending = 0;
    this.AtWar = false;

    this.NobleInfluence = 0.55; //Show in percent
    this.NobleLoyaltyGroups = JSON.parse(`{\
    "${n.GovernmentName}": "55",\
    "SelfInterests": "45"\
    }`);
    
    this.ClergyInfluence = 0.25; //Show in percent
    this.ClergyLoyaltyGroups = JSON.parse(`{\
    "${n.GovernmentName}": "50",\
    "SelfInterests": "50"\
    }`);
    
    this.BurghersInfluence = 0.10; //Show in percent
    this.BurghersLoyaltyGroups = JSON.parse(`{\
    "${n.GovernmentName}": "50",\
    "SelfInterests": "50"\
    }`);

    this.Absolutism = 0;
    this.PopulationControl = 0;
    this.BirthControl = 0;
    this.LocalTrade = 5.00;
    this.Mercantilism = 1;
    this.Spies = 0;
    this.SpyQuality = 1.2;
    /* #endregion */

    /* #region  Army */
    this.Levies = 0;
    this.LightInfantry = 0;
    this.HeavyInfantry = 0;
    this.Archers = 0;
    this.Crossbowmen = 0;
    this.LightCavalry = 0;
    this.HeavyCavalry = 0;
    this.EliteInfantry = 0;
    this.EliteCavalry = 0;
    this.HandCannon = 0;
    this.Musketeers = 0;
    this.Militia = 0;
    this.SiegeEquipment = 0;
    this.LargeSiegeEquipment = 0;
    this.Cannons = 0;

    this.SmallForts = 0;
    this.MediumForts = 0;
    this.BigForts = 0;
    this.HugeForts = 0;
    this.ExtraCityFortifications = 0;


    this.CommanderFreedom = 0;
    this.ArmyWages = 1;
    this.TrainingQuality = 0.15;
    this.MilitaryTactics = 0.15;
    this.MilitaryDiscipline = 1; //Show In Percent
    /* #endregion */

    /* #region  Navy */
    this.NavyImprovements = 0.30;

    this.LightShips = 0;
    this.MediumShips = 0;
    this.HeavyShips = 0;
    /* #endregion */

    /* #region  Agriculture */
    this.AgricultureSubsidies = 0.05;
    this.Fertility = 0.50;
    this.AgricultureInfrastructure = 1.10;
    this.StockingCapabilities = 1.00;
    this.AgricultureAdvancements = 1.30;
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
    this.New_HandCannon = 0;
    this.New_Musketeers = 0;
    this.New_Militia = 0;
    this.New_SiegeEquipment = 0;
    this.New_LargeSiegeEquipment = 0;
    this.New_Cannons = 0;

    this.New_LightShips = 0;
    this.New_MediumShips = 0;
    this.New_HeavyShips = 0;


    /* #endregion */

    /* #region  Population */
    this.Workforces = {
      Artisans: 0.01,
      Clergy: 0.0075,
      Nobility: 0.01,
      Burghers: 0.005
    };
    
    this.SocietalClasses = {};
    this.CultureGroups = {}
    /* #endregion */

    /* #region  Resources */
    this.MiningEfficiency = 1.20;

    this.Coal = 0.00;
    this.Sulphur = 0.00;
    this.Cotton = 0.00;
    this.Gold = 0.00;
    this.Iron = 0;
    this.Tea = 0.00;
    this.Silk = 0;
    this.Spice = 0;
    this.Wool = 0;
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
    /* #endregion */

    /* #region  Technology */
    this.Isolation = 1;
    this.ResearchSpending = 1.00;
    this.ResearchEffectiveness = 1.00;

    this.Technologies = {
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
      Bayonet: false,
      SocketBayonet: false,
      Flintlock: false
    }
    /* #endregion */

    /* #region  Economy */
    this.HighClassTax = 0.12; //As Percentage
    this.MediumClassTax = 0.12; //As Percentage
    this.LowerClassTax = 0.12; //As Percentage
    this.PublicDebtTaken = 0.00;
    this.BudgetIncoming = 0;
    this.BudgetOutgoing = 0;
    /* #endregion */

    this.CulturalProsperity = 1.00;
    this.CulturalAdvancements = {
      DivineRightToRule: true,
      Serfdom: true,
      Feudalism: true,
      Universities: true,
      NobleDuty: true,
      Courthouses: true,
      RenaissanceThought: false,
      EarlyModernAdministration: false,
      NationalSovereignity: false,
      Newspapers: false
    }

    /* #region  War */
    this.Casualties = 0;
    this.Pillaging = 0; //Show In Percent
    this.Occupation = 0; //Show in Percent
    this.MinorBattles = 0;
    this.MajorBattles = 0;
    /* #endregion */

    /* #region  Trade Influence */
    this.TradeInfluences = {
      Alaska: { TradingPoints: 0 },
      Cascadia: { TradingPoints: 0 },
      CaliforniaAndWestMexico: { TradingPoints: 0 },
      HudsonBay: { TradingPoints: 0 },
      GreatLakes: { TradingPoints: 0 },
      Louisiana: { TradingPoints: 0 },
      GulfOfMexico: { TradingPoints: 0 },
      LawrenceGulf: { TradingPoints: 0 },
      EastCoast: { TradingPoints: 0 },
      Carribean: { TradingPoints: 0 },
      CentralAmerica: { TradingPoints: 0 },

      GuyanaAndSuriname: { TradingPoints: 0 },
      Amazon: { TradingPoints: 0 },
      Peru: { TradingPoints: 0 },
      RioGrande: { TradingPoints: 0 },
      LaPlata: { TradingPoints: 0 },
      Chile: { TradingPoints: 0 },
      Patagonia: { TradingPoints: 0 },




      NorthernAnatolia: { TradingPoints: 0 },
      NorthSea: { TradingPoints: 0 },
      BritishIsles: { TradingPoints: 0 },
      EnglishChannel: { TradingPoints: 0 },
      France: { TradingPoints: 0 },
      BayOfBiscay: { TradingPoints: 0 },
      WestIberia: { TradingPoints: 0 },
      Gibraltar: { TradingPoints: 0 },
      WesternMediterranean: { TradingPoints: 0 },
      Rhine: { TradingPoints: 0 },
      CentralMediterranean: { TradingPoints: 0 },
      Adriatic: { TradingPoints: 0 },
      Germany: { TradingPoints: 0 },
      WesternDanube: { TradingPoints: 0 },
      Denmark: { TradingPoints: 0 },
      Baltic: { TradingPoints: 0 },
      NorthNordics: { TradingPoints: 0 },
      BarentsSea: { TradingPoints: 0 },
      Novgorod: { TradingPoints: 0 },
      Poland: { TradingPoints: 0 },
      Dniepr: { TradingPoints: 0 },
      Crimea: { TradingPoints: 0 },
      EasternDanube: { TradingPoints: 0 },
      Greece: { TradingPoints: 0 },
      EasternMediterranean: { TradingPoints: 0 },
      Egypt: { TradingPoints: 0 },
      RedSea: { TradingPoints: 0 },
      WesternSahara: { TradingPoints: 0 },
      CoteDIvoire: { TradingPoints: 0 },
      Nigeria: { TradingPoints: 0 },
      SouthNile: { TradingPoints: 0 },
      Somalia: { TradingPoints: 0 },
      Kongo: { TradingPoints: 0 },
      EastAfrica: { TradingPoints: 0 },
      Mozambique: { TradingPoints: 0 },
      SouthAfrica: { TradingPoints: 0 },

      Mesopotamia: { TradingPoints: 0 },
      PersianGulf: { TradingPoints: 0 },
      Caucasus: { TradingPoints: 0 },
      DonRiver: { TradingPoints: 0 },
      Volga: { TradingPoints: 0 },
      CentralAsia: { TradingPoints: 0 },
      WestSiberia: { TradingPoints: 0 },
      EastSiberia: { TradingPoints: 0 },
      Iran: { TradingPoints: 0 },
      Pakistan: { TradingPoints: 0 },
      Tibet: { TradingPoints: 0 },
      Mongolia: { TradingPoints: 0 },
      Manchuria: { TradingPoints: 0 },
      SeaOfJapan: { TradingPoints: 0 },
      NorthChina: { TradingPoints: 0 },
      YangtzeRiver: { TradingPoints: 0 },
      SouthChina: { TradingPoints: 0 },
      NorthIndia: { TradingPoints: 0 },
      WestIndia: { TradingPoints: 0 },
      EastIndia: { TradingPoints: 0 },
      Burma: { TradingPoints: 0 },
      SouthEastAsia: { TradingPoints: 0 },
      NorthAustralia: { TradingPoints: 0 },
      SouthAustralia: { TradingPoints: 0 }
    };
    /* #endregion */

    /* #region  Land */
    this.Climates = {
      PolarDesert: {
        Pixels: 0,
        ClimateScore: 0,
      },
      TaigaAndTundra: {
        Pixels: 0,
        ClimateScore: 0.25,
      },
      MontaneForest: {
        Pixels: 0,
        ClimateScore: 0.6,
      },
      Medditereanian: {
        Pixels: 0,
        ClimateScore: 0.85,
      },
      Arid: {
        Pixels: 0,
        ClimateScore: 0.65,
      },
      Steppe: {
        Pixels: 0,
        ClimateScore: 0.75,
      },
      Moderate: {
        Pixels: 0,
        ClimateScore: 1,
      },
      SubTropical: {
        Pixels: 0,
        ClimateScore: 0.75,
      },
      Tropical: {
        Pixels: 0,
        ClimateScore: 0.6,
      },
      Savanna: {
        Pixels: 0,
        ClimateScore: 0.65,
      },
      Mountainous: {
        Pixels: 0,
        ClimateScore: 0.35,
      },
      Desert: {
        Pixels: 0,
        ClimateScore: 0.05,
      },
      CoastalDesert: {
        Pixels: 0,
        ClimateScore: 0.35
      },

    };
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
  UnitUpkeepCosts;
  constructor(){
    let s = this;

    this.TimeSpeed = 50;
    this.TimeDivide = (function () {
      return 20 / s.TimeSpeed;
    })();
    this.Nations = {};
    this.Religions = { //For Opinions not mentioned, they are Undesired
      Pagan: {
        definingFeatures: "Anything not classified",
        Opinions: []
      }
    };
    this.Cultures = { //For Opinions not mentioned, they are neutral towards them.
    }; 
    this.ResourceTypes = [
      "Budget",
      "Food",

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
      "ExoticFruit"
    ];
    this.Trades = {};
    this.TradeZones = {
      Alaska: 0,
      Cascadia: 0,
      CaliforniaAndWestMexico: 0,
      HudsonBay: 0,
      GreatLakes: 0,
      Louisiana: 0,
      GulfOfMexico: 0,
      LawrenceGulf: 0,
      EastCoast: 0,
      Carribean: 0,
      CentralAmerica: 0,

      GuyanaAndSuriname: 0,
      Amazon: 0,
      Peru: 0,
      RioGrande: 0,
      LaPlata: 0,
      Chile: 0,
      Patagonia: 0,




      NorthernAnatolia: 0,
      NorthSea: 0,
      BritishIsles: 0,
      EnglishChannel: 0,
      France: 0,
      BayOfBiscay: 0,
      WestIberia: 0,
      Gibraltar: 0,
      WesternMediterranean: 0,
      Rhine: 0,
      CentralMediterranean: 0,
      Adriatic: 0,
      Germany: 0,
      WesternDanube: 0,
      Denmark: 0,
      Baltic: 0,
      NorthNordics: 0,
      BarentsSea: 0,
      Novgorod: 0,
      Poland: 0,
      Dniepr: 0,
      Crimea: 0,
      EasternDanube: 0,
      Greece: 0,
      EasternMediterranean: 0,
      Egypt: 0,
      RedSea: 0,
      WesternSahara: 0,
      CoteDIvoire: 0,
      Nigeria: 0,
      SouthNile: 0,
      Somalia: 0,
      Kongo: 0,
      EastAfrica: 0,
      Mozambique: 0,
      SouthAfrica: 0,

      Mesopotamia: 0,
      PersianGulf: 0,
      Caucasus: 0,
      DonRiver: 0,
      Volga: 0,
      CentralAsia: 0,
      WestSiberia: 0,
      EastSiberia: 0,
      Iran: 0,
      Pakistan: 0,
      Tibet: 0,
      Mongolia: 0,
      Manchuria: 0,
      SeaOfJapan: 0,
      NorthChina: 0,
      YangtzeRiver: 0,
      SouthChina: 0,
      NorthIndia: 0,
      WestIndia: 0,
      EastIndia: 0,
      Burma: 0,
      SouthEastAsia: 0,
      NorthAustralia: 0,
      SouthAustralia: 0
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
      HandCannon: 5 / 1000,
      Musketeers: 3.5 / 1000,
      Militia: 1.25 / 1000,

      SiegeEquipment: 1 / 10,
      LargeSiegeEquipment: 1 / 5,
      Cannons: 1 / 10
    }
  }
}

let gameStats = new Stats();

function evaluateNations() {
  for (const nationName in gameStats.Nations) {
    evaluateNation(nationName);
  }
}

function clearNewTroops(nationName){
  let n = gameStats.Nations[nationName];
  for (const unitName in gameStats.UnitUpkeepCosts) {
    n["New_" + unitName] = 0;
  }
  //reset
  n.New_LightShips = 0;
  n.New_MediumShips = 0;
  n.New_HeavyShips = 0;
}

