// Constants
var timer;
var timeLimit = 1499;
var timeVar;
var numberOfQuestions = 5;
var num = 0;
var currentNumber = 1;

var SubtypeAnswer = [];
var PercentageAnswer = [];
var Subtypes = [];
var Percentages = [];
var textAnswers = [];
var ligandList = [];
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
    randomiseSubType();
    randomiseLigand();
    timer = timeLimit;
  	currentNumber = 1;
    num = 0;
    $('.questionCover').hide();
    $('.questionContainer').show();
    $('.quizAnswers').hide();
    $('#submitButton').html("Next Question");
    initializeClock();
    quizStatus();
}

function minlength(minute){
  if(minute.toString().length === 1) return '0'+minute;
  else return minute;
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

        $('#timer-minutes').html(minlength(minute));
        $('#timer-seconds').html(second);

        if(timer == -1){
          alert("Time's up!");
          storeAnswers(num);
          endQuiz();
        }
        timer--;
    }

    timeVar = setInterval(updateClock, 1000);
}

// Chooose a random subtype and then the draw the graph for it.
function randomiseSubType() {
  for(var i = 0; i < 5; i++){
    var subtypeIndex = [null, null];
    var subtypePercentage = [null, null];

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
    SubtypeAnswer.push(subtypeIndex);
    PercentageAnswer.push(subtypePercentage);
  }
}

function randomiseLigand() {
  for(var x = 0; x < 5; x++){
    var ligandIndexes = [];
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
    ligandList.push(ligandIndexes);
  }
}

function color(i){
  if(i===4) return i+1;
  else return i;
}

function get_dataset(ligandIndex) {
    var dataSet
    if (SubtypeAnswer[num][1] === null) {
        dataSet = calculateGraphPoints(1, 100, logK[ligandIndex][SubtypeAnswer[num][0]]);
    } else {
        dataSet = calculateGraphPoints(2,
            PercentageAnswer[num][0], logK[ligandIndex][SubtypeAnswer[num][0]],
            PercentageAnswer[num][1], logK[ligandIndex][SubtypeAnswer[num][1]]
        );
    }
    return dataSet;
}

function get_dataset2(ligandIndex,questionNo,subtype,percentage) {
    var dataSet
    if (subtype[questionNo][1] === null) {
        dataSet = calculateGraphPoints(1, 100, logK[ligandIndex][subtype[questionNo][0]]);
    } else {
        dataSet = calculateGraphPoints(2,
            percentage[questionNo][0], logK[ligandIndex][subtype[questionNo][0]],
            percentage[questionNo][1], logK[ligandIndex][subtype[questionNo][1]]
        );
    }
    return dataSet;
}

// Redraws the graph with current ligand values, does not affect subtype.
function graph(div,questionNo,subtype,percentage,size) {
	// Generate data to pass to the graph.
    var data = [];
    for (i = 0; i < 5; i++) {
        ligandIndex = ligandList[questionNo][i]
        var dataSet = get_dataset2(ligandIndex,questionNo,subtype,percentage);
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
	plot(div, data, true, size);
}

// Draw/Update the graph from a data object.
// Legend visible by default, allows an options object to be
// passed to Plotly.newPlot()
function plot(div, data, showlegend, size) {
    var layout = {
        autosize: false,
        width: size,
        height: size,
        xaxis: {
            title: 'log [ Ligand ] (M)',
            titlefont: {
                family: 'Lato, Helvetica Neue, Helvetica, Arial, sans-serif',
                size: 18,
                color: '#7f7f7f'
            },
            showline: true,
            range: [-12, -2],
            tickvals: [-12, -11, -10, -9, -8, -7, -6, -5, -4, -3, -2]
        },
        yaxis: {
            title: 'Specific Binding (%)',
            titlefont: {
                family: 'Lato, Helvetica Neue, Helvetica, Arial, sans-serif',
                size: 18,
                color: '#7f7f7f'
            },
            showline: true,
            range: [0, 100],
            tickvals: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]
            // ticktext: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]
        },
        margin: {
            l: 50,
            b: 50,
            t: 50,
            pad: 4
        },
        showlegend: showlegend,
        legend: {
          font: {
            size: 10
          },
          y: 10,
          orientation : "h"
        },


    };
    Plotly.newPlot(div, data, layout);
    showBody();
}

