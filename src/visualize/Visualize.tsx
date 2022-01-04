import { useEffect, useState } from "react";
import { Card, Row, Col, Form } from "react-bootstrap";
import { Pause, Play } from "react-bootstrap-icons";
import MathJax from "react-mathjax";
import {
  AxisRange,
  DEFAULT_RANGE,
  RUNNING_STEPS_PER_VIEW,
  STEPS_PER_VIEW,
  STEP_DEC_PLACES,
  VisualizerOptions,
} from "../utils/constants";
import { VisualizeComponents } from "./utils";

const round = (num: number) => +num.toFixed(STEP_DEC_PLACES);

const Visualize = () => {
  const [xRange] = useState<AxisRange>([...DEFAULT_RANGE]);
  const [x, setX] = useState<number>(DEFAULT_RANGE[0]);
  const [isRunning, setIsRunning] = useState(false);
  const [option, setOption] = useState<VisualizerOptions>("values");

  const range = xRange[1] - xRange[0];
  const stepSize = range / STEPS_PER_VIEW;

  const handleSlide = (val: number) => setX(round(val));

  const handleRunToggle = () => {
    if (x >= xRange[1]) {
      setX(xRange[0]);
    } else {
      setX(+x.toFixed(STEP_DEC_PLACES - 2));
    }

    setIsRunning(!isRunning);
  };

  useEffect(() => {
    if (isRunning) {
      if (x >= xRange[1]) {
        setIsRunning(false);
      } else {
        const step = stepSize * RUNNING_STEPS_PER_VIEW;

        setTimeout(() => setX(round(x + step)), step * 1000);
      }
    }
  }, [x, isRunning, stepSize, xRange]);

  const iconProps = {
    size: 25,
    style: { cursor: "pointer" },
    onClick: handleRunToggle,
  };

  const BodyComponent = VisualizeComponents[option];

  return (
    <Card className="mb-5">
      <MathJax.Provider>
        <Card.Header>
          <Row className="align-items-center">
            <Col>Visualize!</Col>
            <Col sm={4} lg={3} style={{ textAlign: "right" }}>
              <Form.Select
                aria-label="visualize-options"
                value={option}
                onChange={(e) => setOption(e.target.value as VisualizerOptions)}
              >
                <option value="values">Values</option>
                <option value="velocity">Velocity</option>
                <option value="acceleration">Acceleration</option>
              </Form.Select>
            </Col>
          </Row>
        </Card.Header>
        <Card.Body>
          <BodyComponent t={x} />
        </Card.Body>
        <Card.Footer>
          <Form.Label>
            <MathJax.Node inline formula={`s(t)`} /> at{" "}
            <MathJax.Node inline formula="t" /> = {x}
          </Form.Label>
          <Row>
            <Col xs="auto">
              {isRunning ? <Pause {...iconProps} /> : <Play {...iconProps} />}
            </Col>
            <Col>
              <Form.Range
                min={xRange[0]}
                max={xRange[1]}
                value={x}
                onChange={(e) => handleSlide(+e.target.value)}
                step={stepSize}
              />
            </Col>
          </Row>
          <div className="text-secondary">
            Pan/Zoom the velocity or acceleration graph to change the bounds of{" "}
            <MathJax.Node inline formula="t" />
          </div>
        </Card.Footer>
      </MathJax.Provider>
    </Card>
  );
};

export default Visualize;
