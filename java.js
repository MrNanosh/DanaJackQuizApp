'use strict';

const STORE ={
  quiz: [],
  score: 0,
  currentQuestion: -1
};

//see first page, returns html for the first page
function firstPage(){
    $('main').html('<p>something</p>');
}

//see final page, return html for the final page
function finalPage(){}

//see the question area, return html for the question page
function questionPage(){}

//figure out which page to be on, returns html for that page
function getPage(){}

//display the correct page
function renderPage(){
  getPage();
}

//start a quiz
function startQuiz(){}

//submit an answer
function handleAnswerSubmit(){}

//get feedback on their answer
function handleAnswerResponse(){}

//see their score
function score(){
  return STORE.score;
}

//see current question number 
function questionNumber(){
  return STORE.currentQuestion;
}

function main(){
  /*firstPage();
  renderPage();
  startQuiz();
  handleAnswerSubmit();
  handleAnswerResponse();
  score();
  questionNumber();
  finalPage();
  renderQuestionArea();*/
  handleFirstPage();
  handleQuizPage();
  handleFinalPage();
  renderPage();
}

main() {
    renderPage();
    handleAnswerSubmit();
    handleQuizStart();
    handleNextQuestion();
}

$(main);