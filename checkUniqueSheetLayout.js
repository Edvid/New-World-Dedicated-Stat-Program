
let UniqueLayouts = [
    {
        name: "Trade Zone Wealth",
        mapping: function(row, column) {
            
        }
    }
];

function checkUniqueSheetLayout(name, coordinate){
    for (let i = 0; i < UniqueLayouts.length; i++) {
        const layout = UniqueLayouts[i];
        if(name == layout.name) return layout.function(coordinate.row, coordinate.column);
    }
    return coordinate;
}