import { Container, Row, Col } from "react-bootstrap";
import Link from "next/link";

const Footer = (): JSX.Element => {
  return (
    <footer className="kukkee-footer">
      <Container className="footer-container">
        <Row className="kukkee-footer-row">
          <Col className="footer-col footer-left">
            <div className="footer-logo">
              <img
                alt="logo"
                src="/Kukkee.svg"
                className="kukkee-logo-icon d-inline-block align-top"
              />
              Kukkee
            </div>
            <ul>
              <li className="footer-text">
                <p>Free and open source meeting scheduling tool</p>
              </li>
              <li className="footer-text">
                <p>Copyright &#169; 2022 Kukkee</p>
              </li>
            </ul>
          </Col>
          <Col className="right-container">
            <Col className="footer-col footer-right">
              <h6>CHECK OUT</h6>
              <ul>
                {/* <li>
                  <a href="https://gitter.im/Kukkee/community">Community</a>
                </li> */}
                <li>
                  <a href="https://github.com/Kukkee/Kukkee">GitHub</a>
                </li>
              </ul>
            </Col>
            <Col className="footer-col footer-right">
              <h6>GET STARTED</h6>
              <ul>
                <li>
                  <a href="https://github.com/Kukkee/Kukkee/issues/new?assignees=&labels=&template=feature_request.md&title=">
                    Request a feature
                  </a>
                </li>
                <li>
                  <a href="https://github.com/Kukkee/Kukkee/issues/new?assignees=&labels=&template=bug_report.md&title=">
                    Report a bug
                  </a>
                </li>
                <li>
                  <a href="https://github.com/Kukkee/Kukkee#self-host">
                    Self-host
                  </a>
                </li>
                <li>
                  <a href="https://github.com/Kukkee/Kukkee/blob/main/CONTRIBUTING.md">
                    Contribute
                  </a>
                </li>
              </ul>
            </Col>
            <Col className="footer-col footer-right">
              <h6>LEGAL</h6>
              <ul>
                <li>
                  <Link href="/privacy">Privacy</Link>
                </li>
                <li>
                  <a href="https://github.com/Kukkee/Kukkee/blob/main/LICENSE">
                    License
                  </a>
                </li>
                <li>
                  <Link href="mailto:anandbaburajan@gmail.com">Contact</Link>
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
