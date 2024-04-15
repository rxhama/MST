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
        this.speed = 1000; // in ms
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
        if (this.timeout) {
            clearTimeout(this.timeout);
            this.timeout = null;
        }
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
        Object.entries(step.changes).forEach(([id, classNames]) => {
            classNames.forEach(className => {
                if (className.add) {
                    if (className.class == 'outlined' || className.class == 'rejected') {
                        this.graph.$(`#${id}`).flashClass(className.class, 0.5 * this.speed);
                    }
                    else {
                        this.graph.$(`#${id}`).addClass(className.class);
                    }
                }
                else {
                    this.graph.$(`#${id}`).removeClass(className.class);
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
        Object.entries(step.changes).forEach(([id, classNames]) => {
            classNames.forEach(className => {
                if (className.add) {
                    this.graph.$(`#${id}`).removeClass(className.class);
                }
                else {
                    this.graph.$(`#${id}`).addClass(className.class);
                }
            })
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
            }, this.speed)
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
            list.style.listStyleType = 'none';
            step.edgeQueue.forEach(edge => {
                const item = document.createElement('li');
                item.innerText = edge;
                list.appendChild(item);
            });
            this.displays.edgeQueueDisplay.appendChild(list);
        }

        // Update explanation display if step has an explanation (for the MST teaching pages)
        if (step.explanation) {
            this.displays.explanationDisplay.innerHTML = step.explanation;
        }
    }
}

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

    let edgeCount = 0;
    let targetEdgeCount = unvisitedNodes.length - 1;

    let currNode = graph.nodes(':selected');
    unvisitedNodes = unvisitedNodes.difference(currNode);

    // Sorting initial edge queue by weight - ascending order
    const initAdjacentEdges = currNode.connectedEdges().filter(edge => !visitedEdges.contains(edge) && (unvisitedNodes.contains(edge.source()) != unvisitedNodes.contains(edge.target())));
    edgeQueue = edgeQueue.union(initAdjacentEdges);
    edgeQueue = edgeQueue.sort(function(a, b) {
        return a.data('weight') - b.data('weight')
    });

    // Dict that checks if ane edge already has the search class
    // so doesn't have to be added if it already has the class.
    // Otherwise, re-adding search will cause problems when going backwards
    // in algo controller because we will remove it earlier than needed (than when it was initially added)
    const hasSearchClass = {};

    // Initial step
    const initStep = {};
    initStep.changes = {};
    initStep.changes[currNode.data('id')] = [{add:true, class:'chosen'}];
    edgeQueue.forEach(edge => {
        initStep.changes[edge.data('id')] = [{add:true, class:'search'}];
        hasSearchClass[edge.data('id')] = true;
    });
    initStep.edgeQueue = initAdjacentEdges.map(edge => `${edge.data('id')} (${edge.data('weight')})`);
    initStep.mstCost = mstCost;
    steps.push(initStep);


    while (edgeCount < targetEdgeCount) {
        const step = {};

        // Choosing next edge
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

        step.changes = {};

        if (!rejected) {
            edgeCount++;

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
            step.changes[nextNode.data('id')] = [{add:true, class:'chosen'}];
            
            currNode = nextNode;

            //Adding adjacent edges to edgeQueue and sorting edgeQueue by weight
            const adjacentEdges = currNode.connectedEdges().filter(edge => !visitedEdges.contains(edge));
            adjacentEdges.filter(edge => !hasSearchClass[edge.data('id')]).forEach(edge => {
                step.changes[edge.data('id')] = [{add:true, class:'search'}];
                hasSearchClass[edge.data('id')] = true;
            });

            edgeQueue = edgeQueue.union(adjacentEdges);
            edgeQueue = edgeQueue.sort(function(a, b) {
                return a.data('weight') - b.data('weight')
            });
        }

        step.mstCost = mstCost;
        step.edgeQueue = edgeQueue.map(edge => `${edge.data('id')} (${edge.data('weight')})`);
        step.changes[nextEdge.data('id')] = rejected ? [{add:true, class:'rejected'}, {add:false, class:'search'}] : [{add:true, class:'chosen'}];

        steps.push(step);
    }
    console.log('PRIMS COMPLETED!!!');

    return [steps, true];
}

/*
* Kruskals Algorithm
* @param {object} graph - The cytoscape graph passed through
* @param {boolean} showRejectedEdges - If the rejected edges should be shown in the animation or not
* @returns {array} [steps, accepted] - steps = the array of steps to be used by the AlgoController
* accepted = if the algo was able to find the MST or not
*/
export function kruskalsAlgorithm(graph, showRejectedEdges) {
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
    initStep.changes = {};
    if (showRejectedEdges) {
        graph.edges().forEach(edge => {
            initStep.changes[edge.data('id')] = [{add:true, class:'search'}];
        });
    }
    initStep.mstCost = mstCost;
    initStep.edgeQueue = edgeQueue.map(edge => `${edge.data('id')} (${edge.data('weight')})`);
    steps.push(initStep);
    
    while (edgeCount < targetEdgeCount) {
        const step = {};

        // Choosing edge
        let nextEdge = null;
        let rejected = false;
        if (showRejectedEdges) {
            nextEdge = edgeQueue[0];
            if (groupDict[nextEdge.source().data('id')].same(groupDict[nextEdge.target().data('id')])) {
                rejected = true;
            }
        }
        else {
            while (nextEdge == null) {
                const edge = edgeQueue[0];
                if (!groupDict[edge.source().data('id')].same(groupDict[edge.target().data('id')])) {
                    nextEdge = edge;

                    break;
                }
                edgeQueue = edgeQueue.difference(edge);
            }
        }
        edgeQueue = edgeQueue.difference(nextEdge);

        step.changes = {};

        if (!rejected) {
            edgeCount++;
            mstCost += nextEdge.data('weight');

            const sourceNode = nextEdge.source();
            const targetNode = nextEdge.target();

            // Adding source and target nodes to same group and all their connected nodes as well
            const sourceId = sourceNode.data('id');
            const targetId = targetNode.data('id');
            groupDict[sourceId] = groupDict[sourceId].union(groupDict[targetId]);
            groupDict[sourceId].forEach(function(node) {
                groupDict[node.data('id')] = groupDict[sourceId];
            });

            if (unvisitedNodes.contains(sourceNode)) {
                unvisitedNodes = unvisitedNodes.difference(sourceNode);
                step.changes[sourceNode.data('id')] = [{add:true, class:'chosen'}];
            }
            if (unvisitedNodes.contains(targetNode)) {
                unvisitedNodes = unvisitedNodes.difference(targetNode);
                step.changes[targetNode.data('id')] = [{add:true, class:'chosen'}];
            }
        }

        step.mstCost = mstCost;
        step.edgeQueue = edgeQueue.map(edge => `${edge.data('id')} (${edge.data('weight')})`);
        step.changes[nextEdge.data('id')] = rejected ? [{add:true, class:'rejected'}, {add:false, class:'search'}] : [{add:true, class:'chosen'}];

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
export function reverseDeleteAlgorithm(graph, showRejectedEdges) {
    const steps = [];
    let mstCost = graph.edges().reduce((sum, edge) => {
        return sum + edge.data('weight');
    }, 0); // Cost of minimum spanning tree at each step
    
    let edgeCount = graph.edges().length;
    const targetEdgeCount = graph.nodes().length - 1;

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
    initStep.changes = {};
    initStep.mstCost = mstCost;
    initStep.edgeQueue = edgeQueue.map(edge => `${edge.data('id')} (${edge.data('weight')})`);
    graph.elements().forEach(ele => {
        initStep.changes[ele.data('id')] = [{add:true, class:'chosen'}];
    });
    steps.push(initStep);

    while (edgeCount > targetEdgeCount) {
        const step = {};

        // Choosing edge
        let nextEdge = null;
        let rejected = false;
        if (showRejectedEdges) {
            nextEdge = edgeQueue[0];
            const sourceId = nextEdge.source().data('id');
            const targetId = nextEdge.target().data('id');
            edgeInGraph[nextEdge.data('id')] = false;

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

            if (!sourceNodeCollection.same(targetNodeCollection)) {
                rejected = true;
                edgeInGraph[nextEdge.data('id')] = true;
            }
        }
        else {
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

                if (sourceNodeCollection.same(targetNodeCollection)) {
                    nextEdge = edge;
                    
                    break;
                }
                edgeInGraph[edge.data('id')] = true;
                edgeQueue = edgeQueue.difference(edge);
            }
        }
        edgeQueue = edgeQueue.difference(nextEdge);

        if (!rejected) {
            edgeCount--;
            mstCost -= nextEdge.data('weight');
        }

        step.mstCost = mstCost;
        step.edgeQueue = edgeQueue.map(edge => `${edge.data('id')} (${edge.data('weight')})`);
        step.changes = {};
        step.changes[nextEdge.data('id')] = rejected ? [{add:true, class:'rejected'}] : [{add:false, class:'chosen'}];
        if (rejected) {
            step.changes[nextEdge.source().data('id')] = [{add:true, class:'rejected'}];
            step.changes[nextEdge.target().data('id')] = [{add:true, class:'rejected'}];
        }

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
    initStep.changes = {};
    initStep.mstCost = mstCost;
    initStep.edgeQueue = Object.values(groupDict).map(group => group.nodes().map(node => node.data('id')));
    steps.push(initStep);

    while(edgeCount < targetEdgeCount) {
        let visited = graph.collection();
        for (let key in groupDict) {
            const step = {};
            step.changes = {};
            
            // Flashes the entire group of nodes
            const nodesInGroup = groupDict[key].nodes().map(node => node.data('id'));
            nodesInGroup.forEach(nodeId => {
                step.changes[nodeId] = [{add:true, class:'outlined'}];
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
                const adjacentEdges = node.connectedEdges().filter(edge => !groupDict[edge.source().data('id')].same(groupDict[edge.target().data('id')]));
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
                step.changes[nextEdge.data('id')] = [{add:true, class:'chosen'}];
            }
            else {
                step.changes[nextEdge.data('id')].push({add:true, class:'chosen'});
            }

            if (groupDict[sourceId].length == 1) {
                if (!step.changes[sourceId]) {
                    step.changes[sourceId] = [{add:true, class:'chosen'}];
                }
                else {
                    step.changes[sourceId].push({add:true, class:'chosen'});
                }
            }

            if (groupDict[targetId].length == 1) {
                if (!step.changes[targetId]) {
                    step.changes[targetId] = [{add:true, class:'chosen'}];
                }
                else {
                    step.changes[targetId].push({add:true, class:'chosen'});
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
            uniqueGroups = uniqueGroups.map(group => group.nodes().map(node => node.data('id')));
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

export function newBoruvkasAlgorithm(graph, showRejectedEdges) {
    const steps = [];
    let mstCost = 0; // Cost of minimum spanning tree at each step

    let unvisitedNodes = graph.nodes();
    const targetEdgeCount = unvisitedNodes.length - 1;
    let edgeCount = 0;

    // Keep track of which colour on (in colour classes 0-9),
    // so we can assign a different colour every time new edge is added
    let colourCounter = 0;
    // Returns the class string then increments the colour counter for next time
    const getColourClass = function() {
        const temp = colourCounter;
        colourCounter = (colourCounter + 1) % 13;
        return temp.toString();
    }

    // Holds the groups/components
    // For each node's value:
    // [0] = group collection
    // [1] = colour class
    let groupDict = {};
    unvisitedNodes.forEach(node => {
        const nodeId = node.data('id');
        let group = graph.collection();
        group = group.union(node);
        groupDict[nodeId] = [group, null];
    });

    // Check if ele is in graph or not
    let eleColourClass = {};

    // Init step with 0 changes, 0 cost, just displaying the initial node groups
    const initStep = {};
    initStep.changes = {};
    initStep.mstCost = mstCost;
    initStep.edgeQueue = Object.values(groupDict).map(result => result[0]).map(group => group.nodes().map(node => node.data('id')));
    steps.push(initStep);

    while(edgeCount < targetEdgeCount) {
        let visited = graph.collection();
        for (let key in groupDict) {

            if (edgeCount >= targetEdgeCount) {
                break;
            }
            if (visited.contains(graph.nodes(`#${key}`))) {
                continue;
            }
            
            const step = {};
            step.changes = {};

            const collection = groupDict[key][0];
            
            // Flashes the entire current group of nodes
            const nodesInGroup = collection.nodes().map(node => node.data('id'));
            nodesInGroup.forEach(nodeId => {
                step.changes[nodeId] = [{add:true, class:'outlined'}];
            });

            let possibleEdges = graph.collection();
            collection.nodes().forEach(node => {
                const adjacentEdges = node.connectedEdges().filter(edge => !groupDict[edge.source().data('id')][0].same(groupDict[edge.target().data('id')][0]));
                possibleEdges = possibleEdges.union(adjacentEdges);
            });
            const nextEdge = possibleEdges.min(function(edge) {
                return edge.data('weight');
            }).ele;

            edgeCount++;
            mstCost += nextEdge.data('weight');
            step.mstCost = mstCost;

            const sourceNode = nextEdge.source();
            const targetNode = nextEdge.target();
            const sourceId = sourceNode.data('id');
            const targetId = targetNode.data('id');

            // Check which colour to assign the new combined group
            let colourClassToAssign = null;
            if (groupDict[sourceId][1] && groupDict[targetId][1]) {
                if (parseInt(groupDict[sourceId][1]) > parseInt(groupDict[targetId][1])) {
                    colourClassToAssign = groupDict[sourceId][1];
                }
                else {
                    colourClassToAssign = groupDict[targetId][1];
                }
            }
            else if (groupDict[sourceId][1]) {
                colourClassToAssign = groupDict[sourceId][1];
            }
            else if (groupDict[targetId][1]) {
                colourClassToAssign = groupDict[targetId][1];
            }
            else {
                colourClassToAssign = getColourClass();
            }

            groupDict[sourceId][0] = groupDict[sourceId][0].union(nextEdge);
            groupDict[sourceId][0] = groupDict[sourceId][0].union(groupDict[targetId][0]);
            groupDict[sourceId][1] = colourClassToAssign;
            groupDict[sourceId][0].nodes().forEach(function(node) {
                groupDict[node.data('id')] = groupDict[sourceId];
            });
            visited = visited.union(groupDict[sourceId][0]);

            groupDict[sourceId][0].forEach(ele => {
                if (eleColourClass[ele.data('id')] != groupDict[sourceId][1]) {
                    if (!step.changes[ele.data('id')]) {
                        step.changes[ele.data('id')] = [{add:true, class:groupDict[sourceId][1]}];
                    }
                    else {
                        step.changes[ele.data('id')].push({add:true, class:groupDict[sourceId][1]});
                    }
                }
            });

            groupDict[sourceId][0].forEach(ele => {
                eleColourClass[ele.data('id')] = groupDict[sourceId][1];
            });

            // Converting groupDict vals to list and removing duplicates,
            // then converting those vals (cytoscape collections) to list of node ids
            // to display at each step
            const elementCollections = Object.values(groupDict).map(result => result[0]);
            let uniqueGroups = [];
            elementCollections.forEach(collection => {
                if (!uniqueGroups.some(group => group.same(collection))) {
                    uniqueGroups.push(collection);
                }
            });
            uniqueGroups = uniqueGroups.map(group => group.nodes().map(node => node.data('id')));
            step.edgeQueue = uniqueGroups;
        

            // Removing nodes of the edge from univistedNodes if they are in it
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
* Degree-Constrained Prim's Algorithm (Simple)
* @param {object} graph - The cytoscape graph passed through
* @param {number} maxDegree - The maximum degree a node can have
* @returns {array} [steps, accepted] - steps = the array of steps to be used by the AlgoController
* accepted = if the algo was able to find the MST or not
*/
export function degreeConstrainedPrims(graph, showRejectedEdges, maxDegree) {
    if (maxDegree <= 1) {
        alert('Max degree must be greater than 1');
        return null;
    }

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

    let edgeCount = 0;
    let targetEdgeCount = unvisitedNodes.length - 1;

    let currNode = graph.nodes(':selected');
    unvisitedNodes = unvisitedNodes.difference(currNode);

    // Sorting initial edge queue by weight - ascending order
    const initAdjacentEdges = currNode.connectedEdges().filter(edge => !visitedEdges.contains(edge) && (unvisitedNodes.contains(edge.source()) != unvisitedNodes.contains(edge.target())));
    edgeQueue = edgeQueue.union(initAdjacentEdges);
    edgeQueue = edgeQueue.sort(function(a, b) {
        return a.data('weight') - b.data('weight')
    });

    // Dict that checks if ane edge already has the search class
    // so doesn't have to be added if it already has the class.
    // Otherwise, re-adding search will cause problems when going backwards
    // in algo controller because we will remove it earlier than needed (than when it was initially added)
    const hasSearchClass = {};

    // Initial step
    const initStep = {};
    initStep.changes = {};
    initStep.changes[currNode.data('id')] = [{add:true, class:'chosen'}];
    edgeQueue.forEach(edge => {
        initStep.changes[edge.data('id')] = [{add:true, class:'search'}];
        hasSearchClass[edge.data('id')] = true;
    });
    initStep.edgeQueue = initAdjacentEdges.map(edge => `${edge.data('id')} (${edge.data('weight')})`);
    initStep.mstCost = mstCost;
    steps.push(initStep);


    while (edgeCount < targetEdgeCount) {
        const step = {};

        // Choosing next edge
        let nextEdge = null;
        let rejected = false;
        let violatedNodes = [];

        if (showRejectedEdges) {
            if (edgeQueue.empty()) {
                console.log('No more edges to choose from');
                return [steps, false];
            }

            nextEdge = edgeQueue[0];
            const sourceNode = nextEdge.source();
            const targetNode = nextEdge.target();

            if (!unvisitedNodes.contains(sourceNode) && !unvisitedNodes.contains(targetNode)) {
                rejected = true;
            }
            if (sourceNode.connectedEdges().filter(edge => visitedEdges.contains(edge)).length >= maxDegree) {
                violatedNodes.push(sourceNode);
                rejected = true;
            }
            if (targetNode.connectedEdges().filter(edge => visitedEdges.contains(edge)).length >= maxDegree) {
                violatedNodes.push(targetNode);
                rejected = true;
            }
        }
        else {
            while (nextEdge == null) {
                if (edgeQueue.empty()) {
                    console.log('No more edges to choose from');
                    return [steps, false];
                }

                const edge = edgeQueue[0];
                const sourceNode = edge.source();
                const targetNode = edge.target();

                if (unvisitedNodes.contains(edge.source()) != unvisitedNodes.contains(edge.target()) && 
                    sourceNode.connectedEdges().filter(edge => visitedEdges.contains(edge)).length + 1 <= maxDegree && 
                    targetNode.connectedEdges().filter(edge => visitedEdges.contains(edge)).length + 1 <= maxDegree) {

                        nextEdge = edge;
                        break;
                }
                edgeQueue = edgeQueue.difference(edge);
            }
        }
        edgeQueue = edgeQueue.difference(nextEdge);

        step.changes = {};

        if (!rejected) {
            edgeCount++;

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
            step.changes[nextNode.data('id')] = [{add:true, class:'chosen'}];
            
            currNode = nextNode;

            //Adding adjacent edges to edgeQueue and sorting edgeQueue by weight
            const adjacentEdges = currNode.connectedEdges().filter(edge => !visitedEdges.contains(edge));
            adjacentEdges.filter(edge => !hasSearchClass[edge.data('id')]).forEach(edge => {
                step.changes[edge.data('id')] = [{add:true, class:'search'}];
                hasSearchClass[edge.data('id')] = true;
            });

            edgeQueue = edgeQueue.union(adjacentEdges);
            edgeQueue = edgeQueue.sort(function(a, b) {
                return a.data('weight') - b.data('weight')
            });
        }

        step.mstCost = mstCost;
        step.edgeQueue = edgeQueue.map(edge => `${edge.data('id')} (${edge.data('weight')})`);
        step.changes[nextEdge.data('id')] = rejected ? [{add:true, class:'rejected'}, {add:false, class:'search'}] : [{add:true, class:'chosen'}];
        if (rejected) {
            violatedNodes.forEach(node => {
                step.changes[node.data('id')] = [{add:true, class:'rejected'}];
            });
        }

        steps.push(step);
    }
    console.log('PRIMS COMPLETED!!!');

    return [steps, true];
}

/*
* Degree-Constrained Kruskals Algorithm (Simple)
* @param {object} graph - The cytoscape graph passed through
* @param {number} maxDegree - The maximum degree a node can have
* @returns {array} [steps, accepted] - steps = the array of steps to be used by the AlgoController
* accepted = if the algo was able to find the MST or not
*/
export function degreeConstrainedKruskals(graph, showRejectedEdges, maxDegree) {
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
    initStep.changes = {};
    if (showRejectedEdges) {
        graph.edges().forEach(edge => {
            initStep.changes[edge.data('id')] = [{add:true, class:'search'}];
        });
    }
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
        let rejected = false;
        let violatedNodes = [];

        if (showRejectedEdges) {
            if (edgeQueue.empty()) {
                console.log('No more edges to choose from');
                return [steps, false];
            }

            nextEdge = edgeQueue[0];
            const sourceNode = nextEdge.source();
            const targetNode = nextEdge.target();
            if (groupDict[sourceNode.data('id')].same(groupDict[targetNode.data('id')])) {
                rejected = true;
            }
            if (sourceNode.connectedEdges().filter(edge => edgeInGraph[edge.data('id')]).length >= maxDegree) {
                violatedNodes.push(sourceNode);
                rejected = true;
            }
            if (targetNode.connectedEdges().filter(edge => edgeInGraph[edge.data('id')]).length >= maxDegree) {
                violatedNodes.push(targetNode);
                rejected = true;
            }
        }
        else {
            while (nextEdge == null) {
                if (edgeQueue.empty()) {
                    console.log('No more edges to choose from');
                    return [steps, false];
                }

                const edge = edgeQueue[0];
                const sourceId = edge.source().data('id');
                const targetId = edge.target().data('id');

                if (!groupDict[sourceId].same(groupDict[targetId]) && 
                    edge.source().connectedEdges().filter(edge => edgeInGraph[edge.data('id')]).length + 1 <= maxDegree && 
                    edge.target().connectedEdges().filter(edge => edgeInGraph[edge.data('id')]).length + 1 <= maxDegree) {

                        nextEdge = edge;
                        break;
                }
                edgeQueue = edgeQueue.difference(edge);
            }
        }
        edgeQueue = edgeQueue.difference(nextEdge);

        step.changes = {};

        if (!rejected) {
            edgeCount++;
            edgeInGraph[nextEdge.data('id')] = true;
            mstCost += nextEdge.data('weight');

            const sourceNode = nextEdge.source();
            const targetNode = nextEdge.target();
            const sourceId = sourceNode.data('id');
            const targetId = targetNode.data('id');

            // Adding source and target nodes to same group and all their connected nodes as well
            groupDict[sourceId] = groupDict[sourceId].union(groupDict[targetId]);
            groupDict[sourceId].forEach(function(node) {
                groupDict[node.data('id')] = groupDict[sourceId];
            });

            if (unvisitedNodes.contains(sourceNode)) {
                unvisitedNodes = unvisitedNodes.difference(sourceNode);
                step.changes[sourceNode.data('id')] = [{add:true, class:'chosen'}];
            }
            if (unvisitedNodes.contains(targetNode)) {
                unvisitedNodes = unvisitedNodes.difference(targetNode);
                step.changes[targetNode.data('id')] = [{add:true, class:'chosen'}];
            }
        }

        step.mstCost = mstCost;
        step.edgeQueue = edgeQueue.map(edge => `${edge.data('id')} (${edge.data('weight')})`);
        step.changes[nextEdge.data('id')] = rejected ? [{add:true, class:'rejected'}, {add:false, class:'search'}] : [{add:true, class:'chosen'}];
        if (violatedNodes.length > 0) {
            violatedNodes.forEach(node => {
                step.changes[node.data('id')] = [{add:true, class:'rejected'}];
            });
        }

        steps.push(step);
    }
    console.log('DEGREE CONSTRAINED KRUSKALS COMPLETED!!!');
    
    return [steps, true];
}

class Ant {
    constructor(initNode) {
        this.initNode = initNode;
        this.currNode = initNode;
        this.visitedNodes = [this.initNode];
    }

    reset() {
        this.currNode = this.initNode;
        this.visitedNodes = [this.initNode];
    }
}

/*
* Parallel Ant Colony Optimisation Algorithm for DCMST
*/
export function pacoAlgorithm(graph, maxDegree) {
    const ants = [];
    for (const node of graph.nodes()) {
        const ant = new Ant(node.data('id'));
        ants.push(ant);
    }

    const resetAnts = function() {
        for (const ant of ants) {
            ant.reset();
        }
    }

    // Number of nodes in the graph
    const n = graph.nodes().length;

    // Getting the max and min weights in the graph
    const maxWeight = graph.edges().max(edge => edge.data('weight')).value;
    const minWeight = graph.edges().min(edge => edge.data('weight')).value;

    // The max and min pheromone levels
    const maxPheromone = 1000 * ((maxWeight - minWeight) + (maxWeight - minWeight) / 3);
    const minPheromone = (maxWeight - minWeight) / 3;

    // The rate at which the pheromone evaporates
    let evapFactor = 0.5;
    // Factor to enhance pheromone levels of good edges
    let enhanceFactor = 1.5;
    // evaporate good edges after no improvements
    const evapGoodEdges = function() {
        return Math.random() * 0.2 + 0.1;
    }

    // Get initial pheromone level of an edge
    const getIP = function(edgeId) {
        return (maxWeight - graph.$(`#${edgeId}`).data('weight')) + (maxWeight - minWeight) / 3;
    }

    // Returns an edge at random, proportionally to the edge's pheromone level
    const pickRandomEdgeByPheromone = function(connectedEdges) {
        const totalPheromone = connectedEdges.reduce((total, edge) => total + edge.data('weight'), 0);
        
        let rand = Math.random() * totalPheromone;
        for (let i = 0; i < connectedEdges.length; i++) {
            const edge = connectedEdges[i];
            rand -= edge.data('weight');
            if (rand <= 0) {
                return edge;
            }
        }
        return connectedEdges[connectedEdges.length - 1];
    }
    
    // Creating the pheromone graph
    let pheromoneGraph = cytoscape({
        headless: true,
        elements: graph.elements().clone().jsons()
    })

    // Initialise all initial pheromones IP in the pheromone graph
    for (const edge of pheromoneGraph.edges()) {
        edge.data('weight', getIP(edge.data('id')));
    }

    // Keeps track of how many times an edge has been visited by the ants in between each pheromone update
    const edgeVisits = {};
    for (const edge of pheromoneGraph.edges()) {
        edgeVisits[edge.data('id')] = 0;
    }

    // Resets the edge visits
    const resetEdgeVisits = function() {
        for (const edge in edgeVisits) {
            edgeVisits[edge] = 0;
        }
    }

    // Updates the pheromone levels for all the edges in the pheromone graph
    const updateEdgePheromones = function() {
        for (const edge of pheromoneGraph.edges()) {
            const edgeId = edge.data('id');
            const p = edge.data('weight');
            edge.data('weight', (1 - evapFactor) * p + edgeVisits[edgeId] * getIP(edgeId));
            if (edge.data('weight') > maxPheromone) {
                edge.data('weight', maxPheromone - getIP(edgeId));
            }
            if (edge.data('weight') < minPheromone) {
                edge.data('weight', minPheromone + getIP(edgeId));
            }
        }

        resetEdgeVisits();
    }

    // How many steps/moves the ants will take
    const steps = 25; // ==== 75 ====
    const s1 = Math.floor(steps/3);
    const s2 = Math.floor(2 * steps/3);

    // Keeps track of best tree and its cost
    let bestTree = null;
    let minCost = 999999999999999;

    let noImprovement = 0;
    for (let i = 1; i < 1000; i++) { // ==== 10,000 ====
        noImprovement++;

        if (noImprovement == 250) { // ==== 2500 ====
            console.log("No improvement after 2500 cycles");
            if (bestTree) {
                graph.nodes().addClass('chosen');
                for (const edge of bestTree) {
                    graph.$(`#${edge.data('id')}`).addClass('chosen');
                }
                console.log(bestTree.reduce((sum, edge) => sum + edge.data('weight'), 0));
            }
            return;
        }

        if (i % 50 == 0) { // ==== 500 ====
            console.log("Updating factors");
            evapFactor *= 0.95;
            enhanceFactor *= 1.05;
        }

        for (let s = 0; s < steps; s++) {
            if (s == s1 || s == s2) {
                // update pheromones
                updateEdgePheromones();
            }
            for (const ant of ants) {
                const connectedEdges = pheromoneGraph.$(`#${ant.currNode}`).connectedEdges();

                // if ant visits a node it has visited 5 times, skip the ant's step
                let attempts = 0;
                while (attempts < 5) {
                    // select edge
                    const edge = pickRandomEdgeByPheromone(connectedEdges);
                    // get next node
                    const nextNode = edge.source().data('id') == ant.currNode ? edge.target().data('id') : edge.source().data('id');
                    if (!ant.visitedNodes.includes(nextNode)) {
                        // add edge to pheromone update
                        edgeVisits[edge.data('id')] += 1;
                        // move ant to next node
                        ant.currNode = nextNode;
                        // add node to ants visited nodes
                        ant.visitedNodes.push(nextNode);
                        break;
                    }
                    else {
                        attempts++;
                    }
                }
            }
        }
        resetAnts();

        // update pheromones
        updateEdgePheromones();
        
        // construct tree
        
        let groupDict = {};
        graph.nodes().forEach(node => {
            const nodeId = node.data('id');
            groupDict[nodeId] = graph.collection();
            groupDict[nodeId] = groupDict[nodeId].union(node);
        });
        
        let edgeQueue = pheromoneGraph.edges().sort(function(a, b) {
            return b.data('weight') - a.data('weight');
        });

        let candidateIndex = 0;

        let getEdgeCandidates = function() {
            let temp = edgeQueue.slice(candidateIndex, 5 * n).map(edge => graph.$(`#${edge.data('id')}`));
            candidateIndex += 5 * n;
            temp = temp.sort(function(a, b) {
                return a.data('weight') - b.data('weight');
            });
            return temp;
        }

        let edgeCandidates = getEdgeCandidates();

        let T = graph.collection();
        let constructed = true;
        while (T.length != n - 1) {
            if (edgeCandidates.length != 0) {
                const edge = edgeCandidates.shift();
                const sourceNode = edge.source();
                const targetNode = edge.target();
                const sourceId = sourceNode.data('id');
                const targetId = targetNode.data('id');
                const sourceDegree = sourceNode.connectedEdges(e => T.contains(e)).length;
                const targetDegree = targetNode.connectedEdges(e => T.contains(e)).length;
                if (!T.contains(edge) && !groupDict[sourceId].same(groupDict[targetId]) &&
                    sourceDegree < maxDegree && targetDegree < maxDegree) {
                    
                        T = T.union(edge);
                        groupDict[sourceId] = groupDict[sourceId].union(groupDict[targetId]);
                        groupDict[sourceId].forEach(function(node) {
                            groupDict[node.data('id')] = groupDict[sourceId];
                        });
                }
            }
            else {
                edgeCandidates = getEdgeCandidates();
                if (edgeCandidates.length == 0) {
                    constructed = false;
                    break;
                }
            }
        }

        if (constructed) {
            const treeCost = T.reduce((sum, edge) => sum + edge.data('weight'), 0);
            if (treeCost < minCost) {
                console.log(`New best tree found!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! ${treeCost}`);
                minCost = treeCost;
                bestTree = T;
                noImprovement = 0;
            }
        }

        if (bestTree) {
            for (const edge of bestTree) {
                const edgeId = edge.data('id');
                const pheromoneEdge = pheromoneGraph.$(`#${edgeId}`);
                const p = pheromoneEdge.data('weight');
                pheromoneEdge.data('weight', enhanceFactor * p);
                if (pheromoneEdge.data('weight') > maxPheromone) {
                    pheromoneEdge.data('weight', maxPheromone - getIP(edgeId));
                }
                if (pheromoneEdge.data('weight') < minPheromone) {
                    pheromoneEdge.data('weight', minPheromone + getIP(edgeId));
                }
            }
        }
        
        if (noImprovement % 10 == 0) { // ==== 100 ====
            console.log("No improvement. Evaporating good edges");
            if (bestTree) {
                console.log("Evaporating good edges");
                for (const edge of bestTree) {
                    const edgeId = edge.data('id');
                    const p = pheromoneGraph.$(`#${edgeId}`).data('weight');
                    pheromoneGraph.$(`#${edgeId}`).data('weight', p * evapGoodEdges());
                }
            }
            // else {
            //     console.log("Evaporating all edges");
            //     for (const edge of pheromoneGraph.edges()) {
            //         const edgeId = edge.data('id');
            //         const p = pheromoneGraph.$(`#${edgeId}`).data('weight');
            //         pheromoneGraph.$(`#${edgeId}`).data('weight', p * evapGoodEdges());
            //     }
            // }
        }

        // if tree cost < minCost, update minCost and bestTree
        // enhance pheromones for edges in best tree B
        // if no improvement in 100 cycles
            // evaporate pheromone from edges of the best tree B
    }
    
    if (bestTree) {
        graph.nodes().addClass('chosen');
        for (const edge of bestTree) {
            graph.$(`#${edge.data('id')}`).addClass('chosen');
        }
        console.log(bestTree.reduce((sum, edge) => sum + edge.data('weight'), 0));
        return;
    }
    else {
        console.log('No solution found');
        return;
    }
    return bestTree;
}