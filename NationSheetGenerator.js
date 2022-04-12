let primaryColor = ["red", "green", "DodgerBlue", "purple", "Dark Orange"];
let secondaryColor = ["pink", "lightgreen", "lightSkyBlue", "magenta", "Orange"];

let nationSheetContainer = document.createElement("div");
nationSheetContainer.classList.add("nationsheet");

let arrowContainer = document.createElement("div");
arrowContainer.classList.add("arrowcontainer");


let currentNationNumber = 0;
let currentNationNumberDisplay = document.createElement("h2");
currentNationNumberDisplay.innerText = "0";

let leftArrow = document.createElement("button");
leftArrow.innerHTML = "&#11164";
leftArrow.onclick = function (){
    currentNationNumberDisplay.innerText = --currentNationNumber; 
    createNationSheet(currentNationNumber) 
}

let rightArrow = document.createElement("button");
rightArrow.innerHTML = "&#11166";
rightArrow.onclick = function (){
    currentNationNumberDisplay.innerText = ++currentNationNumber; 
    createNationSheet(currentNationNumber)
}


arrowContainer.appendChild(leftArrow);
arrowContainer.appendChild(currentNationNumberDisplay);
arrowContainer.appendChild(rightArrow);

document.body.appendChild(arrowContainer);
document.body.appendChild(nationSheetContainer);


function createNationSheet(nationNum){
    let nationIndex = 0;
    let nationName;
    for (const natName in gameStats.Nations) {
        if(nationIndex == nationNum){
            nationName = natName;
            break;
        }
        nationIndex++;
    }

    const nation = gameStats.Nations[nationName];
    let nationTitle = document.createElement("h1");
    nationTitle.innerHTML = nationName;
    let table;

    let nationStatSections = [{}];
    let i = 0;
    let statBreakPoints = [
        "FutureDateInThisNation",
            "ReligiousDisunity",
            "Health",
            "EducationCostModifier",
            "Propaganda",
            "PopulationHappiness",
            "Stability",
            "Absolutism",
            "ConscriptionPercent",
            "ProductionEfficiency",
            "Mercantilism",
            "EffectiveDebt",
            "Inflation",
            "SpyQuality",
            "BurghersLoyalty",
            "PopulationControlUpkeep",
            "OverallIncome",
            "Militia",
            "OverallNumbers",
            "FortUpkeep",
            "ArmyQuality",
            "MililtaryDiscipline",
            "NavyQuality",
            "UpkeepForOneHeavyShip",
            "OverallShipCount",
            "NavyUpkeep",
            "New_EliteCavalry",
            "New_Cannons",
            "New_HeavyShips",
            "NewTroopRecruitmentPenalty",
            "Burghers",
            "LowerClass",
            "PopulationTechImpact",
            "FarmingEfficiency",
            "EffectiveCoal",
            "EffectiveSulphur",
            "CottonInflation",
            "GoldInflation",
            "EffectiveIron",
            "TeaInflation",
            "SilkInflation",
            "SpiceInflation",
            "WoolInflation",
            "CoffeeInflation",
            "FurInflation",
            "DiamondInflation",
            "SilverInflation",
            "EffectiveCopper",
            "IvoryInflation",
            "CocoaInflation",
            "TobaccoInflation",
            "SugarInflation",
            "ExoticFruitInflation",
            "ResourceBudgetBoost",
            "CoalValue",
            "GoldValue",
            "IronValue",
            "SulphurValue",
            "CottonValue",
            "TeaValue",
            "SpiceValue",
            "CopperValue",
            "SilkValue",
            "WoolValue",
            "CoffeeValue",
            "SilverValue",
            "DiamondValue",
            "FurValue",
            "IvoryValue",
            "CocoaValue",
            "TobaccoValue",
            "SugarValue",
            "ExoticFruitValue",
            "ResearchPoints",
            "Technologies",
            "ArmyTechBoost",
            "EffectiveTax",
            "DebtHappinessEffect",
            "Balance",
            "CulturalPower",
            "CulturalAdvancements",
            "FoodOutgoing",
            "CoalOutgoing",
            "SulphurOutgoing",
            "CottonOutgoing",
            "GoldOutgoing",
            "IronOutgoing",
            "TeaOutgoing",
            "SilkOutgoing",
            "SpiceOutgoing",
            "WoolOutgoing",
            "CoffeeOutgoing",
            "FurOutgoing",
            "DiamondOutgoing",
            "SilverOutgoing",
            "CopperOutgoing",
            "IvoryOutgoing",
            "CocoaOutgoing",
            "TobaccoOutgoing",
            "SugarOutgoing",
            "ExoticFruitOutgoing",
            "TradePowerResourceTrade",
            "AgricultureTechnology",
            "FoodPopulationBoost",
            "TradeProfit",
            "Fervor",
            "TradeInfluences",
            "LandAdministration",
            "Climates",
            "HabitableLand",
            "Food",
            "MilitaryExpendures"
    ]
    for (const nationStatName in nation) {
        const nationStat = nation[nationStatName];
        nationStatSections[i][nationStatName] = nationStat;
        if(statBreakPoints[i] == nationStatName){
            nationStatSections[++i] = {};
        }
    }

    



    nationSheetContainer.innerHTML = "";
    nationSheetContainer.appendChild(nationTitle);

    
    for (const nationStatSectionIndex in nationStatSections) {
        const nationStatSection = nationStatSections[nationStatSectionIndex];
        table = document.createElement("table");
        
        let nationStatNameRow = document.createElement("tr");
        nationStatNameRow.style.background = primaryColor[currentNationNumber % primaryColor.length];
        let nationStatRow = document.createElement("tr");
        nationStatRow.style.background = secondaryColor[currentNationNumber % secondaryColor.length];
        
        for (const nationStatName in nationStatSection) {
            const nationStat = nation[nationStatName];
            let nationStatNameCell = document.createElement("th");
            nationStatNameCell.innerText = nationStatName.split(/(?<=[a-zA-Z])(?=[A-Z])/gm).join(" ");
            let nationStatCell = document.createElement("td");
            nationStatCell.style.textAlign = "center";
            if(!isNaN(nationStat)){
                //integers
                if(~[
                    "Population",
                    "FuturePopulation"
                ].indexOf(nationStatName)){
                    nationStatCell.innerText = parseFloat(nationStat).toFixed(0);
                }
                //percentages
                else if(~[
                    "LowerClassTax",
                    "MediumClassTax",
                    "HighClassTax",
                ].indexOf(nationStatName)){
                    nationStatCell.innerText = parseFloat(nationStat * 100).toFixed(2) + "%";
                }
                //normal (2 digits)
                else{
                    nationStatCell.innerText = parseFloat(nationStat).toFixed(2);
                }
                
            }else
                nationStatCell.innerText = nationStat;

            nationStatRow.appendChild(nationStatCell);
            nationStatNameRow.appendChild(nationStatNameCell);
        }

        table.appendChild(nationStatNameRow);
        table.appendChild(nationStatRow);
        nationSheetContainer.appendChild(table);
    
    }

    
    
}