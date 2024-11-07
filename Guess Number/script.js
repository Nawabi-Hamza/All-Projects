



function randomNumber(maxNumber){
    return Math.floor(Math.random() * maxNumber) + 1
}
let random = randomNumber(20)



const showResult = document.getElementById("btn-question-mark")
const message = document.getElementById("message")

let click = 0;
let score = 20
let highScore = 0 


function success(){
    message.innerText = "Congratulation 🏆"
    showResult.innerText = random;
    document.body.style = "background-color: greenyellow;color:#333;"
    if(highScore < score){
        highScore = score
    }
    document.getElementById("highscore").innerText = highScore
    document.getElementById("checkBtn").disabled = true
}

function tryAgain(){
    showResult.innerText = "?";
    document.body.style = "background-color: black;color:#fff";
    random = randomNumber(20)
    score = 20;
    click = 0
    document.getElementById("checkBtn").disabled = false
    document.getElementById("score").innerText = 0
}


function btnClick(){
    click += 1;
    score -= 1;
    const guess = document.getElementById("guess").value
    document.getElementById("score").innerText = score
    if(guess > random){
        message.innerText = `📉 too Height, guess time ${click}`
    }else if(guess < random){
        message.innerText = `📈 too Low, guess time ${click}`
    }else if(guess == random){
        success()
    }else{
        message.innerText = "Invalid input"
    }
}

