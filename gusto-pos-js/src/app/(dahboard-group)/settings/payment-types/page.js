'use client';
import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import GSTable from '@/components/widgets/table/GSTable';
import GSTableControls from '@/components/widgets/table/GSTableControls';

import { useLocalization } from '@/context/LocalizationProvider';
import { paymentMockResponse } from '@/mock/setting';
import PaymentDrawer from '@/components/settings/PaymentDrawer';
import PageHeader from '@/components/widgets/headers/PageHeader';

const Page = () => {
  // Mock data

  const { translate } = useLocalization();
  const [response] = useState(
    paymentMockResponse.map((item, index) => ({
      ...item,
      id: index + 1 // Assign a unique id to each item
    }))
  );
  const [filteredColumns, setFilteredColumns] = useState(paymentMockResponse);
  const [searchQuery, setSearchQuery] = useState('');

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredColumns.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredColumns.length / itemsPerPage);

  const columnNames = [
    { label: translate('printer_name'), key: 'paymentType', visible: true },
    { label: translate('provider'), key: 'provider', visible: true },
    { label: translate('status'), key: 'status1', visible: true, type: 'toggle' },
    {
      type: 'delete',
      // eslint-disable-next-line no-console
      handler: (id) => handleDelete(id)
    }]

  };

  const handleEdit = (id) => {
    // eslint-disable-next-line no-console
    console.log('Edit user with ID:', id);
    // Add any other logic you want for editing a user, such as routing to an edit page
  };

  // Delete function
  const handleDelete = (id) => {
    // eslint-disable-next-line no-console
    console.log('Delete user with ID:', id);
    // Filter out the user with the given ID
    setFilteredColumns((prevUsers) => prevUsers.filter((user) => user.id !== id));
  };
  const [columns, setColumns] = useState(columnNames);
  const [showUserDrawer, setShowUserDrawer] = useState(false);
  // Filter users based on search query
  useEffect(() => {
    const filteredRows = response.filter((user) => {
      const userData = `${user.paymentType} ${user.provider}`.toLowerCase();
      const sanitizedSearch = searchQuery.toLowerCase().trim();
      return userData.includes(sanitizedSearch);
    });
    setFilteredColumns(filteredRows);
  }, [searchQuery, response]);

  return (
    <Box sx={{ flex: '1 1 auto', p: 3 }}>
      <PageHeader title={translate('payment_types')} />
      <PaymentDrawer open={showUserDrawer} onClose={() => setShowUserDrawer(false)} />
      <Box style={{ marginTop: '15px' }}>
        <GSTableControls
          setSearchQuery={setSearchQuery}
          setColumnsVisibility={(newColumns) => setColumns(newColumns)}
          columns={columns}
          tableTitle={translate('add_payment_types')}
          showPrint
          showExcel
          showPdf
          showFilter
          currentItems={currentItems}
          customButtonAction={() => setShowUserDrawer(true)} />

      </Box>
      <GSTable
        columns={columns}
        filteredColumns={filteredColumns}
        currentItems={currentItems} // Ensure this is passed
        currentPage={currentPage}
        totalPages={totalPages}
        handlePageChange={(e, page) => setCurrentPage(page)}
        setFilteredColumns={setFilteredColumns} />

    </Box>);



export default Page;