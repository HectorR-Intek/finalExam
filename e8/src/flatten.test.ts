import { flatten, flattenFunctional } from "./flatten";

type TestCase = {
  name: string;
  input: any;
  parentName: string;
  expected: any;
};

const cases: TestCase[] = [
  {
    name: "no nesting",
    input: { a: 1, b: "x" },
    parentName: "",
    expected: { a: 1, b: "x" },
  },
  {
    name: "depth = 1",
    input: { a: 1, b: { c: 2 } },
    parentName: "",
    expected: { a: 1, b_c: 2 },
  },
  {
    name: "Deep nesting",
    input: { a: { b: { c: { d: 4 } } } },
    parentName: "",
    expected: { a_b_c_d: 4 },
  },
  {
    name: "Null values",
    input: { a: null, b: { c: null } },
    parentName: "",
    expected: { a: null, b_c: null },
  },
  {
    name: "Boolean values and numbers",
    input: { flag: true, nested: { count: 42 } },
    parentName: "",
    expected: { flag: true, nested_count: 42 },
  },
  {
    name: "Arrays are returned as values",
    input: { arr: [1, 2, 3], nested: { arr: [4, 5] } },
    parentName: "",
    expected: { arr: [1, 2, 3], nested_arr: [4, 5] },
  },
];

test.each(cases)(
  "flatten (imperative) - %s",
  ({ input, expected, parentName }) => {
    expect(flatten(input, parentName)).toEqual(expected);
  }
);

// Tests directos para flattenFunctional
test.each(cases)(
  "flattenFunctional (functional) - %s",
  ({ input, expected, parentName }) => {
    expect(flattenFunctional(input, parentName)).toEqual(expected);
  }
);
