// import { testNumber, AlgoController, primsAlgorithm, kruskalsAlgorithm, boruvkasAlgorithm } from './utils.js';

const minCostDisplay = document.getElementById('minCostDisplay');
const edgeQueueDisplay = document.getElementById('edgeQueueDisplay');

async function loadInitialGraphs() {
    if (localStorage.getItem("storedGraphs") == null) {
        const response = await fetch("initialGraphs.json");
        const graphs = await response.json();
        console.log("Graphs loaded from initialGraphs.json");
        localStorage.setItem("storedGraphs", JSON.stringify(graphs));
    }
    else {
        console.log("Graphs already loaded");
    }
}

class AlgoController {
    constructor() {
        this.steps = [];
        this.currentIndex = 0;
        this.playing = false;
        this.timeout = null;
    }

    setSteps(steps) {
        this.steps = steps;
        this.currentIndex = 0;
        this.playing = false;
        if (this.timeout) {
            clearTimeout(this.timeout);
            this.timeout = null;
        }
        this.initData();
    }

    initData() {
        this.updateDisplays(this.steps[0]);
    }

    executeStep(index) {
        if (index < 0 || index >= this.steps.length) return;

        const step = this.steps[index];
        Object.entries(step.change.changes).forEach(([id, classNames]) => {
            classNames.forEach(className => {
                if (className == 'outlined') {
                    if (step.change.add) {
                        cy1.$(`#${id}`).flashClass(className);
                    }
                }
                else {
                    if (step.change.add) {
                        cy1.$(`#${id}`).addClass(className);
                    }
                    else {
                        cy1.$(`#${id}`).removeClass(className);
                    }
                }
            })
        });

        this.updateDisplays(step);
    }

    undoStep(index) {
        if (index < 0 || index >= this.steps.length) return;
        const step = this.steps[index];
        Object.keys(step.change.changes).forEach(id => {
            if (step.change.add) {
                cy1.$(`#${id}`).removeClass(step.change.changes[id]);
            }
            else {
                cy1.$(`#${id}`).addClass(step.change.changes[id]);
            }
        })
        if (index < 1) {
            this.updateDisplays(this.steps[0]);
        }
        else {
            this.updateDisplays(this.steps[index - 1]);
        }
    }

    play() {
        if (this.currentIndex < this.steps.length && !this.playing) {
            this.playing = true;
            this.playSteps();
        }
    }

    playSteps() {
        if (this.currentIndex < this.steps.length && this.playing) {
            this.executeStep(this.currentIndex);
            this.currentIndex++;

            this.timeout = setTimeout(() => {
                this.playSteps()
            }, 1000)
        }
        else {
            this.pause();
        }
    }

    pause() {
        if (this.playing) {
            clearTimeout(this.timeout);
            this.playing = false;
        }
    }

    next() {
        if (this.currentIndex >= this.steps.length) {
            this.pause();
            return;
        }
        this.pause();
        this.executeStep(this.currentIndex);
        this.currentIndex++;
    }

    previous() {
        if (this.currentIndex <= 0) {
            this.pause();
            cy1.elements().classes('');
            return;
        }
        this.pause();
        this.currentIndex--;
        this.undoStep(this.currentIndex);
    }

    toStart() {
        this.pause();
        for (let i = this.currentIndex; i >= 0; i--) {
            this.undoStep(i);
        }
        this.currentIndex = 0;
    }

    toEnd() {
        this.pause();
        for (let i = this.currentIndex; i < this.steps.length; i++) {
            this.executeStep(i);
        }
        this.currentIndex = this.steps.length;
    }

    updateDisplays(step) {
        minCostDisplay.innerText = step.mstCost;
        edgeQueueDisplay.innerText = '';
        if (step.edgeQueue.length > 0) {
            const list = document.createElement('ul');
            step.edgeQueue.forEach(edge => {
                const item = document.createElement('li');
                item.innerText = edge;
                list.appendChild(item);
            });
            edgeQueueDisplay.appendChild(list);
        }
    }
}

const algoController = new AlgoController();

