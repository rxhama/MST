let drawMode = false;
const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');

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

let cy = cytoscape(cyOptions);

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

    const graphs = JSON.parse(localStorage.getItem('storedGraphs') || '[]');
    for (let i = 0; i < graphs.length; i++) {
        if (checkIdenticalElements(cy.json().elements, graphs[i].graph.elements)) {
            alert('Identical graph already saved');
            return;
        }
    }

    const graphName = prompt('Enter graph name');
    if (graphName == '' || graphName == null) {
        alert('Please enter a graph name');
        return;
    }

    if (graphName.length > 25) {
        alert('Graph name must be 25 characters or less');
        return;
    }

    for (const graph of graphs) {
        if (graph.name == graphName) {
            alert('Graph name already exists');
            return;
        }
    }

    cy.elements().unselect();
    const newGraph = {};
    newGraph.name = graphName;
    newGraph.graph = cy.json();
    graphs.push(newGraph);
    localStorage.setItem('storedGraphs', JSON.stringify(graphs));
}

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

function generateGraph() {
    deleteGraph();

    const nodeCount = document.getElementById('nodeCountInput').value;

    if (nodeCount < 1 || nodeCount > 100) {
        alert('Please enter a number between 1 and 100');
        return;
    }

    // Generate nodes with random position in cy container
    for (let i = 0; i < nodeCount; i++) {
        cy.add({
            group: 'nodes',
            data: { id: crypto.randomUUID() },
            position: { x : Math.random() * cy.container().clientWidth, y : Math.random() * cy.container().clientHeight}
        });
    }
  
    const nodes = cy.nodes();
    
    // Generate edges between all nodes
    for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
            cy.add({
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

function updateVals() {
    document.getElementById('nodeCount').innerText = cy.nodes().length;
    document.getElementById('edgeCount').innerText = cy.edges().length;
}

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