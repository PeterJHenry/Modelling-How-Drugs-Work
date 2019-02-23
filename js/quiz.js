// Constants
var timer;
var timeVar;
var timeLimit;
var num = 0;
var currentNumber = 1;
var numberOfQuestions;
var type;
var SubtypeAnswer = [];
var PercentageAnswer = [];
var Subtypes = [];
var Percentages = [];
var ligandList = [];
var score = [];
var reldensity = ['#relativeDensity1', '#relativeDensity2', '#relativeDensity3', '#relativeDensity4', '#relativeDensity5'];
var shapeList = ['select[name=shape1]','select[name=shape2]','select[name=shape3]','select[name=shape4]','select[name=shape5]'];
var positionList = ['input[name=position1]','input[name=position2]','input[name=position3]','input[name=position4]','input[name=position5]','input[name=position6]'];
var Shapes = [];
var Positions = [];
var Checkboxes = [];

$(document).ready(function () {
    addReceptorListener();
    $('.quizAnswers1').hide();
    $('.quizAnswers').hide();
    $('.questionContainer').hide();
});

function startQuiz(quizType) {
    clearInput();
    Shapes = [];
    Positions = [];
    Checkboxes = [];
    Subtypes = [];
    Percentages = [];
    SubtypeAnswer = [];
    PercentageAnswer = [];
    ligandList = [];
    score = [];
    $('.questionContainer').show();
    $('.answerTable').hide();
    type = quizType;
    if(type){
      $('#next').hide();
      $('#nextButton').hide();
      $('#submit').show();
      $('#submitButton').show();
      timeLimit=3600;
      numberOfQuestions = 1;
      timer = 1;
      $('#quiz_title').html("00:00");
    }
    randomiseSubType();
    randomiseLigand();
    currentNumber = 1;
    num = 0;
    $('.hidden').hide();
    $('.questionCover').hide();
    $('.quizAnswers1').hide();
    $('.quizAnswers').hide();
    initializeClock();
    quizStatus();
}


function minlength(minute) {
    if (minute.toString().length === 1) return '0' + minute;
    else return minute;
}

function initializeClock() {
    var minute = timer / 60;
    var second = timer % 60;

    function intToString(time) {
        time = parseInt(time);
        if (time < 10) return '0' + time.toString();
        else return time.toString();
    }

    function updateClock() {
        minute = Math.floor(timer / 60);
        second = intToString(timer % 60);

        if(type) $('#quiz_title').html(minlength(minute)+":"+second);

        if (type && (timer > timeLimit)) {
            alert("Time's up!");
            storeAnswers(num);
            endQuiz();
        }

        if(type) timer++;
    }

    timeVar = setInterval(updateClock, 1000);
}

// Chooose a random subtype and then the draw the graph for it.
function randomiseSubType() {
  if (type){
    var subtypeIndex = [null, null];
    var subtypePercentage = [null, null];

    subtypeIndex[0] = Math.floor((Math.random() * 5));
    subtypePercentage[0] = 20 + 10 * Math.floor((Math.random() * 8)); // Generates a random percentage between 20 and 90, always a multiple of 10.

    if (subtypePercentage[0] === 90) {
        // Treat 90 as one subtype.
        subtypePercentage[0] = 100;
    } else {
        subtypeIndex[1] = Math.floor((Math.random() * 5));
        while (subtypeIndex[1] === subtypeIndex[0]) {
          subtypeIndex[1] = Math.floor((Math.random() * 5));
        }
        subtypePercentage[1] = 100 - subtypePercentage[0];
    }
    if (subtypePercentage[1] == null) {
        subtypeIndex[1] = null;
    }
    SubtypeAnswer[0] = subtypeIndex;
    PercentageAnswer[0] = subtypePercentage;
  }
}

function randomiseLigand() {
  if (type){
    var ligandIndexes = [];
    var i = 0;
    var index;
    while (ligandIndexes.length < 4) {
        index = Math.floor((Math.random() * 8));
        if (index != 0 && ligandIndexes.indexOf(index) == -1) {
            ligandIndexes[i] = index;
            i++
        }
    }
    if (Math.floor(Math.random() * 2) === 1) ligandIndexes[4] = 8;
    else ligandIndexes[4] = 9;
    ligandList.push(ligandIndexes);
  }

}

