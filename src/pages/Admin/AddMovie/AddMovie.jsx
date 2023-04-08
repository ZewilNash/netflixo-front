import Footer from "../../../components/layout/Footer";
import Layout from "../../../components/layout/Layout";
import AdminMenu from "../components/AdminMenu";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

const AddMovie = () => {
  const { id } = useParams();
  console.log(id);
  const [castImage, setCastImage] = useState(null);
  const [castName, setCastName] = useState("");
  const [castMovie, setCastMovie] = useState(null);
  const [targetUpdateMovie, setTargetUpdateMovie] = useState(null);
  const [movie, setMovie] = useState({
    title: "",
    language: "",
    duration: "",
    year: "",
    description: "",
    category: "",
    video: ""
  });

  const [updateMovie, setUpdateMovie] = useState({
    title: "",
    language: "",
    duration: "",
    year: "",
    description: "",
    category: "",
    video: ""
  });

  console.log(updateMovie);

  const [poster, setPoster] = useState(null);
  const [updatePoster, setUpdatePoster] = useState(null);

  useEffect(() => {
    const getMovieById = async () => {
      try {
        const { data } = await axios.get(
          `${process.env.API}/api/v1/movies/single-movie/${id}`
        );
        if (data.success) {
          setTargetUpdateMovie(data.movie);
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    getMovieById();
  }, [id]);

  const handleChange = (e) => {
    if (id && id !== null) {
      setUpdateMovie((prev) => {
        return {
          ...prev,
          [e.target.name]: e.target.value
        };
      });
    } else {
      setMovie((prev) => {
        return {
          ...prev,
          [e.target.name]: e.target.value
        };
      });
    }
  };

  const handleCreateMovie = async () => {
    try {
      const formData = new FormData();
      formData.append("title", movie.title);
      formData.append("language", movie.language);
      formData.append("duration", movie.duration);
      formData.append("year", movie.year);
      formData.append("description", movie.description);
      formData.append("category", movie.category);
      formData.append("video", movie.video);
      formData.append("image", poster);
      formData.append("downloadUrl", movie.downloadUrl);

      const { data } = await axios.post(
        `${process.env.API}/api/v1/movies/create`,
        formData
      );

      if (data.success) {
        toast.success(data.message);
        setCastMovie(data.movie._id);
        setMovie((prev) => {
          return {
            ...prev,
            title: "",
            description: "",
            category: "",
            video: "",
            year: "",
            duration: "",
            language: "",
            downloadUrl: ""
          };
        });

        setPoster(null);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  const handleUpdateMovie = async () => {
    try {
      const formData = new FormData();
      formData.append("title", updateMovie.title);
      formData.append("language", updateMovie.language);
      formData.append("duration", updateMovie.duration);
      formData.append("year", updateMovie.year);
      formData.append("description", updateMovie.description);
      formData.append("category", updateMovie.category);
      formData.append("video", updateMovie.video);
      formData.append("image", updatePoster);
      formData.append("downloadUrl", updateMovie.downloadUrl);

      const { data } = await axios.put(
        `${process.env.API}/api/v1/movies/update/${id}`,
        formData
      );

      if (data.success) {
        toast.success(data.message);
        setCastMovie(id);
        setUpdateMovie((prev) => {
          return {
            ...prev,
            title: "",
            description: "",
            category: "",
            video: "",
            year: "",
            duration: "",
            language: "",
            downloadUrl: ""
          };
        });

        setUpdatePoster(null);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleAddCastToMovie = async () => {
    try {
      const formData = new FormData();
      formData.append("castName", castName);
      formData.append("castImage", castImage);

      const { data } = await axios.post(
        `${process.env.API}/api/v1/casts/create/${castMovie}`,
        formData
      );

      if (data.success) {
        toast.success(data.message);
        setCastName("");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <Layout title="Netflix - Admin Add Movie">
      <>
        <div className="container-fluid mt-4">
          <div className="row">
            <div className="col-md-4 mt-3">
              <AdminMenu />
            </div>
            <div className="col-md-8 mt-3">
              <div className="container-fluid">
                <div className="row">
                  <div className="col-md-12">
                    <h1>{id ? "Update Movie" : "Create Movie"}</h1>
                  </div>
                </div>
              </div>
              <div className="container-fluid">
                <div className="row">
                  <div className="col-md-6">
                    <div class="mb-3">
                      <label for="exampleInputEmail1" class="form-label">
                        Movie Title
                      </label>
                      <input
                        placeholder={id && targetUpdateMovie?.title}
                        value={id ? updateMovie.title : movie.title}
                        name="title"
                        onChange={handleChange}
                        type="text"
                        class="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                      />
                    </div>
                    <div class="mb-3">
                      <label for="exampleInputPassword1" class="form-label">
                        Movie Language
                      </label>
                      <input
                        placeholder={id && targetUpdateMovie?.language}
                        value={id ? updateMovie.language : movie.language}
                        name="language"
                        onChange={handleChange}
                        type="text"
                        class="form-control"
                        id="exampleInputPassword1"
                      />
                    </div>

                    <div class="mb-3">
                      <label for="exampleInputPassword1" class="form-label">
                        Add Movie Image
                        <input
                          onChange={({ target }) => {
                            id
                              ? setUpdatePoster(target.files[0])
                              : setPoster(target.files[0]);
                          }}
                          accept="image/*"
                          type="file"
                          class="form-control"
                          id="exampleInputPassword1"
                        />
                      </label>
                    </div>

                    <div className="image-display mb-3">
                      {poster && (
                        <img
                          style={{ height: "120px" }}
                          src={URL.createObjectURL(poster)}
                          alt=""
                        />
                      )}
                      {updatePoster && (
                        <img
                          style={{ height: "120px" }}
                          src={URL.createObjectURL(updatePoster)}
                          alt=""
                        />
                      )}
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div class="mb-3">
                      <label for="exampleInputEmail1" class="form-label">
                        Movie Duration
                      </label>
                      <input
                        placeholder={id && targetUpdateMovie?.duration}
                        value={id ? updateMovie.duration : movie.duration}
                        name="duration"
                        onChange={handleChange}
                        type="text"
                        class="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                      />
                    </div>
                    <div class="mb-3">
                      <label for="exampleInputPassword1" class="form-label">
                        Movie Year
                      </label>
                      <input
                        placeholder={id && targetUpdateMovie?.year}
                        value={id ? updateMovie.year : movie.year}
                        name="year"
                        onChange={handleChange}
                        type="text"
                        class="form-control"
                        id="exampleInputPassword1"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="container-fluid">
                <div className="col-md-12">
                  <div class="mb-3">
                    <label for="exampleInputPassword1" class="form-label">
                      Movie Description
                    </label>
                    <input
                      placeholder={id && targetUpdateMovie?.description}
                      value={id ? updateMovie.description : movie.description}
                      name="description"
                      onChange={handleChange}
                      type="text"
                      class="form-control"
                      id="exampleInputPassword1"
                    />
                  </div>
                  <div class="mb-3">
                    <label for="exampleInputPassword1" class="form-label">
                      Movie Category
                    </label>
                    <input
                      placeholder={id && targetUpdateMovie?.category}
                      value={id ? updateMovie.category : movie.category}
                      name="category"
                      onChange={handleChange}
                      type="text"
                      class="form-control"
                      id="exampleInputPassword1"
                    />
                  </div>

                  <div class="mb-3">
                    <label for="exampleInputPassword1" class="form-label">
                      Add Movie Video Url
                    </label>
                    <input
                      placeholder={id && targetUpdateMovie?.video}
                      value={id ? updateMovie.video : movie.video}
                      name="video"
                      onChange={handleChange}
                      style={{ width: "100%" }}
                      type="text"
                      class="form-control"
                      id="exampleInputPassword1"
                    />
                  </div>
                  <div class="mb-3">
                    <label for="exampleInputPassword1" class="form-label">
                      Add Movie Download Url
                    </label>
                    <input
                      placeholder={id && targetUpdateMovie?.downloadUrl}
                      value={id ? updateMovie.downloadUrl : movie.downloadUrl}
                      name="downloadUrl"
                      onChange={handleChange}
                      style={{ width: "100%" }}
                      type="text"
                      class="form-control"
                      id="exampleInputPassword1"
                    />
                  </div>

                  <div className="image-video"></div>
                </div>
              </div>

              <div className="container-fluid">
                <div className="row">
                  <div className="col-md-2 mt-3">
                    <button
                      type="button"
                      class="btn btn-dark"
                      data-bs-toggle="modal"
                      data-bs-target="#castModal"
                    >
                      Add Cast
                    </button>
                  </div>
                  {/* <div className="col-md-10 mt-3">
                    <div className="">
                      <div className="row">
                        <div className="col-md-3">
                          <div class="card">
                            <img
                              style={{ height: "170px" }}
                              src="https://assets.gqindia.com/photos/6254110f5f4f4f56d4a3d7d2/2:3/w_720,h_1080,c_limit/Yash%20to%20Ram%20Charan%20These%20are%20the%2011%20highest-paid%20South%20Indian%20actors.jpg"
                              class="card-img-top"
                              alt="..."
                            />
                            <div class="card-body d-flex flex-column justify-content-center align-items-center">
                              <h6>Name Here</h6>
                              <div className="d-flex">
                                <button className="btn mx-2 btn-success">
                                  Edit
                                </button>
                                <button className="mx-2 btn btn-danger">
                                  Delete
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div> */}
                </div>
              </div>

              <div className="container-fluid mt-4">
                <div className="row">
                  <div className="col-md-12">
                    <button
                      onClick={
                        id && id !== null
                          ? handleUpdateMovie
                          : handleCreateMovie
                      }
                      style={{ width: "100%" }}
                      className="btn btn-danger"
                    >
                      Publish Movie
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Cast Modal */}
        <div class="modal" id="castModal">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title">Add Cast</h5>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div class="modal-body">
                <div class="mb-3">
                  <label for="exampleInputPassword1" class="form-label">
                    Cast Name
                  </label>
                  <input
                    value={castName}
                    onChange={({ target }) => setCastName(target.value)}
                    type="text"
                    class="form-control"
                    id="exampleInputPassword1"
                  />
                </div>
                <div class="mb-3">
                  <label for="exampleInputPassword1" class="form-label">
                    Cast Image
                  </label>
                  <input
                    onChange={({ target }) => setCastImage(target.files[0])}
                    accept="image/*"
                    type="file"
                    class="form-control"
                    id="exampleInputPassword1"
                  />
                </div>
                <div className="cast-image-display mb-3">
                  {castImage && (
                    <img
                      style={{ height: "120px" }}
                      src={URL.createObjectURL(castImage)}
                      alt=""
                    />
                  )}
                </div>
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button
                  onClick={handleAddCastToMovie}
                  type="button"
                  class="btn btn-primary"
                >
                  Add Cast
                </button>
              </div>
            </div>
          </div>
        </div>
        <Footer></Footer>
      </>
    </Layout>
  );
};

export default AddMovie;
