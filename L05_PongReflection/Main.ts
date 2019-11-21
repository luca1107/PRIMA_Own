namespace L05_PongReflection {


    interface KeyPressed {
        [code: string]: boolean;  // Keycode vom Typ String : Boolean = true/false --> Gedrückt oder nicht 
    }
    import f = FudgeCore;
    let keysPressed: KeyPressed = {};

    window.addEventListener("load", hndLoad);
    // tslint:disable-next-line: typedef

    let viewport: f.Viewport;

    let pong: f.Node = new f.Node("Pong");

    let ball: f.Node = new f.Node("Ball");
    let paddleLeft: f.Node = new f.Node("PaddleLeft");
    let paddleRight: f.Node = new f.Node("PaddleRight");

    let scoreBoard: f.Node = new f.Node("Scoreboard");
    let scoreBoardLeft: f.Node = new f.Node("ScoreboardLeft");
    scoreBoardLeft.addComponent(new f.ComponentTransform());
    let scoreBoardRight: f.Node = new f.Node("ScoreboardRight");
    scoreBoardRight.addComponent(new f.ComponentTransform());

    let pointsLeft: number = 5;
    let pointsRight: number = 5;

    let gameOver: boolean = false;

    let topWall: f.Node = new f.Node("topWall");
    let bottomWall: f.Node = new f.Node("bottomWall");
    let rightWall: f.Node = new f.Node("rightWall");
    let leftWall: f.Node = new f.Node("leftWall");

    let velX: number;
    let velY: number;

    let borderTop: number = 12.6;
    let changing: boolean = false;

    let lockLeftUP: boolean = false;
    let lockLeftDOWN: boolean = false;
    let lockRightUP: boolean = false;
    let lockRightDOWN: boolean = false;


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
        createScoreBoard();

        let cmpCamera: f.ComponentCamera = new f.ComponentCamera();
        cmpCamera.pivot.translateZ(42);


        paddleRight.cmpTransform.local.translateX(20);
        paddleLeft.cmpTransform.local.translateX(-20);
        paddleLeft.getComponent(f.ComponentMesh).pivot.scaleY(4);
        paddleRight.getComponent(f.ComponentMesh).pivot.scaleY(4);

        bottomWall.getComponent(f.ComponentMesh).pivot.scaleX(45);
        bottomWall.cmpTransform.local.translateY(-14);

        topWall.getComponent(f.ComponentMesh).pivot.scaleX(45);
        topWall.cmpTransform.local.translateY(14);

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

    function createScoreBoard(): void {
        let meshQuad: f.MeshQuad = new f.MeshQuad();
        let mtrSolidWhite: f.Material = new f.Material("SolidWhite", f.ShaderUniColor, new f.CoatColored(f.Color.WHITE));
        let mtrSolidRed: f.Material = new f.Material("SolidWhite", f.ShaderUniColor, new f.CoatColored(f.Color.RED));
        let mtrSolidGreen: f.Material = new f.Material("SolidWhite", f.ShaderUniColor, new f.CoatColored(new f.Color(0, 1, 0, .25)));


        for (let i: number = 0; i < 10; i++) {
            let tempNode: f.Node = new f.Node("scoreChildren" + i);
            tempNode.addComponent(new f.ComponentMesh(meshQuad));
            tempNode.addComponent(new f.ComponentMaterial(mtrSolidGreen));
            tempNode.addComponent(new f.ComponentTransform());
            if (i < 5) {
                tempNode.cmpTransform.local.translateX(2.5 * i);
                tempNode.cmpTransform.local.scaleX(2.5);
                scoreBoardRight.appendChild(tempNode);
            }

            else {
                tempNode.cmpTransform.local.translateX(2.5 * -i);
                tempNode.cmpTransform.local.scaleX(2.5);
                scoreBoardLeft.appendChild(tempNode);
            }
            scoreBoardRight.cmpTransform.local.translateX(-.35);
            scoreBoardRight.cmpTransform.local.translateY(.6);
            scoreBoardRight.cmpTransform.local.scaleX(1.025);

            scoreBoardLeft.cmpTransform.local.translateX(.35);
            scoreBoardLeft.cmpTransform.local.translateY(.6);
            scoreBoardLeft.cmpTransform.local.scaleX(1.025);

            scoreBoard.appendChild(scoreBoardLeft);
            scoreBoard.appendChild(scoreBoardRight);
        }
        scoreBoard.addComponent(new f.ComponentTransform());
        scoreBoard.cmpTransform.local.translateX(7.75);
        scoreBoard.cmpTransform.local.scaleY(.5);
        scoreBoard.cmpTransform.local.translateY(8.5);
    }

    function removePointLeft(): void {
        let childrens: f.Node[] = scoreBoardLeft.getChildrenByName("scoreChildren" + (10 - pointsLeft));
        let mtrSolidRed: f.Material = new f.Material("SolidWhite", f.ShaderUniColor, new f.CoatColored(f.Color.RED));
        scoreBoardLeft.removeChild(childrens[0]);

        if (pointsLeft == 1) {
            gameOver = true;
        }

    }

    function removePointRight(): void {
        let childrens: f.Node[] = scoreBoardRight.getChildrenByName("scoreChildren" + (5 - pointsRight));
        scoreBoardRight.removeChild(childrens[0]);
        if (pointsRight == 1) {
            gameOver = true;
        }

    }

    function setUpBall(): void {
        ball.cmpTransform.local.translation = new f.Vector3(0, 0, 0);
        velX = plusMinus() * Math.random() / 6;
        velY = plusMinus() * Math.random() / 11;

        if (velX < .1)
            velX = plusMinus() * .25;
        //randZ = plusMinus() * Math.random() / 10;

    }


    function plusMinus(): number {
        return Math.random() < 0.5 ? -1 : 1;
    }

    function detectHit(_position: f.Vector3, _node: f.Node): boolean {

        let sclRect: f.Vector3 = _node.getComponent(f.ComponentMesh).pivot.scaling.copy;

        let posRect: f.Vector3 = _node.cmpTransform.local.translation.copy;

        let rect: f.Rectangle = new f.Rectangle(posRect.x, posRect.y, sclRect.x, sclRect.y, f.ORIGIN2D.CENTER);

        return rect.isInside(_position.toVector2());

    }

    function moveBall(): void {

        ball.cmpTransform.local.translate(new f.Vector3(velX, velY, 0));

    }


    function processHit(_node: f.Node): void {

        console.log("Reflect at ", _node.name);

        switch (_node.name) {

            case "topWall":

            case "bottomWall":

                velY *= -1;

                break;

            case "rightWall":
                setUpBall();
                removePointRight();
                pointsRight--;

                break;

            case "leftWall":
                removePointLeft();
                setUpBall();
                pointsLeft--;
                break;

            case "PaddleLeft":
                changing = true;
                velX *= -1;

                break;

            case "PaddleRight":

                velX *= -1;
                changing = true;

                break;

            default:

                console.warn("Oh, no, I hit something unknown!!", _node.name);

                break;

        }

    }


    function update(_event: Event): void {

        if (!gameOver) {
            checkCollision();
            checkPaddlePosition();
            moveBall();
        }


        f.RenderManager.update();
        viewport.draw();
    }

    function checkCollision(): void {
        let ballPos: f.Vector3 = ball.cmpTransform.local.translation;
        checkInput();

        let hit: boolean = false;

        for (let node of pong.getChildren()) {

            if (node.name == "Ball" || node.name == "Scoreboard")

                continue;

            hit = detectHit(ballPos, node);



            if (hit) {

                processHit(node);

                break;

            }

        }
    }



    function checkInput(): void {
        if (keysPressed[f.KEYBOARD_CODE.ARROW_UP] && !lockRightUP) {
            if (changing) {
                velY += .05;
                changing = false;
            }
            paddleRight.cmpTransform.local.translate(new f.Vector3(0, 0.3, 0));
        }

        if (keysPressed[f.KEYBOARD_CODE.B]) {
            setUpBall();
        }

        if (keysPressed[f.KEYBOARD_CODE.ARROW_DOWN] && !lockRightDOWN) {
            if (changing) {
                velY -= .05;
                changing = false;
            }
            paddleRight.cmpTransform.local.translate(f.Vector3.Y(-0.3));
        }
        if (keysPressed[f.KEYBOARD_CODE.W] && !lockLeftUP) {
            if (changing) {
                velY += .05;
                changing = false;
            }
            paddleLeft.cmpTransform.local.translate(new f.Vector3(0, 0.3, 0));
        }
        if (keysPressed[f.KEYBOARD_CODE.S] && !lockLeftDOWN) {
            if (changing) {
                velY -= .05;
                changing = false;
            }
            paddleLeft.cmpTransform.local.translate(f.Vector3.Y(-0.3));
        }
    }

    function checkPaddlePosition(): void {
        if (paddleLeft.cmpTransform.local.translation.y > borderTop) {
            lockLeftUP = true;
        }

        else {
            lockLeftUP = false;
        }

        if (paddleLeft.cmpTransform.local.translation.y < -borderTop) {
            lockLeftDOWN = true;
        }

        else {
            lockLeftDOWN = false;
        }

        if (paddleRight.cmpTransform.local.translation.y > borderTop) {
            lockRightUP = true;
        }

        else {
            lockRightUP = false;
        }

        if (paddleRight.cmpTransform.local.translation.y < -borderTop) {
            lockRightDOWN = true;
        }

        else {
            lockRightDOWN = false;
        }

    }

    function hndKeyup(_event: KeyboardEvent): void {
        keysPressed[_event.code] = false;
    }
    function hndKeydown(_event: KeyboardEvent): void {
        keysPressed[_event.code] = true;
    }



    function createPong(): f.Node {


        let mtrSolidWhite: f.Material = new f.Material("SolidWhite", f.ShaderUniColor, new f.CoatColored(f.Color.WHITE));
        let meshQuad: f.MeshQuad = new f.MeshQuad();

        ball.addComponent(new f.ComponentMesh(meshQuad));
        paddleLeft.addComponent(new f.ComponentMesh(meshQuad));
        paddleRight.addComponent(new f.ComponentMesh(meshQuad));
        topWall.addComponent(new f.ComponentMesh(meshQuad));
        bottomWall.addComponent(new f.ComponentMesh(meshQuad));
        rightWall.addComponent(new f.ComponentMesh(meshQuad));
        leftWall.addComponent(new f.ComponentMesh(meshQuad));


        ball.addComponent(new f.ComponentMaterial(mtrSolidWhite));
        paddleLeft.addComponent(new f.ComponentMaterial(mtrSolidWhite));
        paddleRight.addComponent(new f.ComponentMaterial(mtrSolidWhite));
        topWall.addComponent(new f.ComponentMaterial(mtrSolidWhite));
        bottomWall.addComponent(new f.ComponentMaterial(mtrSolidWhite));
        rightWall.addComponent(new f.ComponentMaterial(mtrSolidWhite));
        leftWall.addComponent(new f.ComponentMaterial(mtrSolidWhite));

        ball.addComponent(new f.ComponentTransform());
        paddleLeft.addComponent(new f.ComponentTransform());
        paddleRight.addComponent(new f.ComponentTransform());
        topWall.addComponent(new f.ComponentTransform());
        bottomWall.addComponent(new f.ComponentTransform());
        leftWall.addComponent(new f.ComponentTransform());
        rightWall.addComponent(new f.ComponentTransform());



        pong.appendChild(ball);
        pong.appendChild(paddleLeft);
        pong.appendChild(paddleRight);
        pong.appendChild(bottomWall);
        pong.appendChild(topWall);
        pong.appendChild(rightWall);
        pong.appendChild(leftWall);
        pong.appendChild(scoreBoard);

        return pong;
    }
}