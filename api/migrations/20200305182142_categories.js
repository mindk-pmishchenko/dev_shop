exports.up = knex =>
    knex.schema.table('categories', table => {
        table
            .string('name', 50)
            .unique()
            .notNullable();
        table
            .string('slug', 50)
            .unique()
            .notNullable();
        table
            .string('description', 100)
            .unique()
            .notNullable();
        table.integer('parent_id');
        table.foreign('parent_id').references('categories.id');
    });

exports.down = knex =>
    knex.schema.table('categories', table => {
        table.dropColumns('name', 'slug', 'description', 'parent_id');
    });
