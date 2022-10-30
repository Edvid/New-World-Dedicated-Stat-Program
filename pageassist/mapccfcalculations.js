
let allImagesLoaded = 0;
let ImageCount = 2;

const WIDTH = 8192;
const HEIGHT = 3365;

const progressText = document.createElement("h4");
progressText.innerText = "Loading...";
//nation climates
const nationCanvas = document.createElement("canvas");
const climateCanvas = document.createElement("canvas");
const resourceCanvasContainer = document.createElement("div");
const nationPromptedCanvasContainer = document.createElement("div");

nationCanvas.width = WIDTH;
nationCanvas.height = HEIGHT;

climateCanvas.width = WIDTH;
climateCanvas.height = HEIGHT;


nationCanvas.style.width = "10vw"
climateCanvas.style.width = "10vw"
resourceCanvasContainer.style.width = "10vw"
resourceCanvasContainer.classList.add("resourceCanvasContainer");

document.querySelector("body").appendChild(progressText);
document.querySelector("body").appendChild(document.createElement("br"));
document.querySelector("body").appendChild(nationCanvas);
document.querySelector("body").appendChild(climateCanvas);
document.querySelector("body").appendChild(resourceCanvasContainer);
document.querySelector("body").appendChild(document.createElement("br"));
document.querySelector("body").appendChild(nationPromptedCanvasContainer);

let autoGeneratedCffTextFieldLabel = document.createElement("Label");
autoGeneratedCffTextFieldLabel.textContent = "Auto Generated cff comes here:";
autoGeneratedCffTextFieldLabel.style.fontWeight = "Bold";
let autoGeneratedCffTextField = document.createElement("textarea");

autoGeneratedCffTextField.style.fontFamily = 'Consolas, Courier New, Courier, monospace';
autoGeneratedCffTextField.rows = 5;
autoGeneratedCffTextField.cols = 50;

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
    document.querySelector("body").addEventListener("game load done", scanImage);
});


