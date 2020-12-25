import Head from "next/head";
import { Container } from "react-bootstrap";
import NavBar from "./navbar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Container>
      <Head>
        <NavBar />
      </Head>
      <main>{children}</main>
      <footer>Footer</footer>
    </Container>
  );
};

export default Layout;
