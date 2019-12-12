declare namespace L08_FudgeCraft_Collision {
    import f = FudgeCore;
    interface Transformation {
        translation?: f.Vector3;
        rotation?: f.Vector3;
    }
    interface Transformations {
        [keycode: string]: Transformation;
    }
    interface Collision {
        element: GridElement;
        cube: Cube;
    }
    class Control extends f.Node {
        static transformations: Transformations;
        private fragment;
        constructor();
        static defineControls(): Transformations;
        setFragment(_fragment: Fragment): void;
        move(_transformation: Transformation): void;
        checkCollisions(_transformation: Transformation): Collision[];
        freeze(): void;
    }
}
