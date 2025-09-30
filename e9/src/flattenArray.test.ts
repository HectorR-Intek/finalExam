import { flattenArray, flattenIterative } from "./flattenArray";

function runTests(fn: (arr: any[]) => any[]) {
  test("Flat array", () => {
    expect(fn([1, 2, 3])).toEqual([1, 2, 3]);
  });

  test("Depth = 1", () => {
    expect(fn([1, [2, 3], 4])).toEqual([1, 2, 3, 4]);
  });

  test("Deep nesting", () => {
    expect(fn([1, [2, [3, [4]]]])).toEqual([1, 2, 3, 4]);
  });

  test("Empty elements", () => {
    expect(fn([1, [], [2, []], 3])).toEqual([1, 2, 3]);
  });

  test("Null and undefined elements", () => {
    expect(fn([1, null, [undefined, 2]])).toEqual([1, null, undefined, 2]);
  });

  test("Empty input", () => {
    expect(fn([])).toEqual([]);
  });

  test("Throws error if input is not an array", () => {
    expect(() => fn(42 as unknown as any[])).toThrow();
  });
}

runTests(flattenArray);
runTests(flattenIterative);
