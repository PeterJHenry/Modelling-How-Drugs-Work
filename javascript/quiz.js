var myVar;
function startTimer() {
  myVar = setInterval(function(){myTimer()},1000);
}

function myTimer() {
  if (timelimit > -1) {
    curmin=Math.floor(timelimit/60);
    cursec=timelimit%60;
    if (cursec[1] === 0){
      cursec = cursec+"0";
    } else if (cursec.toString().length === 1) {
      cursec = "0"+cursec;
    } if (curmin!=0) {
      curtime="Time: "+curmin+":"+cursec;
    } else {
      curtime="Time: "+"0:"+cursec;
    }
    $_('timeleft').innerHTML = curtime;
  } else {
    $_('timeleft').innerHTML = timelimit+'Out of time';
    alert("Time's up!");
    clearInterval(myVar);
    checkAnswer();
    renderResults();
  }
  timelimit--;
}

var pos = 0, posn, choice, correct = 0, rscore = 0;

var questions = [
//  EACH QUESTION WE WILL RANDOMISE SUBTYPE RECEPTOR / DENSITY VALUES FOR QUESTIONS
    [ "Hello",
      "Hi","Ok","Bye","hello","D"],
    [ "Hi",
      "ok","hi","hi","hi","C"],
    [ "What is 10 + 4?", "hiya", "14", "16","hello", "B" ],
    [ "What is 20 - 9?", "7", "13", "11","hello", "C" ],
    [ "What is 7 x 3?", "21", "24", "25","hello", "A" ],
    [ "What is 8 / 2?", "10", "2", "4","hello", "C" ],
    [ "What is 8 ^ 2?", "8", "2", "64","hello", "C" ],
    [ "What is 8 mod 2?", "0", "1", "4","hello", "A" ],
    [ "What is 6 + 4 + 2?", "12", "14", "16","hello", "A" ],
    [ "What is 20 - 7?", "7", "13", "11","hello", "B" ]
];

var questionOrder = [];
var maxNumberOfQuestions = questions.length;
function setQuestionOrder(){
  questionOrder.length = 0;
  for (var i=0; i<maxNumberOfQuestions; i++){
    questionOrder.push(i);
  }
//  questionOrder.sort(randOrd);   // alert(questionOrder);  // shuffle display order
  pos = 0;
  posn = questionOrder[pos];
}

function $_(IDS){
  return document.getElementById(IDS);
}
function randOrd(){
  return (Math.round(Math.random())-0.5);
}
function renderResults(){
  var quiz = $_("sectionContainer");
  quiz.innerHTML = "<h2>You got "+correct+" of "+maxNumberOfQuestions+" questions correct</h2>";
  $_("quiz_status").innerHTML = "Quiz Completed";
  $_('timeleft').innerHTML = '';
  quiz.innerHTML += "<br><button class='btn' onclick='location.reload()'><span class='tool-name'>Restart</span></button><br>";
  setQuestionOrder();
  correct = 0;
  clearInterval(myVar);
  return false;
}

function renderQuestion() {
  var quiz = $_("sectionContainer");
  $_("quiz_status").innerHTML = "Question "+(pos+1)+" of "+maxNumberOfQuestions;
  /*if (rscore != 0) {
    $_("quiz_status").innerHTML += '<br>Currently: '+(correct/rscore*100).toFixed(0)+'% correct';
  }*/
  var question = questions[posn][0];
  var chA = questions[posn][1];
  var chB = questions[posn][2];
  var chC = questions[posn][3];
  var chD = questions[posn][4];
  quiz.innerHTML = "<h3>"+question+"</h3>";
  quiz.innerHTML += "<p>obviously questions will be changed lol</p>";
  quiz.innerHTML += "<label><input type='radio' name='choices' value='A'> "+chA+"</label><br>";
  quiz.innerHTML += "<label><input type='radio' name='choices' value='B'> "+chB+"</label><br>";
  quiz.innerHTML += "<label><input type='radio' name='choices' value='C'> "+chC+"</label><br>";
  quiz.innerHTML += "<label><input type='radio' name='choices' value='D'> "+chD+"</label><br>";
  quiz.innerHTML += "<br><button class='btn' onclick='checkAnswer()'><span class='tool-name'>Submit Answer</span></button><br>";
}

function checkAnswer(){
  selected = false;
  var choices = document.getElementsByName("choices");
  for (var i=0; i<choices.length; i++) {
    if (choices[i].checked) {
      choice = choices[i].value;
      selected = true;
    }
  } if (selected) {
    rscore++;
    if (choice == questions[posn][5] && timelimit > 0) {
      correct++;
    }
    pos++;
    posn = questionOrder[pos];
    if (pos < maxNumberOfQuestions) {
      renderQuestion();
    } else {
      renderResults();
    }
  } else if (timelimit>-1) {
    alert("Please select an answer");
  }
}

window.onload = function() {
  timelimit = 60;
  var quiz = $_("sectionContainer");
  quiz.innerHTML = "<h3>Ready to be quizzed?</h3><br>"
  quiz.innerHTML += "<p class='quiztext'>This quiz is based on the assessment tool, however you may use it to practice a series of questions under test conditions.<br></p>"
  quiz.innerHTML += "<p class='quiztext'>A graph will be presented to you, with the specific binding % plotted with a few different ligands. You are required to select the correct answer for which receptor subtype and density combination is present.<br></p>"
  quiz.innerHTML += "<p class='quiztext'>You will have the opportunity to review the answers at completion of the quiz.";
  quiz.innerHTML += "<p class='quiztext'>The quiz rules are as follows:";
  quiz.innerHTML += "<li class='quiztext'>You will be asked "+questions.length+" questions</li>";
  quiz.innerHTML += "<li class='quiztext'>You will have four multi-choice option answers</li>";
  quiz.innerHTML += "<li class='quiztext'>You must select an answer to progress to the next question</li>";
  quiz.innerHTML += "<li class='quiztext'>You will be awarded one mark per correct answer</li>";
  quiz.innerHTML += "<li class='quiztext'>You will have "+timelimit/60+" minutes to complete the quiz</li><br>";
  quiz.innerHTML += "<p class='quiztext'>Click start to begin.<br>Good luck!</p>";
  quiz.innerHTML += "<br><button class='btn' onclick='clearInterval(myVar),startTimer(),setQuestionOrder(),renderQuestion();'><span class='tool-name'>Start Quiz</span></button><br>";
}
