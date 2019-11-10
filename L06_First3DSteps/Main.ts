namespace L06_First3DSteps {

    import f = FudgeCore;

    window.addEventListener("load", hndLoad);
    
    let viewport: f.Viewport;

    let parentAll: f.Node = new f.Node("ParentAll");

    let parentObjects: f.Node = new f.Node("ParentObjects");
    

    

    function hndLoad(_event: Event): void {
        const canvas: HTMLCanvasElement = document.querySelector("canvas");
        f.RenderManager.initialize();
        f.Debug.log(canvas);

        

        let cmpCamera: f.ComponentCamera = new f.ComponentCamera();
        cmpCamera.pivot.translateZ(42);


        
        viewport = new f.Viewport();
        viewport.initialize("Viewport", parentAll, cmpCamera, canvas);
        f.Debug.log(viewport);

        viewport.draw();

        f.Loop.addEventListener(f.EVENT.LOOP_FRAME, update);
        f.Loop.start();
    }

    function detectHit(_position: f.Vector3, _node: f.Node): boolean {

        let sclRect: f.Vector3 = _node.getComponent(f.ComponentMesh).pivot.scaling.copy;

        let posRect: f.Vector3 = _node.cmpTransform.local.translation.copy;

        let rect: f.Rectangle = new f.Rectangle(posRect.x, posRect.y, sclRect.x, sclRect.y, f.ORIGIN2D.CENTER);

        return rect.isInside(_position.toVector2());

    }



  

    function update(_event: Event): void {

        f.RenderManager.update();
        viewport.draw();
    }



    function createObjects(index : number): f.Node {

        let mtrSolidWhite: f.Material = new f.Material("SolidWhite", f.ShaderUniColor, new f.CoatColored(f.Color.WHITE));
        let meshCube: f.MeshCube = new f.MeshCube;
        

        switch(index)
        {
            case 0:
                let object_1 : f.Node = new f.Node("Object_"+index);
                for(let i:number = 0; i<5;i++)
                {
                    let tempNode: f.Node = new f.Node(""+i);
                    tempNode.addComponent(new f.ComponentMesh(meshCube));
                    tempNode.addComponent(new f.ComponentMaterial(mtrSolidWhite));
                    tempNode.addComponent(new f.ComponentTransform());

                    tempNode.cmpTransform.local.translateX(i);
                    object_1.appendChild(tempNode);
                }

                for(let i:number = 1; i<5;i=i+2)
                {
                    let tempNode: f.Node = new f.Node("Side"+i);
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
                    let object_2 : f.Node = new f.Node("Object_"+index);
                    for(let i:number = 0; i<5;i++)
                    {
                        let tempNode: f.Node = new f.Node(""+i);
                        tempNode.addComponent(new f.ComponentMesh(meshCube));
                        tempNode.addComponent(new f.ComponentMaterial(mtrSolidWhite));
                        tempNode.addComponent(new f.ComponentTransform());
    
                        tempNode.cmpTransform.local.translateY(i);
                        object_2.appendChild(tempNode);
                    }
    
                    for(let i:number = 1; i<5;i=i+2)
                    {
                        let tempNode: f.Node = new f.Node("Side"+i);
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
}