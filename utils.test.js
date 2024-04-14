const cytoscape = require('cytoscape');
const { primsAlgorithm, kruskalsAlgorithm, newBoruvkasAlgorithm } = require('./utils');

// Mocks the alert function so it doesn't cause
// a problem when running tests
global.alert = jest.fn();

let cy1, cy2, cy3;

beforeEach(() => {
    cy1 = cytoscape({
        elements: {
            nodes: [
                { data: { id: 'a' } }
            ]
        }
    });

    cy2 = cytoscape({
        elements: {
            nodes: [
                { data: { id: 'a' } },
                { data: { id: 'b' } }
    
            ],
            edges: [
                { data: { id: 'ab', source: 'a', target: 'b', weight: 2 } }
            ]
        }
    });

    cy3 = cytoscape({
        elements: {
            nodes: [
                { data: { id: 'a'} },
                { data: { id: 'b'} },
                { data: { id: 'c'} },
                { data: { id: 'd'} },
                { data: { id: 'e'} },
                { data: { id: 'f'} },
                { data: { id: 'g'} },
                { data: { id: 'h'} },
                { data: { id: 'i'} }
            ],
            edges: [
                { data: { id: 'ab', source: 'a', target: 'b', weight: 4 }},
                { data: { id: 'ah', source: 'a', target: 'h', weight: 8 }},
                { data: { id: 'bh', source: 'b', target: 'h', weight: 11 }},
                { data: { id: 'bc', source: 'b', target: 'c', weight: 8 }},
                { data: { id: 'hi', source: 'h', target: 'i', weight: 7 }},
                { data: { id: 'hg', source: 'h', target: 'g', weight: 1 }},
                { data: { id: 'ic', source: 'i', target: 'c', weight: 2 }},
                { data: { id: 'ig', source: 'i', target: 'g', weight: 6 }},
                { data: { id: 'gf', source: 'g', target: 'f', weight: 2 }},
                { data: { id: 'cd', source: 'c', target: 'd', weight: 7 }},
                { data: { id: 'cf', source: 'c', target: 'f', weight: 4 }},
                { data: { id: 'df', source: 'd', target: 'f', weight: 14 }},
                { data: { id: 'de', source: 'd', target: 'e', weight: 9 }},
                { data: { id: 'fe', source: 'f', target: 'e', weight: 10 }}
            ]
        }
    });
})

