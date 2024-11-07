

function diceDisplay(dice){
    document.querySelector(".dice").src = `/dice/dice-${dice}.png`
}



function player1(){
    const randomNumberDice = Math.trunc(Math.random() * 6) + 1
    diceDisplay(randomNumberDice)
    document.getElementById("current--0").textContent = randomNumberDice
}