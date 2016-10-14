AFRAME.registerComponent('showdistance', {
    schema: {
        default: ""
    },
    init: function () {
        this.text = "";
    },
    update: function () {
        this.text = this.data;
    },
    tick: function (t) {
        var object3D = this.el.object3D;
        var camera = this.el.sceneEl.camera;
        if (!camera) {return;}
        var cameraPos = camera.getWorldPosition();
        var thisPos = object3D.getWorldPosition();
        var distance = Math.round(thisPos.distanceTo(cameraPos));
        var cssDiv = this.el.getObject3D('div');
        var msg = this.text + distance + " meters away";
        cssDiv.elements[0].innerHTML = msg;
        cssDiv.elements[1].innerHTML = msg;
    }
});