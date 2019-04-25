'use strict';
module.exports = (sequelize, DataTypes) => {
  const Offer = sequelize.define('Offer', {
    LelangId: DataTypes.INTEGER,
    TrainerId: DataTypes.INTEGER,
    status: DataTypes.STRING
  }, {});
  Offer.associate = function(models) {
    // associations can be defined here
  };
  return Offer;
};