let changeCommandsContentButton = document.createElement("button");

changeCommandsContentButton.className = "collapsible";
changeCommandsContentButton.textContent = "Open change command list debug terminal";

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

function addChangeCommandWithColors(spanlist, colorlist){
    if(changeCommandsWithColours.innerText == "# empty #") changeCommandsWithColours.innerText = ""; 
    let spans = []
    for(let i = 0; i < spanlist.length; i++){
        let span = document.createElement("span");
        span.innerText = spanlist[i];
        span.style.color = colorlist[i % colorlist.length];
        span.style.marginRight = "1ch";
        changeCommandsWithColours.appendChild(span);
        spans[i] = span;
    }
    changeCommandsWithColours.appendChild(document.createElement("br"));
    return spans;
    
}