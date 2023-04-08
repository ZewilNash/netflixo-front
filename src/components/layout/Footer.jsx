import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/auth";
import Logo from "../../images/netflix.png";
const Footer = ({ setFilteredMovies }) => {
  const [auth] = useAuth();
  const [movies, setMovies] = useState([]);

  const getCategory = movies?.map((movie) => {
    return movie?.category;
  });

  const unique_category = [...new Set(getCategory)];

  useEffect(() => {
    const getMovies = async () => {
      try {
        const { data } = await axios.get(
          `${process.env.API}/api/v1/movies/get-movies`
        );
        if (data.success) {
          setMovies(data.movies);
        } else {
          console.log(data.message);
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    getMovies();
  }, []);

  return (
    <div className="container-fluid mt-4 bg-dark text-light p-3 footer">
      <div className="row">
        <div className="col-md-3 mt-3">
          <h1>Company</h1>
          <div className="d-flex flex-column mt-5">
            <Link to="/">Home</Link>
            <Link to="/about" className="mt-2">
              About Us
            </Link>
            <Link to="/contact" className="mt-2">
              Contact Us
            </Link>
            <Link to="/movies" className="mt-2">
              Movies
            </Link>
          </div>
        </div>

        <div className="col-md-3 mt-4">
          <h1>Top Categories</h1>
          <div className="d-flex flex-column mt-5">
            {unique_category?.map((c) => (
              <Link key={c} to={`/movies/?categoryValue=${c}`} className="mb-2">
                {c}
              </Link>
            ))}
          </div>
        </div>

        <div className="col-md-3 mt-4">
          <h1>Account</h1>
          <div className="d-flex flex-column mt-5">
            {auth?.token && (
              <li
                class="nav-item mb-2"
                style={{
                  cursor: "pointer",
                  listStyle: "none",
                  fontSize: "15px"
                }}
              >
                <Link
                  to={`/${auth?.user?.role === 0 ? "user" : "admin"}/dashboard`}
                  class="nav-link active"
                  aria-current="page"
                  href="#"
                >
                  Dashboard
                </Link>
              </li>
            )}
            {auth?.token && (
              <li
                class="nav-item mb-2"
                style={{
                  cursor: "pointer",
                  listStyle: "none",
                  fontSize: "15px"
                }}
              >
                <Link
                  to={`/${
                    auth?.user?.role === 0
                      ? "user/favourites"
                      : "admin/favouriteMovies"
                  }`}
                  class="nav-link active"
                  aria-current="page"
                  href="#"
                >
                  My Favourites
                </Link>
              </li>
            )}
            {auth?.token && (
              <li
                class="nav-item mb-2"
                style={{
                  cursor: "pointer",
                  listStyle: "none",
                  fontSize: "15px"
                }}
              >
                <Link
                  to={`/${
                    auth?.user?.role === 0
                      ? "user/dashboard"
                      : "admin/updateProfile"
                  }`}
                  class="nav-link active"
                  aria-current="page"
                  href="#"
                >
                  Profile
                </Link>
              </li>
            )}
            {auth?.token && (
              <li
                class="nav-item mb-2"
                style={{
                  cursor: "pointer",
                  listStyle: "none",
                  fontSize: "15px"
                }}
              >
                <Link
                  to={`/${
                    auth?.user?.role === 0
                      ? "user/changePassword"
                      : "admin/changePass"
                  }`}
                  class="nav-link active"
                  aria-current="page"
                  href="#"
                >
                  Change Password
                </Link>
              </li>
            )}
          </div>
        </div>

        <div className="col-md-3 mt-4">
          <img style={{ width: "90px" }} src={Logo} alt="" />
          <div className="d-flex flex-column mt-2">
            <p>Egypt,Elhorya Street</p>
            <p>mo.lover34034034@gmail.com</p>
            <p>+2001021568465</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
