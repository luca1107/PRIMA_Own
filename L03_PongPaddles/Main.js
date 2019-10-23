"use strict";
var L03_PongPaddle;
(function (L03_PongPaddle) {
    var ƒ = FudgeCore;
    window.addEventListener("load", hndLoad);
    // tslint:disable-next-line: typedef
    window.addEventListener("keydown", async function (event) {
        if (event.keyCode == 87) {
            console.log("WWWW");
            startW();
            await delay(150);
        }
        if (event.keyCode == 83) {
            startS();
            await delay(150);
        }
        else {
            return;
        }
    }, true);
    let ball = new ƒ.Node("Ball");
    let paddleLeft = new ƒ.Node("PaddleLeft");
    let paddleRight = new ƒ.Node("PaddleRight");
    function hndLoad(_event) {
        const canvas = document.querySelector("canvas");
        ƒ.RenderManager.initialize();
        ƒ.Debug.log(canvas);
        let pong = createPong();
        let cmpCamera = new ƒ.ComponentCamera();
        cmpCamera.pivot.translateZ(42);
        paddleRight.cmpTransform.local.translateX(20);
        paddleLeft.cmpTransform.local.translateX(-20);
        paddleLeft.getComponent(ƒ.ComponentMesh).pivot.scaleY(4);
        paddleRight.getComponent(ƒ.ComponentMesh).pivot.scaleY(4);
        L03_PongPaddle.viewport = new ƒ.Viewport();
        L03_PongPaddle.viewport.initialize("Viewport", pong, cmpCamera, canvas);
        ƒ.Debug.log(L03_PongPaddle.viewport);
        L03_PongPaddle.viewport.draw();
    }
    async function startW() {
        for (let i = 0; i < 7; i++) {
            paddleLeft.getComponent(ƒ.ComponentMesh).pivot.translateY(0.25);
            L03_PongPaddle.viewport.draw();
            await delay(3.5);
        }
    }
    async function startS() {
        for (let i = 0; i < 7; i++) {
            paddleLeft.getComponent(ƒ.ComponentMesh).pivot.translateY(-0.25);
            L03_PongPaddle.viewport.draw();
            await delay(3.5);
        }
    }
    function delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    function createPong() {
        let pong = new ƒ.Node("Pong");
        let mtrSolidWhite = new ƒ.Material("SolidWhite", ƒ.ShaderUniColor, new ƒ.CoatColored(ƒ.Color.WHITE));
        let meshQuad = new ƒ.MeshQuad();
        ball.addComponent(new ƒ.ComponentMesh(meshQuad));
        paddleLeft.addComponent(new ƒ.ComponentMesh(meshQuad));
        paddleRight.addComponent(new ƒ.ComponentMesh(meshQuad));
        ball.addComponent(new ƒ.ComponentMaterial(mtrSolidWhite));
        paddleLeft.addComponent(new ƒ.ComponentMaterial(mtrSolidWhite));
        paddleRight.addComponent(new ƒ.ComponentMaterial(mtrSolidWhite));
        ball.addComponent(new ƒ.ComponentTransform());
        paddleLeft.addComponent(new ƒ.ComponentTransform());
        paddleRight.addComponent(new ƒ.ComponentTransform());
        pong.appendChild(ball);
        pong.appendChild(paddleLeft);
        pong.appendChild(paddleRight);
        return pong;
    }
})(L03_PongPaddle || (L03_PongPaddle = {}));
//# sourceMappingURL=Main.js.map