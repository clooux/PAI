const auctionService = require("../services/AuctionService");

const getCompleted = async (req, res) => {
  const auctions = await auctionService.getAllCompletedAuctions();
  res.render("CompletedAuctions", { auctions: auctions });
};

module.exports = {
  getCompleted,
};
