import Link from "next/link";
import { Nav, Navbar } from "react-bootstrap";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import Login from "./Login";

const NavBar = (): JSX.Element => {
  const isLoggedIn = useSelector(
    (state: RootState) => state.authReducer.isLoggedIn
  );

  return (
    <Navbar className="rm-navbar" variant="light" expand="lg">
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
          {isLoggedIn ? (
            <Link href="/dashboard" passHref>
              <Nav.Link className="rm-nav-link">Dashboard</Nav.Link>
            </Link>
          ) : (
            " "
          )}
          <Login />
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;
