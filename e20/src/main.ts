const stage = document.getElementById("stage") as HTMLElement;
const depthInput = document.getElementById("depth") as HTMLInputElement;
const depthVal = document.getElementById("depthVal") as HTMLElement;

function draw(depth: number): void {
  stage.replaceChildren();

  const W = stage.clientWidth;
  const H = stage.clientHeight;
  const size = W;
  const triH = (size * Math.sqrt(3)) / 2;

  const gapPct = 0.01;

  function placeTri(x: number, y: number, s: number): void {
    const h = (s * Math.sqrt(3)) / 2;
    const el = document.createElement("div");
    el.className = "tri";
    el.style.width = `${s}px`;
    el.style.height = `${h}px`;
    el.style.left = `${x}px`;
    el.style.top = `${y}px`;
    stage.appendChild(el);
  }

  function sub(x: number, y: number, s: number, d: number): void {
    if (d === 0) {
      placeTri(x, y, s);
      return;
    }
    const child = s / 2;
    const g = child * gapPct;

    sub(x + s / 4, y, child, d - 1); // superior
    sub(x, y + (child * Math.sqrt(3)) / 2, child, d - 1); // inferior izq
    sub(x + child, y + (child * Math.sqrt(3)) / 2, child, d - 1); // inferior der
  }

  const offsetY = (H - triH) / 2;
  sub(0, offsetY, size, depth);
}

function updateDepth(): void {
  const d = parseInt(depthInput.value, 10);
  depthVal.textContent = String(d);
  draw(d);
}

depthInput.addEventListener("input", updateDepth);

let rafId = 0;
const onResize = (): void => {
  cancelAnimationFrame(rafId);
  rafId = requestAnimationFrame(() => updateDepth());
};

new ResizeObserver(onResize).observe(stage);

window.addEventListener("load", () => {
  requestAnimationFrame(() => {
    updateDepth(); // ahora sí dibuja
  });
});
