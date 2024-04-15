import { AlgoController, kruskalsAlgorithm } from '../../utils.js'; // REMOVE KRUSKALSSS??????????????????????????

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
const explanationDisplay = document.getElementById('explanationDisplay');

// These are the displays that are passed to the algoController
const algoDisplays = {};
algoDisplays.minCostDisplay = minCostDisplay;
algoDisplays.edgeQueueDisplay = edgeQueueDisplay;
algoDisplays.cyContainer = cyContainer;
algoDisplays.explanationDisplay = explanationDisplay;

// Initialise this page's algoController and it's buttons' even listeners
const algoController = new AlgoController();
algoController.speed = 3000;
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
cy.elements().unselectify();

// Steps for example algo run

let steps = kruskalsAlgorithm(cy, true);
steps[0][0].explanation = `The edges of the graph have been sorted in<br>
                            non-decreasing order into the edge queue<br>
                            (yellow lines) on the left.<br><br>
                            We will take the first edge hg with a weight of 1<br>
                            from the edge queue.`;
steps[0][1].explanation = `Adding the edge hg to the MST doesn't create<br>
                            a cycle so it is added to the MST (blue lines).<br><br>
                            The next edge is ic with weight 2.`;
steps[0][2].explanation = `Edge ic does not create a cycle, so it is added<br>
                            to the MST.<br><br>
                            The next edge is gf with weight 2.`;
steps[0][3].explanation = `Edge gf does not create a cycle, so it is added<br>
                            to the MST.<br><br>
                            The next edge is ab with weight 4.`;
steps[0][4].explanation = `Edge ab does not create a cycle, so it is added<br>
                            to the MST.<br><br>
                            The next edge is cf with weight 4.`;
steps[0][5].explanation = `Edge cf does not create a cycle, so it is added<br>
                            to the MST.<br><br>
                            The next edge is ig with weight 6.`;
steps[0][6].explanation = `Adding edge ig to the MST creates a cycle, so it is<br>
                            not added to the MST.<br><br>
                            The next edge is hi with weight 7.`;
steps[0][7].explanation = `Adding edge hi to the MST creates a cycle, so it is<br>
                            not added to the MST.<br><br>
                            The next edge is cd with weight 7.`;
steps[0][8].explanation = `Edge cd does not create a cycle, so it is added<br>
                            to the MST.<br><br>
                            The next edge is ah with weight 8.`;
steps[0][9].explanation = `Edge ah does not create a cycle, so it is added<br>
                            to the MST.<br><br>
                            The next edge is bc with weight 8.`;
steps[0][10].explanation = `Adding edge bc to the MST creates a cycle, so it is<br>
                            not added to the MST.<br><br>
                            The next edge is de with weight 8.`;
steps[0][11].explanation = `Edge de does not create a cycle, so it is added<br>
                            to the MST.<br><br>
                            The MST is now complete, as all nodes are connected<br>
                            and there are V - 1 edges. We can stop here.`;

algoController.setSteps(cy, steps, algoDisplays);