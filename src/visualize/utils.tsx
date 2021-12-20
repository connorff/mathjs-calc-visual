import React from "react";
import { VisualizerOptions } from "../utils/constants";

export const VisualizeComponents: Record<VisualizerOptions, React.FC> = {
    "values": () => <div>Values</div>,
    "velocity": () => <div>Velocity</div>,
    "acceleration": () => <div>Acceleration</div>
};
