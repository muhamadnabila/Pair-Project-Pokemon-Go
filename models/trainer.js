'use strict';
const bcrypt = require('bcryptjs')
const salt = bcrypt.genSaltSync(10)
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
    password: DataTypes.STRING,
    imageProfile : DataTypes.STRING
  }, {
    hooks : {
      beforeCreate : (trainer,option)=>{
        trainer.password = bcrypt.hashSync(`${trainer.password}`, salt)
        trainer.imageProfile = '/default.jpg'
      }
    }
  });
  Trainer.prototype.comparePass = function(password){
    return bcrypt.compareSync(password, this.password)
  }
  Trainer.associate = function (models) {
    Trainer.hasMany(models.Pokemon)
  };
  return Trainer;
};