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
  ADMUpkeep;
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
  UpkeepForOneLightShips;
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
  CoalSupply;
  CoalDemand;
  CoalValue;

  GoldSupply;
  GoldDemand;
  GoldValue;

  IronSupply;
  IronDemand;
  IronValue;

  SulphurSupply;
  SulphurDemand;
  SulphurValue;

  CottonSupply;
  CottonDemand;
  CottonValue;

  TeaSupply;
  TeaDemand;
  TeaValue;

  SpiceSupply;
  SpiceDemand;
  SpiceValue;

  CopperSupply;
  CopperDemand;
  CopperValue;

  SilkSupply;
  SilkDemand;
  SilkValue;

  WoolSupply;
  WoolDemand;
  WoolValue;

  CoffeeSupply;
  CoffeeDemand;
  CoffeeValue;

  SilverSupply;
  SilverDemand;
  SilverValue;

  DiamondSupply;
  DiamondDemand;
  DiamondValue;

  FurSupply;
  FurDemand;
  FurValue;

  IvorySupply;
  IvoryDemand;
  IvoryValue;

  CocoaSupply;
  CocoaDemand;
  CocoaValue;

  TobacoSupply;
  TobacoDemand;
  TobacoValue;

  SugarSupply;
  SugarDemand;
  SugarValue;

  ExoticFruitSupply;
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
  TextileManfucatories;
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
    this.TextileManfucatories = false;
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
    this.HabitableLand = (function () {
      let hl = 0;

      for (const climate in this.Climates) {
        hl += (this.Climates[climate].pixels / this.Size) * this.Climates[climate].climateScore;
      }

      return hl;
    })();
    this.PopDensityPerKmSquared = this.Population / (this.Size * this.HabitableLand);

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
    //missing effective resource, resource inflation

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

    for (const resource in resources) {
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

        let inflationMod = function () {
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
        }

        return Math.max(0, this["Effective" + resource] - inflationMod());
      })();
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
    
    
    //Production = (Local Trade+Trade power)*Artisans*Production Efficiency*10;
    //Production Efficiency = Mercantilism+Vertical Loom/5+Workshops+Cranes/5+Textile Manfucatories/2;
    //Trade Efficiency = 1*Mercantilism+Cranes/10+Promissory Notes/20+Trade Protection/200;
    //
    //Trade power = Trade Power Resource Trade+Local Trade/2+(Trade Power Americas + Africa+Trade Power Europe+Trade Power Asia);
    //
    //Daily Budget = (Budget/(10-Adm. Efficiency/10+1)/Time Divide)/(1+Inflation)+Resource Budget Boost-Army Upkeep+Trade Revenue+Effective Tax-Eduation Upkeep-Hygiene //Upkeep-Navy Upkeep-Agriculture Spending-Social Spending Upkeep-Spy Upkeep-Pop. Control Upkeep-Propaganda Upkeep+Production Revenue-Fort Upkeep-ADM Upkeep-Research //Upkeep+Balance-Recruitment!Propaganda-Recruitment!War Stability Mod;
    //Budget = Budget;
    //Future Budget = Budget+Daily Budget;
    //Inflation = MAX(0, (Budget/1000)/(Adm. Efficiency/10));
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
    //Unit Upkeep = (Levies*0.75+Light Infantry*2+Heavy Infantry*4+Archers*3+Crossbowmen*2+Light Cavalry*4+Heavy Cavalry*6.5+Elite Infantry*7+Elite Cavalry*8.5+Hand Cannon*5//+Musketeers*3.5+Militia*1.25)/1000+Siege Equipment/10+Large Siege Equipment/5+Cannons/10;

    //
    //
    //Fort Upkeep = (Small Forts*2+Medium Forts*4+Big Forts*8+Huge Forts*16+Extra City Fortifications*5)*Army Quality/Time Divide;
    //Iron Shortage = MAX(0, Unit Upkeep/200-Iron Supply);
    //Sulphur Shortage = MAX(0, (Cannons*100+Musketeers+Hand Cannon+IF(Reiters1, Light Cavalry+Heavy Cavalry))/15000-Sulphur Supply);
    //
    //Army Tech = 1+Army Tech boost;
    //Army Quality = MAX(0.1, 1+Training Quality+Army Tech+Military Tactics+Commander Freedom/10-Iron Shortage-Sulphur Shortage-Corruption/5);
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
    //Nation Name = Nation name ;
    //Km2 = Size*20;
    //Max Pop. = Population/Disease;
    //=
    //= ;

    //
    //
    //
    //Nation Name = Nation name ;
    //Navy Tech = 0+Galleons/4+Docks/2+Gunports/2;
    //Navy Quality = 1+Navy Improvements+Navy Tech;
    //Upkeep for 1 L.S. = ((1/8)*Navy Quality)/Time Divide*(1+Gunports);
    //Upkeep for 1 M.S. = ((1/4)*Navy Quality)/Time Divide*(1+Gunports);
    //Upkeep for 1 H.S. = ((1/2)*Navy Quality)/Time Divide*(1+Gunports+Galleons/2);
    //Pride of the navy = IF(Naval Power>10000,'ACCESSIBLE');
    //Overall Ship Count = Light Ships+Medium Ships+Heavy Ships;
    //Trade Protection = Light Ships*0.75+Medium Ships*1+Heavy Ships*0.75;
    //Naval Power = (Light Ships*0.5+Medium Ships+2*Heavy Ships)*Navy Quality;
    //Navy Upkeep = (Light Ships*Upkeep for 1 L.S.+Medium Ships*Upkeep for 1 M.S.+Heavy Ships*Upkeep for 1 H.S.);
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
    //Resource Budget Boost = (Effective Coal*Coal Value+Effective Sulphur*Sulphur Value+(Effective Gold-Gold Inf.)*Gold Value+Effective Iron*Iron Value+(Effective //Silver-Silver Inf.)*Silver Value+Effective Copper*Copper Value)/Time Divide;
    //
    //
    //
    //Nation = Nation name ;
    //Coal Supply = Effective Coal;
    //Coal Demand = (Iron Supply+Gold Supply+Copper Supply+Silver Supply)*0.5+(Population*Health/500000)+Population/500000;
    //Coal Value = Coal Demand/(SQRT(Coal Supply)+0.1);
    //Gold Supply = Effective Gold;
    //Gold Demand = Population/200000;
    //Gold Value = Gold Demand/(SQRT(Gold Supply)+0.1);
    //Iron Supply = Effective Iron;
    //Iron Demand = ((Unit Upkeep+Fort Upkeep)/50+Population/500000)*(1+Metallurgy/10);
    //Iron Value = Iron Demand/(SQRT(Iron Supply)+0.1);
    //Sulphur Supply = Effective Sulphur;
    //Sulphur Demand = Population/2000000;
    //Sulphur Value = Sulphur Demand/(SQRT(Sulphur Supply)+0.1);
    //Cotton Supply = Effective Cotton;
    //Cotton Demand = Population/500000;
    //Cotton Value = Cotton Demand/(SQRT(Cotton Supply)+0.1);
    //Tea Supply = Effective Tea;
    //Tea Demand = Population/500000;
    //Tea Value = Tea Demand/(SQRT(Tea Supply)+0.1);
    //Spice Supply = Effective Spice;
    //Spice Demand = Population/400000;
    //Spice Value = Spice Demand/(SQRT(Spice Supply)+0.1);
    //Copper Supply = Effective Copper;
    //Copper Demand = (Unit Upkeep+Fort Upkeep)/100+Population/750000;
    //Copper Value = Copper Demand/(SQRT(Copper Supply)+0.1);
    //Silk Supply = Effective Silk;
    //Silk Demand = Population/400000;
    //Silk Value = Silk Demand/(SQRT(Silk Supply)+0.1);
    //Wool Supply = Effective Wool;
    //Wool Demand = Population/700000;
    //Wool Value = Wool Demand/(SQRT(Wool Supply)+0.1);
    //Coffee Supply = Effective Coffee;
    //Coffee Demand = Population/500000;
    //Coffee Value = Coffee Demand/(SQRT(Coffee Supply)+0.1);
    //Silver Supply = Effective Silver;
    //Silver Demand = Population/300000;
    //Silver Value = Silver Demand/(SQRT(Silver Supply)+0.1);
    //Diamond Supply = Effective Diamonds;
    //Diamond Demand = Population/250000;
    //Diamond Value = Diamond Demand/(SQRT(Diamond Supply)+0.1);
    //Fur Supply = Effective Fur;
    //Fur Demand = Population/450000;
    //Fur Value = Fur Demand/(SQRT(Fur Supply)+0.1);
    //Ivory Supply = Effective Ivory;
    //Ivory Demand = Population/250000;
    //Ivory Value = Ivory Demand/(SQRT(Ivory Supply)+0.1);
    //Cocoa Supply = Effective Cocoa;
    //Cocoa Demand = Population/500000;
    //Cocoa Value = Cocoa Demand/(SQRT(Cocoa Supply)+0.1);
    //Tobaco Supply = Effective Tobaco;
    //Tobaco Demand = Population/500000;
    //Tobaco Value = Tobaco Demand/(SQRT(Tobaco Supply)+0.1);
    //Sugar Supply = Effective Sugar;
    //Sugar Demand = Population/350000;
    //Sugar Value = Sugar Demand/(SQRT(Sugar Supply)+0.1);
    //Ex. Fruit Supply = Effective Ex. Fruit;
    //Ex. Fruit Demand = Population/350000;
    //Ex. Fruit Value = Ex. Fruit Demand/(SQRT(Ex. Fruit Supply)+0.1);
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
    //Army Tech boost = (Saddle & Stirrup+Matchlock+Socket Bayonet+Flintlock)/5+(Gunpowder+Plate Armour+Standardized Pikes+Muskets+Limber+Mortars+Reiters+Metallurgy+Bayonet)///10+(Fire lance+Bombards+Hand Cannons+Sappers/Engineers)/20;
    //
    //Trade Power Resource Trade = Sulphur Incoming*Sulphur Value+Coal Incoming*Coal Value+Cotton incoming*Cotton Value+Gold Incoming*Gold Value+Iron incoming*Iron Value+Tea //Incoming*Tea Value+Silk Incoming*Silk Value+Spice Incoming*Spice Value+Wool incoming*Wool Value+Coffee incoming*Coffee Value+Fur Incoming*Fur Value+Diamonds //incoming*Diamond Value+Silver Incoming*Silver Value+Copper Incoming*Copper Value+Ivory Incoming*Ivory Value+Cocoa Incoming*Cocoa Value+Tobaco Incoming*Tobaco Value//+Sugar Incoming*Sugar Value+Ex. Fruit Incoming*Ex. Fruit Value;
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





