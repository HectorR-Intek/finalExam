import { maximalRectangle } from "./maxRectangle";

describe("maximalRectangle", () => {
  test("Empty matrix", () => {
    const mat: number[][] = [];
    expect(maximalRectangle(mat).area).toBe(0);
  });

  test("Onyl Zeros", () => {
    const mat = [
      [0, 0],
      [0, 0],
    ];
    expect(maximalRectangle(mat).area).toBe(0);
  });

  test("Only ones", () => {
    const mat = [
      [1, 1],
      [1, 1],
    ];
    const res = maximalRectangle(mat);
    expect(res.area).toBe(4);
    expect(res).toMatchObject({ top: 0, left: 0, bottom: 1, right: 1 });
  });

  test("rectangle 2x3", () => {
    const mat = [
      [1, 0, 1, 1],
      [1, 1, 1, 1],
      [1, 1, 1, 0],
    ];
    const res = maximalRectangle(mat);
    expect(res.area).toBe(6);
  });

  test("Area = 8", () => {
    const mat = [
      [1, 0, 1, 1, 1],
      [1, 1, 1, 1, 0],
      [1, 1, 1, 1, 0],
      [0, 1, 1, 0, 0],
    ];
    const res = maximalRectangle(mat);
    expect(res.area).toBe(8);
    expect(res).toMatchObject({ top: 1, left: 0, bottom: 2, right: 3 });
  });

  test("matriz con patrón alternado", () => {
    const mat = [
      [1, 0, 1, 0],
      [0, 1, 0, 1],
    ];
    const res = maximalRectangle(mat);
    expect(res.area).toBe(1);
  });
});
