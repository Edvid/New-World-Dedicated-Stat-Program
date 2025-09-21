import "https://cdn.amcharts.com/lib/5/index.js";
import "https://cdn.amcharts.com/lib/5/percent.js";
import { loadGameFromSafeFile, loadChangesFromContent, getChangesLength, preloadedStatChangesHashCode } from "../gameloading/loadChangesFromFile.js";
import { downloadToFile } from "../utility/download_to_file.js";
import { collapsible_behaviour, collapsibleNextSibling } from "../utility/collapsible.js";
import { cleanStatName } from "../utility/string_manipulation.js";
import { warn } from "../utility/custom_errors.js";
import { getStatType, ValueTypeFix } from "../utility/stat_types.js";
import { capitalSpacing } from "../utility/string_manipulation.js";
import { getGameStats, GSGetProperty, Opinion } from "../stats/gameStats.js";
import { Header } from "../components/header.js";
import { TableLayouts } from "../utility/table_layouts.js";
document.body.prepend(Header());
const advancedSettingsToggle = document.createElement("button");
advancedSettingsToggle.classList.add("collapsible");
advancedSettingsToggle.id = "advancedsettingstoggle";
advancedSettingsToggle.innerText = "Show advanced settings";
const advancedSettings = document.createElement("div");
advancedSettings.classList.add("content");
advancedSettings.id = "advancedsettings";
const cffContainer = document.createElement("div");
const loadingContainer = document.createElement("div");
loadingContainer.style.minHeight = "20px";
const downloadButtonContainer = document.createElement("div");
const downloadbutton = document.createElement("button");
downloadbutton.innerText = "Download gameStats as JSON";
downloadbutton.style.color = "#000";
downloadbutton.addEventListener('click', () => {
    const jsonobj = {
        Lines: getChangesLength(),
        Hash: preloadedStatChangesHashCode(),
        State: getGameStats()
    };
    const downloadString = JSON.stringify(jsonobj, null, 4);
    downloadToFile(downloadString, 'safefile.json', 'application/json');
});
downloadButtonContainer.appendChild(downloadbutton);
const uploadccffileform = document.createElement("form");
const uploadccffileinputtitle = document.createElement("h3");
uploadccffileinputtitle.innerText = "Choose A Saved File";
const uploadccffileinput = document.createElement("input");
uploadccffileinput.type = "file";
uploadccffileinput.id = "myFile";
uploadccffileinput.name = "filename";
uploadccffileinput.onchange = (e) => {
    const target = e.currentTarget;
    const file = target.files[0];
    const reader = new FileReader();
    reader.onload = async function (e) {
        const result = e.target.result;
        const changes = result.split(/\r?\n|\r/);
        await loadChangesFromContent(changes, 0);
        updateDropdownSelection();
        currentNationName = Object.keys(getGameStats().Nations)[currentNationID];
        createNationSheet(currentNationName);
    };
    reader.readAsText(file);
};
uploadccffileform.appendChild(uploadccffileinput);
const uploadccftextinputtitle = document.createElement("h3");
uploadccftextinputtitle.innerText = "Paste Text";
const uploadccftextform = document.createElement("div");
const uploadccftextinput = document.createElement("textarea");
uploadccftextinput.cols = 70;
uploadccftextinput.rows = 18;
const uploadccftextinputsubmit = document.createElement("button");
uploadccftextinputsubmit.innerText = "Submit";
uploadccftextinputsubmit.classList.add("submitccf");
uploadccftextinputsubmit.disabled = true;
uploadccftextinput.addEventListener('input', () => {
    uploadccftextinputsubmit.disabled = false;
});
uploadccftextinputsubmit.onclick = async () => {
    const changes = uploadccftextinput.value.split(/\r?\n|\r/);
    uploadccftextinputsubmit.disabled = true;
    await loadChangesFromContent(changes, 0);
    updateDropdownSelection();
    currentNationName = Object.keys(getGameStats().Nations)[currentNationID];
    createNationSheet(currentNationName);
};
uploadccftextform.appendChild(uploadccftextinput);
uploadccftextform.appendChild(document.createElement("br"));
uploadccftextform.appendChild(uploadccftextinputsubmit);
cffContainer.appendChild(uploadccffileinputtitle);
cffContainer.appendChild(uploadccffileform);
cffContainer.appendChild(uploadccftextinputtitle);
cffContainer.appendChild(uploadccftextform);
advancedSettings.appendChild(cffContainer);
advancedSettings.appendChild(loadingContainer);
advancedSettings.appendChild(downloadButtonContainer);
const nationSheetContainer = document.createElement("div");
nationSheetContainer.classList.add("nationsheet");
const arrowContainer = document.createElement("div");
arrowContainer.classList.add("arrowcontainer");
const urlParamNationID = new URLSearchParams(window.location.search).get('nat');
let currentNationID = urlParamNationID != null ? Number(urlParamNationID) - 1 : 0;
let currentNationName = 'Loading nations...';
const currentNationNameDisplay = document.createElement("h1");
currentNationNameDisplay.classList = "nationnamedisplay";
currentNationNameDisplay.innerText = currentNationName;
const leftArrow = document.createElement("button");
const leftarrowimg = document.createElement("img");
leftarrowimg.src = "../../docs/assets/images/leftarrow.png";
leftarrowimg.alt = "left arrow";
leftarrowimg.height = 40;
leftArrow.appendChild(leftarrowimg);
leftArrow.onclick = function () {
    const nations = getGameStats().Nations;
    const nationNames = Object.keys(nations);
    if (currentNationID > 0)
        currentNationID--;
    else
        currentNationID = nationNames.length - 1;
    currentNationName = nationNames[currentNationID];
    dropdownselection.value = currentNationName;
    createNationSheetGivenID(currentNationID);
};
const rightArrow = document.createElement("button");
const rightarrowimg = document.createElement("img");
rightarrowimg.src = "../../docs/assets/images/rightarrow.png";
rightarrowimg.alt = "right arrow";
rightarrowimg.height = 40;
rightArrow.appendChild(rightarrowimg);
rightArrow.onclick = function () {
    const nations = getGameStats().Nations;
    const nationNames = Object.keys(nations);
    if (currentNationID < nationNames.length - 1)
        currentNationID++;
    else
        currentNationID = 0;
    currentNationName = nationNames[currentNationID];
    dropdownselection.value = currentNationName;
    createNationSheetGivenID(currentNationID);
};
const dropdown = document.createElement("form");
dropdown.id = "dropdownselection";
const dropdowntitle = document.createElement("label");
dropdowntitle.innerText = "Choose Nation:";
const dropdownselection = document.createElement("select");
dropdownselection.onchange = (e) => {
    const dropdown = e.currentTarget;
    createNationSheetGivenID(dropdown.selectedIndex);
};
function createNationSheetGivenID(selectedIndex) {
    const nations = getGameStats().Nations;
    currentNationID = selectedIndex;
    currentNationName = Object.keys(nations)[currentNationID];
    createNationSheet(currentNationName);
}
dropdown.appendChild(dropdowntitle);
dropdown.appendChild(dropdownselection);
const searchStatContainer = document.createElement("form");
searchStatContainer.id = "searchstatcontainer";
const searchStatLabel = document.createElement("label");
const searchStat = document.createElement("input");
searchStat.type = "text";
searchStatLabel.innerText = "search stat: ";
const urlParamStatQuerry = new URLSearchParams(window.location.search).get('q');
searchStat.value = urlParamStatQuerry != null ? urlParamStatQuerry : "";
let searchStatValue = urlParamStatQuerry != null ? urlParamStatQuerry : "";
searchStat.addEventListener('input', () => {
    searchStatValue = searchStat.value;
    createNationSheet(currentNationName);
});
searchStatContainer.appendChild(searchStatLabel);
searchStatContainer.appendChild(searchStat);
function updateDropdownSelection() {
    dropdownselection.innerHTML = "";
    dropdownselection.classList.add("dropdown");
    const nations = getGameStats().Nations;
    let maxlength = 0;
    for (const key in nations) {
        const keyLength = capitalSpacing(key).length;
        if (maxlength < keyLength)
            maxlength = keyLength;
    }
    let index = 1;
    for (const key in nations) {
        const option = document.createElement("option");
        option.value = key;
        let spacedkeywithmargin = capitalSpacing(key);
        spacedkeywithmargin += ".".repeat(maxlength - spacedkeywithmargin.length);
        option.innerText = `${spacedkeywithmargin} - ${index++}`;
        dropdownselection.appendChild(option);
    }
    dropdownselection.selectedIndex = currentNationID;
}
document.body.appendChild(advancedSettingsToggle);
document.body.appendChild(advancedSettings);
document.body.appendChild(currentNationNameDisplay);
arrowContainer.appendChild(leftArrow);
arrowContainer.appendChild(rightArrow);
document.body.appendChild(arrowContainer);
document.body.appendChild(dropdown);
document.body.appendChild(searchStatContainer);
document.body.appendChild(nationSheetContainer);
collapsible_behaviour();
await loadGameFromSafeFile();
updateDropdownSelection();
currentNationName = Object.keys(getGameStats().Nations)[0];
createNationSheet(currentNationName);
function createNationSheet(nationName) {
    currentNationNameDisplay.innerText = capitalSpacing(nationName);
    nationSheetContainer.innerHTML = "";
    if (searchStatValue != "") {
        createSearchNarrowedNationSheet();
    }
    else {
        createNormalNationSheet();
    }
    postNationSheetCreateCleanup(nationName);
}
function createSearchNarrowedNationSheet() {
    createSearchStatTable();
    createBreaker();
    conditionalCreatePieDiagram("CultureGroups");
    conditionalCreateOpinionMatrixTable("Culture Groups Opinions", "CultureGroups");
    createBreaker();
    conditionalCreatePieDiagram("ReligionGroups");
    conditionalCreateOpinionMatrixTable("Religion Groups Opinions", "ReligionGroups");
    createBreaker();
    conditionalCreatePieDiagram("Climates", "Pixels");
    createBreaker();
    conditionalCreatePieDiagram("EstateInfluencesReal");
    conditionalCreatePieDiagram("GovernmentRepresentation");
    conditionalCreatePieDiagram("MilitaryControl");
    createBreaker();
    conditionalCreatePieDiagram("Workforces");
    conditionalCreatePieDiagram("SocietalClasses");
    createBreaker();
}
function createNormalNationSheet() {
    createStatTable("Flag and Government");
    createStatTable("Turn Based Stats");
    createBreaker();
    createPieDiagram("CultureGroups");
    createOpinionMatrixTable("Culture Groups Opinions", "CultureGroups");
    createBreaker();
    createPieDiagram("ReligionGroups");
    createOpinionMatrixTable("Religion Groups Opinions", "ReligionGroups");
    createStatTable("Population Stuff");
    createStatTable("Basic Stats");
    createStatTable("Budget Stats");
    createStatTable("Debt Stats");
    createBreaker();
    createPieDiagram("ProductionSectors");
    createStatTable("Upkeeps and Income");
    createStatTable("Production");
    createStatTable("Army");
    createStatTable("Private Armies");
    createStatTable("Buildings");
    createStatTable("Navy");
    createStatTable("Agriculture");
    createBreaker();
    createPieDiagram("Climates", "Pixels");
    createStatTable("War Stats");
    createStatTable("Land Stats");
    createBreaker();
    // loyalty
    createBreaker();
    createPieDiagram("EstateInfluencesReal");
    createPieDiagram("GovernmentRepresentation");
    createPieDiagram("MilitaryControl");
    createBreaker();
    createPieDiagram("Workforces");
    createPieDiagram("SocietalClasses");
    createBreaker();
    createStatTable("Estates");
    createStatTable("Reforms");
    createStatTable("Trade Influence - Americas", "tradeinfluences");
    createStatTable("Trade Influence - Europe", "tradeinfluences");
    createStatTable("Trade Influence - Africa", "tradeinfluences");
    createStatTable("Trade Influence - Asia", "tradeinfluences");
    createStatTable("Tech Stats");
    createStatTable("Technologies");
    createStatTable("Culture Stats");
    createStatTable("Cultural Advancements");
    createStatTable("Resources");
    createStatTable("Resource Prices");
    createStatTable("Resource Trade");
}
function postNationSheetCreateCleanup(nationName) {
    //fix size of notapplicables
    const notApplicableNodeList = document.querySelectorAll(".notapplicable");
    notApplicableNodeList.forEach((element) => {
        element.style.width = element.parentElement.clientWidth + "px";
        element.style.height = element.parentElement.clientHeight + "px";
    });
    //make stability stat get a color
    const stabilityValueElement = document.querySelector("td.Stability.value");
    if (Number(stabilityValueElement.innerText) >= 2) {
        stabilityValueElement.classList.remove("value-dangerous");
        stabilityValueElement.classList.remove("value-critical");
        stabilityValueElement.classList.add("value-safe");
    }
    else if (Number(stabilityValueElement.innerText) >= -2) {
        stabilityValueElement.classList.remove("value-safe");
        stabilityValueElement.classList.remove("value-critical");
        stabilityValueElement.classList.add("value-dangerous");
    }
    else {
        stabilityValueElement.classList.remove("value-safe");
        stabilityValueElement.classList.remove("value-dangerous");
        stabilityValueElement.classList.add("value-critical");
    }
    //make non 0.00 in tradeinfluence bold
    const allDivs = document.querySelectorAll("div");
    allDivs.forEach(DivElement => {
        if (DivElement.querySelector("h2") != null) {
            if (/Trade Influence/.test(DivElement.querySelector("h2").innerText)) {
                const tdElements = DivElement.querySelectorAll("td");
                tdElements.forEach(tdElement => {
                    if (tdElement.innerHTML != "0.00") {
                        tdElement.classList.remove("value-muted");
                        tdElement.classList.add("value-emphasis");
                    }
                    else {
                        tdElement.classList.remove("value-emphasis");
                        tdElement.classList.add("value-muted");
                    }
                });
            }
        }
    });
    //add tech tree button to tech and cultural adv & add individual nation view to land stats
    const allTabletitles = document.querySelectorAll(".nationsheet > div > h2");
    allTabletitles.forEach(TableTitle => {
        if (TableTitle.innerHTML == "Cultural Advancements" || TableTitle.innerHTML == "Technologies") {
            const techtreeButton = document.createElement("a");
            techtreeButton.style.margin = "0em 1em 0.5em 1em";
            techtreeButton.addEventListener("click", collapsibleNextSibling);
            const techtreeIcon = document.createElement("img");
            techtreeIcon.src = "../../docs/assets/images/small_techTree.png";
            techtreeIcon.style.border = "1px solid black";
            techtreeButton.appendChild(techtreeIcon);
            const techTreeImage = document.createElement("img");
            techTreeImage.src = "../../docs/assets/images/techTree.png";
            techTreeImage.style.margin = "2em";
            techTreeImage.style.width = document.body.clientWidth - 100 + "px";
            techTreeImage.style.display = "none";
            TableTitle.parentElement.insertBefore(techTreeImage, TableTitle.nextSibling);
            TableTitle.parentElement.insertBefore(techtreeButton, techTreeImage);
        }
        else if (TableTitle.innerHTML == "Land Stats") {
            const imgButton = document.createElement("a");
            const nations = getGameStats().Nations;
            const nationColor = nations[nationName].Color;
            imgButton.href = `./IndividualNation?col=${nationColor}`;
            imgButton.target = "_blank";
            const img = document.createElement("img");
            img.src = "../../docs/assets/images/world/small_blank.png";
            img.title = `see ${nationName} specific area`;
            img.style.width = "58px";
            img.classList.add("pixelated");
            imgButton.style.margin = "0em 1em 0.5em 1em";
            imgButton.appendChild(img);
            TableTitle.parentElement.insertBefore(imgButton, TableTitle.nextSibling);
        }
    });
}
function createSearchStatTable() {
    const columns = [];
    Object.keys(TableLayouts).forEach(tableGroupName => {
        const tableGroup = TableLayouts[tableGroupName];
        for (let table = 0; table < TableLayouts[tableGroupName].length; table++) {
            const stats = tableGroup[table];
            for (const statName of stats) {
                //filter out everything that isn't matching the search
                if (new RegExp(searchStatValue, "i").test(statName)) {
                    console.log(`${searchStatValue} found in ${statName}`);
                    columns.push([statName]);
                }
            }
        }
    });
    return createStatTable("search results", null, columns);
}
function createStatTable(title, classList, givenTable) {
    const table = givenTable ?? TableLayouts[title];
    const tablecontainer = document.createElement("div");
    const tableElement = document.createElement("table");
    const tableTitle = document.createElement("h2");
    tableTitle.classList.add("tabletitle");
    tableTitle.innerText = title;
    for (const stats of table) {
        const nationStatNameRow = document.createElement("tr");
        nationStatNameRow.classList.add("primary-color");
        const nationStatRow = document.createElement("tr");
        nationStatRow.classList.add("secondary-color");
        for (const statSelection of stats) {
            //if first char of string is alphabetic (not symbol), add courtesy dot first, else, we expect the user of createStatTableProxy to know what they're doing
            const statvalue = /^[a-zA-Z]$/.test(statSelection[0]) ?
                GSGetProperty(".Nations." + currentNationName + '.' + statSelection) :
                GSGetProperty(".Nations." + currentNationName + statSelection);
            const nationStatNameCell = document.createElement("th");
            const splitStatSelection = statSelection.split(/\.|(?<=\[)/g).map((str) => cleanStatName(str));
            const statName = !/tradingpoints$/i.test(splitStatSelection.at(-1)) ?
                splitStatSelection.at(-1) :
                splitStatSelection.at(-2);
            nationStatNameCell.innerText = statName.replace(/(?<=[a-zA-Z])(?=[A-Z])/g, " ");
            nationStatNameCell.classList.add(statName, "name");
            const nationStatCell = document.createElement("td");
            nationStatCell.classList.add(statName, "value");
            const displayValue = ValueTypeFix(statName, statvalue);
            if (displayValue.appendable) {
                nationStatCell.appendChild(displayValue.value);
            }
            else {
                try {
                    nationStatCell.innerText = displayValue.value.replace(/(?<=[a-zA-Z])(?=[A-Z])/g, " ");
                }
                catch (error) {
                    console.log(error);
                    console.log("Object:");
                    console.log(displayValue);
                    console.log("Stat Name:");
                    console.log(statName);
                }
            }
            const statTypeIcon = document.createElement("img");
            switch (getStatType(statSelection)) {
                case "Base":
                    statTypeIcon.src = "../../docs/assets/images/Base.png"; //red
                    statTypeIcon.alt = "Base";
                    statTypeIcon.title = "Base Stat: This is RPable";
                    break;
                case "Derived":
                    statTypeIcon.src = "../../docs/assets/images/Derived.png";
                    statTypeIcon.alt = "Derived";
                    statTypeIcon.title = "Derived Stat: This is calculated through a formula of other stats. You can not change this stat";
                    break;
                case "Constant":
                    statTypeIcon.src = "../../docs/assets/images/Constant.png"; //orange
                    statTypeIcon.alt = "Constant";
                    statTypeIcon.title = "Constant: This stat will not change throughout the game, and it is the same for all players";
                    break;
                case "Turn Based":
                    statTypeIcon.src = "../../docs/assets/images/Turn Based.png"; //pink
                    statTypeIcon.alt = "Turn Based";
                    statTypeIcon.title = "Turn Based Stat: This takes its future form the next turn. You can not change this stat";
                    break;
                case "War":
                    statTypeIcon.src = "../../docs/assets/images/War.png"; //red
                    statTypeIcon.alt = "War";
                    statTypeIcon.title = "War: This stat can change through Role play in war, and may be changed by War GMs as well as Stat Updaters";
                    break;
                case "Unknown":
                    statTypeIcon.src = "../../docs/assets/images/Unknown.png"; //black
                    statTypeIcon.alt = "Unknown!";
                    statTypeIcon.title = "Unknown! This is a mistake on our part. Please inform us if you see it.";
                    break;
            }
            statTypeIcon.classList.add("stattypeicon");
            nationStatRow.appendChild(nationStatCell);
            nationStatNameCell.appendChild(statTypeIcon);
            nationStatNameRow.appendChild(nationStatNameCell);
        }
        tableElement.appendChild(nationStatNameRow);
        tableElement.appendChild(nationStatRow);
    }
    tablecontainer.appendChild(tableTitle);
    tablecontainer.appendChild(tableElement);
    if (classList !== null && typeof classList !== 'undefined') {
        for (const className of classList) {
            tablecontainer.classList.add(className);
        }
    }
    nationSheetContainer.appendChild(tablecontainer);
}
function conditionalCreateOpinionMatrixTable(title, socialBehaviourGroup) {
    if (new RegExp(searchStatValue, "i").test(title)) {
        createOpinionMatrixTable(title, socialBehaviourGroup);
    }
}
function createOpinionMatrixTable(title, SocialBehaviourGroups) {
    const tablecontainer = document.createElement("div");
    const table = document.createElement("table");
    table.classList.add("opiniontable");
    const tableTitle = document.createElement("h2");
    tableTitle.classList.add("tabletitle");
    tableTitle.innerText = title;
    const nations = getGameStats().Nations;
    const nationsSocialBehaviourGroups = nations[currentNationName][SocialBehaviourGroups];
    const socialBehaviourGroupName = SocialBehaviourGroups.replace("Group", "");
    const relevantSocialBehaviours = getGameStats()[socialBehaviourGroupName];
    const opinioneeNameRow = document.createElement("tr");
    const blankCornerCell = document.createElement("th");
    blankCornerCell.classList.add("primary-color");
    opinioneeNameRow.appendChild(blankCornerCell);
    for (const opinioneeName in nationsSocialBehaviourGroups) {
        if (nationsSocialBehaviourGroups[opinioneeName].Points == 0)
            continue;
        const opinioneeNameCell = document.createElement("th");
        opinioneeNameCell.classList.add("primary-color");
        opinioneeNameCell.innerText = opinioneeName;
        opinioneeNameRow.appendChild(opinioneeNameCell);
    }
    table.appendChild(opinioneeNameRow);
    for (const opinionerName in nationsSocialBehaviourGroups) {
        if (nationsSocialBehaviourGroups[opinionerName].Points == 0)
            continue;
        const opRow = document.createElement("tr");
        const opinionerNameCell = document.createElement("th");
        opinionerNameCell.classList.add("primary-color");
        opinionerNameCell.innerHTML = opinionerName + " Opinion on ...";
        opRow.appendChild(opinionerNameCell);
        for (const opinioneeName in nationsSocialBehaviourGroups) {
            if (nationsSocialBehaviourGroups[opinioneeName].Points == 0)
                continue;
            const cell = document.createElement("td");
            cell.classList.add("secondary-color");
            if (opinionerName == opinioneeName) {
                const cross = document.createElement("img");
                cross.src = "../../docs/assets/images/NotApplicable.gif";
                cross.classList.add("notapplicable");
                cross.style.display = "block";
                cell.style.padding = "0px";
                cell.style.margin = "0px";
                cell.appendChild(cross);
            }
            else {
                const op = relevantSocialBehaviours[opinionerName].Opinions[opinioneeName];
                const img = document.createElement("img");
                img.style.width = "40px";
                img.style.height = "40px";
                let score;
                if (typeof op != 'undefined') {
                    score = op.Score;
                    if (isNaN(score)) {
                        score = Opinion[score];
                    }
                    if (score <= -75) {
                        img.src = Opinion.UndesiredImage;
                    }
                    else if (score <= -25) {
                        img.src = Opinion.SkepticalImage;
                    }
                    else if (score > 25) {
                        img.src = Opinion.FondImage;
                    }
                    else if (score > 75) {
                        img.src = Opinion.ObsessedImage;
                    }
                    else {
                        img.src = Opinion.NeutralImage;
                    }
                }
                else {
                    img.src = Opinion.NeutralImage;
                    score = 0;
                }
                const scoreElement = document.createElement("p");
                scoreElement.innerText = score;
                const all = document.createElement("div");
                all.appendChild(img);
                all.appendChild(scoreElement);
                cell.appendChild(all);
            }
            opRow.appendChild(cell);
        }
        table.appendChild(opRow);
    }
    tablecontainer.appendChild(tableTitle);
    tablecontainer.appendChild(table);
    nationSheetContainer.appendChild(tablecontainer);
    return tablecontainer;
}
function conditionalCreatePieDiagram(ObjectToChart, ValName) {
    if (new RegExp(searchStatValue, "i").test(ObjectToChart)) {
        createPieDiagram(ObjectToChart, ValName);
    }
}
function createPieDiagram(oObjectToChart, valName) {
    const valueName = valName ?? "Points";
    const tablecontainer = document.createElement("div");
    const title = document.createElement("h2");
    title.innerText = capitalSpacing(oObjectToChart);
    title.classList.add("tabletitle");
    const nations = getGameStats().Nations;
    const objectToChartNationRef = nations[currentNationName][oObjectToChart];
    const chartdiv = document.createElement("div");
    //styling on chart
    chartdiv.style.margin = ".5em";
    chartdiv.style.textAlign = "center";
    chartdiv.style.border = "1px dotted grey";
    tablecontainer.appendChild(title);
    tablecontainer.appendChild(chartdiv);
    nationSheetContainer.appendChild(tablecontainer);
    const root = am5.Root.new(chartdiv);
    const chart = root.container.children.push(am5percent.PieChart.new(root, {
        layout: root.verticalLayout
    }));
    const chartData = [];
    for (const keyName in objectToChartNationRef) {
        const keyValue = objectToChartNationRef[keyName];
        let objectPoints = keyValue;
        while (isNaN(objectPoints)) {
            if (objectPoints === null) {
                objectPoints = 0;
            }
            else if (typeof objectPoints === 'object') {
                objectPoints = objectPoints[valueName];
            }
            else if (typeof objectPoints === 'number') {
                warn(`a nan object was found. ${keyName} in ${oObjectToChart}`);
                objectPoints = 0;
            }
        }
        if (objectPoints === 0)
            continue;
        chartData.push({
            key: capitalSpacing(keyName),
            Points: objectPoints
        });
    }
    chartdiv.style.width = "500px";
    chartdiv.style.height = (360 + 29 * Object.values(chartData).length) + "px";
    const series = chart.series.push(am5percent.PieSeries.new(root, {
        name: "Series",
        categoryField: "key",
        valueField: "Points",
        legendLabelText: "[{fill}]{category}[/]",
        legendValueText: valueName == "Points" ? "[bold {fill}][/]" : `[bold {fill}]{value} ${capitalSpacing(valueName)}[/]`
    }));
    series.data.setAll(chartData);
    series.labels.template.set("visible", false);
    series.ticks.template.set("visible", false);
    // Add legend
    const legend = chart.children.push(am5.Legend.new(root, {
        centerX: am5.percent(50),
        x: am5.percent(50),
        layout: root.verticalLayout
    }));
    legend.data.setAll(series.dataItems);
}
function createBreaker() {
    const breaker = document.createElement("div");
    breaker.style.width = "100%";
    breaker.style.height = "0px";
    nationSheetContainer.appendChild(breaker);
    return breaker;
}
