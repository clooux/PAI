const { DataTypes, Model } = require("sequelize");

module.exports = (sequelize) => {
  class Offer extends Model {}

  Offer.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: "Offer",
      tableName: "offers",
    }
  );
  return Offer;
};
