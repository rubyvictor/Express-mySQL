const express = require("express");
const app = express();
const morgan = require("morgan");
const mysql = require('mysql');

app.use(morgan("short"));

//specify root route
app.get("/", (req, res) => {
  console.log("Responding to root route");
  res.send("Hello from express application");
});

//test some dummy rest api data
app.get("/users", (req, res) => {
  const user1 = { fistName: "Tom", lastName: "Cruise" };
  const user2 = { firstName: "Tommy", lastName: "HillFinger" };
  const user3 = { firstName: "Margo", lastName: "Pennelope" };

  res.json({ user1, user2, user3 });
});

app.get("/user/:id",(req,res)=>{
    console.log(`fetching user with id ${req.params.id}`)
    
    const connection = mysql.createConnection({
        host: "localhost",
        user: "root",
        database: "Express_mysql"
    })

    const queryString = `SELECT * FROM users where id = ${req.params.id}`
    connection.query(queryString,[],(error, users,fields)=>{
        console.log("fetched users successfully")
        res.json(users)
    })

})


//localhost:3003
app.listen(3003, () => {
  console.log("Server is up and listening to port 3003.");
});
