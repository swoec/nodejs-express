const db = require("../models");
const Notes = db.notes;
const Op = db.Sequelize.Op;

// Create and Save a new Notes
exports.create = (req, res) => {
  // Validate request
  if (!req.body.jobId) {
    res.status(400).send({
      message: "jobId can not be empty!",
    });
    return;
  }

  // Create a Note
  const note = {
    jobId: req.body.jobId,
    context: req.body.description,
  };

  // Save Notes in the database
  Notes.create(note)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the note.",
      });
    });
};

// Retrieve all Jobs from the database.
exports.findAll = (req, res) => {
  const jobId = req.query.jobId;
  var condition = jobId ? { jobId: { [Op.eq]: `%${jobId}%` } } : null;

  Notes.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Notes.",
      });
    });
};

// Update a Note by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Notes.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Notes was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Notes with id=${id}. Maybe note was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating note with id=" + id,
      });
    });
};
