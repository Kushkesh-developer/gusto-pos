import React, { useState } from 'react';

import GSTable from '@/components/widgets/table/GSTable';
import { useTheme, Box } from '@mui/material';





















export default function StockTable(props) {
  const { columns, filteredProducts, setFilteredProducts, onQuantityChange } = props;
  const theme = useTheme();

  const [currentPage] = useState(1);
  const currentItems = filteredProducts;

  return (
    <Box
      sx={{
        // height: { xs: '300px', md: '500px' },
        mt: 2,
        maxHeight: '100vh',
        overflow: 'hidden'
        // margin: { xs: '0 auto', md: 'initial' }, // Center on mobile
      }}>

      <GSTable
        columns={columns}
        filteredColumns={filteredProducts}
        currentItems={currentItems}
        currentPage={currentPage}
        totalPages={1}
        hidePagination
        onQuantityChange={onQuantityChange}
        sx={{
          maxWidth: { xs: '500px', sm: '100%', md: '100%' },
          display: 'block',
          overflowX: 'auto',
          overflowY: 'auto',
          WebkitOverflowScrolling: 'touch',
          height: 'calc(100vh - 457px)',
          // Scrollbar styling
          '&::-webkit-scrollbar': {
            height: '8px',
            width: '4px'
          },
          '&::-webkit-scrollbar-track': {
            backgroundColor: theme.palette.background.default,
            borderRadius: '4px'
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: theme.palette.grey[400],
            borderRadius: '4px',
            '&:hover': {
              backgroundColor: theme.palette.grey[500]
            }
          },

          // Table styling
          '& table': {
            width: '100%',
            minWidth: '800px',
            borderSpacing: 0,
            tableLayout: 'fixed'
          },

          // Remove sticky header styles
          '& .MuiTableHead-root': {
            position: 'static' // Ensures header scrolls with content
          },

          '& .MuiTableCell-head': {
            // background: theme.palette.background.paper,
            position: 'static'
          },

          // Consistent cell padding
          '& .MuiTableCell-root': {
            padding: {
              xs: '12px 16px',
              sm: '14px 16px',
              md: '16px'
            }
          },

          '& .MuiTableCell-body': {
            fontSize: '0.875rem'
          },

          // Optional: Add border between header and body for better visual separation
          '& .MuiTableHead-root .MuiTableRow-root': {
            borderBottom: `1px solid ${theme.palette.divider}`
          }
        }}
        setFilteredColumns={setFilteredProducts} />

    </Box>);

}