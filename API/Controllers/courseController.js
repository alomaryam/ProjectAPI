const { Course } = require("../../db/models");

//fetching
exports.fetchCourse = async (courseId, next) => {
  try {
    const course = await Course.findByPk(courseId);
    return course;
  } catch (error) {
    next(error);
  }
};

// get student list

exports.courseList = async (request, response, next) => {
  try {
    const course = await Course.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
      include: {
        model: College,
        as: "college",
        attributes: ["name"],
      },
    });
    response.status(200).json(course);
  } catch (error) {
    next(error);
  }
};

// create student

exports.courseCreate = async (request, response, next) => {
  try {
    request.body.collegeID = request.college.id;
    const newCourse = await Course.create(request.body);
    response.status(201).json(newCourse);
  } catch (error) {
    next(error);
  }
};

//update student

exports.courseUpdate = async (request, response, next) => {
  try {
    await request.course.update(request.body);
    response.status(204).end();
  } catch (error) {
    next(error);
  }
};

//delete students

exports.courseDelete = async (request, response, next) => {
  try {
    await request.course.destroy();
    response.status(204).end();
  } catch (error) {
    next(error);
  }
};
