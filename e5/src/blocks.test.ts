import { reverseBlocks } from "./blocks";

test("reverseBlocks returns error if blockSize is greater than arrays length", () => {
  expect(reverseBlocks([0, 1, 2], 4)).toBe(
    "blockSize has to be lesser than the array's length"
  );
});

test.each([
  { arr: [0, 1], blockSize: 2, expected: [1, 0] },
  { arr: [0, 1, 2, 3, 4], blockSize: 3, expected: [2, 1, 0, 3, 4] },
  { arr: [0, 1, 2, 3, 4, 5], blockSize: 3, expected: [2, 1, 0, 5, 4, 3] },
  { arr: [0, 1, 2], blockSize: 1, expected: [0, 1, 2] },
  { arr: [0, 1, 2], blockSize: 3, expected: [2, 1, 0] },
  { arr: [1], blockSize: 1, expected: [1] },
])(
  "reverseBlocks performs succesfully for different positive values of blockSize",
  ({ arr, blockSize, expected }) => {
    expect(reverseBlocks(arr, blockSize)).toStrictEqual(expected);
  }
);

test.each([
  { arr: [], blockSize: 0, expected: "blockSize has to be greater than zero" },
  { arr: [], blockSize: -5, expected: "blockSize has to be greater than zero" },
])(
  "reverseBlocks returns error for non-positive values of blockSize",
  ({ arr, blockSize, expected }) => {
    expect(reverseBlocks(arr, blockSize)).toBe(expected);
  }
);
