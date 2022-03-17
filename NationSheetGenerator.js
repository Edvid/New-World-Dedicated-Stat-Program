let primaryColor = ["red", "green", "DodgerBlue", "purple", "Dark Orange"];
let secondaryColor = ["pink", "light green", "baby blue", "magenta", "Orange"];
        

function createNationSheet(row){
    let NationSheetDiv = document.querySelector("div#NationSheet");

    let nationName = document.createElement("h1");
    nationName.innerHTML = changedSheetsEvaluated["Daily Stuff"][row][0]; 
    NationSheetDiv.appendChild(nationName);
    for (let sheetIndex = 0; sheetIndex < Object.keys(sheets).length; sheetIndex++) {
        if(sheetNames[sheetIndex] == "Trade Zone Wealth") continue;
        const sheetRows = changedSheetsEvaluated[sheetNames[sheetIndex]];
        let nationTable = document.createElement("table");
        nationTable.style.borderCollapse = "collapse";
        let nationTableTitle = document.createElement("h2");
        nationTableTitle.innerHTML = sheetNames[sheetIndex];
        let StatNames = document.createElement("tr");
        let StatCells = document.createElement("tr");
        for (let column = 0; column < sheetRows[0].length; column++) {
            const StatNameText = sheetRows[0][column];
            const StatCellText = sheetRows[row][column];
            
            StatName = document.createElement("th");
            StatName.style.border = "2px solid #444"
            StatName.style.backgroundColor = primaryColor[row % primaryColor.length];
            StatName.innerHTML = StatNameText;
            StatNames.appendChild(StatName);
            StatCell = document.createElement("td");
            StatCell.style.border = "2px solid #444"
            StatCell.innerHTML = StatCellText;
            if(sheetRows[row][column].address !== undefined){
                let StatErrorAddress = document.createElement("span");
                StatErrorAddress.innerHTML = sheetRows[row][column].address;
                StatCell.style.color = "red";
                let br = document.createElement("br");
                StatCell.appendChild(br);
                StatCell.appendChild(StatErrorAddress);
            }
            StatCells.appendChild(StatCell);
            
        }
        nationTable.appendChild(StatNames);
        nationTable.appendChild(StatCells);
        NationSheetDiv.appendChild(nationTableTitle);
        NationSheetDiv.appendChild(nationTable);
    }
}