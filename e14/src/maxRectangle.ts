export type Rect = {
  area: number;
  top: number;
  left: number;
  bottom: number;
  right: number;
};

export function maximalRectangle(matrix: number[][]): Rect {
  const rows = matrix.length;
  if (rows === 0) return { area: 0, top: -1, left: -1, bottom: -1, right: -1 };
  const cols = matrix[0]!.length;
  if (cols === 0) return { area: 0, top: -1, left: -1, bottom: -1, right: -1 };

  const heights = Array<number>(cols).fill(0);
  let best: Rect = { area: 0, top: -1, left: -1, bottom: -1, right: -1 };

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      heights[c] = matrix[r][c] === 1 ? heights[c] + 1 : 0;
    }

    const stack: number[] = [];

    for (let i = 0; i <= cols; i++) {
      const currentHeight = i < cols ? heights[i] : 0;

      while (stack.length && currentHeight < heights[stack[stack.length - 1]]) {
        const hIdx = stack.pop()!;
        const h = heights[hIdx];
        const leftIdx = stack.length ? stack[stack.length - 1] : -1;
        const rightIdx = i;

        const width = rightIdx - leftIdx - 1;
        const area = h * width;

        if (area > best.area) {
          const bottom = r;
          const top = r - h + 1;
          const left = leftIdx + 1;
          const right = rightIdx - 1;
          best = { area, top, left, bottom, right };
        }
      }
      stack.push(i);
    }
  }
  return best;
}
