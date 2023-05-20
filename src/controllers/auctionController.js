const getAuction = (req, res) => {
  res.render("Auction", { title: "Auction" });
};

const getAddAuction = (req, res) => {
  res.render("AddAuction", { title: "Auction" });
};

module.exports = {
  getAuction,
  getAddAuction,
};
