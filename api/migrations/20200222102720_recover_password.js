exports.up = knex =>
    knex.schema.table('users', table => {
        table.specificType('reset_password_token', 'CHAR(36)').unique();
        table.date('reset_password_expires');
    });

exports.down = knex =>
    knex.schema.table('users', table => table.dropColumns('reset_password_token', 'reset_password_expires'));
