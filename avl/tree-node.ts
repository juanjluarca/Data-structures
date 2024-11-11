export default class TreeNode<T> {
  public key: number;
  public data?: T;
  public left: TreeNode<T> | null = null;
  public right: TreeNode<T> | null = null;

  constructor(key: number, data?: T) {
    this.key = key;
    this.data = data;
    this.left = null;
    this.right = null;
  }

  public isLeaf(): boolean {
    return this.left === null && this.right === null;
  }

  public rotateRight(): TreeNode<T> {
    if (this.left === null) {
      return this;
    }

    const c = this.left;
    const pivot = this;

    pivot.left = c.right;
    c.right = pivot;

    return c;
  }

  public rotateLeft(): TreeNode<T> {
    if (this.right === null) {
      return this;
    }

    const c = this.right;
    const pivot = this;

    pivot.right = c.left;
    c.left = pivot;

    return c;
  }
}
