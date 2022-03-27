const { numberCmp } = require("hyperformula/typings/interpreter/ArithmeticHelper");

let TimeSpeed = 50;
TimeDivide = (function() {
  return 20 / TimeSpeed;
})();
let Nations = [];
let Religions = { //For opinions not mentioned, they are Undesired
  Pagan: {
    definingFeatures: "Anything not classified",
    opinions: []
  }
};
let Cultures; //For opinions not mentioned, they are neutral towards them.
let resourceTypes = [
  "Sulphur",
  "Cotton",
  "Gold",
  "Iron",
  "Tea",
  "Silk",
  "Spices",
  "Wool",
  "Coffee",
  "Fur",
  "Diamonds",
  "Silver",
  "Copper",
  "Coal",
  "Ivory",
  "Cocoa",
  "Tobaco",
  "Sugar",
  "ExoticFruit"
];
let Trades;
let TradeZones = {
  Alaska: 1,
  Cascadia: 1,
  WestCoast: 1,
  HudsonBay: 1,
  GreatLakes: 2,
  Mississipi: 1.5,
  GulfOfMexico: 3,
  LawrenceGulf: 2,
  EastCoast: 4,
  Carribean: 3,
  CentralAmerica: 2.5,

  GuyanaAndSuriname: 1,
  Amazon: 1,
  Peru: 1,
  RioGrande: 1,
  LaPlata: 1.5,
  Chile: 1,
  Patagonia: 1,




  NorthAnatolia: 3,
  NorthSea: 2,
  BritishIsles: 6.5,
  EnglishChannel: 7,
  France: 4,
  BayOfBiscay: 3.5,
  WestIberia: 4,
  Gibraltar: 5,
  WestMediterreanian: 4,
  Rhine: 3.5,
  CentralMed: 5,
  Adriatic: 4,
  Germany: 4,
  SouthGermany: 3.5,
  Denmark: 3.5,
  Baltic: 4,
  NorthNordics: 1,
  BarentsSea: 1,
  Novgorod: 3,
  Poland: 2.5,
  Dniepr: 4,
  Crimea: 3,
  Balkans: 3.5,
  Greece: 3.5,
  EastMed: 3.5,
  Egypt: 3.5,
  RedSea: 1.5,
  WestAfrica: 1,
  CoteDIvoire: 3,
  Nigeria: 3,
  SouthNile: 1.5,
  Somalia: 1,
  Kongo: 1,
  EastAfrica: 1,
  Mozambique: 1,
  SouthAfrica: 2,

  Mesopotamia: 4,
  PersianGulf: 2,
  Caucasus: 3,
  DonRiver: 3,
  Volga: 2,
  CentralAsia: 2,
  WestSiberia: 2,
  EastSiberia: 2,
  Iran: 2.5,
  Pakistan: 2.5,
  Tibet: 2,
  Mongolia: 1.5,
  Manchuria: 1.5,
  SeaOfJapan: 2.5,
  NorthChina: 3,
  YangtzeeRiver: 4,
  SouthChina: 4,
  NorthIndia: 3,
  WestIndia: 3,
  EastIndia: 3,
  Burma: 3.5,
  SouthEastAsia: 4,
  NorthAustralia: 1,
  SouthAustralia: 1
}

class Culture {
  definingFeatures;
  opinions;
}

class Religion {
  definingFeatures;
  opinions;
}

class Opinion {
  name;
  score;
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
  name;
  giver; //nation name
  reciever; //nation name
  resource; //can include food or budget
  amount;
}
class NationSheet {


  /* #region  Properties */
  /* #region  Daily */
  FuturePopulation;
  FutureLiteracyPercent;
  FutureHigherEducation;
  FutureBudget;
  FutureFood;
  FutureResearchPoints;
  FuturePublicLength;
  FutureCulturalpower;
  DateInThisNation;
  FutureDateInThisNation;
  /* #endregion */

  /* #region Most Stats */
  NationName;
  GovernmentName;
  ReligionGroups;
  CulturalDisunity;
  ReligiousDisunity;
  Population;
  PopulationGrowth;
  PopulationGrowthModifier;
  Health;
  LiteracyPercent;
  HigherEducation;
  EducationEfficiency;
  EducationCostModifier;
  AdministrativeEfficiency;
  Corruption;
  Overextension;
  Propaganda;
  SocialSpending;
  Prosperity; //Quality of Life
  PopulationHappiness;
  Stability;
  AtOffensiveWar;
  AtDefensiveWar;
  WarSupport;
  WarStabilityModifier;
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
  PublicDebt;
  DailyBudget;
  Budget;
  Inflation;
  Spies;
  SpyQuality;
  NobleInfluence;
  NobleLoyalty;
  ClergyInfluence;
  ClergyLoyalty;
  BurghersInfluence;
  BurghersLoyalty;
  ArmyUpkeep;
  SpyUpkeep;
  SocialSpendingUpkeep;
  HygieneUpkeep;
  EduationUpkeep;
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
  freeEliteUnitsCap;
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
  MililtaryDiscipline;
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
  PrideOfTheNavy;
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
  PopulationInAgriculture;
  PopulationInResourceHarvest;
  PopulaitonInMilitary;
  Artisans;
  Clergy;
  Nobility;
  Burghers;
  HighClass;
  MediumClass;
  LowerClass;
  CultureGroups; //object of {name: {points: num}, name: {points: num}}
  PrimaryCulture;
  PrimaryCulturePercent;
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

  Spices;
  EffectiveSpice;
  SpiceInflation;

  Wool;
  EffectiveWool;
  Woolinflation;

  Coffee;
  EffectiveCoffee;
  CoffeeInflation;

  Fur;
  EffectiveFur;
  FurInflation;

  Diamonds;
  EffectiveDiamonds;
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

  Tobaco;
  EffectiveTobaco;
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

  TobacoDemand;
  TobacoValue;

  SugarDemand;
  SugarValue;

  ExoticFruitDemand;
  ExocticFruitValue;
  /* #endregion */

  /* #region  Technology Stats */
  Isolation;
  ResearchSpending;
  ResearchEffectiveness;
  ResearchBoostFromTech;
  ResearchPointGain;
  ResearchPoints;
  FutureResearchPoints;
  /* #region  Technologies */
  Gunpowder;
  VerticalLoom;
  SaddleAndStirrup;
  HorseCollar;
  Explosives;
  Firelance;
  Cranes;
  PromissoryNotes;
  Bombards;
  HandCannons;
  PlateArmour;
  SappersAndEngineers;
  Workshops;
  StandardizedPikes;
  Galleons;
  PrintingPress;
  Muskets;
  Limber;
  Docks;
  Gunports;
  Matchlock;
  StarForts;
  TextileManufactories;
  Reiters;
  MiningCarts;
  HumanAnatomy;
  Mortars;
  Metallurgy;
  Experimentation;
  Bayonet;
  SocketBayonet;
  Flintlock;
  /* #endregion */
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
  FutureDebtLength;
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
  /* #region  Advancements */
  DivineRightToRule;
  Serfdom;
  Feudalism;
  Universities;
  NobleDuty;
  Courthouses;
  RenaissanceThought;
  EarlyModernAdministration;
  NationalSovereignity;
  Newspapers;
  /* #endregion */
  /* #endregion */

