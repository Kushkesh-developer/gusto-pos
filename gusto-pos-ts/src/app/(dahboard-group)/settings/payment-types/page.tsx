'use client';
import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { ColumnType, UserRecord } from '@/types/table-types';
import GSTable from '@/components/widgets/table/GSTable';
import GSTableControls from '@/components/widgets/table/GSTableControls';
import { useLocalization } from '@/context/LocalizationProvider';
import { paymentMockResponse } from '@/mock/setting';
import PaymentDrawer from '@/components/settings/PaymentDrawer';
import PageHeader from '@/components/widgets/headers/PageHeader';
type EditType = UserRecord & {
  id?: string | number;
  status1: boolean;
  payStatus: boolean;
  credit_debit: boolean;
  payU: boolean;
};

type PaymentRecord = {
  id?: string | number;
  status1?: boolean;
  paypalStatus?: boolean;
  credit_debit?: boolean;
  paymentType: string;
  provider: string;
  payU?: boolean;
};
const Page = () => {
  // Mock data

  const { translate } = useLocalization();
  const [response] = useState(
    paymentMockResponse.map((item, index) => ({
      ...item,
      id: index + 1, // Assign a unique id to each item
    })),
  );

  const [filteredColumns, setFilteredColumns] = useState<PaymentRecord[]>(paymentMockResponse);

  const [searchQuery, setSearchQuery] = useState('');
  console.log(filteredColumns, 'filteredColumns');

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredColumns.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredColumns.length / itemsPerPage);
  useEffect(() => {
    setColumns(getColumns());
  }, [translate]);
  const getColumns = (): ColumnType[] => [
    { label: translate('name'), key: 'paymentType', visible: true },
    { label: translate('provider'), key: 'provider', visible: true },
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
    const recordToEdit = filteredColumns.find((record) => record.id === id);
    setEdit(recordToEdit || null);
    setShowUserDrawer(true);
  };

  // Delete function
  const handleDelete = (id: string | number) => {
    // eslint-disable-next-line no-console
    console.log('Delete user with ID:', id);
    // Filter out the user with the given ID
    setFilteredColumns((prevUsers) => prevUsers.filter((user) => user.id !== id));
  };

  const [selectedUser, setSelectedUser] = useState<EditType | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [showUserDrawer, setShowUserDrawer] = useState(false);
  const [edit, setEdit] = useState<UserRecord | null>(null);
  const [columns, setColumns] = useState(getColumns());
  // Filter users based on search query
  useEffect(() => {
    const filteredRows = response.filter((user) => {
      const userData = `${user.paymentType} ${user.provider}`.toLowerCase();
      const sanitizedSearch = searchQuery.toLowerCase().trim();
      return userData.includes(sanitizedSearch);
    });
    setFilteredColumns(filteredRows);
  }, [searchQuery, response]);
  const handleCloseDrawer = () => {
    setShowUserDrawer(false);
    setSelectedUser(null);
    setEditMode(false); // Reset edit mode
  };
  useEffect(() => {
    console.log('Filtered Columns:', filteredColumns);
  }, [filteredColumns]);
  return (
    <Box sx={{ flex: '1 1 auto' }}>
      <PageHeader title={translate('payment_types')} />
      <PaymentDrawer
        open={showUserDrawer}
        onClose={handleCloseDrawer}
        formTitle={editMode ? translate('edit_payment_types') : translate('add_payment_types')}
        initialData={selectedUser}
        editMode={editMode}
        setEdit={setEdit}
        setFilteredColumns={setFilteredColumns}
        edit={(edit as EditType) || undefined}
      />
      <Box style={{ marginTop: '15px' }}>
        <GSTableControls
          setSearchQuery={setSearchQuery}
          setColumnsVisibility={(newColumns) => setColumns(newColumns)}
          columns={columns}
          tableTitle={translate('add_payment_types')}
          showPrint
          tableTitlePrint={translate('payments_list')}
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
          setEditMode(true);
          setSelectedUser(null);
          setShowUserDrawer(true);
          setEdit(value || null); // This should pass the table row data
        }}
        onDelete={handleDelete}
      />
    </Box>
  );
};

export default Page;
