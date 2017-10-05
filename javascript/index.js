// Holds the ligand -logki table
const logK = [
    [9.0, 8.8, 9.3, 8.9, 9.2],
    [8.2, 6.5, 6.9, 7.4, 7.2],
    [6.7, 7.7, 6.0, 7.0, 6.3],
    [7.8, 7.0, 8.8, 7.7, 8.0],
    [6.7, 5.9, 6.0, 8.1, 6.0],
    [8.0, 7.9, 7.7, 7.7, 6.5],
    [7.6, 6.8, 7.9, 7.0, 7.5],
    [8.9, 7.1, 8.9, 8.5, 8.1],
    [9.0, 9.0, 6.0, 6.0, 2.0],
    [8.0, 5.0, 8.0, 5.0, 8.0],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', '']
];

const colorTable = [
    'rgb(255, 153, 51)', // orange
    'rgb(255, 80, 80)', // red
    'rgb(51, 204, 255)', // light blue
    'rgb(0, 204, 0)', // green
    'rgb(153, 102, 51)', // brown
    'rgb(153, 51, 255)'];// purple

// keeps the count of checked boxes
var subTypeCheckedCount = 0;


const ligandNames = [
    "Atropine",
    "Pirenzipine",
    "Methoctromine",
    "Darifenacin",
    "MT-3",
    "S-secoverine",
    "Solifenacin",
    "DAU-5884",
    "Ligand A",
    "Ligand B",
    "Ligand C",
    "Ligand D",
    "Select"
];

// Holds current DOM state(makes generating graph easier)
const state = {
    subTypePresent: [false, false, false, false, false]
};


// Autofills the ligands according to the selected
function ligandAutoFill(selectedLigand, rowIndex, graphCallback) {
    if (typeof graphCallback === "undefined")
        graphCallback = generateGraph;
    for (var i = 0; i < 5; i++) {
        ligandTableCell(i + 1, rowIndex).value = logK[selectedLigand.value][i];
        ligandTableCell(i + 1, rowIndex).disabled = (selectedLigand.value < 10 || parseInt(selectedLigand.value) === 12);
    }
    graphCallback();
}


function updateCustomValue(rowIndex, graphCallback) {
    if (typeof graphCallback === "undefined")
        graphCallback = generateGraph;
    // var row = [];
    // for (var i = 0; i < 5; i++) row.push(parseInt(ligandTableCell(i + 1, rowIndex).value));
    graphCallback();
}


//// Check if the box can be checked
function validateCheckBox(checkingBox, graphCallback) {
    if (typeof graphCallback === "undefined")
        graphCallback = generateGraph;

    if (subTypeCheckedCount === 0) {
        receptorRelDenTableCell(checkingBox).value = 100;
        state.subTypePresent[checkingBox] = receptorCheckBoxTableCell(checkingBox).checked = true;
        subTypeCheckedCount++;


        // if one box was selected before
    } else if (subTypeCheckedCount === 1) {
        var previousCheckedBox = activeCheckBoxes()[0];

        // if the previous box is the same that is going to be unselected (unchecking the only box)
        if (previousCheckedBox === checkingBox) {
            receptorRelDenTableCell(checkingBox).value = '';
            state.subTypePresent[checkingBox] = receptorCheckBoxTableCell(checkingBox).checked = false;
            subTypeCheckedCount--;

            // If its not the same (checking a new box)
        } else {
            state.subTypePresent[checkingBox] = receptorCheckBoxTableCell(checkingBox).checked = true;
            receptorRelDenTableCell(checkingBox).value = receptorRelDenTableCell(previousCheckedBox).value = 50;
            receptorRelDenTableCell(checkingBox).disabled = receptorRelDenTableCell(previousCheckedBox).disabled = false;

            subTypeCheckedCount++;
        }


        // two boxes has been selected
    } else if (subTypeCheckedCount === 2) {
        var previousCheckedBox0 = activeCheckBoxes()[0];
        var previousCheckedBox1 = activeCheckBoxes()[1];

        switch (checkingBox) {

            // if unchecking box 1
            case previousCheckedBox0:
                state.subTypePresent[previousCheckedBox0] = receptorCheckBoxTableCell(previousCheckedBox0).checked = false;
                state.subTypePresent[previousCheckedBox1] = receptorRelDenTableCell(previousCheckedBox1).disabled = receptorRelDenTableCell(checkingBox).disabled = true;

                receptorRelDenTableCell(previousCheckedBox0).value = '';
                receptorRelDenTableCell(previousCheckedBox1).value = 100;
                subTypeCheckedCount--;
                break;

            // if unchecking box 2
            case previousCheckedBox1:
                state.subTypePresent[previousCheckedBox1] = receptorCheckBoxTableCell(previousCheckedBox1).checked = false;
                state.subTypePresent[previousCheckedBox0] = receptorRelDenTableCell(previousCheckedBox0).disabled = receptorRelDenTableCell(checkingBox).disabled = true;

                receptorRelDenTableCell(previousCheckedBox1).value = '';
                receptorRelDenTableCell(previousCheckedBox0).value = 100;
                subTypeCheckedCount--;
                break;

            default:
                alert("You can only select two boxes");
                receptorCheckBoxTableCell(checkingBox).checked = false;
                break;
        }
    }
    graphCallback();
}

