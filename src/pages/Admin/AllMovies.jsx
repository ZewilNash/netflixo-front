import Footer from "../../components/layout/Footer";
import Layout from "../../components/layout/Layout";
import AdminMenu from "./components/AdminMenu";
import MoviesList from "./Dashboard/MoviesList";

const AllMovies = () => {
  return (
    <Layout title="Netflix - Admin All Movies">
      <div className="container-fluid mt-4">
        <div className="row">
          <div className="col-md-4 mt-3">
            <AdminMenu />
          </div>
          <div className="col-md-8 mt-3">
            <div className="row mb-4">
              <div className="col-md-8">
                <h1>Movies List</h1>
              </div>
              <div className="col-md-4">
                <button className="btn btn-outline-danger">Remove All</button>
              </div>
            </div>
            <MoviesList />
          </div>
        </div>
      </div>
      <Footer></Footer>
    </Layout>
  );
};

export default AllMovies;
