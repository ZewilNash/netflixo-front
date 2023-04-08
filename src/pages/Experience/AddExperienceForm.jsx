import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../../context/auth";

const AddExperienceForm = ({ setExperiencesChange }) => {
  const { id } = useParams();

  const [editedExp, setEditedExp] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showTheme, setShowTheme] = useState(true);
  const [title, setTitle] = useState(``);
  const [experience, setExperience] = useState("");
  const [theme, setTheme] = useState(null);
  const [auth] = useAuth();

  useEffect(() => {
    const getEditedExp = async () => {
      try {
        const { data } = await axios.get(
          `${process.env.API}/api/v1/experience/single/${id}`
        );
        if (data.success) {
          setEditedExp(data.experience);
        } else {
          console.log(data.message);
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    if (id) getEditedExp();
  }, [id]);

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("experience", experience);
      formData.append("theme", theme);
      const { data } = await axios.post(
        `${process.env.API}/api/v1/experience/create/${auth?.user?._id}`,
        formData
      );

      if (data.success) {
        toast.success(data.message);
        setExperiencesChange((prev) => !prev);
        setTitle("");
        setExperience("");
        setTheme("");
        setLoading(false);
      } else {
        toast.error(data.message);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const handleEdit = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("experience", experience);
      formData.append("theme", theme);
      const { data } = await axios.put(
        `${process.env.API}/api/v1/experience/update/${id}/${auth?.user?._id}`,
        formData
      );

      if (data.success) {
        toast.success(data.message);
        setExperiencesChange((prev) => !prev);
        setTitle("");
        setExperience("");
        setTheme("");
        setLoading(false);
      } else {
        toast.error(data.message);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <div
      className="container-fluid mt-4"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <div className="row">
        <div className="col-md-12" style={{ width: "100%" }}>
          <form
            onSubmit={id ? handleEdit : handleSubmit}
            style={{
              boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
              padding: "20px"
            }}
          >
            <div class="mb-3">
              <input
                value={title}
                onChange={({ target }) => setTitle(target.value)}
                type="text"
                class="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder={
                  editedExp?.title ? editedExp?.title : "What About (title) ?"
                }
              />
            </div>
            <div class="mb-3">
              <textarea
                value={experience}
                onChange={({ target }) => setExperience(target.value)}
                placeholder={
                  editedExp?.experience
                    ? editedExp?.experience
                    : "What You Want To Share With The Community?"
                }
                class="form-control"
                id="exampleInputPassword1"
              />
            </div>
            <div class="mb-3">
              <label htmlFor="exampleInputEmail1">Pick Theme</label>
              <input
                onChange={({ target }) => {
                  setTheme(target.files[0]);
                  setShowTheme(false);
                }}
                type="file"
                class="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
              />
            </div>

            <div className="mb-3">
              {id && showTheme && (
                <img
                  style={{ height: "300px" }}
                  src={`${process.env.API}/api/v1/experience/get-theme/${id}`}
                  class="card-img-top"
                  alt="..."
                />
              )}
              {theme && (
                <img
                  style={{ height: "300px" }}
                  src={URL.createObjectURL(theme)}
                  class="card-img-top"
                  alt="..."
                />
              )}
            </div>

            <button disabled={loading} type="submit" class="btn btn-primary">
              {id ? "Edit Experience" : "Post Experience"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddExperienceForm;
