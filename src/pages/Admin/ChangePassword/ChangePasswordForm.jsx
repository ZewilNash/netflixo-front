import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import { useAuth } from "../../../context/auth";

const ChangePasswordForm = () => {
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
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `${process.env.API}/api/v1/auth/admin-update-pass/${auth?.user?._id}`,
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
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
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
    </>
  );
};

export default ChangePasswordForm;
