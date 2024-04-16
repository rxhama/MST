import { AlgoController, CompareController, primsAlgorithm, kruskalsAlgorithm, boruvkasAlgorithm, reverseDeleteAlgorithm, degreeConstrainedPrims, degreeConstrainedKruskals, newBoruvkasAlgorithm, pacoAlgorithm } from '../../utils.js';

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
const algoDropdown1 = document.getElementById('algoDropdown1');
const algoDropdown2 = document.getElementById('algoDropdown2');
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
const algoController1 = new AlgoController();
const algoController2 = new AlgoController();
const compareController = new CompareController(algoController1, algoController2);
window.compareController = compareController;
document.getElementById('play').addEventListener('click', () => compareController.play());
document.getElementById('pause').addEventListener('click', () => compareController.pause());
document.getElementById('next').addEventListener('click', () => compareController.next());
document.getElementById('previous').addEventListener('click', () => compareController.previous());
document.getElementById('toStart').addEventListener('click', () => compareController.toStart());
document.getElementById('toEnd').addEventListener('click', () => compareController.toEnd());

// Initialises the cytoscape instances and loads the first graph from localStorage
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
    compareController.reset();
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
    compareController.reset();
    loadGraph(document.getElementById('graphDropdown'));
}
resetBtn.addEventListener('click', reset);
algoDropdown1.addEventListener('change', reset);
algoDropdown2.addEventListener('change', reset);

// Calls the selected algo from the dropdown on the current loaded graph
// Passes the graph, the steps the algo returns, and the algoDisplays to the algoController
// function start() {
//     const selectedAlgo = algoDropdown.value;
//     const showRejectedEdges = showRejectedEdgesCheckbox.checked;
//     if (selectedAlgo == 'prims') {
//         const steps = primsAlgorithm(cy1, showRejectedEdges);
//         if (!steps) return;
//         algoController.setSteps(cy1, steps, algoDisplays1);
//     }
//     else if (selectedAlgo == 'kruskals') {
//         algoController.setSteps(cy1, kruskalsAlgorithm(cy1, showRejectedEdges), algoDisplays1);
//     }
//     else if (selectedAlgo == 'boruvkas') {
//         if (cy1.nodes().length > 26) {
//             algoController.setSteps(cy1, boruvkasAlgorithm(cy1), algoDisplays1);
//         }
//         else {
//             algoController.setSteps(cy1, newBoruvkasAlgorithm(cy1), algoDisplays1);
//         }
//     }
//     else if (selectedAlgo == 'reverse-delete') {
//         algoController.setSteps(cy1, reverseDeleteAlgorithm(cy1, showRejectedEdges), algoDisplays1);
//     }
//     else if (selectedAlgo == 'dcprims') {
//         const steps = degreeConstrainedPrims(cy1, showRejectedEdges,  nodeDegreeInput.value);
//         if (!steps) return;
//         algoController.setSteps(cy1, steps, algoDisplays1);
//     }
//     else if (selectedAlgo == 'dckruskals') {
//         const steps = degreeConstrainedKruskals(cy1, showRejectedEdges,  nodeDegreeInput.value);
//         if (!steps) return;
//         algoController.setSteps(cy1, steps, algoDisplays1);
//     }
//     else if (selectedAlgo == 'paco') {
//         const steps = pacoAlgorithm(cy1, nodeDegreeInput.value);
//         if (!steps) return;
//         algoController.setSteps(cy1, steps, algoDisplays1);
//     }
// };
// startBtn.addEventListener("click", start);

// function start() {
//     const selectedAlgo1 = algoDropdown1.value;
//     const selectedAlgo2 = algoDropdown2.value;
//     const showRejectedEdges = showRejectedEdgesCheckbox.checked;
//     let steps1, steps2;

//     // Algo 1
//     if (selectedAlgo1 == 'prims') {
//         const steps = primsAlgorithm(cy1, showRejectedEdges);
//         if (!steps) return;
//         steps1 = steps;
//     }
//     else if (selectedAlgo1 == 'kruskals') {
//         steps1 = kruskalsAlgorithm(cy1, showRejectedEdges);
//     }
//     else if (selectedAlgo1 == 'boruvkas') {
//         if (cy1.nodes().length > 26) {
//             steps1 = boruvkasAlgorithm(cy1);
//         }
//         else {
//             steps1 = newBoruvkasAlgorithm(cy1);
//         }
//     }
//     else if (selectedAlgo1 == 'reverse-delete') {
//         steps1 = reverseDeleteAlgorithm(cy1, showRejectedEdges);
//     }
//     else if (selectedAlgo1 == 'dcprims') {
//         const steps = degreeConstrainedPrims(cy1, showRejectedEdges,  nodeDegreeInput.value);
//         if (!steps) return;
//         steps1 = steps;
//     }
//     else if (selectedAlgo1 == 'dckruskals') {
//         const steps = degreeConstrainedKruskals(cy1, showRejectedEdges,  nodeDegreeInput.value);
//         if (!steps) return;
//         steps1 = steps;
//     }
//     else if (selectedAlgo1 == 'paco') {
//         const steps = pacoAlgorithm(cy1, nodeDegreeInput.value);
//         if (!steps) return;
//         steps1 = steps;
//     }

