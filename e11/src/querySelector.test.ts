import { querySelectorAll as qsaEnhanced } from "./querySelector";

test("Selects parent if a child matches requirement", () => {
  document.body.innerHTML = `
    <section>
      <div id="n1" class="note"><input class="is-complete" checked /></div>
      <div id="n2" class="note"></div>
      <div id="n3" class="note"><input class="is-complete" checked /></div>
    </section>
  `;
  const res = qsaEnhanced("div.note < input.is-complete[checked]");
  expect(res.map((el) => el.id)).toEqual(["n1", "n3"]);
});

test("Applies only to direct children, no grandchildren", () => {
  document.body.innerHTML = `
    <div id="p"><span><input class="is-complete" checked /></span></div>
  `;
  const res = qsaEnhanced("div < input.is-complete[checked]");
  expect(res).toHaveLength(0);
});

test("Does not repeat if multiple children match", () => {
  document.body.innerHTML = `
    <section id="s">
      <h2 class="hit"></h2>
      <h2 class="hit"></h2>
    </section>
  `;
  const res = qsaEnhanced("section < h2.hit");
  expect(res).toHaveLength(1);
  expect(res[0].id).toBe("s");
});

test("Returns empty array if no matches are found", () => {
  document.body.innerHTML = `<div class="note"><input /></div>`;
  const res = qsaEnhanced("div.note < input.is-complete[checked]");
  expect(res).toEqual([]);
});

test("Throws syntaxError if combinator < is not found", () => {
  document.body.innerHTML = `<div class="note"></div>`;
  expect(() => qsaEnhanced("div.note input.is-complete")).toThrow(SyntaxError);
});
