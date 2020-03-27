exports.up = knex =>
    knex.schema.table('products', table => {
        table
            .string('name', 50)
            .unique()
            .notNullable();
        table
            .string('slug', 50)
            .unique()
            .notNullable();
        table.text('description').notNullable();
        table.decimal('price', 8, 2);
        table.jsonb('properties');
        table.integer('category_id').notNullable();
        table.foreign('category_id').references('categories.id');
    });

exports.down = knex =>
    knex.schema.table('products', table => {
        table.dropColumns('name', 'slug', 'description', 'price', 'properties', 'category_id');
    });
