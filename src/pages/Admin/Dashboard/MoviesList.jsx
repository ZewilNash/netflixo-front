import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { FaEye } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const MoviesList = () => {
  const [movies, setMovies] = useState([]);
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

  return (
    <table class="table mt-4">
      <thead>
        <tr>
          <th scope="col">Image</th>
          <th scope="col">Name</th>
          <th scope="col">Category</th>
          <th scope="col">Language</th>
          <th scope="col">Years</th>
          <th scope="col">Hours</th>
          <th scope="col">Actions</th>
        </tr>
      </thead>
      <tbody className="overflow-y-scroll" style={{ height: "400px" }}>
        {movies?.map((m) => (
          <tr key={m?._id}>
            <td>
              <img
                style={{ width: "60px", height: "40px" }}
                src={`${process.env.API}/api/v1/movies/get-movie-image/${m?._id}`}
                alt=""
              />
            </td>
            <td>{m?.title}</td>
            <td>{m?.category}</td>
            <td>{m?.language}</td>
            <td>{m?.year}</td>
            <td>{m?.duration}</td>
            <td className="d-flex">
              <button
                onClick={() => navigate(`/admin/addMovie/${m?._id}`)}
                className="btn btn-success"
              >
                Edit
              </button>
              <button
                onClick={() => navigate(`/movies/${m?._id}`)}
                className="mx-3 btn btn-danger"
              >
                <FaEye />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default MoviesList;
