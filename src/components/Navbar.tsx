import { Container, Nav, Navbar } from "react-bootstrap";
import {
  PlusCircle,
  Lock,
  Grid,
  Github,
  QuestionCircle,
} from "react-bootstrap-icons";
import Link from "next/link";
import { useRouter } from "next/router";

const NavBar = (): JSX.Element => {
  const router = useRouter();

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
              <a
                className={`navbar-link ${
                  router.pathname === "/" ? ` active` : ``
                }`}
              >
                <PlusCircle className="navbar-link-icon" /> New poll
              </a>
            </Link>
            <Link href="/recent-polls">
              <a
                className={`navbar-link ${
                  router.pathname === "/recent-polls" ? ` active` : ``
                }`}
              >
                <Grid className="navbar-link-icon" /> Recent polls
              </a>
            </Link>
            <Link href="/how-to">
              <a
                className={`navbar-link ${
                  router.pathname === "/how-to" ? ` active` : ``
                }`}
              >
                <QuestionCircle className="navbar-link-icon" /> How-to
              </a>
            </Link>
            <Link href="https://github.com/AnandBaburajan/Kukkee">
              <a className="navbar-link">
                <Github className="navbar-link-icon" /> GitHub
              </a>
            </Link>
            <Link href="/privacy">
              <a
                className={`navbar-link ${
                  router.pathname === "/privacy" ? ` active` : ``
                }`}
              >
                <Lock className="navbar-link-icon" /> Privacy
              </a>
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