// Redraws the graph with current ligand values, does not affect subtype.
function redrawGraph() {
	// Generate data to pass to the graph.
    var data = [];
    for (i = 0; i < 5; i++) {
        ligandIndex = ligandList[num][i];
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

function review(questionNo) {
  if(score[questionNo] || Subtypes[questionNo][0] === null){
    $('#question').html(questionNo+1);
    $('#reviewTable').html('<table><tr><td class="quote" id="text" colspan=2></td></tr><tr><th style="text-align:center">Answer Review</th></tr><tr><td style="padding:10px"><span id="correctAnswer"></span></td></tr><tr><td><div class="container-fluid ligands"><fieldset class="sectionContainer"><legend>Competition Binding Curve</legend><div id="correctGraph"></div></fieldset></div></td></tr></table>')
    graph(correctGraph,questionNo,SubtypeAnswer,PercentageAnswer,700);
  }
  else {
    $('#question').html(questionNo+1);
    $('#reviewTable').html('<table><tr><td class="quote" id="text" colspan=2></td></tr><tr><th class="th1" style="text-align:center">Your answer would have produced these curves</th><th class="th1" style="text-align:center">The correct answer produces these curves</th></tr><tr><td style="padding:10px"><span id="yourAnswer"></span></td><td style="padding:10px"><span id="correctAnswer"></span></td></tr><tr><td><div class="container-fluid ligands"><fieldset class="sectionContainer"><legend>Competition Binding Curve</legend><div id="yourGraph"></div></fieldset></div></td><td><div class="container-fluid ligands"><fieldset class="sectionContainer"><legend>Competition Binding Curve</legend><div id="correctGraph"></div></fieldset></div></td></tr></table>');
    graph(yourGraph,questionNo,Subtypes,Percentages,500);
    graph(correctGraph,questionNo,SubtypeAnswer,PercentageAnswer,500);

    if(Subtypes[questionNo][1]===null) $('#yourAnswer').html("Subtype Present: M"+parseInt(Subtypes[questionNo][0]+1)+" "+Percentages[questionNo][0]+"%");
    else $('#yourAnswer').html("Subtypes Present: M"+parseInt(Subtypes[questionNo][0]+1)+" "+Percentages[questionNo][0]+"%, M"+parseInt(Subtypes[questionNo][1]+1)+" "+Percentages[questionNo][1]+"%");
  }
  if(SubtypeAnswer[questionNo][1]===null) $('#correctAnswer').html("Subtype Present: M"+parseInt(SubtypeAnswer[questionNo][0]+1)+" "+PercentageAnswer[questionNo][0]+"%");
  else $('#correctAnswer').html("Subtypes Present: M"+parseInt(SubtypeAnswer[questionNo][0]+1)+" "+PercentageAnswer[questionNo][0]+"%, M"+parseInt(SubtypeAnswer[questionNo][1]+1)+" "+PercentageAnswer[questionNo][1]+"%");

  if(textAnswers[questionNo]!=''){
    $('#text').html('<b><big>Justification:</big></b> '+textAnswers[questionNo]);
  }
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

function next(){
  if($('input[type=checkbox]:checked').length <= 0){
    alert('Please select an answer');
  }
  else {
    currentNumber++;
    storeAnswers();
    num++;
    quizStatus(true);
  }
}

function back(){
  num--;
  currentNumber--;
  quizStatus(false);
}

function storeAnswers() {
  var subtypes = [];
  var percentage = [];

  textAnswers.push($('#textbox').val());

  $('input[type=checkbox]:checked').each(function(){
    subtypes.push(parseInt($(this).val()));
  });

  $('#relativeDensity1').find('option:selected').each(function(){
    if($(this).val()){
      percentage.push(parseInt($(this).val()));
    }
  });

  $('#relativeDensity2').find('option:selected').each(function(){
    if($(this).val()){
      percentage.push(parseInt($(this).val()));
    }
  });
  $('#relativeDensity3').find('option:selected').each(function(){
    if($(this).val()){
      percentage.push(parseInt($(this).val()));
    }
  });
  $('#relativeDensity4').find('option:selected').each(function(){
    if($(this).val()){
      percentage.push(parseInt($(this).val()));
    }
  });
  $('#relativeDensity5').find('option:selected').each(function(){
    if($(this).val()){
      percentage.push(parseInt($(this).val()));
    }
  });
  if(subtypes.length === 1){
    subtypes[1] = null;
    percentage[1] = null;
  }
  if(subtypes[0]===undefined){
    subtypes[0] = null;
    percentage[0] = null;
  }
  Subtypes[num] = subtypes;
  Percentages[num] = percentage;

}

function quizStatus(next) {
  $('.progress-bar').css('width',(currentNumber-1)/5*100+'%');
  if(currentNumber > 1){
    $('#back').show();
  }
  if(currentNumber === numberOfQuestions){
    //clearInput();
    $('#submitButton').html("Submit");
    $('#quiz_title').html('Question '+currentNumber+' of '+numberOfQuestions);
    redrawGraph(num);
  }
  else if(currentNumber > numberOfQuestions){
    $('.progress-bar').css('width',(currentNumber)/5*100+'%');
    var delay = 400;
    setTimeout(endQuiz,delay);
  }
  else {
    //clearInput();
    $('#submitButton').html('Next <i class="fa fa-arrow-right" aria-hidden="true"></i>');
    $('#quiz_title').html('Question '+currentNumber+' of '+numberOfQuestions);
    redrawGraph(num);
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
  var a = ['#a1','#a2','#a3','#a4','#a5'];
  var q = ['#q1','#q2','#q3','#q4','#q5'];
  var green = ['#row1:hover {background-color:#dcffd3;}','#row2:hover {background-color:#dcffd3;}','#row3:hover {background-color:#dcffd3;}','#row4:hover {background-color:#dcffd3;}','#row5:hover {background-color:#dcffd3;}'];
  var red = ['#row1:hover {background-color:#ffdddd;}','#row2:hover {background-color:#ffdddd;}','#row3:hover {background-color:#ffdddd;}','#row4:hover {background-color:#ffdddd;}','#row5:hover {background-color:#ffdddd;}']
  var mark = ['#mark1','#mark2','#mark3','#mark4','#mark5'];
  var row = ['#row1','#row2','#row3','#row4','#row5']

  for(var i = 0; i < Subtypes.length; i++){
    $(row[i]).show();

    if(((Subtypes[i][0] === SubtypeAnswer[i][0]) && (Subtypes[i][1] === SubtypeAnswer[i][1]) && (Percentages[i][0] === PercentageAnswer[i][0])) ||
    ((Subtypes[i][0] === SubtypeAnswer[i][1]) && (Subtypes[i][1] === SubtypeAnswer[i][0]) && (Percentages[i][0] === PercentageAnswer[i][1]))){
      score[i] = true;
    }
    else {
      score[i] = false;
    }

    // YOUR ANSWER
    if(Subtypes[i][0]!=null){
      if(Subtypes[i][1]===null) $(q[i]).html("M"+parseInt(Subtypes[i][0]+1)+" "+Percentages[i][0]+"%");
      else $(q[i]).html("M"+parseInt(Subtypes[i][0]+1)+" "+Percentages[i][0]+"%<br>M"+parseInt(Subtypes[i][1]+1)+" "+Percentages[i][1]+"%");
    }

    // CORRECT ANSWER
    if(SubtypeAnswer[i][1]===null) $(a[i]).html("M"+parseInt(SubtypeAnswer[i][0]+1)+" "+PercentageAnswer[i][0]+"%");
    else $(a[i]).html("M"+parseInt(SubtypeAnswer[i][0]+1)+" "+PercentageAnswer[i][0]+"%<br>M"+parseInt(SubtypeAnswer[i][1]+1)+" "+PercentageAnswer[i][1]+"%");

    var style = document.createElement('style');

    // TICK/GREEN OR CROSS/RED
    if(score[i]) {
      $(mark[i]).html('<i class="fa fa-check" aria-hidden="true"></i>');
      style.appendChild(document.createTextNode(green[i]));
    }
    else {
      $(mark[i]).html('<i class="fa fa-times" aria-hidden="true"></i>');
      style.appendChild(document.createTextNode(red[i]));
    }
    document.getElementsByTagName('head')[0].appendChild(style);
  }
  $('#score').html("Score: "+score.reduce(function (a, b) {
    return a + b;
  }, 0)+"/"+SubtypeAnswer.length);
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
