import Layout from "../../components/layout/Layout";
import AboutMovie from "./AboutMovie";
import MovieCast from "./MovieCast";
import RelatedMovies from "./RelatedMovies";
import Reviews from "./Reviews";

const MovieDetails = () => {
  return (
    <Layout title="Netflix - Movie Details Page">
      <AboutMovie />
      <MovieCast />
      <Reviews />
      <RelatedMovies />
    </Layout>
  );
};

export default MovieDetails;
