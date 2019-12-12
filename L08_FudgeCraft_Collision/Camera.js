"use strict";
var L08_FudgeCraft_Collision;
(function (L08_FudgeCraft_Collision) {
    var f = FudgeCore;
    class CameraOrbit extends f.Node {
        constructor(_maxRotX) {
            super("CameraOrbit");
            this.maxRotX = 75;
            this.minDistance = 1;
            this.maxRotX = Math.min(_maxRotX, 89);
            let cmpTransform = new f.ComponentTransform();
            this.addComponent(cmpTransform);
            let rotatorX = new f.Node("CameraRotX");
            rotatorX.addComponent(new f.ComponentTransform());
            this.appendChild(rotatorX);
            let cmpCamera = new L08_FudgeCraft_Collision.ƒ.ComponentCamera();
            cmpCamera.backgroundColor = L08_FudgeCraft_Collision.ƒ.Color.WHITE;
            rotatorX.addComponent(cmpCamera);
            this.setDistance(10);
        }
        get cmpCamera() {
            return this.rotatorX.getComponent(f.ComponentCamera);
        }
        get rotatorX() {
            return this.getChildrenByName("CameraRotX")[0];
        }
        setDistance(_distance) {
            let tempDistance = Math.max(this.minDistance, _distance);
            this.cmpCamera.pivot.translation = new f.Vector3(0, 0, tempDistance);
        }
        moveDistance(_delta) {
            this.setDistance(this.cmpCamera.pivot.translation.z + _delta);
        }
        setRotationY(_angle) {
            this.cmpTransform.local.rotation = f.Vector3.Y(_angle);
        }
        setRotationX(_angle) {
            _angle = Math.min(Math.max(-this.maxRotX, _angle), this.maxRotX);
            this.rotatorX.cmpTransform.local.rotation = f.Vector3.X(_angle);
        }
        rotateY(_delta) {
            this.cmpTransform.local.rotateY(_delta);
        }
        rotateX(_delta) {
            let angle = this.rotatorX.cmpTransform.local.rotation.x + _delta;
            this.setRotationX(angle);
        }
        translate(_delta) {
            let distance = this.cmpCamera.pivot.translation.z + _delta;
            this.setDistance(distance);
        }
    }
    L08_FudgeCraft_Collision.CameraOrbit = CameraOrbit;
})(L08_FudgeCraft_Collision || (L08_FudgeCraft_Collision = {}));
//# sourceMappingURL=Camera.js.map