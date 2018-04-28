const express = require("express");
const app = express();
const morgan = require("morgan");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const router = require("./routes/user");

app.use(morgan("short"));
app.use(express.static("./public"));
app.use(methodOverride("X-HTTP-Method-Override"));
app.use(methodOverride("_method"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(
  methodOverride(function(req, res) {
    if (req.body && typeof req.body === "object" && "_method" in req.body) {
      var method = req.body._method;
      delete req.body._method;
      return method;
    }
  })
);

app.use(router);


app.listen(3003, () => {
  console.log("Server is up and listening to port 3003.");
});
