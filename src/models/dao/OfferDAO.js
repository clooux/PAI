const { Offer } = require("../Sequelize");

const findAll = async () => {
  return await Offer.findAll()
    .then((data) => {
      return data;
    })
    .catch((err) => {
      return err.message;
    });
};

const findById = async (id) => {
  return await Offer.findByPk(id)
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
