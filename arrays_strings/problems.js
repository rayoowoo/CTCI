// 1.1 Is Unique
// Implement an algorithm to determine if a string has all unique characters.
// What if you cannot use additional data structures?

function isUnique(string) {
    // with an additional data structure
    let letters = new Set();
    for (let i = 0; i < string.length; i++){
        if (letters.has(string[i])) {
            return false;
        }
        letters.add(string[i])
    }
    return true;
}

// console.log(isUnique("asdfbeowk"));

function isUniqueNoAdd(string) {
    // with no additional data structure
    for (let i = 1; i < string.length; i++){
        if (string.slice(0, i).includes(string[i])) return false;
    }
    return true;
}

// console.log(isUniqueNoAdd("asdfbeowk"));

// 1.2 Check Permutation
// Given two strings, write a method to decide if one is a permutation of the other.

function checkPermutation(string1, string2) {
    if (string1.length !== string2.length) return false;
    let letters = {};
    for (let i = 0; i < string1.length; i++) {
        if (!letters[string1[i]]) {
            letters[string1[i]] = 1;
        } else {
            letters[string1[i]]++;
        }
    }

    for (let j = 0; j < string2.length; j++) {
        if (string2[j] in letters === false) return false;
        letters[string2[j]]--;
        if (!letters[string2[j]]) delete letters[string2[j]];
    }

    return !Object.keys(letters).length;
}

// console.log(checkPermutation("acdeaaib", "abeadica"))

// 1.3 URLify
// Write a method to replace all spaces in a string with '%20'. You may assume that the string has 
// sufficient space at the end to hold the additional characters, and that you are given the
//  "true" length of the string.

function URLify(string, length) {
    // The solution below works, but not in constant space. 
    // Not sure what a in place, constant space JavaScript solution would look like. 

    let characters = string.slice(0, length).split("");
    characters = characters.map( char => {
        if (char === " ") return "%20";
        return char;
    })
    return characters.join("");
}

console.log(URLify("Mr John Smith      ", 13));
