import axios from "axios";
import { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "red"
};

const UserExperiences = ({ id }) => {
  const [experiences, setExperiences] = useState([]);
  let [color, setColor] = useState("#ffffff");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getAllExperiences = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(
          `${process.env.API}/api/v1/experience/user-experiences/${id}`
        );
        if (data.success) {
          setExperiences(data.experiences);
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

    getAllExperiences();
  }, [id]);

  let content;

  if (loading) {
    content = (
      <>
        <div className="container-fluid mt-4 d-flex justify-content-center">
          <div className="row">
            <ClipLoader
              color={color}
              loading={loading}
              cssOverride={override}
              size={70}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          </div>
        </div>
      </>
    );
  } else if (experiences.length === 0) {
    content = (
      <div className="container-fluid mt-4 d-flex justify-content-center">
        <div className="row">
          <div className="col-md-1">
            This User Didn't Post Any Experiences Yet!
          </div>
        </div>
      </div>
    );
  } else {
    content = (
      <div className="container-fluid mt-4">
        <div className="row">
          {experiences?.map((ex) => (
            <div key={ex?._id} className="col-md-6 mt-3">
              <div class="card popular" style={{ position: "relative" }}>
                <img
                  style={{ height: "300px" }}
                  src={`${process.env.API}/api/v1/experience/get-theme/${ex?._id}`}
                  class="card-img-top"
                  alt="..."
                />

                {/* <img
                  style={{
                    width: "50px",
                    height: "50px",
                    borderRadius: "50%",
                    position: "absolute",
                    left: "0",
                    top: "0",
                    margin: "10px"
                  }}
                  src={`${process.env.API}/api/v1/auth/user-image/${ex?.user}`}
                  alt=""
                /> */}

                <div class="card-body d-flex flex-column text-center">
                  <p class="card-text mt-2 text-danger">{ex?.title}</p>
                  <small>{ex?.experience}</small>
                  {/* <div
                    className="d-flex mt-4"
                    style={{ justifyContent: "space-around" }}
                  >
                    <FaEdit
                      style={{
                        color: "#fff",
                        cursor: "pointer",
                        fontSize: "20px"
                      }}
                    />

                    <FaTrash
                      style={{
                        color: "#fff",
                        cursor: "pointer",
                        fontSize: "20px"
                      }}
                      className="mx-3"
                    />
                  </div> */}

                  <div
                    className="d-flex-flex-column reviews"
                    style={{
                      maxHeight: "120px",
                      width: "auto",
                      overflowY: "scroll"
                    }}
                  >
                    {ex?.comments?.map((c) => (
                      <div className="d-flex mt-3">
                        <Link to={`/user/${c?.user}`}>
                          <img
                            style={{
                              width: "27px",
                              height: "27px",
                              borderRadius: "50%"
                            }}
                            src={`${process.env.API}/api/v1/auth/user-image/${c?.user}`}
                            alt=""
                          />
                        </Link>
                        <small className="mx-4">{c?.comment}</small>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return content;
};

export default UserExperiences;
