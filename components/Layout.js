import Footer from "./Footer";
import Navbar from "./Navbar";

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-auto mt-24 bg-slate-50">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
