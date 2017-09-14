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
    subTypePresent: [false, false, false, false, false],
    relDensity: [null, null, null, null, null],
    ligands: [
        ['', '', '', '', ''],
        ['', '', '', '', ''],
        ['', '', '', '', ''],
        ['', '', '', '', ''],
        ['', '', '', '', ''],
        ['', '', '', '', '']
    ],
    activeLigandRow: [false, false, false, false, false, false]
};


// Autofills the ligands according to the selected
function ligandAutoFill(selectedLigand, rowIndex, graphCallback=generateGraph) {
    for (var i = 0; i < 5; i++) {
        ligandTableCell(i + 1, rowIndex).value = logK[selectedLigand.value][i];
        ligandTableCell(i + 1, rowIndex).disabled = (selectedLigand.value < 10 || selectedLigand.value == 12);
        state.ligands[rowIndex][i] = logK[selectedLigand.value][i];
    }
    state.activeLigandRow[rowIndex] = selectedLigand.value != 12;
    graphCallback();
}

function updateCustomValue(rowIndex, graphCallback=generateGraph) {
    var row = [];
    for (var i = 0; i < 5; i++) row.push(parseInt(ligandTableCell(i + 1, rowIndex).value));
    state.ligands[rowIndex] = row;
    graphCallback();
}

// Updates graph and data, call this function when DOM updates needed
// this function also updates state
// currently not yet in use
// function updateDOM() {
//     var ligandTable = document.getElementById('ligandTable').children[0];
//
//     //copy ligand values to state
//     // for (var y = 0; y < 6; y++) for (var x = 0; x < 5; x++) state.ligands[y][x] = ligandTable.children[y].children[x + 1].children[0].value;
//     plotGraph();
// }

