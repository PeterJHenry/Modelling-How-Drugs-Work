// This file requires that index.js be included in the html first
// As it requires several functions and variables from index.js

// TODO - Support more than 1 subtype.
var subtypeIndex = null;
var subtypePercentage = null;

// Chooose a random subtype and then the draw the graph for it.
function randomiseSubType() {
	subtypeIndex = Math.floor((Math.random() * 4)); // Random int from 0 to 4
	redrawGraph()
}

// Create 
function revealSubtype() {
    var subtypeReveal = document.getElementById("subtypeReveal");
    subtypeReveal.innerHTML = "M" + (subtypeIndex+1) + " (100%)";
}

// Redraws the graph with current ligand values, does not affect subtype.
function redrawGraph() {
	// Generate data to pass to the graph.
	var data = []
    for (var i = 0; i < 6; i++) {
        if (activeLigandRow()[i]) {
            var dataSet = calculateGraphPoints(1, 100, parseFloat(ligandTableCell(subtypeIndex + 1, i).value));
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
	plotGraph(data, false, {staticPlot: true})
}