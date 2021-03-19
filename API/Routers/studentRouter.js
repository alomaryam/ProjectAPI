const express = require("express");
const router = express.Router();
const {
  studentList,
  studentCreate,
  studentUpdate,
  studentDelete,
  fetchStudent,
} = require("../Controllers/studentController.js");

router.param("studentID", async (request, response, next, studentID) => {
  const student = await fetchStudent(studentID, next);
  if (student) {
    request.student = student;
    next();
  } else {
    const error = new Error("Student Not Found");
    error.status = 404;
    next(error);
  }
});

router.get("/", studentList);

router.post("/", studentCreate);

router.put("/:studentID", studentUpdate);

router.delete("/:studentID", studentDelete);

module.exports = router;
