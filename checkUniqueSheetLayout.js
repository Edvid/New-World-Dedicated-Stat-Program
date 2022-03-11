
let UniqueLayouts = [
    {
        name: "Trade Zone Wealth",
        statCount: 84,
        mapping: function(row, column) {
            
            let C = +column % 12;
            let R = 2 * (Math.floor(+column/12));
            if(+row > 0) R++; 
            return {row: +R, column: +C};
        }
    }
];

function checkUniqueSheetLayout(name, coordinate){
    for (let i = 0; i < UniqueLayouts.length; i++) {
        const layout = UniqueLayouts[i];
        if(name == layout.name) {
            return layout.mapping(coordinate.row, coordinate.column);
        }
    }
    return coordinate;
}

function checkIfMoreStatsThanRowLength(name, sheetLength){
    for (let i = 0; i < UniqueLayouts.length; i++) {
        const layout = UniqueLayouts[i];
        if(name == layout.name){
            return layout.statCount;
        }
    }
    return sheetLength;
}