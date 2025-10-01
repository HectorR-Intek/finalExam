import { parseTree } from "./printTree";
import { isSymmetric } from "./isSymmetric";

describe("isSymmetric", () => {
  it("should return true for a symmetric tree", () => {
    const symTree = "(1,(2,(3),(4,(5),)),(2,(4,,(5)),(3)))";
    const root = parseTree(symTree);
    expect(isSymmetric(root)).toBe(true);
  });

  it("should return false for a non-symmetric tree", () => {
    const nonSymTree = "(A,(B,,(C)),(B,,(C)))";
    const root = parseTree(nonSymTree);
    expect(isSymmetric(root)).toBe(false);
  });

  it("should return true for an empty tree", () => {
    const root = parseTree("");
    expect(isSymmetric(root)).toBe(true);
  });

  it("should return true for a single-node tree", () => {
    const root = parseTree("(A,,)");
    expect(isSymmetric(root)).toBe(true);
  });

  it("should return false for an asymmetric deeper tree", () => {
    const deeperTree = "(A,(B,(C),(D)),(B,(D),(E)))";
    const root = parseTree(deeperTree);
    expect(isSymmetric(root)).toBe(false);
  });
});
