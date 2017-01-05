var arScene = document.querySelector('ar-scene');
var statusMsg = document.querySelector('#status');
var loader = document.querySelector('#loader-wrapper');


function getGameplay() {
    return arScene ? arScene.components.gameplay : null;
}

arScene.addEventListener('argon-initialized', function (evt) {
    statusMsg.innerHTML = "Initialisierung...";
});
arScene.addEventListener('argon-vuforia-initialized', function (evt) {
    statusMsg.innerHTML = "Lade Inhalte...";
});
arScene.addEventListener('argon-vuforia-initialization-failed', function (evt) {
    statusMsg.innerHTML = "Fehler bei Initialisierung: " + evt.detail.error.message;
    getGameplay().run();
});

arScene.addEventListener('argon-vuforia-dataset-loaded', function (evt) {
    loader.classList.add('loaded');
    getGameplay().run();
});
arScene.addEventListener('argon-vuforia-dataset-load-failed', function (evt) {
    statusMsg.innerHTML = "Inhalte konnten nicht geladen werden: " + evt.detail.error.message;
    getGameplay().run();
});

arScene.addEventListener('argon-vuforia-not-available', function (evt) {
    loader.classList.add('loaded');
    getGameplay().run();
});

function helpbox(show) {
    document.getElementById('help_box').style.display = show ? 'block' : 'none';
}

function close_message() {
    var gameplay = getGameplay();
    gameplay.closeText();
}

function show_message() {
    var gameplay = getGameplay();
    gameplay.showTest(true, "asda asdasd asd");
}

function restartGame() {
    var gameplay = getGameplay();
    gameplay.restart();
}

helpbox(true);