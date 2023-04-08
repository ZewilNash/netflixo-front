import Footer from "../../../components/layout/Footer";
import Layout from "../../../components/layout/Layout";
import AdminMenu from "../components/AdminMenu";
import UpdateProfileForm from "./UpdateProfileForm";

const UpdateProfile = () => {
  return (
    <Layout title="Netflix - Admin Update Profile Page">
      <>
        <div className="container-fluid mt-4 admin__update__profile">
          <div className="row">
            <div className="col-md-3 mt-3">
              <AdminMenu />
            </div>
            <div className="col-md-8 mt-3">
              <UpdateProfileForm />
            </div>
          </div>
        </div>
        <Footer />
      </>
    </Layout>
  );
};

export default UpdateProfile;
