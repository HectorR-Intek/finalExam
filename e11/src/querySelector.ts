export function querySelectorAll(
  selector: string,
  root: ParentNode = document
): Element[] {
  const indexComb = selector.indexOf("<");
  if (indexComb === -1) {
    throw new SyntaxError('Selector must contain combinator "<" (ej: "A < B")');
  }
  if (selector.indexOf("<", indexComb + 1) !== -1) {
    throw new SyntaxError("Only one combinator < is allowed");
  }

  const parentSel = selector.slice(0, indexComb).trim();
  const childSel = selector.slice(indexComb + 1).trim();
  if (!parentSel || !childSel) {
    throw new SyntaxError("Parent or child selector are missing");
  }

  const children = root.querySelectorAll(childSel);
  const setParents = new Set<Element>();

  children.forEach((child) => {
    const p = (child as Element).parentElement;
    if (p && p.matches(parentSel)) {
      setParents.add(p);
    }
  });

  return Array.from(setParents);
}
