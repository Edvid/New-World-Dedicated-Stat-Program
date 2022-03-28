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
  ReligionGroups;  //object of {name: {points: num}, name: {points: num}}
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
    let n = this;
    /* #region  Stats to Set Immedietly */
    /* #region  Main */
    n.NationName = "Nation name";
    n.GovernmentName = "Government of " + n.NationName;
    n.Population = 5000000;
    n.LiteracyPercent = 7.50;
    n.HigherEducation = 0.25;
    n.Budget = 250.00;
    n.Food = 100.00;
    n.ResearchPoints = 6.00;
    n.PublicDebtLength = 0;
    n.CulturalPower = 6.00;
    n.DateInThisNation = 1600;
    /* #endregion */

    /* #region  Most Stats */
    n.ReligiousDisunity = 0.00;
    n.Health = 2.00;
    n.EducationEfficiency = 3;
    n.EducationCostModifier = 6;
    n.AdministrativeEfficiency = 30.00;
    n.Propaganda = 0;
    n.SocialSpending = 0;
    n.AtOffensiveWar = false;
    n.AtDefensiveWar = false;

    n.NobleInfluence = 0.55; //Show in percent
    n.NobleLoyalty = [
      {
        to: n.GovernmentName,
        points: 55
      },
      {
        to: "Self Interests",
        points: 45
      }
    ];
    n.ClergyInfluence = 0.25; //Show in percent
    n.ClergyLoyalty = [
      {
        to: n.GovernmentName,
        points: 50
      },
      {
        to: "Self Interests",
        points: 50
      }
    ];
    n.BurghersInfluence = 0.10; //Show in percent
    n.BurghersLoyalty = [
      {
        to: n.GovernmentName,
        points: 50
      },
      {
        to: "Self Interests",
        points: 50
      }
    ];

    n.Absolutism = 0;
    n.PopulationControl = 0;
    n.BirthControl = 0;
    n.LocalTrade = 5.00;
    n.Mercantilism = 1;
    n.Spies = 0;
    n.SpyQuality = 1.2;
    /* #endregion */

    /* #region  Army */
    n.Levies = 0;
    n.LightInfantry = 0;
    n.HeavyInfantry = 0;
    n.Archers = 0;
    n.Crossbowmen = 0;
    n.LightCavalry = 0;
    n.HeavyCavalry = 0;
    n.EliteInfantry = 0;
    n.EliteCavalry = 0;
    n.HandCannon = 0;
    n.Musketeers = 0;
    n.Militia = 0;
    n.SiegeEquipment = 0;
    n.LargeSiegeEquipment = 0;
    n.Cannons = 0;

    n.SmallForts = 0;
    n.MediumForts = 0;
    n.BigForts = 0;
    n.HugeForts = 0;
    n.ExtraCityFortifications = 0;


    n.CommanderFreedom = 0;
    n.ArmyWages = 1;
    n.TrainingQuality = 0.15;
    n.MilitaryTactics = 0.15;
    n.MililtaryDiscipline = 1; //Show In Percent
    /* #endregion */

    /* #region  Navy */
    n.NavyImprovements = 0.30;

    n.LightShips = 0;
    n.MediumShips = 0;
    n.HeavyShips = 0;
    /* #endregion */

    /* #region  Agriculture */
    n.AgricultureSubsidies = 0.05;
    n.Fertility = 0.50;
    n.AgricultureInfrastructure = 1.10;
    n.StockingCapabilities = 1.00;
    n.AgricultureAdvancements = 1.30;
    /* #endregion */

    /* #region  Recruitments / New Troops */
    n.New_Levies = 0;
    n.New_LightInfantry = 0;
    n.New_HeavyInfantry = 0;
    n.New_Archers = 0;
    n.New_Crossbowmen = 0;
    n.New_LightCavalry = 0;
    n.New_HeavyCavalry = 0;
    n.New_EliteInfantry = 0;
    n.New_EliteCavalry = 0;
    n.New_HandCannon = 0;
    n.New_Musketeers = 0;
    n.New_Militia = 0;
    n.New_SiegeEquipment = 0;
    n.New_LargeSiegeEquipment = 0;
    n.New_Cannons = 0;

    n.New_LightShips = 0;
    n.New_MediumShips = 0;
    n.New_HeavyShips = 0;

    
    /* #endregion */

    /* #region  Population */
    n.Artisans = 0.01; //Show In Percent
    n.Clergy = 0.0075; //Show In Percent
    n.Nobility = 0.01; //Show In Percent
    n.Burghers = 0.050; //Show In Percent
    /* #endregion */

    /* #region  Resources */
    n.MiningEfficiency = 1.20;

    n.Coal = 0.00;
    n.Sulphur = 0.00;
    n.Cotton = 0.00;
    n.Gold = 0.00;
    n.Iron = 0;
    n.Tea = 0.00;
    n.Silk = 0;
    n.Spices = 0;
    n.Wool = 0;
    n.Coffee = 0;
    n.Fur = 0;
    n.Diamonds = 0;
    n.Silver = 0;
    n.Copper = 0;
    n.Ivory = 0;
    n.Cocoa = 0;
    n.Tobaco = 0;
    n.Sugar = 0;
    n.ExoticFruit = 0;
    /* #endregion */

    /* #region  Technology */
    n.Isolation = 1;
    n.ResearchSpending = 1.00;
    n.ResearchEffectiveness = 1.00;

    n.Gunpowder = true;
    n.VerticalLoom = true;
    n.SaddleAndStirrup = true;
    n.HorseCollar = true;
    n.Explosives = true;
    n.Firelance = true;
    n.Cranes = true;
    n.PromissoryNotes = true;
    n.Bombards = true;
    n.HandCannons = true;
    n.PlateArmour = true;
    n.SappersAndEngineers = true;
    n.Workshops = true;
    n.StandardizedPikes = true;
    n.Galleons = false;
    n.PrintingPress = false;
    n.Muskets = false;
    n.Limber = false;
    n.Docks = false;
    n.Gunports = false;
    n.Matchlock = false;
    n.StarForts = false;
    n.TextileManufactories = false;
    n.Reiters = false;
    n.MiningCarts = false;
    n.HumanAnatomy = false;
    n.Mortars = false;
    n.Metallurgy = false;
    n.Experimentation = false;
    n.Bayonet = false;
    n.SocketBayonet = false;
    n.Flintlock = false;
    /* #endregion */

    /* #region  Economy */
    n.HighClassTax = 0.12; //As Percentage
    n.MediumClassTax = 0.12; //As Percentage
    n.LowerClassTax = 0.12; //As Percentage
    n.PublicDebtTaken = 0.00;
    n.BudgetIncoming = 0;
    n.BudgetOutgoing = 0;
    /* #endregion */

    /* #region  Cultural Advance */
    n.CulturalProsperity = 1.00;
    n.DivineRighttoRule = true;
    n.Serfdom = true;
    n.Feudalism = true;
    n.Universities = true;
    n.NobleDuty = true;
    n.Courthouses = true;
    n.RenaissanceThought = false;
    n.EarlyModernAdministration = false;
    n.NationalSovereignity = false;
    n.Newspapers = false;
    /* #endregion */

    /* #region  War */
    n.Casualties = 0;
    n.Pillaging = 0; //Show In Percent
    n.Occupation = 0; //Show in Percent
    n.MinorBattles = 0;
    n.MajorBattles = 0;
    /* #endregion */

    /* #region  Trade Influence */
    n.TradeInfluences = {
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
    n.Climates = {
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
    n.DetachedLand = 0.00;
    /* #endregion */
    /* #endregion */

    n.evaluateNation();
  }

  evaluateNation() {
    let n = this;

    n.AgricultureTechnology = 0 + n.HorseCollar / 2;
    n.FarmingEfficiency = 1 + n.AgricultureSubsidies / 5 + n.Fertility - 0.5 + (n.AgricultureInfrastructure - 1) / 10 + (n.AgricultureAdvancements - 1) / 10 + n.AgricultureTechnology / 10;
    n.OverallNumbers = n.Levies + n.LightInfantry + n.HeavyInfantry + n.Archers + n.Crossbowmen + n.LightCavalry + n.HeavyCavalry + n.EliteInfantry + n.Militia + n.EliteCavalry + n.HandCannon + (n.SiegeEquipment + n.LargeSiegeEquipment) * 10;
    n.ConscriptionPercent = n.OverallNumbers / n.Population;
    n.PopulaitonInMilitary = n.ConscriptionPercent;
    n.PopulationInResourceHarvest = (n.Coal + n.Sulphur + n.Cotton + n.Gold + n.Iron + n.Tea + n.Silk + n.Spices + n.Wool + n.Coffee + n.Fur + n.Diamonds + n.Silver + n.Copper) * 20000 / n.Population;
    n.PopulationInAgriculture = 1 - n.PopulaitonInMilitary - n.Artisans - n.Clergy - n.Burghers - n.Nobility - n.PopulationInResourceHarvest;
    n.AgricultureSpending = (n.PopulationInAgriculture * n.Population / 1000 * n.AgricultureInfrastructure / 100 * (1 + n.AgricultureSubsidies / 10) * n.StockingCapabilities) / 2;
    n.DailyFood = n.PopulationInAgriculture * n.Population / 1000 * n.FarmingEfficiency * (1 - n.Pillaging) + n.FoodIncoming - n.FoodOutgoing;
    n.FoodConsumption = n.Population / 1000;
    n.FoodGain = n.DailyFood - n.FoodConsumption;

    n.MaxStock = (function () {
      return Math.max(100, 1000 * n.Population / 10000000) * n.StockingCapabilities;
    })();
    n.Stock = n.Food;
    n.FutureFood = Math.min(n.MaxStock, n.Stock + n.FoodGain);
    n.FoodPopulationBoost = (function () {
      return n.Stock > 500 ? n.Stock / 50000 : 0;
    })();
    n.SurplusFood = (function () {
      return n.FoodGain + n.Stock > n.MaxStock ? n.FoodGain + n.Stock - n.MaxStock : 0;
    })();

    n.speudoTradePower = (function () {
      let stp;
      for (const region in TradeZones) {
        let allNationPoints = 0;
        for (const nation in Nations) {
          allNationPoints += Nations[nation].TradeInfluences[region] !== 'undefined' ? Nations[nation].TradeInfluences[region] : 0;
        }
        let percent = (n.TradeInfluences[region] !== 'undefined' ? n.TradeInfluences[region] : 0) / allNationPoints;
        stp += TradeZones[region] * percent;
      }
      return stp;
    })();
    n.SellingCapability = (n.LocalTrade / 2 + n.speudoTradePower / 5) * n.Mercantilism * 200;
    n.FoodSold = Math.min(n.SellingCapability, n.SurplusFood);
    n.Foodlost = n.SurplusFood - n.FoodSold;
    n.Tradeprofit = n.FoodSold / 50;


    n.ReligionGroups = {
      "Pagan": {
        points: 100
      }
    };

    n.Prosperity = 1 + n.SocialSpending / 2.5 + (n.Stock == 0 && n.FutureFood < 0 ? n.FutureFood / 2000 : 0) + (n.Budget < 0.00001 ? n.Budget / 100 : 0) * (1 - n.Pillaging);
    n.Size = (function () {
      let s = 0;
      for (const climate in n.Climates) {
        s += n.Climates[climate].pixels;
      }
      return s;
    })();
    n.Km2 = n.Size*20;
    n.HabitableLand = (function () {
      let hl = 0;

      for (const climate in n.Climates) {
        hl += (n.Climates[climate].pixels / n.Size) * n.Climates[climate].climateScore;
      }

      return hl;
    })();
    n.PopDensityPerKmSquared = n.Population / (n.Km2 * n.HabitableLand);

    n.Disease = n.PopDensityPerKmSquared / 25 - n.Health / 20 - (n.HumanAnatomy ? 0.15 : 0);
    n.UnderPopulation = n.Disease < 0.5 ? (1 - n.Disease) / 10 : 0;

    n.PopulationGrowthModifier = (function () {

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
    
    n.UnitUpkeep = (function(){
      let uu = 0;
      for (const unitName in UnitUpkeepCosts) {
        const cost = UnitUpkeepCosts[unitName];
        uu += n[unitName] * cost;
      }
      return uu;
    })();  
    
    n.ArmyTechBoost = (
        n.SaddleAndStirrup + 
        n.Matchlock + 
        n.SocketBayonet + 
        n.Flintlock)
       / 5 + 
      (
        n.Gunpowder + 
        n.PlateArmour + 
        n.StandardizedPikes + 
        n.Muskets + 
        n.Limber + 
        n.Mortars + 
        n.Reiters + 
        n.Metallurgy + 
        n.Bayonet)
      /10 + 
      (
        n.Firelance + 
        n.Bombards + 
        n.HandCannons + 
        n.SappersAndEngineers)
      / 20;
    n.ArmyTech =  1 + n.ArmyTechBoost;
    n.IronShortage = Math.max(0, n.UnitUpkeep / 200 - n.EffectiveIron);
    n.SulphurShortage = Math.max(0, (n.Cannons * 100 + n.Musketeers + n.HandCannon + 
    (n.Reiters == true ? n.LightCavalry + tihs.HeavyCavalry : 0)) / 15000 - n.EffectiveSulphur);
    n.Corruption = Math.max(0, n.SocialSpending - n.AdministrativeEfficiency / 20) + (n.Stability < 1 ? 0.5 : 0) + (n.Stability < -1 ? 0.5 : 0) + Math.max(0, ((n.HighClassTax + n.MediumClassTax + n.LowerClassTax) / 3 * 100) - n.AdministrativeEfficiency / 2) / 10;
    n.ArmyQuality = Math.max(0.1, 1+ n.TrainingQuality + n.ArmyTech + n.MilitaryTactics + n.CommanderFreedom / 10 - n.IronShortage - n.SulphurShortage -n.Corruption/5);
    n.FortUpkeep = (
      n.SmallForts * 2 + 
      n.MediumForts * 4 + 
      n.BigForts * 8 + 
      n.HugeForts *16 + 
      
      n.ExtraCityFortifications * 5
      ) * n.ArmyQuality/TimeDivide;
    for (const resourceIndex in resourceTypes) {
      const resource = resourceTypes[resourceIndex];
      n[resource + "Incoming"] = 0;
      n[resource + "Outgoing"] = 0;

      for (const tradename in Trades) {
        const trade = Trades[tradename];
        if (trade.resource == resource) {
          if (n.NationName == trade.reciever) {
            n[resource + "Incoming"] += trade.amount;
          } else if (n.NationName == trade.giver) {
            n[resource + "Outgoing"] += trade.amount;
          }
        }
      }
      
      n["Effective" + resource] = (function () {

        return n[resource] * (GatheringEffectiveness(resource) == "Farming" ? n.FarmingEfficiency : n.MiningEfficiency) + n[resource + "Incoming"] - n[resource + "Outgoing"];
      })();


      n[resource + "Inflation"] = (function () {

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

        return Math.max(0, n["Effective" + resource] - inflationMod);
      })();

      let PopulationDemand = (function () {
        switch (resource) {
          /*case "Coal":
						return 500000;*/
          case "Sulphur":
						return 2000000;
          /*case "Cotton":
						return 500000;*/
          case "Gold":
						return 200000;
          /*case "Iron":
						return 500000;
          case "Tea":
						return 500000;*/
          case "Silk":
						return 400000;
          case "Spices":
						return 400000;
          case "Wool":
						return 700000;
          /*case "Coffee":
						return 500000;*/
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
          /*case "Cocoa":
						return 500000;
          case "Tobaco":
						return 500000;*/
          case "Sugar":
						return 350000;
          case "ExoticFruit":
            return 350000;
          default:
            return 500000;
        }
      })();

      let extraDemands = (function(){
        switch (resource){
          case "Coal":
            return (n.EffectiveIron + n.EffectiveGold + n.EffectiveCopper + n.EffectiveSilver) * 0.5 + (n.Population*n.Health/500000);
          case "Iron":
            return (n.UnitUpkeep+n.FortUpkeep)/50;
          case "Copper":
            return (n.UnitUpkeep+n.FortUpkeep)/100;
          default:
            return 0;
        }
      })();

      n[resource + "Demand"] = (n.Population / PopulationDemand) + extraDemands;
      console.log(resource + ": " + n[resource + "Demand"]);

      if(resource == "Iron" && n.Metallurgy) n[resource + "Demand"] *= 1.1;

      n[resource + "Value"] = n[resource + "Demand"] / (Math.sqrt(n["Effective" + resource]) + 0.1)
    }

    
    n.ResourcePopulationGrowthBoost = (n.EffectiveCotton - n.CottonInflation + n.EffectiveSpice - n.SpiceInflation + n.EffectiveWool - n.Woolinflation + n.EffectiveFur - n.FurInflation + (n.EffectiveSugar - n.SugarInflation + n.EffectiveExoticFruit - n.ExoticFruitInflation) / 2) / 100;
    n.PopulationGrowth = Math.max(-0.3, (0.1 + n.PopulationGrowthModifier + n.ResourcePopulationGrowthBoost) * (1 - n.Disease) - n.BirthControl / 20);
    n.FuturePopulation = (function () {
      return n.Population + (n.FutureFood < 0 ? n.FutureFood * 1000 : n.Population * n.PopulationGrowth / TimeDivide);
    })();
    n.FutureLiteracy = n.LiteracyPercent > n.EducationEfficiency * 3 ? n.EducationEfficiency * 3 : n.LiteracyPercent + n.EducationEfficiency / 10 / TimeDivide;
    n.FutureHigherEducation = n.HigherEducation + (n.EducationEfficiency >= 3 ? n.EducationEfficiency / 30 : 0) + (n.HigherEducation > n.EducationEfficiency / 3 ? -0.25 : 0);
    
    n.HighClass = n.Nobility;
    n.MediumClass = n.Artisans + n.Clergy + n.Burghers;
    n.LowerClass = n.PopulationInAgriculture + n.PopulaitonInMilitary;
    n.InterestRate = 0.05 + n.PublicDebtLength * 0.02 / TimeDivide;
    n.EffectiveDebt = n.PublicDebtTaken * (1 + n.InterestRate);
    n.PublicDebt = n.EffectiveDebt;
    n.PossiblePublicDebt = Math.max(0, n.Population / 10000 * (1 - (n.HighClassTax + n.MediumClassTax + n.LowerClassTax) / 3) - n.PublicDebt);
    n.DebtHappinessEffect = (n.PublicDebtLength > 1 ? n.EffectiveDebt / (n.PossiblePublicDebt + n.PublicDebtTaken) * (2 + n.PublicDebtLength) : 0);
    n.WarExhaustion = (n.Casualties / n.Population * 500) + (n.Pillaging * 20) + (n.Occupation * 5);
    n.PopulationHappiness = (50 + n.ResourceHappinessBoost) * n.Prosperity / 10 - (n.LowerClassTax * n.LowerClass + n.MediumClassTax * n.MediumClass + n.HighClass * n.HighClassTax) * 100 / 4 - n.Absolutism / 2 - n.PopulationControl +
      (n.Mercantilism > 1 ? (-n.Mercantilism + 1) * 2.5 : 0) + (n.PublicDebt > 0 && n.Budget < 0 ? - (n.PublicDebt / n.PossiblePublicDebt) * 10 : 0) - n.WarExhaustion / 2 - n.DebtHappinessEffect + (n.Disease > 0.10 ? - n.Disease / 4 : 0);
    n.LandAdministration = ((n.Size - n.DetachedLand) / 25000 + n.DetachedLand / 10000) * (1 - n.AdministrativeEfficiency / 1000);
    n.Overextension = n.UnderPopulation / 4 + n.LandAdministration / 1.5;

    let pointSum = 0;
    let culturalDisunity = 0;

    for (const culturename in n.CultureGroups) {
      const points = n.CultureGroups[culturename].points;
      pointSum += points;
    }

    for (const OpinionatedCultureName in n.CultureGroups) {
      const OpinionatedCulture = Cultures[OpinionatedCultureName];
      const points = n.CultureGroups[OpinionatedCultureName].points;
      for (const nameOfCultureToBeHadAnOpinionAbout in OpinionnatedCulture.opinions) {
        if (nameOfCultureToBeHadAnOpinionAbout == OpinionatedCultureName) continue; //we don't account for cultures having opinions on themselves
        let opinionScore = OpinionatedCulture.opinions.find(cul => cul.name == nameOfCultureToBeHadAnOpinionAbout);
        if (opinionScore !== undefined) //If the culture to be had an opinion about, isn't recorded by the culture we are currently checking opinions for. Treat the opinion as neutral
          opinionScore = Opinion.Neutral;
        let culturalDisunityFactor = (opinionScore - 100) * (points / pointSum);
        if (OpinionatedCultureName == n.PrimaryCulture) {
          n.PrimaryCulturePercent = (points / pointSum);
          culturalDisunityFactor *= 1.5;
        }
        culturalDisunity += culturalDisunityFactor;
      }
    }
    n.culturalDisunity = culturalDisunity / 100;

    pointSum = 0;
    let religiousDisunity = 0;

    for (const religionname in n.ReligionGroups) {
      const points = n.ReligionGroups[religionname].points;
      pointSum += points;
    }

    for (const OpinionatedReligionName in n.ReligionGroups) {
      const OpinionatedReligion = n.ReligionGroups[OpinionatedReligionName];
      const points = n.ReligionGroups[OpinionatedReligionName].points;
      for (const nameOfReligionToBeHadAnOpinionAbout in OpinionatedReligion.opinions) {
        if (nameOfReligionToBeHadAnOpinionAbout == OpinionatedReligionName) continue; //we don't account for religions having opinions on themselves
        let opinionScore = OpinionatedReligion.opinions.find(rel => rel.name == nameOfReligionToBeHadAnOpinionAbout);
        if (opinionScore !== undefined) //If the religion to be had an opinion about, isn't recorded by the religion we are currently checking opinions for. Treat the opinion as neutral
          opinionScore = Opinion.Neutral;
        let religiousDisunityFactor = (opinionScore - 100) * (points / pointSum);
        if (OpinionatedReligionName == n.PrimaryReligion) {
          n.PrimaryReligionPercent = (points / pointSum);
          religiousDisunityFactor *= 1.5;
        }
        religiousDisunity += religiousDisunityFactor;
      }
    }
    n.culturalDisunity = culturalDisunity / 100;
    n.NobleLoyalty = (function(){
      let pointSum = 0;
      let alliedPoints = 0;
      for (const loyaltyName in n.NobleLoyalty) {
        const loyalty = n.NobleLoyalty[loyaltyName];
        pointSum + loyalty.points;
        if(loyalty.to == n.GovernmentName) alliedPoints = loyalty.points;
      }
      return alliedPoints / pointSum;
    })();
    n.ClergyLoyalty = (function(){
      let pointSum = 0;
      let alliedPoints = 0;
      for (const loyaltyName in n.ClergyLoyalty) {
        const loyalty = n.ClergyLoyalty[loyaltyName];
        pointSum + loyalty.points;
        if(loyalty.to == n.GovernmentName) alliedPoints = loyalty.points;
      }
      return alliedPoints / pointSum;
    })();
    n.BurghersLoyalty = (function(){
      let pointSum = 0;
      let alliedPoints = 0;
      for (const loyaltyName in n.BurghersLoyalty) {
        const loyalty = n.BurghersLoyalty[loyaltyName];
        pointSum + loyalty.points;
        if(loyalty.to == n.GovernmentName) alliedPoints = loyalty.points;
      }
      return alliedPoints / pointSum;
    })();
    n.Fervor = Math.min(1, Math.max(-1, 0 + n.MinorBattles / 20 + n.MajorBattles / 10 + n.Pillaging - (n.Casualties / (n.OverallNumbers + n.Casualties + 0.0000001))));
    n.WarSupport = Math.min(1, Math.max(0, n.PopulationHappiness / 10 * 2.5 + n.Propaganda/10 + n.Fervor));
    n.WarStabilityModifier = ((n.AtOffensiveWar == true && n.WarSupport < 0.75) ? (n.WarSupport - 0.75) / 10 : 0) + Math.max(-0.075, ((n.AtDefensiveWar == true && n.WarSupport < 0.4 && n.Fervor < 0) ? (n.Fervor) / 10 : 0));
    

    n.NavyTech = 0 + n.Galleons / 4 + n.Docks / 2 + n.Gunports / 2;
    n.NavyQuality = 1 + n.NavyImprovements + n.NavyTech;
    
    n.UpkeepForOneLightShip = ((1/8)*n.NavyQuality) / TimeDivide * (1 + n.Gunports);
    n.UpkeepForOneMediumShip = ((1/4)*n.NavyQuality) / TimeDivide * (1 + n.Gunports);
    n.UpkeepForOneHeavyShip = ((1/2)*n.NavyQuality) / TimeDivide * (1 + n.Gunports + n.Galleons/2);
    
    n.NavyUpkeep = (
      n.LightShips * n.UpkeepForOneLightShip + 
      n.MediumShips * n.UpkeepForOneMediumShip + 
      n.HeavyShips * n.UpkeepForOneHeavyShip
    );

    n.NewTroopRecruitmentPenalty = (function(){
      let ntrp = 0;
      for (const unitName in UnitUpkeepCosts) {
        const cost = UnitUpkeepCosts[unitName];
        ntrp += n["New_" + unitName] * cost;
      }
      ntrp += n.New_LightShips * n.UpkeepForOneLightShip;
      ntrp += n.New_MediumShips * n.UpkeepForOneMediumShip;
      ntrp += n.New_HeavyShips * n.UpkeepForOneHeavyShip;
      
      ntrp /= 2;
      return ntrp;
    })();

    n.ArmyUpkeep = n.UnitUpkeep * ((n.ArmyQuality + n.Corruption / 5) + n.ArmyWages - 1) / TimeDivide;
    
    //Math min and max? nested ternary operations, with "0" if either fail? This can be optimized
    n.MilitaryLoyalty = Math.min(1, Math.max(0,  1* n.ArmyWages + 
    (n.EarlyModernAdministration == false ?
      (n.NobleLoyalty < 0.50 ?
        (n.NobleLoyalty - 0.50) * 2 :
        0)
      :
      0)+ 
    (n.MilitaryMorale < 0.70?
      -(1 - n.MilitaryMorale) / 2 :
      0) + 
    (n.Budget < 0? n.Budget / n.ArmyUpkeep :
    0)
    - n.CommanderFreedom / 10));
    
    n.Stability = n.PopulationHappiness + n.AdministrativeEfficiency / 10 - n.Overextension - n.CulturalDisunity - n.ReligiousDisunity + (n.Propaganda / 1.75 * (1 + n.Newspapers / 2)) + n.PopulationControl + (n.NobleLoyalty - 0.5) * 10 + (n.ClergyLoyalty - 0.5) * 7.5 + (n.BurghersLoyalty - 0.5) * 7.5 + n.PopulationStabilityImpact + n.WarStabilityModifier * 100 + (n.MilitaryLoyalty - 1) * 7.5;
  
    
    n.TradePowerResourceTrade = (function(){
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
        num += n[resource + "Incoming"] * n[resource + "Value"]; 
      }
      return num;
    })();
    console.log(n.TradePowerResourceTrade);
    n.TradePower = n.TradePowerResourceTrade + n.LocalTrade / 2 + (n.speudoTradePower);
    n.ProductionEfficiency = n.Mercantilism + n.VerticalLoom/5+n.Workshops+n.Cranes/5+n.TextileManufactories/2;
    n.Production = (n.LocalTrade+n.TradePower)*n.Artisans*n.ProductionEfficiency*10;
    n.TradeProtection = n.LightShips * 0.75 + n.MediumShips * 1 + n.HeavyShips * 0.75;
    n.TradeEfficiency = 1 * n.Mercantilism + n.Cranes / 10 + n.PromissoryNotes / 20 + n.TradeProtection/200;
    
    n.Inflation = Math.max(0, (n.Budget / 1000) / (n.AdministrativeEfficiency / 10));
    n.ResourceBudgetBoost = (function(){
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
        if(typeof n[resource + "Inflation"] !== 'undefined') inflation = n[resource + "Inflation"];
        rbb += n["Effective" + resource] * (n[resource + "value"] - inflation);
      }
      return rbb / TimeDivide;
    })();
    
    n.TradeRevenue = ((n.LocalTrade + n.Tradepower) * (1 - n.BurghersInfluence)) / TimeDivide * n.TradeEfficiency + n.Tradeprofit;
    n.EffectiveTax = (
      (
        n.LowerClass * n.Population * n.LowerClassTax / 10000 + 
        n. Population * n.MediumClass * n.MediumClassTax / 7500 * (1 - n.ClergyInfluence - n.BurghersInfluence) + n.Population * n.HighClass * n.HighClassTax / 5000 * (1 - n.NobleInfluence)
      ) * n.AdministrativeEfficiency / 10 * (1 - n.NobleInfluence / 4 - n.ClergyInfluence / 4
    ) * (1 - n.Occupation)) / TimeDivide * (1 - n.Corruption / 10);
    
    n.SpyUpkeep = n.Spies / 200 * n.SpyQuality / TimeDivide;
    n.SocialSpendingUpkeep = n.SocialSpending * n.Population / 1000000 / TimeDivide * 3;
    n.HygieneUpkeep = n.Health * n.Population / 2000000 / TimeDivide;
    n.EducationUpkeep = n.EducationEfficiency * n.Population / 500000 * (1.1 - n.AdministrativeEfficiency / 100) * n.EducationCostModifier / TimeDivide;
    n.PropagandaUpkeep = n.Propaganda * (100 - n.AdministrativeEfficiency) / 100 * n.Population / 1000000 / TimeDivide;
    n.PopulationControlUpkeep = n.PopulationControl * n.Population / 800000 / TimeDivide;
    n.AdministrativeUpkeep = n.LandAdministration / TimeDivide * 2;
    n.ProductionRevenue = n.Production / TimeDivide;
    n.ResearchUpkeep = n.ResearchSpending * n.Population / 500000 / TimeDivide * n.LiteracyPercent / 10;
    n.Balance = n.BudgetIncoming - n.BudgetOutgoing;
    
    n.DailyBudget = (n.Budget / (10 - n.AdministrativeEfficiency / 10 + 1) / n.TimeDivide) / (1 + n.Inflation)+n.ResourceBudgetBoost - n.ArmyUpkeep+n.TradeRevenue+ n.EffectiveTax - n.EducationUpkeep - n.HygieneUpkeep - n.NavyUpkeep - n.AgricultureSpending - n.SocialSpendingUpkeep-n.SpyUpkeep - n.PopulationControlUpkeep - n.PropagandaUpkeep + n.ProductionRevenue-n.FortUpkeep- n.AdministrativeUpkeep-n.ResearchUpkeep + n.Balance- n.NewTroopRecruitmentPenalty;
    n.FutureBudget = n.Budget + n.DailyBudget;
    
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
    //='All Stats'!AL1 = Possible Public Debt+0.01;
    //Public Debt Length = Public Debt Length;
    //Future Debt Length = Future Public Length;
    //= ;
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





