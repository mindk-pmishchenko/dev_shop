const categories = [
    {
        id: 1,
        title: "Mobile Phones",
        alias: "mobile",
        parent_id: null
    },
    {
        id: 2,
        title: "Computers & Laptops",
        alias: "computers",
        parent_id: null
    },
    {
        id: 3,
        title: "TV",
        alias: "tv",
        parent_id: null
    },
    {
        id: 4,
        title: "Audio Systems",
        alias: "audio",
        parent_id: null
    },
    {
        id: 5,
        title: "Game Zone",
        alias: "games",
        parent_id: null
    },
    {
        id: 6,
        title: "XBox",
        alias: "xbox",
        parent_id: 5
    },
    {
        id: 7,
        title: "PS",
        alias: "ps",
        parent_id: 5
    },
    {
        id: 8,
        title: "Games",
        alias: "games",
        parent_id: 5
    },
    {
        id: 9,
        title: 'Call of Duty',
        alias: 'call-of-duty',
        parent_id: 8
    }
];

const products = [
    {
        id: 1,
        title: 'Iphone 11 Pro',
        photo: '',
        price: 1000,
        cat_id: 1
    },
    {
        id: 2,
        title: 'Iphone 8',
        photo: '',
        price: 1000,
        cat_id: 1
    },
    {
        id: 3,
        title: 'Samsung Galaxy S20',
        photo: '',
        price: 1000,
        cat_id: 1
    },
    {
        id: 4,
        title: 'Huawei P40 Pro',
        photo: '',
        price: 1000,
        cat_id: 1
    },
    {
        id: 5,
        title: 'Asus StudioBook Pro X',
        photo: '',
        price: 4000,
        cat_id: 2
    },
    {
        id: 6,
        title: 'MacBook Pro 16\'',
        photo: '',
        price: 2000,
        cat_id: 2
    },
    {
        id: 7,
        title: 'LG SM9000 50\'',
        photo: '',
        price: 1000,
        cat_id: 3
    },
    {
        id: 8,
        title: 'LG SM9500 55\'',
        photo: '',
        price: 1200,
        cat_id: 3
    },
];

module.exports = {
    categories,
    products
};