import React, { useState } from "react";
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
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import PaginationComponent from "./Pagination";
import GSSwitchButton from "@/components/widgets/switch/GSSwitchButton";
import { ColumnType, UserRecord } from "@/types/table-types";
import Image from "next/image";
import Input from "@mui/material/Input";
import { alpha, useTheme } from "@mui/material/styles";

export type GSTableData = Record<string, unknown>[];

interface TableProps {
  columns: ColumnType[];
  filteredColumns: UserRecord[];
  currentItems: UserRecord[];
  currentPage: number;
  totalPages: number;
  hidePagination?: boolean;
  handlePageChange?: (
    _event: React.ChangeEvent<unknown>,
    _page: number,
  ) => void;
  keyMapping?: { [key: string]: string };
  sx?: SxProps;
  setFilteredColumns?: React.Dispatch<React.SetStateAction<UserRecord[]>>;
}

interface EditingRow {
  id: string | number | null;
  data: Record<string, any>;
}

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
}: TableProps) => {
  const theme = useTheme();
  const [editingRow, setEditingRow] = useState<EditingRow>({
    id: null,
    data: {},
  });

  const handleDelete = (id: string | number) => {
    return () => {
      if (setFilteredColumns) {
        setFilteredColumns((prevUsers) =>
          prevUsers.filter((user) => user.id !== id),
        );
      }
    };
  };

  const handleToggleChange = (key: string, checked: boolean) => {
    setEditingRow((prev) => ({
      ...prev,
      data: {
        ...prev.data,
        [key]: checked,
      },
    }));
  };

  const startEditing = (row: UserRecord) => {
    setEditingRow({
      id: row.id,
      data: { ...row },
    });
  };

  const cancelEditing = () => {
    setEditingRow({
      id: null,
      data: {},
    });
  };

  const handleEditChange = (key: string, value: any) => {
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
        handleEditChange(key, reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const saveEdit = () => {
    // In a real application, you would save the changes here
    cancelEditing();
  };

  // Mapping function for status colors
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Waiting":
        return "gray";
      case "Active":
        return "green";
      case "Pending":
        return "orange";
      case "Cancelled":
        return "red";
      default:
        return "black";
    }
  };

  const renderCell = (value: UserRecord, column: ColumnType) => {
    const isEditing = editingRow.id === value.id;
    const cellValue = isEditing ? editingRow.data[column.key] : value[column.key];

    if (column.type === "image") {
      return isEditing ? (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          {cellValue && (
            <Image
              src={cellValue as string}
              alt={value.Name || column.label}
              width={80}
              height={80}
            />
          )}
          <label htmlFor={`image-upload-${value.id}-${column.key}`}>
            <Input
              id={`image-upload-${value.id}-${column.key}`}
              type="file"
              onChange={(e) => handleImageChange(column.key, e as React.ChangeEvent<HTMLInputElement>)}
              inputProps={{ accept: 'image/*' }}
              sx={{ display: 'none', }}
            />
            <Box
              component="span"
              sx={{
                display: 'inline-block',
                border: `1px solid ${theme.palette.primary.main}`,
                borderRadius: '4px',
                padding: '4px 8px',
                cursor: 'pointer',
                width:'100px',
                color: theme.palette.primary.main,
              }}
            >
              Choose file
            </Box>
          </label>
        </Box>
      ) : (
        <Image
          src={cellValue as string}
          alt={value.Name || column.label}
          width={80}
          height={80}
        />
      );
    }

    if (column.type === "toggle") {
      return (
        <GSSwitchButton
          checked={!!cellValue}
          onChange={(e) => {
            if (isEditing) {
              handleToggleChange(column.key, e.target.checked);
            }
          }}
          disabled={!isEditing}
        />
      );
    }

    if (column.isAction && column.actions) {
      return (
        <Box sx={{ display: "flex", gap: 0 }}>
          {isEditing ? (
            <>
              <IconButton size="small" onClick={saveEdit}>
                <CheckIcon sx={{ color: "green" }} />
              </IconButton>
              <IconButton size="small" onClick={cancelEditing}>
                <CloseIcon sx={{ color: "red" }} />
              </IconButton>
            </>
          ) : (
            column.actions.map((action, idx) => (
              <IconButton
                key={idx}
                onClick={
                  action.type === "delete"
                    ? handleDelete(value.id)
                    : action.type === "edit"
                    ? () => startEditing(value)
                    : action.handler
                    ? () => action.handler(value.id as string | number)
                    : undefined
                }
              >
                {action.type === "edit" ? (
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
      if (column.key === "status") {
        return (
          <TextField
            select
            value={cellValue}
            onChange={(e) => handleEditChange(column.key, e.target.value)}
            size="small"
            fullWidth
            SelectProps={{
              native: true,
            }}
          >
            {["Active", "Pending", "Waiting", "Cancelled"].map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </TextField>
        );
      }

      if (column.key === "RewardValidPeriod") {
        return (
          <Input
            type="date"
            value={cellValue}
            onChange={(e) => handleEditChange(column.key, e.target.value)}
            fullWidth
          />
        );
      }

      return (
        <TextField
          value={cellValue}
          onChange={(e) => handleEditChange(column.key, e.target.value)}
          size="small"
          fullWidth
        />
      );
    }

    if (column.key === "status") {
      return (
        <span style={{ color: getStatusColor(cellValue as string) }}>
          {cellValue as string}
        </span>
      );
    }

    return <span>{String(cellValue)}</span>;
  };

  return (
    <TableContainer component={Paper} sx={{ pb: 2, ...sx }}>
      <Table stickyHeader>
        <TableHead
          style={{
            backgroundColor: alpha(theme.palette.primary.main, 0.2),
            fontSize: "20px",
            fontWeight: "bold",
          }}
        >
          <TableRow>
            {columns.map(
              (column) =>
                column.visible && (
                  <TableCell
                    sx={{ backgroundColor: "transparent" }}
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
            <TableRow>
              <TableCell colSpan={columns.length} align="center">
                Record Not Found
              </TableCell>
            </TableRow>
          ) : (
            currentItems.map((value) => (
              <TableRow 
                key={value.id}
                sx={{
                  backgroundColor: editingRow.id === value.id 
                    ? alpha(theme.palette.primary.main, 0.05)
                    : 'inherit'
                }}
              >
                {columns.map(
                  (column) =>
                    column.visible && (
                      <TableCell key={column.key}>
                        {renderCell(value, column)}
                      </TableCell>
                    ),
                )}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
      {!hidePagination && filteredColumns.length > 0 && (
        <PaginationComponent
          count={totalPages}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      )}
    </TableContainer>
  );
};

export default GSTable;