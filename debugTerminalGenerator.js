let changeCommandsContentButton = document.createElement("button");

changeCommandsContentButton.className = "collapsible";
changeCommandsContentButton.textContent = "Open change command list debug terminal";
changeCommandsContentButton.style.fontSize = "12px";
changeCommandsContentButton.style.maxWidth = "40%";

let changeCommandsWithColours = document.createElement("code");
changeCommandsWithColours.innerText = "# empty #";
changeCommandsWithColours.style.color = "white";

let changeCommandsWithColoursParent = document.createElement("pre");
changeCommandsWithColoursParent.style.background = "#444";
changeCommandsWithColoursParent.className = "content";
changeCommandsWithColoursParent.style.paddingTop = "1em";
changeCommandsWithColoursParent.style.paddingBottom = "1em";
changeCommandsWithColoursParent.style.width = "70vw";
changeCommandsWithColoursParent.style.overflow = "scroll";

changeCommandsWithColoursParent.appendChild(changeCommandsWithColours);

document.body.appendChild(changeCommandsContentButton);
document.body.appendChild(changeCommandsWithColoursParent);

function addChangeCommandWithColors(txt){
    if(typeof changeCommandsWithColours === 'undefined') return;
    if(changeCommandsWithColours.innerText == "# empty #") changeCommandsWithColours.innerText = ""; 
    let line = document.createElement("span");
    for(let i = 0; i < 1; i++){
        let span = document.createElement("span");
        span.innerText = txt;
        span.style.marginRight = "1ch";
        line.appendChild(span);
    }
    changeCommandsWithColours.appendChild(line);
    changeCommandsWithColours.appendChild(document.createElement("br"));
    return line;
    
}