import React, { useState } from 'react';
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  IconButton,
  Box,
  TableContainer,
  Paper,

  TextField,
  Input } from
'@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import Image from 'next/image';
import { alpha, useTheme } from '@mui/material/styles';
import GSSwitchButton from '@/components/widgets/switch/GSSwitchButton';
import PaginationComponent from '@/components/widgets/table/Pagination';

import { useLocalization } from '@/context/LocalizationProvider';
























const GSTable = ({
  columns,
  filteredColumns,
  currentItems,
  currentPage,
  totalPages,
  hidePagination,
  handlePageChange = () => {},
  sx = {},
  setFilteredColumns,
  customButtonAction,
  onQuantityChange
}) => {
  const theme = useTheme();
  const [editingRow, setEditingRow] = useState({
    id: null,
    data: {}
  });

  const { translate } = useLocalization();

  const handleDelete = (id) => {
    if (setFilteredColumns) {
      setFilteredColumns((prevItems) => prevItems.filter((item) => item.id !== id));
    }
  };

  const handleToggleChange = (key, checked) => {
    setEditingRow((prev) => ({
      ...prev,
      data: {
        ...prev.data,
        [key]: checked
      }
    }));
  };

  const cancelEditing = () => {
    setEditingRow({
      id: null,
      data: {}
    });
  };

  const handleEditChange = (key, value) => {
    setEditingRow((prev) => ({
      ...prev,
      data: {
        ...prev.data,
        [key]: value
      }
    }));
  };

  const handleImageChange = (key, event) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          handleEditChange(key, reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const saveEdit = () => {
    cancelEditing();
  };

  const renderCell = (value, column) => {
    const isEditing = editingRow.id === value.id;
    const cellValue = isEditing ? editingRow.data[column.key] : value[column.key];

    // Inside renderCell function, replace the existing quantity condition with this:
    if (column.key === 'quantity') {
      return (
        <Box sx={{ display: 'flex', alignItems: 'center', px: 2 }}>
          <TextField
            type="number"
            size="small"
            value={cellValue === 0 ? '' : cellValue}
            onChange={(e) => {
              // Remove leading zeros
              const cleanedValue = e.target.value.replace(/^0+/, '');

              // Convert to number, default to 0 if empty
              const newValue = cleanedValue === '' ? 0 : parseInt(cleanedValue, 10);

              // Only update if it's a valid number
              if (!isNaN(newValue) && onQuantityChange) {
                onQuantityChange(value.id, newValue);
              }
            }}
            onKeyDown={(e) => {
              // Allow backspace, delete, numbers, arrow keys, and tab
              const allowedKeys = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab'];
              if (!allowedKeys.includes(e.key) && !/[0-9]/.test(e.key)) {
                e.preventDefault();
              }
            }}
            inputProps={{
              min: 0,
              sx: {
                textAlign: 'center',
                padding: '8px',
                width: '60px'
              }
            }}
            sx={{
              '& .MuiInputBase-root': {
                height: '36px'
              },
              '& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button': {
                display: 'none'
              },
              '& input[type=number]': {
                MozAppearance: 'textfield'
              }
            }} />

        </Box>);

    }
    if (column.type === 'image') {
      return isEditing ?
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, px: 2 }}>
          {typeof cellValue === 'string' &&
        <Image
          src={cellValue}
          alt={String(value.Name || column.label)}
          width={80}
          height={80} />

        }
          <label htmlFor={`image-upload-${value.id}-${column.key}`}>
            <Input
            id={`image-upload-${value.id}-${column.key}`}
            type="file"
            onChange={(e) =>
            handleImageChange(column.key, e)
            }
            inputProps={{ accept: 'image/*' }}
            sx={{ display: 'none' }} />

            <Box
            component="span"
            sx={{
              display: 'inline-block',
              border: `1px solid ${theme.palette.primary.main}`,
              borderRadius: '4px',
              padding: '4px 8px',
              cursor: 'pointer',
              width: '100px',
              color: theme.palette.primary.main
            }}>

              {translate('choose_file')}
            </Box>
          </label>
        </Box> :

      typeof cellValue === 'string' &&
      <Box sx={{ px: 2, display: 'flex', alignItems: 'center', height: '100%' }}>
            <Image
          src={cellValue}
          alt={String(value.Name || column.label)}
          width={80}
          height={80} />

          </Box>;


    }

    if (column.type === 'toggle') {
      return (
        <Box sx={{ px: 2, display: 'flex', alignItems: 'center', height: '100%' }}>
          <GSSwitchButton
            checked={Boolean(cellValue)}
            onChange={(e) => {
              if (isEditing) {
                handleToggleChange(column.key, e.target.checked);
              } else {
                if (setFilteredColumns) {
                  setFilteredColumns((prevItems) =>
                  prevItems.map((item) =>
                  item.id === value.id ?
                  { ...item, [column.key]: e.target.checked } :
                  item
                  )
                  );
                }
              }
            }}
            disabled={false} />

        </Box>);

    }

    if (column.isAction && column.actions) {
      return (
        <Box sx={{ display: 'flex', gap: 0, px: 2 }}>
          {isEditing ?
          <>
              <IconButton size="small" onClick={saveEdit}>
                <CheckIcon sx={{ color: 'green' }} />
              </IconButton>
              <IconButton size="small" onClick={cancelEditing}>
                <CloseIcon sx={{ color: 'red' }} />
              </IconButton>
            </> :

          column.actions.map((action, idx) =>
          <IconButton
            key={idx}
            onClick={() => {
              if (action.type === 'edit' && customButtonAction) {
                customButtonAction(value);
              } else if (action.type === 'delete') {
                handleDelete(value.id);
              }
            }}>

                {action.type === 'edit' ?
            <EditIcon style={{ color: theme.palette.primary.main }} /> :

            <DeleteIcon style={{ color: theme.palette.primary.main }} />
            }
              </IconButton>
          )
          }
        </Box>);

    }

    if (isEditing && !column.readOnly) {
      return (
        <Box sx={{ px: 2, width: '100%' }}>
          <TextField
            value={String(cellValue)}
            onChange={(e) => handleEditChange(column.key, e.target.value)}
            size="small"
            fullWidth />

        </Box>);

    }
    return <Box sx={{ px: 2 }}>{String(cellValue)}</Box>;
  };

  return (
    <TableContainer component={Paper} sx={{ pb: 2, ...sx }}>
      <Table stickyHeader>
        <TableHead
          style={{
            backgroundColor: alpha(theme.palette.primary.main, 0.2),
            fontSize: '20px',
            fontWeight: 'bold'
          }}>

          <TableRow>
            {columns.map(
              (column) =>
              column.visible &&
              <TableCell
                sx={{
                  backgroundColor: 'transparent',
                  px: 2,
                  width: column.width || 'auto'
                }}
                key={column.key}>

                    {column.label}
                  </TableCell>

            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredColumns.length === 0 ?
          <TableRow sx={{ minHeight: '50px' }}>
              <TableCell
              colSpan={columns.length}
              sx={{
                textAlign: {
                  xs: 'left', // Left align on mobile
                  sm: 'center' // Center align on larger screens
                },
                paddingLeft: {
                  xs: '16px' // Add some padding on mobile for better appearance
                }
              }}>

                {translate('record_not_found')}
              </TableCell>
            </TableRow> :

          currentItems.map((value) =>
          <TableRow hover key={String(value.id)} sx={{ height: '50px', mx: 2 }}>
                {columns.map(
              (column) =>
              column.visible &&
              <TableCell
                key={column.key}
                sx={{
                  padding: '4px 0',
                  cursor: 'pointer',
                  width: column.width || 'auto'
                }}>

                        {renderCell(value, column)}
                      </TableCell>

            )}
              </TableRow>
          )
          }
        </TableBody>
      </Table>
      {!hidePagination &&
      <PaginationComponent
        currentPage={currentPage}
        count={totalPages}
        onPageChange={handlePageChange} />

      }
    </TableContainer>);

};

export default GSTable;