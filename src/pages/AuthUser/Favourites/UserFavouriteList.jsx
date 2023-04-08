import { FaEye } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

import ClipLoader from "react-spinners/ClipLoader";

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "red"
};

const UserFavouriteList = () => {
  const [loading, setLoading] = useState(false);
  const [favLoad, setFavLoad] = useState(false);
  let [color, setColor] = useState("#ffffff");
  const navigate = useNavigate();
  const [favourites, setFavourites] = useState([]);
  useEffect(() => {
    const getMovies = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(
          `${process.env.API}/api/v1/auth/get-favourite`
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
  }, []);

  return (
    <>
      <div className="container-fluid mt-3 mb-3">
        <div className="row">
          <div className="col-md-12">
            <h1>Favourite List</h1>
          </div>
        </div>
      </div>
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
          {favourites.length ? (
            <table class="table mt-4">
              <thead>
                <tr>
                  <th scope="col">Image</th>
                  <th scope="col">Title</th>
                  <th scope="col">Category</th>
                  <th scope="col">Language</th>
                  <th scope="col">Years</th>
                  <th scope="col">Hours</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody className="overflow-y-scroll" style={{ height: "400px" }}>
                {favourites?.map((f) => (
                  <tr key={f?._id}>
                    <td>
                      <img
                        style={{ width: "60px", height: "40px" }}
                        src={`${process.env.API}/api/v1/movies/get-movie-image/${f?._id}`}
                        alt=""
                      />
                    </td>
                    <td>{f?.title}</td>
                    <td>{f?.category}</td>
                    <td>{f?.language}</td>
                    <td>{f?.year}</td>
                    <td>{f?.duration}</td>
                    <td className="d-flex">
                      <button
                        onClick={() => navigate(`/watch/${f?._id}`)}
                        className="btn btn-success"
                      >
                        Download
                      </button>
                      <button
                        onClick={() => navigate(`/movies/${f?._id}`)}
                        className="mx-3 btn btn-danger"
                      >
                        <FaEye />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="conatainer-fluid p-3">
              <div className="row">
                <div className="col-md-12">
                  <p>No Favourite Movies Added Yet</p>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default UserFavouriteList;
