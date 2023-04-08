import { HiArrowNarrowLeft } from "react-icons/hi";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FaHeart, FaDownload } from "react-icons/fa";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const WatchHeader = () => {
  const { id } = useParams();
  const [title, setTitle] = useState(null);
  const [movie, setMovie] = useState(null);
  const [favLoad, setFavLoad] = useState(false);

  const navigate = useNavigate();
  useEffect(() => {
    const getMovieById = async () => {
      try {
        const { data } = await axios.get(
          `${process.env.API}/api/v1/movies/single-movie/${id}`
        );
        if (data.success) {
          setTitle(data.movie.title);
          setMovie(data.movie);
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        toast.error(error.message);
      }
    };

    getMovieById();
  }, [id]);

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
    <div className="container-fluid mt-4 mb-6">
      <div className="row">
        <div className="col-md-9">
          <div className="d-flex align-items-center">
            <HiArrowNarrowLeft
              style={{ cursor: "pointer" }}
              onClick={() => navigate(`/movies/${id}`)}
            />
            <h1 className="mx-3">{title}</h1>
          </div>
        </div>
        <div className="col-md-3">
          <div className="d-flex">
            <button
              disabled={favLoad}
              onClick={() => handleAddToFavourite(id)}
              className="btn btn-danger"
            >
              <FaHeart />
            </button>
            {/* <Link
              // target="_blank"
              to={`${movie?.downloadUrl}`}
              className="btn btn-danger mx-3"
            >
              <FaDownload /> Download
            </Link> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WatchHeader;
