const auctionService = require("../services/AuctionService");

const getCompleted = async (req, res) => {
  const auctions = await auctionService.getAllAuctions();
  res.render("Completed", { auctions: auctions });
};

module.exports = {
  getCompleted,
};
