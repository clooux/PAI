const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "mysql",
    operatorsAliases: false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  }
);

const db = {};

db.sequelize = sequelize;

// Modele danych
db.Auction = require("./AuctionModel.js")(sequelize);
// db.blog = require("./blog.js")(sequelize, Sequelize);

// // - Powiazania bazodanowe pomiedzy modelami
// db.user.hasMany(db.blog); // jeden - do wielu (1-N)
// db.blog.belongsTo(db.user); // zwiazek encji

db.sequelize
  .sync({ force: true }) // false - nienadpisuje struktury bazy
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });

module.exports = db;
