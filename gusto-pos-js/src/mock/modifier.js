export const groupOptions = [
  { label: 'Hot', value: 'hot' },
  { label: 'Cold', value: 'cold' },
];

export const filterByLocation = [
  { label: 'Chai Chee', value: 'chaiChee' },
  { label: 'Downtown', value: 'downtown' },
];

export const modifierMock = [
  {
    id: 1,
    modifier: 'Onion Ring',
    groups: 'Hot',
    outlet: 'Chai Chee',
    cost: '$1.00',
  },
  {
    id: 2,
    modifier: 'Coleslaw',
    groups: 'Cold',
    outlet: 'Chai Chee',
    cost: '$1.00',
  },
  {
    id: 3,
    modifier: 'Garlic Bread',
    groups: 'Hot',
    outlet: 'Downtown',
    cost: '$1.50',
  },
  {
    id: 4,
    modifier: 'Caesar Salad',
    groups: 'Cold',
    outlet: 'Downtown',
    cost: '$2.00',
  },
  {
    id: 5,
    modifier: 'Sweet Potato Fries',
    groups: 'Hot',
    outlet: 'East Coast',
    cost: '$1.75',
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
