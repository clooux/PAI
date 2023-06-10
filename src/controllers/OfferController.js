const offerService = require("../services/OfferService");

const getOffer = async (req, res) => {
  const id = req.params.id;
  res.render("Offer", { id: id, alert: {} });
};

const postOffer = async (req, res) => {
  const id = req.params.id;
  const offer = req.body;
  const alert = await offerService.postOffer(id, offer);
  res.render("Offer", { id: id, alert: alert });
};

module.exports = {
  getOffer,
  postOffer,
};
