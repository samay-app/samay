import { Container, Nav, Navbar } from "react-bootstrap";
import { useRouter } from "next/router";
import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";

const NavBar = (): JSX.Element => {
  const router = useRouter();

  const { data: session } = useSession();

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
            {session && (
              <>
                <Link href="/new">
                  <a className="navbar-link new-poll">+ New poll</a>
                </Link>
                <Link href="/">
                  <a className="navbar-link">Dashboard</a>
                </Link>
                <a className="navbar-link" href="/guide">
                  Guide
                </a>
              </>
            )}
            {!session && router.pathname !== "/auth/signup" && (
              <Link href="/auth/signup">
                <a className="navbar-link">Sign up</a>
              </Link>
            )}
            {!session && router.pathname !== "/auth/signin" && (
              <a
                onClick={(): Promise<undefined> => signIn()}
                className="navbar-link"
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
                className="navbar-link"
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
