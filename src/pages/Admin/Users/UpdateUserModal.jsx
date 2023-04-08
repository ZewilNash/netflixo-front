import axios from "axios";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
// import { useAuth } from "../../../context/auth";

const UpdateUserModal = ({ user, getUsers }) => {
  console.log(user?.fullname, user?.email);
  // const [auth, setAuth] = useAuth();
  const [image, setImage] = useState(null);
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    getUsers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("fullname", fullname);
      formData.append("email", email);
      formData.append("image", image);

      const { data } = await axios.put(
        `${process.env.API}/api/v1/auth/admin/user/${user?._id}`,
        formData
      );

      if (data.success) {
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
    <div class="modal" id="updateuserModal" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Update User</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
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
                  value={fullname}
                  name="name"
                  placeholder={user?.fullname}
                  onChange={({ target }) => setFullname(target.value)}
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
                  value={email}
                  name="email"
                  placeholder={user?.email}
                  onChange={({ target }) => setEmail(target.value)}
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
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            {/* <button type="button" class="btn btn-primary">
              Save changes
            </button> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateUserModal;
