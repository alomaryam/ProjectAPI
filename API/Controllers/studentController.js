const { Student } = require("../../db/models");

// get student list

exports.studentList = async (request, response) => {
  try {
    const student = await Student.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });
    response.status(200).json(student);
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
};

// create student

exports.studentCreate = async (request, response) => {
  try {
    const newStudent = await Student.create(request.body);
    response.status(201).json(newStudent);
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
};

//update student

exports.studentUpdate = async (request, response) => {
  const { studentID } = request.params;
  try {
    const foundStudent = await Student.findByPk(studentID);
    if (foundStudent) {
      await foundStudent.update(request.body);
      response.status(204).end();
    } else {
      response.status(404).json({ message: "Student not found" });
    }
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
};

//delete students

exports.studentDelete = async (request, response) => {
  const { studentID } = request.params;
  try {
    const foundStudent = await Student.findByPk(studentID);
    if (foundStudent) {
      await foundStudent.destroy();
      response.status(204).end();
    } else {
      response.status(404).json({ message: "Student not found" });
    }
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
};
