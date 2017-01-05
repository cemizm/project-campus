/**
 * Created by cem on 21.12.16.
 */

AFRAME.registerComponent('gameplay', {
    target: null,
    entered: false,
    schema: {
        targets: {type: 'selectorAll'},
        distance: {type: 'selector'},
        credits: {type: 'selector'},
        message: {type: 'selector'},
    },

    init: function () {
        this.currentTarget = 0;
        this.run = false;
    },

    tick: function (t) {
        if (!this.target) return;

        var tarComp = this.target.components.target;

        var distance = tarComp.getDistance();

        this.showDistance(tarComp.isEntered() ? 0 : distance);
        this.showCredits();

        if (!this.entered && tarComp.isEntered()) {
            this.showText(true, tarComp.getMessage());
        }
    },

    getCurrentTarget: function () {
        return this.target;
    },

    update: function () {
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

    updateTarget: function () {
        this.setTarget(this.run ? this.data.targets[this.currentTarget] : null);
    },

    setTarget: function (target) {
        if (target == this.target) return;

        this.showText(false, null);
        this.target = target;

        if (this.data.message)
            this.data.message.innerHTML = this.target != null ? this.target.components.target.getMessage() : "";
    },

    showDistance: function (distance) {
        if (!this.data.distance) return;

        var unit = " m";
        if (distance > 1000) {
            distance = distance / 1000;
            unit = " km";
        }

        distance = Math.round(distance);

        this.data.distance.innerHTML = distance + unit;
    },

    showCredits: function () {
        if (!this.data.credits) return;

        var text = this.currentTarget + " / " + this.data.targets.length;

        this.data.credits.innerHTML = text;
    },

    isIntro: function() {
        return this.currentTarget == 0;
    },

    showHint: function () {
        if (!this.target) return;

        var tarComp = this.target.components.target;
        if (!tarComp || !tarComp.isEntered()) return;

        this.showText(true, tarComp.getMessage());
    },

    showText: function (entered, text) {
        this.entered = entered;

        if (!text) text = "Sie haben das nächste Puzzlestück erreicht. ";

        this.data.message.innerHTML = entered ? text : "";
        this.data.message.style.display = this.entered ? 'block' : 'none';
    },

    closeText: function () {
        this.data.message.style.display = 'none';
    }
});
