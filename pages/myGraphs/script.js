let graphs = localStorage.getItem('storedGraphs');
if (!graphs) {
    alert('Graphs have been deleted.\nRedirecting to home page to reload initial graphs.');
    window.location.href = '../../index.html';
}
graphs = JSON.parse(graphs);

function populateList() {
    const graphList = document.getElementById('graphList');
    graphList.innerHTML = '';

    const list = document.createElement('ul');

    for (let i = 0; i < graphs.length; i++) {
        const item = document.createElement('li');
        item.innerText = graphs[i].name;
        if (!graphs[i].default) {
            const editBtn = document.createElement('button');
            editBtn.innerText = 'Edit';
            editBtn.addEventListener('click', () => {
                sessionStorage.setItem('editGraph', i);
                window.location.href = '../createGraph/createGraph.html';
            });
            
            const deleteBtn = document.createElement('button');
            deleteBtn.innerText = 'Delete';
            deleteBtn.addEventListener('click', () => {
                graphs.splice(i, 1);
                localStorage.setItem('storedGraphs', JSON.stringify(graphs));
                populateList();
            });

            item.appendChild(editBtn);
            item.appendChild(deleteBtn);
        }
        list.appendChild(item);
    }
    graphList.appendChild(list);
}

populateList();

function createGraph() {
    if (graphs.length >= 20) {
        alert('A maximum of 20 graphs can be created.\nPlease delete some graphs to create new ones.');
        return;
    }
    window.location.href = '../createGraph/createGraph.html'
}