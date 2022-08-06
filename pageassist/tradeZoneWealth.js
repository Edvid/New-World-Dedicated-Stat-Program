let tradezoneinfotable;
let canvasContainer;
let zonewealth;
let canvasZoomScale = 1;

const WIDTH = 1200;
const HEIGHT = 493;

document.querySelector("body").onload = async function () {
    document.getElementById("isloading").innerText = "Loading..."
}
async function onLoadStatTradeZoneWealth() {
    document.getElementById("isloading").innerText = ""
    tradezoneinfotable = document.getElementById("infotable");

    let title = document.createElement("h1");
    tradezoneinfotable.appendChild(title);
    title.innerText = "Click on any zone to get value!"
    let table = document.createElement("table");
    tradezoneinfotable.appendChild(table);
    let tr = document.createElement("tr");
    table.appendChild(tr);
    let zonewealthname = document.createElement("th");
    tr.appendChild(zonewealthname);
    zonewealthname.innerHTML = "Zone Wealth";
    let zoneinfluencersname = document.createElement("th");
    tr.appendChild(zoneinfluencersname);
    zoneinfluencersname.innerHTML = "Zone Influencers"
    let tr2 = document.createElement("tr");
    table.appendChild(tr2);
    let zonewealth = document.createElement("td");
    tr2.appendChild(zonewealth);
    let zoneinfluencers = document.createElement("td");
    tr2.appendChild(zoneinfluencers);

    canvasContainer = document.getElementById("canvascontainer");
    
    let worldCanvas = document.createElement("canvas");
    worldCanvas.id = "worldcanvas";
    canvasContainer.width = WIDTH;
    canvasContainer.height = HEIGHT;
    worldCanvas.width = WIDTH;
    worldCanvas.height = HEIGHT;
    canvasContainer.appendChild(worldCanvas);

    let worldContext = worldCanvas.getContext("2d");

    let imagePath = "./docs/assets/images/world/zones.png";
    //render image
    let image = new Image(WIDTH, HEIGHT);
    image.src = imagePath;
    image.onload = function () {
        worldContext.drawImage(image, 0, 0, WIDTH, HEIGHT);
    }
    let ColorToZoneName = [
        ["FF6C7A", "Alaska"],
        ["FF006E", "Cascadia"],
        ["FFDB7B", "CaliforniaAndWestMexico"],
        ["FFEB63", "HudsonBay"],
        ["3DFFFF", "GreatLakes"],
        ["00BA21", "Louisiana"],
        ["FFAC54", "GulfOfMexico"],
        ["FF6A38", "LawrenceGulf"],
        ["CC0000", "EastCoast"],
        ["3C02FF", "Carribean"],
        ["A0A0A0", "CentralAmerica"],

        ["C3FF2B", "GuyanaAndSuriname"],
        ["2D9600", "Amazon"],
        ["9E0000", "Peru"],
        ["6AFF2B", "RioGrande"],
        ["2BA6FF", "LaPlata"],
        ["FFE846", "Chile"],
        ["68D7FF", "Patagonia"],

        ["5B8F00", "NorthernAnatolia"],
        ["7382FF", "NorthSea"],
        ["808080", "BritishIsles"],
        ["FF4A00", "EnglishChannel"],
        ["00D5FF", "France"],
        ["EFFF66", "BayOfBiscay"],
        ["3A9112", "WestIberia"],
        ["7F0001", "Gibraltar"],
        ["FFD846", "WesternMediterranean"],
        ["0094FF", "Rhine"],
        ["FF7D49", "CentralMediterranean"],
        ["007F0E", "Adriatic"],
        ["8080A3", "Germany"],
        ["404040", "WesternDanube"],
        ["FF0000", "Denmark"],
        ["8F00C2", "Baltic"],
        ["FFD6E4", "NorthNordics"],
        ["FF553E", "BarentsSea"],
        ["00FF21", "Novgorod"],
        ["FF7E70", "Poland"],
        ["80FF65", "Dniepr"],
        ["31AADB", "Crimea"],
        ["D100DC", "EasternDanube"],
        ["0065FF", "Greece"],
        ["80FF00", "EasternMediterranean"],
		
        ["FF1410", "Egypt"],
        ["2B6D0E", "RedSea"],
        ["FED800", "WesternSahara"],
        ["69FF00", "CoteDIvoire"],
        ["2B7F0E", "Nigeria"],
        ["D9FF00", "SouthNile"],
        ["529BAE", "Somalia"],
        ["DD6A00", "Kongo"],
        ["0094D7", "EastAfrica"],
        ["00FF69", "Mozambique"],
        ["8F00FF", "SouthAfrica"],

        ["7F3300", "Mesopotamia"],
        ["FFC430", "PersianGulf"],
        ["FF2F3E", "Caucasus"],
        ["FFD86D", "DonRiver"],
        ["DB7A25", "Volga"],
        ["5297FC", "CentralAsia"],
        ["B6FF00", "WestSiberia"],
        ["5B7F00", "EastSiberia"],
        ["8FFD42", "Iran"],
        ["267F00", "Pakistan"],
        ["B200FF", "Tibet"],
        ["F700DA", "Mongolia"],
        ["FFD15E", "Manchuria"],
        ["00FFFF", "SeaOfJapan"],
        ["3AAA0E", "NorthChina"],
        ["3DFD00", "YangtzeRiver"],
        ["4D007F", "SouthChina"],
        ["DB6525", "NorthIndia"],
        ["D10097", "WestIndia"],
        ["30ABB2", "EastIndia"],
        ["FF3D3D", "Burma"],
        ["FEC605", "SouthEastAsia"],
        ["FF7400", "NorthAustralia"],
        ["B6C2FF", "SouthAustralia"]
    ];

    worldCanvas.onclick = function (e) {
        
        let context = worldCanvas.getContext("2d");
        
        let canvasPos = findPos(this);
        let realPos = {
            x: e.pageX - canvasPos.x,
            y: e.pageY - canvasPos.y
        }
        let data = context.getImageData(realPos.x, realPos.y, 1, 1).data;
        let col = `rgba(${data[0]}, ${data[1]}, ${data[2]}, ${data[3]})`
        let weakcol = `rgba(${(data[0] + 255) / 2}, ${(data[1] + 255) / 2}, ${(data[2] + 255) / 2}, ${data[3]})`
        
        for (let i = 0; i < ColorToZoneName.length; i++) {
            const ColorToZoneNamePair = ColorToZoneName[i];
            if(rgbToHex(data).toLowerCase() == ColorToZoneNamePair[0].toLowerCase()){
                title.innerText = ColorToZoneNamePair[1].capitalSpacing();
                zonewealth.innerText = gameStats.TradeZones[ColorToZoneNamePair[1]];
                let chartdiv = zoneinfluencerschart(ColorToZoneNamePair[1]);
                zoneinfluencers.    innerHTML = "";
                zoneinfluencers.appendChild(chartdiv);

                zonewealthname.style.background = col;
                zoneinfluencersname.style.background = col;
                zonewealth.style.background = weakcol;
                zoneinfluencers.style.background = weakcol;
            }
        }
    }
}

