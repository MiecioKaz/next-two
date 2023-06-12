import Footer from "./Footer";
import Navbar from "./Navbar";
import Petrow from "./Petrow";

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Petrow />
      <Navbar />
      <main className="flex-auto mt-44 md:mt-48 bg-slate-50">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
