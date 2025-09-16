import { loadGameFromSafeFile } from "../gameloading/loadChangesFromFile.js";
import { addHeader } from "../shared/header.js";
import { capitalSpacing } from "../_utility/string_manipulation.js";
import { getGameStats } from "../stats/gameStats.js";

addHeader()
await loadGameFromSafeFile()

function loadAllTrades(){
    let allTrades = getGameStats().Trades;
    let table = document.createElement("table");
    document.body.appendChild(table);

    let headerRow = document.createElement("tr");
    let headerIsEmpty = true;
    table.appendChild(headerRow);
    let thName = document.createElement("th");
    thName.innerHTML = "Name";
    thName.classList.add("primary-color")
    headerRow.appendChild(thName);

    for (const tradeName in allTrades) {
        const trade = allTrades[tradeName];
        let tradeRow = document.createElement("tr");
        let tdTradeName = document.createElement("td");
        tdTradeName.classList.add("secondary-color")
        tdTradeName.innerText = capitalSpacing(tradeName);
        tradeRow.appendChild(tdTradeName);
        for (const key in trade) {
            const value = trade[key].toString();
            if(headerIsEmpty) {
                let th = document.createElement("th");
                th.classList.add("primary-color")
                th.innerText = key;
                headerRow.appendChild(th);
            }
            let td = document.createElement("td");
            td.classList.add("secondary-color")
            td.innerHTML = capitalSpacing(value);
            tradeRow.appendChild(td);
        }
        headerIsEmpty = false;
        table.appendChild(tradeRow);
    }
}

loadAllTrades()
