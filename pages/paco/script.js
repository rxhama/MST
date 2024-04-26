import { AlgoController, PacoController, newPacoAlgorithm } from '../../utils.js';

let graphs = localStorage.getItem('storedGraphs');
if (!graphs) {
    alert('Graphs have been deleted.\nPage will be redirected to the home page to reload initial graphs.');
    window.location.href = '../../index.html';
}
graphs = JSON.parse(graphs);

// Graph containers
const cyContainer = document.getElementById('cy');
const ant1Container = document.getElementById('ant1');
const ant2Container = document.getElementById('ant2');
const ant3Container = document.getElementById('ant3');
const ant4Container = document.getElementById('ant4');
const bestTreeContainer = document.getElementById('cy2'); 
const minCostDisplay = document.getElementById('minCostDisplay');
const minCostDisplay2 = document.getElementById('minCostDisplay2');
const explanationDisplay = document.getElementById('explanation-box');

// These are the displays that are passed to the algoController
const algoDisplays = {};
algoDisplays.minCostDisplay = minCostDisplay;
algoDisplays.cyContainer = cyContainer;
algoDisplays.explanationDisplay = explanationDisplay;
const algoDisplays1 = {};
algoDisplays1.cyContainer = ant1Container;
const algoDisplays2 = {};
algoDisplays2.cyContainer = ant2Container;
const algoDisplays3 = {};
algoDisplays3.cyContainer = ant3Container;
const algoDisplays4 = {};
algoDisplays4.cyContainer = ant4Container;
const algoDisplays5 = {};
algoDisplays5.cyContainer = bestTreeContainer;
algoDisplays5.minCostDisplay = minCostDisplay2;

let algoDisplaysList = [
    algoDisplays,
    algoDisplays1,
    algoDisplays2,
    algoDisplays3,
    algoDisplays4,
    algoDisplays5
];

// Initialise AlgoControllers
const mainAC = new AlgoController();
const ant1AC = new AlgoController();
const ant2AC = new AlgoController();
const ant3AC = new AlgoController();
const ant4AC = new AlgoController();
const bestTreeAC = new AlgoController();
let ACs = [
    mainAC,
    ant1AC,
    ant2AC,
    ant3AC,
    ant4AC,
    bestTreeAC
];
// Initialise PacoController with the ACs
const pacoController = new PacoController(ACs);
// Add event listeners to the media buttons to control the PacoController
document.getElementById('play').addEventListener('click', () => pacoController.play());
document.getElementById('pause').addEventListener('click', () => pacoController.pause());
document.getElementById('next').addEventListener('click', () => pacoController.next());
document.getElementById('previous').addEventListener('click', () => pacoController.previous());
document.getElementById('toStart').addEventListener('click', () => pacoController.toStart());
document.getElementById('toEnd').addEventListener('click', () => pacoController.toEnd());

// Creating cytoscape instances for each graph
let cy = cytoscape({
    container: cyContainer
})

let ant1 = cytoscape({
    container: ant1Container
})

let ant2 = cytoscape({
    container: ant2Container
})

let ant3 = cytoscape({
    container: ant3Container
})

let ant4 = cytoscape({
    container: ant4Container
})

let cy2 = cytoscape({
    container: bestTreeContainer
})

let cyGraphs = [cy, ant1, ant2, ant3, ant4, cy2];
// Makes all graphs update when a single graphs weight is updated,
// however not for best tree graph (cyGraphs[5]) - it does not need to show pheromones
for (let i = 0; i < cyGraphs.length; i++) {
    let graph = graphs[2].graph;
    if (i == 5) {
        graph = JSON.parse(JSON.stringify(graph));
    }
    cyGraphs[i].json(graph);
    cyGraphs[i].fit();
    cyGraphs[i].userZoomingEnabled(false);
    cyGraphs[i].userPanningEnabled(false);
    cyGraphs[i].nodes().ungrabify();
    // cyGraphs[i].elements().unselectify();
}

cyGraphs[0].$('#b').select();
cyGraphs[0].$('#o').select();
cyGraphs[0].$('#t').select();
cyGraphs[0].$('#h').select();

for (const g of cyGraphs) {
    g.elements().unselectify();
}

