import { longestRunOfTwoNumbers } from "./longestRun";

test.each([
  { inputString: "1212223311212223", expected: "1121222" },
  { inputString: "111", expected: "111" },
  { inputString: "1223334444", expected: "3334444" },
  { inputString: "451222334567", expected: "22233" },
  { inputString: "111555655565", expected: "555655565" },
])(
  "longestRunOfTwoNumbers returns the longest substring of, at most, two distinct digits",
  ({ inputString, expected }) => {
    expect(longestRunOfTwoNumbers(inputString)).toBe(expected);
  }
);

test.each([
  { inputString: "121343", expected: "121" },
  { inputString: "12125656", expected: "1212" },
])(
  "If there are two substrings of equal length, the first one is returned",
  ({ inputString, expected }) => {
    expect(longestRunOfTwoNumbers(inputString)).toBe(expected);
  }
);

test.each([
  { input: "123456", expected: "12" },
  { input: "75", expected: "75" },
  { input: "5", expected: "5" },
])(
  "If no digits are repeated, first (or first two if applicable) are returned",
  ({ input, expected }) => {
    expect(longestRunOfTwoNumbers(input)).toBe(expected);
  }
);

test("If input string has no elements an error is thrown", () => {
  expect(() => longestRunOfTwoNumbers("")).toThrow(
    "Input string must have at least one element"
  );
});

test("If input has non-numerical characters an error is thrown", () => {
  expect(() => longestRunOfTwoNumbers("abcde41231")).toThrow(
    "Input must only consist of numerical characters"
  );
});
