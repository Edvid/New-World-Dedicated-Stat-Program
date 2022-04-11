let primaryColor = ["red", "green", "DodgerBlue", "purple", "Dark Orange"];
let secondaryColor = ["pink", "lightgreen", "lightSkyBlue", "magenta", "Orange"];

let nationSheetContainer = document.createElement("div");
nationSheetContainer.style.border = "1px solid black";
nationSheetContainer.style.width = "90%";
nationSheetContainer.style.marginLeft = "5%";

let arrowContainer = document.createElement("div");
arrowContainer.style.border = "1px solid grey"
arrowContainer.style.display = "flex";
arrowContainer.style.justifyContent = "space-between";
arrowContainer.style.margin = "auto";
arrowContainer.style.width = "120px";
arrowContainer.style.padding = "25px";

let currentNationNumber = 0;
let currentNationNumberDisplay = document.createElement("h2");
currentNationNumberDisplay.innerText = "0";

let leftArrow = document.createElement("button");
leftArrow.innerHTML = "&#11164";
leftArrow.onclick = function (){currentNationNumberDisplay.innerText = --currentNationNumber; createNationSheet(currentNationNumber) }

let rightArrow = document.createElement("button");
rightArrow.innerHTML = "&#11166";
rightArrow.onclick = function (){currentNationNumberDisplay.innerText = ++currentNationNumber; createNationSheet(currentNationNumber) }


arrowContainer.appendChild(leftArrow);
arrowContainer.appendChild(currentNationNumberDisplay);
arrowContainer.appendChild(rightArrow);

document.body.appendChild(arrowContainer);
document.body.appendChild(nationSheetContainer);


function createNationSheet(nationNum){
    let i = 0;
    let nationName;
    for (const natName in gameStats.Nations) {
        if(i == nationNum){
            nationName = natName;
            break;
        }
        i++;
    }
    
    const nation = gameStats.Nations[nationName];
    let nationTitle = document.createElement("h1");
    nationTitle.innerHTML = nationName;
    nationTitle.style.marginLeft = "5%"
    let table = document.createElement("table");
    table.style.margin = "0% 5% 2% 5%";
    let trh = document.createElement("tr");
    let th1 = document.createElement("th");
    th1.style.background = primaryColor[currentNationNumber % primaryColor.length];
    let th2 = document.createElement("th");
    th2.style.background = "lightGrey"; 
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
        td1.style.background = secondaryColor[currentNationNumber % secondaryColor.length];
        if(td2.innerHTML == "null" || td2.innerHTML == "undefined"){
            td2.style.background = "red";
            td2.style.color = "white";
        }
        tr.appendChild(td1);
        tr.appendChild(td2);
        table.append(tr);
    }
    nationSheetContainer.innerHTML = "";
    nationSheetContainer.appendChild(nationTitle);
    nationSheetContainer.appendChild(table);
}