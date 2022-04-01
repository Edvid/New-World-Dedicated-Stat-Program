let primaryColor = ["red", "green", "DodgerBlue", "purple", "Dark Orange"];
let secondaryColor = ["pink", "light green", "baby blue", "magenta", "Orange"];
        

function createNationSheet(nation){
    let table = document.createElement("table");
    let trh = document.createElement("tr");
    let th1 = document.createElement("th");
    let th2 = document.createElement("th");
    th1.innerHTML = "Stat Name";
    th2.innerHTML = "Stat Value";
    trh.appendChild(th1);
    trh.appendChild(th2);
    table.appendChild(trh);
    for (const nationStatName in nation) {
        const nationStat = ns[nationStatName];
        let tr = document.createElement("tr");
        let td1 = document.createElement("td");
        let td2 = document.createElement("td");
        td1.innerHTML = nationStatName;
        td2.innerHTML = JSON.stringify(nationStat);
        if(td2.innerHTML == "null"){
            td2.style.background = "red";
            td2.style.color = "white";
        }
        tr.appendChild(td1);
        tr.appendChild(td2);
        table.append(tr);
    }
    document.body.appendChild(table);
}