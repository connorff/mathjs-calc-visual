import { useContext } from "react";
import { Card, Form, FormControl, InputGroup } from "react-bootstrap";
import MathJax from "react-mathjax";
import { FnContext } from "../App";
import { INDEPENDENT_VAR } from "../utils/constants";
import Function from "./Function";

type ExpressionsProps = {
  fn: string;
  setFn: (arg0: string) => void;
};

const Expressions: React.FC<ExpressionsProps> = ({ fn, setFn }) => {
  const [position, velocity, acceleration] = useContext(FnContext);

  return (
    <Card>
      <MathJax.Provider>
        <Form className="p-3">
          <InputGroup className="mb-5">
            <InputGroup.Text>
              <MathJax.Node inline formula={`s (${INDEPENDENT_VAR})=`} />
            </InputGroup.Text>
            <FormControl
              placeholder="Position function"
              aria-label="Position function"
              value={fn}
              onChange={(ev) => setFn(ev.target.value)}
            />
          </InputGroup>

          <Function name="Position" fnName="s" fn={position} />
          <Function name="Velocity" fnName="v" fn={velocity} />
          <Function name="Acceleration" fnName="a" fn={acceleration} />
        </Form>
      </MathJax.Provider>
    </Card>
  );
};

export default Expressions;
