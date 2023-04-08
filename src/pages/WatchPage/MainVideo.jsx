import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const MainVideo = () => {
  const { id } = useParams();
  const [videoUrl, setVideoUrl] = useState(null);

  useEffect(() => {
    const getMovieById = async () => {
      try {
        const { data } = await axios.get(
          `${process.env.API}/api/v1/movies/single-movie/${id}`
        );
        if (data.success) {
          setVideoUrl(data.movie);
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        toast.error(error.message);
      }
    };

    getMovieById();
  }, [id]);

  const autoOpenAlink = (url = ``) => {
    window.open(url, "open testing page in a same tab page");
  };

  return (
    <div className="container-fluid mt-9">
      <div className="row mt-6">
        <div
          style={{ height: "50vh", textAlign: "center" }}
          className="col-md-12 d-flex flex-column align-items-center justify-content-center mt-6"
        >
          {videoUrl?.title === "John Wick: Chapter 4" ? (
            <>
              <iframe
                className="mt-5"
                style={{ height: "100vh", width: "100%" }}
                title={id}
                src={videoUrl?.video}
              ></iframe>
              <small className="text-danger mt-3">
                This Movie Is Currently Unavailable We Will Provide It Soon
              </small>
            </>
          ) : (
            <>
              <iframe
                style={{
                  minHeight: "400px",
                  width: "100%",
                  marginTop: "400px"
                }}
                title={id}
                src={videoUrl?.video}
              ></iframe>
              {/* <img
                style={{ marginTop: "450px", height: "350px" }}
                className="w-100"
                src={`${process.env.API}/api/v1/movies/get-movie-image/${videoUrl?._id}`}
                alt=""
              /> */}
              <Link
                onClick={() => autoOpenAlink(videoUrl?.downloadUrl)}
                // to={`${videoUrl?.downloadUrl}`}
                className="mt-5 btn btn-danger mx-3"
              >
                Click To Watch
              </Link>
              <small className="mt-5">
                You can download the movie also{" "}
                <b className="text-danger">Enjoy</b>
              </small>
              <small>
                All you will do is just click the 3 dots at the left side of the
                video then choose download
              </small>
              <small className="mt-3 text-danger">
                We still working on the player so If the movie didn't show
                please don't bother we will fix it soon
              </small>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default MainVideo;
