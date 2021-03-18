const express = require("express");
const cors = require("cors");
const app = express();
const db = require("./db/models");

const StudentRouter = require("./API/Routers/studentRouter.js");

app.use(cors());
app.use(express.json());

app.use("/students", StudentRouter);

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
