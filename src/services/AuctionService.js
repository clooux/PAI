const daoAuction = require("../models/dao/AuctionDAO");

const getAllActiveAuctions = async () => {
  const allActiveAuctions = await daoAuction.findAllActive();
  // Operacje przetworzenia tych danych
  return allActiveAuctions;
};

const getAuctionById = async (id) => {
  const auction = await daoAuction.findById(id);

  return auction;
};

const getAllCompletedAuctions = async () => {
  const allActiveAuctions = await daoAuction.findAllCompleted();
  // Operacje przetworzenia tych danych
  return allActiveAuctions;
};

module.exports = {
  getAllActiveAuctions,
  getAuctionById,
  getAllCompletedAuctions,
};
