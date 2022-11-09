const TopStats = [
    {name: "AdministrativeEfficiency", displayName: "AdmEfficiency"},
    {name: "DailyBudget"},
    {name: "Stability"},
    {name: "Population", displayName: "PopulationSize"},
    {name: "Size", displayName: "Area", map: true /*and map*/},
    {name: "OverallNumbers", displayName: "ArmySize"},
    {name: "OverallShipCount", displayName: "NavySize"},
    {name: "ArmyQuality"},
    {name: "NavyQuality"},
    {name: "Literacy", displayName: "LiteracyPercent"},
    {name: "TradePower"},
    {name: "TradeProtection"},
    {name: "OverallIncome"},
    {name: "Production"},
    {name: "ResearchPointGain"},
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
    topStatTable.style.borderCollapse = "collapse";
    
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
        
        TopStatTitle.innerText = TopStat.displayName != null ? TopStat.displayName : TopStat.name;
        TopStatTitle.colSpan = 3;
        TopStatTitle.style.backgroundColor = primaryColor;
        
        TopStatTitle.style.borderBottom = "5px black solid";
        TopStatTitle.style.borderTop = "5px black solid";
        if (c != 0) TopStatTitle.style.borderLeft = "5px black solid";
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
                    ValueTypeFix(TopStat.displayName, gameStats.Nations[NationName][TopStat.displayName]).value : 
                    (gameStats.Nations[NationName][TopStat.name] != null ? 
                        ValueTypeFix(TopStat.name, gameStats.Nations[NationName][TopStat.name]).value : 
                        "unknown"
                    )
                ;

            nameElement.style.backgroundColor = secondaryColor;
            middleElement.style.backgroundColor = primaryColor;
            valueElement.style.backgroundColor = secondaryColor;
            
            nameElement.style.border = "1px black solid";
            middleElement.style.border = "1px black solid";
            valueElement.style.border = "1px black solid";
            
            if (c != 0) nameElement.style.borderLeft = "5px solid black";

            valueElement.style.whiteSpace = "noWrap";

            rows[r].appendChild(nameElement);
            rows[r].appendChild(middleElement);
            rows[r].appendChild(valueElement);
        }
    }
}

