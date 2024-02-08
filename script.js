let storedGraphs = [];

function primsAlgorithm(graph) {
    if (graph.nodes(':selected').length != 1) {
        alert('Please select a starting node');
        return;
    }

    let edgeQueue = graph.collection();
    let visitedEdges = graph.collection();
    let unvisitedNodes = graph.nodes();

    let currNode = graph.nodes(':selected');
    unvisitedNodes = unvisitedNodes.difference(currNode);
    currNode.style('background-color', 'blue');


    let i = 0;
    while (!unvisitedNodes.empty()) {
        i++;

        // Adding adjacent edges to edgeQueue and sorting edgeQueue by weight
        const adjacentEdges = currNode.connectedEdges().filter(edge => !visitedEdges.contains(edge) && (unvisitedNodes.contains(edge.source()) != unvisitedNodes.contains(edge.target())));
        edgeQueue = edgeQueue.union(adjacentEdges);
        edgeQueue = edgeQueue.sort(function(a, b) {
            return a.data('weight') - b.data('weight')
        });

        // Choosing edge
        let nextEdge = null;
        while (nextEdge == null) {
            const edge = edgeQueue[0];
            if (unvisitedNodes.contains(edge.source()) || unvisitedNodes.contains(edge.target())) {
                nextEdge = edge;
                break;
            }
            edgeQueue = edgeQueue.difference(edge);
        }
        visitedEdges = visitedEdges.union(nextEdge);
        setTimeout(() => {
            nextEdge.animate({
                style: {'line-color': 'blue'},
                duration: 1000
            });
        }, 2000 * (i + 1));
        
        // Getting next node edge will take us to
        let nextNode = null;
        if (unvisitedNodes.contains(nextEdge.source())) {
            nextNode = nextEdge.source();
        }
        else {
            nextNode = nextEdge.target();
        }
        unvisitedNodes = unvisitedNodes.difference(nextNode);
        setTimeout(() => {
            nextNode.animate({
                style: {'background-color': 'blue'},
                duration: 1000
            });
        }, 2000 * (i + 1));
        currNode = nextNode;
    }
    console.log("PRIMS COMPLETED!!!");
}

function primsAlgorithmQuick(graph) {
    if (graph.nodes(':selected').length != 1) {
        alert('Please select a starting node');
        return;
    }

    let edgeQueue = graph.collection();
    let visitedEdges = graph.collection();
    let unvisitedNodes = graph.nodes();

    let currNode = graph.nodes(':selected');
    unvisitedNodes = unvisitedNodes.difference(currNode);
    currNode.style('background-color', 'blue');


    while (!unvisitedNodes.empty()) {

        // Adding adjacent edges to edgeQueue and sorting edgeQueue by weight
        const adjacentEdges = currNode.connectedEdges().filter(edge => !visitedEdges.contains(edge) && (unvisitedNodes.contains(edge.source()) != unvisitedNodes.contains(edge.target())));
        edgeQueue = edgeQueue.union(adjacentEdges);
        edgeQueue = edgeQueue.sort(function(a, b) {
            return a.data('weight') - b.data('weight')
        });

        // Choosing edge
        let nextEdge = null;
        while (nextEdge == null) {
            const edge = edgeQueue[0];
            if (unvisitedNodes.contains(edge.source()) || unvisitedNodes.contains(edge.target())) {
                nextEdge = edge;
                break;
            }
            edgeQueue = edgeQueue.difference(edge);
        }
        visitedEdges = visitedEdges.union(nextEdge);
        nextEdge.style('line-color', 'blue');
        
        // Getting next node edge will take us to
        let nextNode = null;
        if (unvisitedNodes.contains(nextEdge.source())) {
            nextNode = nextEdge.source();
        }
        else {
            nextNode = nextEdge.target();
        }
        unvisitedNodes = unvisitedNodes.difference(nextNode);
        nextNode.style('background-color', 'blue')
        currNode = nextNode;
    }
    console.log("PRIMS QUICK COMPLETED!!!");
}

