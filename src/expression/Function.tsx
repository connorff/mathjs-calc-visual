import { MathNode } from "mathjs";
import { Form, Row, Col } from "react-bootstrap";
import MathJax from "react-mathjax";

type FunctionProps = {
  name: string;
  fnName: string;
  fn: MathNode;
};

const Function: React.FC<FunctionProps> = ({ name, fnName, fn }) => (
  <Form.Group as={Row} className="mb-4">
    <Form.Label column sm="4">
      <b>{name} function</b>
    </Form.Label>
    <Col sm="8">
      <MathJax.Node inline formula={`${fnName} (x)= ${fn.toTex()}`} />
    </Col>
  </Form.Group>
);

export default Function;
