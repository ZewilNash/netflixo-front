import axios from "axios";
import { useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Carasoul = () => {
  const [movies, setMovies] = useState([]);
  const [favLoad, setFavLoad] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const getMovies = async () => {
      try {
        const { data } = await axios.get(
          `${process.env.API}/api/v1/movies/get-movies`
        );
        if (data.success) {
          setMovies(data.movies);
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        toast.error(error.message);
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
    <div className="row">
      <div className="col-md-12">
        <div
          id="carouselExampleControlsNoTouching"
          class="carousel slide"
          data-bs-touch="false"
        >
          <div class="carousel-inner">
            <div class="carousel-item active">
              <img
                src={`${process.env.API}/api/v1/movies/get-movie-image/${movies[0]?._id}`}
                class="d-block w-100"
                alt="..."
              />
              <div className="carasoul__banner_datails">
                <h1>{movies[0]?.title}</h1>
                <div className="d-flex">
                  <p className="mx-2">{movies[0]?.category}</p>
                  <p className="mx-2">{movies[0]?.year}</p>
                  <p className="mx-2">{movies[0]?.duration}</p>
                </div>
                <div className="d-flex mt-3">
                  <button
                    onClick={() => navigate(`/watch/${movies[0]?._id}`)}
                    className="watch_now_btn btn btn-danger"
                  >
                    Watch
                  </button>
                  <button
                    disabled={favLoad}
                    onClick={() => handleAddToFavourite(movies[0]?._id)}
                    className={`favourite_btn mx-4 btn btn-danger`}
                  >
                    <FaHeart />
                  </button>
                </div>
              </div>
            </div>

            {movies?.slice(1).map((movie, index) => (
              <div key={movie?._id} class="carousel-item">
                <img
                  src={`${process.env.API}/api/v1/movies/get-movie-image/${movie?._id}`}
                  class="d-block w-100"
                  alt="..."
                />
                <div className="carasoul__banner_datails">
                  <h1>{movie?.title}</h1>
                  <div className="d-flex">
                    <p className="mx-2">{movie?.category}</p>
                    <p className="mx-2">{movie?.year}</p>
                    <p className="mx-2">{movie?.duration}</p>
                  </div>
                  <div className="d-flex mt-3">
                    <button
                      onClick={() => navigate(`/watch/${movie?._id}`)}
                      className="watch_now_btn btn btn-danger"
                    >
                      Watch
                    </button>
                    <button
                      disabled={favLoad}
                      onClick={() => handleAddToFavourite(movie?._id)}
                      className={`favourite_btn mx-4 btn btn-danger`}
                    >
                      <FaHeart />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button
            class="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleControlsNoTouching"
            data-bs-slide="prev"
          >
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
          </button>
          <button
            class="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleControlsNoTouching"
            data-bs-slide="next"
          >
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Carasoul;
