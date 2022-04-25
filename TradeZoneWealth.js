let canvasContainer;
let zonename;
let zonewealth;
let canvasZoomScale = 1;

const WIDTH = 8192;
const HEIGHT = 3363;

const symbols = " !\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

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
            
    let land;
    let zones;

    (async function(){
        await fetch(HOME_ADDRESS + "RLEs/world/land.cstr").then(response => response.text()).then(data => land = data);
        await fetch(HOME_ADDRESS + "RLEs/world/zones.cstr").then(response => response.text()).then(data => zones = data);
        land = land.replace(/\t|\r|\n/gmi ,"").split(/(?<=\d)(?!\d)|(?<!\d)/gmi);
        zones = zones.replace(/\t|\r|\n/gmi ,"").split(/(?<=\d)(?!\d)|(?<!\d)/gmi);
        let landPixelRows = add1infrontOfUnarySymbols(land);
        let zonesPixelRows = add1infrontOfUnarySymbols(zones);

        let runner = (async function(pixelRows, ctxs, colorlist){
            let startTime = new Date();
            let currentPixel = 0;

            let ctx = ctxs;
            
            let then = new Date();

            for (let i = 0; i < pixelRows.length; i+= 2) {
                const number = pixelRows[i];
                const symbol = pixelRows[i + 1];
                
                
                const x = currentPixel % WIDTH;
                const y = Math.floor(currentPixel / WIDTH);
                
                currentPixel += +number;
                
                if(Array.isArray(ctxs)) {
                    let index = symbols.indexOf(symbol); 
                    if(index < 0) continue; 
                    ctx = ctxs[index - 1];
                }

                let overflow = Math.max(0, (x + +number) - WIDTH);
                
                let col = colorlist[symbols.indexOf(symbol) % colorlist.length];
                if(col != "None"){
                    ctx.fillStyle = col;
                    ctx.fillRect(x, y, number - overflow, 1);
                    if(overflow > 0) ctx.rect(0, y+1, overflow, 1);    
                }
                
    
                let now = new Date();
                if ((now - then) > 500) {
                    then = new Date();
                    await sleep(25);
                }
            }
            console.log("completed! Time Took (ms): " + ((new Date()) - startTime));
        });
        
        await runner(landPixelRows, worldContext, ["None", "Black", "White"]);

        
        
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
        for(let i = 0; i < zoneContexts.length; i++){
            let zoneCanvas = document.createElement("canvas");
            zoneCanvas.id = zoneContexts[i];
            zoneCanvas.title = zoneCanvas.id.split(/(?<!\b)(?=[A-Z])/g, " ");
            zoneCanvas.width = WIDTH;
            zoneCanvas.height = HEIGHT;
            canvasContainer.appendChild(zoneCanvas);

            zoneContexts[i] = zoneCanvas.getContext("2d");
            
        }
        changeCanvasZoom(8);

        await runner(zonesPixelRows, zoneContexts, zoneColors);
    
    })();

}

function changeCanvasZoom(zoom){
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