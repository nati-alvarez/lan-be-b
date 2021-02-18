exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('roles').del()
    .then(function () {
      // Inserts seed entries
      return knex('roles').insert([
        {id: 1, name: 'admin', permission_id: 1},
        {id: 2, name: 'moderator', permission_id: 2},
        {id: 3, name: 'alumni', permission_id: 3}       
      ]);
    });
};
