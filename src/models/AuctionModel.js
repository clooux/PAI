const { DataTypes, Model } = require("sequelize");
const { Op } = require("sequelize");

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
            end: {
              [Op.gt]: new Date(),
            },
          },
        },
        completed: {
          where: {
            end: {
              [Op.lte]: new Date(),
            },
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
