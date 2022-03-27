import NavBar from "./Navbar";

const Layout = ({ children }: { children: React.ReactNode }): JSX.Element => {
  return (
    <>
      <div className="flex-wrapper">
        <NavBar />
        <main>{children}</main>
      </div>
    </>
  );
};

export default Layout;
