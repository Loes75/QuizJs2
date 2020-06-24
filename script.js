const startButton = document.getElementById("start-btn");
const nextButton = document.getElementById("next-btn");
const questionContainer = document.getElementById("question-container");
startButton.addEventListener("click",startGame);
const questionElement = document.getElementById("question");
const answerButtonsElement = document.getElementById("answers-buttons");
const scoreMsg = document.getElementById("score");
var score;
nextButton.addEventListener("click", ()=>{
    currentQuestionIndex += 1;
    setNextQuestion();
})

let shuffledQuestion, currentQuestionIndex;




function startGame (){
    score = 0;
    scoreMsg.classList.add("hide");
    clearStatusClass(document.body);
    startButton.classList.add("hide");
    shuffledQuestion = questions.sort(() => Math.random()-.5);
    currentQuestionIndex = 0;
    questionContainer.classList.remove("hide");
    setNextQuestion();

}

function setNextQuestion () {
    resetState();
    showQuestion(shuffledQuestion[currentQuestionIndex])

}
function resetState(){
    nextButton.classList.add("hide");
    while (answerButtonsElement.firstChild){
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}
function showQuestion(question){
    questionElement.innerText = question.question;
    question.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerText = answer.text;
        button.classList.add("btn");
        if (answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click",selectAnswer)
        answerButtonsElement.appendChild(button);
    })


}
function selectAnswer (e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct;
    if (correct){
        score +=1;
    }
    setStatusClass(document.body,correct);
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct);
    })
    if (shuffledQuestion.length > currentQuestionIndex + 1){
        nextButton.classList.remove("hide");
    } else{
        scoreMsg.innerText = `Your score is ${score}`;
        scoreMsg.classList.remove("hide");
        questionContainer.classList.add("hide");
        startButton.innerText = 'Restart';
        startButton.classList.remove("hide");

    }
    

}
function setStatusClass(element,correct){
    clearStatusClass(element);
    if (correct){
        element.classList.add("correct");

    } else {
        element.classList.add("wrong");
    }
}
function clearStatusClass(element){
    element.classList.remove("correct");
    element.classList.remove("wrong");

}
const questions =[

    {
        question : "¿Cuál es la capital de Colombia?",
        answers: [
            {text : "Cali", correct : false},
            {text:"Bogotá", correct : true},
            {text:"Barranquilla", correct : false}
        ]
    },
    {
        question : "¿Cuántas regiones conforman la geografía colombiana?",
        answers: [
            {text: "1", correct : false},
            {text : "2" , correct : false},
            {text : "5" , correct : false},
            {text : "6" , correct : true}
        ]
    },
    {
        question : "¿A qué ciudad se le conoce como 'La ciudad de la eterna primavera'?",
        answers : [
            {text: "Barraquilla", correct : true},
            {text : "Santa Marta" , correct : false},
            {text : "Cali" , correct : false},
            {text : "Cartagena" , correct : false}
        ]
    }

]