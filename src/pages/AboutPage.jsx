import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import HeroWithTitle from "../components/HeroWithTitle";
import Footer from "../components/layout/Footer";
import Layout from "../components/layout/Layout";

const AboutPage = () => {
  const [usersCount, setUsersCount] = useState(0);
  const [movies, setMovies] = useState([]);

  // const getCategoryCount = movies?.map((movie) => {
  //   return movie?.category;
  // });

  // const unique_category = [...new Set(getCategoryCount)];

  useEffect(() => {
    const getUsersCount = async () => {
      try {
        const { data } = await axios.get(
          `${process.env.API}/api/v1/auth/count`
        );
        if (data.success) {
          setUsersCount(Number(data.usersCount));
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        toast.error(error.message);
      }
    };

    getUsersCount();
  }, []);

  useEffect(() => {
    const getMovies = async () => {
      try {
        const { data } = await axios.get(
          `${process.env.API}/api/v1/movies/get-movies`
        );
        if (data.success) {
          setMovies(data.movies);
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        toast.error(error.message);
      }
    };

    getMovies();
  }, []);
  return (
    <Layout title="Netflix - About Page">
      <HeroWithTitle
        title="About Us"
        src="https://raw.githubusercontent.com/thatanjan/netflix-clone-yt/youtube/media//banner.jpg"
      />

      <div className="container-fluid mt-4">
        <div className="row">
          <div className="col-md-6">
            <h1>Welcome To Our Netflix</h1>
            <small>
              We Netflix Team Are New Company Created To Provide You With Large
              Community Of Movies And People Who Are Interested In Movies We
              Still In Devoleping Mode Be One Of Our Community And Get In Touch
              With The Updates
            </small>

            <div className="row mt-3">
              <div className="col-md-6 mt-3">
                <div class="card">
                  <div class="card-body">
                    <h5 class="card-title">{movies?.length} Listed Movies</h5>
                    <p class="card-text mb-4">
                      We Are Just Started This List Will Be Updated
                      Continousslly So Keep In Touch And Don't Miss The
                      Entertainment We're More Than Happy To Have You And We
                      Hope To Provide You What You Need To Keep The Smile And
                      Keep The Vibe ..
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-6 mt-3">
                <div class="card">
                  <div class="card-body">
                    <h5 class="card-title">{usersCount} Lovely Users</h5>

                    <p class="card-text">
                      Honor Us By Being One Of Our Community We Will Add More
                      Features In The Future We Will Be More Than Happy If You
                      Become One Of Our Netflix Users
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6 mt-3">
            <img
              className="about__bottom__banner"
              src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/62862fa7-60bc-406a-abc0-a507c3d6c3fc/ddsqbx8-de2725b3-02b6-4beb-aa0a-94bb9426c2ac.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzYyODYyZmE3LTYwYmMtNDA2YS1hYmMwLWE1MDdjM2Q2YzNmY1wvZGRzcWJ4OC1kZTI3MjViMy0wMmI2LTRiZWItYWEwYS05NGJiOTQyNmMyYWMucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.UyMQ9ooOY4m1g0IkfqNFt54OxImCjz28-rBqygbxtRM"
              alt=""
            />
          </div>
        </div>
      </div>

      <Footer />
    </Layout>
  );
};

export default AboutPage;
