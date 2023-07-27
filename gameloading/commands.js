function syncNation(nationName) {

    /* #region  copy dailies */
    for (const propertyName in gameStats.Nations[nationName]) {
        const property = gameStats.Nations[nationName][propertyName];
        let regex = new RegExp(`Future.+`)
        if (regex.test(propertyName)) {
            if (propertyName != "FuturePopulation") {
                gameStats.Nations[nationName][propertyName.replace("Future", "")] = property;
            }
        }
    }
    /* #endregion */

    // deforestation from forestry
    gameStats.Nations[nationName].ForestsCutDown += (gameStats.Nations[nationName].Forestry - gameStats.Nations[nationName].Reforestation) * 750 / gameStats.TimeDivide;

    // SoL rise/fall
    for (const EstateIndex in gameStats.Estates) {
        const Estate = gameStats.Estates[EstateIndex];
        gameStats.Nations[nationName]["Expected" + Estate + "Sol"] = (gameStats.Nations[nationName]["Expected" + Estate + "Sol"] > gameStats.Nations[nationName][Estate + "Sol"] * 1.025 ? gameStats.Nations[nationName]["Expected" + Estate + "Sol"] * 0.9 : gameStats.Nations[nationName]["Expected" + Estate + "Sol"] * max(1.025, gameStats.Nations[nationName][Estate + "Sol"] / gameStats.Nations[nationName]["Expected" + Estate + "Sol"] * 0.7));
    }

    // weapons stockpiled
    gameStats.Nations[nationName].BasicArmamentsStockpiled += (gameStats.Nations[nationName].EffectiveBasicArmaments - gameStats.Nations[nationName].BasicArmamentsStockpiled) - gameStats.Nations[nationName].BasicArmamentsDemand;
    gameStats.Nations[nationName].BasicArmamentsStockpiled = max(0, gameStats.Nations[nationName].BasicArmamentsStockpiled);
    gameStats.Nations[nationName].HeavyArmamentsStockpiled += (gameStats.Nations[nationName].EffectiveHeavyArmaments - gameStats.Nations[nationName].HeavyArmamentsStockpiled) - gameStats.Nations[nationName].HeavyArmamentsDemand;
    gameStats.Nations[nationName].HeavyArmamentsStockpiled = max(0, gameStats.Nations[nationName].HeavyArmamentsStockpiled);

    // Private Armies Casualties Clear
    gameStats.Nations[nationName].AristocracyLeviesCasualties = 0;
    gameStats.Nations[nationName].AristocracyMilitiaCasualties = 0;
    gameStats.Nations[nationName].AristocracyLightInfantryCasualties = 0;
    gameStats.Nations[nationName].AristocracyHeavyInfantryCasualties = 0;
    gameStats.Nations[nationName].AristocracyEliteInfantryCasualties = 0;
    gameStats.Nations[nationName].AristocracyArchersCasualties = 0;
    gameStats.Nations[nationName].AristocracyCrossbowmenCasualties = 0;
    gameStats.Nations[nationName].AristocracyMusketeersCasualties = 0;
    gameStats.Nations[nationName].AristocracyMusketMilitiaCasualties = 0;
    gameStats.Nations[nationName].AristocracyRiflemenCasualties = 0;
    gameStats.Nations[nationName].AristocracyLightCavalryCasualties = 0;
    gameStats.Nations[nationName].AristocracyHeavyCavalryCasualties = 0;
    gameStats.Nations[nationName].AristocracyEliteCavalryCasualties = 0;

    gameStats.Nations[nationName].ClergyLeviesCasualties = 0;
    gameStats.Nations[nationName].ClergyMilitiaCasualties = 0;
    gameStats.Nations[nationName].ClergyLightInfantryCasualties = 0;
    gameStats.Nations[nationName].ClergyHeavyInfantryCasualties = 0;
    gameStats.Nations[nationName].ClergyEliteInfantryCasualties = 0;
    gameStats.Nations[nationName].ClergyArchersCasualties = 0;
    gameStats.Nations[nationName].ClergyCrossbowmenCasualties = 0;
    gameStats.Nations[nationName].ClergyMusketeersCasualties = 0;
    gameStats.Nations[nationName].ClergyMusketMilitiaCasualties = 0;
    gameStats.Nations[nationName].ClergyRiflemenCasualties = 0;
    gameStats.Nations[nationName].ClergyLightCavalryCasualties = 0;
    gameStats.Nations[nationName].ClergyHeavyCavalryCasualties = 0;
    gameStats.Nations[nationName].ClergyEliteCavalryCasualties = 0;

    gameStats.Nations[nationName].BurgousieLeviesCasualties = 0;
    gameStats.Nations[nationName].BurgousieMilitiaCasualties = 0;
    gameStats.Nations[nationName].BurgousieLightInfantryCasualties = 0;
    gameStats.Nations[nationName].BurgousieHeavyInfantryCasualties = 0;
    gameStats.Nations[nationName].BurgousieEliteInfantryCasualties = 0;
    gameStats.Nations[nationName].BurgousieArchersCasualties = 0;
    gameStats.Nations[nationName].BurgousieCrossbowmenCasualties = 0;
    gameStats.Nations[nationName].BurgousieMusketeersCasualties = 0;
    gameStats.Nations[nationName].BurgousieMusketMilitiaCasualties = 0;
    gameStats.Nations[nationName].BurgousieRiflemenCasualties = 0;
    gameStats.Nations[nationName].BurgousieLightCavalryCasualties = 0;
    gameStats.Nations[nationName].BurgousieHeavyCavalryCasualties = 0;
    gameStats.Nations[nationName].BurgousieEliteCavalryCasualties = 0;

    gameStats.Nations[nationName].PopulaceMilitiaCasualties = 0;
    gameStats.Nations[nationName].PopulaceMusketMilitiaCasualties = 0;

    // Expected Weapons for private militaries
    gameStats.Nations[nationName].ExpectedPrivateBasicArmaments = gameStats.Nations[nationName].AristocracyBasicArmaments + gameStats.Nations[nationName].BurgousieBasicArmaments + gameStats.Nations[nationName].ClergyBasicArmaments + gameStats.Nations[nationName].PopulaceBasicArmaments;

    // Alcoholism
    if (gameStats.Nations[nationName].EffectiveAlcohol > gameStats.Nations[nationName].AlcoholDemand * 0.75) {
        gameStats.Nations[nationName].Alcoholism += 0.1;
    }
    else {
        gameStats.Nations[nationName].Alcoholism -= 0.05;
    }
    gameStats.Nations[nationName].Alcoholism = clamp(0, 1, gameStats.Nations[nationName].Alcoholism);

    // Influence Change check
    for (const EstateIndex in gameStats.EstatesGeneral) {
        const Estate = gameStats.EstatesGeneral[EstateIndex];
        gameStats.Nations[nationName].InfluenceChangeLoyaltyEffect[Estate] = (gameStats.Nations[nationName].EstateInfluencesReal[Estate + "Influence"] - gameStats.Nations[nationName].ExpectedInfluences[Estate + "Influence"]) * 1.5;
        gameStats.Nations[nationName].ExpectedInfluences[Estate + "Influence"] = gameStats.Nations[nationName].EstateInfluencesReal[Estate + "Influence"];
    }

    // Reform Power
    gameStats.Nations[nationName].ReformPower += gameStats.Nations[nationName].ReformPowerGain;

    /* #region  deal with automatic debt taking */

    //If budget is negative
    if (gameStats.Nations[nationName].Budget < 0) {
        //take -budget in debt, but no more than possible public debt
        let newDebt = min(gameStats.Nations[nationName].PossiblePublicDebt, -gameStats.Nations[nationName].Budget);
        //add it to effective debt
        gameStats.Nations[nationName].PublicDebtTaken += newDebt;
        //the debt taken added into budget
        gameStats.Nations[nationName].Budget += newDebt;
    }
    /* #endregion */
}

