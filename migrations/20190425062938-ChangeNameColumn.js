'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
   return queryInterface.renameColumn('Lelangs', 'TrainerId','PokemonIdUser').then(()=>{
     return queryInterface.renameColumn('Lelangs','PokemonId','PokemonIdFriend')
   })

  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
   return queryInterface.renameColumn('Lelangs', 'PokemonIdUser','TrainerId').then(()=>{
    return queryInterface.renameColumn('Lelangs','PokemonIdFriend','PokemonId')
  })
  }
};
