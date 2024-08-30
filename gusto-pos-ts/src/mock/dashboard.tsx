import { ProductStock } from "@/components/dashboard/ProductStock";
import { SalesBreakdownsReportType } from "@/components/dashboard/SalesReportBreakdown";



export const statisticsData = [
    {
        title: "Total sell",
        value: "$200.00",
    },
    {
        title: "Sale Number",
        value: "200.00"
    },
    {
        title: "Expenses",
        value: "$200.00"
    },
    {
        title: "Profit",
        value: "$200.00",
        isPositive: true
    },
    {
        title: "Online Sale",
        value: "$200.00"
    },
    {
        title: "Offline Sale",
        value: "$200.00"
    }
]

const hours: string[] = [
    "12 AM", "1 AM", "2 AM", "3 AM", "4 AM", "5 AM", "6 AM", "7 AM", "8 AM", "9 AM", "10 AM", "11 AM",
    "12 PM", "1 PM", "2 PM", "3 PM", "4 PM", "5 PM", "6 PM", "7 PM", "8 PM", "9 PM", "10 PM", "11 PM"
  ];

export const stalesBreakDownReportData:SalesBreakdownsReportType[] = [
    {
        //define these "undefined" values if requires
        title: undefined, 
        saleTitleHeading: undefined,
        amountHeading: undefined,
        items: [
            { title: "Total Sales", price: "380.80" },
            { title: "Credit", price: "0.00" },
            { title: "Total Sales Before Tax", price: "354.15" },
            { title: "GST 7% (incl)", price: "26.65" },
            { title: "Discount Total", price: "0.00" },
            { title: "Rounding", price: "0.00" },
            { title: "Refund Amount", price: "0.00" }
        ]
    },
    {
        title: undefined,
        saleTitleHeading: undefined,
        amountHeading: undefined,
        items: [
            { title: "Cash Sales", price: "250.30" },
            { title: "CASH IN DRAWER", price: "44.70" },
            { title: "Void Amount", price: "0.00" },
            { title: "Item Void", price: "0" },
            { title: "Start Receipt", price: "0.00" },
            { title: "End Receipt", price: "0.00" },
            { title: "No. of Receipt", price: "0.00" },
            { title: "Average Per Receipt", price: "0.00" }
        ]
    },
    {
        title: "**PAYMENT BREAKDOWN",
        saleTitleHeading: "Category",
        amountHeading: "Amount($)",
        items: [
            { title: "Burgers", price: "380.80" },
            { title: "Sides", price: "57.00" },
        ]
    },
    {
        title: "**PAYMENT BREAKDOWN",
        saleTitleHeading: "Product",
        amountHeading: "Total($)",
        quantityHeading:"Qty",
        items: [
            { title: "Cheese Burger", quantity: "18", price: "108.00" },
            { title: "Bacon Cheese Burger", quantity: "12", price: "92.40" },
            { title: "Beef Brisket Burger", quantity: "10", price: "70.00" },
            { title: "Crispy Rendang Burger", quantity: "8", price: "50.10" },
            { title: "Takeaway $0.30", quantity: "6", price: "3.30" },
            { title: "Free Takeaway", quantity: "1", price: "0.00" }
        ]
    },
] 

export const productStockData: ProductStock[] = [
    {
        product: "Chicken",
        location: "Chai Chee",
        quantity: "5"
    },
    {
        product: "Breads",
        location: "Chai Chee",
        quantity: "10"
    },
    {
        product: "Sous",
        location: "Chai Chee",
        quantity: "15"
    },
    {
        product: "Chicken",
        location: "Chai Chee",
        quantity: "5"
    },
    {
        product: "Breads",
        location: "Chai Chee",
        quantity: "10"
    },
    {
        product: "Sous",
        location: "Chai Chee",
        quantity: "15"
    }
]