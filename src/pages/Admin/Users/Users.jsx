import Footer from "../../../components/layout/Footer";
import Layout from "../../../components/layout/Layout";
import AdminMenu from "../components/AdminMenu";
import UserList from "./UserList";

const Users = () => {
  return (
    <Layout title="Netflix - Admin Users List">
      <>
        <div className="container-fluid mt-4">
          <div className="row">
            <div className="col-md-3 mt-3">
              <AdminMenu />
            </div>
            <div className="col-md-8 mt-3">
              <UserList />
            </div>
          </div>
        </div>
        <Footer />
      </>
    </Layout>
  );
};

export default Users;
