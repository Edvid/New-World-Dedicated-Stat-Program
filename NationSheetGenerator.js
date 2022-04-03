let primaryColor = ["red", "green", "DodgerBlue", "purple", "Dark Orange"];
let secondaryColor = ["pink", "lightgreen", "lightSkyBlue", "magenta", "Orange"];
        

let n = 0;
function createNationSheet(nationName){
    const nation = gameStats.Nations[nationName];
    let nationTitle = document.createElement("h1");
    nationTitle.innerHTML = nationName;
    nationTitle.style.marginLeft = "5%"
    let table = document.createElement("table");
    table.style.margin = "0% 5% 2% 5%";
    let trh = document.createElement("tr");
    let th1 = document.createElement("th");
    th1.style.background = primaryColor[n % primaryColor.length];
    let th2 = document.createElement("th");
    th2.style.background = "lightGrey" 
    th1.innerHTML = "Stat Name";
    th2.innerHTML = "Stat Value";
    trh.appendChild(th1);
    trh.appendChild(th2);
    table.appendChild(trh);
    for (const nationStatName in nation) {
        const nationStat = nation[nationStatName];
        let tr = document.createElement("tr");
        let td1 = document.createElement("td");
        let td2 = document.createElement("td");
        td1.innerHTML = nationStatName;
        td2.innerHTML = JSON.stringify(nationStat);
        td1.style.background = secondaryColor[n % secondaryColor.length];
        if(td2.innerHTML == "null" || td2.innerHTML == "undefined"){
            td2.style.background = "red";
            td2.style.color = "white";
        }
        tr.appendChild(td1);
        tr.appendChild(td2);
        table.append(tr);
    }
    document.body.appendChild(nationTitle);
    document.body.appendChild(table);
    n++;
}