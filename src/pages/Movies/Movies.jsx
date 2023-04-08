import Layout from "../../components/layout/Layout";
import SelectForm from "./components/SelectForm";
import MoviesDisplay from "./components/MoviesDisplay";
import Footer from "../../components/layout/Footer";
import { useState } from "react";

const Movies = () => {
  const [filteredMovies, setFilteredMovies] = useState([]);
  return (
    <Layout title="Netflix-Movies">
      <SelectForm setFilteredMovies={setFilteredMovies} />
      <MoviesDisplay filteredMovies={filteredMovies} />
      <Footer />
    </Layout>
  );
};

export default Movies;
