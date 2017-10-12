// Constants
var timeLimit = 1500;
var timer = timeLimit;
var timeVar;
var numberOfQuestions = 5;

var currentNumber = 0;

var subtypeIndex;
var subtypePercentage;
var ligandIndexes;
var subtypeAnswers = [];
var inputAnswers = [];

var subTypeCheckedCount;

$(document).ready(function () {
    setQuizProperties();
    addReceptorListener();
    $('.quizAnswers').hide();
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
            subtypeIndex[0] = subtypeIndex[0]+1 % 5;
        }
        subtypePercentage[1] = 100 - subtypePercentage[0];
    }
    if(subtypePercentage[1] == null){
      subtypeIndex[0]++;
      subtypeIndex[1] = null;
    }
    else {
      subtypeIndex[0]++;
      subtypeIndex[1]++;
    }
    subtypeAnswers = subtypeAnswers.concat([subtypeIndex,subtypePercentage]);
}

function randomiseLigand() {
  ligandIndexes = [];
  var i = 0;
  var index;
  while(ligandIndexes.length < 5){
    index = Math.floor((Math.random() * 8));
    if(index != 0 && !ligandIndexes.includes(index)){
      ligandIndexes[i] = index;
      i++
    }
  }
}

function setQuizProperties() {
    $('#cover-questionLength').html(numberOfQuestions);
    $('#cover-time').html(timer/60);
}

function startQuiz() {
  	currentNumber = 0;
    $('.questionCover').hide();
    $('.questionContainer').show();
    $('.quizAnswers').hide();
    $('#submitButton').html("Next Question");
    initializeClock();
    checkEnd();
}

function initializeClock() {
    var minute = timer/60;
    var second = timer%60;

    function intToString(time) {
        time = parseInt(time);
        if (time < 10) return '0' + time.toString();
        else return time.toString();
    }

    function updateClock() {
        minute = Math.floor(timer/60);
        second = intToString(timer%60);

        $('#timer-minutes').html(minute);
        $('#timer-seconds').html(second);

        if(timer == -1){
          alert("Time's up!");
          endQuiz();
        }
        timer--;
    }

    timeVar = setInterval(updateClock, 1000);
}

function get_dataset(ligandIndex) {
    var dataSet
    if (subtypeIndex[1] === null) {
        dataSet = calculateGraphPoints(1, 100, logK[ligandIndex][subtypeIndex[0]]);
    } else {
        dataSet = calculateGraphPoints(2,
            subtypePercentage[0], logK[ligandIndex][subtypeIndex[0]],
            subtypePercentage[1], logK[ligandIndex][subtypeIndex[1]]
        );
    }
    return dataSet;
}

// Redraws the graph with current ligand values, does not affect subtype.
function redrawGraph() {
	// Generate data to pass to the graph.
    var data = [];
    for (var i = 0; i < 5; i++) {
        ligandIndex = ligandIndexes[i]
        var dataSet = get_dataset(ligandIndex);
        var graph = {
            x: dataSet[0],
            y: dataSet[1],
            mode: 'lines',
            line: {
                color: colorTable[ligandIndex-1],
                width: 1
            },
            name: ligandNames[ligandIndex]
        };redrawGraph
        data.push(graph);
    }
	plotGraph(data, true, {staticPlot: true});
}

// This functions generates a random number of questions and ratio and returns as an array
function generateQuestion() {
    randomiseSubType();
    randomiseLigand();
    redrawGraph();
}

function checkAnswers(){
  if($('input[type=checkbox]:checked').length <= 0){
    alert('Please select an answer');
  }
  else {
    storeAnswers();
    checkEnd();
  }
}

function clearValues(){
  $('input[type="checkbox"]:checked').prop('checked',false);
  $('input[type="number"]').val('');
}

function storeAnswers() {
  var subtypes = [];
  var percentage = [];

  $('input[type=checkbox]:checked').each(function(){
    subtypes.push(parseInt($(this).val()));
  });

  $('input[type=number]').each(function(){
    if($(this).val()!=""){
      percentage.push(parseInt($(this).val()));
    }
  });

  if(subtypes.length === 1){
    subtypes[1] = null;
    percentage[1] = null;
  }

  inputAnswers = inputAnswers.concat([subtypes,percentage]);
  //clearValues();
}

