export function flattenArray(input: any[]) {
  if (!Array.isArray(input)) throw new Error("Input must be an array");

  let result: any[] = [];
  for (const el of input) {
    if (Array.isArray(el)) {
      const temp = flattenArray(el);
      result = [...result, ...temp];
    } else {
      result = [...result, el];
    }
  }
  return result;
}

export function flattenIterative(input: any[]) {
  if (!Array.isArray(input)) throw new Error("Input must be an array");
  let result: any[] = [];
  let stack = [...input];

  while (stack.length > 0) {
    let temp = stack.pop();

    if (Array.isArray(temp)) {
      stack.push(...temp);
    } else {
      result.push(temp);
    }
  }
  return result.reverse();
}