// Generated previously
// Needs to be generated as PACO ant movements are non-deterministic and will give different results
// every time, so cannot give explanation of algo if ant movement is not known
const steps = [
    [
        [
            {
                "changes": {},
                "edgeQueue": [],
                "mstCost": 0
            },
            {
                "mstCost": 0,
                "edgeQueue": 0,
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "mstCost": 1,
                "changes": {
                    "ox": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "o": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "x": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                },
                "edgeQueue": []
            },
            {
                "mstCost": 2,
                "changes": {
                    "jl": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "j": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "l": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                },
                "edgeQueue": []
            },
            {
                "mstCost": 3,
                "changes": {
                    "eq": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "e": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "q": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                },
                "edgeQueue": []
            },
            {
                "mstCost": 4,
                "changes": {
                    "gj": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "g": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "j": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                },
                "edgeQueue": []
            },
            {
                "mstCost": 6,
                "changes": {
                    "tu": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "t": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "u": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                },
                "edgeQueue": []
            },
            {
                "mstCost": 8,
                "changes": {
                    "di": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "d": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "i": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                },
                "edgeQueue": []
            },
            {
                "mstCost": 10,
                "changes": {
                    "ac": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "a": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "c": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                },
                "edgeQueue": []
            },
            {
                "mstCost": 12,
                "changes": {
                    "aw": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "a": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "w": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                },
                "edgeQueue": []
            },
            {
                "mstCost": 14,
                "changes": {
                    "mt": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "m": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "t": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                },
                "edgeQueue": []
            },
            {
                "mstCost": 16,
                "changes": {
                    "mz": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "m": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "z": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                },
                "edgeQueue": []
            },
            {
                "mstCost": 18,
                "changes": {
                    "ek": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "e": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "k": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                },
                "edgeQueue": []
            },
            {
                "mstCost": 20,
                "changes": {
                    "pw": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "p": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "w": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                },
                "edgeQueue": []
            },
            {
                "mstCost": 23,
                "changes": {
                    "sz": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "s": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "z": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                },
                "edgeQueue": []
            },
            {
                "mstCost": 26,
                "changes": {
                    "bp": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "b": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "p": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                },
                "edgeQueue": []
            },
            {
                "mstCost": 29,
                "changes": {
                    "dv": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "d": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "v": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                },
                "edgeQueue": []
            },
            {
                "mstCost": 32,
                "changes": {
                    "nx": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "n": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "x": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                },
                "edgeQueue": []
            },
            {
                "mstCost": 35,
                "changes": {
                    "co": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "c": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "o": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                },
                "edgeQueue": []
            },
            {
                "mstCost": 39,
                "changes": {
                    "lu": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "l": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "u": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                },
                "edgeQueue": []
            },
            {
                "mstCost": 43,
                "changes": {
                    "hy": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "h": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "y": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                },
                "edgeQueue": []
            },
            {
                "mstCost": 47,
                "changes": {
                    "nq": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "n": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "q": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                },
                "edgeQueue": []
            },
            {
                "mstCost": 52,
                "changes": {
                    "gy": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "g": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "y": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                },
                "edgeQueue": []
            },
            {
                "mstCost": 57,
                "changes": {
                    "bv": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "b": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "v": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                },
                "edgeQueue": []
            },
            {
                "mstCost": 63,
                "changes": {
                    "is": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "i": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "s": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                },
                "edgeQueue": []
            },
            {
                "mstCost": 70,
                "changes": {
                    "fh": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "f": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "h": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                },
                "edgeQueue": []
            },
            {
                "mstCost": 78,
                "changes": {
                    "kr": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "k": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "r": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                },
                "edgeQueue": []
            },
            {
                "mstCost": 78,
                "edgeQueue": [],
                "changes": {
                    "ox": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "jl": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "eq": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "gj": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "tu": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "di": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "ac": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "aw": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "mt": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "mz": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "ek": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "pw": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "sz": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "bp": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "dv": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "nx": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "co": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "lu": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "hy": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "nq": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "gy": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "bv": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "is": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "fh": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "kr": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "a": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "b": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "c": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "d": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "e": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "f": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "g": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "h": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "i": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "j": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "k": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "l": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "m": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "n": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "o": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "p": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "q": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "r": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "s": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "t": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "u": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "v": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "w": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "x": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "y": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "z": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {}
            },
            {
                "mstCost": 0,
                "edgeQueue": 0,
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "mstCost": 1,
                "changes": {
                    "ox": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "o": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "x": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                },
                "edgeQueue": []
            },
            {
                "mstCost": 2,
                "changes": {
                    "gj": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "g": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "j": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                },
                "edgeQueue": []
            },
            {
                "mstCost": 3,
                "changes": {
                    "jl": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "j": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "l": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                },
                "edgeQueue": []
            },
            {
                "mstCost": 4,
                "changes": {
                    "eq": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "e": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "q": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                },
                "edgeQueue": []
            },
            {
                "mstCost": 6,
                "changes": {
                    "di": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "d": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "i": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                },
                "edgeQueue": []
            },
            {
                "mstCost": 8,
                "changes": {
                    "mz": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "m": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "z": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                },
                "edgeQueue": []
            },
            {
                "mstCost": 10,
                "changes": {
                    "mt": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "m": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "t": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                },
                "edgeQueue": []
            },
            {
                "mstCost": 12,
                "changes": {
                    "ac": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "a": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "c": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                },
                "edgeQueue": []
            },
            {
                "mstCost": 14,
                "changes": {
                    "aw": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "a": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "w": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                },
                "edgeQueue": []
            },
            {
                "mstCost": 16,
                "changes": {
                    "tu": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "t": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "u": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                },
                "edgeQueue": []
            },
            {
                "mstCost": 18,
                "changes": {
                    "ek": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "e": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "k": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                },
                "edgeQueue": []
            },
            {
                "mstCost": 20,
                "changes": {
                    "pw": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "p": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "w": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                },
                "edgeQueue": []
            },
            {
                "mstCost": 23,
                "changes": {
                    "sz": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "s": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "z": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                },
                "edgeQueue": []
            },
            {
                "mstCost": 26,
                "changes": {
                    "co": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "c": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "o": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                },
                "edgeQueue": []
            },
            {
                "mstCost": 29,
                "changes": {
                    "bp": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "b": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "p": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                },
                "edgeQueue": []
            },
            {
                "mstCost": 32,
                "changes": {
                    "dv": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "d": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "v": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                },
                "edgeQueue": []
            },
            {
                "mstCost": 35,
                "changes": {
                    "nx": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "n": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "x": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                },
                "edgeQueue": []
            },
            {
                "mstCost": 39,
                "changes": {
                    "nq": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "n": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "q": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                },
                "edgeQueue": []
            },
            {
                "mstCost": 43,
                "changes": {
                    "hy": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "h": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "y": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                },
                "edgeQueue": []
            },
            {
                "mstCost": 47,
                "changes": {
                    "lu": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "l": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "u": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                },
                "edgeQueue": []
            },
            {
                "mstCost": 52,
                "changes": {
                    "bv": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "b": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "v": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                },
                "edgeQueue": []
            },
            {
                "mstCost": 57,
                "changes": {
                    "gy": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "g": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "y": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                },
                "edgeQueue": []
            },
            {
                "mstCost": 63,
                "changes": {
                    "is": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "i": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "s": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                },
                "edgeQueue": []
            },
            {
                "mstCost": 70,
                "changes": {
                    "fh": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "f": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "h": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                },
                "edgeQueue": []
            },
            {
                "mstCost": 78,
                "changes": {
                    "kr": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "k": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "r": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                },
                "edgeQueue": []
            },
            {
                "mstCost": 78,
                "edgeQueue": [],
                "changes": {
                    "ox": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "gj": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "jl": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "eq": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "di": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "mz": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "mt": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "ac": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "aw": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "tu": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "ek": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "pw": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "sz": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "co": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "bp": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "dv": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "nx": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "nq": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "hy": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "lu": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "bv": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "gy": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "is": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "fh": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "kr": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "a": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "b": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "c": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "d": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "e": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "f": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "g": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "h": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "i": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "j": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "k": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "l": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "m": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "n": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "o": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "p": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "q": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "r": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "s": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "t": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "u": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "v": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "w": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "x": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "y": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "z": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "mstCost": 0,
                "edgeQueue": 0,
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "mstCost": 1,
                "changes": {
                    "ox": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "o": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "x": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                },
                "edgeQueue": []
            },
            {
                "mstCost": 2,
                "changes": {
                    "eq": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "e": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "q": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                },
                "edgeQueue": []
            },
            {
                "mstCost": 3,
                "changes": {
                    "gj": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "g": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "j": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                },
                "edgeQueue": []
            },
            {
                "mstCost": 4,
                "changes": {
                    "jl": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "j": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "l": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                },
                "edgeQueue": []
            },
            {
                "mstCost": 6,
                "changes": {
                    "tu": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "t": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "u": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                },
                "edgeQueue": []
            },
            {
                "mstCost": 8,
                "changes": {
                    "mt": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "m": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "t": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                },
                "edgeQueue": []
            },
            {
                "mstCost": 10,
                "changes": {
                    "mz": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "m": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "z": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                },
                "edgeQueue": []
            },
            {
                "mstCost": 12,
                "changes": {
                    "ac": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "a": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "c": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                },
                "edgeQueue": []
            },
            {
                "mstCost": 14,
                "changes": {
                    "aw": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "a": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "w": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                },
                "edgeQueue": []
            },
            {
                "mstCost": 16,
                "changes": {
                    "di": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "d": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "i": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                },
                "edgeQueue": []
            },
            {
                "mstCost": 18,
                "changes": {
                    "pw": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "p": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "w": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                },
                "edgeQueue": []
            },
            {
                "mstCost": 20,
                "changes": {
                    "ek": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "e": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "k": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                },
                "edgeQueue": []
            },
            {
                "mstCost": 23,
                "changes": {
                    "bd": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "b": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "d": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                },
                "edgeQueue": []
            },
            {
                "mstCost": 26,
                "changes": {
                    "bp": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "b": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "p": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                },
                "edgeQueue": []
            },
            {
                "mstCost": 29,
                "changes": {
                    "nx": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "n": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "x": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                },
                "edgeQueue": []
            },
            {
                "mstCost": 32,
                "changes": {
                    "sz": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "s": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "z": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                },
                "edgeQueue": []
            },
            {
                "mstCost": 35,
                "changes": {
                    "co": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "c": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "o": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                },
                "edgeQueue": []
            },
            {
                "mstCost": 39,
                "changes": {
                    "hy": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "h": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "y": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                },
                "edgeQueue": []
            },
            {
                "mstCost": 43,
                "changes": {
                    "lu": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "l": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "u": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                },
                "edgeQueue": []
            },
            {
                "mstCost": 47,
                "changes": {
                    "nq": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "n": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "q": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                },
                "edgeQueue": []
            },
            {
                "mstCost": 52,
                "changes": {
                    "gy": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "g": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "y": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                },
                "edgeQueue": []
            },
            {
                "mstCost": 58,
                "changes": {
                    "hk": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "h": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "k": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                },
                "edgeQueue": []
            },
            {
                "mstCost": 58,
                "edgeQueue": [],
                "changes": {
                    "ox": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "eq": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "gj": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "jl": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "tu": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "mt": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "mz": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "ac": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "aw": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "di": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "pw": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "ek": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "bd": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "bp": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "nx": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "sz": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "co": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "hy": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "lu": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "nq": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "gy": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "hk": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "a": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "b": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "c": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "d": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "e": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "f": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "g": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "h": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "i": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "j": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "k": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "l": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "m": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "n": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "o": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "p": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "q": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "r": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "s": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "t": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "u": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "v": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "w": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "x": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "y": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "z": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "mstCost": 0,
                "edgeQueue": 0,
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "mstCost": 1,
                "changes": {
                    "jl": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "j": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "l": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                },
                "edgeQueue": []
            },
            {
                "mstCost": 2,
                "changes": {
                    "ox": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "o": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "x": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                },
                "edgeQueue": []
            },
            {
                "mstCost": 3,
                "changes": {
                    "eq": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "e": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "q": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                },
                "edgeQueue": []
            },
            {
                "mstCost": 4,
                "changes": {
                    "gj": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "g": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "j": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                },
                "edgeQueue": []
            },
            {
                "mstCost": 6,
                "changes": {
                    "tu": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "t": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "u": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                },
                "edgeQueue": []
            },
            {
                "mstCost": 8,
                "changes": {
                    "mt": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "m": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "t": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                },
                "edgeQueue": []
            },
            {
                "mstCost": 10,
                "changes": {
                    "pw": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "p": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "w": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                },
                "edgeQueue": []
            },
            {
                "mstCost": 12,
                "changes": {
                    "mz": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "m": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "z": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                },
                "edgeQueue": []
            },
            {
                "mstCost": 14,
                "changes": {
                    "di": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "d": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "i": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                },
                "edgeQueue": []
            },
            {
                "mstCost": 16,
                "changes": {
                    "aw": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "a": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "w": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                },
                "edgeQueue": []
            },
            {
                "mstCost": 18,
                "changes": {
                    "ek": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "e": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "k": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                },
                "edgeQueue": []
            },
            {
                "mstCost": 20,
                "changes": {
                    "ac": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "a": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "c": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                },
                "edgeQueue": []
            },
            {
                "mstCost": 23,
                "changes": {
                    "bp": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "b": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "p": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                },
                "edgeQueue": []
            },
            {
                "mstCost": 26,
                "changes": {
                    "nx": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "n": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "x": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                },
                "edgeQueue": []
            },
            {
                "mstCost": 29,
                "changes": {
                    "sz": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "s": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "z": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                },
                "edgeQueue": []
            },
            {
                "mstCost": 32,
                "changes": {
                    "dv": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "d": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "v": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                },
                "edgeQueue": []
            },
            {
                "mstCost": 35,
                "changes": {
                    "co": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "c": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "o": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                },
                "edgeQueue": []
            },
            {
                "mstCost": 39,
                "changes": {
                    "lu": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "l": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "u": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                },
                "edgeQueue": []
            },
            {
                "mstCost": 43,
                "changes": {
                    "nq": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "n": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "q": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                },
                "edgeQueue": []
            },
            {
                "mstCost": 47,
                "changes": {
                    "hy": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "h": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "y": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                },
                "edgeQueue": []
            },
            {
                "mstCost": 52,
                "changes": {
                    "gy": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "g": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "y": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                },
                "edgeQueue": []
            },
            {
                "mstCost": 57,
                "changes": {
                    "bv": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "b": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "v": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                },
                "edgeQueue": []
            },
            {
                "mstCost": 63,
                "changes": {
                    "is": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "i": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "s": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                },
                "edgeQueue": []
            },
            {
                "mstCost": 70,
                "changes": {
                    "fh": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "f": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "h": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                },
                "edgeQueue": []
            },
            {
                "mstCost": 78,
                "changes": {
                    "kr": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "k": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "r": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                },
                "edgeQueue": []
            },
            {
                "mstCost": 78,
                "edgeQueue": [],
                "changes": {
                    "jl": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "ox": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "eq": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "gj": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "tu": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "mt": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "pw": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "mz": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "di": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "aw": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "ek": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "ac": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "bp": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "nx": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "sz": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "dv": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "co": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "lu": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "nq": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "hy": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "gy": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "bv": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "is": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "fh": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "kr": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "a": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "b": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "c": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "d": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "e": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "f": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "g": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "h": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "i": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "j": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "k": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "l": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "m": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "n": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "o": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "p": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "q": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "r": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "s": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "t": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "u": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "v": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "w": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "x": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "y": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "z": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "mstCost": 0,
                "edgeQueue": 0,
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "mstCost": 1,
                "changes": {
                    "ox": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "o": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "x": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                },
                "edgeQueue": []
            },
            {
                "mstCost": 2,
                "changes": {
                    "jl": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "j": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "l": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                },
                "edgeQueue": []
            },
            {
                "mstCost": 3,
                "changes": {
                    "gj": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "g": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "j": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                },
                "edgeQueue": []
            },
            {
                "mstCost": 4,
                "changes": {
                    "eq": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "e": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "q": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                },
                "edgeQueue": []
            },
            {
                "mstCost": 6,
                "changes": {
                    "tu": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "t": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "u": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                },
                "edgeQueue": []
            },
            {
                "mstCost": 8,
                "changes": {
                    "mt": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "m": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "t": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                },
                "edgeQueue": []
            },
            {
                "mstCost": 10,
                "changes": {
                    "di": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "d": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "i": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                },
                "edgeQueue": []
            },
            {
                "mstCost": 12,
                "changes": {
                    "ek": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "e": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "k": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                },
                "edgeQueue": []
            },
            {
                "mstCost": 14,
                "changes": {
                    "mz": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "m": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "z": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                },
                "edgeQueue": []
            },
            {
                "mstCost": 16,
                "changes": {
                    "ac": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "a": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "c": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                },
                "edgeQueue": []
            },
            {
                "mstCost": 18,
                "changes": {
                    "aw": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "a": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "w": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                },
                "edgeQueue": []
            },
            {
                "mstCost": 20,
                "changes": {
                    "pw": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "p": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "w": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                },
                "edgeQueue": []
            },
            {
                "mstCost": 23,
                "changes": {
                    "bp": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "b": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "p": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                },
                "edgeQueue": []
            },
            {
                "mstCost": 26,
                "changes": {
                    "dv": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "d": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "v": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                },
                "edgeQueue": []
            },
            {
                "mstCost": 29,
                "changes": {
                    "sz": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "s": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "z": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                },
                "edgeQueue": []
            },
            {
                "mstCost": 32,
                "changes": {
                    "nx": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "n": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "x": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                },
                "edgeQueue": []
            },
            {
                "mstCost": 35,
                "changes": {
                    "co": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "c": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "o": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                },
                "edgeQueue": []
            },
            {
                "mstCost": 39,
                "changes": {
                    "hy": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "h": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "y": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                },
                "edgeQueue": []
            },
            {
                "mstCost": 43,
                "changes": {
                    "lu": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "l": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "u": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                },
                "edgeQueue": []
            },
            {
                "mstCost": 47,
                "changes": {
                    "nq": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "n": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "q": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                },
                "edgeQueue": []
            },
            {
                "mstCost": 52,
                "changes": {
                    "gy": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "g": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "y": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                },
                "edgeQueue": []
            },
            {
                "mstCost": 57,
                "changes": {
                    "bv": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "b": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "v": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                },
                "edgeQueue": []
            },
            {
                "mstCost": 63,
                "changes": {
                    "is": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "i": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "s": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                },
                "edgeQueue": []
            },
            {
                "mstCost": 70,
                "changes": {
                    "fh": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "f": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "h": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                },
                "edgeQueue": []
            },
            {
                "mstCost": 78,
                "changes": {
                    "kr": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "k": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "r": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                },
                "edgeQueue": []
            },
            {
                "mstCost": 78,
                "edgeQueue": [],
                "changes": {
                    "ox": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "jl": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "gj": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "eq": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "tu": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "mt": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "di": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "ek": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "mz": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "ac": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "aw": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "pw": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "bp": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "dv": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "sz": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "nx": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "co": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "hy": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "lu": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "nq": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "gy": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "bv": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "is": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "fh": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "kr": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "a": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "b": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "c": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "d": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "e": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "f": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "g": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "h": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "i": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "j": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "k": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "l": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "m": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "n": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "o": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "p": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "q": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "r": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "s": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "t": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "u": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "v": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "w": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "x": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "y": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "z": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ]
                }
            }
        ],
        true
    ],
    [
        [
            {
                "changes": {},
                "edgeQueue": [],
                "mstCost": 0
            },
            {
                "changes": {
                    "b": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {
                    "p": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "bp": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {
                    "a": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "ap": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {
                    "n": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "an": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {
                    "x": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "nx": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {
                    "o": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "ox": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {
                    "z": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "oz": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {
                    "s": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "sz": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {
                    "i": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "is": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {
                    "c": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "ci": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {
                    "v": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "cv": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {
                    "d": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "dv": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {
                    "b": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "p": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "bp": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "a": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "ap": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "n": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "an": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "x": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "nx": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "o": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "ox": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "z": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "oz": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "s": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "sz": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "i": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "is": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "c": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "ci": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "v": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "cv": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "d": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "dv": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {
                    "b": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {
                    "p": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "bp": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {
                    "f": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "fp": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {
                    "w": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "fw": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {
                    "a": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "aw": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {
                    "c": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "ac": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {
                    "o": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "co": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {
                    "x": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "ox": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {
                    "n": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "nx": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {
                    "e": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "en": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {
                    "k": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "ek": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {
                    "h": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "hk": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {
                    "y": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "hy": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {
                    "g": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "gy": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {
                    "j": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "gj": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {
                    "r": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "jr": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {
                    "q": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "qr": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {
                    "t": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "qt": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {
                    "m": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "mt": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {
                    "z": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "mz": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {
                    "s": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "sz": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {
                    "i": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "is": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {
                    "d": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "di": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {
                    "v": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "dv": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {
                    "b": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "p": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "bp": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "f": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "fp": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "w": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "fw": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "a": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "aw": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "c": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "ac": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "o": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "co": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "x": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "ox": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "n": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "nx": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "e": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "en": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "k": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "ek": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "h": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "hk": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "y": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "hy": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "g": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "gy": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "j": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "gj": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "r": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "jr": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "q": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "qr": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "t": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "qt": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "m": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "mt": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "z": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "mz": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "s": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "sz": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "i": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "is": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "d": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "di": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "v": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "dv": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {
                    "b": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {
                    "v": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "bv": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {
                    "a": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "av": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {
                    "w": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "aw": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {
                    "f": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "fw": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {
                    "p": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "fp": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {
                    "b": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "v": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "bv": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "a": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "av": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "w": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "aw": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "f": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "fw": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "p": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "fp": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {
                    "b": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {
                    "p": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "bp": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {
                    "f": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "fp": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {
                    "w": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "fw": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {
                    "e": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "ew": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {
                    "k": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "ek": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {
                    "h": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "hk": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {
                    "y": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "hy": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {
                    "g": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "gy": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {
                    "l": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "gl": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {
                    "u": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "lu": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {
                    "t": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "tu": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {
                    "m": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "mt": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {
                    "z": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "mz": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {
                    "s": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "sz": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {
                    "i": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "is": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {
                    "d": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "di": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {
                    "v": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "dv": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {
                    "c": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "cv": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {
                    "o": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "co": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {
                    "x": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "ox": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {
                    "n": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "nx": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {
                    "q": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "nq": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {
                    "r": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "qr": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {
                    "j": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "jr": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {
                    "b": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "p": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "bp": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "f": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "fp": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "w": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "fw": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "e": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "ew": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "k": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "ek": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "h": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "hk": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "y": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "hy": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "g": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "gy": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "l": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "gl": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "u": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "lu": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "t": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "tu": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "m": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "mt": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "z": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "mz": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "s": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "sz": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "i": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "is": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "d": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "di": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "v": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "dv": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "c": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "cv": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "o": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "co": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "x": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "ox": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "n": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "nx": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "q": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "nq": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "r": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "qr": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "j": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "jr": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {
                    "b": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {
                    "v": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "bv": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {
                    "c": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "cv": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {
                    "o": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "co": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {
                    "z": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "oz": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {
                    "s": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "sz": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {
                    "i": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "is": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {
                    "d": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "di": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {
                    "b": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "v": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "bv": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "c": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "cv": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "o": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "co": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "z": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "oz": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "s": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "sz": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "i": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "is": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "d": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "di": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            }
        ],
        true
    ],
    [
        [
            {
                "changes": {},
                "edgeQueue": [],
                "mstCost": 0
            },
            {
                "changes": {
                    "h": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {
                    "f": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "fh": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {
                    "w": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "fw": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {
                    "a": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "aw": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {
                    "c": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "ac": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {
                    "o": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "co": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {
                    "i": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "io": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {
                    "d": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "di": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {
                    "b": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "bd": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {
                    "p": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "bp": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {
                    "h": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "f": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "fh": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "w": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "fw": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "a": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "aw": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "c": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "ac": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "o": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "co": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "i": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "io": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "d": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "di": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "b": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "bd": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "p": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "bp": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {
                    "h": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {
                    "f": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "fh": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {
                    "p": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "fp": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {
                    "b": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "bp": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {
                    "d": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "bd": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {
                    "i": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "di": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {
                    "s": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "is": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {
                    "z": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "sz": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {
                    "m": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "mz": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {
                    "t": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "mt": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {
                    "n": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "nt": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {
                    "e": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "en": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {
                    "w": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "ew": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {
                    "a": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "aw": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {
                    "v": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "av": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {
                    "c": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "cv": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {
                    "o": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "co": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {
                    "x": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "ox": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {
                    "h": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "f": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "fh": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "p": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "fp": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "b": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "bp": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "d": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "bd": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "i": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "di": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "s": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "is": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "z": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "sz": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "m": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "mz": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "t": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "mt": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "n": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "nt": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "e": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "en": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "w": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "ew": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "a": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "aw": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "v": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "av": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "c": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "cv": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "o": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "co": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "x": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "ox": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {
                    "h": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {
                    "k": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "hk": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {
                    "w": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "kw": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {
                    "f": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "fw": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {
                    "p": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "fp": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {
                    "a": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "ap": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {
                    "c": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "ac": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {
                    "o": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "co": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {
                    "x": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "ox": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {
                    "n": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "nx": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {
                    "e": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "en": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {
                    "q": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "eq": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {
                    "r": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "qr": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {
                    "j": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "jr": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {
                    "u": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "ju": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {
                    "t": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "tu": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {
                    "m": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "mt": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {
                    "z": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "mz": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {
                    "s": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "sz": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {
                    "i": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "is": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {
                    "d": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "di": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {
                    "b": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "bd": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {
                    "v": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "bv": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {
                    "h": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "k": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "hk": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "w": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "kw": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "f": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "fw": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "p": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "fp": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "a": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "ap": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "c": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "ac": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "o": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "co": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "x": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "ox": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "n": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "nx": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "e": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "en": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "q": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "eq": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "r": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "qr": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "j": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "jr": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "u": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "ju": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "t": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "tu": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "m": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "mt": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "z": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "mz": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "s": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "sz": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "i": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "is": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "d": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "di": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "b": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "bd": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "v": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "bv": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {
                    "h": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {
                    "f": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "fh": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {
                    "w": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "fw": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {
                    "p": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "pw": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {
                    "b": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "bp": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {
                    "v": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "bv": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {
                    "d": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "dv": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {
                    "i": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "di": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {
                    "s": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "is": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {
                    "z": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "sz": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {
                    "m": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "mz": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {
                    "t": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "mt": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {
                    "u": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "tu": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {
                    "j": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "ju": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {
                    "g": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "gj": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {
                    "y": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "gy": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {
                    "h": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "f": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "fh": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "w": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "fw": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "p": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "pw": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "b": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "bp": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "v": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "bv": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "d": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "dv": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "i": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "di": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "s": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "is": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "z": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "sz": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "m": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "mz": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "t": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "mt": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "u": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "tu": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "j": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "ju": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "g": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "gj": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "y": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "gy": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {
                    "h": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {
                    "y": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "hy": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {
                    "g": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "gy": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {
                    "j": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "gj": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {
                    "l": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "jl": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {
                    "u": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "lu": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {
                    "t": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "tu": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {
                    "m": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "mt": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {
                    "z": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "mz": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {
                    "s": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "sz": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {
                    "i": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "is": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {
                    "d": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "di": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {
                    "v": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "dv": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {
                    "c": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "cv": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {
                    "a": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "ac": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {
                    "p": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "ap": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {
                    "f": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "fp": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {
                    "w": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "fw": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {
                    "k": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "kw": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {
                    "e": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "ek": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {
                    "r": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "er": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {
                    "q": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "qr": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {
                    "n": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "nq": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {
                    "h": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "y": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "hy": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "g": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "gy": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "j": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "gj": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "l": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "jl": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "u": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "lu": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "t": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "tu": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "m": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "mt": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "z": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "mz": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "s": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "sz": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "i": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "is": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "d": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "di": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "v": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "dv": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "c": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "cv": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "a": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "ac": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "p": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "ap": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "f": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "fp": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "w": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "fw": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "k": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "kw": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "e": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "ek": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "r": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "er": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "q": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "qr": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "n": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "nq": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            }
        ],
        true
    ],
    [
        [
            {
                "changes": {},
                "edgeQueue": [],
                "mstCost": 0
            },
            {
                "changes": {
                    "o": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {
                    "x": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "ox": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {
                    "n": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "nx": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {
                    "e": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "en": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {
                    "a": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "ae": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {
                    "c": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "ac": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {
                    "i": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "ci": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {
                    "s": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "is": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {
                    "z": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "sz": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {
                    "m": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "mz": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {
                    "t": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "mt": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {
                    "q": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "qt": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {
                    "r": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "qr": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {
                    "j": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "jr": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {
                    "l": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "jl": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {
                    "g": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "gl": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {
                    "h": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "gh": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {
                    "f": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "fh": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {
                    "w": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "fw": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {
                    "k": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "kw": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {
                    "o": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "x": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "ox": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "n": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "nx": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "e": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "en": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "a": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "ae": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "c": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "ac": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "i": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "ci": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "s": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "is": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "z": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "sz": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "m": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "mz": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "t": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "mt": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "q": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "qt": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "r": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "qr": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "j": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "jr": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "l": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "jl": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "g": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "gl": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "h": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "gh": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "f": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "fh": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "w": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "fw": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "k": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "kw": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {
                    "o": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {
                    "x": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "ox": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {
                    "n": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "nx": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {
                    "q": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "nq": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {
                    "t": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "qt": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {
                    "m": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "mt": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {
                    "z": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "mz": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {
                    "s": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "sz": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {
                    "i": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "is": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {
                    "d": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "di": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {
                    "v": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "dv": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {
                    "a": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "av": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {
                    "c": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "ac": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {
                    "o": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "x": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "ox": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "n": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "nx": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "q": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "nq": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "t": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "qt": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "m": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "mt": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "z": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "mz": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "s": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "sz": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "i": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "is": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "d": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "di": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "v": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "dv": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "a": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "av": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "c": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "ac": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {
                    "o": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {
                    "z": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "oz": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {
                    "s": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "sz": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {
                    "i": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "is": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {
                    "d": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "di": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {
                    "v": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "dv": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {
                    "c": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "cv": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {
                    "a": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "ac": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {
                    "w": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "aw": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {
                    "f": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "fw": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {
                    "p": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "fp": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {
                    "b": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "bp": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {
                    "o": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "z": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "oz": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "s": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "sz": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "i": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "is": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "d": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "di": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "v": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "dv": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "c": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "cv": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "a": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "ac": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "w": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "aw": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "f": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "fw": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "p": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "fp": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "b": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "bp": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {
                    "o": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {
                    "x": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "ox": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {
                    "n": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "nx": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {
                    "t": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "nt": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {
                    "u": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "tu": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {
                    "l": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "lu": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {
                    "j": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "jl": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {
                    "g": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "gj": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {
                    "y": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "gy": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {
                    "h": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "hy": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {
                    "k": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "hk": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {
                    "e": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "ek": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {
                    "q": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "eq": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {
                    "r": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "qr": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {
                    "o": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "x": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "ox": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "n": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "nx": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "t": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "nt": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "u": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "tu": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "l": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "lu": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "j": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "jl": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "g": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "gj": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "y": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "gy": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "h": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "hy": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "k": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "hk": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "e": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "ek": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "q": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "eq": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "r": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "qr": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {
                    "o": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {
                    "x": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "ox": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {
                    "n": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "nx": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {
                    "q": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "nq": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {
                    "r": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "qr": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {
                    "k": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "kr": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {
                    "e": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "ek": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {
                    "w": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "ew": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {
                    "a": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "aw": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {
                    "c": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "ac": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {
                    "v": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "cv": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {
                    "d": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "dv": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {
                    "i": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "di": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {
                    "s": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "is": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {
                    "z": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "sz": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {
                    "m": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "mz": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {
                    "t": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "mt": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {
                    "u": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "tu": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {
                    "l": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "lu": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {
                    "j": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "jl": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {
                    "g": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "gj": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {
                    "y": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "gy": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {
                    "h": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "hy": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {
                    "f": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "fh": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {
                    "p": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "fp": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {
                    "b": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "bp": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {
                    "o": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "x": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "ox": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "n": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "nx": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "q": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "nq": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "r": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "qr": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "k": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "kr": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "e": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "ek": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "w": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "ew": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "a": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "aw": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "c": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "ac": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "v": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "cv": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "d": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "dv": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "i": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "di": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "s": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "is": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "z": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "sz": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "m": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "mz": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "t": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "mt": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "u": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "tu": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "l": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "lu": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "j": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "jl": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "g": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "gj": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "y": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "gy": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "h": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "hy": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "f": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "fh": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "p": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "fp": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "b": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "bp": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            }
        ],
        true
    ],
    [
        [
            {
                "changes": {},
                "edgeQueue": [],
                "mstCost": 0
            },
            {
                "changes": {
                    "t": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {
                    "u": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "tu": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {
                    "j": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "ju": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {
                    "l": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "jl": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {
                    "g": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "gl": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {
                    "h": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "gh": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {
                    "f": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "fh": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {
                    "w": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "fw": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {
                    "a": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "aw": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {
                    "c": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "ac": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {
                    "o": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "co": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {
                    "i": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "io": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {
                    "d": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "di": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {
                    "v": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "dv": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {
                    "b": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "bv": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {
                    "p": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "bp": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {
                    "t": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "u": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "tu": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "j": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "ju": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "l": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "jl": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "g": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "gl": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "h": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "gh": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "f": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "fh": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "w": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "fw": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "a": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "aw": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "c": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "ac": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "o": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "co": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "i": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "io": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "d": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "di": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "v": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "dv": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "b": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "bv": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "p": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "bp": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {
                    "t": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {
                    "m": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "mt": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {
                    "x": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "mx": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {
                    "o": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "ox": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {
                    "c": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "co": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {
                    "a": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "ac": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {
                    "w": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "aw": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {
                    "k": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "kw": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {
                    "e": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "ek": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {
                    "r": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "er": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {
                    "j": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "jr": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {
                    "g": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "gj": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {
                    "h": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "gh": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {
                    "y": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "hy": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {
                    "t": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "m": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "mt": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "x": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "mx": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "o": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "ox": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "c": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "co": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "a": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "ac": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "w": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "aw": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "k": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "kw": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "e": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "ek": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "r": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "er": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "j": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "jr": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "g": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "gj": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "h": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "gh": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "y": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "hy": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {
                    "t": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {
                    "u": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "tu": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {
                    "l": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "lu": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {
                    "j": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "jl": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {
                    "r": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "jr": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {
                    "q": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "qr": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {
                    "e": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "eq": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {
                    "w": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "ew": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {
                    "k": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "kw": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {
                    "h": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "hk": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {
                    "f": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "fh": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {
                    "p": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "fp": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {
                    "b": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "bp": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {
                    "d": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "bd": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {
                    "i": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "di": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {
                    "o": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "io": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {
                    "c": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "co": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {
                    "a": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "ac": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {
                    "v": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "av": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {
                    "t": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "u": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "tu": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "l": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "lu": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "j": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "jl": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "r": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "jr": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "q": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "qr": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "e": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "eq": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "w": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "ew": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "k": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "kw": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "h": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "hk": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "f": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "fh": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "p": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "fp": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "b": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "bp": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "d": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "bd": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "i": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "di": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "o": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "io": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "c": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "co": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "a": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "ac": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "v": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "av": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {
                    "t": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {
                    "m": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "mt": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {
                    "z": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "mz": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {
                    "s": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "sz": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {
                    "i": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "is": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {
                    "d": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "di": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {
                    "v": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "dv": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {
                    "b": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "bv": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {
                    "p": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "bp": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {
                    "w": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "pw": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {
                    "a": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "aw": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {
                    "e": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "ae": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {
                    "k": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "ek": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {
                    "h": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "hk": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {
                    "y": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "hy": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {
                    "g": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "gy": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {
                    "l": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "gl": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {
                    "j": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "jl": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {
                    "r": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "jr": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {
                    "q": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "qr": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {
                    "u": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "qu": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {
                    "t": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "m": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "mt": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "z": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "mz": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "s": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "sz": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "i": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "is": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "d": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "di": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "v": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "dv": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "b": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "bv": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "p": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "bp": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "w": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "pw": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "a": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "aw": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "e": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "ae": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "k": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "ek": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "h": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "hk": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "y": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "hy": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "g": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "gy": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "l": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "gl": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "j": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "jl": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "r": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "jr": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "q": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "qr": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "u": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "qu": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {
                    "t": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {
                    "u": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "tu": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {
                    "l": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "lu": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {
                    "g": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "gl": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {
                    "h": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "gh": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {
                    "f": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "fh": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {
                    "p": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "fp": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {
                    "w": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "pw": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {
                    "a": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "aw": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {
                    "c": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "ac": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {
                    "x": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "cx": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {
                    "o": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "ox": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {
                    "z": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "oz": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {
                    "s": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "sz": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {
                    "i": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "is": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {
                    "d": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "di": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {
                    "v": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "dv": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {
                    "b": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "bv": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {
                    "t": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "u": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "tu": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "l": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "lu": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "g": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "gl": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "h": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "gh": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "f": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "fh": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "p": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "fp": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "w": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "pw": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "a": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "aw": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "c": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "ac": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "x": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "cx": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "o": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "ox": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "z": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "oz": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "s": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "sz": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "i": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "is": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "d": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "di": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "v": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "dv": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "b": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "bv": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            }
        ],
        true
    ],
    [
        [
            {
                "changes": {},
                "edgeQueue": [],
                "mstCost": 0
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "mstCost": 78,
                "edgeQueue": [],
                "changes": {
                    "ox": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "jl": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "eq": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "gj": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "tu": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "di": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "ac": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "aw": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "mt": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "mz": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "ek": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "pw": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "sz": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "bp": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "dv": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "nx": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "co": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "lu": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "hy": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "nq": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "gy": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "bv": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "is": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "fh": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "kr": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "a": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "b": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "c": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "d": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "e": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "f": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "g": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "h": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "i": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "j": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "k": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "l": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "m": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "n": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "o": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "p": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "q": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "r": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "s": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "t": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "u": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "v": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "w": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "x": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "y": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ],
                    "z": [
                        {
                            "add": false,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "mstCost": 78,
                "edgeQueue": [],
                "changes": {
                    "ox": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "jl": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "eq": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "gj": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "tu": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "di": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "ac": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "aw": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "mt": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "mz": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "ek": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "pw": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "sz": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "bp": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "dv": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "nx": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "co": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "lu": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "hy": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "nq": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "gy": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "bv": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "is": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "fh": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "kr": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "a": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "b": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "c": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "d": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "e": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "f": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "g": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "h": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "i": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "j": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "k": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "l": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "m": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "n": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "o": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "p": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "q": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "r": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "s": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "t": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "u": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "v": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "w": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "x": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "y": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ],
                    "z": [
                        {
                            "add": true,
                            "class": "chosen"
                        }
                    ]
                }
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            },
            {
                "changes": {}
            }
        ],
        true
    ],
    {
        "changes": {
            "a": [
                {
                    "add": true,
                    "class": "chosen"
                }
            ],
            "b": [
                {
                    "add": true,
                    "class": "chosen"
                }
            ],
            "c": [
                {
                    "add": true,
                    "class": "chosen"
                }
            ],
            "d": [
                {
                    "add": true,
                    "class": "chosen"
                }
            ],
            "e": [
                {
                    "add": true,
                    "class": "chosen"
                }
            ],
            "f": [
                {
                    "add": true,
                    "class": "chosen"
                }
            ],
            "g": [
                {
                    "add": true,
                    "class": "chosen"
                }
            ],
            "h": [
                {
                    "add": true,
                    "class": "chosen"
                }
            ],
            "i": [
                {
                    "add": true,
                    "class": "chosen"
                }
            ],
            "j": [
                {
                    "add": true,
                    "class": "chosen"
                }
            ],
            "k": [
                {
                    "add": true,
                    "class": "chosen"
                }
            ],
            "l": [
                {
                    "add": true,
                    "class": "chosen"
                }
            ],
            "m": [
                {
                    "add": true,
                    "class": "chosen"
                }
            ],
            "n": [
                {
                    "add": true,
                    "class": "chosen"
                }
            ],
            "o": [
                {
                    "add": true,
                    "class": "chosen"
                }
            ],
            "p": [
                {
                    "add": true,
                    "class": "chosen"
                }
            ],
            "q": [
                {
                    "add": true,
                    "class": "chosen"
                }
            ],
            "r": [
                {
                    "add": true,
                    "class": "chosen"
                }
            ],
            "s": [
                {
                    "add": true,
                    "class": "chosen"
                }
            ],
            "t": [
                {
                    "add": true,
                    "class": "chosen"
                }
            ],
            "u": [
                {
                    "add": true,
                    "class": "chosen"
                }
            ],
            "v": [
                {
                    "add": true,
                    "class": "chosen"
                }
            ],
            "w": [
                {
                    "add": true,
                    "class": "chosen"
                }
            ],
            "x": [
                {
                    "add": true,
                    "class": "chosen"
                }
            ],
            "y": [
                {
                    "add": true,
                    "class": "chosen"
                }
            ],
            "z": [
                {
                    "add": true,
                    "class": "chosen"
                }
            ],
            "ox": [
                {
                    "add": true,
                    "class": "chosen"
                }
            ],
            "jl": [
                {
                    "add": true,
                    "class": "chosen"
                }
            ],
            "eq": [
                {
                    "add": true,
                    "class": "chosen"
                }
            ],
            "gj": [
                {
                    "add": true,
                    "class": "chosen"
                }
            ],
            "tu": [
                {
                    "add": true,
                    "class": "chosen"
                }
            ],
            "di": [
                {
                    "add": true,
                    "class": "chosen"
                }
            ],
            "ac": [
                {
                    "add": true,
                    "class": "chosen"
                }
            ],
            "aw": [
                {
                    "add": true,
                    "class": "chosen"
                }
            ],
            "mt": [
                {
                    "add": true,
                    "class": "chosen"
                }
            ],
            "mz": [
                {
                    "add": true,
                    "class": "chosen"
                }
            ],
            "ek": [
                {
                    "add": true,
                    "class": "chosen"
                }
            ],
            "pw": [
                {
                    "add": true,
                    "class": "chosen"
                }
            ],
            "sz": [
                {
                    "add": true,
                    "class": "chosen"
                }
            ],
            "bp": [
                {
                    "add": true,
                    "class": "chosen"
                }
            ],
            "dv": [
                {
                    "add": true,
                    "class": "chosen"
                }
            ],
            "nx": [
                {
                    "add": true,
                    "class": "chosen"
                }
            ],
            "co": [
                {
                    "add": true,
                    "class": "chosen"
                }
            ],
            "lu": [
                {
                    "add": true,
                    "class": "chosen"
                }
            ],
            "hy": [
                {
                    "add": true,
                    "class": "chosen"
                }
            ],
            "nq": [
                {
                    "add": true,
                    "class": "chosen"
                }
            ],
            "gy": [
                {
                    "add": true,
                    "class": "chosen"
                }
            ],
            "bv": [
                {
                    "add": true,
                    "class": "chosen"
                }
            ],
            "is": [
                {
                    "add": true,
                    "class": "chosen"
                }
            ],
            "fh": [
                {
                    "add": true,
                    "class": "chosen"
                }
            ],
            "kr": [
                {
                    "add": true,
                    "class": "chosen"
                }
            ]
        },
        "mstCost": 78,
        "edgeQueue": []
    }
]

steps[0][0][0].explanation = `In this example, we have given the algorithm<br>
                                a node constraint of 2. We have selected nodes b,<br>
                                o, t, and h to track.`;
steps[0][0][1].explanation = `EXPLORATION PHASE:<br><br>
                                The ants are now searching the edges and<br>
                                will continue until every ant can no<br>
                                longer move. The ants cannot visit<br>
                                nodes they have already visited in<br>
                                this run.`;
steps[0][0][20].explanation = `EXPLORATION PHASE:<br><br>
                                The ants are now searching the edges and<br>
                                will continue until every ant can no<br>
                                longer move. The ants cannot visit<br>
                                nodes they have already visited in<br>
                                this run.`;
steps[0][0][21].explanation = `The ants have finished their movements.`;
steps[0][0][22].explanation = `CONSTRUCTION PHASE:<br><br>
                                The edges are sorted by phermone level<br>
                                in decreasing order, and the top 5n<br>
                                edges are put into a candidate list.<br><br>
                                The edges in this candidate list are<br>
                                then sorted by edge weights in ascending<br>
                                order, and Degree-Constrained Kruskal's<br>
                                is run on these candidate edges to attempt<br>
                                to create a spanning tree.`;
steps[0][0][46].explanation = `CONSTRUCTION PHASE:<br><br>
                                The edges are sorted by phermone level<br>
                                in decreasing order, and the top 5n<br>
                                edges are put into a candidate list.<br><br>
                                The edges in this candidate list are<br>
                                then sorted by edge weights in ascending<br>
                                order, and Degree-Constrained Kruskal's<br>
                                is run on these candidate edges to attempt<br>
                                to create a spanning tree.`;
steps[0][0][47].explanation = `Tree construction was successful, and the<br>
                                spanning tree is set as the new best DCMST<br>
                                so far.`;
steps[0][0][48].explanation = `Tree construction was successful, and the<br>
                                spanning tree is set as the new best DCMST<br>
                                so far.`;
steps[0][0][49].explanation = `Pheromone levels are updated accordingly and<br>
                                we are back in the EXPLORATION PHASE:<br><br>
                                The ants once again traverse their graphs<br>
                                until they can no longer move.`;
steps[0][0][50].explanation = `The EXPLORATION and CONSTRUCTION phases are<br>
                                repeated many, many times (in this algorithm,<br>
                                there are 1000 cycles), however this would be<br>
                                time-consuming to visualise!<br>
                                For this visualisation, only 4 cycles spread<br>
                                spread evenly throughout the algorithm are shown,<br>
                                including the cycles where new best trees are found.<br>
                                You can hang along and watch the rest of the algorithm<br>
                                or skip to the end to find out the best DCMST constructed<br><br>
                                In this scenario, the algorithm found the best DCMST in its<br>
                                first CONSTRUCTION phase that we saw, but this is not<br>
                                always the case.<br><br>
                                Best DCMST Cost (node degree = 2): 78`;


const list = [
    {graph: cyGraphs[0], steps: steps[0], displays: algoDisplays},
    {graph: cyGraphs[1], steps: steps[1], displays: algoDisplays1},
    {graph: cyGraphs[2], steps: steps[2], displays: algoDisplays2},
    {graph: cyGraphs[3], steps: steps[3], displays: algoDisplays3},
    {graph: cyGraphs[4], steps: steps[4], displays: algoDisplays4},
    {graph: cyGraphs[5], steps: steps[5], displays: algoDisplays5}
];
pacoController.setSteps(list);
console.log('Steps set!');