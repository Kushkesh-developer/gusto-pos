import React, { useState, ChangeEvent } from 'react';
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
  SxProps,
  TextField,
  Input,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import Image from 'next/image';
import { alpha, useTheme } from '@mui/material/styles';
import GSSwitchButton from '@/components/widgets/switch/GSSwitchButton';
import PaginationComponent from '@/components/widgets/table/Pagination';
import { ColumnType, UserRecord } from '@/src/types/table-types';
import { useLocalization } from '@/context/LocalizationProvider';
export type GSTableData = Record<string, unknown>[];

interface TableProps<T> {
  columns: ColumnType[];
  filteredColumns: T[];
  currentItems: T[];
  currentPage: number;
  totalPages: number;
  hidePagination?: boolean;
  handlePageChange?: (_event: React.ChangeEvent<unknown>, _page: number) => void;
  keyMapping?: { [key: string]: string };
  sx?: SxProps;
  setFilteredColumns?: React.Dispatch<React.SetStateAction<T[]>>;
  // eslint-disable-next-line no-unused-vars
  customButtonAction?: (value?: UserRecord) => void;
  // eslint-disable-next-line no-unused-vars
  onQuantityChange?: (id: string | number, newQuantity: number) => void;
  // eslint-disable-next-line no-unused-vars
  onDelete?: (id: string | number) => void;
}
// interface StatusKeys {
//   statusKeys?: string[];
// }

// type ExtendedColumnType = ColumnType & StatusKeys;
interface EditingRow {
  id: string | number | null;
  data: Record<string, unknown>;
}

