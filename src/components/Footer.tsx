import { Container, Row, Col } from "react-bootstrap";
import Link from "next/link";

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
                    Free and open source meeting scheduling tool
                  </span>
                </p>
              </li>
              <li>
                <p>
                  <span className="footer-text">
                    Copyright &#169; 2022 RocketMeet
                  </span>
                </p>
              </li>
              <li>
                <a
                  className="footer-text donate"
                  href="https://github.com/RocketMeet/RocketMeet-client/milestones"
                >
                  Donate
                </a>
              </li>
            </ul>
          </Col>
          <Col className="right-container">
            <Col className="footer-col footer-right">
              <h6>CHECK OUT</h6>
              <ul>
                <li>
                  <Link href="/features" passHref>
                    Features
                  </Link>
                </li>
                <li>
                  <a href="https://rocketmeet.gitbook.io/rocketmeet/">
                    Community
                  </a>
                </li>
                <li>
                  <a href="https://github.com/rocketmeet/">GitHub</a>
                </li>
              </ul>
            </Col>
            <Col className="footer-col footer-right">
              <h6>GET STARTED</h6>
              <ul>
                <li>
                  <a href="https">Request a feature</a>
                </li>
                <li>
                  <a href="https://github.com">Report a bug</a>
                </li>
                <li>
                  <a href="https://githu">Self-host</a>
                </li>
                <li>
                  <a href="https://github.com">Contribute</a>
                </li>
              </ul>
            </Col>
            <Col className="footer-col footer-right">
              <h6>LEGAL</h6>
              <ul>
                <li>
                  <Link href="/privacy" passHref>
                    Privacy
                  </Link>
                </li>
                <li>
                  <a href="https://github.com/Roc">License</a>
                </li>
                <li>
                  <Link href="/contact" passHref>
                    Contact
                  </Link>
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
