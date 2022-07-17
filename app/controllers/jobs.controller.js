const db = require("../models");
const Constants = require("../config/constants.js");
const Jobs = db.jobs;
const Users = db.user;
const Op = db.Sequelize.Op;

// Create and Save a new job
exports.create = (req, res) => {
  // Validate request
  if (!req.body.userId) {
    res.status(400).send({
      message: "userId can not be empty!",
    });
    return;
  }

  // Create a job
  const job = {
    userId: req.body.userId,
    name: req.body.name,
    status: Constants.JOB_STATUS.SCHEDULED,
  };

  // Save job in the database
  Jobs.create(job)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the job.",
      });
    });
};

// Retrieve all Jobs from the database.
exports.findAll = (req, res) => {
  const name = req.query.name;
  const ordered = req.query.ordered;

  var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;

  Jobs.findAll({
    where: condition,
    order: [["id", ordered ? ordered : "DESC"]],
    include: {
      model: Users,
    },
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Jobs.",
      });
    });
};

// Update a Jobs by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Jobs.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Jobs was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Jobs with id=${id}. Maybe Jobs was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Jobs with id=" + id,
      });
    });
};
