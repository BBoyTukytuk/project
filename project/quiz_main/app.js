const questionNumber = document.querySelector(".question-number");
const questionText = document.querySelector(".question-text");
const optionContainer = document.querySelector(".option-container");
const answersIndicatorContainer = document.querySelector(".answers-indicator");
const homeBox = document.querySelector(".home-box");
const quizBox = document.querySelector(".quiz-box");
const resultBox = document.querySelector(".result-box");
// const is used to define a new variable in JavaScript.
// document.querySelector lets you find html elements and returns the first element based on the tag you parse

let questionCounter = 0;
let currentQuestion;
let availableQuestions = [];
let availableOptions = [];
let correctAnswers = 0;
let attempt = 0;

//let allows you to declare variables that are limited to the scope of a block statement, like loops

//push the questions into availableQuestions Array
//function myFunction(parameters if needed)
//Variables defined with const cannot be Redeclared.
//The push() method adds new items to the end of an array in question.js so you go through the list of questions
function setAvailableQuestions(){
    const totalQuestion = quiz.length;
    for(let i=0; i<totalQuestion; i++){
        availableQuestions.push(quiz[i])
    }
}
// set question number and question and options
//innerhtml allows Javascript code to manipulate a website being displayed.
function getNewQuestion(){
   // set question number
   questionNumber.innerHTML = " Question " + (questionCounter + 1) + " of " + quiz.length;

   //set question text
   // get random question
   //Math.floor = returns the largest integer less than or equal to a given number.
   //Math.random = returns an number greater that zero but below the desired range by multiplying the range
   const questionIndex = availableQuestions[Math.floor(Math.random() * availableQuestions.length)]
   currentQuestion = questionIndex;
   questionText.innerHTML = currentQuestion.q;

   // get the position of the random question from the availableQuestion Array using questionIndex;
   //indexOf searches the string, and returns the index of the first occurrence of the specified substring
   const index1= availableQuestions.indexOf(questionIndex);

   // The splice() method adds and/or removes array elements from the availableQuestion Array stopping repeat
   //availableQuestions.splice(At position 1, remove 1 element)
   availableQuestions.splice(index1,1);

       //hasOwnProperty() method returns a boolean true or false if it has an "img"
       //show question img if 'img' property exists in question,js
       // True = creates an element which is the current question number.img
   if(currentQuestion.hasOwnProperty("img")){
       const img = document.createElement("img");
       img.src = currentQuestion.img;
       img.alt = currentQuestion.alt;
       questionText.appendChild(img);

   }
   //const audio = document.createElement("audio");
   //const source = document.createElement("source");
   //audio.src = currentQuestion.audio_mp3;
   //audio.autoplay = true
   //audio.controls = true
   //audio.appendChild(source);
   //questionText.appendChild(audio);

   // set options
   // get the length of options
   const optionLen = currentQuestion.options.length
   // push options into availableOptions Array
   for(let i=0; i<optionLen; i++){
       availableOptions.push(i)

   }
   optionContainer.innerHTML = '';
   let animationDelay = 0.15;
   // create options in html that are in random order
   for(let i=0; i<optionLen; i++){
       // random option
       const optionIndex = availableOptions[Math.floor(Math.random() * availableOptions.length)];
       // get the position of optionIndex from the availableOptions Array
       const index2 = availableOptions.indexOf(optionIndex);
       // remove the optionIndex from the availableOptions Array so that the option does not repeat
       // The splice() method adds and/or removes array elements from the availableQuestion Array stopping repeat
       //availableQuestions.splice(At position 1, remove 1 element)
       availableOptions.splice(index2,1);
       //Create a <div> element and appends it to the document:
       const option = document.createElement("div");
       option.innerHTML = currentQuestion.options[optionIndex];
       option.id = optionIndex;
       option.style.animationDelay = animationDelay + 's';
       animationDelay = animationDelay + 0.15;
       option.className = "option";
       optionContainer.appendChild(option)

       //Create an audio element
       const audio = document.createElement("audio");
       //const source = document.createElement("source");
       // using the optionIndex connect audio to question in array
       audio.src = currentQuestion.option_audio[optionIndex];
       //audio.autoplay = true
       audio.controls = true
       audio.id = optionIndex;
       audio.style.animationDelay = animationDelay + 's';
       animationDelay = animationDelay + 0.15;
       audio.className = "option_audio";
       //add audio into option container  audio.appendChild(source);
       optionContainer.appendChild(audio);


       // audio container append
       option.setAttribute("onclick","getResult(this)");
   }

   questionCounter++
}

