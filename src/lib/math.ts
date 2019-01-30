export const dist = (x1: number, y1: number, x2: number, y2: number) =>
  Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));

export const random = (low: number, high?: number) => {
  const h: number = high === undefined ? low : high;
  const l: number = high === undefined ? 0 : low;
  return (h - l) * Math.random() + l;
};
