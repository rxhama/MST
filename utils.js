/*
* Algo Controller class - allows users to control the execution of an algorithm with media buttons
* Is initialised once in a page, does not take parameters in constructor
* To update the fields, uses setSteps function
*/
export class AlgoController {
    constructor() {
        this.graph = null;
        this.steps = null;
        this.accepted = null;
        this.displays = null;
        this.currentIndex = null;
        this.playing = null;
        this.timeout = null;
    }

    // Resets all fields to initial state
    reset() {
        if (!this.graph) return;

        this.unmark();
        this.graph = null;
        this.steps = null;
        this.accepted = null;
        this.displays = null;
        this.currentIndex = null;
        this.playing = null;
        this.timeout = null;
    }

    /*
    * Updates AlgoController's fields with new data
    * @param {object} graph - The graph to be used
    * @param {array} result - result[0] is the steps array, result[1] is a boolean saying if the algo could find the MST or not
    * @param {object} displays - The displays to be updated
    */
    setSteps(graph, result, displays) {
        this.graph = graph;
        this.steps = result[0];
        this.accepted = result[1];
        this.displays = displays;
        this.currentIndex = 0;
        this.playing = false;
        if (this.timeout) {
            clearTimeout(this.timeout);
            this.timeout = null;
        }
        this.initData();
    }

    // Updates displays when new steps are set
    initData() {
        this.updateDisplays(this.steps[0]);
    }

    // Marks the graph container with a green border if the algorithm was successful, and red if not
    mark() {
        if (this.accepted) {
            this.displays.cyContainer.style.transition = 'border 0.2s ease-in-out';
            this.displays.cyContainer.style.border = '5px solid rgb(5, 232, 5)';
        }
        else {
            this.displays.cyContainer.style.transition = 'border 0.2s ease-in-out';
            this.displays.cyContainer.style.border = '5px solid rgb(249, 61, 61)';
        }
    }

    // Unmarks the graph container
    unmark() {
        this.displays.cyContainer.style.border = '1px solid black';
    }

    // Executes the step at the given index
    executeStep(index) {
        if (index < 0 || index >= this.steps.length) return;

        if (this.currentIndex == this.steps.length - 1) {
            this.mark();
        }

        const step = this.steps[index];
        Object.entries(step.change.changes).forEach(([id, classNames]) => {
            classNames.forEach(className => {
                if (className == 'outlined' || className == 'rejected') {
                    if (step.change.add) {
                        this.graph.$(`#${id}`).flashClass(className);
                    }
                }
                else {
                    if (step.change.add) {
                        this.graph.$(`#${id}`).addClass(className);
                    }
                    else {
                        this.graph.$(`#${id}`).removeClass(className);
                    }
                }
            })
        });

        this.updateDisplays(step);
    }

    // Undoes the step at the given index
    undoStep(index) {
        if (index < 0 || index >= this.steps.length) return;

        if (this.currentIndex == this.steps.length - 1) {
            this.unmark();
        }

        const step = this.steps[index];
        Object.keys(step.change.changes).forEach(id => {
            if (step.change.add) {
                this.graph.$(`#${id}`).removeClass(step.change.changes[id]);
            }
            else {
                this.graph.$(`#${id}`).addClass(step.change.changes[id]);
            }
        })
        if (index < 1) {
            this.updateDisplays(this.steps[0]);
        }
        else {
            this.updateDisplays(this.steps[index - 1]);
        }
    }

    // Called when play button is pressed
    play() {
        if (!this.steps) return;

        if (this.currentIndex < this.steps.length && !this.playing) {
            this.playing = true;
            this.playSteps();
        }
    }

    // Starts playing from the current index
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

    // Called when pause button is pressed
    pause() {
        if (!this.steps) return;

        if (this.playing) {
            clearTimeout(this.timeout);
            this.playing = false;
        }
    }

    // Called when next button is pressed
    next() {
        if (!this.steps) return;
        
        if (this.currentIndex >= this.steps.length) {
            this.pause();
            return;
        }
        this.pause();
        this.executeStep(this.currentIndex);
        this.currentIndex++;
    }

    // Called when previous button is pressed
    previous() {
        if (!this.steps) return;

        if (this.currentIndex <= 0) {
            this.pause();
            this.graph.elements().classes('');
            return;
        }
        this.pause();
        this.currentIndex--;
        this.undoStep(this.currentIndex);
    }

    // Called when toStart button is pressed
    // Instantly undoes all steps until back at initial step
    toStart() {
        if (!this.steps) return;

        this.unmark();
        this.pause();
        for (let i = this.currentIndex; i >= 0; i--) {
            this.undoStep(i);
        }
        this.currentIndex = 0;
    }

