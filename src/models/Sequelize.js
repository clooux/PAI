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
db.Offer = require("./OfferModel.js")(sequelize);

db.Auction.hasMany(db.Offer);
db.Offer.belongsTo(db.Auction);

db.sequelize
  .sync() // false - nienadpisuje struktury bazy { force: true }
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });

module.exports = db;
