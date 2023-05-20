const getAuctions = (req, res) => {
  res.render("Auctions", { title: "Auctions" });
};

module.exports = {
  getAuctions,
};
