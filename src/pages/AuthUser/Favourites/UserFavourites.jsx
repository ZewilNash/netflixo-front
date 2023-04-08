import Footer from "../../../components/layout/Footer";
import Layout from "../../../components/layout/Layout";
import UserMenu from "../components/UserMenu";
import UserFavouriteList from "./UserFavouriteList";

const UserFavourites = () => {
  return (
    <Layout title="Netflix - User Favourit List">
      <>
        <div className="container-fluid mt-4">
          <div className="row">
            <div className="col-md-4 mt-3">
              <UserMenu />
            </div>
            <div className="col-md-8">
              <UserFavouriteList />
            </div>
          </div>
        </div>
        <Footer />
      </>
    </Layout>
  );
};

export default UserFavourites;
