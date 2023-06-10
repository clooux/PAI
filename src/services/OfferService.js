const daoAuction = require("../models/dao/AuctionDAO");
const daoOffer = require("../models/dao/OfferDAO");

const getAllOffers = async () => {
  const offers = await daoOffer.findAll();
  // Operacje przetworzenia tych danych
  return offers;
};

const getOffersByAuctionId = async (auctionId) => {
  const offers = await daoOffer.findAllByAuctionId(auctionId);

  return offers;
};

const postOffer = async (id, offer) => {
  const auction = await daoAuction.findById(id);
  if (!auction) {
    return {
      success: false,
    };
  }

  const offerDAO = {
    ...offer,
    submissionDate: new Date(),
    AuctionId: auction.id,
  };
  const createdOffer = await daoOffer.create(offerDAO);
  if (!createdOffer.id) {
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
  getAllOffers,
  getOffersByAuctionId,
  postOffer,
};
