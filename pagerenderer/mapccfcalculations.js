
'strict mode'


class MapCCFCalculations {
    self;
    WIDTH = 8192;
    HEIGHT = 3365;
    
    progressText;
    PromptMissingInfoContainer;
    PromptedMissingInfoCanvas;
    PromptLabel;
    PromptField;
    submitButton;
    copyToClipboardButton;

    PromptFieldReturnedText = "";
    
    autoGeneratedCffTextField = "";
    ImageOutputContainer = "";
    
    constructor(){
        self = this;
        document.querySelector("body").addEventListener("game load done", self.mapCalculations);

        self.progressText = document.querySelector(".progressText");
        self.progressText.innerText = "Loading...";
        self.PromptMissingInfoContainer = document.querySelector(".promptMissingInfoContainer");
        self.PromptedMissingInfoCanvas = document.querySelector(".promptMissingInfoContainer canvas");
        self.PromptedMissingInfoCanvas.width = self.WIDTH;
        self.PromptedMissingInfoCanvas.height = self.HEIGHT;
        self.PromptLabel = document.querySelector(".promptMissingInfoContainer label");
        self.PromptField = document.querySelector(".promptMissingInfoContainer .promptField");
    
        self.submitButton = document.querySelector(".promptMissingInfoContainer .promptButton");
        self.submitButton.addEventListener("click", function () {
            self.PromptFieldReturnedText = self.PromptField.value;
            self.PromptMissingInfoContainer.hidden = true;
        });
        self.autoGeneratedCffTextField = document.querySelector(".autoGeneratedCffTextField");
        self.ImageOutputContainer = document.querySelector(".OutputImagesContainer");
        
        self.copyToClipboardButton = document.querySelector("button#clipboard");

        
        self.copyToClipboardButton.onclick = function () {
            
            // Select the text field
            self.autoGeneratedCffTextField.select();
            self.autoGeneratedCffTextField.setSelectionRange(0, 99999); // For mobile devices
            navigator.clipboard.writeText(self.autoGeneratedCffTextField.value);
        }
    }

    baseData;
    nationData;
    climateData;
    coastData;
    developmentData;
    cultureData;
    religionData;
    tradeZoneData;
    fertilityData;
    popData;
    newPopData;
    newFuturePopData;

    populationXDevelopmentData;
    populationXDevelopmentBonusData;

    nationColorProperties;
    climateColorProperties; 
    cultureColorProperties; 
    religionColorProperties;
    tradeZoneColorProperties;
    fertilityColorProperties;
    coastColorProperties = [
        { color: "00ffff", name: "coast"}
    ];

