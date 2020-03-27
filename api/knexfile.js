const {knexSnakeCaseMappers} = require('objection');

const {DB_DRIVER, POSTGRES_HOST, POSTGRES_DB, POSTGRES_USER, POSTGRES_PASSWORD} = process.env;

module.exports = {
    client: DB_DRIVER,
    connection: {
        host: POSTGRES_HOST,
        database: POSTGRES_DB,
        user: POSTGRES_USER,
        password: POSTGRES_PASSWORD,
    },
    poll: {
        min: 2,
        max: 10,
    },
    ...knexSnakeCaseMappers(),
};
