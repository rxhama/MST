import { AlgoController, primsAlgorithm, kruskalsAlgorithm, boruvkasAlgorithm, reverseDeleteAlgorithm, degreeConstrainedPrims, degreeConstrainedKruskals, newBoruvkasAlgorithm, pacoAlgorithm } from '../../utils.js';

let graphs = localStorage.getItem('storedGraphs');
if (!graphs) {
    alert('Graphs have been deleted.\nPage will be redirected to the home page to reload initial graphs.');
    window.location.href = '../../index.html';
}
graphs = JSON.parse(graphs);

// Getting the DOM elements for ease of use later on
const cyContainer1 = document.getElementById('cy1');
const minCostDisplay1 = document.getElementById('minCostDisplay1');
const edgeQueueDisplay1 = document.getElementById('edgeQueueDisplay1');
const cyContainer2 = document.getElementById('cy2');
const minCostDisplay2 = document.getElementById('minCostDisplay2');
const edgeQueueDisplay2 = document.getElementById('edgeQueueDisplay2');
const graphDropdown = document.getElementById('graphDropdown');
const algoDropdown = document.getElementById('algoDropdown');
const resetBtn = document.getElementById('resetBtn');
const startBtn = document.getElementById('startBtn');
const nodeCount = document.getElementById('nodeCount'); // removeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
const edgeCount = document.getElementById('edgeCount'); // removeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
const nodeDegreeInput = document.getElementById('nodeDegreeInput');
const showRejectedEdgesCheckbox = document.getElementById('showRejectedEdgesCheckbox');

showRejectedEdgesCheckbox.addEventListener('change', reset);
nodeDegreeInput.addEventListener('change', reset);

// These are the displays that are passed to the algoController
const algoDisplays1 = {};
algoDisplays1.minCostDisplay = minCostDisplay1;
algoDisplays1.edgeQueueDisplay = edgeQueueDisplay1;
algoDisplays1.cyContainer = cyContainer1;

const algoDisplays2 = {};
algoDisplays2.minCostDisplay = minCostDisplay2;
algoDisplays2.edgeQueueDisplay = edgeQueueDisplay2;
algoDisplays2.cyContainer = cyContainer2;

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
let cy1 = cytoscape({
    container: cyContainer1, // container to render in
});
cy1.json(graphs[0].graph);
cy1.fit();

let cy2 = cytoscape({
    container: cyContainer2, // container to render in
});
cy2.json(graphs[0].graph);
cy2.fit();

populateDropdown();
updateVals();

// Loads the selected graph from the graph dropdown
function loadGraph(dropdown) {
    const selectedGraph = graphs[dropdown.value].graph;
    // cy1
    cy1.destroy();
    cy1 = cytoscape({
        container: cyContainer1
    });
    cy1.json(selectedGraph);
    cy1.fit();
    // cy2
    cy2.destroy();
    cy2 = cytoscape({
        container: cyContainer2
    });
    cy2.json(selectedGraph);
    cy2.fit();
    
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
        const steps = primsAlgorithm(cy1, showRejectedEdges);
        if (!steps) return;
        algoController.setSteps(cy1, steps, algoDisplays1);
    }
    else if (selectedAlgo == 'kruskals') {
        algoController.setSteps(cy1, kruskalsAlgorithm(cy1, showRejectedEdges), algoDisplays1);
    }
    else if (selectedAlgo == 'boruvkas') {
        if (cy1.nodes().length > 26) {
            algoController.setSteps(cy1, boruvkasAlgorithm(cy1), algoDisplays1);
        }
        else {
            algoController.setSteps(cy1, newBoruvkasAlgorithm(cy1), algoDisplays1);
        }
    }
    else if (selectedAlgo == 'reverse-delete') {
        algoController.setSteps(cy1, reverseDeleteAlgorithm(cy1, showRejectedEdges), algoDisplays1);
    }
    else if (selectedAlgo == 'dcprims') {
        const steps = degreeConstrainedPrims(cy1, showRejectedEdges,  nodeDegreeInput.value);
        if (!steps) return;
        algoController.setSteps(cy1, steps, algoDisplays1);
    }
    else if (selectedAlgo == 'dckruskals') {
        const steps = degreeConstrainedKruskals(cy1, showRejectedEdges,  nodeDegreeInput.value);
        if (!steps) return;
        algoController.setSteps(cy1, steps, algoDisplays1);
    }
    else if (selectedAlgo == 'paco') {
        const steps = pacoAlgorithm(cy1, nodeDegreeInput.value);
        if (!steps) return;
        algoController.setSteps(cy1, steps, algoDisplays1);
    }
};
startBtn.addEventListener("click", start);

// Updates the node/edge count, mstCost and edgeQueue DOM elements' inner text
// to reflect the current graph
function updateVals() {
    nodeCount.innerText = cy1.nodes().length;
    edgeCount.innerText = cy1.edges().length;
    minCostDisplay1.innerText = 0;
    edgeQueueDisplay1.innerText = '';
}

// To verify kruskals
// cy.elements().kruskal(function(edge) {
//     return edge.data('weight');
// }).addClass('chosen');

// window.addEventListener('resize', resize);

// function resize() {
//     cy.fit();
// }