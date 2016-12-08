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
var distanceEl = document.querySelector("#distance");
var currentTarget = 0;

var targets = [];
targets[0] = document.querySelector('#start');

AFRAME.registerComponent('track', {
    init: function () {
        this.vector = new THREE.Vector3();
    },
    tick: function (t) {
        var self = this;

        var target = targets[currentTarget].object3D;
        var camera = targets[currentTarget].sceneEl.camera;
        var arrow = self.el.object3D;

        this.vector.setFromMatrixPosition(target.matrixWorld);
        if (arrow.parent) {
            arrow.parent.updateMatrixWorld();
            arrow.parent.worldToLocal(this.vector);
        }
        arrow.lookAt(this.vector);

        if(camera) {
            var cameraPos = camera.getWorldPosition();
            var targetPos = target.getWorldPosition();
            var distance = Math.round(targetPos.distanceTo(cameraPos));
            distanceEl.innerHTML = distance + " m"
        }
    }
});

AFRAME.registerComponent('useraltitutde', {
    tick: function (t) {
        var self = this;

        var target = self.el.object3D;
        var camera = self.el.sceneEl.camera;

        target.position.setY(camera.position.y);
    }
});