let mappedResources = [
  "Fur",
  "Gold",
  "Iron",
  "Ivory",
  "Sulphur",
  "Coal",
  "Copper",
  "Diamonds",
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
  2, //diamonds
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
  Production;
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
  New_HandCannoneers;
  New_Musketeers;
  New_Militia;
  New_SiegeEquipment;
  New_LargeSiegeEquipment;
  New_FieldCannons;

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
  MaxCoal;
  
  Sulphur;
  EffectiveSulphur;
  MaxSulphur;
  
  Cotton;
  EffectiveCotton;
  CottonInflation;
  
  Gold;
  EffectiveGold;
  GoldInflation;
  MaxGold;
  
  Iron;
  EffectiveIron;
  MaxIron;
  
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
  MaxFur;
  
  Diamond;
  EffectiveDiamond;
  DiamondInflation;
  MaxDiamond;
  
  Silver;
  EffectiveSilver;
  SilverInflation;
  MaxSilver;
  
  Copper;
  EffectiveCopper;
  MaxCopper;
  
  Ivory;
  EffectiveIvory;
  IvoryInflation;
  MaxIvory;

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
  CoastalPixels;
  CoastalLandPercent;
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
      }
    };
    this.Population = 2500000;
    this.LiteracyPercent = 7.5;
    this.HigherEducation = 0.5;
    this.Budget = 250.00;
    this.Food = 200.00;
    this.ResearchPoints = 5;
    this.PublicDebtLength = 0;
    this.CulturalPower = 6.00;
    /* #endregion */

    /* #region  Most Stats */
    this.ReligiousDisunity = 0.00;
	  this.AverageDevelopment = 1;
    this.Health = 1.00;
    this.EducationEfficiency = 1;
	  this.BureaucratWages = 0.75;
    this.AdministrativeEfficiency = 25;
	  this.AdministrationSize = 0.5;
    this.Propaganda = 0;
    this.SocialSpending = 0;
    this.AtWar = false;
	  this.Nationalism = 0;
	  this.ReligiousFervor = 0;

    this.AristocratLoyalty = 0.50; //Show in percent
    this.ClergyLoyalty = 0.50; //Show in percent
    this.BurgousieLoyalty = 0.50; //Show in percent
    this.BureaucratLoyalty = 0.50; //Show in percent
    this.IntellectualsLoyalty = 0.50; //Show in percent
    this.WorkersLoyalty = 0.50; //Show in percent
	
    this.EstateInfluences = {
      AristocratInfluence: 0.525,
      ClergyInfluence: 0.25,
      BurgousieInfluence: 0.175,
      BureaucratInfluence: 0.025,
      IntellectualsInfluence: 0.02,
      MilitaryInfluence: 0.0,
      WorkersInfluence: 0.005
    };
	
    this.GovernmentRepresentation = {
      UnitaryRepresentation: 0.30,
      AristocratRepresentation: 0.40,
      ClergyRepresentation: 0.20,
      BurgousieRepresentation: 0.10,
      BureaucratRepresentation: 0.0,
      IntellectualsRepresentation: 0.0,
      MilitaryRepresentation: 0.0,
      WorkersRepresentation: 0.0
    };
	
    this.MilitaryControl = {
      UnitaryControl: 0.25,
      AristocratControl: 0.35,
      ClergyControl: 0.10,
      BurgousieControl: 0.10,
      BureaucratControl: 0.10,
      IntellectualsControl: 0.0,
      WorkersControl: 0.10
    };

    this.PopulationControl = 0;
    this.BirthControl = 0;
    this.LocalTrade = 2.5;
    this.TradeImprovements = 1;
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
    this.ExtraCityFortifications = 0;


    this.CommanderFreedom = 0;
    this.ArmyWages = 1.00;
    this.MilitaryDiscipline = 1.00; //Show In Percent
    /* #endregion */

    /* #region  Navy */
    this.NavyImprovements = 0;

    this.LightShips = 0;
    this.MediumShips = 0;
    this.HeavyShips = 0;
    /* #endregion */

    /* #region  Agriculture */
    this.AgricultureSubsidies = 0.00;
    this.Fertility = 0.50;
    this.AgricultureInfrastructure = 1.00;
    this.StockingCapabilities = 1.00;
    this.AgricultureAdvancements = 1.00;
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

    this.New_LightShips = 0;
    this.New_MediumShips = 0;
    this.New_HeavyShips = 0;


    /* #endregion */

    /* #region  Population */
    this.Workforces = {
      Townsfolk: 0.01,
      Clergy: 0.0125,
      Aristocracy: 0.02,
      Burgousie: 0.005
    };
    
    this.SocietalClasses = {};
    this.CultureGroups = {}
    /* #endregion */

    /* #region  Resources */
    this.MiningEfficiency = 1;
	  this.Forestry = 1;

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
      Gunpowder: false,
      VerticalLoom: false,
      SaddleAndStirrup: false,
      HorseCollar: false,
      Explosives: false,
      Firelance: false,
      Cranes: false,
      PromissoryNotes: false,
      Bombards: false,
      HandCannons: false,
      PlateArmour: false,
      SappersAndEngineers: false,
      Workshops: false,
      StandardizedPikes: false,
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
	  Gunlock: false
    }
    /* #endregion */

	/* #region Reforms */
	
	this.Reforms = {
	  SlaveryAllowed: true,
	  SlaveryBanned: false,
	  
	  SerfdomAllowed: true,
	  SerfdomBanned: false,
	  
	  OpenFieldSystem: true,
	  Enclosure: false,
	  
	  Mercantilism: true,
	  Protectionism: false,
	  FreeTrade: false,
	  
	  Guilds: true,
	  GuildsBanned: false,
	  AntiMonopolyLaws: false,
	  
	  WomenGuardianship: true,
	  PropertiedWomen: false,
	  GenderEquality: false,
	  
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
	  
	  NobleBureaucrats: true,
	  WealthyBureaucrats: false,
	  MeritocraticBureaucrats: false,
	  
	  NobleResourceOwnership: true,
	  MixedResourceOwnership: false,
	  BurgousieResourceOwnership: false,
	  GovernmentResourceOwnership: false,
	  
	  NoArmyReserve: true,
	  NationalMilitia: false,
	  Conscripts: false,
	  ProffesionalReservists: false
	}
	
	/* #endregion */

    /* #region  Economy */
    this.HighClassTax = 0.1; //As Percentage
    this.MediumClassTax = 0.1; //As Percentage
    this.LowerClassTax = 0.1; //As Percentage
    this.PublicDebtTaken = 0.00;
    this.BudgetIncoming = 0;
    this.BudgetOutgoing = 0;
    /* #endregion */

    this.CulturalProsperity = 1.0;
    this.CulturalAdvancements = {
      DivineRightToRule: false,
      Serfdom: false,
      Feudalism: false,
      Universities: false,
      AristocratDuty: false,
      Courthouses: false,
      RenaissanceThought: false,
      EarlyModernAdministration: false,
      NationalSovereignity: false,
      Newspapers: false,
      ScientificRevolution: false,
      PotatoPopulationBoom: false,
      Constitution: false
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
      "Ivory",
      "Cocoa",
      "Tobacco",
      "Sugar",
      "ExoticFruit"
    ];
    this.Trades = {};
    this.TradeZones = {
      Alaska: {
        Color: "none",
        Score: 1
      },
      Cascadia: {
        Color: "none",
        Score: 3
      },
      CaliforniaAndWestMexico: {
        Color: "none",
        Score: 4
      },
      HudsonBay: {
        Color: "none",
        Score: 3
      },
      GreatLakes: {
        Color: "none",
        Score: 7
      },
      Louisiana: {
        Color: "none",
        Score: 7
      },
      GulfOfMexico: {
        Color: "none",
        Score: 8
      },
      LawrenceGulf: {
        Color: "none",
        Score: 4.5
      },
      EastCoast: {
        Color: "none",
        Score: 7
      },
      Carribean: {
        Color: "none",
        Score: 8
      },
      CentralAmerica: {
        Color: "none",
        Score: 6
      },
      GuyanaAndSuriname: {
        Color: "none",
        Score: 3
      },
      Amazon: {
        Color: "none",
        Score: 3
      },
      Peru: {
        Color: "none",
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
        Color: "none",
        Score: 2
      },
      Patagonia: {
        Color: "none",
        Score: 2
      },
      NorthernAnatolia: {
        Color: "none",
        Score: 10
      },
      NorthSea: {
        Color: "none",
        Score: 4.5
      },
      BritishIsles: {
        Color: "none",
        Score: 8
      },
      EnglishChannel: {
        Color: "none",
        Score: 10
      },
      France: {
        Color: "none",
        Score: 7
      },
      BayOfBiscay: {
        Color: "none",
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
        Color: "none",
        Score: 7
      },
      Rhine: {
        Color: "none",
        Score: 7
      },
      CentralMediterranean: {
        Color: "none",
        Score: 8
      },
      Adriatic: {
        Color: "none",
        Score: 10
      },
      Germany: {
        Color: "none",
        Score: 7
      },
      WesternDanube: {
        Color: "none",
        Score: 7
      },
      Denmark: {
        Color: "none",
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
        Color: "none",
        Score: 3
      },
      Novgorod: {
        Color: "none",
        Score: 8
      },
      Poland: {
        Color: "none",
        Score: 6
      },
      Dniepr: {
        Color: "none",
        Score: 8.5
      },
      Crimea: {
        Color: "none",
        Score: 7
      },
      EasternDanube: {
        Color: "none",
        Score: 8.5
      },
      Greece: {
        Color: "none",
        Score: 9.5
      },
      EasternMediterranean: {
        Color: "none",
        Score: 8
      },
      Egypt: {
        Color: "none",
        Score: 7
      },
      RedSea: {
        Color: "none",
        Score: 7
      },
      WesternSahara: {
        Color: "none",
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
        Color: "none",
        Score: 7
      },
      Kongo: {
        Color: "none",
        Score: 3
      },
      EastAfrica: {
        Color: "none",
        Score: 3
      },
      Mozambique: {
        Color: "none",
        Score: 4
      },
      SouthAfrica: {
        Color: "none",
        Score: 5
      },
      Mesopotamia: {
        Color: "none",
        Score: 6.5
      },
      PersianGulf: {
        Color: "none",
        Score: 7
      },
      Caucasus: {
        Color: "none",
        Score: 6
      },
      DonRiver: {
        Color: "none",
        Score: 6
      },
      Volga: {
        Color: "none",
        Score: 6
      },
      CentralAsia: {
        Color: "none",
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
        Color: "none",
        Score: 5
      },
      Pakistan: {
        Color: "none",
        Score: 7
      },
      Tibet: {
        Color: "none",
        Score: 2
      },
      Mongolia: {
        Color: "none",
        Score: 3
      },
      Manchuria: {
        Color: "none",
        Score: 6.5
      },
      SeaOfJapan: {
        Color: "none",
        Score: 7.5
      },
      NorthChina: {
        Color: "none",
        Score: 7
      },
      YangtzeRiver: {
        Color: "none",
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
        Color: "none",
        Score: 8
      },
      NorthAustralia: {
        Color: "none",
        Score: 5
      },
      SouthAustralia: {
        Color: "none",
        Score: 6
      }
  };

    this.Climates = {
      Ocean: {
        ClimateScore: 0,
        Color: "103c6d"
      },
      PolarDesert: {
          ClimateScore: 0,
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

