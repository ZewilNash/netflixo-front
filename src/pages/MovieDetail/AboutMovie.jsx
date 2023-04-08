import axios from "axios";
import { useEffect, useState } from "react";
import { FaShare, FaDownload } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import ShareModal from "./ShareModal";

const AboutMovie = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const getMovieById = async () => {
      try {
        const { data } = await axios.get(
          `${process.env.API}/api/v1/movies/single-movie/${id}`
        );
        if (data.success) {
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

  const navigate = useNavigate();
  return (
    <>
      <div className="container-fluid movie__details justify-content-center align-items-center mt-4">
        <div className="row justify-content-center align-items-center">
          <div className="col-md-4">
            <img
              className="w-100"
              src={`${process.env.API}/api/v1/movies/get-movie-image/${movie?._id}`}
              alt=""
            />
          </div>
          <div className="col-md-4 mt-4">
            <h1>{movie?.title}</h1>
            <div className="d-flex">
              <p className="text-light bg-danger p-1">HD 4K</p>
              <p className="mx-2">{movie?.language}</p>
              <p className="mx-2">{movie?.year}</p>
              <p className="mx-2">{movie?.duration}</p>
            </div>
            <small>{movie?.description}</small>
            <div className="align-items-center mt-4 text-light bg-dark d-flex">
              <button
                data-bs-toggle="modal"
                data-bs-target="#shareModal"
                className="mx-3 btn btn-secondary"
              >
                <FaShare />
              </button>
              <p className="mt-3 mx-4">Language:{movie?.language}</p>
              <button
                onClick={() => navigate(`/watch/${movie?._id}`)}
                className="btn btn-dark border-danger mx-5"
              >
                watch
              </button>
            </div>
          </div>
          <div className="col-md-4">
            <button
              onClick={() => navigate(`/watch/${movie?._id}`)}
              className="btn btn-danger w-100 mt-4"
            >
              Download <FaDownload />
            </button>
          </div>
        </div>
      </div>

      <ShareModal movie={movie} />
    </>
  );
};

export default AboutMovie;
