import { MathNode } from "mathjs";
import { INDEPENDENT_VAR } from "../utils/constants";

export const getY = (fn: MathNode, x: number): number => {
  try {
    return fn.evaluate({ [INDEPENDENT_VAR]: x });
  } catch {
    return 0;
  }
};
