import "https://cdn.amcharts.com/lib/5/index.js";
import "https://cdn.amcharts.com/lib/5/percent.js";
import { loadGameFromSafeFile } from "../gameloading/loadChangesFromFile.js";
import { Header } from "../components/header.js";
import { RGBAToHex } from "../utility/color_manipulation.js";
import { prepareData } from "../utility/images/prepare_data.js";
import { findPos } from "../utility/find_pos.js";
import { capitalSpacing } from "../utility/string_manipulation.js";
import { getGameStats } from "../stats/gameStats.js";
import { WIDTH, HEIGHT } from "../utility/images/consts.js";
let tradezoneinfotable;
document.body.prepend(Header());
await loadGameFromSafeFile();
onLoadStatTradeZoneWealth();
document.querySelector("body").onload = async function () {
    document.getElementById("isloading").innerText = "Loading...";
};
async function onLoadStatTradeZoneWealth() {
    document.getElementById("isloading").innerText = "";
    tradezoneinfotable = document.getElementById("infotable");
    const title = document.createElement("h1");
    tradezoneinfotable.appendChild(title);
    title.innerText = "Click on any zone to get value!";
    const table = document.createElement("table");
    tradezoneinfotable.appendChild(table);
    const tr = document.createElement("tr");
    table.appendChild(tr);
    const zonewealthname = document.createElement("th");
    tr.appendChild(zonewealthname);
    zonewealthname.innerHTML = "Zone Wealth";
    const zoneinfluencersname = document.createElement("th");
    tr.appendChild(zoneinfluencersname);
    zoneinfluencersname.innerHTML = "Zone Influencers";
    const tr2 = document.createElement("tr");
    table.appendChild(tr2);
    const zonewealth = document.createElement("td");
    tr2.appendChild(zonewealth);
    const zoneinfluencers = document.createElement("td");
    tr2.appendChild(zoneinfluencers);
    const worldCanvas = document.querySelector("canvas");
    worldCanvas.width = WIDTH;
    worldCanvas.height = HEIGHT;
    worldCanvas.style.width = "60vw";
    const worldContext = worldCanvas.getContext("2d");
    const tradeZoneData = await prepareData("TradeZones.png", document.getElementById("isloading"));
    const baseZoneData = await prepareData("Blank.png", document.getElementById("isloading"));
    const newData = new Uint8ClampedArray(WIDTH * HEIGHT * 4);
    for (let i = 0; i < newData.length / 4; i++) {
        if (tradeZoneData[i * 4 + 3] != 0) {
            newData[i * 4] = tradeZoneData[i * 4];
            newData[i * 4 + 1] = tradeZoneData[i * 4 + 1];
            newData[i * 4 + 2] = tradeZoneData[i * 4 + 2];
        }
        else {
            newData[i * 4] = baseZoneData[i * 4];
            newData[i * 4 + 1] = baseZoneData[i * 4 + 1];
            newData[i * 4 + 2] = baseZoneData[i * 4 + 2];
        }
        newData[i * 4 + 3] = 255;
    }
    worldContext.putImageData(new ImageData(newData, WIDTH), 0, 0);
    worldCanvas.onclick = function (e) {
        const canvasPos = findPos(this);
        const realPos = {
            x: Math.floor((e.pageX - canvasPos.x) * WIDTH / worldCanvas.clientWidth),
            y: Math.floor((e.pageY - canvasPos.y) * HEIGHT / worldCanvas.clientHeight)
        };
        console.log(`{${realPos.x}, ${realPos.y}}`);
        const data = Array.from(worldContext.getImageData(realPos.x, realPos.y, 1, 1).data);
        const dataRGB = [data[0], data[1], data[2]];
        console.log(data);
        const col = `rgba(${data[0]}, ${data[1]}, ${data[2]}, ${data[3]})`;
        const weakcol = `rgba(${(data[0] + 255) / 2}, ${(data[1] + 255) / 2}, ${(data[2] + 255) / 2}, ${data[3]})`;
        const tradeZoneNames = getGameStats().TradeZones;
        for (const tradeZoneName in tradeZoneNames) {
            const tradeZone = tradeZoneNames[tradeZoneName];
            if (RGBAToHex(dataRGB).toLowerCase() == tradeZone.Color.toString().toLowerCase()) {
                title.innerText = capitalSpacing(tradeZoneName);
                zonewealth.innerText = tradeZone.Score;
                const chartdiv = zoneinfluencerschart(tradeZoneName);
                zoneinfluencers.innerHTML = "";
                zoneinfluencers.appendChild(chartdiv);
                zonewealthname.style.background = col;
                zoneinfluencersname.style.background = col;
                zonewealth.style.background = weakcol;
                zoneinfluencers.style.background = weakcol;
            }
        }
    };
}
function zoneinfluencerschart(zoneName) {
    const chartdiv = document.createElement("div");
    chartdiv.style.margin = ".5em";
    chartdiv.style.textAlign = "center";
    chartdiv.style.border = "3px solid black";
    const ObjectToChartNationRef = new Object();
    const nations = getGameStats().Nations;
    for (const nationName in nations) {
        const nation = nations[nationName];
        if (nation.TradeInfluences[zoneName].TradingPoints == 0)
            continue;
        ObjectToChartNationRef[nationName] = { influence: nation.TradeInfluences[zoneName].TradingPoints };
    }
    const root = am5.Root.new(chartdiv);
    const chart = root.container.children.push(am5percent.PieChart.new(root, {
        background: am5.Rectangle.new(root, {
            fill: am5.color(0xfffff4),
            fillOpacity: 1.0
        }),
        layout: root.verticalLayout
    }));
    const chartData = [];
    for (const keyName in ObjectToChartNationRef) {
        const keyValue = ObjectToChartNationRef[keyName];
        let objectPoints = keyValue;
        while (isNaN(objectPoints)) {
            if (objectPoints === null) {
                objectPoints = 0;
            }
            else if (typeof objectPoints === 'object') {
                objectPoints = objectPoints.influence;
            }
        }
        if (objectPoints === 0)
            continue;
        chartData.push({
            key: capitalSpacing(keyName),
            Points: objectPoints
        });
    }
    const series = chart.series.push(am5percent.PieSeries.new(root, {
        name: "Series",
        categoryField: "key",
        valueField: "Points",
        legendLabelText: "[{fill}]{category}[/]",
        legendValueText: "[bold {fill}][/]"
    }));
    series.data.setAll(chartData);
    series.labels.template.set("visible", false);
    series.ticks.template.set("visible", false);
    // Add legend
    const legend = chart.children.push(am5.Legend.new(root, {
        centerX: am5.percent(50),
        x: am5.percent(50),
        layout: root.verticalLayout
    }));
    legend.data.setAll(series.dataItems);
    chartdiv.style.width = "500px";
    chartdiv.style.height = (360 + 29 * Object.values(chartData).length) + "px";
    return chartdiv;
}
