var chai = require("chai"),
  expect = chai.expect;
var request = require("request");
const db = require("../models");
const Constants = require("../config/constants.js");
const app = require("../../server.js");
const Jobs = db.jobs;
const Users = db.user;
const Notes = db.notes;
chai.use(require("chai-sorted"));

describe("test jobs APIs", function () {
  before(async function () {
    await Jobs.destroy({ where: {} });
    await Users.destroy({ where: {} });
    await Notes.destroy({ where: {} });

    await Users.bulkCreate([
      { id: 1, name: "Alex", phone: "0221345", address: "Auckland" },
      { id: 2, name: "Adam", phone: "0123458", address: "New market" },
    ]);

    await Jobs.bulkCreate([
      { id: 1, name: "firstJob", status: 1, userId: 1 },
      { id: 2, name: "secondJob", status: 1, userId: 2 },
      { id: 3, name: "thirdJob", status: 1, userId: 1 },
    ]);

    await Notes.bulkCreate([
        { id: 1, jobId:1, context:"job 1 note" },
        { id: 2, jobId:2, name: "job 2 note" },
    ]);
  });

  it("jobs filter ", async function (done) {
    let url = "http://localhost:8080/api/jobs?name=job";

    request(url, function (error, response, body) {
      expect(response.statusCode).to.equal(200);
      expect(JSON.parse(response.body)).to.have.lengthOf(3);
      done();
    });
  });

  it("jobs sorted ", async function (done) {
    let url = "http://localhost:8080/api/jobs?ordered=ASC";

    request(url, function (error, response, body) {
      expect(response.statusCode).to.equal(200);
      expect(JSON.parse(response.body)).to.be.ascendingBy("id");
      done();
    });
  });

  it("job status update", async function (done) {
    let url = "http://localhost:8080/api/jobs/1";

    request({ url: url, method: "PUT", json: { status: 2 } }, function (error, response, body) {
      expect(response.statusCode).to.equal(200);
      expect(response.body).to.have.property("message").to.eq("Jobs was updated successfully.");
      done();
    });
  });

  it("job status update fail", async function (done) {
    let url = "http://localhost:8080/api/jobs/4";

    request({ url: url, method: "PUT", json: { status: 2 } }, function (error, response, body) {
      expect(response.statusCode).to.equal(200);
      expect(response.body).to.have.property("message").to.eq("Cannot update Jobs with id=4. Maybe Jobs was not found or req.body is empty!");
      done();
    });
  });

  it("note creates ", async function (done) {
    let url = "http://localhost:8080/api/notes";
    request(
      {
        url: url,
        method: "POST",
        json: {
          jobId: 1,
          description: "testjobs3 notes",
        },
      },
      function (error, response, body) {
        expect(response.statusCode).to.equal(200);
        expect(response.body).to.have.property("jobId").to.eq(1);
        done();
      }
    );
  });

  it("notes update", async function (done) {
    
    let url = "http://localhost:8080/api/notes/1";
    request({ url: url, method: "PUT", json: { jobId: 1, context: "note changes" } }, function (error, response, body) {
      expect(response.statusCode).to.equal(200);
      expect(response.body).to.have.property("message").to.eq("Notes was updated successfully.");
      done();
    });
  });

  it("notes update fail", async function (done) {
    
    let url = "http://localhost:8080/api/notes/4";
    request({ url: url, method: "PUT", json: { jobId: 1, context: "note changes" } }, function (error, response, body) {
      expect(response.statusCode).to.equal(200);
      expect(response.body).to.have.property("message").to.eq("Cannot update Notes with id=4. Maybe note was not found or req.body is empty!");
      done();
    });
  });

  after(async function () {
    await Jobs.destroy({ where: {} });
    await Users.destroy({ where: {} });
    await Notes.destroy({ where: {} });
  });
});
