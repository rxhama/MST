import { AlgoController, newBoruvkasAlgorithm } from '../../utils.js'; // REMOVE KRUSKALSSS??????????????????????????

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
let steps = newBoruvkasAlgorithm(cy, true);
console.log(steps[0].length);
//                        `-------------------------------------------------`;
steps[0][0].explanation = `Initially, all nodes are in their own group.<br>
                            We now start looping through the groups until<br>
                            there is only one group remaining/the number<br>
                            of edges in the MST is V - 1, where V is the<br>
                            number of nodes/vertices in the graph.<br><br>
                            Starting with group a, the lowest-weighted edge<br>
                            connecting it to another group is edge ab (4)<br>
                            (edgeId(edgeWeight)).`;
steps[0][1].explanation = `Edge ab is added to the MST, merging groups<br>
                            a and b into { a, b }.<br><br>
                            The next group to check would be group b, but<br>
                            since we have already merged it with another group<br>
                            this round, we will skip it.<br><br>
                            Next group is group c. The lowest-weighted edge<br>
                            connecting it to another group is edge ic (2).`;
steps[0][2].explanation = `Edge ic is added to the MST, merging groups<br>
                            i and c into { i, c }.<br><br>
                            Next group is group d. The lowest-weighted edge<br>
                            connecting it to another group is edge cd (7).`;
steps[0][3].explanation = `Edge cd is added to the MST, merging groups<br>
                            { i, c } and d into { i, c, d }.<br><br>
                            Next group is group e. The lowest-weighted edge<br>
                            connecting it to another group is edge de (9).`;
steps[0][4].explanation = `Edge de is added to the MST, merging groups<br>
                            { i, c, d } and e into { i, c, d, e }.<br><br>
                            Next group is group f. The lowest-weighted edge<br>
                            connecting it to another group is edge gf (2).`;
steps[0][5].explanation = `Edge gf is added to the MST, merging groups<br>
                            g and f into { g, f }.<br><br>
                            Next group is group h. The lowest-weighted edge<br>
                            connecting it to another group is edge hg (1).`;
steps[0][6].explanation = `Edge hg is added to the MST, merging groups<br>
                            { g, f } and h into { h, g, f }.<br><br>
                            This round is over, and we will loop through the<br>
                            groups again, starting with group { a, b }. The<br>
                            lowest-weighted edge connecting it to another group<br>
                            is ah (8).`;
steps[0][7].explanation = `Edge ah is added to the MST, merging groups<br>
                            { a, b } and { h, g, f} into { a, b, h, g, f }.<br><br>
                            Next group is group { i, c, d, e}. The<br>
                            lowest-weighted edge connecting it to another<br>
                            group is edge cf (4).`;
steps[0][8].explanation = `Edge cf is added to the MST, merging groups<br>
                            { i, c, d, e } and { a, b, h, g, f} into<br>
                            { i, c, d, e, a, b, h, g, f }.<br><br>
                            The algorithm is now finished as there is only<br>
                            one group remaining/the number of edges in the<br>
                            MST is equal to V - 1, where V is the number of<br>
                            nodes/vertices in the graph.`;

algoController.setSteps(cy, steps, algoDisplays);