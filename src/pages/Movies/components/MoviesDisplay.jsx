import axios from "axios";
import { useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import ClipLoader from "react-spinners/ClipLoader";

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "red"
};

const MoviesDisplay = ({ filteredMovies }) => {
  const [loading, setLoading] = useState(false);
  const [favLoad, setFavLoad] = useState(false);
  let [color, setColor] = useState("#ffffff");
  const [moviesCount, setMoviesCount] = useState(0);
  const [movies, setMovies] = useState([]);

  const chooseToDisplay =
    filteredMovies.length === 0
      ? []
      : filteredMovies.length > 0
      ? filteredMovies
      : movies;

  useEffect(() => {
    const getMoviesCount = async () => {
      try {
        const { data } = await axios.get(
          `${process.env.API}/api/v1/movies/movies-count`
        );
        if (data.success) {
          setMoviesCount(data.moviesCount);
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        toast.error(error.message);
      }
    };

    getMoviesCount();
  }, []);

  useEffect(() => {
    const getMovies = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(
          `${process.env.API}/api/v1/movies/get-movies`
        );
        if (data.success) {
          setMovies(data.movies);
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
      <div className="row p-3 mt-3 mb-3">
        <div className="col-md-12">
          <p>
            Total Items Found Are{" "}
            <b className="text-danger">
              {filteredMovies.length === 0
                ? movies.length
                : chooseToDisplay.length}
            </b>
          </p>
        </div>
      </div>
      <div className="container-fluid">
        <div className="row">
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
              {" "}
              {chooseToDisplay?.map((movie) => (
                <div key={movie?._id} className="col-md-3 mt-2">
                  <div class="card popular">
                    <Link to={`/movies/${movie?._id}`}>
                      <img
                        style={{ height: "150px" }}
                        src={`${process.env.API}/api/v1/movies/get-movie-image/${movie?._id}`}
                        class="card-img-top"
                        alt="..."
                      />
                    </Link>
                    <div class="card-body">
                      <p class="card-text mt-2">{movie?.title}</p>
                      <button
                        disabled={favLoad}
                        onClick={handleAddToFavourite}
                        className="favourite_btn mx-4 btn btn-danger"
                      >
                        <FaHeart />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              {!filteredMovies.length &&
                movies?.map((movie) => (
                  <div key={movie?._id} className="col-md-3 mt-2">
                    <div class="card popular">
                      <Link to={`/movies/${movie?._id}`}>
                        <img
                          style={{ height: "150px" }}
                          src={`${process.env.API}/api/v1/movies/get-movie-image/${movie?._id}`}
                          class="card-img-top"
                          alt="..."
                        />
                      </Link>
                      <div class="card-body">
                        <p class="card-text mt-2">{movie?.title}</p>
                        <button
                          disabled={favLoad}
                          onClick={handleAddToFavourite}
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
      </div>
    </>
  );
};

export default MoviesDisplay;
