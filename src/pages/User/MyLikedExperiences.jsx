import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/auth";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import { toast } from "react-toastify";

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "red"
};

const MyLikedExperiences = () => {
  const [likedExp, setLikedExp] = useState([]);
  let [color, setColor] = useState("#ffffff");
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [auth] = useAuth();
  useEffect(() => {
    const getMovies = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(
          `${process.env.API}/api/v1/experience/user-liked-experiences/${auth?.user?._id}`
        );
        if (data.success) {
          setLikedExp(data.experiences);
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

    getMovies();
  }, [auth, deleting]);

  const handleDeleteFromLikeList = async (id) => {
    try {
      const { data } = await axios.put(
        `${process.env.API}/api/v1/experience/remove-from-like-list/${id}/${auth?.user?._id}`
      );
      if (data.success) {
        setDeleting((prev) => !prev);
        toast.success(data.message);
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.log(error.message);
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
  } else if (likedExp.length === 0) {
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
          {likedExp?.map((ex) => (
            <div key={ex?._id} className="col-md-6 mt-3">
              <div class="card popular" style={{ position: "relative" }}>
                <img
                  style={{ height: "300px" }}
                  src={`${process.env.API}/api/v1/experience/get-theme/${ex?._id}`}
                  class="card-img-top"
                  alt="..."
                />

                <div class="card-body d-flex flex-column text-center">
                  <p class="card-text mt-2 text-danger">{ex?.title}</p>
                  <small>{ex?.experience}</small>
                  <div
                    className="d-flex mt-4"
                    style={{ justifyContent: "space-around" }}
                  >
                    <FaTrash
                      onClick={() => handleDeleteFromLikeList(ex?._id)}
                      style={{
                        color: "#fff",
                        cursor: "pointer",
                        fontSize: "20px"
                      }}
                      className="mx-3 text-danger"
                    />
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

export default MyLikedExperiences;
