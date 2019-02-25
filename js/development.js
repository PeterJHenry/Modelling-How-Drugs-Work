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
                receptorRelDenTableCell(checkingBox).disabled = receptorRelDenTableCell(previousCheckedBox0).disabled = receptorRelDenTableCell(previousCheckedBox1).disabled = false;
                enableColumn(checkingBox + 1);
                subTypeCheckedCount++;
                break;
        }

    } else if (subTypeCheckedCount === 3) {
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

    if (subTypeCheckedCount <= 2) {
        if (currentCellNumber === previousCheckedBox0) receptorRelDenTableCell(previousCheckedBox1).value = 100 - currentCellValue;
        else receptorRelDenTableCell(previousCheckedBox0).value = 100 - currentCellValue;
    }
    else {
        var previousCheckedBox2 = activeCheckBoxes()[2];
        if (currentCellNumber === previousCheckedBox0) // Left box value entry updates the right 2 boxes
        {
            receptorRelDenTableCell(previousCheckedBox1).value = (100 - currentCellValue) / 2;
            receptorRelDenTableCell(previousCheckedBox2).value = (100 - currentCellValue) / 2;
        }
        else if (currentCellNumber === previousCheckedBox1) // Middle box value entry updates the right 1 box
        {
            if ((100 - receptorRelDenTableCell(previousCheckedBox0).value - currentCellValue) >= 0)
                receptorRelDenTableCell(previousCheckedBox2).value = 100 - receptorRelDenTableCell(previousCheckedBox0).value - currentCellValue;
            else receptorRelDenTableCell(previousCheckedBox2).value = 0;
            if ((receptorRelDenTableCell(previousCheckedBox0).value) >= 100) {
                receptorRelDenTableCell(previousCheckedBox1).value = 0;
                receptorRelDenTableCell(previousCheckedBox2).value = 0;
            }
        }
        else if (currentCellNumber === previousCheckedBox2) // Middle box value entry updates the right 1 box
        {
            if ((100 - receptorRelDenTableCell(previousCheckedBox0).value - currentCellValue) >= 0)
                receptorRelDenTableCell(previousCheckedBox1).value = 100 - receptorRelDenTableCell(previousCheckedBox0).value - currentCellValue;
            else receptorRelDenTableCell(previousCheckedBox1).value = 0;
            if ((receptorRelDenTableCell(previousCheckedBox0).value) >= 100) {
                receptorRelDenTableCell(previousCheckedBox1).value = 0;
                receptorRelDenTableCell(previousCheckedBox2).value = 0;
            }
        }
    }

    generateGraph('myDiv');
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
    generateGraph('myDiv');
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
            }).keyup(function () {
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
    generateGraph('myDiv');
    addLigandListener();
    addReceptorListener();
    $('[data-toggle="tooltip"]').tooltip();
    setTimeout(function () {
        generateGraph();
    }, 500);
    document.getElementById('m1-check').click();
    document.getElementById('1-select').value="0";
    $('#1-select').trigger('change');
});

$(window).resize(function () {
    generateGraph('myDiv');
});

function showInstructionsDevelopment() {
    $('#instructions').modal('show');
    $('#instructions').on('shown.bs.modal', function (event) {
        $('#developmentToolButton').trigger("click");
    })
};