describe('Prims tests:', () => {
    test('Prims, no selected nodes', () => {
        const expectedResult = null;
        const result = primsAlgorithm(cy1, true);
        expect(result).toEqual(expectedResult);
    });

    test('Prims, cy1 (1 node), init: nodeA', () => {
        const expectedResult = [
            [
                {
                    mstCost: 0,
                    edgeQueue: [],
                    changes: {
                        'a': [{'add': true, 'class': 'chosen'}]
                    }
                }
            ],
            true
        ];

        // Selecting node 'a' as init node
        cy1.$('#a').select();

        const result = primsAlgorithm(cy1, true);
        expect(result).toEqual(expectedResult);
    });

    test('Prims, cy2 (2 nodes, 1 edge), init: nodeA', () => {
        const expectedResult = [
            [
                {
                    mstCost: 0,
                    edgeQueue: [
                        'ab (2)'
                    ],
                    changes: {
                        'a': [{'add': true, 'class': 'chosen'}],
                        'ab': [{'add': true, 'class': 'search'}]
                    }
                },
                {
                    mstCost: 2,
                    edgeQueue: [],
                    changes: {
                        'b': [{'add': true, 'class': 'chosen'}],
                        'ab': [{'add': true, 'class': 'chosen'}]
                    }
                }
            ],
            true
        ];

        cy2.$('#a').select();

        const result = primsAlgorithm(cy2, true);
        expect(result).toEqual(expectedResult);
    });

    test('Prims, cy2 (2 nodes, 1 edge), init: nodeB', () => {
        const expectedResult = [
            [
                {
                    mstCost: 0,
                    edgeQueue: [
                        'ab (2)'
                    ],
                    changes: {
                        'b': [{'add': true, 'class': 'chosen'}],
                        'ab': [{'add': true, 'class': 'search'}]
                    }
                },
                {
                    mstCost: 2,
                    edgeQueue: [],
                    changes: {
                        'a': [{'add': true, 'class': 'chosen'}],
                        'ab': [{'add': true, 'class': 'chosen'}]
                    }
                }
            ],
            true
        ];

        cy2.$('#b').select();

        const result = primsAlgorithm(cy2, true);
        expect(result).toEqual(expectedResult);
    });

    test('Prims, cy3 (9 nodes, 14 edges), init: nodeA', () => {
        const expectedResult = [
            [
                {
                    mstCost: 0,
                    edgeQueue: [
                        'ab (4)',
                        'ah (8)'
                    ],
                    changes: {
                        'a': [{'add': true, 'class': 'chosen'}],
                        'ab': [{'add': true, 'class': 'search'}],
                        'ah': [{'add': true, 'class': 'search'}]
                    }
                },
                {
                    mstCost: 4,
                    edgeQueue: [
                        'ah (8)',
                        'bc (8)',
                        'bh (11)'
                    ],
                    changes: {
                        'b': [{'add': true, 'class': 'chosen'}],
                        'ab': [{'add': true, 'class': 'chosen'}],
                        'bc': [{'add': true, 'class': 'search'}],
                        'bh': [{'add': true, 'class': 'search'}]
                    }
                },
                {
                    mstCost: 12,
                    edgeQueue: [
                        'hg (1)',
                        'hi (7)',
                        'bc (8)',
                        'bh (11)'
                    ],
                    changes: {
                        'h': [{'add': true, 'class': 'chosen'}],
                        'ah': [{'add': true, 'class': 'chosen'}],
                        'hi': [{'add': true, 'class': 'search'}],
                        'hg': [{'add': true, 'class': 'search'}]
                    }
                },
                {
                    mstCost: 13,
                    edgeQueue: [
                        'gf (2)',
                        'ig (6)',
                        'hi (7)',
                        'bc (8)',
                        'bh (11)'
                    ],
                    changes: {
                        'g': [{'add': true, 'class': 'chosen'}],
                        'hg': [{'add': true, 'class': 'chosen'}],
                        'ig': [{'add': true, 'class': 'search'}],
                        'gf': [{'add': true, 'class': 'search'}]
                    }
                },
                {
                    mstCost: 15,
                    edgeQueue: [
                        'cf (4)',
                        'ig (6)',
                        'hi (7)',
                        'bc (8)',
                        'fe (10)',
                        'bh (11)',
                        'df (14)'
                    ],
                    changes: {
                        'f': [{'add': true, 'class': 'chosen'}],
                        'gf': [{'add': true, 'class': 'chosen'}],
                        'cf': [{'add': true, 'class': 'search'}],
                        'df': [{'add': true, 'class': 'search'}],
                        'fe': [{'add': true, 'class': 'search'}]
                    }
                },
                {
                    mstCost: 19,
                    edgeQueue: [
                        'ic (2)',
                        'ig (6)',
                        'hi (7)',
                        'cd (7)',
                        'bc (8)',
                        'fe (10)',
                        'bh (11)',
                        'df (14)'
                    ],
                    changes: {
                        'c': [{'add': true, 'class': 'chosen'}],
                        'cf': [{'add': true, 'class': 'chosen'}],
                        'ic': [{'add': true, 'class': 'search'}],
                        'cd': [{'add': true, 'class': 'search'}]
                    }
                },
                {
                    mstCost: 21,
                    edgeQueue: [
                        'ig (6)',
                        'hi (7)',
                        'cd (7)',
                        'bc (8)',
                        'fe (10)',
                        'bh (11)',
                        'df (14)'
                    ],
                    changes: {
                        'i': [{'add': true, 'class': 'chosen'}],
                        'ic': [{'add': true, 'class': 'chosen'}],
                    }
                },
                {
                    mstCost: 21,
                    edgeQueue: [
                        'hi (7)',
                        'cd (7)',
                        'bc (8)',
                        'fe (10)',
                        'bh (11)',
                        'df (14)'
                    ],
                    changes: {
                        'ig': [
                            {'add': true, 'class': 'rejected'},
                            {'add': false, 'class': 'search'}
                        ]
                    }
                },
                {
                    mstCost: 21,
                    edgeQueue: [
                        'cd (7)',
                        'bc (8)',
                        'fe (10)',
                        'bh (11)',
                        'df (14)'
                    ],
                    changes: {
                        'hi': [
                            {'add': true, 'class': 'rejected'},
                            {'add': false, 'class': 'search'}
                        ]
                    }
                },
                {
                    mstCost: 28,
                    edgeQueue: [
                        'bc (8)',
                        'de (9)',
                        'fe (10)',
                        'bh (11)',
                        'df (14)'
                    ],
                    changes: {
                        'd': [{'add': true, 'class': 'chosen'}],
                        'cd': [{'add': true, 'class': 'chosen'}],
                        'de': [{'add': true, 'class': 'search'}]
                    }
                },
                {
                    mstCost: 28,
                    edgeQueue: [
                        'de (9)',
                        'fe (10)',
                        'bh (11)',
                        'df (14)'
                    ],
                    changes: {
                        'bc': [
                            {'add': true, 'class': 'rejected'},
                            {'add': false, 'class': 'search'}
                        ]
                    }
                },
                {
                    mstCost: 37,
                    edgeQueue: [
                        'fe (10)',
                        'bh (11)',
                        'df (14)'
                    ],
                    changes: {
                        'e': [{'add': true, 'class': 'chosen'}],
                        'de': [{'add': true, 'class': 'chosen'}]
                    }
                }
            ],
            true
        ]

        cy3.$('#a').select();

        const result = primsAlgorithm(cy3, true);
        expect(result).toEqual(expectedResult);
    });
});

