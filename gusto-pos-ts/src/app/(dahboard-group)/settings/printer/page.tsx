'use client';
import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import GSTable from '@/components/widgets/table/GSTable';
import GSTableControls from '@/components/widgets/table/GSTableControls';
import { ColumnType, UserRecord } from '@/types/table-types';
import { useLocalization } from '@/context/LocalizationProvider';
import { printerMock } from '@/mock/setting';
import PrinterDrawer from '@/components/settings/PrinterDrawer';
import PageHeader from '@/components/widgets/headers/PageHeader';
type EditType = {
  id?: string | number;
  email?: string;
  [key: string]: unknown;
  group: string;
  name?: string;
};
const Page = () => {
  // Mock data

  const { translate } = useLocalization();
  const [response] = useState(printerMock);
  const [filteredColumns, setFilteredColumns] = useState(printerMock);
  const [searchQuery, setSearchQuery] = useState('');
  const [edit, setEdit] = useState<UserRecord | null>(null);
  const [selectedUser, setSelectedUser] = useState<UserRecord | null>(null);
  const [editMode, setEditMode] = useState(false);
  // Pagination
  const [showUserDrawer, setShowUserDrawer] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredColumns.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredColumns.length / itemsPerPage);
  const handleCloseDrawer = () => {
    setShowUserDrawer(false);
    setSelectedUser(null);
    setEditMode(false); // Reset edit mode
  };
  useEffect(() => {
    setColumns(getColumns());
  }, [translate]);
  const getColumns = (): ColumnType[] => [
    { label: translate('printer_name'), key: 'printerName', visible: true },
    { label: translate('type'), key: 'type', visible: true },
    { label: translate('outlet'), key: 'outlet', visible: true },
    { label: translate('printer_ip'), key: 'printerIp', visible: true },
    { label: translate('printer_model'), key: 'printerModel', visible: true },
    { label: translate('receipt_quantity'), key: 'receiptQuantity', visible: true },
    {
      label: translate('action'),
      key: 'action',
      visible: true,
      isAction: true,
      actions: [
        {
          type: 'edit',
          // eslint-disable-next-line no-console
          handler: (id) => handleEdit(id),
        },
        {
          type: 'delete',
          // eslint-disable-next-line no-console
          handler: (id) => handleDelete(id),
        },
      ],
    },
  ];
  const handleEdit = (id: string | number) => {
    // eslint-disable-next-line no-console
    console.log('Edit user with ID:', id);
    // Add any other logic you want for editing a user, such as routing to an edit page
  };

  // Delete function
  const handleDelete = (id: string | number) => {
    // eslint-disable-next-line no-console
    console.log('Delete user with ID:', id);
    // Filter out the user with the given ID
    setFilteredColumns((prevUsers) => prevUsers.filter((user) => user.id !== id));
  };
  const [columns, setColumns] = useState(getColumns()); // Filter users based on search query
  useEffect(() => {
    const filteredRows = response.filter((user) => {
      const userData = `${user.printerName} ${user.type} ${user.outlet}`.toLowerCase();
      const sanitizedSearch = searchQuery.toLowerCase().trim();
      return userData.includes(sanitizedSearch);
    });
    setFilteredColumns(filteredRows);
  }, [searchQuery, response]);

  return (
    <Box sx={{ flex: '1 1 auto' }}>
      <PageHeader title={translate('printer')} />

      <PrinterDrawer
        open={showUserDrawer}
        onClose={handleCloseDrawer}
        formTitle={editMode ? translate('edit_new_printer') : translate('add_new_printer')}
        initialData={selectedUser}
        editMode={editMode}
        setEdit={setEdit}
        edit={(edit as EditType) || undefined}
      />
      <Box style={{ marginTop: '15px' }}>
        <GSTableControls
          setSearchQuery={setSearchQuery}
          setColumnsVisibility={(newColumns) => setColumns(newColumns)}
          columns={columns}
          tableTitle={translate('add_printer')}
          showPrint
          tableTitlePrint={translate('printers_list')}
          showExcel
          showPdf
          showFilter
          currentItems={currentItems}
          customButtonAction={() => setShowUserDrawer(true)}
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
        customButtonAction={(value) => {
          setEditMode(true); // Disable edit mode
          setSelectedUser(null);
          setShowUserDrawer(true);
          setEdit(value || null);
        }}
        onDelete={handleDelete}
      />
    </Box>
  );
};

export default Page;
