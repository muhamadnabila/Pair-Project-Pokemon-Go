'use strict';
module.exports = (sequelize, DataTypes) => {
  const Pokemon = sequelize.define('Pokemon', {
    name: DataTypes.STRING,
    level: DataTypes.INTEGER,
    species: DataTypes.STRING,
    type: DataTypes.STRING,
    hp: DataTypes.INTEGER,
    attack: DataTypes.INTEGER,
    defence: DataTypes.INTEGER,
    speed: DataTypes.INTEGER,
    TrainerId: DataTypes.INTEGER
  }, {});
  Pokemon.associate = function(models) {
    // associations can be defined here
  };
  return Pokemon;
};