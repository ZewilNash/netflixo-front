import { Link, useNavigate, useSearchParams } from "react-router-dom";
import Logo from "../../images/netflix.png";
import { FaUser, FaSearch } from "react-icons/fa";
import { BiLogOut, BiCategory } from "react-icons/bi";
import { useAuth } from "../../context/auth";
import { useEffect, useState } from "react";
import { TbSocial } from "react-icons/tb";
import axios from "axios";
import { FcMultipleCameras } from "react-icons/fc";

const Header = () => {
  const [searchParams] = useSearchParams();
  const value = searchParams.get("searchValue");
  const [isAuth, setisAuth] = useState(false);
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");
  const handleLogOut = () => {
    setAuth({
      ...auth,
      user: null,
      token: ""
    });

    localStorage.removeItem("auth");
    navigate("/login");
  };

  useEffect(() => {
    const adminCheck = async () => {
      const { data } = await axios.get(
        `${process.env.API}/api/v1/auth/user-auth`
      );
      console.log(data.ok);
      if (data.ok) {
        setisAuth(true);
      } else {
        setisAuth(false);
      }
    };
    // so axios get the token header
    if (auth?.token) adminCheck();
  }, [auth.token]);

  return (
    <nav class="navbar  navbar-expand-lg bg-body-tertiary">
      <div class="container-fluid">
        <Link class="navbar-brand" to="/">
          <img src={Logo} alt="netflix-logo" />
        </Link>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0 mt-3">
            <li class="nav-item">
              <Link
                to="/movies"
                class="nav-link active"
                aria-current="page"
                href="#"
              >
                Movies
              </Link>
            </li>
            <li class="nav-item">
              <Link
                to="/about"
                class="nav-link active"
                aria-current="page"
                href="#"
              >
                About Us
              </Link>
            </li>
            <li class="nav-item">
              <Link
                to="/contact"
                class="nav-link active"
                aria-current="page"
                href="#"
              >
                Contact Us
              </Link>
            </li>

            {auth?.token && (
              <>
                <li
                  class="nav-item"
                  style={{ cursor: "pointer", fontSize: "20px" }}
                >
                  <Link
                    to={`/${
                      auth?.user?.role === 0 ? "user" : "admin"
                    }/dashboard`}
                    class="nav-link active"
                    aria-current="page"
                    href="#"
                  >
                    <BiCategory style={{ marginBottom: "15px" }} />
                  </Link>
                </li>
                <li
                  class="nav-item"
                  style={{ cursor: "pointer", fontSize: "20px" }}
                >
                  <Link
                    to={`/experience`}
                    class="nav-link active"
                    aria-current="page"
                    href="#"
                  >
                    <TbSocial style={{ marginBottom: "15px" }} />
                  </Link>
                </li>
                <li
                  class="nav-item"
                  style={{ cursor: "pointer", fontSize: "20px" }}
                >
                  <Link
                    to={`/stories`}
                    class="nav-link active"
                    aria-current="page"
                    href="#"
                  >
                    <FcMultipleCameras style={{ marginBottom: "15px" }} />
                  </Link>
                </li>
                <li
                  class="nav-item"
                  style={{ cursor: "pointer", fontSize: "20px" }}
                >
                  <Link
                    to={`/user/${auth?.user?._id}`}
                    class="nav-link active"
                    aria-current="page"
                    href="#"
                  >
                    <img
                      style={{
                        width: "30px",
                        height: "30px",
                        borderRadius: "50%",
                        marginBottom: "15px"
                      }}
                      src={`${process.env.API}/api/v1/auth/user-image/${auth?.user?._id}`}
                      alt=""
                    />
                  </Link>
                </li>
              </>
            )}

            {auth?.token ? (
              <li
                onClick={handleLogOut}
                class="nav-item"
                style={{ cursor: "pointer", fontSize: "20px" }}
              >
                <BiLogOut />
              </li>
            ) : (
              <li class="nav-item">
                <Link
                  to="/login"
                  class="nav-link active"
                  aria-current="page"
                  href="#"
                >
                  <FaUser />
                </Link>
              </li>
            )}

            {/* <li class="nav-item d-flex align-items-center">
              <Badge count={1}>
                <Link class="nav-link active" href="#">
                  <FaHeart />
                </Link>
              </Badge>
            </li> */}
          </ul>
          {!value && (
            <form class="d-flex" role="search">
              <input
                onChange={({ target }) => setSearchValue(target.value)}
                style={{ width: "300px" }}
                class="form-control me-2"
                type="search"
                value={searchValue}
                placeholder="Search Movies Name Here.."
                aria-label="Search"
              />
              <button
                onClick={() => navigate(`/search/?searchValue=${searchValue}`)}
                class="btn btn-outline-danger"
                type="submit"
              >
                <FaSearch />
              </button>
            </form>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
