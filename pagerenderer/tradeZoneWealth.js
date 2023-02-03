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

    let imagePath = "./docs/assets/images/world/TradeZones.png";
    //render image
    let image = new Image(WIDTH, HEIGHT);
    image.src = imagePath;
    image.onload = function () {
        worldContext.drawImage(image, 0, 0, WIDTH, HEIGHT);
    }
    
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
        
        for (TradeZoneName in gameStats.TradeZones) {
            const TradeZone = gameStats.TradeZones[TradeZoneName];
            if(rgbToHex(data).toLowerCase() == TradeZone.Color.toLowerCase()){
                title.innerText = TradeZoneName.capitalSpacing();
                zonewealth.innerText = TradeZone.Score;
                let chartdiv = zoneinfluencerschart(TradeZoneName);
                zoneinfluencers.innerHTML = "";
                zoneinfluencers.appendChild(chartdiv);

                zonewealthname.style.background = col;
                zoneinfluencersname.style.background = col;
                zonewealth.style.background = weakcol;
                zoneinfluencers.style.background = weakcol;
            }
        }
    }
}

function zoneinfluencerschart(zoneName){
    let chartdiv = document.createElement("div");
    chartdiv.style.margin = ".5em";
    chartdiv.style.textAlign = "center";
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

    
    chartdiv.style.width = "500px";
    chartdiv.style.height = (360 + 29*Object.values(chartData).length) + "px";



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
