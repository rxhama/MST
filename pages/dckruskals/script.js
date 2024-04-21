import { AlgoController, degreeConstrainedKruskals } from '../../utils.js';

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
const cyContainer1 = document.getElementById('cy1');
const minCostDisplay1 = document.getElementById('minCostDisplay1');
const edgeQueueDisplay1 = document.getElementById('edgeQueueDisplay1');
const explanationDisplay1 = document.getElementById('explanationDisplay1');

// These are the displays that are passed to the algoController
const algoDisplays = {};
algoDisplays.minCostDisplay = minCostDisplay;
algoDisplays.edgeQueueDisplay = edgeQueueDisplay;
algoDisplays.cyContainer = cyContainer;
algoDisplays.explanationDisplay = explanationDisplay;

const algoDisplays1 = {};
algoDisplays1.minCostDisplay = minCostDisplay1;
algoDisplays1.edgeQueueDisplay = edgeQueueDisplay1;
algoDisplays1.cyContainer = cyContainer1;
algoDisplays1.explanationDisplay = explanationDisplay1;

// Initialise this page's algoController and it's buttons' even listeners
const algoController = new AlgoController();
algoController.speed = 3000;
document.getElementById('play').addEventListener('click', () => algoController.play());
document.getElementById('pause').addEventListener('click', () => algoController.pause());
document.getElementById('next').addEventListener('click', () => algoController.next());
document.getElementById('previous').addEventListener('click', () => algoController.previous());
document.getElementById('toStart').addEventListener('click', () => algoController.toStart());
document.getElementById('toEnd').addEventListener('click', () => algoController.toEnd());

const algoController1 = new AlgoController();
algoController1.speed = 3000;
document.getElementById('play1').addEventListener('click', () => algoController1.play());
document.getElementById('pause1').addEventListener('click', () => algoController1.pause());
document.getElementById('next1').addEventListener('click', () => algoController1.next());
document.getElementById('previous1').addEventListener('click', () => algoController1.previous());
document.getElementById('toStart1').addEventListener('click', () => algoController1.toStart());
document.getElementById('toEnd1').addEventListener('click', () => algoController1.toEnd());

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
let steps = degreeConstrainedKruskals(cy, true, 2);

steps[0][0].explanation = `In this example, we have an assigned degree<br>
                            constraint of 2. The edges have been sorted<br>
                            in ascending order (based on their weights) into<br>
                            the edge queue (yellow lines) on the left, just<br>
                            like in standard Kruskal's.<br><br>
                            We will take the first edge, hg (1), from the edge<br>
                            queue.`;
steps[0][1].explanation = `Edge hg doesn't create a cycle and doesn't violate<br>
                            the degree constraint of the edge's nodes, so it<br>
                            is added to the DCMST.<br><br>
                            Next edge: ic (2)`;
steps[0][2].explanation = `Edge ic doesn't create a cycle and doesn't violate<br>
                            the degree constraint of the edge's nodes, so it<br>
                            is added to the DCMST.<br><br>
                            Next edge: gf (2)`;
steps[0][3].explanation = `Edge gf doesn't create a cycle and doesn't violate<br>
                            the degree constraint of the edge's nodes, so it<br>
                            is added to the DCMST.<br><br>
                            Next edge: ab (4)`;
steps[0][4].explanation = `Edge ab doesn't create a cycle and doesn't violate<br>
                            the degree constraint of the edge's nodes, so it<br>
                            is added to the DCMST.<br><br>
                            Next edge: cf (4)`;
steps[0][5].explanation = `Edge cf doesn't create a cycle and doesn't violate<br>
                            the degree constraint of the edge's nodes, so it<br>
                            is added to the DCMST.<br><br>
                            Next edge: ig (4)`;
steps[0][6].explanation = `Edge ig creates a cycle, and also violates the<br>
                            degree constraint of node g as it would have 3<br>
                            edges. We do not add it to the DCMST and continue.<br><br>
                            Next edge: hi (7)`;
steps[0][7].explanation = `Edge hi doesn't violate the degree constraint, but<br>
                            it creates a cycle. It's not added to the DCMST.<br><br>
                            Next edge: cd (7)`;
steps[0][8].explanation = `Edge cd doesn't create a cycle, but it violates the<br>
                            degree constraint of node c. It's not added to the<br>
                            DCMST.<br><br>
                            Next edge: ah (8)`;
steps[0][9].explanation = `Edge ah doesn't create a cycle and doesn't violate<br>
                            the degree constraint of the edge's nodes, so it<br>
                            is added to the DCMST.<br><br>
                            Next edge: bc (8)`;
steps[0][10].explanation = `Edge bc creates a cycle, and also violates the<br>
                            degree constraint of node c. It's not added to<br>
                            the DCMST.<br><br>
                            Next edge: de (9)`;
