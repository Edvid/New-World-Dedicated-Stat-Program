let NewRecruitCostsUnitUpkeepUnit = [];

function specialOperation(name, sheetIndex, change, nationRow){
    if(sheetIndex == sheetNames.find(element > element == "Armies")){
        if(name == "Levies") {
            NewRecruitCostsUnitUpkeepUnit[nationRow] += change * 0.75 / 1000;
        }else if(name == "Light Infantry"){
            NewRecruitCostsUnitUpkeepUnit[nationRow] += change * 2 / 1000;
        }else if(name == "Heavy Infantry"){
            NewRecruitCostsUnitUpkeepUnit[nationRow] += change * 4 / 1000;
        }else if(name == "Archers"){
            NewRecruitCostsUnitUpkeepUnit[nationRow] += change * 3 / 1000;
        }else if(name == "Crossbowmen"){
            NewRecruitCostsUnitUpkeepUnit[nationRow] += change * 2 / 1000;
        }else if(name == "Light Cavalry"){
            NewRecruitCostsUnitUpkeepUnit[nationRow] += change * 4 / 1000;
        }else if(name == "Heavy Cavalry"){
            NewRecruitCostsUnitUpkeepUnit[nationRow] += change * 6.5 / 1000;
        }else if(name == "Elite Infantry"){
            NewRecruitCostsUnitUpkeepUnit[nationRow] += change * 7 / 1000;
        }else if(name == "Elite Cavalry"){
            NewRecruitCostsUnitUpkeepUnit[nationRow] += change * 8.5 / 1000;
        }else if(name == "Hand Cannon"){
            NewRecruitCostsUnitUpkeepUnit[nationRow] += change * 5 / 1000;
        }else if(name == "Musketeers"){
            NewRecruitCostsUnitUpkeepUnit[nationRow] += change * 3.5 / 1000;
        }else if(name == "Militia"){
            NewRecruitCostsUnitUpkeepUnit[nationRow] += change * 1.25 / 1000;
        }else if(name == "Siege Equipment"){
            NewRecruitCostsUnitUpkeepUnit[nationRow] += change / 10;
        }else if(name == "Large Siege Equipment"){
            NewRecruitCostsUnitUpkeepUnit[nationRow] += change / 5;
        }else if(name == "Cannons"){
            NewRecruitCostsUnitUpkeepUnit[nationRow] += change / 10;
        }
    }   
}