document.getElementById('play').addEventListener('click', () => algoController.play());
document.getElementById('pause').addEventListener('click', () => algoController.pause());
document.getElementById('next').addEventListener('click', () => algoController.next());
document.getElementById('previous').addEventListener('click', () => algoController.previous());
document.getElementById('toStart').addEventListener('click', () => algoController.toStart());
document.getElementById('toEnd').addEventListener('click', () => algoController.toEnd());

let cy1 = cytoscape({
    container: document.getElementById('cy'), // container to render in
});
loadInitialGraphs().then(() => {
    let graphs = JSON.parse(localStorage.getItem('storedGraphs') || '[]');
    cy1.json(graphs[0].graph);
    cy1.fit();
    
    populateDropdown();
    updateVals();
});

function primsAlgorithm(graph) {
    if (graph.nodes(':selected').length != 1) {
        cy1.elements().unselect();
        alert('Please select a single starting node');
        return;
    }

    const steps = [];
    let mstCost = 0; // Cost of minimum spanning tree at each step

    let edgeQueue = graph.collection();
    let visitedEdges = graph.collection();
    let unvisitedNodes = graph.nodes();

    let currNode = graph.nodes(':selected');
    unvisitedNodes = unvisitedNodes.difference(currNode);

    // Sorting initial edge queue by weight - ascending order
    const initAdjacentEdges = currNode.connectedEdges().filter(edge => !visitedEdges.contains(edge) && (unvisitedNodes.contains(edge.source()) != unvisitedNodes.contains(edge.target())));
    edgeQueue = edgeQueue.union(initAdjacentEdges);
    edgeQueue = edgeQueue.sort(function(a, b) {
        return a.data('weight') - b.data('weight')
    });

    // Initial step
    const initStep = {};
    initStep.change = {};
    initStep.change.add = true;
    initStep.change.changes = {};
    initStep.change.changes[currNode.data('id')] = ['chosen'];
    edgeQueue.forEach(edge => {
        initStep.change.changes[edge.data('id')] = ['search'];
    });
    initStep.edgeQueue = initAdjacentEdges.map(edge => `${edge.data('id')} (${edge.data('weight')})`);
    initStep.mstCost = mstCost;
    steps.push(initStep);


    while (!unvisitedNodes.empty()) {
        const step = {};

        // Choosing edge
        let nextEdge = null;
        while (nextEdge == null) {
            const edge = edgeQueue[0];
            if (unvisitedNodes.contains(edge.source()) || unvisitedNodes.contains(edge.target())) {
                nextEdge = edge;
                break;
            }
            edgeQueue = edgeQueue.difference(edge);
        }
        edgeQueue = edgeQueue.difference(nextEdge);
        visitedEdges = visitedEdges.union(nextEdge);
        
        mstCost += nextEdge.data('weight');
        
        // Getting next node edge will take us to
        let nextNode = null;
        if (unvisitedNodes.contains(nextEdge.source())) {
            nextNode = nextEdge.source();
        }
        else {
            nextNode = nextEdge.target();
        }
        unvisitedNodes = unvisitedNodes.difference(nextNode);

        currNode = nextNode;

        // Adding adjacent edges to edgeQueue and sorting edgeQueue by weight
        const adjacentEdges = currNode.connectedEdges().filter(edge => !visitedEdges.contains(edge) && (unvisitedNodes.contains(edge.source()) != unvisitedNodes.contains(edge.target())));
        edgeQueue = edgeQueue.union(adjacentEdges);
        edgeQueue = edgeQueue.sort(function(a, b) {
            return a.data('weight') - b.data('weight')
        });

        step.mstCost = mstCost;
        step.edgeQueue = edgeQueue.map(edge => `${edge.data('id')} (${edge.data('weight')})`);
        step.change = {};
        step.change.add = true;
        step.change.changes = {};
        step.change.changes[nextEdge.data('id')] = ['chosen'];
        step.change.changes[nextNode.data('id')] = ['chosen'];
        adjacentEdges.forEach(edge => {
            step.change.changes[edge.data('id')] = ['search'];
        });

        steps.push(step);
    }
    console.log("PRIMS COMPLETED!!!");
    algoController.setSteps(steps);
    return steps;
}

