import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import "./AddEdit.css";
import axios from "axios";
import { toast } from "react-toastify";

const initialState = {
  MovieName: "",
  ReleaseDate: "",
  Rating: "",
  IMDB: "",
};
const AddEdit = () => {
  const [state, setState] = useState(initialState);

  const { MovieName, ReleaseDate, Rating, IMDB } = state;

  const history = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!MovieName || !ReleaseDate || !Rating || !IMDB) {
      toast.error("Fill all the fields");
    } else {
      axios
        .post("http://localhost:5000/api/post", {
          MovieName,
          ReleaseDate,
          Rating,
          IMDB,
        })
        .then(() => {
          setState({ MovieName: "", ReleaseDate: "", Rating: "", IMDB: "" });
        })
        .catch((err) => toast.error(err.response.data));
      toast.success("Movie Added Successfully");
      setTimeout(() => history.push("/"), 500);
    }
  };

  const handleInputChange = (e) => {
    const { MovieName, value } = e.target;
    setState({ ...state, [MovieName]: value });
  };

  return (
    <div style={{ marginTop: "100px" }}>
      <form
        style={{
          margin: "auto",
          padding: "15px",
          maxWidth: "400px",
          alignContent: "center",
        }}
        onSubmit={handleSubmit}
      >
        <label htmlFor="MovieName">Movie Name</label>
        <input
          type="text"
          id="MovieName"
          name="MovieName"
          placeholder="Enter Movie Name"
          value={MovieName}
          onchange={handleInputChange}
        />

        <label htmlFor="ReleaseDate">Release Date</label>
        <input
          type="text"
          id="ReleaseDate"
          name="ReleaseDate"
          placeholder="ReleaseDate"
          value={ReleaseDate}
          onchange={handleInputChange}
        />

        <label htmlFor="Rating">Rating</label>
        <input
          type="text"
          id="Rating"
          name="Rating"
          placeholder="Rating"
          value={Rating}
          onchange={handleInputChange}
        />

        <label htmlFor="IMDB">IMDB</label>
        <input
          type="text"
          id="IMDB"
          name="IMDB"
          placeholder="IMDB"
          value={IMDB}
          onchange={handleInputChange}
        />
        <input type="submit" value="save" />
        <Link to="/">
          <input type="button" value="Go Back" />
        </Link>
      </form>
    </div>
  );
};
export default AddEdit;
