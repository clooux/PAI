const auctionService = require("../services/AuctionService");
const offerService = require("../services/AuctionService");

const getOffer = async (req, res) => {
  const id = req.params.id;
  const auction = await auctionService.getAuctionById(id);
  res.render("Offer", { auction: auction });
};

const createOffer = async (req, res) => {};

module.exports = {
  getOffer,
};
