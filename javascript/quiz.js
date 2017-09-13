var myVar;
function startTimer() {
  myVar = setInterval(function(){myTimer()},1000);
}

function myTimer() {
  if (timelimit > 0) {
    curmin=Math.floor(timelimit/60);
    cursec=timelimit%60;
    if (cursec.toString().length == 1){
      cursec = cursec+"0";
    }
    if (curmin!=0) {
      curtime="Time: "+curmin+":"+cursec;
    } else {
      curtime="Time: "+"0:"+cursec;
    }
    $_('timeleft').innerHTML = curtime;
  } else {
    $_('timeleft').innerHTML = timelimit+'Out of time';
    clearInterval(myVar);
    checkAnswer();
    renderResults();
  }
  timelimit--;
}

var pos = 0, posn, choice, correct = 0, rscore = 0;

var questions = [
//  EACH QUESTION WE WILL RANDOMISE SUBTYPE RECEPTOR / DENSITY VALUES FOR QUESTIONS
    [ "Who's this snacc? <br> <img src='https://scontent.fper2-1.fna.fbcdn.net/v/t1.0-9/16426292_10209372721888231_7079148437469311035_n.jpg?oh=1e81ce5b1930308d36a38795708ebcb6&oe=5A59AAC7' alt='friend' height='300' width='300'>",
      "Rork","Roarke","Roarrrr XD a hehe","hello","B"],
    [ "Which is ur pal Roarke?",
      "<img src='http://www.nova.edu/hpd/otm/pics/4fun/RUNNOSE.JPG' alt=''>",
      "<img src='http://www.nova.edu/hpd/otm/pics/4fun/Gumby.JPG' alt=''>",
      "<img src='https://scontent.fper2-1.fna.fbcdn.net/v/t1.0-9/16426292_10209372721888231_7079148437469311035_n.jpg?oh=1e81ce5b1930308d36a38795708ebcb6&oe=5A59AAC7' alt='friend' height='160' width='160'>","hi","C"],
    [ "What is 10 + 4?", "<img src='https://scontent.fper2-1.fna.fbcdn.net/v/t1.0-9/16426292_10209372721888231_7079148437469311035_n.jpg?oh=1e81ce5b1930308d36a38795708ebcb6&oe=5A59AAC7' alt='friend' height='160' width='160'>", "14", "16","hello", "B" ],
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
  quiz.innerHTML += "<button class='quizbutton' onclick='location.reload()'>Restart</a>";
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
  quiz.innerHTML += "<button class='quizbutton' onclick='checkAnswer()'>Submit Answer</button>";
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
  } else {
    alert("Please select an answer");
  }
}

window.onload = function() {
  timelimit = 600;
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
  quiz.innerHTML += "<button class='quizbutton' onclick='clearInterval(myVar),startTimer(),setQuestionOrder(),renderQuestion();'>Start Quiz</button>";
}
