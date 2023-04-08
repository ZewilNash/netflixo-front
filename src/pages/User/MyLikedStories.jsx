import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/auth";
import { BiChat, BiTrash } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import AllStories from "react-insta-stories";
import ClipLoader from "react-spinners/ClipLoader";
import { toast } from "react-toastify";

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "red"
};

const MyLikedStories = () => {
  const [stories, setStories] = useState([]);
  let [color, setColor] = useState("#ffffff");
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [auth] = useAuth();
  const navigate = useNavigate();
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
          `${process.env.API}/api/v1/stories/user-liked-stories/${auth?.user?._id}`
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
  }, [auth, deleting]);

  const handleDeleteFromLikeList = async (id) => {
    try {
      const { data } = await axios.put(
        `${process.env.API}/api/v1/stories/remove-from-like-list/${id}/${auth?.user?._id}`
      );
      if (data.success) {
        setDeleting((prev) => !prev);
        toast.success(data.message);
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  let content;

  if (loading) {
    content = (
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
    );
  } else if (stories.length === 0 || !stories) {
    content = (
      <div className="container-fluid mt-4 d-flex justify-content-center">
        <div className="row">
          <div className="col-md-1">No Stories Liked Yet!</div>
        </div>
      </div>
    );
  } else {
    content = (
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
            {stories?.map((s) => (
              <>
                <div className="d-flex justify-content-center mt-4">
                  {auth?.user?._id !== s?.user ? (
                    <>
                      <BiChat
                        onClick={() =>
                          navigate(`/chat/${auth?.user?._id}/${s?.user}`)
                        }
                        className="mx-4"
                        style={{ fontSize: "20px", cursor: "pointer" }}
                      />
                      <BiTrash
                        onClick={() => handleDeleteFromLikeList(s?._id)}
                        className="mx-4 text-danger"
                        style={{ fontSize: "20px", cursor: "pointer" }}
                      />
                    </>
                  ) : (
                    <>
                      <BiTrash
                        onClick={() => handleDeleteFromLikeList(s?._id)}
                        className="mx-4 text-danger"
                        style={{ fontSize: "20px", cursor: "pointer" }}
                      />
                    </>
                  )}
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
          </div>
        </div>
      </div>
    );
  }

  return content;
};

export default MyLikedStories;
