let buttonNamesAndLinks = [
    {name: "home", link: "./"},
    {name: "Nations' Resource Overlap", link: "./Nations"},
    {name: "Trade Zone Map", link: "./TradeZones"},
    {name: "All Trades", link: "./alltrades"},
    {name: "Top Stat", link: "./TopStat"},
    {name: "Map Ccf Calculations", link: "./mapccfcalculations", class: "admintool"},
]

let headerElement = document.createElement("header");
let headerMargin = document.createElement("div");
headerMargin.id = "headerstartspace";

document.querySelector("body").prepend(headerMargin);
document.querySelector("body").prepend(headerElement);

buttonNamesAndLinks.forEach(button =>{
    let btn = document.createElement("button");
    btn.innerHTML = button.name;
    btn.onclick = function(){
        document.location.href = button.link;
    };

    if(button.class != null) btn.classList.add(button.class);

    headerElement.appendChild(btn);
});