    async mapCalculations(){
        
        self.nationColorProperties = self.fillInColorProperties(gameStats.Nations);
        self.climateColorProperties = self.fillInColorProperties(gameStats.Climates);
        self.cultureColorProperties = self.fillInColorProperties(gameStats.Cultures);
        self.religionColorProperties = self.fillInColorProperties(gameStats.Religions);
        self.tradeZoneColorProperties = self.fillInColorProperties(gameStats.TradeZones);
        self.fertilityColorProperties = self.fillInColorProperties(gameStats.Fertility);

        self.baseData = await prepareData("Blank.png", self.progressText)
        
        self.nationData = await prepareData("Nations.png", self.progressText);
        self.climateData = await prepareData("Climates.png", self.progressText);
        self.coastData = await prepareData("CoastalLand.png", self.progressText);
        self.developmentData = await prepareData("Development.png", self.progressText);
        self.cultureData = await prepareData("Cultures.png", self.progressText);
        self.religionData = await prepareData("Religions.png", self.progressText);
        self.tradeZoneData = await prepareData("TradeZones.png", self.progressText);
        self.fertilityData = await prepareData("Fertility.png", self.progressText);
        self.popData = await prepareData("Code/Population.png", self.progressText);

        self.progressText.innerText = "reversing development map";
        await new Promise(resolve => setTimeout(resolve));

        self.developmentData = await self.mapDataIterator(self.reverseRBGsOfDevelopment);

        self.progressText.innerText = "loading population X development";
        await new Promise(resolve => setTimeout(resolve));

        self.populationXDevelopmentData = await self.mapDataIterator(self.populationXDevelopmentMerger);

        self.progressText.innerText = "loading population X (100% + development/2)";
        await new Promise(resolve => setTimeout(resolve));

        self.populationXDevelopmentBonusData = await self.mapDataIterator(self.populationXDevelopmentBonusMerger);

        self.progressText.innerText = "adjusting culture map data for population and development";
        await new Promise(resolve => setTimeout(resolve));

        let climateDistribution = await self.findDistribution(
            self.nationData, self.climateData, "nation", "climate",
            self.nationColorProperties,
            self.climateColorProperties, 
            {
                unassignedPixelAssumption: "Moderate"
            }
        );

        let coastPopCount = await self.findDistribution(
            self.nationData, self.popData, "nation", "coastal population", 
            self.nationColorProperties,
            self.coastColorProperties, 
            {
                canIgnoreTransparentInner: true,
                valueMode: "RGBAsNum",
                unassignedPixelAssumption: 0,
                Adjuster: self.coastData,
                AdjusterMapping: (e) => {return e == 0x00ff00}
            }
        );
        
        let developmentScore = await self.findDistribution(
            self.nationData, self.developmentData, "nation", "development",
            self.nationColorProperties,
            0,
            {
                canIgnoreTransparentInner: true,
                unassignedPixelAssumption: 0,
                valueMode: "greyScale" 
            }
        );
    
        let cultureDistribution = await self.findDistribution(
            self.nationData, self.cultureData, "nation", "popdev-adjusted-culture", 
            self.nationColorProperties,
            self.cultureColorProperties,
            {
                unassignedPixelAssumption: "Foreign",
                Adjuster: self.populationXDevelopmentBonusData
            } 
        );

        let religionDistribution = await self.findDistribution(
            self.nationData, self.religionData, "nation", "popdev-adjusted-religion", 
            self.nationColorProperties,
            self.religionColorProperties, 
            {
                unassignedPixelAssumption: "Pagan",
                Adjuster: self.populationXDevelopmentBonusData
            }
        );


        let tradeZoneScore = await self.findDistribution(
            self.tradeZoneData, self.populationXDevelopmentData, "trade zone", "wealth",
            self.tradeZoneColorProperties,
            0,
            {
                canIgnoreTransparentInner: true,
                valueMode: "RGBAsNum",
                unassignedPixelAssumption: 0
            }
        );

        self.addToTextOutput( 
        `<... > Nations
        !suppress 99999
        
        `.trimIndents());

        //divide to make all constituencies make up 100(%). 
        Object.keys(cultureDistribution).forEach(nationKey => {
            
            let total = 0.0;

            //finding the total of all culturekey values in this nation, so we got something to divide by to find the constituencies' ratios
            Object.keys(cultureDistribution[nationKey]).forEach(CultureKey => {
                total += cultureDistribution[nationKey][CultureKey];
            });

            //replace CultureGroups by empty, before re-initialising every culture in it from scratch
            
            self.addToTextOutput( 
                `> ${nationKey}
                +> CultureGroups
                > CultureGroups
                `.trimIndents());
            //dividing and adding to self.autoGeneratedCffTextField
            Object.keys(cultureDistribution[nationKey]).forEach(CultureKey => {

                self.addToTextOutput( `+> ${CultureKey}\n`);
                self.addToTextOutput( `= ${cultureDistribution[nationKey][CultureKey] * 100 / total} ${CultureKey}.Points\n`);
            });
            
            self.addToTextOutput( 
                `< <
                `.trimIndents());
        });

        //divide to make all constituencies make up 100(%). 
        
        Object.keys(religionDistribution).forEach(nationKey => {
            
            let total = 0.0;

            //finding the total of all religionkey values in this nation, so we got something to divide by to find the constituencies' ratios
            Object.keys(religionDistribution[nationKey]).forEach(ReligionKey => {
                total += religionDistribution[nationKey][ReligionKey];
            });

            self.addToTextOutput( 
                `> ${nationKey}
                > ReligionGroups
                `.trimIndents());
            //dividing and adding to self.autoGeneratedCffTextField
            Object.keys(religionDistribution[nationKey]).forEach(ReligionKey => {

                self.addToTextOutput( `+> ${ReligionKey}\n`);
                self.addToTextOutput( `= ${religionDistribution[nationKey][ReligionKey] * 100 / total} ${ReligionKey}.Points\n`);
            });
            
            self.addToTextOutput( 
                `< <
                `.trimIndents());
        });

    //add climate distributions to autogeneratedccf
        
        self.addToTextOutput( 
        `
        <... > Nations
        `.trimIndents());
        
        Object.keys(climateDistribution).forEach(nationKey => {
            
            
            Object.keys(climateDistribution[nationKey]).forEach(climateKey => {
                self.addToTextOutput( `= ${climateDistribution[nationKey][climateKey]} ${nationKey}.${climateKey}\n`);
            });
            
        });

        //add development distributions to autogeneratedccf
        
        self.addToTextOutput( 
        `
        <... > Nations
        `.trimIndents());
        
        Object.keys(developmentScore).forEach(nationKey => {
            self.addToTextOutput( `= ${developmentScore[nationKey]} ${nationKey}.DevelopmentPixelCount\n`);
        });
        
        //add coast distributions to autogeneratedccf

        self.addToTextOutput( 
        `
        <... > Nations
        `.trimIndents());
        
        Object.keys(coastPopCount).forEach(nationKey => {
            self.addToTextOutput( `= ${coastPopCount[nationKey]} ${nationKey}.coastalPopulation\n`);
        });

        self.addToTextOutput( 
        `
        <... > Nations
        `.trimIndents());
        
        /* #region  Everthing resources */

        for (let r = 0; r < mappedResources.length; r++) {
            let resourceName = mappedResources[r];
            
            let resourceData = null;
            
            resourceData = await prepareData(`Code/Resources/${resourceName}.png`);
            
            self.progressText.innerText = "";

            let resourceBlobSizes = (await self.findDistribution(
                () => {return 255}, resourceData, "world", resourceName,
                [{ color: "ffffff", name: "world"}],
                (e) => { return {color: e, name: "Col" + e}},
                {
                    skipsTransparentInner: true,
                    unnamedGroup: true
                }
            ))["world"];

            //find nations' max resources

            let resourceOverlap = await self.findDistribution(
                self.nationData, resourceData, "nation", resourceName,
                self.nationColorProperties,
                (e) => { return {color: e, name: "Col" + e}},
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

                self.addToTextOutput( 
                    `= ${(Math.round((count*20)) / 20).toFixed(2)} ${nationKey}.Max${resourceName}
                    `.trimIndents());
            });

        }
        
