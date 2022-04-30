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

    let imagePath = HOME_ADDRESS + "images/world/zones.png";
    //render image
    let image = new Image(WIDTH, HEIGHT);
    image.src = imagePath;
    image.onload = function () {
        let startTime = new Date();
        worldContext.drawImage(image, 0, 0, WIDTH, HEIGHT);

        if (typeof tint !== 'undefined') {
            worldContext.fillStyle = tint;
            worldContext.globalCompositeOperation = "multiply";
            worldContext.fillRect(0, 0, WIDTH, HEIGHT);

            worldContext.globalCompositeOperation = "destination-in";
            worldContext.drawImage(image, 0, 0, WIDTH, HEIGHT);
        }
        console.log("completed! Time Took (ms): " + ((new Date()) - startTime));
    }
    let ColorToZoneName = [
        ["ff7f7f", "Alaska"],
        ["ff006e", "Cascadia"],
        ["ffdb7b", "CaliforniaAndWestMexico"],
        ["fbee91", "HudsonBay"],
        ["3dffff", "GreatLakes"],
        ["00ba21", "Louisiana"],
        ["ffbf30", "GulfOfMexico"],
        ["ff7d49", "LawrenceGulf"],
        ["c50000", "EastCoast"],
        ["3c02ff", "Carribean"],
        ["a0a0a0", "CentralAmerica"],

        ["BEFD2B", "GuyanaAndSuriname"],
        ["4C7D00", "Amazon"],
        ["7F0001", "Peru"],
        ["8FFD42", "RioGrande"],
        ["2BA6FF", "LaPlata"],
        ["FFE846", "Chile"],
        ["68D7FF", "Patagonia"],

        ["4C7D00", "NorthAnatolia"],
        ["7382FF", "NorthSea"],
        ["808080", "BritishIsles"],
        ["FF4A00", "EnglishChannel"],
        ["00D5FF", "France"],
        ["FBEE91", "BayOfBiscay"],
        ["4C7D00", "WestIberia"],
        ["7F0001", "Gibraltar"],
        ["FFBF30", "WestMediterreanian"],
        ["008DFA", "Rhine"],
        ["FF7D49", "CentralMed"],
        ["007F0E", "Adriatic"],
        ["8080A3", "Germany"],
        ["404040", "SouthGermany"],
        ["FF0000", "Denmark"],
        ["8F00BF", "Baltic"],
        ["FFD6E4", "NorthNordics"],
        ["FF3D3D", "BarentsSea"],
        ["00FF21", "Novgorod"],
        ["FF7E70", "Poland"],
        ["80FF65", "Dniepr"],
        ["30ABB2", "Crimea"],
        ["CE00DB", "Balkans"],
        ["008DFA", "Greece"],
        ["80FF00", "EastMed"],
		
        ["FF0000", "Egypt"],
        ["4C7D00", "RedSea"],
        ["FEC605", "WestAfrica"],
        ["80FF00", "CoteDIvoire"],
        ["4C7D00", "Nigeria"],
        ["B6FF00", "SouthNile"],
        ["5296AD", "Somalia"],
        ["DD6A00", "Kongo"],
        ["0094D7", "EastAfrica"],
        ["00FF69", "Mozambique"],
        ["8F00FF", "SouthAfrica"],

        ["7F3300", "Mesopotamia"],
        ["FFBF30", "PersianGulf"],
        ["FF3D3D", "Caucasus"],
        ["FFDB7B", "DonRiver"],
        ["D87725", "Volga"],
        ["5297FC", "CentralAsia"],
        ["B6FF00", "WestSiberia"],
        ["4C7D00", "EastSiberia"],
        ["8FFD42", "Iran"],
        ["4C7D00", "Pakistan"],
        ["B200FF", "Tibet"],
        ["F700DA", "Mongolia"],
        ["FFBF30", "Manchuria"],
        ["00FFFF", "SeaOfJapan"],
        ["3AAA0E", "NorthChina"],
        ["3DFD00", "YangtzeeRiver"],
        ["4D007F", "SouthChina"],
        ["D87725", "NorthIndia"],
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
            if(rgbToHex(data).toLowerCase() == ColorToZoneNamePair[0]){
                zonename.innerText = ColorToZoneNamePair[1];
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
    return ((r << 16) | (g << 8) | b).toString(16);
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
