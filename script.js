let storedGraphs = [];

function primsAlgorithm(graph) {
    let edges = graph.edges();
    console.log(edges);
}

var cy1 = cytoscape({
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
                weight: 3
            }
        },
        {
            data: {
                id: 'ac',
                source: 'a',
                target: 'c',
                weight: 4
            }
        },
        {
            data: {
                id: 'ad',
                source: 'a',
                target: 'd',
                weight: 2
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
                id: 'de',
                source: 'd',
                target: 'e',
                weight: 2
            }
        },
        {
            data: {
                id: 'df',
                source: 'd',
                target: 'f',
                weight: 5
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
        name: 'grid',
        rows: 2
    }
});

primsAlgorithm(cy1);

// storedGraphs.push(cy1.json());
// cy1.destroy();
// var cy2 = cytoscape({
//     container: document.getElementById('cy')
// });
// cy2.json(storedGraphs[0]);
// // const img = cy2.jpg();
// // document.getElementById('cy').innerHTML = '<img src="' + img + '" />';