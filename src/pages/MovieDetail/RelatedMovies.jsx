import { Link } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

const RelatedMovies = () => {
  const { id } = useParams();
  const [pageId, setPageId] = useState(id);
  const [relatedMovies, setRelatedMovies] = useState([]);
  const [category, setCategory] = useState("");

  useEffect(() => {
    const getMovieById = async () => {
      try {
        const { data } = await axios.get(
          `${process.env.API}/api/v1/movies/single-movie/${id}`
        );
        if (data.success) {
          setCategory(data.movie.category);
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        toast.error(error.message);
      }
    };

    getMovieById();
  }, [id, pageId]);

  useEffect(() => {
    const getRelatedMovies = async () => {
      try {
        const { data } = await axios.get(
          `${process.env.API}/api/v1/movies/related-movie/${id}/?category=${category}`
        );
        if (data.success) {
          setRelatedMovies(data.movies);
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        toast.error(error.message);
      }
    };

    getRelatedMovies();
  }, [id, category]);

  return (
    <>
      <div className="container-fluid">
        <div className="row mt-3 mb-3">
          <div className="col-md-12">
            <h1>Related Movies</h1>
          </div>
        </div>
      </div>
      <div className="container-fluid">
        <div className="row">
          {relatedMovies?.map((movie) => (
            <div key={movie?._id} className="col-md-3">
              <div class="card popular">
                <Link
                  onClick={() => setPageId(movie?._id)}
                  to={`/movies/${movie?._id}`}
                >
                  <img
                    src={`${process.env.API}/api/v1/movies/get-movie-image/${movie?._id}`}
                    class="card-img-top"
                    alt="..."
                  />
                </Link>
                <div class="card-body">
                  <p class="card-text mt-2">{movie?.title}</p>
                  <button className="favourite_btn mx-4 btn btn-danger">
                    <FaHeart />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default RelatedMovies;
