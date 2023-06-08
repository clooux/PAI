const auctionService = require("../services/AuctionService");

const getAuctions = async (req, res) => {
  const auctions = await auctionService.getAllActiveAuctions();
  res.render("Auctions", { auctions: auctions });
};

const getAuction = async (req, res) => {
  const id = req.params.id;
  const auction = await auctionService.getAuctionById(id);
  res.render("Auction", { auction: auction });
};

const addAuction = async (req, res) => {
  res.render("AddAuction");
};

module.exports = {
  getAuctions,
  getAuction,
  addAuction,
};
