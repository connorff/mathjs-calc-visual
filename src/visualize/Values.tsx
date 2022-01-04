import { MathNode } from "mathjs";
import { ReactNode, useContext } from "react";
import { Row, Col } from "react-bootstrap";
import MathJax from "react-mathjax";
import { FnContext } from "../App";
import { FunctionType } from "../utils/constants";
import { getDescription, VisComponentProps } from "./utils";

type FnResultProps = {
  fn: MathNode;
  fnName: string;
  fnType: FunctionType;
  t: number;
};

const FnResult: React.FC<FnResultProps> = ({ fn, fnName, fnType, t }) => {
  let fnResult: number | ReactNode = <i>undefined</i>;
  let appendNode: ReactNode = '';
  try {
    fnResult = +fn.evaluate({ t }).toFixed(4);
  } catch {
    // Avoid errors if function is invalid
  }

  if (!isNaN(fnResult as number)) {
    appendNode = getDescription(fnType, t, fnResult as number);
  }

  return (
    <div className="pb-4">
      <MathJax.Provider>
        <Row>
          <Col>
            <MathJax.Node inline formula={`${fnName}(`} />
            {t}
            <MathJax.Node inline formula={`) =`} /> {fnResult}
          </Col>
          <Col>{appendNode}</Col>
        </Row>
      </MathJax.Provider>
    </div>
  );
};

const Values: React.FC<VisComponentProps> = ({ t }) => {
  const [position, velocity, acceleration] = useContext(FnContext);
  const fnsArr: [MathNode, string, FunctionType][] = [
    [position, "s", "position"],
    [velocity, "v", "velocity"],
    [acceleration, "a", "acceleration"],
  ];

  return (
    <MathJax.Provider>
      {fnsArr.map(([fn, fnName, fnType]) => (
        <FnResult
          fn={fn}
          fnName={fnName}
          fnType={fnType}
          t={t}
        />
      ))}
    </MathJax.Provider>
  );
};

export default Values;