//QUESTIONS:
var questionsDev = [
"What are competition binding studies/curves used for?",
"What key information do competition binding curves provide?",
"The Development Tool helps you visualise how the shape and position of competition binding curves can be influenced by (1) the relative densities of receptor subtypes expressed by cells or tissues, and (2) the affinities of ligands for the receptor subtypes.  We will work through a series of exercises that will hopefully increase your understanding of basic concepts of competition binding curves and will prepare you for using the Self-Assessment and Quiz tools. Shown is a theoretical competition binding curve for atropine in a cell preparation that contains a pure (100%) population of M<sub>1</sub> receptors. How is the position and shape of the atropine competition binding curve determined?",
"To what extent is the position of the atropine competition binding curve altered when the receptor subtype present is the cell/tissue is changed from 100% M<sub>1</sub> to 100% M<sub>2</sub> (or M<sub>3</sub> or M<sub>4</sub> or M<sub>5</sub>)?<i>[Try this in the Development Tool, by changing the Receptor subtypes present from 100% M<sub>1</sub> to 100%M<sub>2</sub>]</i>",
"If atropine cannot discriminate between the various M receptor subtypes, what is its value in a binding study?",
"Now introduce another ligand into the competition binding study, Pirenzepine <i>[i.e. change the Receptor back to 100%M<sub>1</sub> and from drop-down menu in the Ligands box select Pirenzepine as the second competing ligand (Ligand 2)].</i> The –logK<sub>i</sub>  values of pirenzepine for the five different M receptor subtypes appear in the Ligands box and the competition binding curve for pirenzepine to 100% M<sub>1</sub> receptors is plotted.  In the Ligands box, it states that Pirenzepine has a –logK<sub>i</sub>  value of 8.2 for the M<sub>1</sub> receptor subtype – what does this indicate?",
"Pirenzepine has a much lower –logK<sub>i</sub>  value of 6.5 for the M<sub>2</sub> receptor subtype <i>[see values in Ligand box or –logK<sub>i</sub>  Reference Table] </i>– what does this indicate?",
"Pirenzepine has similar –logK<sub>i</sub>  values for the M<sub>4</sub> and M<sub>5</sub> subtypes (7.4 and 7.2 respectively) – what does this mean?",
"Now introduce a third ligand into the competition binding study, methoctramine  <i>[from drop-down menu select methoctramine as the third competing ligand (Ligand 3)]. </i>The –logK<sub>i</sub>  values of methoctramine for the five different M receptor subtypes appear in the Ligands box and the competition binding curve for methoctramine to 100% M<sub>1</sub> receptors is plotted. What is the –logK<sub>i</sub>  of methoctramine for the M<sub>1</sub> receptor subtype, and how does this compare to the previous ligands pirenzepine and atropine?   ",
"Based on its –logK<sub>i</sub>  values, for which receptors does methoctramine have highest and lowest affinity for? Methoctramine would be useful for discriminating between which M receptor subtypes?",
"Now introduce a fourth ligand, darifenacin, into the competition binding study (Ligand 4). Based on its –logK<sub>i</sub>  values, for which receptors does darifenacin have highest and lowest affinity for? Darifenacin would be useful for discriminating between which M receptor subtypes?",
"Now introduce a fifth ligand, MT-3, into the competition binding study (Ligand 5).  Based on its –logK<sub>i</sub>  values, for which receptors does MT-3 have highest and lowest affinity for?  MT-3 would be useful for discriminating between which M receptor subtypes?",
"Now introduce a sixth ligand, S-secoverine (Ligand 6).  Based on its –logK<sub>i</sub>  values, for which receptors does S-secoverine have highest and lowest affinity for?  S-secoverine would be useful for discriminating between which M receptor subtypes?",
"To date, we have used six established ligands – namely atropine, pirenzepine, methoctramine, darifenacin, MT-3 and S-secoverine.  Which combination of ligands would you use in a competition binding study to determine if the cell/tissue contains M<sub>1</sub>, M<sub>2</sub>, M<sub>3</sub>, M<sub>4</sub> or M<sub>5</sub> receptors?",
"A characteristic feature of the established ligands for M receptors is their relatively low levels of selectivity for a particular subtype.  From the list of established ligands, which ligand shows the single highest level of selectivity<i> [see –logK<sub>i</sub>  Reference Table]</i>?",
"<i>[Reset the Receptor characteristics to 100% M<sub>1</sub>, and replace atropine as Ligand 1 with Ligand A (from drop-down list)].  </i>The –logK<sub>i</sub>  values of Ligand A for the five different M receptor subtypes appear in the Ligands box and the competition binding curve for Ligand A to 100% M<sub>1</sub> receptors is plotted. In general terms, how might you describe the binding properties of Ligand A?",
"Now, let’s look at Ligand B <i>[replace Ligand A with Ligand B (from drop-down list)]. </i>The –logK<sub>i</sub>  values of Ligand B for the five different M receptor subtypes appear in the Ligands box and the competition binding curve for Ligand B to 100% M<sub>1</sub> receptors is plotted.  In general terms, how might you describe the binding properties of Ligand B?",
"Now, let’s look at Ligand C <i>[replace Ligand B with Ligand C (from drop-down list)]. </i>In SPIKES<i>bind</i>, Ligand C (and Ligand D) are theoretical ligands where you can define the –logK<sub>i</sub>  value for the receptor subtype by entering a value (range 3.0 – 10.0) or by using the &#x25B2;/&#x25BC;arrows.   What happens to the binding curve for Ligand C as you increase the –logK<sub>i</sub>  value for the M<sub>1</sub> subtype from 3.0 to 10.0 – why is this?",
"For Ligand C, set the –logK<sub>i</sub>  values for M<sub>1</sub>, M<sub>2</sub>, M<sub>3</sub>, M<sub>4</sub> and M<sub>5</sub> as 6.0, 7.0, 8.0, 9.0 and 10.0 respectively.  How might you describe the binding properties of Ligand C?",
"Having selected the six ligands (Ligand C, pirenzepine, methoctramine, darifenacin, MT-3 and S-secoverine) and observed the competition binding curves when the cell contains 100% M<sub>1</sub> receptors, think about how these curves might be expected to change if a cell contained 100% M<sub>2</sub> receptors.  Which ligand’s competition binding curve would be expected to shift the most? Why?",
"Having selected the six ligands and observed the competition binding curves when the cell contains 100% M<sub>1</sub> receptors, think about how these curves might be expected to change if a cell contained 100% M<sub>5</sub> receptors.  Which ligand’s competition binding curve would be expected to shift the most? Why?",
"Having selected the six ligands and observed the competition binding curves when the cell contains 100% M<sub>1</sub> receptors, think about how these curves might be expected to change if a cell contained a mixture of 50% M<sub>1</sub> and 50% M<sub>4</sub> receptors<i>[click on the M<sub>4</sub> subtype button, and the Relative Density for M<sub>1</sub> and M<sub>4</sub> should both change to 50%].</i>The shape of which ligand’s competition binding curves are <i>steep sigmoidal</i> and which are <i>shallow sigmoidal</i>? How was this determined?",
"Having selected the six ligands and observed the competition binding curves when the cell contains 50% M<sub>1</sub> and 50% M<sub>4</sub> receptors, think about how these curves might be expected to change if a cell contained a mixture of 20% M<sub>1</sub> and 80% M<sub>4</sub> receptors (click on the  &#x25B2;/&#x25BC;arrows to change the Relative Density for M<sub>1</sub> to 20%, M<sub>4</sub> Relative Density should change automatically to 80%).   What effect does this change have on the shapes of the competition binding curves?",
"Keeping the ligands unchanged (pirenzepine, methoctramine, darifenacin, MT-3, S-secoverine and Ligand C), change the receptor subtypes/densities to 40%M<sub>1</sub> and 60%M<sub>5</sub>.  For which ligands are the competition binding curves <i>biphasic</i>, <i>steep sigmoidal</i> or <i>shallow sigmoidal</i>? ",
];

