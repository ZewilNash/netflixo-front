import { Link } from "react-router-dom";
import { useAuth } from "../../../context/auth";

const AdminMenu = () => {
  const [auth] = useAuth();
  return (
    <div class="card">
      <ul class="list-group list-group-flush">
        <Link to="/admin/dashboard">
          <li class="list-group-item">Dashboard</li>
        </Link>
        <Link to="/admin/allMovies">
          <li class="list-group-item">Movies List</li>
        </Link>
        <Link to="/admin/addMovie">
          <li class="list-group-item">Add Movie</li>
        </Link>
        {/* <Link to="/admin/categories">
          <li class="list-group-item">Categories</li>
        </Link> */}
        <Link to="/admin/users">
          <li class="list-group-item">Users</li>
        </Link>
        <Link to="/admin/updateProfile">
          <li class="list-group-item">Update Profile</li>
        </Link>
        <Link to="/admin/favouriteMovies">
          <li class="list-group-item">Favourite Movies</li>
        </Link>
        <Link to="/admin/changePass">
          <li class="list-group-item">Change Password</li>
        </Link>
        <Link to={`/user/${auth?.user?._id}`}>
          <li class="list-group-item">View Profile</li>
        </Link>
      </ul>
    </div>
  );
};

export default AdminMenu;
