const getAuctions = (req, res) => {
  res.render("auctions", { title: "Auctions" });
};

module.exports = {
  getAuctions,
};
