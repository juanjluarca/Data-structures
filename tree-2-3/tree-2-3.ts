import Data from "./data";
import Student from "./student";
import TreeNode from "./tree-node";

export default class Tree23 {
    public root: TreeNode | null;

    constructor() {
        this.root = null;
    }
    // Se ordenan de menor a mayor, el izquierdo será el viejo
    // el del medio será el promovido (padre) 
    // y el derecho será el nuevo nodo (en el centro)
    public printFullObject(obj: TreeNode | null = this.root) {
        console.log(JSON.stringify(obj, (key, value) =>
          typeof value === "object" && value !== null ? value : value, 2));
      }

    public findMin(ref: TreeNode | null, min: number) {
        if (ref) {
            while (ref.left) {
                ref = ref?.left;
                min = ref.data1.key;
            }
        }
        if (!ref) {
            return this.root!.data1;
        }
        this.delete(min);
        return ref.data1;
    }

    public delete(data: number, ref: TreeNode | null = this.root) { // Ya elimina en hojas
        if (ref === null) {
            return null;
        }
        const node = ref.data1.payload;
        if (ref.data1.key === data || (ref.data2 && ref.data2.key === data)) {
            if (ref.isLeaf()) {
                if (ref.data1.key === data && ref.data2) {
                    ref.data1 = ref.data2;
                    ref.data2 = undefined;
                    return node;
                } else if (ref.data1.key === data && ref.data2 === undefined) {
                    if (ref === this.root) {
                        this.root = null;
                        return node;
                    }
                    const father = this.searchParent(ref);
                    if (father!.left === ref && father!.middle){
                        if (father?.middle.data2) {
                            ref.data1 = father.data1;
                            father.data1 = father.middle.data1;
                            father.middle.data1 = father.middle.data2;
                            father.middle.data2 = undefined;
                            return node;
                        } else {
                            if (father?.middle.isLeaf()) {
                                father.left = undefined;
                                father.data2 = father.middle.data1;
                                father.middle = undefined;
                                return node;
                            }
                        }
                    } else if (father?.middle === ref) {
                        if (father.left && father.left.isFull() && father.left.isLeaf() && father.left.data2) {
                            ref.data1 = father.data1;
                            father.data1 = father.left.data2;
                            father.left.data2 = undefined;
                            return node;
                        }
                    } else if (father?.right === ref) {
                        if (father.middle && father.middle.data2 && father.middle.isLeaf() && father.data2) {
                            ref.data1 = father.data2;
                            father.data2 = father.middle.data2;
                            father.middle.data2 = undefined;
                            return node;
                        }
                    }
                }
                if (ref.data2 && data === ref.data2.key) {
                    const deletedNode = ref.data2.payload;
                    ref.data2 = undefined;

                    return deletedNode;
                }
            } else {
                // Eliminación si no es una hoja
                if (ref === this.root) {
                    if (ref.left && ref.middle) {
                        if (!ref.left.data2 && ref.left.isLeaf() && !ref.middle.data2 && ref.middle.isLeaf()) {
                            ref.data1 = ref.left.data1;
                            ref.data2 = ref.middle.data1;
                            ref.left = undefined;
                            ref.middle = undefined;
                            return null;
                        }
                    }
                }
            }
        } else {
            if (data < ref.data1.key) {
                if (ref.left) {
                    this.delete(data, ref.left);
                }
            } else if (data > ref.data1.key && (ref.data2 === undefined || data < ref.data2.key)) {
                if (ref.middle) {
                    this.delete(data, ref.middle);
                }
            } else if (ref.data2 && data > ref.data2.key) {
                if (ref.right) {
                    this.delete(data, ref.right);
                }
            }
        }
        return null; // El nodo no se encontró en el árbol
    }


    private searchParent(data: TreeNode, ref: TreeNode | null = this.root) {
        if (ref === null) {
            return null;
        }
        if (ref.left === data || ref.middle === data || ref.right === data) {
            return ref;
        }
        if (ref.left) {
            this.searchParent(data, ref.left);
        }
        if (ref.middle) {
            this.searchParent(data, ref.middle);
        }
        if (ref.right) {
            this.searchParent(data, ref.right);
        }
        return null;
    }

    public search(data: number, ref: TreeNode | null = this.root): Student | null {
        if (ref === null) {
            return null;
        }
        if (ref.data1.key === data) {
            return ref.data1.payload!; 
        }
        if (ref.data2 && ref.data2.key === data) {
            return ref.data2.payload!;
        }
        if (data < ref.data1.key) {
            if (ref.left) {
                return this.search(data, ref.left);
            } 
        } else if ((data > ref.data1.key && ref.data2 === undefined) || (ref.data2 && data > ref.data1.key && data < ref.data2.key)) {
            if (ref.middle) {
                return this.search(data, ref.middle);
            }
        } else {
            if (ref.right){
                return this.search(data, ref.right);
            }
        }
        return null; 
    }

    public preorder(ref: TreeNode | null = this.root): Student[] {
        if (ref === null) {
            return [];
        }
        if (ref === undefined) {
            return [];
        }
        let result: Student[] = [];
        result.push(ref.data1.payload!);
        if (ref.data2) {
            result.push(ref.data2.payload!);
        }

        if (ref.left !== undefined) {
            result = result.concat(this.preorder(ref.left));
        }
        if (ref.middle !== undefined) {
            result = result.concat(this.preorder(ref.middle));
        }
        if (ref.right !== undefined) {
            result = result.concat(this.preorder(ref.right));
        }
    
        return result;
    }

