const { DataTypes, Model } = require("sequelize");

module.exports = (sequelize) => {
  class Auction extends Model {
    async findAll() {
      return await this.findAll()
        .then((data) => {
          return data;
        })
        .catch((err) => {
          return err.message;
        });
    }
  }

  Auction.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      start: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      end: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
      },
      purchaser: {
        type: DataTypes.STRING,
      },
      completed: {
        type: DataTypes.BOOLEAN,
      },
    },
    {
      sequelize,
      modelName: "Auction",
      tableName: "auctions",
    }
  );
  return Auction;
};
