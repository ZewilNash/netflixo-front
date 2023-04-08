import Layout from "../../../components/layout/Layout";
import Footer from "../../../components/layout/Footer";
import UserMenu from "../components/UserMenu";
import { useAuth } from "../../../context/auth";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
const UserDashboard = () => {
  const [loading, setLoading] = useState(false);
  const [auth, setAuth] = useAuth();
  const [image, setImage] = useState(null);
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("fullname", fullname);
      formData.append("email", email);
      formData.append("image", image);

      const { data } = await axios.put(
        `${process.env.API}/api/v1/auth/user/${auth?.user?._id}`,
        formData
      );

      if (data.success) {
        setAuth({
          ...auth,
          user: data.user
        });
        let updatedUser = JSON.parse(localStorage.getItem("auth"));
        updatedUser.user = data.user;
        localStorage.setItem("auth", JSON.stringify(updatedUser));

        toast.success(data.message);

        setFullname("");
        setEmail("");
        setImage(null);
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
    <Layout title="Netflix - User Dashboard">
      <>
        <div className="container-fluid mt-4" style={{ height: "100vh" }}>
          <div className="row">
            <div className="col-md-4 mt-3">
              <UserMenu />
            </div>
            <div className="col-md-8 mt-3">
              <div className="container-fluid">
                <div className="row">
                  <div className="col-md-12">
                    <h1>Profile</h1>
                  </div>
                </div>
              </div>

              <div className="container-fluid">
                <div className="row">
                  <div className="col-md-12">
                    <form onSubmit={handleSubmit}>
                      <div className="mb-3">
                        <label for="exampleInputEmail1" class="form-label">
                          Change Image
                        </label>
                        <input
                          onChange={({ target }) => setImage(target.files[0])}
                          type="file"
                          className="form-control"
                          id="exampleInputEmail1"
                          aria-describedby="emailHelp"
                        />
                      </div>
                      <div className="mb-3 display_user_image">
                        {image && (
                          <img
                            style={{ height: "150px" }}
                            src={URL.createObjectURL(image)}
                            alt=""
                          />
                        )}
                        {/* {auth?.user?.image && <img src={auth?.user?.image} alt="" />} */}
                      </div>
                      <div className="mb-3">
                        <label
                          for="exampleInputPassword1"
                          className="form-label"
                        >
                          Change Name
                        </label>
                        <input
                          name="name"
                          onChange={({ target }) => setFullname(target.value)}
                          placeholder={auth?.user?.fullname}
                          type="text"
                          className="form-control"
                          id="exampleInputPassword1"
                        />
                      </div>
                      <div className="mb-3">
                        <label
                          for="exampleInputPassword1"
                          className="form-label"
                        >
                          Change Email
                        </label>
                        <input
                          name="email"
                          onChange={({ target }) => setEmail(target.value)}
                          placeholder={auth?.user?.email}
                          type="email"
                          className="form-control"
                          id="exampleInputPassword1"
                        />
                      </div>
                      <button
                        disabled={loading}
                        style={{ width: "100%" }}
                        type="submit"
                        className="btn btn-success"
                      >
                        Update
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

export default UserDashboard;
