module.exports = (sequelize, Sequelize) => {
  const Note = sequelize.define("note", {
    jobId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    context: {
      type: Sequelize.STRING,
    },
  });

  return Note;
};