// validate if check box can be selected
// TODO - change the value to 100 after uncheck
function validateCheckBox(checkingBox) {


//// If no boxes has been selected
function validateCheckBox(checkingBox, graphCallback=generateGraph) {
    if (subTypeCheckedCount === 0) {
        state.relDensity[checkingBox] = receptorRelDenTableCell(checkingBox).value = 100;
        state.subTypePresent[checkingBox] = receptorCheckBoxTableCell(checkingBox).checked = true;
        subTypeCheckedCount++;


        // if one box was selected before
    } else if (subTypeCheckedCount === 1) {
        var previousCheckedBox = getCheckboxRow()[0];


        // if the previous box is the same that is going to be unselected (unchecking the only box)
        if (previousCheckedBox === checkingBox) {
            state.relDensity[checkingBox] = receptorRelDenTableCell(checkingBox).value = '';
            state.subTypePresent[checkingBox] = receptorCheckBoxTableCell(checkingBox).checked = false;
            subTypeCheckedCount--;

            // If its not the same (checking a new box)
        } else {
            state.subTypePresent[checkingBox] = receptorCheckBoxTableCell(checkingBox).checked = true;
            state.relDensity[checkingBox] = receptorRelDenTableCell(checkingBox).value = 50;
            receptorRelDenTableCell(checkingBox).disabled = receptorRelDenTableCell(previousCheckedBox).disabled = false;
            state.relDensity[previousCheckedBox] = receptorRelDenTableCell(previousCheckedBox).value = 50;
            subTypeCheckedCount++;
        }


        // two boxes has been selected
    } else if (subTypeCheckedCount === 2) {
        var previousCheckedBox0 = getCheckboxRow()[0];
        var previousCheckedBox1 = getCheckboxRow()[1];

        switch (checkingBox) {

            // if unchecking box 1
            case previousCheckedBox0:
                state.subTypePresent[previousCheckedBox0] = receptorCheckBoxTableCell(previousCheckedBox0).checked = false;
                state.subTypePresent[previousCheckedBox1] = receptorRelDenTableCell(previousCheckedBox0).disabled = receptorRelDenTableCell(checkingBox).disabled = true;

                state.relDensity[previousCheckedBox0] = receptorRelDenTableCell(previousCheckedBox0).value = '';
                state.relDensity[previousCheckedBox1] = receptorRelDenTableCell(previousCheckedBox1).value = 100;

                subTypeCheckedCount--;
                break;

            // if unchecking box 2
            case previousCheckedBox1:
                state.subTypePresent[previousCheckedBox1] = receptorCheckBoxTableCell(previousCheckedBox1).checked = false;
                state.subTypePresent[previousCheckedBox0] = receptorRelDenTableCell(previousCheckedBox0).disabled = receptorRelDenTableCell(checkingBox).disabled = true;

                state.relDensity[previousCheckedBox1] = receptorRelDenTableCell(previousCheckedBox1).value = '';
                state.relDensity[previousCheckedBox0] = receptorRelDenTableCell(previousCheckedBox0).value = 100;
                subTypeCheckedCount--;
                break;
            default:
                alert("You can only select two Boxes");
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

// Validate and clean density row
// TODO - rewrite
function validateRelDensityRow(currentCellNumber) {
    // var currentCell = receptorRelDenTableCell(currentCellNumber);
    // var otherCell;
    // var otherCellIndex;
    //
    // for (var x = 0; x < 5; x++) {
    //     if (document.getElementById('relDensity').children[x + 1].children[0].value > 0 && x !== currentCellNumber) {
    //         otherCell = document.getElementById('relDensity').children[x + 1].children[0];
    //         otherCellIndex = x;
    //         break;
    //     }
    // }
    //
    //
    // var currentTotal = 0;
    //
    // for (var i = 0; i < 5; i++) if (state.subTypePresent[i]) currentTotal = currentTotal + state.relDensity[i];
    //
    // if (currentTotal == 0) {
    //     currentCell.value = 100;
    //     state.relDensity[currentCellNumber] = 100;
    // } else {
    //     otherCell.value = 100 - currentCell.value;
    //     state.relDensity[currentCellNumber] = parseInt(currentCell.value);
    //     state.relDensity[otherCellIndex] = 100 - parseInt(currentCell.value);
    // }


    var currentCellIndex = currentCellNumber

}

// This function will take the data from the page and then draw the graph.
// TODO - fix graph
// TODO -  this only works with one graph
function generateGraph() {
    var subtypeIndex = function () {
        var arrayTrue = [];
        for (var i = 0; i < 5; i++) if (state.subTypePresent[i]) arrayTrue.push(i);
        return arrayTrue;
    };
    var data = [];


    switch (subtypeIndex().length) {
        case 1:

            var activeColumn = subtypeIndex()[0];

            for (var i = 0; i < 6; i++) {
                if (state.activeLigandRow[i]) {
                    var dataSet = calculateGraphPoints(1, 100, state.ligands[i][activeColumn]);
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

            var activeColumn1 = subtypeIndex()[0];
            var activeColumn2 = subtypeIndex()[1];


            for (var i2 = 0; i2 < 6; i2++) {
                if (state.activeLigandRow[i2]) {
                    var dataSet2 = calculateGraphPoints(2, receptorRelDenTableCell(activeColumn1).value, ligandTableCell(activeColumn1 + 1, i2).value,
                        receptorRelDenTableCell(activeColumn2).value, ligandTableCell(activeColumn2 + 1, i2).value);
                    var graph2 = {
                        x: dataSet2[0],
                        y: dataSet2[1],
                        mode: 'lines',
                        line: {
                            color: colorTable[i],
                            width: 1
                        },
                        name: ligandNames[ligandTableCell(0, i2).value]

                    };
                    data.push(graph2);
                }
            }
    }
    plotGraph(data)
}

// Draw a graph from an 
function plotGraph(data) {
    var layout = {
        xaxis: {
            title: '- log [ Ligand ] (M)',
            titlefont: {
                family: 'Courier New, monospace',
                size: 18,
                color: '#7f7f7f'
            }
        },
        yaxis: {
            title: 'Specific Binding (%)',
            titlefont: {
                family: 'Courier New, monospace',
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
        showlegend: true,
    };
    Plotly.newPlot('myDiv', data, layout);
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
            for (var x = -11; x < -2; x = x + STEP) {
                var y = twoReceptorFunction(x, den1, logVal1, den2, logVal2);
                dataSet[0].push(x);
                dataSet[1].push(y);
                console.log(y)
            }
            break;
        // case 3:
        //     for (var x = -11; x < -2; x = x + STEP) {
        //         var y = oneReceptorFunction(x, den1, logVal1, den2, logVal2, den3, logVal3);
        //         if (y > 0.001) {
        //             dataSet[0].push(x);
        //             dataSet[1].push(y);
        //         }
        //     }
        //     break;
    }

    return dataSet;

}


// <----->

// These functions can be changed into a loop

// Function to calculate graph of one receptor
// Density is assumed to be 100
function oneReceptorFunction(x, den1, logVal1) {
    return den1 / (1 + Math.pow(10, x + logVal1))
}

// Function to calculate graph of two receptors
function twoReceptorFunction(x, den1, logVal1, den2, logVal2) {
    console.log();
    return (den1 / (1 + Math.pow(10, x + logVal1))) + (den2 / (1 + Math.pow(10, x + logVal2)));
}

// Function to calculate graph of three receptors
function threeReceptorFunction(x, den1, logVal1, den2, logVal2, den3, logVal3) {
    return (den1 / (1 + Math.pow(10, x + logVal1))) + (den2 / (1 + Math.pow(10, x + logVal2))) + (den3 / (1 + Math.pow(10, x + logVal3)))
}

// <-------->


// Gets a cell from the ligand table
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

function getCheckboxRow() {
    var output = [];
    for (var i = 0; i < 5; i++) if (state.subTypePresent[i]) output.push(i);
    return output;
}