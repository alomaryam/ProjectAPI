const SequelizeSlugify = require("sequelize-slugify");

module.exports = (sequelize, DataTypes) => {
  const College = sequelize.define("College", {
    name: {
      type: DataTypes.STRING,
    },
    slug: {
      type: DataTypes.STRING,
      unique: true,
    },
    buildingNUM: {
      type: DataTypes.STRING,
    },
  });

  SequelizeSlugify.slugifyModel(College, {
    source: ["name"],
  });

  return College;
};
