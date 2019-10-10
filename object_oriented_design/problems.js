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

// 7.2 Call Center
// Imagine you have a call center with three levels of employees: respondent, manager, and director. An incoming telephone
// call must be first allocated to a respondent who is free. If the respondent can't handle the call, he or she must escalate
// the call to a manager. If the manager is not free or not able to handle it, then the call should be escalated to a director.
// Design the classes and data structures for this problem. Implement a method dispatchCall() which assigns a call to the first
// available employee.

// Assuming that employees can be freed up after a certain amount of time:

class CallCenter {
    constructor() {
        this.respondents = [];
        this.managers = [];
        this.directors = [];
    }

    employ(person) {
        this.employees.push(person);
    }

    dispatchCall() {
        for (let i = 0; i < this.respondents.length; i++) {
            if (this.respondents[i].free) this.respondents[i].free = false;
            return `call taken by respondent ${name}`;
        }

        for (let i = 0; i < this.managers.length; i++) {
            if (this.managers[i].free) this.managers[i].free = false;
            return `call taken by manager ${name}`;
        }

        for (let i = 0; i < this.directors.length; i++) {
            if (this.directors[i].free) this.directors[i].free = false;
            return `call taken by director ${name}`;
        }

        return 'everyone is occupied';
    }
}

class Employee {
    constructor(name) {
        this.name = name;
        this.free = true;
    }
}

class Respondent extends Employee { }
class Manager extends Employee { }
class Director extends Employee{}

// 7.3 Jukebox
// Design a musical jukebox using object-oriented design.

// WHO: anybody
// WHAT: a jukebox, songs, 
// WHERE: in a bar
// WHEN: at night
// WHY: to play music
// HOW: operate the jukebox class, insert coin, press play. songs should be played at random. does it give change? can't stop 
// mid way.

class Jukebox {
    constructor() {
        // ideally, each song would be its own class, with a title, lyrics, and length in milliseconds. 
        // then the play function would console.log all the lyrics line by line. 
        this.songs = ["Mary had a little lamb", "Hot cross buns", "Ring around the rosy", "Old McDonald"];
        this.coinTypes = [1, 5, 10, 25];
        this.giveChange = false;
        this.currentSession = null;
    }

    shuffle() {
        // from https://javascript.info/task/shuffle
        for (let i = array.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [this.songs[i], this.songs[j]] = [this.songs[j], this.songs[i]];
        }
    }

    insertCoin(coin) {
        if (this.currentSession) {
            if (this.currentSession.currentlyPlaying) return "Jukebox in session";
        } else {
            this.currentlyPlaying = new Session();
        }

        if (coin in this.coinTypes) {
            if (this.currentSession.pay(coin)) this.playSongs();
        } else {
            return "Not a valid coin";
        }
    }

    playSongs() {
        this.shuffle();
        for (let i = 0; i < this.songs.length; i++) {
            setTimeout(() => console.log(this.songs[i]), i * 1000)();
            setTimeout(that => that.currentSession = null, (factorial(that.songs.length) - 1) * 1000) // when all the songs are done playing, currentSession is null.
        }
    }
}

class Session {
    constructor() {
        this.remainingCost = 100;
        this.currentlyPlaying = false;
    }

    pay(coin) {
        this.remainingCost -= coin;
        if (this.remainingCost) return false;
        return true;
    }
}

// 7.4 Parking Lot
// Design a parking lot using object-oriented principles.

// WHO: Drivers
// WHAT: Lot, slots, cars, (assuming no need to pay)
// WHERE: doesn't matter
// WHEN: doesn't matter
// WHY: doesn't matter

// HOW: cars should be able to enter and exit the lot, and a counter needs to keep track of how many cars are there.
// Cars should park in spots. 

class ParkingLot {
    constructor(spots) {
        this.spots = spots;
        this.openSpots = spots;
    }

    full() {
        return !this.openSpots;
    }

    park() {
        if (this.full()) return 'lot is full';
        this.openSpots--;
    }

    leave() {
        this.openSpots++;
    }
}