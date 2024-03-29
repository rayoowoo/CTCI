// import { Node, LinkedList } from './data_structures.js';
class Node {
    constructor(val) {
        this.value = val;
        this.next = null;
    }

}
// TODO: Implement a Singly Linked List class here
class LinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
        this.length = 0;
    }

    includes(targetNode) {
        let node = this.head;
        while(node) {
            if (node === targetNode) {
                return true;
            }
            node = node.next;
        }
        return false;
    }

    print() {
        let node = this.head;
        const result = [];
        while (node) {
            result.push(node.value);
            node = node.next;
        }
        return result;
    }

    removeNode(node, parent) {
        if (!parent) return this.removeHead()
        parent.next = node.next;
        node.next = null;
        return node;
    }

    // TODO: Implement the addToTail method here
    addToTail(val) {
        const newNode = new Node(val);
        if (this.tail) {
            this.tail.next = newNode;
        } if (!this.head) {
            this.head = newNode;
        }
        this.tail = newNode;
        this.length += 1;
        return this;
    }

    // TODO: Implement the removeTail method here
    removeTail() {
        if (this.length) {
            const tail = this.tail;
            if (this.length === 1) {
                this.head = null;
                this.tail = null;
            } else {
                let node = this.head;
                while (node.next !== this.tail) {
                    node = node.next;
                }
                node.next = null;
                this.tail = node;
            }
            this.length -= 1;
            return tail;
        }
    }

    // TODO: Implement the addToHead method here
    addToHead(val) {
        const newNode = new Node(val);
        if (this.length === 0) {
            this.tail = newNode;
        } else {
            newNode.next = this.head;
        }
        this.head = newNode;
        this.length += 1;
        return this;
    }

    // TODO: Implement the removeHead method here
    removeHead() {
        if (this.length) {
            const head = this.head;
            if (this.length === 1) {
                this.tail = null;
                this.head = null;
            } else {
                this.head = this.head.next;
            }
            this.length -= 1;
            return head;
        }
    }

    // TODO: Implement the contains method here
    contains(target) {
        let node = this.head;
        let result = false;
        for (let i = 0; i < this.length; i++) {
            if (node.value === target) {
                result = true;
                break;
            }
            node = node.next;
        }
        return result;
    }

    // TODO: Implement the get method here
    get(index) {
        if (index > this.length - 1 || index < 0) return null;
        let node = this.head;
        for (let i = 0; i < index; i++) {
            node = node.next;
        }
        return node;
    }

    // TODO: Implement the set method here
    set(index, val) {
        if (index > this.length - 1) return false;

        const prevNode = this.get(index - 1);
        const node = prevNode.next;

        node.value = val;
        return true;

    }

    // TODO: Implement the insert method here
    insert(index, val) {
        if (index > this.length - 1) return false;

        if (index === 0) {
            this.addToHead(val);
            return true;
        }

        const newNode = new Node(val);
        const prevNode = this.get(index - 1);
        const node = prevNode.next;

        newNode.next = node;
        prevNode.next = newNode;
        this.length += 1;
        return true;
    }

    // TODO: Implement the remove method here
    remove(index) {
        if (index <= this.length - 1) {
            if (index === 0) {
                return this.removeHead();
            } if (index === this.length - 1) {
                return this.removeTail();
            }
            const prevNode = this.get(index - 1);
            const node = prevNode.next;
            const nextNode = node.next;

            prevNode.next = nextNode;
            this.length -= 1;
            return node;
        }
    }

    // TODO: Implement the size method here
    size() {
        return this.length;
    }
}

// example linked list
const list = new LinkedList();
list.addToTail("a");
list.addToTail("b");
list.addToTail("a");
list.addToTail("c");
list.addToTail("a");
list.addToTail("d");
list.addToTail("e");
list.addToTail("b");
list.addToTail("e");

const nums = new LinkedList();
nums.addToTail(3);
nums.addToTail(5);
nums.addToTail(8);
nums.addToTail(5);
nums.addToTail(10);
nums.addToTail(2);
nums.addToTail(1);

// 2.1 Remove dups
// Write code to remove duplicates from an unsorted linked list.

function removeDups(linkedList) {
    let tracker = new Set();
    let prev = null;
    let node = linkedList.head;
    while (node) {
        if (tracker.has(node.value)) {
            const next = node.next;
            node.next = null;
            prev.next = next;
            node = next;
            linkedList.length--;
        } else {
            tracker.add(node.value);
            prev = node;
            node = node.next;
        }
    }
    return linkedList;
}

// console.log(removeDups(list).print());

// 2.2 Return Kth to Last

// Implement an algorithm to find the kth to last element of a singly linked list.

function kthToLastWithLength(linkedList, k) {
    let index = linkedList.size() - k;
    let node = linkedList.head;
    while (index) {
        node = node.next;
        index--;
    }
    return node;
}

// console.log(kthToLastWithLength(list, 2));

function kthToLastWithoutLength(linkedList, k ) {
    const nodes = [];
    let node = linkedList.head;
    while (node) {
        nodes.push(node);
        node = node.next;
    }
    return nodes[nodes.length - k];
}

// console.log(kthToLastWithoutLength(list, 2));