function syncNations() {
    for (const nationName in gameStats.Nations) {
        clearNewTroops(nationName);
        syncNation(nationName);
    }
}


function normalCommand(selection) {


    let splitSelection = selection.split(/\.|(?<=\[)/g); 
    //.slice(-1)[0] is the last element - Credit to Datageek's answer on https://stackoverflow.com/questions/9050345/selecting-last-element-in-javascript-array
    let statName = splitSelection.slice(-1)[0];

    let propertySelection = selection;

    let value = commandParameters.Value.trim();
    let change;

    //implement check for stat that are objects, and disallow their change

    let selectionValue = (new Function(`return gameStats${propertySelection}`))();

    while (typeof selectionValue == 'object') {
        //if object have no properties. It is probably a newly created stat. Set it to ""
        if (Object.keys(selectionValue).length == 0) {
            selectionValue = `""`;
            (new Function(`gameStats${propertySelection} = ${selectionValue}`))();
        }
        //If object has exactly 1 property, treat the selectionvalue as if it is the value of that property instead of the object as a whole
        else if (Object.keys(selectionValue).length == 1) {
            propertySelection = `${propertySelection}.${Object.keys(selectionValue)[0]}`;
            selectionValue = (new Function(`return gameStats${propertySelection}`))();
        } else {

            let allProperties = "";

            for (const propertyName in selectionValue) {
                allProperties += `${propertyName}\n`
            }
            error(
                `The currently selected thing, ${propertySelection}, is an object not a value, and cannot be set
Did you mean to select any of the following within this?:

${allProperties}`);
        }

    }





    /* #region  implement check for stats that are formulas, and disallow their change */

    //if stat is not of type RP, prompt and return
    let statTypesNotRP = [
        "Derived",
        "Turn Based",
        "Constant"
    ];
    let thisStatStatType = getStatType(selection);
    if (~statTypesNotRP.indexOf(thisStatStatType)) {
        warn(`The specified stat ${selection.slice(1)} was of type ${thisStatStatType}, but has been modified with ccf (${commandParameters.Operand} ${value}).\nMake sure this is intended, f.x. via game event`);
    }

    /* #endregion */


    /* #region  impelement check for technologies and cultural advances, where prerequisites not met makes this prompt and return */
    
    if(statName in gameStats.AdvancesPrerequisites){
        let nationSelection = new Function(`return gameStats${selection.split(/\.((?=technologies)|(?=CulturalAdvancements))/i)[0]}`)();
        gameStats.AdvancesPrerequisites[statName].forEach(prerequisite => {
            if(prerequisite in nationSelection.Technologies){
                if(nationSelection.Technologies[prerequisite] == false) {
                    alert(`the technology '${statName}' could not be changed, as the prerequisite '${prerequisite}' was not met`);
                    return;
                }
            }else if(prerequisite in nationSelection.CulturalAdvancements){
                if(nationSelection.CulturalAdvancements[prerequisite] == false) {
                    alert(`the cultural advancements '${statName}' could not be changed, as the prerequisite '${prerequisite}' was not met`);
                    return;
                }
            }
        });
    }

    /* #endregion */

    //If value at all is a number, make sure the program understands this
    if (/^((\*?\d*\.?\d+%?)|(\*))$/.test(value)) {
        let useDefault = false;
        if (/^\*/.test(value)) {
            useDefault = true;
            value = value.replaceAll("*", "");
        }
        //If number to change by is written in percent. Divide that number by 100 
        if (/%/.test(value)) {
            value = value.replace("%", "") / 100;
        } else {
            value = value.toString().length != 0 ? +value : 1;
        }

        if (useDefault) {
            let found = false;

            for (const StatName in defaultStatValues) {
                if (!propertySelection.includes(StatName)) continue;
                value *= defaultStatValues[StatName];
                found = true;
            }
            if (!found) error(`a default value was not found for ${propertySelection}`);
        }
    }

    //add
    if (commandParameters.Operand == '+' || commandParameters.Operand == 'add') {
        change = value;
        (new Function(`gameStats${propertySelection} = parseFloat(gameStats${propertySelection}) + ${value}`))();
    }
    //subtract
    else if (commandParameters.Operand == '-' || commandParameters.Operand == 'sub') {
        change = -value;
        (new Function(`gameStats${propertySelection} = parseFloat(gameStats${propertySelection}) - ${value}`))();
    }
    //set
    else if (commandParameters.Operand == '=' || commandParameters.Operand == 'set') {
        const previous = (new Function(`\
            if(typeof gameStats${propertySelection} === 'undefined') return 'undefined';\
            return JSON.parse(JSON.stringify(\
                gameStats${propertySelection}\
            ));`
        ))();
        change = isNaN(previous) ? true : value - previous;
        let setval;
        //quotation
        setval = `'${value}'`;
        //but if just number or boolean, don't do quotation
        if ((!isNaN(value) && value !== '') || typeof value === 'boolean')
            setval = value;
        else if (typeof value === 'string') {
            if (value.toLowerCase().trim() === "false" || value.toLowerCase().trim() === "true")
                setval = value.toLowerCase();
        }
        (new Function(`gameStats${propertySelection} = ${setval}`))();

    } else {
        error(`Operand wasn't understood: ${commandParameters.Operand}
Aborting.`);
        return;
    }
    PostStatChange(propertySelection, change);
}


function createStat(currentSelection, arg) {
    let objectClass;
    if (/^\.Nations$/.test(currentSelection)) objectClass = "Nation";
    else if (/^\.(Cultures|Religions)$/.test(currentSelection)) objectClass = "SocialBehaviour";
    else if (/^\.Nations\..+\.(Culture|Religion)Groups$/.test(currentSelection)) objectClass = "SocialBehaviourGroup";
    else if (/^\.Nations\..+\.Climates$/.test(currentSelection)) objectClass = "Climate";
    else if (/^\.(Cultures|Religions)\..+\.Opinions$/.test(currentSelection)) objectClass = "Opinion";
    else if (/^\.TradeZones$/.test(currentSelection)) objectClass = "TradeZone";
    else if (/^\.Trades$/.test(currentSelection)) objectClass = "Trade";
    
    if (arg.includes('=')) {
        let newName = arg.slice(0, arg.indexOf('=')).trim();
        let oldName = arg.slice(arg.indexOf('=') + 1).trim();
        oldName = correctAndSynonymCheck(`${currentSelection}.${oldName}`).split(".").pop();
        if (objectClass == "Nation") Formulas.evaluateNation(oldName);

        /* Copy all property values from old to new */
        (new Function(`
        gameStats${currentSelection}.${newName} = new ${objectClass}("${newName}");
        for (const propertyName in gameStats${currentSelection}.${oldName}) {
            const propertyToCopy = gameStats${currentSelection}.${oldName}[propertyName];
            gameStats${currentSelection}.${newName}[propertyName] = JSON.parse(JSON.stringify(propertyToCopy));
        }`))();
        //for nation copying specifically, override the copied stuff for government name and Aristocrat loyalties towards state
    } else {

        if (objectClass != null)
            (new Function(`gameStats${currentSelection}.${arg} = new ${objectClass}("${arg}");`))();
        else
            (new Function(`gameStats${currentSelection}.${arg} = {};`))();
        if (objectClass == "Nation") Formulas.evaluateNation(arg);

        PostStatCreate(currentSelection, arg);
    }

}

function deleteStat(currentSelection, arg) {
    let dottedStatName = correctAndSynonymCheck(`${currentSelection}.${arg}`);
    (new Function(`delete gameStats${dottedStatName}`))();
}

let newOuterAfterRename;
function renameStat(currentSelection, arg) {
    let newName = arg.slice(arg.indexOf('>') + 1).trim();
    let oldName = arg.slice(0, arg.indexOf('>')).trim();
    oldName = correctAndSynonymCheck(`${currentSelection}.${oldName}`).split(".").pop();

    if (/^\.Nations$/.test(currentSelection)) {
        Formulas.evaluateNation(oldName);
    }

    //copy over all properties of selected object, as is, except the property with oldName name, it will now be newName named
    let outer = (new Function(`return gameStats${currentSelection}`))();
    newOuterAfterRename = new Object();

    Object.keys(outer).forEach(property => {
        newOuterAfterRename[property == oldName ? newName : property] = outer[property];
    });

    (new Function(`gameStats${currentSelection} = newOuterAfterRename`))();

    if (/^\.Nations$/.test(currentSelection)) {
        //copy over all Trades, as is, except if giver or receiver is oldName, then it's newName now

        Object.keys(gameStats.Trades).forEach(property => {
            if (gameStats.Trades[property].giver == oldName)
                gameStats.Trades[property].giver = newName;
            if (gameStats.Trades[property].receiver == oldName)
                gameStats.Trades[property].receiver = newName;

        });
    }




}

let Shorthands = {}

Shorthands.Trade = function (parameters) {
    parameters = parameters.split(/,|>/gm);
    let tradename = parameters[0].trim();
    let giver = parameters[1].trim();
    let receiver = parameters[2].trim();
    let stake = parameters[3].trim().split(/(?<![a-zA-Z])(?=[a-zA-Z])/gm);
    let amount = stake[0].trim();
    let resourceType = stake[1].trim();

    giver = correctAndSynonymCheck(`.Nations.${giver}`).split(".").pop();
    receiver = correctAndSynonymCheck(`.Nations.${receiver}`).split(".").pop();
    resourceType = correctAndSynonymCheck(`.Nations.${giver}.${resourceType}`).split(".").pop();


    if (typeof gameStats.Trades[tradename] !== 'undefined') {
        error(`The name ${tradename} is already used in Trades.`);
        return;
    }

    gameStats.Trades[tradename] = new Trade();
    gameStats.Trades[tradename].giver = giver;
    gameStats.Trades[tradename].receiver = receiver;
    gameStats.Trades[tradename].resource = resourceType;
    gameStats.Trades[tradename].amount = amount;
}

Shorthands.PayDebt = function (parameter) {
    if (isNaN(parameter)) {
        error(`The debt paid wasn't a number. Operation Aborted.`);
        return;
    }

    let splitSelections = correctAndSynonymCheck(currentSelection).split(/\./gi).slice(1);
    let correctedSelection = "." + splitSelections.join(".");

    if (splitSelections[splitSelections.length - 2] !== 'Nations') {
        error(`The current selection, ${splitSelections[splitSelections.length - 1]}, is not a nation. Cannot sync single nation.`);
        return;
    }

    let natName = splitSelections[splitSelections.length - 1];

    (new Function(`Formulas.evaluateNation("${natName}")`))();


    //EffectiveDebt formula isolated for Public Debt Taken 
    //EffectiveDebt = PublicDebtTaken * (1 + InterestRate);
    //EffectiveDebt / (1 + InterestRate)= PublicDebtTaken * (1 + InterestRate) / (1 + InterestRate);
    //PublicDebtTaken = EffectiveDebt / (1 + InterestRate);
    let interestRate = (new Function(`return gameStats${correctedSelection}.InterestRate`))();

    (new Function(`gameStats${correctedSelection}.PublicDebtTaken -= ${parameter} / (1 + ${interestRate})`))();
    (new Function(`gameStats${correctedSelection}.Budget -= ${parameter}`))();

    //excess paid back
    let publicDebtTakenValue = new Function(`return gameStats${correctedSelection}.PublicDebtTaken`);
    if (publicDebtTakenValue < 0) {
        //reset public debt taken to 0
        (new Function(`gameStats${correctedSelection}.PublicDebtTaken -= 0`))();
        //give back to budget
        (new Function(`gameStats${correctedSelection}.Budget += ${-publicDebtTakenValue})`))();
    }
}

Shorthands.Move = function (parameters) {
    parameters = parameters.split(/,|>/gm);
    let from = parameters[0].trim();
    let to = parameters[1].trim();
    let amount = parameters[2].trim();

    if (isNaN(amount)) {
        error(`The points to be moved wasn't a number. Operation Aborted.`);
        return;
    }

    from = correctAndSynonymCheck(`${currentSelection}.${from}`);
    to = correctAndSynonymCheck(`${currentSelection}.${to}`);

    (new Function(
        `gameStats${from} = +gameStats${from} - ${amount};\
         gameStats${to} = +gameStats${to} + ${amount}`
    ))();
}