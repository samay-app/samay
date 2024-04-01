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
import { useState, useEffect } from "react";
import LogoSVG from "./LogoSVG";

const NavBar = (): JSX.Element => {
  const router = useRouter();

  const [samayNewVisitor, setSamayNewVisitor] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setSamayNewVisitor(!localStorage.getItem("samayNewVisitor"));
    }
  }, [setSamayNewVisitor]);

  return (
    <Navbar className="navbar" variant="light" expand="lg" collapseOnSelect>
      <Container className="global-container">
        <Navbar.Brand href="/" className="navbar-brand">
          <LogoSVG className="navbar-logo" />
          <span className="navbar-logo-text">samay</span>
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
                className={`navbar-link how-to-link ${
                  samayNewVisitor ? "how-to-link-new-visitor" : ""
                } ${router.pathname === "/how-to" ? ` active` : ``}`}
              >
                <QuestionCircle
                  className={`navbar-link-icon ${
                    samayNewVisitor ? "how-to-link-new-visitor" : ""
                  }`}
                />{" "}
                How-to
                {samayNewVisitor && <span className="beacon" />}
              </a>
            </Link>
            <Link href="https://github.com/samay-app/samay">
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
