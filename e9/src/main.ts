import { flattenArray, flattenIterative } from "./flattenArray";

const input = [1, 2, 3, [4, 5, [6, [[7]], 8]], [9, 10]];
const input2 = [1, null, [undefined, 2]];

console.log(flattenArray(input2));

console.log(flattenIterative(input2));
/**
 * expected output:
 * [1,2,3,4,5,6,7,8,9,10]
 */
