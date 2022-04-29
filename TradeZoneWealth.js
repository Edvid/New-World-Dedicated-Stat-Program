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
        ["a0a0a0", "CentralAmerica"]/*,

        ["GuyanaAndSuriname"],
        ["Amazon"],
        ["Peru"],
        ["RioGrande"],
        ["LaPlata"],
        ["Chile"],
        ["Patagonia"],




        ["NorthAnatolia"],
        ["NorthSea"],
        ["BritishIsles"],
        ["EnglishChannel"],
        ["France"],
        ["BayOfBiscay"],
        ["WestIberia"],
        ["Gibraltar"],
        ["WestMediterreanian"],
        ["Rhine"],
        ["CentralMed"],
        ["Adriatic"],
        ["Germany"],
        ["SouthGermany"],
        ["Denmark"],
        ["Baltic"],
        ["NorthNordics"],
        ["BarentsSea"],
        ["Novgorod"],
        ["Poland"],
        ["Dniepr"],
        ["Crimea"],
        ["Balkans"],
        ["Greece"],
        ["EastMed"],
        ["Egypt"],
        ["RedSea"],
        ["WestAfrica"],
        ["CoteDIvoire"],
        ["Nigeria"],
        ["SouthNile"],
        ["Somalia"],
        ["Kongo"],
        ["EastAfrica"],
        ["Mozambique"],
        ["SouthAfrica"],

        ["Mesopotamia"],
        ["PersianGulf"],
        ["Caucasus"],
        ["DonRiver"],
        ["Volga"],
        ["CentralAsia"],
        ["WestSiberia"],
        ["EastSiberia"],
        ["Iran"],
        ["Pakistan"],
        ["Tibet"],
        ["Mongolia"],
        ["Manchuria"],
        ["SeaOfJapan"],
        ["NorthChina"],
        ["YangtzeeRiver"],
        ["SouthChina"],
        ["NorthIndia"],
        ["WestIndia"],
        ["EastIndia"],
        ["Burma"],
        ["SouthEastAsia"],
        ["NorthAustralia"],
        ["SouthAustralia"] */
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
