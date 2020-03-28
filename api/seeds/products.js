exports.seed = knex =>
    knex('products')
        .del()
        .then(() =>
            knex('products').insert([
                {
                    name: 'Apple MacBook Air 128GB Space Gray (MVFH2) 2019',
                    slug: 'apple-macbook-air-128gb-space-gray-(mvfh2)-2019',
                    description: `MacBook Air работает без подзарядки до 12 часов — это означает, что весь день вы свободны от 
                        проводов и розеток. Когда захочется отдохнуть, вы сможете смотреть фильмы в iTunes до 12 часов 
                        подряд. Кроме того, MacBook Air способен находиться в режиме ожидания до 30 дней. Вы можете 
                        сделать перерыв на несколько недель и вернуться к работе там же, где остановились.`,
                    price: 27664,
                    category_id: 3,
                    properties: JSON.stringify({
                        экран: 'Retina display: 13.3 глянцевый (2560x1600) c LED-подсветкой (227 точек на дюйм)',
                        процессор: '2-ядерный Intel Core i5 (1.6 ГГц)',
                        ['оперативная память']: '8 ГБ (LPDDR3 2133 МГц)',
                        ['Объем накопителя']: '128 ГБ (SSD)',
                        видеокарта: 'Intel UHD Graphics 617',
                        ['Год выпуска']: 2019,
                        цвет: 'серый (Space Gray)',
                    }),
                    photo: 'http:://localhost:3000/no-photo.jpg',
                },
                {
                    name: 'Apple MacBook Air 256GB Space Gray (MVFJ2) 2019',
                    slug: 'apple-macbook-air-256gb-space-gray-(mvfj2)-2019',
                    description: `MacBook Air работает без подзарядки до 12 часов — это означает, что весь день вы свободны от 
                        проводов и розеток. Когда захочется отдохнуть, вы сможете смотреть фильмы в iTunes до 12 часов 
                        подряд. Кроме того, MacBook Air способен находиться в режиме ожидания до 30 дней. Вы можете 
                        сделать перерыв на несколько недель и вернуться к работе там же, где остановились.`,
                    price: 27664,
                    category_id: 3,
                    properties: JSON.stringify({
                        экран: 'Retina display: 13.3 глянцевый (2560x1600) c LED-подсветкой (227 точек на дюйм)',
                        процессор: '2-ядерный Intel Core i5 (1.6 ГГц)',
                        ['оперативная память']: '8 ГБ (LPDDR3 2133 МГц)',
                        ['Объем накопителя']: '256 ГБ (SSD)',
                        видеокарта: 'Intel UHD Graphics 617',
                        ['Год выпуска']: 2019,
                        цвет: 'серый (Space Gray)',
                    }),
                    photo: 'http:://localhost:3000/no-photo.jpg',
                },
                {
                    name: 'Apple MacBook Air 128GB Gold (MVFM2) 2019',
                    slug: 'apple-macbook-air-128gb-gold-(mvfm2)-2019',
                    description: `MacBook Air работает без подзарядки до 12 часов — это означает, что весь день вы свободны от 
                        проводов и розеток. Когда захочется отдохнуть, вы сможете смотреть фильмы в iTunes до 12 часов 
                        подряд. Кроме того, MacBook Air способен находиться в режиме ожидания до 30 дней. Вы можете 
                        сделать перерыв на несколько недель и вернуться к работе там же, где остановились.`,
                    price: 27664,
                    category_id: 3,
                    properties: JSON.stringify({
                        экран: 'Retina display: 13.3 глянцевый (2560x1600) c LED-подсветкой (227 точек на дюйм)',
                        процессор: '2-ядерный Intel Core i5 (1.6 ГГц)',
                        ['оперативная память']: '8 ГБ (LPDDR3 2133 МГц)',
                        ['Объем накопителя']: '128 ГБ (SSD)',
                        видеокарта: 'Intel UHD Graphics 617',
                        ['Год выпуска']: 2019,
                        цвет: 'серый (Space Gray)',
                    }),
                    photo: 'http:://localhost:3000/no-photo.jpg',
                },

                {
                    name: 'Apple iPhone 11 64GB White Dual SIM',
                    slug: 'apple-iphone-11-64gb-white-dual-sim',
                    description: `Дисплей Super Retina. Ещё более быстрый Face ID. Самый мощный и умный процессор iPhone. 
                        И потрясающая двойная камера. В iPhone XS воплощено всё, что вы любите в iPhone. На новом уровне`,
                    price: 21999,
                    category_id: 6,
                    properties: JSON.stringify({
                        экран: 'сенсорный 6.1" (1792x828 точек, 326ppi) Liquid Retina HD, контрастность 1400:1',
                        процессор: 'Apple A13 Bionic, система Neural Engine 3-го поколения',
                        ['оперативная память']: '4 ГБ',
                        ['встроенная память']: '64 ГБ',
                        камера: `12 МП (f/1.8)+12 МП (f/2.4), автофокус, 5-кратный цифровой зум, True Tone вспышка 
                            с функцией Slow Sync, запись 4K видео 2160p 60fps, slow-mo 1080р 240fps, панорамная съемка / 
                            TrueDepth 12 МП (f/2.2)`,
                        ['Год выпуска']: 2019,
                        цвет: 'белый (White)',
                    }),
                    photo: 'http:://localhost:3000/no-photo.jpg',
                },
            ])
        );
