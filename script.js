let storedGraphs = [];

function primsAlgorithm(graph) {
    let edgeQueue = [];
    let visitedEdges = [];
    let unvisitedNodes = graph.nodes();
    let currNode = unvisitedNodes[0];
    unvisitedNodes.splice(0, 1);
    currNode.style('background-color', 'blue');
    let i = 0;
    while (!unvisitedNodes.empty()) {
        i++;

        // Adding adjacent edges to edgeQueue and sorting edgeQueue by weight
        const adjacentEdges = currNode.connectedEdges().filter(edge => !visitedEdges.includes(edge) && (unvisitedNodes.includes(edge.source()) != unvisitedNodes.includes(edge.target()))).toArray();
        edgeQueue.push(...adjacentEdges);
        edgeQueue.sort((a, b) => a.data('weight') - b.data('weight'));

        // Choosing edge
        let nextEdge = null;
        while (nextEdge == null) {
            const edge = edgeQueue.shift();
            if (unvisitedNodes.includes(edge.source()) || unvisitedNodes.includes(edge.target())) {
                nextEdge = edge;
            }
        }
        visitedEdges.push(nextEdge);
        setTimeout(() => {
            nextEdge.animate({
                style: {'line-color': 'blue'},
                duration: 1000
            });
        }, 2000 * (i + 1));
        
        // Getting next node edge will take us to
        let nextNode = null;
        if (unvisitedNodes.includes(nextEdge.source())) {
            nextNode = nextEdge.source();
        }
        else {
            nextNode = nextEdge.target();
        }
        let nextNodeIndex = -1;
        for (let i = 0; i < unvisitedNodes.length; i++) {
            if (unvisitedNodes[i].data('id') == nextNode.data('id')) {
                nextNodeIndex = i;
                break;
            }
        }
        unvisitedNodes.splice(nextNodeIndex, 1);
        setTimeout(() => {
            nextNode.animate({
                style: {'background-color': 'blue'},
                duration: 1000
            });
        }, 2000 * (i + 1));
        currNode = nextNode;
    }
}

function kruskalsAlgorithm(graph) {
    let edgeQueue = graph.edges().toArray();
    edgeQueue.sort((a, b) => a.data('weight') - b.data('weight'));
    let unvisitedNodes = graph.nodes();
    let i = 0;
    while (!unvisitedNodes.empty()) {
        i++;

        // Choosing edge
        let nextEdge = null;
        while (nextEdge == null) {
            const edge = edgeQueue.shift();
            if (unvisitedNodes.includes(edge.source()) || unvisitedNodes.includes(edge.target())) {
                nextEdge = edge;
            }
        }
        setTimeout(() => {
            nextEdge.animate({
                style: {'line-color': 'blue'},
                duration: 1000
            });
        }, 2000 * (i + 1));
        
        // Getting source and target nodes of edge
        let sourceNode = nextEdge.source();
        let targetNode = nextEdge.target();
        if (unvisitedNodes.includes(sourceNode)) {
            let sourceIndex = -1;
            for (let i = 0; i < unvisitedNodes.length; i++) {
                if (unvisitedNodes[i].data('id') == sourceNode.data('id')) {
                    sourceIndex = i;
                    break;
                }
            }
            unvisitedNodes.splice(sourceIndex, 1);
            setTimeout(() => {
                sourceNode.animate({
                    style: {'background-color': 'blue'},
                    duration: 1000
                });
            }, 2000 * (i + 1));
        }
        if (unvisitedNodes.includes(targetNode)) {
            let targetIndex = -1;
            for (let i = 0; i < unvisitedNodes.length; i++) {
                if (unvisitedNodes[i].data('id') == targetNode.data('id')) {
                    targetIndex = i;
                    break;
                }
            }
            unvisitedNodes.splice(targetIndex, 1);
            setTimeout(() => {
                targetNode.animate({
                    style: {'background-color': 'blue'},
                    duration: 1000
                });
            }, 2000 * (i + 1));
        }
    }
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
                'background-color': '#666',
                'label': 'data(id)'
            }
        },

        {
            selector: 'edge',
            style: {
                'width': 3,
                'line-color': '#ccc',
                'curve-style': 'bezier',
                'label': 'data(weight)'
            }
        }
    ],

    layout: {
        name: 'circle'
    }
});

storedGraphs.push(cy1.json());

function reset() {
    cy1.destroy();
    cy1 = cytoscape({
        container: document.getElementById('cy')
    });
    cy1.json(storedGraphs[0]);
}

function start() {
    const selectedAlgo = document.getElementById('algoDropdown').value;
    if (selectedAlgo == 'prims') {
        primsAlgorithm(cy1);
    }
    else if (selectedAlgo == 'kruskals') {
        kruskalsAlgorithm(cy1);
    }
};

// console.log(cy1.getElementById('a').descendants());

// storedGraphs.push(cy1.json());
// cy1.destroy();
// var cy2 = cytoscape({
//     container: document.getElementById('cy')
// });
// cy2.json(storedGraphs[0]);
// // const img = cy2.jpg();
// // document.getElementById('cy').innerHTML = '<img src="' + img + '" />';