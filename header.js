let headerElement = document.querySelector("header");
let homelink = document.createElement("button");
let nationslink = document.createElement("button");
let tradezonelink = document.createElement("button");
let alltradeslink = document.createElement("button");

headerElement.appendChild(homelink);
headerElement.appendChild(nationslink);
headerElement.appendChild(tradezonelink);
headerElement.appendChild(alltradeslink);

homelink.innerText = "home";
nationslink.innerText = "all nations";
tradezonelink.innerText = "trade zone map";
alltradeslink.innerText = "all trades";

homelink.onclick = function(){
    document.location.href = "./";
};

tradezonelink.onclick = function(){
    document.location.href = "./TradeZones";
};

nationslink.style.background = "rgb(200, 163, 231)";

nationslink.onclick = function(){
    let password = prompt('this is an experimental page. Provide password', '');
    
    if(password.hashCode() != 272047786) {
        alert("password incorrect");
        return;
    }
    
    document.location.href = "./Nations";
};

alltradeslink.onclick = function(){
    document.location.href = "./alltrades";
};