describe('Kruskals tests:', () => {
    test('Kruskals, cy1 (1 node)', () => {
        const expectedResult = [
            [
                {
                    mstCost: 0,
                    edgeQueue: [],
                    changes: {}
                }
            ],
            true
        ];

        const result = kruskalsAlgorithm(cy1, true);
        expect(result).toEqual(expectedResult);
    });

    test('Kruskals, cy2 (2 nodes, 1 edge)', () => {
        const expectedResult = [
            [
                {
                    "changes": {
                        "ab": [
                            {
                                "add": true,
                                "class": "search"
                            }
                        ]
                    },
                    "mstCost": 0,
                    "edgeQueue": [
                        "ab (2)"
                    ]
                },
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
                        "ab": [
                            {
                                "add": true,
                                "class": "chosen"
                            }
                        ]
                    },
                    "mstCost": 2,
                    "edgeQueue": []
                }
            ],
            true
        ]

        const result = kruskalsAlgorithm(cy2, true);
        expect(result).toEqual(expectedResult);
    });

    test('Kruskals, cy3 (9 nodes, 14 edges)', () => {
        const expectedResult = [
            [
                {
                    "changes": {
                        "ab": [
                            {
                                "add": true,
                                "class": "search"
                            }
                        ],
                        "ah": [
                            {
                                "add": true,
                                "class": "search"
                            }
                        ],
                        "bh": [
                            {
                                "add": true,
                                "class": "search"
                            }
                        ],
                        "bc": [
                            {
                                "add": true,
                                "class": "search"
                            }
                        ],
                        "hi": [
                            {
                                "add": true,
                                "class": "search"
                            }
                        ],
                        "hg": [
                            {
                                "add": true,
                                "class": "search"
                            }
                        ],
                        "ic": [
                            {
                                "add": true,
                                "class": "search"
                            }
                        ],
                        "ig": [
                            {
                                "add": true,
                                "class": "search"
                            }
                        ],
                        "gf": [
                            {
                                "add": true,
                                "class": "search"
                            }
                        ],
                        "cd": [
                            {
                                "add": true,
                                "class": "search"
                            }
                        ],
                        "cf": [
                            {
                                "add": true,
                                "class": "search"
                            }
                        ],
                        "df": [
                            {
                                "add": true,
                                "class": "search"
                            }
                        ],
                        "de": [
                            {
                                "add": true,
                                "class": "search"
                            }
                        ],
                        "fe": [
                            {
                                "add": true,
                                "class": "search"
                            }
                        ]
                    },
                    "mstCost": 0,
                    "edgeQueue": [
                        "hg (1)",
                        "ic (2)",
                        "gf (2)",
                        "ab (4)",
                        "cf (4)",
                        "ig (6)",
                        "hi (7)",
                        "cd (7)",
                        "ah (8)",
                        "bc (8)",
                        "de (9)",
                        "fe (10)",
                        "bh (11)",
                        "df (14)"
                    ]
                },
                {
                    "changes": {
                        "h": [
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
                        "hg": [
                            {
                                "add": true,
                                "class": "chosen"
                            }
                        ]
                    },
                    "mstCost": 1,
                    "edgeQueue": [
                        "ic (2)",
                        "gf (2)",
                        "ab (4)",
                        "cf (4)",
                        "ig (6)",
                        "hi (7)",
                        "cd (7)",
                        "ah (8)",
                        "bc (8)",
                        "de (9)",
                        "fe (10)",
                        "bh (11)",
                        "df (14)"
                    ]
                },
                {
                    "changes": {
                        "i": [
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
                        "ic": [
                            {
                                "add": true,
                                "class": "chosen"
                            }
                        ]
                    },
                    "mstCost": 3,
                    "edgeQueue": [
                        "gf (2)",
                        "ab (4)",
                        "cf (4)",
                        "ig (6)",
                        "hi (7)",
                        "cd (7)",
                        "ah (8)",
                        "bc (8)",
                        "de (9)",
                        "fe (10)",
                        "bh (11)",
                        "df (14)"
                    ]
                },
                {
                    "changes": {
                        "f": [
                            {
                                "add": true,
                                "class": "chosen"
                            }
                        ],
                        "gf": [
                            {
                                "add": true,
                                "class": "chosen"
                            }
                        ]
                    },
                    "mstCost": 5,
                    "edgeQueue": [
                        "ab (4)",
                        "cf (4)",
                        "ig (6)",
                        "hi (7)",
                        "cd (7)",
                        "ah (8)",
                        "bc (8)",
                        "de (9)",
                        "fe (10)",
                        "bh (11)",
                        "df (14)"
                    ]
                },
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
                        "ab": [
                            {
                                "add": true,
                                "class": "chosen"
                            }
                        ]
                    },
                    "mstCost": 9,
                    "edgeQueue": [
                        "cf (4)",
                        "ig (6)",
                        "hi (7)",
                        "cd (7)",
                        "ah (8)",
                        "bc (8)",
                        "de (9)",
                        "fe (10)",
                        "bh (11)",
                        "df (14)"
                    ]
                },
                {
                    "changes": {
                        "cf": [
                            {
                                "add": true,
                                "class": "chosen"
                            }
                        ]
                    },
                    "mstCost": 13,
                    "edgeQueue": [
                        "ig (6)",
                        "hi (7)",
                        "cd (7)",
                        "ah (8)",
                        "bc (8)",
                        "de (9)",
                        "fe (10)",
                        "bh (11)",
                        "df (14)"
                    ]
                },
                {
                    "changes": {
                        "ig": [
                            {
                                "add": true,
                                "class": "rejected"
                            },
                            {
                                "add": false,
                                "class": "search"
                            }
                        ]
                    },
                    "mstCost": 13,
                    "edgeQueue": [
                        "hi (7)",
                        "cd (7)",
                        "ah (8)",
                        "bc (8)",
                        "de (9)",
                        "fe (10)",
                        "bh (11)",
                        "df (14)"
                    ]
                },
                {
                    "changes": {
                        "hi": [
                            {
                                "add": true,
                                "class": "rejected"
                            },
                            {
                                "add": false,
                                "class": "search"
                            }
                        ]
                    },
                    "mstCost": 13,
                    "edgeQueue": [
                        "cd (7)",
                        "ah (8)",
                        "bc (8)",
                        "de (9)",
                        "fe (10)",
                        "bh (11)",
                        "df (14)"
                    ]
                },
                {
                    "changes": {
                        "d": [
                            {
                                "add": true,
                                "class": "chosen"
                            }
                        ],
                        "cd": [
                            {
                                "add": true,
                                "class": "chosen"
                            }
                        ]
                    },
                    "mstCost": 20,
                    "edgeQueue": [
                        "ah (8)",
                        "bc (8)",
                        "de (9)",
                        "fe (10)",
                        "bh (11)",
                        "df (14)"
                    ]
                },
                {
                    "changes": {
                        "ah": [
                            {
                                "add": true,
                                "class": "chosen"
                            }
                        ]
                    },
                    "mstCost": 28,
                    "edgeQueue": [
                        "bc (8)",
                        "de (9)",
                        "fe (10)",
                        "bh (11)",
                        "df (14)"
                    ]
                },
                {
                    "changes": {
                        "bc": [
                            {
                                "add": true,
                                "class": "rejected"
                            },
                            {
                                "add": false,
                                "class": "search"
                            }
                        ]
                    },
                    "mstCost": 28,
                    "edgeQueue": [
                        "de (9)",
                        "fe (10)",
                        "bh (11)",
                        "df (14)"
                    ]
                },
                {
                    "changes": {
                        "e": [
                            {
                                "add": true,
                                "class": "chosen"
                            }
                        ],
                        "de": [
                            {
                                "add": true,
                                "class": "chosen"
                            }
                        ]
                    },
                    "mstCost": 37,
                    "edgeQueue": [
                        "fe (10)",
                        "bh (11)",
                        "df (14)"
                    ]
                }
            ],
            true
        ]

        const result = kruskalsAlgorithm(cy3, true);
        expect(result).toEqual(expectedResult);
    });
});

