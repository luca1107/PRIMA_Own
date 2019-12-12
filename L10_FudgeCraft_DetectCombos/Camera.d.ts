declare namespace L08_FudgeCraft_Collision {
    import f = FudgeCore;
    class CameraOrbit extends f.Node {
        maxRotX: number;
        minDistance: number;
        constructor(_maxRotX: number);
        readonly cmpCamera: f.ComponentCamera;
        readonly rotatorX: f.Node;
        setDistance(_distance: number): void;
        moveDistance(_delta: number): void;
        setRotationY(_angle: number): void;
        setRotationX(_angle: number): void;
        rotateY(_delta: number): void;
        rotateX(_delta: number): void;
        translate(_delta: number): void;
    }
}
