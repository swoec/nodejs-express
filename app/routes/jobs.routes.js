module.exports = (app) => {
  const jobs = require("../controllers/jobs.controller.js");

  var router = require("express").Router();

  // Create a new jobs
  router.post("/", jobs.create);

  // Retrieve all jobs with conditions
  router.get("/", jobs.findAll);

  // Update a jobs with id
  router.put("/:id", jobs.update);

  app.use("/api/jobs", router);
};
