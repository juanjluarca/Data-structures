import Order from "./order";

class TreeNode {
  public data: Order;
  public left: TreeNode | null;
  public right: TreeNode | null;

  constructor(data: Order) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

export default TreeNode;
