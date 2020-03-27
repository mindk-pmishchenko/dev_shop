exports.up = knex =>
    knex.schema
        .createTable('users', table => {
            table.increments('id');
            table.timestamps(true, true);
        })
        .createTable('categories', table => {
            table.increments('id');
            table.timestamps(true, true);
        })
        .createTable('orders', table => {
            table.increments('id');
            table.timestamps(true, true);
        })
        .createTable('products', table => {
            table.increments('id');
            table.timestamps(true, true);
        });

exports.down = knex =>
    knex.schema
        .dropTable('users')
        .dropTable('categories')
        .dropTable('orders')
        .dropTable('products');
