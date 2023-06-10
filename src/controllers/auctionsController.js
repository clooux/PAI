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

const getAddAuction = async (req, res) => {
  res.render("AddAuction", { alert: {} });
};

const postAddAuction = async (req, res) => {
  const auction = req.body;
  const alert = await auctionService.postAuction(auction);
  res.render("AddAuction", { alert: alert });
};

module.exports = {
  getAuctions,
  getAuction,
  getAddAuction,
  postAddAuction,
};