async function scanImage() {

    const nationData = nationCanvas.getContext("2d").getImageData(0, 0, WIDTH, HEIGHT).data;
    const climateData = climateCanvas.getContext("2d").getImageData(0, 0, WIDTH, HEIGHT).data;

    const colorToClimateMap = {
        "Col103c6d": "Ocean",
        "Col808080": "PolarDesert",
        "Col004a7f": "TaigaAndTundra",
        "Colffac7f": "MontaneForest",
        "Colff6a00": "Medditereanian",
        "Col7f3300": "Arid",
        "Colc8ff7c": "Steppe",
        "Col4cff00": "Moderate",
        "Col5b7f00": "SubTropical",
        "Col008010": "Tropical",
        "Colc1bd3e": "Savanna",
        "Colff0000": "Mountainous",
        "Colfffb99": "Desert",
        "Colffd802": "CoastalDesert"
    }

    let unassignedClimatePixelAssumption = "Moderate";

    //find nations' colors
    let nationColorProperties = [];
    let colorToNationMap = {};

    Object.keys(gameStats.Nations).forEach(key => {
        nationColorProperties.push({color: gameStats.Nations[key].Color, name: key}); 
    });


    autoGeneratedCffTextField.value += "<... > Nations\n\n";

    let then = Date.now();
    for(let i = 0; i < nationData.length / 4; i++){
        //let the site know you're still alive
        let now = Date.now();
        if (now - then > 500) {
            progressText.innerText = `Double checking colours of nations:\n\n${i} out of ${nationData.length / 4} pixels read.\nThat's row ${Math.floor(i / WIDTH)} out of ${HEIGHT}`
            await new Promise(resolve => setTimeout(resolve));
            then = now;
        }

        //if the nationData pixel is transparent, skip
        if(nationData[i*4+3] == 0) continue;
        
        let foundNationColor = rgbToHex([nationData[i*4], nationData[i*4+1], nationData[i*4+2]]);

        //skip if not a new color
        if("Col" + foundNationColor in colorToNationMap) continue;

        let foundNation = nationColorProperties.find(element => element.color == foundNationColor);
        if(typeof foundNation === 'undefined') {

            let nationNamePrompt = "";
            
            const PromptLabel = document.createElement("label");
            PromptLabel.innerText = `The color #${foundNationColor} did not have a matching nation. Which nation is it?\n(Give the name it has in stats)`;
            PromptLabel.style.fontWeight = "Bold";
            const PromptField = document.createElement("input");
            PromptField.type = "text";
            const submitButton = document.createElement("input");
            submitButton.type = "button";
            submitButton.value = "Submit name";
            const nationPromptedCanvas = document.createElement("canvas");
            nationPromptedCanvas.width = WIDTH;
            nationPromptedCanvas.height = HEIGHT;
            nationPromptedCanvas.style.width = "60vw"

            nationPromptedCanvasContainer.appendChild(PromptLabel);
            nationPromptedCanvasContainer.appendChild(document.createElement("br"));
            nationPromptedCanvasContainer.appendChild(PromptField);
            nationPromptedCanvasContainer.appendChild(submitButton);
            nationPromptedCanvasContainer.appendChild(document.createElement("br"));
            nationPromptedCanvasContainer.appendChild(nationPromptedCanvas);

            let dat = new Uint8ClampedArray(nationData.length);
            for (let j = 0; j < nationData.length; j++) {
                dat[j] = nationData[j];
                
            }
            for(let j = 0; j < dat.length / 4; j++){
                if(rgbToHex([climateData[j*4], climateData[j*4+1], climateData[j*4+2]]) == '000000'){
                    dat[j*4] = 128;
                    dat[j*4+1] = 128;
                    dat[j*4+2] = 255;
                    dat[j*4+3] = 255;
                }
                else if(rgbToHex([nationData[j*4], nationData[j*4+1], nationData[j*4+2]]) != foundNationColor){
                    dat[j*4] = 0;
                    dat[j*4+1] = 0;
                    dat[j*4+2] = 0;
                    dat[j*4+3] = 0;
                }
                
            }
            dat = new ImageData(dat, WIDTH);
        
            nationPromptedCanvas.getContext("2d").putImageData(dat, 0, 0);

            submitButton.addEventListener("click", function () {
                nationNamePrompt = PromptField.value;
                nationPromptedCanvasContainer.innerHTML = "";
            });

            console.log("ok, just waiting now :)");

            //idle until nationNamePrompt answered;
            let then = Date.now();
            while(nationNamePrompt == ""){
                let now = Date.now();
                if (now - then > 17) {
                    await new Promise(resolve => setTimeout(resolve));
                    then = now;
                }
            }

            foundNation = {
                color: foundNationColor, 
                name: nationNamePrompt
            };

            autoGeneratedCffTextField.value += `= "${foundNationColor}" ${foundNation.name}.Color\n`
        }

        colorToNationMap["Col" + foundNation.color] = foundNation.name;

    }


    //find nations' climates
    let climateDistribution = {};
    

    then = Date.now();
    for (let i = 0; i < nationData.length / 4; i++) {
        
        let x = i % WIDTH;
        let y = Math.floor(i / WIDTH);

        //let the site know you're still alive
        let now = Date.now();
        if (now - then > 500) {
            progressText.innerText = `Assigning every nation' climate sizes:\n\n${i} out of ${nationData.length / 4} pixels read.\nThat's row ${Math.floor(i / WIDTH)} out of ${HEIGHT}`
            await new Promise(resolve => setTimeout(resolve));
            then = now;
        }
        
        let nationCol;
        let climateCol;

        let nationDataEmpty = nationData[i*4+3] == 0;
        let climateDataEmpty = climateData[i*4+3] == 0;

        //if the pixel in nationData is transparent, skip
        if(nationDataEmpty) continue;
        //if the pixel in climateData is transparent, warn
        else if(climateDataEmpty) {
            console.warn(`The pixel (${x}, ${y}) is transparent in the climate image, but not the nation image. It is (${nationData[i*4]}, ${nationData[i*4+1]}, ${nationData[i*4+2]}, ${nationData[i*4+3]}) in the nation image. Investigate this. For now ${unassignedClimatePixelAssumption} is assumed`);   
        }

        nationCol = "Col" + rgbToHex([nationData[i*4], nationData[i*4+1], nationData[i*4+2]]);
        climateCol = "Col" + rgbToHex([climateData[i*4], climateData[i*4+1], climateData[i*4+2]]);
        
        if(typeof colorToClimateMap[climateCol] === 'undefined'){
            console.warn(`The pixel (${x}, ${y}) is of a colour not found on the colorToClimateMap. Investigate this. For now undefined${climateCol} is assigned`);
        }

        const NationOfPixel = colorToNationMap[nationCol];
        const ClimateOfPixel = climateDataEmpty ? unassignedClimatePixelAssumption : (typeof colorToClimateMap[climateCol] !== 'undefined' ? colorToClimateMap[climateCol] : `undefined${climateCol}`);

        if(typeof climateDistribution[NationOfPixel] === 'undefined') climateDistribution[NationOfPixel] = {};
        if(typeof climateDistribution[NationOfPixel][ClimateOfPixel] === 'undefined') climateDistribution[NationOfPixel][ClimateOfPixel] = 0;

        climateDistribution[NationOfPixel][ClimateOfPixel]++;
    }

    //add to autogeneratedccf

    autoGeneratedCffTextField.value += "<...\n\n"
    
    let insideNation = false;

    Object.keys(climateDistribution).forEach(nationKey => {
        
        autoGeneratedCffTextField.value += (insideNation ? '< ' :'') + `> ${nationKey}\n`;
        insideNation = true;

        Object.keys(climateDistribution[nationKey]).forEach(climateKey => {
            autoGeneratedCffTextField.value += `= ${climateDistribution[nationKey][climateKey]} ${climateKey}\n`;
        });

        autoGeneratedCffTextField.value += `\n\n`;
    });


    autoGeneratedCffTextField.value += `<... > Nations\n`;

    let resourceNames = [
        "Fur",
        "Gold"
    ];

    for (let r = 0; r < resourceNames.length; r++) {
        let resourceName = resourceNames[r];
        let resourceImagePath = `./docs/assets/images/world/ResourcesForCode/${resourceName}.png`;
        
        let resourceBlobSizes = {}; 
        resourceCanvasContainer.innerHTML = "";
        
        
        const resourceCanvas = document.createElement("canvas");
        
        resourceCanvas.width = WIDTH;
        resourceCanvas.height = HEIGHT;
        resourceCanvas.style.width = "10vw"
        
        
        let ready = false;
        
        let resourceImage = new Image(WIDTH, HEIGHT);
        resourceImage.src = resourceImagePath;
        resourceImage.onload = function () {
            resourceCanvas.getContext("2d").drawImage(resourceImage, 0, 0, WIDTH, HEIGHT);
            ready = true;    
        }

        resourceCanvasContainer.appendChild(resourceCanvas);
        
        //count size of resource blobs

        then = Date.now();
        
        while(!ready){
            let now = Date.now();
            if (now - then > 17) {
                progressText.innerText = `Waiting for ${resourceName} image to be done loading...`
                await new Promise(resolve => setTimeout(resolve));
                then = now;
            }
        }
        
        resourceData = resourceCanvas.getContext("2d").getImageData(0, 0, WIDTH, HEIGHT).data

        then = Date.now();
        for (let i = 0; i < nationData.length / 4; i++) {
            
            //let the site know you're still alive
            let now = Date.now();
            if (now - then > 500) {
                progressText.innerText = `Counting size of all ${resourceName} blobs:\n\n${i} out of ${nationData.length / 4} pixels read.\nThat's row ${Math.floor(i / WIDTH)} out of ${HEIGHT}`
                await new Promise(resolve => setTimeout(resolve));
                then = now;
            }       

            if(resourceData[i*4+3] == 0) continue;
            
            resourceCol = "Col" + rgbToHex([resourceData[i*4], resourceData[i*4+1], resourceData[i*4+2]]);
        
            if(typeof resourceBlobSizes[resourceCol] === 'undefined') resourceBlobSizes[resourceCol] = 0;
            resourceBlobSizes[resourceCol]++;
        }

        //find nations' max resources

        resourceOverlap = {};

        //instantiate all nations in resourceOverlap
        Object.keys(gameStats.Nations).forEach(key => {
            resourceOverlap[key] = {};
        });
    
        then = Date.now();
        for (let i = 0; i < nationData.length / 4; i++) {
            
            //let the site know you're still alive
            let now = Date.now();
            if (now - then > 500) {
                progressText.innerText = `Assigning every nation' max ${resourceName}:\n\n${i} out of ${nationData.length / 4} pixels read.\nThat's row ${Math.floor(i / WIDTH)} out of ${HEIGHT}`
                await new Promise(resolve => setTimeout(resolve));
                then = now;
            }       

            //populate each nation in resourceOverlap with Col<hex> properties with values of how many pixels it overlaps that blob
            

            //if the pixel is either empty on the resource image or nation image, skip
            if(nationData[i*4+3] == 0 || resourceData[i*4+3] == 0) continue;

            nationCol = "Col" + rgbToHex([nationData[i*4], nationData[i*4+1], nationData[i*4+2]]);        
            resourceBlobCol = "Col" + rgbToHex([resourceData[i*4], resourceData[i*4+1], resourceData[i*4+2]]);
            const NationOfPixel = colorToNationMap[nationCol];

            if(typeof resourceOverlap[NationOfPixel] === 'undefined') {            
                console.log(`resourceOverlap[NationOfPixel] was ${resourceOverlap[NationOfPixel]}. NationOfPixel was ${NationOfPixel} and nationCol ${nationCol}`)
            }

            if(typeof resourceOverlap[NationOfPixel][resourceBlobCol] === 'undefined') resourceOverlap[NationOfPixel][resourceBlobCol] = 0;
            resourceOverlap[NationOfPixel][resourceBlobCol]++;
            
        }

        //use resourceBlobSizes to divide all. 
        
        Object.keys(resourceOverlap).forEach(nationKey => {
            let count = 0.0;
            Object.keys(resourceOverlap[nationKey]).forEach(ColorKey => {
                count += resourceOverlap[nationKey][ColorKey] / resourceBlobSizes[ColorKey];
            });
            autoGeneratedCffTextField.value += `= ${count} ${nationKey}.Max${resourceName}\n`
        });

    }
    
    progressText.innerText = `Done`

    //add to autogeneratedccf

    autoGeneratedCffTextField.value += '<...'
}