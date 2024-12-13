'use client';
import { Stack, Box } from '@mui/material';
import React, { useEffect, useState } from 'react';
import GSTable from '@/components/widgets/table/GSTable';
import GSSelectInput from '@/components/widgets/inputs/GSSelectInput';
import GSTableControls from '@/components/widgets/table/GSTableControls';
import { useLocalization } from '@/context/LocalizationProvider';
import { revenueMock, selectFrom } from '@/mock/reports';


import PageHeader from '@/components/widgets/headers/PageHeader';

const Page = () => {
  const { translate } = useLocalization();
  const columnNames = [
  { label: translate('date'), key: 'Date', visible: true },
  { label: translate('outlet'), key: 'Outlet', visible: true },
  { label: translate('sale'), key: 'Sale', visible: true },
  { label: translate('tax'), key: 'Tax', visible: true },
  { label: translate('disc_amount'), key: 'DiscAmount', visible: true },
  { label: translate('cost'), key: 'Cost', visible: true },
  {
    label: translate('action'),
    key: 'action',
    visible: true,
    isAction: true,
    actions: [
    {
<<<<<<< HEAD
      label: translate('action'),
      key: 'action',
      visible: true,
      isAction: true,
      actions: [
        {
          type: 'delete',
          // eslint-disable-next-line no-console
          handler: (id) => handleDelete(id),
        },
      ],
    },
  ];

=======
      type: 'delete',
      // eslint-disable-next-line no-console
      handler: (id) => handleDelete(id)
    }]

  }];

>>>>>>> 68e431412d63501ef47aa3cacf76680d07c0295b
  const handleDelete = (id) => {
    // eslint-disable-next-line no-console
    console.log('Delete user with ID:', id);
    // Filter out the user with the given ID
    setFilteredColumns((prevUsers) => prevUsers.filter((user) => user.id !== id));
  };
  const [response] = useState(revenueMock);
  const [filteredColumns, setFilteredColumns] = useState(revenueMock);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredColumns.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredColumns.length / itemsPerPage);
  const [columns, setColumns] = useState(columnNames);

  useEffect(() => {
    const filteredRows = response.filter((items) => {
      const item = `${items.Outlet}`.toLowerCase();
      const sanitizedSearch = searchQuery.toLowerCase().trim();
      return item.includes(sanitizedSearch);
    });
    setFilteredColumns(filteredRows);
  }, [searchQuery, response]);

  return (
    <Box sx={{ flex: '1 1 auto', p: 3 }}>
      <PageHeader title={translate('revenue_sale_report')} />

      <Stack marginTop={2}>
        <GSTableControls
          setSearchQuery={setSearchQuery}
          setColumnsVisibility={(newColumns) => setColumns(newColumns)}
          columns={columns}
          currentItems={currentItems}
          renderFilterElement={
          <Stack direction="row" spacing={2}>
              <GSSelectInput
<<<<<<< HEAD
                options={selectFrom}
                placeholder={translate('filter_by_outlet')}
                height="40px"
                variant="theme" // Pass type as "theme" to enable primary color styling
                placeholderColor="primary" // Ensures placeholder text color is primary
              />
=======
              options={filterByType}
              placeholder={translate('filter_by_outlet')}
              height="40px"
              variant="theme" // Pass type as "theme" to enable primary color styling
              placeholderColor="primary" // Ensures placeholder text color is primary
            />
>>>>>>> 68e431412d63501ef47aa3cacf76680d07c0295b
            </Stack>
          }
          showPrint
          showExcel
          showPdf
          showFilter />

      </Stack>
      <GSTable
        columns={columns}
        filteredColumns={filteredColumns}
        currentItems={currentItems}
        currentPage={currentPage}
        totalPages={totalPages}
        handlePageChange={(e, page) => setCurrentPage(page)}
        setFilteredColumns={setFilteredColumns} />

    </Box>);

};

export default Page;