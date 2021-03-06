function syncNation(nationName) {

    /* #region  copy dailies */
    for (const propertyName in gameStats.Nations[nationName]) {
        const property = gameStats.Nations[nationName][propertyName];
        let regex = new RegExp(`Future.+`)
        if (regex.test(propertyName)) {
            gameStats.Nations[nationName][propertyName.replace("Future", "")] = property;
        }
    }
    /* #endregion */

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
    
    let propertySelection = selection;

    let value = commandParameters.Value.trim();
    let change;
    
    //implement check for stat that are objects, and disallow their change

    let selectionValue = (new Function(`return gameStats${propertySelection}`))();
    
    while(typeof selectionValue == 'object'){
        if(Object.keys(selectionValue).length == 1){
            propertySelection = `${propertySelection}.${Object.keys(selectionValue)[0]}`;
            selectionValue = (new Function(`return gameStats${propertySelection}`))();
        }else{
            
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
    




    //implement check for stats that are forumulas, and disallow their change
    //
    //
    //


    //If value at all is a number, make sure the program understands this
    if(/^(\*?\d*\.?\d+%?)|(\*)$/.test(value)){
        let useDefault = false;
        if(/^\*/.test(value)){
            useDefault = true;
            value = value.replaceAll("*", "");
        }
        //If number to change by is written in percent. Divide that number by 100 
        if(/%/.test(value)){
            value = value.replace("%", "") / 100;
        }else{
            value = value.toString().length != 0 ? +value : 1;
        }

        if(useDefault){
            let found = false;
            
            for (const StatName in defaultStatValues) {
                if(!propertySelection.includes(StatName)) continue;
                value *= defaultStatValues[StatName];
                found = true;
            }
            if(!found) error(`a default value was not found for ${propertySelection}`);
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
        if((!isNaN(value) && value !== '') || typeof value === 'boolean' || value.toLowerCase().trim() === "false" || value.toLowerCase().trim() === "true")
            setval = value;
        
        (new Function(`gameStats${propertySelection} = ${setval}`))();

    } else {
        error(`Operand wasn't understood: ${commandParameters.Operand}
Aborting.`);
        return;
    }
    PostStatChange(propertySelection, change);
}


function createStat(currentSelection, arg){
    let objectClass = "Object";
    if (/^\.Nations$/.test(currentSelection)) objectClass = "Nation";
    if (/^\.(Cultures|Religions)$/.test(currentSelection)) objectClass = "SocialBehaviour";
    if (/^\.Nations\..+\.(Culture|Religion)Groups$/.test(currentSelection)) objectClass = "SocialBehaviourGroup";
    if (/^\.Nations\..+\.Climates$/.test(currentSelection)) objectClass = "Climate";
    if (/^\.(Cultures|Religions)\..+\.Opinions$/.test(currentSelection)) objectClass = "Opinion";
    if (/^\.Trades$/.test(currentSelection)) objectClass = "Trade";
    if (arg.includes('=')) {
        let newName = arg.slice(0, arg.indexOf('=')).trim();
        let oldName = arg.slice(arg.indexOf('=') + 1).trim();
        oldName = correctAndSynonymCheck(`${currentSelection}.${oldName}`).split(".").pop();
        evaluateNation(oldName);

        /* Copy all property values from old to new */
        (new Function(`
        gameStats${currentSelection}.${newName} = new ${objectClass}("${newName}");
        for (const propertyName in gameStats${currentSelection}.${oldName}) {
            const propertyToCopy = gameStats${currentSelection}.${oldName}[propertyName];
            gameStats${currentSelection}.${newName}[propertyName] = JSON.parse(JSON.stringify(propertyToCopy));
        }`))();
        //for nation copying specifically, override the copied stuff for government name and noble loyalties towards state
        
        if (objectClass == "Nation"){
            
            (new Function(`
            gameStats${currentSelection}.${newName}.GovernmentName = "${newName}"
            
            if(
                typeof 
                gameStats${currentSelection}.${newName}.NobleLoyaltyGroups.${oldName} != "undefined"
            ){
                gameStats${currentSelection}.${newName}.NobleLoyaltyGroups.${newName} = 
                gameStats${currentSelection}.${newName}.NobleLoyaltyGroups.${oldName}
                delete gameStats${currentSelection}.${newName}.NobleLoyaltyGroups.${oldName}
            }
            
            if(
                typeof 
                gameStats${currentSelection}.${newName}.ClergyLoyaltyGroups.${oldName} != "undefined"
            ){
                gameStats${currentSelection}.${newName}.ClergyLoyaltyGroups.${newName} = 
                gameStats${currentSelection}.${newName}.ClergyLoyaltyGroups.${oldName}
                delete gameStats${currentSelection}.${newName}.ClergyLoyaltyGroups.${oldName}
            }
            
            if(
                typeof 
                gameStats${currentSelection}.${newName}.BurghersLoyaltyGroups.${oldName} != "undefined"
            ){
                gameStats${currentSelection}.${newName}.BurghersLoyaltyGroups.${newName} = 
                gameStats${currentSelection}.${newName}.BurghersLoyaltyGroups.${oldName}
                delete gameStats${currentSelection}.${newName}.BurghersLoyaltyGroups.${oldName}
            }
            
            
            `))();
        }
    } else {
        (new Function(`gameStats${currentSelection}.${arg} = new ${objectClass}("${arg}");`))();

        if(objectClass == "Nation") evaluateNation(arg);
    }
    
    PostStatCreate(currentSelection, arg);
}

function deleteStat(currentSelection, arg){
    let dottedStatName = correctAndSynonymCheck(`${currentSelection}.${arg}`);
    (new Function(`delete gameStats${dottedStatName}`))();
}

let Shorthands = {}

Shorthands.Trade = function(parameters){
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

Shorthands.PayDebt = function(parameter){
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

    (new Function(`evaluateNation("${natName}")`))();


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

Shorthands.Move = function(parameters){
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