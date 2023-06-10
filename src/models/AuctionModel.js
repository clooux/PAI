const { DataTypes, Model } = require("sequelize");

module.exports = (sequelize) => {
  class Auction extends Model {}

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
      entity: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      budget: {
        type: DataTypes.FLOAT,
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
      completed: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
    },
    {
      scopes: {
        active: {
          where: {
            completed: 0,
          },
        },
        completed: {
          where: {
            completed: 1,
          },
        },
      },
      sequelize,
      modelName: "Auction",
      tableName: "auctions",
    }
  );
  return Auction;
};
