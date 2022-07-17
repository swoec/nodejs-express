module.exports = (sequelize, Sequelize) => {
  const Job = sequelize.define("job", {
    name: {
      type: Sequelize.STRING,
    },
    status: {
      type: Sequelize.INTEGER,
    },
    userId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
        onDelete: 'cascade', 
        hooks: true
      },
    },
  });

  return Job;
};
