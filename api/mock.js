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

module.exports = {
    categories
};