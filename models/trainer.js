'use strict';
module.exports = (sequelize, DataTypes) => {
  const Trainer = sequelize.define('Trainer', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    gender: DataTypes.STRING,
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {});
  Trainer.associate = function(models) {
    // associations can be defined here
  };
  return Trainer;
};