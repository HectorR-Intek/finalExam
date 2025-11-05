import { isSameLevel, TreeNode } from "./isSameLevel";

const testTree = new TreeNode(0, [
  new TreeNode(1),
  new TreeNode(2, [
    new TreeNode(1),
    new TreeNode(5, [
      new TreeNode(3),
      new TreeNode(5, [new TreeNode(6)]),
      new TreeNode(9),
    ]),
  ]),
  new TreeNode(3, [new TreeNode(0)]),
  new TreeNode(5),
  new TreeNode(7, [
    new TreeNode(3, [
      new TreeNode(3),
      new TreeNode(0, [new TreeNode(9), new TreeNode(4)]),
    ]),
  ]),
]);

console.log(isSameLevel(testTree, 1, 0));