        /* #endregion */

        //add trade zone wealths to autogeneratedccf

        self.addToTextOutput( 
        `
        <... > TradeZones
        `.trimIndents());


        //climate * totaldevscore (255 per pixel)
        Object.keys(tradeZoneScore).forEach(zoneKey => {
            let rawTradeZoneScore = tradeZoneScore[zoneKey];
            let idealTradeZoneScore = rawTradeZoneScore / 10000;
            self.addToTextOutput( `= ${(Math.round((idealTradeZoneScore*20)) / 20).toFixed(2)} ${zoneKey}.Score\n`);
        });

        await self.prepareNewMaps();

        let nationPopDistribution = await self.findDistribution(
            self.nationData, self.newPopData, "nation", "population", 
            self.nationColorProperties,
            0,
            {
                valueMode: "RGBAsNum",
                unassignedPixelAssumption: 0
            } 
        );

        let nationFuturePopDistribution = await self.findDistribution(
            self.nationData, self.newFuturePopData, "nation", "future population", 
            self.nationColorProperties,
            0,
            {
                valueMode: "RGBAsNum",
                unassignedPixelAssumption: 0
            } 
        );

        let nationFertilityDistribution = await self.findDistribution(
            self.nationData, self.fertilityData, "nation", "fertility", 
            self.nationColorProperties,
            self.fertilityColorProperties,
            {
                unassignedPixelAssumption: 0
            } 
        );

