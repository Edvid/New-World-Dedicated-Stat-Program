function evaluateNation(nationName) {
  let n = gameStats.Nations[nationName];

  n.AgricultureTechnology = 0 + n.Technologies.HorseCollar / 2;
  n.FarmingEfficiency = 1 + n.AgricultureSubsidies / 5 + n.Fertility - 0.5 + (n.AgricultureInfrastructure - 1) / 10 + (n.AgricultureAdvancements - 1) / 10 + n.AgricultureTechnology / 10;

  {
    let rels = []
    let culs = []
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
        //If the social behaviour group to be had an opinion about is also not present in the nation either, n.also doesn't add to the disunity
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
  let cultureCalc = SocialBehaviourCalc(
    n.CultureGroups, 
    gameStats.Cultures, 
    typeof n.CultureRepresentedAtGovernmentLevel !== 'undefined' ? n.CultureRepresentedAtGovernmentLevel : null
  );
  let religionCalc = SocialBehaviourCalc(
    n.ReligionGroups, 
    gameStats.Religions, 
    typeof n.ReligionRepresentedAtGovernmentLevel !== 'undefined' ? n.ReligionRepresentedAtGovernmentLevel : null
  );
  n.Size = (function () {
    let s = 0;
    for (const climate in n.Climates) {
      s += n.Climates[climate].Pixels;
    }
    return s;
  })();
  n.CultureRepresentedAtGovernmentLevelPercent =  cultureCalc.GovernmentRepresentationPercent;
  n.CulturalDisunity = cultureCalc.disunity;
  n.ReligionRepresentedAtGovernmentLevelPercent = religionCalc.GovernmentRepresentationPercent;
  n.ReligiousDisunity = religionCalc.disunity;
  n.OverallNumbers = n.Musketeers + n.Levies + n.LightInfantry + n.HeavyInfantry + n.Archers + n.Crossbowmen + n.LightCavalry + n.HeavyCavalry + n.EliteInfantry + n.Militia + n.EliteCavalry + n.HandCannoneers + (n.SiegeEquipment + n.LargeSiegeEquipment) * 10;
  n.OverallShipCount = n.LightShips + n.MediumShips + n.HeavyShips;
  n.AdministrativeStrain = (0 + n.Population / 1250000 + n.Health * 2 + n.EducationEfficiency * 1.5 + n.SocialSpending * 4 + n.Propaganda * 2 + n.PopulationControl * 2 + n.BirthControl * 4 + (n.HighClassTax + n.MediumClassTax + n.LowerClassTax) / 3 * 75 + n.OverallNumbers / 5000 + n.OverallShipCount / 100 + n.AgricultureSubsidies * 4 + (n.AgricultureInfrastructure - 1) * 4 + n.Size / 5000 + (n.ResearchSpending - 1) * 10 + (1 - n.CultureRepresentedAtGovernmentLevelPercent) * 10) * (n.CulturalAdvancements.EarlyModernAdministration == true ? 0.75 : 1) * (n.CulturalAdvancements.NationalSovereignity == true ? 0.75 : 1); 
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

      let er = n[resource] * (GatheringEffectiveness(resource) == "Farming" ? n.FarmingEfficiency : n.MiningEfficiency) + n[resource + "Incoming"] - n[resource + "Outgoing"];
      if(er < 0){
        lazyerror(`It seems the effective resource ${resource} in ${nationName} is negative: ${er}. Is an impossible trade taking place?`);
      }
      return er;
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

    n[resource + "Demand"] = (n.Population / PopulationDemand) + extraDemands;

    if (resource == "Iron" && n.Technologies.Metallurgy) n[resource + "Demand"] *= 1.1;

    n[resource + "Value"] = n[resource + "Demand"] / (Math.sqrt(n["Effective" + resource]) + 0.1);
  }
  n.TradePowerFromResourceTrade = (function () {
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
      num += +n[resource + "Incoming"] * +n[resource + "Value"];
      if(isNaN(num)){
        lazyerror(`something went wrong. Tried to multiply ${n[resource + "Incoming"]} (${n.nationName ?? nationName}.${resource}Incoming) with ${n[resource + "Value"]} (${n.nationName ?? nationName}.${resource}Value)`);
        return 0;
      }
    }
    return num;
  })();
  let pseudoTradePower = (function () {
    let stp = 0;
    for (const region in gameStats.TradeZones) {
      let allNationPoints = 0;
      for (const nation in gameStats.Nations) {
        let point = +gameStats.Nations[nation].TradeInfluences[region].TradingPoints;
        allNationPoints += (typeof point !== 'undefined') ? point : 0;
      }
      let Point = n.TradeInfluences[region].TradingPoints;
      let percent = allNationPoints != 0 ? 
        (
          ((typeof Point !== 'undefined') ? Point : 0
        ) / allNationPoints) 
        : 0;
      stp += gameStats.TradeZones[region] * percent;
    }
    return stp;
  })();
  n.TradePower = n.TradePowerFromResourceTrade + n.LocalTrade / 2 + (pseudoTradePower);
  n.ConscriptionPercent = n.OverallNumbers / n.Population;
  n.Workforces.PopulationInMilitary = n.ConscriptionPercent;
  n.Workforces.Sailors = (n.LightShips * 200 + n.MediumShips * 450 + n.HeavyShips * 800) / n.Population
  n.Workforces.Bureaucrats = n.AdministrativeStrain * 1000 / n.Population;
  n.Workforces.Intellectuals = n.HigherEducation / 100;
  n.Workforces.Merchants = n.TradePower * 1000 / n.Population;
  n.Workforces.PopulationInResourceHarvest = (n.Coal + n.Sulphur + n.Cotton + n.Gold + n.Iron + n.Tea + n.Silk + n.Spice + n.Wool + n.Coffee + n.Fur + n.Diamond + n.Silver + n.Copper + n.Ivory + n.Cocoa + n.Tobacco + n.Sugar + n.ExoticFruit) * 20000 / n.Population;
  n.Workforces.PopulationInAgriculture = 1 - n.Workforces.PopulationInMilitary - n.Workforces.Artisans - n.Workforces.Clergy - n.Workforces.Burghers - n.Workforces.Nobility - n.Workforces.PopulationInResourceHarvest;
  n.AgricultureSpending = (n.Workforces.PopulationInAgriculture * n.Population / 1000 * n.AgricultureInfrastructure / 100 * (1 + n.AgricultureSubsidies / 10) * n.StockingCapabilities) / 2;

  

  

  n.DailyFood = n.Workforces.PopulationInAgriculture * n.Population / 1000 * n.FarmingEfficiency * (1 - n.Pillaging) + n.FoodIncoming - n.FoodOutgoing;
  n.FoodConsumption = n.Population / 1000;
  n.FoodGain = n.DailyFood - n.FoodConsumption;

  n.MaxFoodStock = (function () {
    return max(100, 1000 * n.Population / 10000000) * n.StockingCapabilities;
  })();
  n.FutureFood = min(n.MaxFoodStock, n.Food + n.FoodGain);
  n.FoodPopulationBoost = (function () {
    return n.Food > 500 ? n.Food / 50000 : 0;
  })();
  n.SurplusFood = (function () {
    return n.FoodGain + n.Food > n.MaxFoodStock ? n.FoodGain + n.Food - n.MaxFoodStock : 0;
  })();

  
  n.SellingCapability = (n.LocalTrade / 2 + pseudoTradePower / 5) * n.Mercantilism * 200;
  n.FoodSold = min(n.SellingCapability, n.SurplusFood);
  n.Foodlost = n.SurplusFood - n.FoodSold;
  n.TradeProfit = n.FoodSold / 50;

  n.Prosperity = 1 + n.SocialSpending / 2.5 + (n.FutureFood < 0 ? n.FutureFood / (n.Population / 10000) : 0) + (n.Budget < 0 ? n.Budget / n.OverallIncome : 0) - (n.Pillaging) * 3;
  n.Food = max(0, n.Food);
  n.FutureFood = min(n.MaxFoodStock, n.Food + n.FoodGain);
  n.KmSquared = n.Size != 0 ? n.Size * 20 : 78870; //But Please specify Size as soon as possible in game
  n.HabitableLand = (function () {
    if (n.Size == 0) return 0.8;
    let hl = 0;

    for (const climate in n.Climates) {
      hl += (n.Climates[climate].Pixels / n.Size) * gameStats.Climates[climate].ClimateScore;
    }

    return hl;
  })();
  n.PopulationDensityPerKmSquared = n.Population / (n.KmSquared * n.HabitableLand);

  n.Disease = n.PopulationDensityPerKmSquared / 25 - n.Health / 20 - (n.Technologies.HumanAnatomy ? 0.15 : 0);
  n.UnderPopulation = n.Disease < 0.5 ? (1 - n.Disease) / 10 : 0;

  let PopulationGrowthModifier = (n.Fertility > 0.5 ? (n.Fertility - 0.5) / 10 : 0) + n.FoodPopulationBoost + (n.Prosperity - 1) / 10 + n.UnderPopulation;
  
  n.UnitUpkeep = (function () {
    let uu = 0;
    for (const unitName in gameStats.UnitUpkeepCosts) {
      const cost = gameStats.UnitUpkeepCosts[unitName];
      uu += n[unitName] * cost;
    }
    return uu;
  })();

  n.ArmyTechBoost = (
    n.Technologies.SaddleAndStirrup +
    n.Technologies.Matchlock +
    n.Technologies.SocketBayonet +
    n.Technologies.Flintlock)
    / 5 +
    (
      n.Technologies.Gunpowder +
      n.Technologies.PlateArmour +
      n.Technologies.StandardizedPikes +
      n.Technologies.Muskets +
      n.Technologies.Limber +
      n.Technologies.Mortars +
      n.Technologies.Reiters +
      n.Technologies.Metallurgy +
      n.Technologies.Bayonet)
    / 10 +
    (
      n.Technologies.Firelance +
      n.Technologies.Bombards +
      n.Technologies.HandCannons +
      n.Technologies.SappersAndEngineers)
    / 20;
  n.ArmyTech = 1 + n.ArmyTechBoost;


  
  n.IronShortage = max(0, n.UnitUpkeep / 200 - n.EffectiveIron);
  n.SulphurShortage = max(0, (n.Cannons * 100 + n.Musketeers + n.HandCannoneers +
    (n.Technologies.Reiters == true ? n.LightCavalry + n.HeavyCavalry : 0)) / 15000 - n.EffectiveSulphur);

  n.ResourceHappinessBoost =
    n.EffectiveCotton - n.CottonInflation +
    n.EffectiveGold - n.GoldInflation +
    n.EffectiveTea - n.TeaInflation +
    n.EffectiveSilk - n.SilkInflation +
    n.EffectiveSpice - n.SpiceInflation +
    n.EffectiveWool - n.WoolInflation +
    n.EffectiveCoffee - n.CoffeeInflation +
    n.EffectiveFur - n.FurInflation +
    n.EffectiveDiamond - n.DiamondInflation +
    n.EffectiveSilver - n.SilverInflation +
    n.EffectiveIvory - n.IvoryInflation +
    n.EffectiveCocoa - n.CocoaInflation +
    n.EffectiveTobacco - n.TobaccoInflation +
    n.EffectiveSugar - n.SugarInflation +
    n.EffectiveExoticFruit - n.ExoticFruitInflation;

  n.SocietalClasses.High = n.Workforces.Nobility;
  n.SocietalClasses.Medium = n.Workforces.Artisans + n.Workforces.Clergy + n.Workforces.Burghers;
  n.SocietalClasses.Lower = n.Workforces.PopulationInAgriculture + n.Workforces.PopulationInMilitary;
  n.InterestRate = 0.05 + n.PublicDebtLength * 0.02 / gameStats.TimeDivide;
  n.EffectiveDebt = n.PublicDebtTaken * (1 + n.InterestRate);
  n.PossiblePublicDebt = max(0, n.Population / 10000 * (1 - (n.HighClassTax + n.MediumClassTax + n.LowerClassTax) / 3) - n.EffectiveDebt);
  n.DebtHappinessEffect = (n.PublicDebtLength > 1 ? n.EffectiveDebt / (n.PossiblePublicDebt + n.PublicDebtTaken) * (2 + n.PublicDebtLength) : 0);
  n.WarExhaustion = (n.Casualties / n.Population * 500) + (n.Pillaging * 20) + (n.Occupation * 5);

  n.PopulationHappiness = (50 + n.ResourceHappinessBoost) * n.Prosperity / 10 - (n.LowerClassTax * n.SocietalClasses.Lower + n.MediumClassTax * n.SocietalClasses.Medium + n.SocietalClasses.High * n.HighClassTax) * 100 / 4 - n.Absolutism / 2 - n.PopulationControl +
    (n.Mercantilism > 1 ? (-n.Mercantilism + 1) * 2.5 : 0) + (n.EffectiveDebt > 0 && n.Budget < 0 ? - (n.EffectiveDebt / n.PossiblePublicDebt) * 10 : 0) - n.WarExhaustion / 2 - n.DebtHappinessEffect + (n.Disease > 0.10 ? - n.Disease / 4 : 0);
  n.LandAdministration = ((n.Size - n.DetachedLand) / 25000 + n.DetachedLand / 10000) * (1 - n.AdministrativeEfficiency / 1000);
  n.Overextension = n.UnderPopulation / 4 + n.LandAdministration / 1.5;
  
  


  n.NobleStateLoyalty = (function () {
    let pointSum = 0;
    let StatePoints = 0;
    for (const loyaltyName in n.NobleLoyaltyGroups) {
      const loyalty = n.NobleLoyaltyGroups[loyaltyName];
      pointSum += +loyalty;
      if (loyaltyName == n.GovernmentName) StatePoints += +loyalty;
    }
    return 100 * StatePoints / pointSum;
  })();
  n.ClergyStateLoyalty = (function () {
    let pointSum = 0;
    let StatePoints = 0;
    for (const loyaltyName in n.ClergyLoyaltyGroups) {
      const loyalty = n.ClergyLoyaltyGroups[loyaltyName];
      pointSum += +loyalty;
      if (loyaltyName == n.GovernmentName) StatePoints += +loyalty;
    }
    return 100 * StatePoints / pointSum;
  })();
  n.BurghersStateLoyalty = (function () {
    let pointSum = 0;
    let StatePoints = 0;
    for (const loyaltyName in n.BurghersLoyaltyGroups) {
      const loyalty = n.BurghersLoyaltyGroups[loyaltyName];
      pointSum += +loyalty;
      if (loyaltyName == n.GovernmentName) StatePoints += +loyalty;
    }
    return 100 * StatePoints / pointSum;
  })();
  n.PopulationStabilityImpact = (n.Population > n.AdministrativeEfficiency * 500000 ? (n.AdministrativeEfficiency * 500000 - n.Population) / 50000000 : 0) * 10;
  n.Fervor = clamp(1, -1, 0 + n.MinorBattles / 20 + n.MajorBattles / 10 + n.Pillaging - (n.Casualties / (n.OverallNumbers + n.Casualties + 0.0000001)));
  n.WarSupport = clamp(1, 0, n.PopulationHappiness / 10 * 2.5 + n.Propaganda / 10 + n.Fervor);
  let WarStatus = n.AtWar;
  if(WarStatus == false) WarStatus = "false";
  WarStatus = WarStatus.toLowerCase();
  let WarStabilityModifier = ((WarStatus == 'offensive' && n.WarSupport < 0.75) ? (n.WarSupport - 0.75) / 10 : 0) + max(-0.075, ((WarStatus == 'defensive' && n.WarSupport < 0.4 && n.Fervor < 0) ? (n.Fervor) / 10 : 0));
  
  n.MilitaryMorale = clamp(0, 1.5, 
    1 + n.Fervor + (n.MilitaryDiscipline > 1 ? - n.MilitaryDiscipline + 1 : 0) * 2 +
  (n.WarSupport < 0.5 ? n.WarSupport - 0.5 : 0) +
  (n.WarSupport > 0.75 ? n.WarSupport - 0.75 : 0) +
  n.ArmyWages - 1);
  
  n.MilitaryLoyalty = clamp(1, 0, 
    1 * n.ArmyWages +
    (n.CulturalAdvancements.EarlyModernAdministration == false && n.NobleStateLoyalty < 0.50 ?
      ( n.NobleStateLoyalty - 0.50) * 2 : 0) +
    (n.MilitaryMorale < 0.70 ?
      -(1 - n.MilitaryMorale) / 2 :
      0) +
    (n.Budget < 0 ? n.Budget / n.ArmyUpkeep :
      0)
    - n.CommanderFreedom / 10);
  n.Stability = n.PopulationHappiness + n.AdministrativeEfficiency / 10 - n.Overextension - n.CulturalDisunity - n.ReligiousDisunity + (n.Propaganda / 1.75 * (1 + n.CulturalAdvancements.Newspapers / 2)) + n.PopulationControl + (n.NobleStateLoyalty/100 - 0.5) * 10 + (n.ClergyStateLoyalty/100 - 0.5) * 7.5 + (n.BurghersStateLoyalty/100 - 0.5) * 7.5 + n.PopulationStabilityImpact + WarStabilityModifier * 100 + (n.MilitaryLoyalty - 1) * 7.5;
  n.Corruption =  (n.Stability < 1 ? 0.5 : 0) + (n.Stability < -1 ? 0.5 : 0) + max(0, n.AdministrativeStrain - n.AdministrativeEfficiency) / 4 + n.Absolutism / 2;
  n.ArmyQuality = max(0.1, 1 + n.TrainingQuality + n.ArmyTech + n.MilitaryTactics + n.CommanderFreedom / 10 - n.IronShortage - n.SulphurShortage - n.Corruption / 5);
  n.FortUpkeep = (
    n.SmallForts * 2 +
    n.MediumForts * 4 +
    n.BigForts * 8 +
    n.HugeForts * 16 +

    n.ExtraCityFortifications * 5
  ) * n.ArmyQuality / gameStats.TimeDivide;
  
  
  

  



  n.ResourcePopulationGrowthBoost = (n.EffectiveCotton - n.CottonInflation + n.EffectiveSpice - n.SpiceInflation + n.EffectiveWool - n.WoolInflation + n.EffectiveFur - n.FurInflation + (n.EffectiveSugar - n.SugarInflation + n.EffectiveExoticFruit - n.ExoticFruitInflation) / 2) / 100;
