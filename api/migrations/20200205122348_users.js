exports.up = knex =>
    knex.schema.table('users', table => {
        table
            .string('username', 50)
            .unique()
            .notNullable();
        table.specificType('password', 'CHAR(60)').notNullable();
        table.enu('role', ['admin', 'user'], {useNative: true, enumName: 'role_type'}).defaultTo('user');
        table
            .specificType('token', 'CHAR(36)')
            .unique()
            .notNullable();
        table.string('first_name', 50).notNullable();
        table.string('last_name', 50).notNullable();
        table
            .string('email')
            .unique()
            .notNullable();
        table.string('address', 100).notNullable();
        table
            .specificType('mobile_phone', 'CHAR(12)')
            .unique()
            .notNullable();
    });

exports.down = knex =>
    knex.schema.table('users', table => {
        table.dropColumns(
            'username',
            'password',
            'role',
            'first_name',
            'last_name',
            'email',
            'address',
            'mobile_phone',
            'token'
        );
    });
