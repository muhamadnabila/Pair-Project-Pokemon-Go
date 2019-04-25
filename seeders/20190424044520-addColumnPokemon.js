'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Pokemons', [
      {
        name: null,
        level: 5,
        species: "charmander",
        type: 'fire',
        hp: 3027,
        attack: 332,
        defence: 233,
        speed: 75,
        experience: 0,
        image: 'https://vignette.wikia.nocookie.net/pokemon/images/f/f5/Charmander_XY.gif/revision/latest?cb=20150201050431',
        backImage: 'https://vignette.wikia.nocookie.net/pokemon/images/2/23/Charmander_Back_XY.gif/revision/latest?cb=20141009063457',
        TrainerId: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: null,
        level: 3,
        species: "bulbasaur",
        type: 'grass',
        hp: 2027,
        attack: 232,
        defence: 278,
        speed: 60,
        experience: 0,
        TrainerId: null,
        image: 'https://vignette.wikia.nocookie.net/pokemon/images/0/00/Bulbasaur_XY.gif/revision/latest?cb=20140319081443',
        backImage: 'https://vignette.wikia.nocookie.net/pokemon/images/7/74/Bulbasaur_XY_Back.gif/revision/latest?cb=20140201094741',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: null,
        level: 3,
        species: "squirtle",
        type: 'water',
        hp: 2027,
        attack: 232,
        defence: 278,
        speed: 60,
        experience: 0,
        TrainerId: null,
        image: 'https://vignette.wikia.nocookie.net/pokemon/images/e/e0/Squirtle_XY.gif/revision/latest?cb=20140319084442',
        backImage: 'https://vignette.wikia.nocookie.net/pokemon/images/d/d8/Squirtle_XY_Back_Sprite.gif/revision/latest?cb=20141031154426',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: null,
        level: 4,
        species: "togepi",
        type: 'normal',
        hp: 2017,
        attack: 297,
        defence: 178,
        speed: 50,
        experience: 0,
        TrainerId: null,
        image: 'https://vignette.wikia.nocookie.net/pokemon/images/1/13/Togepi_XY.gif/revision/latest?cb=20150106144618',
        backImage: 'https://vignette.wikia.nocookie.net/pokemon/images/0/0d/Togepi_Back_XY.gif/revision/latest?cb=20150106144617',
        createdAt: new Date(),
        updatedAt: new Date()
      }
      

    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Pokemons', null, {});

  }
};
