'use strict';
module.exports = (sequelize, DataTypes) => {
  const Trainer = sequelize.define('Trainer', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    gender: DataTypes.STRING,
    username: {
      type: DataTypes.STRING,
      validate: {
        takenUsername(username) {
          return Trainer.findOne({
            where: {
              username: username
            }
          })
            .then(found => {
              if (found) throw new Error(`Username: ${username} already taken :(`)
            })
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          args: true,
          msg: `Must be an email format!`
        },
        takenEmail(email) {
          return Trainer.findOne({
            where: {
              email: email
            }
          })
            .then(found => {
              if (found) throw new Error(`Email: ${email} already taken :(`)
            })
        }
      }
    },
    password: DataTypes.STRING
  }, {});
  Trainer.associate = function (models) {
    Trainer.hasMany(models.Pokemon)
  };
  return Trainer;
};