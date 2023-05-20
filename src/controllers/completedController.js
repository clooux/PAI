const getCompleted = (req, res) => {
  res.render("Completed", { title: "Completed" });
};

module.exports = {
  getCompleted,
};