        //add population distributions to autogeneratedccf
        
        self.addToTextOutput( 
            `
            <... > Nations
            `.trimIndents());
            
        Object.keys(nationPopDistribution).forEach(nationKey => {
            self.addToTextOutput( `= ${nationPopDistribution[nationKey]} ${nationKey}.Population\n`);
        });

        //add future population distributions to autogeneratedccf

        self.addToTextOutput( 
            `
            <... > Nations
            `.trimIndents());

        Object.keys(nationFuturePopDistribution).forEach(nationKey => {
            self.addToTextOutput( `= ${nationFuturePopDistribution[nationKey]} ${nationKey}.Future Population\n`);
        });

        //add fertility distributions to autogeneratedccf

        self.addToTextOutput( 
            `
            <... > Nations
            `.trimIndents());

            
        Object.keys(nationFertilityDistribution).forEach(nationKey => {
            let total = 0;
            Object.keys(nationFertilityDistribution[nationKey]).forEach(FertilityKey => {

                let fertilityColor = gameStats.Fertility[FertilityKey].Color;
                let fertilityMultiplier = 0;

                self.fertilityColorProperties.forEach(colorNamePair => {
                    if(colorNamePair.color == fertilityColor){
                        fertilityMultiplier = gameStats.Fertility[FertilityKey].Score;
                        return;
                    }
                  });

                total += nationFertilityDistribution[nationKey][FertilityKey] * fertilityMultiplier;
            });
            self.addToTextOutput( `= ${total} ${nationKey}.Fertility\n`);
        });

        self.addToTextOutput( 
        `!suppress 0
        <...
        `.trimIndents());

        //add to autogeneratedccf
        
        self.copyToClipboardButton.disabled = false;

