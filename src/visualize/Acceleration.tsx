import { useContext } from "react";
import { FnContext } from "../App";
import Graph from "../graph/Graph";
import { AxisRange } from "../utils/constants";
import { VisComponentProps } from "./utils";

const Acceleration: React.FC<VisComponentProps> = ({ t, setXRange }) => {
  const acceleration = useContext(FnContext)[2];
  const handleRangeChange = (ranges: [AxisRange, AxisRange]) =>
    setXRange(ranges[0]);

  let point: [number, number] | undefined;
  try {
    point = [t, acceleration.evaluate({ t })];
  } catch {
    // Avoid failing when function is invalid
  }

  return (
    <Graph
      functions={[acceleration]}
      point={point}
      onRangeChange={handleRangeChange}
    />
  );
};

export default Acceleration;
