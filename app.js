const express = require("express");
const app = express();
const morgan = require("morgan");
const mysql = require("mysql");

app.use(morgan("short"));

//setup db connection
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "Express_mysql"
});

//specify root route
app.get("/", (req, res) => {
  res.send("Hello from express application");
});

//test some dummy rest api data
app.get("/users", (req, res) => {
  const queryString = "SELECT * FROM users";
  connection.query(queryString, (error, users, fields) => {
    console.log("fetched users successfully");
    res.json({ users });
  });
});

app.get("/user/:id", (req, res) => {
  const queryString = `SELECT * FROM users where id = ${req.params.id}`;
  connection.query(queryString, (error, users, fields) => {
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
