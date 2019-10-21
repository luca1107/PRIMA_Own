namespace L02_FirstFudge {
    import f = FudgeCore;
    
    window.addEventListener("load", hndLoad);

    export let viewport: f.Viewport;
    
    function hndLoad(_event: Event): void {
        const canvas: HTMLCanvasElement = document.querySelector("canvas");
        f.RenderManager.initialize();
        console.log(canvas);

        let node: f.Node = new f.Node("Quad");
        let mesh: f.MeshQuad = new f.MeshQuad();
        let cmpMesh: f.ComponentMesh = new f.ComponentMesh(mesh);

        let mtrSolidWhite: f.Material = new f.Material("SolidWhite", f.ShaderUniColor, new f.CoatColored(f.Color.GREEN));
        let cmpMat: f.ComponentMaterial = new f.ComponentMaterial(mtrSolidWhite);

        let cmpCamera: f.ComponentCamera = new f.ComponentCamera();
        cmpCamera.pivot.translate(new f.Vector3(0, 0, 3)); 
      
        
      

        node.addComponent(cmpMesh);
        node.addComponent(cmpMat);

        viewport = new f.Viewport();
        viewport.initialize("Viewport", node, cmpCamera, canvas);
        f.Debug.log(viewport);

        viewport.draw();
        
  
    }
}