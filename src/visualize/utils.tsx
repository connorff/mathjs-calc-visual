import React from "react";
import { FunctionType, VisualizerOptions } from "../utils/constants";
import Values from "./Values";

export type VisComponentProps = {
  t: number;
};

export const VisualizeComponents: Record<
  VisualizerOptions,
  React.FC<VisComponentProps>
> = {
  values: Values,
  velocity: () => <div>Velocity</div>,
  acceleration: () => <div>Acceleration</div>,
};

type Sign = "positive" | "negative" | "0";
const getSign = (value: number): Sign =>{
  if (value === 0) {
    return "0";
  }
  else if (value > 0) {
    return "positive";
  }
  else {
    return "negative";
  };
};

const adjectives: Record<FunctionType, Record<Sign, string>> = {
  position: {
    "0": "0",
    "positive": "positive",
    "negative": "negative"
  },
  velocity: {
    "0": "at an extremum",
    "positive": "increasing",
    "negative": "decreasing",
  },
  acceleration: {
    "0": "at an inflection point",
    "positive": "concave up",
    "negative": "concave down"
  }
}

const adjectiveColors: Record<Sign, string> = {
  "0": "orange",
  "positive": "green",
  "negative": "red",
};

export const getDescription = (fn: FunctionType, param: number, value: number) => {
  const sign = getSign(value);
  const adjective = adjectives[fn][sign];
  const adjectiveNode = <span style={{ color: adjectiveColors[sign] }}>{adjective}</span>;

  return <div>Because the {fn} function is {sign} at {param}, the position graph is {adjectiveNode}</div>;
}