function kruskalsAlgorithm(graph) {
    let unvisitedNodes = graph.nodes();
    const targetEdgeCount = unvisitedNodes.length - 1;
    let edgeCount = 0;

    // For each node:
    // Key = node id and value = collection of nodes the key node is in
    let groupDict = {};
    unvisitedNodes.forEach(node => {
        const nodeId = node.data('id');
        groupDict[nodeId] = graph.collection();
        groupDict[nodeId] = groupDict[nodeId].union(node);
    });

    // Sorting edge queue by weight
    let edgeQueue = graph.edges();
    edgeQueue = edgeQueue.sort(function(a, b) {
        return a.data('weight') - b.data('weight')
    });
    
    let i = 0;
    while (edgeCount < targetEdgeCount) {
        i++;

        // Choosing edge
        let nextEdge = null;
        while (nextEdge == null) {
            const edge = edgeQueue[0];
            const sourceId = edge.source().data('id');
            const targetId = edge.target().data('id');
            if (groupDict[sourceId].intersection(groupDict[targetId]).empty()) {
                nextEdge = edge;
                edgeCount++;
                groupDict[sourceId] = groupDict[sourceId].union(groupDict[targetId]);
                groupDict[sourceId].forEach(function(node) {
                    groupDict[node.data('id')] = groupDict[sourceId];
                });

                break;
            }
            edgeQueue = edgeQueue.difference(edge);
        }
        setTimeout(() => {
            nextEdge.animate({
                style: {'line-color': 'blue'},
                duration: 1000
            });
        }, 2000 * (i + 1));
        
        // Getting source and target nodes of edge
        const sourceNode = nextEdge.source();
        const targetNode = nextEdge.target();
        if (unvisitedNodes.contains(sourceNode)) {
            unvisitedNodes = unvisitedNodes.difference(sourceNode);

            setTimeout(() => {
                sourceNode.animate({
                    style: {'background-color': 'blue'},
                    duration: 1000
                });
            }, 2000 * (i + 1));
        }
        if (unvisitedNodes.contains(targetNode)) {
            unvisitedNodes = unvisitedNodes.difference(targetNode);

            setTimeout(() => {
                targetNode.animate({
                    style: {'background-color': 'blue'},
                    duration: 1000
                });
            }, 2000 * (i + 1));
        }
    }
    console.log("KRUSKALS COMPLETED!!!");
}

function kruskalsAlgorithmQuick(graph) {
    let unvisitedNodes = graph.nodes();
    const targetEdgeCount = unvisitedNodes.length - 1;
    let edgeCount = 0;

    // For each node:
    // Key = node id and value = collection of nodes the key node is in
    let groupDict = {};
    unvisitedNodes.forEach(node => {
        const nodeId = node.data('id');
        groupDict[nodeId] = graph.collection();
        groupDict[nodeId] = groupDict[nodeId].union(node);
    });

    // Sorting edge queue by weight
    let edgeQueue = graph.edges();
    edgeQueue = edgeQueue.sort(function(a, b) {
        return a.data('weight') - b.data('weight')
    });
    
    while (edgeCount < targetEdgeCount) {
        // Choosing edge
        let nextEdge = null;
        while (nextEdge == null) {
            const edge = edgeQueue[0];
            const sourceId = edge.source().data('id');
            const targetId = edge.target().data('id');
            if (groupDict[sourceId].intersection(groupDict[targetId]).empty()) {
                nextEdge = edge;
                edgeCount++;
                groupDict[sourceId] = groupDict[sourceId].union(groupDict[targetId]);
                groupDict[sourceId].forEach(function(node) {
                    groupDict[node.data('id')] = groupDict[sourceId];
                });

                break;
            }
            edgeQueue = edgeQueue.difference(edge);
        }
        nextEdge.style('line-color', 'blue');
        
        // Getting source and target nodes of edge
        const sourceNode = nextEdge.source();
        const targetNode = nextEdge.target();
        if (unvisitedNodes.contains(sourceNode)) {
            unvisitedNodes = unvisitedNodes.difference(sourceNode);

            sourceNode.style('background-color', 'blue');
        }
        if (unvisitedNodes.contains(targetNode)) {
            unvisitedNodes = unvisitedNodes.difference(targetNode);

            targetNode.style('background-color', 'blue');
        }
    }
    console.log("KRUSKALS COMPLETED!!!");
}

