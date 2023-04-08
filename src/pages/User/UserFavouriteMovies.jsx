import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { FaHeart } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "red"
};

const UserFavouriteMovies = ({ id }) => {
  const [favourites, setFavourites] = useState([]);
  let [color, setColor] = useState("#ffffff");
  const [loading, setLoading] = useState(false);
  const [favLoad, setFavLoad] = useState(false);
  const navigate = useNavigate();

  const handleAddToFavourite = async (movieId) => {
    setFavLoad(true);
    try {
      const { data } = await axios.put(
        `${process.env.API}/api/v1/auth/add-to-favourite/${movieId}`
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

  useEffect(() => {
    const getMovies = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(
          `${process.env.API}/api/v1/auth/get-favourite-movies/${id}`
        );
        if (data.success) {
          setFavourites(data.userFavouriteMovies);
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
  }, [id]);
  return (
    <div className="container-fluid">
      <div className="row">
        {loading ? (
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
        ) : (
          <>
            {favourites.length === 0 || !favourites ? (
              <div className="container-fluid mt-4 d-flex justify-content-center">
                <div className="row">
                  <div className="col-md-1">
                    No Movies Liked By This User Yet!
                  </div>
                </div>
              </div>
            ) : (
              <>
                {favourites?.map((movie) => (
                  <div key={movie?._id} className="col-md-3 mt-2">
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
                          disabled={favLoad}
                          onClick={() => handleAddToFavourite(movie?._id)}
                          className="favourite_btn mx-1 btn btn-danger"
                        >
                          <FaHeart />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default UserFavouriteMovies;
