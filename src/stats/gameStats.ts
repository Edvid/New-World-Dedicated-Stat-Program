import { type RealReformCostTypes, type ReformsType } from "../utility/mapcalc/types/reform_types.js";
import { realResourceTypes } from "../utility/game_stats/resources.js";
import { startingReligionGroups, religions } from "../utility/game_stats/religions.js";
import { type Trade, type TradeZonesType, type tradeInfluencesType, tradeZones } from "../utility/game_stats/trades.js";
import { type Climates, climates } from "../utility/game_stats/climates.js";
import { type TechnologiesType, technologies } from "../utility/game_stats/technologies.js";
import { type CulturalAdvancementsType } from "../utility/game_stats/cultural_advancements.js";
import { type govermentRepresentation, type militaryControl, type estateLoyalties, type influenceChangeLoyaltyEffect, type estateInfluences, estates, type Literacies, type workforces, type PoliticalAwareness, type WageStats, type estateTaxes, type setTax, type PrivateArmies, type estateSols } from "../utility/game_stats/estates.js";
import { type units } from "../utility/game_stats/military.js";

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

interface productionSectors {
  ConstructionSector: number;
  BasicArmamentsSector: number;
  HeavyArmamentsSector: number;
  ShipBuildingSector: number;
  BasicToolsSector: number;
  TextilesSector: number;
  BasicGoodsSector: number;
  LuxuryGoodsSector: number;
  AlcoholSector: number;
  ChemicalSector: number;
  ElectronicsSector: number;
  AutomotiveSector: number;
  AerospaceSector: number;
  HeavyIndustrySector: number;
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
}

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

export class Nation implements units, PrivateArmies, RealReformCostTypes, Literacies, PoliticalAwareness, estateLoyalties, WageStats, estateTaxes, setTax, estateSols {

