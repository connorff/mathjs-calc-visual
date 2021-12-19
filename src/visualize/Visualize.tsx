import { useState } from "react";
import { Card, Row, Col, Form } from "react-bootstrap";
import MathJax from "react-mathjax";
import {
  AxisRange,
  DEFAULT_RANGE,
  STEPS_PER_VIEW,
  STEP_DEC_PLACES,
  VisualizerOptions,
} from "../utils/constants";

const Visualize = () => {
  const [xRange] = useState<AxisRange>([...DEFAULT_RANGE]);
  const [x, setX] = useState<number>(DEFAULT_RANGE[0]);
  const stepSize = (xRange[1] - xRange[0]) / STEPS_PER_VIEW;

  const [option, setOption] = useState<VisualizerOptions>("values");

  const handleSlide = (val: number) => {
    const rounded = +val.toFixed(STEP_DEC_PLACES);
    setX(rounded);
  };

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
        <Card.Footer>
          <Form.Label>
            <MathJax.Node inline formula={`s(t)`} /> at{" "}
            <MathJax.Node inline formula="t" /> = {x}
          </Form.Label>
          <Form.Range
            min={xRange[0]}
            max={xRange[1]}
            value={x}
            onChange={(e) => handleSlide(+e.target.value)}
            step={stepSize}
          />
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
