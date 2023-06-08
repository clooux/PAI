const { Auction } = require("../Sequelize");

const findAll = async () => {
  return await Auction.findAll()
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

module.exports = {
  findAll,
  findById,
};
