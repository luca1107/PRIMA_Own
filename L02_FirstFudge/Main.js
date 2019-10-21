"use strict";
var L02_FirstFudge;
(function (L02_FirstFudge) {
    var f = FudgeCore;
    window.addEventListener("load", hndLoad);
    function hndLoad(_event) {
        const canvas = document.querySelector("canvas");
        f.RenderManager.initialize();
        console.log(canvas);
        let node = new f.Node("Quad");
        let mesh = new f.MeshQuad();
        let cmpMesh = new f.ComponentMesh(mesh);
        let mtrSolidWhite = new f.Material("SolidWhite", f.ShaderUniColor, new f.CoatColored(f.Color.GREEN));
        let cmpMat = new f.ComponentMaterial(mtrSolidWhite);
        let cmpCamera = new f.ComponentCamera();
        cmpCamera.pivot.translate(new f.Vector3(0, 0, 3));
        node.addComponent(cmpMesh);
        node.addComponent(cmpMat);
        L02_FirstFudge.viewport = new f.Viewport();
        L02_FirstFudge.viewport.initialize("Viewport", node, cmpCamera, canvas);
        f.Debug.log(L02_FirstFudge.viewport);
        L02_FirstFudge.viewport.draw();
    }
})(L02_FirstFudge || (L02_FirstFudge = {}));
//# sourceMappingURL=Main.js.map