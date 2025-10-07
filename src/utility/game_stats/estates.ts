import { type AbstractType } from "../types/abstract";
import { type Replace } from "../types/replace";
import { type personnel } from "./military";
import { type WithFutureForm } from "./with_future_form";

type highClassEstates = AbstractType<{
  Aristocracy: never;
  Clergy: never;
  Burgousie: never;
}>

type estatesWithInfluence = AbstractType<highClassEstates &
{
  Urban: never;
  Bureaucrats: never;
  Intellectuals: never; //
  Military: never;
  Workers: never;
}>

type estatesWithNoInfluence = AbstractType<{
  Unemployed: never; //
  Slaves: never;
  Labourers: never; //
  Serfs: never; //
  Farmers: never; //
  Townsfolk: never; //
  Merchants: never; //
  Sailors: never;
  Soldiers: never;
}>

type estates = keyof estatesWithNoInfluence | keyof estatesWithInfluence

export type workforces = Record<
  Replace<
  Replace<estates, "Military", "Soldiers">,
  "Urban" | "Workers",
  never
  >,
  number
>

export const estateGeneral: (keyof estatesWithInfluence)[] = [
  "Workers",
  "Urban",
  "Clergy",
  "Bureaucrats",
  "Intellectuals",
  "Military",
  "Aristocracy",
  "Burgousie"
];

export const estates: estates[] = [
  "Unemployed",
  "Slaves",
  "Labourers",
  "Serfs",
  "Farmers",
  "Townsfolk",
  "Clergy",
  "Bureaucrats",
  "Merchants",
  "Intellectuals",
  "Sailors",
  "Soldiers",
  "Aristocracy",
  "Burgousie"
];

export const generalPopulace: estates[] = [
  "Labourers",
  "Serfs",
  "Unemployed",
  "Farmers",
  "Townsfolk",
  "Merchants",
  "Intellectuals"
]

export type estateInfluences = Record<`${keyof estatesWithInfluence}Influence`, number>;

type estateLoyalties = Record<`${keyof estatesWithInfluence}Loyalty`, number>

export type influenceChangeLoyaltyEffect = Record<keyof estatesWithInfluence, number>;
export type militaryControl = Record<
  Replace<`${keyof estatesWithInfluence}Control`, "MilitaryControl", "Independent">, number
>;
export type govermentRepresentation = Record<`${keyof estatesWithInfluence | "Unitary"}Representation`, number>;

type LiteracyTypes = Record<`${keyof workforces}Literacy`, number>

type Literacies = LiteracyTypes & Record<WithFutureForm<"LiteracyPercent">, number>

type PoliticalAwareness = Record<`${keyof estatesWithInfluence}PoliticalAwareness`, number>

type WageStats = Record<
  `${keyof workforces | "StateFarmer" | "StateLabourer" | "StateFactoryWorker" | "Army" }Wage`,
  number
>

type estateTaxes = Record<`${keyof workforces}Taxes`, number>

type setTax = Record<`${keyof estatesWithInfluence}Tax`, number>

type privateArmyCallupCost = Record<`${keyof highClassEstates}CallupCost`, number>

type privateArmyPersonnelTypes = Replace<keyof personnel, "HandCannoneers", never>

type privateArmyPersonnel = Record<`${keyof highClassEstates}${privateArmyPersonnelTypes}`, number>
type PrivateArmies = privateArmyPersonnel & privateArmyCallupCost

type estateSol = Record<`${keyof workforces}Sol`, number>
type expectedEstateSol = Record<`Expected${keyof estateSol}`, number>

type estateSols = estateSol & expectedEstateSol
export type estateStats = PrivateArmies & Literacies & PoliticalAwareness & estateLoyalties & WageStats & estateTaxes & setTax & estateSols

