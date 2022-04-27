let canvasContainer;
let zonename;
let zonewealth;
let canvasZoomScale = 1;

const WIDTH = 8192;
const HEIGHT = 3363;

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


async function onLoad(){  
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

    worldContext.fillStyle = "DarkSlateBlue";
    worldContext.fillRect(0, 0, worldCanvas.width, worldCanvas.height);

    (async function(){

        
        
        let renderer = (async function(ctx, path, tint){
            let imagePath = HOME_ADDRESS + path;
            
            //render image
            let image = new Image(WIDTH, HEIGHT);
            image.src = imagePath;
            image.onload = function (){
                let startTime = new Date();
                ctx.drawImage(image, 0, 0, WIDTH, HEIGHT);

                if(typeof tint !== 'undefined'){    
                    ctx.fillStyle = tint;
                    ctx.globalCompositeOperation = "multiply";
                    ctx.fillRect(0, 0, WIDTH, HEIGHT);
                    
                    ctx.globalCompositeOperation = "destination-in";
                    ctx.drawImage(image, 0, 0, WIDTH, HEIGHT);
                    
                    console.log("tint: " + tint);
                }
                console.log("completed! Time Took (ms): " + ((new Date()) - startTime));
            }

        });
        
        await renderer(worldContext, "worldImages/world/cleanblankmap.png");        
        
        let zoneColors = ["None", "Pink", "MediumVioletRed", "Beige", "Yellow", "Cyan", "LightGreen", "Bisque", "Orange", "Red", "Purple", "Grey", "YellowGreen", "DarkGreen", "FireBrick", "Green", "CornflowerBlue", "Coral", "DarkOliveGreen", "Magenta"];
        let zoneContexts = [
            "Alaska",
            "Cascadia",
            "WestCoast",
            "HudsonBay",
            "GreatLakes",
            "Mississipi",
            "GulfOfMexico",
            "LawrenceGulf",
            "EastCoast",
            "Carribean",
            "CentralAmerica",

            "GuyanaAndSuriname",
            "Amazon",
            "Peru",
            "RioGrande",
            "LaPlata",
            "Chile",
            "Patagonia",




            "NorthAnatolia",
            "NorthSea",
            "BritishIsles",
            "EnglishChannel",
            "France",
            "BayOfBiscay",
            "WestIberia",
            "Gibraltar",
            "WestMediterreanian",
            "Rhine",
            "CentralMed",
            "Adriatic",
            "Germany",
            "SouthGermany",
            "Denmark",
            "Baltic",
            "NorthNordics",
            "BarentsSea",
            "Novgorod",
            "Poland",
            "Dniepr",
            "Crimea",
            "Balkans",
            "Greece",
            "EastMed",
            "Egypt",
            "RedSea",
            "WestAfrica",
            "CoteDIvoire",
            "Nigeria",
            "SouthNile",
            "Somalia",
            "Kongo",
            "EastAfrica",
            "Mozambique",
            "SouthAfrica",

            "Mesopotamia",
            "PersianGulf",
            "Caucasus",
            "DonRiver",
            "Volga",
            "CentralAsia",
            "WestSiberia",
            "EastSiberia",
            "Iran",
            "Pakistan",
            "Tibet",
            "Mongolia",
            "Manchuria",
            "SeaOfJapan",
            "NorthChina",
            "YangtzeeRiver",
            "SouthChina",
            "NorthIndia",
            "WestIndia",
            "EastIndia",
            "Burma",
            "SouthEastAsia",
            "NorthAustralia",
            "SouthAustralia"
        ];
        for(let i = 0; i < 12/*zoneContexts.length*/; i++){
            let zoneCanvas = document.createElement("canvas");
            zoneCanvas.id = zoneContexts[i];
            zoneCanvas.title = zoneCanvas.id.split(/(?<!\b)(?=[A-Z])/g, " ");
            zoneCanvas.width = WIDTH;
            zoneCanvas.height = HEIGHT;
            canvasContainer.appendChild(zoneCanvas);

            zoneContexts[i] = zoneCanvas.getContext("2d");

             await renderer(zoneContexts[i], "worldImages/tradeZones/Split_" + i + ".png", zoneColors[i]);
        }
        /* changeCanvasZoom(8); */

    })();

}

function outZoomChange(zoom){
    canvasZoomScale *= zoom;

    let canvaslist = document.querySelectorAll("#canvascontainer canvas");

    canvaslist.forEach(element => {
        element.style.width = (WIDTH / canvasZoomScale) + "px";
        element.style.height = (HEIGHT / canvasZoomScale) + "px";    
    });

    
}

function add1infrontOfUnarySymbols(RLE){
    let pixelRows = [];
    for (let i = 0; i < RLE.length; i++) {
        const token = RLE[i];
        
        //if this token is a number
        if(/^\d+$/.test(token)) {
            const futureToken = i + 1 < RLE.length ? RLE[i + 1] : "";
            
            pixelRows.push(token);
            pixelRows.push(futureToken);
            i++;
        }else{
            pixelRows.push("1");
            pixelRows.push(token);
        }
            
    }
    return pixelRows;
}