    // Called when toEnd button is pressed
    // Instantly executes all steps up to final step
    toEnd() {
        if (!this.steps) return;

        this.mark();
        this.pause();
        for (let i = this.currentIndex; i < this.steps.length; i++) {
            this.executeStep(i);
        }
        this.currentIndex = this.steps.length;
    }

    // Updates the displays with the current step information (mstCost, edgeQueue, etc.)
    updateDisplays(step) {
        this.displays.minCostDisplay.innerText = step.mstCost;
        this.displays.edgeQueueDisplay.innerText = '';
        if (step.edgeQueue.length > 0) {
            const list = document.createElement('ul');
            step.edgeQueue.forEach(edge => {
                const item = document.createElement('li');
                item.innerText = edge;
                list.appendChild(item);
            });
            this.displays.edgeQueueDisplay.appendChild(list);
        }
    }
}

// /*
// * Prims Algorithm
// * @param {object} graph - The cytoscape graph passed through
// * @returns {array} [steps, accepted] - steps = the array of steps to be used by the AlgoController
// * accepted = if the algo was able to find the MST or not
// */
// export function primsAlgorithm(graph) {
//     if (graph.nodes(':selected').length != 1) {
//         graph.elements().unselect();
//         alert('Please select a single starting node');
//         return null;
//     }

//     const steps = [];
//     let mstCost = 0; // Cost of minimum spanning tree at each step

//     let edgeQueue = graph.collection();
//     let visitedEdges = graph.collection();
//     let unvisitedNodes = graph.nodes();

//     let currNode = graph.nodes(':selected');
//     unvisitedNodes = unvisitedNodes.difference(currNode);

//     // Sorting initial edge queue by weight - ascending order
//     const initAdjacentEdges = currNode.connectedEdges().filter(edge => !visitedEdges.contains(edge) && (unvisitedNodes.contains(edge.source()) != unvisitedNodes.contains(edge.target())));
//     edgeQueue = edgeQueue.union(initAdjacentEdges);
//     edgeQueue = edgeQueue.sort(function(a, b) {
//         return a.data('weight') - b.data('weight')
//     });

//     // Initial step
//     const initStep = {};
//     initStep.change = {};
//     initStep.change.add = true;
//     initStep.change.changes = {};
//     initStep.change.changes[currNode.data('id')] = ['chosen'];
//     edgeQueue.forEach(edge => {
//         initStep.change.changes[edge.data('id')] = ['search'];
//     });
//     initStep.edgeQueue = initAdjacentEdges.map(edge => `${edge.data('id')} (${edge.data('weight')})`);
//     initStep.mstCost = mstCost;
//     steps.push(initStep);


//     while (!unvisitedNodes.empty()) {
//         const step = {};

//         // Choosing edge
//         let nextEdge = null;
//         while (nextEdge == null) {
//             const edge = edgeQueue[0];
//             if (unvisitedNodes.contains(edge.source()) || unvisitedNodes.contains(edge.target())) {
//                 nextEdge = edge;
//                 break;
//             }
//             edgeQueue = edgeQueue.difference(edge);
//         }
//         edgeQueue = edgeQueue.difference(nextEdge);
//         visitedEdges = visitedEdges.union(nextEdge);
        
//         mstCost += nextEdge.data('weight');
        
//         // Getting next node edge will take us to
//         let nextNode = null;
//         if (unvisitedNodes.contains(nextEdge.source())) {
//             nextNode = nextEdge.source();
//         }
//         else {
//             nextNode = nextEdge.target();
//         }
//         unvisitedNodes = unvisitedNodes.difference(nextNode);

//         currNode = nextNode;

//         // Adding adjacent edges to edgeQueue and sorting edgeQueue by weight
//         const adjacentEdges = currNode.connectedEdges().filter(edge => !visitedEdges.contains(edge) && (unvisitedNodes.contains(edge.source()) != unvisitedNodes.contains(edge.target())));
//         edgeQueue = edgeQueue.union(adjacentEdges);
//         edgeQueue = edgeQueue.sort(function(a, b) {
//             return a.data('weight') - b.data('weight')
//         });

//         step.mstCost = mstCost;
//         step.edgeQueue = edgeQueue.map(edge => `${edge.data('id')} (${edge.data('weight')})`);
//         step.change = {};
//         step.change.add = true;
//         step.change.changes = {};
//         step.change.changes[nextEdge.data('id')] = ['chosen'];
//         step.change.changes[nextNode.data('id')] = ['chosen'];
//         adjacentEdges.forEach(edge => {
//             step.change.changes[edge.data('id')] = ['search'];
//         });

//         steps.push(step);
//     }
//     console.log('PRIMS COMPLETED!!!');
    
//     return [steps, true];
// }

