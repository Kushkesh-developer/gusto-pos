import React, { useState, ChangeEvent } from "react";
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
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import Image from "next/image";
import { alpha, useTheme } from "@mui/material/styles";
import GSSwitchButton from "@/components/widgets/switch/GSSwitchButton";
import PaginationComponent from "@/components/widgets/table/Pagination";
import { ColumnType,UserRecord } from "@/src/types/table-types"
// Define all necessary types
export type GSTableData = Record<string, unknown>[];




interface TableProps {
  columns: ColumnType[];
  filteredColumns: UserRecord[];
  currentItems: UserRecord[];
  currentPage: number;
  totalPages: number;
  hidePagination?: boolean;
  handlePageChange?: (_event: React.ChangeEvent<unknown>, _page: number) => void;
  keyMapping?: { [key: string]: string };
  sx?: SxProps;
  setFilteredColumns?: React.Dispatch<React.SetStateAction<UserRecord[]>>;
}

interface EditingRow {
  id: string | number | null;
  data: Record<string, unknown>;
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
}) => {
  const theme = useTheme();
  const [editingRow, setEditingRow] = useState<EditingRow>({
    id: null,
    data: {},
  });

  const handleDelete = (id: string | number) => {
    return () => {
      if (setFilteredColumns) {
        setFilteredColumns((prevUsers) =>
          prevUsers.filter((user) => user.id !== id)
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

  const handleEditChange = (key: string, value: unknown) => {
    setEditingRow((prev) => ({
      ...prev,
      data: {
        ...prev.data,
        [key]: value,
      },
    }));
  };

  const handleImageChange = (
    key: string,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          handleEditChange(key, reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const saveEdit = () => {
    // In a real application, you would save the changes here
    cancelEditing();
  };

  const renderCell = (value: UserRecord, column: ColumnType) => {
    const isEditing = editingRow.id === value.id;
    const cellValue = isEditing
      ? editingRow.data[column.key]
      : value[column.key];

    if (column.type === "image") {
      return isEditing ? (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          {typeof cellValue === "string" && (
            <Image
              src={cellValue}
              alt={String(value.Name || column.label)}
              width={80}
              height={80}
            />
          )}
          <label htmlFor={`image-upload-${value.id}-${column.key}`}>
            <Input
              id={`image-upload-${value.id}-${column.key}`}
              type="file"
              onChange={(e) =>
                handleImageChange(
                  column.key,
                  e as React.ChangeEvent<HTMLInputElement>
                )
              }
              inputProps={{ accept: "image/*" }}
              sx={{ display: "none" }}
            />
            <Box
              component="span"
              sx={{
                display: "inline-block",
                border: `1px solid ${theme.palette.primary.main}`,
                borderRadius: "4px",
                padding: "4px 8px",
                cursor: "pointer",
                width: "100px",
                color: theme.palette.primary.main,
              }}
            >
              Choose file
            </Box>
          </label>
        </Box>
      ) : (
        typeof cellValue === "string" && (
          <Image
            src={cellValue}
            alt={String(value.Name || column.label)}
            width={80}
            height={80}
          />
        )
      );
    }

    if (column.type === "toggle") {
      return (
        <GSSwitchButton
          checked={Boolean(cellValue)}
          onChange={(e: ChangeEvent<unknown>) => {
            if (isEditing) {
              handleToggleChange(column.key,(e.target as HTMLInputElement).checked);
            }
          }}
          disabled={!isEditing || editingRow.id !== value.id}
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
                    ? () => action.handler?.(value.id)
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
            value={String(cellValue)}
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

      return (
        <TextField
          value={String(cellValue)}
          onChange={(e) => handleEditChange(column.key, e.target.value)}
          size="small"
          fullWidth
        />
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
                )
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
              <TableRow hover key={value.id}>
                {columns.map(
                  (column) =>
                    column.visible && (
                      <TableCell
                        key={column.key}
                        sx={{ padding: "4px 8px", cursor: "pointer" }}
                      >
                        {renderCell(value, column)}
                      </TableCell>
                    )
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
  );
};

export default GSTable;