function kruskalsAlgorithm(graph) {
    const steps = [];
    let mstCost = 0; // Cost of minimum spanning tree at each step
    
    let unvisitedNodes = graph.nodes();
    const targetEdgeCount = unvisitedNodes.length - 1;
    let edgeCount = 0;

    // For each node:
    // Key = node id and value = collection of nodes the key node is in
    let groupDict = {};
    unvisitedNodes.forEach(node => {
        const nodeId = node.data('id');
        groupDict[nodeId] = graph.collection();
        groupDict[nodeId] = groupDict[nodeId].union(node);
    });

    // Sorting edge queue by weight - ascending order
    let edgeQueue = graph.edges();
    edgeQueue = edgeQueue.sort(function(a, b) {
        return a.data('weight') - b.data('weight')
    });

    // Init step with 0 changes, 0 cost, just displaying the initial edgeQueue
    const initStep = {};
    initStep.change = {};
    initStep.change.add = true;
    initStep.change.changes = {};
    initStep.mstCost = mstCost;
    initStep.edgeQueue = edgeQueue.map(edge => `${edge.data('id')} (${edge.data('weight')})`);
    steps.push(initStep);
    
    while (edgeCount < targetEdgeCount) {
        const step = {};

        // Choosing edge
        let nextEdge = null;
        while (nextEdge == null) {
            const edge = edgeQueue[0];
            const sourceId = edge.source().data('id');
            const targetId = edge.target().data('id');
            if (groupDict[sourceId].intersection(groupDict[targetId]).empty()) {
                nextEdge = edge;
                edgeCount++;
                groupDict[sourceId] = groupDict[sourceId].union(groupDict[targetId]);
                groupDict[sourceId].forEach(function(node) {
                    groupDict[node.data('id')] = groupDict[sourceId];
                });

                break;
            }
            edgeQueue = edgeQueue.difference(edge);
        }
        edgeQueue = edgeQueue.difference(nextEdge);

        mstCost += nextEdge.data('weight');
        step.mstCost = mstCost;
        step.edgeQueue = edgeQueue.map(edge => `${edge.data('id')} (${edge.data('weight')})`);
        step.change = {};
        step.change.add = true;
        step.change.changes = {};
        step.change.changes[nextEdge.data('id')] = ['chosen'];
        
        // Getting source and target nodes of edge
        const sourceNode = nextEdge.source();
        const targetNode = nextEdge.target();
        if (unvisitedNodes.contains(sourceNode)) {
            unvisitedNodes = unvisitedNodes.difference(sourceNode);

            step.change.changes[sourceNode.data('id')] = ['chosen'];
        }
        if (unvisitedNodes.contains(targetNode)) {
            unvisitedNodes = unvisitedNodes.difference(targetNode);

            step.change.changes[targetNode.data('id')] = ['chosen'];
        }

        steps.push(step);
    }
    console.log("KRUSKALS COMPLETED!!!");
    algoController.setSteps(steps);
}