var answerTable1 = "<table class=\"table table-bordered table-hover\">        <thead>            <tr>                <th>Competing Ligand</th>                <th>Visually-determined logIC<sub>50</sub> value></th>                <th>Specific Binding (%) at logIC<sub>50</sub>-1</th>                <th>Specific Binding (%) at logIC<sub>50</sub>+1</th>                <th>Difference</th>                <th>Shape</th>            </tr>        </thead>        <tbody>            <tr>                <td>Pirenzepine</td>                <td>-7.80</td>                <td>(-8.80) 88.0</td>                <td>(-6.80) 12.0</td>                <td>88.0 - 12.0 = <b><mark>76.0%</mark></b></td>                <td><mark>Shallow</mark></td>            </tr>            <tr>                <td>Methoctramine</td>                <td>-6.85</td>                <td>(-7.85) 90.5</td>                <td>(-5.85) 9.5</td>                <td>90.5 - 9.5 = <b>81.0%</b></td>                <td>Steep</td>            </tr>            <tr>                <td>Darifenacin</td>                <td>-7.75</td>                <td>(-8.75) 90.9</td>                <td>(-6.75) 9.1</td>                <td>90.9 - 9.1 = <b>81.8%</b></td>                <td>Steep</td>            </tr>            <tr>                <td>MT-3</td>                <td>-7.40</td>                <td>(-8.40) 82.3</td>                <td>(-6.40) 17.7</td>                <td>82.3 - 17.7 = <b><mark>64.6%</mark></b></td>                <td><mark>Shallow</mark></td>            </tr>            <tr>                <td>S-secoverine</td>                <td>-7.85</td>                <td>(-8.85) 90.5</td>                <td>(-6.85) 9.5</td>                <td>90.5 - 9.5 = <b>81.0%</b></td>                <td>Steep</td>            </tr>            <tr>                <td>Ligand C</td>                <td>-7.50</td>                <td>(-8.50) 61.9</td>                <td>(-6.50) 38.1</td>                <td>61.9 - 38.1 = <mark><b>23.8%</b></mark></td>                <td><mark>Biphasic</mark></td>            </tr>        </tbody>    </table>"
var answerTable2 = "<table class=\"table table-bordered table-hover\">        <thead>            <tr>                <th>Competing Ligand</th>                <th>Visually-determined logIC<sub>50</sub> value></th>                <th>Specific Binding (%) at logIC<sub>50</sub>-1</th>                <th>Specific Binding (%) at logIC<sub>50</sub>+1</th>                <th>Difference</th>                <th>Shape</th>            </tr>        </thead>        <tbody>            <tr>                <td>Pirenzepine</td>                <td>-7.54</td>                <td>(-8.54) 88.3</td>                <td>(-6.54) 10.1</td>                <td>88.3 - 10.1 = <b><mark>78.2%</mark></b></td>                <td><mark>Shallow</mark></td>            </tr>            <tr>                <td>Methoctramine</td>                <td>-6.94</td>                <td>(-7.94) 90.7</td>                <td>(-5.94) 9.4</td>                <td>90.7 - 9.4 = <b>81.3%</b></td>                <td>Steep</td>            </tr>            <tr>                <td>Darifenacin</td>                <td>-7.72</td>                <td>(-8.72) 90.9</td>                <td>(-6.72) 9.1</td>                <td>90.9 - 9.1 = <b>81.8%</b></td>                <td>Steep</td>            </tr>            <tr>                <td>MT-3</td>                <td>-7.90</td>                <td>(-8.90) 88.9</td>                <td>(-6.90) 17.0</td>                <td>88.9 - 17.0 = <b><mark>71.9%</mark></b></td>                <td><mark>Shallow</mark></td>            </tr>            <tr>                <td>S-secoverine</td>                <td>-7.76</td>                <td>(-8.76) 90.6</td>                <td>(-6.76) 9.3</td>                <td>90.6 - 9.3 = <b>81.3%</b></td>                <td>Steep</td>            </tr>            <tr>                <td>Ligand C</td>                <td>-8.78</td>                <td>(-9.78) 88.6</td>                <td>(-7.78) 24.2</td>                <td>88.6 - 24.2 = <b><mark>64.4%</mark></b></td>                <td><mark>Biphasic</mark></td>            </tr>        </tbody>    </table>"
var answerTable3 = "<table class=\"table table-bordered table-hover\">        <thead>            <tr>                <th>Competing Ligand</th>                <th>Visually-determined logIC<sub>50</sub> value></th>                <th>Specific Binding (%) at logIC<sub>50</sub>-1</th>                <th>Specific Binding (%) at logIC<sub>50</sub>+1</th>                <th>Difference</th>                <th>Shape</th>            </tr>        </thead>        <tbody>            <tr>                <td>Pirenzepine</td>                <td>-7.58</td>                <td>(-8.58) 85.8</td>                <td>(-6.58) 12.5</td>                <td>85.8 - 12.5 = <b><mark>73.3%</mark></b></td>                <td><mark>Shallow</mark></td>            </tr>            <tr>                <td>Methoctramine</td>                <td>-6.46</td>                <td>(-7.46) 90.4</td>                <td>(-5.46) 9.8</td>                <td>90.4 - 9.8 = <b>80.6%</b></td>                <td>Steep</td>            </tr>            <tr>                <td>Darifenacin</td>                <td>-7.92</td>                <td>(-8.92) 90.7</td>                <td>(-6.92) 9.3</td>                <td>90.7 - 9.3 = <b>81.4%</b></td>                <td>Steep</td>            </tr>            <tr>                <td>MT-3</td>                <td>-6.27</td>                <td>(-7.27) 88.5</td>                <td>(-5.27) 10.9</td>                <td>88.5 - 10.9 = <b><mark>77.6%</mark></b></td>                <td><mark>Shallow</mark></td>            </tr>            <tr>                <td>S-secoverine</td>                <td>-7.02</td>                <td>(-8.02) 78.7</td>                <td>(-6.02) 15.3</td>                <td>78.7 - 15.3 = <b><mark>63.4%</mark></b></td>                <td><mark>Shallow</mark></td>            </tr>            <tr>                <td>Ligand C</td>                <td>-9.30</td>                <td>(-10.3) 80.0</td>                <td>(-8.30) 41.0</td>                <td>80.0 - 41.0 = <b><mark>39.0%</mark></b></td>                <td><mark>Biphasic</mark></td>            </tr>        </tbody>    </table>"

