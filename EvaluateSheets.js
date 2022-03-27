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
    let self = this;
    /* #region  Stats to Set Immedietly */
    /* #region  Main */
    self.NationName = "Nation name";
    self.GovernmentName = "Government of " + self.NationName;
    self.Population = 5000000;
    self.LiteracyPercent = 7.50;
    self.HigherEducation = 0.25;
    self.Budget = 250.00;
    self.Food = 100.00;
    self.ResearchPoints = 6.00;
    self.PublicDebtLength = 0;
    self.CulturalPower = 6.00;
    self.DateInThisNation = 1600;
    /* #endregion */

    /* #region  Most Stats */
    self.ReligiousDisunity = 0.00;
    self.Health = 2.00;
    self.EducationEfficiency = 3;
    self.EducationCostModifier = 6;
    self.AdministrativeEfficiency = 30.00;
    self.Propaganda = 0;
    self.SocialSpending = 0;
    self.AtOffensiveWar = false;
    self.AtDefensiveWar = false;

    self.NobleInfluence = 0.55; //Show in percent
    self.NobleLoyalty = [
      {
        to: self.GovernmentName,
        points: 55
      },
      {
        to: "Self Interests",
        points: 45
      }
    ];
    self.ClergyInfluence = 0.25; //Show in percent
    self.ClergyLoyalty = [
      {
        to: self.GovernmentName,
        points: 50
      },
      {
        to: "Self Interests",
        points: 50
      }
    ];
    self.BurghersInfluence = 0.10; //Show in percent
    self.BurghersLoyalty = [
      {
        to: self.GovernmentName,
        points: 50
      },
      {
        to: "Self Interests",
        points: 50
      }
    ];

    self.Absolutism = 0;
    self.PopulationControl = 0;
    self.BirthControl = 0;
    self.LocalTrade = 5.00;
    self.Mercantilism = 1;
    self.Spies = 0;
    self.SpyQuality = 1.2;
    /* #endregion */

    /* #region  Army */
    self.Levies = 0;
    self.LightInfantry = 0;
    self.HeavyInfantry = 0;
    self.Archers = 0;
    self.Crossbowmen = 0;
    self.LightCavalry = 0;
    self.HeavyCavalry = 0;
    self.EliteInfantry = 0;
    self.EliteCavalry = 0;
    self.HandCannon = 0;
    self.Musketeers = 0;
    self.Militia = 0;
    self.SiegeEquipment = 0;
    self.LargeSiegeEquipment = 0;
    self.Cannons = 0;

    self.SmallForts = 0;
    self.MediumForts = 0;
    self.BigForts = 0;
    self.HugeForts = 0;
    self.ExtraCityFortifications = 0;


    self.CommanderFreedom = 0;
    self.ArmyWages = 1;
    self.TrainingQuality = 0.15;
    self.MilitaryTactics = 0.15;
    self.MililtaryDiscipline = 1; //Show In Percent
    /* #endregion */

    /* #region  Navy */
    self.NavyImprovements = 0.30;

    self.LightShips = 0;
    self.MediumShips = 0;
    self.HeavyShips = 0;
    /* #endregion */

    /* #region  Agriculture */
    self.AgricultureSubsidies = 0.05;
    self.Fertility = 0.50;
    self.AgricultureInfrastructure = 1.10;
    self.StockingCapabilities = 1.00;
    self.AgricultureAdvancements = 1.30;
    /* #endregion */

    /* #region  Recruitments / New Troops */
    self.New_Levies = 0;
    self.New_LightInfantry = 0;
    self.New_HeavyInfantry = 0;
    self.New_Archers = 0;
    self.New_Crossbowmen = 0;
    self.New_LightCavalry = 0;
    self.New_HeavyCavalry = 0;
    self.New_EliteInfantry = 0;
    self.New_EliteCavalry = 0;
    self.New_HandCannon = 0;
    self.New_Musketeers = 0;
    self.New_Militia = 0;
    self.New_SiegeEquipment = 0;
    self.New_LargeSiegeEquipment = 0;
    self.New_Cannons = 0;

    self.New_LightShips = 0;
    self.New_MediumShips = 0;
    self.New_HeavyShips = 0;

    
    /* #endregion */

    /* #region  Population */
    self.Artisans = 0.01; //Show In Percent
    self.Clergy = 0.0075; //Show In Percent
    self.Nobility = 0.01; //Show In Percent
    self.Burghers = 0.050; //Show In Percent
    /* #endregion */

    /* #region  Resources */
    self.MiningEfficiency = 1.20;

    self.Coal = 0.00;
    self.Sulphur = 0.00;
    self.Cotton = 0.00;
    self.Gold = 0.00;
    self.Iron = 0;
    self.Tea = 0.00;
    self.Silk = 0;
    self.Spices = 0;
    self.Wool = 0;
    self.Coffee = 0;
    self.Fur = 0;
    self.Diamonds = 0;
    self.Silver = 0;
    self.Copper = 0;
    self.Ivory = 0;
    self.Cocoa = 0;
    self.Tobaco = 0;
    self.Sugar = 0;
    self.ExoticFruit = 0;
    /* #endregion */

    /* #region  Technology */
    self.Isolation = 1;
    self.ResearchSpending = 1.00;
    self.ResearchEffectiveness = 1.00;

    self.Gunpowder = true;
    self.VerticalLoom = true;
    self.SaddleAndStirrup = true;
    self.HorseCollar = true;
    self.Explosives = true;
    self.Firelance = true;
    self.Cranes = true;
    self.PromissoryNotes = true;
    self.Bombards = true;
    self.HandCannons = true;
    self.PlateArmour = true;
    self.SappersAndEngineers = true;
    self.Workshops = true;
    self.StandardizedPikes = true;
    self.Galleons = false;
    self.PrintingPress = false;
    self.Muskets = false;
    self.Limber = false;
    self.Docks = false;
    self.Gunports = false;
    self.Matchlock = false;
    self.StarForts = false;
    self.TextileManufactories = false;
    self.Reiters = false;
    self.MiningCarts = false;
    self.HumanAnatomy = false;
    self.Mortars = false;
    self.Metallurgy = false;
    self.Experimentation = false;
    self.Bayonet = false;
    self.SocketBayonet = false;
    self.Flintlock = false;
    /* #endregion */

    /* #region  Economy */
    self.HighClassTax = 0.12; //As Percentage
    self.MediumClassTax = 0.12; //As Percentage
    self.LowerClassTax = 0.12; //As Percentage
    self.PublicDebtTaken = 0.00;
    self.BudgetIncoming = 0;
    self.BudgetOutgoing = 0;
    /* #endregion */

    /* #region  Cultural Advance */
    self.CulturalProsperity = 1.00;
    self.DivineRighttoRule = true;
    self.Serfdom = true;
    self.Feudalism = true;
    self.Universities = true;
    self.NobleDuty = true;
    self.Courthouses = true;
    self.RenaissanceThought = false;
    self.EarlyModernAdministration = false;
    self.NationalSovereignity = false;
    self.Newspapers = false;
    /* #endregion */

    /* #region  War */
    self.Casualties = 0;
    self.Pillaging = 0; //Show In Percent
    self.Occupation = 0; //Show in Percent
    self.MinorBattles = 0;
    self.MajorBattles = 0;
    /* #endregion */

    /* #region  Trade Influence */
    self.TradeInfluences = {
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
    self.Climates = {
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
    self.DetachedLand = 0.00;
    /* #endregion */
    /* #endregion */

    self.evaluateNation();
  }

  evaluateNation() {
    let self = this;

    self.AgricultureTechnology = 0 + self.HorseCollar / 2;
    self.FarmingEfficiency = 1 + self.AgricultureSubsidies / 5 + self.Fertility - 0.5 + (self.AgricultureInfrastructure - 1) / 10 + (self.AgricultureAdvancements - 1) / 10 + self.AgricultureTechnology / 10;
    self.OverallNumbers = self.Levies + self.LightInfantry + self.HeavyInfantry + self.Archers + self.Crossbowmen + self.LightCavalry + self.HeavyCavalry + self.EliteInfantry + self.Militia + self.EliteCavalry + self.HandCannon + (self.SiegeEquipment + self.LargeSiegeEquipment) * 10;
    self.ConscriptionPercent = self.OverallNumbers / self.Population;
    self.PopulaitonInMilitary = self.ConscriptionPercent;
    self.PopulationInResourceHarvest = (self.Coal + self.Sulphur + self.Cotton + self.Gold + self.Iron + self.Tea + self.Silk + self.Spices + self.Wool + self.Coffee + self.Fur + self.Diamonds + self.Silver + self.Copper) * 20000 / self.Population;
    self.PopulationInAgriculture = 1 - self.PopulaitonInMilitary - self.Artisans - self.Clergy - self.Burghers - self.Nobility - self.PopulationInResourceHarvest;
    self.AgricultureSpending = (self.PopulationInAgriculture * self.Population / 1000 * self.AgricultureInfrastructure / 100 * (1 + self.AgricultureSubsidies / 10) * self.StockingCapabilities) / 2;
    self.DailyFood = self.PopulationInAgriculture * self.Population / 1000 * self.FarmingEfficiency * (1 - self.Pillaging) + self.FoodIncoming - self.FoodOutgoing;
    self.FoodConsumption = self.Population / 1000;
    self.FoodGain = self.DailyFood - self.FoodConsumption;

    self.MaxStock = (function () {
      return Math.max(100, 1000 * self.Population / 10000000) * self.StockingCapabilities;
    })();
    self.Stock = self.Food;
    self.FutureFood = Math.min(self.MaxStock, self.Stock + self.FoodGain);
    self.FoodPopulationBoost = (function () {
      return self.Stock > 500 ? self.Stock / 50000 : 0;
    })();
    self.SurplusFood = (function () {
      return self.FoodGain + self.Stock > self.MaxStock ? self.FoodGain + self.Stock - self.MaxStock : 0;
    })();

    self.speudoTradePower = (function () {
      let stp;
      for (const region in TradeZones) {
        let allNationPoints = 0;
        for (const nation in Nations) {
          allNationPoints += Nations[nation].TradeInfluences[region] !== 'undefined' ? Nations[nation].TradeInfluences[region] : 0;
        }
        let percent = (self.TradeInfluences[region] !== 'undefined' ? self.TradeInfluences[region] : 0) / allNationPoints;
        stp += TradeZones[region] * percent;
      }
      return stp;
    })();
    self.SellingCapability = (self.LocalTrade / 2 + self.speudoTradePower / 5) * self.Mercantilism * 200;
    self.FoodSold = Math.min(self.SellingCapability, self.SurplusFood);
    self.Foodlost = self.SurplusFood - self.FoodSold;
    self.Tradeprofit = self.FoodSold / 50;


    Religion = Religions.Pagan;

    self.Prosperity = 1 + self.SocialSpending / 2.5 + (self.Stock == 0 && self.FutureFood < 0 ? self.FutureFood / 2000 : 0) + (self.Budget < 0.00001 ? self.Budget / 100 : 0) * (1 - self.Pillaging);
    self.Size = (function () {
      let s = 0;
      for (const climate in self.Climates) {
        s += self.Climates[climate].pixels;
      }
      return s;
    })();
    self.Km2 = self.Size*20;
    self.HabitableLand = (function () {
      let hl = 0;

      for (const climate in self.Climates) {
        hl += (self.Climates[climate].pixels / self.Size) * self.Climates[climate].climateScore;
      }

      return hl;
    })();
    self.PopDensityPerKmSquared = self.Population / (self.Km2 * self.HabitableLand);

    self.Disease = self.PopDensityPerKmSquared / 25 - self.Health / 20 - (self.HumanAnatomy ? 0.15 : 0);
    self.UnderPopulation = self.Disease < 0.5 ? (1 - self.Disease) / 10 : 0;

    self.PopulationGrowthModifier = (function () {

      let mod = self.FoodPopulationBoost + (self.Prosperity - 1) / 10 + self.UnderPopulation;

      if (self.Fertility > 0.5) mod += (self.Fertility - 0.5) / 10
      if (self.Population > 2000000) mod += -0.01;
      if (self.Population > 5000000) mod += -0.01;
      if (self.Population > 10000000) mod += -0.01;
      if (self.Population > 15000000) mod += -0.01;
      if (self.Population > 250000) mod += -0.01;
      if (self.Population > 500000) mod += -0.01;
      if (self.Population > 20000000) mod += -0.01;
      if (self.Population > 25000000) mod += -0.01;
      if (self.Population > 40000000) mod += -0.01;
      if (self.Population > 50000000) mod += -0.01;

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
    
    self.UnitUpkeep = (function(){
      let uu = 0;
      for (const unitName in UnitUpkeepCosts) {
        const cost = UnitUpkeepCosts[unitName];
        uu += self[unitName] * cost;
      }
      return uu;
    })();  
    
    self.ArmyTechBoost = (
        self.SaddleAndStirrup + 
        self.Matchlock + 
        self.SocketBayonet + 
        self.Flintlock)
       / 5 + 
      (
        self.Gunpowder + 
        self.PlateArmour + 
        self.StandardizedPikes + 
        self.Muskets + 
        self.Limber + 
        self.Mortars + 
        self.Reiters + 
        self.Metallurgy + 
        self.Bayonet)
      /10 + 
      (
        self.Firelance + 
        self.Bombards + 
        self.HandCannons + 
        self.SappersAndEngineers)
      / 20;
    self.ArmyTech =  1 + self.ArmyTechBoost;
    self.IronShortage = Math.max(0, self.UnitUpkeep / 200 - self.EffectiveIron);
    self.SulphurShortage = Math.max(0, (self.Cannons * 100 + self.Musketeers + self.HandCannon + 
    (self.Reiters == true ? self.LightCavalry + tihs.HeavyCavalry : 0)) / 15000 - self.EffectiveSulphur);
    //missing Corruption
    self.ArmyQuality = Math.max(0.1, 1+ self.TrainingQuality + self.ArmyTech + self.MilitaryTactics + self.CommanderFreedom / 10 - self.IronShortage - self.SulphurShortage -self.Corruption/5);
    self.FortUpkeep = (
      self.SmallForts * 2 + 
      self.MediumForts * 4 + 
      self.BigForts * 8 + 
      self.HugeForts *16 + 
      
      self.ExtraCityFortifications * 5
      ) * self.ArmyQuality/TimeDivide;
    for (const resource in resourceTypes) {
      self["incoming" + resource] = 0;
      self["outgoing" + resource] = 0;

      for (const tradename in Trades) {
        const trade = Trades[tradename];
        if (trade.resource == resource) {
          if (self.NationName == trade.reciever) {
            self["incoming" + resource] += trade.amount;
          } else if (self.NationName == trade.giver) {
            self["outgoing" + resource] += trade.amount;
          }
        }
      }
      
      
      self["Effective" + resource] = (function () {

        return self[resource] * (GatheringEffectiveness(resource) == "Farming" ? self.FarmingEfficiency : self.MiningEfficiency) + self["incoming" + resource] - self["outgoing" + resource];
      })();


      self[resource + "Inflation"] = (function () {

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

        return Math.max(0, self["Effective" + resource] - inflationMod);
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
            return (self.EffectiveIron + self.EffectiveGold + self.EffectiveCopper + self.EffectiveSilver) * 0.5 + (self.Population*self.Health/500000);
          case "Iron":
            return (self.UnitUpkeep+self.FortUpkeep)/50;
          case "Copper":
            return (self.UnitUpkeep+self.FortUpkeep)/100;
        }
      })();

      self[resource + "Demand"] = (self.Population / PopulationDemand) + extraDemands;

      if(resource == "Iron" && self.Metallurgy) self[resource + "Demand"] *= 1.1;

      self[resource + "Value"] = self[resource + "Demand"] / (Math.sqrt(self["Effective" + resource]) + 0.1)
    }

    
    self.ResourcePopulationGrowthBoost = (self.EffectiveCotton - self.CottonInflation + self.EffectiveSpice - self.SpiceInflation + self.EffectiveWool - self.Woolinflation + self.EffectiveFur - self.FurInflation + (self.EffectiveSugar - self.SugarInflation + self.EffectiveExoticFruit - self.ExoticFruitInflation) / 2) / 100;
    self.PopulationGrowth = Math.max(-0.3, (0.1 + self.PopulationGrowthModifier + self.ResourcePopulationGrowthBoost) * (1 - self.Disease) - self.BirthControl / 20);
    self.FuturePopulation = (function () {
      return self.Population + (self.FutureFood < 0 ? self.FutureFood * 1000 : self.Population * self.PopulationGrowth / TimeDivide);
    })();
    self.FutureLiteracy = self.LiteracyPercent > self.EducationEfficiency * 3 ? self.EducationEfficiency * 3 : self.LiteracyPercent + self.EducationEfficiency / 10 / TimeDivide;
    self.FutureHigherEducation = self.HigherEducation + (self.EducationEfficiency >= 3 ? self.EducationEfficiency / 30 : 0) + (self.HigherEducation > self.EducationEfficiency / 3 ? -0.25 : 0);
    self.Corruption = Math.max(0, self.SocialSpending - self.AdministrativeEfficiency / 20) + (self.Stability < 1 ? 0.5 : 0) + (self.Stability < -1 ? 0.5 : 0) +
      Math.max(0, ((self.HighClassTax + self.MediumClassTax + self.LowerClassTax) / 3 * 100) - self.AdministrativeEfficiency / 2) / 10;
    self.HighClass = self.Nobility;
    self.MediumClass = self.Artisans + self.Clergy + self.Burghers;
    self.LowerClass = self.PopulationInAgriculture + self.PopulaitonInMilitary;
    self.InterestRate = 0.05 + self.PublicDebtLength * 0.02 / TimeDivide;
    self.EffectiveDebt = self.PublicDebtTaken * (1 + self.InterestRate);
    self.PublicDebt = self.EffectiveDebt;
    self.PossiblePublicDebt = Math.max(0, self.Population / 10000 * (1 - (self.HighClassTax + self.MediumClassTax + self.LowerClassTax) / 3) - self.PublicDebt);
    self.DebtHappinessEffect = (self.PublicDebtLength > 1 ? self.EffectiveDebt / (self.PossiblePublicDebt + self.PublicDebtTaken) * (2 + self.PublicDebtLength) : 0);
    self.WarExhaustion = (self.Casualties / self.Population * 500) + (self.Pillaging * 20) + (self.Occupation * 5);
    self.PopulationHappiness = (50 + self.ResourceHappinessBoost) * self.Prosperity / 10 - (self.LowerClassTax * self.LowerClass + self.MediumClassTax * self.MediumClass + self.HighClass * self.HighClassTax) * 100 / 4 - self.Absolutism / 2 - self.PopulationControl +
      (self.Mercantilism > 1 ? (-self.Mercantilism + 1) * 2.5 : 0) + (self.PublicDebt > 0 && self.Budget < 0 ? - (self.PublicDebt / self.PossiblePublicDebt) * 10 : 0) - self.WarExhaustion / 2 - self.DebtHappinessEffect + (self.Disease > 0.10 ? - self.Disease / 4 : 0);
    self.LandAdministration = ((self.Size - self.DetachedLand) / 25000 + self.DetachedLand / 10000) * (1 - self.AdministrativeEfficiency / 1000);
    self.Overextension = self.UnderPopulation / 4 + self.LandAdministration / 1.5;

    let pointSum = 0;
    let culturalDisunity = 0;

    for (const culturename in self.CultureGroups) {
      const points = self.CultureGroups[culturename].points;
      pointSum += points;
    }

    for (const OpinionatedCultureName in self.CultureGroups) {
      const OpinionatedCulture = Cultures[OpinionatedCultureName];
      const points = self.CultureGroups[OpinionatedCultureName].points;
      for (const nameOfCultureToBeHadAnOpinionAbout in OpinionnatedCulture.opinions) {
        if (nameOfCultureToBeHadAnOpinionAbout == OpinionatedCultureName) continue; //we don't account for cultures having opinions on themselves
        let opinionScore = OpinionatedCulture.opinions.find(cul => cul.name == nameOfCultureToBeHadAnOpinionAbout);
        if (opinionScore !== undefined) //If the culture to be had an opinion about, isn't recorded by the culture we are currently checking opinions for. Treat the opinion as neutral
          opinionScore = Opinion.Neutral;
        let culturalDisunityFactor = (opinionScore - 100) * (points / pointSum);
        if (OpinionatedCultureName == self.PrimaryCulture) {
          self.PrimaryCulturePercent = (points / pointSum);
          culturalDisunityFactor *= 1.5;
        }
        culturalDisunity += culturalDisunityFactor;
      }
    }
    self.culturalDisunity = culturalDisunity / 100;

    pointSum = 0;
    let religiousDisunity = 0;

    for (const religionname in self.ReligionGroups) {
      const points = self.ReligionGroups[religionname].points;
      pointSum += points;
    }

    for (const OpinionatedReligionName in self.ReligionGroups) {
      const OpinionatedReligion = Religions[OpinionatedReligionName];
      const points = self.ReligionGroups[OpinionatedReligionName].points;
      for (const nameOfReligionToBeHadAnOpinionAbout in OpinionatedReligion.opinions) {
        if (nameOfReligionToBeHadAnOpinionAbout == OpinionatedReligionName) continue; //we don't account for religions having opinions on themselves
        let opinionScore = OpinionatedReligion.opinions.find(rel => rel.name == nameOfReligionToBeHadAnOpinionAbout);
        if (opinionScore !== undefined) //If the religion to be had an opinion about, isn't recorded by the religion we are currently checking opinions for. Treat the opinion as neutral
          opinionScore = Opinion.Neutral;
        let religiousDisunityFactor = (opinionScore - 100) * (points / pointSum);
        if (OpinionatedReligionName == self.PrimaryReligion) {
          self.PrimaryReligionPercent = (points / pointSum);
          religiousDisunityFactor *= 1.5;
        }
        religiousDisunity += religiousDisunityFactor;
      }
    }
    self.culturalDisunity = culturalDisunity / 100;
    self.NobleLoyalty = (function(){
      let pointSum = 0;
      let alliedPoints = 0;
      for (const loyaltyName in self.NobleLoyalty) {
        const loyalty = self.NobleLoyalty[loyaltyName];
        pointSum + loyalty.points;
        if(loyalty.to == self.GovernmentName) alliedPoints = loyalty.points;
      }
      return alliedPoints / pointSum;
    })();
    self.ClergyLoyalty = (function(){
      let pointSum = 0;
      let alliedPoints = 0;
      for (const loyaltyName in self.ClergyLoyalty) {
        const loyalty = self.ClergyLoyalty[loyaltyName];
        pointSum + loyalty.points;
        if(loyalty.to == self.GovernmentName) alliedPoints = loyalty.points;
      }
      return alliedPoints / pointSum;
    })();
    self.BurghersLoyalty = (function(){
      let pointSum = 0;
      let alliedPoints = 0;
      for (const loyaltyName in self.BurghersLoyalty) {
        const loyalty = self.BurghersLoyalty[loyaltyName];
        pointSum + loyalty.points;
        if(loyalty.to == self.GovernmentName) alliedPoints = loyalty.points;
      }
      return alliedPoints / pointSum;
    })();
    self.Fervor = Math.min(1, Math.max(-1, 0 + self.MinorBattles / 20 + self.MajorBattles / 10 + self.Pillaging - (self.Casualties / (self.OverallNumbers + self.Casualties + 0.0000001))));
    self.WarSupport = Math.min(1, Math.max(0, self.PopulationHappiness / 10 * 2.5 + self.Propaganda/10 + self.Fervor));
    self.WarStabilityModifier = ((self.AtOffensiveWar == true && self.WarSupport < 0.75) ? (self.WarSupport - 0.75) / 10 : 0) + Math.max(-0.075, ((self.AtDefensiveWar == true && self.WarSupport < 0.4 && self.Fervor < 0) ? (self.Fervor) / 10 : 0));
    

    self.NavyTech = 0 + self.Galleons / 4 + self.Docks / 2 + self.Gunports / 2;
    self.NavyQuality = 1 + self.NavyImprovements + self.NavyTech;
    
    self.UpkeepForOneLightShip = ((1/8)*self.NavyQuality) / TimeDivide * (1 + self.Gunports);
    self.UpkeepForOneMediumShip = ((1/4)*self.NavyQuality) / TimeDivide * (1 + self.Gunports);
    self.UpkeepForOneHeavyShip = ((1/2)*self.NavyQuality) / TimeDivide * (1 + self.Gunports + self.Galleons/2);
    
    self.NavyUpkeep = (
      self.LightShips * self.UpkeepForOneLightShip + 
      self.MediumShips * self.UpkeepForOneMediumShip + 
      self.HeavyShips * self.UpkeepForOneHeavyShip
    );

    self.NewTroopRecruitmentPenalty = (function(){
      let uu = 0;
      for (const unitName in UnitUpkeepCosts) {
        const cost = UnitUpkeepCosts[unitName];
        uu += self["New_" + unitName] * cost;
      }
      uu += self.New_LightShips * self.UpkeepForOneLightShip;
      uu += self.New_MediumShips * self.UpkeepForOneMediumShip;
      uu += self.New_HeavyShips * self.UpkeepForOneHeavyShip;
      
      uu /= 2;
      return uu;
    })();

    self.ArmyUpkeep = self.UnitUpkeep * ((self.ArmyQuality + self.Corruption / 5) + self.ArmyWages - 1) / TimeDivide;
    
    //Math min and max? nested ternary operations, with "0" if either fail? This can be optimized
    self.MilitaryLoyalty = Math.min(1, Math.max(0,  1* self.ArmyWages + 
    (self.EarlyModernAdministration == false ?
      (self.NobleLoyalty < 0.50 ?
        (self.NobleLoyalty - 0.50) * 2 :
        0)
      :
      0)+ 
    (self.MilitaryMorale < 0.70?
      -(1 - self.MilitaryMorale) / 2 :
      0) + 
    (self.Budget < 0? self.Budget / self.ArmyUpkeep :
    0)
    - self.CommanderFreedom / 10));
    
    self.Stability = self.PopulationHappiness + self.AdministrativeEfficiency / 10 - self.Overextension - self.CulturalDisunity - self.ReligiousDisunity + (self.Propaganda / 1.75 * (1 + self.Newspapers / 2)) + self.PopulationControl + (self.NobleLoyalty - 0.5) * 10 + (self.ClergyLoyalty - 0.5) * 7.5 + (self.BurghersLoyalty - 0.5) * 7.5 + self.PopulationStabilityImpact + self.WarStabilityModifier * 100 + (self.MilitaryLoyalty - 1) * 7.5;
  
    
    self.TradePowerResourceTrade = (function(){
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
        num += self[resource + "Incoming"] * self[resource + "Value"]; 
      }
      return num;
    })();
    self.TradePower = self.TradePowerResourceTrade + self.LocalTrade / 2 + (self.speudoTradePower);
    self.ProductionEfficiency = self.Mercantilism + self.VerticalLoom/5+self.Workshops+self.Cranes/5+self.TextileManufactories/2;
    self.Production = (self.LocalTrade+self.TradePower)*self.Artisans*self.ProductionEfficiency*10;
    self.TradeProtection = self.LightShips * 0.75 + self.MediumShips * 1 + self.HeavyShips * 0.75;
    self.TradeEfficiency = 1 * self.Mercantilism + self.Cranes / 10 + self.PromissoryNotes / 20 + self.TradeProtection/200;
    
    self.Inflation = Math.max(0, (self.Budget / 1000) / (self.AdministrativeEfficiency / 10));
    self.ResourceBudgetBoost = (function(){
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
        if(typeof self[resource + "Inflation"] !== 'undefined') inflation = self[resource + "Inflation"];
        rbb += self["Effective" + resource] * (self[resource + "value"] - inflation);
      }
      return rbb / TimeDivide;
    })();
    
    //missing ResourceBudgetBoost, ArmyUpkeep, TradeRevenue, EffectiveTax, EduationUpkeep, HygieneUpkeep, NavyUpkeep, AgricultureSpending, SocialSpendingUpkeep, SpyUpkeep PopulationControlUpkeep, PropagandaUpkeep, ProductionRevenue, FortUpkeep, AdministrativeUpkeep, ResearchUpkeep, Balance, 
    self.DailyBudget = (self.Budget / (10 - self.AdministrativeEfficiency / 10 + 1) / self.TimeDivide) / (1 + self.Inflation)+self.ResourceBudgetBoost - self.ArmyUpkeep+self.TradeRevenue+ self.EffectiveTax - self.EduationUpkeep - self.HygieneUpkeep - self.NavyUpkeep - self.AgricultureSpending - self.SocialSpendingUpkeep-self.SpyUpkeep - self.PopulationControlUpkeep - self.PropagandaUpkeep + self.ProductionRevenue-self.FortUpkeep- self.AdministrativeUpkeep-self.ResearchUpkeep + self.Balance- self.NewTroopRecruitmentPenalty;
    self.FutureBudget = self.Budget + self.DailyBudget;
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





