const express = require("express");
const app = express();
const morgan = require("morgan");
const mysql = require("mysql");
const bodyParser = require("body-parser");

app.use(morgan("short"));
app.use(express.static("./public"));
app.use(bodyParser.urlencoded({ extended: false }));
//setup db connection
const getConnection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "Express_mysql"
});

//specify root route
app.get("/", (req, res) => {
  res.send("Hello from express application");
});

// Create new user
app.post("/user_create", (req, res) => {
  console.log("Trying to create a new user");

  const firstName = req.body.create_first_name;
  const lastName = req.body.create_last_name;

  const queryString = "INSERT INTO users (first_name,last_name) VALUES (?,?)";
  getConnection.query(
    queryString,
    [firstName, lastName],
    (error, results, fields) => {
      if (error) {
        console.log("Failed to insert new user:" + error);
        res.sendStatus(500);
        return;
      }
      console.log("successfully inserted new user:" + results.insertId);
      res.json();
    }
  );
});

//test some dummy rest api data
app.get("/users", (req, res) => {
  const queryString = "SELECT * FROM users";
  getConnection.query(queryString, (error, users, fields) => {
    console.log("fetched users successfully");
    res.json({ users });
  });
});

app.get("/user/:id", (req, res) => {
  const queryString = `SELECT * FROM users where id = ${req.params.id}`;
  getConnection.query(queryString, (error, users, fields) => {
    if (error) {
      console.log("Failed to query for users:" + error);
      res.sendStatus(500);
      return;
    }
    console.log("fetched users successfully");

    const fetchedUsers = users.map(user => {
      return {
        userID: user.id,
        firstName: user.first_name,
        lastName: user.last_name
      };
    });

    res.json(fetchedUsers);
  });
});

//localhost:3003
app.listen(3003, () => {
  console.log("Server is up and listening to port 3003.");
});
