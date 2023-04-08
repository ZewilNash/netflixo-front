import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/auth";
import AllStories from "react-insta-stories";
import { FaEdit, FaTrash } from "react-icons/fa";
import ClipLoader from "react-spinners/ClipLoader";
import { toast } from "react-toastify";

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "red"
};

const MyStories = () => {
  let [stories, setStories] = useState([]);
  let [color, setColor] = useState("#ffffff");
  const [loading, setLoading] = useState(false);

  const [auth] = useAuth();
  const storyContent = {
    width: "auto",
    maxWidth: "100%",
    maxHeight: "100%",
    margin: "auto",
    display: "flex",
    justifyContent: "center"
  };

  useEffect(() => {
    const getAllStories = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(
          `${process.env.API}/api/v1/stories/user-stories/${auth?.user?._id}`
        );
        if (data.success) {
          setStories(data.stories);
          console.log(data.message);
          setLoading(false);
        } else {
          console.log(data.message);
          setLoading(false);
        }
      } catch (error) {
        console.log(error.message);
        setLoading(false);
      }
    };
    getAllStories();
  }, [auth]);

  const handleDelete = async (id) => {
    if (confirm("Are You Sure Deleting This Experience")) {
      try {
        const { data } = await axios.delete(
          `${process.env.API}/api/v1/stories/delete/${id}`
        );
        if (data.success) {
          toast.success(data.message);
          let filteredStories = stories.filter((item) => item._id !== id);
          setStories(filteredStories);
        } else {
          console.log(data.message);
        }
      } catch (error) {
        console.log(error.message);
      }
    }
  };

  return (
    <div
      className="d-flex justify-content-center"
      style={{ width: "100vw", display: "flex", justifyContent: "center" }}
    >
      <div
        className="container-fluid"
        style={{
          maxHeight: "800px",
          overflowY: "scroll",
          width: "100vw",
          display: "flex",
          justifyContent: "center"
        }}
      >
        <div className="row d-flex justify-content-center">
          {loading ? (
            <>
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
              {stories.length === 0 || !stories ? (
                <p>No Stories Added Yet!</p>
              ) : (
                <>
                  {stories?.map((s) => (
                    <>
                      <div className="d-flex justify-content-center mt-4">
                        <FaTrash
                          style={{ cursor: "pointer" }}
                          onClick={() => handleDelete(s?._id)}
                          className="mx-3 text-danger"
                        />
                      </div>
                      <div
                        key={s._id}
                        className="d-flex justify-content-center col-md-6 col-sm-12 col-xs-12 mt-4"
                      >
                        <AllStories
                          storyStyles={storyContent}
                          stories={s.story}
                          defaultInterval={1500}
                          width={300}
                          height={400}
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            background: "red",
                            cursor: "pointer"
                          }}
                          loop={false}
                          keyboardNavigation={true}
                        />
                      </div>
                    </>
                  ))}
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyStories;
