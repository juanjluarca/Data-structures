import TreeNode from "./tree-node";

export default class RBTree<T> {
  public root: TreeNode<T> | null = null;

  private _insert({
    key,
    parent = null,
    ref = this.root,
    value,
  }: {
    key: number;
    parent?: TreeNode<T> | null;
    ref?: TreeNode<T> | null;
    value?: T;
  }): TreeNode<T> {
    if (ref === null) {
      return new TreeNode({ key, value, parent });
    }

    if (key < ref.key) {
      ref.left = this._insert({
        key,
        value,
        ref: ref.left,
        parent: ref,
      });
    } else {
      ref.right = this._insert({
        key,
        value,
        ref: ref.right,
        parent: ref,
      });
    }

    return ref;
  }

  private _checkColor(key: number) {
    let ref = this.search(key);
    let parent = ref.parent
    while (parent && parent.color === "red") {
      let grandparent = parent.parent;
      if (grandparent) {
        let uncle: TreeNode<T> | null;
        let side: 'left' | 'right' = 'left';
        if (grandparent.key > ref.key) {
          // Ref está a la izquierda
          uncle = grandparent.right;
          side = "left";
        } else {
          // Ref está a la derecha
          uncle = grandparent.left;
          side = "right";
        }
        if (uncle === null || uncle.color === 'black') {
          let direction: 'triangle' | 'line' = 'triangle';
          if (side === "left" && parent.left === ref) {
            direction = "line";
          } else if (side === "right" && parent.right === ref) {
            direction = "line";
          } else {
            direction = "triangle";
          }
          // Escenario 03 = Triángulo
          if (direction === "triangle") {
            if (ref.key < parent.key) {
              // Rotar padre a la derecha
              parent = parent.rotateRight();
            } else {
              // Rotar padre a la izquierda
              parent = parent.rotateLeft();
            }
          } else {
            // Escenario 04 = Línea
            if (ref.key < grandparent.key) {
              // Rotar el abuelo a la derecha
              grandparent = grandparent.rotateRight();
            } else {
              // Rotar el abuelo a la izquierda
              grandparent = grandparent.rotateLeft();
            }
            parent.swapColor();
            grandparent?.swapColor();

          }
        } else if (uncle.color === "red") {
          grandparent.swapColor();
          parent.swapColor();
          uncle.swapColor();
        }
      }
      
      console.log("Escenario 2");

      if (ref.parent) {
        ref = ref.parent;
        parent = ref.parent;
      }
    }
    if (ref === this.root && ref.color === 'red') {
      ref.swapColor();
    }
  }

  public insert(key: number, value?: T) {
    this.root = this._insert({key, value, ref: this.root,});
    this._checkColor(key);
  }

  public transplant(u: TreeNode<T>, v: TreeNode<T>) {
    if (u === this.root) {
      u = v;
      u.parent = null;
      return;
    }
    if (u.parent?.left === u) {
      v.parent = u.parent;
      u.parent.left = v;
    } else if (u.parent?.right === u) {
      v.parent = u.parent;
      u.parent.right = v;
    }
    return;
  }

  public delete(key: number) {
    let node: any;
    node = this.search(key);
    if (node) {
      if (node.isLeaf()) {
        node = null;
      }
      
    } else {
      return null;
    }

  }
  
  public preorder(ref: TreeNode<T> | null = this.root): string {
    if (ref === null) {
      return "NULL";
    }

    const root = `${ref.key.toString(10)}`;
    const left = this.preorder(ref.left);
    const right = this.preorder(ref.right);

    return `${root} (${left}, ${right})`;
  }

  public search(key: number, ref: TreeNode<T> | null = this.root): TreeNode<T> {
    if (ref === null) {
      throw new Error("Node not found");
    }

    if (ref.key === key) {
      return ref;
    } else if (key < ref.key) {
      return this.search(key, ref.left);
    } else {
      return this.search(key, ref.right);
    }
  }

  public rotateLeft() {
    if (this.root) {
      this.root = this.root.rotateLeft();
    }
  }

  public rotateRight() {
    if (this.root) {
      this.root = this.root.rotateRight();
    }
  }

}
