'use client';
import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import GSTable from '@/components/widgets/table/GSTable';
import GSTableControls from '@/components/widgets/table/GSTableControls';
import { ColumnType } from '@/types/table-types';
import { useLocalization } from '@/context/LocalizationProvider';
import { categoryMock } from '@/mock/products';
import PageHeader from '@/components/widgets/headers/PageHeader';

const Page = () => {
  const { translate } = useLocalization();
  const columnNames: ColumnType[] = [
    { label: translate('category_name'), key: 'Category Name', visible: true },
    { label: translate('oder'), key: 'Order', visible: true },
    { label: translate('image'), key: 'image', visible: true, type: 'image' },
    { label: translate('created_date'), key: 'Created Date', visible: true },
    {
      label: translate('show_on_web'),
      key: 'Show on Web',
      visible: true,
      type: 'toggle',
    },
    {
      label: translate('show_on_pos'),
      key: 'Show on POS',
      visible: true,
      type: 'toggle',
    },
    {
      label: translate('action'),
      key: 'action',
      visible: true,
      isAction: true,
      actions: [
        {
          type: 'edit',
          handler: (id) => handleEdit(id),
        },
        { type: 'delete', handler: (id) => handleDelete(id) },
      ],
    },
  ];
  // const handleToggle = (id: number, key: string) => {
  //   setData((prevData) =>
  //     prevData.map((item) =>
  //       item.id === id ? { ...item, [key]: !item[key] } : item
  //     )
  //   );
  // };
  const handleEdit = (id: string | number) => {
    console.log('Edit user with ID:', id);
    // Add any other logic you want for editing a user, such as routing to an edit page
  };

  // Delete function
  const handleDelete = (id: string | number) => {
    console.log('Delete user with ID:', id);
    // Filter out the user with the given ID
    setFilteredColumns((prevUsers) => prevUsers.filter((user) => user.id !== id));
  };

  const [response] = useState(categoryMock);
  const [filteredColumns, setFilteredColumns] = useState(categoryMock);
  const [searchQuery, setSearchQuery] = useState('');
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredColumns.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredColumns.length / itemsPerPage);
  const [columns, setColumns] = useState(columnNames);
  // Filter users based on search query
  useEffect(() => {
    const filteredRows = response.filter((user) => {
      const users = `${user['Category Name']} ${user['Created Date']} ${user.Order} `.toLowerCase();
      const sanitizedSearch = searchQuery.toLowerCase().trim();
      return users.includes(sanitizedSearch);
    });
    setFilteredColumns(filteredRows);
  }, [searchQuery, response]);

  return (
    <Box sx={{ flex: '1 1 auto', p: 3 }}>
      <PageHeader title={translate('view_category')} />

      <Box style={{ marginTop: '15px' }}>
        <GSTableControls
          setSearchQuery={setSearchQuery}
          setColumnsVisibility={(newColumns) => setColumns(newColumns)}
          columns={columns}
          tableTitle="Add new category"
          showPrint
          showExcel
          showPdf
          showFilter
          href="/products/add-category"
          currentItems={currentItems}
        />
      </Box>
      <GSTable
        columns={columns}
        filteredColumns={filteredColumns}
        currentItems={currentItems} // Ensure this is passed
        currentPage={currentPage}
        totalPages={totalPages}
        handlePageChange={(e: React.ChangeEvent<unknown>, page: number) => setCurrentPage(page)}
        setFilteredColumns={setFilteredColumns}
      />
    </Box>
  );
};

export default Page;
