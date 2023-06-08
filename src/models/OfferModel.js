const { DataTypes, Model } = require("sequelize");

module.exports = (sequelize) => {
  class Offer extends Model {
    static associate({ Auction }) {
      this.belongsTo(Auction);
    }
  }

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
      },
      value: {
        type: DataTypes.FLOAT,
      },
      submissionDate: {
        type: DataTypes.DATE,
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
