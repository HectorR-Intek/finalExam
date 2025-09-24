import { checkSorted, mergeArrays } from "./merger";

test("checkSorted returns true if array is sorted", () => {
  expect(checkSorted([1, 2, 3])).toBe(true);
});

test("checkSorted returns false if array is not sorted", () => {
  expect(checkSorted([1, 4, 3])).toBe(false);
});

test("mergeArrays returns error if largeArray cant fit smallArray", () => {
  expect(mergeArrays([1, 2, 3], [1, 2])).toBe(
    "largeArray must be able to contain small array"
  );
});

test("mergeArrays merges the arrays", () => {
  expect(mergeArrays([1, 2, 3].concat(new Array(2)), [4, 5])).toStrictEqual([
    1, 2, 3, 4, 5,
  ]);
});

test("mergeArrays returns sorted array", () => {
  expect(mergeArrays([1, 3, 5].concat(new Array(2)), [2, 4])).toStrictEqual([
    1, 2, 3, 4, 5,
  ]);
});

test("mergeArrays uses empty slots even if not consevutive", () => {
  expect(mergeArrays([1, , 3, , 5], [2, 4])).toStrictEqual([1, 2, 3, 4, 5]);
});
