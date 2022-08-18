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

questionFive.question.value = "test";

const questionArray = [questionOne, questionTwo, questionThree, questionFour, questionFive];

var questionCounter = 1;

var countdown = 75;

var startClick = document.getElementById("start-btn");
startClick.addEventListener("click", startQuiz);

document.querySelector(".quiz").hidden = true;

function startQuiz () {
    document.querySelector(".main").hidden = true;
    document.querySelector(".quiz").hidden = false;
    populateQuestions();
}

function populateQuestions () {
    document.querySelector(".question").textContent = questionArray[questionCounter].question;
    document.querySelector("#answer-one").textContent = questionArray[questionCounter].answerOne;
    document.querySelector("#answer-two").textContent = questionArray[questionCounter].answerTwo;
    document.querySelector("#answer-three").textContent = questionArray[questionCounter].answerThree;
    document.querySelector("#answer-four").textContent = questionArray[questionCounter].answerFour;
}

