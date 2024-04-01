let graphs = localStorage.getItem('storedGraphs');
if (!graphs) {
    alert('Graphs have been deleted.\nPlease navigate to the home page to load them again.');
    window.location.href = '../../index.html';
}
graphs = JSON.parse(graphs);

const graphIndex = sessionStorage.getItem('editGraph');
if (graphIndex == null) {
    alert('Please select a graph to edit');
    window.location.href = '../myGraphs/myGraphs.html';
}

const nameInput = document.getElementById('graphName');

const selectedGraph = graphs[graphIndex];
nameInput.value = selectedGraph.name;

cy = cytoscape({
    container: document.getElementById('cy')
});
cy.json(selectedGraph.graph);
cy.fit();

function cancel() {
    sessionStorage.removeItem('editGraph');
    window.location.href='../myGraphs/myGraphs.html';
}

function save() {
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
    if (nameInput.value == '') {
        alert('Please enter a name for the graph');
        return;
    }
    if (nameInput.value.length > 25) {
        alert('Graph name must be 25 characters or less');
        return;
    }
    // do the rest here
    for (let i = 0; i < graphIndex; i++) {
        if (i == graphIndex) {
            continue;
        }
        if (graphs[i].name == nameInput.value) {
            alert('Graph name already exists. Please choose a different name.');
            return;
        }
        if (checkIdenticalElements(graphs[i].graph.elements, cy.json().elements)) {
            alert('Graph already exists.\nPlease make changes to the graph before saving or\ncancel changes.');
            return;
        }
    }
    
    cy.elements().unselect();
    
    graphs[graphIndex].name = nameInput.value;
    graphs[graphIndex].graph = cy.json();
    localStorage.setItem('storedGraphs', JSON.stringify(graphs));

    sessionStorage.removeItem('editGraph');
    window.location.href='../myGraphs/myGraphs.html';
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