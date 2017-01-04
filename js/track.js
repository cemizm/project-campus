/**
 * Created by cem on 21.12.16.
 */

AFRAME.registerComponent('track', {

    schema: {
        gameplay: {type: 'selector', default: 'ar-scene[gameplay]'},
    },

    init: function () {
        this.vector = new THREE.Vector3();
    },


    tick: function (t) {
        var targetEl = this.data.gameplay != null ? this.data.gameplay.components.gameplay.getCurrentTarget() : null;
        if (!targetEl) return;

        var target = targetEl.object3D;
        var arrow = this.el.object3D;

        this.vector.setFromMatrixPosition(target.matrixWorld);
        if (arrow.parent) {
            arrow.parent.updateMatrixWorld();
            arrow.parent.worldToLocal(this.vector);
        }

        arrow.lookAt(this.vector);
    }
});