  /* #region  Trade */
  FoodIncoming;
  FoodOutgoing;

  CoalIncoming;
  CoalOutgoing;

  SulphurIncoming;
  SulphurOutgoing;

  Cottonincoming;
  CottonOutgoing;

  GoldIncoming;
  GoldOutgoing;

  Ironincoming;
  IronOutgoing;

  TeaIncoming;
  TeaOutgoing;

  SilkIncoming;
  SilkOutgoing;

  SpiceIncoming;
  SpiceOutgoing;

  Woolincoming;
  WoolOutgoing;

  Coffeeincoming;
  CoffeeOutgoing;

  FurIncoming;
  FurOutgoing;

  Diamondsincoming;
  DiamondsOutgoing;

  SilverIncoming;
  SilverOutgoing;

  CopperIncoming;
  CopperOutgoing;

  IvoryIncoming;
  IvoryOutgoing;

  CocoaIncoming;
  CocoaOutgoing;

  TobacoIncoming;
  TobacoOutgoing;

  SugarIncoming;
  SugarOutgoing;

  ExoticFruitIncoming;
  ExoticFruitOutgoing;

  TradePowerResourceTrade;
  /* #endregion */

  /* #region  Agriculture */
  AgricultureSubsidies;
  Fertility;
  AgricultureInfrastructure;
  StockingCapabilities;
  AgricultureAdvancements;
  AgricultureTechnology;
  PopulationInAgriculture;
  FarmingEfficiency;
  AgricultureSpending;
  DailyFood;
  FoodConsumption;
  FoodGain;
  MaxStock;
  Stock;
  FutureFood;
  FoodPopulationBoost;
  SurplusFood;
  SellingCapability;
  FoodSold;
  Foodlost;
  Tradeprofit;
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
  speudoTradePower;
  TradeInfluences;
  /* #endregion */

  /* #region  Land */
  Size;
  KmSquared;
  PopDensityPerKmSquared;
  Disease;
  MaxPopulation;
  UnderPopulation;
  DetachedLand;
  LandAdministration;
  Overextension;

  PolarDesert;

  TaigaAndTundra;

  MontaneForest;

  Medditereanian;

  Arid;

  Steppe;

  Moderate;

  SubTropical;

  Tropical;

  Savanna;

  Mountainous;

  Desert;

  CoastalDesert;

  HabitableLand;
  /* #endregion */
  /* #endregion */

  constructor(nationToCopy) {

    /* #region  Stats to Set Immedietly */
    /* #region  Main */
    this.NationName = "Nation name";
    this.GovernmentName = "Government of " + this.NationName;
    this.Population = 5000000;
    this.LiteracyPercent = 7.50;
    this.HigherEducation = 0.25;
    this.Budget = 250.00;
    this.Food = 100.00;
    this.ResearchPoints = 6.00;
    this.PublicDebtLength = 0;
    this.CulturalPower = 6.00;
    this.DateInThisNation = 1600;
    /* #endregion */

    /* #region  Most Stats */
    this.ReligiousDisunity = 0.00;
    this.Health = 2.00;
    this.EducationEfficiency = 3;
    this.EducationCostModifier = 6;
    this.AdministrativeEfficiency = 30.00;
    this.Propaganda = 0;
    this.SocialSpending = 0;
    this.AtOffensiveWar = false;
    this.AtDefensiveWar = false;

    this.NobleInfluence = 0.55; //Show in percent
    this.NobleLoyalty = [
      {
        to: this.GovernmentName,
        points: 55
      },
      {
        to: "Self Interests",
        points: 45
      }
    ];
    this.ClergyInfluence = 0.25; //Show in percent
    this.ClergyLoyalty = [
      {
        to: this.GovernmentName,
        points: 50
      },
      {
        to: "Self Interests",
        points: 50
      }
    ];
    this.BurghersInfluence = 0.10; //Show in percent
    this.BurghersLoyalty = [
      {
        to: this.GovernmentName,
        points: 50
      },
      {
        to: "Self Interests",
        points: 50
      }
    ];

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
    this.MililtaryDiscipline = 1; //Show In Percent
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
    this.Artisans = 0.01; //Show In Percent
    this.Clergy = 0.0075; //Show In Percent
    this.Nobility = 0.01; //Show In Percent
    this.Burghers = 0.050; //Show In Percent
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
    this.Spices = 0;
    this.Wool = 0;
    this.Coffee = 0;
    this.Fur = 0;
    this.Diamonds = 0;
    this.Silver = 0;
    this.Copper = 0;
    this.Ivory = 0;
    this.Cocoa = 0;
    this.Tobaco = 0;
    this.Sugar = 0;
    this.ExoticFruit = 0;
    /* #endregion */

    /* #region  Technology */
    this.Isolation = 1;
    this.ResearchSpending = 1.00;
    this.ResearchEffectiveness = 1.00;

    this.Gunpowder = true;
    this.VerticalLoom = true;
    this.SaddleAndStirrup = true;
    this.HorseCollar = true;
    this.Explosives = true;
    this.Firelance = true;
    this.Cranes = true;
    this.PromissoryNotes = true;
    this.Bombards = true;
    this.HandCannons = true;
    this.PlateArmour = true;
    this.SappersAndEngineers = true;
    this.Workshops = true;
    this.StandardizedPikes = true;
    this.Galleons = false;
    this.PrintingPress = false;
    this.Muskets = false;
    this.Limber = false;
    this.Docks = false;
    this.Gunports = false;
    this.Matchlock = false;
    this.StarForts = false;
    this.TextileManufactories = false;
    this.Reiters = false;
    this.MiningCarts = false;
    this.HumanAnatomy = false;
    this.Mortars = false;
    this.Metallurgy = false;
    this.Experimentation = false;
    this.Bayonet = false;
    this.SocketBayonet = false;
    this.Flintlock = false;
    /* #endregion */

    /* #region  Economy */
    this.HighClassTax = 0.12; //As Percentage
    this.MediumClassTax = 0.12; //As Percentage
    this.LowerClassTax = 0.12; //As Percentage
    this.PublicDebtTaken = 0.00;
    this.BudgetIncoming = 0;
    this.BudgetOutgoing = 0;
    /* #endregion */

    /* #region  Cultural Advance */
    this.CulturalProsperity = 1.00;
    this.DivineRighttoRule = true;
    this.Serfdom = true;
    this.Feudalism = true;
    this.Universities = true;
    this.NobleDuty = true;
    this.Courthouses = true;
    this.RenaissanceThought = false;
    this.EarlyModernAdministration = false;
    this.NationalSovereignity = false;
    this.Newspapers = false;
    /* #endregion */

    /* #region  War */
    this.Casualties = 0;
    this.Pillaging = 0; //Show In Percent
    this.Occupation = 0; //Show in Percent
    this.MinorBattles = 0;
    this.MajorBattles = 0;
    /* #endregion */

    /* #region  Trade Influence */
    this.TradeInfluences = {
      Alaska: 0,
      Cascadia: 0,
      WestCoast: 0,
      HudsonBay: 0,
      GreatLakes: 0,
      Mississipi: 0,
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




      NorthAnatolia: 0,
      NorthSea: 0,
      BritishIsles: 0,
      EnglishChannel: 0,
      France: 0,
      BayOfBiscay: 0,
      WestIberia: 0,
      Gibraltar: 0,
      WestMediterreanian: 0,
      Rhine: 0,
      CentralMed: 0,
      Adriatic: 0,
      Germany: 0,
      SouthGermany: 0,
      Denmark: 0,
      Baltic: 0,
      NorthNordics: 0,
      BarentsSea: 0,
      Novgorod: 0,
      Poland: 0,
      Dniepr: 0,
      Crimea: 0,
      Balkans: 0,
      Greece: 0,
      EastMed: 0,
      Egypt: 0,
      RedSea: 0,
      WestAfrica: 0,
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
      YangtzeeRiver: 0,
      SouthChina: 0,
      NorthIndia: 0,
      WestIndia: 0,
      EastIndia: 0,
      Burma: 0,
      SouthEastAsia: 0,
      NorthAustralia: 0,
      SouthAustralia: 0
    };
    /* #endregion */

    /* #region  Land */
    this.Climates = {
      "Polar Desert": {
        pixels: 0,
        climateScore: 0,
      },
      "Taiga/Tundra": {
        pixels: 0,
        climateScore: 0.25,
      },
      "Montane Forest": {
        pixels: 0,
        climateScore: 0.6,
      },
      Medditereanian: {
        pixels: 0,
        climateScore: 0.85,
      },
      Arid: {
        pixels: 0,
        climateScore: 0.65,
      },
      Steppe: {
        pixels: 0,
        climateScore: 0.75,
      },
      Moderate: {
        pixels: 0,
        climateScore: 1,
      },
      "Sub-Tropical": {
        pixels: 0,
        climateScore: 0.75,
      },
      Tropical: {
        pixels: 0,
        climateScore: 0.6,
      },
      Savanna: {
        pixels: 0,
        climateScore: 0.65,
      },
      Mountainous: {
        pixels: 0,
        climateScore: 0.35,
      },
      Desert: {
        pixels: 0,
        climateScore: 0.05,
      },
      "Coastal Desert": {
        pixels: 0,
        climateScore: 0.35
      },

    };
    this.DetachedLand = 0.00;
    /* #endregion */
    /* #endregion */

    this.evaluateNation();
  }

