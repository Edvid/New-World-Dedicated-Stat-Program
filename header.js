let headerElement = document.querySelector("header");
let homelink = document.createElement("button");
let tradezonelink = document.createElement("button");

headerElement.appendChild(homelink);
headerElement.appendChild(tradezonelink);

homelink.innerText = "home";
tradezonelink.innerText = "trade zone map";

homelink.onclick = function(){
    document.location.href = "/";
};

tradezonelink.onclick = function(){
    document.location.href = "/tradezones";
};

