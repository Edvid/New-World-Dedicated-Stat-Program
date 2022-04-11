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
    let nationIndex = 0;
    let nationName;
    for (const natName in gameStats.Nations) {
        if(nationIndex == nationNum){
            nationName = natName;
            break;
        }
        nationIndex++;
    }

    const nation = gameStats.Nations[nationName];
    let nationTitle = document.createElement("h1");
    nationTitle.innerHTML = nationName;
    nationTitle.style.marginLeft = "5%"
    let table = document.createElement("table");
    table.style.margin = "0% 5% 2% 5%";
    
    let nationStatNameRow = document.createElement("tr");
    nationStatNameRow.style.background = primaryColor[currentNationNumber % primaryColor.length];
    let nationStatRow = document.createElement("tr");
    nationStatRow.style.background = secondaryColor[currentNationNumber % secondaryColor.length];
    
    for (const nationStatName in nation) {
        const nationStat = nation[nationStatName];
        let nationStatNameCell = document.createElement("td");
        nationStatNameCell.innerText = nationStatName.split(/(?<=[a-zA-Z])(?=[A-Z])/gm).join(" ");
        let nationStatCell = document.createElement("td");
        if(!isNaN(nationStat)){
            //integers
            if(~[
                "Population",
                "FuturePopulation"
            ].indexOf(nationStatName)){
                nationStatCell.innerText = parseFloat(nationStat).toFixed(0);
            }
            //percentages
            else if(~[
                "LowerClassTax",
                "MediumClassTax",
                "HighClassTax",
            ].indexOf(nationStatName)){
                nationStatCell.innerText = parseFloat(nationStat * 100).toFixed(2) + "%";
            }
            //normal (2 digits)
            else{
                nationStatCell.innerText = parseFloat(nationStat).toFixed(2);
            }
            
        }else
            nationStatCell.innerText = nationStat;

        nationStatRow.appendChild(nationStatCell);
        nationStatNameRow.appendChild(nationStatNameCell);
    }

    table.appendChild(nationStatNameRow);
    table.appendChild(nationStatRow);

    nationSheetContainer.innerHTML = "";
    nationSheetContainer.appendChild(nationTitle);
    nationSheetContainer.appendChild(table);
}