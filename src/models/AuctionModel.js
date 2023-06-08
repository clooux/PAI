const { DataTypes, Model } = require("sequelize");

module.exports = (sequelize) => {
  class Auction extends Model {
    static associate({ Offer }) {
      // define association here
      this.hasMany(Offer, { as: "offers" });
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
      scopes: {
        active: {
          where: {
            completed: !true,
          },
        },
        completed: {
          where: {
            completed: true,
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
