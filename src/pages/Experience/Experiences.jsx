import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/auth";
import { FaThumbsUp } from "react-icons/fa";
import { Badge } from "antd";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

// import ClipLoader from "react-spinners/ClipLoader";

// const override = {
//   display: "block",
//   margin: "0 auto",
//   borderColor: "red"
// };

const Experiences = ({
  searchedExperiences,
  setSearchedExperiences,
  experiencesChange,
  setExperiencesChange
}) => {
  // const [loading, setLoading] = useState(false);
  // const [favLoad, setFavLoad] = useState(false);
  const [cmtLoadt, setCmtLoad] = useState(false);
  // let [color, setColor] = useState("#ffffff");
  let [experiences, setExperiences] = useState([]);
  const [comment, setComment] = useState("");
  const [likeCount, setLikeCount] = useState(null);
  const [auth] = useAuth();
  const chooseExperiencesDisplay =
    searchedExperiences.length > 0 ? searchedExperiences : experiences;

  const getLikeCount = async (id) => {
    try {
      const { data } = await axios.get(
        `${process.env.API}/api/v1/experience/likesCount/${id}`
      );
      if (data.success) {
        console.log(data.success);
        return data.likesCount;
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    const getAllExperiences = async () => {
      try {
        const { data } = await axios.get(
          `${process.env.API}/api/v1/experience/get`
        );
        if (data.success) {
          setExperiences(data.experiences);
          setExperiencesChange((prev) => !prev);
        } else {
          console.log(data.message);
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    getAllExperiences();
  }, [
    comment,
    experiencesChange,
    setExperiencesChange,
    setComment,
    likeCount,
    setLikeCount
  ]);

  const handleAddComment = async (id) => {
    setCmtLoad(true);
    try {
      const {
        data
      } = await axios.put(
        `${process.env.API}/api/v1/experience/comment/${id}/${auth?.user?._id}`,
        { comment: comment }
      );

      if (data.success) {
        console.log(data.message);
        setComment("");
        setCmtLoad(false);
      } else {
        console.log(data.message);
        setCmtLoad(false);
      }
    } catch (error) {
      console.log(error.message);
      setCmtLoad(false);
    }
  };

  const handleLike = async (id) => {
    try {
      const { data } = await axios.put(
        `${process.env.API}/api/v1/experience/like/${id}/${auth?.user?._id}`
      );

      if (data.success) {
        console.log(data.message);
        setLikeCount(getLikeCount(id));
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="container-fluid mt-4">
      <div className="row">
        {chooseExperiencesDisplay?.map((ex) => (
          <div key={ex?._id} className="col-md-6 mt-3">
            <div class="card popular" style={{ position: "relative" }}>
              <img
                style={{ height: "300px" }}
                src={`${process.env.API}/api/v1/experience/get-theme/${ex?._id}`}
                class="card-img-top"
                alt="..."
              />

              <Link to={`/user/${ex?.user}`}>
                <img
                  style={{
                    width: "50px",
                    height: "50px",
                    borderRadius: "50%",
                    position: "absolute",
                    top: "0",
                    left: "0",
                    margin: "10px"
                  }}
                  src={`${process.env.API}/api/v1/auth/user-image/${ex?.user}`}
                  alt=""
                />
              </Link>

              <div class="card-body d-flex flex-column text-center">
                <p class="card-text mt-2 text-danger">{ex?.title}</p>
                <small>{ex?.experience}</small>
                <div
                  className="d-flex mt-4"
                  style={{ justifyContent: "space-around" }}
                >
                  <Badge count={ex?.likes?.length}>
                    <FaThumbsUp
                      onClick={() => handleLike(ex?._id)}
                      style={{
                        color: "#fff",
                        cursor: "pointer",
                        fontSize: "20px"
                      }}
                    />
                  </Badge>
                  {/* {auth?.user?._id !== ex?.user && (
                    <Badge count={1}>
                      <FaShare
                        style={{
                          color: "#fff",
                          cursor: "pointer",
                          fontSize: "20px"
                        }}
                        className="mx-3"
                      />
                    </Badge>
                  )} */}
                </div>
                <div class="row">
                  <div class="col-md-9 mt-2">
                    <input
                      value={comment}
                      onChange={({ target }) => setComment(target.value)}
                      type="text"
                      class="form-control mt-2"
                      placeholder="Type Your Comment.."
                      aria-label="First name"
                      style={{ width: "100%" }}
                    />
                  </div>
                  <div class="col-md-3 mt-3">
                    <button
                      disabled={cmtLoadt}
                      onClick={() => handleAddComment(ex?._id)}
                      style={{
                        color: "#fff",
                        padding: "4px",
                        outline: "none",
                        border: "1px solid red",
                        backgroundColor: "transparent"
                      }}
                    >
                      Comment
                    </button>
                  </div>
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
                    <div key={c?._id} className="d-flex mt-3">
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
};

export default Experiences;
