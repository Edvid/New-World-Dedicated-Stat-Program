import { type ColorHaver } from "../mapcalc/color_properties.js";

export class Trade {
  giver: string; //nation name
  receiver: string; //nation name
  amount: number;
  resource: string; //can include food or budget
}

export class TradeZone implements ColorHaver {
  Color: string;
  Score: number;
}

// fillInColorProperties(gameStats.TradeZones) complains about index signatures if an interface
// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type TradeZonesType = {
  Alaska: TradeZone;
  Cascadia: TradeZone;
  CaliforniaAndWestMexico: TradeZone;
  HudsonBay: TradeZone;
  GreatLakes: TradeZone;
  Louisiana: TradeZone;
  GulfOfMexico: TradeZone;
  LawrenceGulf: TradeZone;
  EastCoast: TradeZone;
  Carribean: TradeZone;
  CentralAmerica: TradeZone;
  GuyanaAndSuriname: TradeZone;
  Amazon: TradeZone;
  Peru: TradeZone;
  RioGrande: TradeZone;
  LaPlata: TradeZone;
  Chile: TradeZone;
  Patagonia: TradeZone;
  NorthernAnatolia: TradeZone;
  NorthSea: TradeZone;
  BritishIsles: TradeZone;
  EnglishChannel: TradeZone;
  France: TradeZone;
  BayOfBiscay: TradeZone;
  WestIberia: TradeZone;
  Gibraltar: TradeZone;
  WesternMediterranean: TradeZone;
  Rhine: TradeZone;
  CentralMediterranean: TradeZone;
  Adriatic: TradeZone;
  Germany: TradeZone;
  WesternDanube: TradeZone;
  Denmark: TradeZone;
  Baltic: TradeZone;
  NorthNordics: TradeZone;
  BarentsSea: TradeZone;
  Novgorod: TradeZone;
  Poland: TradeZone;
  Dniepr: TradeZone;
  Crimea: TradeZone;
  EasternDanube: TradeZone;
  Greece: TradeZone;
  EasternMediterranean: TradeZone;
  Egypt: TradeZone;
  RedSea: TradeZone;
  WesternSahara: TradeZone;
  CoteDIvoire: TradeZone;
  Nigeria: TradeZone;
  SouthNile: TradeZone;
  Somalia: TradeZone;
  Kongo: TradeZone;
  EastAfrica: TradeZone;
  Mozambique: TradeZone;
  SouthAfrica: TradeZone;
  Mesopotamia: TradeZone;
  PersianGulf: TradeZone;
  Caucasus: TradeZone;
  DonRiver: TradeZone;
  Volga: TradeZone;
  CentralAsia: TradeZone;
  WestSiberia: TradeZone;
  EastSiberia: TradeZone;
  Iran: TradeZone;
  Pakistan: TradeZone;
  Tibet: TradeZone;
  Mongolia: TradeZone;
  Manchuria: TradeZone;
  SeaOfJapan: TradeZone;
  NorthChina: TradeZone;
  YangtzeRiver: TradeZone;
  SouthChina: TradeZone;
  NorthIndia: TradeZone;
  WestIndia: TradeZone;
  EastIndia: TradeZone;
  Burma: TradeZone;
  SouthEastAsia: TradeZone;
  NorthAustralia: TradeZone;
  SouthAustralia: TradeZone;
  CentralSiberia: TradeZone;
  EasternSiberia: TradeZone;
  WesternSiberia: TradeZone;
  NorthernNordics: TradeZone;
  CentralCanada: TradeZone;
  BalticSea: TradeZone;
  Livonia: TradeZone;
  Muscovy: TradeZone;
  UralRiver: TradeZone;
  Vistula: TradeZone;
  CentralEurope: TradeZone;
  Romania: TradeZone;
  TheRockies: TradeZone;
  Mississippi: TradeZone;
  SouthernFrance: TradeZone;
  CaspianSea: TradeZone;
  GobiDesert: TradeZone;
  WestCoast: TradeZone;
  Iberia: TradeZone;
  YellowRiver: TradeZone;
  Afghanistan: TradeZone;
  IndusRiver: TradeZone;
  Morocco: TradeZone;
  Sichuan: TradeZone;
  Sahara: TradeZone;
  ArabianDesert: TradeZone;
  WesternMexico: TradeZone;
  Ganges: TradeZone;
  Caribbean: TradeZone;
  Pacific: TradeZone;
  SouthChinaSea: TradeZone;
  CentralIndia: TradeZone;
  Deccan: TradeZone;
  SouthernNile: TradeZone;
  WesternNiger: TradeZone;
  Guinea: TradeZone;
  EasternNiger: TradeZone;
  Venezuela: TradeZone;
  Indonesia: TradeZone;
  CongoRiver: TradeZone;
  Gabon: TradeZone;
  LakeVictoria: TradeZone;
  LakeTanganyika: TradeZone;
  SaoFranciscoRiver: TradeZone;
  NorthernAustralia: TradeZone;
  Angola: TradeZone;
  ParanaRiver: TradeZone;
  SouthernAustralia: TradeZone;
  AustralianDesert: TradeZone;
};
export type tradeInfluencesType = {
  [K in keyof TradeZonesType]: {
    TradingPoints: number;
  };
};
export const tradeZones: TradeZonesType = {
  Alaska: {
    Color: "ff6c7a",
    Score: 1
  },
  Cascadia: {
    Color: "ff006e",
    Score: 3
  },
  CaliforniaAndWestMexico: {
    Color: "none",
    Score: 4
  },
  HudsonBay: {
    Color: "ffeb63",
    Score: 3
  },
  GreatLakes: {
    Color: "3dffff",
    Score: 7
  },
  Louisiana: {
    Color: "none",
    Score: 7
  },
  GulfOfMexico: {
    Color: "ffac54",
    Score: 8
  },
  LawrenceGulf: {
    Color: "ff6a38",
    Score: 4.5
  },
  EastCoast: {
    Color: "cc0000",
    Score: 7
  },
  Carribean: {
    Color: "none",
    Score: 8
  },
  CentralAmerica: {
    Color: "a0a0a0",
    Score: 6
  },
  GuyanaAndSuriname: {
    Color: "none",
    Score: 3
  },
  Amazon: {
    Color: "2d9600",
    Score: 3
  },
  Peru: {
    Color: "9e0000",
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
    Color: "ffe846",
    Score: 2
  },
  Patagonia: {
    Color: "68d7ff",
    Score: 2
  },
  NorthernAnatolia: {
    Color: "5b8f00",
    Score: 10
  },
  NorthSea: {
    Color: "7382ff",
    Score: 4.5
  },
  BritishIsles: {
    Color: "808080",
    Score: 8
  },
  EnglishChannel: {
    Color: "ff4a00",
    Score: 10
  },
  France: {
    Color: "00d5ff",
    Score: 7
  },
  BayOfBiscay: {
    Color: "efff66",
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
    Color: "ffd846",
    Score: 7
  },
  Rhine: {
    Color: "0094ff",
    Score: 7
  },
  CentralMediterranean: {
    Color: "ff7d49",
    Score: 8
  },
  Adriatic: {
    Color: "007f0e",
    Score: 10
  },
  Germany: {
    Color: "none",
    Score: 7
  },
  WesternDanube: {
    Color: "404040",
    Score: 7
  },
  Denmark: {
    Color: "ff0000",
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
    Color: "ff553e",
    Score: 3
  },
  Novgorod: {
    Color: "00ff21",
    Score: 8
  },
  Poland: {
    Color: "none",
    Score: 6
  },
  Dniepr: {
    Color: "80ff65",
    Score: 8.5
  },
  Crimea: {
    Color: "31aadb",
    Score: 7
  },
  EasternDanube: {
    Color: "5d7c3d",
    Score: 8.5
  },
  Greece: {
    Color: "0065ff",
    Score: 9.5
  },
  EasternMediterranean: {
    Color: "80ff00",
    Score: 8
  },
  Egypt: {
    Color: "ff1410",
    Score: 7
  },
  RedSea: {
    Color: "2b6d0e",
    Score: 7
  },
  WesternSahara: {
    Color: "fed800",
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
    Color: "529bae",
    Score: 7
  },
  Kongo: {
    Color: "none",
    Score: 3
  },
  EastAfrica: {
    Color: "0094d7",
    Score: 3
  },
  Mozambique: {
    Color: "00ff69",
    Score: 4
  },
  SouthAfrica: {
    Color: "8f00ff",
    Score: 5
  },
  Mesopotamia: {
    Color: "7f3300",
    Score: 6.5
  },
  PersianGulf: {
    Color: "ffc430",
    Score: 7
  },
  Caucasus: {
    Color: "ff2f3e",
    Score: 6
  },
  DonRiver: {
    Color: "ffd86d",
    Score: 6
  },
  Volga: {
    Color: "db7a25",
    Score: 6
  },
  CentralAsia: {
    Color: "9fffff",
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
    Color: "8ffd42",
    Score: 5
  },
  Pakistan: {
    Color: "none",
    Score: 7
  },
  Tibet: {
    Color: "b200ff",
    Score: 2
  },
  Mongolia: {
    Color: "none",
    Score: 3
  },
  Manchuria: {
    Color: "e8ff65",
    Score: 6.5
  },
  SeaOfJapan: {
    Color: "00ffff",
    Score: 7.5
  },
  NorthChina: {
    Color: "none",
    Score: 7
  },
  YangtzeRiver: {
    Color: "3dfd00",
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
    Color: "ff3d3d",
    Score: 8
  },
  NorthAustralia: {
    Color: "none",
    Score: 5
  },
  SouthAustralia: {
    Color: "none",
    Score: 6
  },
  CentralSiberia: {
    Color: "69a826",
    Score: 0
  },
  EasternSiberia: {
    Color: "331b1b",
    Score: 0
  },
  WesternSiberia: {
    Color: "264a00",
    Score: 0
  },
  NorthernNordics: {
    Color: "ffd6e4",
    Score: 0
  },
  CentralCanada: {
    Color: "a5a5a5",
    Score: 0
  },
  BalticSea: {
    Color: "8f00c2",
    Score: 0
  },
  Livonia: {
    Color: "801065",
    Score: 0
  },
  Muscovy: {
    Color: "e1d869",
    Score: 0
  },
  UralRiver: {
    Color: "dcff44",
    Score: 0
  },
  Vistula: {
    Color: "ff7e70",
    Score: 0
  },
  CentralEurope: {
    Color: "8080a3",
    Score: 0
  },
  Romania: {
    Color: "d100dc",
    Score: 0
  },
  TheRockies: {
    Color: "7f4618",
    Score: 0
  },
  Mississippi: {
    Color: "00ba21",
    Score: 0
  },
  SouthernFrance: {
    Color: "46a7ff",
    Score: 0
  },
  CaspianSea: {
    Color: "3881ff",
    Score: 0
  },
  GobiDesert: {
    Color: "e1e9cd",
    Score: 0
  },
  WestCoast: {
    Color: "ffdb7b",
    Score: 0
  },
  Iberia: {
    Color: "3a9112",
    Score: 0
  },
  YellowRiver: {
    Color: "3aaa0e",
    Score: 0
  },
  Afghanistan: {
    Color: "592b37",
    Score: 0
  },
  IndusRiver: {
    Color: "267f00",
    Score: 0
  },
  Morocco: {
    Color: "7f0001",
    Score: 0
  },
  Sichuan: {
    Color: "c6d521",
    Score: 0
  },
  Sahara: {
    Color: "b7a791",
    Score: 0
  },
  ArabianDesert: {
    Color: "e2ceb1",
    Score: 0
  },
  WesternMexico: {
    Color: "469b52",
    Score: 0
  },
  Ganges: {
    Color: "db6525",
    Score: 0
  },
  Caribbean: {
    Color: "3c02ff",
    Score: 0
  },
  Pacific: {
    Color: "93ffff",
    Score: 0
  },
  SouthChinaSea: {
    Color: "4d007f",
    Score: 0
  },
  CentralIndia: {
    Color: "ec7f7f",
    Score: 0
  },
  Deccan: {
    Color: "84ff55",
    Score: 0
  },
  SouthernNile: {
    Color: "d9ff00",
    Score: 0
  },
  WesternNiger: {
    Color: "b6ff4a",
    Score: 0
  },
  Guinea: {
    Color: "ff8ca3",
    Score: 0
  },
  EasternNiger: {
    Color: "3bd323",
    Score: 0
  },
  Venezuela: {
    Color: "c3ff2b",
    Score: 0
  },
  Indonesia: {
    Color: "fec605",
    Score: 0
  },
  CongoRiver: {
    Color: "dd6a00",
    Score: 0
  },
  Gabon: {
    Color: "107f00",
    Score: 0
  },
  LakeVictoria: {
    Color: "9fa300",
    Score: 0
  },
  LakeTanganyika: {
    Color: "b67871",
    Score: 0
  },
  SaoFranciscoRiver: {
    Color: "6aff2b",
    Score: 0
  },
  NorthernAustralia: {
    Color: "ff7400",
    Score: 0
  },
  Angola: {
    Color: "a3ff27",
    Score: 0
  },
  ParanaRiver: {
    Color: "2ba6ff",
    Score: 0
  },
  SouthernAustralia: {
    Color: "b6c2ff",
    Score: 0
  },
  AustralianDesert: {
    Color: "d8c5a9",
    Score: 0
  }
};
