
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
nationImage.onload = function () {
    canvas.getContext("2d").drawImage(nationImage, 0, 0, WIDTH, HEIGHT);

    nationData = canvas.getContext("2d").getImageData(0, 0, WIDTH, HEIGHT).data;

    const climateImage = new Image(WIDTH, HEIGHT);
    climateImage.src = climateImagePath;

    climateImage.onload = function () {
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
            
        }
        let dat = new ImageData(nationData, WIDTH);
    
        canvas.getContext("2d").putImageData(dat, 0, 0);
        
        canvas.style.width = WIDTH + "px";
        canvas.style.height = HEIGHT + "px";

        console.log("hi");
    }
}




