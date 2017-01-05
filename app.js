var arScene = document.querySelector('ar-scene');
var statusMsg = document.querySelector('#status');
var loader = document.querySelector('#loader-wrapper');

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
}

function close_message() {
    var scene = document.getElementsByTagName("ar-scene");

    scene = scene.length > 0 ? scene[0] : null;
    var gameplay = scene.components.gameplay;

    gameplay.closeText();
}

helpbox(true);