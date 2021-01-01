import Link from "next/link";
import { Nav, Navbar } from "react-bootstrap";
import Login from "./Login";

const NavBar = (): JSX.Element => {
  return (
    <Navbar bg="light" expand="lg" fixed="top">
      <Navbar.Brand href="#home">
        <img
          alt=""
          src="../static/rocket.svg"
          width="35"
          height="35"
          className="d-inline-block align-top"
        />{" "}
        Rocketmeet
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Link href="/dashboard" passHref>
            <Nav.Link>dashboard</Nav.Link>
          </Link>
          <Link href="/help" passHref>
            <Nav.Link>help</Nav.Link>
          </Link>
        </Nav>
        <Nav className="justify-content-end">
          <Login />
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;
