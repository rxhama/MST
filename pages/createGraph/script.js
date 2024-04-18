let graphs = localStorage.getItem('storedGraphs');
if (!graphs) {
    alert('Initial graphs have been deleted.\nYou will be redirected to the home page to reload initial graphs.');
    window.location.href = '../../index.html';
}
graphs = JSON.parse(graphs);

let drawMode = false;
const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');

window.addEventListener('beforeunload', () => {
    sessionStorage.removeItem('editGraph');
});

const cyOptions = {
    container: document.getElementById('cy'),

    style: [
        {
            "selector": "node",
            "style": {
                "background-color": "rgb(102,102,102)",
                "label": "data(id)",
                "transition-property": "background-color",
                "transition-duration": "0.2s"
            }
        },
        {
            "selector": "edge",
            "style": {
                "width": "3px",
                "line-color": "rgb(204,204,204)",
                "curve-style": "bezier",
                "label": "data(weight)",
                "transition-property": "line-color",
                "transition-duration": "0.2s"
            }
        },
        {
            "selector": ":selected",
            "style": {
                "background-color": "rgb(0,0,0)",
                "line-color": "rgb(0,0,0)"
            }
        },
        {
            "selector": ".search",
            "style": {
                "line-color": "rgb(255,255,0)"
            }
        },
        {
            "selector": ".chosen",
            "style": {
                "background-color": "rgb(0,0,255)",
                "line-color": "rgb(0,0,255)"
            }
        },
        {
            "selector": ".rejected",
            "style": {
                "background-color": "rgb(255,0,0)",
                "line-color": "rgb(255,0,0)"
            }
          },
        {
            "selector": ".outlined",
            "style": {
                "border-width": "3px",
                "border-color": "rgb(255,255,0)"
            }
        },
        {
            "selector": ".0",
            "style": {
              "background-color": "rgb(0,153,0)",
              "line-color": "rgb(0,153,0)"
            }
        },
        {
            "selector": ".1",
            "style": {
            "background-color": "rgb(0,153,204)",
            "line-color": "rgb(0,153,204)"
            }
        },
        {
            "selector": ".2",
            "style": {
            "background-color": "rgb(255,153,51)",
            "line-color": "rgb(255,153,51)"
            }
        },
        {
            "selector": ".3",
            "style": {
            "background-color": "rgb(255,0,102)",
            "line-color": "rgb(255,0,102)"
            }
        },
        {
            "selector": ".4",
            "style": {
            "background-color": "rgb(51,204,255)",
            "line-color": "rgb(51,204,255)"
            }
        },
        {
            "selector": ".5",
            "style": {
            "background-color": "rgb(51,51,153)",
            "line-color": "rgb(51,51,153)"
            }
        },
        {
            "selector": ".6",
            "style": {
            "background-color": "rgb(255,153,255)",
            "line-color": "rgb(255,153,255)"
            }
        },
        {
            "selector": ".7",
            "style": {
            "background-color": "rgb(0,255,0)",
            "line-color": "rgb(0,255,0)"
            }
        },
        {
            "selector": ".8",
            "style": {
            "background-color": "rgb(153,0,255)",
            "line-color": "rgb(153,0,255)"
            }
        },
        {
            "selector": ".9",
            "style": {
            "background-color": "rgb(153,51,51)",
            "line-color": "rgb(153,51,51)"
            }
        },
        {
            "selector": ".10",
            "style": {
            "background-color": "rgb(102,0,102)",
            "line-color": "rgb(102,0,102)"
            }
        },
        {
            "selector": ".11",
            "style": {
            "background-color": "rgb(0,102,0)",
            "line-color": "rgb(0,102,0)"
            }
        },
        {
            "selector": ".12",
            "style": {
            "background-color": "rgb(204,0,204)",
            "line-color": "rgb(204,0,204)"
            }
        }
    ],

    layout: {
        name: 'circle'
    }
};

let graphIndex = sessionStorage.getItem('editGraph');

let cy = cytoscape({
    container: document.getElementById('cy')
});

if (graphIndex) {
    cy.json(graphs[graphIndex].graph);
}
else {
    cy = cytoscape(cyOptions);
}
updateVals();