steps[0][11].explanation = `Edge de doesn't create a cycle and doesn't violate<br>
                            the degree constraint of the edge's nodes, so it<br>
                            is added to the DCMST.<br><br>
                            Next edge: fe (10)`;
steps[0][12].explanation = `Edge fe doesn't create a cycle, but it violates the<br>
                            degree constraint of node f. It's not added to the<br>
                            DCMST.<br><br>
                            Next edge: bh (11)`;
steps[0][13].explanation = `Edge bh creates a cycle, and also violates the<br>
                            degree constraint of node h. It's not added to<br>
                            the DCMST.<br><br>
                            Next edge: df (14)`;
steps[0][14].explanation = `Edge df doesn't create a cycle, but it violates the<br>
                            degree constraint of node f. It's not added to<br>
                            the DCMST.<br><br>
                            We have no more edges in the edge queue to<br>
                            consider, and the DMCST isn't complete, so the<br>
                            algorithm failed to find a DCMST with the given<br>
                            degree constraint of 2.`;

algoController.setSteps(cy, steps, algoDisplays);


// Second example

let cy1 = cytoscape({
    container: cyContainer1, // container to render in
});
cy1.json(graphs[0].graph);
cy1.fit();

cy1.userZoomingEnabled(false);
cy1.userPanningEnabled(false);
cy1.nodes().ungrabify();
cy1.elements().unselectify();

// Steps for example algo run
let steps1 = degreeConstrainedKruskals(cy1, true, 3);

steps1[0][0].explanation = `In this example, we have an assigned degree<br>
                            constraint of 3. The edges have been sorted<br>
                            in ascending order (based on their weights) into<br>
                            the edge queue (yellow lines) on the left, just<br>
                            like in standard Kruskal's.<br><br>
                            We will take the first edge, hg (1), from the edge<br>
                            queue.`;
steps1[0][1].explanation = `Edge hg doesn't create a cycle and doesn't violate<br>
                            the degree constraint of the edge's nodes, so it<br>
                            is added to the DCMST.<br><br>
                            Next edge: ic (2)`;
steps1[0][2].explanation = `Edge ic doesn't create a cycle and doesn't violate<br>
                            the degree constraint of the edge's nodes, so it<br>
                            is added to the DCMST.<br><br>
                            Next edge: gf (2)`;
steps1[0][3].explanation = `Edge gf doesn't create a cycle and doesn't violate<br>
                            the degree constraint of the edge's nodes, so it<br>
                            is added to the DCMST.<br><br>
                            Next edge: ab (4)`;
steps1[0][4].explanation = `Edge ab doesn't create a cycle and doesn't violate<br>
                            the degree constraint of the edge's nodes, so it<br>
                            is added to the DCMST.<br><br>
                            Next edge: cf (4)`;
steps1[0][5].explanation = `Edge cf doesn't create a cycle and doesn't violate<br>
                            the degree constraint of the edge's nodes, so it<br>
                            is added to the DCMST.<br><br>
                            Next edge: ig (6)`;
steps1[0][6].explanation = `Edge ig doesn't violate the degree constraint of node<br>
                            g this time, as it would have 3 edges which is<br>
                            <= degree constraint of 3. However, it still creates<br>
                            a cycle so it's not added to the DCMST.<br><br>
                            Next edge: hi (7)`;
steps1[0][7].explanation = `Edge hi doesn't violate the degree constraint, but<br>
                            it creates a cycle. It's not added to the DCMST.<br><br>
                            Next edge: cd (7)`;
steps1[0][8].explanation = `In the previous example, edge cd violated the degree<br>
                            constraint of node c, but this time it doesn't.<br>
                            It also doesn't create a cycle. It's added to the<br>
                            DCMST.<br><br>
                            Next edge: ah (8)`;
steps1[0][9].explanation = `Edge ah doesn't create a cycle and doesn't violate<br>
                            the degree constraint of the edge's nodes, so it<br>
                            is added to the DCMST.<br><br>
                            Next edge: bc (8)`;
steps1[0][10].explanation = `Edge bc creates a cycle, and also violates the<br>
                            degree constraint of node c as it would have 4<br>
                            edges, so it's not added to the DCMST.<br><br>
                            Next edge: de (9)`;
steps1[0][11].explanation = `Edge de doesn't create a cycle and doesn't violate<br>
                            the degree constraint of the edge's nodes, so it<br>
                            is added to the DCMST.<br><br>
                            The algorithm has finished and has found<br>
                            a DCMST with degree constraint of 3.<br><br>
                            DCMST Cost: ${steps1[0][steps1[0].length - 1].mstCost}<br>
                            Standard MST Cost with no constraints: 37<br><br>
                            Since the standard Kruskal's MST for this graph<br>
                            already satifies the degree constraint of 3,<br>
                            this DCMST is the same as the standard MST.<br><br>
                            See Degree-Constrained Prim's to see how DCMSTs<br>
                            usually have higher costs than standard MSTs.`;

algoController1.setSteps(cy1, steps1, algoDisplays1);