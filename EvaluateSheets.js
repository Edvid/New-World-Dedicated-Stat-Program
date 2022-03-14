let changedSheetsEvaluated = [];

function evaluateSheets(){
  changedSheetsEvaluated = JSON.parse(JSON.stringify(changedSheets));
  for(let s = 0; s < changedSheets.length; s++){
    const changedSheetEvaluated = changedSheetsEvaluated[s];
    for(let r = 0; r < changedSheetEvaluated.length; r++){
      const changedNationRowEvaluated = changedSheetEvaluated[r];
      for(let c = 0; c < changedNationRowEvaluated.length; c++){
        const changedCellEvaluated = changedNationRowEvaluated[c];
        if(/^[^=].+/.test(changedCellEvaluated)) continue;
          evalutateCell(s, r, c);
      }
    }
  }
}

function evalutateCell(sheet, row, cell){
  //bunch of evaluation work        
}