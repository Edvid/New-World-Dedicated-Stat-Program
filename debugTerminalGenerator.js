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
    if(/sync/.test(txt)){
        let parts = txt.split(/(?<!\<|^)(?=\<)|(?<=\<)(?!\<|$)/);
        for(let i = 0; i < parts.length; i++){
            let part = parts[i];
            let span = document.createElement("span");
            span.innerText = part;
            span.style.color = "MediumSpringGreen";
            if(/\</.test(part)) span.style.color = "#99fdd6"
            line.appendChild(span);
        }
    }else{
        let span = document.createElement("span");
        span.innerText = txt;
        line.appendChild(span);
    }
    changeCommandsWithColours.appendChild(line);
    changeCommandsWithColours.appendChild(document.createElement("br"));
    return line;
    
}