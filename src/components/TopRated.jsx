import { Link } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import ClipLoader from "react-spinners/ClipLoader";

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "red"
};

const TopRated = () => {
  const [loading, setLoading] = useState(false);
  const [favLoad, setFavLoad] = useState(false);
  let [color, setColor] = useState("#ffffff");
  const [topRated, setTopRated] = useState([]);
  useEffect(() => {
    const getMovies = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(
          `${process.env.API}/api/v1/reviews/top-movies`
        );
        if (data.success) {
          setTopRated(data.topRatedMoviesArray);
          setLoading(false);
        } else {
          toast.error(data.message);
          setLoading(false);
        }
      } catch (error) {
        toast.error(error.message);
        setLoading(false);
      }
    };

    getMovies();
  }, []);

  const handleAddToFavourite = async (id) => {
    setFavLoad(true);
    try {
      const { data } = await axios.put(
        `${process.env.API}/api/v1/auth/add-to-favourite/${id}`
      );
      if (data.success) {
        toast.success(data.message);
        setFavLoad(false);
      } else {
        toast.error(data.message);
        setFavLoad(false);
      }
    } catch (error) {
      toast.error("Please Login First To Use This Feature");
      setFavLoad(false);
    }
  };

  return (
    <>
      <div className="row mt-4 mb-4 p-4">
        <div className="col-md-12">
          <h1>Top Rated</h1>
        </div>
      </div>

      <div className="row p-4">
        {loading ? (
          <>
            {" "}
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
        ) : (
          <>
            {topRated?.map((movie) => (
              <div key={movie?._id} className="col-md-4 mt-3">
                <div class="card popular">
                  <Link to={`/movies/${movie?._id}`}>
                    <img
                      src={`${process.env.API}/api/v1/movies/get-movie-image/${movie?._id}`}
                      class="card-img-top"
                      alt="..."
                    />
                  </Link>
                  <div class="card-body">
                    <p class="card-text mt-2">{movie?.title}</p>
                    <button
                      onClick={() => handleAddToFavourite(movie?._id)}
                      className="favourite_btn mx-4 btn btn-danger"
                    >
                      <FaHeart />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </>
  );
};

export default TopRated;
