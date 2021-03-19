const SequelizeSlugify = require("sequelize-slugify");

module.exports = (sequelize, DataTypes) => {
  const Course = sequelize.define("Course", {
    name: {
      type: DataTypes.STRING,
    },
    slug: {
      type: DataTypes.STRING,
      unique: true,
    },
    number: {
      type: DataTypes.STRING,
    },
    credit: {
      type: DataTypes.STRING,
    },
  });

  SequelizeSlugify.slugifyModel(Course, {
    source: ["name"],
  });

  return Course;
};
