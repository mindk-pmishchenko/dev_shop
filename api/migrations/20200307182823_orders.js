exports.up = knex =>
    knex.schema.table('orders', table => {
        table.integer('user_id').notNullable();
        table
            .foreign('user_id')
            .references('users.id')
            .onUpdate('CASCADE')
            .onDelete('CASCADE');
        table.decimal('total_price', 8, 2).notNullable();
        table.enu('status', ['canceled', 'done', 'new'], {useNative: true, enumName: 'status_type'}).defaultTo('new');
    });

exports.down = knex =>
    knex.schema.table('orders', table => {
        table.dropColumns('user_id', 'total_price', 'status');
    });