  FuturePopulation: number;
  FutureLiteracyPercent: number;
  FutureHigherEducation: number;
  FutureBudget: number;
  FuturePublicDebtLength: number;
  GovernmentName: string;
  GovernmentDominatedBy: string;
  GovernmentEffects: string;
  CapitalName: string;
  Flag: string;
  Color: string;
  ReligionGroups: Record<string, SocialBehaviourGroup> = {};
  ReligionRepresentedAtGovernmentLevel: string;
  ReligionRepresentedAtGovernmentLevelPercent: number;
  GovernmentRepresentation: govermentRepresentation;
  ReformPower: number;
  ReformPowerGain: number;
  Reforms: ReformsType;
  SlaveryReformRegressionCost: number;
  SerfdomReformRegressionCost: number;
  EnclosureReformRegressionCost: number;
  TradeReformRegressionCost: number;
  AntitrustReformRegressionCost: number;
  SuffrageReformRegressionCost: number;
  PrivilegeReformRegressionCost: number;
  OfficersReformRegressionCost: number;
  BureaucratsReformRegressionCost: number;
  ResourceReformRegressionCost: number;
  LandReformRegressionCost: number;
  ArmyReformRegressionCost: number;
  CensorshipReformRegressionCost: number;
  SocialReformRegressionCost: number;
  ReligiousReformRegressionCost: number;
  EducationReformRegressionCost: number;
  PoliceReformRegressionCost: number;
  WeaponReformRegressionCost: number;
  FeudalArmiesChangeCost: number;
  MercenariesChangeCost: number;
  ReligiousOrdersChangeCost: number;
  SlaveryReformAdvanceCost: number;
  SerfdomReformAdvanceCost: number;
  EnclosureReformAdvanceCost: number;
  TradeReformAdvanceCost: number;
  AntitrustReformAdvanceCost: number;
  SuffrageReformAdvanceCost: number;
  PrivilegeReformAdvanceCost: number;
  OfficersReformAdvanceCost: number;
  BureaucratsReformAdvanceCost: number;
  ResourceReformAdvanceCost: number;
  LandReformAdvanceCost: number;
  ArmyReformAdvanceCost: number;
  CensorshipReformAdvanceCost: number;
  SocialReformAdvanceCost: number;
  ReligiousReformAdvanceCost: number;
  EducationReformAdvanceCost: number;
  PoliceReformAdvanceCost: number;
  WeaponReformAdvanceCost: number;
  MilitaryControl: militaryControl;
  CulturalDisunity: number;
  ReligiousDisunity: number;
  Population: number;
  PopulationGrowth: number;
  PseudoPopulationGrowth: number;
  Health: number;
  EffectiveHealth: number;
  Alcoholism: number;
  UnemployedLiteracy: number;
  SlavesLiteracy: number;
  LabourersLiteracy: number;
  SerfsLiteracy: number;
  FarmersLiteracy: number;
  TownsfolkLiteracy: number;
  ClergyLiteracy: number;
  BureaucratsLiteracy: number;
  MerchantsLiteracy: number;
  IntellectualsLiteracy: number;
  SailorsLiteracy: number;
  SoldiersLiteracy: number;
  AristocracyLiteracy: number;
  BurgousieLiteracy: number;
  LiteracyPercent: number;
  HigherEducation: number;
  AristocracyPoliticalAwareness: number;
  ClergyPoliticalAwareness: number;
  BurgousiePoliticalAwareness: number;
  UrbanPoliticalAwareness: number;
  BureaucratsPoliticalAwareness: number;
  IntellectualsPoliticalAwareness: number;
  WorkersPoliticalAwareness: number;
  MilitaryPoliticalAwareness: number;
  EducationEfficiency: number;
  AdministrativeEfficiency: number;
  AdministrationSize: number
  AdministrativeStrain: number;
  AdministrativeTech: number;
  AdministrativePower: number;
  AdministrativeDemand: number;
  Corruption: number;
  Propaganda: number;
  SocialSpending: number;
  Prosperity: number; //Quality of Life
  PopulationHappiness: number;
  Stability: number;
  AtWar: "defensive" | "offensive" | false;
  WarSupport: number;
  Nationalism: number;
  ReligiousFervor: number;
  Absolutism: number;
  PopulationControl: number;
  BirthControl: number;
  ConscriptionPercent: number;
  BureaucratsWages: number;
  UnemployedWage: number;
  SlavesWage: number;
  LabourersWage: number;
  SerfsWage: number;
  FarmersWage: number;
  TownsfolkWage: number;
  ClergyWage: number;
  BureaucratsWage: number;
  MerchantsWage: number;
  IntellectualsWage: number;
  SailorsWage: number;
  SoldiersWage: number;
  AristocracyWage: number;
  BurgousieWage: number;
  StateFarmerWage: number;
  StateLabourerWage: number;
  StateFactoryWorkerWage: number;
  UnemployedTaxes: number;
  SlavesTaxes: number;
  LabourersTaxes: number;
  SerfsTaxes: number;
  FarmersTaxes: number;
  TownsfolkTaxes: number;
  ClergyTaxes: number;
  BureaucratsTaxes: number;
  MerchantsTaxes: number;
  IntellectualsTaxes: number;
  SailorsTaxes: number;
  SoldiersTaxes: number;
  AristocracyTaxes: number;
  BurgousieTaxes: number;
  TaxEfficiency: number;
  TaxRevenue: number;
  EffectiveTax: number;
  PopProductionRevenue: number;
  StateProductionRevenue: number;
  StateResourceRevenue: number;
  StateAgricultureRevenue: number;
  Production: number;
  ProductionGovernmentControl: number;
  ProductionEfficiency: number;
  TradeEfficiency: number;
  LocalTrade: number;
  TradePower: number;
  TradeImprovements: number;
  BudgetPerTurn: number;
  Budget: number;
  Inflation: number;
  Spies: number;
  SpyQuality: number;
  ArmyUpkeep: number;
  SpyUpkeep: number;
  SocialSpendingUpkeep: number;
  HealthUpkeep: number;
  EducationUpkeep: number;
  PropagandaUpkeep: number;
  PopulationControlUpkeep: number;
  TradeRevenue: number;
  AdministrativeUpkeep: number;
  ProductionRevenue: number;
  ResearchUpkeep: number;
  StateWorkersUpkeep: number;
  OverallIncome: number;
  OverallSpending: number;
  TariffsRevenue: number;
  PassiveInvestmentIncome: number;
  Levies: number;
  LightInfantry: number;
  HeavyInfantry: number;
  Archers: number;
  Crossbowmen: number;
  LightCavalry: number;
  HeavyCavalry: number;
  EliteInfantry: number;
  EliteCavalry: number;
  HandCannoneers: number;
  Musketeers: number;
  MusketMilitia: number;
  Riflemen: number;
  Militia: number;
  SiegeEquipment: number;
  LargeSiegeEquipment: number;
  FieldCannons: number;
  SiegeGuns: number;
  RegimentalGuns: number;
  EliteUnitsCap: number;
  UnitUpkeep: number;
  OverallNumbers: number;
  SmallForts: number;
  MediumForts: number;
  BigForts: number;
  HugeForts: number;
  CityFortifications: number;
  SupplyDepots: number;
  NavalBases: number;
  SmallFortUpkeep: number;
  MediumFortUpkeep: number;
  BigFortUpkeep: number;
  HugeFortUpkeep: number;
  CityFortificationUpkeep: number;
  SupplyDepotUpkeep: number;
  NavalBaseUpkeep: number;
  SmallFortConstructionCost: number;
  MediumFortConstructionCost: number;
  BigFortConstructionCost: number;
  HugeFortConstructionCost: number;
  CityFortificationConstructionCost: number;
  SupplyDepotConstructionCost: number;
  NavalBaseConstructionCost: number;
  BuildingsUpkeep: number;
  ConstructionCost: number;
  WoodShortage: number;
  CoalShortage: number;
  IronShortage: number;
  SulphurShortage: number;
  NaturalFabricsShortage: number;
  LuxuryNaturalFabricsShortage: number; 
  ValuableMaterialsShortage: number;
  HousingShortage: number;
  TextilesShortage: number;
  BasicGoodsShortage: number;
  LuxuryGoodsShortage: number;
  AlcoholShortage: number;
  BasicToolsShortage: number;
  HeavyIndustryShortage: number;
  BasicArmamentsShortage: number;
  BasicArmamentsArmyShortage: number;
  HeavyArmamentsShortage: number;
  ShipBuildingShortage: number;
  ChemicalsShortage: number;
  MotorsShortage: number;
  PlanesShortage: number;
  ElectronicsShortage: number;
  CommanderFreedom: number;
  BasicArmamentsStockpiled: number;
  HeavyArmamentsStockpiled: number;
  ArmyWage: number;
  ArmyWages: number;
  MilitaryLoyalty: number;
  AristocracyLoyalty: number; //Show in percent
  ClergyLoyalty: number; //Show in percent
  BurgousieLoyalty: number; //Show in percent
  UrbanLoyalty: number; //Show in percent
  BureaucratsLoyalty: number; //Show in percent
  IntellectualsLoyalty: number; //Show in percent
  WorkersLoyalty: number; //Show in percent
  InfluenceChangeLoyaltyEffect: influenceChangeLoyaltyEffect;
  MilitaryMorale: number;
  MilitaryDiscipline: number;
  OverallImprovements: number;
  IrregularImprovements: number;
  MeleeImprovements: number;
  RangedImprovements: number;
  CavalryImprovements: number;
  FirearmImprovements: number;
  SiegeImprovements: number;
  ArtilleryImprovements: number;
  LightShipImprovements: number;
  MediumShipImprovements: number;
  HeavyShipImprovements: number;
  LightShipQuality: number;
  MediumShipQuality: number;
  HeavyShipQuality: number;
  LightShipConstructionCost: number;
  MediumShipConstructionCost: number;
  HeavyShipConstructionCost: number;
  MerchantShipConstructionCost: number;
  MerchantShipsFullfilment: number;
  NavyTech: number;
  IrregularQuality: number;
  MeleeQuality: number;
  RangedQuality: number;
  FirearmQuality: number;
  CavalryQuality: number;
  SiegeQuality: number;
  ArtilleryQuality: number;
  NavyQuality: number;
  MerchantShips: number;
  UpkeepForOneMerchantShip: number;
  LightShips: number;
  UpkeepForOneLightShip: number;
  MediumShips: number;
  UpkeepForOneMediumShip: number;
  HeavyShips: number;
  UpkeepForOneHeavyShip: number;
  OverallShipCount: number;
  TradeProtection: number;
  Manpower: number;
  NavalPower: number;
  NavyUpkeep: number;
  New_Levies: number;
  New_Militia: number;
  New_LightInfantry: number;
  New_HeavyInfantry: number;
  New_EliteInfantry: number;
  New_Archers: number;
  New_Crossbowmen: number;
  New_HandCannoneers: number;
  New_Musketeers: number;
  New_MusketMilitia: number;
  New_Riflemen: number;
  New_LightCavalry: number;
  New_HeavyCavalry: number;
  New_EliteCavalry: number;
  New_SiegeEquipment: number;
  New_LargeSiegeEquipment: number;
  New_RegimentalGuns: number;
  New_FieldCannons: number;
  New_SiegeGuns: number;
  New_MerchantShips: number;
  New_LightShips: number;
  New_MediumShips: number;
  New_HeavyShips: number;
  New_SmallForts: number;
  New_MediumForts: number;
  New_BigForts: number;
  New_HugeForts: number;
  New_CityFortifications: number;
  New_SupplyDepots: number;
  New_NavalBases: number;
  TroopRecruitmentCost: number;
  AristocracyCallupCost: number;
  AristocracyLevies: number;
  AristocracyMilitia: number;
  AristocracyLightInfantry: number;
  AristocracyHeavyInfantry: number;
  AristocracyEliteInfantry: number;
  AristocracyArchers: number;
  AristocracyCrossbowmen: number;
  AristocracyMusketeers: number;
  AristocracyMusketMilitia: number;
  AristocracyRiflemen: number;
  AristocracyLightCavalry: number;
  AristocracyHeavyCavalry: number;
  AristocracyEliteCavalry: number;
  BurgousieCallupCost: number;
  BurgousieLevies: number;
  BurgousieMilitia: number;
  BurgousieLightInfantry: number;
  BurgousieHeavyInfantry: number;
  BurgousieEliteInfantry: number;
  BurgousieArchers: number;
  BurgousieCrossbowmen: number;
  BurgousieMusketeers: number;
  BurgousieMusketMilitia: number;
  BurgousieRiflemen: number;
  BurgousieLightCavalry: number;
  BurgousieHeavyCavalry: number;
  BurgousieEliteCavalry: number;
  ClergyCallupCost: number;
  ClergyLevies: number;
  ClergyMilitia: number;
  ClergyLightInfantry: number;
  ClergyHeavyInfantry: number;
  ClergyEliteInfantry: number;
  ClergyArchers: number;
  ClergyCrossbowmen: number;
  ClergyMusketeers: number;
  ClergyMusketMilitia: number;
  ClergyRiflemen: number;
  ClergyLightCavalry: number;
  ClergyHeavyCavalry: number;
  ClergyEliteCavalry: number;
  PopulaceMilitia: number;
  PopulaceMusketMilitia: number;
  Workforces: workforces;
  PopInAgriculture: number;
  ProductionSectors: productionSectors;
  SocietalClasses: {
    High: number
    Medium: number
    Lower: number
    Slaves: number
  };
  CultureGroups: Record<string, SocialBehaviourGroup> = {};
  CultureRepresentedAtGovernmentLevel: string;
  CultureRepresentedAtGovernmentLevelPercent: string;
  PopulationStabilityImpact: number;
  PopulationTechImpact: number;
  MiningEfficiency: number;
  Wood: number;
  ForestsCutDown: number;
  Forestry: number;
  EffectiveWood: number;
  Reforestation: number;
  MaxForestry: number;
  Coal: number;
  BaseCoalHarvest: number;
  EffectiveCoal: number;
  MaxCoal: number;
  Sulphur: number;
  BaseSulphurHarvest: number;
  EffectiveSulphur: number;
  MaxSulphur: number;
  Cotton: number;
  EffectiveCotton: number;
  Gold: number;
  EffectiveGold: number;
  MaxGold: number;
  Iron: number;
  BaseIronHarvest: number;
  EffectiveIron: number;
  MaxIron: number;
  Tea: number;
  EffectiveTea: number;
  Silk: number;
  EffectiveSilk: number;
  Spice: number;
  EffectiveSpice: number;
  Wool: number;
  EffectiveWool: number;
  Coffee: number;
  EffectiveCoffee: number;
  Fur: number;
  EffectiveFur: number;
  MaxFur: number;
  Diamond: number;
  EffectiveDiamond: number;
  MaxDiamond: number;
  Silver: number;
  EffectiveSilver: number;
  MaxSilver: number;
  Copper: number;
  EffectiveCopper: number;
  MaxCopper: number;
  Ivory: number;
  EffectiveIvory: number;
  MaxIvory: number;
  Cocoa: number;
  EffectiveCocoa: number;
  Tobacco: number;
  EffectiveTobacco: number;
  Sugar: number;
  EffectiveSugar: number;
  ExoticFruit: number;
  EffectiveExoticFruit: number;
  Housing: number;
  Textiles: number;
  BasicGoods: number;
  LuxuryGoods: number;
  Alcohol: number;
  BasicTools: number;
  HeavyIndustry: number;
  BasicArmaments: number;
  HeavyArmaments: number;
  ShipBuilding: number;
  Chemicals: number;
  Motors: number;
  Planes: number;
  Electronics: number;