function boruvkasAlgorithm(graph) {
    let unvisitedNodes = graph.nodes();
    const targetEdgeCount = unvisitedNodes.length - 1;
    let edgeCount = 0;

    let groupDict = {};
    unvisitedNodes.forEach(node => {
        const nodeId = node.data('id');
        groupDict[nodeId] = graph.collection();
        groupDict[nodeId] = groupDict[nodeId].union(node);
    });

    let nodeColours = {};
    unvisitedNodes.forEach(node => {
        nodeColours[node.data('id')] = node.style('background-color');
    });

    let i = 0;
    while(edgeCount < targetEdgeCount) {
        let visited = graph.collection();
        for (let key in groupDict) {
            i++;

            if (edgeCount >= targetEdgeCount) {
                break;
            }
            if (visited.contains(graph.nodes(`#${key}`))) {
                continue;
            }

            // console.log("-----------------------");

            // console.log("Visited nodes:");
            // visited.forEach(node => {
            //     console.log(node.data('id'));
            // })

            // console.log("------");

            // Object.keys(groupDict).forEach(nodeId => {
            //     console.log(`Node: ${nodeId}   Group: ${groupDict[nodeId].map(node => node.data('id'))}`);
            // })
            
            const collection = groupDict[key];

            // console.log("------");
            // collection.forEach(node => {
            //     console.log(`Node: ${node.data('id')}`);
            // });

            let possibleEdges = graph.collection();
            collection.forEach(node => {
                const adjacentEdges = node.connectedEdges().filter(edge => groupDict[edge.source().data('id')].intersection(groupDict[edge.target().data('id')]).empty());
                possibleEdges = possibleEdges.union(adjacentEdges);
            });
            const nextEdge = possibleEdges.min(function(edge) {
                return edge.data('weight');
            }).ele;

            // console.log(`Next edge: ${nextEdge.data('id')}   Weight: ${nextEdge.data('weight')}`);
            // console.log(`Source: ${nextEdge.source().data('id')}   Target: ${nextEdge.target().data('id')}`);

            edgeCount++;
            const sourceId = nextEdge.source().data('id');
            const targetId = nextEdge.target().data('id');
            let nodeWithBiggerCollection = sourceId;
            if (groupDict[targetId].length > groupDict[sourceId].length) {
                nodeWithBiggerCollection = targetId;
            }
            groupDict[sourceId] = groupDict[sourceId].union(nextEdge);
            groupDict[sourceId] = groupDict[sourceId].union(groupDict[targetId]);
            groupDict[sourceId].nodes().forEach(function(node) {
                groupDict[node.data('id')] = groupDict[sourceId];
            });
            visited = visited.union(groupDict[sourceId]);

            let colour = '';
            let sourceColour = nodeColours[sourceId];
            let targetColour = nodeColours[targetId];
            if (sourceColour == 'rgb(102,102,102)' && targetColour == 'rgb(102,102,102)') {
                colour = '#' + Math.floor(Math.random()*16777215).toString(16);
            }
            else if (sourceColour == 'rgb(102,102,102)') {
                colour = targetColour;
            }
            else if (targetColour == 'rgb(102,102,102)') {
                colour = sourceColour;
            }
            else {
                colour = nodeColours[nodeWithBiggerCollection];
            }

            // if (edgeCount == targetEdgeCount) {
            //     colour = 'blue';
            // }

            nodeColours[sourceId] = colour;
            nodeColours[targetId] = colour;

            groupDict[sourceId].forEach(function(elem) {
                if (elem.isNode()) {
                    nodeColours[elem.data('id')] = colour;
                    setTimeout(() => {
                        elem.animate({
                            style: {'background-color': `${colour}`},
                            duration: 1000
                        });
                    }, 2000 * (i + 1));
                }
                else {
                    setTimeout(() => {
                        elem.animate({
                            style: {'line-color': `${colour}`},
                            duration: 1000
                        });
                    }, 2000 * (i + 1));
                }
            });
            
            const sourceNode = graph.$(`#${sourceId}`);
            const targetNode = graph.$(`#${targetId}`);
            if (unvisitedNodes.contains(sourceNode)) {
                unvisitedNodes = unvisitedNodes.difference(sourceNode);
            }
            if (unvisitedNodes.contains(targetNode)) {
                unvisitedNodes = unvisitedNodes.difference(targetNode);
            }
        }
    }
    console.log("BORUVKAS COMPLETED!!!");
}

