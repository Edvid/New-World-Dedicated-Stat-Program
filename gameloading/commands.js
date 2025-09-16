import { defaultStatValues } from "../ccfassist/defaultStatValues.js";
import { error, getStatType, warn } from "../shared/utility.js";
import { correctAndSynonymCheck } from "../_utility/selectors.js";
import { Climate, evaluateNation, getGameStats, GSAddProperty, GSDeleteProperty, GSGetProperty, GSNewProperty, GSSetProperty, GSUpdateTradesWithRenamedNationName, Nation, Opinion, SocialBehaviour, SocialBehaviourGroup, Trade, TradeZone } from "../stats/gameStats.js";
import { PostStatChange, PostStatCreate } from "./specialOperations.js";

export function normalCommand(operand, selection, givenValue) {


    let splitSelection = selection.split(/\.|(?<=\[)/g); 
    //.slice(-1)[0] is the last element - Credit to Datageek's answer on https://stackoverflow.com/questions/9050345/selecting-last-element-in-javascript-array
    let statName = splitSelection.slice(-1)[0];

    let propertySelection = selection;

    let value = givenValue.trim();
    let change;

    //implement check for stat that are objects, and disallow their change

    let selectionValue = GSGetProperty(propertySelection)


    while (typeof selectionValue == 'object') {
        //if object have no properties. It is probably a newly created stat. Set it to ""
        if (Object.keys(selectionValue).length == 0) {
            GSSetProperty(propertySelection, '""')
        }
        //If object has exactly 1 property, treat the selectionvalue as if it is the value of that property instead of the object as a whole
        else if (Object.keys(selectionValue).length == 1) {
            propertySelection = `${propertySelection}.${Object.keys(selectionValue)[0]}`;
            selectionValue = GSGetProperty(propertySelection)
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
        warn(`The specified stat ${selection.slice(1)} was of type ${thisStatStatType}, but has been modified with ccf (${operand} ${value}).\nMake sure this is intended, f.x. via game event`);
    }

    /* #endregion */


    /* #region  impelement check for technologies and cultural advances, where prerequisites not met makes this prompt and return */

    const advancesPrerequisites = getGameStats().AdvancesPrerequisites;
    
    if(statName in advancesPrerequisites) {
        let nationSelection = GSGetProperty(selection.split(/\.((?=technologies)|(?=CulturalAdvancements))/i)[0])
        advancesPrerequisites[statName].forEach(prerequisite => {
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
    if (operand == '+' || operand == 'add') {
        change = value;
        const current = parseFloat(GSGetProperty(propertySelection));
        GSSetProperty(propertySelection, current + value)
    }
    //subtract
    else if (operand == '-' || operand == 'sub') {
        change = -value;
        const current = parseFloat(GSGetProperty(propertySelection));
        GSSetProperty(propertySelection, current - value)
    }
    //set
    else if (operand == '=' || operand == 'set') {
        const rawPrevious = GSGetProperty(propertySelection)
        const previous = typeof rawPrevious === 'undefined' ? 'undefined' : JSON.parse(JSON.stringify(GSGetProperty(propertySelection)))
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
        GSSetProperty(propertySelection, setval)

    } else {
        error(`Operand wasn't understood: ${operand}
Aborting.`);
        return;
    }
    PostStatChange(propertySelection, change);
}


export function createStat(currentSelection, arg) {
    let objectClass;
    if (/^\.Nations$/.test(currentSelection)) objectClass = Nation;
    else if (/^\.(Cultures|Religions)$/.test(currentSelection)) objectClass = SocialBehaviour;
    else if (/^\.Nations\..+\.(Culture|Religion)Groups$/.test(currentSelection)) objectClass = SocialBehaviourGroup;
    else if (/^\.Nations\..+\.Climates$/.test(currentSelection)) objectClass = Climate;
    else if (/^\.(Cultures|Religions)\..+\.Opinions$/.test(currentSelection)) objectClass = Opinion;
    else if (/^\.TradeZones$/.test(currentSelection)) objectClass = TradeZone;
    else if (/^\.Trades$/.test(currentSelection)) objectClass = Trade;
    
    if (arg.includes('=')) {
        const newStat = arg.slice(0, arg.indexOf('=')).trim();
        const modelStatNameRaw = arg.slice(arg.indexOf('=') + 1).trim();
        const modelStatName = correctAndSynonymCheck(`${currentSelection}.${modelStatNameRaw}`).split(".").pop();
        if (typeof objectClass == Nation) evaluateNation(modelStatName);

        GSNewProperty(currentSelection + '.' + newStat, objectClass, `"${newStat}"`)
        /* Copy all property values from old to new */
        const modelStat = GSGetProperty(currentSelection + '.' + modelStatName)
        for (const propertyName in modelStat) {
            const propertyToCopy = modelStat[propertyName];
            GSSetProperty(currentSelection + '.' + newStat + '.' + propertyName, JSON.parse(JSON.stringify(propertyToCopy)))
            modelStat[propertyName] = JSON.parse(JSON.stringify(propertyToCopy));
        }
        //for nation copying specifically, override the copied stuff for government name and Aristocrat loyalties towards state
    } else {

        if (objectClass != null)
          GSNewProperty(currentSelection + '.' + arg, objectClass, `"${arg}"`)
        else
          GSSetProperty(currentSelection + '.' + arg, "{}")
        if (typeof objectClass == Nation) evaluateNation(arg);

        PostStatCreate(currentSelection, arg);
    }

}

export function deleteStat(currentSelection, arg) {
    let dottedStatName = correctAndSynonymCheck(`${currentSelection}.${arg}`);
    GSDeleteProperty(dottedStatName)
}

let newOuterAfterRename;
export function renameStat(currentSelection, arg) {
    let newName = arg.slice(arg.indexOf('>') + 1).trim();
    let oldName = arg.slice(0, arg.indexOf('>')).trim();
    oldName = correctAndSynonymCheck(`${currentSelection}.${oldName}`).split(".").pop();

    if (/^\.Nations$/.test(currentSelection)) {
        evaluateNation(oldName);
    }

    //copy over all properties of selected object, as is, except the property with oldName name, it will now be newName named
    let outer = GSGetProperty(currentSelection)
    newOuterAfterRename = new Object();

    Object.keys(outer).forEach(property => {
        newOuterAfterRename[property == oldName ? newName : property] = outer[property];
    });

    GSSetProperty(currentSelection, JSON.stringify(newOuterAfterRename))

    if (/^\.Nations$/.test(currentSelection)) {
        GSUpdateTradesWithRenamedNationName(oldName, newName)
    }
}

export let Shorthands = {}

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

    const trades = getGameStats().Trades

    if (typeof trades[tradename] !== 'undefined') {
        error(`The name ${tradename} is already used in Trades.`);
        return;
    }

    const newTrade = new Trade();
    newTrade.giver = giver;
    newTrade.receiver = receiver;
    newTrade.resource = resourceType;
    newTrade.amount = amount;

    GSSetProperty(`.Trades["${tradename}"]`, JSON.stringify(newTrade))
}

Shorthands.PayDebt = function (currentSelection, parameter) {
    if (isNaN(parameter)) {
        error(`The debt paid wasn't a number. Operation Aborted.`);
        return;
    }

    const natName = /^\.Nations\.(?<natName>.+?)(?:\.|$)/gi.exec(currentSelection).groups.natName
    if (!currentSelection.match(/^\.Nations/gi)) {
        error(`The current selection, ${natName}, is not a nation. Cannot sync single nation.`);
        return;
    }

    evaluateNation(natName)

    //EffectiveDebt formula isolated for Public Debt Taken 
    //EffectiveDebt = PublicDebtTaken * (1 + InterestRate);
    //EffectiveDebt / (1 + InterestRate)= PublicDebtTaken * (1 + InterestRate) / (1 + InterestRate);
    //PublicDebtTaken = EffectiveDebt / (1 + InterestRate);
    const interestRate = GSGetProperty(currentSelection + '.InterestRate')

    const publicDebtTakenSelector = currentSelection + '.PublicDebtTaken'
    const budgetSelector = currentSelection + '.Budget'
    GSAddProperty(publicDebtTakenSelector, -parameter / (1 + interestRate))
    GSAddProperty(budgetSelector, parameter)

    //excess paid back
    const publicDebtTakenValue = GSGetProperty(publicDebtTakenSelector)
    if (publicDebtTakenValue < 0) {
        //reset public debt taken to 0
        GSSetProperty(publicDebtTakenSelector, 0)
        //give back to budget
        GSAddProperty(budgetSelector, -publicDebtTakenValue)
    }
}

Shorthands.Move = function (currentSelection, parameters) {
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

    GSAddProperty(from, -amount)
    GSAddProperty(to, amount)
}
