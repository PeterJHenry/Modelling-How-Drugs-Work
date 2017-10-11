// Constants
var timeLimit = 1500;
var numberOfQuestions = 5;

var questionNumbers = 0;

var questionStack = [];
var correctAnswerStack = [];
var userAnswerStack = [];

$(document).ready(function () {
    setQuizProperties();
    // startQuiz();
});


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
    var minute = 0;
    var second = 0;

    function clean_time(minute, second) {
        if (second === 60) {
            minute++;
            second = 0;
        }
        return [intToString(minute), intToString(second)];
    }

    function intToString(time) {
        time = parseInt(time);
        if (time < 10) return '0' + time.toString();
        else return time.toString();
    }

    function updateClock() {
        second++;
        minute = clean_time(minute, second)[0];
        second = clean_time(minute, second)[1];

        $('#timer-minutes').html(minute);
        $('#timer-seconds').html(second);
    }

    setInterval(updateClock, 1000);
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
