export const groupOptions = [
  { label: 'Hot', value: 'hot' },
  { label: 'Cold', value: 'cold' },
];

export const modifierOptions = [
  { label: 'Onion Ring', value: 'onionRing' },
  { label: 'Coleslaw', value: 'coleslaw' },
];
export const modifierMock = [
  {
    id: 1,
    modifier: 'Onion Ring',
    groups: 'Hot',
    location: 'Chai Chee',
    price: '$1.00',
  },
  {
    id: 2,
    modifier: 'Coleslaw',
    groups: 'Cold',
    location: 'Chai Chee',
    price: '$1.00',
  },
  {
    id: 3,
    modifier: 'Garlic Bread',
    groups: 'Hot',
    location: 'Downtown',
    price: '$1.50',
  },
  {
    id: 4,
    modifier: 'Caesar Salad',
    groups: 'Cold',
    location: 'Downtown',
    price: '$2.00',
  },
  {
    id: 5,
    modifier: 'Sweet Potato Fries',
    groups: 'Hot',
    location: 'East Coast',
    price: '$1.75',
  },
];
export const modifierGroupMock = [
  {
    id: 1,
    groupName: 'Hot',
  },
  {
    id: 2,
    groupName: 'Cold',
  },
  {
    id: 3,
    groupName: 'Spicy',
  },
  {
    id: 4,
    groupName: 'Vegetarian',
  },
  {
    id: 5,
    groupName: 'Dessert',
  },
];
