import { maximalRectangle } from "./maxRectangle";

const mat = [
  [1, 1, 1, 0, 1],
  [0, 1, 1, 0, 1],
  [1, 1, 1, 1, 0],
  [1, 1, 1, 0, 1],
];

console.log(maximalRectangle(mat));
