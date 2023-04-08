import Footer from "../../../components/layout/Footer";
import Layout from "../../../components/layout/Layout";
import AdminMenu from "../components/AdminMenu";
import DashboardHeader from "./DashboardHeader";
import MoviesList from "./MoviesList";

const Dashboard = () => {
  return (
    <Layout title="Netflix - Admin Dashboard">
      <div className="container-fluid mt-4">
        <div className="row">
          <div className="col-md-4 mt-3">
            <AdminMenu />
          </div>
          <div className="col-md-8 mt-3">
            <DashboardHeader />
            <MoviesList />
          </div>
        </div>
      </div>
      <Footer></Footer>
    </Layout>
  );
};

export default Dashboard;