/* #region  taken from https://stackoverflow.com/questions/6735470/get-pixel-color-from-canvas-on-mousemove, answer by Wayne and Woold */
function findPos(obj) {
    var curleft = 0, curtop = 0;
    if (obj.offsetParent) {
        do {
            curleft += obj.offsetLeft;
            curtop += obj.offsetTop;
        } while (obj = obj.offsetParent);
        return { x: curleft, y: curtop };
    }
    return undefined;
}

function rgbToHex(color) {
    let r = color[0];
    let g = color[1];
    let b = color[2];
    if (r > 255 || g > 255 || b > 255)
        throw "Invalid color component";
    let str = ((r << 16) | (g << 8) | b).toString(16);
    while(str.length < 6) str = "0" + str;
    return str;
}
/* #endregion */

function zoneinfluencerschart(zoneName){
    let chartdiv = document.createElement("div");
    chartdiv.style.margin = ".5em";
    chartdiv.style.textAlign = "center";
    chartdiv.style.width = "500px";
    chartdiv.style.height = "360px";
    chartdiv.style.border = "3px solid black";
    
    let ObjectToChartNationRef = new Object();

    for (const nationName in gameStats.Nations) {
        const nation = gameStats.Nations[nationName];
        if(nation.TradeInfluences[zoneName].TradingPoints == 0) continue;
        ObjectToChartNationRef[nationName] = {influence: nation.TradeInfluences[zoneName].TradingPoints};
        
    }
    
    let root = am5.Root.new(chartdiv);

    let chart = root.container.children.push(
        am5percent.PieChart.new(root, {
            background: am5.Rectangle.new(root, {
                fill: am5.color(0xfffff4),
                fillOpacity: 1.0
              }),
            layout: root.verticalLayout
        })
    );
    let chartData = [];
    for (const keyName in ObjectToChartNationRef) {
        const keyValue = ObjectToChartNationRef[keyName];

        let objectPoints = keyValue;
        while (isNaN(objectPoints)) {
            if (objectPoints === null) {
                objectPoints = 0;
            } else if (typeof objectPoints === 'object') {
                objectPoints = objectPoints.influence;
            }
        }

        if (objectPoints === 0) continue;

        chartData.push(
            {
                key: keyName.capitalSpacing(),
                Points: objectPoints
            }
        );
    }

    var series = chart.series.push(
        am5percent.PieSeries.new(root, {
            name: "Series",
            categoryField: "key",
            valueField: "Points",
            legendLabelText: "[{fill}]{category}[/]",
            legendValueText: "[bold {fill}][/]"
        })
    );

    series.data.setAll(chartData);
    series.labels.template.set("visible", false);
    series.ticks.template.set("visible", false);

    // Add legend
    var legend = chart.children.push(
        am5.Legend.new(root, {
            centerX: am5.percent(50),
            x: am5.percent(50),
            layout: root.verticalLayout
        })
    );

    legend.data.setAll(series.dataItems);





    return chartdiv;

}

function outZoomChange(zoom) {
    canvasZoomScale *= zoom;

    let canvaslist = document.querySelectorAll("#canvascontainer canvas");

    canvaslist.forEach(element => {
        element.style.width = (WIDTH / canvasZoomScale) + "px";
        element.style.height = (HEIGHT / canvasZoomScale) + "px";
    });


}
