import { useState } from "react";
import { Card, Form, FormControl, InputGroup } from "react-bootstrap";
import { parse, derivative, MathNode } from "mathjs";
import MathJax from "react-mathjax";
import Function from "./Function";

export default function Expressions() {
  const [expression, setExpression] = useState<string>("");
  let [position, velocity, acceleration]: MathNode[] = Array(3).fill(parse(""));

  try {
    position = parse(expression);
    velocity = derivative(position, "x");
    acceleration = derivative(velocity, "x");
  } catch {
    // Leave expressions blank if invalid
  }

  return (
    <Card>
      <MathJax.Provider>
        <Form className="p-3">
          <InputGroup className="mb-5">
            <InputGroup.Text>
              <MathJax.Node inline formula={"f (x)="} />
            </InputGroup.Text>
            <FormControl
              placeholder="Position function"
              aria-label="Position function"
              value={expression}
              onChange={(ev) => setExpression(ev.target.value)}
            />
          </InputGroup>

          <Function name="Position" fnName='f' fn={position} />
          <Function name="Velocity" fnName='v' fn={velocity} />
          <Function name="Acceleration" fnName='a' fn={acceleration} />
        </Form>
      </MathJax.Provider>
    </Card>
  );
}
