const categories = [
  {
    id: 1,
    title: 'Mobile Phones',
    alias: 'mobile'
  },
  {
    id: 2,
    title: 'Computers & Laptops',
    alias: 'computers',
    parent_id: 1
  },
  {
    id: 3,
    title: 'TV',
    alias: 'tv',
    parent_id: null
  },
  {
    id: 4,
    title: 'Audio Systems',
    alias: 'audio',
    parent_id: null
  },
  {
    id: 5,
    title: 'Game Zone',
    alias: 'games',
    parent_id: 2
  }
];

module.exports = {
  categories
};
