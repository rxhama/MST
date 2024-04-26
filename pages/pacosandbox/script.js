import { AlgoController, PacoController, newPacoAlgorithm } from '../../utils.js';

let graphs = localStorage.getItem('storedGraphs');
if (!graphs) {
    alert('Graphs have been deleted.\nPage will be redirected to the home page to reload initial graphs.');
    window.location.href = '../../index.html';
}
graphs = JSON.parse(graphs);

// Getting the DOM elements for ease of use later on
const cyContainer = document.getElementById('cy');
const ant1Container = document.getElementById('ant1');
const ant2Container = document.getElementById('ant2');
const ant3Container = document.getElementById('ant3');
const ant4Container = document.getElementById('ant4');
const bestTreeContainer = document.getElementById('cy2');
const minCostDisplay = document.getElementById('minCostDisplay');
const minCostDisplay2 = document.getElementById('minCostDisplay2');
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
algoDisplays1.cyContainer = ant1Container;
const algoDisplays2 = {};
algoDisplays2.cyContainer = ant2Container;
const algoDisplays3 = {};
algoDisplays3.cyContainer = ant3Container;
const algoDisplays4 = {};
algoDisplays4.cyContainer = ant4Container;
const algoDisplays5 = {};
algoDisplays5.cyContainer = bestTreeContainer;
algoDisplays5.minCostDisplay = minCostDisplay2;

let algoDisplaysList = [
    algoDisplays,
    algoDisplays1,
    algoDisplays2,
    algoDisplays3,
    algoDisplays4,
    algoDisplays5
];

// Initialise this page's algoController and it's buttons' even listeners
const mainAC = new AlgoController();
const ant1AC = new AlgoController();
const ant2AC = new AlgoController();
const ant3AC = new AlgoController();
const ant4AC = new AlgoController();
const bestTreeAC = new AlgoController();
let ACs = [
    mainAC,
    ant1AC,
    ant2AC,
    ant3AC,
    ant4AC,
    bestTreeAC
];
const pacoController = new PacoController(ACs);
window.pacoController = pacoController;
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
let ant1 = cytoscape({
    container: ant1Container
});
// Ant 2 graph
let ant2 = cytoscape({
    container: ant2Container
});
// Ant 3 graph
let ant3 = cytoscape({
    container: ant3Container
});
// Ant 4 graph
let ant4 = cytoscape({
    container: ant4Container
});
// Best tree graph
let cy2 = cytoscape({
    container: bestTreeContainer
})

let cyGraphs = [cy, ant1, ant2, ant3, ant4, cy2];

for (let i = 0; i < cyGraphs.length; i++) {
    let graph = graphs[0].graph;
    if (i == 5) {
        graph = JSON.parse(JSON.stringify(graph));
    }
    cyGraphs[i].json(graph);
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
        container: ant1Container
    });
    cyGraphs[2] = cytoscape({
        container: ant2Container
    });
    cyGraphs[3] = cytoscape({
        container: ant3Container
    });
    cyGraphs[4] = cytoscape({
        container: ant4Container
    });
    cyGraphs[5] = cytoscape({
        container: bestTreeContainer
    })
    for (let i = 0; i < cyGraphs.length; i++) {
        let graph = selectedGraph;
        if (i == 5) {
            graph = JSON.parse(JSON.stringify(selectedGraph));
        }
        cyGraphs[i].json(graph);
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
        {graph: cyGraphs[4], steps: steps[4], displays: algoDisplays4},
        {graph: cyGraphs[5], steps: steps[5], displays: algoDisplays5}
    ];
    pacoController.setSteps(list);
    console.log(`Steps set!`);
};
startBtn.addEventListener("click", start);

// Updates the node/edge count, mstCost and edgeQueue DOM elements' inner text
// to reflect the current graph
function updateVals() {
    nodeCount.innerText = cy.nodes().length;
    edgeCount.innerText = cy.edges().length;
    minCostDisplay.innerText = 0;
}