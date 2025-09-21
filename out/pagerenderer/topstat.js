import { loadGameFromSafeFile } from "../gameloading/loadChangesFromFile.js";
import { Header } from "../components/header.js";
import { ValueTypeFix } from "../utility/stat_types.js";
import { getGameStats } from "../stats/gameStats.js";
const TopStats = [
    { name: "Population", displayName: "Population" },
    { name: "BudgetPerTurn", displayName: "Income" },
    { name: "Budget", displayName: "Budget" },
    { name: "LiteracyPercent", displayName: "Literacy" },
    { name: "AverageSol", displayName: "Standard of Living" },
    { name: "Gdp", displayName: "GDP" },
    { name: "GdpPerKCapita", displayName: "GDP per K Capita" },
    { name: "DebtToGdpRatio", displayName: "Debt to GDP Ratio" },
    { name: "Stability", displayName: "Stability" },
    { name: "WarSupport", displayName: "War Support" },
    { name: "AverageDevelopment", displayName: "Development" },
    { name: "AdministrativeEfficiency", displayName: "Administrative Efficiency" },
    { name: "OverallNumbers", displayName: "Army" },
    { name: "NavalPower", displayName: "Navy" },
    { name: "FoodPerTurn", displayName: "Daily Food" },
    { name: "Size", displayName: "Size" }
];
document.body.prepend(Header());
await loadGameFromSafeFile();
populateTopStatTable();
function populateTopStatTable() {
    const nations = getGameStats().Nations;
    let nationNames = Object.keys(nations);
    let topStatTitle = document.createElement("h1");
    let topStatTable = document.createElement("table");
    let body = document.querySelector("body");
    body.appendChild(topStatTitle);
    body.appendChild(topStatTable);
    topStatTitle.innerHTML = "Top Stats:";
    topStatTitle.style.marginTop = ".5em";
    topStatTitle.style.marginBottom = ".5em";
    topStatTable.style.borderCollapse = "collapse";
    let rows = [];
    //initialise rows
    for (let i = 0; i < nationNames.length + 1; i++) {
        rows.push(document.createElement("tr"));
        topStatTable.appendChild(rows[i]);
    }
    //populate header row
    for (let c = 0; c < TopStats.length; c++) {
        const TopStat = TopStats[c];
        const TopStatTitle = document.createElement("th");
        TopStatTitle.innerText = TopStat.displayName != null ? TopStat.displayName : TopStat.name;
        TopStatTitle.colSpan = TopStat.map ? 4 : 3;
        TopStatTitle.classList.add("primary-color");
        TopStatTitle.style.borderBottom = "5px black solid";
        TopStatTitle.style.borderTop = "5px black solid";
        TopStatTitle.style.padding = "4px";
        if (c != 0)
            TopStatTitle.style.borderLeft = "5px black solid";
        rows[0].appendChild(TopStatTitle);
    }
    for (let c = 0; c < TopStats.length; c++) {
        const topStat = TopStats[c];
        //sort for this stat
        nationNames.sort((a, b) => nations[b][topStat.name] - nations[a][topStat.name]);
        //populate column
        for (let r = 1; r < nationNames.length + 1; r++) {
            const NationName = nationNames[r - 1];
            const flagElement = document.createElement("td");
            const nameElement = document.createElement("td");
            const valueElement = document.createElement("td");
            const flag = document.createElement("img");
            flag.style.width = "30px";
            flag.src = nations[NationName].Flag;
            flagElement.appendChild(flag);
            nameElement.innerText = NationName;
            let statval = ValueTypeFix(topStat.name, nations[NationName][topStat.name]).value;
            valueElement.innerText = statval;
            flagElement.classList.add("secondary-color");
            nameElement.classList.add("secondary-color");
            valueElement.classList.add("secondary-color");
            flagElement.style.border = "1px black solid";
            nameElement.style.border = "1px black solid";
            valueElement.style.border = "1px black solid";
            flagElement.style.padding = "2px";
            nameElement.style.padding = "2px";
            valueElement.style.padding = "2px";
            nameElement.style.textAlign = "center";
            valueElement.style.textAlign = "center";
            if (c != 0)
                flagElement.style.borderLeft = "5px solid black";
            valueElement.style.whiteSpace = "noWrap";
            rows[r].appendChild(flagElement);
            rows[r].appendChild(nameElement);
            rows[r].appendChild(valueElement);
            if (topStat.map != null) {
                let imgButton = document.createElement("a");
                imgButton.href = `./IndividualNation?col=${nations[NationName].Color}`;
                imgButton.target = "_blank";
                let img = document.createElement("img");
                img.src = "./docs/assets/images/world/small_blank.png";
                img.title = `see ${NationName} specific area`;
                let imgcell = document.createElement("td");
                imgcell.classList.add("secondary-color");
                imgcell.style.border = "1px black solid";
                imgButton.appendChild(img);
                imgcell.appendChild(imgButton);
                rows[r].appendChild(imgcell);
            }
            if (r == nationNames.length) {
                rows[r].querySelectorAll("td").forEach(element => {
                    element.style.borderBottom = "5px solid black";
                });
            }
        }
    }
}