function reverseDeleteAlgorithm(graph) {
    const steps = [];
    let mstCost = graph.edges().reduce((sum, edge) => {
        return sum + edge.data('weight');
    }, 0); // Cost of minimum spanning tree at each step
    
    let edgeCount = graph.edges().length;

    // Since all edges are chosen initially, we can track of if they're
    // chosen here, by id. This is to avoid actually removing edges
    // from the chosen class before the search is done and therefore
    // avoid the edge changing colour before we even know if we want
    // to remove that edge
    let edgeInGraph = {};
    graph.edges().forEach(edge => {
        edgeInGraph[edge.data('id')] = true;
    });

    // Sort edge queue by weight - descending order
    let edgeQueue = graph.edges();
    edgeQueue = edgeQueue.sort(function(a, b) {
        return b.data('weight') - a.data('weight')
    });

    const initStep = {};
    initStep.change = {};
    initStep.change.add = true;
    initStep.change.changes = {};
    initStep.mstCost = mstCost;
    initStep.edgeQueue = edgeQueue.map(edge => `${edge.data('id')} (${edge.data('weight')})`);
    graph.elements().forEach(ele => {
        initStep.change.changes[ele.data('id')] = ['chosen'];
    });
    steps.push(initStep);

    while (edgeCount > graph.nodes().length - 1) {
        const step = {};

        // Choosing edge
        let nextEdge = null;
        while (nextEdge == null) {
            const edge = edgeQueue[0];
            const sourceId = edge.source().data('id');
            const targetId = edge.target().data('id');
            edgeInGraph[edge.data('id')] = false;

            let chosenEdges = graph.edges().filter(edge => edgeInGraph[edge.data('id')]);
            let connectedNodes = chosenEdges.connectedNodes();
            let subgraph = chosenEdges.union(connectedNodes);

            let sourceNodeCollection = subgraph.bfs({
                roots: `#${sourceId}`,
                directed: false
            }).path.nodes();

            let targetNodeCollection = subgraph.bfs({
                roots: `#${targetId}`,
                directed: false
            }).path.nodes();

            if (!sourceNodeCollection.intersection(targetNodeCollection).empty()) {
                nextEdge = edge;
                edgeCount--;
                
                break;
            }
            edgeInGraph[edge.data('id')] = true;
            edgeQueue = edgeQueue.difference(edge);
        }
        edgeQueue = edgeQueue.difference(nextEdge);
        
        mstCost -= nextEdge.data('weight');
        step.mstCost = mstCost;
        step.edgeQueue = edgeQueue.map(edge => `${edge.data('id')} (${edge.data('weight')})`);
        step.change = {};
        step.change.add = false;
        step.change.changes = {};
        step.change.changes[nextEdge.data('id')] = ['chosen'];

        steps.push(step);
    }
    console.log("REVERSE DELETE COMPLETED!!!");
    algoController.setSteps(steps);
}

// // Does a BFS search from startingNode but only goes along edges with the 'chosen' class
// // Returns that subgraph of startingNode ()
// function customBfsSearch(graph, startingNodeId) {
//     // Create a collection that includes only chosen edges and the nodes they are connected to
//     let chosenEdges = graph.edges('.chosen');
//     let connectedNodes = chosenEdges.connectedNodes();
//     let subgraph = chosenEdges.union(connectedNodes);

//     // BFS to get all nodes in the startingNodes subgraph
//     let traversal = subgraph.bfs({
//         roots: `#${startingNodeId}`,
//         directed: false
//     });

//     return traversal.path.nodes();
// }

