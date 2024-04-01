if (!localStorage.getItem('storedGraphs')) {
    alert('Graphs have been deleted.\nRedirecting to home page to reload initial graphs.');
    window.location.href = '../../index.html';
}

function populateList() {
    const graphList = document.getElementById('graphList');
    graphList.innerHTML = '';

    const graphs = JSON.parse(localStorage.getItem('storedGraphs') || '[]');
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