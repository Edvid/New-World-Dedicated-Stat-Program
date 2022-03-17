// define the options
const options = {
  licenseKey: 'gpl-v3',
  precisionRounding: 5
};

let changedSheetsEvaluated = [];

function evaluateSheets(){
  //convert to hyperformula format
  const hfInstance = HyperFormula.buildEmpty(options);
  for(let i = 0; i < sheetNames.length; i++){
    let sheetI = hfInstance.getSheetId(hfInstance.addSheet(sheetNames[i]));
    hfInstance.setSheetContent(sheetI, changedSheets[sheetNames[i]]);
  }  
  changedSheetsEvaluated = hfInstance.getAllSheetsValues();
}

function readySheets(){

  //make all things that can be rendered as numbers, as numbers

  for (let s = 0; s < sheets.length; s++) {
    const sheet = sheets[s];
    for (let r = 0; r < sheet.length; r++) {
      const row = sheet[r];
      for (let c = 0; c < row.length; c++) {
        const cell = row[c];
        const cellWithoutCommas = cell.replace(",", "");
        if(!isNaN(cellWithoutCommas)) sheets[s][r][c] = cellWithoutCommas;  
      }
    }
  }

  //convert to hyperformula format
  const hfInstance = HyperFormula.buildEmpty(options);
  for(let i = 0; i < sheetNames.length; i++){
    let sheetI = hfInstance.getSheetId(hfInstance.addSheet(sheetNames[i]));
    hfInstance.setSheetContent(sheetI, sheets[i]);
  }  
  sheets = hfInstance.getAllSheetsSerialized();
}