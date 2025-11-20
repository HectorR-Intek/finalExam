import { set } from "./deepObject";

// ---- Test Objects definition: ----

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

const secondTestObject = {
  aNumber: 5,
};

const thirdTestObject = {
  a: {
    b: {},
  },
};

//---- First test: ----
console.log("Before: ");
console.log(JSON.stringify(testObject));
console.log("");

set(testObject, "firstLayer3.secondLayer2.thirdLayer3.fourthLayer2", 42);
console.log("After:");
console.log(JSON.stringify(testObject));
console.log("-----");

//---- Second test: ----

console.log("Before: ");
console.log(JSON.stringify(secondTestObject));
console.log("");
set(secondTestObject, "aNumber", 76);
console.log("After: ");
console.log(JSON.stringify(secondTestObject));
console.log("-----");

// ---- Third test: ----

console.log("Before: ");
console.log(JSON.stringify(thirdTestObject));
console.log("");
set(thirdTestObject, "a.b.c.d", 42);
console.log("After: ");
console.log(JSON.stringify(thirdTestObject));
console.log("-----");

// ---- Last test (with error): ----

const obj = { path: null };
set(obj, "path.to", 42);
console.log(JSON.stringify(obj));

//set(testObject, "firstLayer2.secondLayer3", "Should not work");
