import Carasoul from "../components/Carasoul";
import DownloadSection from "../components/DownloadSection";
import Footer from "../components/layout/Footer";
import Layout from "../components/layout/Layout";
import Popular from "../components/Popular";
import TopRated from "../components/TopRated";

const Home = () => {
  return (
    <Layout title="Netflix-Home">
      <Carasoul />
      <Popular />
      <DownloadSection />
      <TopRated />
      <Footer />
    </Layout>
  );
};

export default Home;
