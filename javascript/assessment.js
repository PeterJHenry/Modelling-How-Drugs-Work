// This file requires that index.js be included in the html first
// As it requires several functions and variables from index.js

// TODO - Support more than 1 subtype.
var subtypeIndex = null;
var subtypePercentage = null;

// Chooose a random subtype and then the draw the graph for it.
function randomiseSubType() {
	subtypeIndex = Math.floor((Math.random() * 5)); // Random int from 0 to 4
	console.log("Subtype set to: " + subtypeIndex);
	redrawGraph()
}

function updateCustomValue(rowIndex) {
    var row = [];
    for (var i = 0; i < 5; i++) row.push(parseInt(ligandTableCell(i + 1, rowIndex).value));
    state.ligands[rowIndex] = row;
    redrawGraph();
}

// Redraws the graph with current ligand values, does not affect subtype.
function redrawGraph() {
	// Generate data to pass to the graph.
	console.log(subtypeIndex)
	var data = []
    for (var i = 0; i < 6; i++) {
        if (state.activeLigandRow[i]) {
            var dataSet = calculateGraphPoints(1, 100, state.ligands[i][subtypeIndex]);
            var graph = {
                x: dataSet[0],
                y: dataSet[1],
                mode: 'lines',
                line: {
                    color: colorTable[i],
                    width: 1
                },
                name: ligandNames[ligandTableCell(0, i).value]

            };
            data.push(graph);
        }
    }
    console.log(data)
	plotGraph(data)
}