// get the result of the current attempt question
function getResult(element){
    const id = parseInt(element.id);
    // parseInt() function parses a string argument and returns an integer
    // get the answer by comparing the id of clicked option
    if(id === currentQuestion.answer){
        // set the green to the correct option
        //element.classList.add is used for adding one or more classes to the CSS element.
        element.classList.add("correct");
        // add the indicator to the correct mark
        updateAnswerIndicator("correct");
        correctAnswers++;

    }
    else{
          // set the red to the incorrect option
          element.classList.add("wrong");
        // add the indicator to the wrong mark
          updateAnswerIndicator("wrong");

          // If the answer is incorrect we also want to show the correct option in green
          const optionLen = optionContainer.children.length;
          for(let i=0; i<optionLen; i++){
              if(parseInt(optionContainer.children[i].id) === currentQuestion.answer){
                optionContainer.children[i].classList.add("correct");
              }
            }

        }
        attempt++;
        unclickableOptions();

}
// make all the options unclickable once the user selects an option (RESTRICT THE USE TO CHANGE THE OPTION)
function unclickableOptions(){
    const optionLen = optionContainer.children.length;
    for(let i=0 ; i<optionLen; i++){
        optionContainer.children[i].classList.add("already-answered");

    }

}

function answersIndicator(){
    answersIndicatorContainer.innerHTML = '';
    const totalQuestion = quiz.length;
    for(let i=0; i<totalQuestion; i++){
        const indicator = document.createElement("div");
        answersIndicatorContainer.appendChild(indicator);


    }

}

function updateAnswerIndicator(markType){
    answersIndicatorContainer.children[questionCounter -1 ].classList.add(markType)
}

function next(){
    if(questionCounter === quiz.length){
        quizOver();
    }
    else{
        getNewQuestion();
    }

}

function quizOver(){
//hide quiz Box
quizBox.classList.add("hide");
//show result box
resultBox.classList.remove('hide');
quizResult();
}


// get the quiz result
function quizResult(){
    resultBox.querySelector(".total-question").innerHTML = quiz.length;
    resultBox.querySelector(".total-attempt").innerHTML = attempt;
    resultBox.querySelector(".total-correct").innerHTML = correctAnswers;
    resultBox.querySelector(".total-wrong").innerHTML = attempt - correctAnswers;
    const percentage = (correctAnswers/quiz.length)*100;
    resultBox.querySelector(".percentage").innerHTML = percentage.toFixed(2) + "%";
    resultBox.querySelector(".total-score").innerHTML = correctAnswers + " / " +quiz.length;
}

function resetQuiz(){
    questionCounter = 0;
    correctAnswers = 0;
    attempt = 0;
}

function tryAgainQuiz(){
   // hide the resultBox
   resultBox.classList.add("hide");
   // show the quizBox
   quizBox.classList.remove("hide");
   resetQuiz();
   startQuiz();
}

//#### STARTING POINT ####



function startQuiz(){

    //hide home box
homeBox.classList.add("hide");
// show quiz Box
quizBox.classList.remove("hide");

// first we will set all questions in available Questions Array
    setAvailableQuestions();
    // second we will call getNewQuestion(); function
    getNewQuestion();
    // to create indicator of answers
    answersIndicator();
}

window.onload = function(){
    homeBox.querySelector(".total-question").innerHTML = quiz.length;
}
