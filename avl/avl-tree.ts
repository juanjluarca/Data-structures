import TreeNode from "./tree-node";

export default class AvlTree<T> {
  public root: TreeNode<T> | null = null;

  constructor(key: number, data?: T) {
    this.root = new TreeNode(key, data);
  }

  public insert(key: number, data?: T): void {
    if (this.root === null) {
      this.root = new TreeNode(key, data);
      return;
    }

    this.root = this._insert(key, data, this.root);
  }

  public _insert(
    key: number,
    data: T | undefined,
    ref: TreeNode<T> | null
  ): TreeNode<T> {
    if (ref === null) {
      return new TreeNode(key, data);
    }

    if (key < ref.key) {
      ref.left = this._insert(key, data, ref.left);
    } else {
      ref.right = this._insert(key, data, ref.right);
    }

    const balanceFactor = this.balanceFactor(ref);

    if (balanceFactor > 1) {
      if (ref.left && key < ref.left.key) {
        ref = ref.rotateRight();
      } else if (ref.left && key > ref.left.key) {
        ref.left = ref.left.rotateLeft();
        ref = ref.rotateRight();
      }
    } else if (balanceFactor < -1) {
      if (ref.right && key > ref.right.key) {
        ref = ref.rotateLeft();
      } else if (ref.right && key < ref.right.key) {
        ref.right = ref.right.rotateRight();
        ref = ref.rotateLeft();
      }
    }

    return ref;
  }

  public height(node: TreeNode<T> | null = this.root): number {
    if (node === null) {
      return -1;
    }

    return Math.max(this.height(node.left), this.height(node.right)) + 1;
  }

  public balanceFactor(node: TreeNode<T>): number {
    return this.height(node.left) - this.height(node.right);
  }

  public preorder(ref: TreeNode<T> | null = this.root): string {
    if (ref === null) {
      return "NULL";
    }

    const root = ref.key.toString(10);
    const left = this.preorder(ref.left);
    const right = this.preorder(ref.right);

    return `${root} (${left}, ${right})`;
  }

  public delete(
    key: number,
    ref: TreeNode<T> | null = this.root
  ): TreeNode<T> | null {
    if (ref === null) {
      return null;
    }

    if (key < ref.key) {
      ref.left = this.delete(key, ref.left);
    } else if (key > ref.key) {
      ref.right = this.delete(key, ref.right);
    } else {
      if (ref.isLeaf()) {
        ref = null;
      } else if (ref.left === null && ref.right) {
        ref = ref.right;
      } else if (ref.right === null && ref.left) {
        ref = ref.left;
      } else {
        const successor = this.min(ref.right);
        ref.key = successor.key;
        ref.data = successor.data;
        ref.right = this.delete(successor.key, ref.right);
      }
    }

    if (ref === null) {
      return ref;
    }

    const balanceFactor = this.balanceFactor(ref);

    if (balanceFactor > 1) {
      if (ref.left && this.balanceFactor(ref.left) >= 0) {
        ref = ref.rotateRight();
      } else if (ref.left) {
        ref.left = ref.left.rotateLeft();
        ref = ref.rotateRight();
      }
    } else if (balanceFactor < -1) {
      if (ref.right && this.balanceFactor(ref.right) <= 0) {
        ref = ref.rotateLeft();
      } else if (ref.right) {
        ref.right = ref.right.rotateRight();
        ref = ref.rotateLeft();
      }
    }

    return ref;
  }

  public min(ref: TreeNode<T> | null = this.root): TreeNode<T> {
    if (ref === null) {
      throw new Error("Tree is empty");
    }

    if (ref.left === null) {
      return ref;
    }

    return this.min(ref.left);
  }

  public max(ref: TreeNode<T> | null = this.root): TreeNode<T> {
    if (ref === null) {
      throw new Error("Tree is empty");
    }

    if (ref.right === null) {
      return ref;
    }

    return this.max(ref.right);
  }

  public searchRange(min: number, max: number, ref: TreeNode<T> | null = this.root) {
    if (ref === null) {
      return;
    }
    if (min < ref.key && max > ref.key) {
      console.log(ref.data);
    }
    this.searchRange(min, max, ref.left);
    this.searchRange(min, max, ref.right);

  }

  public search(
    key: number,
    ref: TreeNode<T> | null = this.root
  ): TreeNode<T> | null {
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
}
