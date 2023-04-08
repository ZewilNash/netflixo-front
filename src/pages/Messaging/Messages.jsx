import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/auth";
import moment from "moment";

const Messages = ({ from, socket, to, updateMsg, inputChange }) => {
  const [messages, setMessage] = useState([]);
  const [auth] = useAuth();

  useEffect(() => {
    socket.on("response", (data) => {
      setMessage([...messages, data]);
    });
  }, [socket, messages, updateMsg, inputChange]);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const { data } = await axios.get(
          `${process.env.API}/api/v1/message/get-messages/${from}/${to}`
        );
        if (data.success) {
          setMessage(data.messages);
          console.log(data.message);
        } else {
          console.log(data.message);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    getMessages();
  }, [from, to, updateMsg, inputChange]);
  let content;
  return (
    <div
      style={{
        maxHeight: "400px",
        overflowY: "scroll",
        width: "100vw",
        display: "flex",
        justifyContent: "center"
      }}
      className="container-fluid mt-5 reviews"
    >
      <div className="row">
        <div className="col-md-12">
          {messages?.map((msg) => {
            if (msg?.from === auth?.user?._id) {
              content = (
                <div
                  key={msg?._id}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    marginLeft: "130px",
                    justifyContent: "center",
                    width: "100%"
                    // right: "0",
                    // position: "absolute",
                    // margin: "10px"
                  }}
                  className="d-flex flex-column"
                >
                  <p
                    style={{
                      // right: "0",
                      // marginTop:"20px",
                      // position: "absolute",
                      maxWidth: "200px",
                      wordWrap: " break-word",
                      backgroundColor: "blue",
                      padding: "7px",
                      justifyContent: "center",
                      width: "100%",
                      color: "#fff",
                      marginTop: "15px",
                      position: "relative"
                    }}
                    className="to"
                  >
                    <small
                      style={{
                        position: "absolute",
                        bottom: "-17px",
                        left: "0",
                        color: "#000"
                      }}
                    >
                      {moment(msg?.createdAt).fromNow()}
                    </small>
                    {msg?.textMessage}
                    <img
                      style={{
                        width: "30px",
                        height: "30px",
                        borderRadius: "50%",
                        position: "absolute",
                        bottom: "-17px",
                        right: "20px"
                      }}
                      src={`${process.env.API}/api/v1/auth/user-image/${from}`}
                      alt=""
                    />
                  </p>
                </div>
              );
            } else {
              content = (
                <div key={msg?._id} style={{}} className="d-flex flex-column">
                  <p
                    style={{
                      maxWidth: "200px",
                      wordWrap: " break-word",
                      backgroundColor: "black",
                      padding: "7px",
                      color: "#fff",
                      marginTop: "15px",
                      position: "relative"
                    }}
                    className="to"
                  >
                    <small
                      style={{
                        position: "absolute",
                        bottom: "-17px",
                        left: "0",
                        color: "#000"
                      }}
                    >
                      {moment(msg?.createdAt).fromNow()}
                    </small>
                    {msg?.textMessage}
                    <img
                      style={{
                        width: "30px",
                        height: "30px",
                        borderRadius: "50%",
                        position: "absolute",
                        bottom: "-17px",
                        right: "20px"
                      }}
                      src={`${process.env.API}/api/v1/auth/user-image/${to}`}
                      alt=""
                    />
                  </p>
                </div>
              );
            }

            return content;
          })}
        </div>
      </div>
    </div>
  );
};

export default Messages;