function cancel() {
    if (graphIndex) {
        sessionStorage.removeItem('editGraph');
    }
    window.location.href = '../myGraphs/myGraphs.html';
}

function deleteGraph() {
    cy.destroy();
    
    cy = cytoscape(cyOptions);

    updateVals();
};

function addNode() {
    if (cy.nodes().length >= 26) {
        alert("no more");
        return;
    }

    const nextId = nextAvailableId();
    if (!nextId) {
        alert('MAX NODES');
        return;
    }
    cy.add({
        data: { id : nextId },
        position: { x : cy.container().clientWidth / 2, y : cy.container().clientHeight / 2 }
    })
    updateVals();
};

function removeElement() {
    cy.$(':selected').remove();
    updateVals();
}

function saveGraph() {
    if (cy.elements().length == 0) {
        alert('Graph is empty');
        return;
    }

    if (cy.nodes().length == 1) {
        alert('Graph must have at least 2 nodes');
        return;
    }

    for (const node of cy.nodes()) {
        if (node.connectedEdges().empty()) {
            alert('Graph must be connected');
            return;
        }
    }
    
    for (let i = 0; i < graphs.length; i++) {
        if (graphIndex && graphIndex == i) {
            continue;
        }
        if (checkIdenticalElements(cy.json().elements, graphs[i].graph.elements)) {
            alert('Identical graph already saved');
            return;
        }
    }

    const graphName = prompt('Enter graph name', graphIndex ? graphs[graphIndex].name : '');
    if (graphName == '' || graphName == null) {
        alert('Please enter a graph name');
        return;
    }

    if (graphName.length > 25) {
        alert('Graph name must be 25 characters or less');
        return;
    }

    for (let i = 0; i < graphs.length; i++) {
        if (graphIndex && graphIndex == i) {
            continue;
        }
        if (graphs[i].name == graphName) {
            alert('Graph name already exists');
            return;
        }
    }

    cy.elements().unselect();
    
    if (graphIndex) {
        graphs[graphIndex].name = graphName;
        graphs[graphIndex].graph = cy.json();
        sessionStorage.removeItem('editGraph');
        window.location.href = '../myGraphs/myGraphs.html';
    }
    else {
        const newGraph = {};
        newGraph.name = graphName;
        newGraph.default = false;
        newGraph.graph = cy.json();
        graphs.push(newGraph);
        if (graphs.length >= 30) {
            alert('Graph saved. A maximum of 30 graphs can be saved\nso no further graphs can be created.\nPlease delete some graphs in order to create new ones.');
            window.location.href = '../myGraphs/myGraphs.html';
        }
    }

    localStorage.setItem('storedGraphs', JSON.stringify(graphs));
}

// Checks the if the JSON elements of 2 graphs are identical
function checkIdenticalElements(elesA, elesB) {
    if (elesA.length != elesB.length) {
        return false;
    }

    // Using maps for easy lookup
    const nodesA = new Map(elesA.nodes.map(node => [node.data.id, node]));
    const edgesA = new Map(elesA.edges.map(edge => [edge.data.id, edge]));

    // Check each node in elesB to see if in elesA
    for (let nodeB of elesB.nodes) {
        const nodeA = nodesA.get(nodeB.data.id);
        if (!nodeA) {
            return false;
        }
    }

    // Check each node in elesB to see if in elesA
    for (let edgeB of elesB.edges) {
        const edgeA = edgesA.get(edgeB.data.id);
        if (!edgeA) {
            return false;
        }
        if (edgeA.data.source != edgeB.data.source || edgeA.data.target != edgeB.data.target || edgeA.data.weight != edgeB.data.weight) {
            return false;
        }
    }

    // All checks passed and elements are identical
    return true;
}

