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
        mt: 2,
        maxHeight: '100vh',
        overflow: 'auto',
      }}
    >
      <GSTable
        columns={columns}
        filteredColumns={filteredProducts}
        currentItems={currentItems}
        currentPage={currentPage}
        totalPages={1}
        hidePagination
        onQuantityChange={onQuantityChange}
        sx={{
          width: { xs: '500px', sm: '100%', md: '100%' },
          display: 'block',
          WebkitOverflowScrolling: 'touch',
          height: { md: 'calc(100vh - 500px)', lg: 'calc(100vh - 440px)' },
          '&::-webkit-scrollbar': {
            height: '8px',
            width: '4px',
          },
          '&::-webkit-scrollbar-track': {
            backgroundColor: theme.palette.background.default,
            borderRadius: '4px',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: theme.palette.grey[400],
            borderRadius: '4px',
            '&:hover': {
              backgroundColor: theme.palette.grey[500],
            },
          },
          '& table': {
            width: '100%',
            minWidth: { md: '600px', lg: 'none' },
            borderSpacing: 0,
            tableLayout: 'fixed',
          },
          '& .MuiTableHead-root': {
            position: 'static',
          },
          '& .MuiTableCell-head': {
            position: 'static',
          },
          '& .MuiTableCell-root': {
            padding: {
              xs: '12px 16px',
              sm: '14px 16px',
              md: '16px',
            },
          },
          '& .MuiTableCell-body': {
            fontSize: '0.875rem',
          },
          '& .MuiTableHead-root .MuiTableRow-root': {
            borderBottom: `1px solid ${theme.palette.divider}`,
          },
        }}
        setFilteredColumns={setFilteredProducts}
      />
    </Box>
  );
}
