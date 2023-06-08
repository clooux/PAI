const daoAuction = require("../models/dao/AuctionDAO");

const getAllAuctions = async () => {
  const allAuctions = await daoAuction.findAll();
  // Operacje przetworzenia tych danych
  return allAuctions;
};

const getAuctionById = async (id) => {
  const auction = await daoAuction.findById(id);

  return auction;
};

module.exports = {
  getAllAuctions,
  getAuctionById,
};