const GSTable = <T extends Record<string, unknown> = UserRecord>({
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
  onQuantityChange,
  onDelete,
}: TableProps<T>) => {
  const theme = useTheme();
  const [editingRow, setEditingRow] = useState<EditingRow>({
    id: null,
    data: {} as T,
  });
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<string | number | null>(null);
  const { translate } = useLocalization();

  // const handleDelete = (id: string | number) => {
  //   if (setFilteredColumns) {
  //     setFilteredColumns((prevItems) => prevItems.filter((item: T) => item.id !== id));
  //   }
  // };
  const handleDeleteClick = (id: string | number) => {
    setItemToDelete(id);
    setDeleteDialogOpen(true);
  };
  //Recommended: Implement your item deletion process from action handler callback and as per your business logic.
  const handleDeleteConfirm = () => {
    if (itemToDelete !== null) {
      if (onDelete) {
        onDelete(itemToDelete);
      }
      setDeleteDialogOpen(false);
      setItemToDelete(null);

      const actionColumn = columns.find((column) => column.key == 'action');
      const deleteHandler = actionColumn?.actions?.find?.(
        (item: { type: string; handler: (_id: string | number) => void }) => item.type == 'delete',
      );
      if (deleteHandler?.handler) {
        deleteHandler?.handler?.(itemToDelete);
        deleteHandler?.handler?.(itemToDelete);
      } else if (onDelete) {
        onDelete(itemToDelete);
      }
    }
  };

  // Cancel delete function
  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
    setItemToDelete(null);
  };

  const cancelEditing = () => {
    setEditingRow({
      id: null,
      data: {} as T,
    });
  };

  const handleEditChange = (key: string, value: unknown) => {
    setEditingRow((prev) => ({
      ...prev,
      data: {
        ...prev.data,
        [key]: value,
      },
    }));
  };

  const handleImageChange = (key: string, event: React.ChangeEvent<HTMLInputElement>) => {
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

  const renderCell = (value: UserRecord, column: ColumnType) => {
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
                onQuantityChange(value.id!, newValue);
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
                width: '60px',
              },
            }}
            sx={{
              '& .MuiInputBase-root': {
                height: '36px',
              },
              '& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button': {
                display: 'none',
              },
              '& input[type=number]': {
                MozAppearance: 'textfield',
              },
            }}
          />
        </Box>
      );
    }
    if (column.type === 'image') {
      return isEditing ? (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, px: 2 }}>
          {typeof cellValue === 'string' && (
            <Image
              src={cellValue}
              alt={String(value.Name || column.label)}
              width={80}
              height={100}
            />
          )}
          <label htmlFor={`image-upload-${value.id}-${column.key}`}>
            <Input
              id={`image-upload-${value.id}-${column.key}`}
              type="file"
              onChange={(e) =>
                handleImageChange(column.key, e as React.ChangeEvent<HTMLInputElement>)
              }
              inputProps={{ accept: 'image/*' }}
              sx={{ display: 'none' }}
            />
            <Box
              component="span"
              sx={{
                display: 'inline-block',
                border: `1px solid ${theme.palette.primary.main}`,
                borderRadius: '4px',
                padding: '4px 8px',
                cursor: 'pointer',
                width: '100px',
                color: theme.palette.primary.main,
              }}
            >
              {translate('choose_file')}
            </Box>
          </label>
        </Box>
      ) : (
        typeof cellValue === 'string' && (
          <Box sx={{ px: 2, display: 'flex', alignItems: 'center', height: '100%' }}>
            <Image
              style={{ objectFit: 'cover' }}
              src={cellValue}
              alt={String(value.Name || column.label)}
              width={100}
              height={100}
            />
          </Box>
        )
      );
    }

    if (column.type === 'toggle') {
      const getStatusKey = () => {
        if (column.statusKeys) {
          // Find the first status key present in the data
          const existingKey = column.statusKeys.find((key) => value[key] !== undefined);
          return existingKey || column.key; // Default to column key if no match
        }
        return column.key;
      };

      const statusKey = getStatusKey();
      const cellStatus = value[statusKey]; // Get the current status

      return (
        <Box sx={{ px: 2, display: 'flex', alignItems: 'center', height: '100%' }}>
          <GSSwitchButton
            checked={Boolean(cellStatus)} // Ensure it's a boolean
            onChange={(e: ChangeEvent<unknown>) => {
              const target = e.target as HTMLInputElement; // Safely cast the target
              const checked = target.checked; // Access the new checked value

              // Update the data
              if (setFilteredColumns) {
                setFilteredColumns((prevItems) =>
                  prevItems.map((item) =>
                    item.id === value.id
                      ? {
                          ...item,
                          [statusKey]: checked, // Update the main status key
                          ...(statusKey === 'credit_debit' && { credit_debit: checked }), // Handle 'credit_debit'
                        }
                      : item,
                  ),
                );
              }
            }}
            disabled={false}
          />
        </Box>
      );
    }

    if (column.isAction && column.actions) {
      return (
        <Box sx={{ display: 'flex', gap: 0, px: 2 }}>
          {isEditing ? (
            <>
              <IconButton size="small" onClick={saveEdit}>
                <CheckIcon sx={{ color: 'green' }} />
              </IconButton>
              <IconButton size="small" onClick={cancelEditing}>
                <CloseIcon sx={{ color: 'red' }} />
              </IconButton>
            </>
          ) : (
            column.actions.map((action, idx) => (
              <IconButton
                key={idx}
                onClick={() => {
                  if (action.type === 'edit' && customButtonAction) {
                    customButtonAction(value);
                  } else if (action.type === 'delete') {
                    handleDeleteClick(value.id!);
                  }
                }}
              >
                {action.type === 'edit' ? (
                  <EditIcon style={{ color: theme.palette.primary.main }} />
                ) : (
                  <DeleteIcon style={{ color: theme.palette.primary.main }} />
                )}
              </IconButton>
            ))
          )}
        </Box>
      );
    }

    if (isEditing && !column.readOnly) {
      return (
        <Box sx={{ px: 2, width: '100%' }}>
          <TextField
            value={String(cellValue)}
            onChange={(e) => handleEditChange(column.key, e.target.value)}
            size="small"
            fullWidth
          />
        </Box>
      );
    }
    return <Box sx={{ px: 2 }}>{String(cellValue)}</Box>;
  };

  return (
    <>
      <TableContainer component={Paper} sx={{ pb: 2, ...sx }}>
        <Table stickyHeader>
          <TableHead
            style={{
              backgroundColor: alpha(theme.palette.primary.main, 0.2),
              fontSize: '20px',
              fontWeight: 'bold',
            }}
          >
            <TableRow>
              {columns.map(
                (column) =>
                  column.visible && (
                    <TableCell
                      sx={{
                        backgroundColor: 'transparent',
                        px: 2,
                        width: column.width || 'auto',
                      }}
                      key={column.key}
                    >
                      {column.label}
                    </TableCell>
                  ),
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredColumns.length === 0 ? (
              <TableRow sx={{ minHeight: '50px' }}>
                <TableCell
                  colSpan={columns.length}
                  sx={{
                    textAlign: {
                      xs: 'left', // Left align on mobile
                      sm: 'center', // Center align on larger screens
                    },
                    paddingLeft: {
                      xs: '16px', // Add some padding on mobile for better appearance
                    },
                  }}
                >
                  {translate('record_not_found')}
                </TableCell>
              </TableRow>
            ) : (
              currentItems.map((value) => (
                <TableRow hover key={String(value.id)} sx={{ height: '50px', mx: 2 }}>
                  {columns.map(
                    (column) =>
                      column.visible && (
                        <TableCell
                          key={column.key}
                          sx={{
                            padding: '4px 0',
                            cursor: 'pointer',
                            width: column.width || 'auto',
                          }}
                        >
                          {renderCell(value, column)}
                        </TableCell>
                      ),
                  )}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
        {!hidePagination && (
          <PaginationComponent
            currentPage={currentPage}
            count={totalPages}
            onPageChange={handlePageChange}
          />
        )}
      </TableContainer>
      <Dialog
        open={deleteDialogOpen}
        onClose={handleDeleteCancel}
        aria-labelledby="delete-dialog-title"
        aria-describedby="delete-dialog-description"
      >
        <DialogTitle id="delete-dialog-title">{translate('confirm_delete')}</DialogTitle>
        <DialogContent id="delete-dialog-description">
          {translate('delete_confirmation_message')}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel} color="primary">
            {translate('cancel')}
          </Button>
          <Button
            onClick={handleDeleteConfirm}
            color="error"
            variant="contained"
            sx={{
              '&:hover': {
                backgroundColor: theme.palette.error.dark,
              },
            }}
          >
            {translate('delete')}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default GSTable;
