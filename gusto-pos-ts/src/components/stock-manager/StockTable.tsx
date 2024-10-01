import React, { useState } from "react";

import GSTable from "@/components/widgets/table/GSTable";
import { ColumnType } from "@/types/Table-types";

type StockTableProps<T> = {
  columns: ColumnType[];
  filteredUsers: T[];
  currentItems: T[];
  currentPage: number;
};

export default function StockTable<T>(props: StockTableProps<T>) {
  const { columns, filteredUsers } = props;
  // Pagination
  const [currentPage] = useState(1);
  const itemsPerPage = 10;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const currentItems = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <GSTable
      columns={columns}
      filteredUsers={filteredUsers}
      currentItems={currentItems} // Ensure this is passed
      currentPage={currentPage}
      totalPages={1}
      hidePagination
      sx={{
        mt: 2,
        height: { xs: "300px", md: "400px", xl: "80%" },
      }}
    />
  );
}