n.PopulationGrowth = (n.FutureFood < 0 ? n.FutureFood * 1000 / n.Population - (n.Disease > 1 ? n.Disease - 1 : 0) / 10 : max(-0.3, (0.1 + PopulationGrowthModifier + n.ResourcePopulationGrowthBoost) * (1 - n.Disease) - n.BirthControl / 20));
  n.FuturePopulation = (function () {
    return n.Population + n.Population * n.PopulationGrowth / gameStats.TimeDivide;
  })();
  n.FutureLiteracyPercent = ((n.LiteracyPercent > n.EducationEfficiency * 3) ? n.EducationEfficiency * 3 : n.LiteracyPercent) + n.EducationEfficiency / 10 / gameStats.TimeDivide;
  n.FutureHigherEducation = n.HigherEducation + (n.EducationEfficiency >= 3 ? n.EducationEfficiency / 30 : 0) + (n.HigherEducation > n.EducationEfficiency / 3 ? -0.25 : 0);









  n.NavyTech = 0 + n.Technologies.Galleons / 4 + n.Technologies.Docks / 2 + n.Technologies.Gunports / 2;
  n.NavyQuality = 1 + n.NavyImprovements + n.NavyTech;

  n.UpkeepForOneLightShip = ((1 / 8) * n.NavyQuality) / gameStats.TimeDivide * (1 + n.Technologies.Gunports);
  n.UpkeepForOneMediumShip = ((1 / 4) * n.NavyQuality) / gameStats.TimeDivide * (1 + n.Technologies.Gunports);
  n.UpkeepForOneHeavyShip = ((1 / 2) * n.NavyQuality) / gameStats.TimeDivide * (1 + n.Technologies.Gunports + n.Technologies.Galleons / 2);

  n.NavyUpkeep = (
    n.LightShips * n.UpkeepForOneLightShip +
    n.MediumShips * n.UpkeepForOneMediumShip +
    n.HeavyShips * n.UpkeepForOneHeavyShip
  );

  n.NewTroopRecruitmentPenalty = (function () {
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

  n.ArmyUpkeep = n.UnitUpkeep * ((n.ArmyQuality + n.Corruption / 5) + n.ArmyWages - 1) / gameStats.TimeDivide;





  
  n.ProductionEfficiency = n.Mercantilism + n.Technologies.VerticalLoom / 5 + n.Technologies.Workshops + n.Technologies.Cranes / 5 + n.Technologies.TextileManufactories / 2;
  n.Production = (n.LocalTrade + n.TradePower) * n.Workforces.Artisans * n.ProductionEfficiency * 10;
  n.TradeProtection = n.LightShips * 0.75 + n.MediumShips * 1 + n.HeavyShips * 0.75;
  n.TradeEfficiency = 1 * n.Mercantilism + n.Technologies.Cranes / 10 + n.Technologies.PromissoryNotes / 20 + n.TradeProtection / 200;

  n.Inflation = max(0, (n.Budget / 1000) / (n.AdministrativeEfficiency / 10));
  n.ResourceBudgetBoost = (function () {
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

  n.TradeRevenue = (n.TradePower * (1 - n.BurghersInfluence)) / gameStats.TimeDivide * n.TradeEfficiency + n.TradeProfit / gameStats.TimeDivide;
  n.EffectiveTax = (
    (
      n.SocietalClasses.Lower * n.Population * n.LowerClassTax / 10000 +
      n.Population * n.SocietalClasses.Medium * n.MediumClassTax / 7500 * (1 - n.ClergyInfluence - n.BurghersInfluence) + n.Population * n.SocietalClasses.High * n.HighClassTax / 5000 * (1 - n.NobleInfluence)
    ) * n.AdministrativeEfficiency / 10 * (1 - n.NobleInfluence / 4 - n.ClergyInfluence / 4
    ) * (1 - n.Occupation)) / gameStats.TimeDivide * (1 - n.Corruption / 10);

  n.SpyUpkeep = n.Spies / 200 * n.SpyQuality / gameStats.TimeDivide;
  n.SocialSpendingUpkeep = n.SocialSpending * n.Population / 1000000 / gameStats.TimeDivide * 3;
  n.HygieneUpkeep = n.Health * n.Population / 2000000 / gameStats.TimeDivide;
  n.EducationUpkeep = n.EducationEfficiency * n.Population / 500000 * (1.1 - n.AdministrativeEfficiency / 100) * 6 / gameStats.TimeDivide;
  n.PropagandaUpkeep = n.Propaganda * (100 - n.AdministrativeEfficiency) / 100 * n.Population / 1000000 / gameStats.TimeDivide;
  n.PopulationControlUpkeep = n.PopulationControl * n.Population / 800000 / gameStats.TimeDivide;
  n.AdministrativeUpkeep = n.LandAdministration / gameStats.TimeDivide * 2;
  n.ProductionRevenue = n.Production / gameStats.TimeDivide;
  n.ResearchUpkeep = n.ResearchSpending * n.Population / 500000 / gameStats.TimeDivide * n.LiteracyPercent / 10;
  n.Balance = n.BudgetIncoming - n.BudgetOutgoing;

  n.DailyBudget = (n.Budget / (10 - n.AdministrativeEfficiency / 10 + 1) / gameStats.TimeDivide) / (1 + n.Inflation) + n.ResourceBudgetBoost - n.ArmyUpkeep + n.TradeRevenue + n.EffectiveTax - n.EducationUpkeep - n.HygieneUpkeep - n.NavyUpkeep - n.AgricultureSpending - n.SocialSpendingUpkeep - n.SpyUpkeep - n.PopulationControlUpkeep - n.PropagandaUpkeep + n.ProductionRevenue - n.FortUpkeep - n.AdministrativeUpkeep - n.ResearchUpkeep + n.Balance - n.NewTroopRecruitmentPenalty;
  n.FutureBudget = n.Budget + n.DailyBudget;

  n.OverallIncome = (n.Budget / (10 - n.AdministrativeEfficiency / 10 + 1) / gameStats.TimeDivide) / (1 + n.Inflation) + n.ResourceBudgetBoost + n.TradeRevenue + n.EffectiveTax + n.ProductionRevenue + n.Balance;

  n.EliteUnitsCap = ((n.OverallNumbers - n.Militia - n.Levies - n.EliteCavalry - n.EliteInfantry) * 0.025);


  n.CulturalAdvance = (function () {
    let ca = 0;
    for (const cultureadvance in n.CulturalAdvancements) {
      if (n.CulturalAdvancements[cultureadvance]) ca++;

    }
    return ca;
  })();
  n.CulturalPowerGain = (n.LiteracyPercent / 3 + n.PopulationHappiness / 8) * (n.CulturalProsperity + n.CulturalAdvancements.RenaissanceThought / 10) / gameStats.TimeDivide;
  n.CulturalPower = n.CulturalPower;
  n.FutureCulturalPower = min(6, (n.CulturalPower + n.CulturalPowerGain));
  n.FuturePublicDebtLength = n.EffectiveDebt > 0 ? n.PublicDebtLength + 1 : 0;

  n.MaxPopulation = n.Population / n.Disease;
  
  n.NavalPower = (n.LightShips*0.5 + n.MediumShips + 2*n.HeavyShips) * n.NavyQuality;
  

  n.PopulationTechImpact = (n.Population > 20000000? (n.Population - 20000000) / 250000000 : 0);
  

  n.ResearchBoostFromTech = 
  1 + 
  n.CulturalAdvancements.Universities / 10 + 
  n.CulturalAdvancements.RenaissanceThought / 5 + 
  n.Technologies.Experimentation / 5;
  n.ResearchPointGain = max(1, (n.ResearchSpending * n.ResearchEffectiveness * n.ResearchBoostFromTech * n.LiteracyPercent / n.Isolation / gameStats.TimeDivide * 2 / 10 + n.ResearchSpending * n.ResearchEffectiveness * n.HigherEducation / n.Isolation / gameStats.TimeDivide * 5 / 10) * (1 - (n.NobleInfluence > 0.5 ? n.NobleInfluence - 0.5 : 0) / 1.5 - (n.ClergyInfluence > 0.5? n.ClergyInfluence - 0.5 : 0) / 1.5) * (1 - n.PopulationTechImpact));
  n.FutureResearchPoints = min(7.5, n.ResearchPoints + n.ResearchPointGain);
}
