import Head from "next/head";
import NavBar from "./Navbar";
import Footer from "./Footer";

const Layout = ({ children }: { children: React.ReactNode }): JSX.Element => {
  return (
    <>
      <Head>
        <title>RocketMeet</title>
        <link rel="shortcut icon" href="/logo.svg" />
        <meta name="google-site-verification" content="R6Lnd_cWOD3L1dBJGBnEzD5h2E2sNVpCHcPNsZqiQ7k" />
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
