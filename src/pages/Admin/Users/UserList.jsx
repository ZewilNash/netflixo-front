import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import moment from "moment";
import UpdateUserModal from "./UpdateUserModal";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [userToUpdate, setUserToUpdate] = useState(null);
  useEffect(() => {
    const getUsers = async () => {
      try {
        const { data } = await axios.get(
          `${process.env.API}/api/v1/auth/users`
        );
        if (data.success) {
          setUsers(data.users);
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        toast.error(error.message);
      }
    };

    getUsers();
  }, []);

  const getAllUsers = async () => {
    try {
      const { data } = await axios.get(`${process.env.API}/api/v1/auth/users`);
      if (data.success) {
        setUsers(data.users);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const getUserWithId = async (id) => {
    try {
      const { data } = await axios.get(
        `${process.env.API}/api/v1/auth/single-user/${id}`
      );
      if (data.success) {
        setUserToUpdate(data.user);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleDeleteUser = async (id) => {
    try {
      const { data } = await axios.delete(
        `${process.env.API}/api/v1/auth/user/${id}`
      );
      if (data.success) {
        toast.success(data.message);
        getAllUsers();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      <div className="container-fluid mt-4 mb-3">
        <div className="row">
          <div className="col-md-12">
            <h1>Users List</h1>
          </div>
        </div>
      </div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <table class="table mt-4">
              <thead>
                <tr>
                  <th scope="col">Image</th>
                  <th scope="col">ID</th>
                  <th scope="col">Date</th>
                  <th scope="col">Full Name</th>
                  <th scope="col">Email</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody className="overflow-y-scroll">
                {users?.map((user) => (
                  <tr>
                    <td>
                      <img
                        style={{ width: "60px", height: "60px" }}
                        src={`${process.env.API}/api/v1/auth/user-image/${user._id}`}
                        alt=""
                      />
                    </td>
                    <td>{user?._id}</td>
                    <td>{moment(user?.createdAt).fromNow()}</td>
                    <td>{user?.fullname}</td>
                    <td>{user?.email}</td>
                    <td className="d-flex">
                      <button
                        data-bs-toggle="modal"
                        data-bs-target="#updateuserModal"
                        className="btn btn-success"
                        onClick={() => getUserWithId(user._id)}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteUser(user?._id)}
                        className="mx-3 btn btn-danger"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <UpdateUserModal getUsers={getAllUsers} user={userToUpdate} />
    </>
  );
};

export default UserList;
