import { printTree } from "./printTree";

/** Tree:
 *              A
 *            /   \
 *           B     C
 *         /  \   /  \
 *        D    E F    G
 *              / \    \
 *             H   I    J
 */
const bTree = "(A,(B,(D),(E)),(C,(F,(H),(I)),(G,,(J))))";
/**
 * (VAL, LN, RN)
 * VAL = Value [A-Za-z0-9]+
 * LN = Left Node
 * RN = Right Node
 */
/**
 * @param {String} tree
 * @param {String} order  'infix' (default) | 'prefix' | 'postfix'
 */

console.log(printTree(bTree, "post"));

const secondValidTree = "((A)";
console.log(printTree(secondValidTree, "in"));

const firstInvalidTree = "(A, B)";
console.log(printTree(firstInvalidTree, "pre"));
