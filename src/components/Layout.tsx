import Head from "next/head";
import NavBar from "./Navbar";
import Footer from "./Footer";

const Layout = ({ children }: { children: React.ReactNode }): JSX.Element => {
  return (
    <>
      <Head>
        <title>RocketMeet</title>
      </Head>
      <div className="d-flex flex-column root-container">
        <NavBar />
        <main>{children}</main>
        <Footer />
      </div>
    </>
  );
};

export default Layout;
