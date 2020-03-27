exports.seed = knex =>
    knex('categories')
        .del()
        .then(() =>
            knex('categories').insert([
                {name: 'Apple Store', slug: 'appstore', description: 'Техника Apple в каждый дом', parent_id: null},
                {name: 'MacBook', slug: 'macbook', description: 'Лучшие ноутбуки', parent_id: 1},
                {name: 'MacBook Air', slug: 'macbook-air', description: 'Лучшие ноутбуки MacBook Air', parent_id: 2},
                {name: 'MacBook Pro', slug: 'macbook-pro', description: 'Лучшие ноутбуки MacBook Pro', parent_id: 2},
                {name: 'iPhone', slug: 'iphone', description: 'Лучшие смартфоны iPhone', parent_id: 1},
                {name: 'iPhone 11', slug: 'iphone-11', description: 'Лучшие смартфоны iPhone 11', parent_id: 5},
                {name: 'iPhone 10', slug: 'iphone-10', description: 'Лучшие смартфоны iPhone 10', parent_id: 5},
                {name: 'iPad', slug: 'ipad', description: 'Лучшие планшеты iPad', parent_id: 1},
                {name: 'iPod', slug: 'ipod', description: 'Лучшие музыкальные плееры iPod', parent_id: 1},
                {name: 'Apple Watch', slug: 'apple-watch', description: 'Лучшие умные часы Apple Watch', parent_id: 1},
            ])
        );