  EffectiveHousing: number;
  EffectiveTextiles: number;
  EffectiveBasicGoods: number;
  EffectiveLuxuryGoods: number;
  EffectiveAlcohol: number;
  EffectiveBasicTools: number;
  EffectiveHeavyIndustry: number;
  EffectiveBasicArmaments: number;
  EffectiveHeavyArmaments: number;
  EffectiveShipBuilding: number;
  EffectiveChemicals: number;
  EffectiveMotors: number;
  EffectivePlanes: number;
  EffectiveElectronics: number;

  ResourceBudgetBoost: number;
  FoodDemand: number;
  FoodValue: number;
  WoodDemand: number;
  WoodValue: number;
  CoalDemand: number;
  CoalValue: number;
  GoldDemand: number;
  GoldValue: number;
  IronDemand: number;
  IronValue: number;
  SulphurDemand: number;
  SulphurValue: number;
  CottonDemand: number;
  CottonValue: number;
  TeaDemand: number;
  TeaValue: number;
  SpiceDemand: number;
  SpiceValue: number;
  CopperDemand: number;
  CopperValue: number;
  SilkDemand: number;
  SilkValue: number;
  WoolDemand: number;
  WoolValue: number;
  CoffeeDemand: number;
  CoffeeValue: number;
  SilverDemand: number;
  SilverValue: number;
  DiamondDemand: number;
  DiamondValue: number;
  FurDemand: number;
  FurValue: number;
  IvoryDemand: number;
  IvoryValue: number;
  CocoaDemand: number;
  CocoaValue: number;
  TobaccoDemand: number;
  TobaccoValue: number;
  SugarDemand: number;
  SugarValue: number;
  ExoticFruitDemand: number;
  ExoticFruitValue: number;
  HousingDemand: number;
  HousingValue: number;
  TextilesDemand: number;
  TextilesValue: number;
  BasicGoodsDemand: number;
  BasicGoodsValue: number;
  LuxuryGoodsDemand: number;
  LuxuryGoodsValue: number;
  AlcoholDemand: number;
  AlcoholValue: number;
  BasicToolsDemand: number;
  BasicToolsValue: number;
  HeavyIndustryDemand: number;
  HeavyIndustryValue: number;
  BasicArmamentsDemand: number;
  ArmyBasicArmamentsDemand: number;
  ArmyHeavyArmamentsDemand: number;
  MinimumBasicArmamentsNeeded: number;
  BasicArmamentsValue: number;
  HeavyArmamentsDemand: number;
  HeavyArmamentsValue: number;
  ShipBuildingDemand: number;
  ShipBuildingValue: number;
  ChemicalsDemand: number;
  ChemicalsValue: number;
  MotorsDemand: number;
  MotorsValue: number;
  PlanesDemand: number;
  PlanesValue: number;
  ElectronicsDemand: number;
  ElectronicsValue: number;
  Isolation: number;
  ResearchSpending: number;
  ResearchEfficiency: number;
  ResearchEffectiveness: number;
  ResearchBoostFromTech: number;
  ResearchPointGain: number;
  ResearchPoints: number;
  FutureResearchPoints: number;
  Technologies: TechnologiesType;
  AristocracyTax: number; //Show in percent
  ClergyTax: number; //Show in percent
  BurgousieTax: number; //Show in percent
  UrbanTax: number; //Show in percent
  BureaucratsTax: number; //Show in percent
  IntellectualsTax: number; //Show in percent
  MilitaryTax: number; //Show in percent
  WorkersTax: number; //Show in percent
  ExternalTariffs: number;
  InternalTariffs: number;
  TariffEfficiency: number;
  Gdp: number;
  GdpPerKCapita: number;
  DebtToGdpRatio: number;
  UnemployedSol: number;
  SlavesSol: number;
  LabourersSol: number;
  SerfsSol: number;
  FarmersSol: number;
  TownsfolkSol: number;
  ClergySol: number;
  BureaucratsSol: number;
  MerchantsSol: number;
  IntellectualsSol: number;
  SailorsSol: number;
  SoldiersSol: number;
  AristocracySol: number;
  BurgousieSol: number;
  AverageSol: number;
  ExpectedSlavesSol: number;
  ExpectedLabourersSol: number;
  ExpectedSerfsSol: number;
  ExpectedUnemployedSol: number;
  ExpectedFarmersSol: number;
  ExpectedTownsfolkSol: number;
  ExpectedClergySol: number;
  ExpectedBureaucratsSol: number;
  ExpectedMerchantsSol: number;
  ExpectedIntellectualsSol: number;
  ExpectedSailorsSol: number;
  ExpectedSoldiersSol: number;
  ExpectedAristocracySol: number;
  ExpectedBurgousieSol: number;
  ExpectedPrivateBasicArmaments: number;
  AverageExpectedSol: number;
  PossiblePublicDebt: number;
  PublicDebtTaken: number;
  EffectiveDebt: number;
  PublicDebtLength: number;
  InterestRate: number;
  DebtHappinessEffect: number;
  BudgetIncoming: number;
  BudgetOutgoing: number;
  Balance: number;
  CulturalAdvance: number;
  CulturalProsperity: number;
  CulturalPowerGain: number;
  CulturalPower: number;
  FutureCulturalPower: number;
  CulturalAdvancements: CulturalAdvancementsType;
  FoodIncoming: number;
  FoodOutgoing: number;
  CoalIncoming: number;
  CoalOutgoing: number;
  SulphurIncoming: number;
  SulphurOutgoing: number;
  CottonIncoming: number;
  CottonOutgoing: number;
  GoldIncoming: number;
  GoldOutgoing: number;
  IronIncoming: number;
  IronOutgoing: number;
  TeaIncoming: number;
  TeaOutgoing: number;
  SilkIncoming: number;
  SilkOutgoing: number;
  SpiceIncoming: number;
  SpiceOutgoing: number;
  WoolIncoming: number;
  WoolOutgoing: number;
  CoffeeIncoming: number;
  CoffeeOutgoing: number;
  FurIncoming: number;
  FurOutgoing: number;
  DiamondIncoming: number;
  DiamondOutgoing: number;
  SilverIncoming: number;
  SilverOutgoing: number;
  CopperIncoming: number;
  CopperOutgoing: number;
  IvoryIncoming: number;
  IvoryOutgoing: number;
  CocoaIncoming: number;
  CocoaOutgoing: number;
  TobaccoIncoming: number;
  TobaccoOutgoing: number;
  SugarIncoming: number;
  SugarOutgoing: number;
  ExoticFruitIncoming: number;
  ExoticFruitOutgoing: number;
  HousingIncoming: number;
  HousingOutgoing: number;
  TextilesIncoming: number;
  TextilesOutgoing: number;
  BasicGoodsIncoming: number;
  BasicGoodsOutgoing: number;
  LuxuryGoodsIncoming: number;
  LuxuryGoodsOutgoing: number;
  AlcoholIncoming: number;
  AlcoholOutgoing: number;
  BasicToolsIncoming: number;
  BasicToolsOutgoing: number;
  HeavyIndustryIncoming: number;
  HeavyIndustryOutgoing: number;
  BasicArmamentsIncoming: number;
  BasicArmamentsOutgoing: number;
  HeavyArmamentsIncoming: number;
  HeavyArmamentsOutgoing: number;
  ShipBuildingIncoming: number;
  ShipBuildingOutgoing: number;
  ChemicalsIncoming: number;
  ChemicalsOutgoing: number;
  MotorsIncoming: number;
  MotorsOutgoing: number;
  PlanesIncoming: number;
  PlanesOutgoing: number;
  ElectronicsIncoming: number;
  ElectronicsOutgoing: number;
  WoodBaseValue: number;
  SulphurBaseValue: number;
  CoalBaseValue: number;
  CottonBaseValue: number;
  GoldBaseValue: number;
  IronBaseValue: number;
  TeaBaseValue: number;
  SilkBaseValue: number;
  SpiceBaseValue: number;
  WoolBaseValue: number;
  CoffeeBaseValue: number;
  FurBaseValue: number;
  DiamondBaseValue: number;
  SilverBaseValue: number;
  CopperBaseValue: number;
  IvoryBaseValue: number;
  CocoaBaseValue: number;
  TobaccoBaseValue: number;
  SugarBaseValue: number;
  ExoticFruitBaseValue: number;
  HousingBaseValue: number;
  TextilesBaseValue: number;
  BasicGoodsBaseValue: number;
  LuxuryGoodsBaseValue: number;
  AlcoholBaseValue: number;
  BasicToolsBaseValue: number;
  HeavyIndustryBaseValue: number;
  BasicArmamentsBaseValue: number;
  HeavyArmamentsBaseValue: number;
  ShipBuildingBaseValue: number;
  ChemicalsBaseValue: number;
  MotorsBaseValue: number;
  PlanesBaseValue: number;
  ElectronicsBaseValue: number; 
  TradePowerFromResourceTrade: number;
  ArableLand: number;
  AgricultureSubsidies: number;
  Fertility: number;
  AgricultureInfrastructure: number;
  StockingCapabilities: number;
  AgricultureAdvancements: number;
  AgricultureTechnology: number;
  FarmingEfficiency: number;
  AgricultureSpending: number;
  FoodPerTurn: number;
  FoodConsumption: number;
  FoodGain: number;
  MaxFoodStock: number;
  FoodRationing: boolean;
  Food: number;
  FutureFood: number;
  FoodPopulationBoost: number;
  SurplusFood: number;
  SellingCapability: number;
  FoodSold: number;
  FoodLost: number;
  FoodTradeProfit: number;
  TradeProfit: number;
  Casualties: number;
  Pillaging: number;
  Occupation: number;
  Blockade: number;
  WarExhaustion: number;
  MinorBattles: number;
  MajorBattles: number;
  Fervor: number;
  TradeInfluences: tradeInfluencesType;
  EstateInfluences: estateInfluences;
  ExpectedInfluences: estateInfluences;
  Size: number;
  KmSquared: number;
  PopulationDensityPerKmSquared: number;
  Disease: number;
  MaxPopulation: number;
  UnderPopulation: number;
  DetachedLand: number;
  urbanPopulation: number;
  UrbanPopulationPercent: number;
  coastalPopulation: number;
  CoastalPopulationPercent: number;
  DevelopmentPixelCount: number;
  AverageDevelopment: number;
  LandAdministration: number;
  Overextension: number;
  Climates: Record<string, NationClimate>;
  HabitableLand: number;

