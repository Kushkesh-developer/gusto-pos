import React, { useState } from 'react';
import { ColumnType } from '@/types/table-types';
import GSTable from '@/components/widgets/table/GSTable';
// import { ProductData } from '../product/QuickImageUpdate';

interface ProductData extends Record<string, unknown> {
  id: string;
  title: string;
  price: number;
  image: string;
  quantity: number;
}
type StockTableProps = {
  // Ensure T extends Record<string, unknown>
  columns: ColumnType[];
  filteredProducts: ProductData[];
  currentItems: ProductData[];
  currentPage: number;
  setFilteredProducts?: React.Dispatch<React.SetStateAction<ProductData[]>>;
};

export default function StockTable(props: StockTableProps) {
  const { columns, filteredProducts, setFilteredProducts } = props;
  // Pagination
  const [currentPage] = useState(1);
  const itemsPerPage = 10;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const currentItems = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);

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
        overflowY: 'auto',
        height: 'calc(100vh - 480px)', //this 480px depends on the above and below item's of table.
      }}
      setFilteredColumns={setFilteredProducts}
    />
  );
}
