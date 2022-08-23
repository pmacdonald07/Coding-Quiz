const questionOne = {
    question: "What is the correct syntax for referencing a class?",
    answerOne: "1. #className",
    answerTwo: "2. .className",
    answerThree: "3. $className",
    answerFour: "4. !className"
};

const questionTwo = {
    question: "What is the git command to update a remote repository from a local repository?",
    answerOne: "1. git push",
    answerTwo: "2. git pull",
    answerThree: "3. git log",
    answerFour: "4. git branch"
};

const questionThree = {
    question: "What CSS tool can we use to style webpages differently based on screen size?",
    answerOne: "1. universal selectors",
    answerTwo: "2. display: flex",
    answerThree: "3. justify-content",
    answerFour: "4. media queries"
};

const questionFour = {
    question: "Which JavaScript function generates a number between 0 and 1?",
    answerOne: "1. Math.floor()",
    answerTwo: "2. Math.random()",
    answerThree: "3. Math.PI()",
    answerFour: "4. Math.log()"
};

const questionFive = {
    question: "When asked if he could perform in the rain at the Super Bowl XLI halftime show, how did Prince respond?",
    answerOne: "1. 'Only if the rain is purple.'",
    answerTwo: "2. 'No, it will be too dangerous!'",
    answerThree: "3. 'Can you make it rain harder?'",
    answerFour: "4. 'Pink Chasmere is underrated.'"
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

    if (highScoresArray === null) {
        highScoresArray = [];
    }

    for (i = 0; i < highScores.length; i++) {
        var listItemEl = document.createElement("li");
        listItemEl.className = "score-list-item";
        listItemEl.textContent = highScores[i].initials + " " + highScores[i].score;
        documents.querySelector(".score-list").appendChild(listItemEl);
    }
}

loadHighScores();