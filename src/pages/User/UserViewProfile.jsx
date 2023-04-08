import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Footer from "../../components/layout/Footer";
import Layout from "../../components/layout/Layout";
import DefaultCover from "../../images/christina-deravedisian-7hsNO61NWY0-unsplash.jpg";
import { FaLessThanEqual, FaUpload } from "react-icons/fa";
import { toast } from "react-toastify";
import { useAuth } from "../../context/auth";
import MyFavourites from "./MyFavourites";
import MyExperiences from "./MyExperiences";
import UserExperiences from "./UserExperiences";
import UserFavouriteMovies from "./UserFavouriteMovies";
import { BiMessage } from "react-icons/bi";
import UserStories from "./UserStories";
import MyStories from "./MyStories";
import MyLikedExperiences from "./MyLikedExperiences";
import UserLikedExperiences from "./UserLikedExperiences";
import UserLikedStories from "./UserLikedStories";
import MyLikedStories from "./MyLikedStories";

const UserViewProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [auth] = useAuth();
  const [loading, setLoading] = useState(false);

  const [userNavigations, setUserNavigations] = useState({
    myFav: false,
    userFav: false,
    myExp: false,
    userExp: false,
    myStories: false,
    userStories: false,
    myLikedExp: false,
    userLikedExp: false,
    userLikedStory: false,
    myLikedStory: false
  });
  const [user, setUser] = useState(null);
  const [profileCover, setProfileCover] = useState(null);
  const [cover, setCover] = useState(null);
  useEffect(() => {
    const getProfilePageUser = async () => {
      try {
        const { data } = await axios.get(
          `${process.env.API}/api/v1/auth/single-user/${id}`
        );
        if (data.success) {
          setUser(data.user);
        } else {
          console.log(data.message);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    getProfilePageUser();
  }, [id, profileCover, user]);

  useEffect(() => {
    const data = `${process.env.API}/api/v1/auth/user-cover-image/${user?._id}`;
    setCover(data);
  }, [profileCover, user]);

  const handleUpdateCover = async () => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("coverImage", profileCover);
      const { data } = await axios.put(
        `${process.env.API}/api/v1/auth/update-user-cover/${id}`,
        formData
      );

      if (data.success) {
        await setUser(data.updatedUser);
        toast.success(data.message);
        setProfileCover(null);
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

  return (
    <Layout title={`Netflix - ${user?.fullname} Profile Page`}>
      <>
        <div className="container-fluid">
          <div className="row">
            <div
              className="col-md-12"
              style={{ height: "400px", position: "relative" }}
            >
              <img
                style={{
                  width: "100px",
                  height: "100px",
                  borderRadius: "50%",
                  position: "absolute",
                  bottom: "0",
                  margin: "20px",
                  border: "3px solid #fff",
                  boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px"
                }}
                src={
                  auth?.user?.image
                    ? `${process.env.API}/api/v1/auth/user-image/${user?._id}`
                    : "https://www.citypng.com/public/uploads/small/11639648873djrwwcz5vluynavhjouvmbbv0p9u7fipechmtssjljvj35gweu4py1426hsw439wihwktmoudkgdxv59tdfnsdpmjooskdfmervu.png"
                }
                alt=""
              />
              <img
                style={{ width: "100%", height: "100%" }}
                src={
                  cover
                    ? `${process.env.API}/api/v1/auth/user-cover-image/${user?._id}`
                    : DefaultCover
                }
                alt=""
              />
            </div>
          </div>
        </div>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12">
              <nav class="navbar navbar-expand-lg bg-body-tertiary">
                <div class="container-fluid">
                  {auth?.user?._id === id ? (
                    <div className="d-flex">
                      <label
                        htmlFor="cover-image"
                        style={{
                          cursor: "pointer",
                          boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                          width: "40px",
                          height: "40px",
                          borderRadius: "50%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center"
                        }}
                      >
                        <input
                          onChange={({ target }) =>
                            setProfileCover(target.files[0])
                          }
                          style={{ display: "none" }}
                          type="file"
                          accept="image/*"
                          name=""
                          id="cover-image"
                        />
                        <FaUpload />
                      </label>
                      <button
                        disabled={loading}
                        onClick={handleUpdateCover}
                        className="border p-1 text-danger mx-2"
                      >
                        Submit
                      </button>
                    </div>
                  ) : (
                    <div>
                      <b>{user?.fullname}</b>
                      <BiMessage
                        onClick={() =>
                          navigate(`/chat/${auth?.user?._id}/${id}`)
                        }
                        style={{ cursor: "pointer" }}
                        className="mx-4"
                      />
                    </div>
                  )}

                  <button
                    class="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNavAltMarkup"
                    aria-controls="navbarNavAltMarkup"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                  >
                    <span class="navbar-toggler-icon"></span>
                  </button>
                  <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div class="navbar-nav">
                      {auth?.user?._id === id ? (
                        <>
                          <Link
                            onClick={() =>
                              setUserNavigations((prev) => {
                                return {
                                  ...prev,
                                  myExp: true,
                                  myFav: false,
                                  userExp: false,
                                  userFav: false,
                                  myStories: false,
                                  userStories: false,
                                  myLikedExp: false,
                                  userLikedExp: false,
                                  userLikedStory: false,
                                  myLikedStory: false
                                };
                              })
                            }
                            class="nav-link"
                          >
                            My Experiences
                          </Link>
                          <Link
                            onClick={() =>
                              setUserNavigations((prev) => {
                                return {
                                  ...prev,
                                  myExp: false,
                                  myFav: true,
                                  userExp: false,
                                  userFav: false,
                                  myStories: false,
                                  userStories: false,
                                  myLikedExp: false,
                                  userLikedExp: false,
                                  userLikedStory: false,
                                  myLikedStory: false
                                };
                              })
                            }
                            class="nav-link"
                          >
                            My Favourite Movies
                          </Link>
                          <Link
                            onClick={() =>
                              setUserNavigations((prev) => {
                                return {
                                  ...prev,
                                  myExp: false,
                                  myFav: false,
                                  userExp: false,
                                  userFav: false,
                                  myStories: true,
                                  userStories: false,
                                  myLikedExp: false,
                                  userLikedExp: false,
                                  userLikedStory: false,
                                  myLikedStory: false
                                };
                              })
                            }
                            class="nav-link"
                          >
                            My Stories
                          </Link>
                          <Link
                            onClick={() =>
                              setUserNavigations((prev) => {
                                return {
                                  ...prev,
                                  myExp: false,
                                  myFav: false,
                                  userExp: false,
                                  userFav: false,
                                  myStories: false,
                                  userStories: false,
                                  myLikedExp: true,
                                  userLikedExp: false,
                                  userLikedStory: false,
                                  myLikedStory: false
                                };
                              })
                            }
                            class="nav-link"
                          >
                            Experiences That I Liked
                          </Link>
                          <Link
                            onClick={() =>
                              setUserNavigations((prev) => {
                                return {
                                  ...prev,
                                  myExp: false,
                                  myFav: false,
                                  userExp: false,
                                  userFav: false,
                                  myStories: false,
                                  userStories: false,
                                  myLikedExp: false,
                                  userLikedExp: false,
                                  userLikedStory: false,
                                  myLikedStory: true
                                };
                              })
                            }
                            class="nav-link"
                          >
                            Stories That I Liked
                          </Link>
                        </>
                      ) : (
                        <>
                          <Link
                            onClick={() =>
                              setUserNavigations((prev) => {
                                return {
                                  ...prev,
                                  myExp: false,
                                  myFav: false,
                                  userExp: true,
                                  userFav: false,
                                  myStories: false,
                                  userStories: false,
                                  myLikedExp: false,
                                  userLikedExp: false,
                                  userLikedStory: false,
                                  myLikedStory: false
                                };
                              })
                            }
                            class="nav-link active"
                            aria-current="page"
                          >
                            Experiences
                          </Link>
                          <Link
                            onClick={() =>
                              setUserNavigations((prev) => {
                                return {
                                  ...prev,
                                  myExp: false,
                                  myFav: false,
                                  userExp: false,
                                  userFav: true,
                                  myStories: false,
                                  userStories: false,
                                  myLikedExp: false,
                                  userLikedExp: false,
                                  userLikedStory: false,
                                  myLikedStory: false
                                };
                              })
                            }
                            class="nav-link"
                          >
                            Favourite Movies
                          </Link>
                          <Link
                            onClick={() =>
                              setUserNavigations((prev) => {
                                return {
                                  ...prev,
                                  myExp: false,
                                  myFav: false,
                                  userExp: false,
                                  userFav: false,
                                  myStories: false,
                                  userStories: true,
                                  myLikedExp: false,
                                  userLikedExp: false,
                                  userLikedStory: false,
                                  myLikedStory: false
                                };
                              })
                            }
                            class="nav-link"
                          >
                            Stories
                          </Link>
                          <Link
                            onClick={() =>
                              setUserNavigations((prev) => {
                                return {
                                  ...prev,
                                  myExp: false,
                                  myFav: false,
                                  userExp: false,
                                  userFav: false,
                                  myStories: false,
                                  userStories: false,
                                  myLikedExp: false,
                                  userLikedExp: true,
                                  userLikedStory: false,
                                  myLikedStory: false
                                };
                              })
                            }
                            class="nav-link"
                          >
                            Liked Experiences
                          </Link>
                          <Link
                            onClick={() =>
                              setUserNavigations((prev) => {
                                return {
                                  ...prev,
                                  myExp: false,
                                  myFav: false,
                                  userExp: false,
                                  userFav: false,
                                  myStories: false,
                                  userStories: false,
                                  myLikedExp: false,
                                  userLikedExp: false,
                                  userLikedStory: true,
                                  myLikedStory: false
                                };
                              })
                            }
                            class="nav-link"
                          >
                            Liked Stories
                          </Link>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </nav>
            </div>
          </div>
        </div>
        <div className="container-fluid mt-4">
          <div className="row">
            <div className="col-md-12">
              {userNavigations.myFav && <MyFavourites />}
              {userNavigations.myExp && <MyExperiences />}
              {userNavigations.userFav && <UserFavouriteMovies id={id} />}
              {userNavigations.userExp && <UserExperiences id={id} />}
              {userNavigations.userStories && <UserStories id={id} />}
              {userNavigations.myStories && <MyStories />}
              {userNavigations.myLikedExp && <MyLikedExperiences />}
              {userNavigations.myLikedStory && <MyLikedStories />}
              {userNavigations.userLikedExp && <UserLikedExperiences id={id} />}
              {userNavigations.userLikedStory && <UserLikedStories id={id} />}
            </div>
          </div>
        </div>
      </>
      <Footer />
    </Layout>
  );
};

export default UserViewProfile;
