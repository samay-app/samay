import Head from "next/head";
import NavBar from "./Navbar";
import Footer from "./Footer";

const Layout = ({ children }: { children: React.ReactNode }): JSX.Element => {
  return (
    <>
      <Head>
        <title>RocketMeet</title>
        <link rel="shortcut icon" href="/logo.svg" />
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="google-site-verification"
          content="R6Lnd_cWOD3L1dBJGBnEzD5h2E2sNVpCHcPNsZqiQ7k"
        />
      </Head>
      <NavBar />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