/*
* Prims Algorithm
* @param {object} graph - The cytoscape graph passed through
* @param {boolean} showRejectedEdges - If the rejected edges should be shown in the animation or not
* @returns {array} [steps, accepted] - steps = the array of steps to be used by the AlgoController
* accepted = if the algo was able to find the MST or not
*/
export function primsAlgorithm(graph, showRejectedEdges) {
    if (graph.nodes(':selected').length != 1) {
        graph.elements().unselect();
        alert('Please select a single starting node');
        return null;
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

        let nextEdge = null;
        let rejected = false;

        if (showRejectedEdges) {
            nextEdge = edgeQueue[0];
            if (!unvisitedNodes.contains(nextEdge.source()) && !unvisitedNodes.contains(nextEdge.target())) {
                rejected = true;
            }
        }
        else {
            while (nextEdge == null) {
                const edge = edgeQueue[0];
                if (unvisitedNodes.contains(edge.source()) != unvisitedNodes.contains(edge.target())) {
                    nextEdge = edge;
                    break;
                }
                edgeQueue = edgeQueue.difference(edge);
            }
        }
        edgeQueue = edgeQueue.difference(nextEdge);

        step.change = {};
        step.change.add = true;
        step.change.changes = {};

        if (!rejected) {
            visitedEdges = visitedEdges.union(nextEdge);
            mstCost += nextEdge.data('weight');
            
            let nextNode = null;
            if (unvisitedNodes.contains(nextEdge.source())) {
                nextNode = nextEdge.source();
            }
            else {
                nextNode = nextEdge.target();
            }
            unvisitedNodes = unvisitedNodes.difference(nextNode);
            step.change.changes[nextNode.data('id')] = ['chosen'];
            
            currNode = nextNode;

            //Adding adjacent edges to edgeQueue and sorting edgeQueue by weight
            const adjacentEdges = currNode.connectedEdges().filter(edge => !visitedEdges.contains(edge));
            adjacentEdges.forEach(edge => {
                step.change.changes[edge.data('id')] = ['search'];
            });

            edgeQueue = edgeQueue.union(adjacentEdges);
            edgeQueue = edgeQueue.sort(function(a, b) {
                return a.data('weight') - b.data('weight')
            });
        }

        step.mstCost = mstCost;
        step.edgeQueue = edgeQueue.map(edge => `${edge.data('id')} (${edge.data('weight')})`);
        step.change.changes[nextEdge.data('id')] = rejected ? ['rejected'] : ['chosen'];

        steps.push(step);
    }
    console.log('PRIMS COMPLETED!!!');
    
    return [steps, true];
}

/*
* Kruskals Algorithm
* @param {object} graph - The cytoscape graph passed through
* @returns {array} [steps, accepted] - steps = the array of steps to be used by the AlgoController
* accepted = if the algo was able to find the MST or not
*/
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
    console.log('KRUSKALS COMPLETED!!!');
    
    return [steps, true];
}

/*
* Reverse-Delete Algorithm
* @param {object} graph - The cytoscape graph passed through
* @returns {array} [steps, accepted] - steps = the array of steps to be used by the AlgoController
* accepted = if the algo was able to find the MST or not
*/
export function reverseDeleteAlgorithm(graph) {
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
    console.log('REVERSE DELETE COMPLETED!!!');
    
    return [steps, true];
}

/*
* Boruvkas Algorithm
* @param {object} graph - The cytoscape graph passed through
* @returns {array} [steps, accepted] - steps = the array of steps to be used by the AlgoController
* accepted = if the algo was able to find the MST or not
*/
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
    console.log('BORUVKAS COMPLETED!!!');
    
    return [steps, true];
}

/*
* Degree-Constrained Kruskals Algorithm (Simple)
* @param {object} graph - The cytoscape graph passed through
* @param {number} maxDegree - The maximum degree a node can have
* @returns {array} [steps, accepted] - steps = the array of steps to be used by the AlgoController
* accepted = if the algo was able to find the MST or not
*/
export function degreeConstrainedKruskals(graph, maxDegree) {
    if (maxDegree <= 1) {
        alert('Max degree must be greater than 1');
        return null;
    }

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
                console.log('No more edges to choose from');
                return [steps, false];
            }

            const edge = edgeQueue[0];
            const sourceId = edge.source().data('id');
            const targetId = edge.target().data('id');
            if (edge.source().connectedEdges().filter(edge => edgeInGraph[edge.data('id')]).length + 1 <= maxDegree && edge.target().connectedEdges().filter(edge => edgeInGraph[edge.data('id')]).length + 1 <= maxDegree) {
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
    console.log('DEGREE CONSTRAINED KRUSKALS COMPLETED!!!');
    
    return [steps, true];
}