const { College } = require("../../db/models");
const { courseCreate } = require("./courseController");

//fetching
exports.fetchCollege = async (collegeId, next) => {
  try {
    const college = await College.findByPk(collegeId);
    return college;
  } catch (error) {
    next(error);
  }
};

// get student list

exports.collegeList = async (request, response, next) => {
  try {
    const college = await College.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
      include: {
        model: courseCreate,
        as: "courses",
        attributes: ["id"],
      },
    });
    response.status(200).json(college);
  } catch (error) {
    next(error);
  }
};

// create student

exports.collegeCreate = async (request, response, next) => {
  try {
    const newCollege = await College.create(request.body);
    response.status(201).json(newCollege);
  } catch (error) {
    next(error);
  }
};

//update student

exports.collegeUpdate = async (request, response, next) => {
  try {
    await request.college.update(request.body);
    response.status(204).end();
  } catch (error) {
    next(error);
  }
};

//delete students

exports.collegeDelete = async (request, response, next) => {
  try {
    await request.college.destroy();
    response.status(204).end();
  } catch (error) {
    next(error);
  }
};
