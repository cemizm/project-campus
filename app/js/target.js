/**
 * Created by cem on 21.12.16.
 */

AFRAME.registerComponent('target', {
    schema: {
        text: {type: 'string'},
        distance: {type: 'number', default: 3}
    },

    tick: function () {

        this.setUserAltitude();

        this.el.setAttribute('visible', this.isEntered());
    },

    getDistance: function() {
        var target = this.el.object3D;
        var camera = this.el.sceneEl.camera;

        if (!target || !camera) return 0;

        var cameraPos = camera.getWorldPosition();
        var targetPos = target.getWorldPosition();

        return targetPos.distanceTo(cameraPos);
    },

    isEntered: function() {
        return this.getDistance() < this.data.distance;
    },

    getMessage: function() {
        return this.data.text;
    },

    setUserAltitude: function() {
        var target = this.el.object3D;
        var camera = this.el.sceneEl.camera;

        if (!target || !camera) return;

        target.position.setY(camera.position.y);
    }
});