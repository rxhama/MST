import { AlgoController, primsAlgorithm } from '../../utils.js';

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

// Selecting the first node
cy.$('#a').select();

cy.elements().unselectify();

// Steps for example algo run
let steps = primsAlgorithm(cy, true);
console.log(steps[0].length);
steps[0][0].explanation = `For this example, we will start at node a,<br>
                            which is highlighted. Edges ab (4) and ah (8)<br>
                            (edgeId(edgeWeight)) are the adjacent edges to<br>
                            this node, so they are added to the edge queue<br>
                            (sorted in non-decreasing order of edge weights).<br><br>
                            We will take the lowest-weighted edge from the<br>
                            edge queue: ab (4)`;
steps[0][1].explanation = `Adding the edge ab to the MST doesn't create<br>
                            a cycle so it is added to the MST (blue lines).<br><br>
                            Now that node b is connected to the MST, we can<br>
                            add its adjacent edges, bc (8) and bh (11),<br>
                            to the edge queue (keeping the queue sorted).<br><br>
                            We will take the next edge from the edge queue,<br>
                            ah (8).`;
steps[0][2].explanation = `Adding edge ah doesn't create a cycle so it is<br>
                            added to the MST.<br><br>
                            We add node h's adjacent edges, hg (1) and hi (7),<br>
                            to the edge queue. (We do not add edge bh as it is<br>
                            already in the edge queue).<br><br>
                            We will take the next edge from the edge queue,<br>
                            hg (1).`;
steps[0][3].explanation = `Adding edge hg doesn't create a cycle so it is<br>
                            added to the MST.<br><br>
                            We add node g's adjacent edges, ig (6) and gf (2),<br>
                            to the edge queue.<br><br>
                            We will take the next edge from the edge queue,<br>
                            gf (2).`;
steps[0][4].explanation = `Adding edge gf doesn't create a cycle so it is<br>
                            added to the MST.<br><br>
                            We add node f's adjacent edges, cf (4), df (14)<br>
                            and fe (10), to the edge queue.<br><br>
                            We will take the next edge cf (4).`;
steps[0][5].explanation = `Adding edge cf doesn't create a cycle so it is<br>
                            added to the MST.<br><br>
                            We add node c's adjacent edges, ic (2) and cd (7),<br>
                            to the edge queue. (Once again, ignoring edge bc).<br><br>
                            We will take the next edge ic (2).`;
steps[0][6].explanation = `Adding edge ic doesn't create a cycle so it is<br>
                            added to the MST.<br><br>
                            There are no new adjacent edges to add to the<br>
                            edge queue.<br><br>
                            We will take the next edge ig (6).`;
steps[0][7].explanation = `Adding edge ig creates a cycle in the MST, so<br>
                            it is not added to the MST.<br><br>
                            We will take the next edge hi (7).`;
steps[0][8].explanation = `Adding edge hi creates a cycle in the MST, so<br>
                            it is not added to the MST.<br><br>
                            We will take the next edge cd (7).`;
steps[0][9].explanation = `Adding edge cd doesn't create a cycle so it is<br>
                            added to the MST.<br><br>
                            We add edge de (9) to the edge queue.<br><br>
                            We will take the next edge bc (8).`;
steps[0][10].explanation = `Adding edge bc creates a cycle in the MST, so<br>
                            it is not added to the MST.<br><br>
                            We will take the next edge de (9).`;
steps[0][11].explanation = `Adding edge de doesn't create a cycle so it is<br>
                            added to the MST.<br><br>
                            The MST is now complete, as all nodes are connected<br>
                            and there are V - 1 edges. We can stop here.`;

algoController.setSteps(cy, steps, algoDisplays);