        self.progressText.innerText = `Done`;
    }

    async prepareNewMaps(){

        self.newPopData = await Formulas.advanceMap(self.popData, Formulas.advancePopulationMap, {mapCCFCalculationsInstance: self});
        await self.addToImageOutput(self.newPopData, "Population map");
        
        self.newFuturePopData = await Formulas.advanceMap(self.newPopData, Formulas.advancePopulationMap, {mapCCFCalculationsInstance: self});
        await self.addToImageOutput(self.newFuturePopData, "Future Population map");

        let playerReadablePopData = await Formulas.advanceMap(self.popData, Formulas.PopulationMapHumanReadable, {mapCCFCalculationsInstance: self});
        await self.addToImageOutput(playerReadablePopData, "Player-readable population map");

    }

    fillInColorProperties(searchObj){
        let ret = [];

        Object.keys(searchObj).forEach(key => {
            ret.push({color: searchObj[key].Color, name: key});
        });

        return ret;

    }

    async findDistribution(outerDataset, innerDataset, outerName, innerName, colorToOuterNameMapping, colorToInnerNameMapping, options) {
        let ret = {};
        let pixelCount = self.WIDTH * self.HEIGHT;
        if(options.pixelCount){
            pixelCount = options.pixelCount;
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

        self.progressText.innerText = `counting ${innerName}s in ${outerName}s`;
        let then = Date.now();
        for (let i = 0; i < pixelCount; i++) {
            
            let x = i % self.WIDTH;
            let y = Math.floor(i / self.WIDTH);

            //let the site know you're still alive
            let now = Date.now();
            if (now - then > 100) {
                await self.reportProgress(i);
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

            let foundOuterObject = colorToOuterNameMapping.find(element => element.color.toString().toLowerCase() == outerCol.toString().toLowerCase());

            if(typeof foundOuterObject === 'undefined') {
                foundOuterObject = await self.PromptName(outerCol, getOuterDataPoint, outerName);
                colorToOuterNameMapping.push(foundOuterObject);
            }

            const OuterNameOfPixel = foundOuterObject.name;


            function adjustments(){   
                if(!options.adjustForAlpha && !options.Adjuster)
                return 1;
                else if(options.Adjuster){
                    let rawMultiplier = Formulas.FetchedRGBAsNum(options.Adjuster, i*4);
                    let multiplier = options.AdjusterMapping ? options.AdjusterMapping(rawMultiplier) : rawMultiplier;
                    return multiplier;
                }
                else if(options.adjustForAlpha){
                    let alpha = getInnerDataPoint(i*4+3);
                    return alpha;
                }
            }

            if(options.valueMode == "greyScale"){
                const innerGreyScale = getInnerDataPoint(i*4);
                const InnerPixelValue = isInnerDataEmpty ? options.unassignedPixelAssumption : innerGreyScale;
                
                if(typeof ret[OuterNameOfPixel] === 'undefined') ret[OuterNameOfPixel] = 0;
                
                let mult = adjustments();
                ret[OuterNameOfPixel] += InnerPixelValue * mult;

                if(isNaN(ret[OuterNameOfPixel])) debugger;
            }
            else if(options.valueMode == "RGBAsNum"){
                const InnerPixelValue = isInnerDataEmpty ? options.unassignedPixelAssumption : Formulas.FetchedRGBAsNum(innerDataset, i*4);

                if(typeof ret[OuterNameOfPixel] === 'undefined') ret[OuterNameOfPixel] = 0;

                let mult = adjustments();
                ret[OuterNameOfPixel] += InnerPixelValue * mult;
            }
            else{
                let foundInnerObject = 
                    isInnerDataEmpty ? 
                        { color: innerCol, name: options.unassignedPixelAssumption} : 
                        !options.unnamedGroup ? 
                            colorToInnerNameMapping.find(element => element.color.toString().toLowerCase() == innerCol.toString().toLowerCase()):
                            {color: innerCol, name: "Col" + innerCol};
                if(typeof foundInnerObject === 'undefined'){
                    foundInnerObject = await self.PromptName(innerCol, getInnerDataPoint, innerName);
                    if (!options.unnamedGroup) colorToInnerNameMapping.push(foundInnerObject);
                }
                
                const InnerNameOfPixel = foundInnerObject.name;

                if(typeof ret[OuterNameOfPixel] === 'undefined') ret[OuterNameOfPixel] = {};
                if(typeof ret[OuterNameOfPixel][InnerNameOfPixel] === 'undefined') ret[OuterNameOfPixel][InnerNameOfPixel] = 0;
                
                let mult = adjustments();
                ret[OuterNameOfPixel][InnerNameOfPixel] += 1 * mult;

            } 
        }

        return ret;
    }

    async PromptName(color, getDatasetPointFunction, name){
        self.PromptFieldReturnedText = "";
        
        let DatasetLength = self.WIDTH * self.HEIGHT * 4;

        let dat = new Uint8ClampedArray(DatasetLength);
        for (let j = 0; j < DatasetLength; j++) {
            dat[j] = getDatasetPointFunction(j);
            
        }
        for(let j = 0; j < dat.length / 4; j++){
            if(rgbToHex([getDatasetPointFunction(j*4), getDatasetPointFunction(j*4+1), getDatasetPointFunction(j*4+2)]) == color){
                dat[j*4] = getDatasetPointFunction(j*4);
                dat[j*4+1] = getDatasetPointFunction(j*4+1);
                dat[j*4+2] = getDatasetPointFunction(j*4+2);
                dat[j*4+3] = getDatasetPointFunction(j*4+3);
            }
            else {
                dat[j*4] = self.baseData[j*4];
                dat[j*4+1] = self.baseData[j*4+1];
                dat[j*4+2] = self.baseData[j*4+2];
                dat[j*4+3] = self.baseData[j*4+3];
            }
            
        }

        let retName = await self.promptMap(dat, `The color #${color} did not have a matching ${name}. Which ${name} is it?\n(Give the name it has in stats)`);

        let ret = {
            color: color, 
            name: retName
        };

        self.addToTextOutput( `= "${color}" ${name}s.${self.PromptFieldReturnedText}.Color\n`);

        return ret;
    }

    async promptMap(imgArray, msg){

        self.PromptMissingInfoContainer.hidden = false;
        self.PromptLabel.innerText = msg;

        self.PromptedMissingInfoCanvas.getContext("2d").putImageData(new ImageData(imgArray, self.WIDTH), 0, 0);

        console.log("ok, just waiting now :)");

        //idle until cultureNamePrompt answered;
        let then = Date.now();
        while(self.PromptFieldReturnedText == ""){
            let now = Date.now();
            if (now - then > 17) {
                await new Promise(resolve => setTimeout(resolve));
                then = now;
            }
        }

        return self.PromptFieldReturnedText;
    }

    async mapDataIterator(delegate){
        let ret = new Uint8ClampedArray(self.WIDTH * self.HEIGHT * 4);

        let then = Date.now();
        for(let i = 0; i < ret.length / 4; i++) {
            let res = delegate(i*4);
            ret[i*4] = res[0];
            ret[i*4+1] = res[1];
            ret[i*4+2] = res[2];
            ret[i*4+3] = res[3];
            if(i % self.WIDTH == 0) {
                let now = Date.now();
                if (now - then > 100) {
                    await self.reportProgress(i);
                    await new Promise(resolve => setTimeout(resolve));
                    then = now;
                }
            }
        }

        return ret;
    }

    addToTextOutput(text){
        self.autoGeneratedCffTextField.value += text;
    }

    async addToImageOutput(imgArray, imgName){

        let size = 2;

        
        let canvasContainer = document.createElement("div");
        let canvasLabel = document.createElement("label");
        canvasLabel.innerText = imgName;
        let canvasLink = document.createElement("canvas");
        canvasLink.width = self.WIDTH;
        canvasLink.height = self.HEIGHT;
        canvasLink.style.width = size * 2 + "cm";
        canvasLink.style.height = size + "cm";
        
        canvasLink.getContext("2d").putImageData(new ImageData(imgArray, self.WIDTH), 0, 0);
        


        canvasContainer.appendChild(canvasLabel);
        canvasContainer.appendChild(document.createElement("br"));
        canvasContainer.appendChild(canvasLink);
        self.ImageOutputContainer.appendChild(canvasContainer);
    }

    reverseRBGsOfDevelopment(mapIndex){
        return [
            255 - self.developmentData[mapIndex], 
            255 - self.developmentData[mapIndex + 1], 
            255 - self.developmentData[mapIndex + 2], 
            self.developmentData[mapIndex + 3], 
        ]
    }

    populationXDevelopmentMerger(mapIndex){
        let pixelPop = Formulas.FetchedRGBAsNum(self.popData, mapIndex);
        let pixelDev = self.developmentData[mapIndex] / 255;
        let ret = pixelPop * pixelDev;
        
        return Formulas.NumAsRGB(ret);
    }

    populationXDevelopmentBonusMerger(mapIndex){
        let pixelPop = Formulas.FetchedRGBAsNum(self.popData, mapIndex);
        let pixelDev = self.developmentData[mapIndex] / 255;
        let ret = pixelPop * (0.5 + pixelDev / 2);
        
        return Formulas.NumAsRGB(ret);
    }

    reportProgress(i){
        let progressPercent = i / (self.WIDTH * self.HEIGHT) * 100;
        progressPercent = progressPercent.toFixed(2);
        let percentDisplay = progressPercent + "%";

        if(Math.floor(i / self.WIDTH) > 0) self.progressText.innerText = self.progressText.innerText.replace(/\n\n.+$/, "");
        
        self.progressText.innerText += "\n\n" + percentDisplay;
    }

}

let mapCCFCalculations = new MapCCFCalculations();