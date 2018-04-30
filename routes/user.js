const express = require("express");
const mysql = require("mysql");

const router = express.Router();

const pool = mysql.createPool({
  connectionLimit: 10,
  host: "localhost",
  user: "root",
  database: "Express_mysql"
});

router.get("/", (req, res) => {
  console.log("HELLO FROM ROOT ROUTE!!")
  res.send("Hello from express application and ROOT");
});

router.get("/messages", (req, res) => {
  console.log("Showing some messages");
  res.end();
});

router.get("/users", (req, res) => {
  const queryString = "SELECT * FROM users";
  pool.query(queryString, (error, users, fields) => {
    console.log("fetched users successfully");
    res.json({ users });
  });
});

router.put("/user_update", (req, res) => {
  console.log("Trying to update a current user");

  const id = req.body.user_id;
  const firstName = req.body.update_first_name;
  const lastName = req.body.update_last_name;
  const queryString = "UPDATE users SET ? WHERE id = ?";
  pool.query(
    queryString,
    [{ first_name: firstName, last_name: lastName }, id],
    (error, results, fields) => {
      if (error) {
        console.log("Failed to update user:" + error);
        res.sendStatus(500);
        return;
      }
      console.log("Successfully updated current user with id:" + results.id);
      res.json();
    }
  );
});

router.post("/user_create", (req, res) => {
  console.log("Trying to create a new user");

  const firstName = req.body.create_first_name;
  const lastName = req.body.create_last_name;

  const queryString = "INSERT INTO users (first_name,last_name) VALUES (?,?)";
  pool.query(queryString, [firstName, lastName], (error, results, fields) => {
    if (error) {
      console.log("Failed to insert new user:" + error);
      res.sendStatus(500);
      return;
    }
    console.log("successfully inserted new user:" + results.insertId);
    res.json();
  });
});

router.get("/user/:id", (req, res) => {
  const queryString = `SELECT * FROM users where id = ${req.params.id}`;
  pool.query(queryString, (error, users, fields) => {
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

module.exports = router;
