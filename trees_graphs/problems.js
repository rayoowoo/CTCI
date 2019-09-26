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

// 4.7 Build Order
// You are given a list of projects and a list of dependencies (which is a list of pairs of projects, 
// where the second project is dependent on the first project). All of a project's dependencies must be 
// built before the project is. Find a build order that will allow the projects to be built. If there is 
// no valid build order, return an error. 

const proj = ["a", "b", "c", "d", "e", "f"];
const deps = [["a", "d"], ["f", "b"], ["b", "d"], ["f", "a"], ["d", "c"]]

function buildOrder(projects, dependencies) {
    const depList = {};
    const order = [];
    const done = new Set();

    dependencies.forEach( pair => {
        if (depList[pair[1]]) {
            depList[pair[1]].push(pair[0]);
        } else {
            depList[pair[1]] = [pair[0]];
        }
    })

    projects.forEach( project => {
        if (!depList[project]) {
            depList[project] = [];
            order.push(project);
            done.add(project);
        }
    })

    console.log("order", order);
    console.log("dep", depList);
    
    let stuck = false;
    while (!stuck && order.length < projects.length) {
        const currLength = order.length;
        projects.forEach(project => {
            if (done.has(project)) return;
            if (depList[project].every(el => done.has(el))) {
                order.push(project);
                done.add(project);
            }
        })
        if (currLength === order.length) stuck = true;
    }

    if (stuck) return "error";
    return order;
}

// console.log(buildOrder(proj, deps));

// 4.8 First Common Ancestor
// Design an algorithm and write code to find the first common ancestor of two nodes in a binary tree.
// Avoid storing additional nodes in a data structure.NOTE: This is not necessarily a binary search tree.

// with added DSA
function firstCommonAncestorWithDSA(tree, node1, node2) {
    
    
    const queue = [tree];
    let firstRoot;

    while (queue.length) {
        const check = queue.shift();
        if (_checkTree(check)) firstRoot = check;
        if (check.left) queue.push(check.left);
        if (check.right) queue.push(check.right);
    }

    function _checkTree(tree) {
        if (!tree) return false;
        let found1 = false;
        let found2 = false;
        const nodes = [tree]; //queue
        while (nodes.length) {
            const node = nodes.shift();
            if (node.val === node1.val) found1 = true;
            if (node.val === node2.val) found2 = true;
            if (node.left) nodes.push(node.left);
            if (node.right) nodes.push(node.right);
        }
        return found1 && found2;
    }

    return firstRoot;
}



function dfs(tree, value1, value2) {
    function _traversal(tree, value1, value2) {
        if (!tree) return [0, 0];
        if (tree.val === value1 && tree.val === value2) return [1, 1];
        if (tree.val === value1) return [1, 0];
        if (tree.val === value2) return [0, 1];
        const left = _traversal(tree.left, value1, value2);
        const right = _traversal(tree.right, value1, value2);
        return [left[0] + right[0], left[1] + right[1]];
    }
    const result = _traversal(tree, value1, value2);
    if (result[0] + result[1] === 2) return true;
    return false;
}

function firstCommonAncestor(tree, node1, node2) {
    let firstRoot = null;
    
    function _loop (tree, node1, node2) {
        const result = dfs(tree, node1.val, node2.val);
        if (result) firstRoot = tree;
        if (tree.left) _loop(tree.left, node1, node2);
        if (tree.right) _loop(tree.right, node1, node2);
    }

    _loop(tree, node1, node2);
    return firstRoot;
}

class TreeNode {
    constructor(val) {
        this.val = val;
        this.left = null;
        this.right = null;
    }
}

const a = new TreeNode("a");
const b = new TreeNode("b");
const c = new TreeNode("c");
const d = new TreeNode("d");
const e = new TreeNode("e");
const f = new TreeNode("f");
const g = new TreeNode("g");
const h = new TreeNode("h");
const i = new TreeNode("i");
const j = new TreeNode("j");
const k = new TreeNode("k");
const l = new TreeNode("l");
const m = new TreeNode("m");
const n = new TreeNode("n");
const o = new TreeNode("o");

a.left = b;
a.right = c;
b.left = d;
b.right = e;
c.left = f;
c.right = g;
d.left = h;
d.right = i;
e.left = j;
e.right = k;
f.left = l;
f.right = m;
g.left = n;
g.right = o;

// console.log(firstCommonAncestor(a, d, e).val)

// 4.9 BST Sequence
// A binary search tree was created by traversing through an array from left to right and inserting each element.
// Given a binary search tree with distinct elements, print all possible arrays that could have led to this tree. 


function bstSequence(tree) {
    if (!tree) return [[]];
    const arrays = [];
    const left = bstSequence(tree.left);
    const right = bstSequence(tree.right);
    // if (!left.length && right.length) {
    //     arrays.push(right);
    // } else if (!right.length && left.length ) {
    //     arrays.push(left);
    if (!tree.left && !tree.right) {
        arrays.push([tree.val]);
    } else {
        left.forEach(subArr1 => {
            right.forEach(subArr2 => {
                arrays.push([tree.val].concat(subArr1.concat(subArr2)));
                arrays.push([tree.val].concat(subArr2.concat(subArr1)));

            })
        })
    }
    return arrays;
}

// console.log(bstSequence(a))

// 4.10 Check Subtree
// T1 and T2 are two very large binary trees, with T1 much bigger than T2. Create an algorithm to determine if T2
// is a subtree of T1.

// A tree T2 is a subtree of T1 if there exists a node n in T1 such that the subtree of n is identical to T2.That is,
// if you cut off the tree at node n, the two trees would be identical.

function checkSubtree(tree1, tree2) {
    if (!tree1 && !tree2) return true;
    if ((!tree1 && !!tree2) || (!!tree1 && !tree2)) return false;
    const queue = [tree1];
    while (queue.length) {
        const check = queue.shift();
        if (check.val === tree2.val) {
            return checkSubtree(check.left, tree2.left) && checkSubtree(check.right, tree2.right);
        } else {
            if (check.left) queue.push(check.left);
            if (check.right) queue.push(check.right);
        }
    }
    return false;
}

console.log(checkSubtree(b, f));