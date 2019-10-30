namespace L05_PongReflection {


    interface KeyPressed {
        [code: string]: boolean;  // Keycode vom Typ String : Boolean = true/false --> Gedrückt oder nicht 
    }
    import f = FudgeCore;
    let keysPressed: KeyPressed = {};

    window.addEventListener("load", hndLoad);
    // tslint:disable-next-line: typedef

    let viewport: f.Viewport;

    let ball: f.Node = new f.Node("Ball");
    let paddleLeft: f.Node = new f.Node("PaddleLeft");
    let paddleRight: f.Node = new f.Node("PaddleRight");

    let topPos: f.Node = new f.Node("topPos");
    let bottomPos: f.Node = new f.Node("bottomPos");
    let rightWall: f.Node = new f.Node("rightWall");
    let leftWall: f.Node = new f.Node("leftWall");

    let velX: number;
    let velY: number;
    let randZ: number;

    let isHittingRight: boolean = false;
    let isHittingLeft: boolean = false;
    let isHittingTop: boolean = false;
    let isHittingBottom: boolean = false;


    function hndLoad(_event: Event): void {
        const canvas: HTMLCanvasElement = document.querySelector("canvas");
        f.RenderManager.initialize();
        f.Debug.log(canvas);

        let pong: f.Node = createPong();
        setUpBall();

        let cmpCamera: f.ComponentCamera = new f.ComponentCamera();
        cmpCamera.pivot.translateZ(42);


        paddleRight.cmpTransform.local.translateX(20);
        paddleLeft.cmpTransform.local.translateX(-20);
        paddleLeft.getComponent(f.ComponentMesh).pivot.scaleY(4);
        paddleRight.getComponent(f.ComponentMesh).pivot.scaleY(4);

        bottomPos.getComponent(f.ComponentMesh).pivot.scaleX(45);
        bottomPos.cmpTransform.local.translateY(-14);

        topPos.getComponent(f.ComponentMesh).pivot.scaleX(45);
        topPos.cmpTransform.local.translateY(14);

        rightWall.getComponent(f.ComponentMesh).pivot.scaleY(27);
        rightWall.cmpTransform.local.translateX(21);

        leftWall.getComponent(f.ComponentMesh).pivot.scaleY(27);
        leftWall.cmpTransform.local.translateX(-21);

        viewport = new f.Viewport();
        viewport.initialize("Viewport", pong, cmpCamera, canvas);
        f.Debug.log(viewport);

        document.addEventListener("keydown", hndKeydown);
        document.addEventListener("keyup", hndKeyup);

        viewport.draw();

        f.Loop.addEventListener(f.EVENT.LOOP_FRAME, update);
        f.Loop.start();
    }

    function setUpBall(): void {
        velX = plusMinus() * Math.random() / 5;
        velY = plusMinus() * Math.random() / 5;
        //randZ = plusMinus() * Math.random() / 10;

    }

    function plusMinus(): number {
        return Math.random() < 0.5 ? -1 : 1;
    }

    function checkBallPos(pos: f.Vector3, wall: f.Node): boolean {

        let posX: number = wall.cmpTransform.local.translation.x;
        let scaleX: number = wall.getComponent(f.ComponentMesh).pivot.scaling.x / 2;

        let PosY: number = wall.cmpTransform.local.translation.y;
        let scaleY: number = wall.getComponent(f.ComponentMesh).pivot.scaling.y / 2;

        let topLeft: f.Vector3 = new f.Vector3(posX - scaleX, PosY + scaleY);
        let bottomRight: f.Vector3 = new f.Vector3(posX + scaleX, PosY - scaleY);

        console.log(isHittingRight);
        /*
                console.log(pos.x);
                console.log(pos.y);*/

        switch (wall.name) {
            case "rightWall":
               /* if (pos.x > topLeft.x && !isHittingRight) { //Checking  Right
                    isHittingRight = true;
                    velX = -velX;
                }*/



                if (pos.y > topLeft.y && !isHittingTop) {
                    velY = -velY;
                    isHittingTop = true;
                    isHittingRight = false;
                    isHittingLeft = false;
                    isHittingBottom = false;
                }

                if (pos.y < bottomRight.y && !isHittingBottom) {
                    velY = -velY;
                    isHittingBottom = true;
                    isHittingRight = false;
                    isHittingLeft = false;
                    isHittingTop = false;
                }




                break;
            case "leftWall":
                /*if (pos.x < bottomRight.x && !isHittingLeft) { //Checking Left
                    isHittingLeft = true;
                    velX = -velX;
                }*/

                break;

            case "PaddleLeft":
                if (pos.x < bottomRight.x && pos.y < topLeft.y && pos.y > bottomRight.y && !isHittingLeft) { //Checking Left
                    isHittingLeft = true;
                    velX = -velX;
                }

                break;

            case "PaddleRight":
                if (pos.x > topLeft.x && pos.y < topLeft.y && pos.y > bottomRight.y && !isHittingRight) { //Checking Left
                    isHittingRight = true;
                    velX = -velX;
                }

                break;
        }
        return true;
    }


    function update(_event: Event): void {

        let lockLeftUP: boolean = false;
        let lockLeftDOWN: boolean = false;
        let lockRightUP: boolean = false;
        let lockRightDOWN: boolean = false;

        let ballPos: f.Vector3 = ball.cmpTransform.local.translation;

        //console.log(keysPressed);

        ball.cmpTransform.local.translate(new f.Vector3(velX, velY, 0));

        console.log("velX :" + velX);

        //console.log(paddleLeft.cmpTransform.local.translation.y);

        checkBallPos(ballPos, rightWall);
        checkBallPos(ballPos, leftWall);
        checkBallPos(ballPos, paddleLeft);
        checkBallPos(ballPos, paddleRight);

        /*if (ball.cmpTransform.local.translation.x > 21 || ball.cmpTransform.local.translation.x < -21) {
            velX = -velX;
        }

        if (ball.cmpTransform.local.translation.y > 14 || ball.cmpTransform.local.translation.y < -14) {
            velY = -velY;
        }*/



        if (paddleLeft.cmpTransform.local.translation.y > 12.6) {
            lockLeftUP = true;
        }

        else {
            lockLeftUP = false;
        }

        if (paddleLeft.cmpTransform.local.translation.y < -12.6) {
            lockLeftDOWN = true;
        }

        else {
            lockLeftDOWN = false;
        }

        if (paddleRight.cmpTransform.local.translation.y > 12.6) {
            lockRightUP = true;
        }

        else {
            lockRightUP = false;
        }

        if (paddleRight.cmpTransform.local.translation.y < -12.6) {
            lockRightDOWN = true;
        }

        else {
            lockRightDOWN = false;
        }






        if (keysPressed[f.KEYBOARD_CODE.ARROW_UP] && !lockRightUP)
            paddleRight.cmpTransform.local.translate(new f.Vector3(0, 0.3, 0));
        if (keysPressed[f.KEYBOARD_CODE.ARROW_DOWN] && !lockRightDOWN)
            paddleRight.cmpTransform.local.translate(f.Vector3.Y(-0.3));
        if (keysPressed[f.KEYBOARD_CODE.W] && !lockLeftUP)
            paddleLeft.cmpTransform.local.translate(new f.Vector3(0, 0.3, 0));
        if (keysPressed[f.KEYBOARD_CODE.S] && !lockLeftDOWN)
            paddleLeft.cmpTransform.local.translate(f.Vector3.Y(-0.3));

        f.RenderManager.update();
        viewport.draw();
    }

    function hndKeyup(_event: KeyboardEvent): void {
        keysPressed[_event.code] = false;
    }
    function hndKeydown(_event: KeyboardEvent): void {
        keysPressed[_event.code] = true;
    }



    function createPong(): f.Node {
        let pong: f.Node = new f.Node("Pong");

        let mtrSolidWhite: f.Material = new f.Material("SolidWhite", f.ShaderUniColor, new f.CoatColored(f.Color.WHITE));
        let meshQuad: f.MeshQuad = new f.MeshQuad();

        ball.addComponent(new f.ComponentMesh(meshQuad));
        paddleLeft.addComponent(new f.ComponentMesh(meshQuad));
        paddleRight.addComponent(new f.ComponentMesh(meshQuad));
        topPos.addComponent(new f.ComponentMesh(meshQuad));
        bottomPos.addComponent(new f.ComponentMesh(meshQuad));
        rightWall.addComponent(new f.ComponentMesh(meshQuad));
        leftWall.addComponent(new f.ComponentMesh(meshQuad));


        ball.addComponent(new f.ComponentMaterial(mtrSolidWhite));
        paddleLeft.addComponent(new f.ComponentMaterial(mtrSolidWhite));
        paddleRight.addComponent(new f.ComponentMaterial(mtrSolidWhite));
        topPos.addComponent(new f.ComponentMaterial(mtrSolidWhite));
        bottomPos.addComponent(new f.ComponentMaterial(mtrSolidWhite));
        rightWall.addComponent(new f.ComponentMaterial(mtrSolidWhite));
        leftWall.addComponent(new f.ComponentMaterial(mtrSolidWhite));

        ball.addComponent(new f.ComponentTransform());
        paddleLeft.addComponent(new f.ComponentTransform());
        paddleRight.addComponent(new f.ComponentTransform());
        topPos.addComponent(new f.ComponentTransform());
        bottomPos.addComponent(new f.ComponentTransform());
        leftWall.addComponent(new f.ComponentTransform());
        rightWall.addComponent(new f.ComponentTransform());



        pong.appendChild(ball);
        pong.appendChild(paddleLeft);
        pong.appendChild(paddleRight);
        pong.appendChild(bottomPos);
        pong.appendChild(topPos);
        pong.appendChild(rightWall);
        pong.appendChild(leftWall);

        return pong;
    }
}