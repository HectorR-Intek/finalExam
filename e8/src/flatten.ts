type PlainValue = string | number | boolean | null | undefined;

type AnyObject = {
  [key: string]: PlainValue | AnyObject;
};

export function flatten(
  oldObject: AnyObject,
  parentName = ""
): Record<string, PlainValue> {
  let result: Record<string, PlainValue> = {};

  for (const prop in oldObject) {
    const newKey = parentName ? `${parentName}_${prop}` : prop;
    if (
      typeof oldObject[prop] === "object" &&
      oldObject[prop] !== null &&
      !Array.isArray(oldObject[prop])
    ) {
      const temp = flatten(oldObject[prop], newKey);
      for (const nestedProp in temp) {
        result[nestedProp] = temp[nestedProp];
      }
    } else {
      result[newKey] = oldObject[prop] as PlainValue;
    }
  }
  return result;
}

export function flattenFunctional(
  oldObject: AnyObject,
  parent = ""
): Record<string, PlainValue> {
  return Object.entries(oldObject).reduce((acc, [key, value]) => {
    const newKey = parent ? `${parent}_${key}` : key;

    if (typeof value === "object" && value !== null && !Array.isArray(value)) {
      Object.assign(acc, flattenFunctional(value, newKey));
    } else {
      acc[newKey] = value;
    }
    return acc;
  }, {} as Record<string, PlainValue>);
}
