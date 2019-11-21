namespace L07_FudgeCraft_Fragments {
    import ƒ = FudgeCore;
    
    

    export class Fragment extends ƒ.Node {
        private static shapes: number[][][] = Fragment.getShapeArray();
        public position: ƒ.Vector3 = new ƒ.Vector3(0, 0, 0);
       

        constructor(_shape: number) {
            super("Fragment-Type" + _shape);
            let shape: number [][] = Fragment.shapes[_shape];
            let type: CUBE_TYPE;
            
            for (let position of shape) {
                type = Fragment.getEnum(_shape);
                let vctPosition: ƒ.Vector3 = ƒ.Vector3.ZERO();
                vctPosition.set(position[0], position[1], position[2]);
                let cube: Cube = new Cube(type, vctPosition);
                this.appendChild(cube);
            }
        }

        private static getShapeArray(): number[][][] {
            return [
                // corner
                [[0, 0, 0], [1, 0, 0], [0, 1, 0], [0, 0, 1]], //Block1
                // quad
                [[0, 0, 0], [1, 0, 0], [0, 1, 0], [1, 1, 0]], //Block4
                // s
                [[0, 0, 0], [0, 1, 0], [1, 0, 0], [1, -1, 0]], //Block4

                [[0, 0, 0], [1, 1, 0], [-1, 1, 0], [1, 0, 0], [-1, 0, 0]]//Block4
            ];
        }

        


           

        

        private static getRandomEnum<T>(_enum: {[key: string]: T}): T {
            let randomKey: string = Object.keys(_enum)[Math.floor(Math.random() * Object.keys(_enum).length)];
            return _enum[randomKey];
        }

        private static getEnum(_index: number): CUBE_TYPE
        {
            switch (_index)
            {
                case 0:
                    return CUBE_TYPE.RED;
                    break;
                case 1:
                    return CUBE_TYPE.BLUE;
                    break;
                case 2:
                    return CUBE_TYPE.GREEN;
                    break;
                case 3:
                    return CUBE_TYPE.MAGENTA;
                    break;      
                default:
                    return CUBE_TYPE.RED;
                    break;
            }
        }
    }
}