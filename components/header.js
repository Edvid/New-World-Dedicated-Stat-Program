const buttonNamesAndLinks = [
  {name: "home", link: "./"},
  {name: "Nations' Resource Overlap", link: "./Nations"},
  {name: "Trade Zone Map", link: "./TradeZones"},
  {name: "All Trades", link: "./alltrades"},
  {name: "Top Stat", link: "./TopStat"},
  {name: "Map Ccf Calculations", link: "./mapccfcalculations", class: "admintool"},
]

export function Header() {
  const headerParent = document.createElement("div")
  headerParent.appendChild(HeaderBody())
  headerParent.appendChild(HeaderMargin())
  return headerParent
}

function HeaderBody() {
  let headerBody = document.createElement("header");

  buttonNamesAndLinks.forEach(buttonInfo => {
    headerBody.appendChild(Button(buttonInfo))
  });

  return headerBody;
}

function Button(buttonInfo) {
  const button = document.createElement("button");
  button.innerText = buttonInfo.name;

  button.onclick = function(){
    document.location.href = buttonInfo.link;
  };

  if(buttonInfo.class != null) button.classList.add(buttonInfo.class);
  if(buttonInfo.disabled) button.disabled = true;
  return button;
}

function HeaderMargin() {
  const headerMargin = document.createElement("div");
  headerMargin.id = "headerstartspace";
  return headerMargin;
}
