const WIDTH = 8192;
const HEIGHT = 3365;

document.querySelector("body").addEventListener("game load done", scanMaps);

const progressText = document.querySelector(".progressText");
progressText.innerText = "Loading...";

const canvas = document.querySelector(".mainCanvas");
const PromptMissingInfoContainer = document.querySelector(".promptMissingInfoContainer");
const PromptedMissingInfoCanvas = document.querySelector(".promptMissingInfoContainer canvas");

canvas.width = WIDTH;
canvas.height = HEIGHT;

PromptedMissingInfoCanvas.width = WIDTH;
PromptedMissingInfoCanvas.height = HEIGHT;

const PromptLabel = document.querySelector(".promptMissingInfoContainer label");
const PromptField = document.querySelector(".promptMissingInfoContainer .promptField");
let PromptFieldReturnedText = "";
const submitButton = document.querySelector(".promptMissingInfoContainer .promptButton");
submitButton.addEventListener("click", function () {
    PromptFieldReturnedText = PromptField.value;
    PromptMissingInfoContainer.hidden = true;
});

const autoGeneratedCffTextField = document.querySelector(".autoGeneratedCffTextField");

async function scanMaps() {

    let nationColorProperties = fillInColorProperties(gameStats.Nations);
    let climateColorProperties = fillInColorProperties(gameStats.Climates);
    let cultureColorProperties = fillInColorProperties(gameStats.Cultures);
    let religionColorProperties = fillInColorProperties(gameStats.Religions);
    let colorToNationMap = {};
    
    let nationData, climateData, coastData, developmentData, cultureData, religionData, tradeZoneData = null;

    nationData = await prepareData("Nations.png")
    climateData = await prepareData("Climates.png")
    coastData = await prepareData("CoastalLand.png")
    developmentData = await prepareData("Development.png")
    cultureData = await prepareData("Cultures.png")
    religionData = await prepareData("Religions.png")
    tradeZoneData = await prepareData("TradeZones.png")

    //wait until image datas are loaded
    while(nationData == null || 
        climateData == null || 
        coastData == null || 
        developmentData == null || 
        cultureData == null || 
        religionData == null || 
        tradeZoneData == null){
        await new Promise(resolve => setTimeout(resolve));
    }

    populationXDevelopmentData = function () {

        let ret = new Uint8ClampedArray(WIDTH * HEIGHT);

        for(let i = 0; i < WIDTH * HEIGHT; i++) {
            let foundZoneColor = rgbToHex([nationData[i*4], nationData[i*4+1], nationData[i*4+2]]);
            climateName = climateColorProperties.find(element => element.color == foundZoneColor).name;
            climateScore = gameStats.Climates[climateName].Score;
            ret[i] = climateScore * developmentData[i];
        }

        return ret;

    }();

    const colorToCoastMap = [
        { color: "00ffff", name: "coast"}
    ];

    //double checking that all nations have a defined colour

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
            
            PromptMissingInfoContainer.hidden = false;
            PromptLabel.innerText = `The color #${foundNationColor} did not have a matching nation. Which nation is it?\n(Give the name it has in stats)`;

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
        
            PromptedMissingInfoCanvas.getContext("2d").putImageData(dat, 0, 0);

            submitButton.addEventListener("click", function () {
                nationNamePrompt = PromptField.value;
                PromptMissingInfoContainer.hidden = true;
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

    let climateDistribution = await findDistribution(
        nationData, climateData, "nation", "climate",
        colorToNationMap,
        climateColorProperties, 
        {
            unassignedPixelAssumption: "Moderate"
        }
    );

    let coastPixelCount = await findDistribution(
        nationData, coastData, "nation", "coast", 
        colorToNationMap,
        colorToCoastMap, 
        {
            unassignedPixelAssumption: "Noncoast",
            canIgnoreTransparentInner: true
        }
    );
    
    let developmentScore = await findDistribution(
        nationData, developmentData, "nation", "development",
        colorToNationMap,
        0,
        {
            canIgnoreTransparentInner: true,
            greyScale: true 
        }
    );
 
    let cultureDistribution = await findDistribution(
        nationData, cultureData, "nation", "culture", 
        colorToNationMap,
        cultureColorProperties,
        {
            unassignedPixelAssumption: "Foreign"
        } 
    );

    let religionDistribution = await findDistribution(
        nationData, religionData, "nation", "religion", 
        colorToNationMap,
        religionColorProperties, 
        {
            unassignedPixelAssumption: "Pagan"
        }
    );


    let tradeZoneScore = await findDistribution(
        tradeZoneData, populationXDevelopmentData, "wealth", "trade zone",
        /*colorToTradeZoneMap*/ {},
        0,
        {
            greyScale: true
        }
    );

    autoGeneratedCffTextField.value += "<... > Nations\n\n";

    //divide to make all constituencies make up 100(%). 
    
    Object.keys(cultureDistribution).forEach(nationKey => {
        
        let total = 0.0;

        //finding the total of all culturekey values in this nation, so we got something to divide by to find the constituencies' ratios
        Object.keys(cultureDistribution[nationKey]).forEach(CultureKey => {
            total += cultureDistribution[nationKey][CultureKey];
        });

        //replace CultureGroups by empty, before re-initialising every culture in it from scratch
        
        autoGeneratedCffTextField.value += 
            `> ${nationKey}
            +> CultureGroups
            > CultureGroups
            `.trimIndents();
        //dividing and adding to autoGeneratedCffTextField
        Object.keys(cultureDistribution[nationKey]).forEach(CultureKey => {

            autoGeneratedCffTextField.value += `+> ${CultureKey}\n`
            autoGeneratedCffTextField.value += `= ${cultureDistribution[nationKey][CultureKey] * 100 / total} ${CultureKey}.Points\n`
        });
        
        autoGeneratedCffTextField.value += 
            `< <
            `.trimIndents();
    });

    //divide to make all constituencies make up 100(%). 
    
    Object.keys(religionDistribution).forEach(nationKey => {
        
        let total = 0.0;

        //finding the total of all religionkey values in this nation, so we got something to divide by to find the constituencies' ratios
        Object.keys(religionDistribution[nationKey]).forEach(ReligionKey => {
            total += religionDistribution[nationKey][ReligionKey];
        });

        //replace ReligionGroups by empty, before re-initialising every religion in it from scratch
        autoGeneratedCffTextField.value += 
            `> ${nationKey}
            +> ReligionGroups
            > ReligionGroups
            `.trimIndents();
        //dividing and adding to autoGeneratedCffTextField
        Object.keys(religionDistribution[nationKey]).forEach(ReligionKey => {

            autoGeneratedCffTextField.value += `+> ${ReligionKey}\n`
            autoGeneratedCffTextField.value += `= ${religionDistribution[nationKey][ReligionKey] * 100 / total} ${ReligionKey}.Points\n`
        });
        
        autoGeneratedCffTextField.value += 
            `< <
            `.trimIndents();
    });

    //add climate distributions to autogeneratedccf
    
    autoGeneratedCffTextField.value += 
    `
    <... > Nations
    `.trimIndents();
    
    Object.keys(climateDistribution).forEach(nationKey => {
        
        
        Object.keys(climateDistribution[nationKey]).forEach(climateKey => {
            autoGeneratedCffTextField.value += `= ${climateDistribution[nationKey][climateKey]} ${nationKey}.${climateKey}\n`;
        });
        
    });

    //add development distributions to autogeneratedccf
    
    autoGeneratedCffTextField.value += 
    `
    <... > Nations
    `.trimIndents();
    
    Object.keys(developmentScore).forEach(nationKey => {
        autoGeneratedCffTextField.value += `= ${developmentScore[nationKey]} ${nationKey}.DevelopmentPixelCount\n`;
    });
    
    autoGeneratedCffTextField.value += 
    `
    <... > Nations
    `.trimIndents();

    //add coast distributions to autogeneratedccf
    
    Object.keys(coastPixelCount).forEach(nationKey => {
        
        autoGeneratedCffTextField.value += `= ${coastPixelCount[nationKey].coast} ${nationKey}.CoastalPixels\n`;
    });

    autoGeneratedCffTextField.value += 
    `
    <... > Nations
    `.trimIndents();
    
    /* #region  Everthing resources */

    for (let r = 0; r < mappedResources.length; r++) {
        let resourceName = mappedResources[r];
        
        let resourceData = null;
        
        resourceData = await prepareData(`ResourcesForCode/${resourceName}.png`);
        
        progressText.innerText = "";

        let resourceBlobSizes = (await findDistribution(
            () => {return 255}, resourceData, "world", resourceName,
            {Colffffff: "world" },
            (e) => { return "Col" + e },
            {
                skipsTransparentInner: true,
                unnamedGroup: true
            }
        ))["world"];

        //find nations' max resources

        let resourceOverlap = await findDistribution(
            nationData, resourceData, "nation", resourceName,
            colorToNationMap,
            (e) => { return "Col" + e },
            {
                skipsTransparentInner: true,
                unnamedGroup: true
            }
        );
        
        //use resourceBlobSizes to divide all. 
        
        Object.keys(resourceOverlap).forEach(nationKey => {
            let count = 0.0;

            //counting up all pixels overlapping per blob, divided by the blob's size
            Object.keys(resourceOverlap[nationKey]).forEach(ColorKey => {
                count += resourceOverlap[nationKey][ColorKey] / resourceBlobSizes[ColorKey];
            });

            //resource blob number multiplication
            count *= mappedResourcesMultipliers[r];

            autoGeneratedCffTextField.value += `= ${(Math.round((count*20)) / 20).toFixed(2)} ${nationKey}.Max${resourceName}\n`
        });

    }
    
    /* #endregion */

    //add trade zone wealths to autogeneratedccf

    autoGeneratedCffTextField.value += 
    `
    <... > TradeZones
    `.trimIndents();

    Object.keys(tradeZoneScore).forEach(zoneKey => {
        autoGeneratedCffTextField.value += `= ${tradeZoneScore[zoneKey]} ${zoneKey}.CoastalPixels\n`;
    });

    
    progressText.innerText = `Done`

    //add to autogeneratedccf

    autoGeneratedCffTextField.value += '<...'
}

function fillInColorProperties(searchObj){
    ret = [];

    Object.keys(searchObj).forEach(key => {
        ret.push({color: searchObj[key].Color, name: key});
    });

    return ret;

}

async function prepareData(path){

    progressText.innerText = `loading ${path}`;

    let Img = new Image(WIDTH, HEIGHT);
    Img.src = `./docs/assets/images/world/${path}`;
    let done = false;
    Img.onload = function () {
        canvas.getContext("2d").clearRect(0, 0, WIDTH, HEIGHT);
        canvas.getContext("2d").drawImage(Img, 0, 0, WIDTH, HEIGHT);
        done = true;
    }

    while(!done){
        await new Promise(resolve => setTimeout(resolve));
    }

    return canvas.getContext("2d").getImageData(0, 0, WIDTH, HEIGHT).data;
}

async function findDistribution(outerDataset, innerDataset, outerName, innerName, colorToOuterNameMapping, colorToInnerNameMapping, options) {
    let ret = {};
    
    if(!options.pixelCount){
        pixelCount = WIDTH * HEIGHT;
    }

    let getOuterDataPoint;
    let getInnerDataPoint;

    if(typeof outerDataset != 'function')
        getOuterDataPoint = (i) => outerDataset[i];
    else
        getOuterDataPoint = (i) => outerDataset(i);

    if(typeof innerDataset != 'function')
        getInnerDataPoint = (i) => innerDataset[i];
    else
        getInnerDataPoint = (i) => innerDataset(i);

    let then = Date.now();
    for (let i = 0; i < pixelCount; i++) {
        
        let x = i % WIDTH;
        let y = Math.floor(i / WIDTH);

        //let the site know you're still alive
        let now = Date.now();
        if (now - then > 500) {
            progressText.innerText = `counting ${innerName}s in ${outerName}s:\n\n${i} out of ${pixelCount} pixels read.\nThat's row ${Math.floor(i / WIDTH)} out of ${HEIGHT}`
            await new Promise(resolve => setTimeout(resolve));
            then = now;
        }
        
        let outerCol;
        let innerCol;

        let isOuterDataEmpty = getOuterDataPoint(i*4+3) == 0;
        let isInnerDataEmpty = getInnerDataPoint(i*4+3) == 0;

        //if the pixel in outerDataset is transparent, skip
        if(isOuterDataEmpty) continue;
        //if the pixel in innerDataset is transparent, warn
        else if(isInnerDataEmpty) {
            if (options.skipsTransparentInner)
                continue;
            else if(!options.canIgnoreTransparentInner)
                console.warn(`The pixel (${x}, ${y}) is transparent in the ${innerName} image, but not the ${outerName} image. It is (${getOuterDataPoint(i*4)}, ${getOuterDataPoint(i*4+1)}, ${getOuterDataPoint(i*4+2)}, ${getOuterDataPoint(i*4+3)}) in the ${outerName} image. Investigate this. For now ${options.unassignedPixelAssumption} is assumed`);
        }

        outerCol = rgbToHex([getOuterDataPoint(i*4), getOuterDataPoint(i*4+1), getOuterDataPoint(i*4+2)]);
        innerCol = rgbToHex([getInnerDataPoint(i*4), getInnerDataPoint(i*4+1), getInnerDataPoint(i*4+2)]);

        const OuterNameOfPixel = colorToOuterNameMapping["Col" + outerCol];

        if(typeof OuterNameOfPixel === 'undefined') debugger;

        if(!options.greyScale){
            let foundInnerObject = 
                isInnerDataEmpty ? 
                    options.unassignedPixelAssumption : 
                    !options.unnamedGroup ? 
                        colorToInnerNameMapping.find(element => element.color == innerCol):
                        {color: innerCol, name: "Col" + innerCol};
            if(typeof foundInnerObject === 'undefined'){
                foundInnerObject = await PromptInnerName(innerCol, getInnerDataPoint, innerName);
                if (!options.unnamedGroup) colorToInnerNameMapping.push(foundInnerObject);
            }
            
            const InnerNameOfPixel = foundInnerObject.name;

            if(typeof ret[OuterNameOfPixel] === 'undefined') ret[OuterNameOfPixel] = {};
            if(typeof ret[OuterNameOfPixel][InnerNameOfPixel] === 'undefined') ret[OuterNameOfPixel][InnerNameOfPixel] = 0;
            
            ret[OuterNameOfPixel][InnerNameOfPixel]++;
        }else{
            const innerGreyScale = getInnerDataPoint(i*4);
            const InnerPixelValue = isInnerDataEmpty ? options.unassignedPixelAssumption : 255 - innerGreyScale;

            if(typeof ret[OuterNameOfPixel] === 'undefined') ret[OuterNameOfPixel] = 0;
            
            ret[OuterNameOfPixel] += InnerPixelValue;
        }
    }

    return ret;
}

async function PromptInnerName(innerCol, getInnerDataPointFunction, innerName){
    PromptFieldReturnedText = "";
    
    let InnerDatasetLength = WIDTH * HEIGHT * 4;

    PromptMissingInfoContainer.hidden = false;
    PromptLabel.innerText = `The color #${innerCol} did not have a matching ${innerName}. Which ${innerName} is it?\n(Give the name it has in stats)`;

    let dat = new Uint8ClampedArray(InnerDatasetLength);
    for (let j = 0; j < InnerDatasetLength; j++) {
        dat[j] = getInnerDataPointFunction(j);
        
    }
    for(let j = 0; j < dat.length / 4; j++){
        if(getInnerDataPointFunction(j*4+3) == 0){
            dat[j*4] = 128;
            dat[j*4+1] = 128;
            dat[j*4+2] = 255;
            dat[j*4+3] = 255;
        }
        else if(rgbToHex([getInnerDataPointFunction(j*4), getInnerDataPointFunction(j*4+1), getInnerDataPointFunction(j*4+2)]) != innerCol){
            dat[j*4] = 0;
            dat[j*4+1] = 0;
            dat[j*4+2] = 0;
            dat[j*4+3] = 0;
        }
        
    }
    dat = new ImageData(dat, WIDTH);

    PromptedMissingInfoCanvas.getContext("2d").putImageData(dat, 0, 0);

    console.log("ok, just waiting now :)");

    //idle until cultureNamePrompt answered;
    let then = Date.now();
    while(PromptFieldReturnedText == ""){
        let now = Date.now();
        if (now - then > 17) {
            await new Promise(resolve => setTimeout(resolve));
            then = now;
        }
    }

    let ret = {
        color: innerCol, 
        name: PromptFieldReturnedText
    };

    autoGeneratedCffTextField.value += `= "${innerCol}" ${innerName}s.${PromptFieldReturnedText}.Color\n`

    return ret;
}