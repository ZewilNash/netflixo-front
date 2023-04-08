import Footer from "../../../components/layout/Footer";
import Layout from "../../../components/layout/Layout";
import AdminMenu from "../components/AdminMenu";
import ChangePasswordForm from "./ChangePasswordForm";

const ChangePassword = () => {
  return (
    <Layout title="Netflix - Admin Update Profile Page">
      <>
        <div className="container-fluid mt-4 admin__update__profile">
          <div className="row">
            <div className="col-md-3 mt-3">
              <AdminMenu />
            </div>
            <div className="col-md-8 mt-3">
              <ChangePasswordForm />
            </div>
          </div>
        </div>
        <Footer />
      </>
    </Layout>
  );
};

export default ChangePassword;
