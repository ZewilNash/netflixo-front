import axios from "axios";
import { useEffect, useState } from "react";
import { BiMovie, BiCategory, BiUser } from "react-icons/bi";
import { toast } from "react-toastify";

const DashboardHeader = () => {
  const [usersCount, setUsersCount] = useState(0);
  const [movies, setMovies] = useState([]);

  const getCategoryCount = movies?.map((movie) => {
    return movie?.category;
  });

  const unique_category = [...new Set(getCategoryCount)];

  useEffect(() => {
    const getUsersCount = async () => {
      try {
        const { data } = await axios.get(
          `${process.env.API}/api/v1/auth/count`
        );
        if (data.success) {
          setUsersCount(Number(data.usersCount));
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        toast.error(error.message);
      }
    };

    getUsersCount();
  }, []);

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
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-12">
          <h1>Dashbard</h1>
        </div>
      </div>
      <div className="row">
        <div className="col-md-4 mt-3">
          <div class="card">
            <div class="card-body d-flex flex-column justify-content-center align-items-center">
              <BiMovie
                style={{ fontSize: "30px" }}
                className="mb-4 text-danger"
              />
              <p>
                Total Movies : <b>{movies?.length}</b>
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-4 mt-3">
          <div class="card">
            <div class="card-body d-flex flex-column justify-content-center align-items-center">
              <BiCategory
                style={{ fontSize: "30px" }}
                className="mb-4 text-danger"
              />
              <p>
                Total Categories : <b>{unique_category.length}</b>
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-4 mt-3">
          <div class="card">
            <div class="card-body d-flex flex-column justify-content-center align-items-center">
              <BiUser
                style={{ fontSize: "30px" }}
                className="mb-4 text-danger"
              />
              <p>
                Total Users : <b>{usersCount}</b>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