// 2.3 Delete Middle Node
// Implement an algorithm to delete a node in the middle (i.e.any node but the first and last node,
// not necessarily the exact middle) of a singly linked list, given only access to that node.

// function deleteMiddleNode(linkedList, node) {
//     let check = linkedList.head;
//     while (check.next !== node) {
//         check = check.next;
//     }
//     check.next = node.next;
//     node.next = null;
// }

function deleteMiddleNode(node) {
    const next = node.next;
    node.value = next.value;
    node.next = next.next;
    next.next = null;

}

// console.log(list.print());
// console.log(deleteMiddleNode(list, list.head.next.next.next.next));
// console.log(list.print());

// 2.4 Partition
// Write code to partition a linked list around a value x, such that all nodes less than x come
// before all nodes greater than or equal to x. If x is contained within the list, the values of
// x only need to be after the elements less than x. The partition element x can appear anywhere in 
// the "right partition"; it does not need to appear between the left and right partitions.

function partition(linkedList, part) {
    const tail = linkedList.tail;
    let node = linkedList.head;
    let parent = null;
    let tailYet = false;
    while (!tailYet) {
        const next = node.next;
        if (node === tail) tailYet = true;
        const target = linkedList.removeNode(node, parent);
        if (target.value < part) {
            linkedList.addToHead(target.value);
            if (!parent) parent = linkedList.head;
        } else {
            linkedList.addToTail(target.value);
        }
        node = next;
    }
    return linkedList;
}


// console.log(nums.print())
// console.log(partition(nums, 5).print())

// 2.5 Sum Lists
// You have two numbers represented by a linked list, where each node contains a single digit. 
// The digits are stored in reverse order, such that the 1's digit is at the head of the list. 
// Write a function that adds the two numbers and returns the sum as a linked list.

const nums1 = new LinkedList();
nums1.addToTail(5);
nums1.addToTail(1);
nums1.addToTail(2);

const nums2 = new LinkedList();
nums2.addToTail(5);
nums2.addToTail(4);
nums2.addToTail(1);

function sumLists(list1, list2) {
    const newList = new LinkedList();
    function _sums(node1, node2, carry=0) {
        if (!node1 && !node2) return null;
        let val1 = val2 = 0;
        let next1 = next2 = null;
        if (node1) {
            val1 = node1.value;
            next1 = node1.next;
        }
        if (node2) {
            val2 = node2.value;
            next2 = node2.next;
        }
        let totalVal = val1 + val2 + carry;
        carry = 0;

        if (totalVal >= 10) {
            totalVal -= 10;
            carry = 1;
        }

        newList.addToTail(totalVal);
        const newTail = newList.tail;
        newTail.next = _sums(next1, next2, carry);
        return newTail;
    }

    _sums(list1.head, list2.head)
    return newList;
}

// console.log(sumLists(nums1, nums2).print())


// 2.6 Palindromes
// Implement a function to check if a linked list is a palindrome.

const test = new LinkedList();
test.addToTail("a");
test.addToTail("b");
test.addToTail("d");
test.addToTail("b");
test.addToTail("a");

function palindrome(linkedList) {
    const arr = [];
    let node = linkedList.head;
    while (node) {
        arr.push(node.value);
        node = node.next;
    }
    for (let i = 0; i < Math.floor(arr.length); i++) {
        if (arr[i] !== arr[arr.length - 1 - i]) return false;
    }
    return true;
}

// console.log(palindrome(list));
// console.log(palindrome(nums));
// console.log(palindrome(test));

// 2.7 Intersection
// Given two (singly) linked lists, determine if the two lists intersect. Return the 
// intersection node. Note that the intersection is defined based on reference, not value. 
// That is, if the kth node of the first linked list is the exact same node (by reference) 
// as the jth node of the second linked list, then they are intersecting.

function intersection(list1, list2) {
    let node = list1.head;
    while (node) {
        if (list2.includes(node)) return node;
        node = node.next;
    }
    return node;
}

// const a = new Node("a");
// const b = new Node("b");
// const c = new Node("c");
// const d = new Node("d");
// const e = new Node("e");
// const f = new Node("f");

// a.next = b;
// b.next = c;
// c.next = d;
// e.next = d;
// d.next = f;

// const list1 = new LinkedList();
// const list2 = new LinkedList();
// list1.head = a;
// list1.tail = f;
// list2.head = e;
// list2.tail = f;

// console.log(list2.includes(e));
// console.log(intersection(list1, list2));

// 2.8 Loop Detection
// Given a circular linked list, implement an algorithm that returns the node at the beginning 
// of the loop. (corrupted linked list)

function loopDetection(linkedList) {
    let node = linkedList.head;
    let visited = new Set();
    while (node) {
        if (visited.has(node)) return node;
        visited.add(node);
        node = node.next;
    }
    return null;
}

// const a = new Node("a");
// const b = new Node("b");
// const c = new Node("c");
// const d = new Node("d");
// const e = new Node("e");
// const f = new Node("f");

// a.next = b;
// b.next = c;
// c.next = d;
// d.next = e;
// e.next = d;

// const corrupt = new LinkedList();
// corrupt.head = a;

// console.log(loopDetection(corrupt));


