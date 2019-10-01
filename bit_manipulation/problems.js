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
    let binaryResult = "0.";
    for (let i = 1; i <= 32; i++) {
        const factor = 1/(2**i)
        if (N >= factor) {
            N -= factor;
            binaryResult += "1";
        } else {
            binaryResult += "0";
        }
        if (!N) return binaryResult;
    }
    return "ERROR";
}

// console.log(binaryToString(0.725, 10))

// 5.3 Flip Bit to Win

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

// console.log(flipBit(1775))

// 5.4 Next Number

function nextNumber(num) {
    const string = num.toString(2).split("");
    let firstOne, firstZero, lastOne, lastZero;
    for (let i = 0; i < string.length; i++) {
        if (string[i] === '1' && firstOne === undefined) firstOne = i;
        if (string[i] === '0' && firstZero === undefined) firstZero = i;
        if (string[string.length - i - 1] === '1' && lastOne === undefined) lastOne = string.length - i - 1;
        if (string[string.length - i - 1] === '0' && lastZero === undefined) lastZero = string.length - i - 1;
        if (firstOne && firstZero && lastOne && lastZero) break;
    }

    console.log(string);

    console.log(firstOne)
    console.log(firstZero)
    console.log(lastOne)
    console.log(lastZero)

    let nextSmall = string.slice(0);
    let nextLarge = string.slice(0);

    [nextSmall[firstOne], nextSmall[lastZero]] = [nextSmall[lastZero], nextSmall[firstOne]];
    [nextLarge[firstZero], nextLarge[lastOne]] = [nextLarge[lastOne], nextLarge[firstZero]];

    console.log(nextSmall);
    console.log(nextLarge);

    nextSmall = nextSmall.join("")
    nextLarge = nextLarge.join("")

    console.log(parseInt(nextSmall, 2));
    console.log(parseInt(nextLarge, 2));
}

// nextNumber(75);

// 5.6 Conversion
// Write a function to determine the number of bits you would need to flip to convert integer A to integer B.

function conversion(intA, intB) {
    let strA = intA.toString(2);
    let strB = intB.toString(2);

    let total = 0;

    if (strA.length > strB.length) {
        const diff = strA.length - strB.length;
        total += diff;
        strA = strA.slice(diff);
    } else if (strB.length > strA.length) {
        const diff = strB.length - strA.length;
        total += diff;
        strB = strB.slice(diff);
    }
    for (let i = 0; i < strA.length; i++) {
        if (strA[i] !== strB[i]) total++;
    }

    return total;
}

console.log(conversion(29, 15))