


//// Check if the box can be checked
function validateCheckBox(checkingBox, graphCallback) {
    if (typeof graphCallback === "undefined")
        graphCallback = generateGraph;

    if (subTypeCheckedCount === 0) {
        receptorRelDenTableCell(checkingBox).value = 100;
        state.subTypePresent[checkingBox] = receptorCheckBoxTableCell(checkingBox).checked = true;
        enableColumn(checkingBox + 1);
        subTypeCheckedCount++;


        // if one box was selected before
    } else if (subTypeCheckedCount === 1) {
        var previousCheckedBox = activeCheckBoxes()[0];

        // if the previous box is the same that is going to be unselected (unchecking the only box)
        if (previousCheckedBox === checkingBox) {
            receptorRelDenTableCell(checkingBox).value = '';
            state.subTypePresent[checkingBox] = receptorCheckBoxTableCell(checkingBox).checked = false;
            disableColumn(checkingBox + 1);
            subTypeCheckedCount--;

            // If its not the same (checking a new box)
        } else {
            state.subTypePresent[checkingBox] = receptorCheckBoxTableCell(checkingBox).checked = true;
            receptorRelDenTableCell(checkingBox).value = receptorRelDenTableCell(previousCheckedBox).value = 50;
            receptorRelDenTableCell(checkingBox).disabled = receptorRelDenTableCell(previousCheckedBox).disabled = false;
            enableColumn(checkingBox + 1);
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

                disableColumn(checkingBox + 1);
                subTypeCheckedCount--;
                break;

            // if unchecking box 2
            case previousCheckedBox1:
                state.subTypePresent[previousCheckedBox1] = receptorCheckBoxTableCell(previousCheckedBox1).checked = false;
                state.subTypePresent[previousCheckedBox0] = receptorRelDenTableCell(previousCheckedBox0).disabled = receptorRelDenTableCell(checkingBox).disabled = true;

                receptorRelDenTableCell(previousCheckedBox1).value = '';
                receptorRelDenTableCell(previousCheckedBox0).value = 100;
                disableColumn(checkingBox + 1);
                subTypeCheckedCount--;
                break;

            default:
                
               state.subTypePresent[checkingBox] = receptorCheckBoxTableCell(checkingBox).checked = true;
               receptorRelDenTableCell(checkingBox).value = receptorRelDenTableCell(previousCheckedBox0).value = receptorRelDenTableCell(previousCheckedBox1).value = 33.3;
               receptorRelDenTableCell(checkingBox).disabled = receptorRelDenTableCell(previousCheckedBox0).disabled = receptorRelDenTableCell(previousCheckedBox1).disabled =false;
               enableColumn(checkingBox + 1);
               subTypeCheckedCount++;
                break;
        }
        
       }else if(subTypeCheckedCount === 3){
            var previousCheckedBox30 = activeCheckBoxes()[0];
            var previousCheckedBox31 = activeCheckBoxes()[1];
            var previousCheckedBox32 = activeCheckBoxes()[2];
            switch (checkingBox) {

                case previousCheckedBox30:

                state.subTypePresent[previousCheckedBox30] = receptorCheckBoxTableCell(previousCheckedBox30).checked = false;
                receptorRelDenTableCell(previousCheckedBox30).disabled = receptorRelDenTableCell(checkingBox).disabled = true;
                

                receptorRelDenTableCell(previousCheckedBox30).value = '';
                receptorRelDenTableCell(previousCheckedBox31).value = 50;
                receptorRelDenTableCell(previousCheckedBox32).value = 50;

                disableColumn(checkingBox + 1);
                subTypeCheckedCount--;
                break;

                case previousCheckedBox31:

                state.subTypePresent[previousCheckedBox31] = receptorCheckBoxTableCell(previousCheckedBox31).checked = false;
                receptorRelDenTableCell(previousCheckedBox31).disabled = receptorRelDenTableCell(checkingBox).disabled = true;
                

                receptorRelDenTableCell(previousCheckedBox30).value = 50;
                receptorRelDenTableCell(previousCheckedBox31).value = '';
                receptorRelDenTableCell(previousCheckedBox32).value = 50;
                disableColumn(checkingBox + 1);
                subTypeCheckedCount--;

                break;

                case previousCheckedBox32:

                state.subTypePresent[previousCheckedBox32] = receptorCheckBoxTableCell(previousCheckedBox32).checked = false;
                receptorRelDenTableCell(previousCheckedBox32).disabled = receptorRelDenTableCell(checkingBox).disabled = true;
                

                receptorRelDenTableCell(previousCheckedBox30).value = 50;
                receptorRelDenTableCell(previousCheckedBox31).value = 50;
                receptorRelDenTableCell(previousCheckedBox32).value = '';
                disableColumn(checkingBox + 1);
                subTypeCheckedCount--;
                break;

                default:
                alert("You can only select three boxes");
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
    if (currentCellValue < 0) currentCellValue = receptorRelDenTableCell(currentCellNumber).value = 0;
    
    //if (currentCellNumber === previousCheckedBox0) receptorRelDenTableCell(previousCheckedBox1).value = 100 - currentCellValue;
    //else receptorRelDenTableCell(previousCheckedBox0).value = 100 - currentCellValue;

    if(subTypeCheckedCount <= 2)
    {
        if (currentCellNumber === previousCheckedBox0) receptorRelDenTableCell(previousCheckedBox1).value = 100 - currentCellValue;
        else receptorRelDenTableCell(previousCheckedBox0).value = 100 - currentCellValue;
    }
    else
    {
        var previousCheckedBox2 = activeCheckBoxes()[2];
        if (currentCellNumber === previousCheckedBox0) // Left box value entry updates the right 2 boxes
        {
            receptorRelDenTableCell(previousCheckedBox1).value = (100 - currentCellValue)/2;
            receptorRelDenTableCell(previousCheckedBox2).value = (100 - currentCellValue)/2;
        }
        else if (currentCellNumber === previousCheckedBox1) // Middle box value entry updates the right 1 box
        {
            receptorRelDenTableCell(previousCheckedBox2).value = 100 - receptorRelDenTableCell(previousCheckedBox0).value - currentCellValue; 
        }
    }

    generateGraph();
}

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
    generateGraph();
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

function addReceptorListener() {
    $('#relDensity').find("td").each(function (count) {
        if (count > 0) {
            $(this).blur(function () {
                validateIndividualCell(count - 1);
            }).mouseup(function () {
                validateIndividualCell(count - 1);
            }).change(function () {
                validateIndividualCell(count - 1);
            });
        }
    });
}

function enableColumn(col) {
    for (var i = 0; i < 6; i++) {
        ligandTableCell(col, i).classList.add('activeColumn');
        receptorRelDenTableCell(col - 1).classList.add('activeColumn');
    }
}

function disableColumn(col) {
    for (var i = 0; i < 6; i++) {
        ligandTableCell(col, i).classList.remove('activeColumn');
        receptorRelDenTableCell(col - 1).classList.remove('activeColumn');
    }
}

$(document).ready(function () {
    generateGraph();
    addLigandListener();
    addReceptorListener();
    $('[data-toggle="tooltip"]').tooltip();
});
$(window).resize(function () {
    generateGraph();
});

function showBody() {
    $('body').fadeIn();
    setTimeout(generateGraph, 100);
}

setTimeout(showBody, 5000);
