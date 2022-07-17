const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("./user.model.js")(sequelize, Sequelize);
db.jobs = require("./jobs.model.js")(sequelize, Sequelize);
db.notes = require("./notes.model.js")(sequelize, Sequelize);
db.status = require("./status.model.js")(sequelize, Sequelize);

db.jobs.belongsTo(db.user, { foreignKey: "userId" });
db.user.hasMany(db.jobs);

module.exports = db;
