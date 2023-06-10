const { Offer } = require("../Sequelize");

const create = (auction) => {
  return Offer.create(auction)
    .then((data) => {
      return data;
    })
    .catch((err) => {
      return err.message;
    });
};

module.exports = {
  create,
};
