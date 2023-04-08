import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useAuth } from "../../context/auth";
import axios from "axios";
import Spinner from "../../components/Spinner";

const AdminRoute = () => {
  const [auth] = useAuth();
  const [ok, setOk] = useState(false);

  useEffect(() => {
    const adminCheck = async () => {
      const { data } = await axios.get(
        `${process.env.API}/api/v1/auth/admin-auth`
      );
      console.log(data.ok);
      if (data.ok) {
        setOk(true);
      } else {
        setOk(false);
      }
    };
    // so axios get the token header
    if (auth?.token) adminCheck();
  }, [auth.token]);

  return ok ? <Outlet /> : <Spinner />;
};

export default AdminRoute;
