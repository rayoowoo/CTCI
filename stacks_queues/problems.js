// 3.1 Three in One
// Describe how you could use a single array to implement three stacks.

// The first stack would be the normal stack, pushing and popping elements.
// The second stack would be the reverse stack, shifting and unshifting elements.
// The third stack would be a combination, alternating pushing and unshifting, popping and shifting.
// If the length of the array is even, you push/shift. If odd, you unshift/pop.

// [1, 2, 3, 4, 5]
// bottom 1, 2, 3, 4, 5 top
// bottom 5, 4, 3, 2, 1 top
// bottom 3, 2, 4, 1, 5 top