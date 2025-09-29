import { flattenArray } from "./flattenArray";

const input = [1, 2, 3, [4, 5, [6, [[7]], 8]], [9, 10]];

flattenArray(input);
/**
 * expected output:
 * [1,2,3,4,5,6,7,8,9,10]
 */
