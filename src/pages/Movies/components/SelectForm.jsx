import { Select } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const SelectForm = ({ setFilteredMovies }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  let categoryValue = searchParams.get("categoryValue");
  console.log(categoryValue);
  const [category, setCategory] = useState("");
  const [movies, setMovies] = useState([]);
  const [reviews, setreviews] = useState([]);
  const [year, setYear] = useState("");
  const [rate, setRate] = useState("");
  const [duration, setDuration] = useState("");

  const getYears = movies?.map((movie) => {
    return movie?.year;
  });
  const getDuration = movies?.map((movie) => {
    return movie?.duration;
  });
  const getRate = reviews?.map((review) => {
    return review?.rate;
  });
  const getCategory = movies?.map((movie) => {
    return movie?.category;
  });

  const unique_years = [...new Set(getYears)];
  const unique_duration = [...new Set(getDuration)];
  const unique_rates = [...new Set(getRate)];
  const unique_category = [...new Set(getCategory)];

  useEffect(() => {
    const getMovies = async () => {
      try {
        const { data } = await axios.get(
          `${process.env.API}/api/v1/movies/get-movies`
        );
        if (data.success) {
          setMovies(data.movies);
        } else {
          console.log(data.message);
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    getMovies();
  }, []);

  useEffect(() => {
    const getReviews = async () => {
      try {
        const { data } = await axios.get(
          `${process.env.API}/api/v1/reviews/get-reviews`
        );
        if (data.success) {
          setreviews(data.reviews);
        } else {
          console.log(data.message);
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    getReviews();
  }, []);

  useEffect(() => {
    const sortMovies = async () => {
      try {
        if (category || categoryValue !== null) {
          const { data } = await axios.get(
            `${process.env.API}/api/v1/movies/filter-movie/?category=${
              category ? category : categoryValue
            }`
          );
          if (data.success) {
            setFilteredMovies(data.movies);
          }
        }
        if (year) {
          const { data } = await axios.get(
            `${process.env.API}/api/v1/movies/filter-movie/?year=${year}`
          );
          if (data.success) {
            setFilteredMovies(data.movies);
          }
        }
        if (duration) {
          const { data } = await axios.get(
            `${process.env.API}/api/v1/movies/filter-movie/?duration=${duration}`
          );
          if (data.success) {
            setFilteredMovies(data.movies);
          }
        }
        if (rate) {
          const { data } = await axios.get(
            `${process.env.API}/api/v1/reviews/rate-filter/?rate=${rate}`
          );
          if (data.success) {
            setFilteredMovies(data.moviesBaseOnRate);
          }
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    sortMovies();
  });

  return (
    <div className="row p-4">
      <div className="col-md-3 mt-3 col-sm-12 col-xs-12">
        <small>Choose Category</small>
        <Select
          onChange={(value) => {
            setCategory(value);
            setSearchParams("");
            setTimeout(() => {
              setCategory("");
            }, 2000);
          }}
          style={{ width: "100%" }}
          value={category}
          showSearch
          disabled={year || duration || rate}
        >
          {unique_category?.map((category) => (
            <Select.Option key={category} value={category}>
              {category}
            </Select.Option>
          ))}
        </Select>
      </div>
      <div className="col-md-3 mt-3 col-sm-12 col-xs-12">
        <small>Choose year</small>
        <Select
          onChange={(value) => {
            setYear(value);
            setTimeout(() => {
              setYear("");
            }, 2000);
          }}
          style={{ width: "100%" }}
          value={year}
          showSearch
          disabled={category || duration || rate}
        >
          {unique_years?.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </Select>
      </div>
      <div className="col-md-3 mt-3 col-sm-12 col-xs-12">
        <small>Choose duration</small>
        <Select
          onChange={(value) => {
            setDuration(value);
            setTimeout(() => {
              setDuration("");
            }, 2000);
          }}
          style={{ width: "100%" }}
          value={duration}
          showSearch
          disabled={year || category || rate}
        >
          {unique_duration?.map((duration) => (
            <option key={duration} value={duration}>
              {duration}
            </option>
          ))}
        </Select>
      </div>
      <div className="col-md-3 mt-3 col-sm-12 col-xs-12">
        <small>Choose rate (depends on users reviews)</small>
        <Select
          onChange={(value) => {
            setRate(value);
            setTimeout(() => {
              setRate("");
            }, 2000);
          }}
          showSearch
          disabled={year || category || duration}
          style={{ width: "100%" }}
          value={rate}
        >
          {unique_rates?.map((rate) => (
            <option key={rate} value={rate}>
              {rate}
            </option>
          ))}
        </Select>
      </div>
    </div>
  );
};

export default SelectForm;
