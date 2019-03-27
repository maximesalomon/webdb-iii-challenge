
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('students').del()
    .then(function () {
      // Inserts seed entries
      return knex('students').insert([
        {id: 1, name: 'Maxime Salomon', cohort_id: 1},
        {id: 2, name: 'Valentin Damien', cohort_id: 2},
        {id: 3, name: 'Bob Dylan', cohort_id: 1}
      ]);
    });
};
