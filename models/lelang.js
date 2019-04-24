'use strict';
module.exports = (sequelize, DataTypes) => {
  const Lelang = sequelize.define('Lelang', {
    TrainerId: DataTypes.INTEGER,
    PokemonId: DataTypes.INTEGER
  }, {});
  Lelang.associate = function(models) {
    // associations can be defined here
  };
  return Lelang;
};