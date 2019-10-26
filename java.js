'use strict';

const STORE ={
  quiz: [
    {
      question: 'what are your odds of getting this question right?',
      options: ['25%', '25%', '50%', '33%'],
      correct: 3 //array index
    },
    {
      question: 'When was the first multiple choice quiz for computers',
      options: [1982, 1999, 1973, 'today'],
      correct: 0 //array index
    },
    {
      question: 'Who gives the best quizzes',
      options: ['A Sphinx', 'The Riddler', 'This Quiz', 'The Local Bridge Troll'],
      correct: 2 //array index
    },
    {
      question: 'What was the answer to Question 1?',
      options: ['A', 'B', 'C', 'D'],
      correct: 3 //array index
    },
    {
      question: 'What Question Was on This Quiz?',
      options: ['How often will you get this right?', 'Who gives the best quizzes', 'When was the first multiple choice quiz'
        'What was the answer to Question 2?'],
      correct: 1 //array index
    }
],
  score: 0,
  currentQuestion: -1
};

//see first page, returns html for the first page
function startQuiz(){
  console.log('starting quiz');
  //increase quiz question number by one
  //get main page
}
function renderPage()  {
  console.log('rendering page');
}

function getMainPage() {
  console.log('getting main page');
}

function handleStartPage() {
  console.log('firstPage');

  //listen to startQuiz button
  
  //renderStart page
  
}

function renderStartPage() {
  console.log('start page rendering');
  //render page html for start page
}

function handleQuizPage() {
  console.log('handling quiz page');
  //call getUserResponse
    //call alertEmptyResponse
}

function getUserResponse() {
  console.log('getting UserResponse');
  //call scoreResponse
  //call responseFeedback
}

function scoreResponse() {
  console.log('scoring response');
  //call compareResponseToAnswer
  //update STORE score
  //updateTicker()
  //return gradingObj{}
}

function updateStoreScore() {
  console.log('updating score in STORE');
  //add  1 for gradingObj.correct ===true
}

function handleButtonChange(){
  console.log('handleButtonChange works');
}
//changes the button when a user submits a response

function toggleGrading(){
  console.log('toggleGrading works');
}
//changes styling of the feedback if correct or incorrect
 
function responseFeedback(){
  console.log('responseFeedback works');
}
//returns the feedback for the answer submitted


function alertEmptyRespose(){
  console.log('alertEmptyResponse works');
}
//alerts the user when they dont sumbit an answer

function handleEndPage(){
  console.log('handleEndPage works');
}
//returns the html for the end page, shows end content, score, and restart quiz button

function gradeResponse(){
  console.log('gradeResponse works');
}
//returns the response for a question being correct or incorrect


function updateTicker(){
  console.log('updateTicker works');
}

function renderEndPage(){
  console.log('renderEndPage works');
}


/*function restartQuiz(){
  console.log('restartQuiz works');
}*/
//restarts the quiz, might not be needed

function getScore(){
  console.log('getScore works');
}
//returns STORE.score

function main(){

}

$(main);