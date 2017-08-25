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

// keeps the count of checked boxes
var subTypeCheckedCount = 0;


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
    ]
};


// TODO: use functional programming.


// <---->
// Autofills the ligands according to the selected
// TODO  --- make it less dirty
// TODO -- change select receptor 12th index
function ligandAutoFill(e, rowIndex) {
    var table = document.getElementById('ligandTable').children[0];

    for (var i = 0; i < 5; i++) {
        table.children[rowIndex].children[i + 1].children[0].value = logK[e.value][i];
        state.ligands[rowIndex][i] = logK[e.value][i];
        table.children[rowIndex].children[i + 1].children[0].disabled = (e.value < 10 || e.value == 12);
    }
}

// Updates graph and data, call this function when DOM updates needed
// this function also updates state
// currently not yet in use
function updateDOM() {
    var ligandTable = document.getElementById('ligandTable').children[0];
    for (var y = 0; y < 6; y++) for (var x = 0; x < 5; x++) state.ligand[y][x] = ligandTable.children[y].children[x + 1].children[0].value


}

// validate if check box can be selected
// TODO - someone make this pretty
function validateCheckBox(checkingBox) {
    var checkBoxRow = document.getElementById('subtypeCheckbox');
    var relDensityRow = document.getElementById('relDensity');
    if (state.subTypePresent[checkingBox]) {
        subTypeCheckedCount--;
        state.subTypePresent[checkingBox] = false;
        checkBoxRow.children[checkingBox + 1].children[0].checked = false;
        relDensityRow.children[checkingBox + 1].children[0].disabled = true;
        relDensityRow.children[checkingBox + 1].children[0].value = '';
        state.relDensity[checkingBox] = '';
    } else if (!state.subTypePresent[checkingBox]) {
        if (subTypeCheckedCount >= 2) {
            alert('You can only check two boxes');
            checkBoxRow.children[checkingBox + 1].children[0].checked = false;
            relDensityRow.children[checkingBox + 1].children[0].disabled = true;
            state.relDensity[checkingBox] = '';
        } else {
            subTypeCheckedCount++;
            state.subTypePresent[checkingBox] = true;
            checkBoxRow.children[checkingBox + 1].children[0].checked = true;
            relDensityRow.children[checkingBox + 1].children[0].disabled = false;
        }
    } else alert('Error')
}

// clean input for individual cell
function validateIndividualCell(cellNumber) {
    var currentCell = document.getElementById('relDensity').children[cellNumber + 1].children[0];

    if (currentCell.value > 100) currentCell.value = 100;

    validateRelDensityRow(cellNumber);
}

// validate and clean density row
// TODO - add third input
function validateRelDensityRow(currentCellNumber) {
    var currentCell = document.getElementById('relDensity').children[currentCellNumber + 1].children[0];
    var otherCell;
    var otherCellIndex;

    for (var x = 0; x < 5; x++) {
        if (document.getElementById('relDensity').children[x + 1].children[0].value > 0 && x !== currentCellNumber) {

            otherCell = document.getElementById('relDensity').children[x + 1].children[0];
            otherCellIndex = x;
            break;
        }
    }


    var currentTotal = 0;

    for (var i = 0; i < 5; i++) {
        if (state.subTypePresent[i]) currentTotal = currentTotal + state.relDensity[i];
    }

    console.log(currentTotal);

    if (currentTotal == 0) {
        currentCell.value = 100;
        state.relDensity[currentCellNumber] = 100;
    } else {
        otherCell.value = 100 - currentCell.value;
        state.relDensity[currentCellNumber] = parseInt(currentCell.value);
        state.relDensity[otherCellIndex] = 100 - parseInt(currentCell.value);
    }


}


// TODO -fix graph
function plotGraph(logValue) {

    // temporary
    var dataSet = exportData(9.3);
    var graph = {
        x: dataSet[0],
        y: dataSet[1],
        mode: 'lines'
    };
    // temporary
    var forceY = {
        x: [-11, -2],
        y: [0, 0],
        line: {
            color: 'rgb(0, 0, 0)',
            width: 1
        }
    };

    var data = [graph, forceY];


    Plotly.newPlot('myDiv', data);
}


function exportData(logValue) {
    var STEP = 0.1;

    var dataSet = [[], []];

    for (var x = -11; x < -2; x = x + STEP) {
        var y = oneDataCal(x, logValue);
        if (y > 0.001) {
            dataSet[0].push(x);
            dataSet[1].push(y);
        }

    }

    console.log(dataSet);
    return dataSet;

}

function oneDataCal(x, logVal) {
    return 100 / (1 + Math.pow(10, x + logVal))
}