function addEdge() {
    const weightInput = document.getElementById('edgeWeightInput');
    const edgeChoice = document.getElementById('random');

    if (cy.nodes(':selected').length != 2) {
        alert('Please select 2 nodes only');
        return;
    }

    const node1 = cy.nodes(':selected')[0];
    const node2 = cy.nodes(':selected')[1];

    const sourceTargetList = [node1.data('id'), node2.data('id')].sort();
    const newEdgeId = sourceTargetList.join('');

    if (node1.edgesWith(node2).length > 0) {
        alert('Edge already exists');
        return;
    }

    // maybe remove this
    if (drawMode) {
        const choice = document.querySelector('input[name="edgeOptionGroup"]:checked').value;
        if (choice == 'random') {
            cy.add({
                group: 'edges',
                data: {
                    id: newEdgeId,
                    source: cy.nodes(':selected')[0].data('id'),
                    target: cy.nodes(':selected')[1].data('id'),
                    weight: Math.floor(Math.random() * 100)
                }
            });

            cy.elements().unselect();
            weightInput.value = '';
            return;
        }
        else if (choice == 'euclidean') {
            cy.add({
                group: 'edges',
                data: {
                    id: newEdgeId,
                    source: cy.nodes(':selected')[0].data('id'),
                    target: cy.nodes(':selected')[1].data('id'),
                    weight: Math.floor(0.1 * getEuclideanDistance(cy.nodes(':selected')[0], cy.nodes(':selected')[1]))
                }
            });

            cy.elements().unselect();
            weightInput.value = '';
            return;
        }
    }
    
    if (weightInput.value == '') {
        alert('Please enter valid a weight');
        return;
    }

    const weight = parseInt(weightInput.value);
    if (isNaN(weight)) {
        alert('Please enter a number, no letters or special characters');
        return;
    }

    if (weightInput.value < 1 || weightInput.value > 100) {
        alert('Please enter a number between 1 and 100');
        return;
    }

    cy.add({
        group: 'edges',
        data: {
            id: newEdgeId,
            source: cy.nodes(':selected')[0].data('id'),
            target: cy.nodes(':selected')[1].data('id'),
            weight: weight
        }
    });

    cy.elements().unselect();
    weightInput.value = '';

    updateVals();
}

// Generates a graph with set number of nodes (taken from node input in page) and edges between all nodes
function generateGraph() {
    deleteGraph();

    const nodeCount = document.getElementById('nodeCountInput').value;

    if (nodeCount < 1 || nodeCount > 26) {
        alert('Please enter a number between 1 and 26');
        return;
    }

    // Generate nodes with random position in cy container
    for (let i = 0; i < nodeCount; i++) {
        const nextId = nextAvailableId();
        if (!nextId) {
            alert('MAX NODES');
            return;
        }
        cy.add({
            group: 'nodes',
            data: { id: nextId },
            position: { x : Math.random() * cy.container().clientWidth, y : Math.random() * cy.container().clientHeight}
        });
    }
  
    const nodes = cy.nodes();
    
    // Generate edges between all nodes
    for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
            const sourceTargetList = [nodes[i].data('id'), nodes[j].data('id')].sort();
            const newEdgeId = sourceTargetList.join('');
            cy.add({
                group: 'edges',
                data: {
                    id: newEdgeId,
                    source: nodes[i].data('id'),
                    target: nodes[j].data('id'),
                    weight: Math.ceil(Math.random() * 100) // Math.floor() could possibly return 0, ceiling ensures it's at least 1
                }
            });
        }
    }

    updateVals();
}

function updateVals() {
    document.getElementById('nodeCount').innerText = cy.nodes().length;
    document.getElementById('edgeCount').innerText = cy.edges().length;
}

// Returns the next available ID in alphabetical order
function nextAvailableId() {
    const existingIds = cy.nodes().map(node => node.data('id')).sort();

    for (let i = 0; i < alphabet.length; i++) {
        if (!existingIds.includes(alphabet[i])) {
            return alphabet[i];
        }
    };

    return null;
}

function toggleDraw() {
    drawMode = !drawMode;
    document.getElementById('drawBtn').innerText = drawMode ? 'Draw Edge Mode: ON' : 'Draw Edge Mode: OFF';
}

function getEuclideanDistance(node1, node2) {
    const pos1 = node1.position();
    const pos2 = node2.position();

    const distance = Math.sqrt(Math.pow(pos1.x - pos2.x, 2) + Math.pow(pos1.y - pos2.y, 2));
    
    return distance;
}