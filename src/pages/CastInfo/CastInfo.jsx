import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Footer from "../../components/layout/Footer";
import Layout from "../../components/layout/Layout";
import { FaHeart } from "react-icons/fa";
import { toast } from "react-toastify";

const CastInfo = () => {
  const [searchParams] = useSearchParams();
  const [castMovies, setCastMovies] = useState([]);
  const [moreCastInfo, setMoreCasInfo] = useState(null);

  const [castId, setCastId] = useState(null);
  const [cast, setCast] = useState(null);
  const castName = searchParams.get("castName");

  useEffect(() => {
    const getMoreCastInfo = async () => {
      try {
        if (castName) {
          await fetch(
            `https://api.themoviedb.org/3/search/person?api_key=b771c987476691412226f670dbd476da&query=${castName}`
          )
            .then((res) => res.json())
            .then((data) => setCastId(data.results[0].id));
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    getMoreCastInfo();
  }, [castName]);

  useEffect(() => {
    const fetchCastInfo = async () => {
      try {
        const castInfoRes = await fetch(
          `https://api.themoviedb.org/3/person/${castId}?api_key=b771c987476691412226f670dbd476da&language=en-US`
        );

        const response = await castInfoRes.json();
        setMoreCasInfo(response);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchCastInfo();
  }, [castId]);

  useEffect(() => {
    const getCastInfo = async () => {
      try {
        const { data } = await axios.get(
          `${process.env.API}/api/v1/casts/get-cast-info/?castName=${castName}`
        );
        if (data.success) {
          setCastMovies(data.movies);
          setCast(data.cast);
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    getCastInfo();
  }, [castName]);

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
    <Layout title={`Netflix - Cast Page (${castName})`}>
      <div className="container-fluid mt-4 mb-5 ">
        <div className="d-flex justify-content-center align-items-center">
          <div className="row">
            <div className="col-md-6 mt-5">
              <img
                style={{ height: "200px" }}
                src={`${process.env.API}/api/v1/casts/get-cast-image/${cast?._id}`}
                class="card-img-top"
                alt="..."
              />
            </div>
            <div className="col-md-6 mt-5">
              <div className="d-flex flex-column">
                <small>
                  Name : <b className="text-danger">{cast?.castName}</b>
                </small>
                <small>
                  Biography :{" "}
                  <small className="text-danger">
                    {moreCastInfo?.biography?.substring(1, 350)}....
                  </small>
                </small>
                <small>
                  Birthday :{" "}
                  <small className="text-danger">
                    {moreCastInfo?.birthday}
                  </small>
                </small>
                <small>
                  Popularity :{" "}
                  <small className="text-danger">
                    {moreCastInfo?.popularity}
                  </small>
                </small>
                <small>
                  Place Of Birth :{" "}
                  <small className="text-danger">
                    {moreCastInfo?.place_of_birth}
                  </small>
                </small>
                <small>
                  Also Known As :{" "}
                  {moreCastInfo?.also_known_as?.length && (
                    <>
                      {moreCastInfo?.also_known_as?.map((i) => (
                        <b className="text-danger">{i},</b>
                      ))}
                    </>
                  )}
                </small>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid">
        <h5 className="mt-5">
          Related Movies To <b className="text-danger">{castName}</b>
        </h5>
        <div className="row">
          {castMovies?.map((movie) => (
            <div key={movie?._id} className="col-md-4 mt-3">
              <div class="card popular">
                <Link to={`/movies/${movie?._id}`}>
                  <img
                    style={{ height: "150px" }}
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
      <Footer />
    </Layout>
  );
};

export default CastInfo;