function boruvkasAlgorithm(graph) {
    const steps = [];
    let mstCost = 0; // Cost of minimum spanning tree at each step

    let unvisitedNodes = graph.nodes();
    const targetEdgeCount = unvisitedNodes.length - 1;
    let edgeCount = 0;

    let groupDict = {};
    unvisitedNodes.forEach(node => {
        const nodeId = node.data('id');
        groupDict[nodeId] = graph.collection();
        groupDict[nodeId] = groupDict[nodeId].union(node);
    });

    // Init step with 0 changes, 0 cost, just displaying the initial node groups
    const initStep = {};
    initStep.change = {};
    initStep.change.add = true;
    initStep.change.changes = {};
    initStep.mstCost = mstCost;
    initStep.edgeQueue = Object.values(groupDict).map(group => group.filter(ele => ele.isNode()).map(node => node.data('id')));
    steps.push(initStep);

    while(edgeCount < targetEdgeCount) {
        let visited = graph.collection();
        for (let key in groupDict) {
            const step = {};
            step.change = {};
            step.change.add = true;
            step.change.changes = {};
            
            // Flashes the entire group of nodes
            const nodesInGroup = groupDict[key].filter(ele => ele.isNode()).map(node => node.data('id'));
            nodesInGroup.forEach(nodeId => {
                step.change.changes[nodeId] = ['outlined'];
            });

            
            
            if (edgeCount >= targetEdgeCount) {
                break;
            }
            if (visited.contains(graph.nodes(`#${key}`))) {
                continue;
            }
            
            const collection = groupDict[key];

            let possibleEdges = graph.collection();
            collection.forEach(node => {
                const adjacentEdges = node.connectedEdges().filter(edge => groupDict[edge.source().data('id')].intersection(groupDict[edge.target().data('id')]).empty());
                possibleEdges = possibleEdges.union(adjacentEdges);
            });
            const nextEdge = possibleEdges.min(function(edge) {
                return edge.data('weight');
            }).ele;

            edgeCount++;
            mstCost += nextEdge.data('weight');
            step.mstCost = mstCost;

            const sourceId = nextEdge.source().data('id');
            const targetId = nextEdge.target().data('id');
            
            
            if (!step.change.changes[nextEdge.data('id')]) {
                step.change.changes[nextEdge.data('id')] = ['chosen'];
            }
            else {
                step.change.changes[nextEdge.data('id')].push('chosen');
            }

            if (groupDict[sourceId].length == 1) {
                if (!step.change.changes[sourceId]) {
                    step.change.changes[sourceId] = ['chosen'];
                }
                else {
                    step.change.changes[sourceId].push('chosen');
                }
            }

            if (groupDict[targetId].length == 1) {
                if (!step.change.changes[targetId]) {
                    step.change.changes[targetId] = ['chosen'];
                }
                else {
                    step.change.changes[targetId].push('chosen');
                }
            }
            

            groupDict[sourceId] = groupDict[sourceId].union(nextEdge);
            groupDict[sourceId] = groupDict[sourceId].union(groupDict[targetId]);
            groupDict[sourceId].nodes().forEach(function(node) {
                groupDict[node.data('id')] = groupDict[sourceId];
            });
            visited = visited.union(groupDict[sourceId]);

            // Converting groupDict vals to list and removing duplicates,
            // then converting those vals (cytoscape collections) to list of node ids
            // to display at each step
            const elementCollections = Object.values(groupDict);
            let uniqueGroups = [];
            elementCollections.forEach(collection => {
                if (!uniqueGroups.some(group => group.same(collection))) {
                    uniqueGroups.push(collection);
                }
            });
            uniqueGroups = uniqueGroups.map(group => group.filter(ele => ele.isNode()).map(node => node.data('id')));
            step.edgeQueue = uniqueGroups;
        

            // Removing nodes of the edge from univistedNodes if they are in it
            const sourceNode = graph.$(`#${sourceId}`);
            const targetNode = graph.$(`#${targetId}`);
            if (unvisitedNodes.contains(sourceNode)) {
                unvisitedNodes = unvisitedNodes.difference(sourceNode);
            }
            if (unvisitedNodes.contains(targetNode)) {
                unvisitedNodes = unvisitedNodes.difference(targetNode);
            }

            steps.push(step);
        }
    }
    console.log("BORUVKAS COMPLETED!!!");
    algoController.setSteps(steps);
}

