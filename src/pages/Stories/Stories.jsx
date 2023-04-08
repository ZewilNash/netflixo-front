import axios from "axios";
import { useEffect, useState } from "react";
import Footer from "../../components/layout/Footer";
import Layout from "../../components/layout/Layout";
import { useAuth } from "../../context/auth";
import AllStories from "react-insta-stories";
import StoryForm from "./StoryForm";
import { FaHeart } from "react-icons/fa";
import { BiChat } from "react-icons/bi";
import { Badge } from "antd";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import ClipLoader from "react-spinners/ClipLoader";

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "red"
};

const Stories = () => {
  const [loading, setLoading] = useState(false);
  let [color] = useState("#ffffff");

  const navigate = useNavigate();
  const [stories, setStories] = useState([]);
  const [getStories, setGetStories] = useState(false);
  const [likes, setLikes] = useState(null);
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
    setLoading(true);
    const getAllStories = async () => {
      try {
        const { data } = await axios.get(
          `${process.env.API}/api/v1/stories/stories`
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
  }, [auth, getStories, likes, setLikes]);

  const handleStoryLike = async (id) => {
    try {
      const { data } = await axios.put(
        `${process.env.API}/api/v1/stories/like/${id}/${auth?.user?._id}`
      );

      if (data.success) {
        console.log(data.message);
        setLikes(getLikeCount(id));
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const getLikeCount = async (id) => {
    try {
      const { data } = await axios.get(
        `${process.env.API}/api/v1/stories/likeCount/${id}`
      );
      if (data.success) {
        console.log(data.success);
        return data.likesCount;
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <Layout title="Netflix - Stories">
      <StoryForm setGetStories={setGetStories} />
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
                {" "}
                {stories?.map((s) => (
                  <>
                    <div
                      key={s?.user}
                      className="d-flex justify-content-center mt-4"
                    >
                      <Badge count={s?.likes?.length}>
                        <FaHeart
                          onClick={() => handleStoryLike(s?._id)}
                          style={{ fontSize: "20px", cursor: "pointer" }}
                        />
                      </Badge>
                      {auth?.user?._id !== s?.user && (
                        <BiChat
                          onClick={() =>
                            navigate(`/chat/${auth?.user?._id}/${s?.user}`)
                          }
                          className="mx-4"
                          style={{ fontSize: "20px", cursor: "pointer" }}
                        />
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
              </>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </Layout>
  );
};

export default Stories;
