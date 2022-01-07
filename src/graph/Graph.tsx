import Plot from "react-plotly.js";
import { range, MathNode } from "mathjs";
import { useState } from "react";
import { DEFAULT_RANGE, AxisRange, STEPS_PER_VIEW, GRAPH_HEIGHT } from "../utils/constants";
import { getY } from "./utils";

type GraphProps = {
  functions: MathNode[];
  point?: [number, number];
  onRangeChange?: (arg0: [AxisRange, AxisRange]) => void;
};

const Graph: React.FC<GraphProps> = ({ functions, point, onRangeChange }) => {
  const [xRange, setXRanges] = useState<AxisRange>(DEFAULT_RANGE);
  const [yRange, setYRanges] = useState<AxisRange>(DEFAULT_RANGE);

  const stepSize = (xRange[1] - xRange[0]) / STEPS_PER_VIEW;
  const xValues = range(xRange[0], xRange[1], stepSize).toArray();

  const data = functions.map((f) => ({
    x: xValues,
    y: xValues.map((x) => getY(f, x as number)),
    type: "line",
  }));

  if (point) {
    data.push({
      x: [point[0]],
      y: [point[1]],
      type: 'scatter'
    });
  };

  return (
    <Plot
      // @ts-ignore (@types/react-plotly.js is incorrect)
      data={data}
      layout={{
        margin: {
          l: 30,
          r: 0,
          b: 20,
          t: 0,
          pad: 0,
        },
        dragmode: "pan",
        yaxis: {
          range: yRange,
        },
        showlegend: false,
      }}
      style={{ width: "100%", height: GRAPH_HEIGHT }}
      config={{
        displayModeBar: true,
        responsive: true,
        scrollZoom: true,
        displaylogo: false,
        autosizable: false,
        modeBarButtonsToRemove: [
          "zoom2d",
          "autoScale2d",
          "resetScale2d",
          "pan2d",
        ],
      }}
      onRelayout={({
        "xaxis.range[0]": xmin,
        "xaxis.range[1]": xmax,
        "yaxis.range[0]": ymin,
        "yaxis.range[1]": ymax,
      }) => {
        const xRange = [xmin, xmax] as AxisRange;
        const yRange = [ymin, ymax] as AxisRange;
        if (xmin && xmax) setXRanges(xRange);
        if (ymin && ymax) setYRanges(yRange);

        if (onRangeChange) onRangeChange([xRange, yRange]);
      }}
    />
  );
};

export default Graph;
