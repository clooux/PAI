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

  return allActiveAuctions;
};

const postAuction = async (auction) => {
  const validTime = new Date(auction.end) >= new Date(auction.start);
  if (!validTime) {
    return {
      success: false,
    };
  }

  const isCompleted = new Date() >= new Date(auction.end);

  if (isCompleted) {
    return {
      success: false,
    };
  }

  const auctionDAO = { ...auction, completed: false };
  console.log(auctionDAO);
  const createdAuction = await daoAuction.create(auctionDAO);
  console.log(createdAuction);
  if (Object.keys(createdAuction).length === 0) {
    return {
      success: false,
    };
  } else {
    return {
      success: true,
    };
  }
};

module.exports = {
  getAllActiveAuctions,
  getAuctionById,
  getAllCompletedAuctions,
  postAuction,
};
