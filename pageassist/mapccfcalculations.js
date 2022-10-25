
let allImagesLoaded = 0;
let ImageCount = 2;

const WIDTH = 8192;
const HEIGHT = 3365;

let outputField = document.querySelector("div.output");

//nation climates
let nationCanvas = document.createElement("canvas");
let climateCanvas = document.createElement("canvas");

nationCanvas.width = WIDTH;
nationCanvas.height = HEIGHT;

climateCanvas.width = WIDTH;
climateCanvas.height = HEIGHT;

nationCanvas.style.width = "500px"
climateCanvas.style.width = "500px"

document.querySelector("body").appendChild(nationCanvas);
document.querySelector("body").appendChild(climateCanvas);

let autoGeneratedCffTextFieldLabel = document.createElement("Label");
autoGeneratedCffTextFieldLabel.textContent = "Auto Generated cff comes here:";
autoGeneratedCffTextFieldLabel.style.fontWeight = "Bold";
let autoGeneratedCffTextField = document.createElement("textarea");
document.querySelector("body").appendChild(document.createElement("br"));
document.querySelector("body").appendChild(autoGeneratedCffTextFieldLabel);
document.querySelector("body").appendChild(document.createElement("br"));
document.querySelector("body").appendChild(autoGeneratedCffTextField);

let nationImagePath = "./docs/assets/images/world/Nations.png";
let nationImage = new Image(WIDTH, HEIGHT);
nationImage.src = nationImagePath;
nationImage.onload = function () {
    nationCanvas.getContext("2d").drawImage(nationImage, 0, 0, WIDTH, HEIGHT);
    allImagesLoaded++;
}

let climateImagePath = "./docs/assets/images/world/Climates.png";
let climateImage = new Image(WIDTH, HEIGHT);
climateImage.src = climateImagePath;
climateImage.onload = function () {
    climateCanvas.getContext("2d").drawImage(climateImage, 0, 0, WIDTH, HEIGHT);
    allImagesLoaded++;
}

imageLoadDoneCheck = setInterval(() => {
    if(allImagesLoaded >= ImageCount){
        document.querySelector("body").dispatchEvent(new Event("image load done"))
        clearInterval(imageLoadDoneCheck);
    }
}, 100);

document.querySelector("body").addEventListener("image load done", () => {

    const nationData = nationCanvas.getContext("2d").getImageData(0, 0, WIDTH, HEIGHT).data;
    const climateData = climateCanvas.getContext("2d").getImageData(0, 0, WIDTH, HEIGHT).data;

    const colorToClimateMap = {
        "#103c6d": "Ocean",
        "#ffffff": "PolarDesert",
        "#004a7f": "TaigaAndTundra",
        "#ffac7f": "MontaneForest",
        "#ff6a00": "Medditereanian",
        "#7f3300": "Arid",
        "#c8ff7c": "Steppe",
        "#4cff00": "Moderate",
        "#5b7f00": "SubTropical",
        "#008010": "Tropical",
        "#c1bd3e": "Savanna",
        "#ff0000": "Mountainous",
        "#fffb99": "Desert",
        "#ffd800": "CoastalDesert"
    }

    //find nations' colors
    let nationColorProperties = [];
    let colorToNationMap = {};

    Object.keys(gameStats.Nations).forEach(key => {
        nationColorProperties.push({color: gameStats.Nations[key].Color, name: gameStats.Nations[key].nationName}); 
    });


    autoGeneratedCffTextField.value += "<...\n\n";

    for(let i = 0; i < nationData.length / 4; i++){
        //if the nationData pixel is transparent, skip
        if(nationData[i*4+3] == 0) continue;
        
        let foundNationColor = rgbToHex([nationData[i*4], nationData[i*4+1], nationData[i*4+2]]);

        //skip if not a new color
        if(foundNationColor in colorToNationMap) continue;

        let foundNation = nationColorProperties.find(element => element.color == foundNationColor);
        if(typeof foundNation === 'undefined') {
            foundNation = {
                color: foundNationColor, 
                name: prompt(`The color #${foundNationColor} did not have a matching nation. Which nation is it?`)
            };

            autoGeneratedCffTextField.value += `= "${foundNationColor}" ${foundNation.name}.Color`
        }

        colorToNationMap[foundNation.color] = foundNation.name;

    }


    //find nations' climates
    let climateDistribution = {};
    
    for (let i = 0; i < nationData.length / 4; i++) {
        //if the pixel in climateData and nationData is transparent, skip
        if(climateData[i*4+3] == 0 && nationData[i*4+3] == 0) continue;
        //if only the pixel in climateData is transparent, warn
        else if(climateData[i*4+3]) {
            let x = i % WIDTH;
            let y = Math.floor(i / WIDTH);
            alert(`The pixel (${x}, ${y}) is null in the climate image, but not the nation image. Investigate this`);
            continue;
        }

        let nationCol = rgbToHex([nationData[i*4], nationData[i*4+1], nationData[i*4+2]]);
        let climateCol = rgbToHex([climateData[i*4], climateData[i*4+1], climateData[i*4+2]]);

        climateDistribution[colorToNationMap[nationCol]][colorToClimateMap[climateCol]]++;
    }

    console.log(climateDistribution)

    //add to autogeneratedccf

    autoGeneratedCffTextField.value += "<...\n\n"
    
    let insideNation = false;

    Object.keys(climateDistribution).forEach(nationKey => {
        
        autoGeneratedCffTextField.value += (insideNation ? '' :'<') + ` > ${nationKey}\n`;
        insideNation = true;

        Object.keys(climateDistribution[nationKey]).forEach(climateKey => {
            autoGeneratedCffTextField.value = `= ${climateDistribution[nationKey][climateKey]} ${climateKey}\n`;
        });

        autoGeneratedCffTextField.value += `\n\n`;
    });

    autoGeneratedCffTextField.value += '<...'
});