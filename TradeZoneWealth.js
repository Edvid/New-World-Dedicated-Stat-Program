let canvas;
let zonename;
let zonewealth;
let canvasZoomScale = 1;
let context;

async function onLoad(){
    const symbolToColor = new Map(
        [
            ['.', "White"],
            [' ', "DarkSlateBlue"]
        ]
    );
    
    canvas = document.querySelector("canvas");
    zonename = document.getElementById("zone name");
    zonewealth = document.getElementById("zone wealth");
    context = canvas.getContext("2d");
    changeCanvasZoom(4);
    context.fillStyle = symbolToColor.get(" ");
    context.fillRect(0, 0, canvasZoomScale * canvas.clientWidth, canvasZoomScale * canvas.clientHeight);
            
    let land;

    (async function(){
        await fetch(HOME_ADDRESS + "canvasStrings/world/land.cstr").then(response => response.text()).then(data => land = data);
        land = land.replace(/\t|\r|\n/gmi ,"").split(/(?<=\d)(?!\d)|(?<!\d)/gmi);
        let pixelRows = [];

        if(!isNaN(land[0])) console.error("First item in land string is a number. This is unacceptable syntax");

        for (let i = 0; i < land.length; i += 2) {
            const token = land[i];
            const futureToken = i + 1 < land.length ? land[i + 1] : "";


            pixelRows.push(token);
            if(/^\d+$/.test(futureToken)) {
                pixelRows.push(futureToken);
            }else{
                pixelRows.push("1");
                i--;
            }
                
        }

        console.log(pixelRows);

    

        let currentPixel = 0;
        for (let i = 0; i < pixelRows.length; i+= 2) {
            const symbol = pixelRows[i];
            const number = pixelRows[i + 1];

            const x = currentPixel % canvas.width;
            const y = Math.floor(currentPixel / canvas.width);
            
            currentPixel += +number;

            let overflow = Math.max(0, x + number - canvas.width);

            context.fillStyle = symbolToColor.get(symbol);
            console.log("x: " + x + ",y: " + y + ",color: " + context.fillStyle);
            context.fillRect(x, y, number - overflow, 1);
            if(overflow > 0) context.rect(0, y+1, overflow, 1);
        }           

    })();


}

function changeCanvasZoom(zoom){
    canvasZoomScale *= zoom;
    canvas.style.width = (canvas.width / canvasZoomScale) + "px";
    canvas.style.height = (canvas.height / canvasZoomScale) + "px";
    
}
