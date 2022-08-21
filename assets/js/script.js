const questionOne = {
    question: "Question 1 text",
    answerOne: "Answer 1 text",
    answerTwo: "Answer 2 text",
    answerThree: "Answer 3 text",
    answerFour: "Answer 4 text"
};

const questionTwo = {
    question: "Question 2 text",
    answerOne: "Q2 Answer 1 text",
    answerTwo: "Q2 Answer 2 text",
    answerThree: "Q2 Answer 3 text",
    answerFour: "Q2 Answer 4 text"
};

const questionThree = {
    question: "Question 3 text",
    answerOne: "Q3 Answer 1 text",
    answerTwo: "Q3 Answer 2 text",
    answerThree: "Q3 Answer 3 text",
    answerFour: "Q3 Answer 4 text"
};

const questionFour = {
    question: "Question 4 text",
    answerOne: "Q4 Answer 1 text",
    answerTwo: "Q4 Answer 2 text",
    answerThree: "Q4 Answer 3 text",
    answerFour: "Q4 Answer 4 text"
};

const questionFive = {
    question: "Question 5 text",
    answerOne: "Q5 Answer 1 text",
    answerTwo: "Q5 Answer 2 text",
    answerThree: "Q5 Answer 3 text",
    answerFour: "Q5 Answer 4 text"
};

const questionArray = [questionOne, questionTwo, questionThree, questionFour, questionFive];

highScoresArray = [];

var questionCounter = 0;
let countdown = 75;
var answersCorrect = 0;

var timerText = document.getElementById("timer");
timerText.textContent = "Timer: " + countdown;

var quizButtons = document.querySelector(".answers");

var answerButtonOne = document.getElementById("answer-one");
var answerButtonTwo = document.getElementById("answer-two");
var answerButtonThree = document.getElementById("answer-three");
var answerButtonFour = document.getElementById("answer-four");

var startClick = document.getElementById("start-btn");
startClick.addEventListener("click", startQuiz);

document.querySelector(".quiz").hidden = true;

function startQuiz () {
    document.querySelector(".main").hidden = true;
    document.querySelector(".quiz").hidden = false;
    startCountdown();
    populateQuestions();
}

function populateQuestions () {

    if (questionCounter === 5) {
        allDone();
        return;
    }

    document.querySelector(".question").textContent = questionArray[questionCounter].question;
    document.querySelector("#answer-one").textContent = questionArray[questionCounter].answerOne;
    document.querySelector("#answer-two").textContent = questionArray[questionCounter].answerTwo;
    document.querySelector("#answer-three").textContent = questionArray[questionCounter].answerThree;
    document.querySelector("#answer-four").textContent = questionArray[questionCounter].answerFour;

    quizButtons.addEventListener("click", nextQuestion);

    if (questionCounter === 1) {
        answerButtonOne.dataset.answer = "correct";
        answerButtonTwo.dataset.answer = "incorrect";
        answerButtonThree.dataset.answer = "incorrect";
        answerButtonFour.dataset.answer = "incorrect";
    }

    else if (questionCounter === 2) {
        answerButtonOne.dataset.answer = "incorrect";
        answerButtonTwo.dataset.answer = "incorrect";
        answerButtonThree.dataset.answer = "incorrect";
        answerButtonFour.dataset.answer = "correct";
    }

    else if (questionCounter === 3) {
        answerButtonOne.dataset.answer = "incorrect";
        answerButtonTwo.dataset.answer = "correct";
        answerButtonThree.dataset.answer = "incorrect";
        answerButtonFour.dataset.answer = "incorrect";
    }

    else if (questionCounter === 4) {
        answerButtonOne.dataset.answer = "incorrect";
        answerButtonTwo.dataset.answer = "incorrect";
        answerButtonThree.dataset.answer = "correct";
        answerButtonFour.dataset.answer = "incorrect";
    }

}

function nextQuestion () {
    var target = event.target;
    if (target.dataset.answer === "correct") {
        answerStatus("Correct!");
        answersCorrect++;
    }
    else {
        answerStatus("Incorrect!");
        countdown -= 12;
        timerText.textContent = "Timer: " + countdown;
    }
    questionCounter++;
    populateQuestions();
}

function startCountdown () {
    var timeInterval = setInterval(function() {
        if (questionCounter === 5) {
            clearInterval(timeInterval);
        }

        if (countdown >= 1) {
            timerText.textContent = "Timer: " + countdown;
            countdown--;
        }
        else {
            timerText.textContent = "Timer: 0"
            clearInterval(timeInterval);
            allDone();
        }
    }, 1000);
}

function answerStatus (answer){
    var rightOrWrong = document.createElement("h2");
    rightOrWrong.id = "temporary";
    rightOrWrong.textContent = answer;
    document.querySelector(".quiz").appendChild(rightOrWrong);

    setTimeout(function(){
        rightOrWrong.remove();
    }, 1500);
}

function allDone () {
    //clearInterval(timeInterval);
    if (answersCorrect === 0) {
        countdown = 0;
    }
    document.querySelector(".answers").hidden = true;

    document.querySelector(".question").textContent = "All done!";

    var scoreTotalEl = document.createElement("h2");
    scoreTotalEl.textContent = "Your final score is " + countdown + ".";
    document.querySelector(".question").appendChild(scoreTotalEl);


    var allDoneDivEl = document.createElement("div");
    allDoneDivEl.className = "all-done-div";
    allDoneDivEl.innerHTML = "<h2>Enter Initials:</h2><form class='initials-form'><input type=text id='initials-input' /><button class='btn' id='initials-btn' type='submit'>Submit</button></form>";
    scoreTotalEl.appendChild(allDoneDivEl);

    document.querySelector(".initials-form").addEventListener("submit", scoreSubmit);
}

function scoreSubmit (event) {
    event.preventDefault();
    var initials = document.querySelector("#initials-input").value;
    console.log(initials);

    if (!initials) {
         alert("You need to input your initials!");
         return false;
     }
     else {
        var finalScore = {
            initials: initials,
            score: countdown
        };
        highScoresArray.push(finalScore);
        console.log(highScoresArray);
        saveHighScores();
        window.location.href="./scores.html";
     }
}

function saveHighScores () {
    localStorage.setItem("scores", JSON.stringify(highScoresArray));
}

function loadHighScores () {
    highScores = localStorage.getItem("scores");
    highScores = JSON.parse(highScores);
    highScoresArray = highScores;

    for (i = 0; i < highScores.length; i++) {
        var listItemEl = document.createElement("li");
        listItemEl.className = "score-list-item";
        listItemEl.textContent = highScores[i].initials + " " + highScores[i].score;
        documents.querySelector(".score-list").appendChild(listItemEl);
    }
}

loadHighScores();