function color(i) {
    if (i === 4) return i + 1;
    else return i;
}

function get_dataset(ligandIndex, index, subtype, percentage) {
    var dataSet
    if (subtype[index][1] === null) {
        dataSet = calculateGraphPoints(1, 100, logK[ligandIndex][subtype[index][0]]);
    } else {
        dataSet = calculateGraphPoints(2,
            percentage[index][0], logK[ligandIndex][subtype[index][0]],
            percentage[index][1], logK[ligandIndex][subtype[index][1]]
        );
    }
    return dataSet;
}

// Redraws the graph with current ligand values, does not affect subtype.
function redrawGraph(div, index, subtype, percentage) {
    // Generate data to pass to the graph.
    var data = [];
    for (i = 0; i < 5; i++) {
        if(ligandList[index][i]!= undefined) ligandIndex = ligandList[index][i];
        var dataSet = get_dataset(ligandIndex, index, subtype, percentage);
        var graph = {
            x: dataSet[0],
            y: dataSet[1],
            mode: 'lines',
            line: {
                color: colorTable[color(i)],
                width: 1
            },
            name: ligandNames[ligandIndex]
        };
        redrawGraph
        data.push(graph);
    }
    plotGraph(div, data, false);
}

function newRow(){
  if($('#biphasic').val() == 3){
    $('.hidden').show();
  }
  else $('.hidden').hide();
}

function fillTable(){

  var ligands =['#ligand1','#ligand2','#ligand3','#ligand4','#ligand5'];
  var log1 = ['#1log1','#1log2','#1log3','#1log4','#1log5'];
  var log2 = ['#2log1','#2log2','#2log3','#2log4','#2log5'];
  var log3 = ['#3log1','#3log2','#3log3','#3log4','#3log5'];
  var log4 = ['#4log1','#4log2','#4log3','#4log4','#4log5'];
  var log5 = ['#5log1','#5log2','#5log3','#5log4','#5log5'];
  var logs = [log1,log2,log3,log4,log5];

  for (var i = 0; i < 5; i++){
    $(ligands[i]).html(ligandNames[ligandList[num][i]]);
    for(var x = 0; x < 5; x++){
      log = logK[ligandList[num][i]][x];
      if(log.toString().length === 1) log = log+".0";
      $(logs[i][x]).html(log);
    }
  }

  if(Shapes[num] != null){
    for(var i = 0; i < 5; i++){
      $(shapeList[i]).val(Shapes[num][i]);
      if(Shapes[num][i] === "3") $('.hidden').show();
      else $('.hidden').hide();
    }
  }
  if(Positions[num] != null){
    for(var i = 0; i < 6; i++){
      $(positionList[i]).val(Positions[num][i]);
    }
  }

  var inputs = ['input[name=checkbox1]','input[name=checkbox2]','input[name=checkbox3]','input[name=checkbox4]','input[name=checkbox5]','input[name=checkbox6]'];
  if(Checkboxes[num]!=null){
    for(var x = 0; x < 6; x++){
      $(inputs[x]).each(function(){
        for(var i = 0; i < 5; i++){
          if (Checkboxes[num][x][i] != null && $(this).val() == Checkboxes[num][x][i]){
              $(this).prop('checked', true);
            }
        }
      });
    }
  }

}

function check() {
    if ($('input[class=ans]:checked').length <= 0) {
        alert('Please select an answer');
    }
    else {
        currentNumber++;
        storeAnswers();
        //num = 0;
        quizStatus();
    }
}

