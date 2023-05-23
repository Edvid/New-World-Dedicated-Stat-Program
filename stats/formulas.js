class Formulas{

  static evaluateNation(nationName) {
    let n = gameStats.Nations[nationName];

    n.AgricultureTechnology = 0 + n.Technologies.HorseCollar / 2 + n.CulturalAdvancements.PotatoPopulationBoom / 2 + n.Reforms.Enclosure / 2;
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
          //If the social behaviour group to be had an opinion about, isn't recorded by the social behaviour group we are currently checking Opinions for. Treat the opinion as the default distrust
          let opinionobj;
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

    n.Size += (n.Size <= 0 ? 1 : 0);

    n.CultureRepresentedAtGovernmentLevelPercent =  cultureCalc.GovernmentRepresentationPercent;
    n.CulturalDisunity = cultureCalc.disunity * (1 + n.Nationalism * 0.2);
    n.ReligionRepresentedAtGovernmentLevelPercent = religionCalc.GovernmentRepresentationPercent;
      n.ReligiousDisunity = religionCalc.disunity * (1 + n.ReligiousFervor * 0.2);
      n.OverallNumbers = n.Riflemen + n.MusketMilitia + n.Musketeers + n.Levies + n.LightInfantry + n.HeavyInfantry + n.Archers + n.Crossbowmen + n.LightCavalry + n.HeavyCavalry + n.EliteInfantry + n.Militia + n.EliteCavalry + n.HandCannoneers + (n.SiegeEquipment + n.LargeSiegeEquipment) * 10 + n.RegimentalGuns * 3 + n.FieldCannons * 6 + n.SiegeGuns * 10;
    n.OverallShipCount = n.LightShips + n.MediumShips + n.HeavyShips;
    n.AdministrativeTech = (n.CulturalAdvancements.EarlyModernAdministration == true ? 1 : 0) + (n.CulturalAdvancements.NationalSovereignity == true ? 1 : 0) + (n.CulturalAdvancements.Constitution == true ? 1 : 0)	
    n.AdministrativePower = n.AdministrativeEfficiency * (1 + n.AdministrationSize / 2 + n.AdministrativeTech / 10) * 0.75;
    n.AdministrativeDemand = (
      0 + n.Population / 1000000 + n.Health * 2 + n.EducationEfficiency * 2 + n.SocialSpending * 4 + n.Propaganda * 2 + n.PopulationControl * 2 + n.BirthControl * 4 + 
      (n.HighClassTax + n.MediumClassTax + n.LowerClassTax) / 3 * 75 + n.OverallNumbers / 5000 + n.OverallShipCount / 25 + n.AgricultureSubsidies * 4 + (n.AgricultureInfrastructure - 1) * 4 + n.Size / 7500 + 
      (n.ResearchSpending - 1) * 10 + (1 - n.CultureRepresentedAtGovernmentLevelPercent) * 10
    );
    n.AdministrativeStrain = max(0, n.AdministrativeDemand - n.AdministrativePower);
    

    n.IrregularQualityIC = n.OverallImprovements + n.IrregularImprovements + n.Technologies.Metallurgy / 10;
    n.MeleeQualityIC = n.OverallImprovements + n.MeleeImprovements + n.Technologies.PlateArmour / 5 + n.Technologies.StandardizedPikes / 10 + n.Technologies.Metallurgy / 10;
    n.RangedQualityIC = n.OverallImprovements + n.RangedImprovements + n.Technologies.Metallurgy / 10;
    n.CavalryQualityIC = n.OverallImprovements + n.CavalryImprovements + n.Technologies.SaddleAndStirrup / 5 + n.Technologies.PlateArmour / 5 + n.Technologies.Reiters / 10 + n.Technologies.Metallurgy / 10;
    n.FirearmQualityIC = n.OverallImprovements + n.FirearmImprovements + n.Technologies.Matchlock / 5 + n.Technologies.SocketBayonet / 5 + n.Technologies.Flintlock / 5 + n.Technologies.Metallurgy / 10 + n.Technologies.Bayonet / 20;
    n.SiegeQualityIC = n.OverallImprovements + n.SiegeImprovements + n.Technologies.Metallurgy / 10;
    n.ArtilleryQualityIC = n.OverallImprovements + n.ArtilleryImprovements + n.Technologies.Limber / 5 + n.Technologies.Mortars / 5 + n.Technologies.Metallurgy / 10;
    
    n.FortUpkeep = (
      n.SmallForts * 2 +
      n.MediumForts * 4 +
      n.BigForts * 8 +
      n.HugeForts * 16 +

      n.ExtraCityFortifications * 5
    ) * n.OverallImprovements / gameStats.TimeDivide;

    n.UnitUpkeep = function(){
      let uu = 0.0;
      Object.keys(gameStats.UnitUpkeepCosts).forEach(unitName => {
        uu += gameStats.UnitUpkeepCosts[unitName] * n[unitName] * n[unitType(unitName) + 'QualityIC']; 
      });

      return uu;
    }();


    n.NavyTech = 0 + n.Technologies.Galleons / 4 + n.Technologies.Docks / 2 + n.Technologies.Gunports / 2 + n.Technologies.Gunlock / 4;
    n.NavyQualityIC = 1 + n.NavyImprovements + n.NavyTech;

    n.UpkeepForOneMerchantShip = ((1 + n.Technologies.Gunports) * (n.NavyQualityIC)) / gameStats.TimeDivide;
    n.UpkeepForOneLightShip = ((1.5 + n.Technologies.Gunports * 2) * (n.NavyQualityIC)) / gameStats.TimeDivide;
    n.UpkeepForOneMediumShip = ((3 + n.Technologies.Gunports * 5) * (n.NavyQualityIC)) / gameStats.TimeDivide;
    n.UpkeepForOneHeavyShip = ((6 + n.Technologies.Gunports * 15) * (n.NavyQualityIC)) / gameStats.TimeDivide;

    n.NavyUpkeep = (
      n.MerchantShips * n.UpkeepForOneMerchantShip +
      n.LightShips * n.UpkeepForOneLightShip +
      n.MediumShips * n.UpkeepForOneMediumShip +
      n.HeavyShips * n.UpkeepForOneHeavyShip
    );

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
    ) / 2750 * n.MiningEfficiency;

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
    ) / 2250 * n.MiningEfficiency;

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
    ) / 1750 * n.MiningEfficiency;

      n.CoastalLandPercent = n.CoastalPixels / n.Size;
      n.AverageDevelopment = n.DevelopmentPixelCount / n.Size / 255;

      n.ConscriptionPercent = (n.OverallNumbers + n.SmallForts * 100 + n.MediumForts * 250 + n.BigForts * 400 + n.HugeForts * 800 + n.ExtraCityFortifications * 250) / n.Population;
      n.Workforces.PopulationInMilitary = n.ConscriptionPercent;
      n.Workforces.Bureaucrats = n.AdministrationSize / 100;
      n.Workforces.Intellectuals = n.HigherEducation / 100;
      n.Workforces.Townsfolk = n.AverageDevelopment;
    n.Workforces.Labourers = (n.Reforms.SlaveryBanned ? (n.BaseIronHarvest + n.BaseCoalHarvest + n.BaseSulphurHarvest + n.Coal + n.Sulphur + n.Cotton + n.Gold + n.Iron + n.Tea + n.Silk + n.Spice + n.Wool + n.Coffee + n.Fur + n.Diamond + n.Silver + n.Copper + n.Ivory + n.Cocoa + n.Tobacco + n.Sugar + n.ExoticFruit + n.Forestry + n.Reforestation) * 20000 / n.Population : 0);
    n.Workforces.Slaves = (n.Reforms.SlaveryAllowed ? (n.BaseIronHarvest + n.BaseCoalHarvest + n.BaseSulphurHarvest + n.Coal + n.Sulphur + n.Cotton + n.Gold + n.Iron + n.Tea + n.Silk + n.Spice + n.Wool + n.Coffee + n.Fur + n.Diamond + n.Silver + n.Copper + n.Ivory + n.Cocoa + n.Tobacco + n.Sugar + n.ExoticFruit + n.Forestry + n.Reforestation) * 20000 / n.Population : 0);
    n.Workforces.Merchants = (n.MerchantShips * 200) / n.Population;
    n.Workforces.Sailors = (n.MerchantShips * 200 + n.LightShips * 400 + n.MediumShips * 900 + n.HeavyShips * 1600) / n.Population;
    n.Workforces.Farmers = max(n.Reforms.SerfdomBanned ? 1 - n.Workforces.PopulationInMilitary - n.Workforces.Townsfolk - n.Workforces.Sailors - n.Workforces.Merchants - n.Workforces.Intellectuals - n.Workforces.Bureaucrats - n.Workforces.Clergy - n.Workforces.Burgousie - n.Workforces.Aristocracy - n.Workforces.Labourers - n.Workforces.Slaves : min(0.075, 1 - n.Workforces.PopulationInMilitary - n.Workforces.Townsfolk - n.Workforces.Sailors - n.Workforces.Merchants - n.Workforces.Intellectuals - n.Workforces.Bureaucrats - n.Workforces.Clergy - n.Workforces.Burgousie - n.Workforces.Aristocracy - n.Workforces.Labourers - n.Workforces.Slaves), 0);
    n.Workforces.Serfs = max(n.Reforms.SerfdomAllowed ? 1 - n.Workforces.PopulationInMilitary - n.Workforces.Townsfolk - n.Workforces.Sailors - n.Workforces.Merchants - n.Workforces.Intellectuals - n.Workforces.Bureaucrats - n.Workforces.Clergy - n.Workforces.Burgousie - n.Workforces.Aristocracy - n.Workforces.Labourers - n.Workforces.Slaves - n.Workforces.Farmers : 0, 0);

      n.PopInAgriculture = n.Workforces.Farmers + n.Workforces.Serfs;
      n.AgricultureSpending = (n.Workforces.Farmers * n.Population / 1000 * n.AgricultureInfrastructure / 100 * (1 + n.AgricultureSubsidies / 10) * n.StockingCapabilities) / 2 / gameStats.TimeDivide;
      n.DailyFood = (n.Workforces.Farmers + n.Workforces.Serfs) * n.Population / 1000 * n.FarmingEfficiency * (1 - n.Pillaging) + n.FoodIncoming - n.FoodOutgoing;
      n.FoodConsumption = n.Population / 1000;
      n.FoodGain = n.DailyFood - n.FoodConsumption;
    
    
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
    for (const resourceIndex in gameStats.ResourceTypes) { //in, out, effective resources
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

      }

    n.EffectiveIron += n.BaseIronHarvest;
    n.EffectiveCoal += n.BaseCoalHarvest;
    n.EffectiveSulphur += n.BaseSulphurHarvest;
    n.EffectiveCotton *= (1 + n.Technologies.CottonGin);

    n.ProductionEfficiency = n.TradeImprovements + n.Technologies.Workshops + n.Technologies.Cranes / 5 + n.Technologies.SteamEngine / 4 + n.Technologies.FirstFactories / 2 + n.Technologies.LinearAssemblyProcess / 4 + n.Technologies.InterchangeableParts / 2;
    n.WeavingEfficiency = 1 + n.Technologies.VerticalLoom / 4 + n.Technologies.TextileManufactories / 2 + n.Technologies.FlyingShuttle / 2 + n.Technologies.PowerLoomAndSewingMachine;
    n.MetalWorkingEfficiency = n.Technologies.Metallurgy / 4 + n.Technologies.LeadChamberProcess / 5 + n.Technologies.PuddlingProcess / 4;
    n.WeaponWorkingEfficiency = 1 + n.MetalWorkingEfficiency + n.Technologies.StandardizedPikes / 5 + n.Technologies.Flintlock / 5;
    n.ShipBuildingEfficiency = 1 + n.Technologies.Docks / 4;
    n.ToolWorkingEfficiency = 1 + n.MetalWorkingEfficiency + n.Technologies.PaperMachine / 10;
    n.Production = n.Population / 1000 * n.Workforces.Townsfolk * n.ProductionEfficiency / 2;

    n.Wood = n.Forestry * 10;

    n.ForestsLeft = (
      n.Climates.TaigaAndTundra.Pixels * 0.85 +
      n.Climates.MontaneForest.Pixels * 0.8 +
      n.Climates.Medditereanian.Pixels * 0.65 +
      n.Climates.Arid.Pixels * 0.2 +
      n.Climates.Steppe.Pixels * 0.2 +
      n.Climates.Moderate.Pixels * 0.75 +
      n.Climates.SubTropical.Pixels * 0.9 +
      n.Climates.Tropical.Pixels * 1 +
      n.Climates.Savanna.Pixels * 0.45 +
      n.Climates.CoastalDesert.Pixels * 0.15
    ) - n.ForestsCutDown;

    n.AverageExpectedSol = (isNaN(n.Workforces.Slaves) ? 0 : n.Workforces.Slaves) * n.ExpectedSlavesSol + (isNaN(n.Workforces.Labourers) ? 0 : n.Workforces.Labourers) * n.ExpectedLabourersSol + (isNaN(n.Workforces.Serfs) ? 0 : n.Workforces.Serfs) * n.ExpectedSerfsSol + (isNaN(n.Workforces.Farmers) ? 0 : n.Workforces.Farmers) * n.ExpectedFarmersSol + (isNaN(n.Workforces.Townsfolk) ? 0 : n.Workforces.Townsfolk) * n.ExpectedTownsfolkSol + (isNaN(n.Workforces.Clergy) ? 0 : n.Workforces.Clergy) * n.ExpectedClergySol + (isNaN(n.Workforces.Bureaucrats) ? 0 : n.Workforces.Bureaucrats) * n.ExpectedBureaucratsSol + (isNaN(n.Workforces.Merchants) ? 0 : n.Workforces.Merchants) * n.ExpectedMerchantsSol + (isNaN(n.Workforces.Intellectuals) ? 0 : n.Workforces.Intellectuals) * n.ExpectedIntellectualsSol + (isNaN(n.Workforces.Sailors) ? 0 : n.Workforces.Sailors) * n.ExpectedSailorsSol + (isNaN(n.Workforces.Soldiers) ? 0 : n.Workforces.Soldiers) * n.ExpectedSoldiersSol + (isNaN(n.Workforces.Aristocracy) ? 0 : n.Workforces.Aristocracy) * n.ExpectedAristocracySol + (isNaN(n.Workforces.Burgousie) ? 0 : n.Workforces.Burgousie) * n.ExpectedBurgousieSol;

    n.SulphurDemand = 0; // add after army rework
    n.CoalDemand = (n.Production * (n.ProductionSectors.HeavyIndustrySector / n.TotalSupply) / 10 + n.Production * (n.ProductionSectors.HeavyArmamentsSector / n.TotalSupply) / 6 + n.Production * (n.ProductionSectors.BasicArmamentsSector / n.TotalSupply) / 8 + n.Production * (n.ProductionSectors.BasicToolsSector / n.TotalSupply) / 10) / n.ProductionEfficiency + (n.AverageExpectedSol < 1 ? n.AverageExpectedSol * 0.005 * n.Population / 1000 : 0.005 * n.Population / 1000 + (n.AverageExpectedSol - 1) * 0.01 * n.Population / 1000) / 10;
    n.IronDemand = (n.Production * (n.ProductionSectors.HeavyIndustrySector / n.TotalSupply) / 10 + n.Production * (n.ProductionSectors.LuxuryGoodsSector / n.TotalSupply) / 10 + n.Production * (n.ProductionSectors.ShipBuildingSector / n.TotalSupply) / 10 + n.Production * (n.ProductionSectors.HeavyArmamentsSector / n.TotalSupply) / 5 + n.Production * (n.ProductionSectors.BasicArmamentsSector / n.TotalSupply) / 10 + n.Production * (n.ProductionSectors.BasicToolsSector / n.TotalSupply) / 10) / n.ProductionEfficiency;
    n.WoodDemand = (n.Production * (n.ProductionSectors.LuxuryGoodsSector / n.TotalSupply) / 10 + n.Production * (n.ProductionSectors.BasicGoodsSector / n.TotalSupply) / 8 + n.Production * (n.ProductionSectors.ShipBuildingSector / n.TotalSupply) / 2 + n.Production * (n.ProductionSectors.BasicArmamentsSector / n.TotalSupply) / 10 + n.Production * (n.ProductionSectors.ConstructionSector / n.TotalSupply) / 2 + n.Production * (n.ProductionSectors.BasicToolsSector / n.TotalSupply) / 6) / n.ProductionEfficiency + (n.AverageExpectedSol < 1 ? n.AverageExpectedSol * 0.01 * n.Population / 1000 : 0.01 * n.Population / 1000 + (n.AverageExpectedSol - 1) * 0.02 * n.Population / 1000) / 10;

    n.FoodDemand = n.Production * (n.ProductionSectors.AlcoholSector / n.TotalSupply) + (n.AverageExpectedSol < 1 ? n.AverageExpectedSol * n.Population / 1000 : n.Population / 1000 + (n.AverageExpectedSol - 1) * 1.75 * n.Population / 1000);

    n.NaturalFabricsDemand = (n.Production * (n.ProductionSectors.TextilesSector / n.TotalSupply)) / n.ProductionEfficiency / 4;
    n.WoolDemand = n.NaturalFabricsDemand;
    n.CottonDemand = n.NaturalFabricsDemand;

    n.LuxuryNaturalFabricsDemand = (n.Production * (n.ProductionSectors.LuxuryGoodsSector / n.TotalSupply) / 10) / n.ProductionEfficiency;
    n.FurDemand = n.LuxuryNaturalFabricsDemand;
    n.SilkDemand = n.LuxuryNaturalFabricsDemand;

    n.ValuableMaterialsDemand = (n.Production * (n.ProductionSectors.LuxuryGoodsSector / n.TotalSupply)) / n.ProductionEfficiency;
    n.DiamondDemand = n.ValuableMaterialsDemand + n.Population / 1000000;
    n.GoldDemand = n.ValuableMaterialsDemand + n.Population / 500000;
    n.SilverDemand = n.ValuableMaterialsDemand + n.Population / 500000;
    n.CopperDemand = n.ValuableMaterialsDemand + n.Population / 1000000;
    n.IvoryDemand = n.ValuableMaterialsDemand + n.Population / 1000000;
    

    n.LuxuryConsumables = n.EffectiveTea + n.EffectiveCoffee + n.EffectiveTobacco + n.EffectiveExoticFruit + n.EffectiveCocoa;
    n.LuxuryConsumablesDemand = (n.AverageExpectedSol - 1) * n.Population / 1000 * 0.025;
    n.TeaDemand = n.LuxuryConsumablesDemand * 0.2;
    n.CoffeeDemand = n.LuxuryConsumablesDemand * 0.2;
    n.TobaccoDemand = n.LuxuryConsumablesDemand * 0.2;
    n.ExoticFruitDemand = n.LuxuryConsumablesDemand * 0.2;
    n.CocoaDemand = n.LuxuryConsumablesDemand * 0.2;

    n.FoodAdditions = n.EffectiveSugar + n.EffectiveSpice;
    n.FoodAdditionsDemand = (n.AverageExpectedSol < 1 ? n.AverageExpectedSol * n.Population / 1000 * 0.1 : n.Population / 1000 * 0.1 + (n.AverageExpectedSol - 1) * 1.5 * n.Population / 1000 * 1) / 200;
    n.SugarDemand = n.FoodAdditionsDemand * 0.45;
    n.SpiceDemand = n.FoodAdditionsDemand * 0.55;
    n.FoodAdditionsFoodBoost =  1 + (n.FoodAdditions / (n.Population / 2000000)) / 100;

    n.BasicToolsDemand = (n.Production * (n.ProductionSectors.AerospaceSector / n.TotalSupply) + n.Production * (n.ProductionSectors.AutomotiveSector / n.TotalSupply) + n.Production * (n.ProductionSectors.ElectronicsSector / n.TotalSupply) + n.Production * (n.ProductionSectors.ChemicalSector / n.TotalSupply) / 4 + n.Production * (n.ProductionSectors.HeavyIndustrySector / n.TotalSupply) / 10 + n.Production * (n.ProductionSectors.LuxuryGoodsSector / n.TotalSupply) / 4 + n.Production * (n.ProductionSectors.BasicGoodsSector / n.TotalSupply) / 4 + n.Production * (n.ProductionSectors.ShipBuildingSector / n.TotalSupply) + n.Production * (n.ProductionSectors.TextilesSector / n.TotalSupply) / 4 + n.Production * (n.ProductionSectors.HeavyArmamentsSector / n.TotalSupply) / 4 + n.Production * (n.ProductionSectors.BasicArmamentsSector / n.TotalSupply) / 4 + n.Production * (n.ProductionSectors.ConstructionSector / n.TotalSupply)) / n.ProductionEfficiency + (n.AverageExpectedSol < 1 ? n.AverageExpectedSol * 0.5 * n.Population / 1000 : 0.5 * n.Population / 1000) / 200;
    n.HousingDemand = (n.AverageExpectedSol < 1 ? n.AverageExpectedSol * 0.5 * n.Population / 1000 : 0.5 * n.Population / 1000 + (n.AverageExpectedSol - 1) * n.Population / 1000) / 200;
    n.BasicArmamentsDemand = 0; // define once weapon stockpile implemented
    n.HeavyArmamentsDemand = 0; // define once weapon stockpile implemented
    n.TextilesDemand = (n.Production * (n.ProductionSectors.BasicGoodsSector / n.TotalSupply) / 2 + n.Production * (n.ProductionSectors.ShipBuildingSector / n.TotalSupply) / 2) / n.ProductionEfficiency + (n.AverageExpectedSol < 1 ? n.AverageExpectedSol * 0.5 * n.Population / 1000 : 0.5 * n.Population / 1000 + (n.AverageExpectedSol - 1) * n.Population / 1000) / 200;
    n.ShipBuildingDemand = n.CoastalLandPercent * n.Population / 100000 + n.NavyUpkeep / 100 * gameStats.TimeDivide;
    n.BasicGoodsDemand = (n.AverageExpectedSol < 1 ? n.AverageExpectedSol * n.Population / 1000 : n.Population / 1000 + (n.AverageExpectedSol - 1) * 1.5 * n.Population / 1000) / 200;
    n.LuxuryGoodsDemand = (n.AverageExpectedSol - 1) * n.Population / 1000 / 200;
    n.AlcoholDemand = (n.AverageExpectedSol < 1 ? n.AverageExpectedSol * n.Population / 1000 : n.Population / 1000 + (n.AverageExpectedSol - 1) * 2 * n.Population / 1000) / 200;
    n.HeavyIndustryDemand = 0; // define once we reach Industrial Revolution
    n.ChemicalsDemand = 0; // define once we reach Industrial Revolution
    n.ElectronicsDemand = 0; // define once we reach Industrial Revolution
    n.MotorsDemand = 0; // define once we reach Industrial Revolution
    n.PlanesDemand = 0; // define once we reach Industrial Revolution

    n.NaturalFabrics = n.EffectiveWool + n.EffectiveCotton;
    n.LuxuryNaturalFabrics = n.EffectiveFur + n.EffectiveSilk;
    n.ValuableMaterials = n.EffectiveDiamond + n.EffectiveGold + n.EffectiveSilver + n.EffectiveCopper + n.EffectiveIvory;

    n.IronShortage = min(1, max(0, 1 - (n.EffectiveIron / (n.IronDemand * 0.9))));
    n.SulphurShortage = min(1, max(0, 1 - (n.EffectiveSulphur / (n.SulphurDemand * 0.9))));
    n.CoalShortage = min(1, max(0, 1 - (n.EffectiveCoal / (n.CoalDemand * 0.9))));
    n.WoodShortage = min(1, max(0, 1 - (n.EffectiveWood / (n.WoodDemand * 0.9))));
    n.FoodShortage = min(1, max(0, 1 - ((n.Food + n.DailyFood) / n.FoodDemand)));
    n.NaturalFabricsShortage = min(1, max(0, 1 - (n.NaturalFabrics / (n.NaturalFabricsDemand * 0.9))));
    n.LuxuryNaturalFabricsShortage = min(1, max(0, 1 - (n.LuxuryNaturalFabrics / (n.LuxuryNaturalFabricsDemand * 0.9))));
    n.ValuableMaterialsShortage = min(1, max(0, 1 - (n.ValuableMaterials / (n.ValuableMaterialsDemand * 0.9))));

    n.TotalSupply = n.ProductionSectors.ConstructionSector + n.ProductionSectors.BasicArmamentsSector + n.ProductionSectors.HeavyArmamentsSector + n.ProductionSectors.ShipBuildingSector + n.ProductionSectors.BasicToolsSector + n.ProductionSectors.TextilesSector + n.ProductionSectors.BasicGoodsSector + n.ProductionSectors.LuxuryGoodsSector + n.ProductionSectors.AlcoholSector + n.ProductionSectors.ChemicalSector + n.ProductionSectors.ElectronicsSector + n.ProductionSectors.AutomotiveSector + n.ProductionSectors.AerospaceSector + n.ProductionSectors.HeavyIndustrySector;

    n.BasicTools = n.Production * (n.ProductionSectors.BasicToolsSector / n.TotalSupply) * (1.1 - n.WoodShortage) * (1.1 - n.IronShortage) * (1.1 - n.CoalShortage) * n.ToolWorkingEfficiency;
    n.EffectiveBasicTools = n.BasicTools + n.BasicToolsIncoming - n.BasicToolsOutgoing;
    n.BasicToolsShortage = min(1, max(0, 1 - (n.EffectiveBasicTools / (n.BasicToolsDemand * 0.9))));

    n.Housing = n.Production * (n.ProductionSectors.ConstructionSector / n.TotalSupply) * (1.1 - n.BasicToolsShortage) * (1.1 - n.WoodShortage);
    n.EffectiveHousing = n.Housing + n.HousingIncoming - n.HousingOutgoing;
    n.HousingShortage = min(1, max(0, 1 - (n.EffectiveHousing / (n.HousingDemand * 0.9))));

    n.BasicArmaments = n.Production * (n.ProductionSectors.BasicArmamentsSector / n.TotalSupply) * (1.1 - n.BasicToolsShortage) * (1.1 - n.WoodShortage) * (1.1 - n.IronShortage) * (1.1 - n.CoalShortage) * n.WeaponWorkingEfficiency;
    n.EffectiveBasicArmaments = n.BasicArmaments + n.BasicArmamentsIncoming - n.BasicArmamentsOutgoing;
    n.BasicArmamentsShortage = min(1, max(0, 1 - (n.EffectiveBasicArmaments / (n.BasicArmamentsDemand * 0.9))));

    n.HeavyArmaments = n.Production * (n.ProductionSectors.HeavyArmamentsSector / n.TotalSupply) * (1.1 - n.BasicToolsShortage) * (1.1 - n.IronShortage) * (1.1 - n.CoalShortage) * (1 + n.MetalWorkingEfficiency);
    n.EffectiveHeavyArmaments = n.HeavyArmaments + n.HeavyArmamentsIncoming - n.HeavyArmamentsOutgoing;
    n.HeavyArmamentsShortage = min(1, max(0, 1 - (n.EffectiveHeavyArmaments / (n.HeavyArmamentsDemand * 0.9))));

    n.Textiles = n.Production * (n.ProductionSectors.TextilesSector / n.TotalSupply) * (1.1 - n.BasicToolsShortage) * (1.1 - n.NaturalFabricsShortage) * n.WeavingEfficiency;
    n.EffectiveTextiles = n.Textiles + n.TextilesIncoming - n.TextilesOutgoing;
    n.TextilesShortage = min(1, max(0, 1 - (n.EffectiveTextiles / (n.TextilesDemand * 0.9))));

    n.ShipBuilding = n.Production * (n.ProductionSectors.ShipBuildingSector / n.TotalSupply) * (1.1 - n.BasicToolsShortage) * (1.1 - n.WoodShortage) * (1.1 - n.IronShortage) * (1.1 - n.TextilesShortage) * n.ShipBuildingEfficiency;
    n.EffectiveShipBuilding = n.ShipBuilding + n.ShipBuildingIncoming - n.ShipBuildingOutgoing;
    n.ShipBuildingShortage = min(1, max(0, 1 - (n.EffectiveShipBuilding / (n.ShipBuildingDemand * 0.9))));

    n.BasicGoods = n.Production * (n.ProductionSectors.BasicGoodsSector / n.TotalSupply) * (1.1 - n.BasicToolsShortage) * (1 - n.WoodShortage / 4) * (1 - n.TextilesShortage / 3);
    n.EffectiveBasicGoods = n.BasicGoods + n.BasicGoodsIncoming - n.BasicGoodsOutgoing;
    n.BasicGoodsShortage = min(1, max(0, 1 - (n.EffectiveBasicGoods / (n.BasicGoodsDemand * 0.9))));

    n.LuxuryGoods = n.Production * (n.ProductionSectors.LuxuryGoodsSector / n.TotalSupply) * (1.1 - n.BasicToolsShortage) * (1 - n.WoodShortage / 4) * (1 - n.IronShortage / 4) * (1 - n.LuxuryNaturalFabricsShortage / 4) * (1 - n.ValuableMaterialsShortage / 4);
    n.EffectiveLuxuryGoods = n.LuxuryGoods + n.LuxuryGoodsIncoming - n.LuxuryGoodsOutgoing;
    n.LuxuryGoodsShortage = min(1, max(0, 1 - (n.EffectiveLuxuryGoods / (n.LuxuryGoodsDemand * 0.9))));

    n.Alcohol = n.Production * (n.ProductionSectors.AlcoholSector / n.TotalSupply) * (1.1 - n.FoodShortage);
    n.EffectiveAlcohol = n.Alcohol + n.AlcoholIncoming - n.AlcoholOutgoing;
    n.AlcoholShortage = min(1, max(0, 1 - (n.EffectiveAlcohol / (n.AlcoholDemand * 0.9))));

    n.HeavyIndustry = n.Production * (n.ProductionSectors.HeavyIndustrySector / n.TotalSupply) * (1.1 - n.BasicToolsShortage) * (1.1 - n.IronShortage) * (1.1 - n.CoalShortage) * (1 + n.MetalWorkingEfficiency);
    n.EffectiveHeavyIndustry = n.HeavyIndustry + n.HeavyIndustryIncoming - n.HeavyIndustryOutgoing;
    n.HeavyIndustryShortage = (n.HeavyIndustryDemand == 0 ? 0 : min(1, max(0, 1 - (n.EffectiveHeavyIndustry / (n.HeavyIndustryDemand * 0.9)))));

    n.Chemicals = n.Production * (n.ProductionSectors.ChemicalSector / n.TotalSupply) * (1.1 - n.BasicToolsShortage);
    n.EffectiveChemicals = n.Chemicals + n.ChemicalsIncoming - n.ChemicalsOutgoing;
    n.ChemicalsShortage = (n.ChemicalsDemand == 0 ? 0 : min(1, max(0, 1 - (n.EffectiveChemicals / (n.ChemicalsDemand * 0.9)))));

    n.Electronics = n.Production * (n.ProductionSectors.ElectronicsSector / n.TotalSupply) * (1.1 - n.BasicToolsShortage);
    n.EffectiveElectronics = n.Electronics + n.ElectronicsIncoming - n.ElectronicsOutgoing;
    n.ElectronicsShortage = (n.ElectronicsDemand == 0 ? 0 : min(1, max(0, 1 - (n.EffectiveElectronics / (n.ElectronicsDemand * 0.9)))));

    n.Motors = n.Production * (n.ProductionSectors.AutomotiveSector / n.TotalSupply) * (1.1 - n.BasicToolsShortage) * (1.1 - n.HeavyIndustryShortage);
    n.EffectiveMotors = n.Motors + n.MotorsIncoming - n.MotorsOutgoing;
    n.MotorsShortage = (n.MotorsDemand == 0 ? 0 : min(1, max(0, 1 - (n.EffectiveMotors / (n.MotorsDemand * 0.9)))));

    n.Planes = n.Production * (n.ProductionSectors.AerospaceSector / n.TotalSupply) * (1.1 - n.BasicToolsShortage) * (1.1 - n.HeavyIndustryShortage);
    n.EffectivePlanes = n.Planes + n.PlanesIncoming - n.PlanesOutgoing;
    n.PlanesShortage = (n.PlanesDemand == 0 ? 0 : min(1, max(0, 1 - (n.EffectivePlanes / (n.PlanesDemand * 0.9)))));

    // resource base values
    n.WoodBaseValue = 0.75;
    n.SulphurBaseValue = 1;
    n.CoalBaseValue = 1.25;
    n.CottonBaseValue = 1.75;
    n.GoldBaseValue = 6;
    n.IronBaseValue = 1.75;
    n.TeaBaseValue = 2.5;
    n.SilkBaseValue = 4;
    n.SpiceBaseValue = 2.5;
    n.WoolBaseValue = 1;
    n.CoffeeBaseValue = 2;
    n.FurBaseValue = 3.5;
    n.DiamondBaseValue = 7.5;
    n.SilverBaseValue = 4;
    n.CopperBaseValue = 1.5;
    n.IvoryBaseValue = 4;
    n.CocoaBaseValue = 2.25;
    n.TobaccoBaseValue = 2;
    n.SugarBaseValue = 2.75;
    n.ExoticFruitBaseValue = 2;
    
    n.HousingBaseValue = 2;
    n.TextilesBaseValue = 1.5;
    n.BasicGoodsBaseValue = 1;
    n.LuxuryGoodsBaseValue = 2;
    n.AlcoholBaseValue = 1;
    n.BasicToolsBaseValue = 1;
    n.HeavyIndustryBaseValue = 5;
    n.BasicArmamentsBaseValue = 2;
    n.HeavyArmamentsBaseValue = 5;
    n.ShipBuildingBaseValue = 10;
    n.ChemicalsBaseValue = 5;
    n.MotorsBaseValue = 7.5;
    n.PlanesBaseValue = 10;
    n.ElectronicsBaseValue = 10; 

    // resource and goods values
    for (const resourceIndex in gameStats.ResourceTypes) {
      const resource = gameStats.ResourceTypes[resourceIndex];
      n[resource + "Value"] = n[resource + "Demand"] / (isNaN(n["Effective" + resource]) ? 1 : (n["Effective" + resource] == 0 ? 1 : n["Effective" + resource])) * n[resource + "BaseValue"];
    }

    n.LuxuryConsumablesValue = n.LuxuryConsumablesDemand / (n.LuxuryConsumables + 0.1);
    n.FoodAdditionsValue = n.FoodAdditionsDemand / (n.FoodAdditions + 0.1);

    n.FoodValue = n.FoodDemand / ((n.Food + n.DailyFood) * n.FoodAdditionsFoodBoost);

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
          lazyerror(`something went wrong. Tried to multiply ${n[resource + "Outgoing"]} (${n.nationName ?? nationName}.${resource}Incoming) with ${n[resource + "Value"]} (${n.nationName ?? nationName}.${resource}Value).\nThe following stats are NaN currently: \n\n${allNaNStats}`);
          return 0;
        }
      }
      return num;
    })();

    n.ResourceTrade = (function () {
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
        stp += gameStats.TradeZones[region].Score * percent;
      }
      return stp;
      })();

    n.MaxFoodStock = (function () {
      return max(100, 1000 * n.Population / 10000000) * n.StockingCapabilities;
    })();
    n.FutureFood = min(n.MaxFoodStock, n.Food + n.FoodGain);
      n.FoodPopulationBoost = (function () {
          return n.Food > n.MaxFoodStock * 0.75 ? (n.Food * 200) / n.Population : 0;
    })();
    n.SurplusFood = (function () {
      return n.FoodGain + n.Food > n.MaxFoodStock ? n.FoodGain + n.Food - n.MaxFoodStock : 0;
    })();

    
    n.SellingCapability = (n.LocalTrade / 2 + pseudoTradePower / 5) * n.TradeImprovements * 200;
    n.FoodSold = min(n.SellingCapability, n.SurplusFood);
    n.Foodlost = n.SurplusFood - n.FoodSold;
    n.FoodTradeProfit = n.FoodSold * n.FoodValue;

    n.TradeProtection = (n.LightShips * 2 + n.MediumShips * 3.5 + n.HeavyShips * 2) / n.MerchantShips;
    n.MerchantShipsFullfilment = min(n.MerchantShips / (n.ResourceTrade + pseudoTradePower / 2 + (n.LocalTrade * n.Population / 2000000 * (1 + n.AverageDevelopment) + n.FoodTradeProfit) / 4), 1);
    n.TradeEfficiency = (1 * n.TradeImprovements + n.Technologies.Cranes / 10 + n.Technologies.PromissoryNotes / 20 + n.TradeProtection + n.Technologies.Fluyt / 5) * (1 - n.Blockade) * max(n.MerchantShipsFullfilment, 0.1);

      n.ExternalTrade = n.TradePowerFromResourceTrade - n.OutgoingTradePowerFromResourceTrade + pseudoTradePower * n.TradeEfficiency;
      n.InternalTrade = (n.LocalTrade * n.Population / 2000000 * (1 + n.AverageDevelopment)) * n.TradeEfficiency + n.FoodTradeProfit;
      n.TradePower = n.ExternalTrade + n.InternalTrade;

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
    
    n.IrregularQuality = (n.OverallImprovements + n.IrregularImprovements + n.Technologies.Metallurgy / 10 - n.Corruption / 5) * (1 - n.IronShortage);
    n.MeleeQuality = (n.OverallImprovements + n.MeleeImprovements + n.Technologies.PlateArmour / 5 + n.Technologies.StandardizedPikes / 10 + n.Technologies.Metallurgy / 10 - n.Corruption / 5) * (1 - n.IronShortage);
    n.RangedQuality = (n.OverallImprovements + n.RangedImprovements + n.Technologies.Metallurgy / 10 - n.Corruption / 5) * (1 - n.IronShortage);
    n.CavalryQuality = (n.OverallImprovements + n.CavalryImprovements + n.Technologies.SaddleAndStirrup / 5 + n.Technologies.PlateArmour / 5 + n.Technologies.Reiters / 10 + n.Technologies.Metallurgy / 10 - n.Corruption / 5) * (1 - n.IronShortage) * (n.Technologies.Reiters == 1 ? (1 - n.SulphurShortage) : 1);
    n.FirearmQuality = (n.OverallImprovements + n.FirearmImprovements + n.Technologies.Matchlock / 5 + n.Technologies.SocketBayonet / 5 + n.Technologies.Flintlock / 5 + n.Technologies.Metallurgy / 10 + n.Technologies.Bayonet / 20 - n.Corruption / 5) * (1 - n.IronShortage) * (1 - n.SulphurShortage);
    n.SiegeQuality = (n.OverallImprovements + n.SiegeImprovements + n.Technologies.Metallurgy / 10 - n.Corruption / 5) * (1 - n.IronShortage);
    n.ArtilleryQuality = (n.OverallImprovements + n.ArtilleryImprovements + n.Technologies.Limber / 5 + n.Technologies.Mortars / 5 + n.Technologies.Metallurgy / 10 - n.Corruption / 5) * (1 - n.IronShortage) * (1 - n.SulphurShortage);

    n.SocietalClasses.High = n.Workforces.Aristocracy + n.Workforces.Burgousie;
    n.SocietalClasses.Medium = (n.Reforms.SerfdomAllowed ? n.Workforces.Farmers : 0) + n.Workforces.Townsfolk + n.Workforces.Clergy + n.Workforces.Merchants + n.Workforces.Intellectuals + n.Workforces.Bureaucrats;
    n.SocietalClasses.Lower = (n.Reforms.SerfdomBanned ? n.Workforces.Farmers : 0) + n.Workforces.PopulationInMilitary + n.Workforces.Sailors + n.Workforces.Serfs + n.Workforces.Labourers;
    n.SocietalClasses.Slaves = n.Workforces.Slaves;
    
    n.InterestRate = 0.05 + n.PublicDebtLength * 0.02 / gameStats.TimeDivide;
    n.EffectiveDebt = n.PublicDebtTaken * (1 + n.InterestRate);
    n.PossiblePublicDebt = max(0, n.Population / 10000 * (1 - (n.HighClassTax + n.MediumClassTax + n.LowerClassTax) / 3) - n.EffectiveDebt);
    n.DebtHappinessEffect = (n.PublicDebtLength > 1 ? n.EffectiveDebt / (n.PossiblePublicDebt + n.PublicDebtTaken) * (2 + n.PublicDebtLength) : 0);
    n.WarExhaustion = (n.Casualties / n.Population * 500) + (n.Pillaging * 20) + (n.Occupation * 5);
    n.Absolutism = n.GovernmentRepresentation.UnitaryRepresentation / 10;

    n.EffectiveHealth = n.Health / 20 + (n.Technologies.HumanAnatomy ? 0.15 : 0) + (n.CulturalAdvancements.PotatoPopulationBoom == true ? 0.2 : 0);

    n.Disease = n.PopulationDensityPerKmSquared / 25 - n.EffectiveHealth;
    n.UnderPopulation = n.Disease < 0.5 ? (1 - n.Disease) / 10 : 0;

    n.PopulationHappiness = (50 + n.ResourceHappinessBoost) * n.Prosperity / 10 - (n.LowerClassTax * n.SocietalClasses.Lower + n.MediumClassTax * n.SocietalClasses.Medium + n.SocietalClasses.High * n.HighClassTax) * 100 / 4 - n.Absolutism / 2 - n.PopulationControl +
      (n.TradeImprovements > 1 ? (-n.TradeImprovements + 1) * 2.5 : 0) + (n.EffectiveDebt > 0 && n.Budget < 0 ? - (n.EffectiveDebt / n.PossiblePublicDebt) * 10 : 0) - n.WarExhaustion / 2 - n.DebtHappinessEffect + (n.Disease > 0.10 ? - n.Disease / 4 : 0);
    n.LandAdministration = ((n.Size - n.DetachedLand) / 25000 + n.DetachedLand / 10000) * (1 - n.AdministrativeEfficiency / 1000);
    n.Overextension = n.UnderPopulation / 4 + n.LandAdministration / 1.5;


    //loyalty
    
    n.PopulationStabilityImpact = (n.Population > n.AdministrativeEfficiency * 500000 * (n.CulturalAdvancements.Constitution == true ? 1.5 : 1) ? (n.AdministrativeEfficiency * 500000 * (n.CulturalAdvancements.Constitution == true ? 1.5 : 1) - n.Population) / 50000000 : 0) * 10;
    n.Fervor = clamp(1, -1, 0 + n.MinorBattles / 20 + n.MajorBattles / 10 + n.Pillaging - (n.Casualties / (n.OverallNumbers + n.Casualties + 0.0000001)));
    n.WarSupport = clamp(1, 0, n.PopulationHappiness / 10 * 2.5 + n.Propaganda / 10 * (1 + n.CulturalAdvancements.Newspapers / 2) + n.Fervor);
    let WarStatus = n.AtWar;
    if(WarStatus == false) WarStatus = "false";
    WarStatus = WarStatus.toLowerCase();
    let WarStabilityModifier = ((WarStatus == 'offensive' && n.WarSupport < 0.75) ? (n.WarSupport - 0.75) / 10 : 0) + max(-0.075, ((WarStatus == 'defensive' && n.WarSupport < 0.4 && n.Fervor < 0) ? (n.Fervor) / 10 : 0));
    
    n.MilitaryMorale = clamp(0, 1.5, 
      1 + n.Fervor + (n.MilitaryDiscipline > 1 ? - n.MilitaryDiscipline + 1 : 0) * 2 +
    (n.WarSupport < 0.5 ? n.WarSupport - 0.5 : 0) +
    (n.WarSupport > 0.75 ? n.WarSupport - 0.75 : 0) +
    n.ArmyWages - 1);

    n.ArmyUpkeep = n.UnitUpkeep * (1 + n.ArmyWages - 1) / gameStats.TimeDivide;
    
    n.MilitaryLoyalty = clamp(1, 0, 
      1 * n.ArmyWages +
      (n.CulturalAdvancements.EarlyModernAdministration == false && n.AristocratLoyalty < 0.50 ?
        ( n.AristocratLoyalty - 0.50) * 2 : 0) +
      (n.MilitaryMorale < 0.70 ?
        -(1 - n.MilitaryMorale) / 2 :
        0) +
      (n.Budget < 0 ? n.Budget / n.ArmyUpkeep :
        0)
      - n.CommanderFreedom / 10);
    n.Stability = n.PopulationHappiness + n.AdministrativeEfficiency / 10 - n.Overextension - n.CulturalDisunity - n.ReligiousDisunity + (n.Propaganda / 1.75 * (1 + n.CulturalAdvancements.Newspapers / 2)) + n.PopulationControl + (n.AristocratLoyalty - 0.5) * 10 + (n.ClergyLoyalty - 0.5) * 7.5 + (n.BurgousieLoyalty - 0.5) * 7.5 + n.PopulationStabilityImpact + WarStabilityModifier * 100 + (n.MilitaryLoyalty - 1) * 7.5;

      n.Corruption = (n.Stability < 1 ? 0.5 : 0) + (n.Stability < -1 ? 0.5 : 0) + n.AdministrativeStrain / n.AdministrativePower * 10 + n.Absolutism / 3;

      let PopulationGrowthModifier = n.FoodPopulationBoost + (n.Prosperity - 1) / 10 + n.UnderPopulation;

      n.PseudoPopulationGrowth = (n.FutureFood < 0 ? n.FutureFood * 1000 / n.Population : (0.1 + PopulationGrowthModifier + n.ResourcePopulationGrowthBoost) - n.BirthControl / 20)

      n.PopulationGrowth = (n.FutureFood < 0 ? n.FutureFood * 1000 / n.Population : (0.1 + PopulationGrowthModifier + n.ResourcePopulationGrowthBoost) * (1 - n.Disease) - n.BirthControl / 20);

      n.FuturePopulation = (function () {
          return n.Population + n.Population * n.PopulationGrowth / gameStats.TimeDivide;
      })();

    n.FutureLiteracyPercent = ((n.LiteracyPercent > n.EducationEfficiency * 3) ? n.EducationEfficiency * 3 : n.LiteracyPercent) + n.EducationEfficiency / 10 / gameStats.TimeDivide;
    n.FutureHigherEducation = n.HigherEducation + (n.EducationEfficiency >= 3 ? n.EducationEfficiency / 30 : 0) + (n.HigherEducation > n.EducationEfficiency / 3 ? -0.25 : 0);


    n.NewTroopRecruitmentPenalty = (function () {
      let ntrp = 0;
      for (const unitName in gameStats.UnitUpkeepCosts) {
        const cost = gameStats.UnitUpkeepCosts[unitName];
        ntrp += n["New_" + unitName] * cost * n[unitType(unitName) + 'QualityIC'];
      }
      ntrp += n.New_MerchantShips * n.UpkeepForOneMerchantShip;
      ntrp += n.New_LightShips * n.UpkeepForOneLightShip;
      ntrp += n.New_MediumShips * n.UpkeepForOneMediumShip;
      ntrp += n.New_HeavyShips * n.UpkeepForOneHeavyShip;

      ntrp /= 2;
      return ntrp;
    })();
    
    function unitType(unitName) {
      if(~[
        "Levies",
        "Militia"
      ].indexOf(unitName)) return "Irregular";
      else if(~[
        "Archers",
        "Crossbowmen"
      ].indexOf(unitName)) return "Ranged";
      else if(~[
        "HandCannoneers",
        "Musketeers",
        "MusketMilitia",
        "Riflemen"
      ].indexOf(unitName)) return "Firearm";
      else if(~[
        "LightCavalry",
        "HeavyCavalry",
        "EliteCavalry"
      ].indexOf(unitName)) return "Cavalry";
      else if(~[
        "SiegeEquipment",
        "LargeSiegeEquipment"
      ].indexOf(unitName)) return "Siege";
      else if(~[
        "FieldCannons",
      "RegimentalGuns",
      "SiegeGuns"
      ].indexOf(unitName)) return "Artillery";
      
      //default
      return "Melee"
    }

    n.Inflation = max(0, (n.Budget / 1000) / (n.AdministrativeEfficiency / 10));
    n.ResourceBudgetBoost = (function () {
      let rbb = 0;
      let budgetBoostingResources = [
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

        rbb += min(n["Effective" + resource], n[resource + "Demand"]) * n[resource + "Value"];
      }
      return (rbb * 10);
    })();

    n.ResourceBudgetBoost += n.OutgoingTradePowerFromResourceTrade;

    n.AristocratInfluenceMod = 1 + n.Reforms.SlaveryAllowed / 10 + n.Reforms.SerfdomAllowed / 5 + n.Reforms.Enclosure / 10 + n.Reforms.HighClassVoting / 5 + n.Reforms.WealthVoting / 10 + n.Reforms.NoblePrivellege / 5 + n.Reforms.WealthPrivellege / 10 + n.Reforms.NobleOfficers / 5 + n.Reforms.WealthyOfficers / 10 + n.Reforms.NobleBureaucrats / 5 + n.Reforms.WealthyBureaucrats / 10 + n.Reforms.NobleResourceOwnership / 5 + n.Reforms.MixedResourceOwnership / 10 + n.Reforms.NobleLandOwnership / 5 + n.Reforms.MixedLandOwnership / 10;
    n.BurgousieInfluenceMod = 1 + n.Reforms.SlaveryAllowed / 10 + n.Reforms.Enclosure / 5 + n.Reforms.WealthVoting / 10 + n.Reforms.WealthPrivellege / 10 + n.Reforms.WealthyOfficers / 10 + n.Reforms.WealthyBureaucrats / 10 + n.Reforms.BurgousieResourceOwnership / 5 + n.Reforms.MixedResourceOwnership / 10 + n.Reforms.PrivateLandOwnership / 5 + n.Reforms.MixedLandOwnership / 10 + n.Reforms.Guilds / 5 + n.Reforms.GuildsBanned / 10;
    n.ClergyInfluenceMod = 1 + n.ReligiousFervor / 10 + n.Reforms.WealthVoting / 10 + n.Reforms.WealthPrivellege / 10 + n.Reforms.WealthyOfficers / 10 + n.Reforms.WealthyBureaucrats / 10;
    n.UrbanInfluenceMod = 1 + n.Reforms.Enclosure / 10 + n.Reforms.GuildsBanned / 10 + n.Reforms.AntiMonopolyLaws / 5 + n.Reforms.WealthVoting / 20 + n.Reforms.WealthPrivellege / 20 + n.Reforms.WealthyOfficers / 20 + n.Reforms.WealthyBureaucrats / 20;
    n.BureaucratInfluenceMod = 1 + n.Reforms.MeritocraticBureaucrats / 10 + n.Reforms.GovernmentResourceOwnership / 4 + n.Reforms.GovernmentResourceOwnership / 4;
    n.IntellectualsInfluenceMod = 1 + n.Reforms.MeritocraticBureaucrats / 5 + n.Reforms.MeritocraticOfficers / 5;
    n.MilitaryInfluenceMod = 1 + n.Reforms.MeritocraticOfficers / 10 + n.Reforms.ProffesionalReservists / 10 + n.Reforms.GovernmentResourceOwnership / 5 + n.Reforms.GovernmentResourceOwnership / 5;
    n.WorkersInfluenceMod = 1 + n.Reforms.OpenFieldSystem / 5 + n.Reforms.SlaveryBanned / 10 + n.Reforms.SerfdomBanned / 5 + n.Reforms.NationalMilitia / 10;

    n.TotalInfluences = n.EstateInfluences.AristocratInfluence * n.AristocratInfluenceMod + n.EstateInfluences.ClergyInfluence * n.ClergyInfluenceMod + n.EstateInfluences.BurgousieInfluence * n.BurgousieInfluenceMod + n.EstateInfluences.UrbanInfluence * n.UrbanInfluenceMod + n.EstateInfluences.BureaucratInfluence * n.BureaucratInfluenceMod + n.EstateInfluences.IntellectualsInfluence * n.IntellectualsInfluenceMod + n.EstateInfluences.MilitaryInfluence * n.MilitaryInfluenceMod + n.EstateInfluences.WorkersInfluence * n.WorkersInfluenceMod;

    n.EstateInfluencesReal = {
      AristocratInfluence: n.EstateInfluences.AristocratInfluence * n.AristocratInfluenceMod / n.TotalInfluences,
      ClergyInfluence: n.EstateInfluences.ClergyInfluence * n.ClergyInfluenceMod / n.TotalInfluences,
      BurgousieInfluence: n.EstateInfluences.BurgousieInfluence * n.BurgousieInfluenceMod / n.TotalInfluences,
      UrbanInfluence: n.EstateInfluences.UrbanInfluence * n.UrbanInfluenceMod / n.TotalInfluences,
      BureaucratInfluence: n.EstateInfluences.BureaucratInfluence * n.BureaucratInfluenceMod / n.TotalInfluences,
      IntellectualsInfluence: n.EstateInfluences.IntellectualsInfluence * n.IntellectualsInfluenceMod / n.TotalInfluences,
      MilitaryInfluence: n.EstateInfluences.MilitaryInfluence * n.MilitaryInfluenceMod / n.TotalInfluences,
      WorkersInfluence: n.EstateInfluences.WorkersInfluence * n.WorkersInfluenceMod / n.TotalInfluences
    };

      n.ResourceOwners = (n.Reforms.NobleResourceOwnership == 1 ? n.Workforces.Aristocracy : 0) + (n.Reforms.MixedResourceOwnership == 1 ? n.Workforces.Aristocracy + n.Workforces.Burgousie : 0) + (n.Reforms.BurgousieResourceOwnership == 1 ? n.Workforces.Burgousie : 0)
      n.ResourceOwnersInfluence = (n.Reforms.NobleResourceOwnership == 1 ? n.EstateInfluencesReal.AristocratInfluence : 0) + (n.Reforms.MixedResourceOwnership == 1 ? (n.EstateInfluencesReal.AristocratInfluence + n.EstateInfluencesReal.BurgousieInfluence) / 2 : 0) + (n.Reforms.BurgousieResourceOwnership == 1 ? n.EstateInfluencesReal.BurgousieInfluence : 0)

      n.LandOwners = (n.Reforms.NobleLandOwnership == 1 ? n.Workforces.Aristocracy : 0) + (n.Reforms.MixedLandOwnership == 1 ? n.Workforces.Aristocracy + n.Workforces.Burgousie : 0) + (n.Reforms.PrivateLandOwnership == 1 ? n.Workforces.Burgousie : 0)
      n.LandOwnersInfluence = (n.Reforms.NobleLandOwnership == 1 ? n.EstateInfluencesReal.AristocratInfluence : 0) + (n.Reforms.MixedLandOwnership == 1 ? (n.EstateInfluencesReal.AristocratInfluence + n.EstateInfluencesReal.BurgousieInfluence) / 2 : 0) + (n.Reforms.PrivateLandOwnership == 1 ? n.EstateInfluencesReal.BurgousieInfluence : 0)

      n.SlavesWage = (n.Workforces.Slaves > 0 ? n.ResourceBudgetBoost / (n.Population / 1000 * n.Workforces.Slaves) * 0.1 : 0);
      n.LabourersWage = (n.Workforces.Labourers > 0 ? n.ResourceBudgetBoost / (n.Population / 1000 * n.Workforces.Labourers) * (1 - n.ResourceOwnersInfluence) : 0);
          n.SlavesAndLabourersWageToOwner = n.Population * n.Workforces.Slaves / 1000 * n.SlavesWage / 0.1 * 0.9 + n.Workforces.Labourers / 1000 * n.LabourersWage / (1 - n.ResourceOwnersInfluence) * n.ResourceOwnersInfluence;
      n.SerfsWage = n.FoodValue * n.FarmingEfficiency * 0.25;
      n.FarmersWage = n.FoodValue * n.FarmingEfficiency * (1 - n.LandOwnersInfluence);
          n.SerfsAndFarmersWageToOnwers = n.Population * n.Workforces.Serfs / 1000 * n.FoodValue * n.FarmingEfficiency * 0.75 + n.Population * n.Workforces.Farmers / 1000 * n.FoodValue * n.LandOwnersInfluence;
      n.TownsfolkWage = (n.Production * 10 / (n.Population / 1000 * n.Workforces.Townsfolk)) * (1 - n.EstateInfluencesReal.BurgousieInfluence * 2);
          n.TownsfolkWageToBurgousie = n.Population * n.Workforces.Townsfolk / 1000 * n.TownsfolkWage / (1 - n.EstateInfluencesReal.BurgousieInfluence * 2) * n.EstateInfluencesReal.BurgousieInfluence * 2;
      n.ClergyWage = n.Population / (n.Population / 1000 * n.Workforces.Clergy) * n.EstateInfluencesReal.ClergyInfluence / 1000;
      n.BureaucratsWage = n.BureaucratWages * 100 * n.EstateInfluencesReal.BureaucratInfluence;
      n.MerchantsWage = (n.InternalTrade * (1 - n.InternalTariffs) + n.ExternalTrade * (1 - n.ExternalTariffs)) / (n.Population / 1000 * n.Workforces.Merchants) * (1 - n.EstateInfluencesReal.BurgousieInfluence * 2);
          n.MerchantsWageToBurggousie = n.Population * n.Workforces.Merchants / 1000 * n.MerchantsWage / (1 - n.EstateInfluencesReal.BurgousieInfluence * 2) * n.EstateInfluencesReal.BurgousieInfluence * 2;
      n.IntellectualsWage = 60 * n.EstateInfluencesReal.IntellectualsInfluence;
      n.SailorsWage = 1 * n.ArmyWages;
      n.SoldiersWage = 1.5 * n.ArmyWages;
      n.AristocracyWage = (n.Reforms.NobleLandOwnership == 1 ? n.SerfsAndFarmersWageToOnwers / (n.Population * n.Workforces.Aristocracy / 1000) : 0) + (n.Reforms.MixedLandOwnership == 1 ? n.SerfsAndFarmersWageToOnwers / (n.Population * n.Workforces.Aristocracy / 1000) : 0) + (n.Reforms.NobleResourceOwnership == 1 ? n.SlavesAndLabourersWageToOwner / (n.Population * n.Workforces.Aristocracy / 1000) : 0) + (n.Reforms.MixedResourceOwnership == 1 ? n.SlavesAndLabourersWageToOwner / (n.Population * n.Workforces.Aristocracy / 1000) : 0);
      n.BurgousieWage = (n.TownsfolkWageToBurgousie + n.MerchantsWageToBurggousie) / (n.Population * n.Workforces.Burgousie / 1000) + (n.Reforms.MixedResourceOwnership == 1 ? n.SlavesAndLabourersWageToOwner / (n.Population * n.Workforces.Aristocracy / 1000) : 0) + (n.Reforms.BurgousieResourceOwnership == 1 ? n.SlavesAndLabourersWageToOwner / (n.Population * n.Workforces.Aristocracy / 1000) : 0) + (n.Reforms.MixedLandOwnership == 1 ? n.SerfsAndFarmersWageToOnwers / (n.Population * n.Workforces.Aristocracy / 1000) : 0) + (n.Reforms.PrivateLandOwnership == 1 ? n.SerfsAndFarmersWageToOnwers / (n.Population * n.Workforces.Aristocracy / 1000) : 0);

    n.SlavesEffectiveWage = n.SlavesWage * (1 - n.WorkersTax * n.TaxEfficiency);
    n.LabourersEffectiveWage = n.LabourersWage * (1 - n.WorkersTax * n.TaxEfficiency);
    n.SerfsEffectiveWage = n.SerfsWage * (1 - n.WorkersTax * n.TaxEfficiency);
    n.FarmersEffectiveWage = n.FarmersWage * (1 - n.WorkersTax * n.TaxEfficiency);
    n.TownsfolkEffectiveWage = n.TownsfolkWage * (1 - n.UrbanTax * n.TaxEfficiency);
    n.ClergyEffectiveWage = n.ClergyWage * (1 - n.ClergyTax * n.TaxEfficiency);
    n.BureaucratsEffectiveWage = n.BureaucratsWage * (1 - n.BureaucratTax * n.TaxEfficiency);
    n.MerchantsEffectiveWage = n.MerchantsWage * (1 - n.UrbanTax * n.TaxEfficiency);
    n.IntellectualsEffectiveWage = n.IntellectualsWage * (1 - n.IntellectualsTax * n.TaxEfficiency);
    n.SailorsEffectiveWage = n.SailorsWage * (1 - n.MilitaryTax * n.TaxEfficiency);
    n.SoldiersEffectiveWage = n.SoldiersWage * (1 - n.MilitaryTax * n.TaxEfficiency);
    n.AristocracyEffectiveWage = n.AristocracyWage * (1 - n.AristocratTax * n.TaxEfficiency);
    n.BurgousieEffectiveWage = n.BurgousieWage * (1 - n.BurgousieTax * n.TaxEfficiency);

    n.NecessitiesCost = (0.5 * n.HousingValue + 0.5 * n.TextilesValue + n.BasicGoodsValue + n.AlcoholValue + 0.5 * n.BasicToolsValue) / 200 + (n.CoalValue * 0.005 > n.WoodValue * 0.01 ? 0.01 * n.WoodValue : 0.005 * n.CoalValue) + (n.FoodAdditions > 0 ? 0.1 * n.FoodAdditionsValue + 0.9 * n.FoodValue : n.FoodValue);
    n.LuxuriesCost = (n.HousingValue + n.TextilesValue + 1.5 * n.BasicGoodsValue + n.LuxuryGoodsValue + 2 * n.AlcoholValue) / 200 + (n.CoalValue * 0.01 > n.WoodValue * 0.02 ? n.WoodValue * 0.02 : 0.01 * n.CoalValue) + (n.FoodAdditions > 0 ? n.FoodAdditionsValue + 1.25 * n.FoodValue : 1.75 * n.FoodValue) + (n.LuxuryConsumables > 0 ? 0.025 * n.LuxuryConsumablesValue : 0);

    n.SlavesSol = (n.SlavesEffectiveWage < n.NecessitiesCost ? n.SlavesEffectiveWage / n.NecessitiesCost : 1 + (n.SlavesEffectiveWage - n.NecessitiesCost) / n.LuxuriesCost);
    n.LabourersSol = (n.LabourersEffectiveWage < n.NecessitiesCost ? n.LabourersEffectiveWage / n.NecessitiesCost : 1 + (n.LabourersEffectiveWage - n.NecessitiesCost) / n.LuxuriesCost);
    n.SerfsSol = (n.SerfsEffectiveWage < n.NecessitiesCost ? n.SerfsEffectiveWage / n.NecessitiesCost : 1 + (n.SerfsEffectiveWage - n.NecessitiesCost) / n.LuxuriesCost);
    n.FarmersSol = (n.FarmersEffectiveWage < n.NecessitiesCost ? n.FarmersEffectiveWage / n.NecessitiesCost : 1 + (n.FarmersEffectiveWage - n.NecessitiesCost) / n.LuxuriesCost);
    n.TownsfolkSol = (n.TownsfolkEffectiveWage < n.NecessitiesCost ? n.TownsfolkEffectiveWage / n.NecessitiesCost : 1 + (n.TownsfolkEffectiveWage - n.NecessitiesCost) / n.LuxuriesCost);
    n.ClergySol = (n.ClergyEffectiveWage < n.NecessitiesCost ? n.ClergyEffectiveWage / n.NecessitiesCost : 1 + (n.ClergyEffectiveWage - n.NecessitiesCost) / n.LuxuriesCost);
    n.BureaucratsSol = (n.BureaucratsEffectiveWage < n.NecessitiesCost ? n.BureaucratsEffectiveWage / n.NecessitiesCost : 1 + (n.BureaucratsEffectiveWage - n.NecessitiesCost) / n.LuxuriesCost);
    n.MerchantsSol = (n.MerchantsEffectiveWage < n.NecessitiesCost ? n.MerchantsEffectiveWage / n.NecessitiesCost : 1 + (n.MerchantsEffectiveWage - n.NecessitiesCost) / n.LuxuriesCost);
    n.IntellectualsSol = (n.IntellectualsEffectiveWage < n.NecessitiesCost ? n.IntellectualsEffectiveWage / n.NecessitiesCost : 1 + (n.IntellectualsEffectiveWage - n.NecessitiesCost) / n.LuxuriesCost);
    n.SailorsSol = (n.SailorsEffectiveWage < n.NecessitiesCost ? n.SailorsEffectiveWage / n.NecessitiesCost : 1 + (n.SailorsEffectiveWage - n.NecessitiesCost) / n.LuxuriesCost);
    n.SoldiersSol = (n.SoldiersEffectiveWage < n.NecessitiesCost ? n.SoldiersEffectiveWage / n.NecessitiesCost : 1 + (n.SoldiersEffectiveWage - n.NecessitiesCost) / n.LuxuriesCost);
    n.AristocracySol = (n.AristocracyEffectiveWage < n.NecessitiesCost ? n.AristocracyEffectiveWage / n.NecessitiesCost : 1 + (n.AristocracyEffectiveWage - n.NecessitiesCost) / n.LuxuriesCost);
    n.BurgousieSol = (n.BurgousieEffectiveWage < n.NecessitiesCost ? n.BurgousieEffectiveWage / n.NecessitiesCost : 1 + (n.BurgousieEffectiveWage - n.NecessitiesCost) / n.LuxuriesCost);

    n.AverageSol = (isNaN(n.Workforces.Slaves) ? 0 : n.Workforces.Slaves) * n.SlavesSol + (isNaN(n.Workforces.Labourers) ? 0 : n.Workforces.Labourers) * n.LabourersSol + (isNaN(n.Workforces.Serfs) ? 0 : n.Workforces.Serfs) * n.SerfsSol + (isNaN(n.Workforces.Farmers) ? 0 : n.Workforces.Farmers) * n.FarmersSol + (isNaN(n.Workforces.Townsfolk) ? 0 : n.Workforces.Townsfolk) * n.TownsfolkSol + (isNaN(n.Workforces.Clergy) ? 0 : n.Workforces.Clergy) * n.ClergySol + (isNaN(n.Workforces.Bureaucrats) ? 0 : n.Workforces.Bureaucrats) * n.BureaucratsSol + (isNaN(n.Workforces.Merchants) ? 0 : n.Workforces.Merchants) * n.MerchantsSol + (isNaN(n.Workforces.Intellectuals) ? 0 : n.Workforces.Intellectuals) * n.IntellectualsSol + (isNaN(n.Workforces.Sailors) ? 0 : n.Workforces.Sailors) * n.SailorsSol + (isNaN(n.Workforces.Soldiers) ? 0 : n.Workforces.Soldiers) * n.SoldiersSol + (isNaN(n.Workforces.Aristocracy) ? 0 : n.Workforces.Aristocracy) * n.AristocracySol + (isNaN(n.Workforces.Burgousie) ? 0 : n.Workforces.Burgousie) * n.BurgousieSol;

    //debugger;

      n.TaxEfficiency = (1 - n.EstateInfluencesReal.AristocratInfluence / 4 - n.EstateInfluencesReal.ClergyInfluence / 4 - n.AdministrativeStrain / n.AdministrativePower) * (1 - n.Occupation) * (1 - n.Corruption / 10)
      n.TariffEfficiency = (1 - n.EstateInfluencesReal.BurgousieInfluence / 2 - n.AdministrativeStrain / n.AdministrativePower) * (1 - n.Occupation) * (1 - n.Corruption / 10)

      n.SlavesTaxes = 0;
    n.LabourersTaxes = n.LabourersWage * n.Workforces.Labourers * n.Population / 1000 * n.WorkersTax * n.TaxEfficiency * (1 - n.EstateInfluencesReal.WorkersInfluence);
    n.SerfsTaxes = n.SerfsWage * n.Workforces.Serfs * n.Population / 1000 * n.WorkersTax * n.TaxEfficiency * (1 - n.EstateInfluencesReal.WorkersInfluence);
    n.FarmersTaxes = n.FarmersWage * n.Workforces.Farmers * n.Population / 1000 * n.WorkersTax * n.TaxEfficiency * (1 - n.EstateInfluencesReal.WorkersInfluence);
    n.TownsfolkTaxes = n.TownsfolkWage * n.Workforces.Townsfolk * n.Population / 1000 * n.UrbanTax * n.TaxEfficiency * (1 - n.EstateInfluencesReal.UrbanInfluence);
    n.ClergyTaxes = n.ClergyWage * n.Workforces.Clergy * n.Population / 1000 * n.ClergyTax * n.TaxEfficiency * (1 - n.EstateInfluencesReal.ClergyInfluence);
    n.BureaucratsTaxes = n.BureaucratsWage * n.Workforces.Bureaucrats * n.Population / 1000 * n.BureaucratTax * n.TaxEfficiency * (1 - n.EstateInfluencesReal.BureaucratInfluence);
    n.MerchantsTaxes = n.MerchantsWage * n.Workforces.Merchants * n.Population / 1000 * n.UrbanTax * n.TaxEfficiency * (1 - n.EstateInfluencesReal.UrbanInfluence);
    n.IntellectualsTaxes = n.IntellectualsWage * n.Workforces.Intellectuals * n.Population / 1000 * n.IntellectualsTax * n.TaxEfficiency * (1 - n.EstateInfluencesReal.IntellectualsInfluence);
    n.SailorsTaxes = n.SailorsWage * n.Workforces.Sailors * n.Population / 1000 * n.MilitaryTax * n.TaxEfficiency * (1 - n.EstateInfluencesReal.MilitaryInfluence);
    n.SoldiersTaxes = n.SoldiersWage * n.Workforces.PopulationInMilitary * n.Population / 1000 * n.MilitaryTax * n.TaxEfficiency * (1 - n.EstateInfluencesReal.MilitaryInfluence);
    n.AristocracyTaxes = n.AristocracyWage * n.Workforces.Aristocracy * n.Population / 1000 * n.AristocratTax * n.TaxEfficiency * (1 - n.EstateInfluencesReal.AristocratInfluence);
    n.BurgousieTaxes = n.BurgousieWage * n.Workforces.Burgousie * n.Population / 1000 * n.BurgousieTax * n.TaxEfficiency * (1 - n.EstateInfluencesReal.BurgousieInfluence);

      n.TaxRevenue = (n.LabourersTaxes + n.SerfsTaxes + n.FarmersTaxes + n.TownsfolkTaxes + n.ClergyTaxes + n.BureaucratsTaxes + n.MerchantsTaxes + n.IntellectualsTaxes + n.SailorsTaxes + n.SoldiersTaxes + n.AristocracyTaxes + n.BurgousieTaxes) / gameStats.TimeDivide;
      n.TariffsRevenue = (n.InternalTrade * n.InternalTariffs + n.ExternalTrade * n.ExternalTariffs) * n.TariffEfficiency / gameStats.TimeDivide;

    n.SpyUpkeep = n.Spies / 200 * n.SpyQuality / gameStats.TimeDivide;
    n.SocialSpendingUpkeep = n.SocialSpending * n.Population / 1000000 / gameStats.TimeDivide * 3;
    n.HygieneUpkeep = n.Health * n.Population / 2000000 / gameStats.TimeDivide;
    n.EducationUpkeep = n.EducationEfficiency * n.Population / 500000 * (1.1 - n.AdministrativeEfficiency / 100) * 6 / gameStats.TimeDivide;
    n.PropagandaUpkeep = n.Propaganda * (100 - n.AdministrativeEfficiency) / 100 * n.Population / 1000000 / gameStats.TimeDivide;
      n.PopulationControlUpkeep = n.PopulationControl * n.Population / 800000 / gameStats.TimeDivide;
      n.AdministrativeUpkeep = (n.LandAdministration + n.BureaucratsWage / 1000 * n.Population * n.Workforces.Bureaucrats) / gameStats.TimeDivide;
    n.ResearchUpkeep = n.ResearchSpending * n.Population / 500000 / gameStats.TimeDivide * n.LiteracyPercent / 10;
      n.Balance = n.BudgetIncoming - n.BudgetOutgoing;
      n.PassiveInvestmentIncome = (n.Budget / (10 - n.AdministrativeEfficiency / 10 + 1) / gameStats.TimeDivide) / (1 + n.Inflation);

      n.OverallIncome = n.PassiveInvestmentIncome + n.TariffsRevenue + n.TaxRevenue + n.BudgetIncoming;
      n.OverallSpending = n.ArmyUpkeep + n.NavyUpkeep + n.FortUpkeep + n.EducationUpkeep + n.HygieneUpkeep + n.AgricultureSpending + n.SocialSpendingUpkeep + n.SpyUpkeep + n.PopulationControlUpkeep + n.PropagandaUpkeep + n.AdministrativeUpkeep + n.ResearchUpkeep + n.NewTroopRecruitmentPenalty + n.BudgetOutgoing;
      n.DailyBudget = n.OverallIncome - n.OverallSpending;
      n.FutureBudget = n.Budget + n.DailyBudget;


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

    n.NavyQuality = (1 + n.NavyImprovements + n.NavyTech - n.Corruption / 5) * (1 - n.IronShortage) * (n.Technologies.Gunports == 1 ? (1 - n.SulphurShortage) : 1);
    
    n.NavalPower = (n.LightShips*0.5 + n.MediumShips + 2*n.HeavyShips) * n.NavyQuality;
    

    n.PopulationTechImpact = (n.Population > 20000000? (n.Population - 20000000) / 250000000 : 0);
    

    n.ResearchBoostFromTech = 
    1 + 
    n.CulturalAdvancements.Universities / 10 + 
    n.CulturalAdvancements.RenaissanceThought / 5 + 
    n.Technologies.Experimentation / 5 +
    n.CulturalAdvancements.ScientificRevolution / 5;
    n.ResearchPointGain = max(1, (n.ResearchSpending * n.ResearchEffectiveness * n.ResearchBoostFromTech * n.LiteracyPercent / n.Isolation / gameStats.TimeDivide * 2 / 10 + n.ResearchSpending * n.ResearchEffectiveness * n.HigherEducation / n.Isolation / gameStats.TimeDivide * 5 / 10) * (1 - (n.EstateInfluencesReal.AristocratInfluence > 0.5 ? n.EstateInfluencesReal.AristocratInfluence - 0.5 : 0) / 1.5 - (n.EstateInfluencesReal.ClergyInfluence > 0.5? n.EstateInfluencesReal.ClergyInfluence - 0.5 : 0) / 1.5) * (1 - n.PopulationTechImpact));
    n.FutureResearchPoints = min(5 + (n.CulturalAdvancements.Universities == true ? 2.5 : 0) + (n.CulturalAdvancements.ScientificRevolution == true ? 2.5 : 0), n.ResearchPoints + n.ResearchPointGain);

    // Stability Alert
    if (n.Stability < -2) {
      alert(nationName + " has stabiity below -2");
    }

  }

  static evaluateNations() {
    var self = this;
    for (const nationName in gameStats.Nations) {
      self.evaluateNation(nationName);
    }
  }

  static advanceMap(imgArray, formula){

    let newImgArray = new Uint8ClampedArray(imgArray.length);

    for(let i = 0; i < newImgArray.length; i+=4){
      let newPixel = formula([imgArray[i], imgArray[i + 1], imgArray[i + 2], imgArray[i + 3]]);
      newImgArray[i] = newPixel[0];
      newImgArray[i + 1] = newPixel[1];
      newImgArray[i + 2] = newPixel[2];
      newImgArray[i + 3] = newPixel[3];
    }

    return newImgArray;
  }

  static advancePopulationMap(pixel){
    if(pixel[3] < 128) return pixel; //if transparent, don't modify the pixel at all

    let pixelPop = pixel[2];
    pixelPop *= 255;
    pixelPop = pixel[1];
    pixelPop *= 255;
    pixelPop = pixel[0];

    debugger;

    let n = null;//find nation
    let TerrainScore = null; //find terrain score
    let CoastalPixel = null; //find if is a coastal pixel
    let FertilityScore = null; //find fertility score
    let DevelopmentScore = null; //find developmentscore

    let PixelsDisease;
    let PixelsPopGrowth;

    if(n != null){   
        PixelsDisease = (pixelPop / (20 * TerrainScore)) / 25 - n.EffectiveHealth - (CoastalPixel ? 0.1 : 0) - (0.5 - FertilityScore) / 2.5 - DevelopmentScore * 5;
        PixelsPopGrowth = (n.PseudoPopulationGrowth < 0 ? n.PseudoPopulationGrowth : n.PseudoPopulationGrowth * (1 - PixelsDisease));
    }else{
        PixelsDisease = (pixelPop / (20 * TerrainScore)) / 25 - (CoastalPixel ? 0.1 : 0) - (0.5 - FertilityScore) / 2.5 - DevelopmentScore * 5;
        PixelsPopGrowth = 0.1 * (1 - PixelsDisease);
    }

    let newPixelPop = pixelPop * (1 + PixelsPopGrowth);
    let newPixel = new Uint8ClampedArray(4);
    newPixel[3] = 255;
    newPixel[2] = newPixelPop % 256;
    newPixel[1] = Math.floor(newPixelPop / 256) % 256;
    newPixel[0] = Math.floor(newPixelPop / 65536) % 256;
  }

}