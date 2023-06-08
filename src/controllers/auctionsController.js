const auctionService = require("../services/AuctionService");

const getAuctions = async (req, res) => {
  const auctions = await auctionService.getAllAuctions();
  res.render("Auctions", { auctions: auctions });
};

module.exports = {
  getAuctions,
};
