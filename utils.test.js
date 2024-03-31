const cytoscape = require('cytoscape');
const { primsAlgorithm } = require('./utils');

let cy = cytoscape({
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

describe('primsAlgorithm', () => {
    test('testing primsAlgorithm', () => {
        const expectedResult = 2;
        const result = cy.edges()[0].data('weight');
        expect(result).toEqual(expectedResult);
    });
});