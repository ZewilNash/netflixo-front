import "./styles.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Movies from "./pages/Movies/Movies";
import MovieDetails from "./pages/MovieDetail/MovieDetails";
import WatchPage from "./pages/WatchPage/WatchMain";
import AboutPage from "./pages/AboutPage";
import ContactUs from "./pages/ContactPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Admin/Dashboard/Dashboard";
import AllMovies from "./pages/Admin/AllMovies";
import AddMovie from "./pages/Admin/AddMovie/AddMovie";
import Categories from "./pages/Admin/Categories/Categories";
import Users from "./pages/Admin/Users/Users";
import UpdateProfile from "./pages/Admin/UpdateProfile/UpdateProfile";
import FavouriteMovies from "./pages/Admin/FavouriteMovies/FavouriteMovies";
import ChangePassword from "./pages/Admin/ChangePassword/ChangePassword";
import UserDashboard from "./pages/AuthUser/Dashboard/UserDashboard";
import UserChangePassword from "./pages/AuthUser/ChangePassword/UserChangePassword";
import UserFavourites from "./pages/AuthUser/Favourites/UserFavourites";
import SearchPage from "./pages/SearchPage/SeacrhPage";
import CastInfo from "./pages/CastInfo/CastInfo";
import UserViewProfile from "./pages/User/UserViewProfile";
import Experience from "./pages/Experience/Experience";
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "./context/auth";
import Messeging from "./pages/Messaging/Messeging";
import Stories from "./pages/Stories/Stories";
import socketIOClient from "socket.io-client";
const URL = "http://localhost:9000";
const socket = socketIOClient.connect(URL);

export default function App() {
  const [adminAuthOk, setAdminAuthOk] = useState(false);
  const [userAuthOk, setUserAuthOk] = useState(false);
  const [auth] = useAuth();
  useEffect(() => {
    const adminCheck = async () => {
      const { data } = await axios.get(
        `${process.env.API}/api/v1/auth/admin-auth`
      );
      console.log(data.ok);
      if (data.ok) {
        setAdminAuthOk(true);
      } else {
        setAdminAuthOk(false);
      }
    };
    // so axios get the token header
    if (auth?.token) adminCheck();
  }, [auth.token]);

  useEffect(() => {
    const authCheck = async () => {
      const { data } = await axios.get(
        `${process.env.API}/api/v1/auth/user-auth`,
        {
          headers: {
            Authorization: auth?.token
          }
        }
      );
      if (data.ok) {
        setUserAuthOk(true);
      } else {
        setUserAuthOk(false);
      }
    };
    // so axios get the token header
    if (auth?.token) authCheck();
  }, [auth.token]);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/watch/:id" element={<WatchPage />} />
        <Route path="/movies/:id" element={<MovieDetails />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/castInfo" element={<CastInfo />} />

        {/* <Route path="/user" element={<AuthRoute />}> */}
        <Route
          path="/user/dashboard"
          element={userAuthOk ? <UserDashboard /> : <Login />}
        />
        <Route
          path="/user/changePassword"
          element={userAuthOk ? <UserChangePassword /> : <Login />}
        />
        <Route
          path="/user/favourites"
          element={userAuthOk ? <UserFavourites /> : <Login />}
        />
        {/* </Route> */}

        {/* <Route path="" element={<AuthRoute />}> */}
        <Route
          path="/user/:id"
          element={userAuthOk ? <UserViewProfile /> : <Login />}
        />
        <Route
          path="/experience"
          element={userAuthOk ? <Experience /> : <Login />}
        />
        <Route
          path="/experience/:id"
          element={userAuthOk ? <Experience /> : <Login />}
        />
        <Route path="/stories" element={userAuthOk ? <Stories /> : <Login />} />

        <Route
          path="/chat/:from/:to"
          element={userAuthOk ? <Messeging socket={socket} /> : <Login />}
        />

        {/* </Route> */}

        {/* <Route path="/admin/" element={<AdminRoute />}> */}
        <Route
          path="/admin/changePass"
          element={adminAuthOk ? <ChangePassword /> : <Login />}
        />
        <Route
          path="/admin/favouriteMovies"
          element={adminAuthOk ? <FavouriteMovies /> : <Login />}
        />
        <Route
          path="/admin/updateProfile"
          element={adminAuthOk ? <UpdateProfile /> : <Login />}
        />
        <Route
          path="/admin/users"
          element={adminAuthOk ? <Users /> : <Login />}
        />
        <Route
          path="/admin/categories"
          element={adminAuthOk ? <Categories /> : <Login />}
        />
        <Route
          path="/admin/addMovie"
          element={adminAuthOk ? <AddMovie /> : <Login />}
        />
        <Route
          path="/admin/addMovie/:id"
          element={adminAuthOk ? <AddMovie /> : <Login />}
        />
        <Route
          path="/admin/dashboard"
          element={adminAuthOk ? <Dashboard /> : <Login />}
        />
        <Route
          path="/admin/AllMovies"
          element={adminAuthOk ? <AllMovies /> : <Login />}
        />
        {/* </Route> */}
      </Routes>
    </div>
  );
}
