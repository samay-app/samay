import { Container, Nav, Navbar } from "react-bootstrap";
import { useRouter } from "next/router";
import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";

const NavBar = (): JSX.Element => {
  const router = useRouter();

  const { data: session } = useSession();

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
        <Navbar.Toggle
          aria-controls="basic-navbar-nav"
          className="kukkee-nav-hamburger"
        />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            {session && (
              <>
                <Link href="/new">
                  <a className="kukkee-nav-link nav-link new">+ New poll</a>
                </Link>
                <Link href="/">
                  <a className="kukkee-nav-link nav-link">Dashboard</a>
                </Link>
                <a className="kukkee-nav-link nav-link" href="/guide">
                  Guide
                </a>
              </>
            )}
            {!session && router.pathname !== "/auth/signup" && (
              <Link href="/auth/signup">
                <a className="kukkee-nav-link nav-link">Sign up</a>
              </Link>
            )}
            {!session && router.pathname !== "/auth/signin" && (
              <a
                onClick={(): Promise<undefined> => signIn()}
                className="kukkee-nav-link nav-link"
                aria-hidden="true"
              >
                Sign in
              </a>
            )}
            {session && (
              <a
                onClick={(): Promise<undefined> =>
                  signOut({ callbackUrl: "/auth/signin" })
                }
                className="kukkee-nav-link nav-link"
                aria-hidden="true"
              >
                Sign out
              </a>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
