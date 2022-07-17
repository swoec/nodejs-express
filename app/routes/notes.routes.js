module.exports = (app) => {
  const note = require("../controllers/note.controller.js");

  var router = require("express").Router();

  // Create a new note
  router.post("/", note.create);

  // Retrieve all note with conditions
  router.get("/", note.findAll);

  // Update a note with id
  router.put("/:id", note.update);

  app.use("/api/notes", router);
};
