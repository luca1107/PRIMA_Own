"use strict";
var L08_FudgeCraft_Collision;
(function (L08_FudgeCraft_Collision) {
    var f = FudgeCore;
    class Control extends f.Node {
        constructor() {
            super("Control");
            this.addComponent(new f.ComponentTransform());
        }
        static defineControls() {
            let controls = {};
            controls[f.KEYBOARD_CODE.ARROW_UP] = { rotation: f.Vector3.X(-1) };
            controls[f.KEYBOARD_CODE.ARROW_DOWN] = { rotation: f.Vector3.X(1) };
            controls[f.KEYBOARD_CODE.ARROW_LEFT] = { rotation: f.Vector3.Y(-1) };
            controls[f.KEYBOARD_CODE.ARROW_RIGHT] = { rotation: f.Vector3.Y(1) };
            controls[f.KEYBOARD_CODE.W] = { translation: f.Vector3.Z(-1) };
            controls[f.KEYBOARD_CODE.S] = { translation: f.Vector3.Z(1) };
            controls[f.KEYBOARD_CODE.A] = { translation: f.Vector3.X(-1) };
            controls[f.KEYBOARD_CODE.D] = { translation: f.Vector3.X(1) };
            controls[f.KEYBOARD_CODE.SHIFT_LEFT] = controls[f.KEYBOARD_CODE.SHIFT_RIGHT] = { translation: f.Vector3.Y(1) };
            controls[f.KEYBOARD_CODE.CTRL_LEFT] = controls[f.KEYBOARD_CODE.CTRL_RIGHT] = { translation: f.Vector3.Y(-1) };
            return controls;
        }
        setFragment(_fragment) {
            for (let child of this.getChildren())
                this.removeChild(child);
            this.appendChild(_fragment);
            this.fragment = _fragment;
        }
        move(_transformation) {
            let mtxContainer = this.cmpTransform.local;
            let mtxFragment = this.fragment.cmpTransform.local;
            mtxFragment.rotate(_transformation.rotation, true);
            mtxContainer.translate(_transformation.translation);
        }
        checkCollisions(_transformation) {
            let mtxContainer = this.cmpTransform.local;
            let mtxFragment = this.fragment.cmpTransform.local;
            let save = [mtxContainer.getMutator(), mtxFragment.getMutator()];
            mtxFragment.rotate(_transformation.rotation, true);
            mtxContainer.translate(_transformation.translation);
            f.RenderManager.update();
            let collisions = [];
            for (let cube of this.fragment.getChildren()) {
                let element = L08_FudgeCraft_Collision.grid.pull(cube.mtxWorld.translation);
                if (element)
                    collisions.push({ element, cube });
            }
            mtxContainer.mutate(save[0]);
            mtxFragment.mutate(save[1]);
            return collisions;
        }
        freeze() {
            for (let cube of this.fragment.getChildren()) {
                let position = cube.mtxWorld.translation;
                cube.cmpTransform.local.translation = position;
                L08_FudgeCraft_Collision.grid.push(position, new L08_FudgeCraft_Collision.GridElement(cube));
            }
        }
    }
    Control.transformations = Control.defineControls();
    L08_FudgeCraft_Collision.Control = Control;
})(L08_FudgeCraft_Collision || (L08_FudgeCraft_Collision = {}));
//# sourceMappingURL=Control.js.map