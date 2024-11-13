import React, { useState } from "react";
import { ColumnType } from "@/types/table-types";
import GSTable from "@/components/widgets/table/GSTable";

type StockTableProps<T> = {
  columns: ColumnType[];
  filteredProducts: T[];
  currentItems: T[];
  currentPage: number;
  setFilteredProducts?: React.Dispatch<React.SetStateAction<T[]>>;
};

export default function StockTable<T>(props: StockTableProps<T>) {
  const { columns, filteredProducts, setFilteredProducts } = props;
  // Pagination
  const [currentPage] = useState(1);
  const itemsPerPage = 10;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const currentItems = filteredProducts.slice(
    indexOfFirstItem,
    indexOfLastItem,
  );

  return (
    <GSTable
      columns={columns}
      filteredColumns={filteredProducts}
      currentItems={currentItems} // Ensure this is passed
      currentPage={currentPage}
      totalPages={1}
      hidePagination
      sx={{
        mt: 2,
        flexGrow: 1,
        overflowY: "auto",
        height: "calc(100vh - 480px)", //this 480px depends on the above and below item's of table.
      }}
      setFilteredColumns={setFilteredProducts}
    />
  );
}
