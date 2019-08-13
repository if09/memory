let moves = 0;
let matchCards = 0;
let openCards = [];
let stars = document.querySelector('.stars')
let starClass = ['fa-star']
const classList = ['fa-diamond', 'fa-diamond', 'fa-paper-plane-o', 'fa-paper-plane-o', 'fa-anchor', 'fa-anchor', 'fa-bolt', 'fa-bolt', 'fa-cube', 'fa-cube', 'fa-leaf', 'fa-leaf', 'fa-bomb', 'fa-bomb', 'fa-bicycle', 'fa-bicycle'];
let moveElement = document.querySelector(".moves");
let restartButton = document.querySelector(".restart");
let congrats = document.querySelector('h1');
let tries = 2;
x = 0;

createGame();

function createGame(){
    shuffle(classList);
    createHTML();
    createStars()
    activateListeners();
}

function createHTML() {
    for (card of classList) {
        const li = document.createElement('li');
        li.classList = 'card';
        li.innerHTML = `<i class="fa ${card}"></i>`;
        const cardDeck = document.querySelector('.deck');
        cardDeck.appendChild(li);
    }
}

function createStars() {
    for(i=0; i<=tries; i++){
        const starLi = document.createElement('li');
        starLi.innerHTML = `<i id="star`+i+`"  class="fa ${starClass}"></i>`;
        stars.appendChild(starLi);
    }
}

function decreaseStars() {
    let iconStar = document.getElementById('star' + x);
    iconStar.classList.add("hide");
        if (x < tries) {
            x++
        } else {
            gameOver()
        }
}

function activateListeners() {
    const deckOfCards = document.querySelector('.deck');
    deckOfCards.addEventListener('click', selectCards);
}

function deactivateListeners() {
    const deckOfCards = document.querySelector('.deck');
    deckOfCards.removeEventListener('click', selectCards);
}

function selectCards(e) {
    if (e.target.className === 'card'){
    if (seconds == 0 && minutes == 0 && hours == 0){
        startWatch();
    }
     
        e.target.classList.add('open', 'show');
        openCards.push(e.target);
        if (openCards.length === 2) {
            compareCards();
        }
    }
}

function compareCards() {
    moves++;
    moveElement.innerHTML = moves
    deactivateListeners();

    if (openCards[0].innerHTML === openCards[1].innerHTML) {
        setTimeout(cardsMatch, 300);
    } else {
        setTimeout(cardsDontMatch, 800);
    }
}

function cardsMatch() {
    openCards[0].classList.add('match');
    openCards[1].classList.add('match');
    openCards[0].classList.remove('open', 'show');
    openCards[1].classList.remove('open', 'show');
    matchCards += 2;
    if (matchCards === 16) {
        setTimeout(gameWin, 400);
    }
    openCards = [];
    activateListeners();
}

function cardsDontMatch() {
    openCards[0].classList.remove('open', 'show');
    openCards[1].classList.remove('open', 'show');
    openCards = [];
    activateListeners();
    if (moves % 5 == 0) {
    decreaseStars();
    }
}

function gameWin() {
    congrats.innerHTML = "Congratulations, you have won!"
    showModul();
    stopWatch();
}

function shuffle(array) {
    let currentIndex = array.length,
        temporaryValue,
        randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

restartButton.addEventListener("click", function () {
    location.reload(true);
})

let playAgainModul = document.getElementById('modal');

function showModul(){
    playAgainModul.classList.remove('is-inactive');
    playAgainModul.classList.add('is-active');
}

const yesButton = document.getElementById('yesButton');

const noButton = document.getElementById('noButton');

yesButton.addEventListener('click', function () {
    location.reload(true);
})

noButton.addEventListener('click', function () {
    playAgainModul.classList.remove('is-active');
    playAgainModul.classList.add('is-inactive');
})

let seconds = 0, minutes = 0, hours = 0; 
let secs, mins, gethours ;

// Function used internet Research to find a way to code a timer in js

function startWatch() {
    if (seconds === 60) { 
        seconds = 0; 
        minutes = minutes + 1; 
    }
    mins = (minutes < 10) ? ('0' + minutes + ': ') : (minutes + ': ');  
    if (minutes === 60) { 
        minutes = 0; 
        hours = hours + 1; 
    }
    gethours = (hours < 10) ? ('0' + hours + ': ') : (hours + ': '); secs = (seconds < 10) ? ('0' + seconds) : (seconds);
    const x = document.getElementById("timer");
    x.innerHTML = gethours + mins + secs;
    seconds++;
    if(stop === false){
       setTimeout("startWatch( )", 1000);
    }
}

let stop = false;

function stopWatch() { 
    stop = true;
 }

 function gameOver() {
     stopWatch()
     showModul()
     let gameOverList = document.querySelectorAll('.card');
    for(card of gameOverList){
        card.classList.add("open","show");
        if (!card.classList.contains("match")){
            card.style.backgroundColor = "red";
        }
    }
 }







