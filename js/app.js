let moves = 0;
let matchCards = 0;
let openCards = [];
let stars = document.querySelector('.stars')
let starClass = ['fa-star']
const classList = ['fa-diamond', 'fa-diamond', 'fa-paper-plane-o', 'fa-paper-plane-o', 'fa-anchor', 'fa-anchor', 'fa-bolt', 'fa-bolt', 'fa-cube', 'fa-cube', 'fa-leaf', 'fa-leaf', 'fa-bomb', 'fa-bomb', 'fa-bicycle', 'fa-bicycle'];
let moveElement = document.querySelector(".moves");
let restartButton = document.querySelector(".restart");
let congrats = document.querySelector('h1');


shuffle(classList);
createHTML();
createStars()
activateListeners();




function createStars() {
    for (star of starClass) {
        const starLi = document.createElement('li');
        const starLi1 = document.createElement('li');
        const starLi2 = document.createElement('li');
        starLi.innerHTML = `<i class="fa ${starClass}"></i>`;
        starLi1.innerHTML = `<i class="fa ${starClass}"></i>`;
        starLi2.innerHTML = `<i class="fa ${starClass}"></i>`;
        stars.appendChild(starLi);
        stars.appendChild(starLi1);
        stars.appendChild(starLi2);
    }


}



// Functionality to create Html structure
function createHTML() {
    for (card of classList) {
        const li = document.createElement('li');
        li.classList = 'card';
        li.innerHTML = `<i class="fa ${card}"></i>`;
        const cardDeck = document.querySelector('.deck');
        cardDeck.appendChild(li);
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


// Abfragen ob der Timer schon läuft

function selectCards(e) {
    if (seconds == 0 && minutes == 0 && hours == 0){
        startWatch();
    }else{
        console.log("Timer läuft nicht");
    }
    if (e.target.className === 'card') {
        e.target.classList.add('open', 'show');
        openCards.push(e.target);
        if (openCards.length === 2) {
            compareCards();
        }
    }
}

function compareCards() {
    moves += 1;
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
}

function gameWin() {
    congrats.innerHTML = "Congratulations, you have won!"
    showModul();
    resetTime();
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


let playAgainModul = document.querySelector('.playAgain');

function showModul(){
    playAgainModul.classList.add('showPlayAgain');
}

const yesButton = document.querySelector('.yesButton');

yesButton.addEventListener('click', function(){
    location.reload(true);
})





let clear; 
function stopWatch() {  clear = setTimeout( "stopWatch( )", 1000 ); }


let seconds = 0, minutes = 0, hours = 0; 
let secs, mins, gethours ;


function startWatch() {
  
    if (seconds === 60) { 
        seconds = 0; 
        minutes = minutes + 1; 
    }
    mins = (minutes < 10) ? ('0' + minutes + ': ') : (minutes + ': ');  
    console.log("Will sehen", mins);
    if (minutes === 60) { 
        minutes = 0; 
        hours = hours + 1; 
    }
    
    gethours = (hours < 10) ? ('0' + hours + ': ') : (hours + ': '); secs = (seconds < 10) ? ('0' + seconds) : (seconds);
    console.log("Zweiter Teil", secs)
    console.log(gethours);
    const x = document.getElementById("timer");
    x.innerHTML = gethours + mins + secs;
    seconds++;
    console.log(seconds)
    clearTime = setTimeout("startWatch( )", 1000);
    setTimeout(clearTime);
}

// clearTimeout();

function resetTime() {
    if (seconds !== 0 || minutes !== 0 || hours !== 0) {
        seconds = 0; minutes = 0; hours = 0; secs = '0' + seconds; mins = '0' + minutes + ': '; gethours = '0' + hours + ': ';
        let x = document.getElementById("timer"); 
        let stopTime = gethours + mins + secs; 
        x.innerHTML = stopTime;
        setTimeout(clearTimeout(clearTime)); 
    }
}






