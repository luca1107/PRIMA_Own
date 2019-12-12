namespace L10_FudgeCraft_Combos {
    import f = FudgeCore;

    export interface Transformation {
        translation?: f.Vector3;
        rotation?: f.Vector3;
    }

    export interface Transformations {
        [keycode: string]: Transformation;
    }

    export interface Collision {
        element: GridElement;
        cube: Cube;
    }

    export class Control extends f.Node {
        public static transformations: Transformations = Control.defineControls();
        private fragment: Fragment;

        constructor() {
            super("Control");
            this.addComponent(new f.ComponentTransform());
        }

        public static defineControls(): Transformations {
            let controls: Transformations = {};
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

        public setFragment(_fragment: Fragment): void {
            for (let child of this.getChildren())
                this.removeChild(child);
            this.appendChild(_fragment);
            this.fragment = _fragment;
        }

        public move(_transformation: Transformation): void {
            let mtxContainer: f.Matrix4x4 = this.cmpTransform.local;
            let mtxFragment: f.Matrix4x4 = this.fragment.cmpTransform.local;
            mtxFragment.rotate(_transformation.rotation, true);
            mtxContainer.translate(_transformation.translation);
        }

        public checkCollisions(_transformation: Transformation): Collision[] {
            let mtxContainer: f.Matrix4x4 = this.cmpTransform.local;
            let mtxFragment: f.Matrix4x4 = this.fragment.cmpTransform.local;
            let save: f.Mutator[] = [mtxContainer.getMutator(), mtxFragment.getMutator()];
            mtxFragment.rotate(_transformation.rotation, true);
            mtxContainer.translate(_transformation.translation);

            f.RenderManager.update();

            let collisions: Collision[] = [];
            for (let cube of this.fragment.getChildren()) {
                let element: GridElement = grid.pull(cube.mtxWorld.translation);
                if (element)
                    collisions.push({ element, cube });
            }

            mtxContainer.mutate(save[0]);
            mtxFragment.mutate(save[1]);

            return collisions;
        }

        public freeze(): void {
            for (let cube of this.fragment.getChildren()) {
                let position: f.Vector3 = cube.mtxWorld.translation;
                cube.cmpTransform.local.translation = position;
                grid.push(position, new GridElement(cube));
            }
        }
    }
}
