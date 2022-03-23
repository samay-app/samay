import { Container, Navbar } from "react-bootstrap";

const NavBar = (): JSX.Element => {
  return (
    <Navbar
      className="kukkee-navbar"
      variant="light"
      expand="lg"
      collapseOnSelect
    >
      <Container className="kukkee-container">
        <Navbar.Brand href="/" className="kukkee-brand">
          <img
            alt="logo"
            src="/Kukkee.svg"
            className="kukkee-logo-icon d-inline-block align-top"
          />
          Kukkee
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
};

export default NavBar;
