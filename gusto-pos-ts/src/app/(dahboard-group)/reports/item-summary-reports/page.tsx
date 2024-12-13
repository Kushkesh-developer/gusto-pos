'use client';
import React, { useEffect, useState } from 'react';
import { Stack, Box } from '@mui/material';
import GSTable from '@/components/widgets/table/GSTable';
import GSTableControls from '@/components/widgets/table/GSTableControls';
import GSSelectInput from '@/components/widgets/inputs/GSSelectInput';
import { useLocalization } from '@/context/LocalizationProvider';
import { itemMock, selectItem, filterByOutlet } from '@/mock/reports';
 // Import mock data and filters
import { ColumnType } from '@/types/table-types';
import PageHeader from '@/components/widgets/headers/PageHeader';

const Page = () => {
  const { translate } = useLocalization();
  const [response] = useState(itemMock);
  const [filteredColumns, setFilteredColumns] = useState(itemMock);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [selectedOutlet, setSelectedOutlet] = useState<string | null>(null);

  const columnNames: ColumnType[] = [
    { label: translate('item_name'), key: 'itemName', visible: true },
    { label: translate('outlet'), key: 'Outlet', visible: true },
    { label: translate('Qty'), key: 'Qty', visible: true },
    { label: translate('unit'), key: 'Unit', visible: true },
    { label: translate('min_qty'), key: 'MinQty', visible: true },
    { label: translate('max_qty'), key: 'MaxQty', visible: true },
    { label: translate('item_type'), key: 'ItemType', visible: true },
  ];

  const [columns, setColumns] = useState(columnNames);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  useEffect(() => {
    let filteredRows = response;

    // Apply search query filter
    if (searchQuery) {
      filteredRows = filteredRows.filter((items) => {
        const item =
          `${items.itemName} ${items.Outlet} ${items.Qty} ${items.Unit} ${items.ItemType}`.toLowerCase();
        const sanitizedSearch = searchQuery.toLowerCase().trim();
        return item.includes(sanitizedSearch);
      });
    }

    // Apply item filter
    if (selectedItem) {
      // Find the corresponding label for the selected value
      const selectedOption = selectItem.find((option) => option.value === selectedItem);

      if (selectedOption) {
        filteredRows = filteredRows.filter(
          (item) => item.itemName.toLowerCase() === selectedOption.label.toLowerCase(),
        );
      }
    }

    // Apply outlet filter (only if no item is selected)
    if (selectedOutlet && !selectedItem) {
      const selectedOutletOption = filterByOutlet.find((option) => option.value === selectedOutlet);

      if (selectedOutletOption) {
        filteredRows = filteredRows.filter(
          (item) => item.Outlet.toLowerCase() === selectedOutletOption.label.toLowerCase(),
        );
      }
    }

    setFilteredColumns(filteredRows);
    setCurrentPage(1); // Reset to first page after filtering
  }, [searchQuery, selectedItem, selectedOutlet, response]);

  // Handle item selection
  const handleItemSelect = (value: string | null) => {
    // If an item is selected, reset the outlet
    setSelectedItem(value);
    if (value) {
      setSelectedOutlet(null);
    }
  };

  // Handle outlet selection
  const handleOutletSelect = (value: string | null) => {
    // If an outlet is selected, reset the item
    setSelectedOutlet(value);
    if (value) {
      setSelectedItem(null);
    }
  };

  const currentItems = filteredColumns.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredColumns.length / itemsPerPage);

  return (
    <Box sx={{ flex: '1 1 auto', p: 3 }}>
      <PageHeader title={translate('item_summary_reports')} />

      <Stack marginTop={2}>
        <GSTableControls
          setSearchQuery={setSearchQuery}
          setColumnsVisibility={(newColumns) => setColumns(newColumns)}
          columns={columns}
          currentItems={currentItems}
          renderFilterElement={
            <Stack direction="row" spacing={2}>
              <GSSelectInput
                options={selectItem}
                placeholder={translate('select_item')}
                height="40px"
                variant="theme"
                placeholderColor="primary"
                value={selectedItem}
                onChange={handleItemSelect}
                // Disable if outlet is selected
                disabled={!!selectedOutlet}
              />
              <GSSelectInput
                options={filterByOutlet}
                placeholder={translate('filter_by_outlet')}
                height="40px"
                variant="theme"
                placeholderColor="primary"
                value={selectedOutlet}
                onChange={handleOutletSelect}
                // Disable if item is selected
                disabled={!!selectedItem}
              />
            </Stack>
          }
          showPrint
          showExcel
          showPdf
          showFilter
        />
      </Stack>
      <GSTable
        columns={columns}
        filteredColumns={filteredColumns}
        currentItems={currentItems}
        currentPage={currentPage}
        totalPages={totalPages}
        handlePageChange={(e: React.ChangeEvent<unknown>, page: number) => setCurrentPage(page)}
        setFilteredColumns={setFilteredColumns}
      />
    </Box>
  );
};

export default Page;
