export function set(obj: any, path: string, value: any) {
  if (obj === null || (typeof obj !== "object" && typeof obj !== "function")) {
    throw new Error("Target must be an object, function or array");
  }

  if (!path) throw new Error("Path must not be empty or null");

  const parts = path.split(".");
  let current: any = obj;

  for (let i = 0; i < parts.length - 1; i++) {
    const key = parts[i];
    const next = current[key as string];

    if (next === null) {
      throw new Error(`Cannot deep assign inside null property "${key}"`);
    }

    if (typeof next === "undefined") {
      current[key as string] = {};
    } else if (typeof next !== "object" && typeof next !== "function") {
      throw new Error(
        `Assignment cannot be performed: property "${key}" is of type ${typeof next}`
      );
    }

    current = current[key as string];
  }

  const lastKey = parts[parts.length - 1];
  current[lastKey as string] = value;

  return obj;
}
