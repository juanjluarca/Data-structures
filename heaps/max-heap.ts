import TreeNode from "./tree-node";
import Order from "./order";

class MaxHeap {
  public root: TreeNode | null;

  constructor() {
    this.root = null;
  }

  public insert(data: Order){
    if (this.root === null){
      this.root = new TreeNode(data);
    } else {
      this._insert(this.root, data);
    }
  }

  private _insert(ref: TreeNode, data: Order){
    if (ref === null) {
      return;
    }
    const leftHeight = this.height(ref.left);
    const maxLeft = this.maxNodes(ref.left!);
    const leftNodes = this.countNodes(ref.left);

    const rightHeight = this.height(ref.right);
    const maxRight = this.maxNodes(ref.right!);
    const rightNodes = this.countNodes(ref.right);

    if (leftHeight === rightHeight && leftNodes === maxLeft && rightNodes === maxRight) {
      while (ref.left) {
        ref = ref.left
      }
      ref.left = new TreeNode(data);
      this.swap(ref, ref.left);
      return;
    }
    if (ref.left !== null && ref.right === null){
      ref.right = new TreeNode(data);
      this.swap(ref, ref.right);
      return;
    } 
    if (leftNodes < maxLeft){
      this._insert(ref.left!, data);
      return;
    } else{
      this._insert(ref.right!, data);
      return;
    }
  }

  private swap(parent: TreeNode | null, node: TreeNode) {
    if (parent === null) {
      return;
    }
    if (node.data.price > parent.data.price) {
      const value = parent.data;
      parent.data = node.data;
      node.data = value;
      this.swap(this.searchParent(parent.data.price), parent);
    }
  }
  
  public delete(): Order | null {
    if (this.root !== null) {
      const root = this.root.data;
      const rightMostNode = this.findRight();

      if (rightMostNode !== null) {
        this.root.data = rightMostNode.data;
        this.removeNode(rightMostNode);
        this.deleteSwap();
        return root;
      }
    }
    return null;
  }

  private deleteSwap(){
    if (this.root === null) {
      return;
    }
    this._deleteSwap(this.root);
  }

  private _deleteSwap(node: TreeNode){
    let largest = node;

    if (node.left !== null && node.left.data.price > largest.data.price) {
      largest = node.left;
    }

    if (node.right !== null && node.right.data.price > largest.data.price) {
      largest = node.right;
    }

    if (largest !== node) {
      const temp = node.data;
      node.data = largest.data;
      largest.data = temp;
      this._deleteSwap(largest);
    }
  }

  private searchParent(value: number, ref: TreeNode | null = this.root): TreeNode | null {
    if (ref === null || (ref.left === null && ref.right === null)) {
      return null;
    }

    if ((ref.left !== null && ref.left.data.price === value) || (ref.right !== null && ref.right.data.price === value)) {
      return ref;
    }

    const leftSearch = this.searchParent(value, ref.left);
    if (leftSearch !== null) {
      return leftSearch;
    }

    return this.searchParent(value, ref.right);
  }

  public preorder(ref: TreeNode | null = this.root): string {
    if (ref === null) {
      return "";
    }

    if (ref.left === null && ref.right === null) {
      return `Usuario: ${ref.data.name} Acciones: ${ref.data.stocks} Precio: ${ref.data.price}`;
    }

    let result = `Usuario: ${ref.data.name} Acciones: ${ref.data.stocks} Precio: ${ref.data.price}\n`;
    result += `${this.preorder(ref.left)}`;
    result += `\n${this.preorder(ref.right)}`;

    return result;
  }

  private depth(value: number, subtree: TreeNode | null = this.root): number {
    if (subtree === null) {
      return -1;
    } else if (subtree.data.price === value) {
      return 0;
    }

    const leftDepth = this.depth(value, subtree.left);
    const rightDepth = this.depth(value, subtree.right);

    if (leftDepth === -1 && rightDepth === -1) {
      return -1;
    }

    return Math.max(leftDepth, rightDepth) + 1;
  }

  private height(ref: TreeNode | null = null): number {
    if (ref === null) {
      return 0;
    }
    const leftHeight = this.height(ref.left);
    const rightHeight = this.height(ref.right);

    return Math.max(leftHeight, rightHeight) + 1;
  }

  private removeNode(node: TreeNode) {
    const parent = this.searchParent(node.data.price);

    if (parent !== null) {
      if (parent.left === node) {
        parent.left = null;
      } else if (parent.right === node) {
        parent.right = null;
      }
    } else if (this.root === node) {
      this.root = null;
    }
  }

  private findRight(ref: TreeNode | null = this.root): TreeNode | null {
    if (ref === null) {
      return null;
    }

    if (ref.left === null && ref.right === null) {
      return ref;
    }

    const rightHeight = this.height(ref.right);
    const leftHeight = this.height(ref.left);

    if (rightHeight >= leftHeight) {
      return this.findRight(ref.right);
    } else {
      return this.findRight(ref.left);
    }
  }

  private maxNodes(ref: TreeNode){
    const height = this.height(ref);
    return (2**height - 1);
  }

  public countNodes(ref: TreeNode | null = this.root) {
    if (ref === null) {
      return 0;
    }
    if (ref.left === null && ref.right === null) {
      return 1;
    }
    let result = 1;
    result += this.countNodes(ref.left);
    result += this.countNodes(ref.right);
    return result; 
  }

  public search(value: number, ref: TreeNode | null = this.root): TreeNode | null {
    if (ref !== null && ref.left !== null && ref.right !== null && (ref.left!.data.price === value || ref.right!.data.price === value)) {
      return ref;
    } else if (ref !== null) {
      const leftResult = this.search(value, ref.left);
      if (leftResult === null) {
        const rightResult = this.search(value, ref.right);
        return rightResult;
      }
      return leftResult;
    }
    return null;
  }
}

export default MaxHeap;
