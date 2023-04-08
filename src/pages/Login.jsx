import Footer from "../components/layout/Footer";
import Layout from "../components/layout/Layout";
import Logo from "../images/netflix.png";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "../context/auth";

const Login = () => {
  const [auth, setAuth] = useAuth();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [account, setAccount] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setAccount((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value
      };
    });
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${process.env.API}/api/v1/auth/login`,
        account
      );
      if (data.success) {
        setAuth({
          ...auth,
          user: data.user,
          token: data.token
        });

        const userData = {
          user: data.user,
          token: data.token
        };

        await localStorage.setItem("auth", JSON.stringify(userData));
        toast.success(data.message);
        setTimeout(() => {
          navigate(`/${data.user.role === 0 ? "user" : "admin"}/dashboard`);
          setLoading(false);
        }, 5000);
      } else {
        setLoading(false);
        toast.error(data.message);
      }
    } catch (error) {
      setLoading(false);
      toast.error(error.message);
    }
  };

  return (
    <Layout>
      <div className="container-fluid login mt-4 d-flex justify-content-center align-items-center text-center">
        <div className="row">
          <div className="col-md-12">
            <form onSubmit={handleSubmit}>
              <div class="mb-3">
                <img style={{ width: "120px" }} src={Logo} alt="" />
              </div>
              <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">
                  Email address
                </label>
                <input
                  name="email"
                  onChange={handleChange}
                  type="email"
                  class="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                />
              </div>
              <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label">
                  Password
                </label>
                <input
                  onChange={handleChange}
                  name="password"
                  type="password"
                  class="form-control"
                  id="exampleInputPassword1"
                />
              </div>
              <div class="mb-3 form-check">
                <label class="form-check-label" for="exampleCheck1">
                  Don't Have An Account{" "}
                  <Link className="text-danger" to="/register">
                    Signup
                  </Link>
                </label>
              </div>
              <button disabled={loading} type="submit" class="btn btn-danger">
                Signin
              </button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </Layout>
  );
};

export default Login;
