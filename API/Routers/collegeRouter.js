const express = require("express");
const router = express.Router();
const {
  collegeList,
  collegeCreate,
  collegeUpdate,
  collegeDelete,
  fetchCollege,
} = require("../Controllers/collegeController.js");

router.param("collegeID", async (request, response, next, collegeID) => {
  const college = await fetchCollege(collegeID, next);
  if (college) {
    request.college = college;
    next();
  } else {
    const error = new Error("College Not Found");
    error.status = 404;
    next(error);
  }
});

router.get("/", collegeList);

router.post("/", collegeCreate);

router.put("/:collegeID", collegeUpdate);

router.delete("/:collegeID", collegeDelete);

module.exports = router;
