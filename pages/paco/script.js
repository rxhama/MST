let graphs = localStorage.getItem('storedGraphs');
if (!graphs) {
    alert('Graphs have been deleted.\nPage will be redirected to the home page to reload initial graphs.');
    window.location.href = '../../index.html';
}
graphs = JSON.parse(graphs);

let cy2 = cytoscape({
    container: document.getElementById('cy2')
})
cy2.json(graphs[0].graph);
cy2.fit();

let cy3 = cytoscape({
    container: document.getElementById('cy3')
})
cy3.json(graphs[0].graph);
cy3.fit();

let cy4 = cytoscape({
    container: document.getElementById('cy4')
})
cy4.json(graphs[0].graph);
cy4.fit();

let cy5 = cytoscape({
    container: document.getElementById('cy5')
})
cy5.json(graphs[0].graph);
cy5.fit();