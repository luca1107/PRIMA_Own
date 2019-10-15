namespace L02_FirstFudge {
    import f = FudgeCore;
    
    window.addEventListener("load", hndLoad);
    
    function hndLoad(_event: Event): void {
        const canvas: HTMLCanvasElement = document.querySelector("canvas");
        console.log(canvas);
        
        let viewport: f.Viewport = new f.Viewport();
        viewport.initialize("Viewport", null, null, canvas);
  
    }
}