import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/auth";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import { toast } from "react-toastify";

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "red"
};

const MyExperiences = () => {
  let [experiences, setExperiences] = useState([]);
  const navigate = useNavigate();
  let [color, setColor] = useState("#ffffff");
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const [auth] = useAuth();
  useEffect(() => {
    const getAllExperiences = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(
          `${process.env.API}/api/v1/experience/user-experiences/${auth?.user?._id}`
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
  }, [auth]);

  const handleDelete = async (id) => {
    setDeleting(true);
    if (confirm("Are You Sure Deleting This Experience")) {
      try {
        const { data } = await axios.delete(
          `${process.env.API}/api/v1/experience/delete/${id}`
        );

        if (data.success) {
          toast.success(data.message);
          let filteredExperiences = experiences.filter(
            (item) => item._id !== id
          );
          setExperiences(filteredExperiences);
          setDeleting(false);
        } else {
          console.log(data.message);
          setDeleting(false);
        }
      } catch (error) {
        console.log(error.message);
        setDeleting(false);
      }
    }
  };

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
          <div className="col-md-1">You Didn't Post Any Experiences Yet!</div>
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
                  <div
                    className="d-flex mt-4 align-items-center"
                    style={{ justifyContent: "space-around" }}
                  >
                    <FaEdit
                      onClick={() => navigate(`/experience/${ex?._id}`)}
                      style={{
                        color: "blue",
                        cursor: "pointer",
                        fontSize: "20px"
                      }}
                    />

                    <button
                      className="btn btn-danger"
                      disabled={deleting}
                      onClick={() => handleDelete(ex?._id)}
                    >
                      <FaTrash
                        style={{
                          color: "white",
                          cursor: "pointer",
                          fontSize: "20px"
                        }}
                        className="mx-4"
                      />
                    </button>
                  </div>

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

export default MyExperiences;
