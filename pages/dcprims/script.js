import { AlgoController, degreeConstrainedPrims } from '../../utils.js';

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

// Selecting the first node
cy.$('#a').select();

cy.elements().unselectify();

// Steps for example algo run
let steps = degreeConstrainedPrims(cy, true, 2);

steps[0][0].explanation = `In this example, we are starting at node a and have<br>
                            assigned a degree constraint of 2. We add the adjacent<br>
                            edges of node a, ab (4) and ah (8), to the edge queue.<br><br>
                            We will take the lowest-weighted edge from the<br>
                            edge queue: ab (4)`;
steps[0][1].explanation = `Edge ab doesn't create a cycle and doesn't violate<br>
                            the degree constraint of the edge's nodes, so it<br>
                            is added to the DCMST.<br><br>
                            We add the adjacent edges bc (8) and bh (11)<br>
                            to the edge queue (keeping the queue sorted).<br><br>
                            We will take the next edge from the edge queue,<br>
                            ah (8).`;
steps[0][2].explanation = `Edge ah doesn't create a cycle and doesn't violate<br>
                            the degree constraint, so it is added to the DCMST.<br><br>
                            We add the adjacent edges hi (7) and hg (1) to<br>
                            the edge queue.<br><br>
                            We will take the next edge from the edge queue,<br>
                            hg (1).`;
steps[0][3].explanation = `Edge hg doesn't create a cycle and doesn't violate<br>
                            the degree constraint, so it is added to the DCMST.<br><br>
                            We add the adjacent edges ig (6) and gf (2) to<br>
                            the edge queue.<br><br>
                            We will take the next edge from the edge queue,<br>
                            gf (2).`;
steps[0][4].explanation = `Edge gf doesn't create a cycle and doesn't violate<br>
                            the degree constraint, so it is added to the DCMST.<br><br>
                            We add the adjacent edges cf (4), df (14) and fe (10)<br>
                            to the edge queue.<br><br>
                            We will take the next edge from the edge queue,<br>
                            cf (4).`;
steps[0][5].explanation = `Edge cf doesn't create a cycle and doesn't violate<br>
                            the degree constraint, so it is added to the DCMST.<br><br>
                            We add the adjacent edges ic (2) and cd (7) to<br>
                            the edge queue.<br><br>
                            We will take the next edge from the edge queue,<br>
                            ic (2).`;
steps[0][6].explanation = `Edge cf doesn't create a cycle and doesn't violate<br>
                            the degree constraint, so it is added to the DCMST.<br><br>
                            No adjacent edges to add to edge queue.<br><br>
                            We will take the next edge from the edge queue,<br>
                            ig (6).`;
steps[0][7].explanation = `Edge ig creates a cycle, and also violates the<br>
                            degree constraint of node g as it would have 3<br>
                            edges. We do not add it to the DCMST and continue.<br><br>
                            We will take the next edge from the edge queue,<br>
                            hi (7).`;
steps[0][8].explanation = `Edge hi creates a cycle, and also violates the<br>
                            degree constraint of node h as it would have 3<br>
                            edges. We do not add it to the DCMST and continue.<br><br>
                            We will take the next edge from the edge queue,<br>
                            cd (7).`;
steps[0][9].explanation = `Edge cd does not create cycle, but it violates the<br>
                            degree constraint of node c as it would have 3<br>
                            edges. We do not add it to the DCMST and continue.<br><br>
                            We will take the next edge from the edge queue,<br>
                            bc (8).`;
steps[0][10].explanation = `Edge bc creates a cycle and also violates the<br>
                            degree constraint of node c as it would have 3<br>
                            edges. It's not added to the DCMST.<br><br>
                            Next edge: fe (10).`;
steps[0][11].explanation = `Edge fe does not create cycle, but it violates the<br>
                            degree constraint of node f as it would have 3<br>
                            edges. We do not add it to the DCMST and continue.<br><br>
                            We will take the next edge from the edge queue,<br>
                            bh (11).`;
steps[0][12].explanation = `Edge bh creates a cycle and also violates the<br>
                            degree constraint of node h. It's not added to<br>
                            the DCMST.<br><br>
                            Next edge: df (14).`;
steps[0][13].explanation = `Edge df does not create cycle, but it violates the<br>
                            degree constraint of node f. We do not add it to<br>
                            the DCMST.<br><br>
                            We have no more edges in the edge queue to consider,
                            and the DCMST isn't complete, so the algorithm<br>
                            failed to find a DCMST with the given parameters:<br>
                            starting node and degree constraint.<br><br>
                            Look below for another example but with a different<br>
                            starting node.`;