    public insert(data: Data) {
        if (this.root === null) {
            this.root = new TreeNode(data);
        } else {
            this._insert(data);
        }
    }

    private _insert(data: Data, ref: TreeNode | null = this.root): [TreeNode, Data, TreeNode] | null {
        if (!ref) {
            return null;
        }

        if (ref.isLeaf()) {
            if (ref.isFull() && ref.data2) {
                let leftKey: TreeNode;
                let promotedKey: Data;
                let middleKey: TreeNode;
                // Ordenar llaves de forma ascendente
                // Vieja, promovida y nueva
                if (data.key < ref.data1.key) {
                    // Vieja = nueva data
                    leftKey = new TreeNode(data);
                    // Promovido = ref.data1
                    promotedKey = ref.data1;
                    // Nueva = ref.data2
                    middleKey = new TreeNode(ref.data2);
                } else if (data.key > ref.data1.key && data.key < ref.data2.key) {
                    // Vieja llave = ref.data1
                    leftKey = new TreeNode(ref.data1);
                    // Promovido = nueva data
                    promotedKey = data;
                    // Nueva llave = ref.data2
                    middleKey = new TreeNode(ref.data2);
                } else {
                    // Vieja llave = ref.data1
                    leftKey = new TreeNode(ref.data1);
                    // Promovido = ref.data2
                    promotedKey = ref.data2;
                    // Nueva llave = nueva data
                    middleKey = new TreeNode(data);
                }
                if (ref === this.root) {
                    const newRoot = new TreeNode(promotedKey);
                    newRoot.left = leftKey;
                    newRoot.middle = middleKey;
                    this.root = newRoot;
                    return null;
                } else {
                    // Enviar al padre esta información
                    return [leftKey, promotedKey, middleKey];
                }
                
            } else {
                // _Insertar en el nodo
                // Realizar swap si aplica
                ref.insert(data);
                return null;
            }
            // _Insertar
        } else {
            // Escoger un camino
            const branch = ref.getBranch(data.key);
            // _Insertar en ese camino
            const result = this._insert(data, branch);
            

            // Si tenemos un resultado, entonces acomodar
            // 1 5 6
            if (result) {
                // Comprobar si el nodo interior está lleno
                if (ref.isFull() && ref.data2 && ref.left && ref.middle && ref.right) {
                    let oldKey: TreeNode;
                    let promotedKey: Data;
                    let newKey: TreeNode;
                    // Ordenar llaves de forma ascendente
                    // Vieja, promovida y nueva
                    oldKey = result[0];
                    promotedKey = result[1];
                    newKey = result[2];

                    // Caso 1, el _insertado es menor que ref.data1.key
                    if (promotedKey.key < ref.data1.key && ref.left.data2){
                        let newRoot = new TreeNode(ref.data1);
                        newRoot.left = new TreeNode(promotedKey);
                        newRoot.middle = new TreeNode(ref.data2);
                        newRoot.left.left = oldKey;
                        newRoot.left.middle = newKey;
                        newRoot.middle.left = ref.middle;
                        newRoot.middle.middle = ref.right;

                        if (ref === this.root) {
                            this.root = newRoot;
                            return null;
                        } else {
                            ref = newRoot;
                            return [newRoot, newRoot.data1, newRoot];

                        }
                        // Caso 2, data1 < _insertado < data2
                        // KO, KP, KN
                    } else if (promotedKey.key > ref.data1.key && data.key < ref.data2.key && ref.middle.data2){
                        const newRoot = new TreeNode(promotedKey);
                        newRoot.left = new TreeNode(ref.data1);
                        newRoot.middle = new TreeNode(ref.data2);
                        newRoot.left.left = ref.left;
                        newRoot.left.middle = oldKey;
                        newRoot.middle.left = newKey;
                        newRoot.middle.middle = ref.right;

                        if (ref === this.root) {
                            this.root = newRoot;
                        } else {
                            ref = newRoot;
                            return [oldKey, promotedKey, newKey];
                        }
                        // Caso 3, _insertado > data2
                    } else if (promotedKey.key > ref.data2.key){
                        const newRoot = new TreeNode(ref.data2);
                        newRoot.left = new TreeNode(ref.data1);
                        newRoot.middle = new TreeNode(promotedKey);
                        newRoot.left.left = ref.left;
                        newRoot.left.middle = ref.middle;
                        newRoot.middle.left = oldKey;
                        newRoot.middle.middle = newKey;
                        if (ref === this.root) {
                            this.root = newRoot;
                        } else {
                            return [oldKey, promotedKey, newKey];
                        }
                    }
                    return null;
                } else {
                    // _Insertar el nodo promovido en la referencia
                    const promotedKey = result[1];
                    if (promotedKey.key < ref.data1.key) {
                        ref.insert(promotedKey);
                        const leftNode = result[0];
                        const middleNode = result[2];
                        const rightNode = ref.middle;
                        
                        ref.left = leftNode;
                        ref.middle = middleNode;
                        ref.right = rightNode;
                        return null;
                    } else {
                        ref.insert(promotedKey);
                        ref.middle = result[0];
                        ref.right = result[2];
                    }
                }
            }
        }
        return null;
    }
}
