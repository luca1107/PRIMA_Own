"use strict";
var L08_FudgeCraft_Collision;
(function (L08_FudgeCraft_Collision) {
    L08_FudgeCraft_Collision.ƒ = FudgeCore;
    window.addEventListener("load", hndLoad);
    L08_FudgeCraft_Collision.game = new L08_FudgeCraft_Collision.ƒ.Node("FudgeCraft");
    L08_FudgeCraft_Collision.grid = new L08_FudgeCraft_Collision.Grid();
    let control = new L08_FudgeCraft_Collision.Control();
    let viewport;
    let camera;
    let speedCameraRotation = 0.2;
    let speedCameraTranslation = 0.02;
    function hndLoad(_event) {
        const canvas = document.querySelector("canvas");
        L08_FudgeCraft_Collision.ƒ.RenderManager.initialize(true);
        L08_FudgeCraft_Collision.ƒ.Debug.log("Canvas", canvas);
        // enable unlimited mouse-movement (user needs to click on canvas first)
        canvas.addEventListener("click", canvas.requestPointerLock);
        //Set lights
        let cmpLight = new L08_FudgeCraft_Collision.ƒ.ComponentLight(new L08_FudgeCraft_Collision.ƒ.LightDirectional(L08_FudgeCraft_Collision.ƒ.Color.WHITE));
        cmpLight.pivot.lookAt(new L08_FudgeCraft_Collision.ƒ.Vector3(0.5, 1, 0.8));
        L08_FudgeCraft_Collision.game.addComponent(cmpLight);
        let cmpLightAmbient = new L08_FudgeCraft_Collision.ƒ.ComponentLight(new L08_FudgeCraft_Collision.ƒ.LightAmbient(L08_FudgeCraft_Collision.ƒ.Color.DARK_GREY));
        L08_FudgeCraft_Collision.game.addComponent(cmpLightAmbient);
        // setup orbiting camera
        camera = new L08_FudgeCraft_Collision.CameraOrbit(75);
        L08_FudgeCraft_Collision.game.appendChild(camera);
        camera.setRotationX(-20);
        camera.setRotationY(20);
        // setup viewport
        viewport = new L08_FudgeCraft_Collision.ƒ.Viewport();
        viewport.initialize("Viewport", L08_FudgeCraft_Collision.game, camera.cmpCamera, canvas);
        L08_FudgeCraft_Collision.ƒ.Debug.log("Viewport", viewport);
        // setup event handling
        viewport.activatePointerEvent("\u0192pointermove" /* MOVE */, true);
        viewport.activateWheelEvent("\u0192wheel" /* WHEEL */, true);
        viewport.addEventListener("\u0192pointermove" /* MOVE */, hndPointerMove);
        viewport.addEventListener("\u0192wheel" /* WHEEL */, hndWheelMove);
        window.addEventListener("keydown", hndKeyDown);
        // start game
        startRandomFragment();
        L08_FudgeCraft_Collision.game.appendChild(control);
        updateDisplay();
        L08_FudgeCraft_Collision.ƒ.Debug.log("Game", L08_FudgeCraft_Collision.game);
        //test();
    }
    function updateDisplay() {
        viewport.draw();
    }
    function hndPointerMove(_event) {
        // console.log(_event.movementX, _event.movementY);
        camera.rotateY(_event.movementX * speedCameraRotation);
        camera.rotateX(_event.movementY * speedCameraRotation);
        updateDisplay();
    }
    function hndWheelMove(_event) {
        camera.translate(_event.deltaY * speedCameraTranslation);
        updateDisplay();
    }
    function hndKeyDown(_event) {
        if (_event.code == L08_FudgeCraft_Collision.ƒ.KEYBOARD_CODE.SPACE) {
            control.freeze();
            console.log(L08_FudgeCraft_Collision.grid);
            startRandomFragment();
        }
        let transformation = L08_FudgeCraft_Collision.Control.transformations[_event.code];
        if (transformation)
            move(transformation);
        // ƒ.RenderManager.update();
        viewport.draw();
    }
    function move(_transformation) {
        let animationSteps = 10;
        let fullRotation = 90;
        let fullTranslation = 1;
        let move = {
            rotation: _transformation.rotation ? L08_FudgeCraft_Collision.ƒ.Vector3.SCALE(_transformation.rotation, fullRotation) : new L08_FudgeCraft_Collision.ƒ.Vector3(),
            translation: _transformation.translation ? L08_FudgeCraft_Collision.ƒ.Vector3.SCALE(_transformation.translation, fullTranslation) : new L08_FudgeCraft_Collision.ƒ.Vector3()
        };
        let timers = L08_FudgeCraft_Collision.ƒ.Time.game.getTimers();
        if (Object.keys(timers).length > 0)
            return;
        let collisions = control.checkCollisions(move);
        if (collisions.length > 0)
            return;
        move.translation.scale(1 / animationSteps);
        move.rotation.scale(1 / animationSteps);
        L08_FudgeCraft_Collision.ƒ.Time.game.setTimer(10, animationSteps, function () {
            control.move(move);
            // ƒ.RenderManager.update();
            viewport.draw();
        });
    }
    function startRandomFragment() {
        let fragment = L08_FudgeCraft_Collision.Fragment.getRandom();
        control.cmpTransform.local = L08_FudgeCraft_Collision.ƒ.Matrix4x4.IDENTITY;
        control.setFragment(fragment);
    }
    L08_FudgeCraft_Collision.startRandomFragment = startRandomFragment;
})(L08_FudgeCraft_Collision || (L08_FudgeCraft_Collision = {}));
//# sourceMappingURL=Main.js.map