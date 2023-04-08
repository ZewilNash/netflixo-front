import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { FaHeart } from "react-icons/fa";

const SearchList = () => {
  const [searchParams] = useSearchParams();
  const [searchedMovies, setSearchedMovies] = useState([]);
  const value = searchParams.get("searchValue");

  useEffect(() => {
    const getSearchedMovies = async () => {
      try {
        const { data } = await axios.get(
          `${process.env.API}/api/v1/movies/search-movie/?searchValue=${value}`
        );

        if (data.success) {
          setSearchedMovies(data.movies);
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    getSearchedMovies();
  }, []);

  const handleAddToFavourite = async (id) => {
    try {
      const { data } = await axios.put(
        `${process.env.API}/api/v1/auth/add-to-favourite/${id}`
      );
      if (data.success) {
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Please Login First To Use This Feature");
    }
  };

  return (
    <>
      <div className="container-fluid mt-4">
        <div className="row">
          <div className="col-md-12">
            <p>
              <b className="text-danger">{searchedMovies?.length}</b> Items
              Found
            </p>
          </div>
        </div>
      </div>
      <div className="container-fluid mt-4">
        <div className="row">
          {searchedMovies?.map((movie) => (
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
        </div>
      </div>
    </>
  );
};

export default SearchList;