  evaluateNation() {

    this.AgricultureTechnology = 0 + this.HorseCollar / 2;
    this.FarmingEfficiency = 1 + this.AgricultureSubsidies / 5 + this.Fertility - 0.5 + (this.AgricultureInfrastructure - 1) / 10 + (this.AgricultureAdvancements - 1) / 10 + this.AgricultureTechnology / 10;
    this.OverallNumbers = this.Levies + this.LightInfantry + this.HeavyInfantry + this.Archers + this.Crossbowmen + this.LightCavalry + this.HeavyCavalry + this.EliteInfantry + this.Militia + this.EliteCavalry + this.HandCannon + (this.SiegeEquipment + this.LargeSiegeEquipment) * 10;
    this.ConscriptionPercent = this.OverallNumbers / this.Population;
    this.PopulaitonInMilitary = this.ConscriptionPercent;
    this.PopulationInResourceHarvest = (this.Coal + this.Sulphur + this.Cotton + this.Gold + this.Iron + this.Tea + this.Silk + this.Spices + this.Wool + this.Coffee + this.Fur + this.Diamonds + this.Silver + this.Copper) * 20000 / this.Population;
    this.PopulationInAgriculture = 1 - this.PopulaitonInMilitary - this.Artisans - this.Clergy - this.Burghers - this.Nobility - this.PopulationInResourceHarvest;
    this.AgricultureSpending = (this.PopulationInAgriculture * this.Population / 1000 * this.AgricultureInfrastructure / 100 * (1 + this.AgricultureSubsidies / 10) * this.StockingCapabilities) / 2;
    this.DailyFood = this.PopulationInAgriculture * this.Population / 1000 * this.FarmingEfficiency * (1 - this.Pillaging) + this.FoodIncoming - this.FoodOutgoing;
    this.FoodConsumption = this.Population / 1000;
    this.FoodGain = this.DailyFood - this.FoodConsumption;

    this.MaxStock = (function () {
      return Math.max(100, 1000 * this.Population / 10000000) * this.StockingCapabilities;
    })();
    this.Stock = this.Food;
    this.FutureFood = Math.min(this.MaxStock, Stock + this.FoodGain);
    this.FoodPopulationBoost = (function () {
      return this.Stock > 500 ? this.Stock / 50000 : 0;
    })();
    this.SurplusFood = (function () {
      return this.FoodGain + this.Stock > this.MaxStock ? this.FoodGain + this.Stock - this.MaxStock : 0;
    })();

    this.speudoTradePower = (function () {
      let stp;
      for (const region in TradeZones) {
        let allNationPoints = 0;
        for (const nation in Nations) {
          allNationPoints += Nations[nation].TradeInfluences[region];
        }
        let percent = this.TradeInfluences[region] / allNationPoints;
        stp += TradeZones[region] * percent;
      }
      return stp;
    })();
    this.SellingCapability = (this.LocalTrade / 2 + this.speudoTradePower / 5) * this.Mercantilism * 200;
    this.FoodSold = Math.min(this.SellingCapability, this.SurplusFood);
    this.Foodlost = this.SurplusFood - this.FoodSold;
    this.Tradeprofit = this.FoodSold / 50;


    Religion = Religions.Pagan;

    this.Prosperity = 1 + this.SocialSpending / 2.5 + (this.Stock == 0 && this.FutureFood < 0 ? this.FutureFood / 2000 : 0) + (Budget < 0.00001 ? Budget / 100 : 0) * (1 - this.Pillaging);
    this.Size = (function () {
      let s = 0;
      for (const climate in this.Climates) {
        s += this.Climates[climate].pixels;
      }
      return s;
    })();
    this.Km2 = this.Size*20;
    this.HabitableLand = (function () {
      let hl = 0;

      for (const climate in this.Climates) {
        hl += (this.Climates[climate].pixels / this.Size) * this.Climates[climate].climateScore;
      }

      return hl;
    })();
    this.PopDensityPerKmSquared = this.Population / (this.Km2 * this.HabitableLand);

    this.Disease = this.PopDensityPerKmSquared / 25 - this.Health / 20 - (this.HumanAnatomy ? 0.15 : 0);
    this.UnderPopulation = this.Disease < 0.5 ? (1 - this.Disease) / 10 : 0;

    this.PopulationGrowthModifier = (function () {

      let mod = this.FoodPopulationBoost + (this.Prosperity - 1) / 10 + this.UnderPopulation;

      if (this.Fertility > 0.5) mod += (this.Fertility - 0.5) / 10
      if (this.Population > 2000000) mod += -0.01;
      if (this.Population > 5000000) mod += -0.01;
      if (this.Population > 10000000) mod += -0.01;
      if (this.Population > 15000000) mod += -0.01;
      if (this.Population > 250000) mod += -0.01;
      if (this.Population > 500000) mod += -0.01;
      if (this.Population > 20000000) mod += -0.01;
      if (this.Population > 25000000) mod += -0.01;
      if (this.Population > 40000000) mod += -0.01;
      if (this.Population > 50000000) mod += -0.01;

      return mod;
    })();

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

    let UnitUpkeepCosts = {
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
    
    this.UnitUpkeep = (function(){
      let uu = 0;
      for (const unitName in UnitUpkeepCosts) {
        const cost = UnitUpkeepCosts[unitName];
        uu += this[unitName] * cost;
      }
      return uu;
    })();  
    
    this.ArmyTechBoost = (
        this.SaddleAndStirrup + 
        this.Matchlock + 
        this.SocketBayonet + 
        this.Flintlock)
       / 5 + 
      (
        this.Gunpowder + 
        this.PlateArmour + 
        this.StandardizedPikes + 
        this.Muskets + 
        this.Limber + 
        this.Mortars + 
        this.Reiters + 
        this.Metallurgy + 
        this.Bayonet)
      /10 + 
      (
        this.Firelance + 
        this.Bombards + 
        this.HandCannons + 
        this.SappersAndEngineers)
      / 20;
    this.ArmyTech =  1 + this.ArmyTechBoost;
    this.IronShortage = Math.max(0, this.UnitUpkeep / 200 - this.EffectiveIron);
    this.SulphurShortage = Math.max(0, (this.Cannons * 100 + this.Musketeers + this.HandCannon + 
    (this.Reiters == true ? this.LightCavalry + tihs.HeavyCavalry : 0)) / 15000 - this.EffectiveSulphur);
    //missing Corruption
    this.ArmyQuality = Math.max(0.1, 1+ this.TrainingQuality + this.ArmyTech + this.MilitaryTactics + this.CommanderFreedom / 10 - this.IronShortage - this.SulphurShortage -this.Corruption/5);
    this.FortUpkeep = (
      this.SmallForts * 2 + 
      this.MediumForts * 4 + 
      this.BigForts * 8 + 
      this.HugeForts *16 + 
      
      this.ExtraCityFortifications * 5
      ) * this.ArmyQuality/TimeDivide;
    for (const resource in resourceTypes) {
      this["incoming" + resource] = 0;
      this["outgoing" + resource] = 0;

      for (const tradename in Trades) {
        const trade = Trades[tradename];
        if (trade.resource == resource) {
          if (this.NationName == trade.reciever) {
            this["incoming" + resource] += trade.amount;
          } else if (this.NationName == trade.giver) {
            this["outgoing" + resource] += trade.amount;
          }
        }
      }
      
      
      this["Effective" + resource] = (function () {

        return this.points * (GatheringEffectiveness(resource) == "Farming" ? this.FarmingEfficiency : this.MiningEfficiency) + incomingPoints - outgoingPoints;
      })();


      this[resource + "Inflation"] = (function () {

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
          }
        })();

        return Math.max(0, this["Effective" + resource] - inflationMod);
      })();

