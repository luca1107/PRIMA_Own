"use strict";
var L06_First3DSteps;
(function (L06_First3DSteps) {
    var f = FudgeCore;
    window.addEventListener("load", hndLoad);
    let viewport;
    let parentAll = new f.Node("ParentAll");
    let parentObjects = new f.Node("ParentObjects");
    let object1;
    let keysPressed = {};
    function hndKeyup(_event) {
        keysPressed[_event.code] = false;
    }
    function hndKeydown(_event) {
        keysPressed[_event.code] = true;
    }
    function checkInput() {
        if (keysPressed[f.KEYBOARD_CODE.S]) {
            parentAll.cmpTransform.local.rotation = new f.Vector3(parentAll.cmpTransform.local.rotation.x, parentAll.cmpTransform.local.rotation.x + .1, parentAll.cmpTransform.local.rotation.z);
        }
        if (keysPressed[f.KEYBOARD_CODE.S]) {
            parentAll.cmpTransform.local.rotateX(.01);
        }
    }
    function hndLoad(_event) {
        const canvas = document.querySelector("canvas");
        f.RenderManager.initialize();
        f.Debug.log(canvas);
        let cmpCamera = new f.ComponentCamera();
        cmpCamera.pivot.translateZ(42);
        create3DScene();
        viewport = new f.Viewport();
        viewport.initialize("Viewport", parentAll, cmpCamera, canvas);
        f.Debug.log(viewport);
        viewport.draw();
        document.addEventListener("keydown", hndKeydown);
        document.addEventListener("keyup", hndKeyup);
        f.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, update);
        f.Loop.start();
    }
    function create3DScene() {
        object1 = createObjects(0);
        object1.addComponent(new f.ComponentTransform());
        object1.cmpTransform.local.rotation = new f.Vector3(15, 0, 20);
        let object2 = createObjects(1);
        object2.addComponent(new f.ComponentTransform());
        object2.cmpTransform.local.translate(new f.Vector3(-1, 0, 0));
        object2.cmpTransform.local.rotation = new f.Vector3(20, -20, 60);
        parentAll.appendChild(object1);
        parentAll.appendChild(object2);
        parentAll.addComponent(new f.ComponentTransform());
        parentAll.cmpTransform.local.translate(new f.Vector3(-1, 0, 0));
    }
    function update(_event) {
        checkInput();
        f.RenderManager.update();
        viewport.draw();
    }
    function createObjects(index) {
        let mtrSolidWhite = new f.Material("SolidWhite", f.ShaderUniColor, new f.CoatColored(f.Color.WHITE));
        let meshCube = new f.MeshCube;
        switch (index) {
            case 0:
                let object_1 = new f.Node("Object_" + index);
                for (let i = 0; i < 5; i++) {
                    let tempNode = new f.Node("" + i);
                    tempNode.addComponent(new f.ComponentMesh(meshCube));
                    tempNode.addComponent(new f.ComponentMaterial(mtrSolidWhite));
                    tempNode.addComponent(new f.ComponentTransform());
                    tempNode.cmpTransform.local.translateX(i);
                    object_1.appendChild(tempNode);
                }
                for (let i = 1; i < 5; i = i + 2) {
                    let tempNode = new f.Node("Side" + i);
                    tempNode.addComponent(new f.ComponentMesh(meshCube));
                    tempNode.addComponent(new f.ComponentMaterial(mtrSolidWhite));
                    tempNode.addComponent(new f.ComponentTransform());
                    tempNode.cmpTransform.local.translateZ(1);
                    tempNode.cmpTransform.local.translateX(i);
                    object_1.appendChild(tempNode);
                }
                return object_1;
                break;
            case 1:
                let object_2 = new f.Node("Object_" + index);
                for (let i = 0; i < 5; i++) {
                    let tempNode = new f.Node("" + i);
                    tempNode.addComponent(new f.ComponentMesh(meshCube));
                    tempNode.addComponent(new f.ComponentMaterial(mtrSolidWhite));
                    tempNode.addComponent(new f.ComponentTransform());
                    tempNode.cmpTransform.local.translateY(i);
                    object_2.appendChild(tempNode);
                }
                for (let i = 1; i < 5; i = i + 2) {
                    let tempNode = new f.Node("Side" + i);
                    tempNode.addComponent(new f.ComponentMesh(meshCube));
                    tempNode.addComponent(new f.ComponentMaterial(mtrSolidWhite));
                    tempNode.addComponent(new f.ComponentTransform());
                    tempNode.cmpTransform.local.translateX(1);
                    tempNode.cmpTransform.local.translateY(i);
                    object_2.appendChild(tempNode);
                }
                return object_2;
                break;
            case 2:
                break;
            case 3:
                break;
        }
        return new f.Node("leer");
    }
})(L06_First3DSteps || (L06_First3DSteps = {}));
//# sourceMappingURL=Main.js.map