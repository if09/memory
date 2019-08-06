/*
 * Create a list that holds all of your cards  
 */
const cards = ["fa-diamond", "fa-paper-plane-o", "fa-anchor", "fa-bolt", "fa-cube", "fa-anchor", "fa-leaf", "fa-bicycle", "fa-diamond", "fa-bomb", "fa-leaf", "fa-bomb", "fa-bolt", "fa-bicycle", "fa-paper-plane-o", "fa-cube"];
let openCards = [];
const deck = document.querySelector('.deck');

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
function createHTML() {
    for (const card of cards) {
        const listElement = document.createElement('li');
        const iconElement = document.createElement('i');
        listElement.classList.add("card");
        iconElement.classList.add('fa', `${card}`);
        listElement.appendChild(iconElement);
        deck.appendChild(listElement);

    }
}

createHTML();

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    let currentIndex = cards.length, temporaryValue, randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

/*
 * set up the event listener for a card. 
 If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */


const clickedCards = document.querySelectorAll('.card');


for (clickedCard of clickedCards) {
    clickedCard.addEventListener("click", function (clickedCard) {
        displayCard(clickedCard)
        addCard(clickedCard)
    })
}

function displayCard(e) {
    e.target.classList.add("open", "show");
}

function addCard(e) {
    console.log("Vor dem Push", openCards);
    console.log("Clicked Element", e.target.className);
    if (e.target.className === "card open show") {
        openCards.push(e.target)
    } else {
        console.log("Sieht die Klassen nicht")
    }
    console.log("Nach dem Push", openCards);

}








