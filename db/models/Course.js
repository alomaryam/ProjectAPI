const SequelizeSlugify = require("sequelize-slugify");

module.exports = (sequelize, DataTypes) => {
  const Course = sequelize.define("Course", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    slug: {
      type: DataTypes.STRING,
      unique: true,
    },
    number: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    credit: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  SequelizeSlugify.slugifyModel(Course, {
    source: ["name"],
  });

  return Course;
};
