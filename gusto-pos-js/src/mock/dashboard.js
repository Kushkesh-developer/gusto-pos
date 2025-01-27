


import AutoGraphIcon from '@mui/icons-material/AutoGraph';
import EqualizerIcon from '@mui/icons-material/Equalizer';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import ImportantDevicesIcon from '@mui/icons-material/ImportantDevices';


// export const UseTranslatedStatistics=()=>{
//   const { translate } = useLocalization();
//    const statisticsData = [
//     {
//       id: 1,
//       title: translate('total_sell'),  // Corrected translation usage
//       value: '$2200.00',
//       icon: (props: IconProps) => <AutoGraphIcon {...props} />,
//     },
//     {
//       id: 3,
//       title: translate('expenses'),  // Corrected translation usage
//       value: '$1000.00',
//       icon: (props: IconProps) => <EqualizerIcon {...props} />,
//     },
//     {
//       id: 4,
//       title: translate('profit'),  // Corrected translation usage
//       value: '$1200.00',
//       isPositive: true,
//       icon: (props: IconProps) => <CurrencyRupeeIcon {...props} />,
//     },
//     {
//       id: 5,
//       title: translate('online_sale'),  // Corrected translation usage
//       value: '$1000.00',
//       icon: (props: IconProps) => <ImportantDevicesIcon {...props} />,
//     },
//   ];
// }
// Daily labels for "This Week" range
export const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

// Date labels for "This Month" range (assuming up to 31 days)
export const datesOfMonth = Array.from({ length: 31 }, (_, i) => (i + 1).toString());

// export const statisticsData = [

export const hours = [
'12 AM',
'1 AM',
'2 AM',
'3 AM',
'4 AM',
'5 AM',
'6 AM',
'7 AM',
'8 AM',
'9 AM',
'10 AM',
'11 AM',
'12 PM',
'1 PM',
'2 PM',
'3 PM',
'4 PM',
'5 PM',
'6 PM',
'7 PM',
'8 PM',
'9 PM',
'10 PM',
'11 PM'];

export const getStatisticsData = (translate) => [
{
  id: 1,
  title: translate('total_sell'),
  value: '$2200.00',
  icon: (props) => <AutoGraphIcon {...props} />
},
{
  id: 3,
  title: translate('expenses'),
  value: '$1000.00',
  icon: (props) => <EqualizerIcon {...props} />
},
{
  id: 4,
  title: translate('profit'),
  value: '$1200.00',
  isPositive: true,
  icon: (props) => <CurrencyRupeeIcon {...props} />
},
{
  id: 5,
  title: translate('online_sale'),
  value: '$1000.00',
  icon: (props) => <ImportantDevicesIcon {...props} />
}];

export const stalesBreakDownReportData = (
translate) =>
[
{
  title: undefined,
  saleTitleHeading: undefined,
  amountHeading: undefined,
  items: [
  { title: translate('total_sales'), price: '380.80' },
  { title: translate('credit'), price: '0.00' },
  { title: translate('total_sales_before_tax'), price: '354.15' },
  { title: translate('gst_incl'), price: '26.65' },
  { title: translate('discount_total'), price: '0.00' },
  { title: translate('rounding'), price: '0.00' },
  { title: translate('refund_amount'), price: '0.00' }]

},

{
  title: undefined,
  saleTitleHeading: undefined,
  amountHeading: undefined,
  items: [
  { title: translate('total_sales'), price: '250.30' },
  { title: translate('cash_in_drawer'), price: '44.70' },
  { title: translate('void_amount'), price: '0.00' },
  { title: translate('item_void'), price: '0' },
  { title: translate('start_receipt'), price: '0.00' },
  { title: translate('end_receipt'), price: '0.00' },
  { title: translate('no_of_receipt'), price: '0.00' },
  { title: translate('average_per_receipt'), price: '0.00' }]

},
{
  title: '**PAYMENT BREAKDOWN',
  saleTitleHeading: 'Category',
  amountHeading: 'Amount($)',
  items: [
  { title: 'Burgers', price: '380.80' },
  { title: 'Sides', price: '57.00' }]

},
{
  title: '**PAYMENT BREAKDOWN',
  saleTitleHeading: 'Product',
  amountHeading: 'Total($)',
  quantityHeading: 'Qty',
  items: [
  { title: 'Cheese Burger', quantity: '18', price: '108.00' },
  { title: 'Bacon Cheese Burger', quantity: '12', price: '92.40' },
  { title: 'Beef Brisket Burger', quantity: '10', price: '70.00' },
  { title: 'Crispy Rendang Burger', quantity: '8', price: '50.10' },
  { title: 'Takeaway $0.30', quantity: '6', price: '3.30' },
  { title: 'Free Takeaway', quantity: '1', price: '0.00' }]

}];


export const productStockData = [
{
  id: 1,
  product: 'Chicken',
  location: 'Chai Chee',
  quantity: '5'
},
{
  id: 2,
  product: 'Breads',
  location: 'Chai Chee',
  quantity: '10'
},
{
  id: 3,
  product: 'Sous',
  location: 'Chai Chee',
  quantity: '15'
},
{
  id: 4,
  product: 'Chicken',
  location: 'Chai Chee',
  quantity: '5'
},
{
  id: 5,
  product: 'Breads',
  location: 'Chai Chee',
  quantity: '10'
},
{
  id: 6,
  product: 'Sous',
  location: 'Chai Chee',
  quantity: '15'
}];


export const productExpiryData = [
{
  id: 1,
  product: 'Chicken',
  location: 'Chai Chee Market',
  expiry: '12/2/20',
  quantity: '5'
},
{
  id: 2,
  product: 'Breads',
  location: 'Chai Chee Bakery',
  expiry: '12/2/20',
  quantity: '10'
},
{
  id: 3,
  product: 'Fish',
  location: 'Chai Chee Seafood Market',
  expiry: '12/5/20',
  quantity: '8'
},
{
  id: 4,
  product: 'Cheese',
  location: 'Chai Chee Dairy Shop',
  expiry: '12/10/20',
  quantity: '6'
},
{
  id: 5,
  product: 'Milk',
  location: 'Chai Chee Grocery Store',
  expiry: '12/15/20',
  quantity: '12'
}];