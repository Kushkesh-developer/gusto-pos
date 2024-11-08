// src/components/GSTable.tsx
import React from "react";
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
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import PaginationComponent from "./Pagination";
import GSSwitchButton from "@/components/widgets/switch/GSSwitchButton";
import { ColumnType } from "@/types/table-types";
import Image from "next/image";
import Input from "@mui/material/Input";
import { alpha, useTheme } from "@mui/material/styles";

export type GSTableData = Record<string, unknown>[];

interface TableProps {
  columns: ColumnType[];
  filteredUsers: any[];
  currentItems: any[];
  currentPage: number;
  totalPages: number;
  hidePagination?: boolean;
  handlePageChange?: (
    _event: React.ChangeEvent<unknown>,
    _page: number,
  ) => void;
  keyMapping?: { [key: string]: string };
  sx?: SxProps;
  setFilteredUsers?: React.Dispatch<React.SetStateAction<any[]>>;
}

const GSTable = ({
  columns,
  filteredUsers,
  currentItems,
  currentPage,
  totalPages,
  hidePagination,
  handlePageChange = () => {},
  sx = {},
  setFilteredUsers,
}: TableProps) => {
  const theme = useTheme();

  const handleDelete = (id: string | number) => {
    return () => {
      if (setFilteredUsers) {
        setFilteredUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
      }
    };
  };

  const handleToggleChange = (id: number | string, key: string) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const isChecked = event.target.checked;
    if (setFilteredUsers) {
      setFilteredUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === id ? { ...user, [key]: isChecked } : user
        )
      );
    }
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

  return (
    <TableContainer component={Paper} sx={{ pb: 2, ...sx }}>
      <Table stickyHeader>
        <TableHead
          style={{
            backgroundColor: alpha(theme.palette.primary.main, 0.1),
            fontSize: "20px",
            fontWeight: "bold",
          }}
        >
          <TableRow>
            {columns.map((column) => column.visible && (
              <TableCell key={column.key}>{column.label}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredUsers.length === 0 ? (
            <TableRow>
              <TableCell colSpan={columns.length} align="center">
                Record Not Found
              </TableCell>
            </TableRow>
          ) : (
            currentItems.map((value) => (
              <TableRow key={value.id}>
                {columns.map((column) => {
                  if (!column.visible) return null;
                  const cellValue = value[column.key];

                  return (
                    <TableCell key={column.key}>
                      {column.type === "image" ? (
                        <Image
                          src={cellValue}
                          alt={value.Name || column.label}
                          width={80}
                          height={80}
                        />
                      ) : column.type === "toggle" ? (
                        <GSSwitchButton
                          checked={!!cellValue}
                          onChange={handleToggleChange(value.id, column.key)}
                        />
                      ) : column.key === "status" ? (
                        <span style={{ color: getStatusColor(cellValue) }}>{cellValue}</span>
                      ) : column.key === "RewardValidPeriod" ? (
                        <Input type="date" defaultValue={cellValue} />
                      ) : column.isAction && column.actions ? (
                        <Box sx={{ display: "flex", gap: 0 }}>
                          {column.actions.map((action, idx) => (
                            <IconButton
                              key={idx}
                              onClick={
                                action.type === "delete"
                                  ? handleDelete(value.id)
                                  : action.handler
                                  ? () => action.handler(value.id)
                                  : undefined
                              }
                            >
                              {action.type === "edit" ? (
                                <EditIcon style={{ color: theme.palette.primary.main }} />
                              ) : (
                                <DeleteIcon style={{ color: theme.palette.primary.main }} />
                              )}
                            </IconButton>
                          ))}
                        </Box>
                      ) : (
                        <span>{String(cellValue)}</span>
                      )}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
      {!hidePagination && filteredUsers.length > 0 && (
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
