import Layout from "../../../components/layout/Layout";
import Footer from "../../../components/layout/Footer";
import AdminMenu from "../components/AdminMenu";
import FavouriteList from "./FavouriteList";

const FavouriteMovies = () => {
  return (
    <Layout title="Netflix - Admin Favourite Movies">
      <>
        <div className="container-fluid mt-4">
          <div className="row">
            <div className="col-md-3 mt-3">
              <AdminMenu />
            </div>
            <div className="col-md-8 mt-3">
              <FavouriteList />
            </div>
          </div>
        </div>
        <Footer />
      </>
    </Layout>
  );
};

export default FavouriteMovies;
