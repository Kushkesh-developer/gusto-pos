export const rolesMock = [
{ id: 1, role: 'Owner' },
{ id: 2, role: 'Customer' },
{ id: 3, role: 'Manager' },
{ id: 4, role: 'Staff' },
{ id: 5, role: 'Chef' },
{ id: 6, role: 'Delivery Person' }];


export const staffMock = [
{
  id: 1,
  userName: 'Tan',
  phone: '8181 2828',
  email: 'kevintan23@gmail.com',
  role: 'Owner'
},
{
  id: 2,
  userName: 'Kevin Tan',
  phone: '8181 2828',
  email: 'kevintan@gmail.com',
  role: 'Owner'
},
{
  id: 3,
  userName: 'Sarah Lee',
  phone: '9123 4567',
  email: 'sarahlee@example.com',
  role: 'Manager'
},
{
  id: 4,
  userName: 'John Doe',
  phone: '9876 5432',
  email: 'johndoe@example.com',
  role: 'Staff'
},
{
  id: 5,
  userName: 'Alice Wong',
  phone: '8765 4321',
  email: 'alicewong@example.com',
  role: 'Staff'
},
{
  id: 6,
  userName: 'Bob Chen',
  phone: '1234 5678',
  email: 'bobchen@example.com',
  role: 'Chef'
},
{
  id: 7,
  userName: 'Emma Tan',
  phone: '2345 6789',
  email: 'emmat@example.com',
  role: 'Delivery Person'
},
{
  id: 8,
  userName: 'Charlie Kim',
  phone: '3456 7890',
  email: 'charliek@example.com',
  role: 'Manager'
},
{
  id: 9,
  userName: 'Diana Lee',
  phone: '4567 8901',
  email: 'dianalee@example.com',
  role: 'Staff'
},
{
  id: 10,
  userName: 'Ethan Park',
  phone: '5678 9012',
  email: 'ethan.park@example.com',
  role: 'Staff'
},
{
  id: 11,
  userName: 'Grace Lin',
  phone: '6789 0123',
  email: 'grace.lin@example.com',
  role: 'Chef'
},
{
  id: 12,
  userName: 'Henry Yoon',
  phone: '7890 1234',
  email: 'henry.yoon@example.com',
  role: 'Manager'
},
{
  id: 13,
  username: 'Isla Chen',
  phone: '8901 2345',
  email: 'isla.chen@example.com',
  role: 'Delivery Person'
}];


export const supplierMock = [
<<<<<<< HEAD
  {
    id: 1,
    companyName: 'ABC Corporation',
    contactPerson: 'John Doe',
    phone: '+1234567890',
    office: '+9876543210',
    email: 'john.doe@example.com',
    postalCode: '12345',
  },
  {
    id: 2,
    companyName: 'XYZ Enterprises',
    contactPerson: 'Jane Smith',
    phone: '+1987654321',
    office: '+8765432109',
    email: 'jane.smith@example.com',
    postalCode: '54321',
  },
  {
    id: 3,
    companyName: 'PQR Industries',
    contactPerson: 'Alice Johnson',
    phone: '+1122334455',
    office: '+9988776655',
    email: 'alice.johnson@example.com',
    postalCode: '67890',
  },
  {
    id: 4,
    companyName: 'LMN Supplies',
    contactPerson: 'Mark Taylor',
    phone: '+1098765432',
    office: '+2109876543',
    email: 'mark.taylor@example.com',
    postalCode: '13579',
  },
  {
    id: 5,
    companyName: 'OPQ Group',
    contactPerson: 'Lisa Brown',
    phone: '+3216549870',
    office: '+4561237890',
    email: 'lisa.brown@example.com',
    postalCode: '24680',
  },
  {
    id: 6,
    companyName: 'RST Logistics',
    contactPerson: 'Tom Wilson',
    phone: '+5432167890',
    office: '+6789054321',
    email: 'tom.wilson@example.com',
    postalCode: '98765',
  },
  {
    id: 7,
    companyName: 'GHI Traders',
    contactPerson: 'Samuel Green',
    phone: '+3344556677',
    office: '+7788990011',
    email: 'samuel.green@example.com',
    postalCode: '10101',
  },
  {
    id: 8,
    companyName: 'JKL Supplies',
    contactPerson: 'Laura White',
    phone: '+4455667788',
    office: '+9988776655',
    email: 'laura.white@example.com',
    postalCode: '20202',
  },
  {
    id: 9,
    companyName: 'MNO Distributors',
    contactPerson: 'David Black',
    phone: '+5566778899',
    office: '+1122334455',
    email: 'david.black@example.com',
    postalCode: '30303',
  },
  {
    id: 10,
    companyName: 'PQR Solutions',
    contactPerson: 'Nancy Blue',
    phone: '+6677889900',
    office: '+2233445566',
    email: 'nancy.blue@example.com',
    postalCode: '40404',
  },
];
=======
{
  id: 1,
  companyName: 'ABC Corporation',
  contactPerson: 'John Doe',
  phone: '+1234567890',
  office: '+9876543210',
  email: 'john.doe@example.com',
  postalCode: '12345'
},
{
  id: 2,
  companyName: 'XYZ Enterprises',
  contactPerson: 'Jane Smith',
  phone: '+1987654321',
  office: '+8765432109',
  email: 'jane.smith@example.com',
  postalCode: '54321'
},
{
  id: 3,
  companyName: 'PQR Industries',
  contactPerson: 'Alice Johnson',
  phone: '+1122334455',
  office: '+9988776655',
  email: 'alice.johnson@example.com',
  postalCode: '67890'
},
{
  id: 4,
  companyName: 'LMN Supplies',
  contactPerson: 'Mark Taylor',
  phone: '+1098765432',
  office: '+2109876543',
  email: 'mark.taylor@example.com',
  postalCode: '13579'
},
{
  id: 5,
  companyName: 'OPQ Group',
  contactPerson: 'Lisa Brown',
  phone: '+3216549870',
  office: '+4561237890',
  email: 'lisa.brown@example.com',
  postalCode: '24680'
},
{
  id: 6,
  companyName: 'RST Logistics',
  contactPerson: 'Tom Wilson',
  phone: '+5432167890',
  office: '+6789054321',
  email: 'tom.wilson@example.com',
  postalCode: '98765'
},
{
  id: 7,
  companyName: 'GHI Traders',
  contactPerson: 'Samuel Green',
  phone: '+3344556677',
  office: '+7788990011',
  email: 'samuel.green@example.com',
  postalCode: '10101'
},
{
  id: 8,
  companyName: 'JKL Supplies',
  contactPerson: 'Laura White',
  phone: '+4455667788',
  office: '+9988776655',
  email: 'laura.white@example.com',
  postalCode: '20202'
},
{
  id: 9,
  companyName: 'MNO Distributors',
  contactPerson: 'David Black',
  phone: '+5566778899',
  office: '+1122334455',
  email: 'david.black@example.com',
  postalCode: '30303'
},
{
  id: 10,
  companyName: 'PQR Solutions',
  contactPerson: 'Nancy Blue',
  phone: '+6677889900',
  office: '+2233445566',
  email: 'nancy.blue@example.com',
  postalCode: '40404'
}];
>>>>>>> 68e431412d63501ef47aa3cacf76680d07c0295b
