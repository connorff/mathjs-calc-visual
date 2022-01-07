import { useContext } from "react";
import { FnContext } from "../App";
import Graph from "../graph/Graph";
import { AxisRange } from "../utils/constants";
import { VisComponentProps } from "./utils";

const Velocity: React.FC<VisComponentProps> = ({ t, setXRange }) => {
  const velocity = useContext(FnContext)[1];
  const handleRangeChange = (ranges: [AxisRange, AxisRange]) =>
    setXRange(ranges[0]);

  let point: [number, number] | undefined;
  try {
    point = [t, velocity.evaluate({ t })];
  } catch {
    // Avoid failing when function is invalid
  }

  return (
    <Graph
      functions={[velocity]}
      point={point}
      onRangeChange={handleRangeChange}
    />
  );
};

export default Velocity;
