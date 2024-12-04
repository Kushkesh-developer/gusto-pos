'use client';
import React, { useEffect, useState } from 'react';
import { Box, Stack } from '@mui/material';
import GSTable from '@/components/widgets/table/GSTable';
import GSSelectInput from '@/components/widgets/inputs/GSSelectInput';
import GSTableControls from '@/components/widgets/table/GSTableControls';
import { useLocalization } from '@/context/LocalizationProvider';
import { ColumnType, UserRecord } from '@/types/table-types';
import { floorOptions, outletsOptions, adsMock } from '@/mock/queue';
import CdsDrawer from '@/components/queue-management/CdsDrawer';
import PageHeader from '@/components/widgets/headers/PageHeader';
type EditType = {
  id?: string | number;
  name?: string;
  phone?: string;
  email?: string;
  role?: string;
  adsProvidername: string;
  [key: string]: unknown;
  itemName?: string;
  refreshrate: string;
  unit?: string;
  status: string;
  logo_image?: string; // Existing image path or base64
};
const Page = () => {
  const { translate } = useLocalization();
  const [showUserDrawer, setShowUserDrawer] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserRecord | null>(null);
  const [editMode, setEditMode] = useState(false);
  const handleCloseDrawer = () => {
    setShowUserDrawer(false);
    setSelectedUser(null);
    setEditMode(false); // Reset edit mode
  };
  const [edit, setEdit] = useState<EditType | null>(null);
  const [response] = useState(adsMock);
  const [filteredColumns, setFilteredColumns] = useState(adsMock);
  const [searchQuery, setSearchQuery] = useState('');

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredColumns.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredColumns.length / itemsPerPage);

  const columnNames: ColumnType[] = [
    { label: translate('order'), key: 'order', visible: true },
    { label: translate('name'), key: 'name', visible: true },
    { label: translate('image'), key: 'image', visible: true, type: 'image' },
    { label: translate('outlets'), key: 'outlets', visible: true },
    { label: translate('start_date'), key: 'startDate', visible: true },
    { label: translate('end_date'), key: 'endDate', visible: true },
    { label: translate('impression'), key: 'impression', visible: true },
    { label: translate('status'), key: 'status', visible: true },
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
  const [columns, setColumns] = useState(columnNames);
  // Filter users based on search query
  useEffect(() => {
    const filteredRows = response.filter((user) => {
      const userData = `${user.order} ${user.name} ${user.status}`.toLowerCase();
      const sanitizedSearch = searchQuery.toLowerCase().trim();
      return userData.includes(sanitizedSearch);
    });
    setFilteredColumns(filteredRows);
  }, [searchQuery, response]);

  return (
    <Box sx={{ flex: '1 1 auto', p: 3 }}>
      <PageHeader title={translate('queue_ads')} />

      <Box mt={'40px'}>
        <GSTableControls
          setSearchQuery={setSearchQuery}
          setColumnsVisibility={(newColumns) => setColumns(newColumns)}
          columns={columns}
          currentItems={currentItems}
          renderFilterElement={
            <Stack direction="row" spacing={2}>
              <GSSelectInput
                options={floorOptions}
                placeholder={translate('select_floor')}
                height="40px"
                variant="theme" // Pass type as "theme" to enable primary color styling
                placeholderColor="primary" // Ensures placeholder text color is primary
              />
              <GSSelectInput
                options={outletsOptions}
                placeholder={translate('select_outlets')}
                height="40px"
                variant="theme" // Pass type as "theme" to enable primary color styling
                placeholderColor="primary" // Ensures placeholder text color is primary
              />
            </Stack>
          }
          showFilter
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
          setEditMode(true); // Enable edit mode
          setSelectedUser(null); // Reset selected user
          setShowUserDrawer(true); // Show user drawer

          if (value) {
            // Convert UserRecord to EditType
            const newEdit: EditType = {
              ...value, // Spread properties from `UserRecord`
              adsProvidername: String(value.adsProvidername || ''), // Ensure adsProvidername is a string
              refreshrate: String(value.refreshrate || ''), // Ensure refreshrate is a string
              status: value.status || 'Active', // Ensure status is always a string, fallback to 'Active'
              // Add any other required properties for EditType here
            };

            setEdit(newEdit); // Set the new EditType object
          } else {
            setEdit(null); // If value is null, reset edit to null
          }
        }}
      />
      <Box mt={'50px'}>
        <PageHeader title={translate('waiting_list')} />
        <CdsDrawer
          open={showUserDrawer}
          onClose={handleCloseDrawer}
          formTitle={editMode ? translate('edit_new_provider') : translate('ads_new_provider')}
          initialData={selectedUser}
          editMode={editMode}
          setEdit={setEdit}
          edit={edit || undefined}
        />
        <Box mt={'40px'}>
          <GSTableControls
            setSearchQuery={setSearchQuery}
            setColumnsVisibility={(newColumns) => setColumns(newColumns)}
            columns={columns}
            tableTitle={translate('add_ads')}
            showFilter
            customButtonAction={() => setShowUserDrawer(true)}
            currentItems={currentItems}
            renderFilterElement={
              <Stack direction="row" spacing={2}>
                <GSSelectInput
                  options={floorOptions}
                  placeholder={translate('select_floor')}
                  height="40px"
                  variant="theme" // Pass type as "theme" to enable primary color styling
                  placeholderColor="primary" // Ensures placeholder text color is primary
                />
                <GSSelectInput
                  options={outletsOptions}
                  placeholder={translate('select_outlets')}
                  height="40px"
                  variant="theme" // Pass type as "theme" to enable primary color styling
                  placeholderColor="primary" // Ensures placeholder text color is primary
                />
              </Stack>
            }
          />
        </Box>
        <GSTable
          columns={columns}
          filteredColumns={filteredColumns}
          currentItems={currentItems} // Ensure this is passed
          currentPage={currentPage}
          totalPages={totalPages}
          handlePageChange={(e: React.ChangeEvent<unknown>, page: number) => setCurrentPage(page)}
          keyMapping={Object.fromEntries(columnNames.map((col) => [col.label, col.key]))}
          setFilteredColumns={setFilteredColumns}
          customButtonAction={(value) => {
            setEditMode(true); // Enable edit mode
            setSelectedUser(null); // Reset selected user
            setShowUserDrawer(true); // Show user drawer

            if (value) {
              // Convert UserRecord to EditType
              const newEdit: EditType = {
                ...value, // Spread properties from `UserRecord`
                adsProvidername: String(value.adsProvidername || ''), // Ensure adsProvidername is a string
                refreshrate: String(value.refreshrate || ''), // Ensure refreshrate is a string
                status: value.status || 'Active', // Ensure status is always a string, fallback to 'Active'
                // Add any other required properties for EditType here
              };

              setEdit(newEdit); // Set the new EditType object
            } else {
              setEdit(null); // If value is null, reset edit to null
            }
          }}
        />
      </Box>
    </Box>
  );
};

export default Page;
