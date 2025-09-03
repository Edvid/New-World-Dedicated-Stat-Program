loadGameFromSafeFile()

function loadAllTrades(){
    let alltrades = gameStats.Trades;
    let table = document.createElement("table");
    document.body.appendChild(table);

    let headerRow = document.createElement("tr");
    let headerIsEmpty = true;
    table.appendChild(headerRow);
    let thName = document.createElement("th");
    thName.innerHTML = "Name";
    thName.classList.add("primary-color")
    headerRow.appendChild(thName);

    for (const tradeName in alltrades) {
        const trade = alltrades[tradeName];
        let tradeRow = document.createElement("tr");
        let tdTradeName = document.createElement("td");
        tdTradeName.classList.add("secondary-color")
        tdTradeName.innerText = tradeName.capitalSpacing();
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
            td.innerHTML = value.capitalSpacing();
            tradeRow.appendChild(td);
        }
        headerIsEmpty = false;
        table.appendChild(tradeRow);
    }
}

document.querySelector("body").addEventListener("game load done", loadAllTrades);