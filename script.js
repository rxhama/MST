// Loads the initial graphs from initialGraphs.json, if not already loaded
// and saves them to localStorage
async function loadInitialGraphs() {
    if (localStorage.getItem('storedGraphs') == null) {
        const response = await fetch('initialGraphs.json');
        const graphs = await response.json();
        console.log('Graphs loaded from initialGraphs.json');
        localStorage.setItem('storedGraphs', JSON.stringify(graphs));
    }
    else {
        console.log('Graphs already loaded');
    }
}

loadInitialGraphs();