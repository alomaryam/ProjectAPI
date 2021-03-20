const { College } = require("../../db/models");
const { Course } = require("../../db/models");

//fetching
exports.fetchCollege = async (collegeID, next) => {
  try {
    const college = await College.findByPk(collegeID);
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
        model: Course,
        as: "courses",
        attributes: ["id", "name"],
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
