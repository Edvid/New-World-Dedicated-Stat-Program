let headerElement = document.createElement("header");
let headerMargin = document.createElement("div");
headerMargin.id = "headerstartspace";

document.querySelector("body").prepend(headerMargin);
document.querySelector("body").prepend(headerElement);

let homelink = document.createElement("button");
let nationslink = document.createElement("button");
let tradezonelink = document.createElement("button");
let alltradeslink = document.createElement("button");
let mapccflink = document.createElement("button");

headerElement.appendChild(homelink);
headerElement.appendChild(nationslink);
headerElement.appendChild(tradezonelink);
headerElement.appendChild(alltradeslink);
headerElement.appendChild(mapccflink);

homelink.innerText = "home";
nationslink.innerText = "Nations' Resource Overlap";
tradezonelink.innerText = "trade zone map";
alltradeslink.innerText = "all trades";
mapccflink.innerText = "map ccf calculations";

mapccflink.classList.add("admintool");

homelink.onclick = function(){
    document.location.href = "./";
};

tradezonelink.onclick = function(){
    document.location.href = "./TradeZones";
};

nationslink.onclick = function(){
    document.location.href = "./Nations";
};

alltradeslink.onclick = function(){
    document.location.href = "./alltrades";
};

mapccflink.onclick = function(){
    document.location.href = "./mapccfcalculations";
};

