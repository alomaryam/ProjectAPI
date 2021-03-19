const express = require("express");
const router = express.Router();
const {
  courseList,
  courseCreate,
  courseUpdate,
  courseDelete,
  fetchCourse,
} = require("../Controllers/courseController.js");

router.param("courseID", async (request, response, next, courseID) => {
  const course = await fetchStudent(courseID, next);
  if (course) {
    request.course = course;
    next();
  } else {
    const error = new Error("Course Not Found");
    error.status = 404;
    next(error);
  }
});

router.get("/", courseList);

router.post("/college/:collegeID/courses", courseCreate);

router.put("/:courseID", courseUpdate);

router.delete("/:courseID", courseDelete);

module.exports = router;
