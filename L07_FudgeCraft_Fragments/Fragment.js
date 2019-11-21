"use strict";
var L07_FudgeCraft_Fragments;
(function (L07_FudgeCraft_Fragments) {
    var ƒ = FudgeCore;
    class Fragment extends ƒ.Node {
        constructor(_shape) {
            super("Fragment-Type" + _shape);
            this.position = new ƒ.Vector3(0, 0, 0);
            let shape = Fragment.shapes[_shape];
            let type;
            for (let position of shape) {
                type = Fragment.getEnum(_shape);
                let vctPosition = ƒ.Vector3.ZERO();
                vctPosition.set(position[0], position[1], position[2]);
                let cube = new L07_FudgeCraft_Fragments.Cube(type, vctPosition);
                this.appendChild(cube);
            }
        }
        static getShapeArray() {
            return [
                // corner
                [[0, 0, 0], [1, 0, 0], [0, 1, 0], [0, 0, 1]],
                // quad
                [[0, 0, 0], [1, 0, 0], [0, 1, 0], [1, 1, 0]],
                // s
                [[0, 0, 0], [0, 1, 0], [1, 0, 0], [1, -1, 0]],
                [[0, 0, 0], [1, 1, 0], [-1, 1, 0], [1, 0, 0], [-1, 0, 0]] //Block4
            ];
        }
        static getRandomEnum(_enum) {
            let randomKey = Object.keys(_enum)[Math.floor(Math.random() * Object.keys(_enum).length)];
            return _enum[randomKey];
        }
        static getEnum(_index) {
            switch (_index) {
                case 0:
                    return L07_FudgeCraft_Fragments.CUBE_TYPE.RED;
                    break;
                case 1:
                    return L07_FudgeCraft_Fragments.CUBE_TYPE.BLUE;
                    break;
                case 2:
                    return L07_FudgeCraft_Fragments.CUBE_TYPE.GREEN;
                    break;
                case 3:
                    return L07_FudgeCraft_Fragments.CUBE_TYPE.MAGENTA;
                    break;
                default:
                    return L07_FudgeCraft_Fragments.CUBE_TYPE.RED;
                    break;
            }
        }
    }
    Fragment.shapes = Fragment.getShapeArray();
    L07_FudgeCraft_Fragments.Fragment = Fragment;
})(L07_FudgeCraft_Fragments || (L07_FudgeCraft_Fragments = {}));
//# sourceMappingURL=Fragment.js.map