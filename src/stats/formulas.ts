import { lazyerror } from "../utility/custom_errors.js";
import { mappedResources } from "../utility/game_stats/resources.js";
import { min, max, clamp } from "../utility/math.js";
import { clearNewTroops, getGameStats, Opinion, type SocialBehaviour, type SocialBehaviourGroup } from "./gameStats.js";

export function evaluateNation(nationName) {
  const n = getGameStats().Nations[nationName];

  const nations = getGameStats().Nations;

  const estates = getGameStats().Estates;
  const estatesGeneral = getGameStats().EstatesGeneral;

  const climates = getGameStats().Climates;

  const cultures = getGameStats().Cultures;
  const religions = getGameStats().Religions;

  const resourceTypes = getGameStats().ResourceTypes;

  const trades = getGameStats().Trades;
  const tradeZones = getGameStats().TradeZones;

  const timeDivide = getGameStats().TimeDivide;


  const estateWithHighestRepresentation = Object.entries(n.GovernmentRepresentation)
  .sort(([_a_name, a_repValue], [_b_name, b_repValue]) =>
    b_repValue - a_repValue
  ).at(0)
  const [highrep_name, highrep_value] = estateWithHighestRepresentation
  if (highrep_value > 50) {
    n.GovernmentDominatedBy = highrep_name;
  } else {
    n.GovernmentDominatedBy = "none"
  }

  if (n.GovernmentDominatedBy == "none" || n.GovernmentDominatedBy == "Unitary") {
    n.GovernmentEffects = "none";
  }
  if (n.GovernmentDominatedBy == "Workers") {
    n.GovernmentEffects = "+CulturalDisunity, +ReligiousDisunity, +FarmingEff";
  }
  if (n.GovernmentDominatedBy == "Urban") {
    n.GovernmentEffects = "-Adm, +CulturalDisunity, +TradeEff, +ProductionEff";
  }
  if (n.GovernmentDominatedBy == "Clergy") {
    n.GovernmentEffects = "+ReligiousDisunity, -Tech, -CulturalDisunity";
  }
  if (n.GovernmentDominatedBy == "Bureaucrats") {
    n.GovernmentEffects = "-Tech, +Adm, +PopulationControl";
  }
  if (n.GovernmentDominatedBy == "Intellectuals") {
    n.GovernmentEffects = "-PopulationControl, +Tech, +Education";
  }
  if (n.GovernmentDominatedBy == "Military") {
    n.GovernmentEffects = "-Adm, +WarSupport, +Morale, +PopulationControl";
  }
  if (n.GovernmentDominatedBy == "Aristocracy") {
      n.GovernmentEffects = "+Corruption, -FarmingEff, +Adm";
  }
  if (n.GovernmentDominatedBy == "Burgousie") {
    n.GovernmentEffects = "+Corruption, -Adm, +TradeEff, +ProductionEff";
  }

    n.AgricultureTechnology = 0 + Number(n.Technologies.HorseCollar) + Number(n.CulturalAdvancements.PotatoPopulationBoom) + Number(n.Reforms.Enclosure) + Number(n.Technologies.CannedFood) + Number(n.Reforms.MixedLandOwnership) + Number(n.Reforms.PrivateLandOwnership) * 2;
  n.FarmingEfficiency = (1 - n.Alcoholism * (1 - n.ReligionGroups.Sunni.Points / 100 - n.ReligionGroups.Shia.Points / 100) / 2 + n.AgricultureSubsidies / 10 + (n.AgricultureInfrastructure + n.AgricultureAdvancements - 2) * 0.75 + n.AgricultureTechnology / 20) * (n.GovernmentDominatedBy == "Aristocracy" ? 0.9 : 1) * (n.GovernmentDominatedBy == "Workers" ? 1.1 : 1);

    for (const resource of mappedResources) {
        if (n[resource] > n["Max" + resource]) { n[resource] = n["Max" + resource] }
    }

  {
    const rels = []
    const culs = []
    for (const relname in n.ReligionGroups) {
      const rel = n.ReligionGroups[relname];
      if (rel.Points > 0) {
        rels.push(relname)
      }
    }
    for (const culname in n.CultureGroups) {
      const cul = n.CultureGroups[culname];
      if (cul.Points > 0) {
        culs.push(culname)
      }
    }
    if(rels.length < 2) n.ReligionRepresentedAtGovernmentLevel = rels[0]; 
    if(culs.length < 2) n.CultureRepresentedAtGovernmentLevel = culs[0]; 
  }

  const SocialBehaviourCalc = function(
    socialBehaviourGroup: Record<string, SocialBehaviourGroup>,
    socialBehaviourWorldwideGroups: Record<string, SocialBehaviour>,
    socialGroupRepresentedAtGovernmentLevel?: string){
    let pointSum = 0;
    let SocialBehaviourDisunity = 0;

    for (const socialbehaviourname in socialBehaviourGroup) {
      const Points = socialBehaviourGroup[socialbehaviourname].Points;
      pointSum += Points;
    }

    let socialGroupRepresentedAtGovernmentLevelPercent: number;
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
        //If the social behaviour group to be had an opinion about is also not present in the nation either, n.also doesn't add to the disunity
        const PointsOfOther = socialBehaviourGroup[nameOfSocialBehaviourGroupToBeHadAnOpinionAbout].Points;
        if (PointsOfOther == 0) continue; 

        let opinionScore: number;
        //If the social behaviour group to be had an opinion about, isn't recorded by the social behaviour group we are currently checking Opinions for. Treat the opinion as the default distrust
        let opinionobj: Opinion;
        if (OpinionatedSocialBehaviourGroup.Opinions === undefined || OpinionatedSocialBehaviourGroup.Opinions[nameOfSocialBehaviourGroupToBeHadAnOpinionAbout] === undefined) 
          opinionScore = Opinion.DefaultDistrust;
        else {
          opinionobj = OpinionatedSocialBehaviourGroup.Opinions[nameOfSocialBehaviourGroupToBeHadAnOpinionAbout];
          if(isNaN(opinionobj.Score))
            opinionScore = Opinion[opinionobj.Score];
          else 
            opinionScore = opinionobj.Score;
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
  const cultureCalc = SocialBehaviourCalc(
    n.CultureGroups, 
    cultures, 
    typeof n.CultureRepresentedAtGovernmentLevel !== 'undefined' ? n.CultureRepresentedAtGovernmentLevel : null
  );
  const religionCalc = SocialBehaviourCalc(
    n.ReligionGroups, 
    religions, 
    typeof n.ReligionRepresentedAtGovernmentLevel !== 'undefined' ? n.ReligionRepresentedAtGovernmentLevel : null
  );

  n.Size = (function () {
    let s = 0;
    for (const climate in n.Climates) {
      s += n.Climates[climate].Pixels;
    }
    return s;
  })();

  n.Size += (n.Size <= 0 ? 10000 : 0);

    n.UrbanPopulationPercent = n.urbanPopulation / n.Population;
    n.AverageDevelopment = n.UrbanPopulationPercent;
    if (n.urbanPopulation == 0) n.AverageDevelopment = n.DevelopmentPixelCount / n.Size / 255;
    n.Workforces.Townsfolk = n.AverageDevelopment;
    n.Workforces.Burgousie = 0.005 + n.AverageDevelopment / 100 + Number(n.Reforms.WealthPrivilege) * 0.0005 + Number(n.Reforms.ClassEquality) * 0.0005 + Number(n.Reforms.WealthyBureaucrats) * 0.0005 + Number(n.Reforms.RestrictedSocialMobility) * 0.0005 + Number(n.Reforms.WealthyOfficers) * 0.0005 + Number(n.Reforms.MixedResourceOwnership) * 0.001 + Number(n.Reforms.BurgousieResourceOwnership) * 0.002 + Number(n.Reforms.MixedLandOwnership) * 0.0025 + Number(n.Reforms.PrivateLandOwnership) * 0.005;
    n.Workforces.Aristocracy = 0.02 - Number(n.Reforms.WealthPrivilege) * 0.0005 - Number(n.Reforms.ClassEquality) * 0.0005 - Number(n.Reforms.RestrictedSocialMobility) * 0.0005 - Number(n.Reforms.WealthyOfficers) * 0.0005 - Number(n.Reforms.MixedResourceOwnership) * 0.001 - Number(n.Reforms.BurgousieResourceOwnership) * 0.002 - Number(n.Reforms.MixedLandOwnership) * 0.0025 - Number(n.Reforms.PrivateLandOwnership) * 0.005;

    const education = n.EducationEfficiency * (0.5 + Number(n.Technologies.Paper) * 0.5 + Number(n.Reforms.ReligiousSchools) + Number(n.Reforms.PublicEducation) * 3 - n.Alcoholism * (1 - n.ReligionGroups.Sunni.Points / 100 - n.ReligionGroups.Shia.Points / 100)) * (n.GovernmentDominatedBy == "Intellectuals" ? 1.2 : 1);
    const propagandaReal = n.Propaganda * (Number(n.Reforms.StateMediaOnly) * 2 + Number(n.Reforms.ExtensiveCensorship) * 1.5 + Number(n.Reforms.LimitedCensorship) + Number(n.Reforms.FreeSpeech) * 0.5);
    const populationControlReal = n.PopulationControl * (Number(n.Reforms.CommunityPolicing) * 0.5 + Number(n.Reforms.RegionalPolice) * 0.75 + Number(n.Reforms.StatePolice) * 1.25 + Number(n.Reforms.SecretPolice) * 2) * (n.GovernmentDominatedBy == "Military" || n.GovernmentDominatedBy == "Bureaucrats" ? 1.2 : 1) * (n.GovernmentDominatedBy == "Intellectuals" ? 0.8 : 1);

    n.OverallNumbers = n.Riflemen + n.MusketMilitia + n.Musketeers + n.Levies + n.LightInfantry + n.HeavyInfantry + n.Archers + n.Crossbowmen + n.LightCavalry + n.HeavyCavalry + n.EliteInfantry + n.Militia + n.EliteCavalry + n.HandCannoneers + (n.SiegeEquipment + n.LargeSiegeEquipment) * 10 + n.RegimentalGuns * 3 + n.FieldCannons * 6 + n.SiegeGuns * 10;
    n.OverallShipCount = n.LightShips + n.MediumShips + n.HeavyShips;

    n.BaseIronHarvest = (
        n.Climates.TaigaAndTundra.Pixels * 0.1 +
        n.Climates.MontaneForest.Pixels * 0.75 +
        n.Climates.Medditereanian.Pixels * 0.2 +
        n.Climates.Arid.Pixels * 0.2 +
        n.Climates.Steppe.Pixels * 0.1 +
        n.Climates.Moderate.Pixels * 0.2 +
        n.Climates.SubTropical.Pixels * 0.2 +
        n.Climates.Tropical.Pixels * 0.1 +
        n.Climates.Savanna.Pixels * 0.2 +
        n.Climates.Mountainous.Pixels * 1 +
        n.Climates.Desert.Pixels * 0.05 +
        n.Climates.CoastalDesert.Pixels * 0.2
    ) / 2750 * n.MiningEfficiency * Number(n.Technologies.IronWorking);

    n.BaseIronHarvest = min(n.BaseIronHarvest, n.Population * 0.03 / 20000);

    n.BaseCoalHarvest = (
        n.Climates.TaigaAndTundra.Pixels * 0.1 +
        n.Climates.MontaneForest.Pixels * 0.75 +
        n.Climates.Medditereanian.Pixels * 0.2 +
        n.Climates.Arid.Pixels * 0.2 +
        n.Climates.Steppe.Pixels * 0.1 +
        n.Climates.Moderate.Pixels * 0.2 +
        n.Climates.SubTropical.Pixels * 0.2 +
        n.Climates.Tropical.Pixels * 0.1 +
        n.Climates.Savanna.Pixels * 0.2 +
        n.Climates.Mountainous.Pixels * 1 +
        n.Climates.Desert.Pixels * 0.05 +
        n.Climates.CoastalDesert.Pixels * 0.2
    ) / 2250 * n.MiningEfficiency * (n.Technologies.IronWorking ? 1 : 0.5);

    n.BaseCoalHarvest = min(n.BaseCoalHarvest, n.Population * 0.03 / 20000);

    n.BaseSulphurHarvest = (
        n.Climates.TaigaAndTundra.Pixels * 0.1 +
        n.Climates.MontaneForest.Pixels * 0.75 +
        n.Climates.Medditereanian.Pixels * 0.2 +
        n.Climates.Arid.Pixels * 0.2 +
        n.Climates.Steppe.Pixels * 0.1 +
        n.Climates.Moderate.Pixels * 0.2 +
        n.Climates.SubTropical.Pixels * 0.2 +
        n.Climates.Tropical.Pixels * 0.1 +
        n.Climates.Savanna.Pixels * 0.2 +
        n.Climates.Mountainous.Pixels * 1 +
        n.Climates.Desert.Pixels * 0.05 +
        n.Climates.CoastalDesert.Pixels * 0.2
    ) / 1750 * n.MiningEfficiency * (n.Technologies.IronWorking ? 1 : 0.5);

    n.BaseSulphurHarvest = min(n.BaseSulphurHarvest, n.Population * 0.02 / 20000);

    n.CoastalPopulationPercent = n.coastalPopulation / n.Population;

    n.ArableLand = n.Fertility * (1 - n.Pillaging);
    const maxPopInAgriculture = n.ArableLand * 1000 / n.Population * (1 + n.AgricultureSubsidies / 2 + (n.AgricultureInfrastructure - 1) / 4);

    n.ConscriptionPercent = (n.OverallNumbers + n.SmallForts * 100 + n.MediumForts * 250 + n.BigForts * 400 + n.HugeForts * 800 + n.CityFortifications * 250) / n.Population;
    n.Workforces.Soldiers = n.ConscriptionPercent;
    n.Workforces.Bureaucrats = n.AdministrationSize / 100;
    n.Workforces.Intellectuals = n.HigherEducation / 100;
    n.Workforces.Labourers = (n.Reforms.SlaveryBanned ? (n.BaseIronHarvest + n.BaseCoalHarvest + n.BaseSulphurHarvest + n.Coal + n.Sulphur + n.Cotton + n.Gold + n.Iron + n.Tea + n.Silk + n.Spice + n.Wool + n.Coffee + n.Fur + n.Diamond + n.Silver + n.Copper + n.Ivory + n.Cocoa + n.Tobacco + n.Sugar + n.ExoticFruit + n.Forestry + n.Reforestation) * 20000 / n.Population : (n.BaseIronHarvest + n.BaseCoalHarvest + n.BaseSulphurHarvest + n.Coal + n.Sulphur + n.Cotton + n.Gold + n.Iron + n.Tea + n.Silk + n.Spice + n.Wool + n.Coffee + n.Fur + n.Diamond + n.Silver + n.Copper + n.Ivory + n.Cocoa + n.Tobacco + n.Sugar + n.ExoticFruit + n.Forestry + n.Reforestation) * 20000 / n.Population * 0.2);
    n.Workforces.Slaves = (n.Reforms.SlaveryAllowed ? (n.BaseIronHarvest + n.BaseCoalHarvest + n.BaseSulphurHarvest + n.Coal + n.Sulphur + n.Cotton + n.Gold + n.Iron + n.Tea + n.Silk + n.Spice + n.Wool + n.Coffee + n.Fur + n.Diamond + n.Silver + n.Copper + n.Ivory + n.Cocoa + n.Tobacco + n.Sugar + n.ExoticFruit + n.Forestry + n.Reforestation) * 20000 / n.Population * 0.8 : 0);
    n.Workforces.Merchants = ((n.MerchantShips + n.LocalTrade) * 500) / n.Population;
    n.Workforces.Sailors = (n.MerchantShips * 200 + n.LightShips * 400 + n.MediumShips * 900 + n.HeavyShips * 1600) / n.Population;

    if (1 - n.Workforces.Soldiers - n.Workforces.Townsfolk - n.Workforces.Sailors - n.Workforces.Merchants - n.Workforces.Intellectuals - n.Workforces.Bureaucrats - n.Workforces.Clergy - n.Workforces.Burgousie - n.Workforces.Aristocracy - n.Workforces.Labourers - n.Workforces.Slaves < maxPopInAgriculture) {
        n.Workforces.Farmers = max(n.Reforms.SerfdomBanned ? 1 - n.Workforces.Soldiers - n.Workforces.Townsfolk - n.Workforces.Sailors - n.Workforces.Merchants - n.Workforces.Intellectuals - n.Workforces.Bureaucrats - n.Workforces.Clergy - n.Workforces.Burgousie - n.Workforces.Aristocracy - n.Workforces.Labourers - n.Workforces.Slaves : min(0.075, 1 - n.Workforces.Soldiers - n.Workforces.Townsfolk - n.Workforces.Sailors - n.Workforces.Merchants - n.Workforces.Intellectuals - n.Workforces.Bureaucrats - n.Workforces.Clergy - n.Workforces.Burgousie - n.Workforces.Aristocracy - n.Workforces.Labourers - n.Workforces.Slaves), 0);
        n.Workforces.Serfs = max(n.Reforms.SerfdomAllowed ? 1 - n.Workforces.Soldiers - n.Workforces.Townsfolk - n.Workforces.Sailors - n.Workforces.Merchants - n.Workforces.Intellectuals - n.Workforces.Bureaucrats - n.Workforces.Clergy - n.Workforces.Burgousie - n.Workforces.Aristocracy - n.Workforces.Labourers - n.Workforces.Slaves - n.Workforces.Farmers : 0, 0);
        n.Workforces.Unemployed = 0;
    }
    else {
        n.Workforces.Farmers = max(n.Reforms.SerfdomBanned ? maxPopInAgriculture : min(0.075, 1 - n.Workforces.Soldiers - n.Workforces.Townsfolk - n.Workforces.Sailors - n.Workforces.Merchants - n.Workforces.Intellectuals - n.Workforces.Bureaucrats - n.Workforces.Clergy - n.Workforces.Burgousie - n.Workforces.Aristocracy - n.Workforces.Labourers - n.Workforces.Slaves), 0);
        n.Workforces.Serfs = max(n.Reforms.SerfdomAllowed ? maxPopInAgriculture - n.Workforces.Farmers : 0, 0);
        n.Workforces.Unemployed = 1 - n.Workforces.Soldiers - n.Workforces.Townsfolk - n.Workforces.Sailors - n.Workforces.Merchants - n.Workforces.Intellectuals - n.Workforces.Bureaucrats - n.Workforces.Clergy - n.Workforces.Burgousie - n.Workforces.Aristocracy - n.Workforces.Labourers - n.Workforces.Slaves - maxPopInAgriculture;
    }

    n.PopInAgriculture = n.Workforces.Farmers + n.Workforces.Serfs;


    const aristocracyInfluenceMod = 1 + Number(n.Reforms.LimitedWeaponOwnership) / 10 + Number(n.Reforms.SlaveryAllowed) / 10 + Number(n.Reforms.SerfdomAllowed) / 5 + Number(n.Reforms.Enclosure) / 5 + Number(n.Reforms.HighClassVoting) / 5 + Number(n.Reforms.WealthVoting) / 10 + Number(n.Reforms.NoblePrivilege) / 5 + Number(n.Reforms.WealthPrivilege) / 10 + Number(n.Reforms.NobleOfficers) / 5 + Number(n.Reforms.WealthyOfficers) / 10 + Number(n.Reforms.NobleBureaucrats) / 5 + Number(n.Reforms.WealthyBureaucrats) / 10 + Number(n.Reforms.NobleResourceOwnership) / 5 + Number(n.Reforms.MixedResourceOwnership) / 10 - Number(n.Reforms.GovernmentResourceOwnership) / 4 + Number(n.Reforms.NobleLandOwnership) / 5 + Number(n.Reforms.MixedLandOwnership) / 10 - Number(n.Reforms.GovernmentLandOwnership) / 2 + Number(n.Reforms.FeudalLevies) / 10 + Number(n.Reforms.FeudalNobleArmies) / 10 + Number(n.Reforms.Mercenaries) / 5 + Number(n.Reforms.NoSocialMobility) / 5 + Number(n.Reforms.RestrictedSocialMobility) / 10 + Number(n.Reforms.RegionalPolice) / 5;
    const burgousieInfluenceMod = (1.1 - n.ProductionGovernmentControl) + Number(n.Reforms.LimitedWeaponOwnership) / 10 + Number(n.Reforms.SlaveryAllowed) / 10 + Number(n.Reforms.Enclosure) / 10 + Number(n.Reforms.WealthVoting) / 10 + Number(n.Reforms.WealthPrivilege) / 10 + Number(n.Reforms.WealthyOfficers) / 10 + Number(n.Reforms.WealthyBureaucrats) / 10 + Number(n.Reforms.BurgousieResourceOwnership) / 5 + Number(n.Reforms.MixedResourceOwnership) / 10 - Number(n.Reforms.GovernmentResourceOwnership) / 4 + Number(n.Reforms.PrivateLandOwnership) / 5 + Number(n.Reforms.MixedLandOwnership) / 10 - Number(n.Reforms.GovernmentLandOwnership) / 2 + Number(n.Reforms.Guilds) / 5 + Number(n.Reforms.GuildsBanned) / 10 + Number(n.Reforms.FeudalNobleArmies) / 5 + Number(n.Reforms.Mercenaries) / 5 + Number(n.Reforms.NoSocialMobility) / 10 + Number(n.Reforms.RestrictedSocialMobility) / 5 + Number(n.Reforms.RegionalPolice) / 10;
    const clergyInfluenceMod = 1 + Number(n.Reforms.LimitedWeaponOwnership) / 10 + n.ReligiousFervor / 10 + Number(n.Reforms.WealthVoting) / 10 + Number(n.Reforms.WealthPrivilege) / 10 + Number(n.Reforms.WealthyOfficers) / 10 + Number(n.Reforms.ClergyBureaucrats) / 5 + Number(n.Reforms.WealthyBureaucrats) / 10 + Number(n.Reforms.NoSocialMobility) / 5 + Number(n.Reforms.RestrictedSocialMobility) / 10 + Number(n.Reforms.StateReligion) / 5 + Number(n.Reforms.RestrictiveReligionLaws) / 10 + Number(n.Reforms.ReligiousSchools) / 5 + Number(n.Reforms.RegionalPolice) / 10 + Number(n.Reforms.ReligiousOrders) / 5;
    const urbanInfluenceMod = 1 + Number(n.Reforms.NoWeaponLaws) / 5 + Number(n.Reforms.LimitedWeaponOwnership) / 10 + Number(n.Reforms.Enclosure) / 10 + Number(n.Reforms.GuildsBanned) / 10 + Number(n.Reforms.AntiMonopolyLaws) / 5 + Number(n.Reforms.WealthVoting) / 20 + Number(n.Reforms.WealthPrivilege) / 20 + Number(n.Reforms.WealthyOfficers) / 20 + Number(n.Reforms.WealthyBureaucrats) / 20 + Number(n.Reforms.RestrictedSocialMobility) / 20 + Number(n.Reforms.CommunityPolicing) / 5;
    const bureaucratsInfluenceMod = 1 + Number(n.Reforms.MeritocraticBureaucrats) / 10 + Number(n.Reforms.GovernmentResourceOwnership) / 4 + Number(n.Reforms.GovernmentLandOwnership) / 2 + Number(n.Reforms.RestrictedSocialMobility) / 20 + Number(n.Reforms.RegionalPolice) / 10 + Number(n.Reforms.StatePolice) / 5 + Number(n.Reforms.SecretPolice) * 0.4 + Number(n.Reforms.StateMediaOnly) * 0.4 + Number(n.Reforms.ExtensiveCensorship) / 5 + Number(n.Reforms.LimitedCensorship) / 10;
    const intellectualsInfluenceMod = 1 + Number(n.Reforms.NoWeaponLaws) / 5 + Number(n.Reforms.LimitedWeaponOwnership) / 10 + Number(n.Reforms.MeritocraticBureaucrats) / 5 + Number(n.Reforms.MeritocraticOfficers) / 5;
    const militaryInfluenceMod = 1 + n.Nationalism / 10 + Number(n.Reforms.MeritocraticOfficers) / 10 + Number(n.Reforms.ProffesionalArmy) / 5 + Number(n.Reforms.MassConscription) / 10 + Number(n.Reforms.GovernmentResourceOwnership) / 5 + Number(n.Reforms.GovernmentResourceOwnership) / 5 + Number(n.Reforms.RestrictedSocialMobility) / 20 + Number(n.Reforms.RegionalPolice) / 20 + Number(n.Reforms.StatePolice) / 10 + Number(n.Reforms.SecretPolice) / 4;
    const workersInfluenceMod = 1 + Number(n.Reforms.NoWeaponLaws) / 5 + Number(n.Reforms.LimitedWeaponOwnership) / 10 + Number(n.Reforms.OpenFieldSystem) / 5 + Number(n.Reforms.SlaveryBanned) / 10 + Number(n.Reforms.SerfdomBanned) / 5 + Number(n.Reforms.NationalMilitia) / 5 + Number(n.Reforms.UniversalSuffrage) / 5 + Number(n.Reforms.CommunityPolicing) / 5;

    const totalInfluences = n.EstateInfluences.AristocracyInfluence * aristocracyInfluenceMod + n.EstateInfluences.ClergyInfluence * clergyInfluenceMod + n.EstateInfluences.BurgousieInfluence * burgousieInfluenceMod + n.EstateInfluences.UrbanInfluence * urbanInfluenceMod + n.EstateInfluences.BureaucratsInfluence * bureaucratsInfluenceMod + n.EstateInfluences.IntellectualsInfluence * intellectualsInfluenceMod + n.EstateInfluences.MilitaryInfluence * militaryInfluenceMod + n.EstateInfluences.WorkersInfluence * workersInfluenceMod;

    n.EstateInfluencesReal = {
        AristocracyInfluence: max(0, n.EstateInfluences.AristocracyInfluence * aristocracyInfluenceMod / totalInfluences),
        ClergyInfluence: max(0, n.EstateInfluences.ClergyInfluence * clergyInfluenceMod / totalInfluences),
        BurgousieInfluence: max(0, n.EstateInfluences.BurgousieInfluence * burgousieInfluenceMod / totalInfluences),
        UrbanInfluence: max(0, n.EstateInfluences.UrbanInfluence * urbanInfluenceMod / totalInfluences),
        BureaucratsInfluence: max(0, n.EstateInfluences.BureaucratsInfluence * bureaucratsInfluenceMod / totalInfluences),
        IntellectualsInfluence: max(0, n.EstateInfluences.IntellectualsInfluence * intellectualsInfluenceMod / totalInfluences),
        MilitaryInfluence: max(0, n.EstateInfluences.MilitaryInfluence * militaryInfluenceMod / totalInfluences),
        WorkersInfluence: max(0, n.EstateInfluences.WorkersInfluence * workersInfluenceMod / totalInfluences)
    };

    const estateNumbers = {
        Workers: n.Workforces.Farmers + n.Workforces.Labourers + (isNaN(n.Workforces.Serfs) ? 0 : n.Workforces.Serfs) + (isNaN(n.Workforces.Unemployed) ? 0 : n.Workforces.Unemployed),
        Urban: (isNaN(n.Workforces.Merchants) ? 0 : n.Workforces.Merchants) + n.Workforces.Townsfolk,
        Clergy: n.Workforces.Clergy,
        Bureaucrats: n.Workforces.Bureaucrats,
        Intellectuals: n.Workforces.Intellectuals,
        Military: (isNaN(n.Workforces.Soldiers) ? 0 : n.Workforces.Soldiers) + (isNaN(n.Workforces.Sailors) ? 0 : n.Workforces.Sailors),
        Aristocracy: n.Workforces.Aristocracy,
        Burgousie: n.Workforces.Burgousie
    }


  const resourcesAdmDemand = (n.Reforms.GovernmentResourceOwnership ? n.Coal + n.Sulphur + n.Iron + n.Copper + n.Gold + n.Fur + n.Diamond + n.Silver + n.Ivory + n.Forestry + n.Reforestation * 5 + n.Cotton + n.Tea + n.Silk + n.Spice + n.Wool + n.Coffee + n.Cocoa + n.Tobacco + n.Sugar + n.ExoticFruit : 0) / 2;
  const agricultureAdmDemand = (n.Reforms.GovernmentLandOwnership ? (n.Population / 1000 * n.PopInAgriculture / 25) : 0);

  n.CultureRepresentedAtGovernmentLevelPercent = cultureCalc.GovernmentRepresentationPercent; n.CulturalDisunity = cultureCalc.disunity * (1 + n.Nationalism * 0.2) * (n.GovernmentDominatedBy == "Workers" || n.GovernmentDominatedBy == "Urban" ? 1.2 : 1) * (n.GovernmentDominatedBy == "Clergy" ? 0.8 : 1);
  n.ReligionRepresentedAtGovernmentLevelPercent = religionCalc.GovernmentRepresentationPercent;
  n.ReligiousDisunity = religionCalc.disunity * (1 + n.ReligiousFervor * 0.2 + Number(n.Reforms.StateReligion) / 2 - Number(n.Reforms.FreedomOfReligion) / 2) * (n.GovernmentDominatedBy == "Workers" || n.GovernmentDominatedBy == "Clergy" ? 1.2 : 1);
    if (n.ReligionRepresentedAtGovernmentLevelPercent < 0.5) {
        n.ReligiousDisunity += Number(n.Reforms.StateReligion) + Number(n.Reforms.RestrictiveReligionLaws) / 2
    }
    if (n.ReligionRepresentedAtGovernmentLevelPercent < 0.25) {
        n.ReligiousDisunity += Number(n.Reforms.StateReligion) + Number(n.Reforms.RestrictiveReligionLaws) / 2
    }
  n.AdministrativeTech = -0.75 - n.Alcoholism * (1 - n.ReligionGroups.Sunni.Points / 100 - n.ReligionGroups.Shia.Points / 100) - Number(n.Reforms.NobleBureaucrats) * 0.5 - Number(n.Reforms.ClergyBureaucrats) * 0.25 + Number(n.Reforms.MeritocraticBureaucrats) + Number(n.Technologies.Paper) * 0.5 + Number(n.CulturalAdvancements.Currency) * 0.5 + Number(n.CulturalAdvancements.EarlyModernAdministration) + Number(n.CulturalAdvancements.NationalSovereignity) + Number(n.CulturalAdvancements.Constitution) + Number(n.Reforms.WealthyBureaucrats) / 2 + Number(n.Technologies.PaperMachine) / 5;
  n.AdministrativePower = (n.AdministrativeEfficiency * (1 + n.AdministrationSize / 2 + n.AdministrativeTech * 0.4) * 0.75) * (n.GovernmentDominatedBy == "Bureaucrats" || n.GovernmentDominatedBy == "Aristocracy" ? 1.1 : 1) * (n.GovernmentDominatedBy == "Urban" || n.GovernmentDominatedBy == "Military" || n.GovernmentDominatedBy == "Burgousie" ? 0.9 : 1);

    let taxesAdmDemand = 0;
    for (const EstateIndex in estatesGeneral) {
        const Estate = estatesGeneral[EstateIndex];
        // taxesAdmDemandNew = n[Estate + "Tax"] * estateNumbers[Estate] * n.EstateInfluencesReal[Estate + "Influence"] * 1000 * 3;
        taxesAdmDemand = n[Estate + "Tax"] * min(estateNumbers[Estate] * n.EstateInfluencesReal[Estate + "Influence"], 0.01) * 1000 * 3;
    }

    // const taxesAdmDemand = (n.AristocracyTax + n.ClergyTax + n.BurgousieTax + n.UrbanTax + n.BureaucratsTax + n.IntellectualsTax + n.WorkersTax + n.MilitaryTax) / 8 * 75

    n.AdministrativeDemand = (
    0 + n.Population / 1500000 + n.Health * 2 + education * 2 + n.SocialSpending * 1.5 + propagandaReal * 2 + populationControlReal * 2 + n.BirthControl * 4 +
    taxesAdmDemand + n.OverallNumbers / 5000 + n.OverallShipCount / 25 + n.AgricultureSubsidies * 4 + (n.AgricultureInfrastructure - 1) * 4 + n.Size / 7500 +
    (n.ResearchSpending - 1) * 10 + (1 - n.CultureRepresentedAtGovernmentLevelPercent) * 10 + (n.Population / 1000 * n.Workforces.Townsfolk / 20) * n.ProductionGovernmentControl + resourcesAdmDemand + agricultureAdmDemand
    );

  n.AdministrativeStrain = max(0, n.AdministrativeDemand - n.AdministrativePower);
  n.Absolutism = n.GovernmentRepresentation.UnitaryRepresentation / 10;
    n.Corruption = (n.AdministrativeStrain / n.AdministrativePower * 10 + n.Absolutism / 2.5) * (n.GovernmentDominatedBy == "Burgousie" || n.GovernmentDominatedBy == "Aristocracy" ? 1.2 : 1);

  const militaryControlTotal = Number(n.MilitaryControl.AristocracyControl) + n.MilitaryControl.ClergyControl + n.MilitaryControl.BurgousieControl + n.MilitaryControl.UrbanControl + n.MilitaryControl.BureaucratsControl + n.MilitaryControl.WorkersControl + n.MilitaryControl.Independent
  const militaryControlReal = {
    Aristocracy: n.MilitaryControl.AristocracyControl / militaryControlTotal,
    Clergy: n.MilitaryControl.ClergyControl / militaryControlTotal,
    Burgousie: n.MilitaryControl.BurgousieControl / militaryControlTotal,
    Urban: n.MilitaryControl.UrbanControl / militaryControlTotal,
    Bureaucrats: n.MilitaryControl.BureaucratsControl / militaryControlTotal,
    Workers: n.MilitaryControl.WorkersControl / militaryControlTotal,
    Independent: n.MilitaryControl.Independent / militaryControlTotal
  }

    const realOverallImprovements = n.OverallImprovements - n.Alcoholism * (1 - n.ReligionGroups.Sunni.Points / 100 - n.ReligionGroups.Shia.Points / 100) / 2 + militaryControlReal.Independent + n.CommanderFreedom * 0.15 + Number(n.Reforms.WealthyOfficers) / 5 + Number(n.Reforms.MeritocraticOfficers) / 2 - Number(n.Reforms.NationalMilitia) * 0.2 + Number(n.Reforms.ProffesionalArmy) * 0.4 + Number(n.Reforms.MassConscription) * 0.2 + Number(n.Technologies.Morphine) / 10 + Number(n.Technologies.IronWorking) / 4 + Number(n.Technologies.Metallurgy) / 10;

  const irregularQualityIC = realOverallImprovements + n.IrregularImprovements;
  const meleeQualityIC = realOverallImprovements + n.MeleeImprovements + Number(n.Technologies.PlateArmour) / 5 + Number(n.Technologies.StandardizedPikes) / 10;
  const rangedQualityIC = realOverallImprovements + n.RangedImprovements;
  const cavalryQualityIC = realOverallImprovements + n.CavalryImprovements + Number(n.Technologies.SaddleAndStirrup) / 5 + Number(n.Technologies.PlateArmour) / 5 + Number(n.Technologies.Reiters) / 10;
  const firearmQualityIC = realOverallImprovements + n.FirearmImprovements + Number(n.Technologies.Matchlock) / 5 + Number(n.Technologies.SocketBayonet) / 5 + Number(n.Technologies.Flintlock) / 5 + Number(n.Technologies.Bayonet) / 20 + Number(n.Technologies.Fulminate) / 20;
  const siegeQualityIC = realOverallImprovements + n.SiegeImprovements;
  const artilleryQualityIC = realOverallImprovements + n.ArtilleryImprovements + Number(n.Technologies.Limber) / 5 + Number(n.Technologies.Mortars) / 5 + Number(n.Technologies.Fulminate) / 20;

    n.NavyTech = 0 - n.Alcoholism * (1 - n.ReligionGroups.Sunni.Points / 100 - n.ReligionGroups.Shia.Points / 100) / 2 + Number(n.Reforms.WealthyOfficers) / 5 + Number(n.Reforms.MeritocraticOfficers) / 2 + Number(n.Technologies.Docks) / 2 + Number(n.Technologies.Gunports) / 2 + Number(n.Technologies.Gunlock) / 4 + Number(n.Technologies.SteamBoats) / 10 + Number(n.Technologies.Fulminate) / 20;
  const lightShipQualityIC = 1 + n.LightShipImprovements + n.NavyTech;
  const mediumShipQualityIC = 1 + n.MediumShipImprovements + n.NavyTech + Number(n.Technologies.Galleons) / 6;
  const heavyShipQualityIC = 1 + n.HeavyShipImprovements + n.NavyTech + Number(n.Technologies.Galleons) / 4;

  n.AgricultureSpending = (n.PopInAgriculture * n.Population / 1000 * (-2 + n.AgricultureInfrastructure + n.AgricultureSubsidies + n.StockingCapabilities)) / 100 / timeDivide;

  const GatheringEffectiveness = function (name) {
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
      case "Cocoa":
        return "Farming"
      case "Tobacco":
        return "Farming"
      case "Sugar":
        return "Farming"
      case "ExoticFruit":
        return "Farming"
      case "Wool":
        return "None"
      case "Fur":
        return "None"
      case "Ivory":
        return "None"
      case "Housing":
        return "None"
      case "Textiles":
        return "None"
      case "BasicGoods":
        return "None"
      case "LuxuryGoods":
        return "None"
      case "Alcohol":
        return "None"
      case "BasicTools":
        return "None"
      case "HeavyIndustry":
        return "None"
      case "BasicArmaments":
        return "None"
      case "HeavyArmaments":
        return "None"
      case "ShipBuilding":
        return "None"
      case "Chemicals":
        return "None"
      case "Motors":
        return "None"
      case "Planes":
        return "None"
      case "Electronics":
        return "None"
      case "Wood":
        return "None"
      default:
        return "Mining"
    }
  };
  for (const resourceIndex in resourceTypes) { //in, out, effective resources
    const resource = resourceTypes[resourceIndex];
    n[resource + "Incoming"] = 0;
    n[resource + "Outgoing"] = 0;

    for (const tradename in trades) {
      const trade = trades[tradename];
      if (trade.resource == resource) {
        if (nationName == trade.receiver) {
          n[resource + "Incoming"] += +trade.amount;
        } else if (nationName == trade.giver) {
          n[resource + "Outgoing"] += +trade.amount;
        }
      }
    }

    if(resource == "Budget" || resource == "Food") continue;
    //the things below do not apply to Budget or Food

    n["Effective" + resource] = (function () {
      const er = n[resource] * (GatheringEffectiveness(resource) == "Farming" ? n.FarmingEfficiency : (GatheringEffectiveness(resource) == "Mining" ? n.MiningEfficiency : 1)) + n[resource + "Incoming"] - n[resource + "Outgoing"];
      return er;
      })();
  }

    n.FoodPerTurn = (n.Workforces.Farmers + n.Workforces.Serfs) * n.Population / 1000 * n.FarmingEfficiency + n.FoodIncoming - n.FoodOutgoing;

    n.EffectiveIron += n.BaseIronHarvest;
    n.EffectiveCoal += n.BaseCoalHarvest;
    n.EffectiveSulphur += n.BaseSulphurHarvest;
  n.EffectiveCotton *= (1 + Number(n.Technologies.CottonGin));

  n.ProductionEfficiency = (-0.25 + n.TradeImprovements + Number(n.Technologies.IronWorking) / 4 - n.Alcoholism * (1 - n.ReligionGroups.Sunni.Points / 100 - n.ReligionGroups.Shia.Points / 100) + Number(n.Technologies.Wheel) / 4 + Number(n.CulturalAdvancements.Currency) / 4 + Number(n.Reforms.GuildsBanned) / 5 + Number(n.Reforms.AntiMonopolyLaws) / 2 + Number(n.Technologies.Workshops) + Number(n.Technologies.Cranes) / 5 + Number(n.Technologies.SteamEngine) / 4 + Number(n.Technologies.FirstFactories) / 2 + Number(n.Technologies.LinearAssemblyProcess) / 4 + Number(n.Technologies.InterchangeableParts) / 2) * (n.GovernmentDominatedBy == "Burgousie" || n.GovernmentDominatedBy == "Urban" ? 1.1 : 1);
  const weavingEfficiency = 1 + Number(n.Technologies.VerticalLoom) / 4 + Number(n.Technologies.TextileManufactories) / 2 + Number(n.Technologies.FlyingShuttle) / 2 + Number(n.Technologies.PowerLoomAndSewingMachine);
  const metalWorkingEfficiency = Number(n.Technologies.IronWorking) / 2 + Number(n.Technologies.Metallurgy) / 4 + Number(n.Technologies.LeadChamberProcess) / 5 + Number(n.Technologies.PuddlingProcess) / 4;
  const weaponWorkingEfficiency = 1 + metalWorkingEfficiency + Number(n.Technologies.StandardizedPikes) / 5 + Number(n.Technologies.Flintlock) / 5;
  const shipBuildingEfficiency = 1 + Number(n.Technologies.Docks) / 4;
  const toolWorkingEfficiency = 1 + metalWorkingEfficiency + Number(n.Technologies.PaperMachine) / 10;
  n.Production = n.Population / 1000 * n.Workforces.Townsfolk * n.ProductionEfficiency / 2;


  n.ForestsLeft = max((
    n.Climates.TaigaAndTundra.Pixels * 0.95 +
    n.Climates.MontaneForest.Pixels * 0.9 +
    n.Climates.Medditereanian.Pixels * 0.7 +
    n.Climates.Arid.Pixels * 0.35 +
    n.Climates.Steppe.Pixels * 0.3 +
    n.Climates.Moderate.Pixels * 0.8 +
    n.Climates.SubTropical.Pixels * 0.95 +
    n.Climates.Tropical.Pixels * 1.05 +
    n.Climates.Savanna.Pixels * 0.45 +
    n.Climates.CoastalDesert.Pixels * 0.2
  ) - n.ForestsCutDown, 0);

    n.MaxForestry = n.ForestsLeft / 2000 * (1 + n.Reforestation);

    n.Wood = n.Forestry * 10;
    if (n.MaxForestry < n.Forestry) {
        n.Wood = n.MaxForestry * 10;
        if (n.ForestsLeft == 0) {
            n.Wood = 0;
        }
    }
    n.EffectiveWood = n.Wood + n.WoodIncoming - n.WoodOutgoing;

  n.AverageExpectedSol = (
    (isNaN(n.Workforces.Slaves) ? 0 : n.Workforces.Slaves) * n.ExpectedSlavesSol +
    (isNaN(n.Workforces.Labourers) ? 0 : n.Workforces.Labourers) * n.ExpectedLabourersSol +
     (isNaN(n.Workforces.Serfs) ? 0 : n.Workforces.Serfs) * n.ExpectedSerfsSol +
     (isNaN(n.Workforces.Unemployed) ? 0 : n.Workforces.Unemployed) * n.ExpectedUnemployedSol +
    (isNaN(n.Workforces.Farmers) ? 0 : n.Workforces.Farmers) * n.ExpectedFarmersSol +
    (isNaN(n.Workforces.Townsfolk) ? 0 : n.Workforces.Townsfolk) * n.ExpectedTownsfolkSol +
    (isNaN(n.Workforces.Clergy) ? 0 : n.Workforces.Clergy) * n.ExpectedClergySol +
    (isNaN(n.Workforces.Bureaucrats) ? 0 : n.Workforces.Bureaucrats) * n.ExpectedBureaucratsSol +
    (isNaN(n.Workforces.Merchants) ? 0 : n.Workforces.Merchants) * n.ExpectedMerchantsSol +
    (isNaN(n.Workforces.Intellectuals) ? 0 : n.Workforces.Intellectuals) * n.ExpectedIntellectualsSol +
    (isNaN(n.Workforces.Sailors) ? 0 : n.Workforces.Sailors) * n.ExpectedSailorsSol +
    (isNaN(n.Workforces.Soldiers) ? 0 : n.Workforces.Soldiers) * n.ExpectedSoldiersSol +
    (isNaN(n.Workforces.Aristocracy) ? 0 : n.Workforces.Aristocracy) * n.ExpectedAristocracySol +
    (isNaN(n.Workforces.Burgousie) ? 0 : n.Workforces.Burgousie) * n.ExpectedBurgousieSol
    );

  const luxuriesDemand = (
  (isNaN(n.Workforces.Slaves) ? 0 : n.Workforces.Slaves) * (n.ExpectedSlavesSol > 1 ? (n.ExpectedSlavesSol - 1) : 0) +
  (isNaN(n.Workforces.Labourers) ? 0 : n.Workforces.Labourers) * (n.ExpectedLabourersSol > 1 ? (n.ExpectedLabourersSol - 1) : 0) +
  (isNaN(n.Workforces.Serfs) ? 0 : n.Workforces.Serfs) * (n.ExpectedSerfsSol > 1 ? (n.ExpectedSerfsSol - 1) : 0) + 
  (isNaN(n.Workforces.Unemployed) ? 0 : n.Workforces.Unemployed) * (n.ExpectedUnemployedSol > 1 ? (n.ExpectedUnemployedSol - 1) : 0) +
  (isNaN(n.Workforces.Farmers) ? 0 : n.Workforces.Farmers) * (n.ExpectedFarmersSol > 1 ? (n.ExpectedFarmersSol - 1) : 0) +
  (isNaN(n.Workforces.Townsfolk) ? 0 : n.Workforces.Townsfolk) * (n.ExpectedTownsfolkSol > 1 ? (n.ExpectedTownsfolkSol - 1) : 0) +
  (isNaN(n.Workforces.Clergy) ? 0 : n.Workforces.Clergy) * (n.ExpectedClergySol > 1 ? (n.ExpectedClergySol - 1) : 0) +
  (isNaN(n.Workforces.Bureaucrats) ? 0 : n.Workforces.Bureaucrats) * (n.ExpectedBureaucratsSol > 1 ? (n.ExpectedBureaucratsSol - 1) : 0) +
  (isNaN(n.Workforces.Merchants) ? 0 : n.Workforces.Merchants) * (n.ExpectedMerchantsSol > 1 ? (n.ExpectedMerchantsSol - 1) : 0) +
  (isNaN(n.Workforces.Intellectuals) ? 0 : n.Workforces.Intellectuals) * (n.ExpectedIntellectualsSol > 1 ? (n.ExpectedIntellectualsSol - 1) : 0) +
  (isNaN(n.Workforces.Sailors) ? 0 : n.Workforces.Sailors) * (n.ExpectedSailorsSol > 1 ? (n.ExpectedSailorsSol - 1) : 0) +
  (isNaN(n.Workforces.Soldiers) ? 0 : n.Workforces.Soldiers) * (n.ExpectedSoldiersSol > 1 ? (n.ExpectedSoldiersSol - 1) : 0) +
  (isNaN(n.Workforces.Aristocracy) ? 0 : n.Workforces.Aristocracy) * (n.ExpectedAristocracySol > 1 ? (n.ExpectedAristocracySol - 1) : 0) +
  (isNaN(n.Workforces.Burgousie) ? 0 : n.Workforces.Burgousie) * (n.ExpectedBurgousieSol > 1 ? (n.ExpectedBurgousieSol - 1) : 0)
  );

  const totalSupply = n.ProductionSectors.ConstructionSector + n.ProductionSectors.BasicArmamentsSector + n.ProductionSectors.HeavyArmamentsSector + n.ProductionSectors.ShipBuildingSector + n.ProductionSectors.BasicToolsSector + n.ProductionSectors.TextilesSector + n.ProductionSectors.BasicGoodsSector + n.ProductionSectors.LuxuryGoodsSector + n.ProductionSectors.AlcoholSector + n.ProductionSectors.ChemicalSector + n.ProductionSectors.ElectronicsSector + n.ProductionSectors.AutomotiveSector + n.ProductionSectors.AerospaceSector + n.ProductionSectors.HeavyIndustrySector;

  n.SulphurDemand = (n.HandCannoneers * 0.5 + n.MusketMilitia * 0.75 + (n.Musketeers + n.Riflemen) + n.RegimentalGuns * 10 + (n.FieldCannons + n.MerchantShips * 2 + n.LightShips * 8 + n.MediumShips * 16 + n.HeavyShips * 32) * 20 + n.SiegeGuns * 50) / 5000 * (n.Technologies.Fulminate ? 0.9 : 1) + n.Health;
  n.IronDemand = (n.Technologies.IronWorking ? (n.Production * (n.ProductionSectors.HeavyIndustrySector / totalSupply) / 10 + n.Production * (n.ProductionSectors.LuxuryGoodsSector / totalSupply) / 10 + n.Production * (n.ProductionSectors.ShipBuildingSector / totalSupply) / 10 + n.Production * (n.ProductionSectors.HeavyArmamentsSector / totalSupply) / 5 + n.Production * (n.ProductionSectors.BasicArmamentsSector / totalSupply) / 10 + n.Production * (n.ProductionSectors.BasicToolsSector / totalSupply) / 10) / n.ProductionEfficiency / 2 : 0);
  n.WoodDemand = (n.Production * (n.ProductionSectors.LuxuryGoodsSector / totalSupply) / 10 + n.Production * (n.ProductionSectors.BasicGoodsSector / totalSupply) / 8 + n.Production * (n.ProductionSectors.ShipBuildingSector / totalSupply) / 2 + n.Production * (n.ProductionSectors.BasicArmamentsSector / totalSupply) / 10 + n.Production * (n.ProductionSectors.ConstructionSector / totalSupply) / 2 + n.Production * (n.ProductionSectors.BasicToolsSector / totalSupply) / 6) / n.ProductionEfficiency / 2 + ((min(n.AverageExpectedSol, 1) * 0.01 + luxuriesDemand * 0.02) * n.Population / 1000) / 12.5;
  n.CoalDemand = (n.Production * (n.ProductionSectors.HeavyIndustrySector / totalSupply) / 10 + n.Production * (n.ProductionSectors.HeavyArmamentsSector / totalSupply) / 6 + n.Production * (n.ProductionSectors.BasicArmamentsSector / totalSupply) / 8 + n.Production * (n.ProductionSectors.BasicToolsSector / totalSupply) / 10) / n.ProductionEfficiency / 2 + max(0, ((min(n.AverageExpectedSol, 1) * 0.005 + luxuriesDemand * 0.01) * n.Population / 1000) / 20 - (n.Wood > n.WoodDemand ? n.Wood - n.WoodDemand : 0) / 2.5) + (n.Technologies.SteamBoats ? n.LightShips * 0.01 + n.MediumShips * 0.025 + n.HeavyShips * 0.05 : 0);

  n.FoodDemand = n.Production * (n.ProductionSectors.AlcoholSector / totalSupply) + ((min(n.AverageExpectedSol, 1) + luxuriesDemand * 1.75) * n.Population / 1000);

  const naturalFabricsDemand = (n.Production * (n.ProductionSectors.TextilesSector / totalSupply)) / n.ProductionEfficiency / 4;
  n.WoolDemand = naturalFabricsDemand;
  n.CottonDemand = naturalFabricsDemand;

  const luxuryNaturalFabricsDemand = (n.Production * (n.ProductionSectors.LuxuryGoodsSector / totalSupply) / 10) / n.ProductionEfficiency;
  n.FurDemand = luxuryNaturalFabricsDemand;
  n.SilkDemand = luxuryNaturalFabricsDemand;

  const valuableMaterialsDemand = (n.Production * (n.ProductionSectors.LuxuryGoodsSector / totalSupply)) / n.ProductionEfficiency;
  n.DiamondDemand = valuableMaterialsDemand + n.Population / 1000000;
  n.GoldDemand = valuableMaterialsDemand + n.Population / 500000;
  n.SilverDemand = valuableMaterialsDemand + n.Population / 500000;
  n.CopperDemand = valuableMaterialsDemand + n.Population / 1000000;
  n.IvoryDemand = valuableMaterialsDemand + n.Population / 1000000;


  const luxuryConsumables = n.EffectiveTea + n.EffectiveCoffee + n.EffectiveTobacco + n.EffectiveExoticFruit + n.EffectiveCocoa;
  const luxuryConsumablesDemand = max(0, luxuriesDemand * n.Population / 1000 * 0.05);
  n.TeaDemand = luxuryConsumablesDemand * 0.2;
  n.CoffeeDemand = luxuryConsumablesDemand * 0.2;
  n.TobaccoDemand = luxuryConsumablesDemand * 0.2;
  n.ExoticFruitDemand = luxuryConsumablesDemand * 0.2;
  n.CocoaDemand = luxuryConsumablesDemand * 0.2;

  const foodAdditions = n.EffectiveSugar + n.EffectiveSpice;
  const foodAdditionsDemand = ((min(n.AverageExpectedSol, 1) * 0.1 + luxuriesDemand / 2 * 0.75) * n.Population / 1000) / 200;
  n.SugarDemand = foodAdditionsDemand * 0.45;
  n.SpiceDemand = foodAdditionsDemand * 0.55;
  const foodAdditionsFoodBoost = 1 + (foodAdditions / (n.Population / 2000000)) / 100;

  const unitsArmamentsDemands = {
    Levies: 0.2 * irregularQualityIC,
    Militia: 0.3 * irregularQualityIC,
    LightInfantry: 0.6 * meleeQualityIC,
    HeavyInfantry: 0.95 * meleeQualityIC,
    EliteInfantry: 1.1 * meleeQualityIC,
    Archers: 0.6 * rangedQualityIC,
    Crossbowmen: 0.8 * rangedQualityIC,
    Musketeers: 0.95 * firearmQualityIC,
    MusketMilitia: 0.9 * firearmQualityIC,
    Riflemen: 2 * firearmQualityIC,
    LightCavalry: 1.4 * cavalryQualityIC,
    HeavyCavalry: 1.8 * cavalryQualityIC,
    EliteCavalry: 2.2 * cavalryQualityIC
  }
  const unitsArmamentsDemandsAll = {
    Levies: 0.2 * irregularQualityIC,
    Militia: 0.3 * irregularQualityIC,
    LightInfantry: 0.6 * meleeQualityIC,
    HeavyInfantry: 0.95 * meleeQualityIC,
    EliteInfantry: 1.1 * meleeQualityIC,
    Archers: 0.6 * rangedQualityIC,
    Crossbowmen: 0.8 * rangedQualityIC,
    HandCannoneers: 0.85 * firearmQualityIC,
    Musketeers: 0.95 * firearmQualityIC,
    MusketMilitia: 0.9 * firearmQualityIC,
    Riflemen: 2 * firearmQualityIC,
    LightCavalry: 1.4 * cavalryQualityIC,
    HeavyCavalry: 1.8 * cavalryQualityIC,
    EliteCavalry: 2.2 * cavalryQualityIC
  }

  n.ArmyBasicArmamentsDemand = 0;
  for (const UnitIndex in unitsArmamentsDemandsAll) {
    const Unit = UnitIndex;
    const Cost = unitsArmamentsDemandsAll[Unit];
    n.ArmyBasicArmamentsDemand += n[Unit] / 1000 * Cost * 1.5;
  }

  //n.ArmyBasicArmamentsDemand = ((n.Levies * 0.15 + n.Militia * 0.25) * IrregularQualityIC + (n.LightInfantry * 0.5 + n.HeavyInfantry * 0.85 + n.EliteInfantry * 1) * MeleeQualityIC + (n.Archers * 0.5 + n.Crossbowmen * 0.7) * RangedQualityIC + (n.HandCannoneers * 0.75 + n.Musketeers * 0.8 + n.MusketMilitia * 0.7 + n.Riflemen * 1.25) * FirearmQualityIC + (n.LightCavalry * 1 + n.HeavyCavalry * 1.25 + n.EliteCavalry * 1.5) * CavalryQualityIC) / 1000;

    n.BasicToolsDemand = (n.Production * (n.ProductionSectors.AerospaceSector / totalSupply) + n.Production * (n.ProductionSectors.AutomotiveSector / totalSupply) + n.Production * (n.ProductionSectors.ElectronicsSector / totalSupply) + n.Production * (n.ProductionSectors.ChemicalSector / totalSupply) / 4 + n.Production * (n.ProductionSectors.HeavyIndustrySector / totalSupply) / 10 + n.Production * (n.ProductionSectors.LuxuryGoodsSector / totalSupply) / 4 + n.Production * (n.ProductionSectors.BasicGoodsSector / totalSupply) / 4 + n.Production * (n.ProductionSectors.ShipBuildingSector / totalSupply) + n.Production * (n.ProductionSectors.TextilesSector / totalSupply) / 4 + n.Production * (n.ProductionSectors.HeavyArmamentsSector / totalSupply) / 4 + n.Production * (n.ProductionSectors.BasicArmamentsSector / totalSupply) / 4 + n.Production * (n.ProductionSectors.ConstructionSector / totalSupply)) / n.ProductionEfficiency + (min(n.AverageExpectedSol, 1) * n.Population / 1000) / 200;
    n.HousingDemand = ((min(n.AverageExpectedSol, 1) * 0.5 + luxuriesDemand * 1) * n.Population / 1000) / 200 + realOverallImprovements * (n.SmallForts * 0.5 + n.New_SmallForts * 0.75 + n.MediumForts * 1 + n.New_MediumForts * 1.5 + n.BigForts * 2 + n.New_BigForts * 3 + n.HugeForts * 4 + n.New_HugeForts * 6 + n.CityFortifications * 1.5 + n.New_CityFortifications * 2.25) + 0.375 * n.SupplyDepots + n.New_SupplyDepots * 0.5625 + n.NavalBases * 0.625 + n.New_NavalBases * 0.9375;
    n.BasicArmamentsDemand = n.ExpectedPrivateBasicArmaments + n.ArmyBasicArmamentsDemand + realOverallImprovements * (n.SmallForts * 0.5 + n.MediumForts * 1 + n.BigForts * 2 + n.HugeForts * 4 + n.CityFortifications * 2);
    n.HeavyArmamentsDemand = ((n.RegimentalGuns * 0.05 + n.FieldCannons * 0.1 + n.SiegeGuns * 0.2) * artilleryQualityIC + (n.Technologies.Gunports ? (n.MerchantShips * 0.1 + n.LightShips * 0.8) * lightShipQualityIC + (n.MediumShips * 1.6 * mediumShipQualityIC) + (n.HeavyShips * 3.2 * heavyShipQualityIC) : 0) / 4 + (n.Technologies.Gunports ? (n.New_MerchantShips * 0.1 + n.New_LightShips * 0.8) * lightShipQualityIC + (n.New_MediumShips * 1.6 * mediumShipQualityIC) + (n.New_HeavyShips * 3.2 * heavyShipQualityIC) : 0) / 2 + realOverallImprovements * (n.Technologies.StarForts ? 2 : 1) * (n.SmallForts * 0.6 + n.New_SmallForts * 0.9 + n.MediumForts * 1.2 + n.New_MediumForts * 1.8 + n.BigForts * 2.4 + n.New_BigForts * 3.6 + n.HugeForts * 4.8 + n.New_HugeForts * 7.2 + n.CityFortifications * 2.4 + n.New_CityFortifications * 3.6)) / 2;
  n.TextilesDemand = (n.Production * (n.ProductionSectors.BasicGoodsSector / totalSupply) / 2 + n.Production * (n.ProductionSectors.ShipBuildingSector / totalSupply) / 2) / n.ProductionEfficiency + ((min(n.AverageExpectedSol, 1) * 0.5 + luxuriesDemand * 1) * n.Population / 1000) / 200;
    n.ShipBuildingDemand = n.CoastalPopulationPercent * n.Population / 500000 + ((n.LightShips * 0.05 + n.MerchantShips * 0.025) * lightShipQualityIC + n.MediumShips * mediumShipQualityIC * 0.1 + n.HeavyShips * heavyShipQualityIC * 0.2) + ((n.New_LightShips * 0.05 + n.New_MerchantShips * 0.025) * lightShipQualityIC + n.New_MediumShips * mediumShipQualityIC * 0.1 + n.New_HeavyShips * heavyShipQualityIC * 0.2) * 5;
  n.BasicGoodsDemand = ((min(n.AverageExpectedSol, 1) * 1 + luxuriesDemand * 1.5) * n.Population / 1000) / 200;
  n.LuxuryGoodsDemand = luxuriesDemand * n.Population / 1000 / 200;
    n.AlcoholDemand = ((min(n.AverageExpectedSol, 1) * 1 + luxuriesDemand * 2) * n.Population * (1 - n.ReligionGroups.Sunni.Points / 100 - n.ReligionGroups.Shia.Points / 100) / 1000) / 200 * (0.5 + n.Alcoholism);
  n.HeavyIndustryDemand = 0; // define once we reach Industrial Revolution
  n.ChemicalsDemand = (n.Technologies.Morphine ? n.OverallNumbers / 50000 : 0);
  n.ElectronicsDemand = 0; // define once we reach Industrial Revolution
  n.MotorsDemand = 0; // define once we reach Industrial Revolution
  n.PlanesDemand = 0; // define once we reach Industrial Revolution
 
  n.NaturalFabrics = n.EffectiveWool + n.EffectiveCotton;
  n.LuxuryNaturalFabrics = n.EffectiveFur + n.EffectiveSilk;
  n.ValuableMaterials = n.EffectiveDiamond + n.EffectiveGold + n.EffectiveSilver + n.EffectiveCopper + n.EffectiveIvory;

  n.IronShortage = (n.Technologies.IronWorking ? min(1, max(0, 1 - (n.EffectiveIron / (n.IronDemand * 0.9)))) : 0);
  n.SulphurShortage = min(1, max(0, 1 - (n.EffectiveSulphur / (n.SulphurDemand * 0.9))));
  n.CoalShortage = min(1, max(0, 1 - (n.EffectiveCoal / (n.CoalDemand * 0.9))));
  n.WoodShortage = min(1, max(0, 1 - (n.EffectiveWood / (n.WoodDemand * 0.9))));
  n.FoodShortage = min(1, max(0, 1 - ((n.Food + n.FoodPerTurn) / n.FoodDemand)));
  n.NaturalFabricsShortage = min(1, max(0, 1 - (n.NaturalFabrics / (naturalFabricsDemand * 0.9))));
  n.LuxuryNaturalFabricsShortage = min(1, max(0, 1 - (n.LuxuryNaturalFabrics / (luxuryNaturalFabricsDemand * 0.9))));
  n.ValuableMaterialsShortage = min(1, max(0, 1 - (n.ValuableMaterials / (valuableMaterialsDemand * 0.9))));

  n.BasicTools = n.Production * (n.ProductionSectors.BasicToolsSector / totalSupply) * (1.1 - n.WoodShortage) * (1.1 - n.IronShortage) * (1.1 - n.CoalShortage) * toolWorkingEfficiency;
  n.EffectiveBasicTools = n.BasicTools + n.BasicToolsIncoming - n.BasicToolsOutgoing;
  n.BasicToolsShortage = min(1, max(0, 1 - (n.EffectiveBasicTools / (n.BasicToolsDemand * 0.9))));

  n.Housing = n.Production * (n.ProductionSectors.ConstructionSector / totalSupply) * (1.1 - n.BasicToolsShortage) * (1.1 - n.WoodShortage);
  n.EffectiveHousing = n.Housing + n.HousingIncoming - n.HousingOutgoing;
  n.HousingShortage = min(1, max(0, 1 - (n.EffectiveHousing / (n.HousingDemand * 0.9))));

  n.BasicArmaments = n.Production * (n.ProductionSectors.BasicArmamentsSector / totalSupply) * (1.1 - n.BasicToolsShortage) * (1.1 - n.WoodShortage) * (1.1 - n.IronShortage) * (1.1 - n.CoalShortage) * weaponWorkingEfficiency;
  n.EffectiveBasicArmaments = n.BasicArmaments + n.BasicArmamentsIncoming - n.BasicArmamentsOutgoing + n.BasicArmamentsStockpiled;
  n.PrivateBasicArmamentsOverDemand = (n.BasicArmamentsDemand > n.EffectiveBasicArmaments ? min(n.ExpectedPrivateBasicArmaments / n.EffectiveBasicArmaments, 0.35) : 0);
  n.BasicArmamentsShortage = min(1, max(0, 1 - (n.EffectiveBasicArmaments / (n.BasicArmamentsDemand * 0.9)) + n.PrivateBasicArmamentsOverDemand));
  n.BasicArmamentsArmyShortage = min(1, max(0, 1 - (n.EffectiveBasicArmaments / n.ArmyBasicArmamentsDemand) + n.PrivateBasicArmamentsOverDemand));
  n.MinimumBasicArmamentsNeeded = n.ArmyBasicArmamentsDemand + min(n.ExpectedPrivateBasicArmaments / n.EffectiveBasicArmaments, 0.35) * n.EffectiveBasicArmaments;

  n.HeavyArmaments = n.Production * (n.ProductionSectors.HeavyArmamentsSector / totalSupply) * (1.1 - n.BasicToolsShortage) * (1.1 - n.IronShortage) * (1.1 - n.CoalShortage) * (0.5 + metalWorkingEfficiency);
  n.EffectiveHeavyArmaments = n.HeavyArmaments + n.HeavyArmamentsIncoming - n.HeavyArmamentsOutgoing + n.HeavyArmamentsStockpiled;
  n.HeavyArmamentsShortage = min(1, max(0, 1 - (n.EffectiveHeavyArmaments / (n.HeavyArmamentsDemand * 0.9))));

  n.Textiles = n.Production * (n.ProductionSectors.TextilesSector / totalSupply) * (1.1 - n.BasicToolsShortage) * (1.1 - n.NaturalFabricsShortage) * weavingEfficiency;
  n.EffectiveTextiles = n.Textiles + n.TextilesIncoming - n.TextilesOutgoing;
  n.TextilesShortage = min(1, max(0, 1 - (n.EffectiveTextiles / (n.TextilesDemand * 0.9))));

  n.ShipBuilding = n.Production * (n.ProductionSectors.ShipBuildingSector / totalSupply) * (1.1 - n.BasicToolsShortage) * (1.1 - n.WoodShortage) * (1.1 - n.IronShortage) * (1.1 - n.TextilesShortage) * shipBuildingEfficiency;
  n.EffectiveShipBuilding = n.ShipBuilding + n.ShipBuildingIncoming - n.ShipBuildingOutgoing;
  n.ShipBuildingShortage = min(1, max(0, 1 - (n.EffectiveShipBuilding / (n.ShipBuildingDemand * 0.9))));

  n.BasicGoods = n.Production * (n.ProductionSectors.BasicGoodsSector / totalSupply) * (1.1 - n.BasicToolsShortage) * (1 - n.WoodShortage / 4) * (1 - n.TextilesShortage / 3);
  n.EffectiveBasicGoods = n.BasicGoods + n.BasicGoodsIncoming - n.BasicGoodsOutgoing;
  n.BasicGoodsShortage = min(1, max(0, 1 - (n.EffectiveBasicGoods / (n.BasicGoodsDemand * 0.9))));

  n.LuxuryGoods = n.Production * (n.ProductionSectors.LuxuryGoodsSector / totalSupply) * (1.1 - n.BasicToolsShortage) * (1 - n.WoodShortage / 4) * (1 - n.IronShortage / 4) * (1 - n.LuxuryNaturalFabricsShortage / 4) * (1 - n.ValuableMaterialsShortage / 4);
  n.EffectiveLuxuryGoods = n.LuxuryGoods + n.LuxuryGoodsIncoming - n.LuxuryGoodsOutgoing;
  n.LuxuryGoodsShortage = min(1, max(0, 1 - (n.EffectiveLuxuryGoods / (n.LuxuryGoodsDemand * 0.9))));

  n.Alcohol = n.Production * (n.ProductionSectors.AlcoholSector / totalSupply) * (1.1 - n.FoodShortage);
  n.EffectiveAlcohol = n.Alcohol + n.AlcoholIncoming - n.AlcoholOutgoing;
  n.AlcoholShortage = min(1, max(0, 1 - (n.EffectiveAlcohol / (n.AlcoholDemand * 0.9))));
  if (n.AlcoholDemand == 0) n.AlcoholShortage = 0;

  n.HeavyIndustry = n.Production * (n.ProductionSectors.HeavyIndustrySector / totalSupply) * (1.1 - n.BasicToolsShortage) * (1.1 - n.IronShortage) * (1.1 - n.CoalShortage) * (0.5 + metalWorkingEfficiency);
  n.EffectiveHeavyIndustry = n.HeavyIndustry + n.HeavyIndustryIncoming - n.HeavyIndustryOutgoing;
  n.HeavyIndustryShortage = (n.HeavyIndustryDemand == 0 ? 0 : min(1, max(0, 1 - (n.EffectiveHeavyIndustry / (n.HeavyIndustryDemand * 0.9)))));

  n.Chemicals = n.Production * (n.ProductionSectors.ChemicalSector / totalSupply) * (1.1 - n.BasicToolsShortage);
  n.EffectiveChemicals = n.Chemicals + n.ChemicalsIncoming - n.ChemicalsOutgoing;
  n.ChemicalsShortage = (n.ChemicalsDemand == 0 ? 0 : min(1, max(0, 1 - (n.EffectiveChemicals / (n.ChemicalsDemand * 0.9)))));

  n.Electronics = n.Production * (n.ProductionSectors.ElectronicsSector / totalSupply) * (1.1 - n.BasicToolsShortage);
  n.EffectiveElectronics = n.Electronics + n.ElectronicsIncoming - n.ElectronicsOutgoing;
  n.ElectronicsShortage = (n.ElectronicsDemand == 0 ? 0 : min(1, max(0, 1 - (n.EffectiveElectronics / (n.ElectronicsDemand * 0.9)))));

  n.Motors = n.Production * (n.ProductionSectors.AutomotiveSector / totalSupply) * (1.1 - n.BasicToolsShortage) * (1.1 - n.HeavyIndustryShortage);
  n.EffectiveMotors = n.Motors + n.MotorsIncoming - n.MotorsOutgoing;
  n.MotorsShortage = (n.MotorsDemand == 0 ? 0 : min(1, max(0, 1 - (n.EffectiveMotors / (n.MotorsDemand * 0.9)))));

  n.Planes = n.Production * (n.ProductionSectors.AerospaceSector / totalSupply) * (1.1 - n.BasicToolsShortage) * (1.1 - n.HeavyIndustryShortage);
  n.EffectivePlanes = n.Planes + n.PlanesIncoming - n.PlanesOutgoing;
  n.PlanesShortage = (n.PlanesDemand == 0 ? 0 : min(1, max(0, 1 - (n.EffectivePlanes / (n.PlanesDemand * 0.9)))));

  // resource and goods values
  for (const resourceIndex in resourceTypes) {
    const resource = resourceTypes[resourceIndex];
    // skip budget; it does not make sense
    if (resource === "Budget") continue;
    // skip food; it is handles by another formula
    if (resource === "Food") continue;

    const resourceDemand = n[resource + "Demand"];
    const effectiveResource = n["Effective" + resource];
    const resourceBaseValue = n[resource + "BaseValue"];
      n[resource + "Value"] = resourceDemand / (isNaN(effectiveResource) ? 1 : (effectiveResource == 0 ? 1 : (effectiveResource + Math.sqrt(effectiveResource)))) * resourceBaseValue;
  }

  n.ArmyHeavyArmamentsDemand = (n.RegimentalGuns * 0.05 + n.FieldCannons * 0.1 + n.SiegeGuns * 0.2) * artilleryQualityIC / 2;
  n.UnitUpkeep = (n.ArmyBasicArmamentsDemand * n.BasicArmamentsValue + n.ArmyHeavyArmamentsDemand * n.HeavyArmamentsValue) / timeDivide;
  n.UnitUpkeep += n.SiegeEquipment * 0.1;
  n.UnitUpkeep += n.LargeSiegeEquipment * 0.2;

    n.SmallFortUpkeep = 1 * realOverallImprovements * n.HousingValue + 0.6 * (n.HeavyArmamentsValue + n.BasicArmamentsValue) / 2 * (n.Technologies.StarForts ? 2 : 1);
    n.MediumFortUpkeep = 2 * realOverallImprovements * n.HousingValue + 1.2 * (n.HeavyArmamentsValue + n.BasicArmamentsValue) / 2 * (n.Technologies.StarForts ? 2 : 1);
    n.BigFortUpkeep = 4 * realOverallImprovements * n.HousingValue + 2.4 * (n.HeavyArmamentsValue + n.BasicArmamentsValue) / 2 * (n.Technologies.StarForts ? 2 : 1);
    n.HugeFortUpkeep = 8 * realOverallImprovements * n.HousingValue + 4.8 * (n.HeavyArmamentsValue + n.BasicArmamentsValue) / 2 * (n.Technologies.StarForts ? 2 : 1);
    n.CityFortificationUpkeep = 3 * realOverallImprovements * n.HousingValue + 2.4 * (n.HeavyArmamentsValue + n.BasicArmamentsValue) / 2 * (n.Technologies.StarForts ? 2 : 1);
    n.SupplyDepotUpkeep = 0.75 * n.HousingValue;
    n.NavalBaseUpkeep = 1.25 * n.HousingValue;

    n.SmallFortConstructionCost = n.SmallFortUpkeep * 5;
    n.MediumFortConstructionCost = n.MediumFortUpkeep * 5;
    n.BigFortConstructionCost = n.BigFortUpkeep * 5;
    n.HugeFortConstructionCost = n.HugeFortUpkeep * 5;
    n.CityFortificationConstructionCost = n.CityFortificationUpkeep * 5;
    n.SupplyDepotConstructionCost = n.SupplyDepotUpkeep * 5;
    n.NavalBaseConstructionCost = n.NavalBaseUpkeep * 5;

    n.SmallFortUpkeep = n.SmallFortUpkeep / timeDivide;
    n.MediumFortUpkeep = n.MediumFortUpkeep / timeDivide;
    n.BigFortUpkeep = n.BigFortUpkeep / timeDivide;
    n.HugeFortUpkeep = n.HugeFortUpkeep / timeDivide;
    n.CityFortificationUpkeep = n.CityFortificationUpkeep / timeDivide;
    n.SupplyDepotUpkeep = n.SupplyDepotUpkeep / timeDivide;
    n.NavalBaseUpkeep = n.NavalBaseUpkeep / timeDivide;

    n.BuildingsUpkeep = n.SmallForts * n.SmallFortUpkeep + n.MediumForts * n.MediumFortUpkeep + n.BigForts * n.BigFortUpkeep + n.HugeForts * n.HugeFortUpkeep + n.CityFortifications * n.CityFortificationUpkeep + n.NavalBases * n.NavalBaseUpkeep + n.SupplyDepots * n.SupplyDepotUpkeep;

    const luxuryConsumablesValue = (n.EffectiveTea / luxuryConsumables) * n.TeaValue + (n.EffectiveCoffee / luxuryConsumables) * n.CoffeeValue + (n.EffectiveTobacco / luxuryConsumables) * n.TobaccoValue + (n.EffectiveExoticFruit / luxuryConsumables) * n.ExoticFruitValue + (n.EffectiveCocoa / luxuryConsumables) * n.CocoaValue;
    n.FoodAdditionsValue = (n.EffectiveSugar / foodAdditions) * n.SugarValue + (n.EffectiveSpice / foodAdditions) * n.SpiceValue;

    n.FoodSupply = ((n.FoodRationing ? min(n.Food + n.FoodPerTurn, n.Population / 1000) : n.Food + n.FoodPerTurn) * foodAdditionsFoodBoost)
    n.FoodValue = n.FoodDemand / n.FoodSupply;
    n.FoodValue = n.FoodDemand / (isNaN(n.FoodSupply) ? 1 : (n.FoodSupply == 0 ? 1 : (n.FoodSupply + Math.sqrt(n.FoodSupply)))) * 0.5;

  n.TradePowerFromResourceTrade = (function () {
    let num = 0;
    const TradePowerResources = [
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
      "ExoticFruit",
      "Housing",
      "Textiles",
      "BasicGoods",
      "LuxuryGoods",
      "Alcohol",
      "BasicTools",
      "HeavyIndustry",
      "BasicArmaments",
      "HeavyArmaments",
      "ShipBuilding",
      "Chemicals",
      "Motors",
      "Planes",
      "Electronics"
    ];
    for (const resourceName in TradePowerResources) {
      const resource = TradePowerResources[resourceName];
      num += +n[resource + "Incoming"] * +n[resource + "Value"];
      if(isNaN(num)){
        let allNaNStats = "";
        Object.keys(n).forEach(property => {
          if(typeof n[property] != 'undefined' && typeof n[property] != 'string' && typeof n[property] != 'object' && isNaN(n[property])) allNaNStats += `${property}\n`
        });
        lazyerror(`something went wrong. Tried to multiply ${n[resource + "Incoming"]} (${n.nationName ?? nationName}.${resource}Incoming) with ${n[resource + "Value"]} (${n.nationName ?? nationName}.${resource}Value).\nThe following stats are NaN currently: \n\n${allNaNStats}`);
        return 0;
      }
    }
    return num;
  })();

  n.OutgoingTradePowerFromResourceTrade = (function () {
    let num = 0;
    const TradePowerResources = [
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
      "ExoticFruit",
      "Housing",
      "Textiles",
      "BasicGoods",
      "LuxuryGoods",
      "Alcohol",
      "BasicTools",
      "HeavyIndustry",
      "BasicArmaments",
      "HeavyArmaments",
      "ShipBuilding",
      "Chemicals",
      "Motors",
      "Planes",
      "Electronics"
    ];
    for (const resourceName in TradePowerResources) {
      const resource = TradePowerResources[resourceName];
      num += +n[resource + "Outgoing"] * +n[resource + "Value"];
      if (isNaN(num)) {
        let allNaNStats = "";
        Object.keys(n).forEach(property => {
          if (typeof n[property] != 'undefined' && typeof n[property] != 'string' && typeof n[property] != 'object' && isNaN(n[property])) allNaNStats += `${property}\n`
        });
        lazyerror(`something went wrong. Tried to multiply ${n[resource + "Outgoing"]} (${n.nationName ?? nationName}.${resource}Outgoing) with ${n[resource + "Value"]} (${n.nationName ?? nationName}.${resource}Value).\nThe following stats are NaN currently: \n\n${allNaNStats}`);
        return 0;
      }
    }
    return num;
  })();

  n.ResourceTrade = (function () {
    let num = 0;
    const TradePowerResources = [
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
      "ExoticFruit",
      "Housing",
      "Textiles",
      "BasicGoods",
      "LuxuryGoods",
      "Alcohol",
      "BasicTools",
      "HeavyIndustry",
      "BasicArmaments",
      "HeavyArmaments",
      "ShipBuilding",
      "Chemicals",
      "Motors",
      "Planes",
      "Electronics"
    ];
    for (const resourceName in TradePowerResources) {
      const resource = TradePowerResources[resourceName];
      num += +n[resource + "Outgoing"];
    }
    return num;
  })();

  const pseudoTradePower = (function () {
    let stp = 0;
    for (const region in tradeZones) {
      let allNationPoints = 0;
      for (const nation in nations) {
        let point = +nations[nation].TradeInfluences[region].TradingPoints;
        allNationPoints += (typeof point !== 'undefined') ? point : 0;
      }
      let Point = n.TradeInfluences[region].TradingPoints;
      let percent = allNationPoints != 0 ? 
        (
          ((typeof Point !== 'undefined') ? Point : 0
        ) / allNationPoints) 
        : 0;
      stp += tradeZones[region].Score * percent;
    }
    return stp;
    })();

  n.Food = max(0, n.Food);
  n.FoodConsumption = n.Population / 1000 + n.Production * (n.ProductionSectors.AlcoholSector / totalSupply);
  n.FoodGain = n.FoodPerTurn + n.Food - n.FoodConsumption;
  n.FoodPopulationBoost = n.FoodGain / (n.Population / 1000) / 10;
  if (n.FoodGain > 0 && n.FoodRationing == false) {
    n.FoodConsumption += min(n.FoodGain, max(0, n.FoodDemand - n.Population / 1000));
    n.FoodGain = n.FoodGain - min(n.FoodGain, max(0, n.FoodDemand - n.Population / 1000));
  }

  n.MaxFoodStock = (function () {
    return max(100, 1000 * n.Population / 10000000) * (n.StockingCapabilities * (n.Technologies.CannedFood ? 2 : 1));
  })();
  n.FutureFood = min(n.MaxFoodStock, n.FoodGain);
  n.SurplusFood = (function () {
    return n.FoodGain > n.MaxFoodStock ? n.FoodGain - n.MaxFoodStock : 0;
  })();

  n.ProductionRevenue = (function () {
    let num = 0;
    const ProductionResources = [
      "Housing",
      "Textiles",
      "BasicGoods",
      "LuxuryGoods",
      "Alcohol",
      "BasicTools",
      "HeavyIndustry",
      "BasicArmaments",
      "HeavyArmaments",
      "ShipBuilding",
      "Chemicals",
      "Motors",
      "Planes",
      "Electronics"
    ];
    for (const resourceName in ProductionResources) {
      const resource = ProductionResources[resourceName];
        num += min(n["Effective" + resource] + n[resource + "Outgoing"] - n[resource + "Incoming"], n[resource + "Demand"]) * n[resource + "Value"];
      if (isNaN(num)) {
        let allNaNStats = "";
        Object.keys(n).forEach(property => {
          if (typeof n[property] != 'undefined' && typeof n[property] != 'string' && typeof n[property] != 'object' && isNaN(n[property])) allNaNStats += `${property}\n`
        });
        lazyerror(`something went wrong. Tried to sum ${n[resource + "Incoming"]} (${n.nationName ?? nationName}.Effective${resource}), ${n[resource + "Outgoing"]} (${n.nationName ?? nationName}.${resource}Outgoing), ${n[resource + "Incoming"]} (${n.nationName ?? nationName}.${resource}Incoming), ${n[resource + "Demand"]} (${n.nationName ?? nationName}.${resource}Demand), and multiply with ${n[resource + "Value"]} (${n.nationName ?? nationName}.${resource}Value).\nThe following stats are NaN currently: \n\n${allNaNStats}`);
        return 0;
      }
    }
    return num;
  })();
  n.PopProductionRevenue = n.ProductionRevenue * (1 - n.ProductionGovernmentControl);
  n.StateProductionRevenue = n.ProductionRevenue * n.ProductionGovernmentControl / timeDivide;
  
  n.SellingCapability = (n.LocalTrade / 2 + pseudoTradePower / 5) * n.TradeImprovements * 20;
  n.FoodSold = min(n.SellingCapability, n.SurplusFood);
  n.FoodLost = n.SurplusFood - n.FoodSold;
  n.FoodTradeProfit = n.FoodSold * n.FoodValue;
  n.AgricultureRevenue = (n.FoodPerTurn - n.FoodLost) * n.FoodValue;

  n.TradeProtection = min((n.LightShips * 2 + n.MediumShips * 3.5 + n.HeavyShips * 2) / max(n.MerchantShips, 1), 2);
  n.MerchantShipsFullfilment = min(n.MerchantShips / (n.ResourceTrade + pseudoTradePower / 2 + (n.LocalTrade * n.Population / 2000000 * (1 + n.AverageDevelopment) + n.FoodTradeProfit) / 4), 1);
  n.TradeEfficiency = max(0, (n.TradeImprovements + n.Technologies.Wheel / 4 + n.CulturalAdvancements.Currency / 4 + n.Reforms.GuildsBanned / 10 + n.Reforms.AntiMonopolyLaws / 5 - n.Corruption / 4 + n.CoastalPopulationPercent / 2 + n.Technologies.Cranes / 10 + n.Technologies.PromissoryNotes / 20 + n.TradeProtection + n.Technologies.Fluyt / 5) * (1 - n.Blockade) * max(n.MerchantShipsFullfilment, 0.1)) * (n.GovernmentDominatedBy == "Burgousie" || n.GovernmentDominatedBy == "Urban" ? 1.1 : 1);

  n.ExternalTradeEff = n.Reforms.Isolationism * 0.25 + n.Reforms.Mercantilism * 0.75 + n.Reforms.Protectionism + n.Reforms.FreeTrade * 1.25;
  n.InternalTradeEff = n.Reforms.Isolationism * 1.5 + n.Reforms.Mercantilism + n.Reforms.Protectionism * 0.75 + n.Reforms.FreeTrade * 0.5;

    n.ExternalTrade = pseudoTradePower * n.TradeEfficiency * n.ExternalTradeEff;
    n.InternalTrade = (n.LocalTrade * n.Population / 2000000 * (1 + n.AverageDevelopment)) * n.TradeEfficiency * n.InternalTradeEff + n.FoodTradeProfit / 2;
    n.TradePower = n.ExternalTrade + n.InternalTrade;
  
  n.KmSquared = n.Size != 0 ? n.Size * 20 : 78870; //But Please specify Size as soon as possible in game
  n.HabitableLand = (function () {
    if (n.Size == 0) return 0.8;
    let hl = 0;

    for (const climate in n.Climates) {
      hl += (n.Climates[climate].Pixels / n.Size) * climates[climate].ClimateScore;
    }

    return hl;
  })();
  
  n.HabitableLand += (n.HabitableLand <= 0 ? 1.00 : 0);

  n.PopulationDensityPerKmSquared = n.Population / (n.KmSquared * n.HabitableLand);

  n.SocietalClasses.High = n.Workforces.Aristocracy + n.Workforces.Burgousie;
    n.SocietalClasses.Medium = n.Workforces.Townsfolk + n.Workforces.Clergy + n.Workforces.Merchants + n.Workforces.Intellectuals + n.Workforces.Bureaucrats;
    n.SocietalClasses.Lower = n.Workforces.Farmers + n.Workforces.Soldiers + n.Workforces.Sailors + n.Workforces.Serfs + n.Workforces.Labourers + n.Workforces.Unemployed;
  n.SocietalClasses.Slaves = n.Workforces.Slaves;
  
  n.WarExhaustion = (n.Casualties / n.Population * 500) + (n.Pillaging * 20) + (n.Occupation * 5);

  n.EffectiveHealth = n.Health / 20 + (n.Technologies.HumanAnatomy ? 0.15 : 0) + (n.CulturalAdvancements.PotatoPopulationBoom ? 0.2 : 0) + (n.Technologies.ModernChemistry ? 0.05 : 0) + (n.Technologies.Vaccines ? 0.15 : 0) + (n.Technologies.Morphine ? 0.05 : 0);

  n.Disease = n.PopulationDensityPerKmSquared / 25 - n.EffectiveHealth;
  n.UnderPopulation = n.Disease < 0.5 ? (1 - n.Disease) / 10 : 0;

  n.LandAdministration = (n.Size / 5000) * (n.AdministrativeDemand / n.AdministrativePower);
  n.Overextension = n.UnderPopulation / 4 + n.LandAdministration / 2;

  n.LevyWage = n.ArmyWage / 4;
  n.MilitiaWage = n.ArmyWage / 2;
  n.EliteWage = n.ArmyWage * 2;

  n.Militias = n.Militia + n.MusketMilitia;
  n.Elites = n.EliteCavalry + n.EliteInfantry;
  n.Proffesionals = n.OverallNumbers - n.Levies - n.Militias - n.Elites;

  n.ArmyWages = (n.Levies * n.LevyWage + n.Militias * n.MilitiaWage + n.Proffesionals * n.ArmyWage + n.Elites * n.EliteWage) / 1000 / timeDivide;
  n.ArmyUpkeep = n.UnitUpkeep + n.ArmyWages;

  n.FutureLiteracyPercent = ((n.LiteracyPercent > education * 3) ? education * 3 : n.LiteracyPercent) + education / 10 / timeDivide;
  n.FutureHigherEducation = n.HigherEducation + (education >= 3 ? education / 30 : 0) + (n.HigherEducation > education / 3 ? -0.25 : 0);

  n.UpkeepForOneMerchantShip = ((0.025 * n.ShipBuildingValue + n.Technologies.Gunports * 0.1 / 8 * n.HeavyArmamentsValue) * (lightShipQualityIC)) / timeDivide;
  n.UpkeepForOneLightShip = ((0.05 * n.ShipBuildingValue + n.Technologies.Gunports * 0.8 / 8 * n.HeavyArmamentsValue) * (lightShipQualityIC)) / timeDivide;
  n.UpkeepForOneMediumShip = ((0.10 * n.ShipBuildingValue + n.Technologies.Gunports * 1.6 / 8 * n.HeavyArmamentsValue) * (mediumShipQualityIC)) / timeDivide;
  n.UpkeepForOneHeavyShip = ((0.20 * n.ShipBuildingValue + n.Technologies.Gunports * 3.2 / 8 * n.HeavyArmamentsValue) * (heavyShipQualityIC)) / timeDivide;

  n.MerchantShipConstructionCost = ((0.025 * 5 * n.ShipBuildingValue + n.Technologies.Gunports * 0.1 / 4 * n.HeavyArmamentsValue) * (lightShipQualityIC));
  n.LightShipConstructionCost = ((0.05 * 5 * n.ShipBuildingValue + n.Technologies.Gunports * 0.8 / 4 * n.HeavyArmamentsValue) * (lightShipQualityIC));
  n.MediumShipConstructionCost = ((0.10 * 5 * n.ShipBuildingValue + n.Technologies.Gunports * 1.6 / 4 * n.HeavyArmamentsValue) * (mediumShipQualityIC));
  n.HeavyShipConstructionCost = ((0.20 * 5 * n.ShipBuildingValue + n.Technologies.Gunports * 3.2 / 4 * n.HeavyArmamentsValue) * (heavyShipQualityIC));

  n.NavyUpkeep = (
    n.MerchantShips * n.UpkeepForOneMerchantShip +
    n.LightShips * n.UpkeepForOneLightShip +
    n.MediumShips * n.UpkeepForOneMediumShip +
    n.HeavyShips * n.UpkeepForOneHeavyShip +
    n.Workforces.Sailors * n.Population / 1000 * n.SailorsWage
  );

  n.TroopRecruitmentCost = (function () {
    let ntrp = 0;
    let nm = 0;
    let ns = 0;
    for (const unitName in unitsArmamentsDemandsAll) {
      const cost = unitsArmamentsDemandsAll[unitName];
      ntrp += n["New_" + unitName] * cost / 1000 * n.BasicArmamentsValue;
      nm += n["New_" + unitName];
    }
    ntrp += n.New_SiegeEquipment * 0.1;
    ntrp += n.New_LargeSiegeEquipment * 0.2;
    nm += (n.New_SiegeEquipment + n.New_LargeSiegeEquipment) * 10;
    ntrp += n.New_RegimentalGuns * 0.05 * n.HeavyArmamentsValue / 2;
    nm += n.New_RegimentalGuns * 3;
    ntrp += n.New_FieldCannons * 0.1 * n.HeavyArmamentsValue / 2;
    nm += n.New_FieldCannons * 6;
    ntrp += n.New_SiegeGuns * 0.2 * n.HeavyArmamentsValue / 2;
    nm += n.New_SiegeGuns * 10;

    ntrp += n.New_MerchantShips * n.MerchantShipConstructionCost * 2;
    ns += n.New_MerchantShips * 200;
    ntrp += n.New_LightShips * n.LightShipConstructionCost * 2;
    ns += n.New_LightShips * 400;
    ntrp += n.New_MediumShips * n.MediumShipConstructionCost * 2;
    ns += n.New_MediumShips * 900;
    ntrp += n.New_HeavyShips * n.HeavyShipConstructionCost * 2;
    ns += n.New_HeavyShips * 1600;

    ntrp += ns * n.SailorsWage / 1000;
    ntrp += nm * n.ArmyWage / 1000;
    ntrp /= 2;
    return ntrp;
  })();

    n.ConstructionCost = n.New_SmallForts * n.SmallFortConstructionCost + n.New_MediumForts * n.MediumFortConstructionCost + n.New_BigForts * n.BigFortConstructionCost + n.New_HugeForts * n.HugeFortConstructionCost + n.New_CityFortifications * n.CityFortificationConstructionCost + n.New_SupplyDepots * n.SupplyDepotConstructionCost + n.New_NavalBases * n.NavalBaseConstructionCost;

  n.Inflation = max(0, (n.Budget / 1000) / (n.AdministrativeEfficiency / 10));
  n.ResourceBudgetBoost = (function () {
    let rbb = 0;
    const budgetBoostingResources = [
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
    for (const resourceIndex in budgetBoostingResources) {
      const resource = budgetBoostingResources[resourceIndex];

        rbb += min(n["Effective" + resource] + n[resource + "Outgoing"] - n[resource + "Incoming"], n[resource + "Demand"]) * n[resource + "Value"];
    }
    return (rbb);
  })();

    n.ResourceOwners = (n.Reforms.NobleResourceOwnership == 1 ? n.Workforces.Aristocracy : 0) + (n.Reforms.MixedResourceOwnership == 1 ? n.Workforces.Aristocracy + n.Workforces.Burgousie : 0) + (n.Reforms.BurgousieResourceOwnership == 1 ? n.Workforces.Burgousie : 0)
    n.ResourceOwnersInfluence = (n.Reforms.NobleResourceOwnership == 1 ? n.EstateInfluencesReal.AristocracyInfluence : 0) + (n.Reforms.MixedResourceOwnership == 1 ? (n.EstateInfluencesReal.AristocracyInfluence + n.EstateInfluencesReal.BurgousieInfluence) / 2 : 0) + (n.Reforms.BurgousieResourceOwnership == 1 ? n.EstateInfluencesReal.BurgousieInfluence : 0)

    n.LandOwners = (n.Reforms.NobleLandOwnership == 1 ? n.Workforces.Aristocracy : 0) + (n.Reforms.MixedLandOwnership == 1 ? n.Workforces.Aristocracy + n.Workforces.Burgousie : 0) + (n.Reforms.PrivateLandOwnership == 1 ? n.Workforces.Burgousie : 0)
    n.LandOwnersInfluence = (n.Reforms.NobleLandOwnership == 1 ? n.EstateInfluencesReal.AristocracyInfluence : 0) + (n.Reforms.MixedLandOwnership == 1 ? (n.EstateInfluencesReal.AristocracyInfluence + n.EstateInfluencesReal.BurgousieInfluence) / 2 : 0) + (n.Reforms.PrivateLandOwnership == 1 ? n.EstateInfluencesReal.BurgousieInfluence : 0)

    n.BurgousieProductionShareMaxed = min(n.EstateInfluencesReal.BurgousieInfluence * 4, 0.5) + (n.EstateInfluencesReal.BurgousieInfluence > 0.175 ? min((n.EstateInfluencesReal.BurgousieInfluence - 0.175), 0.3) : 0) + (n.EstateInfluencesReal.BurgousieInfluence > 0.275 ? min((n.EstateInfluencesReal.BurgousieInfluence - 0.275), 0.15) : 0) - n.EstateInfluencesReal.UrbanInfluence;

    n.UnemployedWage = 0;
    n.SlavesWage = (n.Reforms.GovernmentResourceOwnership ? n.StateLabourerWage * 0.05 : (n.Workforces.Slaves > 0 ? n.ResourceBudgetBoost / (n.Population / 1000 * n.Workforces.Slaves) * 0.05 : 0));
    n.LabourersWage = (n.Reforms.GovernmentResourceOwnership ? n.StateLabourerWage : (n.Workforces.Labourers > 0 ? n.ResourceBudgetBoost / (n.Population / 1000 * n.Workforces.Labourers) * (1 - n.ResourceOwnersInfluence) : 0));
      n.SlavesAndLabourersWageToOwner = (n.Reforms.GovernmentResourceOwnership ? 0 : n.Population * n.Workforces.Slaves / 1000 * n.SlavesWage / 0.1 * 0.9 + n.Workforces.Labourers / 1000 * n.LabourersWage / (1 - n.ResourceOwnersInfluence) * n.ResourceOwnersInfluence);
    n.SerfsWage = (n.Reforms.GovernmentLandOwnership ? n.StateFarmerWage * 0.5 : n.AgricultureRevenue / ((n.Workforces.Farmers + n.Workforces.Serfs) * n.Population / 1000) * 0.25);
    n.FarmersWage = (n.Reforms.GovernmentLandOwnership ? n.StateFarmerWage : n.AgricultureRevenue / ((n.Workforces.Farmers + n.Workforces.Serfs) * n.Population / 1000) * (1 - n.LandOwnersInfluence));
      n.SerfsAndFarmersWageToOnwers = (n.Reforms.GovernmentLandOwnership ? 0 : n.Population * n.Workforces.Serfs / 1000 * n.SerfsWage / 0.25 * 0.75 + n.Population * n.Workforces.Farmers / 1000 * n.FarmersWage / (1 - n.LandOwnersInfluence) * n.LandOwnersInfluence);
    n.TownsfolkWage = ((n.PopProductionRevenue * 5 / (n.Population / 1000 * n.Workforces.Townsfolk)) * (1 - n.BurgousieProductionShareMaxed)) * (1 - n.ProductionGovernmentControl) + n.ProductionGovernmentControl * n.StateFactoryWorkerWage;
        n.TownsfolkWageToBurgousie = (n.Population * n.Workforces.Townsfolk / 1000 * n.TownsfolkWage / (1 - n.BurgousieProductionShareMaxed) * n.EstateInfluencesReal.BurgousieInfluence * 4) * (1 - n.ProductionGovernmentControl);
    n.ClergyWage = n.Population / (n.Population / 1000 * n.Workforces.Clergy) * n.EstateInfluencesReal.ClergyInfluence / 1000;
    n.BureaucratsWage = n.BureaucratsWages * (1 + n.EstateInfluencesReal.BureaucratsInfluence * 2);
    n.MerchantsWage = n.MerchantShips > 0 ? ((n.InternalTrade * (1 - n.InternalTariffs) + n.ExternalTrade * (1 - n.ExternalTariffs)) / (n.Population / 1000 * n.Workforces.Merchants) * (1 - n.BurgousieProductionShareMaxed / 2)) : 0.5;
        n.MerchantsWageToBurggousie = n.Population * n.Workforces.Merchants / 1000 * n.MerchantsWage / (1 - n.BurgousieProductionShareMaxed / 2) * n.EstateInfluencesReal.BurgousieInfluence * 2;
    n.IntellectualsWage = (education - n.Reforms.ReligiousSchools) * (1 + n.LiteracyPercent / 50 + n.EstateInfluencesReal.IntellectualsInfluence * 10);
  //   n.SailorsWage = 1 * n.ArmyWages;
    n.SoldiersWage = (isNaN(n.ArmyWages / n.OverallNumbers * 1000) ? n.ArmyWage : (n.ArmyWages / n.OverallNumbers * 1000));
    n.AristocracyWage = (n.Reforms.NobleLandOwnership == 1 ? n.SerfsAndFarmersWageToOnwers / (n.Population * n.Workforces.Aristocracy / 1000) : 0) + (n.Reforms.MixedLandOwnership == 1 ? n.SerfsAndFarmersWageToOnwers / (n.Population * (n.Workforces.Burgousie + n.Workforces.Aristocracy) / 1000) : 0) + (n.Reforms.NobleResourceOwnership == 1 ? n.SlavesAndLabourersWageToOwner / (n.Population * n.Workforces.Aristocracy / 1000) : 0) + (n.Reforms.MixedResourceOwnership == 1 ? n.SlavesAndLabourersWageToOwner / (n.Population * (n.Workforces.Burgousie + n.Workforces.Aristocracy) / 1000) : 0);
    n.BurgousieWage = (n.TownsfolkWageToBurgousie + n.MerchantsWageToBurggousie) / (n.Population * n.Workforces.Burgousie / 1000) + (n.Reforms.MixedResourceOwnership == 1 ? n.SlavesAndLabourersWageToOwner / (n.Population * (n.Workforces.Burgousie + n.Workforces.Aristocracy) / 1000) : 0) + (n.Reforms.BurgousieResourceOwnership == 1 ? n.SlavesAndLabourersWageToOwner / (n.Population * n.Workforces.Burgousie / 1000) : 0) + (n.Reforms.MixedLandOwnership == 1 ? n.SerfsAndFarmersWageToOnwers / (n.Population * (n.Workforces.Burgousie + n.Workforces.Aristocracy) / 1000) : 0) + (n.Reforms.PrivateLandOwnership == 1 ? n.SerfsAndFarmersWageToOnwers / (n.Population * n.Workforces.Burgousie / 1000) : 0);

  // GDP
  n.Gdp = n.ResourceBudgetBoost + n.FoodPerTurn * n.FoodValue + n.ProductionRevenue + n.TradePower;
  n.GdpPerKCapita = n.Gdp / n.Population * 1000;

  n.InterestRate = 0.05 + n.PublicDebtLength * 0.02 / timeDivide;
  n.EffectiveDebt = n.PublicDebtTaken * (1 + n.InterestRate);
  n.PossiblePublicDebt = max(0, n.Gdp * n.AdministrativeEfficiency / 100 - n.EffectiveDebt);
  n.DebtToGdpRatio = n.EffectiveDebt / n.Gdp;

  n.GeneralPopulace = [
    "Labourers",
    "Serfs",
    "Unemployed",
    "Farmers",
    "Townsfolk",
    "Merchants",
    "Intellectuals"
  ];

    n.TaxEfficiency = (1 - n.EstateInfluencesReal.AristocracyInfluence / 4 - n.EstateInfluencesReal.ClergyInfluence / 4 - n.AdministrativeStrain / n.AdministrativePower * 2) * (1 - n.Occupation) * clamp(0, 1, (1 - n.Corruption / 10));
    n.TariffEfficiency = (1 - n.EstateInfluencesReal.BurgousieInfluence / 2 - n.AdministrativeStrain / n.AdministrativePower - n.Reforms.Protectionism * 0.1 - n.Reforms.FreeTrade * 0.5) * (1 - n.Occupation) * clamp(0, 1, (1 - n.Corruption / 10));

  n.AristocracyArmiesBudget = (n.Reforms.FeudalNobleArmies || n.Reforms.Mercenaries ? n.AristocracyWage * (1 - n.AristocracyTax * n.TaxEfficiency * (1 - n.EstateInfluencesReal.AristocracyInfluence)) * 0.1 : 0) * n.Workforces.Aristocracy * n.Population / 1000 * (n.Reforms.FeudalNobleArmies ? (1 + n.EstateInfluencesReal.AristocracyInfluence) : 1);
  n.BurgousieArmiesBudget = (n.Reforms.Mercenaries ? n.BurgousieWage * (1 - n.BurgousieTax * n.TaxEfficiency * (1 - n.EstateInfluencesReal.BurgousieInfluence)) * 0.1 : 0) * n.Workforces.Burgousie * n.Population / 1000;
  n.ClergyArmiesBudget = (n.Reforms.ReligiousOrders ? n.ClergyWage * (1 - n.ClergyTax * n.TaxEfficiency * (1 - n.EstateInfluencesReal.ClergyInfluence)) * 0.1 : 0) * n.Workforces.Clergy * n.Population / 1000;
  n.PopulaceArmiesBudget = 0;
  for (const EstateIndex in n.GeneralPopulace) {
    const Estate = n.GeneralPopulace[EstateIndex];
    const Influence = (Estate == "Unemployed" || Estate == "Labourers" || Estate == "Serfs" || Estate == "Farmers" ? n.EstateInfluencesReal.WorkersInfluence : 0) + (Estate == "Townsfolk" || Estate == "Merchants" ? n.EstateInfluencesReal.UrbanInfluence : 0) + (Estate == "Intellectuals" ? n.EstateInfluencesReal.IntellectualsInfluence : 0);
    const Tax = (Estate == "Unemployed" || Estate == "Labourers" || Estate == "Serfs" || Estate == "Farmers" ? n.WorkersTax : 0) + (Estate == "Townsfolk" || Estate == "Merchants" ? n.UrbanTax : 0) + (Estate == "Intellectuals" ? n.IntellectualsTax : 0);
    n.PopulaceArmiesBudget += n[Estate + "Wage"] * (1 - Tax * n.TaxEfficiency * (1 - Influence)) * 0.1 * n.Workforces[Estate] * n.Population / 1000;
    n[Estate + "WeaponContribution"] = n[Estate + "Wage"] * (1 - Tax * n.TaxEfficiency * (1 - Influence)) * 0.1 * n.Workforces[Estate] * n.Population / 1000;
  }
  for (const EstateIndex in n.GeneralPopulace) {
    const Estate = n.GeneralPopulace[EstateIndex];
    n[Estate + "WeaponContribution"] = n[Estate + "WeaponContribution"] / n.PopulaceArmiesBudget;
  }
  
    n.PopulaceArmiesBudget = n.PopulaceArmiesBudget * (n.Reforms.LimitedWeaponOwnership ? 0.6 : 1) * (n.Reforms.WeaponOwnershipForbidden ? 0.2 : 1) * (n.Reforms.NationalMilitia ? 1.5 : 1);

  n.TotalPrivateArmyBudgets = n.AristocracyArmiesBudget * (1 + n.EstateInfluencesReal.AristocracyInfluence) + n.BurgousieArmiesBudget * (1 + n.EstateInfluencesReal.BurgousieInfluence) + n.ClergyArmiesBudget * (1 + n.EstateInfluencesReal.ClergyInfluence) + n.PopulaceArmiesBudget * (1 + n.EstateInfluencesReal.WorkersInfluence + n.EstateInfluencesReal.UrbanInfluence + n.EstateInfluencesReal.IntellectualsInfluence);

    n.AvailableWeapons = clamp(n.EffectiveBasicArmaments * 0.35 * clamp(0, 1, n.TotalPrivateArmyBudgets / (n.EffectiveBasicArmaments * n.BasicArmamentsValue)), n.EffectiveBasicArmaments * clamp(0, 1, n.TotalPrivateArmyBudgets / (n.EffectiveBasicArmaments * n.BasicArmamentsValue)), (n.EffectiveBasicArmaments - n.BasicArmamentsStockpiled - n.ArmyBasicArmamentsDemand) * clamp(0, 1, n.TotalPrivateArmyBudgets / (n.EffectiveBasicArmaments * n.BasicArmamentsValue)));

  n.AristocracyBasicArmaments = (n.AristocracyArmiesBudget * (1 + n.EstateInfluencesReal.AristocracyInfluence) / n.TotalPrivateArmyBudgets) * n.AvailableWeapons;
  n.BurgousieBasicArmaments = (n.BurgousieArmiesBudget * (1 + n.EstateInfluencesReal.BurgousieInfluence) / n.TotalPrivateArmyBudgets) * n.AvailableWeapons;
  n.ClergyBasicArmaments = (n.ClergyArmiesBudget * (1 + n.EstateInfluencesReal.ClergyInfluence) / n.TotalPrivateArmyBudgets) * n.AvailableWeapons;
  n.PopulaceBasicArmaments = (n.PopulaceArmiesBudget * (1 + n.EstateInfluencesReal.WorkersInfluence + n.EstateInfluencesReal.UrbanInfluence + n.EstateInfluencesReal.IntellectualsInfluence) / n.TotalPrivateArmyBudgets) * n.AvailableWeapons;

  n.AristocracyManpower = (n.AristocracyArmiesBudget * (1 + n.EstateInfluencesReal.AristocracyInfluence) / n.TotalPrivateArmyBudgets) * n.Population * 0.005;
  n.BurgousieManpower = (n.BurgousieArmiesBudget * (1 + n.EstateInfluencesReal.BurgousieInfluence) / n.TotalPrivateArmyBudgets) * n.Population * 0.005;
  n.ClergyManpower = (n.ClergyArmiesBudget * (1 + n.EstateInfluencesReal.ClergyInfluence) / n.TotalPrivateArmyBudgets) * n.Population * 0.005;

  n.PrivateArmySetup = {
    Levies: 0.50 - (n.Technologies.StandardizedPikes ? 0.15 : 0) - (n.Technologies.Matchlock ? 0.10 : 0) - (n.Technologies.Metallurgy ? 0.15 : 0) - (n.Technologies.Bayonet ? 0.05 : 0) - (n.Technologies.SocketBayonet ? 0.05 : 0),
    Militia: 0.15 + (n.Technologies.StandardizedPikes ? 0.05 : 0) - (n.Technologies.Bayonet ? 0.05 : 0) - (n.Technologies.SocketBayonet ? 0.15 : 0),
    LightInfantry: 0.075 + (n.Technologies.StandardizedPikes ? 0.025 : 0) - (n.Technologies.Bayonet ? 0.05 : 0) - (n.Technologies.SocketBayonet ? 0.05 : 0),
    HeavyInfantry: 0.075 + (n.Technologies.StandardizedPikes ? 0.125 : 0) + (n.Technologies.Matchlock ? 0.08 : 0) + (n.Technologies.Metallurgy ? 0.05 : 0) - (n.Technologies.Bayonet ? 0.03 : 0) - (n.Technologies.SocketBayonet ? 0.10 : 0) - (n.Technologies.Flintlock ? 0.20 : 0),
    EliteInfantry: 0.01,
    Archers: 0.04 - (n.Technologies.Muskets ? 0.02 : 0) - (n.Technologies.Matchlock ? 0.02 : 0),
    Crossbowmen: 0.04 - (n.Technologies.Muskets ? 0.02 : 0) - (n.Technologies.Matchlock ? 0.02 : 0),
    Musketeers: 0.00 + (n.Technologies.Muskets ? 0.02 : 0) + (n.Technologies.Matchlock ? 0.03 : 0) + (n.Technologies.Metallurgy ? 0.05 : 0) + (n.Technologies.Bayonet ? 0.085 : 0) + (n.Technologies.SocketBayonet ? 0.30 : 0) + (n.Technologies.Flintlock ? 0.15 : 0),
    MusketMilitia: 0.00 + (n.Technologies.Muskets ? 0.02 : 0) + (n.Technologies.Matchlock ? 0.03 : 0) + (n.Technologies.Metallurgy ? 0.05 : 0) + (n.Technologies.Bayonet ? 0.095 : 0) + (n.Technologies.SocketBayonet ? 0.05 : 0) + (n.Technologies.Flintlock ? 0.05 : 0) - (n.Technologies.Rifles ? 0.025 : 0),
    Riflemen: 0.00 + (n.Technologies.Rifles ? 0.025 : 0),
    LightCavalry: 0.10 - (n.Technologies.SaddleAndStirrup ? 0.05 : 0),
    HeavyCavalry: 0.00 + (n.Technologies.SaddleAndStirrup ? 0.05 : 0),
    EliteCavalry: 0.01
  }

  for (const UnitIndex in n.PrivateArmySetup) {
    const Amount = n.PrivateArmySetup[UnitIndex];
    const Cost = unitsArmamentsDemands[UnitIndex];
      n["Aristocracy" + UnitIndex] = n.AristocracyBasicArmaments * Amount / Cost * 1000 - (n["Aristocracy" + UnitIndex + "Casualties"] != null ? n["Aristocracy" + UnitIndex + "Casualties"] : 0);
  }

  for (const UnitIndex in n.PrivateArmySetup) {
    const Amount = n.PrivateArmySetup[UnitIndex];
    const Cost = unitsArmamentsDemands[UnitIndex];
      n["Burgousie" + UnitIndex] = n.BurgousieBasicArmaments * Amount / Cost * 1000 - (n["Burgousie" + UnitIndex + "Casualties"] != null ? n["Burgousie" + UnitIndex + "Casualties"] : 0);
  }

  for (const UnitIndex in n.PrivateArmySetup) {
    const Amount = n.PrivateArmySetup[UnitIndex];
    const Cost = unitsArmamentsDemands[UnitIndex];
      n["Clergy" + UnitIndex] = n.ClergyBasicArmaments * Amount / Cost * 1000 - (n["Clergy" + UnitIndex + "Casualties"] != null ? n["Clergy" + UnitIndex + "Casualties"] : 0);
  }

    n.MilitiaBalance = (1 - n.Technologies.Muskets * 0.05 - n.Technologies.Matchlock * 0.15 - n.Technologies.Bayonet * 0.05 - n.Technologies.SocketBayonet * 0.15 - n.Technologies.Flintlock * 0.40);
    n.PopulaceMilitia = n.MilitiaBalance * n.PopulaceBasicArmaments / unitsArmamentsDemands.Militia * 1000 - (n.PopulaceMilitiaCasualties != null ? n.PopulaceMilitiaCasualties : 0);
    n.PopulaceMusketMilitia = (1 - n.MilitiaBalance) * n.PopulaceBasicArmaments / unitsArmamentsDemands.MusketMilitia * 1000 - (n.PopulaceMusketMilitiaCasualties != null ? n.PopulaceMusketMilitiaCasualties : 0);

  n.SlavesEffectiveWage = n.SlavesWage * (1 - n.WorkersTax * n.TaxEfficiency * (1 - n.EstateInfluencesReal.WorkersInfluence));
  n.LabourersEffectiveWage = n.LabourersWage * (1 - n.WorkersTax * n.TaxEfficiency * (1 - n.EstateInfluencesReal.WorkersInfluence)) + (n.ExpectedLabourersSol < n.AverageExpectedSol ? n.SocialSpending / 20 : 0) - (n.PopulaceBasicArmaments * n.BasicArmamentsValue * n.LabourersWeaponContribution) / max(1, n.Population * n.Workforces.Labourers / 1000);
    n.SerfsEffectiveWage = n.SerfsWage * (1 - n.WorkersTax * n.TaxEfficiency * (1 - n.EstateInfluencesReal.WorkersInfluence)) + (n.ExpectedSerfsSol < n.AverageExpectedSol ? n.SocialSpending / 20 : 0) - (n.PopulaceBasicArmaments * n.BasicArmamentsValue * n.SerfsWeaponContribution) / max(1, n.Population * n.Workforces.Serfs / 1000);
    n.UnemployedEffectiveWage = n.UnemployedWage * (1 - n.WorkersTax * n.TaxEfficiency * (1 - n.EstateInfluencesReal.WorkersInfluence)) + (n.ExpectedUnemployedSol < n.AverageExpectedSol ? n.SocialSpending / 20 : 0) - (n.PopulaceBasicArmaments * n.BasicArmamentsValue * n.UnemployedWeaponContribution) / max(1, n.Population * n.Workforces.Unemployed / 1000);
  n.FarmersEffectiveWage = n.FarmersWage * (1 - n.WorkersTax * n.TaxEfficiency * (1 - n.EstateInfluencesReal.WorkersInfluence)) + (n.ExpectedFarmersSol < n.AverageExpectedSol ? n.SocialSpending / 20 : 0) - (n.PopulaceBasicArmaments * n.BasicArmamentsValue * n.FarmersWeaponContribution) / (n.Population * n.Workforces.Farmers / 1000);
  n.TownsfolkEffectiveWage = n.TownsfolkWage * (1 - n.UrbanTax * n.TaxEfficiency * (1 - n.EstateInfluencesReal.UrbanInfluence)) + (n.ExpectedTownsfolkSol < n.AverageExpectedSol ? n.SocialSpending / 20 : 0) - (n.PopulaceBasicArmaments * n.BasicArmamentsValue * n.TownsfolkWeaponContribution) / (n.Population * n.Workforces.Townsfolk / 1000);
  n.ClergyEffectiveWage = n.ClergyWage * (1 - n.ClergyTax * n.TaxEfficiency * (1 - n.EstateInfluencesReal.ClergyInfluence)) + (n.ExpectedClergySol < n.AverageExpectedSol ? n.SocialSpending / 20 : 0);
  n.BureaucratsEffectiveWage = n.BureaucratsWage * (1 - n.BureaucratsTax * n.TaxEfficiency * (1 - n.EstateInfluencesReal.BureaucratsInfluence)) + (n.ExpectedBureaucratsSol < n.AverageExpectedSol ? n.SocialSpending / 20 : 0);
  n.MerchantsEffectiveWage = n.MerchantsWage * (1 - n.UrbanTax * n.TaxEfficiency * (1 - n.EstateInfluencesReal.UrbanInfluence)) + (n.ExpectedMerchantsSol < n.AverageExpectedSol ? n.SocialSpending / 20 : 0) - (n.PopulaceBasicArmaments * n.BasicArmamentsValue * n.MerchantsWeaponContribution) / max(n.Population * n.Workforces.Merchants / 1000, 1);
  n.IntellectualsEffectiveWage = n.IntellectualsWage * (1 - n.IntellectualsTax * n.TaxEfficiency * (1 - n.EstateInfluencesReal.IntellectualsInfluence)) + (n.ExpectedIntellectualsSol < n.AverageExpectedSol ? n.SocialSpending / 20 : 0) - (n.PopulaceBasicArmaments * n.BasicArmamentsValue * n.IntellectualsWeaponContribution) / (n.Population * n.Workforces.Intellectuals / 1000);
  n.SailorsEffectiveWage = n.SailorsWage * (1 - n.MilitaryTax * n.TaxEfficiency * (1 - n.EstateInfluencesReal.MilitaryInfluence)) + (n.ExpectedSailorsSol < n.AverageExpectedSol ? n.SocialSpending / 20 : 0);
  n.SoldiersEffectiveWage = n.SoldiersWage * (1 - n.MilitaryTax * n.TaxEfficiency * (1 - n.EstateInfluencesReal.MilitaryInfluence)) + (n.ExpectedSoldiersSol < n.AverageExpectedSol ? n.SocialSpending / 20 : 0);
  n.AristocracyEffectiveWage = n.AristocracyWage * (1 - n.AristocracyTax * n.TaxEfficiency * (1 - n.EstateInfluencesReal.AristocracyInfluence)) + (n.ExpectedAristocracySol < n.AverageExpectedSol ? n.SocialSpending / 20 : 0) - (n.AristocracyBasicArmaments * n.BasicArmamentsValue) / (n.Population * n.Workforces.Aristocracy / 1000);
  n.BurgousieEffectiveWage = n.BurgousieWage * (1 - n.BurgousieTax * n.TaxEfficiency * (1 - n.EstateInfluencesReal.BurgousieInfluence)) + (n.ExpectedBurgousieSol < n.AverageExpectedSol ? n.SocialSpending / 20 : 0) - (n.BurgousieBasicArmaments * n.BasicArmamentsValue) / (n.Population * n.Workforces.Burgousie / 1000);

  // n.SocialSpendingUpkeep
  n.SocialSpendingUpkeep = 0;
  for (const EstateIndex in estates) {
    const Estate = estates[EstateIndex];
    if (Estate != "Slaves") {
      n.SocialSpendingUpkeep += (n["Expected" + Estate + "Sol"] < n.AverageExpectedSol ? n.SocialSpending / 20 * n.Population / 1000 * (isNaN(n.Workforces[Estate]) ? 0 : n.Workforces[Estate]) : 0);
    }
  }
  n.SocialSpendingUpkeep = n.SocialSpendingUpkeep / timeDivide;


    n.NecessitiesCost = (0.5 * n.HousingValue + 0.5 * n.TextilesValue + n.BasicGoodsValue + n.AlcoholValue * (0.5 + n.Alcoholism) * (1 - n.ReligionGroups.Sunni.Points / 100 - n.ReligionGroups.Shia.Points / 100) + n.CoffeeValue * 0.5 * (n.ReligionGroups.Sunni.Points / 100 + n.ReligionGroups.Shia.Points / 100) + 0.5 * n.BasicToolsValue) / 200 + (n.CoalValue * 0.005 > n.WoodValue * 0.01 ? 0.01 * n.WoodValue : 0.005 * n.CoalValue) + (n.FoodAdditionsValue / 2 < n.FoodValue ? 0.1 * n.FoodAdditionsValue + 0.8 * n.FoodValue : n.FoodValue);
    n.LuxuriesCost = (n.HousingValue + n.TextilesValue + 1.5 * n.BasicGoodsValue + n.LuxuryGoodsValue + 2 * n.AlcoholValue * (0.5 + n.Alcoholism) * (1 - n.ReligionGroups.Sunni.Points / 100 - n.ReligionGroups.Shia.Points / 100) + n.CoffeeValue * (n.ReligionGroups.Sunni.Points / 100 - n.ReligionGroups.Shia.Points / 100)) / 200 + (n.CoalValue * 0.01 > n.WoodValue * 0.02 ? n.WoodValue * 0.02 : 0.01 * n.CoalValue) + (n.FoodAdditionsValue / 2 < n.FoodValue ? n.FoodAdditionsValue / 2 * 0.75 + 0.5 * n.FoodValue : 1.25 * n.FoodValue) + (luxuryConsumablesValue / 10 < n.FoodValue ? 0.05 * luxuryConsumablesValue : 0.5 * n.FoodValue);

    // SoL
  for (const EstateIndex in estates) {
    const Estate = estates[EstateIndex];
    n[Estate + "Sol"] = (n[Estate + "EffectiveWage"] < n.NecessitiesCost ? n[Estate + "EffectiveWage"] / n.NecessitiesCost : 1 + (n[Estate + "EffectiveWage"] - n.NecessitiesCost) / n.LuxuriesCost);
  }

    n.AverageSol = (isNaN(n.Workforces.Slaves) ? 0 : n.Workforces.Slaves) * n.SlavesSol + (isNaN(n.Workforces.Labourers) ? 0 : n.Workforces.Labourers) * n.LabourersSol + (isNaN(n.Workforces.Serfs) ? 0 : n.Workforces.Serfs) * n.SerfsSol + (isNaN(n.Workforces.Unemployed) ? 0 : n.Workforces.Unemployed) * n.UnemployedSol + (isNaN(n.Workforces.Farmers) ? 0 : n.Workforces.Farmers) * n.FarmersSol + (isNaN(n.Workforces.Townsfolk) ? 0 : n.Workforces.Townsfolk) * n.TownsfolkSol + (isNaN(n.Workforces.Clergy) ? 0 : n.Workforces.Clergy) * n.ClergySol + (isNaN(n.Workforces.Bureaucrats) ? 0 : n.Workforces.Bureaucrats) * n.BureaucratsSol + (isNaN(n.Workforces.Merchants) ? 0 : n.Workforces.Merchants) * n.MerchantsSol + (isNaN(n.Workforces.Intellectuals) ? 0 : n.Workforces.Intellectuals) * n.IntellectualsSol + (isNaN(n.Workforces.Sailors) ? 0 : n.Workforces.Sailors) * n.SailorsSol + (isNaN(n.Workforces.Soldiers) ? 0 : n.Workforces.Soldiers) * n.SoldiersSol + (isNaN(n.Workforces.Aristocracy) ? 0 : n.Workforces.Aristocracy) * n.AristocracySol + (isNaN(n.Workforces.Burgousie) ? 0 : n.Workforces.Burgousie) * n.BurgousieSol;

  n.ExpectedUrbanSol = n.ExpectedTownsfolkSol * n.Workforces.Townsfolk / (n.Workforces.Townsfolk + n.Workforces.Merchants) + n.ExpectedMerchantsSol * n.Workforces.Merchants / (n.Workforces.Townsfolk + n.Workforces.Merchants);
  n.UrbanSol = n.TownsfolkSol * n.Workforces.Townsfolk / (n.Workforces.Townsfolk + n.Workforces.Merchants) + n.MerchantsSol * n.Workforces.Merchants / (n.Workforces.Townsfolk + n.Workforces.Merchants);

    n.ExpectedMilitarySol = max(n.ExpectedSoldiersSol * n.Workforces.Soldiers / (n.Workforces.Soldiers + n.Workforces.Sailors == 0 ? 0.01 : n.Workforces.Soldiers + n.Workforces.Sailors) + n.ExpectedSailorsSol * n.Workforces.Sailors / (n.Workforces.Soldiers + n.Workforces.Sailors == 0 ? 0.01 : n.Workforces.Soldiers + n.Workforces.Sailors), 0.1);
    n.MilitarySol = max(n.SoldiersSol * n.Workforces.Soldiers / (n.Workforces.Soldiers + n.Workforces.Sailors == 0 ? 0.01 : n.Workforces.Soldiers + n.Workforces.Sailors) + n.SailorsSol * n.Workforces.Sailors / (n.Workforces.Soldiers + n.Workforces.Sailors == 0 ? 0.01 : n.Workforces.Soldiers + n.Workforces.Sailors), 0.01);

    n.ExpectedWorkersSol = n.ExpectedFarmersSol * n.Workforces.Farmers / (n.Workforces.Farmers + n.Workforces.Labourers + n.Workforces.Serfs + n.Workforces.Unemployed) + n.ExpectedLabourersSol * n.Workforces.Labourers / (n.Workforces.Farmers + n.Workforces.Labourers + n.Workforces.Serfs + n.Workforces.Unemployed) + n.ExpectedSerfsSol * n.Workforces.Serfs / (n.Workforces.Farmers + n.Workforces.Labourers + n.Workforces.Serfs + n.Workforces.Unemployed) + n.ExpectedUnemployedSol * n.Workforces.Unemployed / (n.Workforces.Farmers + n.Workforces.Labourers + n.Workforces.Serfs + n.Workforces.Unemployed);
    n.WorkersSol = n.FarmersSol * n.Workforces.Farmers / (n.Workforces.Farmers + n.Workforces.Labourers + n.Workforces.Serfs + n.Workforces.Unemployed) + n.LabourersSol * n.Workforces.Labourers / (n.Workforces.Farmers + n.Workforces.Labourers + n.Workforces.Serfs + n.Workforces.Unemployed) + n.SerfsSol * n.Workforces.Serfs / (n.Workforces.Farmers + n.Workforces.Labourers + n.Workforces.Serfs + n.Workforces.Unemployed) + n.UnemployedSol * n.Workforces.Unemployed / (n.Workforces.Farmers + n.Workforces.Labourers + n.Workforces.Serfs + n.Workforces.Unemployed);

  n.Sols = {
    SlavesSol: n.SlavesSol,
    LabourersSol: n.LabourersSol,
      SerfsSol: n.SerfsSol,
      UnemployedSol: n.UnemployedSol,
    FarmersSol: n.FarmersSol,
    TownsfolkSol: n.TownsfolkSol,
    ClergySol: n.ClergySol,
    MerchantsSol: n.MerchantsSol,
    SailorsSol: n.SailorsSol,
    SoldiersSol: n.SoldiersSol,
    AristocracySol: n.AristocracySol,
    BurgousieSol: n.BurgousieSol
  }
  n.SolsSorted = Object.keys(n.Sols).sort(function (a, b) { return n.Sols[a] - n.Sols[b] });
  n.SolsSorted.reverse();
  n.LiteracyLeft = n.LiteracyPercent / 100 - n.Workforces.Intellectuals - n.Workforces.Bureaucrats;
  for (const SolIndex in n.SolsSorted) {
    let Estate = n.SolsSorted[SolIndex];
    Estate = Estate.substring(0, Estate.length - 3);

    if (n.LiteracyLeft > (isNaN(n.Workforces[Estate]) ? 0 : n.Workforces[Estate])) {
      n[Estate + "Literacy"] = 1;
      n.LiteracyLeft -= (isNaN(n.Workforces[Estate]) ? 0 : n.Workforces[Estate]);
    }
    else {
      if (n.LiteracyLeft > 0) {
        n[Estate + "Literacy"] = (isNaN(n.Workforces[Estate]) ? 0 : n.LiteracyLeft / n.Workforces[Estate]);
        n.LiteracyLeft = 0;
      }
      else {
        n[Estate + "Literacy"] = 0;
      }
    }
  }
  n.IntellectualsLiteracy = 1;
  n.BureaucratsLiteracy = 1;


  // PoliticalAwareness
  for (const EstateIndex in estates) {
    const Estate = estates[EstateIndex];
      n[Estate + "PoliticalAwareness"] = max(0, n[Estate + "Literacy"] * (1 - n.Reforms.StateMediaOnly * 0.4 - n.Reforms.ExtensiveCensorship * 0.2 - n.Reforms.LimitedCensorship * 0.1 - propagandaReal / 10) - n.Alcoholism * (1 - n.ReligionGroups.Sunni.Points / 100 - n.ReligionGroups.Shia.Points / 100) / 2);
  }

  n.UrbanPoliticalAwareness = n.TownsfolkPoliticalAwareness * n.Workforces.Townsfolk / (n.Workforces.Townsfolk + n.Workforces.Merchants) + n.MerchantsPoliticalAwareness * n.Workforces.Merchants / (n.Workforces.Townsfolk + n.Workforces.Merchants);

    n.MilitaryPoliticalAwareness = n.SoldiersPoliticalAwareness * n.Workforces.Soldiers / (n.Workforces.Soldiers + n.Workforces.Sailors == 0 ? 0.01 : n.Workforces.Soldiers + n.Workforces.Sailors) + n.SailorsPoliticalAwareness * n.Workforces.Sailors / (n.Workforces.Soldiers + n.Workforces.Sailors == 0 ? 0.01 : n.Workforces.Soldiers + n.Workforces.Sailors);

    n.WorkersPoliticalAwareness = n.FarmersPoliticalAwareness * n.Workforces.Farmers / (n.Workforces.Farmers + n.Workforces.Labourers + n.Workforces.Serfs + n.Workforces.Unemployed) + n.LabourersPoliticalAwareness * n.Workforces.Labourers / (n.Workforces.Farmers + n.Workforces.Labourers + n.Workforces.Serfs + n.Workforces.Unemployed) + n.SerfsPoliticalAwareness * n.Workforces.Serfs / (n.Workforces.Farmers + n.Workforces.Labourers + n.Workforces.Serfs + n.Workforces.Unemployed) + n.UnemployedPoliticalAwareness * n.Workforces.Unemployed / (n.Workforces.Farmers + n.Workforces.Labourers + n.Workforces.Serfs + n.Workforces.Unemployed);

    n.BureaucratsPoliticalAwareness = 1 - n.Alcoholism * (1 - n.ReligionGroups.Sunni.Points / 100 - n.ReligionGroups.Shia.Points / 100) / 2;

  n.AverageSolMods = {
    Workers: 0.3,
    Urban: 1.75,
    Clergy: 5,
    Bureaucrats: 2,
    Intellectuals: 1.5,
    Military: 1,
    Aristocracy: 10,
    Burgousie: 7.5
    }

    // AverageTax
    n.AverageTax = 0;
    for (const EstateIndex in estatesGeneral) {
        const Estate = estatesGeneral[EstateIndex];
        n.AverageTax += n[Estate + "Tax"] * estateNumbers[Estate];
    }
    n.AverageTax = n.AverageTax / (1 - n.Workforces.Slaves);

  // Loyalties
  for (const EstateIndex in estatesGeneral) {
      const Estate = estatesGeneral[EstateIndex];
      n.BaseLoyalty = 0.5;
      n.ExpectedSolLoyaltyMod = clamp(-0.2, 0.2, (n[Estate + "Sol"] - n["Expected" + Estate + "Sol"]) / n[Estate + "Sol"]);
      n.AverageSolLoyaltyMod = clamp(-0.2, 0.2, (n[Estate + "Sol"] - (n.AverageSol * n.AverageSolMods[Estate])) / n[Estate + "Sol"] / 4);
      n.GovernmentRepLoyaltyMod = (n.GovernmentRepresentation[Estate + "Representation"] / 100 - max(n.ExpectedInfluences[Estate + "Influence"] * 0.9, estateNumbers[Estate] * n[Estate + "PoliticalAwareness"] * 0.9));
      n.TaxesLoyaltyMod = n[Estate + "Tax"] / 2 + (n[Estate + "Tax"] > n.AverageTax ? n[Estate + "Tax"] / n.AverageTax / 25 : 0);
      n[Estate + "Loyalty"] = n.BaseLoyalty + n.ExpectedSolLoyaltyMod + n.AverageSolLoyaltyMod + n.GovernmentRepLoyaltyMod - n.TaxesLoyaltyMod + n.InfluenceChangeLoyaltyEffect[Estate];
      n[Estate + "Loyalty"] = clamp(0, 1, n[Estate + "Loyalty"]);
    }

    n.AristocracyLoyalty += n.CulturalAdvancements.NobleDuty * 0.05;

    if (n.AristocracyBasicArmaments > max(n.ArmyBasicArmamentsDemand, 10)) {
        n.AristocracyLoyalty -= (n.AristocracyBasicArmaments / max(n.ArmyBasicArmamentsDemand, 10) - 1) / 5;
    }

    if (n.ClergyBasicArmaments > max(n.ArmyBasicArmamentsDemand, 10)) {
        n.ClergyLoyalty -= (n.ClergyBasicArmaments / max(n.ArmyBasicArmamentsDemand, 10) - 1) / 5;
    }

    if (n.BurgousieBasicArmaments > max(n.ArmyBasicArmamentsDemand, 10)) {
        n.BurgousieLoyalty -= (n.BurgousieBasicArmaments / max(n.ArmyBasicArmamentsDemand, 10) - 1) / 5;
    }

    n.AristocracyCallupCost = 20 * (n.AristocracyBasicArmaments / max(n.ArmyBasicArmamentsDemand, 10));
    n.ClergyCallupCost = 20 * (n.ClergyBasicArmaments / max(n.ArmyBasicArmamentsDemand, 10));
    n.BurgousieCallupCost = 20 * (n.BurgousieBasicArmaments / max(n.ArmyBasicArmamentsDemand, 10));

    n.MilitaryLoyalty = militaryControlReal.Aristocracy * n.AristocracyLoyalty + militaryControlReal.Clergy * n.ClergyLoyalty + militaryControlReal.Burgousie * n.BurgousieLoyalty + militaryControlReal.Urban * n.UrbanLoyalty + militaryControlReal.Bureaucrats * n.BureaucratsLoyalty + militaryControlReal.Workers * n.WorkersLoyalty + militaryControlReal.Independent * n.MilitaryLoyalty - n.CommanderFreedom * 0.1;
    if (n.Workforces.Soldiers + n.Workforces.Sailors == 0) n.MilitaryLoyalty = 0.5;

    // LoyaltiesStabilityImpact
    n.LoyaltiesStabilityImpact = 0;
    for (const EstateIndex in estatesGeneral) {
        const Estate = estatesGeneral[EstateIndex];
        n.LoyaltiesStabilityImpact += (n[Estate + "Loyalty"] - 0.5) * (1 + estateNumbers[Estate] * (n[Estate + "PoliticalAwareness"] + 0.5) + n.EstateInfluencesReal[Estate + "Influence"] * 4) * 5;
    }
    n.LoyaltiesStabilityImpact = n.LoyaltiesStabilityImpact * 0.6;

    n.Prosperity = n.AverageSol * (1 + (n.FutureFood < 0 ? n.FutureFood / (n.Population / 1000) : 0) - n.Pillaging);

    n.PopulationHappiness = (5 * (0.25 + n.Prosperity) - n.AverageTax * 25 - n.Absolutism / 2 - populationControlReal / 2 - n.DebtToGdpRatio * 10 * n.PublicDebtLength - n.WarExhaustion / 2 - n.Disease + n.Alcoholism * (1 - n.ReligionGroups.Sunni.Points / 100 - n.ReligionGroups.Shia.Points / 100) / 2);

    n.Manpower = n.Population * (n.Reforms.NationalMilitia * 0.01 + n.Reforms.FeudalLevies * 0.0035 + n.Reforms.ProffesionalArmy * 0.02 + n.Reforms.MassConscription * 0.05 + n.Nationalism * 0.0025 + n.ReligiousFervor * 0.0025) - n.OverallNumbers - n.Casualties - (n.LightShips * 100 + n.MediumShips * 200 + n.HeavyShips * 500);

    // LoyaltiesWarSupportImpact
    n.LoyaltiesWarSupportImpact = 0;
    for (const EstateIndex in estatesGeneral) {
        const Estate = estatesGeneral[EstateIndex];
        n.Modifier = (1 + estateNumbers[Estate] + (Estate == "Military" ? n.MilitaryControl.Independent : (n.MilitaryControl[Estate + "Control"])) / 100 * 4 + n.EstateInfluencesReal[Estate + "Influence"] * 4);
        n.LoyaltiesWarSupportImpact += (n[Estate + "Loyalty"] - 0.5) * (1 + estateNumbers[Estate] + (Estate == "Military" ? n.MilitaryControl.Independent : (n.MilitaryControl[Estate + "Control"])) / 100 * 4 + n.EstateInfluencesReal[Estate + "Influence"] * 4);
    }

    n.Fervor = clamp(1, -1, 0 + n.MinorBattles / 20 + n.MajorBattles / 10 + n.Pillaging - n.Casualties / (n.Manpower + n.Casualties));
    n.WarSupport = clamp(1, 0, ((n.LoyaltiesWarSupportImpact - 1) / 2 + n.PopulationHappiness / 4 + propagandaReal / 10 * (1 + n.CulturalAdvancements.Newspapers * n.LiteracyPercent / 50) + n.Fervor + n.Nationalism / 10 + n.ReligiousFervor / 10) * (n.GovernmentDominatedBy == "Military" ? 1.25 : 1));

  let WarStatus = n.AtWar;
  if (WarStatus == false) WarStatus = "false";
  WarStatus = WarStatus.toLowerCase();

  const WarStabilityModifier = ((WarStatus == 'offensive' && n.WarSupport < 0.75) ? (n.WarSupport - 0.75) : 0) + max(-0.075, ((WarStatus == 'defensive' && n.WarSupport < 0.4 && n.Fervor < 0) ? (n.Fervor) : 0));

  n.MilitaryMorale = clamp(0, 1,
    ( n.MilitaryLoyalty + n.Fervor - (n.MilitaryDiscipline > 1 ? n.MilitaryDiscipline - 1 : 0) * 2 + (n.WarSupport < 0.5 ? n.WarSupport - 0.5 : 0) + (n.WarSupport > 0.75 ? n.WarSupport - 0.75 : 0)
    ) * (n.GovernmentDominatedBy == "Military" ? 1.25 : 1)
  );

  n.PopulationStabilityImpact = min(0, n.AdministrativePower * 750000 - n.Population) / n.Population * 10;


    n.Stability = n.PopulationHappiness + n.AdministrativeEfficiency / 10 - n.Overextension - n.CulturalDisunity - n.ReligiousDisunity + (propagandaReal * 0.5 * (1 + n.CulturalAdvancements.Newspapers * n.LiteracyPercent / 50)) + populationControlReal * 1.5 + n.PopulationStabilityImpact + WarStabilityModifier * 7.5 + n.LoyaltiesStabilityImpact - (n.Workforces.Slaves * 10);

  const PopulationGrowthModifier = n.FoodPopulationBoost + n.Prosperity / 10 + n.Stability / 100 + n.UnderPopulation;

  n.PseudoPopulationGrowth = (n.FutureFood < 0 ? n.FutureFood * 1000 / n.Population : (0.1 + PopulationGrowthModifier) - n.BirthControl / 20) / timeDivide;

    n.PopulationGrowth = 1 - n.Population / n.FuturePopulation;

    n.SlavesTaxes = 0;
    n.LabourersTaxes = n.LabourersWage * n.Workforces.Labourers * n.Population / 1000 * n.WorkersTax * n.TaxEfficiency * (1 - n.EstateInfluencesReal.WorkersInfluence) / timeDivide;
    n.SerfsTaxes = n.SerfsWage * n.Workforces.Serfs * n.Population / 1000 * n.WorkersTax * n.TaxEfficiency * (1 - n.EstateInfluencesReal.WorkersInfluence) / timeDivide;
    n.UnemployedTaxes = 0;
    n.FarmersTaxes = n.FarmersWage * n.Workforces.Farmers * n.Population / 1000 * n.WorkersTax * n.TaxEfficiency * (1 - n.EstateInfluencesReal.WorkersInfluence) / timeDivide;
    n.TownsfolkTaxes = n.TownsfolkWage * n.Workforces.Townsfolk * n.Population / 1000 * n.UrbanTax * n.TaxEfficiency * (1 - n.EstateInfluencesReal.UrbanInfluence) / timeDivide;
    n.ClergyTaxes = n.ClergyWage * n.Workforces.Clergy * n.Population / 1000 * n.ClergyTax * n.TaxEfficiency * (1 - n.EstateInfluencesReal.ClergyInfluence) / timeDivide;
    n.BureaucratsTaxes = n.BureaucratsWage * n.Workforces.Bureaucrats * n.Population / 1000 * n.BureaucratsTax * n.TaxEfficiency * (1 - n.EstateInfluencesReal.BureaucratsInfluence) / timeDivide;
    n.MerchantsTaxes = n.MerchantsWage * n.Workforces.Merchants * n.Population / 1000 * n.UrbanTax * n.TaxEfficiency * (1 - n.EstateInfluencesReal.UrbanInfluence) / timeDivide;
    n.IntellectualsTaxes = n.IntellectualsWage * n.Workforces.Intellectuals * n.Population / 1000 * n.IntellectualsTax * n.TaxEfficiency * (1 - n.EstateInfluencesReal.IntellectualsInfluence) / timeDivide;
    n.SailorsTaxes = n.SailorsWage * n.Workforces.Sailors * n.Population / 1000 * n.MilitaryTax * n.TaxEfficiency * (1 - n.EstateInfluencesReal.MilitaryInfluence) / timeDivide;
    n.SoldiersTaxes = n.SoldiersWage * n.Workforces.Soldiers * n.Population / 1000 * n.MilitaryTax * n.TaxEfficiency * (1 - n.EstateInfluencesReal.MilitaryInfluence) / timeDivide;
    n.AristocracyTaxes = n.AristocracyWage * n.Workforces.Aristocracy * n.Population / 1000 * n.AristocracyTax * n.TaxEfficiency * (1 - n.EstateInfluencesReal.AristocracyInfluence) / timeDivide;
    n.BurgousieTaxes = n.BurgousieWage * n.Workforces.Burgousie * n.Population / 1000 * n.BurgousieTax * n.TaxEfficiency * (1 - n.EstateInfluencesReal.BurgousieInfluence) / timeDivide;

    n.TaxRevenue = n.LabourersTaxes + n.SerfsTaxes + n.FarmersTaxes + n.TownsfolkTaxes + n.ClergyTaxes + n.BureaucratsTaxes + n.MerchantsTaxes + n.IntellectualsTaxes + n.SailorsTaxes + n.SoldiersTaxes + n.AristocracyTaxes + n.BurgousieTaxes;
    n.TariffsRevenue = max(0, (n.InternalTrade * n.InternalTariffs + n.ExternalTrade * n.ExternalTariffs) * n.TariffEfficiency / timeDivide);

  n.SpyUpkeep = n.Spies / 10 * n.SpyQuality / timeDivide;
  n.HealthUpkeep = n.Health * n.Population / 500000 / timeDivide;
  n.EducationUpkeep = (education - n.Reforms.ReligiousSchools / 2) * n.Population / 500000 * (1.1 - n.AdministrativeEfficiency / 100) * 6 / timeDivide;
  n.PropagandaUpkeep = propagandaReal * (100 + n.AdministrativeStrain) / 50 * n.Population / 1000000 / timeDivide;
  n.PopulationControlUpkeep = populationControlReal * n.Population / 800000 / timeDivide;
  n.AdministrativeUpkeep = (n.LandAdministration * n.Size / 2500 + n.BureaucratsWage / 1000 * n.Population * n.Workforces.Bureaucrats) / timeDivide;
  n.StateWorkersUpkeep = (n.Population * n.Workforces.Townsfolk * n.ProductionGovernmentControl / 1000 * n.StateFactoryWorkerWage + (n.Reforms.GovernmentResourceOwnership ? n.Workforces.Labourers * n.Population / 1000 * n.StateLabourerWage + n.Workforces.Slaves * n.Population / 1000 * n.StateLabourerWage * 0.05 : 0) + (n.Reforms.GovernmentLandOwnership ? n.Workforces.Farmers * n.Population / 1000 * n.StateFarmerWage + n.Workforces.Serfs * n.Population / 1000 * n.StateFarmerWage * 0.5 : 0)) / timeDivide;
  n.ResearchUpkeep = n.ResearchSpending * n.Population / 500000 / timeDivide * n.LiteracyPercent / 10;
  n.Balance = n.BudgetIncoming - n.BudgetOutgoing;
  n.PassiveInvestmentIncome = (n.Budget / (10 - n.AdministrativeEfficiency / 10 + 1) / timeDivide) / (1 + n.Inflation);

  n.StateAgricultureRevenue = (n.Reforms.GovernmentLandOwnership ? n.AgricultureRevenue : 0);
    n.StateResourceRevenue = (n.Reforms.GovernmentResourceOwnership ? n.ResourceBudgetBoost : 0) - n.OutgoingTradePowerFromResourceTrade + n.TradePowerFromResourceTrade;

  n.OverallIncome = n.PassiveInvestmentIncome + n.TariffsRevenue + n.TaxRevenue + n.BudgetIncoming + n.StateProductionRevenue + n.StateAgricultureRevenue + n.StateResourceRevenue;
    n.OverallSpending = n.ArmyUpkeep + n.NavyUpkeep + n.BuildingsUpkeep + n.EducationUpkeep + n.HealthUpkeep + n.AgricultureSpending + n.SocialSpendingUpkeep + n.SpyUpkeep + n.PopulationControlUpkeep + n.PropagandaUpkeep + n.AdministrativeUpkeep + n.StateWorkersUpkeep + n.ResearchUpkeep + n.TroopRecruitmentCost + n.ConstructionCost + n.BudgetOutgoing;
    n.BudgetPerTurn = n.OverallIncome - n.OverallSpending;
    n.FutureBudget = n.Budget + n.BudgetPerTurn;


  n.EliteUnitsCap = ((n.OverallNumbers - n.Militia - n.Levies - n.EliteCavalry - n.EliteInfantry) * 0.025);

    n.IrregularQuality = (irregularQualityIC - n.Corruption / 5) - n.BasicArmamentsArmyShortage;
    n.MeleeQuality = (meleeQualityIC - n.Corruption / 5) - n.BasicArmamentsArmyShortage;
    n.RangedQuality = (n.RaedQualityIC - n.Corruption / 5) - n.BasicArmamentsArmyShortage;
    n.CavalryQuality = (cavalryQualityIC - n.Corruption / 5) - (n.Technologies.Reiters == 1 ? n.SulphurShortage / 4 : 0) - n.BasicArmamentsArmyShortage;
    n.FirearmQuality = (firearmQualityIC - n.Corruption / 5) - n.SulphurShortage - n.BasicArmamentsArmyShortage;
    n.SiegeQuality = (siegeQualityIC - n.Corruption / 5) - n.BasicArmamentsArmyShortage;
    n.ArtilleryQuality = (artilleryQualityIC - n.Corruption / 5) - n.SulphurShortage - n.HeavyArmamentsShortage;

  n.CulturalAdvance = (function () {
    let ca = 0;
    for (const cultureadvance in n.CulturalAdvancements) {
      if (n.CulturalAdvancements[cultureadvance]) ca++;

    }
    return ca;
  })();
  n.CulturalPowerGain = 2 * n.Prosperity * (n.CulturalProsperity - n.Reforms.StateMediaOnly * 0.5 - n.Reforms.ExtensiveCensorship * 0.25 + n.Reforms.FreeSpeech * 0.25 + n.CulturalAdvancements.RenaissanceThought / 10) / timeDivide / n.Isolation;
  n.FutureCulturalPower = min(n.LiteracyPercent, (n.CulturalPower + n.CulturalPowerGain));
  n.FuturePublicDebtLength = n.EffectiveDebt > 0 ? n.PublicDebtLength + 1 : 0;

  n.MaxPopulation = n.Population / n.Disease;

  n.LightShipQuality = (1 + n.LightShipImprovements + n.NavyTech - n.Corruption / 5) - (n.Technologies.Gunports == 1 ? n.SulphurShortage / 2 : 0) - n.ShipBuildingShortage;
  n.MediumShipQuality = (1 + n.MediumShipImprovements + n.NavyTech + n.Technologies.Galleons / 6 - n.Corruption / 5) - (n.Technologies.Gunports == 1 ? n.SulphurShortage / 2 : 0) - n.ShipBuildingShortage;
  n.HeavyShipQuality = (1 + n.HeavyShipImprovements + n.NavyTech + n.Technologies.Galleons / 4 - n.Corruption / 5) - (n.Technologies.Gunports == 1 ? n.SulphurShortage / 2 : 0) - n.ShipBuildingShortage;

    n.LightShipQuality = max(0, n.LightShipQuality);
    n.MediumShipQuality = max(0, n.MediumShipQuality);
    n.HeavyShipQuality = max(0, n.HeavyShipQuality);

  n.NavalPower = (n.LightShips * 0.5 * n.LightShipQuality + n.MediumShips * n.MediumShipQuality + 2 * n.HeavyShips * n.HeavyShipQuality);

  n.PopulationTechImpact = (n.Population > 20000000? (n.Population - 20000000) / 250000000 : 0);
  

  n.ResearchBoostFromTech = (1 - n.Reforms.StateMediaOnly / 4 - n.Reforms.ExtensiveCensorship / 10 - n.Reforms.LimitedCensorship / 20 + n.Reforms.RestrictedSocialMobility / 20 + n.Reforms.UnrestrictedSocialMobility / 10 - n.Reforms.Guilds / 10 + n.Reforms.AntiMonopolyLaws / 10 - n.Reforms.Isolationism / 10 + n.Reforms.Protectionism / 20 + n.Reforms.FreeTrade / 10 + n.CulturalAdvancements.Universities / 10 + n.CulturalAdvancements.RenaissanceThought / 5 + n.Technologies.Experimentation / 5 + n.CulturalAdvancements.ScientificRevolution / 5) * (n.GovernmentDominatedBy == "Clergy" || n.GovernmentDominatedBy == "Bureaucrats" ? 0.95 : 1) * (n.GovernmentDominatedBy == "Intellectuals" ? 1.05 : 1);
    n.ResearchPointGain = max(0.1, (n.ResearchSpending * n.ResearchEffectiveness * n.ResearchBoostFromTech * n.LiteracyPercent / n.Isolation / timeDivide * 2 / 10 + n.ResearchSpending * n.ResearchEffectiveness * n.HigherEducation / n.Isolation / timeDivide * 5 / 10) * (1 - (n.EstateInfluencesReal.AristocracyInfluence > 0.5 ? n.EstateInfluencesReal.AristocracyInfluence - 0.5 : 0) / 1.5 - (n.EstateInfluencesReal.ClergyInfluence > 0.5 ? n.EstateInfluencesReal.ClergyInfluence - 0.5 : 0) / 1.5) * (1 - n.PopulationTechImpact));
    n.ResearchEfficiency = n.ResearchSpending * n.ResearchEffectiveness * n.ResearchBoostFromTech / n.Isolation * (1 - (n.EstateInfluencesReal.AristocracyInfluence > 0.5 ? n.EstateInfluencesReal.AristocracyInfluence - 0.5 : 0) / 1.5 - (n.EstateInfluencesReal.ClergyInfluence > 0.5 ? n.EstateInfluencesReal.ClergyInfluence - 0.5 : 0) / 1.5) * (1 - n.PopulationTechImpact);

  n.FutureResearchPoints = min(5 + (n.CulturalAdvancements.Universities == true ? 2.5 : 0) + (n.CulturalAdvancements.ScientificRevolution == true ? 2.5 : 0), n.ResearchPoints + n.ResearchPointGain);
  n.ReformPowerGain = n.GovernmentRepresentation.UnitaryRepresentation / timeDivide / 2.5;

  n.SlaveryReformAdvanceCost = max(25, (n.GovernmentRepresentation.AristocracyRepresentation + n.GovernmentRepresentation.BurgousieRepresentation - n.GovernmentRepresentation.IntellectualsRepresentation) * 2);
  n.SlaveryReformRegressionCost = max(25, (0 - n.GovernmentRepresentation.AristocracyRepresentation - n.GovernmentRepresentation.BurgousieRepresentation + n.GovernmentRepresentation.IntellectualsRepresentation) * 2);

  n.SerfdomReformAdvanceCost = max(25, (n.GovernmentRepresentation.ClergyRepresentation + n.GovernmentRepresentation.AristocracyRepresentation - n.GovernmentRepresentation.BurgousieRepresentation / 2 - n.GovernmentRepresentation.IntellectualsRepresentation - n.GovernmentRepresentation.WorkersRepresentation) * 2);
  n.SerfdomReformRegressionCost = max(25, (0 - n.GovernmentRepresentation.ClergyRepresentation - n.GovernmentRepresentation.AristocracyRepresentation + n.GovernmentRepresentation.BurgousieRepresentation + n.GovernmentRepresentation.IntellectualsRepresentation + n.GovernmentRepresentation.WorkersRepresentation) * 2);

  n.EnclosureReformAdvanceCost = max(25, (n.GovernmentRepresentation.WorkersRepresentation));
  n.EnclosureReformRegressionCost = max(25, (0 - n.GovernmentRepresentation.WorkersRepresentation + n.GovernmentRepresentation.AristocracyRepresentation + n.GovernmentRepresentation.BurgousieRepresentation));

  n.TradeReformAdvanceCost = max(25, (n.GovernmentRepresentation.WorkersRepresentation + n.GovernmentRepresentation.UrbanRepresentation + n.GovernmentRepresentation.AristocracyRepresentation - n.GovernmentRepresentation.BurgousieRepresentation) * (n.Reforms.Mercantilism ? 1.5 : 1) * (n.Reforms.Protectionism ? 2.5 : 1));
  n.TradeReformRegressionCost = max(25, (0 - n.GovernmentRepresentation.WorkersRepresentation - n.GovernmentRepresentation.UrbanRepresentation - n.GovernmentRepresentation.AristocracyRepresentation + n.GovernmentRepresentation.BurgousieRepresentation) * (n.Reforms.Mercantilism ? 2 : 1) * (n.Reforms.Protectionism ? 1 : 1));

  n.AntitrustReformAdvanceCost = max(25, (n.GovernmentRepresentation.BurgousieRepresentation + n.GovernmentRepresentation.AristocracyRepresentation / 2 - n.GovernmentRepresentation.WorkersRepresentation + (n.AverageDevelopment < 0.1 ? n.GovernmentRepresentation.UrbanRepresentation : 0 - n.GovernmentRepresentation.UrbanRepresentation)) * (n.Reforms.Guilds ? 2 : 1) * (n.Reforms.GuildsBanned ? 3 : 1));
  n.AntitrustReformRegressionCost = max(25, (0 - n.GovernmentRepresentation.BurgousieRepresentation - n.GovernmentRepresentation.AristocracyRepresentation / 2 + n.GovernmentRepresentation.WorkersRepresentation - (n.AverageDevelopment < 0.1 ? n.GovernmentRepresentation.UrbanRepresentation : 0 - n.GovernmentRepresentation.UrbanRepresentation)));

  n.SuffrageReformAdvanceCost = max(25, ((n.Reforms.NoVoting ? n.GovernmentRepresentation.UnitaryRepresentation : 0) + (n.Reforms.HighClassVoting ? n.GovernmentRepresentation.UnitaryRepresentation + n.GovernmentRepresentation.AristocracyRepresentation : 0) + (n.Reforms.WealthVoting ? n.GovernmentRepresentation.UnitaryRepresentation + n.GovernmentRepresentation.AristocracyRepresentation + n.GovernmentRepresentation.BurgousieRepresentation + n.GovernmentRepresentation.ClergyRepresentation + (n.AverageDevelopment < 0.1 ? n.GovernmentRepresentation.UrbanRepresentation : 0) : 0)));
  n.SuffrageReformRegressionCost = max(25, ((n.Reforms.HighClassVoting ? n.GovernmentRepresentation.AristocracyRepresentation : 0) + (n.Reforms.WealthVoting ? 0 - n.GovernmentRepresentation.AristocracyRepresentation + n.GovernmentRepresentation.BurgousieRepresentation + n.GovernmentRepresentation.ClergyRepresentation + (n.AverageDevelopment < 0.1 ? n.GovernmentRepresentation.UrbanRepresentation : 0) : 0) + (n.Reforms.UniversalSuffrage ? n.GovernmentRepresentation.IntellectualsRepresentation + n.GovernmentRepresentation.WorkersRepresentation + (n.AverageDevelopment > 0.1 ? n.GovernmentRepresentation.UrbanRepresentation : 0) : 0)));

  n.PrivilegeReformAdvanceCost = max(25, ((n.Reforms.NoblePrivilege ? n.GovernmentRepresentation.AristocracyRepresentation : 0) + (n.Reforms.WealthPrivilege ? n.GovernmentRepresentation.AristocracyRepresentation + n.GovernmentRepresentation.BurgousieRepresentation + n.GovernmentRepresentation.ClergyRepresentation + (n.AverageDevelopment < 0.1 ? n.GovernmentRepresentation.UrbanRepresentation : 0) : 0)));
  n.PrivilegeReformRegressionCost = max(25, ((n.Reforms.WealthPrivilege ? n.GovernmentRepresentation.BurgousieRepresentation + n.GovernmentRepresentation.ClergyRepresentation + (n.AverageDevelopment < 0.1 ? n.GovernmentRepresentation.UrbanRepresentation : 0) : 0) + (n.Reforms.ClassEquality ? n.GovernmentRepresentation.IntellectualsRepresentation + n.GovernmentRepresentation.WorkersRepresentation + (n.AverageDevelopment > 0.1 ? n.GovernmentRepresentation.UrbanRepresentation : 0) : 0)));
  
  n.OfficersReformAdvanceCost = max(25, ((n.Reforms.NobleOfficers ? n.GovernmentRepresentation.AristocracyRepresentation : 0) + (n.Reforms.WealthyOfficers ? n.GovernmentRepresentation.AristocracyRepresentation + n.GovernmentRepresentation.BurgousieRepresentation + n.GovernmentRepresentation.ClergyRepresentation + (n.AverageDevelopment < 0.1 ? n.GovernmentRepresentation.UrbanRepresentation : 0) : 0) + n.GovernmentRepresentation.MilitaryRepresentation));
  n.OfficersReformRegressionCost = max(25, ((n.Reforms.WealthyOfficers ? n.GovernmentRepresentation.BurgousieRepresentation + n.GovernmentRepresentation.ClergyRepresentation + (n.AverageDevelopment < 0.1 ? n.GovernmentRepresentation.UrbanRepresentation : 0) : 0) + (n.Reforms.MeritocraticOfficers ? n.GovernmentRepresentation.IntellectualsRepresentation + n.GovernmentRepresentation.WorkersRepresentation + (n.AverageDevelopment > 0.1 ? n.GovernmentRepresentation.UrbanRepresentation : 0) : 0) + n.GovernmentRepresentation.MilitaryRepresentation));

  n.BureaucratsReformAdvanceCost = max(25, (n.GovernmentRepresentation.BureaucratsRepresentation + (n.Reforms.NobleBureaucrats ? n.GovernmentRepresentation.BureaucratsRepresentation + n.GovernmentRepresentation.AristocracyRepresentation : 0) + (n.Reforms.ClergyBureaucrats ? n.GovernmentRepresentation.BureaucratsRepresentation + n.GovernmentRepresentation.AristocracyRepresentation + n.GovernmentRepresentation.ClergyRepresentation : 0) + (n.Reforms.WealthyBureaucrats ? n.GovernmentRepresentation.BureaucratsRepresentation + n.GovernmentRepresentation.AristocracyRepresentation + n.GovernmentRepresentation.BurgousieRepresentation + n.GovernmentRepresentation.ClergyRepresentation + (n.AverageDevelopment < 0.1 ? n.GovernmentRepresentation.UrbanRepresentation : 0) : 0)));
  n.BureaucratsReformRegressionCost = max(25, ((n.Reforms.ClergyBureaucrats ? n.GovernmentRepresentation.BureaucratsRepresentation + n.GovernmentRepresentation.ClergyRepresentation : 0) + (n.Reforms.WealthyBureaucrats ? n.GovernmentRepresentation.BureaucratsRepresentation + n.GovernmentRepresentation.AristocracyRepresentation + n.GovernmentRepresentation.BurgousieRepresentation + n.GovernmentRepresentation.UrbanRepresentation : 0) + (n.Reforms.MeritocraticBureaucrats ? n.GovernmentRepresentation.BureaucratsRepresentation + n.GovernmentRepresentation.IntellectualsRepresentation + n.GovernmentRepresentation.WorkersRepresentation + (n.AverageDevelopment > 0.1 ? n.GovernmentRepresentation.UrbanRepresentation : 0) : 0)));

  n.ResourceReformAdvanceCost = max(25, ((n.Reforms.NobleResourceOwnership || n.Reforms.MixedResourceOwnership ? n.GovernmentRepresentation.AristocracyRepresentation + n.GovernmentRepresentation.ClergyRepresentation : 0) + (n.Reforms.BurgousieResourceOwnership ? 100 - n.GovernmentRepresentation.BureaucratsRepresentation - n.GovernmentRepresentation.MilitaryRepresentation - n.GovernmentRepresentation.UnitaryRepresentation : 0)));
  n.ResourceReformRegressionCost = max(25, ((n.Reforms.MixedResourceOwnership || n.Reforms.BurgousieResourceOwnership ? 100 - n.GovernmentRepresentation.AristocracyRepresentation - n.GovernmentRepresentation.ClergyRepresentation : 0) + (n.Reforms.GovernmentResourceOwnership ? n.GovernmentRepresentation.BureaucratsRepresentation + n.GovernmentRepresentation.MilitaryRepresentation + n.GovernmentRepresentation.UnitaryRepresentation : 0)));
  
  n.LandReformAdvanceCost = max(25, ((n.Reforms.NobleLandOwnership || n.Reforms.MixedLandOwnership ? n.GovernmentRepresentation.AristocracyRepresentation + n.GovernmentRepresentation.ClergyRepresentation : 0) + (n.Reforms.PrivateLandOwnership ? 100 - n.GovernmentRepresentation.BureaucratsRepresentation - n.GovernmentRepresentation.MilitaryRepresentation - n.GovernmentRepresentation.UnitaryRepresentation : 0)));
  n.LandReformRegressionCost = max(25, ((n.Reforms.MixedLandOwnership || n.Reforms.PrivateLandOwnership ? 100 - n.GovernmentRepresentation.AristocracyRepresentation - n.GovernmentRepresentation.ClergyRepresentation : 0) + (n.Reforms.GovernmentLandOwnership ? n.GovernmentRepresentation.BureaucratsRepresentation + n.GovernmentRepresentation.MilitaryRepresentation + n.GovernmentRepresentation.UnitaryRepresentation : 0)));

  n.ArmyReformAdvanceCost = max(25, ((n.Reforms.NationalMilitia ? n.GovernmentRepresentation.Workers + n.GovernmentRepresentation.UrbanRepresentation : 0) + (n.Reforms.FeudalLevies ? n.GovernmentRepresentation.AristocracyRepresentation + n.GovernmentRepresentation.ClergyRepresentation : 0)) * (n.CulturalAdvancements.EarlyModernAdministration ? 1 : 1.25) * (n.CulturalAdvancements.NationalSovereignity ? 1 : 1.25) + (n.Reforms.ProffesionalArmy ? n.GovernmentRepresentation.MilitaryRepresentation + n.GovernmentRepresentation.WorkersRepresentation + n.GovernmentRepresentation.UrbanRepresentation : 0));
  n.ArmyReformRegressionCost = max(25, (n.Reforms.FeudalLevies ? n.GovernmentRepresentation.AristocracyRepresentation + n.GovernmentRepresentation.ClergyRepresentation + n.GovernmentRepresentation.MilitaryRepresentation + n.GovernmentRepresentation.BurgousieRepresentation : 0) + (n.Reforms.ProffesionalArmy ? n.GovernmentRepresentation.BurgousieRepresentation + n.GovernmentRepresentation.MilitaryRepresentation + n.GovernmentRepresentation.WorkersRepresentation + n.GovernmentRepresentation.UrbanRepresentation + n.GovernmentRepresentation.IntellectualsRepresentation + n.GovernmentRepresentation.UnitaryRepresentation : 0) + (n.Reforms.MassConscription ? n.GovernmentRepresentation.UnitaryRepresentation : 0));

  n.CensorshipReformAdvanceCost = max(25, (n.Reforms.StateMediaOnly || n.Reforms.ExtensiveCensorship ? n.GovernmentRepresentation.BureaucratsRepresentation + n.GovernmentRepresentation.UnitaryRepresentation : 0) + (n.Reforms.LimitedCensorship ? n.GovernmentRepresentation.BureaucratsRepresentation + n.GovernmentRepresentation.UnitaryRepresentation + n.GovernmentRepresentation.AristocracyRepresentation + n.GovernmentRepresentation.BurgousieRepresentation : 0));
  n.CensorshipReformRegressionCost = max(25, (n.Reforms.ExtensiveCensorship ? 100 - n.GovernmentRepresentation.BureaucratsRepresentation - n.GovernmentRepresentation.UnitaryRepresentation : 0) + (n.Reforms.LimitedCensorship ? n.GovernmentRepresentation.WorkersRepresentation + n.GovernmentRepresentation + n.IntellectualsRepresentation + n.GovernmentRepresentation.UrbanRepresentation : 0));

  n.SocialReformAdvanceCost = max(25, ((n.Reforms.NoSocialMobility ? n.GovernmentRepresentation.AristocracyRepresentation + n.GovernmentRepresentation.ClergyRepresentation : 0) + (n.Reforms.RestrictedSocialMobility ? n.GovernmentRepresentation.AristocracyRepresentation + n.GovernmentRepresentation.ClergyRepresentation + n.GovernmentRepresentation.BurgousieRepresentation + n.GovernmentRepresentation.BureaucratsRepresentation + n.GovernmentRepresentation.UrbanRepresentation : 0)) * 1.4);
  n.SocialReformRegressionCost = max(25, (n.Reforms.RestrictedSocialMobility ? 100 - n.GovernmentRepresentation.UnitaryRepresentation - n.GovernmentRepresentation.AristocracyRepresentation - n.GovernmentRepresentation.ClergyRepresentation : 0) + (n.Reforms.UnrestrictedSocialMobility ? n.GovernmentRepresentation.WorkersRepresentation + n.GovernmentRepresentation.IntellectualsRepresentation : 0));
  
  n.ReligiousReformAdvanceCost = max(25, (n.GovernmentRepresentation.ClergyRepresentation + n.GovernmentRepresentation.AristocracyRepresentation - n.GovernmentRepresentation.IntellectualsRepresentation) * 1.75);
  n.ReligiousReformRegressionCost = max(25, (0 - n.GovernmentRepresentation.ClergyRepresentation - n.GovernmentRepresentation.AristocracyRepresentation + n.GovernmentRepresentation.IntellectualsRepresentation));

  n.EducationReformAdvanceCost = max(25, (n.Reforms.PrivateEducationOnly ? n.GovernmentRepresentation.AristocracyRepresentation + n.GovernmentRepresentation.BurgousieRepresentation + (n.AverageDevelopment > 0.1 ? n.GovernmentRepresentation.UrbanRepresentation : 0) - n.GovernmentRepresentation.ClergyRepresentation : 0) + (n.Reforms.ReligiousSchools ? n.GovernmentRepresentation.AristocracyRepresentation + n.GovernmentRepresentation.BurgousieRepresentation + (n.AverageDevelopment > 0.1 ? n.GovernmentRepresentation.UrbanRepresentation : 0) + n.GovernmentRepresentation.ClergyRepresentation : 0));
  n.EducationReformRegressionCost = max(25, (n.Reforms.ReligiousSchools ? 100 - n.GovernmentRepresentation.UnitaryRepresentation - n.GovernmentRepresentation.AristocracyRepresentation - n.GovernmentRepresentation.BurgousieRepresentation - (n.AverageDevelopment > 0.1 ? n.GovernmentRepresentation.UrbanRepresentation : 0) : 0) + (n.Reforms.PublicEducation ? 100 - n.GovernmentRepresentation.UnitaryRepresentation - n.GovernmentRepresentation.AristocracyRepresentation - n.GovernmentRepresentation.BurgousieRepresentation - (n.AverageDevelopment > 0.1 ? n.GovernmentRepresentation.UrbanRepresentation : 0) - n.GovernmentRepresentation.ClergyRepresentation : 0));

  n.PoliceReformAdvanceCost = max(25, (n.Reforms.CommunityPolicing ? n.GovernmentRepresentation.UrbanRepresentation + n.GovernmentRepresentation.WorkersRepresentation + n.GovernmentRepresentation.IntellectualsRepresentation : 0) + (n.Reforms.RegionalPolice ? n.GovernmentRepresentation.AristocracyRepresentation + n.GovernmentRepresentation.ClergyRepresentation + n.GovernmentRepresentation.BurgousieRepresentation : 0) + (n.Reforms.StatePolice ? 100 - n.GovernmentRepresentation.MilitaryRepresentation - n.GovernmentRepresentation.BureaucratsRepresentation - n.GovernmentRepresentation.UnitaryRepresentation : 0));
  n.PoliceReformRegressionCost = max(25, (n.Reforms.RegionalPolice ? n.GovernmentRepresentation.AristocracyRepresentation + n.GovernmentRepresentation.ClergyRepresentation + n.GovernmentRepresentation.BurgousieRepresentation + n.GovernmentRepresentation.UnitaryRepresentation : 0) + (n.Reforms.StatePolice ? 100 - n.GovernmentRepresentation.AristocracyRepresentation - n.GovernmentRepresentation.BurgousieRepresentation - n.GovernmentRepresentation.ClergyRepresentation : 0) + (n.Reforms.SecretPolice ? n.GovernmentRepresentation.UnitaryRepresentation + n.GovernmentRepresentation.BureaucratsRepresentation + n.GovernmentRepresentation.MilitaryRepresentation : 0));

  n.WeaponReformAdvanceCost = max(25, (n.Reforms.NoWeaponLaws ? n.GovernmentRepresentation.WorkersRepresentation + n.GovernmentRepresentation.UrbanRepresentation + n.GovernmentRepresentation.IntellectualsRepresentation : 0) + (n.Reforms.LimitedWeaponOwnership ? 100 - n.GovernmentRepresentation.UnitaryRepresentation - n.GovernmentRepresentation.BureaucratsRepresentation - n.GovernmentRepresentation.MilitaryRepresentation : 0));
  n.WeaponReformRegressionCost = max(25, (n.Reforms.LimitedWeaponOwnership ? 100 - n.GovernmentRepresentation.WorkersRepresentation - n.GovernmentRepresentation.UrbanRepresentation - n.GovernmentRepresentation.IntellectualsRepresentation : 0) + (n.Reforms.WeaponOwnershipForbidden ? n.GovernmentRepresentation.UnitaryRepresentation + n.GovernmentRepresentation.BureaucratsRepresentation + n.GovernmentRepresentation.MilitaryRepresentation : 0));

  n.FeudalArmiesChangeCost = max(25, (n.Reforms.FeudalNobleArmies ? n.GovernmentRepresentation.AristocracyRepresentation + n.GovernmentRepresentation.ClergyRepresentation : 100 - n.GovernmentRepresentation.UnitaryRepresentation - n.GovernmentRepresentation.AristocracyRepresentation) * 1.5);
  n.MercenariesChangeCost = max(25, (n.Reforms.Mercenaries ? n.GovernmentRepresentation.AristocracyRepresentation + n.GovernmentRepresentation.BurgousieRepresentation + (n.AverageDevelopment > 0.1 ? n.GovernmentRepresentation.UrbanRepresentation : 0) : 100 - n.GovernmentRepresentation.UnitaryRepresentation - n.GovernmentRepresentation.AristocracyRepresentation - n.GovernmentRepresentation.BurgousieRepresentation - (n.AverageDevelopment > 0.1 ? n.GovernmentRepresentation.UrbanRepresentation : 0)) * 1.5);
  n.ReligiousOrdersChangeCost = max(25, (n.Reforms.ReligiousOrders ? n.GovernmentRepresentation.ClergyRepresentation + n.ReligiousFervor * 10 : 100 - n.GovernmentRepresentation.UnitaryRepresentation - n.GovernmentRepresentation.ClergyRepresentation));

  // effective resources error
    for (const resourceIndex in resourceTypes) { //in, out, effective resources
        const resource = resourceTypes[resourceIndex];
            const er = n["Effective"+resource];
            if (er < 0) {
                lazyerror(`It seems the effective resource ${resource} in ${nationName} is negative: ${er}. Is an impossible trade taking place?`);
            }
    }

  // Alerts
  if (n.GovernmentRepresentation.WorkersRepresentation + n.GovernmentRepresentation.MilitaryRepresentation + n.GovernmentRepresentation.IntellectualsRepresentation + n.GovernmentRepresentation.BureaucratsRepresentation + n.GovernmentRepresentation.UrbanRepresentation + n.GovernmentRepresentation.BurgousieRepresentation + n.GovernmentRepresentation.ClergyRepresentation + n.GovernmentRepresentation.AristocracyRepresentation + n.GovernmentRepresentation.UnitaryRepresentation != 100) {
    alert(nationName + " has incorrect government representation");
  }
  if (n.Manpower < 0) {
    alert(nationName + " has run out of manpower");
  }
  if (n.ResearchPoints < 0) {
    alert(nationName + " is below Research Point treshold");
  }
  if (n.CulturalPower < 0) {
    alert(nationName + " is below Cultural Power treshold");
  }
  if (n.ReformPower < 0) {
    alert(nationName + " is below Reform Power treshold");
  }
  if (n.Budget < 0) {
    alert(nationName + " is below 0 budget");
  }

  // Alerts from reforms
  if ((n.Reforms.SlaveryAllowed == true && n.Reforms.SlaveryBanned == true) || (n.Reforms.SlaveryAllowed != true && n.Reforms.SlaveryBanned != true)) {
    alert(nationName + "'s Slavery reforms are incorrect");
  }
  if ((n.Reforms.SerfdomAllowed == true && n.Reforms.SerfdomBanned == true) || (n.Reforms.SerfdomAllowed != true && n.Reforms.SerfdomBanned != true)) {
    alert(nationName + "'s Serfdom reforms are incorrect");
  }
  if ((n.Reforms.OpenFieldSystem == true && n.Reforms.Enclosure == true) || (n.Reforms.OpenFieldSystem != true && n.Reforms.Enclosure != true)) {
    alert(nationName + "'s Enclosure reforms are incorrect");
  }
  if (n.Reforms.Isolationism == true && n.Reforms.Mercantilism == true) {
    alert(nationName + "'s Trade reforms are incorrect");
  }
  if (n.Reforms.Mercantilism == true && n.Reforms.Protectionism == true) {
    alert(nationName + "'s Trade reforms are incorrect");
  }
  if (n.Reforms.Protectionism == true && n.Reforms.FreeTrade == true) {
    alert(nationName + "'s Trade reforms are incorrect");
  }
  if (n.Reforms.Guilds == true && n.Reforms.GuildsBanned == true) {
    alert(nationName + "'s Antitrust reforms are incorrect");
  }
  if (n.Reforms.GuildsBanned == true && n.Reforms.AntiMonopolyLaws == true) {
    alert(nationName + "'s Antitrust reforms are incorrect");
  }
  if (n.Reforms.NoVoting == true && n.Reforms.HighClassVoting == true) {
    alert(nationName + "'s Suffrage reforms are incorrect");
  }
  if (n.Reforms.WealthVoting == true && n.Reforms.HighClassVoting == true) {
    alert(nationName + "'s Suffrage reforms are incorrect");
  }
  if (n.Reforms.WealthVoting == true && n.Reforms.UniversalSuffrage == true) {
    alert(nationName + "'s Suffrage reforms are incorrect");
  }
  if (n.Reforms.NoblePrivilege == true && n.Reforms.WealthPrivilege == true) {
    alert(nationName + "'s Privilege reforms are incorrect");
  }
  if (n.Reforms.ClassEquality == true && n.Reforms.WealthPrivilege == true) {
    alert(nationName + "'s Privilege reforms are incorrect");
  }
  if (n.Reforms.NobleOfficers == true && n.Reforms.WealthyOfficers == true) {
    alert(nationName + "'s Officers reforms are incorrect");
  }
  if (n.Reforms.WealthyOfficers == true && n.Reforms.MeritocraticOfficers == true) {
    alert(nationName + "'s Officers reforms are incorrect");
  }
  if (n.Reforms.NobleBureaucrats == true && n.Reforms.ClergyBureaucrats == true) {
    alert(nationName + "'s Bureaucrats reforms are incorrect");
  }
  if (n.Reforms.ClergyBureaucrats == true && n.Reforms.WealthyBureaucrats == true) {
    alert(nationName + "'s Bureaucrats reforms are incorrect");
  }
  if (n.Reforms.WealthyBureaucrats == true && n.Reforms.MeritocraticBureaucrats == true) {
    alert(nationName + "'s Bureaucrats reforms are incorrect");
  }
  if (n.Reforms.NobleLandOwnership == true && n.Reforms.MixedLandOwnership == true) {
    alert(nationName + "'s Land reforms are incorrect");
  }
  if (n.Reforms.MixedLandOwnership == true && n.Reforms.PrivateLandOwnership == true) {
    alert(nationName + "'s Land reforms are incorrect");
  }
  if (n.Reforms.PrivateLandOwnership == true && n.Reforms.GovernmentLandOwnership == true) {
    alert(nationName + "'s Land reforms are incorrect");
  }
  if (n.Reforms.NobleResourceOwnership == true && n.Reforms.MixedResourceOwnership == true) {
    alert(nationName + "'s Resource reforms are incorrect");
  }
  if (n.Reforms.MixedResourceOwnership == true && n.Reforms.BurgousieResourceOwnership == true) {
    alert(nationName + "'s Resource reforms are incorrect");
  }
  if (n.Reforms.BurgousieResourceOwnership == true && n.Reforms.GovernmentResourceOwnership == true) {
    alert(nationName + "'s Resource reforms are incorrect");
  }
  if (n.Reforms.NationalMilitia == true && n.Reforms.FeudalLevies == true) {
    alert(nationName + "'s Army reforms are incorrect");
  }
  if (n.Reforms.FeudalLevies == true && n.Reforms.ProffesionalArmy == true) {
    alert(nationName + "'s Army reforms are incorrect");
  }
  if (n.Reforms.ProffesionalArmy == true && n.Reforms.MassConscription == true) {
    alert(nationName + "'s Army reforms are incorrect");
  }
  if (n.Reforms.StateMediaOnly == true && n.Reforms.ExtensiveCensorship == true) {
    alert(nationName + "'s Censorship reforms are incorrect");
  }
  if (n.Reforms.ExtensiveCensorship == true && n.Reforms.LimitedCensorship == true) {
    alert(nationName + "'s Censorship reforms are incorrect");
  }
  if (n.Reforms.LimitedCensorship == true && n.Reforms.FreeSpeech == true) {
    alert(nationName + "'s Censorship reforms are incorrect");
  }
  if (n.Reforms.NoSocialMobility == true && n.Reforms.RestrictedSocialMobility == true) {
    alert(nationName + "'s Social reforms are incorrect");
  }
  if (n.Reforms.RestrictedSocialMobility == true && n.Reforms.UnrestrictedSocialMobility == true) {
    alert(nationName + "'s Social reforms are incorrect");
  }
  if (n.Reforms.StateReligion == true && n.Reforms.RestrictiveReligionLaws == true) {
    alert(nationName + "'s Religious reforms are incorrect");
  }
  if (n.Reforms.RestrictiveReligionLaws == true && n.Reforms.FreedomOfReligion == true) {
    alert(nationName + "'s Religious reforms are incorrect");
  }
  if (n.Reforms.PrivateEducationOnly == true && n.Reforms.ReligiousSchools == true) {
    alert(nationName + "'s Education reforms are incorrect");
  }
  if (n.Reforms.ReligiousSchools == true && n.Reforms.PublicEducation == true) {
    alert(nationName + "'s Education reforms are incorrect");
  }
  if (n.Reforms.CommunityPolicing == true && n.Reforms.RegionalPolice == true) {
    alert(nationName + "'s Police reforms are incorrect");
  }
  if (n.Reforms.RegionalPolice == true && n.Reforms.StatePolice == true) {
    alert(nationName + "'s Police reforms are incorrect");
  }
  if (n.Reforms.StatePolice == true && n.Reforms.SecretPolice == true) {
    alert(nationName + "'s Police reforms are incorrect");
  }

}

export function evaluateNations() {
  for (const nationName in getGameStats().Nations) {
    evaluateNation(nationName);
  }
}

export function syncNation(nationName: string) {
    const n = getGameStats().Nations[nationName];
    const estates = getGameStats().Estates;
    const estatesGeneral = getGameStats().EstatesGeneral;

    /* #region  copy dailies */
    for (const propertyName in n) {
        const property = n[propertyName];
        const regex = new RegExp(`Future.+`)
        if (regex.test(propertyName)) {
            if (propertyName != "FuturePopulation") {
                n[propertyName.replace("Future", "")] = property;
            }
        }
    }
    /* #endregion */

    // deforestation from forestry
    // n.ForestsCutDown += (n.Forestry - n.Reforestation) * 750 / gameStats.TimeDivide;

    // SoL rise/fall
    for (const EstateIndex in estates) {
        const Estate = estates[EstateIndex];
        n["Expected" + Estate + "Sol"] = (n["Expected" + Estate + "Sol"] > n[Estate + "Sol"] * 1.025 ? n["Expected" + Estate + "Sol"] * 0.9 : n["Expected" + Estate + "Sol"] * max(1.025, n[Estate + "Sol"] / n["Expected" + Estate + "Sol"] * 0.7));
    }

    // weapons stockpiled
    n.BasicArmamentsStockpiled += (n.EffectiveBasicArmaments - n.BasicArmamentsStockpiled) - n.BasicArmamentsDemand;
    n.BasicArmamentsStockpiled = max(0, n.BasicArmamentsStockpiled);
    n.HeavyArmamentsStockpiled += (n.EffectiveHeavyArmaments - n.HeavyArmamentsStockpiled) - n.HeavyArmamentsDemand;
    n.HeavyArmamentsStockpiled = max(0, n.HeavyArmamentsStockpiled);

    if (n.atWar == false) {
        // Private Armies Casualties Clear
        n.AristocracyLeviesCasualties = 0;
        n.AristocracyMilitiaCasualties = 0;
        n.AristocracyLightInfantryCasualties = 0;
        n.AristocracyHeavyInfantryCasualties = 0;
        n.AristocracyEliteInfantryCasualties = 0;
        n.AristocracyArchersCasualties = 0;
        n.AristocracyCrossbowmenCasualties = 0;
        n.AristocracyMusketeersCasualties = 0;
        n.AristocracyMusketMilitiaCasualties = 0;
        n.AristocracyRiflemenCasualties = 0;
        n.AristocracyLightCavalryCasualties = 0;
        n.AristocracyHeavyCavalryCasualties = 0;
        n.AristocracyEliteCavalryCasualties = 0;

        n.ClergyLeviesCasualties = 0;
        n.ClergyMilitiaCasualties = 0;
        n.ClergyLightInfantryCasualties = 0;
        n.ClergyHeavyInfantryCasualties = 0;
        n.ClergyEliteInfantryCasualties = 0;
        n.ClergyArchersCasualties = 0;
        n.ClergyCrossbowmenCasualties = 0;
        n.ClergyMusketeersCasualties = 0;
        n.ClergyMusketMilitiaCasualties = 0;
        n.ClergyRiflemenCasualties = 0;
        n.ClergyLightCavalryCasualties = 0;
        n.ClergyHeavyCavalryCasualties = 0;
        n.ClergyEliteCavalryCasualties = 0;

        n.BurgousieLeviesCasualties = 0;
        n.BurgousieMilitiaCasualties = 0;
        n.BurgousieLightInfantryCasualties = 0;
        n.BurgousieHeavyInfantryCasualties = 0;
        n.BurgousieEliteInfantryCasualties = 0;
        n.BurgousieArchersCasualties = 0;
        n.BurgousieCrossbowmenCasualties = 0;
        n.BurgousieMusketeersCasualties = 0;
        n.BurgousieMusketMilitiaCasualties = 0;
        n.BurgousieRiflemenCasualties = 0;
        n.BurgousieLightCavalryCasualties = 0;
        n.BurgousieHeavyCavalryCasualties = 0;
        n.BurgousieEliteCavalryCasualties = 0;

        n.PopulaceMilitiaCasualties = 0;
        n.PopulaceMusketMilitiaCasualties = 0;
    }

    // Expected Weapons for private militaries
    n.ExpectedPrivateBasicArmaments = n.AristocracyBasicArmaments + n.BurgousieBasicArmaments + n.ClergyBasicArmaments + n.PopulaceBasicArmaments;

    // Alcoholism
    if (n.EffectiveAlcohol > n.AlcoholDemand * 0.75) {
        n.Alcoholism += 0.1;
    }
    else {
        n.Alcoholism -= 0.05;
    }
    n.Alcoholism = clamp(0, 1, n.Alcoholism);

    // Influence Change check
    for (const EstateIndex in estatesGeneral) {
        const Estate = estatesGeneral[EstateIndex];
        n.InfluenceChangeLoyaltyEffect[Estate] = (n.EstateInfluencesReal[Estate + "Influence"] - n.ExpectedInfluences[Estate + "Influence"]) * 1.5;
        n.ExpectedInfluences[Estate + "Influence"] = n.EstateInfluencesReal[Estate + "Influence"];
    }

    // Reform Power
    n.ReformPower += n.ReformPowerGain;

    /* #region  deal with automatic debt taking */

    //If budget is negative
    if (n.Budget < 0) {
        //take -budget in debt, but no more than possible public debt
        const newDebt = min(n.PossiblePublicDebt, -n.Budget);
        //add it to effective debt
        n.PublicDebtTaken += newDebt;
        //the debt taken added into budget
        n.Budget += newDebt;
    }
    /* #endregion */
}

export function syncNations() {
    for (const nationName in getGameStats().Nations) {
        clearNewTroops(nationName);
        syncNation(nationName);
    }
}

