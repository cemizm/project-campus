/**
 * Created by cem on 21.12.16.
 */

AFRAME.registerComponent('gameplay', {
    target:  null,
    schema: {
        targets: {type: 'selectorAll'},
        textbox: {type: 'selector'},
        message: {type: 'selector'},
    },

    init: function () {
        this.currentTarget = 0;
        this.run = false;
    },

    tick: function (t) {
        if(!this.target) return;

        var distance = this.target.components.target.getDistance();

        this.showDistance(distance);
    },

    getCurrentTarget: function () {
        return this.target;
    },

    update: function() {
        this.updateTarget();
    },

    pause: function () {
        this.run = false;

        this.updateTarget();
    },

    play: function () {
        this.run = true;

        this.updateTarget();
    },

    updateTarget: function() {
        this.setTarget(this.run ? this.data.targets[this.currentTarget] : null);
    },

    setTarget: function(target){
        if(target == this.target) return;

        this.target = target;

        if(this.data.message)
            this.data.message.innerHTML = this.target != null ? this.target.components.target.getMessage() : "";
    },

    showDistance: function (distance) {
        if (!this.data.textbox) return;

        var unit = " m";
        if (distance > 1000) {
            distance = distance / 1000;
            unit = " km";
        }

        distance = Math.round(distance);

        this.data.textbox.innerHTML = distance + unit;
    },
});
