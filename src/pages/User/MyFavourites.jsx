import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { FaTrash, FaVideo } from "react-icons/fa";
import { BiVideo } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import { useAuth } from "../../context/auth";

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "red"
};

const MyFavourites = () => {
  let [favourites, setFavourites] = useState([]);
  const [deleting, setDeleting] = useState(false);
  const [removing, setRemoving] = useState(false);
  const [auth] = useAuth();
  let [color, setColor] = useState("#ffffff");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const getMovies = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(
          `${process.env.API}/api/v1/auth/get-favourite`
        );
        if (data.success) {
          setFavourites(data.userFavouriteMovies);
          toast.success(data.message);
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
  }, [auth, removing]);

  const handleRemove = async (id) => {
    setDeleting(true);
    try {
      const { data } = await axios.put(
        `${process.env.API}/api/v1/auth/delete-from-favourite/${id}`
      );

      if (data.success) {
        toast.success(data.message);
        setDeleting(false);
        setTimeout(() => {
          setRemoving((prev) => !prev);
        }, 3000);
      } else {
        console.log(data.message);
        setDeleting(false);
      }
    } catch (error) {
      console.log(error);
      setDeleting(false);
    }
  };

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
                    No Movies Added To Favourite Yet!
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
                          disabled={deleting}
                          onClick={() => handleRemove(movie?._id)}
                          className="favourite_btn mx-1 btn btn-danger"
                        >
                          <FaTrash />
                        </button>
                        <button
                          onClick={() => navigate(`/watch/${movie?._id}`)}
                          className="favourite_btn mx-1 btn btn-secondary"
                        >
                          <BiVideo
                            onClick={() => navigate(`/watch/${movie?._id}`)}
                          />
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

export default MyFavourites;
