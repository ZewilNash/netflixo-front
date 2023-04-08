import { Select } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../../context/auth";

const Reviews = () => {
  const { id } = useParams();
  const [userReview, setUserReview] = useState("");
  const [userRate, setUserRate] = useState("");
  const [movie, setMovie] = useState(null);
  const [auth] = useAuth();
  const [reviews, setReviews] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getUserReviews = async () => {
      try {
        const { data } = await axios.get(
          `${process.env.API}/api/v1/reviews/user-reviews/${id}`
        );

        if (data.success) {
          setReviews(data.reviews);
        } else {
          console.log(data.message);
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    getUserReviews();
  }, [auth, id]);

  const getUserReviews = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.API}/api/v1/reviews/user-reviews/${id}`
      );

      if (data.success) {
        setReviews(data.reviews);
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    const getMovieById = async () => {
      try {
        const { data } = await axios.get(
          `${process.env.API}/api/v1/movies/single-movie/${id}`
        );
        if (data.success) {
          setMovie(data.movie);
        } else {
          console.log(data.message);
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    getMovieById();
  }, [id]);

  const handleCreateReview = async () => {
    try {
      const formData = {
        rate: userRate,
        review: userReview,
        user: auth?.user?._id
      };
      const { data } = await axios.post(
        `${process.env.API}/api/v1/reviews/create/${id}`,
        formData
      );

      if (data.success) {
        toast.success(data.message);
        setUserRate("");
        setUserReview("");
        getUserReviews();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <div className="container-fluid mt-4 mb-4">
        <div className="row">
          <div className="col-md-12">
            <h1>Reviews</h1>
          </div>
        </div>
      </div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-6">
            <h1>Review {`"${movie?.title}"`}</h1>
            <small className="mb-7">
              Write A Review On The Movie And Share With The Large Community.
            </small>
            <div className="form mt-6">
              <Select
                value={userRate}
                onChange={(value) => setUserRate(value)}
                className="mt-5 mb-4"
                style={{ width: "100%" }}
                showSearch
              >
                <option value="0-Poor">0-Poor</option>
                <option value="1-Fail">1-Fail</option>
                <option value="2-Good">2-Good</option>
                <option value="3-Very Good">3-Very Good</option>
                <option value="4-Excellent">4-Excellent</option>
                <option value="5-MasterPiece">5-MasterPiece</option>
              </Select>
              <textarea
                name="review"
                value={userReview}
                onChange={({ target }) => setUserReview(target.value)}
                placeholder="Type A Message"
                className="mt-2 mb-4"
                style={{ width: "100%" }}
              ></textarea>
              <button
                onClick={handleCreateReview}
                className="btn btn-danger mt-2"
                style={{ width: "100%" }}
              >
                Submit
              </button>
            </div>
          </div>

          <div
            style={{ height: "300px" }}
            className="col-md-6 mt-3 overflow-y-scroll reviews"
          >
            {reviews?.map((review) => (
              <div key={review?._id} className="d-flex flex-column mt-2">
                <div className="d-flex align-items-center">
                  <div>
                    <img
                      onClick={() => navigate(`/user/${review?.user}`)}
                      style={{
                        width: "60px",
                        height: "70px",
                        cursor: "pointer"
                      }}
                      src={`${process.env.API}/api/v1/auth/user-image/${review?.user}`}
                      alt=""
                    />
                  </div>

                  <div className="d-flex flex-column mx-3">
                    {/* <h5>{review?.user?.fullname}</h5> */}
                    <p>{review?.review}</p>
                  </div>

                  <div className="d-flex rate__review">
                    {review?.rate === "0-Poor" && (
                      <FaStar style={{ color: "red" }} />
                    )}
                    {review?.rate === "1-Fail" && (
                      <FaStar style={{ color: "gold" }} />
                    )}
                    {review?.rate === "2-Good" && (
                      <>
                        <FaStar style={{ color: "gold" }} />{" "}
                        <FaStar style={{ color: "gold" }} />{" "}
                      </>
                    )}
                    {review?.rate === "3-Very Good" && (
                      <>
                        <FaStar style={{ color: "gold" }} />{" "}
                        <FaStar style={{ color: "gold" }} />
                        <FaStar style={{ color: "gold" }} />{" "}
                      </>
                    )}
                    {review?.rate === "4-Excellent" && (
                      <>
                        <FaStar style={{ color: "gold" }} />{" "}
                        <FaStar style={{ color: "gold" }} />
                        <FaStar style={{ color: "gold" }} />
                        <FaStar style={{ color: "gold" }} />{" "}
                      </>
                    )}
                    {review?.rate === "5-MasterPiece" && (
                      <>
                        <FaStar style={{ color: "gold" }} />{" "}
                        <FaStar style={{ color: "gold" }} />
                        <FaStar style={{ color: "gold" }} />
                        <FaStar style={{ color: "gold" }} />
                        <FaStar style={{ color: "gold" }} />{" "}
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Reviews;
