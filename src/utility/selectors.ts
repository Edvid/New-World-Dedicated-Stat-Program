import { Synonyms } from "../ccfassist/synonyms.js";
import { getChangeCommandIndex } from "../gameloading/loadChangesFromFile.js";
import { GSGetProperty } from "../stats/gameStats.js";

//synonym searching and case correcting alg

export function correctAndSynonymCheck(selection) {
  const correctSelection = selection.slice(1).split(".");
  let step = "";
  for (let i = 0; i < correctSelection.length; i++) {
    const matched = matchToken(step, correctSelection[i]);
    if (matched == null) {
      alert(
        `Line ${getChangeCommandIndex()}: The Specified Stat '${correctSelection[i]}' in 'gameStats.${correctSelection.slice(0, i).join(".")}' was not found!`,
      );
      return;
    }
    correctSelection[i] = matched;
    step += `.${correctSelection[i]}`;
  }
  return "." + correctSelection.join(".");
}

function matchToken(searchIn, approxName) {
  const searchObject = GSGetProperty(searchIn);
  const nameToCheck = approxName.toLowerCase().replaceAll(" ", "");

  //check same stats but correct casing
  for (const propertyName in searchObject) {
    if (propertyName.toLowerCase() == nameToCheck) return propertyName;
  }
  //check synonyms of stats
  for (const realName in Synonyms) {
    const synonymArray = Synonyms[realName];
    for (const synonym of synonymArray) {
      //if what was written in change file exists in the synonym dictionary
      if (synonym.toLowerCase() == nameToCheck) {
        //Then, if the real name for the stat exists in this object
        if (realName in searchObject) return realName;
      }
    }
  }

  const subObjects = [];
  for (const objectName in searchObject) {
    if (typeof searchObject[objectName] == "object")
      subObjects.push(objectName);
  }
  if (subObjects.length > 0) {
    for (const element of subObjects) {
      const subMatch = matchToken(`${searchIn}["${element}"]`, approxName);
      if (subMatch != null) return `${element}.${subMatch}`;
    }
  } else {
    return null;
  }
}
