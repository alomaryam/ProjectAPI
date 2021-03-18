const express = require("express");
const router = express.Router();
const {
  studentList,
  studentCreate,
  studentUpdate,
  studentDelete,
} = require("../Controllers/studentController.js");

router.get("/", studentList);

router.post("/", studentCreate);

router.put("/:studentID", studentUpdate);

router.delete("/:studentID", studentDelete);

module.exports = router;
