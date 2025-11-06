const testObject = {
  firstLayer1: "FL1",
  firstLayer2: "FL2",
  firstLayer3: {
    secondLayer1: "SL1",
    secondLayer2: {
      thirdLayer1: "TL1",
      thirdLayer2: "TL2",
      thirdLayer3: {
        fourthLayer1: "FL1",
      },
    },
  },
};

const anotherTestObject = {
  numero: 5,
};

console.log("Before: ");
console.log(JSON.stringify(testObject));
console.log("-----");

export function set(obj: object, path: string, value: any) {
  if (obj === null) throw new Error("Object must not be null");
  if (path.length === 0 || path === null)
    throw new Error("Path must not be empty or null");
  const parts = path.split(".");
  let current = obj;

  for (let i = 0; i < parts.length - 1; i++) {
    const part = parts[i];

    if (current[part] === null || typeof current[part] === "undefined") {
      current[part] = {};
    } else if (typeof current[part] !== "object") {
      throw new Error(
        `Assignment cannot be performed: type of ${part} is ${typeof current[
          part
        ]}`
      );
    }
    current = current[part];
  }
  current[parts[parts.length - 1]] = value;
  return obj;
}
/*
set(testObject, "firstLayer3.secondLayer2.thirdLayer3.fourthLayer2", 42);

console.log("After:");
console.log(JSON.stringify(testObject));

//set(testObject, "firstLayer2.secondLayer3", "Should not work");

set(anotherTestObject, "numero", 76);
console.log(JSON.stringify(anotherTestObject)); */

const obj = {
  a: {
    b: {},
  },
};

//set(null, "a.b.c.d", 42);
//console.log(JSON.stringify(obj));

const objTwo = {
  path: null,
};

set(objTwo, "", 42);