describe('Boruvkas tests:', () => {
    test('Boruvkas, cy1 (1 node)', () => {
        const expectedResult = [
            [
                {
                    mstCost: 0,
                    edgeQueue: [
                        ['a']
                    ],
                    changes: {}
                }
            ],
            true
        ]

        const result = newBoruvkasAlgorithm(cy1, true);
        expect(result).toEqual(expectedResult);
    });

    test('Boruvkas, cy2 (2 nodes, 1 edge)', () => {
        const expectedResult = [
            [
                {
                    "changes": {},
                    "mstCost": 0,
                    "edgeQueue": [
                        [
                            "a"
                        ],
                        [
                            "b"
                        ]
                    ]
                },
                {
                    "changes": {
                        "a": [
                            {
                                "add": true,
                                "class": "outlined"
                            },
                            {
                                "add": true,
                                "class": "0"
                            }
                        ],
                        "ab": [
                            {
                                "add": true,
                                "class": "0"
                            }
                        ],
                        "b": [
                            {
                                "add": true,
                                "class": "0"
                            }
                        ]
                    },
                    "mstCost": 2,
                    "edgeQueue": [
                        [
                            "a",
                            "b"
                        ]
                    ]
                }
            ],
            true
        ]

        const result = newBoruvkasAlgorithm(cy2, true);
        expect(result).toEqual(expectedResult);
    });

    test('Boruvkas, cy3 (9 nodes, 14 edges)', () => {
        const expectedResult = [
            [
                {
                    "changes": {},
                    "mstCost": 0,
                    "edgeQueue": [
                        [
                            "a"
                        ],
                        [
                            "b"
                        ],
                        [
                            "c"
                        ],
                        [
                            "d"
                        ],
                        [
                            "e"
                        ],
                        [
                            "f"
                        ],
                        [
                            "g"
                        ],
                        [
                            "h"
                        ],
                        [
                            "i"
                        ]
                    ]
                },
                {
                    "changes": {
                        "a": [
                            {
                                "add": true,
                                "class": "outlined"
                            },
                            {
                                "add": true,
                                "class": "0"
                            }
                        ],
                        "ab": [
                            {
                                "add": true,
                                "class": "0"
                            }
                        ],
                        "b": [
                            {
                                "add": true,
                                "class": "0"
                            }
                        ]
                    },
                    "mstCost": 4,
                    "edgeQueue": [
                        [
                            "a",
                            "b"
                        ],
                        [
                            "c"
                        ],
                        [
                            "d"
                        ],
                        [
                            "e"
                        ],
                        [
                            "f"
                        ],
                        [
                            "g"
                        ],
                        [
                            "h"
                        ],
                        [
                            "i"
                        ]
                    ]
                },
                {
                    "changes": {
                        "c": [
                            {
                                "add": true,
                                "class": "outlined"
                            },
                            {
                                "add": true,
                                "class": "1"
                            }
                        ],
                        "i": [
                            {
                                "add": true,
                                "class": "1"
                            }
                        ],
                        "ic": [
                            {
                                "add": true,
                                "class": "1"
                            }
                        ]
                    },
                    "mstCost": 6,
                    "edgeQueue": [
                        [
                            "a",
                            "b"
                        ],
                        [
                            "i",
                            "c"
                        ],
                        [
                            "d"
                        ],
                        [
                            "e"
                        ],
                        [
                            "f"
                        ],
                        [
                            "g"
                        ],
                        [
                            "h"
                        ]
                    ]
                },
                {
                    "changes": {
                        "d": [
                            {
                                "add": true,
                                "class": "outlined"
                            },
                            {
                                "add": true,
                                "class": "1"
                            }
                        ],
                        "cd": [
                            {
                                "add": true,
                                "class": "1"
                            }
                        ]
                    },
                    "mstCost": 13,
                    "edgeQueue": [
                        [
                            "a",
                            "b"
                        ],
                        [
                            "i",
                            "c",
                            "d"
                        ],
                        [
                            "e"
                        ],
                        [
                            "f"
                        ],
                        [
                            "g"
                        ],
                        [
                            "h"
                        ]
                    ]
                },
                {
                    "changes": {
                        "e": [
                            {
                                "add": true,
                                "class": "outlined"
                            },
                            {
                                "add": true,
                                "class": "1"
                            }
                        ],
                        "de": [
                            {
                                "add": true,
                                "class": "1"
                            }
                        ]
                    },
                    "mstCost": 22,
                    "edgeQueue": [
                        [
                            "a",
                            "b"
                        ],
                        [
                            "i",
                            "c",
                            "d",
                            "e"
                        ],
                        [
                            "f"
                        ],
                        [
                            "g"
                        ],
                        [
                            "h"
                        ]
                    ]
                },
                {
                    "changes": {
                        "f": [
                            {
                                "add": true,
                                "class": "outlined"
                            },
                            {
                                "add": true,
                                "class": "2"
                            }
                        ],
                        "g": [
                            {
                                "add": true,
                                "class": "2"
                            }
                        ],
                        "gf": [
                            {
                                "add": true,
                                "class": "2"
                            }
                        ]
                    },
                    "mstCost": 24,
                    "edgeQueue": [
                        [
                            "a",
                            "b"
                        ],
                        [
                            "i",
                            "c",
                            "d",
                            "e"
                        ],
                        [
                            "g",
                            "f"
                        ],
                        [
                            "h"
                        ]
                    ]
                },
                {
                    "changes": {
                        "h": [
                            {
                                "add": true,
                                "class": "outlined"
                            },
                            {
                                "add": true,
                                "class": "2"
                            }
                        ],
                        "hg": [
                            {
                                "add": true,
                                "class": "2"
                            }
                        ]
                    },
                    "mstCost": 25,
                    "edgeQueue": [
                        [
                            "a",
                            "b"
                        ],
                        [
                            "i",
                            "c",
                            "d",
                            "e"
                        ],
                        [
                            "h",
                            "g",
                            "f"
                        ]
                    ]
                },
                {
                    "changes": {
                        "a": [
                            {
                                "add": true,
                                "class": "outlined"
                            },
                            {
                                "add": true,
                                "class": "2"
                            }
                        ],
                        "b": [
                            {
                                "add": true,
                                "class": "outlined"
                            },
                            {
                                "add": true,
                                "class": "2"
                            }
                        ],
                        "ab": [
                            {
                                "add": true,
                                "class": "2"
                            }
                        ],
                        "ah": [
                            {
                                "add": true,
                                "class": "2"
                            }
                        ]
                    },
                    "mstCost": 33,
                    "edgeQueue": [
                        [
                            "a",
                            "b",
                            "h",
                            "g",
                            "f"
                        ],
                        [
                            "i",
                            "c",
                            "d",
                            "e"
                        ]
                    ]
                },
                {
                    "changes": {
                        "i": [
                            {
                                "add": true,
                                "class": "outlined"
                            },
                            {
                                "add": true,
                                "class": "2"
                            }
                        ],
                        "c": [
                            {
                                "add": true,
                                "class": "outlined"
                            },
                            {
                                "add": true,
                                "class": "2"
                            }
                        ],
                        "d": [
                            {
                                "add": true,
                                "class": "outlined"
                            },
                            {
                                "add": true,
                                "class": "2"
                            }
                        ],
                        "e": [
                            {
                                "add": true,
                                "class": "outlined"
                            },
                            {
                                "add": true,
                                "class": "2"
                            }
                        ],
                        "ic": [
                            {
                                "add": true,
                                "class": "2"
                            }
                        ],
                        "cd": [
                            {
                                "add": true,
                                "class": "2"
                            }
                        ],
                        "de": [
                            {
                                "add": true,
                                "class": "2"
                            }
                        ],
                        "cf": [
                            {
                                "add": true,
                                "class": "2"
                            }
                        ]
                    },
                    "mstCost": 37,
                    "edgeQueue": [
                        [
                            "i",
                            "c",
                            "d",
                            "e",
                            "a",
                            "b",
                            "h",
                            "g",
                            "f"
                        ]
                    ]
                }
            ],
            true
        ]

        const result = newBoruvkasAlgorithm(cy3, true);
        expect(result).toEqual(expectedResult);
    });
});

describe('Reverse-Delete tests:', () => {
    
});

describe('Degree-Constrained Prims tests:', () => {

});

describe('Degree-Constrained Kruskals tests:', () => {

});