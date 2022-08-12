let outputField = document.querySelector("div.output");

let colorToNationMap;

document.querySelector("body").addEventListener("load done", () => {
    let ctnm = {};
    for (const nname in gameStats.Nations) {
        const col = gameStats.Nations[nname].Color;
        if(typeof ctnm[col] !== 'undefined') {
            //console.error(`${ctnm[col]} and ${nname} share the same color: ${col}`)
            //return;
            ctnm[col] += " ";
        } else {
            ctnm[col] = "";    
        }

        ctnm[col] += nname;
    }
    colorToNationMap = ctnm;
})
