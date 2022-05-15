import { Container, Nav, Navbar } from "react-bootstrap";
import Link from "next/link";

const NavBar = (): JSX.Element => {
  return (
    <Navbar className="navbar" variant="light" expand="lg" collapseOnSelect>
      <Container className="global-container">
        <Navbar.Brand href="/">
          <img alt="logo" src="/logo.svg" className="navbar-logo" />
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls="basic-navbar-nav"
          className="navbar-hamburger"
        />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Link href="/">
              <a className="navbar-link">+ New poll</a>
            </Link>
            <Link href="/">
              <a className="navbar-link">Your polls</a>
            </Link>
            <Link href="/">
              <a className="navbar-link">How-to</a>
            </Link>
            <Link href="/">
              <a className="navbar-link">GitHub</a>
            </Link>
            <Link href="/">
              <a className="navbar-link">Privacy</a>
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
