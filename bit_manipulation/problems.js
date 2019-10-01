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