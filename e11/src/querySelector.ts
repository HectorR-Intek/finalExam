export function querySelectorAll(
  selector: string,
  root: ParentNode = document
): Element[] {
  const indexComb = selector.indexOf("<");
  if (indexComb === -1) {
    return Array.from(root.querySelectorAll(selector));
  }
  if (selector.indexOf("<", indexComb + 1) !== -1) {
    throw new SyntaxError("Only one combinator < is allowed");
  }

  const parentSel = selector.slice(0, indexComb).trim();
  const childSel = selector.slice(indexComb + 1).trim();
  if (!parentSel || !childSel) {
    throw new SyntaxError("Parent or child selector are missing");
  }

  const parents = root.querySelectorAll(parentSel);
  const matchedParents: Element[] = [];

  parents.forEach((parent) => {
    const children = Array.from(parent.children);
    if (
      children.length > 0 &&
      children.every((child) => (child as Element).matches(childSel))
    ) {
      matchedParents.push(parent);
    }
  });

  return matchedParents;
}
