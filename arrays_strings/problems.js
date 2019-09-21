// 1.1 Is Unique
// Implement an algorithm to determine if a string has all unique characters.
// What if you cannot use additional data structures?

function isUnique(string){
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

console.log(isUnique("asdfbeowk"));

function isUniqueNoAdd(string) {
    // with no additional data structure
    for (let i = 1; i < string.length; i++){
        if (string.slice(0, i).includes(string[i])) return false;
    }
    return true;
}

console.log(isUniqueNoAdd("asdfbeowk"));