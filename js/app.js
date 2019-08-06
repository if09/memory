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
        console.log(star)
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




function selectCards(e) {
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
    console.log(matchCards)
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
}


function shuffle(array) {
    var currentIndex = array.length,
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
