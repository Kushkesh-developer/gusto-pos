import React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';







const PaginationComponent = ({ currentPage, count, onPageChange, ...rest }) => {
  const handleChange = (event, page) => {
    onPageChange(event, page);
  };

  return (
    <Stack spacing={2} mt={2}>
      <Pagination
        count={count} // MUI expects 'count' here
        page={currentPage}
        onChange={handleChange}
        // siblingCount={1}
        // boundaryCount={1}
        // showFirstButton
        // showLastButton
        sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}
        {...rest} />

    </Stack>);

};

export default PaginationComponent;