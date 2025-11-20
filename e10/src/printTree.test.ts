import { printTree, TraversalOrder } from "./printTree";

const btree = "(A,(B,(D),(E)),(C,(F,(H),(I)),(G,,(J))))";
describe("printTree", () => {
  const cases: { order: TraversalOrder; expected: string[] }[] = [
    {
      order: "pre",
      expected: ["A", "B", "D", "E", "C", "F", "H", "I", "G", "J"],
    },
    {
      order: "in",
      expected: ["D", "B", "E", "A", "H", "F", "I", "C", "G", "J"],
    },
    {
      order: "post",
      expected: ["D", "E", "B", "H", "I", "F", "J", "G", "C", "A"],
    },
  ];

  it.each(cases)("to be traversed in $order order", ({ order, expected }) => {
    expect(printTree(btree, order)).toEqual(expected);
  });

  it("should return [] for empty input string", () => {
    expect(printTree("", "pre")).toEqual([]);
  });

  it("traverses over binary trees that have a root but no children", () => {
    expect(printTree("(A)", "pre")).toEqual(["A"]);
  });

  it("traverses over valid binary trees that have root and only empty children", () => {
    expect(printTree("(A,)", "in")).toEqual(["A"]);
    expect(printTree("(A,,)", "post")).toEqual(["A"]);
  });

  it("throws error if there is no root value in the binary tree", () => {
    expect(() => printTree("(A,B)", "post")).toThrow(
      `Invalid structure: missing explicit root before children`
    );
  });

  it("throws error if the structure is not properly balanced", () => {
    expect(() => printTree("((A)", "pre")).toThrow("Invalid structure");
  });
});
