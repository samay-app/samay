import NavBar from "./Navbar";
import BottomNav from "./BottomNav";

const Layout = ({ children }: { children: React.ReactNode }): JSX.Element => {
  return (
    <>
      <div className="global-flex-wrapper">
        <NavBar />
        <main>{children}</main>
        <BottomNav />
      </div>
    </>
  );
};

export default Layout;
