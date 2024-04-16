import { AlgoController, reverseDeleteAlgorithm } from '../../utils.js';

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

let steps = reverseDeleteAlgorithm(cy, true);
steps[0][0].explanation = `The edges of the graph have been sorted in<br>
                            descending order (based on their weights)<br>
                            into the edge queue on the left.<br><br>
                            We will take the first edge df (14)<br>
                            (edgeId(edgeWeight)) from the edge queue.`;
steps[0][1].explanation = `Removing edge df from the MST did not<br>
                            further disconnect the graph, so it<br>
                            is removed from the MST.<br><br>
                            The next edge is bh (11).`
steps[0][2].explanation = `Removing edge bh from the MST did not<br>
                            further disconnect the graph, so it<br>
                            is removed from the MST.<br><br>
                            The next edge is fe (10).`
steps[0][3].explanation = `Removing edge fe from the MST did not<br>
                            further disconnect the graph, so it<br>
                            is removed from the MST.<br><br>
                            The next edge is de (9).`
steps[0][4].explanation = `Removing edge de from the MST would further<br>
                            disconnect the graph into 2 groups. Node e<br>
                            would be isolated from the rest of the graph.<br>
                            Therefore, edge de is not removed from the MST.<br><br>
                            The next edge is ah (8)`;
steps[0][5].explanation = `Removing edge ah from the MST did not<br>
                            further disconnect the graph, so it<br>
                            is removed from the MST.<br><br>
                            The next edge is bc (8).`
steps[0][6].explanation = `Removing edge bc from the MST would further<br>
                            disconnect the graph into 2 groups. The group<br>
                            constisting of nodes a and b would be isolated<br>
                            from the rest of the graph. Therefore, edge bc<br>
                            is not removed from the MST.<br><br>
                            The next edge is hi (7)`;
steps[0][7].explanation = `Removing edge hi from the MST did not<br>
                            further disconnect the graph, so it<br>
                            is removed from the MST.<br><br>
                            The next edge is cd (7).`
steps[0][8].explanation = `Removing edge cd from the MST would further<br>
                            disconnect the graph into 2 groups. The group<br>
                            constisting of nodes d and e would be isolated<br>
                            from the rest of the graph. Therefore, edge cd<br>
                            is not removed from the MST.<br><br>
                            The next edge is ig (6)`;
steps[0][9].explanation = `Removing edge ig from the MST did not<br>
                            further disconnect the graph, so it<br>
                            is removed from the MST.<br><br>
                            The process is finished and the MST is now<br>
                            complete, as it has V - 1 edges, where V is<br>
                            the number of nodes/vertices in the graph.`;

algoController.setSteps(cy, steps, algoDisplays);