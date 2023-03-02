import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import { toast } from "react-toastify";
import axios from "axios";

const Home = () => {
  const [data, setData] = useState([]);
  const loadData = async () => {
    const response = await axios.get("http://localhost:5000/api/get");
    setData(response.data);
  };

  useEffect(() => {
    loadData();
  }, []);

  const deleleContact = (Id) => {
    if (window.confirm("Are you sure ?")) {
      axios.delele(`http://localhost:5000/api/get/remove/${Id}`);
      toast.success("Deletion Successful");
      setTimeout(() => loadData(), 500);
    }
  };

  return (
    <div style={{ marginTop: "150px" }}>
      <Link to="/addContact">
        <button className="btn btn-contact">Add Movie</button>
      </Link>
      <table className="styled-table">
        <thead>
          <tr>
            <th style={{ textAlign: "center" }}>Id</th>
            <th style={{ textAlign: "center" }}>MovieName</th>
            <th style={{ textAlign: "center" }}>ReleaseDate</th>
            <th style={{ textAlign: "center" }}>Rating</th>
            <th style={{ textAlign: "center" }}>IMDB</th>
            <th style={{ textAlign: "center" }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => {
            return (
              <tr key={item.Id}>
                <th scope="row">{index + 1}</th>
                <td>{item.MovieName}</td>
                <td>{item.ReleaseDate}</td>
                <td>{item.Rating}</td>
                <td>{item.IMDB}</td>
                <td>
                  <Link to={`/update/${item.Id}`}>
                    <button className="btn btn-edit">Edit</button>
                  </Link>
                  <button
                    className="btn btn-delete"
                    onClick={() => deleleContact(item.Id)}
                  >
                    Delete
                  </button>
                  <Link to={`/view/${item.Id}`}>
                    <button className="btn btn-view">View</button>
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
