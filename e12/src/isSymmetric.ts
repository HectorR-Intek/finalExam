import { parseTree, TreeNode } from "./printTree";

function isSymmetric(root: TreeNode | null): boolean {
  if (!root) return true;

  function isMirror(t1: TreeNode | null, t2: TreeNode | null): boolean {
    if (!t1 && !t2) return true;
    if (!t1 || !t2) return false;
    return (
      t1.value === t2.value &&
      isMirror(t1.left, t2.right) &&
      isMirror(t1.right, t2.left)
    );
  }

  return isMirror(root.left, root.right);
}

const symTree = "(A,(B,(C),(D)),(B,(D),(C)))";
const rootSym = parseTree(symTree);

console.log("Symmetrical:", isSymmetric(rootSym));

const nonSymTree = "(A,(B,,(C)),(B,,(C)))";
const rootNonSym = parseTree(nonSymTree);

console.log("Not symmetrical:", isSymmetric(rootNonSym));