function renderResults() {
  var score = 0;

  for(var i = 0; i < 10; i+=2){
    console.log(inputAnswers[i][0],subtypeAnswers[i][0]);
    console.log(inputAnswers[i][1],subtypeAnswers[i][1]);
    if((inputAnswers[i][0] === subtypeAnswers[i][0]) && (inputAnswers[i][1] === subtypeAnswers[i][1]) || (inputAnswers[i][0] === subtypeAnswers[i][1]) && (inputAnswers[i][1] === subtypeAnswers[i][0])){
      score++;
    }
  }

  if(score===0){
    $('#score').html(score+"/5... Better get studying...");
  }
  else if (score===1){
    $('#score').html(+score+"/5.. At least you got one!");
  }
  else if(score===2){
    $('#score').html(+score+"/5.. So close!");
  }
  else if(score===3){
    $('#score').html(+score+"/5.. You passed! Just..");
  }
  else if(score===4){
    $('#score').html(+score+"/5! Congratulations");
  }
  else if(score===5){
    $('#score').html(+score+"/5! Whoa! We got a genius here!");
  }

  //STUDENT ANSWERS
  if(inputAnswers[0][1]===null) $('#q1').html("M"+inputAnswers[0][0]+" "+inputAnswers[1][0]+"%");
  else $('#q1').html("M"+inputAnswers[0][0]+" "+inputAnswers[1][0]+"%<br>M"+inputAnswers[0][1]+" "+inputAnswers[1][1]+"%");

  if(inputAnswers[2][1]===null) $('#q2').html("M"+inputAnswers[2][0]+" "+inputAnswers[3][0]+"%");
  else $('#q2').html("M"+inputAnswers[2][0]+" "+inputAnswers[3][0]+"%<br>M"+inputAnswers[2][1]+" "+inputAnswers[3][1]+"%");

  if(inputAnswers[4][1]===null) $('#q3').html("M"+inputAnswers[4][0]+" "+inputAnswers[5][0]+"%");
  else $('#q3').html("M"+inputAnswers[4][0]+" "+inputAnswers[5][0]+"%<br>M"+inputAnswers[4][1]+" "+inputAnswers[5][1]+"%");

  if(inputAnswers[6][1]===null) $('#q4').html("M"+inputAnswers[6][0]+" "+inputAnswers[7][0]+"%");
  else $('#q4').html("M"+inputAnswers[6][0]+" "+inputAnswers[7][0]+"%<br>M"+inputAnswers[6][1]+" "+inputAnswers[7][1]+"%");

  if(inputAnswers[8][1]===null) $('#q5').html("M"+inputAnswers[8][0]+" "+inputAnswers[9][0]+"%");
  else $('#q5').html("M"+inputAnswers[8][0]+" "+inputAnswers[9][0]+"%<br>M"+inputAnswers[8][1]+" "+inputAnswers[9][1]+"%");

  //ANSWERS
  if(subtypeAnswers[0][1]===null) $('#a1').html("M"+subtypeAnswers[0][0]+" "+subtypeAnswers[1][0]+"%");
  else $('#a1').html("M"+subtypeAnswers[0][0]+" "+subtypeAnswers[1][0]+"%<br>M"+subtypeAnswers[0][1]+" "+subtypeAnswers[1][1]+"%");

  if(subtypeAnswers[2][1]===null) $('#a2').html("M"+subtypeAnswers[2][0]+" "+subtypeAnswers[3][0]+"%");
  else $('#a2').html("M"+subtypeAnswers[2][0]+" "+subtypeAnswers[3][0]+"%<br>M"+subtypeAnswers[2][1]+" "+subtypeAnswers[3][1]+"%");

  if(subtypeAnswers[4][1]===null) $('#a3').html("M"+subtypeAnswers[4][0]+" "+subtypeAnswers[5][0]+"%");
  else $('#a3').html("M"+subtypeAnswers[4][0]+" "+subtypeAnswers[5][0]+"%<br>M"+subtypeAnswers[4][1]+" "+subtypeAnswers[5][1]+"%");

  if(subtypeAnswers[6][1]===null) $('#a4').html("M"+subtypeAnswers[6][0]+" "+subtypeAnswers[7][0]+"%");
  else $('#a4').html("M"+subtypeAnswers[6][0]+" "+subtypeAnswers[7][0]+"%<br>M"+subtypeAnswers[6][1]+" "+subtypeAnswers[7][1]+"%");

  if(subtypeAnswers[8][1]===null) $('#a5').html("M"+subtypeAnswers[8][0]+" "+subtypeAnswers[9][0]+"%");
  else $('#a5').html("M"+subtypeAnswers[8][0]+" "+subtypeAnswers[9][0]+"%<br>M"+subtypeAnswers[8][1]+" "+subtypeAnswers[9][1]+"%");
}

function endQuiz(){
  timer = timeLimit;
  clearInterval(timeVar);
  $('#quiz_title').html('Review');
  $('.questionContainer').hide();
  $('.quizAnswers').show();
  renderResults();
}

function checkEnd() {
  currentNumber++;
  if(currentNumber === numberOfQuestions){
    $('#submitButton').html("Submit");
    $('#quiz_title').html('Question '+currentNumber+' of '+numberOfQuestions);
    generateQuestion();
  }
  else if(currentNumber > numberOfQuestions){
    storeAnswers();
    endQuiz();
  }
  else {
    $('#submitButton').html("Next Question");
    $('#quiz_title').html('Question '+currentNumber+' of '+numberOfQuestions);
    generateQuestion();
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

    if(currentCellValue > 80) currentCellValue = receptorRelDenTableCell(currentCellNumber).value = 80;
    if(currentCellValue < 20) currentCellValue = receptorRelDenTableCell(currentCellNumber).value = 20;
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
            }).keyup(function () {
                validateIndividualCell(count - 1);
            });
        }
    });
}

function showBody() {
    $('section').fadeIn();
    $('.loading').fadeOut();
}

setTimeout(showBody, 5000);
