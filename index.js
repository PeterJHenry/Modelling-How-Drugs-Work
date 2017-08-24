// Holds the receptor ratio table
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
    receptors: [
        ['', '', '', '', ''],
        ['', '', '', '', ''],
        ['', '', '', '', ''],
        ['', '', '', '', ''],
        ['', '', '', '', ''],
        ['', '', '', '', '']
    ]
};

// Autofills the receptors according to the selected
// TODO  --- make it less dirty
// TODO -- change select receptor 12th index
function receptorAutoFill(e, rowIndex) {
    var table = document.getElementById('receptorTable').children[0];

    for (var i = 0; i < 5; i++) {
        table.children[rowIndex].children[i + 1].children[0].value = logK[e.value][i];
        state.receptors[rowIndex][i] = logK[e.value][i];
        if (e.value < 10 || e.value == 12) {
            table.children[rowIndex].children[i + 1].children[0].disabled = true;
        } else {
            table.children[rowIndex].children[i + 1].children[0].disabled = false;
        }
    }
}

// Updates graph and data, call this function when DOM updates needed
// this function also updates state
function updateDOM() {
    var receptorTable = document.getElementById('receptorTable').children[0];
    for (var y = 0; y < 6; y++) {
        for (var x = 0; x < 5; x++) {
            state.receptors[y][x] = receptorTable.children[y].children[x + 1].children[0].value
        }
    }


}

// validate if check box can be selected
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
    } else {
        alert('Error')
    }
}

// clean input for individual cell
function validateIndividualCell(cellNumber) {
    var currentCell = document.getElementById('relDensity').children[cellNumber + 1].children[0];

    if (currentCell.value > 100) {
        currentCell.value = 100;
    }

    validateRelDensityRow(cellNumber);
}

// validate and clean density row
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
        if (state.subTypePresent[i]) {
            currentTotal = currentTotal + state.relDensity[i];
        }
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

    var data = [graph,forceY];


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