      let PopulationDemand = (function () {
        switch (resource) {
          case "Coal":
						return 500000;
          case "Sulphur":
						return 2000000;
          case "Cotton":
						return 500000;
          case "Gold":
						return 200000;
          case "Iron":
						return 500000;
          case "Tea":
						return 500000;
          case "Silk":
						return 400000;
          case "Spices":
						return 400000;
          case "Wool":
						return 700000;
          case "Coffee":
						return 500000;
          case "Fur":
						return 450000;
          case "Diamonds":
						return 250000;
          case "Silver":
						return 300000;
          case "Copper":
						return 750000;
          case "Ivory":
						return 250000;
          case "Cocoa":
						return 500000;
          case "Tobaco":
						return 500000;
          case "Sugar":
						return 350000;
          case "ExoticFruit":
            return 350000;
        }
      })();

      let extraDemands = (function(){
        switch (resource){
          case "Coal":
            return (this.EffectiveIron + this.EffectiveGold + this.EffectiveCopper + this.EffectiveSilver) * 0.5 + (this.Population*this.Health/500000);
          case "Iron":
            return (this.UnitUpkeep+this.FortUpkeep)/50;
          case "Copper":
            return (this.UnitUpkeep+this.FortUpkeep)/100;
        }
      })();

      this[resource + "Demand"] = (this.Population / PopulationDemand) + extraDemands;

      if(resource == "Iron" && this.Metallurgy) this[resource + "Demand"] *= 1.1;

