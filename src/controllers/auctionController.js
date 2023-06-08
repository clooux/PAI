const auctionService = require("../services/AuctionService");

const getAuction = async (req, res) => {
  const id = req.params.id;
  const auction = await auctionService.getAuctionById(id);
  res.render("Auction", { auction: auction });
};

module.exports = {
  getAuction,
};
