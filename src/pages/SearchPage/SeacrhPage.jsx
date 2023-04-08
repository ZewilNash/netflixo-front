import Footer from "../../components/layout/Footer";
import Layout from "../../components/layout/Layout";
import SearchList from "./SeacrhList";

const SearchPage = () => {
  return (
    <>
      <Layout title="Netflix - Search Page">
        <SearchList />
        <Footer />
      </Layout>
    </>
  );
};

export default SearchPage;
