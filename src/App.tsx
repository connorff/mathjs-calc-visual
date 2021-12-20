import { Navbar, Container, Col, Row, Card } from "react-bootstrap";
import { Github, GraphUpArrow } from "react-bootstrap-icons";
import Graph from "./graph/Graph";
import Expressions from "./expression/Expressions";
import {
  GITHUB_REPO,
  ICON_WIDTH,
  INDEPENDENT_VAR,
  PROJECT_NAME,
} from "./utils/constants";
import { MathNode, parse, derivative } from "mathjs";
import { createContext, useState } from "react";
import Visualize from "./visualize/Visualize";
import "./App.css";

export const FnContext = createContext<MathNode[]>([]);

function App() {
  const [expression, setExpression] = useState<string>("");
  let [position, velocity, acceleration]: MathNode[] = Array(3).fill(parse(""));

  try {
    position = parse(expression);
    velocity = derivative(position, INDEPENDENT_VAR);
    acceleration = derivative(velocity, INDEPENDENT_VAR);
  } catch {
    // Leave expressions blank if invalid
  }

  const fns = [position, velocity, acceleration];

  return (
    <FnContext.Provider value={fns}>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand>
            <GraphUpArrow size={ICON_WIDTH} />
            <span style={{ marginLeft: "10px" }}>{PROJECT_NAME}</span>
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
              <a href={GITHUB_REPO} target="_blank" rel="noreferrer">
                <Github size={ICON_WIDTH} />
              </a>
            </Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container className="h-100">
        <Row className="align-items-center mh-75 gy-4 mt-1 mt-md-0">
          <Col sm={12} md={8}>
            <Expressions fn={expression} setFn={setExpression} />
          </Col>
          <Col sm={12} md={4}>
            <Card>
              <Card.Header>Position function graph</Card.Header>
              <Graph functions={[position]} />
            </Card>
          </Col>
        </Row>
        <Row className="justify-content-center mh-25 mt-3 mt-md-0">
          <Col sm={12} md={10}>
            <Visualize />
          </Col>
        </Row>
      </Container>
    </FnContext.Provider>
  );
}

export default App;
