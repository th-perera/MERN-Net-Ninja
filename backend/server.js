require("dotenv").config(); //attach env variables to the process.env object
const express = require("express");
const mongoose = require("mongoose");
const workoutRoutes = require("./routes/workoutRoutes");

//express app
const app = express();

// Middlewre
//if any request that comes in has a body, it parses and attaches to the request object
app.use(express.json());
// this callback function will fire every requests that comes into the server
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

//routes  - .use will attach all the get,post .. methods to app
app.use("/api/workouts", workoutRoutes);

//connect to db
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    //listen for requests
    app.listen(process.env.PORT, () => {
      console.log("Connected to DB & Listening on port", process.env.PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });
