const { Course } = require("../../db/models");
const { Student } = require("../../db/models");

//fetching
exports.fetchCourse = async (courseId, next) => {
  try {
    const course = await Course.findByPk(courseId);
    return course;
  } catch (error) {
    next(error);
  }
};

// get course list

exports.courseList = async (request, response, next) => {
  try {
    const course = await Course.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
      include: [
        {
          model: Student,
          as: "student",
          attributes: ["id", "name"],
          through: {
            attributes: [],
          },
        },
      ],
    });
    response.status(200).json(course);
  } catch (error) {
    next(error);
  }
};

// create course
// exports.courseCreate = async (request, response, next) => {
//   try {
//     // request.body.collegeId = request.college.id;

//     const newCourse = await Course.create(request.body);
//     response.status(201).json(newCourse);
//   } catch (error) {
//     next(error);
//   }
// };

// create course

exports.courseCreate = async (request, response, next) => {
  try {
    // request.body.collegeId = request.college.id;
    const newCourse = await Course.create(request.body);
    await request.body.studentId.forEach(async (id) => {
      const student = await Student.findByPk(id);
      newCourse.addStudent(student);
    });

    response.status(201).json(newCourse);
  } catch (error) {
    next(error);
  }
};

//update course

exports.courseUpdate = async (request, response, next) => {
  try {
    await request.course.update(request.body);
    response.status(204).end();
  } catch (error) {
    next(error);
  }
};

//delete course

exports.courseDelete = async (request, response, next) => {
  try {
    await request.course.destroy();
    response.status(204).end();
  } catch (error) {
    next(error);
  }
};
