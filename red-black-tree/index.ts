import RBTree from "./rb-tree";

function main() {
  const numbers = new RBTree<number>();
  numbers.insert(7);
  numbers.insert(2);
  numbers.insert(15);
  numbers.insert(4);
  numbers.insert(13);
  numbers.insert(17);
  numbers.insert(1);

  console.log(numbers.preorder());
  numbers.rotateRight()
  console.log(numbers.preorder());

}

main();
