import { set } from "./deepObject";

describe("Function set ", () => {
  it("performs Simple assignation", () => {
    const obj = {
      testNumber: 5,
    };
    set(obj, "testNumber", 7);
    expect(obj.testNumber).toBe(7);
  });

  it("performs Deep assignation", () => {
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

  it("creates missing properties", () => {
    const obj: any = {
      a: {
        b: {},
      },
    };
    set(obj, "a.b.c.d", 42);
    expect(obj.a.b.c.d).toBe(42);
  });

  it("can modify or create properties that belong to functions", () => {
    const testFunction: any = function (x: number) {
      const exponent = 2;
      return x ** 2;
    };

    const secondTestFunction: any = function () {
      const aNumber = 55;
      return aNumber;
    };

    set(testFunction, "exponent", 3);
    expect(testFunction.exponent).toBe(3);

    set(secondTestFunction, "aString", "recently added property");
    expect(secondTestFunction.aString).toBe("recently added property");
  });

  it("can modify or generate properties inside an array", () => {
    const testArray: any[] = [];
    set(testArray, "0.name", "Silvana");
    expect(testArray[0].name).toBe("Silvana");

    const secondTestArray = [2, 3, 5, 6];
    set(secondTestArray, "3", 7);
    expect(secondTestArray[3]).toBe(7);
  });

  it("throws error if you try to access properties from primitive data types", () => {
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

  it("throws error for empty or null paths", () => {
    const obj = { a: 5 };

    expect(() => {
      set(obj, "", 53);
    }).toThrow();

    expect(() => {
      set(obj, null as any, 52);
    }).toThrow();
  });

  it("throws error for null objects", () => {
    expect(() => {
      set(null, "a.b.c", 5);
    }).toThrow();
  });
});
