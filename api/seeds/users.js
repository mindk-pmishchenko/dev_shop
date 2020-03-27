exports.seed = knex =>
    knex('users')
        .del()
        .then(() =>
            knex('users').insert([
                {
                    username: 'spencer',
                    password: '$2b$12$rls4fhLwfPnv.GVxMgMOQuWJ8h9893pJnQmf1s5BJQcI6KI2HKL1y',
                    role: 'admin',
                    last_name: 'Лойко',
                    first_name: 'Виталий',
                    email: 'vitaliy.87@icloud.com',
                    address: 'Сумы, ул. Ковпака 65, кв. 85',
                    mobile_phone: '380993417144',
                    token: '4ffbff51-356c-4910-b0ba-f14f624ddfe5',
                },
                {
                    username: 'user',
                    password: '$2b$12$rls4fhLwfPnv.GVxMgMOQuWJ8h9893pJnQmf1s5BJQcI6KI2HKL1y',
                    role: 'user',
                    last_name: 'Покупаев',
                    first_name: 'Дмитрий',
                    email: 'dmitriy@icloud.com',
                    address: 'Сумы, ул. Ковпака 65, кв. 65',
                    mobile_phone: '380993417142',
                    token: '2fbbff51-356c-4910-b0ba-f14f624ddfe5',
                },
            ])
        );
