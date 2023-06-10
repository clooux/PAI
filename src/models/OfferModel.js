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
      bidder: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      value: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      submissionDate: {
        type: DataTypes.DATE,
        allowNull: false,
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