//     // Algo 2
//     if (selectedAlgo1selectedAlgo2 == 'prims') {
//         const steps = primsAlgorithm(cy2, showRejectedEdges);
//         if (!steps) return;
//         steps2 = steps;
//     }
//     else if (selectedAlgo2 == 'kruskals') {
//         steps2 = kruskalsAlgorithm(cy2, showRejectedEdges);
//     }
//     else if (selectedAlgo2 == 'boruvkas') {
//         if (cy2.nodes().length > 26) {
//             steps2 = boruvkasAlgorithm(cy2);
//         }
//         else {
//             steps2 = newBoruvkasAlgorithm(cy2);
//         }
//     }
//     else if (selectedAlgo2 == 'reverse-delete') {
//         steps2 = reverseDeleteAlgorithm(cy2, showRejectedEdges);
//     }
//     else if (selectedAlgo2 == 'dcprims') {
//         const steps = degreeConstrainedPrims(cy2, showRejectedEdges,  nodeDegreeInput.value);
//         if (!steps) return;
//         steps2 = steps;
//     }
//     else if (selectedAlgo2 == 'dckruskals') {
//         const steps = degreeConstrainedKruskals(cy2, showRejectedEdges,  nodeDegreeInput.value);
//         if (!steps) return;
//         steps2 = steps;
//     }
//     else if (selectedAlgo2 == 'paco') {
//         const steps = pacoAlgorithm(cy2, nodeDegreeInput.value);
//         if (!steps) return;
//         steps2 = steps;
//     }

//     if (!steps1 || !steps2) {
//         if (!steps1) {
//             alert('Error with 1st algo selected');
//         }
//         else {
//             alert('Error with 2nd algo selected');
//         }
//         return;
//     }

//     algoController1.setSteps(cy1, steps1, algoDisplays1);
//     algoController2.setSteps(cy2, steps2, algoDisplays2);
// }

function start() {
    const selectedAlgo1 = algoDropdown1.value;
    const selectedAlgo2 = algoDropdown2.value;
    const showRejectedEdges = showRejectedEdgesCheckbox.checked;

    // Calculate steps for Algo 1
    const steps1 = calculateStepsForAlgorithm(selectedAlgo1, cy1, showRejectedEdges);

    // Calculate steps for Algo 2
    const steps2 = calculateStepsForAlgorithm(selectedAlgo2, cy2, showRejectedEdges);

    if (!steps1 || !steps2) {
        if (!steps1 && !steps2) {
            alert('Error with both algorithms selected');
        }
        else if (!steps1) {
            alert('Error with the first algorithm selected');
        }
        else if (!steps2) {
            alert('Error with the second algorithm selected');
        }
        return;
    }

    // If both algorithms have valid steps, set them in their respective controllers in the compare controller
    compareController.setSteps(cy1, steps1, algoDisplays1, cy2, steps2, algoDisplays2);
}
startBtn.addEventListener("click", start);

function calculateStepsForAlgorithm(algo, cyInstance, showRejectedEdges) {
    switch (algo) {
        case 'prims':
            return primsAlgorithm(cyInstance, showRejectedEdges);
        case 'kruskals':
            return kruskalsAlgorithm(cyInstance, showRejectedEdges);
        case 'boruvkas':
            return cyInstance.nodes().length > 26 ? boruvkasAlgorithm(cyInstance) : newBoruvkasAlgorithm(cyInstance);
        case 'reverse-delete':
            return reverseDeleteAlgorithm(cyInstance, showRejectedEdges);
        case 'dcprims':
            return degreeConstrainedPrims(cyInstance, showRejectedEdges, nodeDegreeInput.value);
        case 'dckruskals':
            return degreeConstrainedKruskals(cyInstance, showRejectedEdges, nodeDegreeInput.value);
        case 'paco':
            return pacoAlgorithm(cyInstance, nodeDegreeInput.value);
        default:
            return null; // If no algorithm is matched, return null
    }
}

// Updates the node/edge count, mstCost and edgeQueue DOM elements' inner text
// to reflect the current graph
function updateVals() {
    // nodeCount.innerText = cy1.nodes().length;
    // edgeCount.innerText = cy1.edges().length;
    minCostDisplay1.innerText = 0;
    edgeQueueDisplay1.innerText = '';
    minCostDisplay2.innerText = 0;
    edgeQueueDisplay2.innerText = '';
}

// To verify kruskals
// cy.elements().kruskal(function(edge) {
//     return edge.data('weight');
// }).addClass('chosen');

// window.addEventListener('resize', resize);

// function resize() {
//     cy.fit();
// }