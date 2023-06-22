const getIndex = (req, res) => {
  res.render("Index", { title: "Express" });
};

module.exports = {
  getIndex,
};
