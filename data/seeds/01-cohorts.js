
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('cohorts').del()
    .then(function () {
      // Inserts seed entries
      return knex('cohorts').insert([
        {id: 1, name: 'Maxime Salomon'},
        {id: 2, name: 'Bob Dylan'},
        {id: 3, name: 'Johhny Hallyday'}
      ]);
    });
};
