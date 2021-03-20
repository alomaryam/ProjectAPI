const { Student } = require("../../db/models");
const { Course } = require("../../db/models");

//fetching
exports.fetchStudent = async (studentId, next) => {
  try {
    const student = await Student.findByPk(studentId);
    return student;
  } catch (error) {
    next(error);
  }
};

// get student list

exports.studentList = async (request, response, next) => {
  try {
    const student = await Student.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
      include: {
        model: Course,
        as: "course",
        attributes: ["id", "name"],
        through: {
          attributes: [],
        },
      },
    });

    response.status(200).json(student);
  } catch (error) {
    next(error);
  }
};

// create student

exports.studentCreate = async (request, response, next) => {
  try {
    const newStudent = await Student.create(request.body);
    response.status(201).json(newStudent);
  } catch (error) {
    next(error);
  }
};

//update student

exports.studentUpdate = async (request, response, next) => {
  try {
    await request.student.update(request.body);
    response.status(204).end();
  } catch (error) {
    next(error);
  }
};

//delete students

exports.studentDelete = async (request, response, next) => {
  try {
    await request.student.destroy();
    response.status(204).end();
  } catch (error) {
    next(error);
  }
};
