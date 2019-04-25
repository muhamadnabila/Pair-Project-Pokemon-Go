'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
   return queryInterface.bulkInsert('Pokemons', [{
    name: 'Avce',
    level : 5,
    species : 'Absol' ,
    type : 'bug' ,
    hp : 1000,
    attack : 2000 ,
    defence : 200 ,
    speed : 49 ,
    TrainerId : 2 ,
    createdAt : new Date() ,
    updatedAt :  new Date()
  },
  {
    name: 'Asu',
    level : 2,
    species : 'Blastosie' ,
    type : 'bug' ,
    hp :299,
    attack : 200 ,
    defence : 300 ,
    speed : 20 ,
    TrainerId : 1 ,
    createdAt : new Date() ,
    updatedAt :  new Date()
  },{
    name: 'Kemope',
    level : 2,
    species : 'Blaziken' ,
    type : 'electric' ,
    hp : 1000,
    attack : 2000 ,
    defence : 200 ,
    speed : 49 ,
    TrainerId : 3 ,
    createdAt : new Date() ,
    updatedAt :  new Date()
  },{
    name: 'Hajin',
    level : 5,
    species : 'Eevee' ,
    type : 'dark' ,
    hp : 1000,
    attack : 2000 ,
    defence : 200 ,
    speed : 49 ,
    TrainerId : 1 ,
    createdAt : new Date() ,
    updatedAt :  new Date()
  },{
    name: 'Lovec',
    level : 5,
    species : 'Magikarp' ,
    type : 'electric' ,
    hp : 1000,
    attack : 2000 ,
    defence : 200 ,
    speed : 49 ,
    TrainerId : 3 ,
    createdAt : new Date() ,
    updatedAt :  new Date()
  },{
    name: 'Cermain',
    level : 5,
    species : 'Togepi' ,
    type : 'fairy' ,
    hp : 1000,
    attack : 2000 ,
    defence : 200 ,
    speed : 49 ,
    TrainerId : 3 ,
    createdAt : new Date() ,
    updatedAt :  new Date()
  },{
    name: 'Sqass',
    level : 5,
    species : 'Mewtwo' ,
    type : 'Ice' ,
    hp : 1000,
    attack : 2000 ,
    defence : 200 ,
    speed : 49 ,
    TrainerId : 3 ,
    createdAt : new Date() ,
    updatedAt :  new Date()
  },{
    name: 'Sertynn',
    level : 5,
    species : 'Moltres' ,
    type : 'poison' ,
    hp : 1000,
    attack : 2000 ,
    defence : 200 ,
    speed : 49 ,
    TrainerId : 2 ,
    createdAt : new Date() ,
    updatedAt :  new Date()
  },{
    name: 'Pooyt',
    level : 5,
    species : 'Lapras' ,
    type : 'Normal' ,
    hp : 1000,
    attack : 2000 ,
    defence : 200 ,
    speed : 49 ,
    TrainerId : 1 ,
    createdAt : new Date() ,
    updatedAt :  new Date()
  },{
    name: 'Kolinn',
    level : 5,
    species : 'Lucario' ,
    type : 'steel' ,
    hp : 1000,
    attack : 2000 ,
    defence : 200 ,
    speed : 49 ,
    TrainerId : 1 ,
    createdAt : new Date() ,
    updatedAt :  new Date()
  },{
    name: 'Lontrrr',
    level : 5,
    species : 'Mudkip' ,
    type : 'rock' ,
    hp : 1000,
    attack : 2000 ,
    defence : 200 ,
    speed : 49 ,
    TrainerId : 1 ,
    createdAt : new Date() ,
    updatedAt :  new Date()
  },{
    name: 'Mekyy',
    level : 5,
    species : 'Absol' ,
    type : 'rock' ,
    hp : 1000,
    attack : 2000 ,
    defence : 200 ,
    speed : 49 ,
    TrainerId : 2 ,
    createdAt : new Date() ,
    updatedAt :  new Date()
  },{
    name: 'Laiiu',
    level : 5,
    species : 'Lapras' ,
    type : 'rock' ,
    hp : 1000,
    attack : 2000 ,
    defence : 200 ,
    speed : 49 ,
    TrainerId : 2 ,
    createdAt : new Date() ,
    updatedAt :  new Date()
  },{
    name: 'Nemuuu',
    level : 5,
    species : 'Blastoise' ,
    type : 'bug' ,
    hp : 1000,
    attack : 2000 ,
    defence : 200 ,
    speed : 49 ,
    TrainerId : 3 ,
    createdAt : new Date() ,
    updatedAt :  new Date()
  },{
    name: 'Kilay',
    level : 5,
    species : 'Mudkip' ,
    type : 'fire' ,
    hp : 1000,
    attack : 2000 ,
    defence : 200 ,
    speed : 49 ,
    TrainerId : 1 ,
    createdAt : new Date() ,
    updatedAt :  new Date()
  },{
    name: 'Gecr',
    level : 5,
    species : 'Meowtwo' ,
    type : 'fire' ,
    hp : 1000,
    attack : 2000 ,
    defence : 200 ,
    speed : 49 ,
    TrainerId : 4 ,
    createdAt : new Date() ,
    updatedAt :  new Date()
  },{
    name: 'Tuny',
    level : 5,
    species : 'Magikarp' ,
    type : 'electric' ,
    hp : 1000,
    attack : 2000 ,
    defence : 200 ,
    speed : 49 ,
    TrainerId : 4 ,
    createdAt : new Date() ,
    updatedAt :  new Date()
  },{
    name: 'Fort',
    level : 5,
    species : 'Eevee' ,
    type : 'dark' ,
    hp : 1000,
    attack : 2000 ,
    defence : 200 ,
    speed : 49 ,
    TrainerId : 4 ,
    createdAt : new Date() ,
    updatedAt :  new Date()
  },], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
