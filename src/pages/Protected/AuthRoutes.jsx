import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useAuth } from "../../context/auth";
import axios from "axios";
import Spinner from "../../components/Spinner";

const AuthRoute = () => {
  const [auth] = useAuth();
  console.log(auth?.user);
  const [ok, setOk] = useState(false);

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
        setOk(true);
      } else {
        setOk(false);
      }
    };
    // so axios get the token header
    if (auth?.token) authCheck();
  }, [auth.token]);

  return ok ? <Outlet /> : <Spinner />;
};

export default AuthRoute;
