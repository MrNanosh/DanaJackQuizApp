'use strict';

const STORE ={
  quiz: [
    {
      question: 'What are your odds of getting this question right?',
      options: ['25%', '25%', '50%', '33%'],
      correct: 3 //array index
    },
    {
      question: 'When was the first multiple choice quiz for computers?',
      options: [1982, 1999, 1973, 'today'],
      correct: 0 //array index
    },
    {
      question: 'Who gives the best quizzes?',
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
      question: 'Is this the last question?',
      options: ['Yes','No'],
      correct: 1 //array index
    }
  ],
  score: 0,
  currentQuestion: 0 //index of the array
};


function handleStartPage() {
  renderStartPage(); //put the html of the start page into <main>
  $(/*start button*/'.start').on('submit', event =>{
    event.preventDefault();
    startQuiz();
  });  
}

function renderStartPage() {
  $('main').html(`
  <form class='start'>
    <fieldset>
      <p class='intro'>This is a Quiz about Quizzes, you can start if youre ready</p>    
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
  } 
  else {
    let q = STORE.quiz[STORE.currentQuestion];
    $('main').html(`
  <form class='quiz'>
    <fieldset aria-labelledby='ask'>
      <p class='question' id='ask'>${q.question}</p>
      ${makeAnswers(q)}
      <span class = 'submit-container'><input type='submit' class='submit-answer'></input></span>
   </fieldset>
   </form>
  `);
  }
}     //      <input type='button' class='next' value='next question' display='none'></input>
 

//make a function that makes individual answers
function makeAnswers(question){
  let markup = question.options.map(
    (option,index)=>{
      return`<p class='option'>
                <label for='option${index+1}'>${option}</label>          
                <input type ='radio' id='option${index+1}'
                value='${index}' name='answer'  required>
              </p>`;
    }
  ).join('');
  return markup;
}

function resetScore(){
  STORE.score = 0;
  STORE.currentQuestion = 0;
}

function updateTicker(){
  $('.ticker').html(`
  <span>
  Question number: ${STORE.currentQuestion + 1}
  </span>
  <span> 
   Current Score: ${STORE.score} out of ${STORE.quiz.length}
  </span>`);
}//updates the score



function getUserResponse() {
  $('.quiz').on('submit', event =>{
    event.preventDefault();
    let res = Number($('input[type=radio]:checked').val());
    responseFeedback(scoreResponse(res));
  });
}



function scoreResponse(res) {
  let grade = compareResponseToAnswer(res);
  updateStoreScore(grade.correct);
  updateTicker();

  return grade;
}

function compareResponseToAnswer(res){
  let rightAnswer = STORE.quiz[STORE.currentQuestion].correct;
  if(res === rightAnswer){
    
    return {correct: true, answer: rightAnswer};
  }
  
  return{correct: false, answer: rightAnswer};
}

function updateStoreScore(bol) {
  if(bol){
    STORE.score++;
  }
}

function toggleGrading(grade){
  let opts = STORE.quiz[STORE.currentQuestion].options;
  for(let i = 0; i < opts.length; i++){
    if(i === grade.answer){
      $(`fieldset [for=option${i+1}]`).addClass('correct');
    } 
    else{
      $(`fieldset [for=option${i+1}]`).addClass('strikethru');
    }
  }
  $('.submit-answer').after(`<p>${grade.correct?'Correct!':'Incorrect!'} The correct answer is ${opts[grade.answer]}</p>`);

}
//changes styling of the feedback if correct or incorrect
 
function responseFeedback(grade){
  //need a button to remove double event handler problem
  $('span.submit-container')
    .html(`<input type='button'
           class='next'
           value='Next Question'>
           </input>`);
  toggleGrading(grade);
  nextQuestion();
}//returns the feedback for the answer submitted

function nextQuestion(){
  $('.quiz').find('.next').on('click', event =>{
    event.stopPropagation();
    STORE.currentQuestion++;
    makeQuestion();
    getUserResponse();
  });
}

function handleEndPage(){
  renderEndPage(); //put the html of the start page into <main>
  $('.start').on('submit', event =>{
    event.preventDefault();
    startQuiz();
  });}

function renderEndPage(){
  $('main').html(`
  <form class='end'>
    <fieldset>
    <p>Would you like to try again?</p>    
    <input type='submit' class='start-quiz' value="Restart Quiz"></input>
    </fieldset>
  </form>
  `);
}

function main(){
  handleStartPage();
}

$(main);