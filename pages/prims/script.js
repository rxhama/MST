let graphs = localStorag.getItem('graphs');
if (!graphs) {
    alert('No graphs found. Redirecting to home page to reload initial graphs.');
    window.location.href = '../../../../index.html';
}