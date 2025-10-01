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
});