function storeAnswers() {
    var subtypes = [];
    var percentage = [];
    var shapes = [];
    var position = [];
    var check1 = [];
    var check2 = [];
    var check3 = [];
    var check4 = [];
    var check5 = [];
    var check6 = [];

    $('input[class=ans]:checked').each(function(){
        subtypes.push(parseInt($(this).val()));
    });

    var inputs = ['input[name=checkbox1]:checked','input[name=checkbox2]:checked','input[name=checkbox3]:checked','input[name=checkbox4]:checked','input[name=checkbox5]:checked','input[name=checkbox6]:checked'];
    var checks = [check1,check2,check3,check4,check5,check6];
  

    for(var i = 0; i < 6; i++){
      $(inputs[i]).each(function(){
          checks[i].push(parseInt($(this).val()));
      });
    }

    for(var i = 0; i < 6; i++){
      $(positionList[i]).each(function(){
          position.push($(this).val());
      });
    }

    for(var i = 0; i < 5; i++){
      $(shapeList[i]).find('option:selected').each(function(){
          shapes.push($(this).val());
      });
    }

    for (var i = 0; i < 5; i++) {
        $(reldensity[i]).find('option:selected').each(function () {
            if($(this).val()){
                percentage.push(parseInt($(this).val()));
            }
        });
    }

    if (subtypes.length === 1) {
        subtypes[1] = null;
        percentage[1] = null;
    }
    if (subtypes[0] === undefined) {
        subtypes[0] = null;
        percentage[0] = null;
    }

    Subtypes[num] = subtypes;
    Percentages[num] = percentage;
    Shapes[num] = shapes;
    Positions[num] = position;
    Checkboxes[num] = checks;
    
}


function clearInput() {
    $('.hidden').hide();
    var checkbox_containers = document.getElementById('subtypeCheckbox').children;
    for (var i = 1; i < checkbox_containers.length; i++) {
        checkbox = checkbox_containers[i].children[0];
        if (checkbox.checked) {
            checkbox_containers[i].children[0].checked = false;
            validateCheckBox(i - 1);
        }
    }
    $('input[type=checkbox]').prop('checked', false);
    $('input[class=position]').val('');
    $('select[class=shape]').val(0);
}

function quizStatus() {
    if(type){
      if (currentNumber === numberOfQuestions) {
          redrawGraph('myDiv', currentNumber-1, SubtypeAnswer, PercentageAnswer);
          fillTable();
      }
      else if (currentNumber > numberOfQuestions) {
          setTimeout(endQuiz, 400);
      }
    }
}

function endQuiz() {
    clearInterval(timeVar);
    $('#quiz_title').html('Review');
    $('.questionContainer').hide();
    renderResults();
    if(type){
      $('.quizAnswers1').show();
    }
}

function ammendAnswers(){
    $('.quizAnswers1').hide();
    $('.questionContainer').show();
    $('#next').hide();
    $('#nextButton').hide();
    $('#submit').show();
    $('#submitButton').show();
    timeLimit=3600;
    numberOfQuestions = 1;
    timer = 1;
    $('#quiz_title').html("00:00");
    $('.hidden').hide();
    $('.questionCover').hide();
    $('.quizAnswers1').hide();
    $('.quizAnswers').hide();
    initializeClock();
    currentNumber--;
    
}


function renderResults() {
  if(type){
    if (((Subtypes[0][0] === SubtypeAnswer[0][0]) && (Subtypes[0][1] === SubtypeAnswer[0][1]) && (Percentages[0][0] === PercentageAnswer[0][0])) ||
        ((Subtypes[0][0] === SubtypeAnswer[0][1]) && (Subtypes[0][1] === SubtypeAnswer[0][0]) && (Percentages[0][0] === PercentageAnswer[0][1]))) {
        score[0] = true;
    }
    else {
        score[0] = false;
    }

    review(0);

    if(score.reduce(function (a,b) {
      return a + b;
    },0) === 1) $('#answer').html("Correct!");
    else $('#answer').html("Incorrect");

    if(Math.floor(timer/60) === 0) $('#time-spent').html((timer-1)%60+" seconds");
    else if((timer-1)%60 === 0) $('#time-spent').html(Math.floor(timer/60)+" minutes");
    else $('#time-spent').html(Math.floor(timer/60)+" minutes and "+(timer-1)%60+" seconds");
  }
}

