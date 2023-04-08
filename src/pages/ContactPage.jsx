import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import HeroWithTitle from "../components/HeroWithTitle";
import Footer from "../components/layout/Footer";
import Layout from "../components/layout/Layout";
import { useAuth } from "../context/auth";
import WhatsAppQR from "../images/qrcode-201021568465.jpeg";

const ContactUs = () => {
  const [auth] = useAuth();
  const [emailInfo, setEmailInfo] = useState({
    email: "",
    message: ""
  });

  const handleSendUserMessage = async () => {
    try {
      const {
        data
      } = await axios.post(
        `${process.env.API}/api/v1/auth/userSendMessageViaEmail`,
        { message: emailInfo.message }
      );
      if (data.success) {
        toast.success(data.message);
        setEmailInfo((prev) => {
          return {
            ...prev,
            message: ""
          };
        });
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleSendCustomerMessage = async () => {
    try {
      const {
        data
      } = await axios.post(
        `${process.env.API}/api/v1/auth/customerSendMessageViaEmail`,
        { message: emailInfo.message, email: emailInfo.email }
      );
      if (data.success) {
        toast.success(data.message);
        setEmailInfo((prev) => {
          return {
            ...prev,
            message: "",
            email: ""
          };
        });
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <Layout title="Netflix - Contact Us">
      <HeroWithTitle
        title="Contact Us"
        src="https://raw.githubusercontent.com/thatanjan/netflix-clone-yt/youtube/media//banner.jpg"
      />

      <div className="container-fluid mt-4">
        <div className="row">
          <div className="col-md-4 mt-3">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Email Us</h5>
                <p className="card-text">
                  {/* open a modal to send with nodemail using server */}
                  <Link
                    data-bs-toggle="modal"
                    data-bs-target="#email"
                    href=""
                    className="text-danger"
                  >
                    Click Here
                  </Link>
                </p>
              </div>
            </div>
          </div>

          <div className="col-md-4 mt-3">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Whatsapp Us</h5>
                <p className="card-text">
                  {/* open a modal to send with nodemail using server */}
                  <Link
                    data-bs-toggle="modal"
                    data-bs-target="#whatsApp"
                    href="#"
                    className="text-success"
                  >
                    Click Here
                  </Link>
                </p>
              </div>
            </div>
          </div>

          <div className="col-md-4 mt-3">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Contact With An Admin</h5>
                <p className="card-text">
                  {/* open a modal to send with nodemail using server */}
                  <Link
                    to={
                      auth?.user
                        ? `/chat/${auth?.user?._id}/6424d5dc7289d146ee9b735e`
                        : "/login"
                    }
                    href=""
                    className="text-success"
                  >
                    Click Here
                  </Link>
                </p>
              </div>
            </div>
          </div>

          {/* <FloatingWhatsApp
            chatMessage="Hello Dear , How We Can Help You"
            accountName="Abdelrahman"
            phoneNumber="+2001021568465"
            darkMode={true}
          /> */}

          <div className="col-md-4 mt-3">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Location</h5>
                <p className="card-text">
                  <div className="google-map-code">
                    <iframe
                      style={{ width: "100%" }}
                      title="location"
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3519.9665358765633!2d30.758712415292827!3d28.0865636153307!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x145b25a71e875e31%3A0x556729c606339c40!2sAbou%20Shady%20Mosque%2C%20Qism%20Minya%2C%20Minya%2C%20Menia%20Governorate!5e0!3m2!1sen!2seg!4v1680443369213!5m2!1sen!2seg"
                      width="600"
                      height="450"
                      allowfullscreen=""
                      loading="lazy"
                      referrerpolicy="no-referrer-when-downgrade"
                    ></iframe>
                  </div>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div id="whatsApp" className="modal" tabindex="-1">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Scan The QR</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body" style={{ textAlign: "center" }}>
              <img
                style={{ width: "100%", height: "100%" }}
                src={WhatsAppQR}
                alt=""
              />
              <small
                style={{ textAlign: "center" }}
                className="text-success mx-2"
              >
                Choose Your Prefered QR App , Scan It We Wait Your Messages{" "}
              </small>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>

      <div id="email" className="modal" tabindex="-1">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Email Us</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body" style={{ textAlign: "center" }}>
              <div>
                {!auth?.user && (
                  <>
                    <small className="text-danger">
                      We Provide this feature To Non Registered Users (login if
                      you're a user)
                    </small>
                    <div className="mb-3 mt-4">
                      <label for="exampleInputEmail1" className="form-label">
                        Type Your Email
                      </label>
                      <input
                        value={emailInfo.email}
                        onChange={({ target }) =>
                          setEmailInfo((prev) => {
                            return {
                              ...prev,
                              email: target.value
                            };
                          })
                        }
                        type="email"
                        className="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                      />
                    </div>
                  </>
                )}
                <div className="mb-3">
                  <label for="exampleInputPassword1" className="form-label">
                    Type Your Message Here...
                  </label>
                  <textarea
                    value={emailInfo.message}
                    onChange={({ target }) =>
                      setEmailInfo((prev) => {
                        return {
                          ...prev,
                          message: target.value
                        };
                      })
                    }
                    placeholder="You Can Recommend A Movie Or Give Us A Note We Will Do Our Best..."
                    type="text"
                    style={{ fontSize: "14px" }}
                    className="form-control"
                    id="exampleInputPassword1"
                  />
                </div>
                <button
                  onClick={() =>
                    auth?.user
                      ? handleSendUserMessage()
                      : handleSendCustomerMessage()
                  }
                  type="submit"
                  className="mb-3 btn btn-danger"
                >
                  Send Message
                </button>
              </div>
              <small
                style={{ textAlign: "center" }}
                className="text-danger mx-2 mt-3"
              >
                We Usually Respond Within an hour if late we beg your paitience
              </small>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* <div className="container-fluid mt-5">
        <div className="row">
          <div className="col-md-12">
            <MessengerCustomerChat
              pageId="100034817864976"
              appId="958554175167367"
            />
          </div>
        </div>
      </div> */}

      <Footer />
    </Layout>
  );
};

export default ContactUs;
