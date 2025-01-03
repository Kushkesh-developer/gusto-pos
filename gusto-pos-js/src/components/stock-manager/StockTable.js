import React from 'react';

import GSTable from '@/components/widgets/table/GSTable';
import { useTheme, useMediaQuery, Box, Paper } from '@mui/material';


















export default function StockTable(props) {
  const { columns, filteredProducts, setFilteredProducts } = props;
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

  // Calculate dynamic height based on screen size and content
  const getTableHeight = () => {
    if (isMobile) {
      return 'auto'; // Allow content to determine height on mobile
    } else if (isTablet) {
      return 'auto'; // Allow content to determine height on tablet
    } else {
      return filteredProducts.length > 0 ? 'auto' : 'calc(100vh - 480px)';
    }
  };

  // Get minimum height to ensure table doesn't collapse when empty
  const getMinHeight = () => {
    if (isMobile) {
      return '150px';
    } else if (isTablet) {
      return '200px';
    } else {
      return '250px';
    }
  };

  return (
    <Paper
      elevation={0}
      sx={{
        mt: { xs: 1, sm: 2 },
        position: 'relative',
        height: getTableHeight(),
        minHeight: getMinHeight(),
        display: 'flex',
        flexDirection: 'column',
        maxHeight: { xs: '50vh', sm: '60vh', md: 'calc(100vh - 480px)' }
      }}>

      <Box
        sx={{
          overflowX: 'auto',
          overflowY: 'auto',
          flex: 1,
          WebkitOverflowScrolling: 'touch',
          '&::-webkit-scrollbar': {
            height: '8px',
            width: '4px'
          },
          '&::-webkit-scrollbar-track': {
            backgroundColor: theme.palette.background.default
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: theme.palette.grey[400],
            borderRadius: '4px',
            '&:hover': {
              backgroundColor: theme.palette.grey[500]
            }
          },
          ...props.sx
        }}>

        <GSTable
          columns={columns}
          filteredColumns={filteredProducts}
          currentItems={filteredProducts} // Show all items instead of paginated ones
          currentPage={1}
          totalPages={1}
          hidePagination
          sx={{
            minWidth: '100%',
            tableLayout: 'fixed',
            '& .MuiTableCell-root': {
              padding: {
                xs: '8px 12px',
                sm: '12px 16px',
                md: '16px'
              },
              whiteSpace: 'nowrap',
              minWidth: '120px',
              '&:last-child': {
                paddingRight: '16px'
              }
            },
            '& .MuiTableCell-body': {
              fontSize: {
                xs: '0.875rem',
                sm: '0.875rem',
                md: '0.875rem'
              }
            },
            '& .MuiTableBody-root .MuiTableRow-root:hover': {
              backgroundColor: theme.palette.action.hover
            }
          }}
          setFilteredColumns={setFilteredProducts} />

      </Box>
    </Paper>);

}