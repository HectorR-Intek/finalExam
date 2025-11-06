export function flattenArray(input: any[]) {
  if (!Array.isArray(input)) throw new Error("Input must be an array");

  let result: any[] = [];

  for (const el of input) {
    if (Array.isArray(el)) {
      result.push(...flattenArray(el));
    } else {
      result.push(el);
    }
  }
  return result;
}

export function flattenIterative(input: any[]): any[] {
  if (!Array.isArray(input)) throw new Error("Input must be an array");

  const result: any[] = [];
  const stack: any[] = [{ arr: input, index: 0 }];

  while (stack.length > 0) {
    const top = stack[stack.length - 1];

    if (top.index >= top.arr.length) {
      stack.pop();
      continue;
    }

    const value = top.arr[top.index++];
    if (Array.isArray(value)) {
      stack.push({ arr: value, index: 0 });
    } else {
      result.push(value);
    }
  }

  return result;
}
