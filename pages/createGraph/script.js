let drawMode = false;
const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');

let cy1 = cytoscape({
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
            "selector": ".rejected",
            "style": {
                "background-color": "rgb(255,0,0)",
                "line-color": "rgb(255,0,0)"
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
            "selector": ".outlined",
            "style": {
                "border-width": "3px",
                "border-color": "rgb(255,255,0)"
            }
        }
    ],

    layout: {
        name: 'circle'
    }

    // NEED TO IMPORT EDGEHANDLES EXTENSION TO ADD TOGGLE BETWEEN NODE MOVEMENT/DRAW EDGE MODE !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
});

function deleteGraph() {
    cy1.destroy();
    
    cy1 = cytoscape({
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
                "selector": ".chosen",
                "style": {
                    "background-color": "rgb(0,0,255)",
                    "line-color": "rgb(0,0,255)"
                }
            },
            {
                "selector": ".outlined",
                "style": {
                  "border-width": "3px",
                  "border-color": "rgb(255,255,0)"
                }
            }
        ],

        layout: {
            name: 'circle'
        }
    });

    updateVals();
};

function addNode() {
    if (cy1.nodes().length >= 26) {
        alert("no more");
        return;
    }

    const nextId = nextAvailableId();
    if (!nextId) {
        alert('MAX NODES');
        return;
    }
    cy1.add({
        data: { id : nextId },
        position: { x : cy1.container().clientWidth / 2, y : cy1.container().clientHeight / 2 }
    })
    updateVals();
};

function removeElement() {
    cy1.$(':selected').remove();
    updateVals();
}

function saveGraph() {
    if (cy1.elements().length == 0) {
        alert('Graph is empty');
        return;
    }

    if (cy1.nodes().length == 1) {
        alert('Graph must have at least 2 nodes');
        return;
    }

    for (const node of cy1.nodes()) {
        if (node.connectedEdges().empty()) {
            alert('Graph must be connected');
            return;
        }
    }

    const graphs = JSON.parse(localStorage.getItem('storedGraphs') || '[]');
    for (let i = 0; i < graphs.length; i++) {
        if (checkIdenticalElements(cy1.json().elements, graphs[i].graph.elements)) {
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

    cy1.elements().unselect();
    const newGraph = {};
    newGraph.name = graphName;
    newGraph.graph = cy1.json();
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

    if (cy1.nodes(':selected').length != 2) {
        alert('Please select 2 nodes only');
        return;
    }

    const node1 = cy1.nodes(':selected')[0];
    const node2 = cy1.nodes(':selected')[1];

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
            cy1.add({
                group: 'edges',
                data: {
                    id: newEdgeId,
                    source: cy1.nodes(':selected')[0].data('id'),
                    target: cy1.nodes(':selected')[1].data('id'),
                    weight: Math.floor(Math.random() * 100)
                }
            });

            cy1.elements().unselect();
            weightInput.value = '';
            return;
        }
        else if (choice == 'euclidean') {
            cy1.add({
                group: 'edges',
                data: {
                    id: newEdgeId,
                    source: cy1.nodes(':selected')[0].data('id'),
                    target: cy1.nodes(':selected')[1].data('id'),
                    weight: Math.floor(0.1 * getEuclideanDistance(cy1.nodes(':selected')[0], cy1.nodes(':selected')[1]))
                }
            });

            cy1.elements().unselect();
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

    cy1.add({
        group: 'edges',
        data: {
            id: newEdgeId,
            source: cy1.nodes(':selected')[0].data('id'),
            target: cy1.nodes(':selected')[1].data('id'),
            weight: weight
        }
    });

    cy1.elements().unselect();
    weightInput.value = '';

    updateVals();
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

function updateVals() {
    document.getElementById('nodeCount').innerText = cy1.nodes().length;
    document.getElementById('edgeCount').innerText = cy1.edges().length;
}

function nextAvailableId() {
    const existingIds = cy1.nodes().map(node => node.data('id')).sort();

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