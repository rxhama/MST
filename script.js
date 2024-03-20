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
        Object.entries(step.changes).forEach(([id, classNames]) => {
            classNames.forEach(className => {
                if (className == 'outlined') {
                    cy1.$(`#${id}`).flashClass(className);
                }
                else {
                    cy1.$(`#${id}`).addClass(className);
                }
            })
        });
        // Object.keys(step.changes).forEach(id => {
        //     cy1.$(`#${id}`).addClass(step.changes[id]);
        // })
        this.updateDisplays(step);
    }

    undoStep(index) {
        if (index < 0 || index >= this.steps.length) return;
        const step = this.steps[index];
        Object.keys(step.changes).forEach(id => {
            console.log(`${id}: ${step.changes[id]}`);
            cy1.$(`#${id}`).removeClass(step.changes[id]);
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
        // Workaround for bug where last step is not completed if user spams play and pause
        // if (this.currentIndex == this.steps.length) {
        //     this.executeStep(this.currentIndex - 1);
        // }
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

    // toStart() {
    //     this.pause();
    //     this.currentIndex = 0;
    //     cy1.elements().classes('');
    //     this.updateDisplays(this.steps[0]);
    // }

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

    // Sorting initial edge queue by weight
    const initAdjacentEdges = currNode.connectedEdges().filter(edge => !visitedEdges.contains(edge) && (unvisitedNodes.contains(edge.source()) != unvisitedNodes.contains(edge.target())));
    edgeQueue = edgeQueue.union(initAdjacentEdges);
    edgeQueue = edgeQueue.sort(function(a, b) {
        return a.data('weight') - b.data('weight')
    });

    // Initial step
    const initStep = {};
    initStep.changes = {};
    initStep.changes[currNode.data('id')] = ['chosen'];
    edgeQueue.forEach(edge => {
        initStep.changes[edge.data('id')] = ['search'];
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
        step.changes = {};
        step.changes[nextEdge.data('id')] = ['chosen'];
        step.changes[nextNode.data('id')] = ['chosen'];
        adjacentEdges.forEach(edge => {
            step.changes[edge.data('id')] = ['search'];
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

    // Sorting edge queue by weight
    let edgeQueue = graph.edges();
    edgeQueue = edgeQueue.sort(function(a, b) {
        return a.data('weight') - b.data('weight')
    });

    // Init step with 0 changes, 0 cost, just displaying the initial edgeQueue
    const initStep = {};
    initStep.changes = {};
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
        step.changes = {};
        step.changes[nextEdge.data('id')] = ['chosen'];
        
        // Getting source and target nodes of edge
        const sourceNode = nextEdge.source();
        const targetNode = nextEdge.target();
        if (unvisitedNodes.contains(sourceNode)) {
            unvisitedNodes = unvisitedNodes.difference(sourceNode);

            step.changes[sourceNode.data('id')] = ['chosen'];
        }
        if (unvisitedNodes.contains(targetNode)) {
            unvisitedNodes = unvisitedNodes.difference(targetNode);

            step.changes[targetNode.data('id')] = ['chosen'];
        }

        steps.push(step);
    }
    console.log("KRUSKALS COMPLETED!!!");
    algoController.setSteps(steps);
}

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
    initStep.changes = {};
    initStep.mstCost = mstCost;
    initStep.edgeQueue = Object.values(groupDict).map(group => group.filter(ele => ele.isNode()).map(node => node.data('id')));
    steps.push(initStep);

    while(edgeCount < targetEdgeCount) {
        let visited = graph.collection();
        for (let key in groupDict) {
            const step = {};
            step.changes = {};
            
            // Flashes the entire group of nodes
            const nodesInGroup = groupDict[key].filter(ele => ele.isNode()).map(node => node.data('id'));
            nodesInGroup.forEach(nodeId => {
                step.changes[nodeId] = ['outlined'];
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
            
            
            if (!step.changes[nextEdge.data('id')]) {
                step.changes[nextEdge.data('id')] = ['chosen'];
            }
            else {
                step.changes[nextEdge.data('id')].push('chosen');
            }

            if (groupDict[sourceId].length == 1) {
                if (!step.changes[sourceId]) {
                    step.changes[sourceId] = ['chosen'];
                }
                else {
                    step.changes[sourceId].push('chosen');
                }
            }

            if (groupDict[targetId].length == 1) {
                if (!step.changes[targetId]) {
                    step.changes[targetId] = ['chosen'];
                }
                else {
                    step.changes[targetId].push('chosen');
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

function loadGraph(dropdown) {
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
    cy1.elements().classes('');
    document.getElementById('minCostDisplay').innerText = 0;
    cy1.fit();
}

// This and reset doing same thing at beginning
function start() {
    reset();
    
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
};

function createGraph() {
    cy1.destroy();
    cy1 = cytoscape({
        container: document.getElementById('cy'),

        style: [
            {
                "selector": "node",
                "style": {
                    "background-color": "rgb(102,102,102)",
                    "label": "data(id)",
                    "transition-property": "background-color",
                    "transition-duration": "0.2s"
                }
            },
            {
                "selector": "edge",
                "style": {
                    "width": "3px",
                    "line-color": "rgb(204,204,204)",
                    "curve-style": "bezier",
                    "label": "data(weight)",
                    "transition-property": "line-color",
                    "transition-duration": "0.2s"
                }
            },
            {
                "selector": ":selected",
                "style": {
                    "background-color": "rgb(0,0,0)",
                    "line-color": "rgb(0,0,0)"
                }
            },
            {
                "selector": ".search",
                "style": {
                    
                }
            },
            {
                "selector": ".rejected",
                "style": {
                    "background-color": "rgb(255,0,0)",
                    "line-color": "rgb(255,0,0)"
                }
            },
            {
                "selector": ".chosen",
                "style": {
                    "background-color": "rgb(0,0,255)",
                    "line-color": "rgb(0,0,255)"
                }
            },
            {
                "selector": ".outlined",
                "style": {
                  "border-width": "3px",
                  "border-color": "rgb(255,255,0)"
                }
            }
        ],

        layout: {
            name: 'circle'
        }

        // NEED TO IMPORT EDGEHANDLES EXTENSION TO ADD TOGGLE BETWEEN NODE MOVEMENT/DRAW EDGE MODE !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    });

    updateVals();
}

function addNode() {
    cy1.add({
        data: { id : crypto.randomUUID() },
        position: { x : cy1.container().clientWidth / 2, y : cy1.container().clientHeight / 2 }
    })
    updateVals();
}

function removeElement() {
    cy1.$(':selected').remove();
    updateVals();
}

function saveGraph() {
    if (cy1.elements().length == 0) {
        alert('Graph is empty');
        return;
    }

    if (cy1.nodes().length == 1) {
        alert('Graph must have at least 2 nodes');
        return;
    }

    for (const node of cy1.nodes()) {
        if (node.connectedEdges().empty()) {
            alert('Graph must be connected');
            return;
        }
    }

    const graphs = JSON.parse(localStorage.getItem('storedGraphs') || '[]');
    for (let i = 0; i < graphs.length; i++) {
        if (checkIdenticalElements(cy1.json().elements, graphs[i].graph.elements)) {
            alert('Graph already saved');
            return;
        }
    }

    const graphName = prompt('Enter graph name');
    if (graphName == '' || graphName == null) {
        alert('Please enter a graph name');
        return;
    }

    graphs.forEach(graph => {
        if (graph.name == graphName) {
            alert('Graph name already exists');
            return;
        }
    })

    const newGraph = {};
    newGraph.name = graphName;
    newGraph.graph = cy1.json();
    graphs.push(newGraph);
    localStorage.setItem('storedGraphs', JSON.stringify(graphs));

    populateDropdown();
}

function checkIdenticalElements(elesA, elesB) {
    if (elesA.length != elesB.length) {
        return false;
    }

    // Using maps for easy lookup
    const nodesA = new Map(elesA.nodes.map(node => [node.data.id, node]));
    const edgesA = new Map(elesA.edges.map(edge => [edge.data.id, edge]));

    // Check each node in elesB to see if in elesA
    for (let nodeB of elesB.nodes) {
        const nodeA = nodesA.get(nodeB.data.id);
        if (!nodeA) {
            return false;
        }
    }

    // Check each node in elesB to see if in elesA
    for (let edgeB of elesB.edges) {
        const edgeA = edgesA.get(edgeB.data.id);
        if (!edgeA) {
            return false;
        }
        if (edgeA.data.source != edgeB.data.source || edgeA.data.target != edgeB.data.target || edgeA.data.weight != edgeB.data.weight) {
            return false;
        }
    }

    // All checks passed and elements are identical
    return true;
}

function addEdge() {
    const weightInput = document.getElementById('edgeWeightInput');

    if (cy1.nodes(':selected').length != 2) {
        alert('Please select 2 nodes only');
        return;
    }
    
    if (weightInput.value == '') {
        alert('Please enter a weight');
        return;
    }

    if (weightInput.value < 1 || weightInput.value > 100) {
        alert('Please enter a number between 1 and 100');
        return;
    }

    const node1 = cy1.nodes(':selected')[0];
    const node2 = cy1.nodes(':selected')[1];

    if (node1.edgesWith(node2).length > 0) {
        alert('Edge already exists');
        return;
    }

    cy1.add({
        group: 'edges',
        data: {
            id: crypto.randomUUID(),
            source: cy1.nodes(':selected')[0].data('id'),
            target: cy1.nodes(':selected')[1].data('id'),
            weight: weightInput.value
        }
    });

    cy1.elements().unselect();
    weightInput.value = '';

    updateVals();
}

function generateGraph() {
    const nodeCount = document.getElementById('nodeCountInput').value;

    if (nodeCount < 1 || nodeCount > 100) {
        alert('Please enter a number between 1 and 100');
        return;
    }

    // Generate nodes with random position in cy container
    for (let i = 0; i < nodeCount; i++) {
        cy1.add({
            group: 'nodes',
            data: { id: crypto.randomUUID() },
            position: { x : Math.random() * cy1.container().clientWidth, y : Math.random() * cy1.container().clientHeight}
        });
    }
  
    const nodes = cy1.nodes();
    
    // Generate edges between all nodes
    for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
            cy1.add({
                group: 'edges',
                data: {
                    id: crypto.randomUUID(),
                    source: nodes[i].data('id'),
                    target: nodes[j].data('id'),
                    weight: Math.floor(Math.random() * 10000)
                }
            });
        }
    }

    updateVals();
}

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