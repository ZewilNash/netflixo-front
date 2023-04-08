import axios from "axios";
import { useState } from "react";
import Footer from "../../components/layout/Footer";
import Layout from "../../components/layout/Layout";
import AddExperienceForm from "./AddExperienceForm";
import Experiences from "./Experiences";

const Experience = () => {
  const [searchedExperiences, setSearchedExperiences] = useState([]);
  const [experiencesChange, setExperiencesChange] = useState(false);
  const handleSearch = async (e) => {
    if (e.target.value.length === 0) {
      setSearchedExperiences([]);
    }
    try {
      const { data } = await axios.get(
        `${process.env.API}/api/v1/experience/search/?value=${e.target.value}`
      );
      if (data.success) {
        setSearchedExperiences(data.experiences);
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <Layout title="Netflix - Experience Page">
      <div className="experience" style={{ minHeight: "100vh" }}>
        <div className="container-fluid mt-3 m-4">
          <div className="row">
            <div className="col-md-5">
              <input
                onChange={handleSearch}
                style={{
                  width: "100%",
                  outline: "none",
                  border: "none",
                  borderBottom: "1px solid gray"
                }}
                type="text"
                placeholder="Search Experience Via Title.."
              />
            </div>
          </div>
        </div>
        <AddExperienceForm
          experiencesChange={experiencesChange}
          setExperiencesChange={setExperiencesChange}
        />
        <Experiences
          experiencesChange={experiencesChange}
          setExperiencesChange={setExperiencesChange}
          setSearchedExperiences={setSearchedExperiences}
          searchedExperiences={searchedExperiences}
        />
      </div>
      <Footer />
    </Layout>
  );
};

export default Experience;
