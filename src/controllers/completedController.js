const getCompleted = (req, res) => {
  res.render("completed", { title: "Completed" });
};

module.exports = {
  getCompleted,
};
