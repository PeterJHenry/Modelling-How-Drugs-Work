// Constants
var timer;
var timeLimit = 5;
var timeVar;
var numberOfQuestions = 5;

var currentNumber = 0;

var subtypeIndex;
var subtypePercentage;
var ligandIndexes;
var subtypeAnswers = [];
var inputAnswers = [];
var textAnswers = [];
var score = [];

$(document).ready(function () {
    setQuizProperties();
    addReceptorListener();
    $('.quizAnswers').hide();
});

function setQuizProperties() {
    $('#cover-questionLength').html(numberOfQuestions);
    $('#cover-time').html(timeLimit/60);
}

function startQuiz() {
    timer = timeLimit;
  	currentNumber = 0;
    $('.questionCover').hide();
    $('.questionContainer').show();
    $('.quizAnswers').hide();
    $('#submitButton').html("Next Question");
    initializeClock();
    quizStatus();
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
          storeAnswers();
          endQuiz();
        }
        timer--;
    }

    timeVar = setInterval(updateClock, 1000);
}

// Chooose a random subtype and then the draw the graph for it.
function randomiseSubType() {
    subtypeIndex = [null, null];
    subtypePercentage = [null, null];

    subtypeIndex[0] = Math.floor((Math.random() * 4));
    subtypePercentage[0] = 20 + 10 * Math.floor((Math.random() * 8)); // Generates a random percentage between 20 and 90, always a multiple of 10.

    if (subtypePercentage[0] === 90) {
        // Treat 90 as one subtype.
        subtypePercentage[0] = 100;
    } else {
        subtypeIndex[1] = Math.floor((Math.random() * 4));
        if (subtypeIndex[1] === subtypeIndex[0]) {
            subtypeIndex[0] = subtypeIndex[0]+1 % 5;
        }
        subtypePercentage[1] = 100 - subtypePercentage[0];
    }
    if(subtypePercentage[1] == null){
      subtypeIndex[1] = null;
    }
    subtypeAnswers = subtypeAnswers.concat([subtypeIndex,subtypePercentage]);
}

