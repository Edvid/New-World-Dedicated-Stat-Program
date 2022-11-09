const TopStats = [
    {name: "AdministrativeEfficiency", displayName: "AdmEfficiency"},
    {name: "DailyBudget"},
    {name: "Stability"},
    {name: "PopulationSize"},
    {name: "Area" /*and map*/},
    {name: "ArmySize"},
    {name: "NavySize"},
    {name: "ArmyQuality"},
    {name: "NavyQuality"},
    {name: "Literacy"},
    {name: "TradePower"},
    {name: "TradeProtection"},
    {name: "OverallIncome"},
    {name: "Production"},
    {name: "ReseachPointGain"},
];

document.querySelector("body").addEventListener("game load done", populateTopStatTable);

function populateTopStatTable(){
    
    let nationNames = Object.keys(gameStats.Nations);

    let topStatLabel = document.createElement("label");
    let topStatTable = document.createElement("table");

    let body = document.querySelector("body");

    body.appendChild(topStatLabel);
    body.appendChild(topStatTable);

    topStatLabel.innerHTML = "Top Stats:"

    let rows = [];

    //initialise rows
    for(let i = 0; i < nationNames.length + 1; i++){
        rows.push(document.createElement("tr"));
        topStatTable.appendChild(rows[i]);
    }

    //populate header row
    for (let c = 0; c < TopStats.length; c++) {
        const TopStat = TopStats[c];
        const TopStatTitle = document.createElement("th");
        TopStatTitle.innerText = TopStat.name;
        TopStatTitle.colSpan = 3;
        rows[0].appendChild(TopStatTitle);
    }


    for(let c = 0; c < TopStats.length; c++){
        const TopStat = TopStats[c];
        //sort for this stat

        //populate column
        for (let r = 1; r < nationNames.length + 1; r++) {
            const NationName = nationNames[r - 1];
            const nameElement = document.createElement("td");
            const middleElement = document.createElement("th");
            const valueElement = document.createElement("td");
            
            nameElement.innerText = NationName;
            middleElement.innerText = "with: ";
            valueElement.innerText = 
                gameStats.Nations[NationName][TopStat.displayName] != null ? 
                    gameStats.Nations[NationName][TopStat.displayName] : 
                    (gameStats.Nations[NationName][TopStat.name] != null ? 
                        gameStats.Nations[NationName][TopStat.name] : 
                        "unknown"
                    )
                ;

            nameElement.style.borderLeft = "5px solid black"

            rows[r].appendChild(nameElement);
            rows[r].appendChild(middleElement);
            rows[r].appendChild(valueElement);
        }
    }
}

