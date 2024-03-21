export class AlgoController {
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

export function primsAlgorithm(graph) {
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

export function kruskalsAlgorithm(graph) {
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

export function boruvkasAlgorithm(graph) {
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

export function loadGraph(dropdown) {
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

export const testNumber = 12345;