      this[resource + "Value"] = this[resource + "Demand"] / (Math.sqrt(this["Effective" + resource]) + 0.1)
    }

    
    this.ResourcePopulationGrowthBoost = (this.EffectiveCotton - this.CottonInflation + this.EffectiveSpice - this.SpiceInflation + this.EffectiveWool - thhis.Woolinflation + this.EffectiveFur - this.FurInflation + (this.EffectiveSugar - this.SugarInflation + this.EffectiveExoticFruit - this.ExoticFruitInflation) / 2) / 100;
    this.PopulationGrowth = Math.max(-0.3, (0.1 + this.PopulationGrowthModifier + this.ResourcePopulationGrowthBoost) * (1 - this.Disease) - this.BirthControl / 20);
    this.FuturePopulation = (function () {
      return this.Population + (this.FutureFood < 0 ? this.FutureFood * 1000 : this.Population * this.PopulationGrowth / TimeDivide);
    })();
    this.FutureLiteracy = this.LiteracyPercent > this.EducationEfficiency * 3 ? this.EducationEfficiency * 3 : this.LiteracyPercent + this.EducationEfficiency / 10 / TimeDivide;
    this.FutureHigherEducation = this.HigherEducation + IF(this.EducationEfficiency >= 3 ? this.EducationEfficiency / 30 : 0) + (this.HigherEducation > this.EducationEfficiency / 3 ? -0.25 : 0);
    this.Corruption = Math.max(0, this.SocialSpending - this.AdministrativeEfficiency / 20) + (this.Stability < 1 ? 0.5 : 0) + (this.Stability < -1 ? 0.5 : 0) +
      Math.max(0, ((this.HighClassTax + this.MediumClassTax + this.LowerClassTax) / 3 * 100) - this.AdministrativeEfficiency / 2) / 10;
    this.HighClass = this.Nobility;
    this.MediumClass = this.Artisans + this.Clergy + this.Burghers;
    this.LowerClass = this.PopulationInAgriculture + this.PopulaitonInMilitary;
    this.InterestRate = 0.05 + this.PublicDebtLength * 0.02 / TimeDivide;
    this.EffectiveDebt = this.PublicDebtTaken * (1 + this.InterestRate);
    this.PublicDebt = this.EffectiveDebt;
    this.PossiblePublicDebt = Math.max(0, this.Population / 10000 * (1 - (this.HighClassTax + this.MediumClassTax + this.LowerClassTax) / 3) - this.PublicDebt);
    this.DebtHappinessEffect = (this.PublicDebtLength > 1 ? this.EffectiveDebt / (this.PossiblePublicDebt + this.PublicDebtTaken) * (2 + this.PublicDebtLength) : 0);
    this.WarExhaustion = (this.Casualties / this.Population * 500) + (this.Pillaging * 20) + (this.Occupation * 5);
    this.PopulationHappiness = (50 + this.ResourceHappinessBoost) * this.Prosperity / 10 - (this.LowerClassTax * this.LowerClass + this.MediumClassTax * this.MediumClass + this.HighClass * this.HighClassTax) * 100 / 4 - this.Absolutism / 2 - this.PopulationControl +
      (this.Mercantilism > 1 ? (-this.Mercantilism + 1) * 2.5 : 0) + (this.PublicDebt > 0 && this.Budget < 0 ? - (this.PublicDebt / this.PossiblePublicDebt) * 10 : 0) - this.WarExhaustion / 2 - this.DebtHappinessEffect + (this.Disease > 0.10 ? - this.Disease / 4 : 0);
    this.LandAdministration = ((this.Size - this.DetachedLand) / 25000 + this.DetachedLand / 10000) * (1 - this.AdministrativeEfficiency / 1000);
    this.Overextension = this.UnderPopulation / 4 + this.LandAdministration / 1.5;

    let pointSum = 0;
    let culturalDisunity = 0;

    for (const culturename in this.CultureGroups) {
      const points = this.CultureGroups[culturename].points;
      pointSum += points;
    }

    for (const OpinionatedCultureName in this.CultureGroups) {
      const OpinionatedCulture = Cultures[OpinionatedCultureName];
      const points = this.CultureGroups[OpinionatedCultureName].points;
      for (const nameOfCultureToBeHadAnOpinionAbout in OpinionnatedCulture.opinions) {
        if (nameOfCultureToBeHadAnOpinionAbout == OpinionatedCultureName) continue; //we don't account for cultures having opinions on themselves
        let opinionScore = OpinionatedCulture.opinions.find(cul => cul.name == nameOfCultureToBeHadAnOpinionAbout);
        if (opinionScore !== undefined) //If the culture to be had an opinion about, isn't recorded by the culture we are currently checking opinions for. Treat the opinion as neutral
          opinionScore = Opinion.Neutral;
        let culturalDisunityFactor = (opinionScore - 100) * (points / pointSum);
        if (OpinionatedCultureName == this.PrimaryCulture) {
          this.PrimaryCulturePercent = (points / pointSum);
          culturalDisunityFactor *= 1.5;
        }
        culturalDisunity += culturalDisunityFactor;
      }
    }
    this.culturalDisunity = culturalDisunity / 100;

    pointSum = 0;
    religiousDisunity = 0;

    for (const religionname in this.ReligionGroups) {
      const points = this.ReligionGroups[religionname].points;
      pointSum += points;
    }

    for (const OpinionatedReligionName in this.ReligionGroups) {
      const OpinionatedReligion = Religions[OpinionatedReligionName];
      const points = this.ReligionGroups[OpinionatedReligionName].points;
      for (const nameOfReligionToBeHadAnOpinionAbout in OpinionatedReligion.opinions) {
        if (nameOfReligionToBeHadAnOpinionAbout == OpinionatedReligionName) continue; //we don't account for religions having opinions on themselves
        let opinionScore = OpinionatedReligion.opinions.find(rel => rel.name == nameOfReligionToBeHadAnOpinionAbout);
        if (opinionScore !== undefined) //If the religion to be had an opinion about, isn't recorded by the religion we are currently checking opinions for. Treat the opinion as neutral
          opinionScore = Opinion.Neutral;
        let religiousDisunityFactor = (opinionScore - 100) * (points / pointSum);
        if (OpinionatedReligionName == this.PrimaryReligion) {
          this.PrimaryReligionPercent = (points / pointSum);
          religiousDisunityFactor *= 1.5;
        }
        religiousDisunity += religiousDisunityFactor;
      }
    }
    this.culturalDisunity = culturalDisunity / 100;
    this.NobleLoyalty = (function(){
      let pointSum = 0;
      let alliedPoints = 0;
      for (const loyaltyName in this.NobleLoyalty) {
        const loyalty = this.NobleLoyalty[loyaltyName];
        pointSum + loyalty.points;
        if(loyalty.to == this.GovernmentName) alliedPoints = loyalty.points;
      }
      return alliedPoints / pointSum;
    })();
    this.ClergyLoyalty = (function(){
      let pointSum = 0;
      let alliedPoints = 0;
      for (const loyaltyName in this.ClergyLoyalty) {
        const loyalty = this.ClergyLoyalty[loyaltyName];
        pointSum + loyalty.points;
        if(loyalty.to == this.GovernmentName) alliedPoints = loyalty.points;
      }
      return alliedPoints / pointSum;
    })();
    this.BurghersLoyalty = (function(){
      let pointSum = 0;
      let alliedPoints = 0;
      for (const loyaltyName in this.BurghersLoyalty) {
        const loyalty = this.BurghersLoyalty[loyaltyName];
        pointSum + loyalty.points;
        if(loyalty.to == this.GovernmentName) alliedPoints = loyalty.points;
      }
      return alliedPoints / pointSum;
    })();
    this.Fervor = Math.min(1, Math.max(-1, 0 + this.MinorBattles / 20 + this.MajorBattles / 10 + this.Pillaging - (this.Casualties / (this.OverallNumbers + this.Casualties + 0.0000001))));
    this.WarSupport = Math.min(1, Math.max(0, this.PopulationHappiness / 10 * 2.5 + this.Propaganda/10 + this.Fervor));
    this.WarStabilityModifier = ((this.AtOffensiveWar == true && this.WarSupport < 0.75) ? (this.WarSupport - 0.75) / 10 : 0) + Math.max(-0.075, ((this.AtDefensiveWar == true && this.WarSupport < 0.4 && this.Fervor < 0) ? (this.Fervor) / 10 : 0));
    

    this.NavyTech = 0 + tis.Galleons / 4 + this.Docks / 2 + this.Gunports / 2;
    this.NavyQuality = 1 + this.NavyImprovements + this.NavyTech;
    
    this.UpkeepForOneLightShip = ((1/8)*this.NavyQuality) / TimeDivide * (1 + this.Gunports);
    this.UpkeepForOneMediumShip = ((1/4)*this.NavyQuality) / TimeDivide * (1 + this.Gunports);
    this.UpkeepForOneHeavyShip = ((1/2)*this.NavyQuality) / TimeDivide * (1 + this.Gunports + this.Galleons/2);
    
    this.NavyUpkeep = (
      this.LightShips * this.UpkeepForOneLightShip + 
      this.MediumShips * this.UpkeepForOneMediumShip + 
      this.HeavyShips * this.UpkeepForOneHeavyShip
    );

    this.NewTroopRecruitmentPenalty = (function(){
      let uu = 0;
      for (const unitName in UnitUpkeepCosts) {
        const cost = UnitUpkeepCosts[unitName];
        uu += this["New_" + unitName] * cost;
      }
      uu += this.New_LightShips * this.UpkeepForOneLightShip;
      uu += this.New_MediumShips * this.UpkeepForOneMediumShip;
      uu += this.New_HeavyShips * this.UpkeepForOneHeavyShip;
      
      u /= 2;
      return uu;
    })();

    this.ArmyUpkeep = this.UnitUpkeep * ((this.ArmyQuality + this.Corruption / 5) + this.ArmyWages - 1) / TimeDivide;
    
    //Math min and max? nested ternary operations, with "0" if either fail? This can be optimized
    this.MilitaryLoyalty = Math.min(1, Math.max(0,  1* this.ArmyWages + 
    (this.EarlyModernAdministration == false ?
      (this.NobleLoyalty < 0.50 ?
        (this.NobleLoyalty - 0.50) * 2 :
        0)
      :
      0)+ 
    (this.MilitaryMorale < 0.70?
      -(1 - this.MilitaryMorale) / 2 :
      0) + 
    (this.Budget < 0? this.Budget / this.ArmyUpkeep :
    0)
    - this.CommanderFreedom / 10));
    
    this.Stability = this.PopulationHappiness + this.AdministrativeEfficiency / 10 - this.Overextension - this.CulturalDisunity - this.ReligiousDisunity + (this.Propaganda / 1.75 * (1 + this.Newspapers / 2)) + this.PopulationControl + (this.NobleLoyalty - 0.5) * 10 + (this.ClergyLoyalty - 0.5) * 7.5 + (this.BurghersLoyalty - 0.5) * 7.5 + this.PopulationStabilityImpact + this.WarStabilityModifier * 100 + (this.MilitaryLoyalty - 1) * 7.5;
  
    
    this.TradePowerResourceTrade = (function(){
      let num = 0;
      TradePowerResources = [
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
        "Diamonds",
        "Silver",
        "Copper",
        "Ivory",
        "Cocoa",
        "Tobaco",
        "Sugar",
        "ExoticFruit"
      ];
      for (const resourceName in TradePowerResources) {
        const resource = TradePowerResources[resourceName];
        num += this[resource + "Incoming"] * this[resource + "Value"]; 
      }
      return num;
    })();
    this.TradePower = this.TradePowerResourceTrade + this.LocalTrade / 2 + (this.speudoTradePower);
    this.ProductionEfficiency = this.Mercantilism + this.VerticalLoom/5+this.Workshops+this.Cranes/5+this.TextileManufactories/2;
    this.Production = (this.LocalTrade+this.TradePower)*this.Artisans*this.ProductionEfficiency*10;
    this.TradeProtection = this.LightShips * 0.75 + this.MediumShips * 1 + this.HeavyShips * 0.75;
    this.TradeEfficiency = 1 * this.Mercantilism + this.Cranes / 10 + this.PromissoryNotes / 20 + this.TradeProtection/200;
    
    this.Inflation = Math.max(0, (this.Budget / 1000) / (this.AdministrativeEfficiency / 10));
    this.ResourceBudgetBoost = (function(){
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
        if(typeof this[resource + "Inflation"] !== 'undefined') inflation = this[resource + "Inflation"];
        rbb += this["Effective" + resource] * (this[resource + "value"] - inflation);
      }
      return rbb / TimeDivide;
    })();
    
    //missing ResourceBudgetBoost, ArmyUpkeep, TradeRevenue, EffectiveTax, EduationUpkeep, HygieneUpkeep, NavyUpkeep, AgricultureSpending, SocialSpendingUpkeep, SpyUpkeep PopulationControlUpkeep, PropagandaUpkeep, ProductionRevenue, FortUpkeep, AdministrativeUpkeep, ResearchUpkeep, Balance, 
    this.DailyBudget = (this.Budget / (10 - this.AdministrativeEfficiency / 10 + 1) / tis.TimeDivide) / (1 + this.Inflation)+this.ResourceBudgetBoost - this.ArmyUpkeep+this.TradeRevenue+ this.EffectiveTax - this.EduationUpkeep - this.HygieneUpkeep - this.NavyUpkeep - this.AgricultureSpending - this.SocialSpendingUpkeep-this.SpyUpkeep - this.PopulationControlUpkeep - this.PropagandaUpkeep + this.ProductionRevenue-this.FortUpkeep- this.AdministrativeUpkeep-this.ResearchUpkeep + this.Balance- this.NewTroopRecruitmentPenalty;
    this.FutureBudget = this.Budget + this.DailyBudget;
    //Spy Upkeep = Spies/200*Spy Quality/Time Divide;
    //Social Spending Upkeep = Social Spending*Population/1000000/Time Divide*3;
    //Hygiene Upkeep = Health*Population/2000000/Time Divide;
    //Eduation Upkeep = Edu. Efficiency*Population/500000*(1.1-Adm. Efficiency/100)*Edu. cost mod/Time Divide;
    //Agriculture Spending = Agriculture Spending;
    //Propaganda Upkeep = Propaganda*(100-Adm. Efficiency)/100*Population/1000000/Time Divide;
    //Pop. Control Upkeep = Population Control*Population/800000/Time Divide;
    //Trade Revenue = ((Local Trade+Trade power)*(1-Burghers Influence))/Time Divide*Trade Efficiency+Trade profit;
    //ADM Upkeep = Land Administration /Time Divide*2;
    //Production Revenue = Production/Time Divide;
    //Research Upkeep = Research Spending*Population/500000/Time Divide*Literacy (%)/10;
    //Overall Income = (Budget/(10-Adm. Efficiency/10+1)/Time Divide)/(1+Inflation)+Resource Budget Boost+Trade Revenue+Effective Tax+Production Revenue+Balance;
    //= ;
    //
    //
    //
    //free Elite Units cap = ((Overall Numbers-Militia-Levies)*2.5%)-(Elite Cavalry+Elite Infantry);

    //
    //
    
    //
    //Military Morale = MAX(0,MIN(1.5, 1+Fervor+IF(Mil. Discipline>1,-Mil. Discipline+1)*2+IF(War Support<0.5,War Support-0.5)+IF(War Support>0.75, War Support-0.75)+Army //Wages-1));
    //
    //
    //
    //Nation Name = Nation name ;
    //Cultural Advance = SUM(Divine Right to Rule:Newspapers);
    //Cultural Power Gain = (Literacy (%)/3+Pop. Happiness/8)*(Cultural Prosperity+Renaissance Thought/10)/Time Divide;
    //Cultural Power = Cultural Power;
    //Future Cultural Power = MIN(6, (Cultural Power+Cultural Power Gain));
    //
    //
    //
    //
    //Future pop. = Future Pop.;
    //Future Literacy = Future Literacy;
    //Future Budget = Budget+Daily Budget;
    //Future Food = Future Food;
    //Future Research points = Future Research Points;
    //Future Public Length = MAX(0, Public Debt Length+IF(Effective Debt>0,1,0)+IF(Effective Debt0,-100,0));
    //Future Cultural Power = Future Cultural Power;
    //
    //
    //Future Date = Date in this nation+Time Speed;
    //
    //
    //
    //Nation Name = Nation name ;
    //
    //Effective Tax = ((Lower Class*Population*Lower Class Tax/10000+Population*Medium Class*Medium Class Tax/7500*(100%-Clergy Influence-Burghers Influence)+Population*High //Class*High Class Tax/5000*(100%-Noble Influence))*Adm. Efficiency/10*(100%-Noble Influence/4-Clergy Influence/4)*(1-Occupation))/Time Divide*(1-Corruption/10);
    //='All Stats'!AL1 = Possible Public Debt+0.01;
    //Public Debt Length = Public Debt Length;
    //Future Debt Length = Future Public Length;
    //= ;
    //Balance = Budget Incoming-Budget Outgoing;
    //
    //
    //
    //Nations = Nation name ;
    //Stability = Stability;
    //='All Stats'!AN1 = Daily Budget;
    //='All Stats'!P1 = Adm. Efficiency;
    //='All Stats'!Z1 = War Support;
    //MIlitary Expendures = Army Upkeep+Navy Upkeep;
    //D.B + M.E = 'All Stats'!AN1+MIlitary Expendures;
    //
    //
    //
    //Max Pop. = Population/Disease;
    //=
    //= ;

    //
    //
    //
    //Pride of the navy = IF(Naval Power>10000,'ACCESSIBLE');
    //Overall Ship Count = Light Ships+Medium Ships+Heavy Ships;
    //Naval Power = (Light Ships*0.5+Medium Ships+2*Heavy Ships)*Navy Quality;
    //
    //
    //

    //Primary Culture % = 100%-Culture Group %-Accepted Culture %-Undesirable Culture%;
    //Cultural Disunity = (Culture Group %*0.1+Accepted Culture %*0.35+Undesirable Culture%*0.8)*(10+National Sovereignity*2);
    //= ;
    //Population Stability Impact = IF(Population>Adm. Efficiency*500000, (Adm. Efficiency*500000-Population)/50000000)*10;
    //Population Tech Impact = IF(Population>20000000, (Population-20000000)/250000000);
    //
    //
    //=Agriculture!I1 = Farming Efficiency;


    //Resource happiness boost = Effective Cotton-Cotton Inf.+Effective Gold-Gold Inf.+Effective Tea-Tea Inf.+Effective Silk-Silk Inf.+Effective Spice-Spice Inf.+Effective //Wool-Wool Inf.+Effective Coffee-Coffee Inf.+Effective Fur-Fur Inf.+Effective Diamonds-Diamond Inf.+Effective Silver-Silver Inf.+Effective Ivory-Ivory Inf.+Effective //Cocoa-Cocoa Inf.+Effective Tobaco-Tobacco Inf.+Effective Sugar-Sugar Inf.+Effective Ex. Fruit-Ex. Fruit Inf.;
    //
    //
    //
    
    
    //
    //Research boost from Tech = 1+Universities/10+Renaissance Thought/5+Experimentation/5;
    //Research Point Gain = MAX(1 , (Research Spending*Research Effectiveness*Research boost from Tech*Literacy (%)/Isolation/Time Divide*2/10+Research Spending*Research //Effectiveness*Higher Education/Isolation/Time Divide*5/10)*(1-IF(Noble Influence>0.5, Noble Influence-0.5)/1.5-IF(Clergy Influence>0.5, Clergy Influence-0.5)/1.5)*//(1-Population Tech Impact));
    //Research Points = Research Points;
    //Future Research Points = MIN(7.5 ,Research Points+Research Point Gain);
    //= ;
    //= ;
    //= ;
    //= ;
    //= ;
    //= ;
    //= ;
    //= ;
    //= ;
    //= ;
    //= ;
    //= ;
    //= ;
    //= ;
    //= ;
    //= ;
    //
    //
    //
    //
    //Nation Name Influence = Nation name ;
    //Alaska Influence = ;
    //= Alaska Influence/(SUM(B:B)+0.000001);
    //Cascadia Influence = ;
    //= Cascadia Influence/(SUM(D:D)+0.000001);
    //West Coast Influence = ;
    //= West Coast Influence/(SUM(F:F)+0.000001);
    //Hudson Bay Influence = ;
    //= Hudson Bay Influence/(SUM(H:H)+0.000001);
    //Great Lakes Influence = ;
    //= Great Lakes Influence/(SUM(J:J)+0.000001);
    //Mississipi Influence = ;
    //= Mississipi Influence/(SUM(L:L)+0.000001);
    //Gulf of Mexico Influence = ;
    //= Gulf of Mexico Influence/(SUM(N:N)+0.000001);
    //Lawrence Gulf Influence = ;
    //= Lawrence Gulf Influence/(SUM(P:P)+0.000001);
    //East Coast Influence = ;
    //= East Coast Influence/(SUM(R:R)+0.000001);
    //Carribean Influence = ;
    //= Carribean Influence/(SUM(T:T)+0.000001);
    //Central America Influence = ;
    //= Central America Influence/(SUM(V:V)+0.000001);
    //Guyana/Suriname Influence = ;
    //= Guyana/Suriname Influence/(SUM(X:X)+0.000001);
    //Amazon Influence = ;
    //= Amazon Influence/(SUM(Z:Z)+0.000001);
    //Peru Influence = ;
    //= Peru Influence/(SUM(AB:AB)+0.000001);
    //Rio Grande Influence = ;
    //= Rio Grande Influence/(SUM(AD:AD)+0.000001);
    //La Plata Influence = ;
    //= La Plata Influence/(SUM(AF:AF)+0.000001);
    //Chile Influence = ;
    //= Chile Influence/(SUM(AH:AH)+0.000001);
    //Patagonia Influence = ;
    //= Patagonia Influence/(SUM(AJ:AJ)+0.000001);
    //Egypt Influence = ;
    //= Egypt Influence/(SUM(AL:AL)+0.000001);
    //Red Sea Influence = ;
    //= Red Sea Influence/(SUM(AN:AN)+0.000001);
    //West Africa Influence = ;
    //= West Africa Influence/(SUM(AP:AP)+0.000001);
    //Cote d'ivoire Influence = ;
    //= Cote d'ivoire Influence/(SUM(AR:AR)+0.000001);
    //Nigeria Influence = ;
    //= Nigeria Influence/(SUM(AT:AT)+0.000001);
    //South Nile Influence = ;
    //= South Nile Influence/(SUM(AV:AV)+0.000001);
    //Somalia Influence = ;
    //= Somalia Influence/(SUM(AX:AX)+0.000001);
    //Kongo Influence = ;
    //= Kongo Influence/(SUM(AZ:AZ)+0.000001);
    //East Africa Influence = ;
    //= East Africa Influence/(SUM(BB:BB)+0.000001);
    //Mozambique Influence = ;
    //= Mozambique Influence/(SUM(BD:BD)+0.000001);
    //South Africa Influence = ;
    //= South Africa Influence/(SUM(BF:BF)+0.000001);
    //Trade Power NA Influence = *'Trade Zone Wealth'!$A$2+*'Trade Zone Wealth'!$B$2+*'Trade Zone Wealth'!$C$2+*'Trade Zone Wealth'!$D$2+*'Trade Zone Wealth'!$E$2+*'Trade //Zone Wealth'!$F$2+*'Trade Zone Wealth'!$G$2+*'Trade Zone Wealth'!$H$2+*'Trade Zone Wealth'!$I$2+*'Trade Zone Wealth'!$J$2+*'Trade Zone Wealth'!$K$2;


    //
    //
    //
    //Nation Name Influence = Nation name ;
    //Mesopotamia Influence = ;
    //= Mesopotamia Influence/(SUM(B:B)+0.000001);
    //Persian Gulf Influence = ;
    //= Persian Gulf Influence/(SUM(D:D)+0.000001);
    //Caucasus Influence = ;
    //= Caucasus Influence/(SUM(F:F)+0.000001);
    //Don (River) Influence = ;
    //= Don (River) Influence/(SUM(H:H)+0.000001);
    //Volga Influence = ;
    //= Volga Influence/(SUM(J:J)+0.000001);
    //Central Asia Influence = ;
    //= Central Asia Influence/(SUM(L:L)+0.000001);
    //West Siberia Influence = ;
    //= West Siberia Influence/(SUM(N:N)+0.000001);
    //East Siberia Influence = ;
    //= East Siberia Influence/(SUM(P:P)+0.000001);
    //Iran Influence = ;
    //= Iran Influence/(SUM(R:R)+0.000001);
    //Pakistan Influence = ;
    //= Pakistan Influence/(SUM(T:T)+0.000001);
    //Tibet Influence = ;
    //= Tibet Influence/(SUM(V:V)+0.000001);
    //Mongolia Influence = ;
    //= Mongolia Influence/(SUM(X:X)+0.000001);
    //Manchuria Influence = ;
    //= Manchuria Influence/(SUM(Z:Z)+0.000001);
    //Japan Influence = ;
    //= Japan Influence/(SUM(AB:AB)+0.000001);
    //North China Influence = ;
    //= North China Influence/(SUM(AD:AD)+0.000001);
    //Yangtzee River Influence = ;
    //= Yangtzee River Influence/(SUM(AF:AF)+0.000001);
    //South China Influence = ;
    //= South China Influence/(SUM(AH:AH)+0.000001);
    //North India Influence = ;
    //= North India Influence/(SUM(AJ:AJ)+0.000001);
    //West India Influence = ;
    //= West India Influence/(SUM(AL:AL)+0.000001);
    //East India Influence = ;
    //= East India Influence/(SUM(AN:AN)+0.000001);
    //Burma Influence = ;
    //= Burma Influence/(SUM(AP:AP)+0.000001);
    //South-East Asia Influence = ;
    //= South-East Asia Influence/(SUM(AR:AR)+0.000001);
    //North Australia Influence = ;
    //= North Australia Influence/(SUM(AT:AT)+0.000001);
    //South Australia Influence = ;
    //= South Australia Influence/(SUM(AV:AV)+0.000001);

    //
    //
    //
    //Nation Name Influence = Nation name ;
    //North Sea Influence = ;
    //= North Sea Influence/(SUM(B:B)+0.000001);
    //British Isles Influence = ;
    //= British Isles Influence/(SUM(D:D)+0.000001);
    //English Channel Influence = ;
    //= English Channel Influence/(SUM(F:F)+0.000001);
    //France Influence = ;
    //= France Influence/(SUM(H:H)+0.000001);
    //Bay of Biscay Influence = ;
    //= Bay of Biscay Influence/(SUM(J:J)+0.000001);
    //West Iberia Influence = ;
    //= West Iberia Influence/(SUM(L:L)+0.000001);
    //Gibraltar Influence = ;
    //= Gibraltar Influence/(SUM(N:N)+0.000001);
    //West Mediterreanian Influence = ;
    //= West Mediterreanian Influence/(SUM(P:P)+0.000001);
    //Rhine Influence = ;
    //= Rhine Influence/(SUM(R:R)+0.000001);
    //Central Med Influence = ;
    //= Central Med Influence/(SUM(T:T)+0.000001);
    //Adriatic Influence = ;
    //= Adriatic Influence/(SUM(V:V)+0.000001);
    //Germany Influence = ;
    //= Germany Influence/(SUM(X:X)+0.000001);
    //South Germany Influence = ;
    //= South Germany Influence/(SUM(Z:Z)+0.000001);
    //Denmark Influence = ;
    //= Denmark Influence/(SUM(AB:AB)+0.000001);
    //Baltic Influence = ;
    //= Baltic Influence/(SUM(AD:AD)+0.000001);
    //North Nordics Influence = ;
    //= North Nordics Influence/(SUM(AF:AF)+0.000001);
    //Barents Sea Influence = ;
    //= Barents Sea Influence/(SUM(AH:AH)+0.000001);
    //Novgrod Influence = ;
    //= Novgrod Influence/(SUM(AJ:AJ)+0.000001);
    //Poland Influence = ;
    //= Poland Influence/(SUM(AL:AL)+0.000001);
    //Dniepr Influence = ;
    //= Dniepr Influence/(SUM(AN:AN)+0.000001);
    //Crimea Influence = ;
    //= Crimea Influence/(SUM(AP:AP)+0.000001);
    //Balkans Influence = ;
    //= Balkans Influence/(SUM(AR:AR)+0.000001);
    //Greece Influence = ;
    //= Greece Influence/(SUM(AT:AT)+0.000001);
    //North Anatolia Influence = ;
    //= North Anatolia Influence/(SUM(AV:AV)+0.000001);
    //East Med Influence = ;
    //= East Med Influence/(SUM(AX:AX)+0.000001);

    //
    //
    //
    //
    //
    //
    //



  }

  clearNewTroops() {

  }
}


function evaluateNations() {
  for (let i = 0; i < Nations.length; i++) {
    const nation = Nations[i].nationName;
    nation.evaluateNation();
  }
}





