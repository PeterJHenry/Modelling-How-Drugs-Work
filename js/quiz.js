// Constants
var timeLimit = 1500;
var numberOfQuestions = 5;

var questionNumbers = 0;

var questionStack = [];
var correctAnswerStack = [];
var userAnswerStack = [];

var subtypeIndex;
var subtypePercentage;

$(document).ready(function () {
    setQuizProperties();
    //startQuiz();
});

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
        if (subtypeIndex[1] === subtypeIndex[0]) {
            subtypeIndex[0] = subtypeIndex[0]+1 % 5
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
        subtypeString = "M" + (subtypeIndex[0]+1) + " (" + subtypePercentage[0]+ "%), "
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




function setQuizProperties() {
    $('#cover-questionLength').html(numberOfQuestions);
    $('#cover-time').html(timeLimit/60);
}

function startQuiz() {
    $('.questionCover').hide();
    $('.questionContainer').show();
    initializeClock();
    prepareQuestions();
}

function initializeClock() {
    var minute = timeLimit/60;
    var second = timeLimit%60;

    function intToString(time) {
        time = parseInt(time);
        if (time < 10) return '0' + time.toString();
        else return time.toString();
    }

    function updateClock() {
        minute = Math.floor(timeLimit/60);
        second = intToString(timeLimit%60);

        $('#timer-minutes').html(minute);
        $('#timer-seconds').html(second);

        if(timeLimit == -1){
          alert("Time's up!");
          timeLimit = 0;
          clearInterval(myVar);
          checkAnswer();
          renderResults();
        }
        timeLimit--;
    }

    var myVar = setInterval(updateClock, 1000);
}

// This functions generates a random number of questions and ratio and returns as an array
function generateQuestion() {

    function getRandomSubtype() {
        return Math.floor(Math.random() * 5) + 1;
    }

    function getRandomNumberOfSubtype() {
        return Math.floor(Math.random() * 2) + 1;
    }

    function getRandomSubtypeRatio() {
        return parseInt(2 + Math.floor(Math.random() * 7) + '0');
    }


    var numberOfLigands = getRandomNumberOfSubtype();
    var subtypes = [];
    var subtypeRatio = [];

    if (numberOfLigands === 1) {
        subtypes.push(getRandomSubtype());
        subtypeRatio.push(100);
    } else if (numberOfLigands === 2) {
        subtypes.push(getRandomSubtype());
        while (true) {
            var secondSubtype = getRandomSubtype();
            if (secondSubtype !== subtypes[0]) {
                subtypes.push(secondSubtype);
                break;
            }
        }
        subtypeRatio.push(getRandomSubtypeRatio());
        subtypeRatio.push(100 - subtypeRatio[0]);
    }
    return [subtypes, subtypeRatio];
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

// Prepare the entire stack of questions
function prepareQuestions() {
    for (var i = 0; i < numberOfQuestions; i++) {
        questionStack.push(generateQuestion());
    }
}

function collectUserInput(){
    var userAnswer = [];
    $("form#userInput :input").each(function(){
        var value = $(this).val();
        if(value === "") value = 0;
        userAnswer.push(parseInt(value));
    });
    userAnswerStack.push(userAnswer);
}

// Convert random ratios to questions and push them into stack
function convertDataToQuestion_userInputRatio() {

}


function countCorrectAnswers() {
    var correctCount = 0;
    for (var i = 0; i < numberOfQuestions; i++) if (userAnswerStack[0] === correctAnswerStack[0]) correctCount++;
    return correctCount;
}



//// Check if the box can be checked
function validateCheckBox(checkingBox) {
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

    if (currentCellNumber === previousCheckedBox0) receptorRelDenTableCell(previousCheckedBox1).value = 100 - currentCellValue;
    else receptorRelDenTableCell(previousCheckedBox0).value = 100 - currentCellValue;
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