var answersDev = [
"A key purpose for conducting competition binding studies is to determine which receptor subtypes are present within a cell/tissue and their relative densities.  As explained later, this typically requires conducting a competition binding study using a selection of competing ligands that together can clearly differentiate between the various receptor subtypes (based on their relative affinities for the receptor subtypes).  <br><br>When combined with a saturation binding study (which can determine the total density of receptors that bind the radioligand), the competition binding study can determine absolute densities of receptor subtypes present.  <br><br>However, determination of the cellular function of these receptors require the completion of ‘functional’ studies and associated analyses such as the powerful Schild analyses described in SPIKESfunc.",
"Ultimately, you wish to determine the affinities of a selection of competing ligands for the receptors present in the cell/tissue and then compare these visually-determined affinity value(s) to a list of reference (known) affinities for the competing ligands determined (typically by others) in pure populations of receptors – this process may allow the identification of the receptor subtype present through the elimination of receptors that are not present (via application of the SPIKES mnemonic).  <br><br>However, an absolute measure of the affinity of a competing ligand for the receptors cannot typically be directly determined from the competition binding curve – this is because the position of the competition binding curve is influenced by the affinity and concentration of the radioligand.  The higher the concentration of radioligand used, the higher the concentrations of competing ligand required to out-compete the radioligand and bind to the receptor – thus, the higher the [radioligand] used, the further the competition binding curve is shifted to the right.  <br><br>Nevertheless, the position of the competition binding curve (IC<sub>50</sub> value) can be used to calculate the absolute affinity of the competing ligand for the receptor (K<sub>i</sub>) present by applying the Cheng-Prusoff (1973) equation: <br><img class=\"img-fluid\" src=\"img/chengprusoff.png\" style=\"width:250px\"> <br>where <br>Ki= the affinity of the competing ligand for the receptor(s) present (the ‘i’ indicates the affinity value was determined from a competition (inhibition) binding study) <br><br> IC<sub>50</sub> = the [competing ligand] that reduces radioligand binding by 50% (determined from the competition binding curve) <br><br> [radioligand] = the concentration of radioligand used in the competition binding study <br><br> K<sub>d</sub> of radioligand = the affinity of the radioligand for the receptors – typically determined from a previously-completed saturation binding study <br><br> From the Cheng-Prusoff equation, notice that if the [radioligand] used is very low (compared to K<sub>d</sub> of radioligand) then the value of the denominator approaches 1, and the K<sub>i</sub> value approximates the IC<sub>50</sub> value.  That is, when the [radioligand] << K<sub>d</sub> of radioligand then the visually-determined IC<sub>50</sub> value (read directly from the competition binding curve) can be used as a valid estimation of the K<sub>i</sub> value for the competing ligand.<br><br> In SPIKES<i>bind</i>, we have dictated that the [radioligand] << K<sub>d</sub> of radioligand, and thus the logIC<sub>50</sub> values obtained directly from the competition binding curves can be used as a direct measure of the affinity (logK<sub>i</sub>  value) of the ligand for the receptor(s) present (i.e. no need to apply the Cheng-Prusoff equation). ",
"The <b>position</b> of the atropine competition binding curve (along the x-axis) is typically defined in terms of the unlabelled [atropine] that inhibits the level of specific binding (of the radiolabelled ligand <sup>3</sup>H-QNB) to M<sub>1</sub> receptors by 50% - the so-called IC<sub>50</sub> value (IC is an abbreviation of Inhibitory Concentration).  <br><br>By hovering over the competition binding curve, you can estimate the log[atropine] that inhibits specific binding by 50% and obtain the logIC<sub>50</sub> value of -9.0 – it is a good approximation of –logK<sub>i</sub>  of atropine for M<sub>1</sub> receptors.  A –logK<sub>i</sub>  value of -9 indicates that a 10-9M concentration of atropine would occupy 50% of M<sub>1</sub> receptors (in the absence of any other competing ligands).  The fact that atropine binds at low concentrations (in nM range) indicates that it has a high affinity for M<sub>1</sub> receptors.  <br><br><b>Does the atropine competition binding curve have a characteristic shape?</b> Yes, as mentioned above, competition binding curves are frequently <i>inverse sigmoidal curves</i>, and this is the case for atropine.  Moreover, if the competing ligand is binding to a single population of receptors then the competition binding curve will ideally have a particular ‘steepness’, such that the level of %Specific Binding is approximately 91%, 50% and 9% at 1/10, equal to or 10 times its IC<sub>50</sub> value, respectively.  <br><br>Indeed, by using the Development Tool, it can be seen that the levels of %Specific Binding are 90.9%, 50% and 9.1% at 10<sup>-10</sup>, 10<sup>-9</sup> and 10<sup>-8</sup>M atropine, respectively.  A competition binding curve can be considered ‘<b><i>steep sigmoidal</i></b>’ if it’s –logIC<sub>50</sub> value ± 1 log unit accounts for &ge;80% Specific Binding.  <br><br>As discussed later, competition binding curves for which the ligand’s –logIC<sub>50</sub> value ± 1 log unit accounts for < 80% Specific Binding are less steep and termed ‘<b><i>shallow sigmoidal</i></b>’, and are indicative that the competing ligand is binding to more than one receptor for which it has different affinities.  <br><br>Typically, a 0.4 log unit difference in -logK<sub>i</sub>  values of the competing ligand for the different receptors is sufficient to generate a <i>shallow sigmoidal</i> competition binding curve. ",
"The position of the atropine competition binding curve changes very little (-logIC<sub>50</sub> values of 8.8, 9.3, 8.9 and 9.2 for M<sub>2</sub>-M<sub>5</sub> receptor subtypes respectively compared to 9.0 for M<sub>1</sub> – values obtained from the –logK<sub>i</sub>  Reference Table).  This indicates that although atropine has a high affinity for each of the M receptor subtypes (binds at low [atropine]), it has a similarly high affinity for each subtype.  That is, atropine is not selective for M receptor subtypes – it binds with similar affinity to each.  <br><br>For a competing ligand to be considered selective for one receptor subtype over another, a difference of approximately 1.0 log unit (arbitrary, but useful value) in their respective logK<sub>i</sub>  values would be expected (clearly not the case for atropine).   Thus atropine would not be a useful ligand for determining which M receptor subtypes (M<sub>1</sub>, M<sub>2</sub>, M<sub>3</sub>, M<sub>4</sub> or M<sub>5</sub>) are present within a cell/tissue – essentially, atropine cannot tell the difference between M receptor subtypes – it binds with similarly high affinity to them all.   ",
"Atropine has a high affinity for all muscarinic subtypes, but does not bind significantly to any other receptors (e.g. adrenoceptors, etc. see Pubchem database) – so, it is particularly useful for identifying whether M cholinoceptors are present in a cell/tissue. <br><br>It is also frequently used to determine nonspecific binding in binding studies involving muscarinic cholinoceptors.",
"A –logK<sub>i</sub>  value of 8.2 indicates that a 10<sup>-8.2</sup>M concentration of pirenzepine (10<sup>-8.2</sup>M = 6.3 x 10<sup>-9</sup>M) would occupy 50% of M<sub>1</sub> receptors (in the absence of any other competing ligands).  <br><br>Thus, pirenzepine has a 6.3-fold lower affinity for M<sub>1</sub> receptors than atropine, and the competition binding curve for pirenzepine is positioned to the right of the atropine curve.   ",
"This indicates that pirenzepine has a much lower affinity for M<sub>2</sub> receptors than M<sub>1</sub> receptors.  <br><br>Whereas 6.3 x 10<sup>-9</sup>M (10<sup>-8.2</sup>M) pirenzepine is required to occupy 50% of M<sub>1</sub> receptors, 3.2 x 10<sup>-7</sup>M (i.e. 10<sup>-6.5</sup>M) pirenzepine is required to occupy 50% of M<sub>2</sub> receptors (approximately 50 times different).  Thus, pirenzepine binds with high affinity (at lower concentrations) to M<sub>1</sub> receptors but with much lower affinity (requiring higher concentrations) to M<sub>2</sub> receptors – and would be a good choice of ligand to use in a competition binding experiment to distinguish between M<sub>1</sub> and M<sub>2</sub> receptors.  <br><br>Thus the position of the pirenzepine competition binding curve can be used to determine whether a cell/tissue might contain M<sub>1</sub> or M<sub>2</sub> receptors.  This can be visualised using the Development Tool by observing how much the position of the pirenzepine curve shifts differ depending on whether 100%M<sub>1</sub> or 100%M<sub>2</sub> is selected.",
"This indicates that pirenzepine binds with similar affinity to M<sub>4</sub> and M<sub>5</sub> receptors (relatively lower affinity compared to M<sub>1</sub> receptors, but higher affinity compared to M<sub>2</sub> receptors).  <br><br>Thus, while pirenzepine would be a good choice if you wish to discriminate between M<sub>1</sub> and M<sub>2</sub> receptor subtypes in a cell/tissue, it would not be a good option to discriminate between M<sub>4</sub> and M<sub>5</sub> receptors. You can use the Development Tool to visualise how the position of the pirenzepine curve shifts depending on whether the cell/tissue contains 100%M<sub>1</sub>/M<sub>2</sub>/M<sub>3</sub>/M<sub>4</sub>/M<sub>5</sub>.",
"The -logK<sub>i</sub>  of methoctramine for M<sub>1</sub> receptors is 6.7, which is much lower than the –logK<sub>i</sub>  for atropine (9.0) or pirenzepine (8.2).  <br><br>This indicates that methoctramine has a lower affinity for M<sub>1</sub> receptors compared to atropine (200 times lower) or pirenzepine (32 times lower), and this is reflected by the rightward position of the methoctramine competition binding curve compared to the other ligands (higher concentrations of methoctramine are required to bind to M<sub>1</sub> receptors compared to atropine and pirenzepine).  ",
"Methoctramine has lowest affinity for M<sub>3</sub> receptors (-logK<sub>i</sub>  value of 6.0) and highest affinity for M<sub>2</sub> receptors (-logK<sub>i</sub>  value of 7.7).  <br><br>To clearly discriminate (show selectivity) between M receptor subtypes a difference of &ge; 1 log unit between –logK<sub>i</sub>  values is required – so methoctramine would be useful for discriminating between M<sub>1</sub> and M<sub>2</sub> (6.7 vs 7.7), M<sub>2</sub> and M<sub>3</sub> (7.7 vs 6.0), M<sub>3</sub> and M<sub>4</sub> (6.0 vs 7.0), and M<sub>2</sub> and M<sub>5</sub> (7.7 vs 6.3), but less useful for discriminating between M<sub>3</sub> and M<sub>5</sub> subtypes (6.0 vs 6.3), for example.",
"Darifenacin has lowest affinity for M<sub>2</sub> receptors (-logK<sub>i</sub>  value of 7.0) and highest affinity for M<sub>3</sub> receptors (-logK<sub>i</sub>  value of 8.8).  <br><br>To clearly discriminate (show selectivity) between M receptor subtypes a difference of &ge; 1 log unit between –logK<sub>i</sub>  values is required – so darifenacin would be useful for discriminating between M<sub>1</sub> and M<sub>3</sub> (7.8 vs 8.8), M<sub>2</sub> and M<sub>3</sub> (7.0 vs 8.8), and M<sub>3</sub> and M<sub>4</sub> (8.8 vs 7.7), but less useful for discriminating between M<sub>1</sub> and M<sub>4</sub> subtypes (7.8 vs 7.7), for example.",
"MT-3 has lowest affinity for M<sub>2</sub> receptors (-logK<sub>i</sub>  value of 5.9) and highest affinity for M<sub>4</sub> receptors (-logK<sub>i</sub>  value of 8.1).  <br><br>To clearly discriminate (show selectivity) between M receptor subtypes a difference of &ge; 1 log unit between –logK<sub>i</sub>  values is required – so MT-3 would be useful for discriminating between M<sub>4</sub> receptors (8.1) and any other subtype M<sub>1</sub> (6.7), M<sub>2</sub> (5.9), M<sub>3</sub> (6.0) and M<sub>5</sub> (6.0), but less useful for discriminating between any non-M<sub>4</sub> subtypes (e.g. M<sub>2</sub> (5.9) and M<sub>3</sub> (6.0) subtypes, for example).  <br><br>Thus, MT-3 is M<sub>4</sub> selective (prefers to bind to M<sub>4</sub> receptors) – at low concentrations MT-3 will bind to M<sub>4</sub> receptors but not markedly to other receptor subtype.  However, MT-3 is not specific for M<sub>4</sub> receptors (doesn’t only bind to M<sub>4</sub> receptors).  For example, when used at 10<sup>-7</sup>M MT-3 binds to 93% of M<sub>4</sub> receptors (This value was obtained using the Development Tool – i.e. simply change the Receptor to 100% M<sub>4</sub>, and hover over the MT-3 competition binding curve at the 10<sup>-7</sup>M concentration – the %Specific Binding value is ~ 7%, indicating that MT-3 is occupying 93% (100-7) of M<sub>4</sub> receptors at the 10<sup>-7</sup>M concentration.  <br><br>By using this same approach you can determine that at 10<sup>-7</sup>M concentration MT-3 will bind 33% of M<sub>1</sub>, 7% of M<sub>2</sub>, 9% of M<sub>3</sub> and 9% of M<sub>5</sub> receptors. Thus, although at a concentration of 10<sup>-7</sup>M MT-3 binds mainly to M<sub>4</sub> receptors it will still bind to significant numbers of M<sub>1</sub> receptors (33%) and even some M<sub>2</sub>, M<sub>3</sub> and M<sub>5</sub> receptors (7-9%). <br><br><b>To what extent does MT-3 bind to M<sub>1</sub>-M<sub>5</sub> receptors at 10<sup>-6</sup>M and 10<sup>-5</sup>M?</b> By using the same approach, MT-3 at 10<sup>-6</sup>M / 10<sup>-5</sup>M concentrations will respectively bind to 83/98% M<sub>1</sub>, 44/89% M<sub>2</sub>, 50/91% M<sub>3</sub>, 99.2/99.9% M<sub>4</sub> and 50/91% M<sub>5</sub> receptors.  Thus, as the concentration of MT-3 increases its selectivity for M<sub>4</sub> receptors is reduced – for example at 10<sup>-5</sup>M concentration MT-3 will bind to 99.9% of M<sub>4</sub> receptors that are present, but will also bind to nearly all M<sub>1</sub>, M<sub>2</sub>, M<sub>3</sub> and M<sub>5</sub> receptors (89-98%) that may also be present.  ",
"S-secoverine has lowest affinity for M<sub>5</sub> receptors (-logK<sub>i</sub>  value of 6.5) and highest affinity for M<sub>1</sub> receptors (-logK<sub>i</sub>  value of 8.0).  <br><br>To clearly discriminate (show selectivity) between M receptor subtypes a difference of &ge; 1 log unit between –logK<sub>i</sub>  values is required – so S-secoverine would be useful for discriminating between M<sub>5</sub> receptors (6.5) and any other subtype M<sub>1</sub> (8.0), M<sub>2</sub> (7.9), M<sub>3</sub> (7.7) and M<sub>4</sub> (7.7), but less useful for discriminating between any non-M<sub>5</sub> subtypes (e.g. M<sub>3</sub> (7.7) and M<sub>4</sub> (7.7) subtypes, for example).  <br><br>Thus, S-secoverine can be used to identify M<sub>5</sub> receptors (because of its unusually low affinity for M<sub>5</sub> receptors compared to other subtypes), and for the purposes of competition binding studies is deemed M<sub>5</sub>-selective because it has an affinity that is markedly different (in this case lower) for M<sub>5</sub> receptors compared to any other subtype.  <br><br>Interestingly, if S-Secoverine was used clinically it would not be deemed M<sub>5</sub>-selective because in order for it to block M<sub>5</sub> receptors high doses would have to be used (to overcome low affinity) that would also completely block all other M receptor subtypes!  (e.g. the concentration of S-secoverine that binds to 50% M<sub>5</sub> receptors (10<sup>-6.5</sup>M, i.e. 3 x 10<sup>-7</sup>M), would occupy between 94-97% of other M receptor subtypes – these values can be confirmed using the Development Tool). ",
"As indicated earlier, atropine would not be useful because it has similar affinities for all M receptor subtypes.  A competition binding study that includes all remaining 5 ligands could readily distinguish whether the cell/tissue contains either M<sub>1</sub>, M<sub>2</sub>, M<sub>3</sub>, M<sub>4</sub> or M<sub>5</sub> receptors – pirenzepine is selective for M<sub>1</sub> receptors (over M<sub>2</sub> and M<sub>3</sub>), methoctramine is selective for M<sub>2</sub> receptors (over M<sub>1</sub>, M<sub>3</sub> and M<sub>5</sub>), darifenacin is selective for M<sub>3</sub> receptors (over M<sub>1</sub>, M<sub>2</sub> and M<sub>4</sub>), MT-3 is selective for M<sub>4</sub> receptors (over all others) and S-secoverine is selective for M<sub>5</sub> receptors (over all others).  ",
"By comparing the –logK<sub>i</sub>  values at the different M receptor subtypes for each established ligand, it can be seen that MT-3 shows the highest level of selectivity – there is a 2.2 log unit difference between the –logK<sub>i</sub>  values of MT-3 for M<sub>2</sub> (-logK<sub>i</sub>  = 5.9) and M<sub>4</sub> (-logK<sub>i</sub>  = 8.1) receptors, i.e. a 160-fold difference in affinity.  All other established ligands have considerably less selectivity for M receptor subtypes. <br><br><b>What is the consequence for competition binding studies of having ligands that have relatively low levels of receptor selectivity?</b >It essentially means, as indicated above, that many different competing ligands may need to be used to clearly determine which M receptor subtype(s) are present.  Moreover, in instances (relatively common) where a cell/tissue contains more than one receptor subtype (e.g. a mixture of M<sub>2</sub> and M<sub>3</sub> in airway smooth muscle) it is more difficult to clearly determine the relative densities of each receptor subtype (e.g. to determine that airway smooth muscle contains 60% M<sub>2</sub> and 40% M<sub>3</sub>).  This is because ligands with low levels of receptor selectivity do not generate a clear plateau region within the competition binding curve.  <br><br>For example, consider the situation where a cell/tissue contains a mixture of M receptors, say 50%M<sub>2</sub> and 50%M<sub>4</sub> (use the Development Tool to generate this scenario).  Here, the binding curve for MT-3 (remember the most selective of the established ligands!) does appear somewhat <i>biphasic</i> with a point of inflection at around the 50% Specific binding level, but no clear plateau region.   Note also that the competition binding curve for pirenzepine shows no semblance of a point of inflection even though pirenzepine has a 0.9 unit (nearly 10-fold) difference in affinity between M<sub>2</sub> receptors (-logK<sub>i</sub>  = 6.5) and M<sub>4</sub> receptors (-logK<sub>i</sub>  = 7.4). Rather, the pirenzepine competition binding curve is considered <i>shallow sigmoidal</i> (–logIC<sub>50</sub> value ± 1 log unit accounts for 74.6% Specific Binding (87.3-12.7), which is < 80% Specific Binding).  <br><br>Thus <i>visual</i> interpretation of competition binding curves to identify the relative proportions of M receptors using established M receptor ligands can be problematic.  This can be overcome by fitting the competition binding data to a two-site binding model, and calculating the binding parameters of each component by computer-assisted analysis.  <br><br>To enhance your breadth of experience and expertise in the <i>visual</i> interpretation of competition binding curves, SPIKES<i>bind</i> also includes several hypothetical ligands, including Ligand A and Ligand B which have particular affinities for M<sub>1</sub>-M<sub>5</sub> receptors (see -logK<sub>i</sub>  Reference Table). ",
"Ligand A has highest affinity for the M<sub>1</sub> and M<sub>2</sub> subtypes (-logK<sub>i</sub>  = 9.0) and relatively low affinity for the M<sub>3</sub> and M<sub>4</sub> subtypes (-logK<sub>i</sub>  = 6.0).  That is, Ligand A has 1,000-fold higher affinities for M<sub>1</sub> and M<sub>2</sub> receptors compared to M<sub>3</sub> and M<sub>4</sub> receptors.  <br><br>Ligand A is very unusual because it has essentially no affinity for M<sub>5</sub> receptors – i.e. its –logK<sub>i</sub>  value for M<sub>5</sub> receptors is 2 (meaning that 10 mM Ligand A would need to be used to occupy 50% M<sub>5</sub> receptors).  Thus, Ligand A would be useful for discriminating between all receptor subtypes except for between M<sub>1</sub> and M<sub>2</sub> (equal affinities) and M<sub>3</sub> and M<sub>4</sub> (also equal affinities).",
"Ligand B has highest affinity for the M<sub>1</sub> and M<sub>5</sub> subtypes (-logK<sub>i</sub>  = 8.0) and relatively low affinity for the M<sub>2</sub> and M<sub>4</sub> subtypes (-logK<sub>i</sub>  = 5.0).  That is, Ligand A has 1,000-fold higher affinities for M<sub>1</sub> and M<sub>5</sub> receptors compared to M<sub>2</sub> and M<sub>4</sub> receptors.  <br><br>Ligand B is very unusual because it has essentially no affinity for M<sub>3</sub> receptors – i.e. its –logK<sub>i</sub>  value for M<sub>3</sub> receptors is 2 (meaning that 10 mM Ligand B would need to be used to occupy 50% M<sub>3</sub> receptors).  Thus, Ligand B would be useful for discriminating between all receptor subtypes except for between M<sub>1</sub> and M<sub>5</sub> (equal affinities) and M<sub>2</sub> and M<sub>4</sub> (also equal affinities).         ",
"As the –logK<sub>i</sub>  value for Ligand C is increased, the competition binding curve for Ligand C will move to the left, simply reflecting the fact that as affinity (-logK<sub>i</sub>  value) is increased then lower concentrations of the competing ligand are required to effectively compete with the radioligand. ",
"Ligand C has highest affinity for the M<sub>5</sub> subtype and the lowest affinity for the M<sub>1</sub> subtype.  <br><br>Ligand C is very unusual because it is selective for every receptor subtype – i.e. its –logK<sub>i</sub>  value for each receptor subtype is at least 1 log unit different from any other receptor subtype – if such a ligand was ever developed (unlikely) then it would be extremely useful in competition binding studies (you wouldn’t need any other competing ligands to determine which M receptor subtypes were present!!).",
"The competition binding curve for pirenzepine would be expected to shift the most because it has the greatest difference in affinity between M<sub>1</sub> (-logK<sub>i</sub>  of 8.2) and M<sub>2</sub> (6.5) receptors (i.e 50-fold higher affinity for M<sub>1</sub> than M<sub>2</sub> receptors).  <br><br>The competition binding curves for methoctramine and Ligand C would also be expected to shift noticeably because they each have a 1 log unit difference in –logK<sub>i</sub>  values between M<sub>1</sub> and M<sub>2</sub> – but note that the shift will be in different directions!  The curves for methoctramine and Ligand C will shift to the left because they have higher affinity for M<sub>2</sub> than M<sub>1</sub>, whereas the curve for pirenzepine will shift to the right because it has a lower affinities for M<sub>2</sub> than M<sub>1</sub>.   <br><br><b>Which ligand’s competition binding curve would be expected to shift the least? Why?</b> The competition binding curve for S-secoverine would not be expected to change markedly because it has similar affinities for M<sub>1</sub> (8.0) and M<sub>2</sub> (7.9) receptors.",
"The competition binding curve for Ligand C would be expected to shift the most because it has the greatest difference in affinity between M<sub>1</sub> (-logK<sub>i</sub>  of 6.0) and M<sub>5</sub> (10.0) receptors (i.e. a 10,000-fold higher affinity for M<sub>1</sub> than M<sub>5</sub> receptors).  <br><br>The competition binding curves for pirenzepine and S-secoverine would also be expected to shift noticeably because they each have at least a 1 log unit difference in –logK<sub>i</sub>  values between M<sub>1</sub> and M<sub>5</sub> .The curves for pirenzepine and S-secoverine will shift to the right because they have lower affinity for M<sub>5</sub> than M<sub>1</sub>, whereas the curve for Ligand C will shift to the left because it has a 10,000 higher affinity for M<sub>5</sub> than M<sub>1</sub>. <br><br><b>Which ligand’s competition binding curve would be expected to shift the least?  Why?</b>  The competition binding curve for darifenacin would not be expected to change markedly because it has similar affinities for M<sub>1</sub> (-logK<sub>i</sub>  of 7.8) and M<sub>5</sub> (-logK<sub>i</sub>  of 8.0) receptors.",
"<b>Hint:</b> Need to analyse the shapes of the curves for pirenzepine, methoctramine, darifenacin, MT-3, S-secoverine and Ligand C.  For competition binding curves to be considered <i>steep sigmoidal</i> then the extent of %Specific Binding covered by logIC<sub>50</sub> ± 1.0 should be greater than 80% - if it is less than 80% then the curve is considered <i>shallow sigmoidal</i>. Firstly determine the logIC<sub>50</sub> value for each competing ligand – using the Zoom in function will help determine the logIC<sub>50</sub> values.) <br><br>" + answerTable1 + "According to our analysis, methoctramine, darifenacin and S-secoverine have <i>steep sigmoidal</i> curves (because they have similar affinities for M<sub>1</sub> and M<sub>4</sub> receptors – methoctramine (6.7 & 7.0), darifenacin (7.8 & 7.7) and S-secoverine (8.0 & 7.7)).  <br><br>In contrast, pirenzepine, MT-3 and Ligand C have <i>shallow sigmoidal</i> curves (because each has quite different affinities for M<sub>1</sub> and M<sub>4</sub> receptors – pirenzepine (8.2 & 7.4), MT-3 (6.7 & 8.1) and Ligand C (6.0 & 9.0)).  A <i>shallow sigmoidal</i> curve indicates that there exist more than one M receptor subtype on the cell (as is the case here), whereas a <i>steep sigmoidal</i> curve provides no definitive information as to whether there exist one or more receptors.  <br><br>For Ligand C, there exists a point of inflection at the 50% binding level, reflecting the marked (1,000-fold) differences in affinity of Ligand C for M<sub>1</sub> and M<sub>4</sub> receptors.  The competition binding curve for Ligand C would be considered ‘<i>biphasic</i>’. <br><br><b>Predict the shape and position of competition binding curves for Ligand A and Ligand B if a cell/tissue contained a mixture of 50% M<sub>1</sub> and 50% M<sub>4</sub> receptors</b>  (<b>HINT</b>: use the –logK<sub>i</sub>  Reference Table to obtain the –logK<sub>i</sub>  values for Ligand A and Ligand B).  Confirm your predictions by including Ligand A and Ligand B as competing ligands in the study.",
"The most obvious change in the shape of the curves occurs with Ligand C where, although the curve remains <i>biphasic</i>, the POI changes from the 50% Specific Binding position to the 80% Specific Binding position, simply reflecting the marked differences in affinity that Ligand C has for M<sub>1</sub> and M<sub>4</sub> receptors. <br><br><b>The shape of which ligand’s competition binding curves are <i>steep sigmoidal</i> and which are <i>shallow sigmoidal</i>? How was this determined?</b>  (Hint: Need to analyse the shapes of the curves for pirenzepine, methoctramine, darifenacin, MT-3, S-secoverine and Ligand C.  For competition binding curves to be considered <i>steep sigmoidal</i> the extent of Specific Binding covered by logIC<sub>50</sub> ± 1.0 should be greater than 80% - if it is less than 80% then the curve is considered <i>shallow sigmoidal</i>. Firstly determine the logIC<sub>50</sub> value for each competing ligand – using the Zoom in function will help determine the logIC<sub>50</sub> values.) <br><br>" + answerTable2 + "According to our analysis, methoctramine, darifenacin and S-secoverine have <i>steep sigmoidal</i> curves (because they have similar affinities for M<sub>1</sub> and M<sub>4</sub> receptors – methoctramine (6.7 & 7.0), darifenacin (7.8 & 7.7) and S-secoverine (8.0 & 7.7)).  <br><br>In contrast, pirenzepine, MT-3 and Ligand C have <i>shallow sigmoidal</i> curves (because each has different affinities for M<sub>1</sub> and M<sub>4</sub> receptors – pirenzepine (8.2 & 7.4), MT-3 (6.7 & 8.1) and Ligand C (6.0 & 9.0)).  A <i>shallow sigmoidal</i> curve indicates that there exist more than one M receptor subtype on the cell (as is the case here), whereas a <i>steep sigmoidal</i> curve provides no definitive information as to whether there exist one or more receptors.  <br><br>For Ligand C, there exists a point of inflection at the 80% binding level, reflecting the marked (1,000-fold) differences in affinity of Ligand C for M<sub>1</sub> and M<sub>4</sub> receptors.  The competition binding curve for Ligand C would be considered ‘<i>biphasic</i>’.   <br><br>Thus, although there have been some minor changes to the position of the curves for these ligands (logIC<sub>50</sub> values) caused by the relative densities of the M<sub>1</sub> and M<sub>4</sub> receptors, there has been no changes in the shape of the curves (same ligands still <i>steep sigmoidal</i> OR <i>shallow sigmoidal</i>).",
"Visual interpretation indicates that the curve for Ligand C is clearly <i>biphasic</i> with a POI at 40% – simply reflecting the fact that Ligand C has markedly different affinities for M<sub>1</sub> and M<sub>5</sub> receptors (Ligand C has a 10,000-fold lower affinity for M<sub>1</sub> receptors compared to M<sub>5</sub> receptors).  For competition binding curves to be considered <i>steep sigmoidal</i> the the extent of Specific Binding covered by logIC<sub>50</sub> ± 1.0 should be greater than 80% - if it is less than 80% then the curve is considered <i>shallow sigmoidal</i>.<br><br>" + answerTable3 + "According to our analysis, methoctramine and darifenacin have <i>steep sigmoidal</i> curves (because they have similar affinities for M<sub>1</sub> and M<sub>5</sub> receptors – methoctramine (6.7 & 6.3) and darifenacin (7.8 & 8.0)).  <br><br>In contrast, pirenzepine, MT-3, S-secoverine and Ligand C have <i>shallow sigmoidal</i> curves (because each has different affinities for M<sub>1</sub> and M<sub>5</sub> receptors – pirenzepine (8.2 & 7.2), MT-3 (6.7 & 6.0), S-secoverine (8.0 & 6.5) and Ligand C (6.0 & 10.0)).  A <i>shallow sigmoidal</i> curve indicates that there exist more than one M receptor subtype on the cell (as is the case here), whereas a <i>steep sigmoidal</i> curve provides no definitive information as to whether there exist one or more receptors.  <br><br>For Ligand C, there exists a point of inflection at the 50% binding level, reflecting the marked (10,000-fold) differences in affinity of Ligand C for M<sub>1</sub> and M<sub>5</sub> receptors.  The competition binding curve for Ligand C would be considered ‘<i>biphasic</i>’.   <br><br><b>Predict the shape and position of competition binding curves for Ligand A and Ligand B if a cell/tissue contained a mixture of 50% M<sub>1</sub> and 50% M<sub>4</sub> receptors</b> (<b>HINT:</b> use the –logK<sub>i</sub>  Reference Table to obtain the –logK<sub>i</sub>  values for Ligand A and Ligand B).  Confirm your predictions by including Ligand A and Ligand B as competing ligands in the study."
];

