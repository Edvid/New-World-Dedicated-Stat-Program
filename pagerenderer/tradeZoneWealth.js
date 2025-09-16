import "https://cdn.amcharts.com/lib/5/index.js";
import "https://cdn.amcharts.com/lib/5/percent.js";

import { loadGameFromSafeFile } from "../gameloading/loadChangesFromFile.js";
import { addHeader } from "../shared/header.js";
import { rgbToHex } from "../shared/utility.js";
import { prepareData } from "../_utility/images/prepare_data.js";
import { findPos } from "../_utility/find_pos.js";
import { capitalSpacing } from "../_utility/string_manipulation.js";
import { getGameStats } from "../stats/gameStats.js";
import { WIDTH, HEIGHT } from "../_utility/images/consts.js";

let tradezoneinfotable;

addHeader()
await loadGameFromSafeFile()
onLoadStatTradeZoneWealth()


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

    let worldCanvas = document.querySelector("canvas");
    worldCanvas.width = WIDTH;
    worldCanvas.height = HEIGHT;
    worldCanvas.style.width = "60vw";
    
    let worldContext = worldCanvas.getContext("2d");

    let tradeZoneData = await prepareData("TradeZones.png", document.getElementById("isloading"));

    let baseZoneData =  await prepareData("Blank.png", document.getElementById("isloading"));

    let newData = new Uint8ClampedArray(WIDTH * HEIGHT * 4);

    for(let i = 0; i < newData.length / 4; i++) {
        if(tradeZoneData[i*4+3] != 0){
            newData[i*4] = tradeZoneData[i*4];
            newData[i*4+1] = tradeZoneData[i*4+1];
            newData[i*4+2] = tradeZoneData[i*4+2];
        }else{
            newData[i*4] = baseZoneData[i*4];
            newData[i*4+1] = baseZoneData[i*4+1];
            newData[i*4+2] = baseZoneData[i*4+2];
        }
        newData[i*4+3] = 255;
        
    }

    worldContext.putImageData(new ImageData(newData, WIDTH), 0, 0);
    
    worldCanvas.onclick = function (e) {
        let canvasPos = findPos(this);
        let realPos = {
            x: Math.floor((e.pageX - canvasPos.x) * WIDTH / worldCanvas.clientWidth ),
            y: Math.floor((e.pageY - canvasPos.y) * HEIGHT / worldCanvas.clientHeight )
        }
        console.log(`{${realPos.x}, ${realPos.y}}`);
        let data = worldContext.getImageData(realPos.x, realPos.y, 1, 1).data;
        console.log(data);
        let col = `rgba(${data[0]}, ${data[1]}, ${data[2]}, ${data[3]})`
        let weakcol = `rgba(${(data[0] + 255) / 2}, ${(data[1] + 255) / 2}, ${(data[2] + 255) / 2}, ${data[3]})`

        const tradeZoneNames = getGameStats().TradeZones;
        for (const tradeZoneName in tradeZoneNames) {
            const tradeZone = tradeZoneNames[tradeZoneName];
            if(rgbToHex(data).toLowerCase() == tradeZone.Color.toString().toLowerCase()){
                title.innerText = capitalSpacing(tradeZoneName);
                zonewealth.innerText = tradeZone.Score;
                let chartdiv = zoneinfluencerschart(tradeZoneName);
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

    const nations = getGameStats().Nations
    for (const nationName in nations) {
        const nation = nations[nationName];
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
                key: capitalSpacing(keyName),
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
