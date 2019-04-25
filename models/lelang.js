'use strict';
module.exports = (sequelize, DataTypes) => {
  const Lelang = sequelize.define('Lelang', {
    PokemonIdUser: DataTypes.INTEGER,
    PokemonIdFriend: DataTypes.INTEGER,
    TrainerId: DataTypes.INTEGER
  }, {
    hooks : {
      beforeCreate :(user,options)=> {
          user.status = 0,
          sequelize.models.Pokemon.update(
            {TrainerId : null},
            {
              where : {
                id :  options.PokemonId
              }
            }
          )
      }
    }
  });
  Lelang.associate = function(models) {
    // associations can be defined here
    Lelang.belongsTo(models.Pokemon, {as : 'PokemonUser', foreignKey : 'PokemonIdUser' })
    Lelang.belongsTo(models.Pokemon, {as : 'PokemonFriend', foreignKey : 'PokemonIdFriend' })

    // Lelang.belongsToMany(models.Pokemon, {through : models.Lelang,as : 'PokemonFriend', foreignKey : 'PokemonIdFriend' })
  };
  return Lelang;
};