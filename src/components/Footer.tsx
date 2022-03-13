import { Container, Row, Col } from "react-bootstrap";

const Footer = (): JSX.Element => {
  return (
    <footer className="rm-footer">
      <Container className="footer-container">
        <Row className="rm-footer-row">
          <Col className="footer-col footer-left">
            <div className="footer-logo">
              <img
                alt="logo"
                src="/logo.svg"
                className="rm-logo-icon d-inline-block align-top"
              />
              RocketMeet
            </div>
            <ul>
              <li>
                <p>
                  <span className="footer-text">
                    Free and open source meeting scheduling tool.
                  </span>
                </p>
              </li>
            </ul>
          </Col>
          <Col className="right-container">
            <Col className="footer-col footer-right">
              <h6>PAGES</h6>
              <ul>
                <li>
                  <a
                    href="https://rocketmeet.gitbook.io/rocketmeet/"
                    rel="noreferrer"
                    target="_blank"
                  >
                    Join our Gitter
                  </a>
                </li>
                <li>
                  <a href="/team" target="_blank" rel="noreferrer">
                    Contributors
                  </a>
                </li>
                <li>
                  <a
                    href="https://rocketmeet.gitbook.io/rocketmeet/"
                    rel="noreferrer"
                    target="_blank"
                  >
                    GitHub
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com/RocketMeet/RocketMeet-client/milestones"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Donate
                  </a>
                </li>
              </ul>
            </Col>
            <Col className="footer-col footer-right">
              <h6>GET STARTED</h6>
              <ul>
                <li>
                  <a
                    href="https://github.com/RocketMeet/RocketMeet-client/blob/main/README.md"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Self-hosting Guide
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com/RocketMeet/RocketMeet-client/blob/main/CONTRIBUTING.md"
                    rel="noreferrer"
                    target="_blank"
                  >
                    Contribution Guide
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com/RocketMeet/RocketMeet-client/issues/new?assignees=&labels=&template=bug_report.md&title="
                    rel="noreferrer"
                    target="_blank"
                  >
                    Bug Report
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com/RocketMeet/RocketMeet-client/issues/new?assignees=&labels=&template=feature_request.md&title="
                    rel="noreferrer"
                    target="_blank"
                  >
                    Feature Request
                  </a>
                </li>
              </ul>
            </Col>
            <Col className="footer-col footer-right">
              <h6>LEGAL</h6>
              <ul>
                <li>
                  <a href="/privacy-policy" target="_blank" rel="noreferrer">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com/RocketMeet/RocketMeet-client/blob/main/CODE_OF_CONDUCT.md"
                    rel="noreferrer"
                    target="_blank"
                  >
                    Code of Conduct
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com/RocketMeet/RocketMeet-client/blob/main/LICENSE"
                    rel="noreferrer"
                    target="_blank"
                  >
                    License
                  </a>
                </li>
              </ul>
            </Col>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
