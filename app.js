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


var gameplay = {
    distanceEl: document.querySelector("#distance"),
    targets: document.querySelectorAll('.targets'),

    currentTarget: 0,

    init: function () {
        var self = this;
        for (var i = 0; i < this.targets.length; i++) {
            this.targets[i].addEventListener('entered', function (evt) {
                console.log("entered: " + i);
                if (self.currentTarget == i && evt.inside === true)
                    self.targetEntered();
            });
        }
    },

    getCurrentTarget: function () {
        return this.targets[this.currentTarget];
    },

    showDistance: function (distance) {
        var unit = " m"
        if (distance > 1000) {
            distance = distance / 1000;
            unit = " km";
        }
        distance = Math.round(distance);
        this.distanceEl.innerHTML = distance + unit;
    },

    targetEntered: function () {
        this.currentTarget++;
    },
};

gameplay.init();

AFRAME.registerComponent('track', {
    init: function () {
        this.vector = new THREE.Vector3();
    },
    tick: function (t) {
        var self = this;
        var targetEl = gameplay.getCurrentTarget();
        var target = targetEl.object3D;
        var camera = targetEl.sceneEl.camera;
        var arrow = self.el.object3D;

        this.vector.setFromMatrixPosition(target.matrixWorld);
        if (arrow.parent) {
            arrow.parent.updateMatrixWorld();
            arrow.parent.worldToLocal(this.vector);
        }

        arrow.lookAt(this.vector);

        if (camera) {
            var cameraPos = camera.getWorldPosition();
            var targetPos = target.getWorldPosition();
            gameplay.showDistance(targetPos.distanceTo(cameraPos));
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