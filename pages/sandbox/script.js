import { AlgoController, primsAlgorithm, kruskalsAlgorithm, boruvkasAlgorithm, reverseDeleteAlgorithm, degreeConstrainedPrims, degreeConstrainedKruskals, newBoruvkasAlgorithm, pacoAlgorithm } from '../../utils.js';

let graphs = localStorage.getItem('storedGraphs');
if (!graphs) {
    alert('Graphs have been deleted.\nPage will be redirected to the home page to reload initial graphs.');
    window.location.href = '../../index.html';
}
graphs = JSON.parse(graphs);

// Getting the DOM elements for ease of use later on
const cyContainer = document.getElementById('cy');
const minCostDisplay = document.getElementById('minCostDisplay');
const edgeQueueDisplay = document.getElementById('edgeQueueDisplay');
const graphDropdown = document.getElementById('graphDropdown');
const algoDropdown = document.getElementById('algoDropdown');
const resetBtn = document.getElementById('resetBtn');
const startBtn = document.getElementById('startBtn');
const nodeCount = document.getElementById('nodeCount');
const edgeCount = document.getElementById('edgeCount');
const nodeDegreeInput = document.getElementById('nodeDegreeInput');
const showRejectedEdgesCheckbox = document.getElementById('showRejectedEdgesCheckbox');

showRejectedEdgesCheckbox.addEventListener('change', reset);
nodeDegreeInput.addEventListener('change', reset);

// These are the displays that are passed to the algoController
const algoDisplays = {};
algoDisplays.minCostDisplay = minCostDisplay;
algoDisplays.edgeQueueDisplay = edgeQueueDisplay;
algoDisplays.cyContainer = cyContainer;

// Initialise this page's algoController and it's buttons' even listeners
const algoController = new AlgoController();
document.getElementById('play').addEventListener('click', () => algoController.play());
document.getElementById('pause').addEventListener('click', () => algoController.pause());
document.getElementById('next').addEventListener('click', () => algoController.next());
document.getElementById('previous').addEventListener('click', () => algoController.previous());
document.getElementById('toStart').addEventListener('click', () => algoController.toStart());
document.getElementById('toEnd').addEventListener('click', () => algoController.toEnd());

// Initialises the cytoscape instance and loads the first graph from localStorage
// Only done once loadInitialGraphs has finished
let cy = cytoscape({
    container: cyContainer, // container to render in
});
cy.json(graphs[0].graph);
cy.fit();
cy.userZoomingEnabled(false);
cy.userPanningEnabled(false);
cy.nodes().ungrabify();
cy.edges().unselectify();

populateDropdown();
updateVals();

// Loads the selected graph from the graph dropdown
function loadGraph(dropdown) {
    const selectedGraph = graphs[dropdown.value].graph;
    cy.destroy();
    cy = cytoscape({
        container: cyContainer
    });
    cy.json(selectedGraph);
    cy.fit();
    cy.userZoomingEnabled(false);
    cy.userPanningEnabled(false);
    cy.nodes().ungrabify();
    cy.edges().unselectify();
    
    updateVals();
}
graphDropdown.addEventListener('change', e => {
    algoController.reset();
    loadGraph(e.target)
});

// Populates the graph dropdown with the graphs retrieved from localStorage
function populateDropdown() {
    const dropdown = document.getElementById('graphDropdown');
    dropdown.innerHTML = '';
    
    for (let i = 0; i < graphs.length; i++) {
        const option = document.createElement('option');
        option.value = i;
        option.innerText = graphs[i].name;
        dropdown.appendChild(option);
    };
}

// Calls loadGraph to reset the currently selected graph
function reset() {
    algoController.reset();
    loadGraph(document.getElementById('graphDropdown'));
}
resetBtn.addEventListener('click', reset);
algoDropdown.addEventListener('change', reset);

// Calls the selected algo from the dropdown on the current loaded graph
// Passes the graph, the steps the algo returns, and the algoDisplays to the algoController
function start() {
    const selectedAlgo = algoDropdown.value;
    const showRejectedEdges = showRejectedEdgesCheckbox.checked;
    if (selectedAlgo == 'prims') {
        const steps = primsAlgorithm(cy, showRejectedEdges);
        if (!steps) return;
        algoController.setSteps(cy, steps, algoDisplays);
    }
    else if (selectedAlgo == 'kruskals') {
        algoController.setSteps(cy, kruskalsAlgorithm(cy, showRejectedEdges), algoDisplays);
    }
    else if (selectedAlgo == 'boruvkas') {
        if (cy.nodes().length > 26) {
            algoController.setSteps(cy, boruvkasAlgorithm(cy), algoDisplays);
        }
        else {
            algoController.setSteps(cy, newBoruvkasAlgorithm(cy), algoDisplays);
        }
    }
    else if (selectedAlgo == 'reverse-delete') {
        algoController.setSteps(cy, reverseDeleteAlgorithm(cy, showRejectedEdges), algoDisplays);
    }
    else if (selectedAlgo == 'dcprims') {
        const steps = degreeConstrainedPrims(cy, showRejectedEdges,  nodeDegreeInput.value);
        if (!steps) return;
        algoController.setSteps(cy, steps, algoDisplays);
    }
    else if (selectedAlgo == 'dckruskals') {
        const steps = degreeConstrainedKruskals(cy, showRejectedEdges,  nodeDegreeInput.value);
        if (!steps) return;
        algoController.setSteps(cy, steps, algoDisplays);
    }
    else if (selectedAlgo == 'paco') {
        const steps = pacoAlgorithm(cy, nodeDegreeInput.value);
        if (!steps) return;
        algoController.setSteps(cy, steps, algoDisplays);
    }
};
startBtn.addEventListener("click", start);

// Updates the node/edge count, mstCost and edgeQueue DOM elements' inner text
// to reflect the current graph
function updateVals() {
    nodeCount.innerText = cy.nodes().length;
    edgeCount.innerText = cy.edges().length;
    minCostDisplay.innerText = 0;
    edgeQueueDisplay.innerText = '';
}

// To verify kruskals
// cy.elements().kruskal(function(edge) {
//     return edge.data('weight');
// }).addClass('chosen');

// window.addEventListener('resize', resize);

// function resize() {
//     cy.fit();
// }