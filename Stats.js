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
  resource; //can include food or budget
  amount;
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
  NobleLoyalty;
  ClergyInfluence;
  ClergyLoyaltyGroups;
  ClergyLoyalty;
  BurghersInfluence;
  BurghersLoyaltyGroups;
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

  TradePowerResourceTrade;
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
    this.GovernmentName = "Government of " + nationName.split(/(?<=[a-zA-Z])(?=[A-Z])/gm).join(" ");;
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
    this.DateInThisNation = 1600;
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
    "Self Interests": "45"\
    }`);
    
    this.ClergyInfluence = 0.25; //Show in percent
    this.ClergyLoyaltyGroups = JSON.parse(`{\
    "${n.GovernmentName}": "50",\
    "Self Interests": "50"\
    }`);
    
    this.BurghersInfluence = 0.10; //Show in percent
    this.BurghersLoyaltyGroups = JSON.parse(`{\
    "${n.GovernmentName}": "50",\
    "Self Interests": "50"\
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
      Burghers: 0.05
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




      NorthAnatolia: { TradingPoints: 0 },
      NorthSea: { TradingPoints: 0 },
      BritishIsles: { TradingPoints: 0 },
      EnglishChannel: { TradingPoints: 0 },
      France: { TradingPoints: 0 },
      BayOfBiscay: { TradingPoints: 0 },
      WestIberia: { TradingPoints: 0 },
      Gibraltar: { TradingPoints: 0 },
      WestMediterreanian: { TradingPoints: 0 },
      Rhine: { TradingPoints: 0 },
      CentralMed: { TradingPoints: 0 },
      Adriatic: { TradingPoints: 0 },
      Germany: { TradingPoints: 0 },
      SouthGermany: { TradingPoints: 0 },
      Denmark: { TradingPoints: 0 },
      Baltic: { TradingPoints: 0 },
      NorthNordics: { TradingPoints: 0 },
      BarentsSea: { TradingPoints: 0 },
      Novgorod: { TradingPoints: 0 },
      Poland: { TradingPoints: 0 },
      Dniepr: { TradingPoints: 0 },
      Crimea: { TradingPoints: 0 },
      Balkans: { TradingPoints: 0 },
      Greece: { TradingPoints: 0 },
      EastMed: { TradingPoints: 0 },
      Egypt: { TradingPoints: 0 },
      RedSea: { TradingPoints: 0 },
      WestAfrica: { TradingPoints: 0 },
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
      YangtzeeRiver: { TradingPoints: 0 },
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
      "Polar Desert": {
        Pixels: 0,
        ClimateScore: 0,
      },
      "Taiga/Tundra": {
        Pixels: 0,
        ClimateScore: 0.25,
      },
      "Montane Forest": {
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
      "Sub-Tropical": {
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
      "Coastal Desert": {
        Pixels: 0,
        ClimateScore: 0.35
      },

    };
    this.DetachedLand = 0.00;
    /* #endregion */
    /* #endregion */

    this.evaluateNation();
  }

  evaluateNation() {
    let n = this;

    this.AgricultureTechnology = 0 + this.Technologies.HorseCollar / 2;
    this.FarmingEfficiency = 1 + this.AgricultureSubsidies / 5 + this.Fertility - 0.5 + (this.AgricultureInfrastructure - 1) / 10 + (this.AgricultureAdvancements - 1) / 10 + this.AgricultureTechnology / 10;
    this.OverallNumbers = this.Levies + this.LightInfantry + this.HeavyInfantry + this.Archers + this.Crossbowmen + this.LightCavalry + this.HeavyCavalry + this.EliteInfantry + this.Militia + this.EliteCavalry + this.HandCannon + (this.SiegeEquipment + this.LargeSiegeEquipment) * 10;
    this.ConscriptionPercent = this.OverallNumbers / this.Population;
    this.Workforces["Population In Military"] = this.ConscriptionPercent;
    this.Workforces["Population In Resource Harvest"] = (this.Coal + this.Sulphur + this.Cotton + this.Gold + this.Iron + this.Tea + this.Silk + this.Spice + this.Wool + this.Coffee + this.Fur + this.Diamond + this.Silver + this.Copper) * 20000 / this.Population;
    this.Workforces["Population In Agriculture"] = 1 - this.Workforces["Population In Military"] - this.Workforces.Artisans - this.Workforces.Clergy - this.Workforces.Burghers - this.Workforces.Nobility - this.Workforces["Population In Resource Harvest"];
    this.AgricultureSpending = (this.Workforces["Population In Agriculture"] * this.Population / 1000 * this.AgricultureInfrastructure / 100 * (1 + this.AgricultureSubsidies / 10) * this.StockingCapabilities) / 2;

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

    this.DailyFood = this.Workforces["Population In Agriculture"] * this.Population / 1000 * this.FarmingEfficiency * (1 - this.Pillaging) + this.FoodIncoming - this.FoodOutgoing;
    this.FoodConsumption = this.Population / 1000;
    this.FoodGain = this.DailyFood - this.FoodConsumption;

    this.MaxFoodStock = (function () {
      return max(100, 1000 * n.Population / 10000000) * n.StockingCapabilities;
    })();
    this.FutureFood = min(this.MaxFoodStock, this.Food + this.FoodGain);
    this.FoodPopulationBoost = (function () {
      return n.Food > 500 ? n.Food / 50000 : 0;
    })();
    this.SurplusFood = (function () {
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
        let thispoint = n.TradeInfluences[region].TradingPoints;
        let percent = allNationPoints != 0 ? 
          (
            ((typeof thispoint !== 'undefined') ? thispoint : 0
          ) / allNationPoints) 
          : 0;
        stp += gameStats.TradeZones[region] * percent;
      }
      return stp;
    })();
    this.SellingCapability = (this.LocalTrade / 2 + pseudoTradePower / 5) * this.Mercantilism * 200;
    this.FoodSold = min(this.SellingCapability, this.SurplusFood);
    this.Foodlost = this.SurplusFood - this.FoodSold;
    this.TradeProfit = this.FoodSold / 50;

    this.Prosperity = 1 + this.SocialSpending / 2.5 + (this.Food == 0 && this.FutureFood < 0 ? this.FutureFood / 2000 : 0) + (this.Budget < 0.00001 ? this.Budget / 100 : 0) * (1 - this.Pillaging);
    this.Size = (function () {
      let s = 0;
      for (const climate in n.Climates) {
        s += n.Climates[climate].Pixels;
      }
      return s;
    })();
    this.KmSquared = this.Size != 0 ? this.Size * 20 : 78870; //But Please specify Size as soon as possible in game
    this.HabitableLand = (function () {
      if (n.Size == 0) return 0.8;
      let hl = 0;

      for (const climate in n.Climates) {
        hl += (n.Climates[climate].Pixels / n.Size) * n.Climates[climate].ClimateScore;
      }

      return hl;
    })();
    this.PopulationDensityPerKmSquared = this.Population / (this.KmSquared * this.HabitableLand);

    this.Disease = this.PopulationDensityPerKmSquared / 25 - this.Health / 20 - (this.Technologies.HumanAnatomy ? 0.15 : 0);
    this.UnderPopulation = this.Disease < 0.5 ? (1 - this.Disease) / 10 : 0;

    let PopulationGrowthModifier = (function () {

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

    this.UnitUpkeep = (function () {
      let uu = 0;
      for (const unitName in gameStats.UnitUpkeepCosts) {
        const cost = gameStats.UnitUpkeepCosts[unitName];
        uu += n[unitName] * cost;
      }
      return uu;
    })();

    this.ArmyTechBoost = (
      this.Technologies.SaddleAndStirrup +
      this.Technologies.Matchlock +
      this.Technologies.SocketBayonet +
      this.Technologies.Flintlock)
      / 5 +
      (
        this.Technologies.Gunpowder +
        this.Technologies.PlateArmour +
        this.Technologies.StandardizedPikes +
        this.Technologies.Muskets +
        this.Technologies.Limber +
        this.Technologies.Mortars +
        this.Technologies.Reiters +
        this.Technologies.Metallurgy +
        this.Technologies.Bayonet)
      / 10 +
      (
        this.Technologies.Firelance +
        this.Technologies.Bombards +
        this.Technologies.HandCannons +
        this.Technologies.SappersAndEngineers)
      / 20;
    this.ArmyTech = 1 + this.ArmyTechBoost;


    
    this.IronShortage = max(0, this.UnitUpkeep / 200 - this.EffectiveIron);
    this.SulphurShortage = max(0, (this.Cannons * 100 + this.Musketeers + this.HandCannon +
      (this.Technologies.Reiters == true ? this.LightCavalry + this.HeavyCavalry : 0)) / 15000 - this.EffectiveSulphur);

    this.ResourceHappinessBoost =
      this.EffectiveCotton - this.CottonInflation +
      this.EffectiveGold - this.GoldInflation +
      this.EffectiveTea - this.TeaInflation +
      this.EffectiveSilk - this.SilkInflation +
      this.EffectiveSpice - this.SpiceInflation +
      this.EffectiveWool - this.WoolInflation +
      this.EffectiveCoffee - this.CoffeeInflation +
      this.EffectiveFur - this.FurInflation +
      this.EffectiveDiamond - this.DiamondInflation +
      this.EffectiveSilver - this.SilverInflation +
      this.EffectiveIvory - this.IvoryInflation +
      this.EffectiveCocoa - this.CocoaInflation +
      this.EffectiveTobacco - this.TobaccoInflation +
      this.EffectiveSugar - this.SugarInflation +
      this.EffectiveExoticFruit - this.ExoticFruitInflation;

    this.SocietalClasses.High = this.Workforces.Nobility;
    this.SocietalClasses.Medium = this.Workforces.Artisans + this.Workforces.Clergy + this.Workforces.Burghers;
    this.SocietalClasses.Lower = this.Workforces["Population In Agriculture"] + this.Workforces["Population In Military"];
    this.InterestRate = 0.05 + this.PublicDebtLength * 0.02 / gameStats.TimeDivide;
    this.EffectiveDebt = this.PublicDebtTaken * (1 + this.InterestRate);
    this.PossiblePublicDebt = max(0, this.Population / 10000 * (1 - (this.HighClassTax + this.MediumClassTax + this.LowerClassTax) / 3) - this.EffectiveDebt);
    this.DebtHappinessEffect = (this.PublicDebtLength > 1 ? this.EffectiveDebt / (this.PossiblePublicDebt + this.PublicDebtTaken) * (2 + this.PublicDebtLength) : 0);
    this.WarExhaustion = (this.Casualties / this.Population * 500) + (this.Pillaging * 20) + (this.Occupation * 5);

    this.PopulationHappiness = (50 + this.ResourceHappinessBoost) * this.Prosperity / 10 - (this.LowerClassTax * this.SocietalClasses.Lower + this.MediumClassTax * this.SocietalClasses.Medium + this.SocietalClasses.High * this.HighClassTax) * 100 / 4 - this.Absolutism / 2 - this.PopulationControl +
      (this.Mercantilism > 1 ? (-this.Mercantilism + 1) * 2.5 : 0) + (this.EffectiveDebt > 0 && this.Budget < 0 ? - (this.EffectiveDebt / this.PossiblePublicDebt) * 10 : 0) - this.WarExhaustion / 2 - this.DebtHappinessEffect + (this.Disease > 0.10 ? - this.Disease / 4 : 0);
    this.LandAdministration = ((this.Size - this.DetachedLand) / 25000 + this.DetachedLand / 10000) * (1 - this.AdministrativeEfficiency / 1000);
    this.Overextension = this.UnderPopulation / 4 + this.LandAdministration / 1.5;
    
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
          //If the social behaviour group to be had an opinion about is also not present in the nation either, this also doesn't add to the disunity
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
              opinionScore = opinionScore.Score;
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
      this.CultureGroups, 
      gameStats.Cultures, 
      typeof this.CultureRepresentedAtGovernmentLevel !== 'undefined' ? this.CultureRepresentedAtGovernmentLevel : null
      );
    let religionCalc = SocialBehaviourCalc(
      this.ReligionGroups, 
      gameStats.Religions, 
      typeof this.ReligionRepresentedAtGovernmentLevel !== 'undefined' ? this.ReligionRepresentedAtGovernmentLevel : null
      );

    this.CultureRepresentedAtGovernmentLevelPercent =  cultureCalc.GovernmentRepresentationPercent;
    this.CulturalDisunity = cultureCalc.disunity;
    this.ReligionRepresentedAtGovernmentLevelPercent = religionCalc.GovernmentRepresentationPercent;
    this.ReligiousDisunity = religionCalc.GovernmentRepresentationPercent;

    this.NobleLoyalty = (function () {
      let pointSum = 0;
      for (const loyaltyName in n.NobleLoyaltyGroups) {
        const loyalty = n.NobleLoyaltyGroups[loyaltyName];
        pointSum += +loyalty;
        if (loyaltyName == n.GovernmentName) n.NobleLoyalty = loyalty;
      }
      return n.NobleLoyalty / pointSum;
    })();
    this.ClergyLoyalty = (function () {
      let pointSum = 0;
      for (const loyaltyName in n.ClergyLoyaltyGroups) {
        const loyalty = n.ClergyLoyaltyGroups[loyaltyName];
        pointSum += +loyalty;
        if (loyaltyName == n.GovernmentName) n.ClergyLoyalty = loyalty;
      }
      return n.ClergyLoyalty / pointSum;
    })();
    this.BurghersLoyalty = (function () {
      let pointSum = 0;
      for (const loyaltyName in n.BurghersLoyaltyGroups) {
        const loyalty = n.BurghersLoyaltyGroups[loyaltyName];
        pointSum += +loyalty;
        if (loyaltyName == n.GovernmentName) n.BurghersLoyalty = loyalty;
      }
      return n.BurghersLoyalty / pointSum;
    })();
    this.PopulationStabilityImpact = (this.Population > this.AdministrativeEfficiency * 500000 ? (this.AdministrativeEfficiency * 500000 - this.Population) / 50000000 : 0) * 10;
    this.Fervor = clamp(1, -1, 0 + this.MinorBattles / 20 + this.MajorBattles / 10 + this.Pillaging - (this.Casualties / (this.OverallNumbers + this.Casualties + 0.0000001)));
    this.WarSupport = clamp(1, 0, this.PopulationHappiness / 10 * 2.5 + this.Propaganda / 10 + this.Fervor);
    let WarStabilityModifier = ((this.AtWar.toLowerCase() == 'offensive' && this.WarSupport < 0.75) ? (this.WarSupport - 0.75) / 10 : 0) + max(-0.075, ((this.AtWar.toLowerCase() == 'defensive' && this.WarSupport < 0.4 && this.Fervor < 0) ? (this.Fervor) / 10 : 0));
    //min and max? nested ternary operations, with "0" if either fail? This can be optimized
    this.MilitaryLoyalty = clamp(1, 0, 
      1 * this.ArmyWages +
      (this.CulturalAdvancements.EarlyModernAdministration == false && this.NobleLoyalty < 0.50 ?
        ( this.NobleLoyalty - 0.50) * 2 : 0) +
      (this.MilitaryMorale < 0.70 ?
        -(1 - this.MilitaryMorale) / 2 :
        0) +
      (this.Budget < 0 ? this.Budget / this.ArmyUpkeep :
        0)
      - this.CommanderFreedom / 10);
    this.Stability = this.PopulationHappiness + this.AdministrativeEfficiency / 10 - this.Overextension - this.CulturalDisunity - this.ReligiousDisunity + (this.Propaganda / 1.75 * (1 + this.CulturalAdvancements.Newspapers / 2)) + this.PopulationControl + (this.NobleLoyalty - 0.5) * 10 + (this.ClergyLoyalty - 0.5) * 7.5 + (this.BurghersLoyalty - 0.5) * 7.5 + this.PopulationStabilityImpact + WarStabilityModifier * 100 + (this.MilitaryLoyalty - 1) * 7.5;
    this.Corruption = max(0, this.SocialSpending - this.AdministrativeEfficiency / 20) + (this.Stability < 1 ? 0.5 : 0) + (this.Stability < -1 ? 0.5 : 0) + max(0, ((this.HighClassTax + this.MediumClassTax + this.LowerClassTax) / 3 * 100) - this.AdministrativeEfficiency / 2) / 10;
    this.ArmyQuality = max(0.1, 1 + this.TrainingQuality + this.ArmyTech + this.MilitaryTactics + this.CommanderFreedom / 10 - this.IronShortage - this.SulphurShortage - this.Corruption / 5);
    this.FortUpkeep = (
      this.SmallForts * 2 +
      this.MediumForts * 4 +
      this.BigForts * 8 +
      this.HugeForts * 16 +

      this.ExtraCityFortifications * 5
    ) * this.ArmyQuality / gameStats.TimeDivide;
    
    
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

      n[resource + "Demand"] = (this.Population / PopulationDemand) + extraDemands;

      if (resource == "Iron" && this.Technologies.Metallurgy) n[resource + "Demand"] *= 1.1;

      n[resource + "Value"] = n[resource + "Demand"] / (Math.sqrt(n["Effective" + resource]) + 0.1);
    }



    this.ResourcePopulationGrowthBoost = (this.EffectiveCotton - this.CottonInflation + this.EffectiveSpice - this.SpiceInflation + this.EffectiveWool - this.WoolInflation + this.EffectiveFur - this.FurInflation + (this.EffectiveSugar - this.SugarInflation + this.EffectiveExoticFruit - this.ExoticFruitInflation) / 2) / 100;
    this.PopulationGrowth = max(-0.3, (0.1 + PopulationGrowthModifier + this.ResourcePopulationGrowthBoost) * (1 - this.Disease) - this.BirthControl / 20);
    this.FuturePopulation = (function () {
      return n.Population + (n.FutureFood < 0 ? n.FutureFood * 1000 : n.Population * n.PopulationGrowth / gameStats.TimeDivide);
    })();
    this.FutureLiteracyPercent = ((this.LiteracyPercent > this.EducationEfficiency * 3) ? this.EducationEfficiency * 3 : this.LiteracyPercent) + this.EducationEfficiency / 10 / gameStats.TimeDivide;
    this.FutureHigherEducation = this.HigherEducation + (this.EducationEfficiency >= 3 ? this.EducationEfficiency / 30 : 0) + (this.HigherEducation > this.EducationEfficiency / 3 ? -0.25 : 0);









    this.NavyTech = 0 + this.Technologies.Galleons / 4 + this.Technologies.Docks / 2 + this.Technologies.Gunports / 2;
    this.NavyQuality = 1 + this.NavyImprovements + this.NavyTech;

    this.UpkeepForOneLightShip = ((1 / 8) * this.NavyQuality) / gameStats.TimeDivide * (1 + this.Technologies.Gunports);
    this.UpkeepForOneMediumShip = ((1 / 4) * this.NavyQuality) / gameStats.TimeDivide * (1 + this.Technologies.Gunports);
    this.UpkeepForOneHeavyShip = ((1 / 2) * this.NavyQuality) / gameStats.TimeDivide * (1 + this.Technologies.Gunports + this.Technologies.Galleons / 2);

    this.NavyUpkeep = (
      this.LightShips * this.UpkeepForOneLightShip +
      this.MediumShips * this.UpkeepForOneMediumShip +
      this.HeavyShips * this.UpkeepForOneHeavyShip
    );

    this.NewTroopRecruitmentPenalty = (function () {
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

    this.ArmyUpkeep = this.UnitUpkeep * ((this.ArmyQuality + this.Corruption / 5) + this.ArmyWages - 1) / gameStats.TimeDivide;





    this.TradePowerResourceTrade = (function () {
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
    this.TradePower = this.TradePowerResourceTrade + this.LocalTrade / 2 + (pseudoTradePower);
    this.ProductionEfficiency = this.Mercantilism + this.Technologies.VerticalLoom / 5 + this.Technologies.Workshops + this.Technologies.Cranes / 5 + this.Technologies.TextileManufactories / 2;
    this.Production = (this.LocalTrade + this.TradePower) * this.Workforces.Artisans * this.ProductionEfficiency * 10;
    this.TradeProtection = this.LightShips * 0.75 + this.MediumShips * 1 + this.HeavyShips * 0.75;
    this.TradeEfficiency = 1 * this.Mercantilism + this.Technologies.Cranes / 10 + this.Technologies.PromissoryNotes / 20 + this.TradeProtection / 200;

    this.Inflation = max(0, (this.Budget / 1000) / (this.AdministrativeEfficiency / 10));
    this.ResourceBudgetBoost = (function () {
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

    this.TradeRevenue = ((this.LocalTrade + this.TradePower) * (1 - this.BurghersInfluence)) / gameStats.TimeDivide * this.TradeEfficiency + this.TradeProfit;
    this.EffectiveTax = (
      (
        this.SocietalClasses.Lower * this.Population * this.LowerClassTax / 10000 +
        this.Population * this.SocietalClasses.Medium * this.MediumClassTax / 7500 * (1 - this.ClergyInfluence - this.BurghersInfluence) + this.Population * this.SocietalClasses.High * this.HighClassTax / 5000 * (1 - this.NobleInfluence)
      ) * this.AdministrativeEfficiency / 10 * (1 - this.NobleInfluence / 4 - this.ClergyInfluence / 4
      ) * (1 - this.Occupation)) / gameStats.TimeDivide * (1 - this.Corruption / 10);

    this.SpyUpkeep = this.Spies / 200 * this.SpyQuality / gameStats.TimeDivide;
    this.SocialSpendingUpkeep = this.SocialSpending * this.Population / 1000000 / gameStats.TimeDivide * 3;
    this.HygieneUpkeep = this.Health * this.Population / 2000000 / gameStats.TimeDivide;
    this.EducationUpkeep = this.EducationEfficiency * this.Population / 500000 * (1.1 - this.AdministrativeEfficiency / 100) * 6 / gameStats.TimeDivide;
    this.PropagandaUpkeep = this.Propaganda * (100 - this.AdministrativeEfficiency) / 100 * this.Population / 1000000 / gameStats.TimeDivide;
    this.PopulationControlUpkeep = this.PopulationControl * this.Population / 800000 / gameStats.TimeDivide;
    this.AdministrativeUpkeep = this.LandAdministration / gameStats.TimeDivide * 2;
    this.ProductionRevenue = this.Production / gameStats.TimeDivide;
    this.ResearchUpkeep = this.ResearchSpending * this.Population / 500000 / gameStats.TimeDivide * this.LiteracyPercent / 10;
    this.Balance = this.BudgetIncoming - this.BudgetOutgoing;

    this.DailyBudget = (this.Budget / (10 - this.AdministrativeEfficiency / 10 + 1) / gameStats.TimeDivide) / (1 + this.Inflation) + this.ResourceBudgetBoost - this.ArmyUpkeep + this.TradeRevenue + this.EffectiveTax - this.EducationUpkeep - this.HygieneUpkeep - this.NavyUpkeep - this.AgricultureSpending - this.SocialSpendingUpkeep - this.SpyUpkeep - this.PopulationControlUpkeep - this.PropagandaUpkeep + this.ProductionRevenue - this.FortUpkeep - this.AdministrativeUpkeep - this.ResearchUpkeep + this.Balance - this.NewTroopRecruitmentPenalty;
    this.FutureBudget = this.Budget + this.DailyBudget;

    this.OverallIncome = (this.Budget / (10 - this.AdministrativeEfficiency / 10 + 1) / gameStats.TimeDivide) / (1 + this.Inflation) + this.ResourceBudgetBoost + this.TradeRevenue + this.EffectiveTax + this.ProductionRevenue + this.Balance;

    this.FreeEliteUnitsCap = ((this.OverallNumbers - this.Militia - this.Levies) * 0.025) - (this.EliteCavalry + this.EliteInfantry);

    this.MilitaryMorale = clamp(0, 1.5, 
      1 + this.Fervor + (this.MilitaryDiscipline > 1 ? - this.MilitaryDiscipline + 1 : 0) * 2 +
    (this.WarSupport < 0.5 ? this.WarSupport - 0.5 : 0) +
    (this.WarSupport > 0.75 ? this.WarSupport - 0.75 : 0) +
    this.ArmyWages - 1);

    this.CulturalAdvance = (function () {
      let ca = 0;
      for (const cultureadvance in n.CulturalAdvancements) {
        if (n.CulturalAdvancements[cultureadvance]) ca++;

      }
      return ca;
    })();
    this.CulturalPowerGain = (this.LiteracyPercent / 3 + this.PopulationHappiness / 8) * (this.CulturalProsperity + this.CulturalAdvancements.RenaissanceThought / 10) / gameStats.TimeDivide;
    this.CulturalPower = this.CulturalPower;
    this.FutureCulturalPower = min(6, (this.CulturalPower + this.CulturalPowerGain));
    this.FuturePublicDebtLength = this.EffectiveDebt > 0 ? this.PublicDebtLength + 1 : 0;

    this.MaxPopulation = this.Population / this.Disease;
    
    this.PrideOfTheNavy = (this.NavalPower > 10000? 'ACCESSIBLE' : 'INACCESSIBLE');
    this.OverallShipCount = this.LightShips + this.MediumShips + this.HeavyShips;
    this.NavalPower = (this.LightShips*0.5 + this.MediumShips + 2*this.HeavyShips) * this.NavyQuality;
    

    this.PopulationTechImpact = (this.Population > 20000000? (this.Population - 20000000) / 250000000 : 0);
    

    this.ResearchBoostFromTech = 
    1 + 
    this.CulturalAdvancements.Universities / 10 + 
    this.CulturalAdvancements.RenaissanceThought / 5 + 
    this.Technologies.Experimentation / 5;
    this.ResearchPointGain = max(1, (this.ResearchSpending * this.ResearchEffectiveness * this.ResearchBoostFromTech * this.LiteracyPercent / this.Isolation / gameStats.TimeDivide * 2 / 10 + this.ResearchSpending * this.ResearchEffectiveness * this.HigherEducation / this.Isolation / gameStats.TimeDivide * 5 / 10) * (1 - (this.NobleInfluence > 0.5 ? this.NobleInfluence - 0.5 : 0) / 1.5 - (this.ClergyInfluence > 0.5? this.ClergyInfluence - 0.5 : 0) / 1.5) * (1 - this.PopulationTechImpact));
    this.FutureResearchPoints = min(7.5, this.ResearchPoints + this.ResearchPointGain);
    this.FutureDateInThisNation = this.DateInThisNation + gameStats.TimeSpeed;
  }

  clearNewTroops(){
    for (const unitName in gameStats.UnitUpkeepCosts) {
      this["New_" + unitName] = 0;
    }
    //reset
    this.New_LightShips = 0;
    this.New_MediumShips = 0;
    this.New_HeavyShips = 0;
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

  evaluateNations() {
    for (const nationName in this.Nations) {
      const nation = this.Nations[nationName];
      nation.evaluateNation();
    }
  }
}

let gameStats = new Stats();


