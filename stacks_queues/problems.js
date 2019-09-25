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

    print() {
        let node = this.top;
        let arr = [];
        while (node) {
            arr.push(node.value);
            node = node.next;
        }
        return arr;
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

    peek() {
        return this.top;
    }

    isEmpty() {
        return !this.length;
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

// const set = new SetOfStacks(2);
// set.push(1);
// set.push(2);
// set.push(3);
// set.push(4);

// set.pop();
// set.pop();

// set.push(5);

// console.log(set.stacks);

// 3.5 Sort Stack
// Write a program to sort a stack such that the smallest items are on the top. You can use an
// additional temporary stack, but you may not copy the elements into any other data structure
// (such as an array).The stack supports the following operations: push, pop, peek, and isEmpty.

function swapTops(stack1, stack2) {
    const firstPop = stack1.pop();
    const secondPop = stack2.pop();
    stack2.push(firstPop);
    stack1.push(secondPop);
}

function sortStack(stack) {
    const newStack = new Stack();
    newStack.push(stack.pop());
    while (!stack.isEmpty()) {
        newStack.push(stack.pop());
        let loop = false;
        if (newStack.top.next) {
            if (newStack.top.value > newStack.top.next.value) loop = true;
        }
        while (loop) {
            loop = false;
            stack.push(newStack.pop());
            swapTops(stack, newStack);
            if (newStack.top.next) {
                if (newStack.top.value > newStack.top.next.value) loop = true;
            }
        }
    }
    return newStack;
}

// const stack = new Stack();

// stack.push(5);
// stack.push(3);
// stack.push(4);
// stack.push(2);
// stack.push(9);
// stack.push(8);
// stack.push(7);
// stack.push(1);

// console.log(stack.print());
// console.log(sortStack(stack).print());

// 3.6 Animal Shelter
// An animal shelter, which holds only dogs and cats, operates on a strictly "first in, first out" basis.
// People must adopt either the "oldest" (based on arrival time) of all animals at the shelter, or they 
// can select whether they would prefer a dog or a cat (and will receive the oldest animal of that type).
// They cannot select which specific animal they would like. Create the data structures to maintain this 
// system and implement operations such as enqueue, dequeueAny, dequeueDog, and dequeueCat. You may use
// the build-in LinkedList data structure. 

class Dog {
    constructor(name) {
        this.name = name;
        this.next = null;
    }
}

class Cat {
    constructor(name) {
        this.name = name;
        this.next = null;
    }
}

class AnimalShelter {
    constructor() {
        this.cats = [];
        this.dogs = [];
        this.animals = [];
    }

    enqueue(animal) {
        if (animal instanceof Dog) {
            this.dogs.push(animal);
        } else if (animal instanceof Cat) {
            this.cats.push(animal);
        }
        this.animals.push(animal);
    }

    dequeueAny() {
        const animal = this.animals.shift();
        if (animal instanceof Dog) {
            this.dogs.shift();
        } else {
            this.cats.shift();
        }
    }

    dequeueDog() {
        const dog = this.dogs.shift();
        const index = this.animals.indexOf(dog);
        this.animals = this.animals.slice(0, index).concat(this.animals.slice(index + 1));
    }

    dequeueCat() {
        const cat = this.cats.shift();
        const index = this.animals.indexOf(cat);
        this.animals = this.animals.slice(0, index).concat(this.animals.slice(index + 1));
    }

    print() {
        console.log(this.animals);
    }
}

// const dog1 = new Dog("joe");
// const dog2 = new Dog("freeman");
// const dog3 = new Dog("kokubun");
// const dog4 = new Dog("tunggal");

// const cat1 = new Cat("caleb");
// const cat2 = new Cat("sam");

// const shelter = new AnimalShelter();

// shelter.enqueue(dog1);
// shelter.enqueue(dog2);
// shelter.enqueue(cat1);
// shelter.enqueue(dog3);
// shelter.enqueue(dog4);
// shelter.enqueue(cat2);

// shelter.print();
// console.log("-----");

// shelter.dequeueDog();
// shelter.print();
// console.log("-----");