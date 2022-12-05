
const WIDTH = 8192;
const HEIGHT = 3365;

let color = new URLSearchParams(window.location.search).get('col')
let canvas = document.querySelector("canvas");

canvas.style.width = "0px";
canvas.style.height = "0px";

canvas.width = WIDTH;
canvas.height = HEIGHT;

const nationImagePath = "./docs/assets/images/world/Nations.png";
const climateImagePath = "./docs/assets/images/world/Climates.png";
const nationImage = new Image(WIDTH, HEIGHT);
let nationData;
let climateData;
nationImage.src = nationImagePath;
nationImage.onload = async function () {
    canvas.getContext("2d").drawImage(nationImage, 0, 0, WIDTH, HEIGHT);

    nationData = canvas.getContext("2d").getImageData(0, 0, WIDTH, HEIGHT).data;

    const climateImage = new Image(WIDTH, HEIGHT);
    climateImage.src = climateImagePath;

    climateImage.onload = async function () {
        canvas.getContext("2d").drawImage(climateImage, 0, 0, WIDTH, HEIGHT);
        
        climateData = canvas.getContext("2d").getImageData(0, 0, WIDTH, HEIGHT).data;

        for(let j = 0; j < nationData.length / 4; j++){
            //if climatedat transparent, make blue
            if(climateData[j*4+3] == '0'){
                nationData[j*4] = 128;
                nationData[j*4+1] = 128;
                nationData[j*4+2] = 255;
                nationData[j*4+3] = 255;
            }
            //if nationdat is not the nation color. Make white 
            else if(rgbToHex([nationData[j*4], nationData[j*4+1], nationData[j*4+2]]) != color) {
                nationData[j*4] = 255;
                nationData[j*4+1] = 255;
                nationData[j*4+2] = 255;
                nationData[j*4+3] = 255;
            }
            //nation is always orange
            else {
                nationData[j*4] = 255;
                nationData[j*4+1] = 128;
                nationData[j*4+2] = 0;
                nationData[j*4+3] = 255;
            }
            
        }
        let dat = new ImageData(nationData, WIDTH);
    
        canvas.getContext("2d").putImageData(dat, 0, 0);
        
        canvas.style.width = WIDTH + "px";
        canvas.style.height = HEIGHT + "px";

        //yield
        await new Promise(resolve => setTimeout(resolve));

        //mark pixels for high interconnectivity
        for(let j = 0; j < nationData.length / 4; j++){
            let x = j % WIDTH;
            let y = Math.floor(j / WIDTH);
            
            if (j % (100 * WIDTH) == 0 ) {
                await new Promise(resolve => setTimeout(resolve));
                console.log(Math.floor(j / WIDTH));
            }
                

            if(nationClaimWithinRadius(x,y, 2) && waterAtRelative(x,y)) {
                nationData[j*4] = 255;
                nationData[j*4+1] = 150;
                nationData[j*4+2] = 40;
                nationData[j*4+3] = 255;
            }
        }
        
        dat = new ImageData(nationData, WIDTH);
        canvas.getContext("2d").putImageData(dat, 0, 0);
            
    }
}

function isColorAtRelative(col,x,y) {
    try{
        return nationData[(x + y * WIDTH) * 4] == col[0] && 
        nationData[(x + y * WIDTH) * 4 + 1] == col[1] && 
        nationData[(x + y * WIDTH) * 4 + 2] == col[2] && 
        nationData[(x + y * WIDTH) * 4 + 3] == col[3];
    } catch (e) {
        //console.log("bruh");
        return false;
    }
};

function nationClaimWithinRadius(x,y,radius){
    for (let Y = -radius; Y < radius; Y++) {
        for (let X = -radius; X < radius; X++) {
            if(X * X + Y * Y > radius * radius) continue;
            if(nationClaimPixelAtRelative(X + x, Y + y)) return true;
        }   
    }
    return false;
}

const orangeArray = [255, 128, 0, 255];
function nationClaimPixelAtRelative(x,y){
    return isColorAtRelative(orangeArray, x,y);
}

const waterArray = [128, 128, 255, 255]
function waterAtRelative(x,y){
    return isColorAtRelative(waterArray, x,y);
}
