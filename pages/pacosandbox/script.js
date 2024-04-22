import { AlgoController, PacoController, newPacoAlgorithm } from '../../utils.js';

let graphs = localStorage.getItem('storedGraphs');
if (!graphs) {
    alert('Graphs have been deleted.\nPage will be redirected to the home page to reload initial graphs.');
    window.location.href = '../../index.html';
}
graphs = JSON.parse(graphs);

// Getting the DOM elements for ease of use later on
const cyContainer = document.getElementById('cy');
const ant1 = document.getElementById('ant1');
const ant2 = document.getElementById('ant2');
const ant3 = document.getElementById('ant3');
const ant4 = document.getElementById('ant4');
const minCostDisplay = document.getElementById('minCostDisplay');
const graphDropdown = document.getElementById('graphDropdown');
const resetBtn = document.getElementById('resetBtn');
const startBtn = document.getElementById('startBtn');
const nodeCount = document.getElementById('nodeCount');
const edgeCount = document.getElementById('edgeCount');
const nodeDegreeInput = document.getElementById('nodeDegreeInput');

nodeDegreeInput.addEventListener('change', reset);

// These are the displays that are passed to the algoController
const algoDisplays = {};
algoDisplays.minCostDisplay = minCostDisplay;
algoDisplays.cyContainer = cyContainer;
const algoDisplays1 = {};
algoDisplays1.cyContainer = ant1;
const algoDisplays2 = {};
algoDisplays2.cyContainer = ant2;
const algoDisplays3 = {};
algoDisplays3.cyContainer = ant3;
const algoDisplays4 = {};
algoDisplays4.cyContainer = ant4;

// Initialise this page's algoController and it's buttons' even listeners
const algoController = new AlgoController();
const algoController1 = new AlgoController();
const algoController2 = new AlgoController();
const algoController3 = new AlgoController();
const algoController4 = new AlgoController();
const pacoController = new PacoController(
    algoController,
    algoController1,
    algoController2,
    algoController3,
    algoController4
);
document.getElementById('play').addEventListener('click', () => pacoController.play());
document.getElementById('pause').addEventListener('click', () => pacoController.pause());
document.getElementById('next').addEventListener('click', () => pacoController.next());
document.getElementById('previous').addEventListener('click', () => pacoController.previous());
document.getElementById('toStart').addEventListener('click', () => pacoController.toStart());
document.getElementById('toEnd').addEventListener('click', () => pacoController.toEnd());

// Initialises the cytoscape instances and loads the first graph from localStorage
// Only done once loadInitialGraphs has finished

// Main graph
let cy = cytoscape({
    container: cyContainer, // container to render in
});
// Ant 1 graph
let cy1 = cytoscape({
    container: ant1
});
// Ant 2 graph
let cy2 = cytoscape({
    container: ant2
});
// Ant 3 graph
let cy3 = cytoscape({
    container: ant3
});
// Ant 4 graph
let cy4 = cytoscape({
    container: ant4
});
let cyGraphs = [cy, cy1, cy2, cy3, cy4];

for (let i = 0; i < cyGraphs.length; i++) {
    cyGraphs[i].json(graphs[0].graph);
    cyGraphs[i].fit();
    cyGraphs[i].userZoomingEnabled(false);
    cyGraphs[i].userPanningEnabled(false);
    cyGraphs[i].nodes().ungrabify();
    cyGraphs[i].edges().unselectify();
    if (i != 0) {
        cyGraphs[i].nodes().unselectify();
    }
}

populateDropdown();
updateVals();

// Loads the selected graph from the graph dropdown
function loadGraph(dropdown) {
    const selectedGraph = graphs[dropdown.value].graph;

    for (const g of cyGraphs) {
        g.destroy();
    }
    cyGraphs[0] = cytoscape({
        container: cyContainer
    });
    cyGraphs[1] = cytoscape({
        container: ant1
    });
    cyGraphs[2] = cytoscape({
        container: ant2
    });
    cyGraphs[3] = cytoscape({
        container: ant3
    });
    cyGraphs[4] = cytoscape({
        container: ant4
    });
    for (let i = 0; i < cyGraphs.length; i++) {
        cyGraphs[i].json(selectedGraph);
        cyGraphs[i].fit();
        cyGraphs[i].userZoomingEnabled(false);
        cyGraphs[i].userPanningEnabled(false);
        cyGraphs[i].nodes().ungrabify();
        cyGraphs[i].edges().unselectify();
        if (i != 0) {
            cyGraphs[i].nodes().unselectify();
        }
    }
    
    updateVals();
}
graphDropdown.addEventListener('change', e => {
    pacoController.reset();
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
    pacoController.reset();
    loadGraph(document.getElementById('graphDropdown'));
}
resetBtn.addEventListener('click', reset);

// Calls the selected algo from the dropdown on the current loaded graph
// Passes the graph, the steps the algo returns, and the algoDisplays to the algoController
function start() {
    const steps = newPacoAlgorithm(cyGraphs[0], nodeDegreeInput.value);
    if (!steps) return;
    const list = [
        {graph: cyGraphs[0], steps: steps[0], displays: algoDisplays},
        {graph: cyGraphs[1], steps: steps[1], displays: algoDisplays1},
        {graph: cyGraphs[2], steps: steps[2], displays: algoDisplays2},
        {graph: cyGraphs[3], steps: steps[3], displays: algoDisplays3},
        {graph: cyGraphs[4], steps: steps[4], displays: algoDisplays4}
    ];
    pacoController.setSteps(list);
};
startBtn.addEventListener("click", start);

// Updates the node/edge count, mstCost and edgeQueue DOM elements' inner text
// to reflect the current graph
function updateVals() {
    nodeCount.innerText = cy.nodes().length;
    edgeCount.innerText = cy.edges().length;
    minCostDisplay.innerText = 0;
}