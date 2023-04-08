import { useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/auth";

const projectID = "5bec44e9-6bb2-4e51-b63b-7da4a4e5a2f5";

const Modal = () => {
  const [auth] = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const authObject = {
      "Project-ID": projectID,
      "User-Name": username,
      "User-Secret": password
    };

    try {
      await axios.get("https://api.chatengine.io/chats", {
        headers: authObject
      });

      localStorage.setItem("username", username);
      localStorage.setItem("password", password);

      window.location.reload();
      setError("");
    } catch (err) {
      setError("Oops, incorrect credentials.");
    }
  };

  return (
    <div className="wrapper text-center">
      <div className="form">
        <h1 className="title">Chat Application</h1>
        <small>You Can Chat Now With Your NickName And A Secret Key</small>
        <small>For Your Special Identity..</small>
        <small>
          login as {auth?.user?.fullname} with secret key (123456789)
        </small>
        <form onSubmit={handleSubmit} className="d-flex flex-column">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="input mt-3"
            placeholder="Nick Name"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input mt-3"
            placeholder="Secret Key"
            required
          />
          <div align="center">
            <button type="submit" className="mt-3 btn btn-success button">
              <span>Start chatting</span>
            </button>
          </div>
        </form>
        <h1>{error}</h1>
      </div>
    </div>
  );
};

export default Modal;
