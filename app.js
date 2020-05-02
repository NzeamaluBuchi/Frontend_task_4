
const options=document.querySelector(".options").children;
const answerTrackerContainer=document.querySelector(".answers-tracker");
const questionNumberSpan=document.querySelector(".question-num-value");
const totalQuestionSpan=document.querySelector(".total-question");
const correctAnswerSpan=document.querySelector(".correct-answers")
const totalQuestionSpan2=document.querySelector(".total-question2")
const percentage=document.querySelector(".percentage")
const question=document.querySelector(".question");
const op1=document.querySelector(".option1");
const op2=document.querySelector(".option2");
const op3=document.querySelector(".option3");
const op4=document.querySelector(".option4");
let questionIndex;
let index=0;
let myArray=[];
let myArr=[];
let score=0;
//questions and options and answers

const questions=[
 {
     q:'What is the full meaning of "HTML"?',
     options:['Hypertech markup language','Hypertext multiple line','Hypertext markup language','Hypertext makeup language'],
     answer:2
 },
 {
     q:'How do you write an IF statement in JavaScript?',
     options:['if i == 5 then','if (i == 5)','if i = 5','if i =  then'],
     answer:1
 },
 {
     q:'What progamming language is a gem?',
     options:['python','ruby','html','none of these'],
     answer:1
 },
 {
     q:'How does a FOR loop start?',
     options:['for (i = 0; i <= 5)','for (i <= 5; i++)','for i = 1 to 5','for (i = 0; i <= 5; i++)'],
     answer:3
 },
 {
     q:'What is the website of the HNG dashboard?',
     options:['dev.start.ng','google.com','stat.ng','github.com'],
     answer:0
 }
]

// set questions and options and question number
totalQuestionSpan.innerHTML=questions.length;
function load(){
    questionNumberSpan.innerHTML=index+1;
    question.innerHTML=questions[questionIndex].q;
    op1.innerHTML=questions[questionIndex].options[0];
    op2.innerHTML=questions[questionIndex].options[1];
    op3.innerHTML=questions[questionIndex].options[2];
    op4.innerHTML=questions[questionIndex].options[3];
    index++;
}

//Checking if the answer is correct or wrong and including the appropriate class to the html. 
//Updating the answer tracker
//Updating the score
//Disabling other options once the user selects his/her answer.
function check(element){
    if(element.id==questions[questionIndex].answer){
        element.classList.add("correct");
        updateAnswerTracker("correct");
        score++;
        console.log("score:"+score)
    }
    else{
        element.classList.add("wrong");
        updateAnswerTracker("wrong")
    }
    disabledOptions()
}

function disabledOptions(){
    for(let i=0; i<options.length; i++){
        options[i].classList.add("disabled");
        if(options[i].id==questions[questionIndex].answer){
            options[i].classList.add("correct")   
        }
    }
}

//enabling the options for the next page
//before going to the next question,let's check if the user selected an option. if the user didn't alert("please select one option") else next question.
function enableOptions(){
    for(let i=0; i<options.length; i++){
     options[i].classList.remove("disabled","correct","wrong");
    }
}

function validate(){
  if(!options[0].classList.contains("disabled")){
      alert("Please Select one option")
  } 
  else{
     enableOptions();
     randomQuestion();
  }    
}
//After validation, the user can go to the next question.

function next(){ 
    validate();
}

//To begin the question with a random question everytime the page is refreshed and to check if there is a repetition of questions

function randomQuestion(){
    let randomNumber=Math.floor(Math.random()*questions.length);
    let hitDuplicate=0;
        if(index==questions.length){ 
            quizOver();
        }
        else{
            if(myArray.length>0){
                //if myArray[item] equal to randomNumber then hitDuplicate found if found then hitDuplicate=1 and break the loop
                for(let i=0; i<myArray.length; i++){
                   if(myArray[i]==randomNumber){
                       hitDuplicate=1;
                       break;             
                   } 
                }
                //if hitDuplicate found then call again to randomQuestion()
              if(hitDuplicate==1){
                  randomQuestion();
              } 
              else{
                  questionIndex=randomNumber;
                  load();
                  myArr.push(questionIndex);
              }
            }
            if(myArray.length==0){
              questionIndex=randomNumber;
              load();
              myArr.push(questionIndex);
            }
        
        myArray.push(randomNumber);
        
        }
}

//Tracking the questions answered by the user
function answerTrakcer(){
    for(let i=0; i<questions.length; i++){
       const div=document.createElement("div")
        answerTrackerContainer.appendChild(div);
    }
}

function updateAnswerTracker(classNam){
    answerTrackerContainer.children[index-1].classList.add(classNam);
}

//Displaying a message with the score and percentage at the end of the quiz
function quizOver(){
    document.querySelector(".quiz-over").classList.add("show");
    correctAnswerSpan.innerHTML=score;
    totalQuestionSpan2.innerHTML=questions.length;
    percentage.innerHTML=(score/questions.length)*100 + "%";
}

//To Try the quiz again
function tryAgain(){
    window.location.reload();
}

window.onload=function(){
    randomQuestion();
    answerTrakcer();
}