function boruvkasAlgorithmQuick(graph) {
    let unvisitedNodes = graph.nodes();
    const targetEdgeCount = unvisitedNodes.length - 1;
    let edgeCount = 0;

    let groupDict = {};
    unvisitedNodes.forEach(node => {
        const nodeId = node.data('id');
        groupDict[nodeId] = graph.collection();
        groupDict[nodeId] = groupDict[nodeId].union(node);
    });

    while(edgeCount < targetEdgeCount) {
        let visited = graph.collection();
        for (let key in groupDict) {
            if (edgeCount >= targetEdgeCount) {
                break;
            }
            if (visited.contains(graph.nodes(`#${key}`))) {
                continue;
            }
            
            const collection = groupDict[key];

            let possibleEdges = graph.collection();
            collection.forEach(node => {
                const adjacentEdges = node.connectedEdges().filter(edge => groupDict[edge.source().data('id')].intersection(groupDict[edge.target().data('id')]).empty());
                possibleEdges = possibleEdges.union(adjacentEdges);
            });
            const nextEdge = possibleEdges.min(function(edge) {
                return edge.data('weight');
            }).ele;

            edgeCount++;
            const sourceId = nextEdge.source().data('id');
            const targetId = nextEdge.target().data('id');
            groupDict[sourceId] = groupDict[sourceId].union(nextEdge);
            groupDict[sourceId] = groupDict[sourceId].union(groupDict[targetId]);
            groupDict[sourceId].nodes().forEach(function(node) {
                groupDict[node.data('id')] = groupDict[sourceId];
            });
            visited = visited.union(groupDict[sourceId]);

            groupDict[sourceId].forEach(function(elem) {
                if (elem.isNode()) {
                    elem.style('background-color', 'blue');
                }
                else {
                    elem.style('line-color', 'blue');
                }
            });
            
            const sourceNode = graph.$(`#${sourceId}`);
            const targetNode = graph.$(`#${targetId}`);
            if (unvisitedNodes.contains(sourceNode)) {
                unvisitedNodes = unvisitedNodes.difference(sourceNode);
            }
            if (unvisitedNodes.contains(targetNode)) {
                unvisitedNodes = unvisitedNodes.difference(targetNode);
            }
        }
    }
    console.log("BORUVKAS COMPLETED!!!");
}

// Creating initial graphs
// let cy1 = cytoscape({
//     container: document.getElementById('cy'), // container to render in

//     elements: [
//         // Nodes
//         {
//             data: { id : 'a' }
//         },
//         {
//             data: { id : 'b' }
//         },
//         {
//             data: { id : 'c' }
//         },
//         {
//             data: { id : 'd' }
//         },
//         {
//             data: { id : 'e' }
//         },
//         {
//             data: { id : 'f' }
//         },
//         // Edges
//         {
//             data: {
//                 id: 'ab',
//                 source: 'a',
//                 target: 'b',
//                 weight: 78
//             }
//         },
//         {
//             data: {
//                 id: 'ac',
//                 source: 'a',
//                 target: 'c',
//                 weight: 44
//             }
//         },
//         {
//             data: {
//                 id: 'ad',
//                 source: 'a',
//                 target: 'd',
//                 weight: 11
//             }
//         },
//         {
//             data: {
//                 id: 'ae',
//                 source: 'a',
//                 target: 'e',
//                 weight: 40
//             }
//         },
//         {
//             data: {
//                 id: 'af',
//                 source: 'a',
//                 target: 'f',
//                 weight: 61
//             }
//         },
//         {
//             data: {
//                 id: 'bc',
//                 source: 'b',
//                 target: 'c',
//                 weight: 71
//             }
//         },
//         {
//             data: {
//                 id: 'bd',
//                 source: 'b',
//                 target: 'd',
//                 weight: 93
//             }
//         },
//         {
//             data: {
//                 id: 'be',
//                 source: 'b',
//                 target: 'e',
//                 weight: 63
//             }
//         },
//         {
//             data: {
//                 id: 'bf',
//                 source: 'b',
//                 target: 'f',
//                 weight: 29
//             }
//         },
//         {
//             data: {
//                 id: 'cd',
//                 source: 'c',
//                 target: 'd',
//                 weight: 81
//             }
//         },
//         {
//             data: {
//                 id: 'ce',
//                 source: 'c',
//                 target: 'e',
//                 weight: 1
//             }
//         },
//         {
//             data: {
//                 id: 'cf',
//                 source: 'c',
//                 target: 'f',
//                 weight: 11
//             }
//         },
//         {
//             data: {
//                 id: 'de',
//                 source: 'd',
//                 target: 'e',
//                 weight: 33
//             }
//         },
//         {
//             data: {
//                 id: 'df',
//                 source: 'd',
//                 target: 'f',
//                 weight: 20
//             }
//         },
//         {
//             data: {
//                 id: 'ef',
//                 source: 'e',
//                 target: 'f',
//                 weight: 87
//             }
//         },
        
