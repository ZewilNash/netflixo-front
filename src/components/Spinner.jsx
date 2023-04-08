import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Spinner = ({ path = "login" }) => {
  const [count, setCount] = useState(5);
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prev) => prev - 1);
    }, 1000);
    count === 0 && navigate(`/${path}`, { state: location.pathname });

    return () => clearInterval(interval);
  }, [count, navigate, location, path]);

  return (
    <>
      <div
        style={{ height: "100vh" }}
        className="d-flex flex-column justify-content-center align-items-center"
      >
        <h1 className="text-center">Redirecting You In {count} second</h1>
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    </>
  );
};

export default Spinner;
