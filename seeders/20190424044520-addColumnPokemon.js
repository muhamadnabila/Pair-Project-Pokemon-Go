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
        image: '/charmander.gif',
        backImage: '/charmanderBack.gif',
        TrainerId: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: null,
        level: 3,
        species: "bulbasaur",
        type: 'grass',
        hp: 1923,
        attack: 332,
        defence: 178,
        speed: 60,
        experience: 0,
        TrainerId: null,
        image: '/bulbasaur.gif',
        backImage: '/bulbasaurBack.gif',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: null,
        level: 3,
        species: "squirtle",
        type: 'water',
        hp: 1827,
        attack: 122,
        defence: 378,
        speed: 70,
        experience: 0,
        TrainerId: null,
        image: '/squirtle.gif',
        backImage: '/squirtleBack.gif',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: null,
        level: 8,
        species: "togepi",
        type: 'normal',
        hp: 2017,
        attack: 297,
        defence: 178,
        speed: 50,
        experience: 0,
        TrainerId: null,
        image: '/togepi.gif',
        backImage: '/togepiBack.gif',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: null,
        level: 5,
        species: "eevee",
        type: 'normal',
        hp: 1823,
        attack: 194,
        defence: 154,
        speed: 60,
        experience: 0,
        TrainerId: null,
        image: '/eevee.gif',
        backImage: '/eeveeBack.gif',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: null,
        level: 6,
        species: "duskull",
        type: 'ghost',
        hp: 1523,
        attack: 124,
        defence: 214,
        speed: 60,
        experience: 0,
        TrainerId: null,
        image: '/duskull.gif',
        backImage: '/duskullBack.gif',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: null,
        level: 6,
        species: "shelgon",
        type: 'dragon',
        hp: 2013,
        attack: 214,
        defence: 159,
        speed: 77,
        experience: 0,
        TrainerId: null,
        image: '/shelgon.gif',
        backImage: '/shelgonBack.gif',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Pokemons', null, {});

  }
};
