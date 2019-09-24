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

// 3.2 Stack Min
// How would you design a stack which, in addition to push and pop, has a function min which returns 
// the minimum element ? Push, pop, and min should all operate in O(1) time ?

// First, the stack needs to have a variable that keeps track of the minimum value node. Then I would 
// need to update the pushing and popping logic.Every time I push, I need to check if what I'm pushing 
// is smaller than the current minimum. If so, it needs to update. Also for popping, I need to check if
// what I'm popping is the smallest.If it is, I need to reassign to the next smallest value.

class Node {
    constructor({ value }) {
        this.value = value;
        this.next = null;
    }
}

class Stack {
    constructor() {
        this.top = null;
        this.bottom = null;
        this.length = 0;
        this.min = Infinity;
    }

    min() {
        return this.min;
    }

    getMin() {
        let min = Infinity;
        let node = this.top;
        while(node) {
            if (node.value < min) {
                min = node.value;
            }
            node = node.next;
        }
        return min;
    }

    size() {
        return this.length;
    }

    push(value) {
        const newNode = new Node({ value });
        if (!this.bottom) {
            this.bottom = newNode;
            this.top = newNode;
        } else {
            newNode.next = this.top;
            this.top = newNode;
        }
        if (this.min > newNode.value) {
            this.min = newNode.value;
        }
        this.length += 1;
        return this.size();
    }

    pop() {
        if (!this.size()) return null;
        let node = this.top;
        if (this.size() === 1) {
            this.bottom = null;
            this.top = null;
        } else {
            this.top = this.top.next;
        }
        if (this.min > node.value) {
            this.min = this.getMin();
        }

        this.length -= 1;
        return node.value;
    }




}

// 3.3 Stack of Plates
class SetOfStacks {
    constructor(size) {
        this.stacks = [];
        this.capacity = size;
    }

    push(val) {
        if (!this.stacks.length || this.stacks[this.stacks.length - 1].length === this.capacity) {
            const newStack = new Stack();
            this.stacks.push(newStack);
        }
        this.stacks[this.stacks.length - 1].push(val);
    }

    pop() {
        this.stacks[this.stacks.length - 1].pop();
        if (!this.stacks[this.stacks.length - 1].length) {
            this.stacks = this.stacks.slice(0, [this.stacks.length - 1]);
        }
    }
}

const set = new SetOfStacks(2);
set.push(1);
set.push(2);
set.push(3);
set.push(4);

set.pop();
set.pop();

set.push(5);

console.log(set.stacks);