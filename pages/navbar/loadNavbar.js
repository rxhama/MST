document.addEventListener('DOMContentLoaded', function () {
    fetch(isMainPage ? 'pages/navbar/navbar.html' : '../navbar/navbar.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('navbar-container').innerHTML = data;
            document.getElementById('homeLink').setAttribute('href', isMainPage ? 'index.html' : '../../index.html');
            document.getElementById('sandboxLink').setAttribute('href', isMainPage ? 'pages/sandbox/sandbox.html' : '../sandbox/sandbox.html');
            document.getElementById('createLink').setAttribute('href', isMainPage ? 'pages/createGraph/createGraph.html' : '../createGraph/createGraph.html');

    });
});