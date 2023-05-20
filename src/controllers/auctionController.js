const getAuction = (req, res) => {
  res.render("auction", { title: "Auction" });
};

const getAddAuction = (req, res) => {
  res.render("auction", { title: "Auction" });
};

module.exports = {
  getAuction,
  getAddAuction,
};
