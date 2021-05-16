import { FaTwitter, FaGithub, FaGitter, FaLinkedin } from "react-icons/fa";
import { Container, Row, Col } from "react-bootstrap";

const Footer = (): JSX.Element => {
  return (
    <footer className="rm-footer">
      <Container>
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
              <li>
                <p>
                  <span className="footer-text">
                    Copyright RocketMeet &#169; 2021.
                  </span>
                  <span className="footer-text">All rights reserved.</span>
                </p>
              </li>
            </ul>
            <div className="social-links">
              <a
                href="https://twitter.com/RocketMeetHQ"
                target="_blank"
                rel="noreferrer"
              >
                <FaTwitter />
              </a>
              <a
                href="https://www.linkedin.com/company/rocketmeet"
                rel="noreferrer"
                target="_blank"
              >
                <FaLinkedin />
              </a>
              <a
                href="https://github.com/RocketMeet"
                target="_blank"
                rel="noreferrer"
              >
                <FaGithub />
              </a>
              <a
                href="https://gitter.im/RocketMeet/community"
                target="_blank"
                rel="noreferrer"
              >
                <FaGitter />
              </a>
            </div>
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
                    Product Docs
                  </a>
                </li>
                <li>
                  <a
                    href="https://rocketmeet.gitbook.io/rocketmeet/"
                    rel="noreferrer"
                    target="_blank"
                  >
                    API Docs
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
              </ul>
            </Col>
            <Col className="footer-col footer-right">
              <h6>LEGAL</h6>
              <ul>
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
