/**
 * Created by cem on 21.12.16.
 */

AFRAME.registerComponent('on-target', {
    visible: false,
    schema: {
        gameplay: {type: 'selector', default: 'ar-scene[gameplay]'},
        visible: {type: 'boolean', default: false}
    },

    update: function () {
        this.visible = this.data.visible;
    },

    tick: function () {
        var isVisible = this.visible;

        if (this.data.gameplay != null) {
            var target = this.data.gameplay.components.gameplay.getCurrentTarget();
            if (target != null && !target.components.target.isEntered())
                isVisible = !this.visible;
        }

        this.el.setAttribute('visible', isVisible);
    }
});