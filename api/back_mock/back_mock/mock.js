const categories = [
  {
    id: 1,
    title: 'Mobile Phones',
    alias: 'mobile',
    Icon: 'DragIndicatorIcon',
    parent_id: null
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
    Icon: 'DragIndicatorIcon',
    parent_id: null
  },
  {
    id: 4,
    title: 'Audio Systems',
    alias: 'audio',
    Icon: 'DragIndicatorIcon',
    parent_id: null
  },
  {
    id: 5,
    title: 'Game Zone',
    alias: 'games',
    parent_id: 3
  },
  {
    id: 6,
    title: 'Fridge',
    alias: 'fridge',
    parent_id: 5
  },
  {
    id: 7,
    title: 'PS',
    alias: 'ps',
    parent_id: 1
  }
];

module.exports = {
  categories
};
