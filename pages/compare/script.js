// import { AlgoController, primsAlgorithm, kruskalsAlgorithm, boruvkasAlgorithm, reverseDeleteAlgorithm, degreeConstrainedPrims, degreeConstrainedKruskals, newBoruvkasAlgorithm, pacoAlgorithm } from '../../utils.js';

let graphs = localStorage.getItem('storedGraphs');
if (!graphs) {
    alert('Graphs have been deleted.\nPage will be redirected to the home page to reload initial graphs.');
    window.location.href = '../../index.html';
}
graphs = JSON.parse(graphs);