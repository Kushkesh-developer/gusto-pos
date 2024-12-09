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


// Define all necessary types
























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
  customButtonAction
  // onEditClick,
}) => {
  const theme = useTheme();
  const [editingRow, setEditingRow] = useState({
    id: null,
    data: {}
  });

  const handleDelete = (id) => {
    // Updated logic
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

  // const startEditing = (row: T) => {
  //   setEditingRow({
  //     id: typeof row.id === 'string' || typeof row.id === 'number' ? row.id : null,
  //     data: { ...row },
  //   });
  // };

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

    if (column.type === 'image') {
      return isEditing ?
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
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

              Choose file
            </Box>
          </label>
        </Box> :

      typeof cellValue === 'string' &&
      <Image src={cellValue} alt={String(value.Name || column.label)} width={80} height={80} />;


    }

    if (column.type === 'toggle') {
      return (
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
          disabled={false} />);


    }

    if (column.isAction && column.actions) {
      return (
        <Box sx={{ display: 'flex', gap: 0 }}>
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
                handleDelete(value.id); // Updated usage
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
        <TextField
          value={String(cellValue)}
          onChange={(e) => handleEditChange(column.key, e.target.value)}
          size="small"
          fullWidth />);


    }
    return <span>{String(cellValue)}</span>;
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
              <TableCell sx={{ backgroundColor: 'transparent' }} key={column.key}>
                    {column.label}
                  </TableCell>

            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredColumns.length === 0 ?
          <TableRow sx={{ minHeight: '50px' }}>
              <TableCell colSpan={columns.length} align="center">
                Record Not Found
              </TableCell>
            </TableRow> :

          currentItems.map((value) =>
          <TableRow hover key={String(value.id)} sx={{ height: '50px', mx: 2 }}>
                {columns.map(
              (column) =>
              column.visible &&
              <TableCell key={column.key} sx={{ padding: '4px 8px', cursor: 'pointer' }}>
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