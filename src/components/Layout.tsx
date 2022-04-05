import NavBar from "./Navbar";

const Layout = ({ children }: { children: React.ReactNode }): JSX.Element => {
  return (
    <>
      <div className="global-flex-wrapper">
        <NavBar />
        <main>{children}</main>
      </div>
    </>
  );
};

export default Layout;
