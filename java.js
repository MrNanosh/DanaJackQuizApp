'use strict';

const STORE ={
  quiz: [
    {
      question: 'what are your odds of getting this question right?',
      options: ['25%', '25%', '50%', '33%'],
      correct: 3 //array index o
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
      options: ['How often will you get this right?', 'Who gives the best quizzes', 'When was the first multiple choice quiz','What was the answer to Question 2?'],
      correct: 1 //array index
    },
    {
      question: 'Is this the last question',
      options: ['Yes','No'],
      correct: 1 //array index
    }
  ],
  score: 0,
  currentQuestion: 0 //index of the array
};

function renderPage()  {
  $('main').html(handleStartPage()); 
  //$('header').html(updateTicker());
}
//puts html into the <main> and <header> tag

function handleStartPage() {
  renderStartPage(); //put the html of the start page into <main>
  $(/*start button*/'.start').on('submit', event =>{
    //$(event.currentTarget)
    event.preventDefault();
    startQuiz();
  });  
}

function renderStartPage() {
  $('main').html(`
  <form class='start'>
    <fieldset>
    <p>This is a Quiz about Quizzes, you can start if youre ready</p>    
    <input type='submit' class='start-quiz' value="Start Quiz"></input>
    </fieldset>
  </form>
  `);
  //render page html for start page
}
//see first page, returns html for the first page
function startQuiz(){
  resetScore();
  updateTicker();
  makeQuestion();
  getUserResponse();
}

function makeQuestion(){
  if(STORE.currentQuestion === STORE.quiz.length){
    handleEndPage();
  } else {
    let q = STORE.quiz[STORE.currentQuestion];
    $('main').html(`
  <form class='quiz'>
  <fieldset>  
  <p>${q.question}</p>  
   ${makeAnswers(q)}
   <input type='submit' class='submit-answer'></input>
   </fieldset>
   </form>
  `);
  }
}
//make a function that makes individual answers
function makeAnswers(question){
  let markup = question.options.map((option,index)=>`<input type ='radio' id='option${index+1}' value='${index}' name="answer" required><label for='option${index+1}'>${option}</label>`).join('');
  return markup;
}

function resetScore(){
  STORE.score = 0;
  STORE.currentQuestion = 0;
}

function updateTicker(){
  $('.ticker').html(`Question: ${STORE.currentQuestion + 1} Score: ${STORE.score}`);
}



function getUserResponse() {
  console.log('getting UserResponse');
  $('.quiz').on('submit', event =>{
    event.preventDefault();
    let res = Number($('input[type=radio][name=answer]:checked').val());
    let grade = scoreResponse(res);
    responseFeedback(grade);
  });
  
}



//////////////////////////////////////////////////////////////////////////////////////////////

function scoreResponse(res) {
  let grade = compareResponseToAnswer(res);
  updateStoreScore(grade.correct);
  updateTicker();

  return grade;
}

function compareResponseToAnswer(res){
  let rightAnswer = STORE.quiz[STORE.currentQuestion].correct;
  if(res === rightAnswer){
    console.log('you are right');
    return {correct: true, answer: rightAnswer};
  }
  console.log('you are wrong');
  return{correct: false, answer: rightAnswer};
}

function updateStoreScore(bol) {
  if(bol){
    STORE.score++;
  }
}

function toggleGrading(grade){
  // for every answer, if its index isnt the correct index then make it attr wrong else make attr right 
  //look for a descendant of .quiz class and get the labels
  //where the value isn't equal to grade.answer addClass(strikethru)
  for(let i = 0; i < STORE.quiz[STORE.currentQuestion].options.length; i++){
    if(i === grade.answer){
      $(`fieldset [for=option${i+1}]`).addClass('correct');
    } 
    else{
      $(`fieldset [for=option${i+1}]`).addClass('strikethru');
    }
  }

}
//changes styling of the feedback if correct or incorrect
 
function responseFeedback(grade){
  toggleGrading(grade);
  $('.submit-answer').val('Next Question');
  $('.quiz').on('submit', event =>{
    event.preventDefault();
    STORE.currentQuestion++;
    makeQuestion();
    getUserResponse();
  });
}
//returns the feedback for the answer submitted

function gradeResponse(){
  console.log('gradeResponse works');
}
//returns the response for a question being correct or incorrect

function handleEndPage(){
  renderEndPage(); //put the html of the start page into <main>
  $('.start').on('submit', event =>{
    event.preventDefault();
    startQuiz();
  });}

function renderEndPage(){
  $('main').html(`
  <form class='start'>
    <fieldset>
    <p>Would you like to try again?</p>    
    <input type='submit' class='start-quiz' value="Restart Quiz"></input>
    </fieldset>
  </form>
  `);
}

function main(){
  renderPage();
}

$(main);