  constructor(nationName: string) {
    /* #region  Stats to Set Immedietly */
    /* #region  Main */
    this.GovernmentName = nationName;
    this.Flag = "";
    this.Color = "";
    this.ReligionGroups = startingReligionGroups;
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
    }
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

    this.CultureGroups = {}
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

    this.Technologies = technologies
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
    }

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
      const ti = {};
      for (const element in tradeZones) {
        ti[element] = {TradingPoints: 0};
      }
      return ti as tradeInfluencesType;
    })();
    /* #endregion */

    /* #region  Land */
    this.Climates = (function () {
      const c = {}
      for (const element in gameStats.Climates) {
        c[element] = {Pixels: 0};
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
  TimeSpeed: number;
  TimeDivide: number;
  Nations: Record<string, Nation> = {};
  Religions: Record<string, SocialBehaviour> = religions;
  Cultures: Record<string, SocialBehaviour> = {
    //For Opinions not mentioned, they are neutral towards them.
  };
  ResourceTypes = realResourceTypes;
  Estates = estates;
  EstateGenereal = estates;
  Trades: Record<string, Trade> = {};
  TradeZones: TradeZonesType = tradeZones;
  Climates: Climates = climates;
  Fertility: Record<string, {Color: string, Score: number}> = fertilities;
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
  return gameStats
}

export function clearNewTroops(nationName){
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

export function GSNewProperty(propertySelection: string, ProvidedClass, parameters: string) {
  (new Function('gameStats', '_class', `gameStats${propertySelection} = new _class(${parameters})`))(gameStats, ProvidedClass.name);
}

export function GSDeleteProperty(propertyName){
  (new Function('gameStats', `delete gameStats${propertyName}`))(gameStats);
}

export function GSUpdateTradesWithRenamedNationName(oldName, newName){
  //copy over all Trades, as is, except if giver or receiver is oldName, then it's newName now

  Object.keys(gameStats.Trades).forEach(property => {
    if (gameStats.Trades[property].giver == oldName)
      gameStats.Trades[property].giver = newName;
    if (gameStats.Trades[property].receiver == oldName)
      gameStats.Trades[property].receiver = newName;
  });
}
