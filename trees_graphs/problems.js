let sample = {
    'a': ['b', 'c', 'e'],
    'b': [],
    'c': ['b', 'd'],
    'd': [],
    'e': ['a'],
    'f': ['e']
};


// 4.1 Route Between Nodes
// Given a directed graph, design an algorithm to find out whether there is a route between two nodes.
let visited = new Set();

function routeBetweenNodes(graph, node1, node2) {
    if (node1 === node2) return true;
    console.log(graph[node1]);
    visited.add(node1);
    if (graph[node1].length) {
        if (graph[node1].includes(node2)) return true;
        for (let i = 0; i < graph[node1].length; i++) {
            if (visited.has(graph[node1][i])) {
                continue;
            }
            visited.add(graph[node1][i]);
           if (routeBetweenNodes(graph, graph[node1][i], node2)) {
               return true;
           }
        }
    } 
    return false;
}

// console.log(routeBetweenNodes(sample, "a", "c"))

// 4.3 List of Depths
// Given a binary tree, design an algorithm which creates a linked list of all the nodes at each 
// depth (e.g.if you have a tree with depth D, you'll have D linked lists).

function listDepths(tree) {
    const nodes = [];
    const queue = [tree];
    while (queue.length) {
        nodes.push(queue.shift().value);
        if (tree.left) {
            queue.push(tree.left);
        }
        if (tree.right) queue.push(tree.right);
    }

    const lists = [];

    for (let i = 0; i < depth; i++) {
        const newNode = new Node(nodes.shift());
        let node = newNode;
        for (let j = 1; j < 2**i; j++) {
            if (!nodes.length) {
                break;
            }
            node.next = new Node(nodes.shift());
        }
        lists.push(newNode);
        if (!nodes.length) {
            break;
        }
    }

    return lists;
}

// 4.5 Validate BST
// Implement a function to check if a binary tree is a binary search tree.

// The tree is a binary search tree if the inorder tree traversal is sorted correctly.

// 4.6 Successor
// Write an algorithm to find the "next" node (i.e. in-order successor) of a given node in a 
// binary search tree. You may assume that each node has a link to its parent.

function successor(node) {
    let parent = node.parent;
    if (!parent) return node.right; // node is the root node
    if (node === parent.left) {
        if (parent.right) return parent.right;
        return null;
    }

    while (node === parent.right) { // go up the tree until we find a node that its parent's left node
        [node, parent] = [parent, parent.parent];
    }

    if (!parent) return null; // only if we reach the root node, in which case the original node is the last
    if (parent.right) return right; // if we find a node in which it is its parent's left, we want the parent's right
    return null; // catch all
}