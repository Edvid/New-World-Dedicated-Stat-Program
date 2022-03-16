// define the options
const options = {
  licenseKey: 'gpl-v3',
  precisionRounding: 5
};

let changedSheetsEvaluated = [];

function evaluateSheets(){
  const hfInstance = HyperFormula.buildEmpty(options);
  for(let i = 0; i < sheetNames.length; i++){
    let sheetI = hfInstance.getSheetId(hfInstance.addSheet(sheetNames[i]));
    hfInstance.setSheetContent(sheetI, changedSheets[sheetNames[i]]);
  }  
  changedSheetsEvaluated = hfInstance.getAllSheetsValues();
}

function readySheets(){
  const hfInstance = HyperFormula.buildEmpty(options);
  for(let i = 0; i < sheetNames.length; i++){
    let sheetI = hfInstance.getSheetId(hfInstance.addSheet(sheetNames[i]));
    hfInstance.setSheetContent(sheetI, sheets[i]);
  }  
  sheets = hfInstance.getAllSheetsSerialized();
}