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

// console.log(URLify("Mr John Smith      ", 13));

// 1.4 Palindrome Permutation
// Given a string, write a function to check if it is a permutation of a palindrome. 
// A palindrome is a word or phrase that is the same forwards and backwards. 
// A permutation is a rearrangement of letters. The palindrome does not need 
// to be limited to just dictionary words. 

function palindromePerm(string) {
    const check = new Set();
    for (let i = 0; i < string.length; i++) {
        char = string[i].toLowerCase();
        if (char === " ") continue;
        if (!check.has(char)) {
            check.add(char);
        } else {
            check.delete(char);
        }
    }
    return check.size === 1;
}

// console.log(palindromePerm("Tact Coa"));

// 1.5 One Away
// There are three types of edits that can be performed on strings: insert a character, 
// remove a character, or replace a character. Given two strings, write a function to 
// check if they are one edit(or zero edits) away. 

function oneAway(string1, string2) {
    if (string1 === string2) return true;
    for (let i = 0; i < string1.length; i++) {
        const check1 = string1.slice(0, i) + string1.slice(i + 1);
        const check2 = string2.slice(0, i) + string2.slice(i + 1);
        if (check1 === string2 || check2 === string1 || check1 === check2) return true;
    }
    return false;
}

// console.log(oneAway("pale", "ple")) // true
// console.log(oneAway("pales", "pale")) // true
// console.log(oneAway("pale", "bale")) // true
// console.log(oneAway("pale", "bake")) // false
// console.log(oneAway("pale", "leap")) // false
