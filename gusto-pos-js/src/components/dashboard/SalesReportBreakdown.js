import { useLocalization } from '@/context/LocalizationProvider';
import { Box, Button, Divider, Paper, Stack, Typography } from '@mui/material';
import React from 'react';

function PriceDataLabels({ title, price, quantity }) {
  return (
    <Stack direction={'row'} alignItems={'center'} mt={1}>
      <Typography variant="body2">{title}</Typography>
      <Divider variant="middle" sx={{ borderStyle: 'dashed', flex: 1, mx: 1 }} />
      {quantity && <Typography variant="body2">{quantity}</Typography>}
      {quantity && <Divider variant="middle" sx={{ borderStyle: 'dashed', width: 20 }} />}
      <Typography variant="body2" sx={{ minWidth: 60 }} textAlign={'end'}>
        {price}
      </Typography>
    </Stack>
  );
}

export default function SalesReportBreakdown({ stalesBreakDownReportData = [] }) {
  const { translate } = useLocalization();

  const printData = () => {
    const reportContent = `
      <html>
        <head>
          <title>Sales Report</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              margin: 20px;
              padding: 20px;
            }
            .report-container {
              border: 1px solid #D9D9D9;
              border-radius: 5px;
              padding: 16px;
              margin-top: 16px;
            }
            .report-header {
              margin-bottom: 16px;
              display: flex;
              justify-content: space-between;
            }
            .section {
              margin-top: 24px;
            }
            .section-title {
              color: #666;
              font-size: 14px;
              margin-bottom: 8px;
            }
            .header-row {
              display: flex;
              align-items: center;
              font-weight: 500;
              margin-bottom: 8px;
            }
            .price-row {
              display: flex;
              align-items: center;
              margin-top: 8px;
              font-size: 14px;
            }
            .title {
              flex: 1;
            }
            .quantity {
              width: 60px;
              text-align: right;
            }
            .price {
              min-width: 60px;
              text-align: right;
            }
            .divider {
              border-top: 1px dashed #D9D9D9;
              flex: 1;
              margin: 0 8px;
            }
            .quantity-divider {
              border-top: 1px dashed #D9D9D9;
              width: 20px;
              margin: 0 8px;
            }
            .main-divider {
              border-top: 1px solid #D9D9D9;
              margin: 16px 0;
            }
            .header-quantity {
              width: 60px;
              text-align: right;
              margin-right: 28px;  /* Accounts for the quantity-divider width + margins */
            }
          </style>
        </head>
        <body>
          <div class="report-header">
            <h2>${translate('sales_breakdown_report')}</h2>
          </div>
          <div class="report-container">
            <div>Date: 28 Jan 2021 to 28 Jan 2021</div>
            <div class="main-divider"></div>
            ${stalesBreakDownReportData
              .map(
                (data) => `
                <div class="section">
                  <div class="section-title">${data.title || ''}</div>
                  <div class="header-row">
                    <div class="title">${data.saleTitleHeading || ''}</div>
                    ${
                      data.quantityHeading
                        ? `<div class="header-quantity">${data.quantityHeading}</div>`
                        : ''
                    }
                    <div class="price">${data.amountHeading || ''}</div>
                  </div>
                  ${data.items
                    .map(
                      (item) => `
                    <div class="price-row">
                      <div class="title">${item.title}</div>
                      <div class="divider"></div>
                      ${item.quantity ? `<div class="quantity">${item.quantity}</div>` : ''}
                      ${item.quantity ? `<div class="quantity-divider"></div>` : ''}
                      <div class="price">${item.price}</div>
                    </div>
                  `,
                    )
                    .join('')}
                </div>
              `,
              )
              .join('')}
          </div>
        </body>
      </html>
    `;

    // Create a Blob containing the HTML content
    const blob = new Blob([reportContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);

    // Create an iframe and hide it
    const printFrame = document.createElement('iframe');
    printFrame.style.position = 'fixed';
    printFrame.style.right = '0';
    printFrame.style.bottom = '0';
    printFrame.style.width = '0';
    printFrame.style.height = '0';
    printFrame.style.border = 'none';

    // When the iframe loads, print it and clean up
    printFrame.onload = () => {
      try {
        printFrame.contentWindow?.print();
      } catch (error) {
        console.error('Print failed:', error);
      }

      // Clean up after a delay to ensure print dialog is handled
      setTimeout(() => {
        document.body.removeChild(printFrame);
        URL.revokeObjectURL(url);
      }, 1000);
    };

    // Set the iframe source and add it to the document
    printFrame.src = url;
    document.body.appendChild(printFrame);
  };

  return (
    <Paper sx={{ mt: 2, p: 2, flex: 1 }}>
      <Stack direction={'row'} mb={2} justifyContent={'space-between'}>
        <Typography>{translate('sales_breakdown_report')}</Typography>
        <Button variant="contained" onClick={printData}>
          {translate('print')}
        </Button>
      </Stack>
      <Box flex={1} sx={{ p: 2, border: '1px solid #D9D9D9', borderRadius: '5px' }}>
        <Typography>Date: 28 Jan 2021 to 28 Jan 2021</Typography>
        <Divider sx={{ mt: 2 }} />
        {stalesBreakDownReportData.map((data, index) => {
          return (
            <Stack key={index} mt={3}>
              <Typography variant="body2" mb={1} color={'GrayText'}>
                {data.title}
              </Typography>
              <Stack key={data.title} direction={'row'} alignItems={'center'}>
                <Typography sx={{ flex: 1, fontWeight: '500' }}>{data.saleTitleHeading}</Typography>
                {data.quantityHeading && (
                  <Typography sx={{ fontWeight: '500' }}>{data.quantityHeading}</Typography>
                )}
                {data.amountHeading && (
                  <Typography sx={{ minWidth: 100, fontWeight: '500' }} textAlign={'end'}>
                    {data.amountHeading}
                  </Typography>
                )}
              </Stack>
              {data.items.map((item, index) => {
                return (
                  <PriceDataLabels
                    key={index}
                    title={item.title}
                    price={item.price}
                    quantity={item.quantity}
                  />
                );
              })}
            </Stack>
          );
        })}
      </Box>
    </Paper>
  );
}