function review(questionNo) {
    var graphDelay;
    if (score[questionNo] || Subtypes[questionNo][0] === null) {
      if(type){
        $('#review').html('<p class="th1"><b>Answer Review</b></p><div id="answerTable"></dib><p id="correctAnswer" style="text-align:center"></p><div class="container"><fieldset class="sectionContainer"><legend>Competition Binding Curve</legend><div class="container"><div id="correctGraph"></div></div></fieldset></div>');

        graphDelay = setInterval(function () {
            redrawGraph(correctGraph, questionNo, SubtypeAnswer, PercentageAnswer)
        }, 200);
      }
      else {
        $('#modal').html('<div class="modal-dialog modal-lg"><div class="modal-content"><div class="modal-header"><h5>Question <span id="question"></span> Review</h5><button type="button" class="close" data-dismiss="modal">&times;</button></div><div class="modal-body"><span id="reviewTable"></span></div><div class="modal-footer"><button class="btn" data-dismiss="modal"><span class="tool-name">Close</span></button></div></div></div>');
        $('#question').html(questionNo + 1);
        $('#reviewTable').html('<div id="text"></div><p class="th1"><b>Answer Review</b></p><p id="correctAnswer" style="text-align:center"></p><div class="container"><fieldset class="sectionContainer"><legend>Competition Binding Curve</legend><div class="container"><div id="correctGraph"></div></div></fieldset></div>');

        graphDelay = setInterval(function () {
            redrawGraph(correctGraph, questionNo, SubtypeAnswer, PercentageAnswer)
        }, 200);
      }
    }
    else{
        $('#review').html('<div class="row"><div class="col-sm-6" style="padding:0"><p class="th1" style="text-align:center"><b>YOUR ANSWER WOULD HAVE PRODUCED THESE CURVES</b></p><p id="yourAnswer" style="text-align:center"></p><div class="container"><fieldset class="sectionContainer"><legend>Competition Binding Curve</legend><div class="container"><div id="yourGraph"></div></div></fieldset></div></div><div class="col-sm-6" style="padding:0"><p class="th1" style="text-align:center"><b>THE CORRECT ANSWER PRODUCES THESE CURVES</b></p><p id="correctAnswer" style="text-align:center"></p><div class="container"><fieldset class="sectionContainer"><legend>Competition Binding Curve</legend><div id="correctGraph"></div></fieldset></div></div></div>');
        graphDelay = setInterval(function () {
            redrawGraph(correctGraph, questionNo, SubtypeAnswer, PercentageAnswer);
            redrawGraph(yourGraph, questionNo, Subtypes, Percentages);
        }, 200);

        if (Subtypes[questionNo][1] === null) $('#yourAnswer').html("Subtype Present: M" + parseInt(Subtypes[questionNo][0] + 1) + " " + Percentages[questionNo][0] + "%");
        else $('#yourAnswer').html("Subtypes Present: M" + parseInt(Subtypes[questionNo][0] + 1) + " " + Percentages[questionNo][0] + "%, M" + parseInt(Subtypes[questionNo][1] + 1) + " " + Percentages[questionNo][1] + "%");
    }
    if (SubtypeAnswer[questionNo][1] === null) $('#correctAnswer').html("Subtype Present: M" + parseInt(SubtypeAnswer[questionNo][0] + 1) + " " + PercentageAnswer[questionNo][0] + "%");
    else $('#correctAnswer').html("Subtypes Present: M" + parseInt(SubtypeAnswer[questionNo][0] + 1) + " " + PercentageAnswer[questionNo][0] + "%, M" + parseInt(SubtypeAnswer[questionNo][1] + 1) + " " + PercentageAnswer[questionNo][1] + "%");

    setTimeout(function () {
        clearInterval(graphDelay)
    }, 1000);

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

function showInstructionsQuiz() {
    $('#instructions').modal('show');
    $('#instructions').on('shown.bs.modal', function (event) {
        $('#quizButton').trigger("click");
    })
};

function showBody() {
    $('section').fadeIn();
    $('.loading').fadeOut();
}

$(window).resize(function () {
    redrawGraph('myDiv');
});

setTimeout(showBody, 5000);
