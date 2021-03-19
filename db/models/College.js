const SequelizeSlugify = require("sequelize-slugify");

module.exports = (sequelize, DataTypes) => {
  const College = sequelize.define("College", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    slug: {
      type: DataTypes.STRING,
      unique: true,
    },
    buildingNUM: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  SequelizeSlugify.slugifyModel(College, {
    source: ["name"],
  });

  return College;
};
