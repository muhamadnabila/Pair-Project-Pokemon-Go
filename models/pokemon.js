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
    experience: DataTypes.INTEGER,
    TrainerId: DataTypes.INTEGER,
    image: DataTypes.STRING,
    backImage: DataTypes.STRING
  }, {
      hooks: {
        afterUpdate: (pokemon, option) => {
          if (pokemon.experience >= 100) {
            pokemon.update({
              level: pokemon.level + 1,
              hp: pokemon.hp + Math.round(Math.random() * (100 - 200) + 200),
              attack: pokemon.attack + Math.round(Math.random() * (20 - 10) + 10),
              defence: pokemon.defence + Math.round(Math.random() * (20 - 10) + 10),
              speed: pokemon.speed + Math.round(Math.random() * (10 - 5) + 5),
              experience: 0
            })
          }
        },
        beforeUpdate: (pokemon, option) => {
          if (option.PokemonIdUser) {
            return sequelize.models.Lelang.destroy({
              where: { PokemonIdUser: option.PokemonIdUser }
            })
          }
        }
      }
    });

  Pokemon.associate = function (models) {
    Pokemon.belongsTo(models.Trainer)
  };
  return Pokemon;
};