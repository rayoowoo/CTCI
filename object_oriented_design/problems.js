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

// 7.5 Online Book Reader
// Design the data structures for an online book reader system.

// WHO: Readers
// WHAT: A place where people can go online to read books available
// WHERE: system
// WHEN: anytime
// WHY: doesn't matter
// HOW: readers can check out books to read

class BookReader {
    constructor() {
        this.books = new Set();
        this.checkedOut = new Set();
    }

    stock(books) {
        if (books instanceof Array === false) books = [books];
        books.forEach(book => {
            this.books.add(book); // it's alright for a book system to have multiple copies I assume
        })
    }

    checkout(book) {
        if (this.checkedOut.has(book)) return "Book already checked out.";
        this.checkedOut.add(book);
        setTimeout(() => this.checkedOut.delete(book), 5000);
    }

    return(book) {
        if (this.checkedOut.has(book)) return this.checkedOut.delete(book);
        return "You did not checkout this book."
    }
}

class Book {
    constructor(name) {
        this.name = name;
    }
}

// 7.6 Jigsaw
// Implement an NxN jigsaw puzzle. Design the data structures and explain an algorithm to solve the puzzle. You 
// can assume that you have a fitsWith method which, when passed two puzzle edges, returns true if the two edges
// belong together.

class Jigsaw {
    constructor(size) {
        this.puzzle = [];
        this.size = size;
        this.mixedPieces = [];
    }

    fitsWith(edge1, edge2) {
        // returns true if two edge belong together. 
    }

    fillPuzzle() {
        for (let i = 0; i < this.size; i++) {
            const row = [];
            for (let j = 0; j < this.size; j++) {
                const piece = new Piece();
                if (!i && !j) piece.upperLeft = true;
                row.push(piece);
            }
            this.puzzle.push(row);
        }
    }

    makePuzzle() {
        this.fillPuzzle();
        for (let i = 0; i < this.size; i++) {
            for (let j = 0; j < this.size; j++) {
                if (i !== 0) this.puzzle[i][j].top = this.puzzle[i - 1][j]; // if it's not the top row, it has a top piece
                if (i !== this.size - 1) this.puzzle[i][j].bottom = this.puzzle[i + 1][j]; // if it's not the bottom row, it has a bottom piece
                if (j !== 0) this.puzzle[i][j].left = this.puzzle[i][j - 1]; // if it is not the leftmost row, it has a left piece
                if (j !== this.size - 1) this.puzzle[i][j].right = this.puzzle[i][j + 1]; // if it is not the rightmost row, it has a right piece
            }
        }
        this.puzzle = this.puzzle.flatten(); // flattening the 2d array into a list of the pieces. 
        this.mixedPieces = this.puzzle.deepDup().shuffle(); // deep duplicate, shuffled for solving later. 
    }

    check(pieces) {
        // some code to determine if the set of pieces passed into this method matches the original puzzle.
    }

    solve() {
        // first find the upperleft piece
        const upperLeft = this.mixedPieces.filter(el => el.upperLeft)[0];
        const solution = [upperLeft];
        let forward = true;
        while (solution.length < this.size * this.size) {
            // when forward, look for this.right's. when backward, look for this.lefts. 
            for (let i = 0; i < this.mixedPieces.length; i++) {
                const last = solution.length - 1;
                if (solution.length % this.size === 0) { // the edge pieces need to check for the bottom pieces
                    if (this.mixedPieces[i] === solution[last].bottom) {
                        solution.push(this.mixedPieces[i])
                        forward = forward ? false : true; // at the end of the row, we need to now look backwards.
                    }
                } else if (forward) {
                    if (this.mixedPieces[i] === solution[last].right) {
                        solution.push(this.mixedPieces[i])
                    }
                } else if (!forward) {
                    if (this.mixedPieces[i] === solution[last].left) {
                        solution.push(this.mixedPieces[i])
                    }
                }
            }
        }
    }
}

class Piece {
    constructor() {
        this.upperLeft = false;
        this.top = this.left = this.right = this.bottom = null;
    }
}