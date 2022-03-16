import { Container, Nav, Navbar } from "react-bootstrap";
import Link from "next/link";

const NavBar = (): JSX.Element => {
  return (
    <Navbar className="kukkee-navbar" variant="light" expand="lg" collapseOnSelect>
      <Container className="kukkee-container">
        <Navbar.Brand href="/" className="kukkee-brand">
          <img
            alt="logo"
            src="/logo.svg"
            className="kukkee-logo-icon d-inline-block align-top"
          />
          Kukkee
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls="basic-navbar-nav"
          className="kukkee-nav-hamburger"
        />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <a href="/features" className="kukkee-nav-link nav-link">
              Features
            </a>
            <a
              className="kukkee-nav-link nav-link"
              href="https://github.com/Kukkee/Kukkee"
            >
              GitHub
            </a>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
