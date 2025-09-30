import { AbstractType } from "../../types/abstract";

export interface ReformsType {
  SlaveryAllowed: boolean;
  SlaveryBanned: boolean;

  SerfdomAllowed: boolean;
  SerfdomBanned: boolean;

  OpenFieldSystem: boolean;
  Enclosure: boolean;

  Isolationism: boolean;
  Mercantilism: boolean;
  Protectionism: boolean;
  FreeTrade: boolean;

  Guilds: boolean;
  GuildsBanned: boolean;
  AntiMonopolyLaws: boolean;

  NoVoting: boolean;
  HighClassVoting: boolean;
  WealthVoting: boolean;
  UniversalSuffrage: boolean;

  NoblePrivilege: boolean;
  WealthPrivilege: boolean;
  ClassEquality: boolean;

  NobleOfficers: boolean;
  WealthyOfficers: boolean;
  MeritocraticOfficers: boolean;

  NobleBureaucrats: boolean;
  ClergyBureaucrats: boolean;
  WealthyBureaucrats: boolean;
  MeritocraticBureaucrats: boolean;

  NobleResourceOwnership: boolean;
  MixedResourceOwnership: boolean;
  BurgousieResourceOwnership: boolean;
  GovernmentResourceOwnership: boolean;

  NobleLandOwnership: boolean;
  MixedLandOwnership: boolean;
  PrivateLandOwnership: boolean;
  GovernmentLandOwnership: boolean;

  NationalMilitia: boolean;
  FeudalLevies: boolean;
  ProffesionalArmy: boolean;
  MassConscription: boolean;

  FeudalNobleArmies: boolean;
  Mercenaries: boolean;
  ReligiousOrders: boolean;

  StateMediaOnly: boolean;
  ExtensiveCensorship: boolean;
  LimitedCensorship: boolean;
  FreeSpeech: boolean;

  NoSocialMobility: boolean;
  RestrictedSocialMobility: boolean;
  UnrestrictedSocialMobility: boolean;

  StateReligion: boolean;
  RestrictiveReligionLaws: boolean;
  FreedomOfReligion: boolean;

  PrivateEducationOnly: boolean;
  ReligiousSchools: boolean;
  PublicEducation: boolean;

  CommunityPolicing: boolean;
  RegionalPolice: boolean;
  StatePolice: boolean;
  SecretPolice: boolean;

  NoWeaponLaws: boolean;
  LimitedWeaponOwnership: boolean;
  WeaponOwnershipForbidden: boolean;
}

type ReformTypesForScales = AbstractType<{
  Slavery: never;
  Serfdom: never;
  Enclosure: never;
  Trade: never;
  Antitrust: never;
  Suffrage: never;
  Privilege: never;
  Officers: never;
  Bureaucrats: never;
  Resource: never;
  Land: never;
  Army: never;
  Censorship: never;
  Social: never;
  Religious: never;
  Education: never;
  Police: never;
  Weapon: never;
}>

type ReformTypesForToggles = AbstractType<{
  FeudalArmies: never;
  Mercenaries: never;
  ReligiousOrders: never;
}>

type ReformCostTypesForScales = Record<
  `${keyof ReformTypesForScales}ReformRegressionCost` |
  `${keyof ReformTypesForScales}ReformAdvanceCost`, number
>;

type ReformCostTypesForToggles = Record<
  `${keyof ReformTypesForToggles}ChangeCost`, number
>;

export type RealReformCostTypes = ReformCostTypesForScales & ReformCostTypesForToggles;
