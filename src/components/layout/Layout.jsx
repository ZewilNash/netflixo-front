import { Helmet } from "react-helmet";
import Header from "./Header";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Layout = ({ title, children }) => {
  return (
    <>
      <div className="app">
        <Helmet>
          <meta charSet="utf-8" />
          <meta
            name="keywords"
            content="movies,netflix,watch,series,top,star,cinema,actor"
          />
          <title>{title}</title>
          <meta name="description" content="Netflex App Full Featured" />
        </Helmet>
        <Header />
        {children}
      </div>
      <ToastContainer />
    </>
  );
};

export default Layout;
