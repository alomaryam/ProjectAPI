const express = require("express");
const cors = require("cors");
const app = express();
const db = require("./db/models");

const studentRouter = require("./API/Routers/studentRouter");
const collegeRouter = require("./API/Routers/collegeRouter");
const courseRouter = require("./API/Routers/courseRouter");

app.use(cors());
app.use(express.json()); //instead of body-parser

app.use("/", studentRouter);
app.use("/", collegeRouter);
app.use("/", courseRouter);

app.use((error, request, response, next) => {
  response.status(error.status || 500);
  response.json({
    message: error.message || "Internal Server Error",
  });
});

const run = async () => {
  try {
    await db.sequelize.sync();
    console.log("Connection to the database successful!");
    await app.listen(8002, () => {
      console.log("The application is running on localhost:8002");
    });
  } catch (error) {
    console.error("Error connecting to the database: ", error);
  }
};

run();
