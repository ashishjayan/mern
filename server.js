const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const items = require("./routes/api/items");
const app = express();
const port = process.env.PORT || 5001;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const mydb = require("./config/keys").mongoURI;

mongoose
  .connect(mydb)
  .then(() => console.log("MONGODB CONNECTION IS ACTIVE"))
  .catch(err => console.log(err));

// API calls
app.get("/api/hello", (req, res) => {
  res.send({
    express:
      "This text shows that node server is running and our api is working"
  });
});

app.post("/api/world", (req, res) => {
  console.log(req.body);
  res.send(
    `My name is ${
      req.body.post
    }. I am testing React Front End talking with the Back End`
  );
});
//USE API ROUTES
app.use("/api/items", items);

//////THIS IS FOR LATER IF We have time. We can deploy our application to HEROKU or some NODE
if (process.env.NODE_ENV === "production") {
  // Serve any static files
  app.use(express.static(path.join(__dirname, "client/build")));

  // Handle React routing, return all requests to React app
  app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "client/build", "index.html"));
  });
}

app.listen(port, () => console.log(`Listening on port ${port}`));
