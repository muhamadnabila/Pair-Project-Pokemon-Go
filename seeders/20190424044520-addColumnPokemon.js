'use strict';

// charmender,4,3027,332,233,fire,75,1
// bulbasaur,3,2027,232,233,grass,57,2
// squirtle,2,1027,132,133,water,32,3
// wartotle,7,4023,432,523,water,75,3
// starmie,5,4987,456,483,water,65,1
// ledyba,4,3024,332,293,grass,75,2
// ledyan,9,9027,932,673,grass,75,3
// blastoise,10,9222,727,742,water,98,1
// squirtle,4,3027,332,233,water,75,1
// wartotle,6,5027,232,113,water,5,2
// staryu,7,5432,500,500,water,2,1

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
        TrainerId: null,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Pokemons', null, {});

  }
};
