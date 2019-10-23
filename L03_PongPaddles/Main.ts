namespace L03_PongPaddle {
    import ƒ = FudgeCore;

    window.addEventListener("load", hndLoad);
    // tslint:disable-next-line: typedef
    window.addEventListener("keydown", async function (event) {
        
            if (event.keyCode == 87)
            {
                console.log("WWWW");
                startW();
                await delay(150);
            }

            if (event.keyCode == 83)
            {
                startS();
                await delay(150);
            }
            else
            {
                return;
            }
       
      },                    true);
    export let viewport: ƒ.Viewport;

    let ball: ƒ.Node = new ƒ.Node("Ball");
    let paddleLeft: ƒ.Node = new ƒ.Node("PaddleLeft");
    let paddleRight: ƒ.Node = new ƒ.Node("PaddleRight");

    function hndLoad(_event: Event): void {
        const canvas: HTMLCanvasElement = document.querySelector("canvas");
        ƒ.RenderManager.initialize();
        ƒ.Debug.log(canvas);

        let pong: ƒ.Node = createPong();

        let cmpCamera: ƒ.ComponentCamera = new ƒ.ComponentCamera();
        cmpCamera.pivot.translateZ(42);

        
        paddleRight.cmpTransform.local.translateX(20);
        paddleLeft.cmpTransform.local.translateX(-20);
        paddleLeft.getComponent(ƒ.ComponentMesh).pivot.scaleY(4);
        paddleRight.getComponent(ƒ.ComponentMesh).pivot.scaleY(4);

        viewport = new ƒ.Viewport();
        viewport.initialize("Viewport", pong, cmpCamera, canvas);
        ƒ.Debug.log(viewport);

        viewport.draw();
    }

    async function startW(): Promise<void> {
        for (let i = 0; i < 7; i++) {
            paddleLeft.getComponent(ƒ.ComponentMesh).pivot.translateY(0.25);
            viewport.draw();
            await delay(3.5);
        }
    }

    async function startS(): Promise<void> {
        for (let i = 0; i < 7; i++) {
            paddleLeft.getComponent(ƒ.ComponentMesh).pivot.translateY(-0.25);
            viewport.draw();
            await delay(3.5);
        }
    }

    function delay(ms: number)  {
        return new Promise( resolve => setTimeout(resolve, ms) );
    }



    function createPong(): ƒ.Node {
        let pong: ƒ.Node = new ƒ.Node("Pong");

        let mtrSolidWhite: ƒ.Material = new ƒ.Material("SolidWhite", ƒ.ShaderUniColor, new ƒ.CoatColored(ƒ.Color.WHITE));
        let meshQuad: ƒ.MeshQuad = new ƒ.MeshQuad();

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
}