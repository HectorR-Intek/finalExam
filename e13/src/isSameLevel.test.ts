import { TreeNode, isSameLevel } from "./isSameLevel";

test("nodes are the same depth", () => {
  const root = new TreeNode(1, [
    new TreeNode(2),
    new TreeNode(3),
    new TreeNode(4, [new TreeNode(5), new TreeNode(6)]),
  ]);

  expect(isSameLevel(root, 2, 3)).toBe(
    "Numbers 2 and 3 were found at depth: 1"
  );
  expect(isSameLevel(root, 5, 6)).toBe(
    "Numbers 5 and 6 were found at depth: 2"
  );
});

test("nodes are note at the same depth", () => {
  const root = new TreeNode(1, [
    new TreeNode(2),
    new TreeNode(3, [new TreeNode(4)]),
  ]);

  expect(isSameLevel(root, 1, 2)).toBe(
    "Numbers 1 and 2 were not found at the same depth"
  );
  expect(isSameLevel(root, 3, 4)).toBe(
    "Numbers 3 and 4 were not found at the same depth"
  );
});

test("One of the nodes does not exist", () => {
  const root = new TreeNode(1, [new TreeNode(2), new TreeNode(3)]);

  expect(isSameLevel(root, 2, 99)).toBe(
    "At least one of the numbers was not found"
  );
});

test("Neither of the nodes exist", () => {
  const root = new TreeNode(1);

  expect(isSameLevel(root, 42, 99)).toBe(
    "At least one of the numbers was not found"
  );
});

test("Throws error for null root", () => {
  () => expect(isSameLevel(null, 1, 2)).toThrow();
});
