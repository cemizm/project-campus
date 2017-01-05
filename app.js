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
});

arScene.addEventListener('argon-vuforia-dataset-loaded', function (evt) {
    loader.classList.add('loaded');
});
arScene.addEventListener('argon-vuforia-dataset-load-failed', function (evt) {
    statusMsg.innerHTML = "Inhalte konnten nicht geladen werden: " + evt.detail.error.message;
});

arScene.addEventListener('argon-vuforia-not-available', function (evt) {
    loader.classList.add('loaded');
});

function helpbox(show) {
    document.getElementById('help_box').style.display = show ? 'block' : 'none';
    if (!show) getGameplay().start();
}

function close_message() {
    var gameplay = getGameplay();
    gameplay.closeText();
}

function show_message() {
    var gameplay = getGameplay();
    gameplay.showHint();
}

function restart() {
    var gameplay = getGameplay();
    gameplay.restart();
}

function close_question() {
    var gameplay = getGameplay();
    gameplay.showQuestion(false);
}

function restartGame() {
    var gameplay = getGameplay();
    gameplay.showQuestion(true, "<p>Wollen Sie Campus Tour wirklich von vorne beginnen?</p>")
}

helpbox(true);