//     ],

//     style: [ // the stylesheet for the graph
//         {
//             selector: 'node',
//             style: {
//                 'background-color': '#666',
//                 'label': 'data(id)'
//             }
//         },

//         {
//             selector: 'edge',
//             style: {
//                 'width': 3,
//                 'line-color': '#ccc',
//                 'curve-style': 'bezier',
//                 'label': 'data(weight)'
//             }
//         }
//     ],

//     layout: {
//         name: 'circle'
//     }
// });

let cy1 = cytoscape({
    container: document.getElementById('cy'), // container to render in

    elements: [
        // Nodes
        {
            data: { id : 'a' }
        },
        {
            data: { id : 'b' }
        },
        {
            data: { id : 'c' }
        },
        {
            data: { id : 'd' }
        },
        {
            data: { id : 'e' }
        },
        {
            data: { id : 'f' }
        },
        {
            data: { id : 'g' }
        },
        {
            data: { id : 'h' }
        },
        {
            data: { id : 'i' }
        },
        // Edges
        {
            data: {
                id: 'ab',
                source: 'a',
                target: 'b',
                weight: 4
            }
        },
        {
            data: {
                id: 'ah',
                source: 'a',
                target: 'h',
                weight: 8
            }
        },
        {
            data: {
                id: 'bh',
                source: 'b',
                target: 'h',
                weight: 11
            }
        },
        {
            data: {
                id: 'bc',
                source: 'b',
                target: 'c',
                weight: 8
            }
        },
        {
            data: {
                id: 'hi',
                source: 'h',
                target: 'i',
                weight: 7
            }
        },
        {
            data: {
                id: 'hg',
                source: 'h',
                target: 'g',
                weight: 1
            }
        },
        {
            data: {
                id: 'ic',
                source: 'i',
                target: 'c',
                weight: 2
            }
        },
        {
            data: {
                id: 'ig',
                source: 'i',
                target: 'g',
                weight: 6
            }
        },
        {
            data: {
                id: 'gf',
                source: 'g',
                target: 'f',
                weight: 2
            }
        },
        {
            data: {
                id: 'cd',
                source: 'c',
                target: 'd',
                weight: 7
            }
        },
        {
            data: {
                id: 'cf',
                source: 'c',
                target: 'f',
                weight: 4
            }
        },
        {
            data: {
                id: 'df',
                source: 'd',
                target: 'f',
                weight: 14
            }
        },
        {
            data: {
                id: 'de',
                source: 'd',
                target: 'e',
                weight: 9
            }
        },
        {
            data: {
                id: 'fe',
                source: 'f',
                target: 'e',
                weight: 10
            }
        }
    ],

    style: [ // the stylesheet for the graph
        {
            selector: 'node',
            style: {
                'background-color': '#666666',
                'label': 'data(id)'
            }
        },

        {
            selector: 'edge',
            style: {
                'width': 3,
                'line-color': '#cccccc',
                'curve-style': 'bezier',
                'label': 'data(weight)'
            }
        },

        {
            selector: ':selected',
            style: {
                'background-color': 'black',
                'line-color': 'black',
            }
        }
    ],

    layout: {
        name: 'circle'
    }
});

storedGraphs.push(cy1.json());
updateVals();