// clean input for individual cell
function validateIndividualCell(cellNumber) {
    var currentCell = receptorRelDenTableCell(cellNumber);
    if (currentCell.value > 100) currentCell.value = 100;
    validateRelDensityRow(cellNumber);
}


// TODO - This only works on two receptors
function validateRelDensityRow(currentCellNumber) {
    var previousCheckedBox0 = activeCheckBoxes()[0];
    var previousCheckedBox1 = activeCheckBoxes()[1];
    var currentCellValue = parseInt(receptorRelDenTableCell(currentCellNumber).value);

    if (currentCellNumber === previousCheckedBox0) receptorRelDenTableCell(previousCheckedBox1).value = 100 - currentCellValue;
    else receptorRelDenTableCell(previousCheckedBox0).value = 100 - currentCellValue;
    generateGraph();
}

// This function will take the data from the page and then draw the graph.
// TODO - fix graph
// TODO -  this only works with one graph
function generateGraph() {
    var data = [];
    switch (activeCheckBoxes().length) {
        case 1:
            for (var i = 0; i < 6; i++) {
                if (activeLigandRow()[i]) {
                    var dataSet = calculateGraphPoints(1, 100, parseFloat(ligandTableCell(activeCheckBoxes()[0] + 1, i).value));
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
            break;


        case 2:
            var activeColumn1 = activeCheckBoxes()[0];
            var activeColumn2 = activeCheckBoxes()[1];


            for (var x = 0; x < 6; x++) {
                if (activeLigandRow()[x]) {
                    var dataSet2 = calculateGraphPoints(2, parseInt(receptorRelDenTableCell(activeColumn1).value), parseFloat(ligandTableCell(activeColumn1 + 1, x).value),
                        parseInt(receptorRelDenTableCell(activeColumn2).value), parseFloat(ligandTableCell(activeColumn2 + 1, x).value));
                    var graph2 = {
                        x: dataSet2[0],
                        y: dataSet2[1],
                        mode: 'lines',
                        line: {
                            color: colorTable[x],
                            width: 1
                        },
                        name: ligandNames[ligandTableCell(0, x).value]

                    };
                    data.push(graph2);
                }
            }
            break;
        case 3:
            var column1 = activeCheckBoxes()[0];
            var column2 = activeCheckBoxes()[1];
            var column3 = activeCheckBoxes()[2];


            for (var q = 0; q < 6; q++) {
                if (activeLigandRow()[q]) {
                    var dataSet3 = calculateGraphPoints(2, parseInt(receptorRelDenTableCell(column1).value), parseFloat(ligandTableCell(column1 + 1, x).value),
                        parseInt(receptorRelDenTableCell(column2).value), parseFloat(ligandTableCell(column2 + 1, x).value),
                        parseInt(receptorRelDenTableCell(column3).value), parseFloat(ligandTableCell(column3 + 1, x).value));
                    var graph3 = {
                        x: dataSet3[0],
                        y: dataSet3[1],
                        mode: 'lines',
                        line: {
                            color: colorTable[q],
                            width: 1
                        },
                        name: ligandNames[ligandTableCell(0, x).value]

                    };
                    data.push(graph3);
                }
            }
    }
    plotGraph(data)
}

// Draw/Update the graph from a data object.
// Legend visible by default, allows an options object to be
// passed to Plotly.newPlot()
function plotGraph(data, showlegend, options) {
    if (typeof showlegend === "undefined")
        showlegend = true;
    if (typeof options === "undefined")
        options = {};
    var layout = {
        xaxis: {
            title: '- log [ Ligand ] (M)',
            titlefont: {
                family: 'Lato, Helvetica Neue, Helvetica, Arial, sans-serif',
                size: 18,
                color: '#7f7f7f'
            }
        },
        yaxis: {
            title: 'Specific Binding (%)',
            titlefont: {
                family: 'Lato, Helvetica Neue, Helvetica, Arial, sans-serif',
                size: 18,
                color: '#7f7f7f'
            }
        },
        // autosize: false,
        // width: 800,
        // height: 500,
        margin: {
            l: 50,
            r: 50,
            b: 50,
            t: 50,
            pad: 4
        },
        showlegend: showlegend
    };
    Plotly.newPlot('myDiv', data, layout, options);
}


function calculateGraphPoints(numberOfReceptor, den1, logVal1, den2, logVal2, den3, logVal3) {
    var STEP = 0.1;
    var dataSet = [[], []];

    switch (numberOfReceptor) {

        case 1:
            for (var x = -11; x < -2; x = x + STEP) {
                var y = oneReceptorFunction(x, den1, logVal1);
                if (y > 0.001) {
                    dataSet[0].push(x);
                    dataSet[1].push(y);
                }
            }
            break;
        case 2:
            for (var i = -11; i < -2; i = i + STEP) {
                var j = twoReceptorFunction(i, den1, logVal1, den2, logVal2);
                dataSet[0].push(i);
                dataSet[1].push(j);
            }
            break;
        case 3:
            for (var q = -11; q < -2; q = q + STEP) {
                var w = oneReceptorFunction(q, den1, logVal1, den2, logVal2, den3, logVal3);
                if (w > 0.001) {
                    dataSet[0].push(q);
                    dataSet[1].push(w);
                }
            }
            break;
        default:
            break;
    }

    return dataSet;

}


// <----->

// These functions can be changed into a loop

// Function to calculate graph of one receptor
function oneReceptorFunction(x, den1, logVal1) {
    return den1 / (1 + Math.pow(10, x + logVal1))
}

// Function to calculate graph of two receptors
function twoReceptorFunction(x, den1, logVal1, den2, logVal2) {
    return (den1 / (1 + Math.pow(10, x + logVal1))) + (den2 / (1 + Math.pow(10, x + logVal2)));
}

// Function to calculate graph of three receptors
function threeReceptorFunction(x, den1, logVal1, den2, logVal2, den3, logVal3) {
    return (den1 / (1 + Math.pow(10, x + logVal1))) + (den2 / (1 + Math.pow(10, x + logVal2))) + (den3 / (1 + Math.pow(10, x + logVal3)));
}

// <-------->


// Gets a cell from the ligand table
// this includes the first index. i.e. the selector
function ligandTableCell(colIndex, rowIndex) {
    if (colIndex === 0) return document.getElementById('ligandTable').children[0].children[rowIndex].children[colIndex].children[0].children[0];
    else return document.getElementById('ligandTable').children[0].children[rowIndex].children[colIndex].children[0];
}

// Gets cell from the relative density table
function receptorRelDenTableCell(colIndex) {
    return document.getElementById('relDensity').children[colIndex + 1].children[0];
}

// Gets cell from the check box table
function receptorCheckBoxTableCell(colIndex) {
    return document.getElementById('subtypeCheckbox').children[colIndex + 1].children[0];
}

// Returns array of index of checkboxes that are checked
function activeCheckBoxes() {
    var output = [];
    for (var i = 0; i < 5; i++) if (state.subTypePresent[i]) output.push(i);
    return output;
}

// Returns array with true iff the row is active i.e. not 'Selected'
function activeLigandRow() {
    var outputArray = [];
    for (var i = 0; i < 6; i++) outputArray[i] = parseInt(ligandTableCell(0, i).value) !== 12;
    return outputArray;
}


function validateLigandValue() {
    for (var j = 0; j < 6; j++) {
        for (var i = 1; i < 6; i++) {
            if (parseInt(ligandTableCell(i, j).value) > 11) {
                ligandTableCell(i, j).value = 11;
            } else if (parseInt(ligandTableCell(i, j).value) < 2) {
                ligandTableCell(i, j).value = 0;
            }

        }

    }
    generateGraph();
}

$(document).ready(function () {
    $('.ligandInput').blur(function () {
        validateLigandValue();
    }).keyup(function () {
        validateLigandValue()
    });
    $('[data-toggle="tooltip"]').tooltip();
});
