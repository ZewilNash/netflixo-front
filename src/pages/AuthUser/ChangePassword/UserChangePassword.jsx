import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import Footer from "../../../components/layout/Footer";
import Layout from "../../../components/layout/Layout";
import { useAuth } from "../../../context/auth";
import UserMenu from "../components/UserMenu";

const UserChangePassword = () => {
  const [loading, setLoading] = useState(false);
  const [auth] = useAuth();
  const [profile, setProfile] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  const handleChange = (e) => {
    setProfile((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value
      };
    });
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `${process.env.API}/api/v1/auth/user-update-pass/${auth?.user?._id}`,
        profile
      );
      if (data.success) {
        toast.success(data.message);
        setProfile((prev) => {
          return {
            ...prev,
            newPassword: "",
            oldPassword: "",
            confirmPassword: ""
          };
        });
        setLoading(false);
      } else {
        toast.error(data.message);
        setLoading(false);
      }
    } catch (error) {
      toast.error(error.message);
      setLoading(false);
    }
  };
  return (
    <Layout title="Netflix - User Update Password">
      <>
        <div className="container-fluid mt-4">
          <div className="row">
            <div className="col-md-4 mt-3">
              <UserMenu />
            </div>
            <div className="col-md-8 mt-3">
              <div className="container-fluid mb-4">
                <div className="row">
                  <div className="col-md-12">
                    <h1>Change Password</h1>
                  </div>
                </div>
              </div>

              <div className="container-fluid">
                <div className="row">
                  <div className="col-md-12">
                    <form onSubmit={handleSubmit}>
                      <div class="mb-3">
                        <label for="exampleInputPassword1" class="form-label">
                          Previous Password
                        </label>
                        <input
                          name="oldPassword"
                          value={profile.oldPassword}
                          onChange={handleChange}
                          type="password"
                          class="form-control"
                          id="exampleInputPassword1"
                        />
                      </div>
                      <div class="mb-3">
                        <label for="exampleInputPassword1" class="form-label">
                          New Password
                        </label>
                        <input
                          name="newPassword"
                          value={profile.newPassword}
                          onChange={handleChange}
                          type="password"
                          class="form-control"
                          id="exampleInputPassword1"
                        />
                      </div>
                      <div class="mb-3">
                        <label for="exampleInputPassword1" class="form-label">
                          Confirm Password
                        </label>
                        <input
                          name="confirmPassword"
                          value={profile.confirmPassword}
                          onChange={handleChange}
                          type="password"
                          class="form-control"
                          id="exampleInputPassword1"
                        />
                      </div>
                      <button
                        disabled={loading}
                        style={{ width: "100%" }}
                        type="submit"
                        class="btn btn-success"
                      >
                        Update Password
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </>
    </Layout>
  );
};

export default UserChangePassword;
