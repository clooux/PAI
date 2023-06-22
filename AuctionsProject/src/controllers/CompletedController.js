const auctionService = require("../services/AuctionService");

const getCompletedAuction = async (req, res) => {
  const id = req.params.id;
  const auction = await auctionService.getAuctionByIdWithOffers(id);
  res.render("CompletedAuction", { auction: auction });
};

const getCompletedAuctions = async (req, res) => {
  const auctions = await auctionService.getAllCompletedAuctions();
  res.render("CompletedAuctions", { auctions: auctions });
};

module.exports = {
  getCompletedAuction,
  getCompletedAuctions,
};
