type mappedResource = "Fur" |
"Gold" |
"Iron" |
"Ivory" |
"Sulphur" |
"Coal" |
"Copper" |
"Diamond" |
"Silver"

export const mappedResources: mappedResource[] = [
    "Fur",
    "Gold",
    "Iron",
    "Ivory",
    "Sulphur",
    "Coal",
    "Copper",
    "Diamond",
    "Silver"
];

export const mappedResourcesMultipliers: Record<mappedResource, number> = {
    Fur: 1,
    Gold: 1,
    Iron: 1,
    Ivory: 1,
    Sulphur: 1,

    //x2
    Coal: 2,
    Copper: 2,
    Diamond: 2,
    Silver: 2
};

const resourceTypes = [
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
    "Wood",
    "Ivory",
    "Cocoa",
    "Tobacco",
    "Sugar",
    "ExoticFruit",
    "Housing",
    "BasicArmaments",
    "HeavyArmaments",
    "ShipBuilding",
    "BasicTools",
    "Textiles",
    "BasicGoods",
    "LuxuryGoods",
    "Alcohol",
    "Chemicals",
    "Electronics",
    "Motors",
    "Planes",
    "HeavyIndustry"
];
export const realResourceTypes = [
    "Budget",
].concat(resourceTypes);

export const TradePowerResources = resourceTypes.filter((item) => item !== "Food")
