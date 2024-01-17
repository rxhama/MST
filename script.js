let storedGraphs = [];

function primsAlgorithm(graph) {
    // let edgeQueue = [];
    // visitedEdges = [];
    // let unvisitedNodes = graph.nodes();
    // let visitedNotes = [];
    // const initialNode = unvisitedNodes[0];
    // initialNode.style('background-color', 'blue');
    // while (!unvisitedNodes.empty()) {

    // }
    
    
    const edges = graph.edges();
    for (let i = 0; i < edges.length; i++) {
        setTimeout(() => {
            edges[i].animate({
                style: {'line-color': 'blue'},
                duration: 1000
            });
        }, 1000 * (i + 1));
    }
    

    // src.style('background-color', 'blue');
    // edges[0].style('line-color', 'blue');
}

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
        // Edges
        {
            data: {
                id: 'ab',
                source: 'a',
                target: 'b',
                weight: 78
            }
        },
        {
            data: {
                id: 'ac',
                source: 'a',
                target: 'c',
                weight: 44
            }
        },
        {
            data: {
                id: 'ad',
                source: 'a',
                target: 'd',
                weight: 11
            }
        },
        {
            data: {
                id: 'ae',
                source: 'a',
                target: 'e',
                weight: 40
            }
        },
        {
            data: {
                id: 'af',
                source: 'a',
                target: 'f',
                weight: 61
            }
        },
        {
            data: {
                id: 'bc',
                source: 'b',
                target: 'c',
                weight: 71
            }
        },
        {
            data: {
                id: 'bd',
                source: 'b',
                target: 'd',
                weight: 93
            }
        },
        {
            data: {
                id: 'be',
                source: 'b',
                target: 'e',
                weight: 63
            }
        },
        {
            data: {
                id: 'bf',
                source: 'b',
                target: 'f',
                weight: 29
            }
        },
        {
            data: {
                id: 'cd',
                source: 'c',
                target: 'd',
                weight: 81
            }
        },
        {
            data: {
                id: 'ce',
                source: 'c',
                target: 'e',
                weight: 1
            }
        },
        {
            data: {
                id: 'cf',
                source: 'c',
                target: 'f',
                weight: 11
            }
        },
        {
            data: {
                id: 'de',
                source: 'd',
                target: 'e',
                weight: 33
            }
        },
        {
            data: {
                id: 'df',
                source: 'd',
                target: 'f',
                weight: 20
            }
        },
        {
            data: {
                id: 'ef',
                source: 'e',
                target: 'f',
                weight: 87
            }
        },
        
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
        name: 'circle', // cose?
        rows: 2
    }
});

primsAlgorithm(cy1);

// // Calculate kruskal mst: (doesn't work)
// let mst = cy1.elements().kruskal();
// mst.edges().style('line-color', 'blue');
// mst.nodes().style('background-color', 'blue'); 
// cy1.elements().difference(mst).remove();



// storedGraphs.push(cy1.json());
// cy1.destroy();
// var cy2 = cytoscape({
//     container: document.getElementById('cy')
// });
// cy2.json(storedGraphs[0]);
// // const img = cy2.jpg();
// // document.getElementById('cy').innerHTML = '<img src="' + img + '" />';