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
  }, {
      hooks: {
        beforeUpdate: (pokemon, option) => {
          if (option.PokemonIdUser) {
            return sequelize.models.Lelang.destroy({
              where: {
                PokemonIdUser: option.PokemonIdUser
              }
            })
          }
        }
      }
    });
  Pokemon.associate = function (models) {
    Pokemon.belongsTo(models.Trainer)
    // Pokemon.hasMany(models.Lelang,{foreignKey : 'PokemonIdUser'})
    // Pokemon.hasMany(models.Lelang, {as: 'PokemonUser', foreignKey: 'PokemonIdUser'})
    // Pokemon.hasMany(models.Lelang, {as: 'PokemonFriend', foreignKey: 'PokemonIdFriend'})
    // Pokemon.belongsToMany(models.Pokemon,{through : models.Lelang,as : 'PokemonUser',foreignKey : 'PokemonIdUser'})
    // Pokemon.belongsToMany(models.Pokemon,{through : models.Lelang,as : 'PokemonFriend',foreignKey : 'PokemonIdFriend'})

  };
  return Pokemon;
};