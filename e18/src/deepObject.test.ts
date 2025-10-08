import { set } from "./deepObject";

test("Simple assignation", () => {
  const obj = {
    testNumber: 5,
  };
  set(obj, "testNumber", 7);
  expect(obj.testNumber).toBe(7);
});

test("Deep assignation", () => {
  const obj = {
    first: {
      second: {
        third: 5,
      },
    },
  };
  set(obj, "first.second.third", 42);
  expect(obj.first.second.third).toBe(42);
});

test("Creation of missing properties", () => {
  const obj = {
    a: {
      b: {},
    },
  };
  set(obj, "a.b.c.d", 42);
  expect(obj.a.b.c.d).toBe(42);
});

test("Tryng to access properties from primitive data types", () => {
  const objString = {
    a: "this string has no properties",
  };

  const objNumber = {
    a: 54,
  };

  expect(() => {
    set(objString, "a.b.c", 55);
  }).toThrow();

  expect(() => {
    set(objNumber, "a.b.c", 55);
  }).toThrow();
});

test("Empty or null paths", () => {
  const obj = { a: 5 };

  expect(() => {
    set(obj, "", 53);
  }).toThrow();

  expect(() => {
    set(obj, null, 52);
  }).toThrow();
});

test("Null object", () => {
  expect(() => {
    set(null, "a.b.c", 5);
  }).toThrow();
});
