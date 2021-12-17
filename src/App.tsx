import { Navbar, Container } from "react-bootstrap";
import { Github, GraphUpArrow } from "react-bootstrap-icons";
import { GITHUB_REPO, ICON_WIDTH, PROJECT_NAME } from "./utils/constants";

function App() {
  return (
    <>
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
    </>
  );
}

export default App;
