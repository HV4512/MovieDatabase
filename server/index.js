const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mysql = require("mysql2");
const cors = require("cors");

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "admin",
  database: "crud_movie",
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/api/get", (req, res) => {
  const sqlGet = "SELECT * FROM movie_db";
  db.query(sqlGet, (error, result) => {
    res.send(result);
  });
});

app.post("/api/post", (req, res) => {
  const { MovieName, ReleaseDate, Rating, IMDB } = req.body;
  const sqlInsert =
    "INSERT INTO movie_db (MovieName,ReleaseDate,Rating,IMDB) VALUES (?,?,?,?)";
  db.query(
    sqlInsert,
    [MovieName, ReleaseDate, Rating, IMDB],
    (error, result) => {
      if (error) {
        console.log(error);
      }
    }
  );
});

app.delete("/api/remove/:id", (req, res) => {
  const { Id } = req.params;
  const sqlRemove = "DELETE FROM movie_db WHERE id= ?";
  db.query(sqlRemove, Id, (error, result) => {
    if (error) {
      console.log(error);
    }
  });
});

app.get("/", (req, res) => {
  /* const sqlInsert =
    "INSERT INTO movie_db (movie_name,release_date,Rating,IMDB) VALUES ('Avengers','2012',8.6,'https://www.imdb.com/title/tt0848228/')";
  db.query(sqlInsert, (error, result) => {
    console.log("error", error);
    console.log("result", result);
    res.send("Hello Express");
  });*/
});

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
