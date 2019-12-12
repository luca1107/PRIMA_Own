declare namespace L08_FudgeCraft_Collision {
    import ƒ = FudgeCore;
    enum CUBE_TYPE {
        GREEN = "Green",
        RED = "Red",
        BLUE = "Blue",
        YELLOW = "Yellow",
        MAGENTA = "Magenta",
        CYAN = "Cyan",
        GREY = "Grey"
    }
    class Cube extends ƒ.Node {
        private static mesh;
        private static materials;
        constructor(_type: CUBE_TYPE, _position: ƒ.Vector3);
        private static createMaterials;
    }
}
