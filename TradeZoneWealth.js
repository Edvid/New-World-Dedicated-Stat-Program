let canvas;
let zonename;
let zonewealth;
let canvasZoomScale = 1;
let context;

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function onLoad(){
    const symbolToColor = new Map(
        [
            ['.', "White"],
            [' ', "DarkSlateBlue"],
            ['-', "Black"]
        ]
    );
    
    canvas = document.querySelector("canvas");
    zonename = document.getElementById("zone name");
    zonewealth = document.getElementById("zone wealth");
    context = canvas.getContext("2d");
    changeCanvasZoom(1);
    context.fillStyle = symbolToColor.get(" ");
    context.fillRect(0, 0, canvasZoomScale * canvas.clientWidth, canvasZoomScale * canvas.clientHeight);
            
    let land;

    (async function(){
        await fetch(HOME_ADDRESS + "RLEs/world/land.cstr").then(response => response.text()).then(data => land = data);
        land = land.replace(/\t|\r|\n/gmi ,"").split(/(?<=\d)(?!\d)|(?<!\d)/gmi);
        let pixelRows = [];

        for (let i = 0; i < land.length; i++) {
            const token = land[i];
            
            //if this token is a number
            if(/^\d+$/.test(token)) {
                const futureToken = i + 1 < land.length ? land[i + 1] : "";
                
                pixelRows.push(token);
                pixelRows.push(futureToken);
                i++;
            }else{
                pixelRows.push("1");
                pixelRows.push(token);
            }
                
        }

    

        let currentPixel = 0;
        let awaitCounter = 0;
        for (let i = 0; i < pixelRows.length; i+= 2) {
            const number = pixelRows[i];
            const symbol = pixelRows[i + 1];

            if(symbol == '$'){
                for(let j = 0; j < number; j++){
                    currentPixel = (Math.floor(currentPixel / canvas.width) + +number) * canvas.width;  
                }
            }else if(symbol == '!'){
                break;
            }else{
                const x = currentPixel % canvas.width;
                const y = Math.floor(currentPixel / canvas.width);
                
                currentPixel += +number;

                let overflow = Math.max(0, x + number - canvas.width);

                context.fillStyle = symbolToColor.get(symbol);
                context.fillRect(x, y, number - overflow, 1);
                if(overflow > 0) context.rect(0, y+1, overflow, 1);
            }

            if (awaitCounter*canvasZoomScale*canvas.width < currentPixel) {
                await sleep(50);
                console.log("currentPixel: " + currentPixel)
                awaitCounter += 20;
            }
        }
    })();


}

function changeCanvasZoom(zoom){
    canvasZoomScale *= zoom;
    canvas.style.width = (canvas.width / canvasZoomScale) + "px";
    canvas.style.height = (canvas.height / canvasZoomScale) + "px";
    
}
