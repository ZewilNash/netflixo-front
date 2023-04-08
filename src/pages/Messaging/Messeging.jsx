import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Footer from "../../components/layout/Footer";
import Layout from "../../components/layout/Layout";
import MessageInput from "./MessageInput";
import Messages from "./Messages";

const Messeging = ({ socket }) => {
  const { from, to } = useParams();
  const [toUser, setToUser] = useState(null);
  const [fromUser, setFromUser] = useState(null);
  const [updateMsg, setUpdateMsg] = useState("");
  const [inputChange, setInputChange] = useState(false);

  useEffect(() => {
    const getToUser = async () => {
      try {
        const { data } = await axios.get(
          `${process.env.API}/api/v1/auth/single-user/${to}`
        );
        if (data.success) {
          setToUser(data.user);
          console.log(data.message);
        } else {
          console.log(data.message);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    getToUser();
  }, [to]);

  useEffect(() => {
    const getToUser = async () => {
      try {
        const { data } = await axios.get(
          `${process.env.API}/api/v1/auth/single-user/${from}`
        );
        if (data.success) {
          setFromUser(data.user);
          console.log(data.message);
        } else {
          console.log(data.message);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    getToUser();
  }, [from]);

  return (
    <Layout title="Netflix - Chating">
      <div className="container-fluid d-flex justify-content-center mt-4">
        <div className="row">
          <div className="col-md-12">
            <div className="d-flex justify-content-center align-items-center">
              <Link to={`/user/${from}`}>
                <img
                  style={{
                    width: "50px",
                    height: "50px",
                    borderRadius: "50%"
                  }}
                  src={`${process.env.API}/api/v1/auth/user-image/${from}`}
                  alt=""
                />
              </Link>
              <small className="mx-5" style={{ fontSize: "30px" }}>
                ~
              </small>
              <Link to={`/user/${to}`}>
                <img
                  style={{
                    width: "50px",
                    height: "50px",
                    borderRadius: "50%"
                  }}
                  src={`${process.env.API}/api/v1/auth/user-image/${to}`}
                  alt=""
                />
              </Link>
            </div>

            {to === "6424d5dc7289d146ee9b735e" && (
              <div className="text-center mt-4 text-danger">
                <small>
                  Hi Am Abdelrahman The Creator Of Netflix How Can I Help You
                </small>
              </div>
            )}
          </div>
        </div>
      </div>
      <Messages
        inputChange={inputChange}
        updateMsg={updateMsg}
        from={from}
        to={to}
        socket={socket}
      />
      <MessageInput
        setInputChange={setInputChange}
        setUpdateMsg={setUpdateMsg}
        from={from}
        to={to}
        socket={socket}
      />
      <Footer />
    </Layout>
  );
};

export default Messeging;
