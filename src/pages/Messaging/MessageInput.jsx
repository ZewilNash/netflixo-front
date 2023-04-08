import axios from "axios";
import { useState } from "react";
import { BiSend } from "react-icons/bi";
import { useAuth } from "../../context/auth";
import EmojiPicker from "emoji-picker-react";

const MessageInput = ({ from, socket, to, setUpdateMsg, setInputChange }) => {
  let [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const handleSendingMsg = async () => {
    setLoading(true);
    try {
      const {
        data
      } = await axios.post(
        `${process.env.API}/api/v1/message/send/${from}/${to}`,
        { textMessage: message }
      );

      if (data.message) {
        setUpdateMsg(message);
        setInputChange((prev) => !prev);
        socket.emit("message", data.message);
        console.log(data.messageFlag);
        setMessage("");
        setLoading(false);
      } else {
        console.log(data.message);
        setLoading(false);
      }
    } catch (error) {
      console.log(error.message);
      setLoading(false);
    }
  };

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div class="input-group mb-3">
              <button
                style={{
                  outline: "none",
                  cursor: "pointer",
                  height: "30px",
                  marginTop: "12px",
                  width: "30px",
                  border: "none"
                }}
                disabled={loading}
                onClick={handleSendingMsg}

                // class="input-group-text"
                // id="inputGroup-sizing-default"
              >
                <BiSend />
              </button>
              <input
                value={message}
                onChange={({ target }) => setMessage(target.value)}
                style={{
                  outline: "none",
                  border: "none",
                  borderBottom: "1px solid gray"
                }}
                type="text"
                className="form-control  shadow-none"
                aria-label="Sizing example input"
                aria-describedby="inputGroup-sizing-default"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <EmojiPicker
              onEmojiClick={(emoji) => {
                setMessage(message + " " + emoji.emoji);
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default MessageInput;
