// This file requires that index.js be included in the html first
// As it requires several functions and variables from index.js

var subtypeIndex;
var subtypePercentage;

// Chooose a random subtype and then the draw the graph for it.
function randomiseSubType() {
    subtypeIndex = [null, null];
    subtypePercentage = [null, null];

    subtypeIndex[0] = Math.floor((Math.random() * 5));
    subtypePercentage[0] = 20 + 10 * Math.floor((Math.random() * 8)); // Generates a random percentage between 20 and 90, always a multiple of 10.

    if (subtypePercentage[0] === 90) {
        // Treat 90 as one subtype.
        subtypePercentage[0] = 100;
    } else {
        subtypeIndex[1] = Math.floor((Math.random() * 5));
        while (subtypeIndex[1] === subtypeIndex[0]) {
          subtypeIndex[1] = Math.floor((Math.random() * 5));
        }
        subtypePercentage[1] = 100 - subtypePercentage[0];
    }
    redrawGraph();
    // Clear the previously revealed subtype
    document.getElementById("subtypeReveal").innerHTML = "Reveal Subtype";
}

function revealSubtype() {
    document.getElementById("subtypeReveal").style.display = "inline-block";
    var subtypeReveal = document.getElementById("subtypeReveal");
    var subtypeString = "";
    if (subtypeIndex[1] === null) {
        subtypeString = "M" + (subtypeIndex[0]+1) + " (100%)";
    } else {
        subtypeString = "M" + (subtypeIndex[0]+1) + " (" + subtypePercentage[0]+ "%), ";
        subtypeString += "M" + (subtypeIndex[1]+1) + " (" + subtypePercentage[1]+ "%)"
    }
    subtypeReveal.innerHTML = subtypeString;
}


// Redraws the graph with current ligand values, does not affect subtype.
function redrawGraph() {
    // Generate data to pass to the graph.
    function get_dataset(i) {
        var dataSet;
        if (subtypeIndex[1] === null) {
            dataSet = calculateGraphPoints(1, 100, parseFloat(ligandTableCell(subtypeIndex[0] + 1, i).value));
        } else {
            dataSet = calculateGraphPoints(2,
                subtypePercentage[0],parseFloat(ligandTableCell(subtypeIndex[0] + 1, i).value),
                subtypePercentage[1],parseFloat(ligandTableCell(subtypeIndex[1]+1, i).value));
        }
        return dataSet
    }

    var data = [];
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
	plotGraph('myDiv',data, false);
}
$(window).resize(function () {
    redrawGraph();
});

function validateLigandValue() {
    for (var j = 0; j < 6; j++) {
        for (var i = 1; i < 6; i++) {
            if (parseInt(ligandTableCell(i, j).value) > 10) {
                ligandTableCell(i, j).value = 10;
            } else if (parseInt(ligandTableCell(i, j).value) < 3) {
                ligandTableCell(i, j).value = 3;
            }
        }
    }
    redrawGraph();
}

function addLigandListener() {
    $('.ligandInput').blur(function () {
        validateLigandValue();
    }).keyup(function () {
        validateLigandValue();
    }).change(function () {
        validateLigandValue();
    });
}

$(document).ready(function () {
    setTimeout(function () {
        redrawGraph();
    }, 500);
    addLigandListener();
});


function showBody() {
    $('section').fadeIn();
    $('.loading').fadeOut();
}

setTimeout(showBody, 5000);
