import React, { useState } from "react";

import GSTable, {
  ColumnType,
  GSTableData,
} from "@/components/widgets/table/GSTable";

type StockTableProps = {
  columns: ColumnType[];
  filteredUsers: GSTableData[];
  currentItems: GSTableData[];
  currentPage: number;
};

export default function StockTable(props: StockTableProps) {
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
      totalPages={10}
      sx={{
        mt: 2,
        minHeight: { xs: "300px", md: "400px", xl: "80%" },
      }}
    />
  );
}
