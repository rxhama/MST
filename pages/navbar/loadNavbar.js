document.addEventListener('DOMContentLoaded', function () {
    fetch(isMainPage ? 'pages/navbar/navbar.html' : '../navbar/navbar.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('navbar-container').innerHTML = data;
            document.getElementById('homeLink').setAttribute('href', isMainPage ? 'index.html' : '../../index.html');
            document.getElementById('sandboxLink').setAttribute('href', isMainPage ? 'pages/sandbox/sandbox.html' : '../sandbox/sandbox.html');
            document.getElementById('pacoSandboxLink').setAttribute('href', isMainPage ? 'pages/pacosandbox/pacosandbox.html' : '../pacosandbox/pacosandbox.html');
            document.getElementById('compareLink').setAttribute('href', isMainPage ? 'pages/compare/compare.html' : '../compare/compare.html');
            document.getElementById('myGraphsLink').setAttribute('href', isMainPage ? 'pages/myGraphs/myGraphs.html' : '../myGraphs/myGraphs.html');

    });
});