module.exports = (sequelize, Sequelize) => {
  const Status = sequelize.define("status", {
    key: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    label: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  });

  return Status;
};
