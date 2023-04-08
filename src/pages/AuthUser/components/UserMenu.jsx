import { Link } from "react-router-dom";
import { useAuth } from "../../../context/auth";

const UserMenu = () => {
  const [auth] = useAuth();
  return (
    <div class="card">
      <ul class="list-group list-group-flush">
        <Link to="/user/dashboard">
          <li class="list-group-item">Profile</li>
        </Link>
        <Link to="/user/favourites">
          <li class="list-group-item">Favourites</li>
        </Link>
        <Link to="/user/changePassword">
          <li class="list-group-item">Change Password</li>
        </Link>
        <Link to={`/user/${auth?.user?._id}`}>
          <li class="list-group-item">View Profile</li>
        </Link>
      </ul>
    </div>
  );
};

export default UserMenu;
