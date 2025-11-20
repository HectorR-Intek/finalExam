import { balanceArray } from "./balanceArray";

describe("balanceArray.ts", () => {
  it("finds the balance index for succesful cases ", () => {
    const test1 = [10, 1, 2, 3, 4];
    const test2 = [2, 4, 6, 8, 1, 2, 2, 15];
    const test3 = [0, 0, 0, 0];
    const test4 = [1, -1, 0];
    const test5 = [1, 2, 3, 4, 9, 9, 2, 7, 10, 13];
    const test6 = [1, 2, 3, 3, 2, 1];

    expect(balanceArray(test1)).toBe(0);
    expect(balanceArray(test2)).toBe(3);
    expect(balanceArray(test3)).toBe(0);
    expect(balanceArray(test4)).toBe(1);
    expect(balanceArray(test5)).toBe(6);
    expect(balanceArray(test6)).toBe(2);
  });

  it("returns -1 when input array cant be balanced ", () => {
    const test1 = [1, 2, 3, 4, 5];
    const test2 = [0, 10, 20];
    const test3 = [2, 2, 2, 2, 2];

    expect(balanceArray(test1)).toBe(-1);
    expect(balanceArray(test2)).toBe(-1);
    expect(balanceArray(test3)).toBe(-1);
  });

  it("throws error for empty arrays ", () => {
    () => expect(balanceArray([])).toThrow();
  });

  it("throws error for arrays that have no numbers ", () => {
    const test2 = ["hello world", "Houston, we have a problem"];
    () => expect(balanceArray(test2 as any)).toThrow();
  });

  it("throws error for objects that are not arrays ", () => {
    const test3 = "";
    () => expect(balanceArray(test3 as any)).toThrow();
  });
});