var questionCounterDev = 0;
document.getElementById("devQuestion").innerHTML = "<b>" + questionsDev[questionCounterDev] + "</b>";

function revealAnswerDev() {
    document.getElementById("devAnswer").innerHTML = answersDev[questionCounterDev];
    $('#devAnswerModal').modal('show');
}

function nextQuestionDev() {
    if (questionCounterDev + 1 == questionsDev.length) { //end of questions
        document.getElementById("devQuestion").style.display = "none";
        document.getElementById("revealDevAnswer").style.display = "none";
        document.getElementById("restartMessageDev").style.display = "inline-block";
        document.getElementById("restartQuestionDev").style.display = "inline-block";
        document.getElementById("nextDevQuestion").style.display = "none";
        document.getElementById("devQuestion").innerHTML = "<b>" + questionsDev[questionCounterDev] + "</b>";
        //questionCounterDev = 0;
    }
    else {
        questionCounterDev++;
        document.getElementById("restartMessageDev").style.display = "none";
        document.getElementById("restartQuestionDev").style.display = "none";
        document.getElementById("devQuestion").innerHTML = "<b>" + questionsDev[questionCounterDev] + "</b>";
    }
}

function prevQuestionDev() {
    if (!questionCounterDev) { //beginning of questions
        alert("Already at beginning of questions");
    }
    else if(questionCounterDev + 1 == questionsDev.length){
        document.getElementById("devQuestion").style.display = "inline-block";
        document.getElementById("nextDevQuestion").style.display = "inline-block";
        document.getElementById("restartMessageDev").style.display = "none";
        document.getElementById("restartQuestionDev").style.display = "none";
        document.getElementById("devQuestion").innerHTML = "<b>" + questionsDev[questionCounterDev] + "</b>";
        document.getElementById("revealDevAnswer").style.display = "inline-block";
    }
    else {
        questionCounterDev--;
        document.getElementById("restartMessageDev").style.display = "none";
        document.getElementById("restartQuestionDev").style.display = "none";
        document.getElementById("devQuestion").innerHTML = "<b>" + questionsDev[questionCounterDev] + "</b>";
    }
}

function restartQuestionDev() {
    questionCounterDev = 0;
    document.getElementById("devQuestion").style.display = "inline-block";
    document.getElementById("nextDevQuestion").style.display = "inline-block";
    document.getElementById("restartMessageDev").style.display = "none";
    document.getElementById("restartQuestionDev").style.display = "none";
    document.getElementById("devQuestion").innerHTML = "<b>" + questionsDev[questionCounterDev] + "</b>";
    document.getElementById("revealDevAnswer").style.display = "inline-block";
}


function showBody() {
    $('section').fadeIn();
    $('.loading').fadeOut();
}

setTimeout(showBody, 5000);
