const WIDTH = 8192;
const HEIGHT = 3365;

const islandColorArray = [255, 128, 0, 255];
const connectiveIslandColorArray = [255, 192, 128, 255];
const waterColorArray = [128, 128, 255, 255];
const smallIslandFillColorArray = [0, 128, 0, 255];
const connectiveSmallIslandFillColorArray = [128, 255, 128, 255];
const bigislandFillColorArray = [255, 144, 0, 255];
const connectiveBigIslandFillColorArray = [255, 200, 136, 255];

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

        for (let j = 0; j < nationData.length / 4; j++) {
            //if climatedat transparent, make blue
            if (climateData[j * 4 + 3] == '0') {
                for (let ci = 0; ci < 4; ci++)
                    nationData[j * 4 + ci] = waterColorArray[ci];
            }
            //if nationdat is not the nation color. Make white 
            else if (rgbToHex([nationData[j * 4], nationData[j * 4 + 1], nationData[j * 4 + 2]]) != color) {
                nationData[j * 4] = 255;
                nationData[j * 4 + 1] = 255;
                nationData[j * 4 + 2] = 255;
                nationData[j * 4 + 3] = 255;
            }
            //nation is always orange
            else {
                for (let ci = 0; ci < 4; ci++)
                    nationData[j * 4 + ci] = islandColorArray[ci];
            }

        }
        let dat = new ImageData(nationData, WIDTH);

        canvas.getContext("2d").putImageData(dat, 0, 0);

        canvas.style.width = WIDTH + "px";
        canvas.style.height = HEIGHT + "px";

        //yield
        await new Promise(resolve => setTimeout(resolve));

        //mark pixels for high interconnectivity
        for (let j = 0; j < nationData.length / 4; j++) {
            let x = j % WIDTH;
            let y = Math.floor(j / WIDTH);

            if (y % 500 == 0 && x == 0) {
                await new Promise(resolve => setTimeout(resolve));
                console.log(y);
            }

            if (nationClaimWithinRadius(x, y, 2) && waterAtCoord(x, y)) {
                
                for (let ci = 0; ci < 4; ci++)
                    nationData[j * 4 + ci] = connectiveIslandColorArray[ci];
            }
        }

        dat = new ImageData(nationData, WIDTH);
        canvas.getContext("2d").putImageData(dat, 0, 0);

        //find those blobs that don't quite make it to 50+

        let then = Date.now();
        for (let j = 0; j < nationData.length / 4; j++) {
            let x = j % WIDTH;
            let y = Math.floor(j / WIDTH);

            let now = Date.now();
            if (now - then > 2000) {
                await new Promise(resolve => setTimeout(resolve));
                console.log(y);
                then = now;
            }

            if (nationClaimPixelAtCoord(x, y)) {
                let IslandSize = 0;

                /* #region  actually doing the bucketing - Credit to Spongman on https://stackoverflow.com/questions/51115359/flood-fill-algorithm-for-bucket-tool-in-p5-js-electron-paint-application */

                let oldColor = islandColorArray;
                let oldConnectiveColor = connectiveIslandColorArray;
                let fillColor = smallIslandFillColorArray;
                let fillConnectiveColor = connectiveSmallIslandFillColorArray;
                
                let yetToFillStack = [];

                function bucketPixels(){
                    function matches(c, x, y){
                        let redRefOfPixel = (x + y * WIDTH) * 4;
                        for(let ci = 0; ci < c.length; ci++){
                            if (c[ci] != nationData[redRefOfPixel + ci]) return false;
                        }
                        return true;
                    }

                    if(!yetToFillStack.length) return;

                    let p = yetToFillStack.pop();
                    let beginX = p.x, beginY = p.y;
                    while(beginX > 0 && matches(oldColor, beginX - 1, beginY))
                        beginX--;
    
                    let spanAbove = false, spanBelow = false;
                    
                    for (let traverserX = beginX + 1; traverserX < WIDTH && matches(oldColor, traverserX, beginY); ++traverserX){
                        setColorAtCoord(traverserX, beginY, fillColor);
                        IslandSize++;

                        if (beginY > 0 && spanAbove !== matches(oldColor, traverserX, beginY - 1)) {
                            if (!spanAbove)
                                yetToFillStack.push({ x: traverserX, y: beginY - 1 });
                            spanAbove = !spanAbove;
                          }
                          if (beginY < HEIGHT - 1 && spanBelow !== matches(oldColor, traverserX, beginY + 1)) {
                            if (!spanBelow)
                                yetToFillStack.push({ x: traverserX, y: beginY + 1 });
                            spanBelow = !spanBelow;
                          }
                    }
                }

                yetToFillStack.push({x: x, y: y});

                while(yetToFillStack.length > 0) {
                    debugger;
                    bucketPixels();
                }
                    
                /* #endregion */
                //if size is not 50+, colour everything [255, 150, 40, 255]
                if (IslandSize > 50) {
                    //fill back with bigIslandColor
                    
                    oldColor = smallIslandFillColorArray;
                    oldConnectiveColor = connectiveSmallIslandFillColorArray;
                    fillColor = bigislandFillColorArray;
                    fillConnectiveColor = connectiveBigIslandFillColorArray;

                    yetToFillStack.push({x: x, y: y});

                    while(yetToFillStack.length > 0) bucketPixels();
                }
            }
        }

    }
}

function isColorAtCoord(col, x, y) {
    let redRefOfPixel = (x + y * WIDTH) * 4;
    try {
        return nationData[redRefOfPixel] == col[0] &&
            nationData[redRefOfPixel + 1] == col[1] &&
            nationData[redRefOfPixel + 2] == col[2] &&
            nationData[redRefOfPixel + 3] == col[3];
    } catch (e) {
        //console.log("bruh");
        return false;
    }
};

function setColorAtCoord(x, y, col){
    let redRefOfPixel = (x + y * WIDTH) * 4;
    for (let ci = 0; ci < 4; ci++)
        nationData[redRefOfPixel + ci] = waterColorArray[ci];
}

function nationClaimWithinRadius(x, y, radius) {
    for (let Y = -radius; Y < radius; Y++) {
        for (let X = -radius; X < radius; X++) {
            if (X * X + Y * Y > radius * radius) continue;
            if (nationClaimPixelAtCoord(X + x, Y + y)) return true;
        }
    }
    return false;
}

function nationClaimPixelAtCoord(x, y) {
    return isColorAtCoord(islandColorArray, x, y);
}

function waterAtCoord(x, y) {
    return isColorAtCoord(waterColorArray, x, y);
}
