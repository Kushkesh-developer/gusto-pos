import React, { useState } from 'react';

import GSTable from '@/components/widgets/table/GSTable';
import { useTheme, Box } from '@mui/material';

















export default function StockTable(props) {
  const { columns, filteredProducts, setFilteredProducts } = props;
  const theme = useTheme();

  const [currentPage] = useState(1);
  // Remove itemsPerPage state and related logic since we want to show all items

  // Show all filtered products instead of slicing
  const currentItems = filteredProducts;

  return (
    <Box
      sx={{
        height: { xs: '300px', md: '500px' },
        mt: 2,
        maxHeight: '100vh',
        overflow: 'hidden' // Prevent outer box from scrolling
      }}>

      <GSTable
        columns={columns}
        filteredColumns={filteredProducts}
        currentItems={currentItems}
        currentPage={currentPage}
        totalPages={1}
        hidePagination
        sx={{
          display: 'block',
          position: 'relative',
          height: '100%',
          maxHeight: 'inherit',
          overflowX: 'auto',
          overflowY: 'auto',
          WebkitOverflowScrolling: 'touch',

          '&::-webkit-scrollbar': {
            height: '8px',
            width: '4px'
            // display: 'block'  // Ensure scrollbar is always visible
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

          '& table': {
            width: '100%',
            minWidth: '800px',
            borderSpacing: 0,
            tableLayout: 'fixed' // Added for better column width control
          },

          // Enhanced header styling with theme
          '& thead': {
            position: 'sticky',
            top: 0,
            zIndex: 2,
            display: 'table-header-group', // Ensure header stays visible
            '& tr': {
              backgroundColor: theme.palette.primary.main,
              '& th': {











                // color: theme.palette.primary.contrastText,
                // borderBottom: `2px solid ${theme.palette.divider}`,
                // padding: '12px',
                // fontSize: {
                //   xs: '0.75rem',
                //   sm: '0.875rem',
                //   md: '1rem'
                // },
                // '&:hover': {
                //   backgroundColor: theme.palette.primary.dark,
                // }
              } } }, // Cell styling
          '& .MuiTableCell-root': { padding: { xs: '12px 16px', sm: '14px 16px', md: '16px' } // whiteSpace: 'nowrap',
            // borderBottom: `1px solid ${theme.palette.divider}`,
          },
          '& tbody': {
            display: 'table-row-group', // Ensure tbody scrolls properly
            height: {


              // xs: 'calc(300px - 48px)', // Subtract header height for mobile
              // md: 'calc(500px - 48px)'  // Subtract header height for desktop
            }, overflowY: 'auto' },

          // Updated header first column styling
          // '& thead .MuiTableCell-root:first-of-type': {
          //   zIndex: 3,
          //   backgroundColor: theme.palette.primary.main,
          //   // color: theme.palette.primary.contrastText,
          // },

          // Themed row styling
          // '& tbody tr': {
          //   // backgroundColor: theme.palette.background.paper,
          //   '&:nth-of-type(odd)': {
          //     backgroundColor: theme.palette.action.hover,
          //   },
          //   '& td:first-of-type': {
          //     backgroundColor: 'inherit',
          //   },
          //   display: 'table-row'  // Ensure rows are always visible
          // },

          // Font sizes
          // '& .MuiTableCell-head': {
          //   fontSize: {
          //     xs: '0.875rem',
          //     sm: '0.875rem',
          //     md: '1rem'
          //   },
          // },

          '& .MuiTableCell-body': {
            fontSize: '0.875rem'
          }

          // Updated hover effect with theme
          // '& .MuiTableBody-root .MuiTableRow-root:hover': {
          //   backgroundColor: theme.palette.action.selected,
          //   '& .MuiTableCell-root': {
          //     backgroundColor: 'transparent',
          //   }
          // },

          // '@media (max-width: 600px)': {
          //   '& .MuiTableCell-root': {
          //     padding: '8px 12px',
          //   }
          // }
        }}
        setFilteredColumns={setFilteredProducts} />

    </Box>);

}