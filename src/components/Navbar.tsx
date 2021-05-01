import Link from "next/link";
import { Container, Nav, Navbar } from "react-bootstrap";

import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import Login from "./Login";

const NavBar = (): JSX.Element => {
  const isLoggedIn = useSelector(
    (state: RootState) => state.authReducer.isLoggedIn
  );

  return (
    <Navbar className="rm-navbar" variant="light" expand="lg">
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
            {isLoggedIn ? (
              <Link href="/dashboard" passHref>
                <Nav.Link className="rm-nav-link">Dashboard</Nav.Link>
              </Link>
            ) : (
              " "
            )}
            <Login btnStyle="rm-secondary-button-small" />
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
