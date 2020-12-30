import Head from "next/head";
import { Container } from "react-bootstrap";
import NavBar from "./navbar";
import Footer from "./footer";

const Layout = ({ children }: { children: React.ReactNode }): JSX.Element => {
  return (
    <Container className="p-0" fluid>
      <Head>
        <title>RocketMeet</title>
      </Head>
      <NavBar />
      <main style={{ flex: "1 1 auto", paddingLeft: "4vw" }}>{children}</main>
      <Footer />
    </Container>
  );
};

export default Layout;
