import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const MovieCast = () => {
  const { id } = useParams();
  const [casts, setCasts] = useState([]);
  useEffect(() => {
    const getMovieCasts = async () => {
      try {
        const { data } = await axios.get(
          `${process.env.API}/api/v1/casts/get-movie-casts/${id}`
        );
        if (data.success) {
          setCasts(data.casts);
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        toast.error(error.message);
      }
    };

    getMovieCasts();
  }, [id]);

  return (
    <>
      <div className="container-fluid">
        <div className="row mt-3 mb-3">
          <div className="col-md-12">
            <h1>Movie Cast</h1>
          </div>
        </div>
      </div>
      <div className="container-fluid">
        <div className="row">
          {casts?.map((cast) => (
            <div className="col-md-4">
              <Link
                to={`/castInfo/?castName=${cast?.castName}`}
                key={cast?._id}
              >
                <div class="mt-2">
                  <div class="card">
                    <img
                      style={{ height: "200px" }}
                      src={`${process.env.API}/api/v1/casts/get-cast-image/${cast?._id}`}
                      class="card-img-top"
                      alt="..."
                    />
                    <div class="card-body bg-dark text-center text-light">
                      <p class="card-text">{cast?.castName}</p>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default MovieCast;
