declare namespace L07_FudgeCraft_Fragments {
    import f = FudgeCore;
    enum CUBE_TYPE {
        GREEN = "Green",
        RED = "Red",
        BLUE = "Blue",
        YELLOW = "Yellow",
        MAGENTA = "Magenta",
        CYAN = "Cyan"
    }
    class Cube extends f.Node {
        private static mesh;
        private static materials;
        constructor(_type: CUBE_TYPE, _position: f.Vector3);
        private static createMaterials;
    }
}
