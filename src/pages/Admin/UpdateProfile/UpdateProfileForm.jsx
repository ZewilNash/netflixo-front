import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import { useAuth } from "../../../context/auth";

const UpdateProfileForm = () => {
  const [auth, setAuth] = useAuth();
  const [image, setImage] = useState(null);
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
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
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
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
              <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">
                  Change Image
                </label>
                <input
                  onChange={({ target }) => setImage(target.files[0])}
                  type="file"
                  class="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                />
              </div>
              <div class="mb-3 display_user_image">
                {image && (
                  <img
                    style={{ height: "150px" }}
                    src={URL.createObjectURL(image)}
                    alt=""
                  />
                )}
                {/* {auth?.user?.image && <img src={auth?.user?.image} alt="" />} */}
              </div>
              <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label">
                  Change Name
                </label>
                <input
                  name="name"
                  onChange={({ target }) => setFullname(target.value)}
                  placeholder={auth?.user?.fullname}
                  type="text"
                  class="form-control"
                  id="exampleInputPassword1"
                />
              </div>
              <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label">
                  Change Email
                </label>
                <input
                  name="email"
                  onChange={({ target }) => setEmail(target.value)}
                  placeholder={auth?.user?.email}
                  type="email"
                  class="form-control"
                  id="exampleInputPassword1"
                />
              </div>
              <button
                style={{ width: "100%" }}
                type="submit"
                class="btn btn-success"
              >
                Update
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="container-fluid mt-3">
        <div className="row">
          <div className="col-md-12">
            <button
              style={{ width: "100%" }}
              type="submit"
              class="btn btn-danger"
            >
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateProfileForm;
