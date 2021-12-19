import { MathNode } from "mathjs";

export const getY = (fn: MathNode, x: number): number => {
  try {
    return fn.evaluate({ x });
  } catch {
    return 0;
  }
};