function degreeConstrainedKruskals(graph, maxDegree) {
    const steps = [];
    let mstCost = 0;

    let unvisitedNodes = graph.nodes();
    const targetEdgeCount = unvisitedNodes.length - 1;
    let edgeCount = 0;

    let groupDict = {};
    unvisitedNodes.forEach(node => {
        const nodeId = node.data('id');
        groupDict[nodeId] = graph.collection();
        groupDict[nodeId] = groupDict[nodeId].union(node);
    });

    let edgeQueue = graph.edges();
    edgeQueue = edgeQueue.sort(function(a, b) {
        return a.data('weight') - b.data('weight')
    });

    const initStep = {};
    initStep.change = {};
    initStep.change.add = true;
    initStep.change.changes = {};
    initStep.mstCost = mstCost;
    initStep.edgeQueue = edgeQueue.map(edge => `${edge.data('id')} (${edge.data('weight')})`);
    steps.push(initStep);

    let edgeInGraph = {};
    graph.edges().forEach(edge => {
        edgeInGraph[edge.data('id')] = false;
    });
    
    while (edgeCount < targetEdgeCount) {
        const step = {};

        let nextEdge = null;
        while (nextEdge == null) {
            if (edgeQueue.empty()) {
                console.log("No more edges to choose from");
                return;
            }

            const edge = edgeQueue[0];
            const sourceId = edge.source().data('id');
            const targetId = edge.target().data('id');
            // CHECK THIS IF STATEMENT LOGICCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC
            if (graph.$(`#${sourceId}`).connectedEdges().filter(edge => !edgeInGraph[`#${edge.data('id')}`]).length + 1 <= maxDegree && graph.$(`#${targetId}`).connectedEdges().filter(edge => !edgeInGraph[`#${edge.data('id')}`]).length + 1 <= maxDegree) {
                if (groupDict[sourceId].intersection(groupDict[targetId]).empty()) {
                    nextEdge = edge;
                    edgeCount++;
                    edgeInGraph[edge.data('id')] = true;
                    groupDict[sourceId] = groupDict[sourceId].union(groupDict[targetId]);
                    groupDict[sourceId].forEach(function(node) {
                        groupDict[node.data('id')] = groupDict[sourceId];
                    });

                    break;
                }
            }
            edgeQueue = edgeQueue.difference(edge);
        }
        edgeQueue = edgeQueue.difference(nextEdge);

        mstCost += nextEdge.data('weight');
        step.mstCost = mstCost;
        step.edgeQueue = edgeQueue.map(edge => `${edge.data('id')} (${edge.data('weight')})`);
        step.change = {};
        step.change.add = true;
        step.change.changes = {};
        step.change.changes[nextEdge.data('id')] = ['chosen'];
        
        // Getting source and target nodes of edge
        const sourceNode = nextEdge.source();
        const targetNode = nextEdge.target();
        if (unvisitedNodes.contains(sourceNode)) {
            unvisitedNodes = unvisitedNodes.difference(sourceNode);

            step.change.changes[sourceNode.data('id')] = ['chosen'];
        }
        if (unvisitedNodes.contains(targetNode)) {
            unvisitedNodes = unvisitedNodes.difference(targetNode);

            step.change.changes[targetNode.data('id')] = ['chosen'];
        }

        steps.push(step);
    }
    console.log("DEGREE CONSTRAINED KRUSKALS COMPLETED!!!");
    algoController.setSteps(steps);
}

function loadGraph(dropdown) {
    if (!localStorage.getItem('storedGraphs')) {
        alert('Graphs have been deleted.\nPlease refresh the page to load them again.');
        return;
    }
    
    const graphs = JSON.parse(localStorage.getItem('storedGraphs') || '[]');
    const selectedGraph = graphs[dropdown.value].graph;
    cy1.destroy();
    cy1 = cytoscape({
        container: document.getElementById('cy')
    });
    cy1.json(selectedGraph);
    cy1.fit();
    
    updateVals();
}

function populateDropdown() {
    const dropdown = document.getElementById('graphDropdown');
    dropdown.innerHTML = '';

    const graphs = JSON.parse(localStorage.getItem('storedGraphs') || '[]');
    for (let i = 0; i < graphs.length; i++) {
        const option = document.createElement('option');
        option.value = i;
        option.innerText = graphs[i].name;
        dropdown.appendChild(option);
    };
}

// This and start doing same thing at beginning
function reset() {
    loadGraph(document.getElementById('graphDropdown'));
}

// This and reset doing same thing at beginning
function start() {
    const selectedAlgo = document.getElementById('algoDropdown').value;
    if (selectedAlgo == 'prims') {
        primsAlgorithm(cy1);
    }
    else if (selectedAlgo == 'kruskals') {
        kruskalsAlgorithm(cy1);
    }
    else if (selectedAlgo == 'boruvkas') {
        boruvkasAlgorithm(cy1);
    }
    else if (selectedAlgo == 'reverse-delete') {
        reverseDeleteAlgorithm(cy1);
    }
    else if (selectedAlgo == 'dckruskals') {
        degreeConstrainedKruskals(cy1, 1);
    }
};

function updateVals() {
    document.getElementById('nodeCount').innerText = cy1.nodes().length;
    document.getElementById('edgeCount').innerText = cy1.edges().length;
    minCostDisplay.innerText = 0;
    edgeQueueDisplay.innerText = '';
}

// To verify kruskals
// cy1.elements().kruskal(function(edge) {
//     return edge.data('weight');
// }).addClass('chosen');