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
    ['', '', '', '', '']
];

var subTypeCheckedCount = 0;
// Holds current DOM state(makes generating graph easier)
const state = {
    subTypePresent: [false, false, false, false, false],
    relDensity: ['', '', '', '', ''],
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
function receptorAutoFill(e, rowIndex) {
    var table = document.getElementById('receptorTable').children[0];
    for (var i = 0; i < 5; i++) {
        table.children[rowIndex].children[i + 1].children[0].value = logK[e.value][i];
    }
    updateDOM();
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

function validateCheckBox(checkingBox) {
    var checkBoxRow = document.getElementById('subtypeCheckbox');
    var relDensityRow = document.getElementById('relDensity');

    console.log(relDensityRow.children[checkingBox]);
    if (state.subTypePresent[checkingBox]) {
        subTypeCheckedCount--;
        state.subTypePresent[checkingBox] = false;
        checkBoxRow.children[checkingBox + 1].children[0].checked = false;
        relDensityRow.children[checkingBox+1].children[0].disabled = true;
    } else if (!state.subTypePresent[checkingBox]) {
        if (subTypeCheckedCount >= 2) {
            alert('You can only check two boxes');
            checkBoxRow.children[checkingBox + 1].children[0].checked = false;
            relDensityRow.children[checkingBox+1].children[0].disabled = true;
        } else {
            subTypeCheckedCount++;
            state.subTypePresent[checkingBox] = true;
            checkBoxRow.children[checkingBox + 1].children[0].checked = true;
            relDensityRow.children[checkingBox+1].children[0].disabled = false;
        }
    } else {
        alert('Error')
    }
}

