import Link from "next/link";
import { Container, Nav, Navbar } from "react-bootstrap";

const NavBar = (): JSX.Element => {
  return (
    <Navbar className="rm-navbar" variant="light" expand="lg" collapseOnSelect>
      <Container className="rm-container">
        <Navbar.Brand href="/" className="rm-brand">
          <img
            alt="logo"
            src="/logo.svg"
            className="rm-logo-icon d-inline-block align-top"
          />
          RocketMeet
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls="basic-navbar-nav"
          className="rm-nav-hamburger"
        />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Link href="/#features" passHref>
              <Nav.Link className="rm-nav-link">Features</Nav.Link>
            </Link>
            <a
              className="rm-nav-link nav-link"
              href="https://rocketmeet.gitbook.io/rocketmeet/"
              rel="noreferrer"
              target="_blank"
            >
              Docs
            </a>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