function randomiseLigand() {
  ligandIndexes = [];
  var i = 0;
  var index;
  while(ligandIndexes.length < 4){
    index = Math.floor((Math.random() * 8));
    if(index != 0 && ligandIndexes.indexOf(index)==-1){
      ligandIndexes[i] = index;
      i++
    }
  }
  if(Math.floor(Math.random() * 2) === 1) ligandIndexes[4] = 8;
  else ligandIndexes[4] = 9;

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

function color(i){
  if(i===4) return i+1;
  else return i;
}

// Redraws the graph with current ligand values, does not affect subtype.
function redrawGraph() {
	// Generate data to pass to the graph.
    var data = [];
    for (i = 0; i < 5; i++) {
        ligandIndex = ligandIndexes[i]
        var dataSet = get_dataset(ligandIndex);
        var graph = {
            x: dataSet[0],
            y: dataSet[1],
            mode: 'lines',
            line: {
                color: colorTable[color(i)],
                width: 1
            },
            name: ligandNames[ligandIndex]
        };redrawGraph
        data.push(graph);
    }
	plotGraph(data, true, {staticPlot: true});
}

function clearInput(){
  $('#textbox').val('')
  checkbox_containers = document.getElementById('subtypeCheckbox').children;
  for (var i=1; i<checkbox_containers.length; i++) {
    checkbox = checkbox_containers[i].children[0];
    if (checkbox.checked){
      checkbox_containers[i].children[0].checked = false;
      validateCheckBox(i-1);
    }
  }
}

function checkAnswers(){
  if($('input[type=checkbox]:checked').length <= 0){
    alert('Please select an answer');
  }
  else {
    storeAnswers();
    quizStatus();
  }
}

function storeAnswers() {
  var subtypes = [];
  var percentage = [];

  textAnswers.push($('#textbox').val());


  $('input[type=checkbox]:checked').each(function(){
    subtypes.push(parseInt($(this).val()));
  });

  $('#relativeDensity1').find('option:selected').each(function(){
    if($(this).val() != ''){
      percentage.push(parseInt($(this).val()));
    }
  });

  $('#relativeDensity2').find('option:selected').each(function(){
    if($(this).val() != ''){
      percentage.push(parseInt($(this).val()));
    }
  });

  $('#relativeDensity3').find('option:selected').each(function(){
    if($(this).val() != ''){
      percentage.push(parseInt($(this).val()));
    }
  });

  $('#relativeDensity4').find('option:selected').each(function(){
    if($(this).val() != ''){
      percentage.push(parseInt($(this).val()));
    }
  });

  $('#relativeDensity5').find('option:selected').each(function(){
    if($(this).val() != ''){
      percentage.push(parseInt($(this).val()));
    }
  });

  if(subtypes.length === 1){
    subtypes[1] = null;
    percentage[1] = null;
  }

  inputAnswers = inputAnswers.concat([subtypes,percentage]);
  //clearInput();
}

// This functions generates a random number of questions and ratio and returns as an array
function generateQuestion() {
    randomiseSubType();
    randomiseLigand();
    redrawGraph();
}

function quizStatus() {
  currentNumber++;
  if(currentNumber === numberOfQuestions){
    $('#submitButton').html("Submit");
    $('#quiz_title').html('Question '+currentNumber+' of '+numberOfQuestions);
    generateQuestion();
  }
  else if(currentNumber > numberOfQuestions){
    endQuiz();
  }
  else {
    $('#submitButton').html("Next Question");
    $('#quiz_title').html('Question '+currentNumber+' of '+numberOfQuestions);
    generateQuestion();
  }
}

function endQuiz(){
  clearInterval(timeVar);
  $('#quiz_title').html('Review');
  $('.questionContainer').hide();
  $('.quizAnswers').show();
  renderResults();
}

function renderResults() {
  for(var i = 0; i < inputAnswers.length; i+=2){
    if(((inputAnswers[i][0] === subtypeAnswers[i][0]) && (inputAnswers[i][1] === subtypeAnswers[i][1]) && (inputAnswers[i+1][0] === subtypeAnswers[i+1][0])) ||
    ((inputAnswers[i][0] === subtypeAnswers[i][1]) && (inputAnswers[i][1] === subtypeAnswers[i][0]) && (inputAnswers[i+1][0] === subtypeAnswers[i+1][1]))){
      score[i/2] = 1;
    }
    else {
      score[i/2] = 0;
    }
  }

  $('#score').html("Score: "+score.reduce(function (a, b) {
    return a + b;
  }, 0)+"/5");

  drawResults();
}

function drawResults(){

  var a = ['#a1','#a2','#a3','#a4','#a5'];
  var q = ['#q1','#q2','#q3','#q4','#q5'];
  var green = ['#row1:hover {background-color:#dcffd3;}','#row2:hover {background-color:#dcffd3;}','#row3:hover {background-color:#dcffd3;}','#row4:hover {background-color:#dcffd3;}','#row5:hover {background-color:#dcffd3;}'];
  var red = ['#row1:hover {background-color:#ffdddd;}','#row2:hover {background-color:#ffdddd;}','#row3:hover {background-color:#ffdddd;}','#row4:hover {background-color:#ffdddd;}','#row5:hover {background-color:#ffdddd;}']
  var mark = ['#mark1','#mark2','#mark3','#mark4','#mark5']

  for(var i = 0; i < inputAnswers.length; i+=2){
    // YOUR ANSWER
    if(inputAnswers[i][1]===null) $(q[i/2]).html("M"+parseInt(inputAnswers[i][0]+1)+" "+inputAnswers[i+1][0]+"%");
    else $(q[i/2]).html("M"+parseInt(inputAnswers[i][0]+1)+" "+inputAnswers[i+1][0]+"%<br>M"+parseInt(inputAnswers[i][1]+1)+" "+inputAnswers[i+1][1]+"%");

    // CORRECT ANSWER
    if(subtypeAnswers[i][1]===null) $(a[i/2]).html("M"+parseInt(subtypeAnswers[i][0]+1)+" "+subtypeAnswers[i+1][0]+"%");
    else $(a[i/2]).html("M"+parseInt(subtypeAnswers[i][0]+1)+" "+subtypeAnswers[i+1][0]+"%<br>M"+parseInt(subtypeAnswers[i][1]+1)+" "+subtypeAnswers[i+1][1]+"%");

    var style = document.createElement('style');
    // TICK OR CROSS
    if(score[i/2]) {
      $(mark[i/2]).html('<i class="fa fa-check" aria-hidden="true"></i>');
      style.appendChild(document.createTextNode(green[i/2]));
    }
    else {
      $(mark[i/2]).html('<i class="fa fa-times" aria-hidden="true"></i>');
      style.appendChild(document.createTextNode(red[i/2]));
    }
    document.getElementsByTagName('head')[0].appendChild(style);
  }
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
    if (currentCell.value > 80) currentCell.value = 80;
    validateRelDensityRow(cellNumber);
}

// TODO - This only works on two receptors
function validateRelDensityRow(currentCellNumber) {
    var previousCheckedBox0 = activeCheckBoxes()[0];
    var previousCheckedBox1 = activeCheckBoxes()[1];
    var currentCellValue = parseInt(receptorRelDenTableCell(currentCellNumber).value);

    if (currentCellNumber === previousCheckedBox0) {
      receptorRelDenTableCell(previousCheckedBox1).value = 100 - currentCellValue;
    }
    else {
      receptorRelDenTableCell(previousCheckedBox0).value = 100 - currentCellValue;
    }
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