algoController.setSteps(cy, steps, algoDisplays);


// second example

let cy1 = cytoscape({
    container: cyContainer1, // container to render in
});
cy1.json(graphs[0].graph);
cy1.fit();

cy1.userZoomingEnabled(false);
cy1.userPanningEnabled(false);
cy1.nodes().ungrabify();

// Selecting the first node
cy1.$('#e').select();

cy1.elements().unselectify();

let steps1 = degreeConstrainedPrims(cy1, true, 2);

steps1[0][0].explanation = `Here, we have the same degree constraint of 2, but<br>
                            the starting node is e.<br><br>
                            We add the adjacent edges de (9) and fe (10) to<br>
                            the edge queue.<br><br>
                            Next edge: de (9).`;
steps1[0][1].explanation = `Edge de doesn't create a cycle or violate the<br>
                            degree constraint. It's added to the DCMST.<br><br>
                            We add the adjacent edges cd (7) and df (14) to<br>
                            the edge queue.<br><br>
                            Next edge: cd (7).`;
steps1[0][2].explanation = `Edge cd doesn't create a cycle or violate the<br>
                            degree constraint. It's added to the DCMST.<br><br>
                            We add the adjacent edges bc (8), ic (2) and<br>
                            cf (4) to the edge queue.<br><br>
                            Next edge: ic (2).`;
steps1[0][3].explanation = `Edge ic doesn't create a cycle or violate the<br>
                            degree constraint. It's added to the DCMST.<br><br>
                            We add the adjacent edges hi (7) and ig (6) to<br>
                            the edge queue.<br><br>
                            Next edge: cf (4).`;
steps1[0][4].explanation = `Edge cf doesn't create a cycle, but it violates<br>
                            the degree constraint of node f. It's not added<br>
                            to the DCMST.<br><br>
                            Next edge: ig (6).`;
steps1[0][5].explanation = `Edge ig doesn't create a cycle or violate the<br>
                            degree constraint. It's added to the DCMST.<br><br>
                            We add the adjacent edges hg (1) and gf (2) to<br>
                            the edge queue.<br><br>
                            Next edge: hg (1).`;
steps1[0][6].explanation = `Edge hg doesn't create a cycle or violate the<br>
                            degree constraint. It's added to the DCMST.<br><br>
                            We add the adjacent edges ah (8) and bh (11) to<br>
                            the edge queue.<br><br>
                            Next edge: gf (2).`;
steps1[0][7].explanation = `Edge gf doesn't create a cycle, but it violates<br>
                            the degree constraint of node g. It's not added<br>
                            to the DCMST.<br><br>
                            Next edge: hi (7).`;
steps1[0][8].explanation = `Edge hi creates a cycle and also violates the<br>
                            degree constraint of node i. It's not added to<br>
                            the DCMST.<br><br>
                            Next edge: bc (8).`;
steps1[0][9].explanation = `Edge bc doesn't create a cycle, but it violates<br>
                            the degree constraint of node c. It's not added<br>
                            to the DCMST.<br><br>
                            Next edge: ah (8).`;
steps1[0][10].explanation = `Edge ah doesn't create a cycle or violate the<br>
                            degree constraint. It's added to the DCMST.<br><br>
                            We add the adjacent edge ab (4) to the edge<br>
                            queue.<br><br>
                            Next edge: ab (4).`;
steps1[0][11].explanation = `Edge ab doesn't create a cycle or violate the<br>
                            degree constraint. It's added to the DCMST.<br><br>
                            We add the adjacent edge bc (8) to the edge<br>
                            queue.<br><br>  
                            Next edge: bc (8).`;
steps1[0][12].explanation = `Edge bc creates a cycle and also violates the<br>
                            degree constraint of node c. It's not added to<br>
                            the DCMST.<br><br>
                            Next edge: fe (10).`;
steps1[0][13].explanation = `Edge fe doesn't create a cycle or violate the<br>
                            degree constraint. It's added to the DCMST.<br><br>
                            The algorithm has finished and has found<br>
                            a DCMST with degree constraint of 2.<br><br>
                            DCMST Cost: ${steps1[0][steps1[0].length - 1].mstCost}<br>
                            Standard MST Cost with no constraints: 37<br><br>
                            We can see how the DCMST cost has to sometimes<br>
                            take costlier edges to satisfy the degree constraint.`;

algoController1.setSteps(cy1, steps1, algoDisplays1);