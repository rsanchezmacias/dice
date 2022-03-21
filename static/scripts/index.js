
let dice = [
    "static/images/wh-die-one.svg",
    "static/images/wh-die-two.svg",
    "static/images/wh-die-three.svg",
    "static/images/wh-die-four.svg",
    "static/images/wh-die-five.svg",
    "static/images/wh-die-six.svg",
];

let dieOneImage = "static/images/wh-die-six.svg";
let dieTwoImage = "static/images/wh-die-six.svg";


function getValueFromImage(image) {
    for (let index = 0; index < dice.length; index++) {
        if (dice[index] === image) {
            return index;
        }
    }
    return 0;
}

function getDistinctRandomDieImage(currentImage) {
    let currentValue = getValueFromImage(currentImage);
    let index = Math.floor(Math.random() * dice.length);
    
    while(currentValue === index) {
        index = Math.floor(Math.random() * dice.length);
    }

    return dice[index];
}   

function swapDice() {
    let diceElements = document.querySelectorAll(".die__img");

    for (let index = 0; index < diceElements.length; index++) {
        let imageElement = diceElements[index];
        let currentImage = imageElement.getAttribute("src");
        let newRandomImage = getDistinctRandomDieImage(currentImage);
        imageElement.setAttribute("src", newRandomImage)
    }
}


function completeRound() {
    let diceElements = document.querySelectorAll(".die__img");
    let title = document.querySelector(".header__title");

    let playerOneImage = diceElements[0].getAttribute("src");
    let playerTwoImage = diceElements[1].getAttribute("src");

    let playerOneValue = getValueFromImage(playerOneImage);
    let playerTwoValue = getValueFromImage(playerTwoImage);

    if (playerOneValue === playerTwoValue) {
        title.textContent = "It's a tie :O";
    } else if (playerOneValue > playerTwoValue) {
        title.textContent = "Player 1 Wins (☞ﾟヮﾟ)☞";
    } else {
        title.textContent = "player 2 Wins ☜( ﾟヮﾟ☜)";
    }
}


function disableButton() {
    let button = document.querySelector(".die__button");
    button.disabled = true;
    button.classList.remove("die__button--enabled");
    button.classList.add("die__button--disabled");
}

function enableButton() {
    let button = document.querySelector(".die__button");
    button.disabled = false;
    button.classList.add("die__button--enabled");
    button.classList.remove("die__button--disabled");
}


function rollDice() {
    disableButton();

    counter = 20;
    let timeInterval = 50;
    let currentTimer = setInterval(swapImageAndSetNewInterval, timeInterval);

    function swapImageAndSetNewInterval() {
        swapDice();
        timeInterval += 10;

        clearInterval(currentTimer);
        currentTimer = setInterval(swapImageAndSetNewInterval, timeInterval);
        
        counter--;
        if (counter === 0) {
            clearInterval(currentTimer);
            enableButton();
            completeRound();
        }
    }
}
