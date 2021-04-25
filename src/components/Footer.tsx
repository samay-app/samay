import { FaTwitter, FaGithub, FaGitter, FaLinkedin } from "react-icons/fa";
import { Container, Row, Col } from "react-bootstrap";

const Footer = (): JSX.Element => {
  return (
    <Container>
      <Row className="rm-footer">
        <Col className="footer-col footer-left">
          <h6>ROCKETMEET</h6>
          <ul>
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
        <Col className="footer-col footer-right">
          <h6>PAGES</h6>
          <ul>
            <li>
              <a href="/team" target="_blank" rel="noreferrer">
                Team
              </a>
            </li>
            <li>
              <a
                href="https://github.com/RocketMeet/RocketMeet-client/milestones"
                target="_blank"
                rel="noreferrer"
              >
                Roadmap
              </a>
            </li>
            <li>
              <a
                href="https://gitter.im/RocketMeet/community"
                rel="noreferrer"
                target="_blank"
              >
                Chatroom
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
              <a href="/terms-of-service" target="_blank" rel="noreferrer">
                Terms of Service
              </a>
            </li>
          </ul>
        </Col>
      </Row>
    </Container>
  );
};

export default Footer;