function firstGraph() {
    cy1.destroy();
    cy1 = cytoscape({
        container: document.getElementById('cy')
    });
    cy1.json(storedGraphs[0]);
    
    updateVals();
}

function reset() {
    cy1.nodes().style('background-color', '#666');
    cy1.edges().style('line-color', '#ccc');
}

function start() {
    const selectedAlgo = document.getElementById('algoDropdown').value;
    if (selectedAlgo == 'prims') {
        primsAlgorithm(cy1);
    }
    else if (selectedAlgo == 'primsq') {
        primsAlgorithmQuick(cy1);
    }
    else if (selectedAlgo == 'kruskals') {
        kruskalsAlgorithm(cy1);
    }
    else if (selectedAlgo == 'kruskalsq') {
        kruskalsAlgorithmQuick(cy1);
    }
    else if (selectedAlgo == 'boruvkas') {
        boruvkasAlgorithm(cy1);
    }
    else if (selectedAlgo == 'boruvkasq') {
        boruvkasAlgorithmQuick(cy1);
    }
};

function createGraph() {
    cy1.destroy();
    cy1 = cytoscape({
        container: document.getElementById('cy'),

        style: [
            {
                selector: 'node',
                style: {
                    'background-color': '#666666'
                }
            },

            {
                selector: 'edge',
                style: {
                    'width': 3,
                    'line-color': '#cccccc',
                    'curve-style': 'bezier',
                    'label': 'data(weight)'
                }
            },

            {
                selector: ':selected',
                style: {
                    'background-color': 'black',
                    'line-color': 'black',
                }
            }
        ],

        layout: {
            name: 'circle'
        }

        // NEED TO IMPORT EDGEHANDLES EXTENSION TO ADD TOGGLE BETWEEN NODE MOVEMENT/DRAW EDGE MODE !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    });

    updateVals();
}

function addNode() {
    cy1.add({
        data: { id : crypto.randomUUID() },
        position: { x : cy1.container().clientWidth / 2, y : cy1.container().clientHeight / 2 }
    })
    updateVals();
}

function removeElement() {
    cy1.$(':selected').remove();
    updateVals();
}

function saveGraph() {
    storedGraphs.push(cy1.json());
}

function generateGraph() {
    const nodeCount = document.getElementById('nodeCountInput').value;

    if (nodeCount < 1 || nodeCount > 100) {
        alert('Please enter a number between 1 and 100');
        return;
    }

    // Generate nodes with random position in cy container
    for (let i = 0; i < nodeCount; i++) {
        cy1.add({
            group: 'nodes',
            data: { id: crypto.randomUUID() },
            position: { x : Math.random() * cy1.container().clientWidth, y : Math.random() * cy1.container().clientHeight}
        });
    }
  
    const nodes = cy1.nodes();
    
    // Generate edges between all nodes
    for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
            cy1.add({
                group: 'edges',
                data: {
                    id: crypto.randomUUID(),
                    source: nodes[i].data('id'),
                    target: nodes[j].data('id'),
                    weight: Math.floor(Math.random() * 10000)
                }
            });
        }
    }

    updateVals();
}

function colour() {
    cy1.$(':selected').style('background-color', 'blue');
    cy1.$(':selected').style('line-color', 'blue');
}

function uncolour() {
    cy1.$(':selected').style('background-color', '#666');
    cy1.$(':selected').style('line-color', '#ccc');
}

function updateVals() {
    document.getElementById('nodeCount').innerText = cy1.nodes().length;
    document.getElementById('edgeCount').innerText = cy1.edges().length;
}

// // To verify kruskals
// cy1.elements().kruskal(function(edge) {
//     return edge.data('weight');
// }).style({
//     'line-color': 'blue',
//     'background-color': 'blue'
// });

// node1 = cy1.nodes()[0];
// console.log(node1.style('background-color'));
// node1.animate({
//     style: {'background-color': 'blue'},
//     duration: 10000
// });
// console.log(node1.style('background-color'));
// setTimeout(() => {
//     console.log(node1.style('background-color'));
// }, 5000);

// ITS A PROBLEM WITH ANIMATE!!!!!!!!!!!!!!!!!!!!!!!!!!