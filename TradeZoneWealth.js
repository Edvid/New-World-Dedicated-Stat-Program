let canvasContainer;
let zonename;
let zonewealth;
let canvasZoomScale = 1;

const WIDTH = 1200;
const HEIGHT = 493;

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


async function onLoad() {
    canvasContainer = document.getElementById("canvascontainer");
    zonename = document.getElementById("zone name");
    zonewealth = document.getElementById("zone wealth");
    
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

        ["5B8F00", "NorthAnatolia"],
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
        ["3DFD00", "YangtzeeRiver"],
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
                zonename.innerText = ColorToZoneNamePair[1].split(/(?<=[a-zA-Z])(?=[A-Z])/gm).join(" ");
                zonewealth.innerText = gameStats.TradeZones[ColorToZoneNamePair[1]];

                zonename.style.background = col;
                zonewealth.style.background = weakcol;
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

function outZoomChange(zoom) {
    canvasZoomScale *= zoom;

    let canvaslist = document.querySelectorAll("#canvascontainer canvas");

    canvaslist.forEach(element => {
        element.style.width = (WIDTH / canvasZoomScale) + "px";
        element.style.height = (HEIGHT / canvasZoomScale) + "px";
    });


}
