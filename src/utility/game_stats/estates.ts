import { type Replace } from "../types/replace";
import { type WithFutureForm } from "./with_future_form";

export interface estatesWithInfluence {
  Aristocracy: never;
  Clergy: never;
  Burgousie: never;
  Urban: never;
  Bureaucrats: never;
  Intellectuals: never;
  Military: never;
  Workers: never;
}

export interface estatesWithNoInfluence {
  Unemployed: never;
  Slaves: never;
  Labourers: never;
  Serfs: never;
  Farmers: never;
  Townsfolk: never;
  Merchants: never;
  Sailors: never;
  Soldiers: never;
}

type estates = keyof estatesWithNoInfluence | keyof estatesWithInfluence

export type workforces = Record<
  Replace<
  Replace<estates, "Military", "Soldiers">,
  "Urban" | "Workers",
  never
  >,
  number
>

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

export type estateInfluences = Record<`${keyof estatesWithInfluence}Influence`, number>;
export type influenceChangeLoyaltyEffect = Record<keyof estatesWithInfluence, number>;
export type militaryControl = Record<
  Replace<`${keyof estatesWithInfluence}Control`, "MilitaryControl", "Independent">, number
>;
export type govermentRepresentation = Record<`${keyof estatesWithInfluence | "Unitary"}Representation`, number>;

type LiteracyTypes = Record<`${keyof workforces}Literacy`, number>

export type Literacies = LiteracyTypes & Record<WithFutureForm<"LiteracyPercent">, number>

export type PoliticalAwareness = Record<`${keyof estatesWithInfluence}PoliticalAwareness`, number>

export type WageStats = Record<
  `${keyof workforces | "StateFarmer" | "StateLabourer" | "StateFactoryWorker" | "Army" }Wage`,
  number
>
