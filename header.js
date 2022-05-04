let headerElement = document.querySelector("header");
let homelink = document.createElement("button");
let tradezonelink = document.createElement("button");
let alltradeslink = document.createElement("button");

headerElement.appendChild(homelink);
headerElement.appendChild(tradezonelink);
headerElement.appendChild(alltradeslink);

homelink.innerText = "home";
tradezonelink.innerText = "trade zone map";
alltradeslink.innerText = "all trades";

homelink.onclick = function(){
    document.location.href = "./";
};

tradezonelink.onclick = function(){
    document.location.href = "./TradeZones";
};

alltradeslink.onclick = function(){
    document.location.href = "./alltrades";
};

