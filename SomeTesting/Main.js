"use strict";
var SomeTesting;
(function (SomeTesting) {
    var f = FudgeCore;
    var aktlMesh;
    var aktlMesh_2;
    var aktlMesh_3;
    var aktlMat_2;
    var aktlColor_2;
    window.addEventListener("load", hndLoad);
    window.addEventListener("click", startRotation);
    window.addEventListener("click", startTranslation);
    function hndLoad(_event) {
        const canvas = document.querySelector("canvas");
        f.RenderManager.initialize();
        let root = new f.Node("root");
        let node = new f.Node("Quad");
        let mesh = new f.MeshCube();
        let cmpMesh = new f.ComponentMesh(mesh);
        let node_2 = new f.Node("Pyramid");
        let mesh_2 = new f.MeshPyramid();
        let cmpMesh_2 = new f.ComponentMesh(mesh_2);
        cmpMesh_2.pivot.translateX(2);
        let node_3 = new f.Node("Cube");
        let mesh_3 = new f.MeshCube();
        let cmpMesh_3 = new f.ComponentMesh(mesh_3);
        cmpMesh_3.pivot.translateX(2);
        let mtrSolidWhite = new f.Material("SolidWhite", f.ShaderUniColor, new f.CoatColored(f.Color.GREEN));
        let cmpMat = new f.ComponentMaterial(mtrSolidWhite);
        let cmpMat_2 = new f.ComponentMaterial(mtrSolidWhite);
        let cmpMat_3 = new f.ComponentMaterial(mtrSolidWhite);
        let cmpCamera = new f.ComponentCamera();
        cmpCamera.pivot.translate(new f.Vector3(3, 0, 20));
        cmpMesh.pivot.rotateY(45);
        node.addComponent(cmpMesh);
        node.addComponent(cmpMat);
        node_2.addComponent(cmpMesh_2);
        node_2.addComponent(cmpMat_2);
        /*
        node_3.addComponent(cmpMesh_3);
        node_3.addComponent(cmpMat);*/
        root.appendChild(node);
        root.appendChild(node_2);
        //root.appendChild(node_3);
        SomeTesting.viewport = new f.Viewport();
        SomeTesting.viewport.initialize("Viewport", root, cmpCamera, canvas);
        f.Debug.log(SomeTesting.viewport);
        SomeTesting.viewport.draw();
        aktlMesh = cmpMesh;
        aktlMesh_2 = cmpMesh_2;
        aktlMesh_3 = cmpMesh_3;
        aktlMat_2 = cmpMat_2;
        aktlColor_2 = mtrSolidWhite;
    }
    async function startRotation() {
        for (let i = 0; i < 10000; i++) {
            if (i < 100) {
                aktlMesh.pivot.rotateY(5);
                aktlMesh.pivot.rotateX(5);
            }
            if (i < 200 && i > 100) {
                aktlMesh.pivot.rotateY(-5);
                aktlMesh.pivot.rotateZ(5);
            }
            if (i < 300 && i > 40) {
                aktlMesh.pivot.rotateX(5);
                aktlMesh.pivot.rotateZ(-5);
            }
            if (i < 400 && i > 500) {
                aktlMesh.pivot.rotateX(5);
                aktlMesh.pivot.rotateZ(5);
            }
            if (i < 600 && i > 700) {
                aktlMesh.pivot.rotateX(-5);
                aktlMesh.pivot.rotateZ(55);
            }
            if (i < 800 && i > 900) {
                aktlMesh.pivot.rotateY(5);
                aktlMesh.pivot.rotateZ(-5);
            }
            if (i < 1000 && i > 900) {
                aktlMesh.pivot.rotateX(5);
                aktlMesh.pivot.rotateZ(-5);
            }
            SomeTesting.viewport.draw();
            await delay(30);
        }
    }
    async function startTranslation() {
        let plusMinus = 1;
        for (let i = 0; i < 1000; i++) {
            console.log(i % 100);
            if (i % 100 == 0) {
                plusMinus = plusMinus * -1;
            }
            aktlMesh_2.pivot.translateX(-0.1 * plusMinus);
            aktlMat_2.material.setCoat(new f.CoatColored(new f.Color(0, 0, 0, 1)));
            SomeTesting.viewport.draw();
            await delay(20);
        }
    }
    function delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
})(SomeTesting || (SomeTesting = {}));
//# sourceMappingURL=Main.js.map