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
  reciever; //nation name
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
  DateInThisNation;
  FutureDateInThisNation;
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
  FreeEliteUnitsCap;
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
    this.GovernmentName = "GovernmentOf" + nationName;
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
    this.DateInThisNation = 1350;
    /* #endregion */

    /* #region  Most Stats */
    this.ReligiousDisunity = 0.00;
    this.Health = 2.00;
    this.EducationEfficiency = 3;
    this.AdministrativeEfficiency = 30.00;
    this.Propaganda = 0;
    this.SocialSpending = 0;
    this.AtWar = "false";

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

function evaluateNation(nationName) {
  let n = gameStats.Nations[nationName];

  n.AgricultureTechnology = 0 + n.Technologies.HorseCollar / 2;
  n.FarmingEfficiency = 1 + n.AgricultureSubsidies / 5 + n.Fertility - 0.5 + (n.AgricultureInfrastructure - 1) / 10 + (n.AgricultureAdvancements - 1) / 10 + n.AgricultureTechnology / 10;
  n.OverallNumbers = n.Levies + n.LightInfantry + n.HeavyInfantry + n.Archers + n.Crossbowmen + n.LightCavalry + n.HeavyCavalry + n.EliteInfantry + n.Militia + n.EliteCavalry + n.HandCannon + (n.SiegeEquipment + n.LargeSiegeEquipment) * 10;
  n.ConscriptionPercent = n.OverallNumbers / n.Population;
  n.Workforces.PopulationInMilitary = n.ConscriptionPercent;
  n.Workforces.PopulationInResourceHarvest = (n.Coal + n.Sulphur + n.Cotton + n.Gold + n.Iron + n.Tea + n.Silk + n.Spice + n.Wool + n.Coffee + n.Fur + n.Diamond + n.Silver + n.Copper) * 20000 / n.Population;
  n.Workforces.PopulationInAgriculture = 1 - n.Workforces.PopulationInMilitary - n.Workforces.Artisans - n.Workforces.Clergy - n.Workforces.Burghers - n.Workforces.Nobility - n.Workforces.PopulationInResourceHarvest;
  n.AgricultureSpending = (n.Workforces.PopulationInAgriculture * n.Population / 1000 * n.AgricultureInfrastructure / 100 * (1 + n.AgricultureSubsidies / 10) * n.StockingCapabilities) / 2;

  let GatheringEffectiveness = function (name) {
    switch (name) {
      case "Food":
        return "Farming"
      case "Cotton":
        return "Farming"
      case "Tea":
        return "Farming"
      case "Silk":
        return "Farming"
      case "Spice":
        return "Farming"
      case "Coffee":
        return "Farming"
      default:
        return "Mining"
    }
  };

  for (const resourceIndex in gameStats.ResourceTypes) { //in, out, effective resources and potential inflation adjustments
    const resource = gameStats.ResourceTypes[resourceIndex];
    n[resource + "Incoming"] = 0;
    n[resource + "Outgoing"] = 0;

    for (const tradename in gameStats.Trades) {
      const trade = gameStats.Trades[tradename];
      if (trade.resource == resource) {
        if (nationName == trade.reciever) {
          n[resource + "Incoming"] += trade.amount;
        } else if (nationName == trade.giver) {
          n[resource + "Outgoing"] += trade.amount;
        }
      }
    }

    if(resource == "Budget" || resource == "Food") continue;
    //the things below do not apply to Budget or Food

    n["Effective" + resource] = (function () {

      return n[resource] * (GatheringEffectiveness(resource) == "Farming" ? n.FarmingEfficiency : n.MiningEfficiency) + n[resource + "Incoming"] - n[resource + "Outgoing"];
    })();

    let inflationMod = (function () {
      switch (resource) {
        case "Cotton":
          return 3;
        case "Gold":
          return 3;
        case "Tea":
          return 3;
        case "Silk":
          return 3;
        case "Spice":
          return 5;
        case "Wool":
          return 5;
        case "Coffee":
          return 3;
        case "Fur":
          return 3.5;
        case "Diamond":
          return 3;
        case "Silver":
          return 3;
        case "Ivory":
          return 2.5;
        case "Cocoa":
          return 3;
        case "Tobacco":
          return 3;
        case "Sugar":
          return 3;
        case "ExoticFruit":
          return 3;
        default:
          return NaN;
      }
    })();
    if (!isNaN(inflationMod)) {
      n[resource + "Inflation"] = max(0, n["Effective" + resource] - inflationMod);
    }



  }

  n.DailyFood = n.Workforces.PopulationInAgriculture * n.Population / 1000 * n.FarmingEfficiency * (1 - n.Pillaging) + n.FoodIncoming - n.FoodOutgoing;
  n.FoodConsumption = n.Population / 1000;
  n.FoodGain = n.DailyFood - n.FoodConsumption;

  n.MaxFoodStock = (function () {
    return max(100, 1000 * n.Population / 10000000) * n.StockingCapabilities;
  })();
  n.FutureFood = min(n.MaxFoodStock, n.Food + n.FoodGain);
  n.FoodPopulationBoost = (function () {
    return n.Food > 500 ? n.Food / 50000 : 0;
  })();
  n.SurplusFood = (function () {
    return n.FoodGain + n.Food > n.MaxFoodStock ? n.FoodGain + n.Food - n.MaxFoodStock : 0;
  })();

  let pseudoTradePower = (function () {
    let stp = 0;
    for (const region in gameStats.TradeZones) {
      let allNationPoints = 0;
      for (const nation in gameStats.Nations) {
        let point = gameStats.Nations[nation].TradeInfluences[region].TradingPoints;
        allNationPoints += (typeof point !== 'undefined') ? point : 0;
      }
      let Point = n.TradeInfluences[region].TradingPoints;
      let percent = allNationPoints != 0 ? 
        (
          ((typeof Point !== 'undefined') ? Point : 0
        ) / allNationPoints) 
        : 0;
      stp += gameStats.TradeZones[region] * percent;
    }
    return stp;
  })();
  n.SellingCapability = (n.LocalTrade / 2 + pseudoTradePower / 5) * n.Mercantilism * 200;
  n.FoodSold = min(n.SellingCapability, n.SurplusFood);
  n.Foodlost = n.SurplusFood - n.FoodSold;
  n.TradeProfit = n.FoodSold / 50;

  // old formula: n.Prosperity = 1 + n.SocialSpending / 2.5 + (n.Food == 0 && n.FutureFood < 0 ? n.FutureFood / 2000 : 0) + (n.Budget < 0.00001 ? n.Budget / 100 : 0) * (1 - n.Pillaging);
  n.Prosperity = 1 + n.SocialSpending / 2.5 + (n.FutureFood < 0 ? n.FutureFood / (n.Population / 10000) : 0) + (n.Budget < 0 ? n.Budget / n.OverallIncome : 0) - (n.Pillaging) * 3;
  n.Food = max(0, n.Food);
  n.FutureFood = min(n.MaxFoodStock, n.Food + n.FoodGain);
  n.Size = (function () {
    let s = 0;
    for (const climate in n.Climates) {
      s += n.Climates[climate].Pixels;
    }
    return s;
  })();
  n.KmSquared = n.Size != 0 ? n.Size * 20 : 78870; //But Please specify Size as soon as possible in game
  n.HabitableLand = (function () {
    if (n.Size == 0) return 0.8;
    let hl = 0;

    for (const climate in n.Climates) {
      hl += (n.Climates[climate].Pixels / n.Size) * n.Climates[climate].ClimateScore;
    }

    return hl;
  })();
  n.PopulationDensityPerKmSquared = n.Population / (n.KmSquared * n.HabitableLand);

  n.Disease = n.PopulationDensityPerKmSquared / 25 - n.Health / 20 - (n.Technologies.HumanAnatomy ? 0.15 : 0);
  n.UnderPopulation = n.Disease < 0.5 ? (1 - n.Disease) / 10 : 0;

let PopulationGrowthModifier = (n.Fertility > 0.5 ? (n.Fertility - 0.5) / 10 : 0) + n.FoodPopulationBoost + (n.Prosperity - 1) / 10 + n.UnderPopulation;
/*  let PopulationGrowthModifier = (function () {

    let mod = n.FoodPopulationBoost + (n.Prosperity - 1) / 10 + n.UnderPopulation;

    if (n.Fertility > 0.5) mod += (n.Fertility - 0.5) / 10
    if (n.Population > 2000000) mod += -0.01;
    if (n.Population > 5000000) mod += -0.01;
    if (n.Population > 10000000) mod += -0.01;
    if (n.Population > 15000000) mod += -0.01;
    if (n.Population > 250000) mod += -0.01;
    if (n.Population > 500000) mod += -0.01;
    if (n.Population > 20000000) mod += -0.01;
    if (n.Population > 25000000) mod += -0.01;
    if (n.Population > 40000000) mod += -0.01;
    if (n.Population > 50000000) mod += -0.01;

    return mod;
  })(); */

  n.UnitUpkeep = (function () {
    let uu = 0;
    for (const unitName in gameStats.UnitUpkeepCosts) {
      const cost = gameStats.UnitUpkeepCosts[unitName];
      uu += n[unitName] * cost;
    }
    return uu;
  })();

  n.ArmyTechBoost = (
    n.Technologies.SaddleAndStirrup +
    n.Technologies.Matchlock +
    n.Technologies.SocketBayonet +
    n.Technologies.Flintlock)
    / 5 +
    (
      n.Technologies.Gunpowder +
      n.Technologies.PlateArmour +
      n.Technologies.StandardizedPikes +
      n.Technologies.Muskets +
      n.Technologies.Limber +
      n.Technologies.Mortars +
      n.Technologies.Reiters +
      n.Technologies.Metallurgy +
      n.Technologies.Bayonet)
    / 10 +
    (
      n.Technologies.Firelance +
      n.Technologies.Bombards +
      n.Technologies.HandCannons +
      n.Technologies.SappersAndEngineers)
    / 20;
  n.ArmyTech = 1 + n.ArmyTechBoost;


  
  n.IronShortage = max(0, n.UnitUpkeep / 200 - n.EffectiveIron);
  n.SulphurShortage = max(0, (n.Cannons * 100 + n.Musketeers + n.HandCannon +
    (n.Technologies.Reiters == true ? n.LightCavalry + n.HeavyCavalry : 0)) / 15000 - n.EffectiveSulphur);

  n.ResourceHappinessBoost =
    n.EffectiveCotton - n.CottonInflation +
    n.EffectiveGold - n.GoldInflation +
    n.EffectiveTea - n.TeaInflation +
    n.EffectiveSilk - n.SilkInflation +
    n.EffectiveSpice - n.SpiceInflation +
    n.EffectiveWool - n.WoolInflation +
    n.EffectiveCoffee - n.CoffeeInflation +
    n.EffectiveFur - n.FurInflation +
    n.EffectiveDiamond - n.DiamondInflation +
    n.EffectiveSilver - n.SilverInflation +
    n.EffectiveIvory - n.IvoryInflation +
    n.EffectiveCocoa - n.CocoaInflation +
    n.EffectiveTobacco - n.TobaccoInflation +
    n.EffectiveSugar - n.SugarInflation +
    n.EffectiveExoticFruit - n.ExoticFruitInflation;

  n.SocietalClasses.High = n.Workforces.Nobility;
  n.SocietalClasses.Medium = n.Workforces.Artisans + n.Workforces.Clergy + n.Workforces.Burghers;
  n.SocietalClasses.Lower = n.Workforces.PopulationInAgriculture + n.Workforces.PopulationInMilitary;
  n.InterestRate = 0.05 + n.PublicDebtLength * 0.02 / gameStats.TimeDivide;
  n.EffectiveDebt = n.PublicDebtTaken * (1 + n.InterestRate);
  n.PossiblePublicDebt = max(0, n.Population / 10000 * (1 - (n.HighClassTax + n.MediumClassTax + n.LowerClassTax) / 3) - n.EffectiveDebt);
  n.DebtHappinessEffect = (n.PublicDebtLength > 1 ? n.EffectiveDebt / (n.PossiblePublicDebt + n.PublicDebtTaken) * (2 + n.PublicDebtLength) : 0);
  n.WarExhaustion = (n.Casualties / n.Population * 500) + (n.Pillaging * 20) + (n.Occupation * 5);

  n.PopulationHappiness = (50 + n.ResourceHappinessBoost) * n.Prosperity / 10 - (n.LowerClassTax * n.SocietalClasses.Lower + n.MediumClassTax * n.SocietalClasses.Medium + n.SocietalClasses.High * n.HighClassTax) * 100 / 4 - n.Absolutism / 2 - n.PopulationControl +
    (n.Mercantilism > 1 ? (-n.Mercantilism + 1) * 2.5 : 0) + (n.EffectiveDebt > 0 && n.Budget < 0 ? - (n.EffectiveDebt / n.PossiblePublicDebt) * 10 : 0) - n.WarExhaustion / 2 - n.DebtHappinessEffect + (n.Disease > 0.10 ? - n.Disease / 4 : 0);
  n.LandAdministration = ((n.Size - n.DetachedLand) / 25000 + n.DetachedLand / 10000) * (1 - n.AdministrativeEfficiency / 1000);
  n.Overextension = n.UnderPopulation / 4 + n.LandAdministration / 1.5;
  
  let SocialBehaviourCalc = function(socialBehaviourGroup, socialBehaviourWorldwideGroups, socialGroupRepresentedAtGovernmentLevel){
    let pointSum = 0;
    let SocialBehaviourDisunity = 0;

    for (const socialbehaviourname in socialBehaviourGroup) {
      const Points = socialBehaviourGroup[socialbehaviourname].Points;
      pointSum += Points;
    }

    let socialGroupRepresentedAtGovernmentLevelPercent;
    for (const OpinionatedSocialBehaviourGroupName in socialBehaviourGroup) {
    
      const OpinionatedSocialBehaviourGroup = socialBehaviourWorldwideGroups[OpinionatedSocialBehaviourGroupName];
      const Points = socialBehaviourGroup[OpinionatedSocialBehaviourGroupName].Points;
      //if the social behaviour is listed, but no one is actually here. Skip
      if(Points == 0) continue;
      if(OpinionatedSocialBehaviourGroupName == socialGroupRepresentedAtGovernmentLevel){
        socialGroupRepresentedAtGovernmentLevelPercent = (Points / +pointSum);
      }
      for (const nameOfSocialBehaviourGroupToBeHadAnOpinionAbout in socialBehaviourGroup) {
        //we don't account for social behaviour groups having Opinions on themselves
        if (nameOfSocialBehaviourGroupToBeHadAnOpinionAbout == OpinionatedSocialBehaviourGroupName) continue; 
        //If the social behaviour group to be had an opinion about is also not present in the nation either, n.also doesn't add to the disunity
        const PointsOfOther = socialBehaviourGroup[nameOfSocialBehaviourGroupToBeHadAnOpinionAbout].Points;
        if (PointsOfOther == 0) continue; 
        
        let opinionScore;
        //If the social behaviour group to be had an opinion about, isn't recorded by the social behaviour group we are currently checking Opinions for. Treat the opinion as neutral
        let opinionobj;
        if (OpinionatedSocialBehaviourGroup.Opinions === undefined || OpinionatedSocialBehaviourGroup.Opinions[nameOfSocialBehaviourGroupToBeHadAnOpinionAbout] === undefined) 
          opinionScore = Opinion.Neutral;
        else {
          opinionobj = OpinionatedSocialBehaviourGroup.Opinions[nameOfSocialBehaviourGroupToBeHadAnOpinionAbout];
          if(isNaN(opinionobj.Score))
            opinionScore = Opinion[opinionobj.Score];
          else 
            opinionScore = opinionobj.Score;
        }
        let socialBehaviourGroupDisunityFactor = (-opinionScore + 100) * (Points / pointSum) * (PointsOfOther / pointSum);
        if (nameOfSocialBehaviourGroupToBeHadAnOpinionAbout == socialGroupRepresentedAtGovernmentLevel) {
          socialBehaviourGroupDisunityFactor *= 1.5 / 53;
        }else {
          socialBehaviourGroupDisunityFactor *= 1 / 53;
        }
        SocialBehaviourDisunity += socialBehaviourGroupDisunityFactor;
      }
    }
    return {
      GovernmentRepresentationPercent: typeof socialGroupRepresentedAtGovernmentLevelPercent !== 'undefined' ? socialGroupRepresentedAtGovernmentLevelPercent : 0, 
      disunity: SocialBehaviourDisunity
    }
  }

  let cultureCalc = SocialBehaviourCalc(
    n.CultureGroups, 
    gameStats.Cultures, 
    typeof n.CultureRepresentedAtGovernmentLevel !== 'undefined' ? n.CultureRepresentedAtGovernmentLevel : null
    );
  let religionCalc = SocialBehaviourCalc(
    n.ReligionGroups, 
    gameStats.Religions, 
    typeof n.ReligionRepresentedAtGovernmentLevel !== 'undefined' ? n.ReligionRepresentedAtGovernmentLevel : null
    );

  n.CultureRepresentedAtGovernmentLevelPercent =  cultureCalc.GovernmentRepresentationPercent;
  n.CulturalDisunity = cultureCalc.disunity;
  n.ReligionRepresentedAtGovernmentLevelPercent = religionCalc.GovernmentRepresentationPercent;
  n.ReligiousDisunity = religionCalc.disunity;

  n.NobleStateLoyalty = (function () {
    let pointSum = 0;
    for (const loyaltyName in n.NobleLoyaltyGroups) {
      const loyalty = n.NobleLoyaltyGroups[loyaltyName];
      pointSum += +loyalty;
      if (loyaltyName == n.GovernmentName) n.NobleStateLoyalty = loyalty;
    }
    return n.NobleStateLoyalty / pointSum;
  })();
  n.ClergyStateLoyalty = (function () {
    let pointSum = 0;
    for (const loyaltyName in n.ClergyLoyaltyGroups) {
      const loyalty = n.ClergyLoyaltyGroups[loyaltyName];
      pointSum += +loyalty;
      if (loyaltyName == n.GovernmentName) n.ClergyStateLoyalty = loyalty;
    }
    return n.ClergyStateLoyalty / pointSum;
  })();
  n.BurghersStateLoyalty = (function () {
    let pointSum = 0;
    for (const loyaltyName in n.BurghersLoyaltyGroups) {
      const loyalty = n.BurghersLoyaltyGroups[loyaltyName];
      pointSum += +loyalty;
      if (loyaltyName == n.GovernmentName) n.BurghersStateLoyalty = loyalty;
    }
    return n.BurghersStateLoyalty / pointSum;
  })();
  n.PopulationStabilityImpact = (n.Population > n.AdministrativeEfficiency * 500000 ? (n.AdministrativeEfficiency * 500000 - n.Population) / 50000000 : 0) * 10;
  n.Fervor = clamp(1, -1, 0 + n.MinorBattles / 20 + n.MajorBattles / 10 + n.Pillaging - (n.Casualties / (n.OverallNumbers + n.Casualties + 0.0000001)));
  n.WarSupport = clamp(1, 0, n.PopulationHappiness / 10 * 2.5 + n.Propaganda / 10 + n.Fervor);
  let WarStabilityModifier = ((n.AtWar.toLowerCase() == 'offensive' && n.WarSupport < 0.75) ? (n.WarSupport - 0.75) / 10 : 0) + max(-0.075, ((n.AtWar.toLowerCase() == 'defensive' && n.WarSupport < 0.4 && n.Fervor < 0) ? (n.Fervor) / 10 : 0));
  //min and max? nested ternary operations, with "0" if either fail? n.can be optimized
  n.MilitaryLoyalty = clamp(1, 0, 
    1 * n.ArmyWages +
    (n.CulturalAdvancements.EarlyModernAdministration == false && n.NobleStateLoyalty < 0.50 ?
      ( n.NobleStateLoyalty - 0.50) * 2 : 0) +
    (n.MilitaryMorale < 0.70 ?
      -(1 - n.MilitaryMorale) / 2 :
      0) +
    (n.Budget < 0 ? n.Budget / n.ArmyUpkeep :
      0)
    - n.CommanderFreedom / 10);
  n.Stability = n.PopulationHappiness + n.AdministrativeEfficiency / 10 - n.Overextension - n.CulturalDisunity - n.ReligiousDisunity + (n.Propaganda / 1.75 * (1 + n.CulturalAdvancements.Newspapers / 2)) + n.PopulationControl + (n.NobleStateLoyalty - 0.5) * 10 + (n.ClergyStateLoyalty - 0.5) * 7.5 + (n.BurghersStateLoyalty - 0.5) * 7.5 + n.PopulationStabilityImpact + WarStabilityModifier * 100 + (n.MilitaryLoyalty - 1) * 7.5;
  n.Corruption = max(0, n.SocialSpending - n.AdministrativeEfficiency / 20) + (n.Stability < 1 ? 0.5 : 0) + (n.Stability < -1 ? 0.5 : 0) + max(0, ((n.HighClassTax + n.MediumClassTax + n.LowerClassTax) / 3 * 100) - n.AdministrativeEfficiency / 2) / 10;
  n.ArmyQuality = max(0.1, 1 + n.TrainingQuality + n.ArmyTech + n.MilitaryTactics + n.CommanderFreedom / 10 - n.IronShortage - n.SulphurShortage - n.Corruption / 5);
  n.FortUpkeep = (
    n.SmallForts * 2 +
    n.MediumForts * 4 +
    n.BigForts * 8 +
    n.HugeForts * 16 +

    n.ExtraCityFortifications * 5
  ) * n.ArmyQuality / gameStats.TimeDivide;
  
  
  for (const resourceIndex in gameStats.ResourceTypes) { // demands and values... Does not apply to Budget or Food
    const resource = gameStats.ResourceTypes[resourceIndex];
    if(resource == "Budget" || resource == "Food") continue;

    let PopulationDemand = (function () {
      switch (resource) {
        case "Sulphur":
          return 2000000;
        case "Gold":
          return 200000;
        case "Silk":
          return 400000;
        case "Spice":
          return 400000;
        case "Wool":
          return 700000;
        case "Fur":
          return 450000;
        case "Diamond":
          return 250000;
        case "Silver":
          return 300000;
        case "Copper":
          return 750000;
        case "Ivory":
          return 250000;
        case "Sugar":
          return 350000;
        case "ExoticFruit":
          return 350000;
        default:
          return 500000;
      }
    })();

    let extraDemands = (function () {
      switch (resource) {
        case "Coal":
          return (n.EffectiveIron + n.EffectiveGold + n.EffectiveCopper + n.EffectiveSilver) * 0.5 + (n.Population * n.Health / 500000);
        case "Iron":
          return (n.UnitUpkeep + n.FortUpkeep) / 50;
        case "Copper":
          return (n.UnitUpkeep + n.FortUpkeep) / 100;
        default:
          return 0;
      }
    })();

    n[resource + "Demand"] = (n.Population / PopulationDemand) + extraDemands;

    if (resource == "Iron" && n.Technologies.Metallurgy) n[resource + "Demand"] *= 1.1;

    n[resource + "Value"] = n[resource + "Demand"] / (Math.sqrt(n["Effective" + resource]) + 0.1);
  }



  n.ResourcePopulationGrowthBoost = (n.EffectiveCotton - n.CottonInflation + n.EffectiveSpice - n.SpiceInflation + n.EffectiveWool - n.WoolInflation + n.EffectiveFur - n.FurInflation + (n.EffectiveSugar - n.SugarInflation + n.EffectiveExoticFruit - n.ExoticFruitInflation) / 2) / 100;
  // old formula: n.PopulationGrowth = max(-0.3, (0.1 + PopulationGrowthModifier + n.ResourcePopulationGrowthBoost) * (1 - n.Disease) - n.BirthControl / 20);
n.PopulationGrowth = (n.FutureFood < 0 ? n.FutureFood * 1000 / n.Population - (n.Disease > 1 ? n.Disease - 1 : 0) / 10 : max(-0.3, (0.1 + PopulationGrowthModifier + n.ResourcePopulationGrowthBoost) * (1 - n.Disease) - n.BirthControl / 20));
  n.FuturePopulation = (function () {
    return n.Population + n.Population * n.PopulationGrowth / gameStats.TimeDivide;
  })();
  n.FutureLiteracyPercent = ((n.LiteracyPercent > n.EducationEfficiency * 3) ? n.EducationEfficiency * 3 : n.LiteracyPercent) + n.EducationEfficiency / 10 / gameStats.TimeDivide;
  n.FutureHigherEducation = n.HigherEducation + (n.EducationEfficiency >= 3 ? n.EducationEfficiency / 30 : 0) + (n.HigherEducation > n.EducationEfficiency / 3 ? -0.25 : 0);









  n.NavyTech = 0 + n.Technologies.Galleons / 4 + n.Technologies.Docks / 2 + n.Technologies.Gunports / 2;
  n.NavyQuality = 1 + n.NavyImprovements + n.NavyTech;

  n.UpkeepForOneLightShip = ((1 / 8) * n.NavyQuality) / gameStats.TimeDivide * (1 + n.Technologies.Gunports);
  n.UpkeepForOneMediumShip = ((1 / 4) * n.NavyQuality) / gameStats.TimeDivide * (1 + n.Technologies.Gunports);
  n.UpkeepForOneHeavyShip = ((1 / 2) * n.NavyQuality) / gameStats.TimeDivide * (1 + n.Technologies.Gunports + n.Technologies.Galleons / 2);

  n.NavyUpkeep = (
    n.LightShips * n.UpkeepForOneLightShip +
    n.MediumShips * n.UpkeepForOneMediumShip +
    n.HeavyShips * n.UpkeepForOneHeavyShip
  );

  n.NewTroopRecruitmentPenalty = (function () {
    let ntrp = 0;
    for (const unitName in gameStats.UnitUpkeepCosts) {
      const cost = gameStats.UnitUpkeepCosts[unitName];
      ntrp += n["New_" + unitName] * cost;
    }
    ntrp += n.New_LightShips * n.UpkeepForOneLightShip;
    ntrp += n.New_MediumShips * n.UpkeepForOneMediumShip;
    ntrp += n.New_HeavyShips * n.UpkeepForOneHeavyShip;

    ntrp /= 2;
    return ntrp;
  })();

  n.ArmyUpkeep = n.UnitUpkeep * ((n.ArmyQuality + n.Corruption / 5) + n.ArmyWages - 1) / gameStats.TimeDivide;





  n.TradePowerFromResourceTrade = (function () {
    let num = 0;
    let TradePowerResources = [
      "Sulphur",
      "Coal",
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
      "Ivory",
      "Cocoa",
      "Tobacco",
      "Sugar",
      "ExoticFruit"
    ];
    for (const resourceName in TradePowerResources) {
      const resource = TradePowerResources[resourceName];
      num += n[resource + "Incoming"] * n[resource + "Value"];
    }
    return num;
  })();
  n.TradePower = n.TradePowerFromResourceTrade + n.LocalTrade / 2 + (pseudoTradePower);
  n.ProductionEfficiency = n.Mercantilism + n.Technologies.VerticalLoom / 5 + n.Technologies.Workshops + n.Technologies.Cranes / 5 + n.Technologies.TextileManufactories / 2;
  n.Production = (n.LocalTrade + n.TradePower) * n.Workforces.Artisans * n.ProductionEfficiency * 10;
  n.TradeProtection = n.LightShips * 0.75 + n.MediumShips * 1 + n.HeavyShips * 0.75;
  n.TradeEfficiency = 1 * n.Mercantilism + n.Technologies.Cranes / 10 + n.Technologies.PromissoryNotes / 20 + n.TradeProtection / 200;

  n.Inflation = max(0, (n.Budget / 1000) / (n.AdministrativeEfficiency / 10));
  n.ResourceBudgetBoost = (function () {
    let rbb = 0;
    let budgetBoostingResources = [
      "Coal",
      "Sulphur",
      "Gold",
      "Iron",
      "Silver",
      "Copper"
    ];
    for (const resourceIndex in budgetBoostingResources) {
      const resource = budgetBoostingResources[resourceIndex];

      let inflation = 0;
      if (typeof n[resource + "Inflation"] !== 'undefined') inflation = n[resource + "Inflation"];
      rbb += n["Effective" + resource] * (n[resource + "Value"] - inflation);
    }
    return rbb / gameStats.TimeDivide;
  })();

  n.TradeRevenue = ((n.LocalTrade + n.TradePower) * (1 - n.BurghersInfluence)) / gameStats.TimeDivide * n.TradeEfficiency + n.TradeProfit;
  n.EffectiveTax = (
    (
      n.SocietalClasses.Lower * n.Population * n.LowerClassTax / 10000 +
      n.Population * n.SocietalClasses.Medium * n.MediumClassTax / 7500 * (1 - n.ClergyInfluence - n.BurghersInfluence) + n.Population * n.SocietalClasses.High * n.HighClassTax / 5000 * (1 - n.NobleInfluence)
    ) * n.AdministrativeEfficiency / 10 * (1 - n.NobleInfluence / 4 - n.ClergyInfluence / 4
    ) * (1 - n.Occupation)) / gameStats.TimeDivide * (1 - n.Corruption / 10);

  n.SpyUpkeep = n.Spies / 200 * n.SpyQuality / gameStats.TimeDivide;
  n.SocialSpendingUpkeep = n.SocialSpending * n.Population / 1000000 / gameStats.TimeDivide * 3;
  n.HygieneUpkeep = n.Health * n.Population / 2000000 / gameStats.TimeDivide;
  n.EducationUpkeep = n.EducationEfficiency * n.Population / 500000 * (1.1 - n.AdministrativeEfficiency / 100) * 6 / gameStats.TimeDivide;
  n.PropagandaUpkeep = n.Propaganda * (100 - n.AdministrativeEfficiency) / 100 * n.Population / 1000000 / gameStats.TimeDivide;
  n.PopulationControlUpkeep = n.PopulationControl * n.Population / 800000 / gameStats.TimeDivide;
  n.AdministrativeUpkeep = n.LandAdministration / gameStats.TimeDivide * 2;
  n.ProductionRevenue = n.Production / gameStats.TimeDivide;
  n.ResearchUpkeep = n.ResearchSpending * n.Population / 500000 / gameStats.TimeDivide * n.LiteracyPercent / 10;
  n.Balance = n.BudgetIncoming - n.BudgetOutgoing;

  n.DailyBudget = (n.Budget / (10 - n.AdministrativeEfficiency / 10 + 1) / gameStats.TimeDivide) / (1 + n.Inflation) + n.ResourceBudgetBoost - n.ArmyUpkeep + n.TradeRevenue + n.EffectiveTax - n.EducationUpkeep - n.HygieneUpkeep - n.NavyUpkeep - n.AgricultureSpending - n.SocialSpendingUpkeep - n.SpyUpkeep - n.PopulationControlUpkeep - n.PropagandaUpkeep + n.ProductionRevenue - n.FortUpkeep - n.AdministrativeUpkeep - n.ResearchUpkeep + n.Balance - n.NewTroopRecruitmentPenalty;
  n.FutureBudget = n.Budget + n.DailyBudget;

  n.OverallIncome = (n.Budget / (10 - n.AdministrativeEfficiency / 10 + 1) / gameStats.TimeDivide) / (1 + n.Inflation) + n.ResourceBudgetBoost + n.TradeRevenue + n.EffectiveTax + n.ProductionRevenue + n.Balance;

  n.FreeEliteUnitsCap = ((n.OverallNumbers - n.Militia - n.Levies) * 0.025) - (n.EliteCavalry + n.EliteInfantry);

  n.MilitaryMorale = clamp(0, 1.5, 
    1 + n.Fervor + (n.MilitaryDiscipline > 1 ? - n.MilitaryDiscipline + 1 : 0) * 2 +
  (n.WarSupport < 0.5 ? n.WarSupport - 0.5 : 0) +
  (n.WarSupport > 0.75 ? n.WarSupport - 0.75 : 0) +
  n.ArmyWages - 1);

  n.CulturalAdvance = (function () {
    let ca = 0;
    for (const cultureadvance in n.CulturalAdvancements) {
      if (n.CulturalAdvancements[cultureadvance]) ca++;

    }
    return ca;
  })();
  n.CulturalPowerGain = (n.LiteracyPercent / 3 + n.PopulationHappiness / 8) * (n.CulturalProsperity + n.CulturalAdvancements.RenaissanceThought / 10) / gameStats.TimeDivide;
  n.CulturalPower = n.CulturalPower;
  n.FutureCulturalPower = min(6, (n.CulturalPower + n.CulturalPowerGain));
  n.FuturePublicDebtLength = n.EffectiveDebt > 0 ? n.PublicDebtLength + 1 : 0;

  n.MaxPopulation = n.Population / n.Disease;
  
  n.OverallShipCount = n.LightShips + n.MediumShips + n.HeavyShips;
  n.NavalPower = (n.LightShips*0.5 + n.MediumShips + 2*n.HeavyShips) * n.NavyQuality;
  

  n.PopulationTechImpact = (n.Population > 20000000? (n.Population - 20000000) / 250000000 : 0);
  

  n.ResearchBoostFromTech = 
  1 + 
  n.CulturalAdvancements.Universities / 10 + 
  n.CulturalAdvancements.RenaissanceThought / 5 + 
  n.Technologies.Experimentation / 5;
  n.ResearchPointGain = max(1, (n.ResearchSpending * n.ResearchEffectiveness * n.ResearchBoostFromTech * n.LiteracyPercent / n.Isolation / gameStats.TimeDivide * 2 / 10 + n.ResearchSpending * n.ResearchEffectiveness * n.HigherEducation / n.Isolation / gameStats.TimeDivide * 5 / 10) * (1 - (n.NobleInfluence > 0.5 ? n.NobleInfluence - 0.5 : 0) / 1.5 - (n.ClergyInfluence > 0.5? n.ClergyInfluence - 0.5 : 0) / 1.5) * (1 - n.PopulationTechImpact));
  n.FutureResearchPoints = min(7.5, n.ResearchPoints + n.ResearchPointGain);
  n.FutureDateInThisation = n.DateInThisation + gameStats.TimeSpeed;
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

