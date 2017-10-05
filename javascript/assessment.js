// This file requires that index.js be included in the html first
// As it requires several functions and variables from index.js

var subtypeIndex;
var subtypePercentage;

// Chooose a random subtype and then the draw the graph for it.
function randomiseSubType() {
    subtypeIndex = [null, null];
    subtypePercentage = [null, null];

    // 50/50 chance of there being 1 or 2 subtype.
    if (Math.random() > 0.5) {
        // 1 Subtype
	   subtypeIndex[0] = Math.floor((Math.random() * 5)); // Random int from 0 to 4
       subtypePercentage[0] = 100;
	   redrawGraph();
    } else {
        //2 Subtypes
        subtypeIndex[0] = Math.floor((Math.random() * 5)); 
        subtypeIndex[1] = Math.floor((Math.random() * 5)); 
        if (subtypeIndex[1] === subtypeIndex[0]) {
            subtypeIndex[0] = subtypeIndex[0]+1 % 5
        }
        subtypePercentage[0] = 20 + 10 * Math.floor((Math.random() * 7));
        subtypePercentage[1] = 100 - subtypePercentage[0];
        redrawGraph();        
    }
    // Clear the previously revealed subtype
    document.getElementById("subtypeReveal").innerHTML = "";
}

function revealSubtype() {
    var subtypeReveal = document.getElementById("subtypeReveal");
    var subtypeString = ""
    if (subtypeIndex[1] === null) {
        subtypeString = "M" + (subtypeIndex[0]+1) + " (100%)";
    } else {
        subtypeString = "M" + (subtypeIndex[0]+1) + " (" + subtypePercentage[0]+ "%) , "
        subtypeString += "M" + (subtypeIndex[1]+1) + " (" + subtypePercentage[1]+ "%)"
    }
    subtypeReveal.innerHTML = subtypeString;
}

function get_dataset(i) {
    var dataSet
    if (subtypeIndex[1] === null) {
        dataSet = calculateGraphPoints(1, 100, parseFloat(ligandTableCell(subtypeIndex[0] + 1, i).value));
    } else {
        dataSet = calculateGraphPoints(2,  
            subtypePercentage[0],parseFloat(ligandTableCell(subtypeIndex[0] + 1, i).value),
            subtypePercentage[1],parseFloat(ligandTableCell(subtypeIndex[1]+1, i).value));
    }
    return dataSet    
}

// Redraws the graph with current ligand values, does not affect subtype.
function redrawGraph() {
	// Generate data to pass to the graph.
	var data = []

    for (var i = 0; i < 6; i++) {
        if (activeLigandRow()[i]) {
            var dataSet = get_dataset(i);
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