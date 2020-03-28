exports.up = knex =>
    knex.schema.createTable('order_details', table => {
        table.increments('id');
        table.integer('quantity').notNullable();
        table.decimal('sum_price', 8, 2);
        table.integer('product_id').notNullable();
        table.foreign('product_id').references('products.id');
        table.integer('order_id').notNullable();
        table
            .foreign('order_id')
            .references('orders.id')
            .onUpdate('CASCADE')
            .onDelete('CASCADE');
    });

exports.down = knex => knex.schema.dropTable('order_details');
