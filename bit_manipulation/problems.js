// 5.1 Insertion
// You are given two 32 - bit numbers, N and M, and two bit positions, I and j. Write a method to insert M into N such that M 
// starts at bit j and ends at bit i.You can assume that the bits j through I have enough space to fit all of M. That is, 
// if M = 1011, you can assume that there are at least 5 bits between j and i.You would not, for example, have j = 3 and I = 2,
// because M could not fully fit between bit 3 and bit 2. 

// Example:
// insertion(10000000000, 10011, 2, 6) => 10001001100

function insertion(N, M, i, j) {
    const mask1 = M << i;
    const firstStep = N | mask1;
    return firstStep ^ 0;
}

// console.log(insertion(0b11000001100, 0b10011, 2, 6).toString(2));

// 5.2 Binary to String
// Given a real number between 0 and 1(e.g., 0.72) that is passed in as a double, print the binary representation. If the number
// cannot be represented accurately in binary with at most 32 characters, print "ERROR".

function binaryToString(N, b) {
    // const actual = 
}

// 5.3

function flipBit(n) {
    const string = n.toString(2);
    let longest = 0;
    let longPossible = 0;
    let sincePrevZero = 0;
    let firstZero = true;
    for (let i = 0; i < string.length; i++) {
        if (string[i] === '0') {
            if (firstZero) {
                firstZero = false;
                longPossible++;
            } else {
                if (longPossible > longest) longest = longPossible;
                longPossible = sincePrevZero + 1;
            }
            sincePrevZero = 0;
        } else {
            longPossible++;
            sincePrevZero++;
            if (longPossible > longest) longest = longPossible;
        }
    }
    return longest;
}

console.log(flipBit(1775))