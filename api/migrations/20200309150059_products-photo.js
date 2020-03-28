exports.up = knex =>
    knex.schema.table('products', table => {
        table.string('photo', 200).notNullable();
    });

exports.down = knex =>
    knex.schema.table('products', table => {
        table.dropColumns('photo');
    });
