import React from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

interface PaginationProps {
  currentPage: number;
  count: number; // MUI expects 'count' for the total number of pages
  onPageChange: (_event: React.ChangeEvent<unknown>, _page: number) => void;
}

const PaginationComponent = ({
  currentPage,
  count,
  onPageChange,
  ...rest
}: PaginationProps) => {
  const handleChange = (event: React.ChangeEvent<unknown>, page: number) => {
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
        sx={{ mt: 2, display: "flex", justifyContent: "flex-end" }}
        {...rest}
      />
    </Stack>
  );
};

export default PaginationComponent;

