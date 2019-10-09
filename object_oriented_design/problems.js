// 7.1
// Design the data structures for a generic deck of cards.
// Explain how you would subclass the data structures to implement blackjack.

class Deck {
    constructor() {
        this.cards = generateCards(); // this is an array
    }

    generateCards() {
        const newCards = [];
        const values = [
            "1", "2", "3", "4", "5", "6", "7", "8", "9", "10",
            "J", "Q", "K", "A"
        ]
        // const suits = ["♠", "♣", "♦", "♥"]
        const suits = ["spades", "clubs", "diamonds", "hearts"];

        for (let value of values) {
            for (let suit of suits) {
                newCards.push(new Card(value, suit));
            }
        }

        return newCards;
    }

    shuffle() {
        // from https://javascript.info/task/shuffle
        for (let i = array.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
        }
    }

    draw() {
        this.cards.pop();
    }
}

class Card {
    constructor(val, suit) {
        this.val = val;
        this.suit = suit;
    }
}

// The cards in the deck is kept within an array. In order to play blackjack, I would create a new class called Blackjack, 
// and put the game logic there.

class Blackjack {
    constructor() {
        this.deck = new Deck();
        this.playerOne = []; // if this were to be played, player would be its own class.
        this.playerTwo = [];
        this.field = []; // the cards in the middle
    }

    calculateValue(card, player) {
        switch (card.val) {
            case "J":
                return 10;
            case "Q":
                return 10;
            case "K":
                return 10;
            case "A":
                if (player.sum + 11 < 21) return 1;
                return 11;
            default:
                return parseInt(card.val);
        } 
    }

    deal() {
        // this would handle the initial deal as well as each player's turn. 
    }
}

