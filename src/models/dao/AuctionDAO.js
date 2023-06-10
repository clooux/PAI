const { Auction, sequelize } = require("../Sequelize");

const findAllActive = async () => {
  return await Auction.scope("active")
    .findAll()
    .then((data) => {
      return data;
    })
    .catch((err) => {
      return err.message;
    });
};

const findById = async (id) => {
  return await Auction.findByPk(id)
    .then((data) => {
      return data;
    })
    .catch((err) => {
      return err.message;
    });
};

const findByIdWithOffers = async (id) => {
  return await Auction.findByPk(id, {
    include: ["offers"],
  })
    .then((data) => {
      return data;
    })
    .catch((err) => {
      return err.message;
    });
};

const findAllCompleted = async () => {
  return await Auction.scope("completed")
    .findAll()
    .then((data) => {
      return data;
    })
    .catch((err) => {
      return err.message;
    });
};

const create = (auction) => {
  return Auction.create(auction)
    .then((data) => {
      return data;
    })
    .catch((err) => {
      return err.message;
    });
};

module.exports = {
  findAllActive,
  findById,
  findByIdWithOffers,
  findAllCompleted,
  create,
};
