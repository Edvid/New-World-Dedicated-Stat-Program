export interface personnel {
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
}

interface materiel {
  SiegeEquipment: number;
  LargeSiegeEquipment: number;
  FieldCannons: number;
  SiegeGuns: number;
}

type baseUnits = personnel & materiel;
export type WithNewForm<T extends string> = T | `New_${T}`

export type units = Record<WithNewForm<keyof baseUnits>, number>
