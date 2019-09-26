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

console.log(routeBetweenNodes(sample, "a", "c"))