import Head from "next/head";
import NavBar from "./navbar";
import Footer from "./footer";

const Layout = ({ children }: { children: React.ReactNode }): JSX.Element => {
  return (
    <>
      <Head>
        <title>RocketMeet</title>
      </Head>
      <div className="d-flex flex-column" style={{ minHeight: "100vh" }}>
        <NavBar />
        <main
          style={{
            flex: "1 1 auto",
            paddingLeft: "4vw",
            paddingRight: "4vw",
          }}
        >
          {children}
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Layout;
